"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Info, Loader2, PackageSearch } from "lucide-react";
import { materialCategories, processingOptions } from "@/lib/enquiry/config";
import {
  validateContact,
  validateMaterial,
  type ContactDetails,
  type EnquiryPayload,
  type FieldErrors,
  type MaterialLine,
} from "@/lib/enquiry/validation";
import { enquiryText } from "@/lib/enquiry/summary";
import { ChipMultiSelect, Field, Honeypot, SearchSelect, SectionLabel, inputClass } from "@/components/enquiry/fields";
import { useEnquirySubmit } from "@/components/enquiry/useEnquirySubmit";
import EnquirySuccess from "@/components/enquiry/EnquirySuccess";
import EnquiryFallback from "@/components/EnquiryFallback";

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

const categoryOptions = materialCategories.map((c) => ({ value: c.name, label: c.name }));

export default function MaterialFinder() {
  const [material, setMaterial] = useState<MaterialLine>(emptyMaterial);
  const [contact, setContact] = useState<ContactDetails>(emptyContact);
  const [processing, setProcessing] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const { submitting, result, submit, reset } = useEnquirySubmit();

  const gradeOptions = useMemo(() => {
    const cats = material.category
      ? materialCategories.filter((c) => c.name === material.category)
      : materialCategories;
    return cats.flatMap((c) => c.grades.map((g) => ({ value: g, label: g, group: c.name })));
  }, [material.category]);

  const payload: EnquiryPayload = {
    type: "STOCK",
    services: ["plate-supply"],
    processing,
    material,
    contact,
    notes: "",
  };

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = { ...validateMaterial(material, "STOCK"), ...validateContact(contact) };
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0].replace(".", "-");
      document.getElementById(`mf-${first}`)?.focus();
      return;
    }
    const res = await submit(payload, [], honeypot);
    if (res.kind === "error" && res.fieldErrors) setErrors(res.fieldErrors);
  }

  if (result.kind === "success") {
    return (
      <EnquirySuccess
        reference={result.reference}
        title="Availability request received"
        onReset={() => {
          setMaterial(emptyMaterial);
          setContact(emptyContact);
          setProcessing([]);
          reset();
        }}
        resetLabel="Check another material"
      />
    );
  }

  const summary: [string, string][] = [
    ["Category", material.category],
    ["Grade", material.grade],
    ["Thickness", material.thickness && `${material.thickness} mm`],
    ["Length", material.length && `${material.length} mm`],
    ["Width", material.width && `${material.width} mm`],
    ["Quantity", material.quantity],
    ["Processing", processing.join(", ")],
    ["Delivery", contact.deliveryLocation],
  ];
  const filled = summary.filter(([, v]) => v).length;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(11,35,72,0.45)] sm:p-8">
        <SectionLabel>Material</SectionLabel>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Material category" required error={errors["material.category"]} htmlFor="mf-material-category">
            <SearchSelect
              id="mf-material-category"
              value={material.category}
              onChange={(v) => {
                const keepGrade = materialCategories.find((c) => c.name === v)?.grades.includes(material.grade);
                setMaterial((p) => ({ ...p, category: v, grade: keepGrade ? p.grade : "" }));
                clearError("material.category");
              }}
              options={categoryOptions}
              placeholder="Search category"
              invalid={Boolean(errors["material.category"])}
            />
          </Field>
          <Field label="Steel grade" required error={errors["material.grade"]} htmlFor="mf-material-grade">
            <SearchSelect
              id="mf-material-grade"
              value={material.grade}
              onChange={(v) => setM("grade", v)}
              options={gradeOptions}
              placeholder="Search or type a grade"
              allowCustom
              invalid={Boolean(errors["material.grade"])}
            />
          </Field>
          <Field label="Thickness (mm)" required error={errors["material.thickness"]} htmlFor="mf-material-thickness">
            <input id="mf-material-thickness" inputMode="decimal" className={inputClass} value={material.thickness} onChange={(e) => setM("thickness", e.target.value)} aria-invalid={Boolean(errors["material.thickness"]) || undefined} placeholder="e.g. 20" />
          </Field>
          <Field label="Quantity" required error={errors["material.quantity"]} htmlFor="mf-material-quantity" hint="Nos., MT or kg">
            <input id="mf-material-quantity" className={inputClass} value={material.quantity} onChange={(e) => setM("quantity", e.target.value)} aria-invalid={Boolean(errors["material.quantity"]) || undefined} placeholder="e.g. 10 Nos. / 5 MT" />
          </Field>
          <Field label="Length (mm)" error={errors["material.length"]} htmlFor="mf-material-length">
            <input id="mf-material-length" inputMode="decimal" className={inputClass} value={material.length} onChange={(e) => setM("length", e.target.value)} aria-invalid={Boolean(errors["material.length"]) || undefined} />
          </Field>
          <Field label="Width (mm)" error={errors["material.width"]} htmlFor="mf-material-width">
            <input id="mf-material-width" inputMode="decimal" className={inputClass} value={material.width} onChange={(e) => setM("width", e.target.value)} aria-invalid={Boolean(errors["material.width"]) || undefined} />
          </Field>
        </div>

        <SectionLabel className="mt-8">Required processing</SectionLabel>
        <div className="mt-3">
          <ChipMultiSelect label="Required processing" options={processingOptions} value={processing} onChange={setProcessing} />
        </div>

        <SectionLabel className="mt-8">Contact &amp; delivery</SectionLabel>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Company name" required error={errors["contact.companyName"]} htmlFor="mf-contact-companyName">
            <input id="mf-contact-companyName" autoComplete="organization" className={inputClass} value={contact.companyName} onChange={(e) => setC("companyName", e.target.value)} aria-invalid={Boolean(errors["contact.companyName"]) || undefined} />
          </Field>
          <Field label="Contact person" required error={errors["contact.contactName"]} htmlFor="mf-contact-contactName">
            <input id="mf-contact-contactName" autoComplete="name" className={inputClass} value={contact.contactName} onChange={(e) => setC("contactName", e.target.value)} aria-invalid={Boolean(errors["contact.contactName"]) || undefined} />
          </Field>
          <Field label="Phone" required error={errors["contact.phone"]} htmlFor="mf-contact-phone">
            <input id="mf-contact-phone" type="tel" autoComplete="tel" className={inputClass} value={contact.phone} onChange={(e) => setC("phone", e.target.value)} aria-invalid={Boolean(errors["contact.phone"]) || undefined} />
          </Field>
          <Field label="Email" required error={errors["contact.email"]} htmlFor="mf-contact-email">
            <input id="mf-contact-email" type="email" autoComplete="email" className={inputClass} value={contact.email} onChange={(e) => setC("email", e.target.value)} aria-invalid={Boolean(errors["contact.email"]) || undefined} />
          </Field>
          <Field label="Delivery location" required error={errors["contact.deliveryLocation"]} htmlFor="mf-contact-deliveryLocation" className="sm:col-span-2">
            <input id="mf-contact-deliveryLocation" className={inputClass} value={contact.deliveryLocation} onChange={(e) => setC("deliveryLocation", e.target.value)} aria-invalid={Boolean(errors["contact.deliveryLocation"]) || undefined} placeholder="City / site" />
          </Field>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-line bg-navy p-5 text-white sm:p-6">
          <div className="flex items-center gap-2">
            <PackageSearch className="h-5 w-5 text-brand" aria-hidden />
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Enquiry summary</h3>
          </div>
          <div className="mt-3 h-1 w-full bg-white/10" aria-hidden>
            <div className="h-full bg-brand transition-[width] duration-300" style={{ width: `${(filled / summary.length) * 100}%` }} />
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {summary.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                <dt className="text-steel-light">{k}</dt>
                <dd className={`min-w-0 break-words text-right font-semibold ${v ? "text-white" : "text-white/35"}`}>
                  {v || "—"}
                </dd>
              </div>
            ))}
          </dl>
          <button type="submit" disabled={submitting} className="btn btn-primary mt-6 w-full disabled:opacity-70">
            {submitting ? (
              <>
                Sending <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              </>
            ) : (
              <>Check Availability</>
            )}
          </button>
          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-steel-light">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
            Live stock levels are not published online. Our sales team confirms availability, make and
            pricing for your exact size.
          </p>
        </div>
        {result.kind === "error" ? (
          result.fallback ? (
            <EnquiryFallback
              reason={result.message}
              subject="Stock enquiry — Jagdamba Procut"
              message={enquiryText(payload)}
            />
          ) : (
            <p className="mt-4 text-sm font-medium text-[#b45309]" role="alert">
              {result.message}
            </p>
          )
        ) : null}
      </aside>
    </form>
  );
}
