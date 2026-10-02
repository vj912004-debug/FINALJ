"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, Lock, Search } from "lucide-react";
import { company } from "@/data/site";
import { REFERENCE_PATTERN, enquiryStatuses, type EnquiryStatusId } from "@/lib/enquiry/config";
import { Field, inputClass } from "@/components/enquiry/fields";

type Tracked = {
  reference: string;
  type: "RFQ" | "STOCK";
  status: EnquiryStatusId;
  createdAt: string;
  summary: { grade: string; thickness: string; quantity: string; services: string[] };
  events: { status: EnquiryStatusId; note: string | null; createdAt: string }[];
};

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export default function EnquiryTracker({ initialReference = "" }: { initialReference?: string }) {
  const [reference, setReference] = useState(initialReference.toUpperCase());
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; unavailable: boolean } | null>(null);
  const [data, setData] = useState<Tracked | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ref = reference.trim().toUpperCase();
    if (!REFERENCE_PATTERN.test(ref)) {
      setError({ message: "Reference numbers look like JP-261002-K7M3Q.", unavailable: false });
      return;
    }
    if (!email.trim()) {
      setError({ message: "Enter the email address used on the enquiry.", unavailable: false });
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/enquiries/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref, email }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        code?: string;
        enquiry?: Tracked;
      };
      if (res.ok && body.success && body.enquiry) setData(body.enquiry);
      else
        setError({
          message: body.error || "Could not look up this enquiry.",
          unavailable: body.code === "TRACKING_UNAVAILABLE",
        });
    } catch {
      setError({ message: "Network error. Please try again.", unavailable: false });
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = data ? enquiryStatuses.findIndex((s) => s.id === data.status) : -1;
  const reachedAt = (id: EnquiryStatusId) =>
    data?.events.filter((ev) => ev.status === id).at(-1)?.createdAt;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form
        onSubmit={onSubmit}
        noValidate
        className="h-fit border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(11,35,72,0.45)] sm:p-6"
      >
        <div className="flex items-center gap-2 text-navy">
          <Lock className="h-4 w-4 text-brand" aria-hidden />
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">Verify your enquiry</h2>
        </div>
        <p className="mt-2 text-sm text-steel">
          Enter your reference number and the email address used when you submitted. Both must match.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Reference number" htmlFor="trk-ref">
            <input
              id="trk-ref"
              className={`${inputClass} font-semibold uppercase tracking-wider`}
              value={reference}
              onChange={(e) => setReference(e.target.value.toUpperCase())}
              placeholder="JP-261002-K7M3Q"
              autoComplete="off"
            />
          </Field>
          <Field label="Email" htmlFor="trk-email">
            <input
              id="trk-email"
              type="email"
              autoComplete="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-70">
          {loading ? (
            <>
              Checking <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            </>
          ) : (
            <>
              <Search className="h-4 w-4" aria-hidden /> Track enquiry
            </>
          )}
        </button>
        {error ? (
          <div role="alert" className="mt-4 border border-brand/30 bg-brand/5 p-3 text-sm text-steel">
            <p className="font-semibold text-navy">{error.message}</p>
            {error.unavailable ? (
              <p className="mt-1">
                Call {company.inquiryPhone} or email{" "}
                <a className="font-semibold text-brand underline" href={`mailto:${company.email}`}>
                  {company.email}
                </a>{" "}
                with your reference for a status update.
              </p>
            ) : null}
          </div>
        ) : null}
      </form>

      <div className="min-w-0 border border-line bg-white p-5 sm:p-8">
        {data ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                  {data.type === "STOCK" ? "Availability request" : "Quotation request"}
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-wider text-navy sm:text-3xl">
                  {data.reference}
                </p>
                <p className="mt-1 text-sm text-steel">Submitted {dateFmt.format(new Date(data.createdAt))}</p>
              </div>
              <span className="inline-flex items-center gap-2 bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {enquiryStatuses[currentIndex]?.label}
              </span>
            </div>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["Services", data.summary.services.join(", ")],
                ["Grade", data.summary.grade],
                ["Thickness", data.summary.thickness && `${data.summary.thickness} mm`],
                ["Quantity", data.summary.quantity],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="border border-line bg-background px-3 py-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-steel">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{v}</dd>
                  </div>
                ))}
            </dl>
            <ol className="mt-8 space-y-0" aria-label="Enquiry status timeline">
              {enquiryStatuses.map((s, i) => {
                const done = i < currentIndex;
                const current = i === currentIndex;
                const at = reachedAt(s.id);
                const note = data.events.filter((ev) => ev.status === s.id).at(-1)?.note;
                return (
                  <li key={s.id} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < enquiryStatuses.length - 1 ? (
                      <span
                        className={`absolute left-[13px] top-7 h-[calc(100%-1.5rem)] w-0.5 ${done ? "bg-navy" : "bg-line"}`}
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold ${
                        done ? "bg-navy text-white" : current ? "bg-brand text-white ring-4 ring-brand/20" : "border border-line bg-white text-steel"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className={`text-sm font-semibold ${current ? "text-brand" : done ? "text-navy" : "text-steel"}`}>
                        {s.label}
                        {current ? <span className="sr-only"> (current status)</span> : null}
                      </p>
                      {at && (done || current) ? (
                        <p className="text-xs text-steel">{dateFmt.format(new Date(at))}</p>
                      ) : null}
                      {note && (done || current) ? <p className="mt-1 text-sm text-ink">{note}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
            <Search className="h-10 w-10 text-line" aria-hidden />
            <p className="mt-3 font-display text-lg font-bold uppercase text-navy">Status timeline</p>
            <p className="mt-1 max-w-sm text-sm text-steel">
              Your enquiry status appears here after verification. No reference yet?{" "}
              <Link href="/quote" className="font-semibold text-brand underline">
                Request a quote
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
