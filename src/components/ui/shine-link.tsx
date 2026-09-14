"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShineLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** true = hover shine, "loop" = continuous highlight sweep */
  shine?: boolean | "loop";
};

export default function ShineLink({
  href,
  children,
  className = "",
  external = false,
  shine = true,
}: ShineLinkProps) {
  const continuous = shine === "loop";
  const classes = cn(
    "group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-sm px-5 py-3.5 text-sm font-bold uppercase tracking-wide transition-[transform,colors,box-shadow] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      {shine ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent",
            continuous
              ? "shine-loop"
              : "transition-transform duration-700 ease-out group-hover:translate-x-[220%]",
          )}
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(classes, "w-full sm:w-auto")}>
      {inner}
    </Link>
  );
}
