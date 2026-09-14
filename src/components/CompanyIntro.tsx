"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  aboutOverview,
  company,
  completeSolutionServices,
  plantImages,
} from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

export default function CompanyIntro() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <FadeIn className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Company Introduction
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              {aboutOverview.subheading}
            </h2>
            <div className="accent-rule mt-4" aria-hidden />
            <p className="mt-6 text-base leading-relaxed text-steel">
              {aboutOverview.intro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-steel">
              We provide complete steel solutions under one roof — positioned as
              a large, professionally managed steel processing company, not only
              a trader.
            </p>
            <p className="mt-6 border-l-4 border-brand bg-surface-muted/60 py-3 pl-4 text-sm font-semibold text-navy">
              Our objective: {company.focus}
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden border border-line">
              <Image
                src={plantImages.crane}
                alt="Overhead crane handling steel plates"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-7">
            <div className="border border-line bg-background p-6 shadow-[0_20px_50px_-36px_rgba(1,77,110,0.45)] sm:p-8">
              <div className="relative mb-5 aspect-[16/9] overflow-hidden border border-line sm:mb-6 sm:aspect-[21/9]">
                <Image
                  src={plantImages.components}
                  alt="Finished cut steel components"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                Complete Steel Solutions Under One Roof
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <StaggerChildren className="mt-5 grid gap-2 sm:grid-cols-2">
                {completeSolutionServices.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex gap-2 border border-transparent bg-surface px-3 py-2.5 text-sm text-steel transition-colors hover:border-line">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
