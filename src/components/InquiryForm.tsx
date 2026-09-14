"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { indianMills, rfqFields, supportedGrades } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  materialGrade: string;
  thickness: string;
  width: string;
  length: string;
  quantity: string;
  requiredMake: string;
  utLevel: string;
  deliveryLocation: string;
  drawingNotes: string;
  specifications: string;
};

const initial: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  materialGrade: "",
  thickness: "",
  width: "",
  length: "",
  quantity: "",
  requiredMake: "",
  utLevel: "",
  deliveryLocation: "",
  drawingNotes: "",
  specifications: "",
};

const utOptions = [
  "ASTM A578 Level A",
  "ASTM A578 Level B",
  "ASTM A578 Level C",
  "EN 10160 S1 / E1",
  "EN 10160 S2 / E2",
  "EN 10160 S2 / E3",
  "Other / Specify in notes",
  "Not required",
];

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildSpecifications() {
    const parts = [
      form.width ? `Width: ${form.width}` : null,
      form.length ? `Length: ${form.length}` : null,
      form.requiredMake ? `Required Make: ${form.requiredMake}` : null,
      form.utLevel ? `Required UT Level: ${form.utLevel}` : null,
      form.deliveryLocation
        ? `Delivery Location: ${form.deliveryLocation}`
        : null,
      form.drawingNotes
        ? `Drawing / DXF / PDF notes: ${form.drawingNotes}`
        : null,
      form.specifications ? `Additional: ${form.specifications}` : null,
    ].filter(Boolean);

    return parts.join("\n");
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
          fullName: form.fullName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          materialGrade: form.materialGrade,
          thickness: form.thickness,
          quantity: form.quantity,
          specifications: buildSpecifications(),
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
        err instanceof Error
          ? err.message
          : "Unable to submit inquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Quotation
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              Send Us Your Requirement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel">
              Our team will review your requirement and provide material
              availability, processing details and quotation.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink">
              {rfqFields.map((field) => (
                <li key={field} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {field}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-8">
            {submitted ? (
              <div
                className="flex flex-col items-start border border-gold/40 bg-surface p-8"
                role="status"
              >
                <CheckCircle2 className="h-10 w-10 text-gold-deep" aria-hidden />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-navy">
                  Inquiry Received
                </h3>
                <p className="mt-2 max-w-lg text-steel">
                  Thank you, {form.fullName || "there"}. We have logged your
                  quotation request
                  {form.companyName ? ` for ${form.companyName}` : ""}. Our team
                  will contact you shortly at {form.email || "your email"} /
                  {form.phone ? ` ${form.phone}` : " your phone"}.
                </p>
                <button
                  type="button"
                  className="mt-6 border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initial);
                    setError(null);
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="border border-line bg-surface p-6 sm:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      required
                      name="fullName"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Company Name" required>
                    <input
                      required
                      name="companyName"
                      autoComplete="organization"
                      value={form.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="Company / firm"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="name@company.com"
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                  <Field label="Grade" required>
                    <select
                      required
                      name="materialGrade"
                      value={form.materialGrade}
                      onChange={(e) => update("materialGrade", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                    >
                      <option value="" disabled>
                        Select grade
                      </option>
                      {supportedGrades.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                      <option value="Other / Custom">Other / Custom</option>
                    </select>
                  </Field>
                  <Field label="Thickness" required>
                    <input
                      required
                      name="thickness"
                      inputMode="decimal"
                      value={form.thickness}
                      onChange={(e) => update("thickness", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="e.g. 16 mm"
                    />
                  </Field>
                  <Field label="Width">
                    <input
                      name="width"
                      value={form.width}
                      onChange={(e) => update("width", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="e.g. 2000 mm"
                    />
                  </Field>
                  <Field label="Length">
                    <input
                      name="length"
                      value={form.length}
                      onChange={(e) => update("length", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="e.g. 6000 mm"
                    />
                  </Field>
                  <Field label="Quantity" required>
                    <input
                      required
                      name="quantity"
                      value={form.quantity}
                      onChange={(e) => update("quantity", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="e.g. 5 MT or 120 pcs"
                    />
                  </Field>
                  <Field label="Required Make">
                    <select
                      name="requiredMake"
                      value={form.requiredMake}
                      onChange={(e) => update("requiredMake", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                    >
                      <option value="">Any / as available</option>
                      {indianMills.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="Imported / China-origin">
                        Imported / China-origin
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Required UT Level">
                    <select
                      name="utLevel"
                      value={form.utLevel}
                      onChange={(e) => update("utLevel", e.target.value)}
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                    >
                      <option value="">Select UT level</option>
                      {utOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Delivery Location">
                    <input
                      name="deliveryLocation"
                      value={form.deliveryLocation}
                      onChange={(e) =>
                        update("deliveryLocation", e.target.value)
                      }
                      className="w-full border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="City / plant address"
                    />
                  </Field>
                  <Field
                    label="Drawing / DXF / PDF Notes"
                    className="sm:col-span-2"
                  >
                    <textarea
                      name="drawingNotes"
                      rows={3}
                      value={form.drawingNotes}
                      onChange={(e) => update("drawingNotes", e.target.value)}
                      className="w-full resize-y border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="Drawing refs, DXF/PDF file names, nest size, special notes…"
                    />
                  </Field>
                  <Field
                    label="Additional Specifications"
                    className="sm:col-span-2"
                  >
                    <textarea
                      name="specifications"
                      rows={3}
                      value={form.specifications}
                      onChange={(e) => update("specifications", e.target.value)}
                      className="w-full resize-y border border-line bg-background px-3.5 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold"
                      placeholder="Processing needs, inspection, packaging…"
                    />
                  </Field>
                </div>

                {error ? (
                  <p className="mt-4 text-sm text-brand" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-mid disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      Submitting…
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    </>
                  ) : (
                    <>
                      Submit Requirement
                      <Send className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
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
