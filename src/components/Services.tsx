"use client";

import Image from "next/image";
import { CircleDot, Crosshair, Flame, Radar, Ruler, Wrench } from "lucide-react";
import { serviceHighlights, services } from "@/data/site";
import type { Service } from "@/data/site";
import {
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

const iconMap = {
  flame: Flame,
  zap: Ruler,
  wrench: Wrench,
  laser: Crosshair,
  drill: CircleDot,
  ut: Radar,
} as const;

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <article className="group card-panel flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-navy">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 bg-surface p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-wide text-navy sm:text-xl">
              {service.title}
            </h3>
            <p className="mt-2 inline-block max-w-full break-words bg-brand px-2.5 py-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-white sm:text-[11px]">
              {service.capacity}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-steel">{service.summary}</p>

        <ul className="mt-auto space-y-2 border-t border-line pt-4">
          {service.details.map((detail) => (
            <li
              key={detail}
              className="flex gap-2 text-sm text-ink before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand before:content-['']"
            >
              {detail}
            </li>
          ))}
        </ul>

        {service.materials ? (
          <div className="flex flex-wrap gap-1.5">
            {service.materials.map((m) => (
              <span
                key={m}
                className="border border-line bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-brand"
              >
                {m}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Advanced Processing
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            CNC · Laser · Drilling · UT
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-base leading-relaxed text-steel">
            Complete steel processing under one roof — CNC profile cutting,
            12&nbsp;kW laser cutting, CNC drilling, heavy plate oxy-fuel cutting,
            ultrasonic testing and thickness verification.
          </p>
        </RiseIn>

        <StaggerChildren className="mt-8 space-y-2">
          {serviceHighlights.map((line) => (
            <StaggerItem key={line}>
              <div className="border-l-4 border-brand bg-navy/5 px-4 py-3 text-sm font-semibold text-navy">
                {line}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
