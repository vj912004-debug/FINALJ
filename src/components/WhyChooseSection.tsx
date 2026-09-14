import { CheckCircle2, FileText, Mail, Shield } from "lucide-react";
import { vendorRegistration, whyCustomersChooseUs } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

const vendorIcons = [FileText, Shield, Mail];

export default function WhyChooseSection() {
  return (
    <section className="section-atmosphere bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Partnership
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              Why Choose Jagdamba Procut?
            </h2>
            <div className="accent-rule mt-4" aria-hidden />
            <StaggerChildren className="mt-8 space-y-3">
              {whyCustomersChooseUs.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex gap-3 border border-line bg-surface px-4 py-3 text-sm text-steel">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {point}
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h3 className="font-display text-xl font-bold uppercase text-navy">
              Vendor Registration
            </h3>
            <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
            <ul className="mt-5 space-y-4">
              {vendorRegistration.map((msg, i) => {
                const Icon = vendorIcons[i] ?? FileText;
                return (
                  <li
                    key={msg}
                    className="surface-lift flex gap-3 border border-line bg-surface p-4 text-sm text-steel"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
                    {msg}
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
