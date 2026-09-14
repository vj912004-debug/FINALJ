"use client";

import { CheckCircle2 } from "lucide-react";
import { infrastructure } from "@/data/site";
import {
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

export default function InfrastructureSection() {
  return (
    <section className="section-atmosphere steel-mesh bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Capacity
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            {infrastructure.heading}
          </TextReveal>
          <p className="mt-2 text-base italic text-brand">
            {infrastructure.subheading}
          </p>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-6 text-base leading-relaxed text-steel">
            {infrastructure.body}
          </p>
        </RiseIn>

        <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <article className="surface-lift teaser-shine h-full border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                {infrastructure.coveredShed.title}
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {infrastructure.coveredShed.body}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {infrastructure.coveredShed.uses.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {u}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="surface-lift teaser-shine h-full border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                {infrastructure.openYard.title}
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {infrastructure.openYard.body}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {infrastructure.openYard.stockedBy.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {u}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="surface-lift teaser-shine h-full border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                {infrastructure.cranes.title}
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {infrastructure.cranes.body}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {infrastructure.cranes.handles.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {u}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="surface-lift teaser-shine h-full border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                {infrastructure.hydra.title}
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {infrastructure.hydra.body}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {infrastructure.hydra.uses.map((u) => (
                  <li key={u} className="flex gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {u}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        </StaggerChildren>

        <RiseIn delay={0.06} className="mt-14">
          <h3 className="font-display text-xl font-bold uppercase text-navy">
            Our Facility at a Glance
          </h3>
          <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
        </RiseIn>
        <StaggerChildren className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {infrastructure.glance.map((item) => (
            <StaggerItem key={item.label}>
              <div className="border border-line bg-navy p-4 text-white transition-colors hover:border-brand/40">
                <p className="font-display text-lg font-bold text-brand">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-steel-light">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
