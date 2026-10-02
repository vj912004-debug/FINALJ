"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { galleryCategories, galleryVideos } from "@/data/site";
import { FadeIn, RiseIn } from "@/components/motion/Motion";
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

const ids = (...list: string[]) => (item: GalleryItem) => list.includes(item.id);

const filterGroups = [
  { id: "all", label: "All", match: () => true },
  { id: "factory", label: "Factory", match: ids("factory", "covered-shed", "open-yard") },
  { id: "machinery", label: "Machinery", match: ids("cnc-machines", "laser-machine", "cnc-drilling") },
  { id: "stock", label: "Steel Stock", match: ids("steel-plate-stock", "open-yard") },
  { id: "cutting", label: "Cutting Operations", match: ids("heavy-plate-cutting", "laser-machine", "large-profiles") },
  { id: "components", label: "Finished Components", match: ids("finished-components", "rings", "circles", "flanges", "large-profiles") },
  { id: "handling", label: "Material Handling", match: ids("20-ton-cranes", "hydra", "loading", "unloading", "trailers", "dispatch") },
  { id: "videos", label: "Videos", match: (item: GalleryItem) => item.kind === "video" },
] as const;

type FilterId = (typeof filterGroups)[number]["id"];

const catalog = [...photoItems, ...videoItems];

export default function GalleryGrid() {
  const [active, setActive] = useState<FilterId>("all");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => {
    const group = filterGroups.find((g) => g.id === active);
    return catalog.filter((item) => group?.match(item) ?? true);
  }, [active]);

  const counts = useMemo(
    () => Object.fromEntries(filterGroups.map((g) => [g.id, catalog.filter((i) => g.match(i)).length])),
    [],
  );

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  useEffect(() => {
    if (open === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      lastTrigger.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, visible.length]);

  const current = open === null ? null : visible[open];

  return (
    <section className="section-atmosphere steel-mesh bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Visual Archive</p>
          <TextReveal as="h2" className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy">
            Photos & Plant Videos
          </TextReveal>
          <div className="accent-rule mx-auto mt-4" aria-hidden />
          <p className="mt-4 text-sm text-steel sm:text-base">
            Filter by area of the plant. Select any image to open the full-screen viewer.
          </p>
        </RiseIn>

        <FadeIn delay={0.06}>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Gallery categories">
            {filterGroups.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setActive(f.id);
                    setOpen(null);
                  }}
                  className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors sm:text-[13px] ${
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-background text-navy hover:border-brand/50"
                  }`}
                >
                  {f.label}
                  <span className={`text-[10px] ${selected ? "text-white/80" : "text-steel"}`}>{counts[f.id]}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <motion.ul layout={!reduce} className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, index) => (
              <motion.li
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(index);
                  }}
                  className="group relative block w-full overflow-hidden border border-line bg-white text-left"
                  aria-label={`Open ${item.kind === "video" ? "video" : "image"}: ${item.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {item.kind === "video" ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-5 w-5 fill-current" aria-hidden />
                        </span>
                      </span>
                    ) : (
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Expand className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-3">
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                        {item.kind === "video" ? `Video · ${item.title}` : item.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {isClient ? createPortal(
        <AnimatePresence>
          {current ? (
            <motion.div
              className="fixed inset-0 z-[80] flex flex-col bg-navy/95"
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(null)}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6" onClick={(e) => e.stopPropagation()}>
                <p className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.16em]">
                  <span className="text-brand">{(open ?? 0) + 1} / {visible.length}</span>
                  <span className="ml-3 text-white/85">{current.title}</span>
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 hover:border-brand hover:text-brand"
                  aria-label="Close viewer"
                  onClick={() => setOpen(null)}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-navy/60 text-white hover:border-brand hover:text-brand sm:left-4"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={current.id}
                    className="relative h-full max-h-[78vh] w-full max-w-5xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onTouchStart={(e) => {
                      (e.currentTarget as HTMLElement).dataset.x = String(e.changedTouches[0]?.clientX ?? 0);
                    }}
                    onTouchEnd={(e) => {
                      const start = Number((e.currentTarget as HTMLElement).dataset.x || 0);
                      const dx = (e.changedTouches[0]?.clientX ?? 0) - start;
                      if (dx > 40) step(-1);
                      if (dx < -40) step(1);
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
                      <Image src={current.image} alt={current.title} fill className="object-contain" sizes="90vw" priority />
                    )}
                  </motion.figure>
                </AnimatePresence>

                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 bg-navy/60 text-white hover:border-brand hover:text-brand sm:right-4"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
        ) : null}
      </div>
    </section>
  );
}

const subscribeNoop = () => () => {};
