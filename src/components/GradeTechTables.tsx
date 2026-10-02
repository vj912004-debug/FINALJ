"use client";

import {
  chemistryNotes,
  commonGradeGroups,
  is2062Chemistry,
  mechanicalNotes,
  mechanicalProperties,
  otherGradeChemistry,
  stockRange,
  stockReferenceNote,
} from "@/data/site";
import SpecTable from "@/components/SpecTable";
import { FadeIn } from "@/components/motion/Motion";

export default function GradeTechTables() {
  return (
    <section className="section-atmosphere bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Ready Stock Summary
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Complete Stock Range
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <SpecTable
          title="Standard Stock Range"
          columns={["Parameter", "Details"]}
          rows={stockRange.map((item) => [item.parameter, item.details])}
          notes={[stockReferenceNote]}
        />

        <SpecTable
          title="Common Grades Available"
          columns={["Grade Group", "Typical Grades"]}
          rows={commonGradeGroups.map((item) => [item.group, item.grades])}
        />

        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Grade-wise Technical Reference
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Material Grade Data
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <SpecTable
          title={is2062Chemistry.heading}
          caption={is2062Chemistry.caption}
          columns={is2062Chemistry.columns}
          rows={is2062Chemistry.rows}
        />

        <SpecTable
          title={otherGradeChemistry.heading}
          caption={otherGradeChemistry.caption}
          columns={otherGradeChemistry.columns}
          rows={otherGradeChemistry.rows}
          notes={chemistryNotes}
        />

        <SpecTable
          title={mechanicalProperties.heading}
          caption={mechanicalProperties.caption}
          columns={mechanicalProperties.columns}
          rows={mechanicalProperties.rows}
          notes={mechanicalNotes}
        />
      </div>
    </section>
  );
}
