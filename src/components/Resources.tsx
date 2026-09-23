"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { importedMaterialNote, indianMills, mills } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

function MillCard({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <div className="group flex h-[88px] w-[160px] shrink-0 flex-col items-center justify-center gap-1 border border-line bg-white px-3 py-4 shadow-sm transition-all hover:border-brand/50 hover:shadow-[0_10px_28px_-14px_rgba(1,77,110,0.4)] sm:h-[100px] sm:w-[180px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={160}
        height={48}
        className="h-10 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11"
        aria-hidden
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}

function LogoMarquee({
  items,
  direction = "left",
  speed = 40,
}: {
  items: readonly { id: string; name: string; logo: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    if (!half) return;

    const deltaPx = (speed * delta) / 1000;
    let next = x.get() + (direction === "left" ? -deltaPx : deltaPx);

    if (direction === "left" && next <= -half) next += half;
    if (direction === "right" && next >= 0) next -= half;

    x.set(next);
  });

  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((mill) => (
          <MillCard key={mill.id} name={mill.name} logo={mill.logo} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-20"
        aria-hidden
      />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-3 sm:gap-4"
        style={{ x }}
      >
        {loopItems.map((mill, i) => (
          <MillCard
            key={`${mill.id}-${i}`}
            name={mill.name}
            logo={mill.logo}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Resources({ compact = false }: { compact?: boolean }) {
  const rowA = mills.slice(0, 5);
  const rowB = mills.slice(5);

  if (compact) {
    return (
      <section className="overflow-hidden border-y border-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Steel From Leading Mills
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Our Resources
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel">
                Materials from leading Indian and international steel manufacturers,
                with applicable Mill Test Certificates and traceability documents.
              </p>
            </div>
            <Link
              href="/resources"
              className="link-underline text-xs font-bold uppercase tracking-wider text-brand"
            >
              All material sources
            </Link>
          </FadeIn>
        </div>

        <div className="mt-10 space-y-4" aria-label="Steel mill logos">
          <LogoMarquee items={rowA} direction="left" speed={36} />
          <LogoMarquee items={rowB} direction="right" speed={32} />
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-surface py-0">
      <div className="relative bg-navy pt-16 text-white">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl pb-10 text-center lg:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Steel From Leading Mills
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Our Steel Makes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-steel-light sm:text-base lg:mx-0">
              We stock and supply materials from leading Indian and international
              steel manufacturers — with applicable Mill Test Certificates and
              traceability documents.
            </p>
          </FadeIn>
        </div>
        <div
          className="h-8 bg-surface"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden
        />
      </div>

      <div className="bg-surface pb-16 pt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-lg font-bold uppercase text-navy">
            Indian Mills
          </h3>
          <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {indianMills.map((mill) => (
              <li key={mill} className="flex gap-2 text-sm text-steel">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {mill}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4" aria-label="Steel mill logos">
            <LogoMarquee items={rowA.length ? rowA : mills} direction="left" speed={36} />
            <LogoMarquee
              items={rowB.length ? rowB : mills}
              direction="right"
              speed={32}
            />
          </div>

          <p className="mt-6 text-center text-xs uppercase tracking-[0.16em] text-steel">
            Hover to pause · Trusted mill partners for industrial plate supply
          </p>

          <div className="mt-10 border border-line bg-background p-5">
            <h3 className="font-display text-lg font-bold uppercase text-navy">
              Imported Material
            </h3>
            <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
            <p className="mt-4 text-sm leading-relaxed text-steel">
              {importedMaterialNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
