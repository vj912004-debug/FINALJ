"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/** CSS-only hover spotlight — no mousemove React state */
export default function SpotlightCard({
  children,
  className,
}: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-navy/30 hover:shadow-[0_24px_56px_-28px_rgba(1,77,110,0.5)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 30% 20%, rgba(241,90,36,0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-peacock transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
