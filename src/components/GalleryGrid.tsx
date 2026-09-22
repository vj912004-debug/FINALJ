"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { galleryCategories } from "@/data/site";
import {
  FadeIn,
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

const filterGroups = [
  {
    id: "all",
    label: "All",
    ids: null as readonly string[] | null,
  },
  {
    id: "plant",
    label: "Plant",
    ids: ["factory", "covered-shed", "open-yard", "steel-plate-stock"],
  },
  {
    id: "machines",
    label: "Machines",
    ids: [
      "cnc-machines",
      "laser-machine",
      "cnc-drilling",
      "heavy-plate-cutting",
    ],
  },
  {
    id: "handling",
    label: "Handling",
    ids: ["20-ton-cranes", "hydra", "loading", "unloading", "trailers"],
  },
  {
    id: "output",
    label: "Output",
    ids: [
      "finished-components",
      "rings",
      "circles",
      "flanges",
      "large-profiles",
      "dispatch",
    ],
  },
] as const;

export default function GalleryGrid() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof filterGroups)[number]["id"]>(
    "all",
  );
  const [open, setOpen] = useState<(typeof galleryCategories)[number] | null>(
    null,
  );

  const visible = useMemo(() => {
    const group = filterGroups.find((g) => g.id === active);
    if (!group || !group.ids) return galleryCategories;
    return galleryCategories.filter((c) =>
      (group.ids as readonly string[]).includes(c.id),
    );
  }, [active]);

  return (
    <section className="section-atmosphere steel-mesh bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Visual Archive
          </p>
          <TextReveal
            as="h2"
            className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy"
          >
            Plant · Machines · Dispatch
          </TextReveal>
          <div className="accent-rule mx-auto mt-4" aria-hidden />
          <p className="mt-4 text-sm text-steel sm:text-base">
            Filter by area — replace with real plant photos when ready.
          </p>
        </RiseIn>

        <FadeIn delay={0.06}>
          <div
            className="mt-8 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Gallery categories"
          >
            {filterGroups.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f.id)}
                  className={`border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-[13px] ${
                    selected
                      ? "border-brand bg-brand text-white brand-glow"
                      : "border-line bg-background text-navy hover:border-brand/40"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((cat) => (
            <StaggerItem key={cat.id}>
              <button
                type="button"
                onClick={() => setOpen(cat)}
                className="teaser-shine card-panel group relative w-full overflow-hidden border border-line bg-background text-left"
              >
                <div className="media-kenburns media-skeleton relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent opacity-80 transition-opacity duration-400 group-hover:opacity-95"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                      {cat.title}
                    </h3>
                    <span className="mt-1 inline-block h-0.5 w-8 bg-brand transition-all duration-300 group-hover:w-14" />
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden border border-white/15 bg-navy"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={open.image}
                alt={open.title}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="font-display text-lg font-bold uppercase text-white">
                  {open.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute right-3 top-3 border border-white/30 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
