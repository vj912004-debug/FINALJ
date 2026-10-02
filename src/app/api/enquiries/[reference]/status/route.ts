import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { REFERENCE_PATTERN, isEnquiryStatus } from "@/lib/enquiry/config";

export const runtime = "nodejs";

function authorised(request: Request) {
  const token = process.env.ENQUIRY_ADMIN_TOKEN;
  if (!token || token.length < 24) return false;
  const header = request.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** For the sales team / ERP: PATCH with `Authorization: Bearer <ENQUIRY_ADMIN_TOKEN>` and `{ status, note? }`. */
export async function PATCH(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  if (!authorised(request)) {
    return NextResponse.json({ success: false, error: "Unauthorised." }, { status: 401 });
  }

  const { reference: rawRef } = await params;
  const reference = rawRef.toUpperCase();
  if (!REFERENCE_PATTERN.test(reference)) {
    return NextResponse.json({ success: false, error: "Invalid reference." }, { status: 400 });
  }

  let body: { status?: unknown; note?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON." }, { status: 400 });
  }
  if (!isEnquiryStatus(body.status)) {
    return NextResponse.json({ success: false, error: "Unknown status." }, { status: 400 });
  }
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : undefined;

  try {
    const updated = await prisma.enquiry.update({
      where: { reference },
      data: { status: body.status, events: { create: { status: body.status, note } } },
      select: { reference: true, status: true, updatedAt: true },
    });
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error("[PATCH enquiry status]", reference, error);
    return NextResponse.json({ success: false, error: "Enquiry not found or storage unavailable." }, { status: 404 });
  }
}
