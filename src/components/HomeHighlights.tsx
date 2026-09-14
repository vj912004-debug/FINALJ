"use client";

import Link from "next/link";
import { ArrowRight, Factory, FileUp, Layers, Wrench } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import TextReveal from "@/components/ui/text-reveal";

const highlights = [
  {
    href: "/machinery",
    title: "Machinery",
    description: "CNC profile, 12 kW laser, CNC drilling and oxy-fuel cutting.",
    icon: Wrench,
  },
  {
    href: "/grades",
    title: "Grades",
    description: "Structural, boiler, alloy and wear-resistant steel grades.",
    icon: Layers,
  },
  {
    href: "/facilities",
    title: "Infrastructure",
    description: "26,000 sq. ft. shed, 75,000 sq. ft. yard, 4×20T cranes.",
    icon: Factory,
  },
  {
    href: "/quote",
    title: "Request a Quote",
    description: "Upload drawings and send full material / processing enquiry.",
    icon: FileUp,
  },
] as const;

export default function HomeHighlights() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Explore
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            Core Capabilities
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.href}>
                <SpotlightCard className="h-full">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col p-5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center bg-navy text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold uppercase text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-steel">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                      View
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
