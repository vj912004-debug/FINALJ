"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) return <Tag className={className}>{children}</Tag>;

  // Parent drives one whileInView; words stagger via variants (smoother than N observers)
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.035, delayChildren: delay },
        },
      }}
    >
      <Tag className={cn(className, "overflow-hidden")}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="mr-[0.28em] inline-block last:mr-0"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.38, ease },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ClipReveal({
  children,
  className,
  delay = 0,
}: ClipRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className, "overflow-hidden")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
