import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content", "replica");
const publicDir = path.join(process.cwd(), "public", "replica");

function rewriteHtml(html) {
  let out = html.replace(
    /<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument[\s\S]*?<\/script>/g,
    "",
  );
  out = out.replaceAll("https://jagdamba-procut.mukeshpatel141284.chatgpt.site", "");
  out = out.replaceAll('"/logo.jpg"', '"/replica/logo.jpg"');
  out = out.replace(/(src|href)=(["'])([^"']+)\2/g, (full, attr, q, url) => {
    if (
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("javascript:") ||
      url.startsWith("data:") ||
      url.startsWith("https://") ||
      url.startsWith("http://") ||
      url.startsWith("#")
    ) {
      return full;
    }
    if (url.startsWith("/documents/download")) return full;
    if (url === "/" || url.startsWith("/#")) {
      const next = url === "/" ? "/" : url.slice(1);
      return `${attr}=${q}${next}${q}`;
    }
    if (url === "/manage-vendor-documents" || url === "/download-leads") {
      return `${attr}=${q}/#contact${q}`;
    }
    if (url.endsWith(".html") || url.includes(".html#") || url.includes(".html?")) {
      const [pathPart, hash] = url.split("#");
      const clean = pathPart.replace(/^\//, "").replace(/\.html$/, "");
      const hashPart = hash ? `#${hash}` : "";
      return `${attr}=${q}/${clean}${hashPart}${q}`;
    }
    if (url.startsWith("/")) return `${attr}=${q}/replica${url}${q}`;
    return `${attr}=${q}/replica/${url}${q}`;
  });
  return out;
}

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".html") && !f.startsWith("_"));
for (const file of files) {
  const html = fs.readFileSync(path.join(contentDir, file), "utf8");
  const next = rewriteHtml(html);
  fs.writeFileSync(path.join(publicDir, file), next);
  console.log("published", file);
}

const routes = files
  .filter((f) => f !== "index.html")
  .map((f) => f.replace(/\.html$/, ""));
fs.writeFileSync(
  path.join(process.cwd(), "content", "replica-routes.json"),
  JSON.stringify(routes, null, 2),
);
console.log("routes", routes.length);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "cdn-cgi") {
        fs.rmSync(full, { recursive: true, force: true });
        console.log("removed", full);
        continue;
      }
      walk(full);
      continue;
    }
    if (/\.(pdf|zip|csv|txt)$/i.test(entry.name)) {
      const head = fs.readFileSync(full).slice(0, 20).toString("utf8");
      if (head.startsWith("<!doctype") || head.startsWith("<html")) {
        fs.rmSync(full);
        console.log("removed placeholder", path.relative(process.cwd(), full));
      }
    }
  }
}
walk(publicDir);
