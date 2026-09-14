"use client";

import Link from "next/link";
import Image from "next/image";
import FlipFadeText from "@/components/ui/flip-fade-text";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import { company, homeCarouselImages } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

const flipWords = [
  "STEEL PLATES",
  "CNC PROFILE",
  "12 KW LASER",
  "CNC DRILLING",
  "UT TESTING",
  "FULL LOGISTICS",
];

export default function HomeEffects() {
  return (
    <>
      <section className="section-atmosphere border-y border-line bg-surface py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm sm:tracking-[0.22em]">
              Capabilities
            </p>
            <p className="mt-3 text-sm text-steel sm:text-lg">
              {company.name} — complete steel solutions under one roof
            </p>
            <div className="mt-2 flex justify-center overflow-hidden px-1">
              <FlipFadeText
                words={flipWords}
                interval={2800}
                className="min-h-[88px] sm:min-h-[140px]"
                textClassName="font-display text-2xl text-navy sm:text-5xl md:text-6xl"
                letterDuration={0.45}
                staggerDelay={0.05}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-atmosphere overflow-hidden bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm sm:tracking-[0.22em]">
              Plant Visuals
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              Shed · Laser · Yard · Dispatch
            </h2>
            <p className="mt-4 text-sm text-steel sm:text-base">
              A visual look at the processing floor — swap with your real plant
              photography anytime.
            </p>
          </FadeIn>

          {/* Mobile: snap carousel (usable on touch) */}
          <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:hidden">
            {homeCarouselImages.map((img) => (
              <figure
                key={img.src}
                className="relative w-[78vw] max-w-[300px] shrink-0 snap-center overflow-hidden border border-line"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="78vw"
                  />
                </div>
                <figcaption className="bg-surface px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-navy">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Desktop / tablet: 3D cylinder */}
          <div className="mt-10 hidden sm:block">
            <CylinderCarousel
              images={[...homeCarouselImages]}
              cardWidth={220}
              animationDuration={28}
              className="min-h-[480px] lg:min-h-[520px]"
            />
          </div>

          <p className="mt-6 text-center">
            <Link
              href="/gallery"
              className="text-xs font-semibold uppercase tracking-wider text-navy transition-colors hover:text-brand"
            >
              View full gallery →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {homeCarouselImages.slice(0, 3).map((img) => (
            <div
              key={img.src}
              className="relative aspect-[16/10] overflow-hidden border border-line"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
