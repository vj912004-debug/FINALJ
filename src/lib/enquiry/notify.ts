import { company } from "@/data/site";
import { rfqServices } from "@/lib/enquiry/config";
import type { EnquiryPayload } from "@/lib/enquiry/validation";
import type { ValidatedFile } from "@/lib/enquiry/files";

type Saved = { reference: string; payload: EnquiryPayload; files: ValidatedFile[] };

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function summaryRows({ reference, payload }: Saved): [string, string][] {
  const { material: m, contact: c } = payload;
  const services = payload.services
    .map((id) => rfqServices.find((s) => s.id === id)?.label ?? id)
    .join(", ");
  const rows: [string, string][] = [
    ["Reference", reference],
    ["Type", payload.type === "STOCK" ? "Stock / availability enquiry" : "Request for quotation"],
    ["Company", c.companyName],
    ["Contact", c.contactName],
    ["Phone", c.phone],
    ["Email", c.email],
    ["GST", c.gstNumber],
    ["Delivery location", c.deliveryLocation],
    ["Required by", c.requiredBy],
    ["Services", services],
    ["Processing", payload.processing.join(", ")],
    ["Category", m.category],
    ["Grade", m.grade],
    ["Thickness (mm)", m.thickness],
    ["Length (mm)", m.length],
    ["Width (mm)", m.width],
    ["Quantity", m.quantity],
    ["UT level", m.utLevel],
    ["Notes", payload.notes],
  ];
  return rows.filter(([, v]) => Boolean(v));
}

function table(rows: [string, string][]) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #d9d9d9;background:#f7f7f5;color:#0b2348;font-weight:bold">${esc(k)}</td><td style="border:1px solid #d9d9d9">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

async function sendResend(body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL);
}

/** Runs after the response is sent; failures are logged, never shown to the customer as a failed enquiry. */
export async function notifyEnquiry(saved: Saved) {
  const rows = summaryRows(saved);
  const tasks: Promise<unknown>[] = [];

  if (emailConfigured()) {
    const from = process.env.ENQUIRY_FROM_EMAIL!;
    const to = (process.env.SALES_NOTIFY_EMAIL || company.email)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    tasks.push(
      sendResend({
        from,
        to,
        reply_to: saved.payload.contact.email,
        subject: `New ${saved.payload.type === "STOCK" ? "stock enquiry" : "RFQ"} ${saved.reference} — ${saved.payload.contact.companyName}`,
        html: `<h2 style="font-family:Arial,sans-serif;color:#0b2348">New website enquiry</h2>${table(rows)}`,
        attachments: saved.files.map((f) => ({
          filename: f.fileName,
          content: f.data.toString("base64"),
        })),
      }),
    );

    if (process.env.SEND_CUSTOMER_ACK === "true") {
      tasks.push(
        sendResend({
          from,
          to: [saved.payload.contact.email],
          reply_to: company.email,
          subject: `We received your enquiry ${saved.reference} — ${company.name}`,
          html: `<div style="font-family:Arial,sans-serif;color:#111">
<p>Dear ${esc(saved.payload.contact.contactName)},</p>
<p>Thank you for your enquiry. Your reference number is <strong style="color:#f47c20">${esc(saved.reference)}</strong>. Our sales team will review your requirement and respond shortly.</p>
${table(rows.filter(([k]) => !["Phone", "Email", "GST"].includes(k)))}
<p style="margin-top:16px">${esc(company.name)}<br/>${esc(company.address)}<br/>${esc(company.email)}</p>
</div>`,
        }),
      );
    }
  }

  if (process.env.SALES_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.SALES_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: saved.reference,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        }),
        signal: AbortSignal.timeout(8_000),
      }),
    );
  }

  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === "rejected") console.error("[enquiry notify]", saved.reference, r.reason);
  }
}
