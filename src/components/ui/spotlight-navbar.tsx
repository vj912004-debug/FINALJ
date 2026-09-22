"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem, index: number) => void;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Machinery", href: "/machinery" },
    { label: "Contact", href: "/contact" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const activeFromPath = Math.max(
    0,
    items.findIndex((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }),
  );

  const activeIndex = activeFromPath >= 0 ? activeFromPath : defaultActiveIndex;

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        className="relative flex h-11 items-center gap-0 rounded-full border border-line bg-surface px-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        aria-label="Main navigation"
      >
        {items.map((item, idx) => {
          const active = activeIndex === idx;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onItemClick?.(item, idx)}
              className={cn(
                "group/nav relative rounded-full px-3 py-2 text-[12px] font-semibold transition-colors duration-200 2xl:px-4 2xl:text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                active ? "text-white" : "text-steel hover:text-white",
              )}
            >
              {active && !reduce ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-navy/8"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  aria-hidden
                />
              ) : active ? (
                <span className="absolute inset-0 rounded-full bg-navy/8" aria-hidden />
              ) : null}
              <span className="relative z-10">{item.label}</span>
              <span
                className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover/nav:scale-x-100"
                aria-hidden
              />
              {active ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-brand"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  aria-hidden
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SpotlightNavbar;
