import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
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

    const files = form
      .getAll("files")
      .filter((f): f is File => typeof File !== "undefined" && f instanceof File);

    const savedNames: string[] = [];
    if (files.length) {
      const dir = path.join(process.cwd(), "uploads", "enquiries");
      await mkdir(dir, { recursive: true });
      for (const file of files.slice(0, 5)) {
        if (file.size > 10 * 1024 * 1024) continue;
        const safe = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const buf = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(dir, safe), buf);
        savedNames.push(safe);
      }
    }

    const specs = [get("specifications"), savedNames.length ? `Saved files: ${savedNames.join(", ")}` : ""]
      .filter(Boolean)
      .join("\n");

    return {
      fullName: get("fullName") || get("customerName"),
      companyName: get("companyName"),
      email: get("email"),
      phone: get("phone"),
      materialGrade: get("materialGrade") || get("grade"),
      thickness: get("thickness"),
      quantity: get("quantity"),
      specifications: specs,
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
      error instanceof Error && error.message.includes("Can't reach database")
        ? "Database unavailable. Please configure DATABASE_URL and run migrations."
        : "Unable to save inquiry. Please try again later.";
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
