"use client";

import {
  ArrowRight,
  ChevronDown,
  FileUp,
  MessageCircle,
  PackageSearch,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { company, homeCtas } from "@/data/site";
import VideoBackground from "@/components/VideoBackground";
import ShineLink from "@/components/ui/shine-link";
import TextReveal from "@/components/ui/text-reveal";

const ctaIcons = [FileUp, PackageSearch, MessageCircle, FileUp, Phone];

export default function Hero() {
  const reduce = useReducedMotion();
  const mobileCtas = homeCtas.slice(0, 3);
  const desktopCtas = homeCtas;

  return (
    <section className="hero-plate relative min-h-[min(100dvh,760px)] overflow-hidden text-white sm:min-h-[min(92vh,900px)] md:diagonal-bottom">
      <VideoBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-navy/70 sm:bg-gradient-to-r sm:from-navy/70 sm:via-navy/35 sm:to-navy/20"
        aria-hidden
      />
      {!reduce ? (
        <>
          <div
            className="ambient-orb ambient-orb--brand -right-16 top-16 h-56 w-56 sm:h-72 sm:w-72"
            aria-hidden
          />
          <div
            className="ambient-orb ambient-orb--peacock bottom-10 left-[-4rem] h-48 w-48 sm:h-64 sm:w-64"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative mx-auto flex min-h-[min(100dvh,760px)] max-w-7xl flex-col justify-center px-4 pb-28 pt-14 sm:min-h-[min(92vh,900px)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.p
          className="inline-flex w-fit items-center gap-2 border border-white/25 bg-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand sm:text-xs sm:tracking-[0.18em] md:text-sm"
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative h-2 w-2 rounded-full bg-brand" />
          </span>
          Vadodara, Gujarat · Steel Processing
        </motion.p>

        <h1 className="mt-4 max-w-5xl font-display text-[2rem] font-bold uppercase leading-[1.05] tracking-tight drop-shadow-sm sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
          <motion.span
            className="inline-block text-white"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Jagdamba
          </motion.span>{" "}
          <motion.span
            className="inline-block text-brand"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Procut
          </motion.span>
          <motion.span
            className="mt-1 block text-base font-semibold normal-case tracking-normal text-steel-light sm:mt-2 sm:text-2xl md:text-3xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            Pvt. Ltd.
          </motion.span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34, duration: 0.5 }}
        >
          <TextReveal
            as="p"
            className="mt-4 max-w-2xl text-base font-medium leading-snug text-white drop-shadow sm:mt-6 sm:text-xl md:text-2xl"
            delay={0.3}
          >
            {company.tagline}
          </TextReveal>
        </motion.div>

        <motion.div
          className="mt-4 h-1.5 w-20 origin-left bg-gradient-to-r from-brand via-gold-bright to-transparent sm:mt-6 sm:w-36"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        <motion.p
          className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-light sm:mt-5 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <span className="sm:hidden">
            Steel Plates · CNC · Laser · Drilling · UT · Logistics
          </span>
          <span className="hidden sm:inline">{company.serviceLine}</span>
        </motion.p>

        <motion.div
          className="mt-7 grid w-full grid-cols-1 gap-2.5 sm:hidden"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55 }}
        >
          {mobileCtas.map((cta, i) => {
            const Icon = ctaIcons[i] ?? ArrowRight;
            const tone =
              i === 0
                ? "btn btn-primary btn-shine btn-shine-loop btn-pulse w-full"
                : i === 2
                  ? "btn btn-whatsapp btn-shine btn-shine-loop w-full"
                  : "btn btn-ghost-light btn-shine btn-shine-loop w-full";

            return (
              <ShineLink
                key={cta.label}
                href={cta.href}
                external={cta.external}
                className={`${tone} min-h-12 rounded-sm border-0 text-xs shadow-none`}
                shine={false}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-center leading-tight">{cta.label}</span>
              </ShineLink>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 hidden w-full max-w-3xl grid-cols-2 gap-3 sm:grid lg:flex lg:max-w-none lg:flex-wrap"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55 }}
        >
          {desktopCtas.map((cta, i) => {
            const Icon = ctaIcons[i] ?? ArrowRight;
            const tone =
              i === 0
                ? "btn btn-primary btn-shine btn-shine-loop btn-pulse"
                : i === 2
                  ? "btn btn-whatsapp btn-shine btn-shine-loop"
                  : "btn btn-ghost-light btn-shine btn-shine-loop";

            return (
              <ShineLink
                key={cta.label}
                href={cta.href}
                external={cta.external}
                className={`${tone} w-full rounded-sm border-0 text-sm shadow-none lg:w-auto`}
                shine={false}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-center leading-tight">{cta.label}</span>
              </ShineLink>
            );
          })}
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
