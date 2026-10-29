import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const ORIGIN = "https://jagdamba-procut.mukeshpatel141284.chatgpt.site";
const OUT = path.join(process.cwd(), "public", "replica");
const HTML_OUT = path.join(process.cwd(), "content", "replica");

const seeds = ["/", "/our-work.css", "/style.css"];

function toUrl(ref, base) {
  if (!ref || ref.startsWith("data:") || ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("javascript:")) return null;
  if (ref.startsWith("#")) return null;
  try {
    const u = new URL(ref, base);
    if (u.origin !== ORIGIN) return null;
    u.hash = "";
    return u;
  } catch {
    return null;
  }
}

function localPath(u) {
  let p = decodeURIComponent(u.pathname);
  if (p.endsWith("/")) p += "index.html";
  if (!path.extname(p)) {
    if (u.pathname === "/documents/download") {
      const file = u.searchParams.get("file") || "download";
      p = file.startsWith("/") ? file : `/${file}`;
    }
  }
  return p.replace(/^\/+/, "");
}

const queue = [...seeds];
const seen = new Set();
const saved = [];

async function fetchToFile(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.log("FAIL", res.status, url);
    return null;
  }
  const type = res.headers.get("content-type") || "";
  const len = Number(res.headers.get("content-length") || 0);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (res.body) {
    await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
  } else {
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  const size = fs.statSync(dest).size;
  saved.push({ url, dest, size, type });
  console.log("OK", size, path.relative(process.cwd(), dest));
  return { type, size };
}

function extractRefs(text, base) {
  const refs = new Set();
  const re = /(?:src|href|poster)=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) refs.add(m[1]);
  const css = /url\((['"]?)([^'")]+)\1\)/g;
  while ((m = css.exec(text))) refs.add(m[2]);
  return [...refs].map((r) => toUrl(r, base)).filter(Boolean);
}

while (queue.length) {
  const raw = queue.shift();
  const u = new URL(raw, ORIGIN);
  u.hash = "";
  const key = u.origin + u.pathname + u.search;
  if (seen.has(key)) continue;
  seen.add(key);
  const rel = localPath(u);
  const isHtml = rel.endsWith(".html") || u.pathname.endsWith("/") || !path.extname(u.pathname) && !u.pathname.includes("/documents/");
  const dest = path.join(isHtml && !rel.endsWith(".css") && !rel.endsWith(".js") && !rel.endsWith(".mjs") ? HTML_OUT : OUT, rel);
  // documents/download query urls already mapped via localPath
  const isDoc = u.pathname === "/documents/download";
  const dest2 = isDoc ? path.join(OUT, localPath(u)) : dest;
  try {
    const result = await fetchToFile(u.href, dest2);
    if (!result) continue;
    const textLike = /\.(html|css|js|mjs|svg)$/i.test(dest2) || (result.type.includes("text") || result.type.includes("javascript") || result.type.includes("json"));
    if (textLike && result.size < 2_000_000) {
      const text = fs.readFileSync(dest2, "utf8");
      for (const next of extractRefs(text, u.href)) {
        const nkey = next.origin + next.pathname + next.search;
        if (!seen.has(nkey)) queue.push(next.href);
      }
    }
  } catch (err) {
    console.log("ERR", u.href, err.message);
  }
}

const total = saved.reduce((a, s) => a + s.size, 0);
console.log("FILES", saved.length, "BYTES", total);
