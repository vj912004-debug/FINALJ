"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileUp } from "lucide-react";
import { machinery } from "@/data/site";
import { RiseIn } from "@/components/motion/Motion";

export default function MachineExplorer() {
  const [activeId, setActiveId] = useState<string>(machinery[0].id);
  const reduce = useReducedMotion();
  const baseId = useId();
  const active = machinery.find((m) => m.id === activeId) ?? machinery[0];

  const specs: [string, string][] = [
    ["Processing type", active.processType],
    ["Working dimensions", active.bedSize],
    ["Supported thickness", active.thickness],
    ["Capacity", active.capacity],
    ...(active.quantityNote ? ([["Machines", active.quantityNote]] as [string, string][]) : []),
  ];

  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Machine Capability Explorer</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Built for Heavy Plate Work
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
          <p className="mt-5 text-base leading-relaxed text-steel">
            Select a machine to see its working envelope, thickness range and typical jobs.
          </p>
        </RiseIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div role="tablist" aria-label="Machines" aria-orientation="vertical" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
            {machinery.map((m) => {
              const selected = m.id === activeId;
              return (
                <button
                  key={m.id}
                  id={`${baseId}-tab-${m.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setActiveId(m.id)}
                  className={`group relative flex min-w-0 items-center gap-3 overflow-hidden border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-300 sm:p-3 ${
                    selected
                      ? "border-brand bg-white shadow-[0_16px_36px_-26px_rgba(244,124,32,0.9)]"
                      : "border-line bg-white/70 hover:border-navy/30 hover:bg-white"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1 transition-colors ${selected ? "bg-brand" : "bg-transparent"}`}
                    aria-hidden
                  />
                  <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden bg-navy sm:block">
                    <Image src={m.image} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-display text-sm font-bold uppercase leading-tight tracking-wide ${selected ? "text-navy" : "text-ink"}`}>
                      {m.title}
                    </span>
                    <span className="mt-1 block truncate text-[11px] font-semibold uppercase tracking-wider text-steel">
                      {m.bedSize}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active.id}`}
            className="min-w-0 border border-line bg-white shadow-[0_24px_60px_-40px_rgba(11,35,72,0.45)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="grid xl:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy xl:aspect-auto xl:min-h-[420px]">
                  <Image
                    src={active.image}
                    alt={`${active.title} at Jagdamba Procut, Vadodara`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <p className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                    {active.capacity}
                  </p>
                </div>
                <div className="flex flex-col p-5 sm:p-7">
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-navy sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{active.summary}</p>

                  <dl className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
                    {specs.map(([k, v]) => (
                      <div key={k} className="bg-white p-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">{k}</dt>
                        <dd className="mt-1 text-sm font-semibold text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">Applications</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {active.applications.map((a) => (
                      <li key={a} className="border border-line bg-background px-2.5 py-1 text-xs font-semibold text-navy">
                        {a}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-1.5">
                    {active.details.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <Link href={`/quote?service=${active.rfqService}`} className="btn btn-primary">
                      Enquire for this machine
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link href="/quote#upload" className="btn btn-outline">
                      <FileUp className="h-4 w-4" aria-hidden />
                      Upload drawing
                    </Link>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
