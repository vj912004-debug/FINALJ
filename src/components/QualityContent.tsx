"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  plantImages,
  qualityTraceability,
  thicknessMeter,
  traceabilityDocuments,
  utTesting,
} from "@/data/site";
import { FadeIn, RiseIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";
import { ClipReveal } from "@/components/ui/text-reveal";

export default function QualityContent() {
  return (
    <section className="section-atmosphere steel-mesh bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <ClipReveal className="banner-media relative overflow-hidden border border-line shadow-[0_28px_60px_-36px_rgba(1,77,110,0.5)]">
          <Image
            src={plantImages.ut}
            alt="Ultrasonic testing of steel plates"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase text-white sm:bottom-6 sm:left-6 sm:text-2xl">
            Quality You Can Verify
          </p>
        </ClipReveal>

        <RiseIn className="border border-line bg-background p-6 shadow-[0_20px_50px_-40px_rgba(1,77,110,0.35)] sm:p-8">
          <TextReveal
            as="h2"
            className="font-display text-2xl font-bold uppercase text-navy"
          >
            {utTesting.heading}
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-steel">{utTesting.body}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold text-navy">
                {utTesting.astm.standard}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {utTesting.astm.levels.map((l) => (
                  <li
                    key={l}
                    className="border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-navy"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-navy">
                {utTesting.en.standard}
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase text-steel">
                Body Classes
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {utTesting.en.bodyClasses.map((l) => (
                  <li
                    key={l}
                    className="border border-line bg-surface px-3 py-1.5 text-sm font-semibold"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase text-steel">
                Edge Classes
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {utTesting.en.edgeClasses.map((l) => (
                  <li
                    key={l}
                    className="border border-line bg-surface px-3 py-1.5 text-sm font-semibold"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm font-semibold text-navy">
            Common requirements: {utTesting.commonReqs.join(" · ")}
          </p>
        </RiseIn>

        <FadeIn delay={0.06} className="surface-lift border border-line bg-background p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold uppercase text-navy">
            {thicknessMeter.heading}
          </h2>
          <p className="mt-2 text-brand">{thicknessMeter.subheading}</p>
          <p className="mt-4 text-steel">{thicknessMeter.body}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {thicknessMeter.uses.map((u) => (
              <li key={u} className="flex gap-2 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {u}
              </li>
            ))}
          </ul>
        </FadeIn>

        <StaggerChildren className="grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <div className="h-full border border-line bg-navy p-6 text-white sm:p-8">
              <h2 className="font-display text-xl font-bold uppercase text-brand">
                Quality &amp; Traceability
              </h2>
              <ul className="mt-5 space-y-2">
                {qualityTraceability.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-steel-light">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="surface-lift h-full border border-line bg-background p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold uppercase text-navy">
                Traceability Documents
              </h2>
              <ul className="mt-5 space-y-2">
                {traceabilityDocuments.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-steel">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
