"use client";

import { useMemo, useState } from "react";
import {
  products,
  supportedGrades,
  materialGradesList,
  readyStockAdvantage,
  gradeCategories,
} from "@/data/site";
import { CheckCircle2, Layers } from "lucide-react";
import { FadeIn, RiseIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";

const filters = [
  { id: "all", label: "All Grades" },
  ...gradeCategories.map((c) => ({ id: c.id, label: c.name })),
] as const;

function gradeCategoryLabel(grade: string) {
  const found = gradeCategories.find((c) =>
    (c.grades as readonly string[]).includes(grade),
  );
  return found?.name ?? "Special / Equivalent";
}

export default function Products() {
  const [active, setActive] = useState("all");

  const visible = useMemo(
    () =>
      active === "all" ? products : products.filter((p) => p.id === active),
    [active],
  );

  return (
    <section className="section-atmosphere steel-mesh bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-2xl">
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

        <FadeIn delay={0.06} className="mt-10 border border-line bg-surface p-5 shadow-[0_20px_50px_-40px_rgba(1,77,110,0.4)] sm:p-6">
          <h3 className="font-display text-lg font-bold uppercase text-navy">
            Materials &amp; Grades Available
          </h3>
          <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {materialGradesList.map((grade) => (
              <div
                key={grade}
                className="border border-line bg-background px-3 py-2 text-sm font-medium text-navy transition-colors hover:border-brand/40"
              >
                {grade}
              </div>
            ))}
          </div>
        </FadeIn>

        <div
          className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scroll-snap-x sm:mx-0 sm:px-0"
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

        <StaggerChildren className="mt-8 grid gap-5 sm:grid-cols-2">
          {visible.map((product) => (
            <StaggerItem key={product.id}>
              <article className="surface-lift teaser-shine flex h-full flex-col border border-line bg-surface p-5">
                <div className="bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {product.name}
                </div>
                <div className="mt-4 flex items-center gap-2 text-navy">
                  <Layers className="h-4 w-4" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                    Grades
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.grades.map((grade) => (
                    <span
                      key={grade}
                      className="border border-line bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-ink"
                    >
                      {grade}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-steel">
                  {product.description}
                </p>
                <p className="mt-4 border-t border-line pt-3 text-xs text-steel">
                  <span className="font-semibold text-navy">Applications: </span>
                  {product.applications}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

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
                    className={index % 2 === 0 ? "bg-surface" : "bg-background"}
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
