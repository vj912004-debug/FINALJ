import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseEnquiry } from "@/lib/enquiry/validation";
import { validateUploads } from "@/lib/enquiry/files";
import { createEnquiry, storageConfigured } from "@/lib/enquiry/store";
import { notifyEnquiry } from "@/lib/enquiry/notify";
import { pushEnquiryToErp } from "@/lib/erp";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

const UNAVAILABLE =
  "Online enquiries can't be saved right now. Please send the same details on WhatsApp or email.";

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  const limited = rateLimit(`enquiry:${clientIp(request)}`, 6, 10 * 60 * 1000);
  if (!limited.ok) {
    return fail(429, "Too many enquiries from this connection. Please try again shortly.");
  }

  if (!(request.headers.get("content-type") || "").includes("multipart/form-data")) {
    return fail(415, "Unsupported request format.");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Could not read the submitted form. Attachments may be too large.");
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof form.get("website") === "string" && form.get("website")) {
    return fail(400, "Submission rejected.");
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("payload") ?? ""));
  } catch {
    return fail(400, "Invalid enquiry data.");
  }

  const parsed = parseEnquiry(raw);
  if (!parsed.ok) {
    return fail(422, "Please correct the highlighted fields.", { fieldErrors: parsed.errors });
  }

  const uploads = await validateUploads(
    form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0),
  );
  if (!uploads.ok) return fail(422, uploads.error, { fieldErrors: { files: uploads.error } });

  if (!storageConfigured()) {
    return fail(503, UNAVAILABLE, { code: "STORAGE_UNAVAILABLE" });
  }

  let saved: Awaited<ReturnType<typeof createEnquiry>>;
  try {
    saved = await createEnquiry(parsed.data, uploads.files);
  } catch (error) {
    console.error("[POST /api/enquiries]", error);
    return fail(503, UNAVAILABLE, { code: "STORAGE_UNAVAILABLE" });
  }

  after(async () => {
    await notifyEnquiry({ reference: saved.reference, payload: parsed.data, files: uploads.files });
    try {
      const erpReference = await pushEnquiryToErp({
        reference: saved.reference,
        type: parsed.data.type,
        customer: parsed.data.contact,
        services: parsed.data.services,
        processing: parsed.data.processing,
        material: parsed.data.material,
        notes: parsed.data.notes,
        attachments: uploads.files.map(({ fileName, mimeType, size }) => ({ fileName, mimeType, size })),
        createdAt: saved.createdAt.toISOString(),
      });
      if (erpReference) {
        await prisma.enquiry.update({
          where: { id: saved.id },
          data: { erpReference, erpSyncedAt: new Date() },
        });
      }
    } catch (error) {
      console.error("[ERP push]", saved.reference, error);
    }
  });

  return NextResponse.json(
    { success: true, reference: saved.reference, createdAt: saved.createdAt },
    { status: 201 },
  );
}
