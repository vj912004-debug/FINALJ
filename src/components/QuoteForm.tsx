"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { CheckCircle2, FileUp, Loader2, Send } from "lucide-react";
import { indianMills, supportedGrades } from "@/data/site";
import { FadeIn, RiseIn } from "@/components/motion/Motion";
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
  make: string;
  thickness: string;
  width: string;
  length: string;
  quantity: string;
  approxWeight: string;
  utLevel: string;
  cuttingRequired: string;
  laserRequired: string;
  drillingRequired: string;
  deliveryLocation: string;
  remarks: string;
};

const initial: FormState = {
  companyName: "",
  customerName: "",
  phone: "",
  email: "",
  grade: "",
  make: "",
  thickness: "",
  width: "",
  length: "",
  quantity: "",
  approxWeight: "",
  utLevel: "",
  cuttingRequired: "No",
  laserRequired: "No",
  drillingRequired: "No",
  deliveryLocation: "",
  remarks: "",
};

const utOptions = [
  "ASTM A578 Level A",
  "ASTM A578 Level B",
  "ASTM A578 Level C",
  "EN 10160 S1 / E1",
  "EN 10160 S2 / E2",
  "EN 10160 S2 / E3",
  "Other / Specify",
  "Not required",
];

const steps = [
  "Your details",
  "Material specs",
  "Processing",
  "Upload & send",
] as const;

type QuoteFormProps = {
  compactHeading?: boolean;
};

export default function QuoteForm({ compactHeading = false }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>(initial);
  const [files, setFiles] = useState<FileList | null>(null);
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
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("fullName", form.customerName);
      fd.append("materialGrade", form.grade);
      fd.append(
        "specifications",
        [
          `Make: ${form.make || "—"}`,
          `Width: ${form.width || "—"}`,
          `Length: ${form.length || "—"}`,
          `Approx Weight: ${form.approxWeight || "—"}`,
          `UT Level: ${form.utLevel || "—"}`,
          `Cutting: ${form.cuttingRequired}`,
          `Laser: ${form.laserRequired}`,
          `Drilling: ${form.drillingRequired}`,
          `Delivery: ${form.deliveryLocation || "—"}`,
          `Remarks: ${form.remarks || "—"}`,
          files?.length
            ? `Files: ${Array.from(files)
                .map((f) => f.name)
                .join(", ")}`
            : "Files: none",
        ].join("\n"),
      );
      if (files) {
        Array.from(files).forEach((file) => fd.append("files", file));
      }

      const res = await fetch("/api/contact", { method: "POST", body: fd });
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
          : "Unable to submit enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="section-atmosphere steel-mesh bg-background py-16 sm:py-20"
      id="upload"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            {compactHeading ? "Send Enquiry" : "Online Material Enquiry"}
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            {compactHeading ? "Material & Processing Form" : "Request a Quote"}
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-base text-steel">
            Share material and processing details. Upload PDF, DXF, AutoCAD or
            Excel — our sales team will respond with availability and quotation.
          </p>
        </RiseIn>

        <FadeIn delay={0.05} className="mt-8">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step}
                className="border border-line bg-surface px-3 py-3 text-center"
              >
                <span className="font-display text-lg font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-navy sm:text-xs">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        {submitted ? (
          <FadeIn className="mt-10 border border-brand/40 bg-surface p-8 shadow-[0_20px_50px_-36px_rgba(1,77,110,0.35)]">
            <div role="status" className="text-center sm:text-left">
              <CheckCircle2 className="mx-auto h-12 w-12 text-brand sm:mx-0" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-navy">
                Enquiry Received
              </h3>
              <p className="mt-2 text-steel">
                Thank you, {form.customerName}. Our team will contact you
                shortly.
              </p>
              <button
                type="button"
                className="mt-6 border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initial);
                  setFiles(null);
                }}
              >
                Submit Another Enquiry
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="teaser-shine mt-10 border border-line bg-surface p-6 shadow-[0_24px_60px_-40px_rgba(1,77,110,0.4)] sm:p-8"
              noValidate
            >
              <SectionLabel>Contact details</SectionLabel>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Company Name" required>
                  <input
                    required
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    className={inputClass}
                    placeholder="Company / firm"
                  />
                </Field>
                <Field label="Customer Name" required>
                  <input
                    required
                    value={form.customerName}
                    onChange={(e) => update("customerName", e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Mobile Number" required>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <SectionLabel className="mt-8">Material</SectionLabel>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Grade" required>
                  <select
                    required
                    value={form.grade}
                    onChange={(e) => update("grade", e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select grade
                    </option>
                    {supportedGrades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                    <option value="Other">Other / Custom</option>
                  </select>
                </Field>
                <Field label="Make">
                  <select
                    value={form.make}
                    onChange={(e) => update("make", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Any / as available</option>
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
                <Field label="Thickness" required>
                  <input
                    required
                    value={form.thickness}
                    onChange={(e) => update("thickness", e.target.value)}
                    className={inputClass}
                    placeholder="mm"
                  />
                </Field>
                <Field label="Width">
                  <input
                    value={form.width}
                    onChange={(e) => update("width", e.target.value)}
                    className={inputClass}
                    placeholder="mm"
                  />
                </Field>
                <Field label="Length">
                  <input
                    value={form.length}
                    onChange={(e) => update("length", e.target.value)}
                    className={inputClass}
                    placeholder="mm"
                  />
                </Field>
                <Field label="Quantity / Nos." required>
                  <input
                    required
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Approx. Weight">
                  <input
                    value={form.approxWeight}
                    onChange={(e) => update("approxWeight", e.target.value)}
                    className={inputClass}
                    placeholder="MT / kg"
                  />
                </Field>
                <Field label="Required UT Level">
                  <select
                    value={form.utLevel}
                    onChange={(e) => update("utLevel", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select</option>
                    {utOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <SectionLabel className="mt-8">Processing & delivery</SectionLabel>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Cutting Required">
                  <select
                    value={form.cuttingRequired}
                    onChange={(e) => update("cuttingRequired", e.target.value)}
                    className={inputClass}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </Field>
                <Field label="Laser Cutting Required">
                  <select
                    value={form.laserRequired}
                    onChange={(e) => update("laserRequired", e.target.value)}
                    className={inputClass}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </Field>
                <Field label="Drilling Required">
                  <select
                    value={form.drillingRequired}
                    onChange={(e) => update("drillingRequired", e.target.value)}
                    className={inputClass}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </Field>
                <Field label="Delivery Location">
                  <input
                    value={form.deliveryLocation}
                    onChange={(e) => update("deliveryLocation", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Remarks" className="sm:col-span-2">
                  <textarea
                    rows={3}
                    value={form.remarks}
                    onChange={(e) => update("remarks", e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </Field>
                <Field
                  label="Upload Drawing (PDF / DXF / DWG / Excel)"
                  className="sm:col-span-2"
                >
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.dxf,.dwg,.xls,.xlsx,.csv,image/*"
                      onChange={(e) => setFiles(e.target.files)}
                      className={`${inputClass} file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white`}
                    />
                    <FileUp
                      className="pointer-events-none absolute right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-brand sm:block"
                      aria-hidden
                    />
                  </div>
                  {files?.length ? (
                    <p className="mt-2 text-xs text-steel">
                      {files.length} file{files.length > 1 ? "s" : ""} selected
                    </p>
                  ) : null}
                </Field>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-brand" role="alert">
                  {error}
                </p>
              ) : null}

              <AnimatedButton
                type="submit"
                disabled={submitting}
                className="mt-8 w-full bg-brand brand-glow hover:bg-brand-deep sm:w-auto"
              >
                {submitting ? (
                  <>
                    Submitting… <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Enquiry <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </AnimatedButton>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.18em] text-brand ${className}`}
    >
      {children}
    </p>
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
