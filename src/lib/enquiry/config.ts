import { gradeCategories } from "@/data/site";

export const rfqServices = [
  {
    id: "plate-supply",
    label: "Steel Plate Supply",
    description: "Plates from stock or indent, cut to size where required.",
  },
  {
    id: "cnc-profile",
    label: "CNC Profile Cutting",
    description: "Circles, rings, flanges and profiles up to 350 mm thickness.",
  },
  {
    id: "laser",
    label: "Laser Cutting",
    description: "12 kW laser, 1 to 35 / 40 mm depending on material and grade.",
  },
  {
    id: "cnc-drilling",
    label: "CNC Drilling",
    description: "Hole patterns on a 2500 × 6000 mm bed, holes up to 60 mm.",
  },
  {
    id: "combined",
    label: "Combined Processing",
    description: "Supply plus cutting, drilling and UT as one job.",
  },
] as const;

export type RfqServiceId = (typeof rfqServices)[number]["id"];

export const processingOptions = [
  "CNC Profile Cutting",
  "Laser Cutting",
  "CNC Drilling",
  "Oxy-Fuel / Heavy Plate Cutting",
  "Ultrasonic Testing (UT)",
  "Cut to Size",
  "Transport / Delivery",
] as const;

export const utLevels = [
  "ASTM A578 Level A",
  "ASTM A578 Level B",
  "ASTM A578 Level C",
  "EN 10160 S1 / E1",
  "EN 10160 S2 / E2",
  "EN 10160 S2 / E3",
  "Other / as per specification",
] as const;

export const materialCategories = gradeCategories.map((c) => ({
  id: c.id,
  name: c.name,
  grades: c.grades as readonly string[],
}));

export const allGrades = materialCategories.flatMap((c) => c.grades);

export const enquiryStatuses = [
  { id: "RECEIVED", label: "Enquiry Received" },
  { id: "UNDER_REVIEW", label: "Under Review" },
  { id: "QUOTATION_PREPARED", label: "Quotation Prepared" },
  { id: "QUOTATION_SENT", label: "Quotation Sent" },
  { id: "AWAITING_CONFIRMATION", label: "Awaiting Customer Confirmation" },
  { id: "ORDER_CONFIRMED", label: "Order Confirmed" },
  { id: "PROCESSING", label: "Processing" },
  { id: "DISPATCHED", label: "Dispatched" },
  { id: "COMPLETED", label: "Completed" },
] as const;

export type EnquiryStatusId = (typeof enquiryStatuses)[number]["id"];

export function isEnquiryStatus(value: unknown): value is EnquiryStatusId {
  return enquiryStatuses.some((s) => s.id === value);
}

/** Vercel functions reject request bodies above ~4.5 MB, so uploads stay under that. */
export const uploadLimits = {
  maxFiles: 3,
  maxFileBytes: 4 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024,
  extensions: ["pdf", "dxf", "dwg", "jpg", "jpeg", "png"],
  accept: ".pdf,.dxf,.dwg,.jpg,.jpeg,.png",
} as const;

export const REFERENCE_PATTERN = /^JP-\d{6}-[A-HJ-NP-Z2-9]{5}$/;

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileExtension(name: string) {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** Client-side pre-check; the server re-validates content signatures. */
export function checkFiles(files: readonly File[]): string | null {
  if (files.length > uploadLimits.maxFiles) {
    return `Attach up to ${uploadLimits.maxFiles} files.`;
  }
  let total = 0;
  for (const file of files) {
    const ext = fileExtension(file.name);
    if (!(uploadLimits.extensions as readonly string[]).includes(ext)) {
      return `${file.name}: only PDF, DXF, DWG, JPG and PNG files are accepted.`;
    }
    if (file.size === 0) return `${file.name} is empty.`;
    if (file.size > uploadLimits.maxFileBytes) {
      return `${file.name} is larger than ${formatBytes(uploadLimits.maxFileBytes)}.`;
    }
    total += file.size;
  }
  if (total > uploadLimits.maxTotalBytes) {
    return `Total upload size must be under ${formatBytes(uploadLimits.maxTotalBytes)}. Send larger drawings on WhatsApp or email.`;
  }
  return null;
}
