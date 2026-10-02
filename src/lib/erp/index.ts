import type { EnquiryPayload } from "@/lib/enquiry/validation";
import { isEnquiryStatus, type EnquiryStatusId } from "@/lib/enquiry/config";

/**
 * Server-side ERP adapter. Configure with ERP_API_URL and ERP_API_KEY.
 * Every function is a no-op when the ERP is not configured, so the website keeps working without it.
 *
 * Expected ERP endpoints (adjust paths in one place below when the ERP vendor confirms them):
 *   POST {ERP_API_URL}/enquiries            body: ErpEnquiry          -> { erpReference: string }
 *   GET  {ERP_API_URL}/enquiries/{reference}                          -> { status: EnquiryStatusId, note?: string }
 */
export type ErpEnquiry = {
  reference: string;
  type: EnquiryPayload["type"];
  customer: EnquiryPayload["contact"];
  services: string[];
  processing: string[];
  material: EnquiryPayload["material"];
  notes: string;
  attachments: { fileName: string; mimeType: string; size: number }[];
  createdAt: string;
};

export function isErpConfigured() {
  return Boolean(process.env.ERP_API_URL && process.env.ERP_API_KEY);
}

async function erpFetch(path: string, init?: RequestInit) {
  const base = process.env.ERP_API_URL!.replace(/\/+$/, "");
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.ERP_API_KEY}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`ERP ${init?.method ?? "GET"} ${path} -> ${res.status}`);
  return res.json() as Promise<unknown>;
}

export async function pushEnquiryToErp(enquiry: ErpEnquiry): Promise<string | null> {
  if (!isErpConfigured()) return null;
  const data = (await erpFetch("/enquiries", {
    method: "POST",
    body: JSON.stringify(enquiry),
  })) as { erpReference?: unknown };
  return typeof data.erpReference === "string" ? data.erpReference : null;
}

export async function fetchErpStatus(
  reference: string,
): Promise<{ status: EnquiryStatusId; note?: string } | null> {
  if (!isErpConfigured()) return null;
  const data = (await erpFetch(`/enquiries/${encodeURIComponent(reference)}`)) as {
    status?: unknown;
    note?: unknown;
  };
  if (!isEnquiryStatus(data.status)) return null;
  return { status: data.status, note: typeof data.note === "string" ? data.note : undefined };
}
