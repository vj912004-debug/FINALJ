"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, PackageSearch, Send } from "lucide-react";
import { indianMills, supportedGrades } from "@/data/site";
import { FadeIn, RiseIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";
import AnimatedButton from "@/components/ui/animated-button";

const inputClass =
  "w-full border border-line bg-background px-3.5 py-3 text-base text-navy outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(241,90,36,0.14)] sm:py-2.5 sm:text-sm";

type FormState = {
  companyName: string;
  customerName: string;
  phone: string;
  email: string;
  grade: string;
  thickness: string;
  width: string;
  length: string;
  make: string;
  quantity: string;
};

const initial: FormState = {
  companyName: "",
  customerName: "",
  phone: "",
  email: "",
  grade: "",
  thickness: "",
  width: "",
  length: "",
  make: "",
  quantity: "",
};

const flow = [
  "Grade",
  "Thickness",
  "Width",
  "Length",
  "Make",
  "Quantity",
] as const;

export default function StockEnquiryForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.customerName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          materialGrade: form.grade,
          thickness: form.thickness,
          quantity: form.quantity,
          specifications: [
            "Enquiry type: STOCK ENQUIRY",
            `Width: ${form.width || "—"}`,
            `Length: ${form.length || "—"}`,
            `Make: ${form.make || "—"}`,
          ].join("\n"),
        }),
      });
      const payload = (await res.json()) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || !payload.success) {
        throw new Error(payload.error || "Submission failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit stock enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-atmosphere steel-mesh bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RiseIn>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Stock Enquiry
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy"
          >
            Check Material Availability
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-base text-steel">
            Enquire by Grade → Thickness → Width → Length → Make → Quantity. We
            do not publish internal stock quantities online — your requirement
            goes directly to our sales team.
          </p>
        </RiseIn>

        <StaggerChildren className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {flow.map((item, i) => (
            <StaggerItem key={item}>
              <div className="border border-line bg-surface px-2 py-3 text-center">
                <PackageSearch className="mx-auto h-3.5 w-3.5 text-brand sm:hidden" />
                <p className="font-display text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy sm:text-[11px]">
                  {item}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {submitted ? (
          <FadeIn className="mt-10 border border-brand/40 bg-surface p-8 text-center shadow-[0_20px_50px_-36px_rgba(1,77,110,0.35)] sm:text-left">
            <div role="status">
              <CheckCircle2 className="mx-auto h-12 w-12 text-brand sm:mx-0" />
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-navy">
                Stock Enquiry Received
              </h3>
              <p className="mt-2 text-steel">
                Our sales team will confirm availability shortly.
              </p>
              <button
                type="button"
                className="mt-6 border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initial);
                }}
              >
                Send Another Enquiry
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="teaser-shine mt-8 grid gap-5 border border-line bg-surface p-6 shadow-[0_24px_60px_-40px_rgba(1,77,110,0.4)] sm:grid-cols-2 sm:p-8"
            >
              <Field label="Company Name" required className="sm:col-span-2">
                <input
                  required
                  className={inputClass}
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </Field>
              <Field label="Customer Name" required>
                <input
                  required
                  className={inputClass}
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                />
              </Field>
              <Field label="Mobile" required>
                <input
                  required
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>
              <Field label="Email" required className="sm:col-span-2">
                <input
                  required
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
              <Field label="Grade" required>
                <select
                  required
                  className={inputClass}
                  value={form.grade}
                  onChange={(e) => update("grade", e.target.value)}
                >
                  <option value="" disabled>
                    Select grade
                  </option>
                  {supportedGrades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Thickness" required>
                <input
                  required
                  className={inputClass}
                  value={form.thickness}
                  onChange={(e) => update("thickness", e.target.value)}
                  placeholder="mm"
                />
              </Field>
              <Field label="Width">
                <input
                  className={inputClass}
                  value={form.width}
                  onChange={(e) => update("width", e.target.value)}
                  placeholder="mm"
                />
              </Field>
              <Field label="Length">
                <input
                  className={inputClass}
                  value={form.length}
                  onChange={(e) => update("length", e.target.value)}
                  placeholder="mm"
                />
              </Field>
              <Field label="Make">
                <select
                  className={inputClass}
                  value={form.make}
                  onChange={(e) => update("make", e.target.value)}
                >
                  <option value="">Any</option>
                  {indianMills.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                  <option value="Imported / China-Origin">
                    Imported / China-Origin
                  </option>
                </select>
              </Field>
              <Field label="Quantity" required>
                <input
                  required
                  className={inputClass}
                  value={form.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                />
              </Field>

              {error ? (
                <p className="sm:col-span-2 text-sm text-brand" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="sm:col-span-2">
                <AnimatedButton
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand brand-glow hover:bg-brand-deep"
                >
                  {submitting ? (
                    <>
                      Submitting…{" "}
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Stock Enquiry <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </AnimatedButton>
              </div>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-ink">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
