"use client";

import { CheckCircle2 } from "lucide-react";
import {
  machineCapacityChart,
  machineCapacityNote,
  machineValueAdded,
} from "@/data/site";
import SpecTable from "@/components/SpecTable";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

export default function MachineCapacitySection() {
  return (
    <section className="section-atmosphere bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Capacity Overview
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Machine Capacity Chart
          </h2>
          <p className="mt-3 text-sm italic text-brand">
            Processing capabilities for profile cutting, laser cutting and drilling
          </p>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <SpecTable
          columns={["Process / Facility", "Capacity / Quantity", "Remarks"]}
          rows={machineCapacityChart.map((item) => [
            item.process,
            item.capacity,
            item.remarks,
          ])}
          notes={[machineCapacityNote]}
        />

        <FadeIn>
          <h3 className="font-display text-xl font-bold uppercase text-navy">
            Value-Added Support
          </h3>
          <div className="mt-2 h-1 w-12 bg-brand" aria-hidden />
        </FadeIn>
        <StaggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {machineValueAdded.map((item) => (
            <StaggerItem key={item}>
              <div className="flex gap-2 border border-line bg-surface px-4 py-3 text-sm text-steel">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {item}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
