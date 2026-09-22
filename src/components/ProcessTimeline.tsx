"use client";

import { useEffect, useRef } from "react";

type ProcessTimelineProps = {
  steps: readonly string[];
};

/** Scroll-linked progress line for the 01–08 process steps. */
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const marks = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));

    if (reduce) {
      line.style.transform = "scaleY(1)";
      marks.forEach((el) => el.classList.add("is-active"));
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        });

        marks.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 78%",
            onEnter: () => el.classList.add("is-active"),
            onLeaveBack: () => el.classList.remove("is-active"),
          });
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [steps]);

  return (
    <div ref={rootRef} className="process-timeline relative mt-10">
      <div
        className="pointer-events-none absolute bottom-2 left-[1.15rem] top-2 w-px bg-white/15 sm:left-6"
        aria-hidden
      />
      <div
        ref={lineRef}
        className="pointer-events-none absolute bottom-2 left-[1.15rem] top-2 w-0.5 origin-top bg-brand sm:left-6"
        aria-hidden
      />
      <ol className="relative space-y-3">
        {steps.map((step, index) => (
          <li
            key={step}
            data-step
            className="process-step grid grid-cols-[2.5rem_1fr] items-center gap-3 border border-white/10 bg-white/5 px-3 py-3 sm:grid-cols-[3.25rem_1fr] sm:px-4 sm:py-4"
          >
            <span className="step-index font-display text-xl font-bold text-white/45 sm:text-2xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-sm">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
