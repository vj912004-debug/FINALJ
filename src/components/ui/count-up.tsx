"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Server-renders the final value; animates 0 → target once the number scrolls into view.
 * If the element is already visible on mount it animates immediately.
 */
export default function CountUp({
  value,
  numeric,
  suffix = "",
  duration = 1200,
}: {
  value: string;
  numeric: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !Number.isFinite(numeric) || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(t < 1 ? Math.round(numeric * eased) : null);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) setDisplay(0);
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numeric, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display === null ? (
        value
      ) : (
        <>
          {display.toLocaleString("en-IN")}
          {suffix}
        </>
      )}
    </span>
  );
}
