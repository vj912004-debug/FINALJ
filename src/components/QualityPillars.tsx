import { FileCheck2, Fingerprint, Gauge, Radar, ScanSearch, ClipboardList } from "lucide-react";
import { StaggerChildren, StaggerItem, RiseIn } from "@/components/motion/Motion";

const pillars = [
  {
    icon: FileCheck2,
    title: "Material Test Certificates",
    text: "Mill Test Certificates (MTC / TC) checked against the supplied plate before processing and dispatch.",
  },
  {
    icon: ScanSearch,
    title: "Grade Verification",
    text: "Grade, heat number and plate number verified against the certificate and the purchase requirement.",
  },
  {
    icon: Gauge,
    title: "Thickness Verification",
    text: "Ultrasonic thickness meter checks at inward, stock, customer inspection and dispatch stages.",
  },
  {
    icon: Radar,
    title: "Ultrasonic Testing",
    text: "UT to ASTM A578 Level A / B / C and EN 10160 body and edge classes, as specified.",
  },
  {
    icon: ClipboardList,
    title: "Inspection Documentation",
    text: "Dimensional, cutting accuracy and thickness records, plus UT reports where applicable.",
  },
  {
    icon: Fingerprint,
    title: "Material Traceability",
    text: "Heat and plate numbers carried from mill certificate to cut part, with third-party inspection support.",
  },
] as const;

export default function QualityPillars() {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Quality Assurance</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Verified Material, Documented at Every Step
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </RiseIn>
        <StaggerChildren className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className="h-full">
              <article className="group h-full bg-white p-6 transition-colors duration-300 hover:bg-background sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center bg-navy text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
