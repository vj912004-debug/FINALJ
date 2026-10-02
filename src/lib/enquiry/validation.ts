import { processingOptions, rfqServices, utLevels } from "@/lib/enquiry/config";

export type MaterialLine = {
  category: string;
  grade: string;
  thickness: string;
  length: string;
  width: string;
  quantity: string;
  utLevel: string;
};

export type ContactDetails = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  gstNumber: string;
  deliveryLocation: string;
  requiredBy: string;
};

export type EnquiryPayload = {
  type: "RFQ" | "STOCK";
  services: string[];
  processing: string[];
  material: MaterialLine;
  contact: ContactDetails;
  notes: string;
};

export type FieldErrors = Partial<Record<string, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{8,15}$/;
const GST = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const NUMBERISH = /^\d+(\.\d+)?$/;

const limits = { short: 120, long: 2000 } as const;

const serviceIds: readonly string[] = rfqServices.map((s) => s.id);
const processingSet: readonly string[] = processingOptions;
const utSet: readonly string[] = utLevels;

function str(v: unknown, max: number = limits.short) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function strList(v: unknown, allowed: readonly string[]) {
  if (!Array.isArray(v)) return [];
  return Array.from(new Set(v.filter((x): x is string => typeof x === "string" && allowed.includes(x))));
}

export function validateMaterial(m: MaterialLine, type: EnquiryPayload["type"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!m.grade) errors["material.grade"] = "Select or type a steel grade.";
  if (!m.thickness) errors["material.thickness"] = "Enter thickness in mm.";
  else if (!NUMBERISH.test(m.thickness) || Number(m.thickness) <= 0 || Number(m.thickness) > 500) {
    errors["material.thickness"] = "Thickness must be a number between 0 and 500 mm.";
  }
  for (const key of ["length", "width"] as const) {
    if (m[key] && (!NUMBERISH.test(m[key]) || Number(m[key]) <= 0 || Number(m[key]) > 50000)) {
      errors[`material.${key}`] = "Enter a valid size in mm.";
    }
  }
  if (!m.quantity) errors["material.quantity"] = "Enter quantity (Nos. or MT).";
  if (type === "STOCK" && !m.category) errors["material.category"] = "Select a material category.";
  return errors;
}

export function validateContact(c: ContactDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!c.companyName) errors["contact.companyName"] = "Company name is required.";
  if (!c.contactName) errors["contact.contactName"] = "Contact person is required.";
  if (!c.phone) errors["contact.phone"] = "Phone number is required.";
  else if (!PHONE.test(c.phone)) errors["contact.phone"] = "Enter a valid phone number.";
  if (!c.email) errors["contact.email"] = "Email is required.";
  else if (!EMAIL.test(c.email)) errors["contact.email"] = "Enter a valid email address.";
  if (c.gstNumber && !GST.test(c.gstNumber.toUpperCase())) {
    errors["contact.gstNumber"] = "GST number should be 15 characters, e.g. 24ABCDE1234F1Z5.";
  }
  if (!c.deliveryLocation) errors["contact.deliveryLocation"] = "Delivery location is required.";
  if (c.requiredBy) {
    const d = new Date(`${c.requiredBy}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) errors["contact.requiredBy"] = "Enter a valid date.";
    else if (d < today) errors["contact.requiredBy"] = "Delivery date cannot be in the past.";
  }
  return errors;
}

export function validateServices(p: Pick<EnquiryPayload, "type" | "services">): FieldErrors {
  if (p.type === "RFQ" && p.services.length === 0) {
    return { services: "Select at least one service." };
  }
  return {};
}

/** Normalises untrusted input into an EnquiryPayload and validates it. */
export function parseEnquiry(raw: unknown):
  | { ok: true; data: EnquiryPayload }
  | { ok: false; errors: FieldErrors } {
  if (!raw || typeof raw !== "object") return { ok: false, errors: { form: "Invalid request." } };
  const r = raw as Record<string, unknown>;
  const m = (r.material ?? {}) as Record<string, unknown>;
  const c = (r.contact ?? {}) as Record<string, unknown>;

  const type = r.type === "STOCK" ? "STOCK" : "RFQ";
  const utLevel = str(m.utLevel);

  const data: EnquiryPayload = {
    type,
    services: strList(r.services, serviceIds),
    processing: strList(r.processing, processingSet),
    material: {
      category: str(m.category),
      grade: str(m.grade),
      thickness: str(m.thickness, 12),
      length: str(m.length, 12),
      width: str(m.width, 12),
      quantity: str(m.quantity, 40),
      utLevel: utSet.includes(utLevel) ? utLevel : "",
    },
    contact: {
      companyName: str(c.companyName),
      contactName: str(c.contactName),
      phone: str(c.phone, 20),
      email: str(c.email).toLowerCase(),
      gstNumber: str(c.gstNumber, 15).toUpperCase(),
      deliveryLocation: str(c.deliveryLocation),
      requiredBy: str(c.requiredBy, 10),
    },
    notes: str(r.notes, limits.long),
  };

  const errors = {
    ...validateServices(data),
    ...validateMaterial(data.material, type),
    ...validateContact(data.contact),
  };
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data };
}
