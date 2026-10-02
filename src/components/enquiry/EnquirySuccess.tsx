"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check, Search } from "lucide-react";

export default function EnquirySuccess({
  reference,
  title,
  onReset,
  resetLabel,
}: {
  reference: string;
  title: string;
  onReset: () => void;
  resetLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      role="status"
      className="border border-brand/40 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(11,35,72,0.45)] sm:p-10"
    >
      <CheckCircle2 className="h-12 w-12 text-brand" aria-hidden />
      <h3 className="mt-4 font-display text-2xl font-bold uppercase text-navy sm:text-3xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel sm:text-base">
        Your enquiry has been saved and sent to our sales team. Keep this reference number for
        follow-up calls and online tracking.
      </p>
      <div className="mt-6 inline-flex flex-wrap items-center gap-3 border border-line bg-background px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">Reference</span>
        <span className="font-display text-2xl font-bold tracking-wider text-navy">{reference}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(reference).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            });
          }}
          className="inline-flex min-h-9 items-center gap-1.5 border border-line bg-white px-2.5 text-xs font-semibold uppercase tracking-wide text-navy hover:border-brand hover:text-brand"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/track?ref=${encodeURIComponent(reference)}`} className="btn btn-navy">
          <Search className="h-4 w-4" aria-hidden />
          Track this enquiry
        </Link>
        <button type="button" onClick={onReset} className="btn btn-outline">
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
