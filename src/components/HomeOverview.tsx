"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  aboutOverview,
  company,
  plantImages,
  processFlow,
  processTagline,
} from "@/data/site";
import {
  FadeIn,
  MagneticCard,
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ClipReveal } from "@/components/ui/text-reveal";
import GradeMotionPanel from "@/components/ui/grade-motion-panel";

const teasers = [
  {
    href: "/services",
    title: "Processing",
    blurb: "CNC profile, 12 kW laser, drilling, oxy-fuel and UT under one roof.",
    image: plantImages.laser,
    visual: "image" as const,
  },
  {
    href: "/machinery",
    title: "Machinery",
    blurb: "Large-format beds up to approx. 3000 × 12000 mm for heavy plate work.",
    image: plantImages.cnc,
    visual: "image" as const,
  },
  {
    href: "/facilities",
    title: "Infrastructure",
    blurb: "26,000 sq. ft. shed, 75,000 sq. ft. yard and 4×20T overhead cranes.",
    image: plantImages.shed,
    visual: "image" as const,
  },
  {
    href: "/grades",
    title: "Material Grades",
    blurb: "Structural, boiler, alloy and wear-resistant plates — stock & indent.",
    image: plantImages.plates,
    visual: "grades" as const,
  },
  {
    href: "/quality",
    title: "Quality & UT",
    blurb: "ASTM A578 / EN 10160 ultrasonic testing and thickness verification.",
    image: plantImages.ut,
    visual: "image" as const,
  },
  {
    href: "/gallery",
    title: "Gallery",
    blurb: "Plant, machines, yard handling and dispatch visuals.",
    image: plantImages.dispatch,
    visual: "image" as const,
  },
] as const;

const whyPoints = [
  "Stockholding + processing under one roof",
  "CNC · Laser · Drilling · UT capability",
  "Heavy plate handling with 20T cranes",
  "Mill traceability & documentation support",
  "Project-oriented cutting & dispatch",
  "Vadodara base with pan-India logistics",
] as const;

export default function HomeOverview() {
  return (
    <>
      <section className="section-atmosphere steel-mesh bg-surface py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-8">
          <RiseIn className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm">
              About
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              {aboutOverview.subheading}
            </h2>
            <div className="accent-rule mt-4" aria-hidden />
            <p className="mt-5 text-sm leading-relaxed text-steel sm:text-base">
              {aboutOverview.intro}
            </p>
            <p className="mt-4 text-sm font-semibold text-navy">
              {company.focus}
            </p>
            <Link
              href="/about"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand"
            >
              Full company profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </RiseIn>

          <ClipReveal delay={0.08} className="relative lg:col-span-6">
            <div className="media-kenburns relative aspect-[16/10] overflow-hidden border border-line shadow-[0_28px_60px_-36px_rgba(1,77,110,0.55)]">
              <Image
                src={plantImages.factory}
                alt="Jagdamba Procut facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy/35 via-transparent to-brand/15"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-4 sm:p-5">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {company.location}
                </p>
                <p className="mt-0.5 text-xs text-steel-light">
                  Since {company.since} · Complete steel solution
                </p>
              </div>
            </div>
          </ClipReveal>
        </div>
      </section>

      <section className="section-atmosphere bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm">
              Explore
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 text-sm text-steel sm:text-base">
              Dedicated pages for full specifications — browse what you need,
              then request a quote.
            </p>
          </FadeIn>

          <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {teasers.map((item) => (
              <StaggerItem key={item.href}>
                <SpotlightCard className="card-panel h-full overflow-hidden border-0 shadow-none">
                  <Link href={item.href} className="group flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                      {item.visual === "grades" ? (
                        <GradeMotionPanel
                          className="absolute inset-0 min-h-0"
                          label="Grades"
                          compact
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">
                        {item.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                        View page
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-atmosphere-navy relative overflow-hidden bg-navy py-14 text-white sm:py-16">
        <div
          className="ambient-orb ambient-orb--peacock -left-10 top-10 h-40 w-40"
          aria-hidden
        />
        <div
          className="ambient-orb ambient-orb--brand -right-8 bottom-6 h-48 w-48"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm">
                End-to-End
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                From Stock to Delivery
              </h2>
              <p className="mt-2 text-sm text-peacock">{processTagline}</p>
            </div>
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand"
            >
              Processing details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>

          <StaggerChildren className="process-rail mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {processFlow.map((step, index) => (
              <StaggerItem key={step}>
                <MagneticCard className="h-full border border-white/15 bg-white/5 p-3 transition-colors hover:border-brand/50 hover:bg-white/10 sm:p-4">
                  <p className="font-display text-2xl font-bold text-brand sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-wide sm:text-xs">
                    {step}
                  </p>
                </MagneticCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-atmosphere bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand sm:text-sm">
                Why Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
                Built for Industrial Buyers
              </h2>
            </div>
            <Link
              href="/contact"
              className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand"
            >
              Talk to sales
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>

          <StaggerChildren className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((point) => (
              <StaggerItem key={point}>
                <div className="surface-lift flex gap-3 border border-line bg-background px-4 py-4 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {point}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
