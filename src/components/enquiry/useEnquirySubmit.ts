"use client";

import { useState } from "react";
import type { EnquiryPayload, FieldErrors } from "@/lib/enquiry/validation";

type Result =
  | { kind: "idle" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string; fallback: boolean; fieldErrors?: FieldErrors };

export function useEnquirySubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>({ kind: "idle" });

  async function submit(payload: EnquiryPayload, files: File[], honeypot: string): Promise<Result> {
    setSubmitting(true);
    setResult({ kind: "idle" });
    let next: Result;
    try {
      const fd = new FormData();
      fd.append("payload", JSON.stringify(payload));
      fd.append("website", honeypot);
      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/enquiries", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        reference?: string;
        error?: string;
        code?: string;
        fieldErrors?: FieldErrors;
      };

      next =
        res.ok && data.success && data.reference
          ? { kind: "success", reference: data.reference }
          : {
              kind: "error",
              message: data.error || "The enquiry could not be submitted.",
              fallback: res.status >= 500 || data.code === "STORAGE_UNAVAILABLE",
              fieldErrors: data.fieldErrors,
            };
    } catch {
      next = { kind: "error", message: "Network error — the enquiry was not sent.", fallback: true };
    }
    setResult(next);
    setSubmitting(false);
    return next;
  }

  return { submitting, result, submit, reset: () => setResult({ kind: "idle" }) };
}
