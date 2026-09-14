import { Crosshair, Factory, Layers, Ruler } from "lucide-react";
import { stats } from "@/data/site";

const icons = {
  layers: Layers,
  factory: Factory,
  ruler: Ruler,
  laser: Crosshair,
} as const;

export default function StatsBar() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => {
          const Icon = icons[stat.icon];
          return (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-steel-light">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
