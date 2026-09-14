"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { company } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";
import BrandButton from "@/components/ui/brand-button";
import TextReveal from "@/components/ui/text-reveal";

export default function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="section-atmosphere-navy relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="steel-mesh pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      {!reduce ? (
        <>
          <div
            className="ambient-orb ambient-orb--brand right-[-3rem] top-0 h-52 w-52"
            aria-hidden
          />
          <div
            className="ambient-orb ambient-orb--peacock bottom-[-2rem] left-[-2rem] h-48 w-48"
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Start Your Enquiry
          </p>
          <TextReveal
            as="h2"
            className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl"
          >
            Precision Steel. Ready When You Are.
          </TextReveal>
          <div className="accent-rule mx-auto mt-5" aria-hidden />
          <p className="mt-5 text-base leading-relaxed text-steel-light sm:text-lg">
            Share drawings, grade and quantity — our Vadodara team responds with
            stock availability, processing options and delivery support.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <BrandButton href="/quote" variant="primary" pulse className="w-full sm:w-auto">
            Request a Quote
          </BrandButton>
          <BrandButton href="/stock-enquiry" variant="ghost" className="w-full sm:w-auto">
            Check Stock
          </BrandButton>
          <BrandButton
            href={`https://wa.me/91${company.whatsappNumber}`}
            external
            variant="whatsapp"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </BrandButton>
        </FadeIn>

        <FadeIn
          delay={0.16}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-steel-light"
        >
          <a
            href={`tel:+91${company.whatsappNumber}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4 text-brand" aria-hidden />
            +91 {company.whatsappNumber}
          </a>
          <Link
            href="/contact"
            className="link-underline inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-peacock"
          >
            Contact team
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
