"use client";

import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type GradeMotionPanelProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

/** Motion-led grade visual — no AI photos */
export default function GradeMotionPanel({
  className,
  label = "Material Grades",
  compact = false,
}: GradeMotionPanelProps) {
  return (
    <div
      className={cn(
        "grade-visual flex h-full w-full items-center justify-center",
        compact ? "min-h-[9rem]" : "min-h-[11rem]",
        className,
      )}
      aria-hidden
    >
      <div className="grade-visual__mesh" />
      <div className="grade-orbit" />
      <div className="grade-orbit grade-orbit--inner" />
      <div className="grade-plate" />
      <div className="grade-plate" />
      <div className="grade-plate" />
      <div className="grade-visual__scan" />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-10 w-10 items-center justify-center border border-white/25 bg-white/10 text-brand">
          <Layers className="h-5 w-5" />
        </span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
          {label}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-peacock">
          Structural · Boiler · Alloy · Wear
        </span>
      </div>
    </div>
  );
}
