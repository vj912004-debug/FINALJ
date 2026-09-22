import { processFlow, processTagline } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";
import ProcessTimeline from "@/components/ProcessTimeline";

export default function ProcessFlow() {
  return (
    <section className="section-atmosphere-navy relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            End-to-End
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Complete Solution Under One Roof
          </h2>
          <p className="mt-4 text-base font-medium text-peacock sm:text-lg">
            {processTagline}
          </p>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <ProcessTimeline steps={processFlow} />
      </div>
    </section>
  );
}
