import {
  Building2,
  CheckCircle2,
  Cog,
  Construction,
  Factory,
  Fuel,
  Mountain,
  Settings,
} from "lucide-react";
import {
  commonApplications,
  industriesDetailed,
  industriesWhyChoose,
} from "@/data/site";
import {
  FadeIn,
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

const iconMap = {
  tank: Factory,
  gear: Cog,
  plant: Factory,
  oil: Fuel,
  mining: Mountain,
  building: Building2,
  crane: Construction,
  oem: Settings,
} as const;

export default function IndustriesSection() {
  return (
    <section className="section-atmosphere steel-mesh bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Industries &amp; Applications
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            Where Our Stock, Cutting and Processing Support Adds Value
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
        </RiseIn>

        <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industriesDetailed.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <StaggerItem key={item.title}>
                <article className="group surface-lift teaser-shine h-full border border-line bg-background p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-brand transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-navy">
                    {item.title}
                  </h3>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <FadeIn className="surface-lift border border-line bg-background p-6">
            <h3 className="font-display text-xl font-bold uppercase text-navy">
              Common Applications
            </h3>
            <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
            <ul className="mt-5 space-y-3">
              {commonApplications.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.08} className="border border-line bg-navy p-6 text-white">
            <h3 className="font-display text-xl font-bold uppercase text-brand">
              Why Choose Jagdamba Procut
            </h3>
            <ul className="mt-5 space-y-3">
              {industriesWhyChoose.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel-light">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
