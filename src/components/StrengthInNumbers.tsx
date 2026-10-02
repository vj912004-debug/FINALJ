import { Cog, Crosshair, Factory, Layers, Package, Ruler } from "lucide-react";
import { stats, strengthExtras } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import CountUp from "@/components/ui/count-up";

const icons = {
  layers: Layers,
  factory: Factory,
  ruler: Ruler,
  laser: Crosshair,
  stock: Package,
  cnc: Cog,
} as const;

export default function StrengthInNumbers() {
  return (
    <section id="strength" className="scroll-mt-24 border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <FadeIn className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Capability</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Strength in Numbers
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel">
            Covered processing, open plate storage and heavy handling at one Vadodara site.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <StaggerItem key={stat.label} className="h-full">
                <article className="group relative h-full bg-white px-6 py-8 transition-colors duration-300 hover:bg-background sm:py-10">
                  <span
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden
                  />
                  <Icon className="h-6 w-6 text-brand" aria-hidden />
                  <p className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                    <CountUp value={stat.value} numeric={stat.numeric} suffix={stat.suffix} />
                  </p>
                  {stat.unit ? (
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {stat.unit}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                    {stat.label}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

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
