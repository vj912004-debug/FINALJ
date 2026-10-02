import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { REFERENCE_PATTERN, rfqServices } from "@/lib/enquiry/config";
import { storageConfigured } from "@/lib/enquiry/store";
import { fetchErpStatus } from "@/lib/erp";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const NOT_FOUND =
  "No enquiry matches that reference number and email. Check both and try again.";

export async function POST(request: Request) {
  const limited = rateLimit(`track:${clientIp(request)}`, 10, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: { reference?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const reference = typeof body.reference === "string" ? body.reference.trim().toUpperCase() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!REFERENCE_PATTERN.test(reference) || !email) {
    return NextResponse.json(
      { success: false, error: "Enter your reference (e.g. JP-261002-K7M3Q) and the email used on the enquiry." },
      { status: 400 },
    );
  }

  if (!storageConfigured()) {
    return NextResponse.json(
      { success: false, code: "TRACKING_UNAVAILABLE", error: "Online tracking is not available yet." },
      { status: 503 },
    );
  }

  try {
    let enquiry = await prisma.enquiry.findUnique({
      where: { reference },
      select: {
        id: true,
        reference: true,
        type: true,
        status: true,
        email: true,
        createdAt: true,
        services: true,
        details: true,
        events: { orderBy: { createdAt: "asc" }, select: { status: true, note: true, createdAt: true } },
      },
    });

    // Same response for "wrong reference" and "wrong email" so references can't be probed.
    if (!enquiry || enquiry.email !== email) {
      return NextResponse.json({ success: false, error: NOT_FOUND }, { status: 404 });
    }

    try {
      const erp = await fetchErpStatus(reference);
      if (erp && erp.status !== enquiry.status) {
        await prisma.enquiry.update({
          where: { id: enquiry.id },
          data: {
            status: erp.status,
            erpSyncedAt: new Date(),
            events: { create: { status: erp.status, note: erp.note } },
          },
        });
        enquiry = {
          ...enquiry,
          status: erp.status,
          events: [...enquiry.events, { status: erp.status, note: erp.note ?? null, createdAt: new Date() }],
        };
      }
    } catch (error) {
      console.error("[ERP status]", reference, error);
    }

    const details = (enquiry.details ?? {}) as {
      material?: { grade?: string; thickness?: string; quantity?: string };
    };
    const services = Array.isArray(enquiry.services) ? (enquiry.services as string[]) : [];

    return NextResponse.json({
      success: true,
      enquiry: {
        reference: enquiry.reference,
        type: enquiry.type,
        status: enquiry.status,
        createdAt: enquiry.createdAt,
        summary: {
          grade: details.material?.grade ?? "",
          thickness: details.material?.thickness ?? "",
          quantity: details.material?.quantity ?? "",
          services: services.map((id) => rfqServices.find((s) => s.id === id)?.label ?? id),
        },
        events: enquiry.events,
      },
    });
  } catch (error) {
    console.error("[POST /api/enquiries/track]", error);
    return NextResponse.json(
      { success: false, code: "TRACKING_UNAVAILABLE", error: "Online tracking is not available right now." },
      { status: 503 },
    );
  }
}
