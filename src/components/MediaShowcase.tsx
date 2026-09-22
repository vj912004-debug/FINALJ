"use client";

import Image from "next/image";
import Link from "next/link";
import { homeMediaSlots } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

export default function MediaShowcase() {
  return (
    <section className="section-atmosphere bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Plant Media
            </p>
            <TextReveal
              as="h2"
              className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
            >
              Factory, Machines and Yard
            </TextReveal>
            <div className="accent-rule mt-4" aria-hidden />
            <p className="mt-5 text-base text-steel">
              Plant visuals of our shed, laser line, open yard and dispatch.
            </p>
          </div>
          <Link
            href="/gallery"
            className="link-underline text-xs font-bold uppercase tracking-wider text-brand"
          >
            Full gallery →
          </Link>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2">
          {homeMediaSlots.map((slot) => (
            <StaggerItem key={slot.title}>
              <article className="teaser-shine card-panel overflow-hidden">
                <div className="media-kenburns media-skeleton relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={slot.src}
                    alt={slot.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-display text-lg font-bold uppercase text-navy">
                    {slot.title}
                  </p>
                  <p className="mt-1 text-sm text-steel">{slot.hint}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
