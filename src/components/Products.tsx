"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  products,
  supportedGrades,
  readyStockAdvantage,
  gradeCategories,
  gradesWithMedia,
} from "@/data/site";
import {
  CheckCircle2,
  Flame,
  Hammer,
  Layers,
  Shield,
} from "lucide-react";
import {
  FadeIn,
  RiseIn,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";
import GradeMotionPanel from "@/components/ui/grade-motion-panel";

type GradeMediaItem = (typeof gradesWithMedia)[number];

function GradePhotoCard({ item }: { item: GradeMediaItem }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden">
      <Image
        src={item.image}
        alt={`${item.grade} steel plate`}
        fill
        className="object-cover"
        sizes="280px"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <p className="font-display text-sm font-bold uppercase leading-snug tracking-wide text-white sm:text-[0.95rem]">
          {item.grade}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-peacock">
          {item.categoryName.split("&")[0].trim()}
        </p>
        <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wider text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Stock / Indent
        </span>
      </div>
    </div>
  );
}

const filters = [
  { id: "all", label: "All Grades" },
  ...gradeCategories.map((c) => ({ id: c.id, label: c.name })),
] as const;

const categoryMeta: Record<
  string,
  { icon: typeof Layers; tone: string; hint: string }
> = {
  structural: {
    icon: Layers,
    tone: "from-navy to-navy-mid",
    hint: "Buildings · structures · fabrication",
  },
  boiler: {
    icon: Flame,
    tone: "from-brand to-brand-deep",
    hint: "Pressure vessels · boilers · tanks",
  },
  alloy: {
    icon: Hammer,
    tone: "from-peacock to-navy",
    hint: "Shafts · tooling · engineering parts",
  },
  wear: {
    icon: Shield,
    tone: "from-navy-mid to-brand",
    hint: "Wear plates · mining · heavy duty",
  },
};

function gradeCategoryLabel(grade: string) {
  const found = gradeCategories.find((c) =>
    (c.grades as readonly string[]).includes(grade),
  );
  return found?.name ?? "Special / Equivalent";
}

export default function Products() {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      active === "all" ? products : products.filter((p) => p.id === active),
    [active],
  );

  const gradePhotos = useMemo(
    () =>
      active === "all"
        ? gradesWithMedia
        : gradesWithMedia.filter((g) => g.categoryId === active),
    [active],
  );

  return (
    <section className="section-atmosphere steel-mesh bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <RiseIn className="lg:col-span-7">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
              Material Grades
            </p>
            <TextReveal
              as="h2"
              className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
            >
              Steel Grades We Supply
            </TextReveal>
            <div className="accent-rule mt-4" aria-hidden />
            <p className="mt-5 text-base leading-relaxed text-steel">
              Structural &amp; carbon, boiler &amp; pressure vessel, alloy &amp;
              engineering, and high-strength / wear-resistant plates — special
              and equivalent grades subject to availability.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {readyStockAdvantage.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </RiseIn>

          <FadeIn delay={0.08} className="lg:col-span-5">
            <div className="overflow-hidden border border-line shadow-[0_24px_50px_-32px_rgba(1,77,110,0.55)]">
              <GradeMotionPanel className="aspect-[16/11] min-h-0" />
            </div>
          </FadeIn>
        </div>

        <div
          className="mt-12 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scroll-snap-x sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Grade category filters"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
              className={`snap-start shrink-0 border px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all ${
                active === f.id
                  ? "border-brand bg-brand text-white brand-glow"
                  : "border-line bg-surface text-ink hover:border-brand/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <FadeIn delay={0.04} className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-navy">
                Materials &amp; Grades Available
              </h3>
              <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
              <p className="mt-2 text-sm text-steel">
                Sliding grade gallery — hover a card to pause and zoom.
              </p>
            </div>
            <p className="hidden text-xs font-semibold uppercase tracking-wider text-steel sm:block">
              {gradePhotos.length} grades
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`photos-${active}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative -mx-4 overflow-hidden sm:mx-0"
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-12"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-12"
                aria-hidden
              />

              {reduce ? (
                <div className="flex gap-3 overflow-x-auto px-4 pb-2 scroll-snap-x sm:px-0">
                  {gradePhotos.map((item) => (
                    <article
                      key={item.grade}
                      className="grade-photo-card grade-slide-card snap-start"
                    >
                      <GradePhotoCard item={item} />
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grade-slide-track py-1 pl-4 sm:pl-0">
                  {[...gradePhotos, ...gradePhotos].map((item, i) => (
                    <article
                      key={`${item.grade}-${i}`}
                      className="grade-photo-card grade-slide-card"
                    >
                      <GradePhotoCard item={item} />
                    </article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={`cats-${active}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-5 sm:grid-cols-2"
          >
            {visible.map((product, idx) => {
              const meta = categoryMeta[product.id] ?? categoryMeta.structural;
              const Icon = meta.icon;
              return (
                <motion.article
                  key={product.id}
                  className="grade-card-accent surface-lift teaser-shine flex h-full flex-col border border-line bg-surface"
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                >
                  <div
                    className={`bg-gradient-to-r ${meta.tone} px-4 py-3 text-white`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {product.name}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/80">{meta.hint}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-navy">
                      <Layers className="h-4 w-4" aria-hidden />
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                        Grades
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.grades.map((grade, i) => (
                        <motion.span
                          key={grade}
                          className="grade-chip border border-line bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-ink"
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.03, duration: 0.28 }}
                        >
                          {grade}
                        </motion.span>
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-steel">
                      {product.description}
                    </p>
                    <p className="mt-4 border-t border-line pt-3 text-xs text-steel">
                      <span className="font-semibold text-navy">Applications: </span>
                      {product.applications}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <FadeIn className="mt-10 overflow-hidden border border-line shadow-[0_20px_50px_-40px_rgba(1,77,110,0.35)] sm:mt-14">
          <div className="bg-navy px-4 py-3 sm:px-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Supported Material Grades
            </h3>
            <p className="mt-1 text-[11px] text-steel-light sm:hidden">
              Swipe table sideways to see all columns
            </p>
          </div>
          <div className="-mx-0 overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-muted">
                  <th className="border-b border-line px-4 py-3 font-semibold text-navy">
                    #
                  </th>
                  <th className="border-b border-line px-4 py-3 font-semibold text-navy">
                    Grade / Spec
                  </th>
                  <th className="border-b border-line px-4 py-3 font-semibold text-navy">
                    Category
                  </th>
                  <th className="border-b border-line px-4 py-3 font-semibold text-navy">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportedGrades.map((grade, index) => (
                  <tr
                    key={grade}
                    className={`transition-colors hover:bg-brand/5 ${
                      index % 2 === 0 ? "bg-surface" : "bg-background"
                    }`}
                  >
                    <td className="border-b border-line px-4 py-2.5 tabular-nums text-steel">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="border-b border-line px-4 py-2.5 font-semibold text-navy">
                      {grade}
                    </td>
                    <td className="border-b border-line px-4 py-2.5 text-steel">
                      {gradeCategoryLabel(grade)}
                    </td>
                    <td className="border-b border-line px-4 py-2.5 font-medium text-brand">
                      Stock / Indent
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-line bg-surface-muted px-4 py-3 text-xs text-steel">
            Special and equivalent grades can also be supplied subject to
            availability. Mill Test Certificates and traceability documents
            available as applicable.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
