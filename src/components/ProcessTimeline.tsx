"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { plantImages } from "@/data/site";

const shortLabels = [
  "Stock",
  "CNC Cutting",
  "Laser",
  "Drilling",
  "UT",
  "Inspection",
  "Handling",
  "Delivery",
] as const;

const stepImages = [
  plantImages.plates,
  plantImages.cnc,
  plantImages.laser,
  plantImages.drilling,
  plantImages.ut,
  plantImages.components,
  plantImages.crane,
  plantImages.dispatch,
] as const;

export default function ProcessTimeline({ steps }: { steps: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const pointerOver = useRef(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const scaleX = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(smooth, "change", (value) => {
    if (pointerOver.current) return;
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={ref} className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-8">
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-5 h-px bg-line" aria-hidden />
          {!reduce ? (
            <motion.div
              className="absolute left-0 top-5 h-px origin-left bg-brand"
              style={{ scaleX, width: "100%" }}
              aria-hidden
            />
          ) : null}
          <ol
            className="relative grid grid-cols-8 gap-3"
            onMouseEnter={() => {
              pointerOver.current = true;
            }}
            onMouseLeave={() => {
              pointerOver.current = false;
            }}
          >
            {steps.map((step, index) => (
              <li key={step} className="relative">
                <button
                  type="button"
                  className={`w-full pt-10 text-left transition-colors ${
                    index === active ? "text-ink" : "text-steel hover:text-ink"
                  }`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => {
                    pointerOver.current = true;
                    setActive(index);
                  }}
                  onBlur={() => {
                    pointerOver.current = false;
                  }}
                  aria-pressed={index === active}
                >
                  <span
                    className={`absolute left-0 top-0 font-display text-sm font-semibold ${
                      index === active ? "text-brand" : "text-steel"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                    {shortLabels[index] ?? step}
                  </p>
                  <p className="mt-2 text-[11px] leading-snug">{step}</p>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <ol className="relative space-y-2 border-l border-line pl-6 lg:hidden">
          {steps.map((step, index) => (
            <li key={step}>
              <button
                type="button"
                className="w-full py-2 text-left"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
              >
                <p className={`font-display text-sm font-semibold ${index === active ? "text-brand" : "text-ink"}`}>
                  {String(index + 1).padStart(2, "0")} {shortLabels[index] ?? ""}
                </p>
                <p className="mt-1 text-sm text-steel">{step}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <figure className="relative aspect-[4/3] overflow-hidden border border-line bg-white lg:col-span-4">
        {stepImages.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt=""
            fill
            className={`object-cover transition-opacity duration-300 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 30vw"
          />
        ))}
        <figcaption className="absolute bottom-0 left-0 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
          {String(active + 1).padStart(2, "0")} {steps[active]}
        </figcaption>
      </figure>
    </div>
  );
}
