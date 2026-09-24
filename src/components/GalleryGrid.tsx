"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, X } from "lucide-react";
import { galleryCategories, galleryVideos } from "@/data/site";
import {
  FadeIn,
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

type GalleryItem =
  | { kind: "image"; id: string; title: string; image: string }
  | { kind: "video"; id: string; title: string; image: string; src: string };

const photoItems: GalleryItem[] = galleryCategories.map((c) => ({
  kind: "image",
  id: c.id,
  title: c.title,
  image: c.image,
}));

const videoItems: GalleryItem[] = galleryVideos.map((v) => ({
  kind: "video",
  id: v.id,
  title: v.title,
  image: v.poster,
  src: v.src,
}));

const filterGroups = [
  { id: "all", label: "All", match: () => true },
  { id: "videos", label: "Videos", match: (item: GalleryItem) => item.kind === "video" },
  {
    id: "plant",
    label: "Plant",
    match: (item: GalleryItem) =>
      ["factory", "covered-shed", "open-yard"].includes(item.id),
  },
  {
    id: "machines",
    label: "Machines",
    match: (item: GalleryItem) =>
      ["cnc-machines", "laser-machine", "cnc-drilling", "20-ton-cranes", "hydra"].includes(item.id),
  },
  {
    id: "cutting",
    label: "Cutting",
    match: (item: GalleryItem) =>
      ["heavy-plate-cutting", "large-profiles", "rings", "circles", "flanges", "finished-components"].includes(item.id),
  },
  {
    id: "material",
    label: "Material",
    match: (item: GalleryItem) => item.id === "steel-plate-stock",
  },
  {
    id: "dispatch",
    label: "Dispatch",
    match: (item: GalleryItem) =>
      ["loading", "unloading", "trailers", "dispatch"].includes(item.id),
  },
] as const;

export default function GalleryGrid() {
  const [active, setActive] = useState<(typeof filterGroups)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);

  const catalog = useMemo(() => [...videoItems, ...photoItems], []);

  const visible = useMemo(() => {
    const group = filterGroups.find((g) => g.id === active);
    return catalog.filter((item) => group?.match(item) ?? true);
  }, [active, catalog]);

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
            Photos & Plant Videos
          </TextReveal>
          <div className="accent-rule mx-auto mt-4" aria-hidden />
          <p className="mt-4 text-sm text-steel sm:text-base">
            Watch plant videos or filter stills by area.
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
          {visible.map((item, index) => (
            <StaggerItem key={item.id}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group relative w-full overflow-hidden border border-line bg-white text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {item.kind === "video" ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                        <Play className="h-5 w-5 fill-current" aria-hidden />
                      </span>
                    </span>
                  ) : null}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/35" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                      {item.kind === "video" ? `Video · ${item.title}` : item.title}
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
              aria-label="Previous"
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
              {current.kind === "video" ? (
                <video
                  key={current.src}
                  className="h-full w-full bg-black object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  poster={current.image}
                  autoPlay
                >
                  <source src={current.src} type="video/mp4" />
                </video>
              ) : (
                <Image src={current.image} alt={current.title} fill className="object-contain" sizes="90vw" />
              )}
              <figcaption className="absolute bottom-0 left-0 bg-black/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {current.title}
              </figcaption>
            </figure>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white"
              aria-label="Next"
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
