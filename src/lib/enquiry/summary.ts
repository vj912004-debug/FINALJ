import { rfqServices } from "@/lib/enquiry/config";
import type { EnquiryPayload } from "@/lib/enquiry/validation";

/** Plain-text version of an enquiry, used for WhatsApp / email fallbacks. */
export function enquiryText(p: EnquiryPayload, fileNames: string[] = []) {
  const { material: m, contact: c } = p;
  const lines = [
    p.type === "STOCK"
      ? "Hello Jagdamba Procut, please check availability:"
      : "Hello Jagdamba Procut, request for quotation:",
    p.services.length
      ? `Services: ${p.services.map((id) => rfqServices.find((s) => s.id === id)?.label ?? id).join(", ")}`
      : "",
    m.category ? `Category: ${m.category}` : "",
    `Grade: ${m.grade || "—"}`,
    `Thickness: ${m.thickness ? `${m.thickness} mm` : "—"}`,
    m.length || m.width ? `Size: ${m.length || "—"} × ${m.width || "—"} mm (L × W)` : "",
    `Quantity: ${m.quantity || "—"}`,
    m.utLevel ? `UT: ${m.utLevel}` : "",
    p.processing.length ? `Processing: ${p.processing.join(", ")}` : "",
    `Delivery: ${c.deliveryLocation || "—"}${c.requiredBy ? ` by ${c.requiredBy}` : ""}`,
    `Company: ${c.companyName}`,
    `Contact: ${c.contactName} · ${c.phone} · ${c.email}`,
    c.gstNumber ? `GST: ${c.gstNumber}` : "",
    p.notes ? `Notes: ${p.notes}` : "",
    fileNames.length ? `Drawings (will share separately): ${fileNames.join(", ")}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}
