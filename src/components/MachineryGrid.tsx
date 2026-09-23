"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

type MachineryItem = {
  id: string;
  title: string;
  capacity: string;
  bedSize: string;
  summary: string;
  image: string;
  details: readonly string[];
};

export default function MachineryGrid({
  items,
}: {
  items: readonly MachineryItem[];
}) {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Plant Machines
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
          >
            Built for Heavy Plate Work
          </TextReveal>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-base leading-relaxed text-steel">
            Large-format beds and industrial capacity for profile, laser,
            drilling and oxy-fuel plate work.
          </p>
        </RiseIn>

        <StaggerChildren className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((m) => (
            <StaggerItem key={m.id}>
              <article className="card-panel flex h-full flex-col overflow-hidden">
                <div className="group relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy" data-cursor="view">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="tech-scan" aria-hidden />
                  <p className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                    {m.capacity}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold uppercase leading-snug text-ink">
                    {m.title}
                  </h3>
                  <dl className="grid grid-cols-2 gap-px border border-line bg-line text-left">
                    <div className="bg-white p-3">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Capacity</dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">{m.capacity}</dd>
                    </div>
                    <div className="bg-white p-3">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">Size</dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">{m.bedSize}</dd>
                    </div>
                  </dl>
                  <p className="text-sm leading-relaxed text-steel">{m.summary}</p>
                  <ul className="mt-auto space-y-2 border-t border-line pt-5">
                    {m.details.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
