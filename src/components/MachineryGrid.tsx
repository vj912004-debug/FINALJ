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
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold uppercase leading-snug text-navy">
                    {m.title}
                  </h3>
                  <p className="inline-block max-w-full break-words bg-brand px-2.5 py-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-white sm:text-[11px]">
                    {m.capacity}
                  </p>
                  <p className="text-sm font-semibold text-peacock">
                    Processing size: {m.bedSize}
                  </p>
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
