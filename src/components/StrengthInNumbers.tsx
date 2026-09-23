"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { stats, strengthExtras } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

const units = ["Sq. Ft.", "Sq. Ft.", "", ""] as const;

function formatCount(n: number) {
  return n.toLocaleString("en-IN");
}

function CountStat({
  numeric,
  suffix,
  staticValue,
  active,
}: {
  numeric: number;
  suffix: string;
  staticValue: string;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (reduce || !active) return;
    const target = Number(numeric);
    if (!Number.isFinite(target)) return;

    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(t < 1 ? Math.round(target * eased) : target);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, numeric, reduce]);

  if (reduce || display === null) return <>{staticValue}</>;
  return (
    <>
      {formatCount(display)}
      {suffix}
    </>
  );
}

export default function StrengthInNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="strength"
      ref={sectionRef}
      className="scroll-mt-24 border-y border-line bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Capability
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Strength in Numbers
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className="bg-white px-5 py-8 sm:px-6 sm:py-10">
              <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-ink sm:text-5xl">
                <CountStat
                  numeric={stat.numeric}
                  suffix={stat.suffix}
                  staticValue={stat.value}
                  active={active}
                />
              </p>
              {units[index] ? (
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  {units[index]}
                </p>
              ) : null}
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {strengthExtras.map((item) => (
            <li
              key={item}
              className="border border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-steel"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
