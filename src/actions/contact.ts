"use server";

import { prisma } from "@/lib/prisma";
import { validateContactInquiry } from "@/lib/validators/contact";
import type { ContactInquiryPayload } from "@/lib/validators/contact";

export type ContactActionResult =
  | { success: true; id: string }
  | { success: false; error: string };

/** Optional Server Action alternative to POST /api/contact */
export async function submitContactInquiry(
  input: ContactInquiryPayload,
): Promise<ContactActionResult> {
  const parsed = validateContactInquiry(input);
  if (!parsed.ok) {
    return { success: false, error: parsed.error };
  }

  try {
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
      select: { id: true },
    });

    return { success: true, id: inquiry.id };
  } catch (error) {
    console.error("[submitContactInquiry]", error);
    return {
      success: false,
      error: "Unable to save inquiry. Please try again later.",
    };
  }
}
