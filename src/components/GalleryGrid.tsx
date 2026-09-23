"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { galleryCategories } from "@/data/site";
import {
  FadeIn,
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

const filterGroups = [
  { id: "all", label: "All", ids: null as readonly string[] | null },
  {
    id: "plant",
    label: "Plant",
    ids: ["factory", "covered-shed", "open-yard"],
  },
  {
    id: "machines",
    label: "Machines",
    ids: ["cnc-machines", "laser-machine", "cnc-drilling", "20-ton-cranes", "hydra"],
  },
  {
    id: "cutting",
    label: "Cutting",
    ids: ["heavy-plate-cutting", "large-profiles", "rings", "circles", "flanges", "finished-components"],
  },
  {
    id: "material",
    label: "Material",
    ids: ["steel-plate-stock"],
  },
  {
    id: "dispatch",
    label: "Dispatch",
    ids: ["loading", "unloading", "trailers", "dispatch"],
  },
] as const;

export default function GalleryGrid() {
  const [active, setActive] = useState<(typeof filterGroups)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => {
    const group = filterGroups.find((g) => g.id === active);
    if (!group || !group.ids) return [...galleryCategories];
    return galleryCategories.filter((c) =>
      (group.ids as readonly string[]).includes(c.id),
    );
  }, [active]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") {
        setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, visible.length]);

  const current = open === null ? null : visible[open];

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
                  onClick={() => {
                    setActive(f.id);
                    setOpen(null);
                  }}
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
          {visible.map((cat, index) => (
            <StaggerItem key={cat.id}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group relative w-full overflow-hidden border border-line bg-white text-left"
                data-cursor="view"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/35" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                      {cat.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {current ? (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-white"
              aria-label="Close gallery"
              onClick={() => setOpen(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
              }}
            >
              ‹
            </button>
            <figure
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLElement).dataset.x = String(e.changedTouches[0]?.clientX ?? 0);
              }}
              onTouchEnd={(e) => {
                const start = Number((e.currentTarget as HTMLElement).dataset.x || 0);
                const dx = (e.changedTouches[0]?.clientX ?? 0) - start;
                if (dx > 40) setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
                if (dx < -40) setOpen((i) => (i === null ? i : (i + 1) % visible.length));
              }}
            >
              <Image src={current.image} alt={current.title} fill className="object-contain" sizes="90vw" />
              <figcaption className="absolute bottom-0 left-0 bg-black/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {current.title}
              </figcaption>
            </figure>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? i : (i + 1) % visible.length));
              }}
            >
              ›
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
