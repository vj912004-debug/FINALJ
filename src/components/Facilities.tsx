"use client";

import { CheckCircle2, PackageSearch } from "lucide-react";
import { facilities } from "@/data/site";
import { RiseIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

export default function Facilities() {
  return (
    <section className="section-atmosphere steel-mesh bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Infrastructure
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            Our Facilities
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-6 text-base leading-relaxed text-steel">
            {facilities.body}
          </p>
        </RiseIn>

        <StaggerChildren className="mt-8 grid gap-3 sm:grid-cols-2">
          {facilities.bullets.map((item) => (
            <StaggerItem key={item}>
              <div className="surface-lift flex items-start gap-2.5 border border-line bg-surface px-4 py-3.5 text-sm text-ink">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden
                />
                {item}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RiseIn delay={0.08} className="mt-8 inline-flex max-w-3xl items-center gap-2 border border-line bg-surface px-4 py-3 text-sm text-ink shadow-[0_16px_40px_-28px_rgba(1,77,110,0.4)]">
          <PackageSearch className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          Right Material + Accurate Processing + Testing + Traceability + Safe
          Handling + Reliable Delivery
        </RiseIn>
      </div>
    </section>
  );
}
