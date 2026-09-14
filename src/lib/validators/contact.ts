export type ContactInquiryPayload = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  materialGrade: string;
  thickness: string;
  quantity: string;
  specifications?: string;
};

export function validateContactInquiry(
  body: unknown,
):
  | { ok: true; data: ContactInquiryPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = body as Record<string, unknown>;

  const required = [
    "fullName",
    "companyName",
    "email",
    "phone",
    "materialGrade",
    "thickness",
    "quantity",
  ] as const;

  for (const key of required) {
    if (typeof b[key] !== "string" || !b[key].trim()) {
      return { ok: false, error: `Missing or invalid field: ${key}.` };
    }
  }

  const email = (b.email as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email address." };
  }

  return {
    ok: true,
    data: {
      fullName: (b.fullName as string).trim(),
      companyName: (b.companyName as string).trim(),
      email,
      phone: (b.phone as string).trim(),
      materialGrade: (b.materialGrade as string).trim(),
      thickness: (b.thickness as string).trim(),
      quantity: (b.quantity as string).trim(),
      specifications:
        typeof b.specifications === "string"
          ? b.specifications.trim()
          : undefined,
    },
  };
}
