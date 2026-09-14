"use client";

import Link from "next/link";
import { FileText, MessageCircle, PackageSearch } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import TextReveal from "@/components/ui/text-reveal";
import { company } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

const actions = [
  {
    title: "Request a Quote",
    blurb: "Send drawings, grade & quantity for a fast commercial response.",
    href: "/quote",
    icon: FileText,
    tone: "bg-brand text-white shadow-[0_20px_40px_-18px_rgba(241,90,36,0.7)]",
  },
  {
    title: "Check Stock",
    blurb: "Ask availability for plates and processing slots at Vadodara.",
    href: "/stock-enquiry",
    icon: PackageSearch,
    tone: "border border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
  },
  {
    title: "WhatsApp Sales",
    blurb: "Chat directly with our team for urgent project requirements.",
    href: `https://wa.me/91${company.whatsappNumber}`,
    icon: MessageCircle,
    tone: "border border-[#25D366]/50 bg-[#25D366]/15 text-white hover:bg-[#25D366]/25",
    external: true,
  },
] as const;

export default function InteractiveCTABand() {
  const reduce = useReducedMotion();

  return (
    <section className="section-atmosphere-navy relative overflow-hidden bg-navy py-14 text-white sm:py-16">
      <div className="steel-mesh pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand to-transparent"
        aria-hidden
      />
      {!reduce ? (
        <div
          className="ambient-orb ambient-orb--brand left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-40"
          aria-hidden
        />
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Next Step
          </p>
          <TextReveal
            as="h2"
            className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl"
          >
            Ready When Your Project Is
          </TextReveal>
          <p className="mx-auto mt-4 max-w-xl text-sm text-steel-light sm:text-base">
            Three clear paths — quote, stock check, or WhatsApp — pick what fits
            your timeline.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const isExternal = "external" in action && action.external;
            const cardClass = `teaser-shine group flex h-full min-h-[10rem] flex-col items-start gap-3 px-5 py-5 text-left transition-transform duration-300 ease-out hover:-translate-y-1.5 ${action.tone}`;

            const body = (
              <>
                <Icon
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden
                />
                <span className="font-display text-lg font-bold uppercase tracking-wide">
                  {action.title}
                </span>
                <span className="text-xs font-normal normal-case leading-relaxed tracking-normal text-white/80">
                  {action.blurb}
                </span>
              </>
            );

            return (
              <StaggerItem key={action.title}>
                {isExternal ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={action.href} className={cardClass}>
                    {body}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
