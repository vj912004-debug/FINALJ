import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { newEnquiryReference } from "@/lib/enquiry/reference";
import type { EnquiryPayload } from "@/lib/enquiry/validation";
import type { ValidatedFile } from "@/lib/enquiry/files";

export function storageConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export async function createEnquiry(payload: EnquiryPayload, files: ValidatedFile[]) {
  const { contact: c } = payload;
  for (let attempt = 0; attempt < 4; attempt++) {
    const reference = newEnquiryReference();
    try {
      return await prisma.enquiry.create({
        data: {
          reference,
          type: payload.type,
          companyName: c.companyName,
          contactName: c.contactName,
          email: c.email,
          phone: c.phone,
          gstNumber: c.gstNumber || null,
          deliveryLocation: c.deliveryLocation || null,
          requiredBy: c.requiredBy ? new Date(`${c.requiredBy}T00:00:00Z`) : null,
          services: payload.services,
          details: { material: payload.material, processing: payload.processing },
          notes: payload.notes || null,
          attachments: {
            create: files.map((f) => ({
              fileName: f.fileName,
              mimeType: f.mimeType,
              size: f.size,
              data: new Uint8Array(f.data),
            })),
          },
          events: { create: { status: "RECEIVED" } },
        },
        select: { id: true, reference: true, createdAt: true },
      });
    } catch (error) {
      const duplicate =
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
      if (!duplicate) throw error;
    }
  }
  throw new Error("Could not allocate a unique enquiry reference.");
}
