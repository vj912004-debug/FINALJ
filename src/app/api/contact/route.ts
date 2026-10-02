import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateContactInquiry } from "@/lib/validators/contact";

export const runtime = "nodejs";

async function parseBody(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const get = (key: string) => {
      const v = form.get(key);
      return typeof v === "string" ? v : "";
    };

    return {
      fullName: get("fullName") || get("customerName"),
      companyName: get("companyName"),
      email: get("email"),
      phone: get("phone"),
      materialGrade: get("materialGrade") || get("grade"),
      thickness: get("thickness"),
      quantity: get("quantity"),
      specifications: get("specifications"),
    };
  }

  return request.json();
}

export async function POST(request: Request) {
  try {
    const body = await parseBody(request);
    const parsed = validateContactInquiry(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 },
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        companyName: parsed.data.companyName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        materialGrade: parsed.data.materialGrade,
        thickness: parsed.data.thickness,
        quantity: parsed.data.quantity,
        specifications: parsed.data.specifications || null,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully.",
        data: inquiry,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/contact]", error);
    const message =
      "Unable to save the enquiry right now. Please send your requirement on WhatsApp or email.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    methods: ["POST"],
  });
}
