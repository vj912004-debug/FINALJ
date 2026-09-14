import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { deliverySupport, qualityTesting } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

export default function QualityDelivery() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Quality, Testing &amp; Delivery
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            {qualityTesting.subheading}
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FadeIn className="surface-lift border border-line bg-background p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-navy">
                {qualityTesting.heading}
              </h3>
            </div>
            <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
            <ul className="mt-6 space-y-3">
              {qualityTesting.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.08} className="surface-lift border border-line bg-background p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <Truck className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-navy">
                {deliverySupport.heading}
              </h3>
            </div>
            <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
            <ul className="mt-6 space-y-3">
              {deliverySupport.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
