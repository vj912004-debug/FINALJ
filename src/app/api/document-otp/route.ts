import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email : "";
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  return NextResponse.json(
    {
      error:
        "Email OTP is not active on this website yet. Call +91 98249 17250 or WhatsApp the same number and our team will share the document.",
    },
    { status: 503 },
  );
}
