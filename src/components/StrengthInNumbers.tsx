"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Crosshair, Factory, Layers, Ruler } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats, strengthExtras } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

const icons = {
  layers: Layers,
  factory: Factory,
  ruler: Ruler,
  laser: Crosshair,
} as const;

function formatCount(n: number) {
  return n.toLocaleString("en-IN");
}

function AnimatedValue({
  numeric,
  suffix,
  staticValue,
}: {
  numeric: number;
  suffix: string;
  staticValue: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(reduce ? numeric : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(numeric * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, reduce]);

  if (reduce) return <span ref={ref}>{staticValue}</span>;
  return (
    <span ref={ref}>
      {formatCount(display)}
      {suffix}
    </span>
  );
}

export default function StrengthInNumbers() {
  return (
    <section id="strength" className="relative overflow-hidden bg-navy text-white scroll-mt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(14,165,198,0.28), transparent 42%), radial-gradient(circle at 85% 75%, rgba(241,90,36,0.22), transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Capacity at a Glance
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Our Strength in Numbers
          </h2>
          <div className="accent-rule mx-auto mt-4" aria-hidden />
        </FadeIn>

        <StaggerChildren className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <StaggerItem key={stat.label}>
                <article className="group flex h-full flex-col items-center border border-white/15 bg-white/5 px-3 py-6 text-center transition-all duration-300 hover:border-peacock/50 hover:bg-white/10 hover:shadow-[0_16px_40px_-20px_rgba(241,90,36,0.45)] sm:px-4 sm:py-10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  </span>
                  <p className="mt-4 font-display text-3xl font-bold tabular-nums tracking-tight text-brand sm:mt-6 sm:text-5xl">
                    <AnimatedValue
                      numeric={stat.numeric}
                      suffix={stat.suffix}
                      staticValue={stat.value}
                    />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.1em] text-white sm:mt-3 sm:text-sm sm:tracking-[0.12em]">
                    {stat.label}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {strengthExtras.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-steel-light sm:text-[13px]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-peacock" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
