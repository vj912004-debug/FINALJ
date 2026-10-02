"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-brand"
      style={{ scaleX: reduce ? 0 : scrollYProgress }}
      aria-hidden
    />
  );
}
