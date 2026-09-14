"use client";

import Link from "next/link";
import {
  Crosshair,
  Factory,
  Ruler,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

const items = [
  {
    icon: Factory,
    title: "Stock + Processing",
    blurb: "Plates and cutting under one roof",
    href: "/facilities",
  },
  {
    icon: Wrench,
    title: "CNC Profile",
    blurb: "Large-format beds for heavy plate",
    href: "/machinery",
  },
  {
    icon: Crosshair,
    title: "12 kW Laser",
    blurb: "Fast, accurate profile cutting",
    href: "/services",
  },
  {
    icon: ShieldCheck,
    title: "UT & Traceability",
    blurb: "ASTM / EN testing support",
    href: "/quality",
  },
  {
    icon: Ruler,
    title: "Project Grades",
    blurb: "Structural to wear-resistant",
    href: "/grades",
  },
  {
    icon: Truck,
    title: "Dispatch Ready",
    blurb: "Crane, Hydra & logistics",
    href: "/contact",
  },
] as const;

export default function TrustStrip() {
  return (
    <section className="section-atmosphere border-y border-line bg-surface py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Why Buyers Choose Us
            </p>
            <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-navy sm:text-2xl">
              Built for Industrial Projects
            </h2>
          </div>
          <Link
            href="/quote"
            className="btn btn-primary btn-shine w-fit text-[11px] sm:text-xs"
          >
            Request a Quote
          </Link>
        </FadeIn>

        <StaggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Link
                  href={item.href}
                  className="card-panel group flex h-full flex-col gap-3 p-4"
                >
                  <span className="icon-pop flex h-10 w-10 items-center justify-center bg-navy text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-navy">
                    {item.title}
                  </span>
                  <span className="text-xs leading-relaxed text-steel">
                    {item.blurb}
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
