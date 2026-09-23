"use client";

import {
  ArrowRight,
  ChevronDown,
  FileUp,
  MessageCircle,
  PackageSearch,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { company, homeCtas, plantImages } from "@/data/site";
import VideoBackground from "@/components/VideoBackground";
import ShineLink from "@/components/ui/shine-link";
import Image from "next/image";

const mobileHighlights = [
  { label: "26k Sq.Ft Shed", src: plantImages.shed },
  { label: "12 kW Laser", src: plantImages.laser },
  { label: "Plate Yard", src: plantImages.yard },
] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero-plate relative overflow-hidden text-white md:diagonal-bottom">
      {/* Desktop / tablet: video-capable background. Mobile uses image + cards below. */}
      <div className="absolute inset-0 hidden sm:block" aria-hidden>
        <VideoBackground />
      </div>

      {/* Mobile: static plant photo — not a video frame */}
      <div className="absolute inset-0 sm:hidden" aria-hidden>
        <Image
          src={plantImages.factory}
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/55 to-navy/92" />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-navy/70 via-navy/35 to-navy/20 sm:block"
        aria-hidden
      />
      {!reduce ? (
        <>
          <div
            className="ambient-orb ambient-orb--brand -right-16 top-16 hidden h-56 w-56 sm:block sm:h-72 sm:w-72"
            aria-hidden
          />
          <div
            className="ambient-orb ambient-orb--peacock bottom-10 left-[-4rem] hidden h-48 w-48 sm:block sm:h-64 sm:w-64"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative mx-auto flex min-h-[min(100dvh,720px)] max-w-7xl flex-col justify-end px-4 pb-8 pt-16 sm:min-h-[min(92vh,900px)] sm:justify-center sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:py-24">
        <h1 className="max-w-5xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Jagdamba <span className="text-brand">Procut</span>
          </motion.span>
          <motion.span
            className="mt-2 block text-2xl font-semibold tracking-[0.08em] text-white sm:mt-3 sm:text-4xl lg:text-5xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Pvt. Ltd.
          </motion.span>
        </h1>

        <motion.p
          className="mt-5 max-w-xl font-display text-lg font-semibold uppercase leading-snug tracking-tight text-white/90 sm:mt-6 sm:text-2xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Precision in Steel.{" "}
          <span className="text-brand">Strength in Every Cut.</span>
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
        >
          {company.serviceLine}
        </motion.p>

        {/* Mobile plant strip — photo cards instead of video framing */}
        <motion.div
          className="mt-5 grid grid-cols-3 gap-2 sm:hidden"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.45 }}
        >
          {mobileHighlights.map((item) => (
            <figure
              key={item.label}
              className="overflow-hidden border border-white/20 bg-white/5"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <figcaption className="px-1.5 py-1.5 text-center text-[9px] font-bold uppercase tracking-wide text-steel-light">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 flex w-full flex-col gap-2.5 sm:hidden"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
        >
          <ShineLink href="/quote" className="btn btn-primary min-h-12 w-full text-sm" shine={false}>
            Get a Quote
          </ShineLink>
          <ShineLink href="/quote#upload" className="btn btn-ghost-light min-h-12 w-full text-sm" shine={false}>
            <FileUp className="h-4 w-4" aria-hidden />
            Upload Drawing
          </ShineLink>
          <ShineLink
            href={homeCtas[2].href}
            external
            className="btn btn-whatsapp min-h-12 w-full text-sm"
            shine={false}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp Sales
          </ShineLink>
        </motion.div>

        <motion.div
          className="mt-8 hidden flex-wrap gap-3 sm:flex"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          <ShineLink href="/quote" className="btn btn-primary btn-shine-loop" shine={false}>
            Get a Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ShineLink>
          <ShineLink href="/quote#upload" className="btn btn-ghost-light" shine={false}>
            <FileUp className="h-4 w-4" aria-hidden />
            Upload Drawing
          </ShineLink>
          <ShineLink href="/stock-enquiry" className="btn btn-ghost-light" shine={false}>
            <PackageSearch className="h-4 w-4" aria-hidden />
            Check Material
          </ShineLink>
          <ShineLink href={homeCtas[2].href} external className="btn btn-whatsapp" shine={false}>
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp Sales
          </ShineLink>
        </motion.div>
      </div>

      {!reduce ? (
        <motion.a
          href="#strength"
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-light sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          aria-label="Scroll to content"
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 animate-scroll-cue text-brand" />
        </motion.a>
      ) : null}
    </section>
  );
}
