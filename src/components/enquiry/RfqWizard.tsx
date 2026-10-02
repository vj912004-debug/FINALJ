"use client";

import { useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Loader2,
  Pencil,
  Send,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  checkFiles,
  formatBytes,
  materialCategories,
  processingOptions,
  rfqServices,
  uploadLimits,
  utLevels,
} from "@/lib/enquiry/config";
import {
  validateContact,
  validateMaterial,
  validateServices,
  type ContactDetails,
  type EnquiryPayload,
  type FieldErrors,
  type MaterialLine,
} from "@/lib/enquiry/validation";
import { enquiryText } from "@/lib/enquiry/summary";
import { ChipMultiSelect, Field, Honeypot, SearchSelect, inputClass } from "@/components/enquiry/fields";
import { useEnquirySubmit } from "@/components/enquiry/useEnquirySubmit";
import EnquirySuccess from "@/components/enquiry/EnquirySuccess";
import EnquiryFallback from "@/components/EnquiryFallback";

const steps = ["Service", "Material", "Drawings", "Your details", "Review"] as const;

const emptyMaterial: MaterialLine = {
  category: "",
  grade: "",
  thickness: "",
  length: "",
  width: "",
  quantity: "",
  utLevel: "",
};

const emptyContact: ContactDetails = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  gstNumber: "",
  deliveryLocation: "",
  requiredBy: "",
};

const gradeOptions = materialCategories.flatMap((c) =>
  c.grades.map((g) => ({ value: g, label: g, group: c.name })),
);

function stepOfError(key: string) {
  if (key === "services") return 0;
  if (key.startsWith("material.")) return 1;
  if (key === "files") return 2;
  if (key.startsWith("contact.")) return 3;
  return 4;
}

function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function RfqWizard({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>(
    rfqServices.some((s) => s.id === initialService) ? [initialService!] : [],
  );
  const [processing, setProcessing] = useState<string[]>([]);
  const [material, setMaterial] = useState<MaterialLine>(emptyMaterial);
  const [contact, setContact] = useState<ContactDetails>(emptyContact);
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [dragging, setDragging] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const { submitting, result, submit, reset } = useEnquirySubmit();

  const payload: EnquiryPayload = useMemo(
    () => ({
      type: "RFQ",
      services,
      processing,
      material: {
        ...material,
        category: materialCategories.find((c) => c.grades.includes(material.grade))?.name ?? "",
      },
      contact,
      notes,
    }),
    [services, processing, material, contact, notes],
  );

  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      topRef.current?.focus({ preventScroll: true });
    });
  }

  function validateStep(i: number): FieldErrors {
    if (i === 0) return validateServices(payload);
    if (i === 1) return validateMaterial(payload.material, "RFQ");
    if (i === 2) {
      const e = checkFiles(files);
      return e ? { files: e } : {};
    }
    if (i === 3) return validateContact(contact);
    return {};
  }

  function next() {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      go(step + 1);
      return;
    }
    requestAnimationFrame(() => {
      topRef.current?.parentElement?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const merged = [...files];
    for (const f of Array.from(list)) {
      if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
    }
    const err = checkFiles(merged);
    setFileError(err);
    if (!err) setFiles(merged);
  }

  async function onSubmit() {
    const all = { ...validateStep(0), ...validateStep(1), ...validateStep(2), ...validateStep(3) };
    if (Object.keys(all).length) {
      setErrors(all);
      go(Math.min(...Object.keys(all).map(stepOfError)));
      return;
    }
    const res = await submit(payload, files, honeypot);
    if (res.kind === "error" && res.fieldErrors && Object.keys(res.fieldErrors).length) {
      setErrors(res.fieldErrors);
      go(Math.min(...Object.keys(res.fieldErrors).map(stepOfError)));
    }
  }

  function resetAll() {
    setServices([]);
    setProcessing([]);
    setMaterial(emptyMaterial);
    setContact(emptyContact);
    setNotes("");
    setFiles([]);
    setErrors({});
    setStep(0);
    reset();
  }

  if (result.kind === "success") {
    return (
      <EnquirySuccess
        reference={result.reference}
        title="Quotation request received"
        onReset={resetAll}
        resetLabel="New quotation request"
      />
    );
  }

  const clearError = (key: string) =>
    setErrors((p) => {
      if (!(key in p)) return p;
      const rest = { ...p };
      delete rest[key];
      return rest;
    });
  const setM = <K extends keyof MaterialLine>(k: K, v: MaterialLine[K]) => {
    setMaterial((p) => ({ ...p, [k]: v }));
    clearError(`material.${k}`);
  };
  const setC = <K extends keyof ContactDetails>(k: K, v: ContactDetails[K]) => {
    setContact((p) => ({ ...p, [k]: v }));
    clearError(`contact.${k}`);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="relative border border-line bg-white shadow-[0_24px_60px_-40px_rgba(11,35,72,0.45)]">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div ref={topRef} tabIndex={-1} className="scroll-mt-28 border-b border-line px-4 pt-5 outline-none sm:px-8 sm:pt-7">
        <ol className="grid grid-cols-5 gap-1.5 sm:gap-3" aria-label="Quotation steps">
          {steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className="min-w-0">
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => go(i)}
                  aria-current={current ? "step" : undefined}
                  className="group flex w-full flex-col items-start gap-2 text-left disabled:cursor-default"
                >
                  <span
                    className={`h-1 w-full transition-colors ${done || current ? "bg-brand" : "bg-line"}`}
                    aria-hidden
                  />
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-bold ${
                        done
                          ? "bg-navy text-white"
                          : current
                            ? "bg-brand text-white"
                            : "border border-line text-steel"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                    </span>
                    <span
                      className={`hidden truncate text-[11px] font-semibold uppercase tracking-wider sm:block ${
                        current ? "text-navy" : "text-steel"
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 pb-4 font-display text-xl font-bold uppercase tracking-tight text-navy sm:hidden">
          Step {step + 1}: {steps[step]}
        </p>
        <div className="hidden pb-5 sm:block" />
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8">
        {step === 0 ? (
          <fieldset>
            <legend className="font-display text-2xl font-bold uppercase text-navy">
              What do you need?
            </legend>
            <p className="mt-1 text-sm text-steel">Select one or more services.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rfqServices.map((s) => {
                const on = services.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setServices((prev) => (on ? prev.filter((x) => x !== s.id) : [...prev, s.id]));
                      clearError("services");
                    }}
                    className={`relative flex h-full flex-col items-start border p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 ${
                      on
                        ? "border-brand bg-brand/5 shadow-[0_14px_30px_-22px_rgba(244,124,32,0.9)]"
                        : "border-line bg-white hover:border-navy/30"
                    }`}
                  >
                    <span
                      className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center border ${
                        on ? "border-brand bg-brand text-white" : "border-line"
                      }`}
                      aria-hidden
                    >
                      {on ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    <span className="pr-7 font-display text-base font-bold uppercase tracking-wide text-navy">
                      {s.label}
                    </span>
                    <span className="mt-1.5 text-sm leading-relaxed text-steel">{s.description}</span>
                  </button>
                );
              })}
            </div>
            {errors.services ? (
              <p className="mt-3 text-sm font-medium text-[#b45309]" role="alert">
                {errors.services}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {step === 1 ? (
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-navy">Material details</h3>
            <p className="mt-1 text-sm text-steel">
              Dimensions in millimetres. Type to search grades, or enter one that isn&apos;t listed.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Material grade" required error={errors["material.grade"]} htmlFor="rfq-grade" className="sm:col-span-2">
                <SearchSelect
                  id="rfq-grade"
                  value={material.grade}
                  onChange={(v) => setM("grade", v)}
                  options={gradeOptions}
                  placeholder="e.g. IS 2062 E250BR, SA 516 Gr 70"
                  allowCustom
                  invalid={Boolean(errors["material.grade"])}
                />
              </Field>
              <Field label="Thickness (mm)" required error={errors["material.thickness"]} htmlFor="rfq-thk">
                <input
                  id="rfq-thk"
                  inputMode="decimal"
                  className={inputClass}
                  value={material.thickness}
                  onChange={(e) => setM("thickness", e.target.value)}
                  aria-invalid={Boolean(errors["material.thickness"]) || undefined}
                  placeholder="e.g. 25"
                />
              </Field>
              <Field label="Quantity" required error={errors["material.quantity"]} htmlFor="rfq-qty" hint="Nos., MT or kg">
                <input
                  id="rfq-qty"
                  className={inputClass}
                  value={material.quantity}
                  onChange={(e) => setM("quantity", e.target.value)}
                  aria-invalid={Boolean(errors["material.quantity"]) || undefined}
                  placeholder="e.g. 40 Nos. / 6 MT"
                />
              </Field>
              <Field label="Length (mm)" error={errors["material.length"]} htmlFor="rfq-len">
                <input
                  id="rfq-len"
                  inputMode="decimal"
                  className={inputClass}
                  value={material.length}
                  onChange={(e) => setM("length", e.target.value)}
                  aria-invalid={Boolean(errors["material.length"]) || undefined}
                />
              </Field>
              <Field label="Width (mm)" error={errors["material.width"]} htmlFor="rfq-wid">
                <input
                  id="rfq-wid"
                  inputMode="decimal"
                  className={inputClass}
                  value={material.width}
                  onChange={(e) => setM("width", e.target.value)}
                  aria-invalid={Boolean(errors["material.width"]) || undefined}
                />
              </Field>
              <Field label="UT requirement" htmlFor="rfq-ut">
                <select
                  id="rfq-ut"
                  className={inputClass}
                  value={material.utLevel}
                  onChange={(e) => setM("utLevel", e.target.value)}
                >
                  <option value="">Not required</option>
                  {utLevels.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink">Processing requirements</p>
                <div className="mt-2">
                  <ChipMultiSelect
                    label="Processing requirements"
                    options={processingOptions}
                    value={processing}
                    onChange={setProcessing}
                  />
                </div>
              </div>
              <Field label="Notes / special instructions" className="sm:col-span-2" htmlFor="rfq-notes">
                <textarea
                  id="rfq-notes"
                  rows={3}
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tolerances, make preference, edge finish, TPI, etc."
                />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-navy">Technical drawings</h3>
            <p className="mt-1 text-sm text-steel">
              Optional. PDF, DXF, DWG, JPG or PNG — up to {uploadLimits.maxFiles} files,{" "}
              {formatBytes(uploadLimits.maxTotalBytes)} in total. Larger files can be sent on WhatsApp or
              email after you submit.
            </p>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`mt-6 flex flex-col items-center justify-center border-2 border-dashed px-4 py-10 text-center transition-colors ${
                dragging ? "border-brand bg-brand/5" : "border-line bg-background"
              }`}
            >
              <UploadCloud className="h-10 w-10 text-brand" aria-hidden />
              <p className="mt-3 text-sm font-semibold text-navy">Drag and drop drawings here</p>
              <p className="mt-1 text-xs text-steel">or</p>
              <button type="button" onClick={() => fileInput.current?.click()} className="btn btn-outline mt-3">
                Browse files
              </button>
              <input
                ref={fileInput}
                type="file"
                multiple
                accept={uploadLimits.accept}
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {fileError || errors.files ? (
              <p className="mt-3 text-sm font-medium text-[#b45309]" role="alert">
                {fileError || errors.files}
              </p>
            ) : null}
            {files.length ? (
              <ul className="mt-4 divide-y divide-line border border-line">
                {files.map((f) => (
                  <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 px-3 py-2.5">
                    <FileText className="h-5 w-5 shrink-0 text-navy" aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-sm text-ink">{f.name}</span>
                    <span className="shrink-0 text-xs text-steel">{formatBytes(f.size)}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFiles((prev) => prev.filter((x) => x !== f));
                        setFileError(null);
                      }}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-steel hover:text-[#b45309]"
                      aria-label={`Remove ${f.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-navy">Your details</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Company name" required error={errors["contact.companyName"]} htmlFor="rfq-co">
                <input id="rfq-co" autoComplete="organization" className={inputClass} value={contact.companyName} onChange={(e) => setC("companyName", e.target.value)} aria-invalid={Boolean(errors["contact.companyName"]) || undefined} />
              </Field>
              <Field label="Contact person" required error={errors["contact.contactName"]} htmlFor="rfq-name">
                <input id="rfq-name" autoComplete="name" className={inputClass} value={contact.contactName} onChange={(e) => setC("contactName", e.target.value)} aria-invalid={Boolean(errors["contact.contactName"]) || undefined} />
              </Field>
              <Field label="Phone number" required error={errors["contact.phone"]} htmlFor="rfq-phone">
                <input id="rfq-phone" type="tel" autoComplete="tel" className={inputClass} value={contact.phone} onChange={(e) => setC("phone", e.target.value)} aria-invalid={Boolean(errors["contact.phone"]) || undefined} placeholder="+91 98xxxxxxxx" />
              </Field>
              <Field label="Email" required error={errors["contact.email"]} htmlFor="rfq-email">
                <input id="rfq-email" type="email" autoComplete="email" className={inputClass} value={contact.email} onChange={(e) => setC("email", e.target.value)} aria-invalid={Boolean(errors["contact.email"]) || undefined} />
              </Field>
              <Field label="GST number" error={errors["contact.gstNumber"]} hint="Optional" htmlFor="rfq-gst">
                <input id="rfq-gst" className={`${inputClass} uppercase`} maxLength={15} value={contact.gstNumber} onChange={(e) => setC("gstNumber", e.target.value.toUpperCase())} aria-invalid={Boolean(errors["contact.gstNumber"]) || undefined} />
              </Field>
              <Field label="Delivery location" required error={errors["contact.deliveryLocation"]} htmlFor="rfq-loc">
                <input id="rfq-loc" className={inputClass} value={contact.deliveryLocation} onChange={(e) => setC("deliveryLocation", e.target.value)} aria-invalid={Boolean(errors["contact.deliveryLocation"]) || undefined} placeholder="City / site" />
              </Field>
              <Field label="Required delivery date" error={errors["contact.requiredBy"]} hint="Optional" htmlFor="rfq-date">
                <input id="rfq-date" type="date" min={todayIso()} className={inputClass} value={contact.requiredBy} onChange={(e) => setC("requiredBy", e.target.value)} aria-invalid={Boolean(errors["contact.requiredBy"]) || undefined} />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-navy">Review and submit</h3>
            <p className="mt-1 text-sm text-steel">Check the details below before sending.</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <ReviewBlock title="Service" onEdit={() => go(0)}>
                {services.map((id) => rfqServices.find((s) => s.id === id)?.label).join(", ")}
              </ReviewBlock>
              <ReviewBlock title="Drawings" onEdit={() => go(2)}>
                {files.length ? files.map((f) => f.name).join(", ") : "None attached"}
              </ReviewBlock>
              <ReviewBlock title="Material" onEdit={() => go(1)}>
                <ReviewList
                  rows={[
                    ["Grade", material.grade],
                    ["Thickness", material.thickness && `${material.thickness} mm`],
                    ["Size (L × W)", material.length || material.width ? `${material.length || "—"} × ${material.width || "—"} mm` : ""],
                    ["Quantity", material.quantity],
                    ["UT", material.utLevel],
                    ["Processing", processing.join(", ")],
                    ["Notes", notes],
                  ]}
                />
              </ReviewBlock>
              <ReviewBlock title="Your details" onEdit={() => go(3)}>
                <ReviewList
                  rows={[
                    ["Company", contact.companyName],
                    ["Contact", contact.contactName],
                    ["Phone", contact.phone],
                    ["Email", contact.email],
                    ["GST", contact.gstNumber],
                    ["Delivery", contact.deliveryLocation],
                    ["Required by", contact.requiredBy],
                  ]}
                />
              </ReviewBlock>
            </div>
            {result.kind === "error" ? (
              result.fallback ? (
                <EnquiryFallback
                  reason={result.message}
                  subject="Request for quotation — Jagdamba Procut"
                  message={enquiryText(payload, files.map((f) => f.name))}
                />
              ) : (
                <p className="mt-4 text-sm font-medium text-[#b45309]" role="alert">
                  {result.message}
                </p>
              )
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-primary">
            Continue
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button type="button" onClick={onSubmit} disabled={submitting} className="btn btn-primary disabled:opacity-70">
            {submitting ? (
              <>
                Submitting <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Submit request <Send className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="border border-line bg-background p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{title}</h4>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-navy hover:text-brand">
          <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
        </button>
      </div>
      <div className="mt-2 break-words text-sm text-ink">{children}</div>
    </section>
  );
}

function ReviewList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-steel">{k}</dt>
            <dd className="min-w-0 break-words font-medium">{v}</dd>
          </div>
        ))}
    </dl>
  );
}
