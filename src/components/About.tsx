"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Factory,
  Handshake,
  Ruler,
  Shield,
  Users,
} from "lucide-react";
import {
  aboutHighlights,
  aboutOverview,
  clientSatisfaction,
  company,
  coreBusiness,
  industriesServed,
  ourTeam,
  plantImages,
  whyUs,
} from "@/data/site";
import { FadeIn, RiseIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";
import { ClipReveal } from "@/components/ui/text-reveal";

const icons = [Factory, Ruler, Shield];

export default function About() {
  return (
    <section className="section-atmosphere steel-mesh bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClipReveal className="banner-media relative mb-8 overflow-hidden border border-line shadow-[0_28px_60px_-36px_rgba(1,77,110,0.5)] sm:mb-12">
          <Image
            src={plantImages.factory}
            alt="Jagdamba Procut steel processing facility"
            fill
            priority
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/30 to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-lg font-bold uppercase text-white sm:bottom-6 sm:left-6 sm:text-2xl">
            Vadodara · Steel Processing
          </p>
        </ClipReveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <RiseIn className="lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              About Us
            </p>
            <TextReveal
              as="h2"
              className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
            >
              {aboutOverview.subheading}
            </TextReveal>
            <p className="mt-2 text-base italic text-brand">
              {aboutOverview.intro}
            </p>
            <div className="accent-rule mt-4" aria-hidden />
            {aboutOverview.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-steel">
                {p}
              </p>
            ))}
            <p className="mt-6 border-l-4 border-brand bg-surface-muted/60 py-3 pl-4 text-sm font-semibold text-navy">
              Focus: {company.focus}
            </p>
            <p className="mt-3 text-sm text-steel">
              Since {company.since} · {company.certification} ·{" "}
              {company.location}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {aboutOverview.specializations.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </RiseIn>

          <div className="grid gap-5 lg:col-span-6">
            <FadeIn delay={0.04} className="media-kenburns relative aspect-[16/10] overflow-hidden border border-line">
              <Image
                src={plantImages.shed}
                alt="Covered steel processing shed"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>

            <FadeIn delay={0.06}>
              <article className="surface-lift border border-line bg-background p-5">
                <h3 className="font-display text-lg font-bold uppercase text-navy">
                  Our Core Business
                </h3>
                <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
                <ul className="mt-4 space-y-2">
                  {coreBusiness.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-steel">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            {aboutHighlights.map((item, i) => {
              const Icon = icons[i] ?? Factory;
              return (
                <FadeIn key={item.title} delay={0.08 + i * 0.05}>
                  <article className="surface-lift flex gap-4 border border-line bg-surface-muted/70 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-steel">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn className="section-atmosphere-navy mt-14 bg-navy px-6 py-8 text-white sm:px-8">
          <h3 className="font-display text-xl font-bold uppercase tracking-wide">
            Industries We Serve
          </h3>
          <div className="accent-rule mt-4" aria-hidden />
          <StaggerChildren className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industriesServed.map((industry) => (
              <StaggerItem key={industry}>
                <div className="border border-white/15 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-brand/50 hover:bg-white/10">
                  {industry}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-3">
          <StaggerItem>
            <article className="surface-lift h-full border border-line bg-background p-6">
              <div className="flex items-center gap-2 text-brand">
                <Users className="h-5 w-5" aria-hidden />
                <h3 className="font-display text-xl font-bold uppercase text-navy">
                  Our Team
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {ourTeam.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-steel">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="surface-lift h-full border border-line bg-background p-6">
              <div className="flex items-center gap-2 text-brand">
                <Shield className="h-5 w-5" aria-hidden />
                <h3 className="font-display text-xl font-bold uppercase text-navy">
                  Why Us!
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {whyUs.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-steel">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="relative h-full overflow-hidden border border-line bg-navy text-white">
              <Image
                src={plantImages.plates}
                alt=""
                fill
                className="object-cover opacity-35"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="relative p-6">
                <div className="flex items-center gap-2 text-brand">
                  <Handshake className="h-5 w-5" aria-hidden />
                  <h3 className="font-display text-xl font-bold uppercase">
                    Client Satisfaction
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-steel-light">
                  {clientSatisfaction.body}
                </p>
              </div>
            </article>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
