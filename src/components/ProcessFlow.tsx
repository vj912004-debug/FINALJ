import { processFlow, processTagline } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

export default function ProcessFlow() {
  return (
    <section className="section-atmosphere-navy relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="steel-mesh pointer-events-none absolute inset-0 opacity-25" aria-hidden />
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

        <StaggerChildren className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processFlow.map((step, index) => (
            <StaggerItem key={step}>
              <article className="relative flex h-full flex-col border border-white/15 bg-white/5 p-5 transition-colors hover:border-brand/50 hover:bg-white/10">
                <span className="font-display text-3xl font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wide">
                  {step}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
