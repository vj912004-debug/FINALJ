"use client";

import AgentBentoGrid from "@/components/ui/agent-bento-grid";
import { FadeIn } from "@/components/motion/Motion";

export default function AgentBentoSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Interactive Systems
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Agent Bento Grid
          </h2>
          <p className="mt-4 text-base text-steel">
            Live interactive cards for workflows, tools and activity — premium
            motion UI for a modern industrial brand experience.
          </p>
        </FadeIn>

        <div className="mt-10">
          <AgentBentoGrid className="max-w-6xl" />
        </div>
      </div>
    </section>
  );
}
