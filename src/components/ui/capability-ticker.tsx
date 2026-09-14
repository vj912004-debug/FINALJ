"use client";

import { useReducedMotion } from "framer-motion";

const items = [
  "Steel Plates",
  "CNC Profile Cutting",
  "12 kW Laser",
  "CNC Drilling",
  "Oxy-Fuel Cutting",
  "Ultrasonic Testing",
  "Thickness Meter",
  "20T Cranes",
  "Hydra Loading",
  "Full Logistics",
  "Mill Traceability",
  "Project Dispatch",
];

export default function CapabilityTicker() {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  if (reduce) {
    return (
      <section className="border-y border-line bg-navy py-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-xs font-bold uppercase tracking-[0.16em] text-steel-light">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="group/ticker relative overflow-hidden border-y border-white/10 bg-navy py-4 text-white"
      aria-label="Processing capabilities"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
      <div className="flex w-max animate-marquee gap-0 group-hover/ticker:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center gap-4 px-5 text-xs font-bold uppercase tracking-[0.18em] text-steel-light sm:text-[13px]"
          >
            <span className="text-brand">◆</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
