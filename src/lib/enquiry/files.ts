import { fileExtension, uploadLimits } from "@/lib/enquiry/config";

export type ValidatedFile = {
  fileName: string;
  mimeType: string;
  size: number;
  data: Buffer;
};

const mimeByExt: Record<string, string> = {
  pdf: "application/pdf",
  dxf: "image/vnd.dxf",
  dwg: "image/vnd.dwg",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

function startsWith(buf: Buffer, bytes: number[]) {
  return bytes.every((b, i) => buf[i] === b);
}

/** Checks the file's leading bytes so a renamed executable cannot pass as a drawing. */
function matchesSignature(ext: string, buf: Buffer) {
  switch (ext) {
    case "pdf":
      return buf.subarray(0, 5).toString("latin1") === "%PDF-";
    case "png":
      return startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "jpg":
    case "jpeg":
      return startsWith(buf, [0xff, 0xd8, 0xff]);
    case "dwg":
      return buf.subarray(0, 4).toString("latin1") === "AC10";
    case "dxf": {
      const head = buf.subarray(0, 2048);
      if (head.subarray(0, 22).toString("latin1") === "AutoCAD Binary DXF\r\n\x1a\0") return true;
      const text = head.toString("latin1");
      return /^[\x09\x0a\x0d\x20-\x7e]*$/.test(text) && /SECTION/.test(text);
    }
    default:
      return false;
  }
}

function safeName(name: string) {
  const ext = fileExtension(name);
  const base = name
    .slice(0, name.length - (ext ? ext.length + 1 : 0))
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^[._]+/, "")
    .slice(0, 80);
  return `${base || "drawing"}.${ext}`;
}

export async function validateUploads(
  files: File[],
): Promise<{ ok: true; files: ValidatedFile[] } | { ok: false; error: string }> {
  if (files.length > uploadLimits.maxFiles) {
    return { ok: false, error: `Attach up to ${uploadLimits.maxFiles} files.` };
  }
  const out: ValidatedFile[] = [];
  let total = 0;
  for (const file of files) {
    const ext = fileExtension(file.name);
    if (!(uploadLimits.extensions as readonly string[]).includes(ext)) {
      return { ok: false, error: `${file.name}: file type not allowed.` };
    }
    if (file.size === 0 || file.size > uploadLimits.maxFileBytes) {
      return { ok: false, error: `${file.name}: file is empty or too large.` };
    }
    total += file.size;
    if (total > uploadLimits.maxTotalBytes) {
      return { ok: false, error: "Total upload size is too large." };
    }
    const data = Buffer.from(await file.arrayBuffer());
    if (!matchesSignature(ext, data)) {
      return { ok: false, error: `${file.name}: file content does not match its type.` };
    }
    out.push({ fileName: safeName(file.name), mimeType: mimeByExt[ext], size: data.length, data });
  }
  return { ok: true, files: out };
}
