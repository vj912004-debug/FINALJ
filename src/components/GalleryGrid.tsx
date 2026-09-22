"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
  const [active, setActive] = useState<(typeof filterGroups)[number]["id"]>(
    "all",
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
              <article className="teaser-shine group relative overflow-hidden border border-line bg-background shadow-[0_18px_40px_-30px_rgba(1,77,110,0.4)]">
                <div className="media-kenburns relative aspect-[4/3] overflow-hidden bg-navy/5">
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
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
