"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, FileUp, MessageCircle } from "lucide-react";
import { company } from "@/data/site";

export default function FloatingDock() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 520);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/landing") return null;

  const wa = `https://wa.me/91${company.whatsappNumber}?text=${encodeURIComponent(
    "Hello Jagdamba Procut, I want to send a steel / processing requirement.",
  )}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-end p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:p-0">
      <motion.div
        className="pointer-events-auto flex flex-col items-end gap-2.5"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence>
          {showTop ? (
            <motion.button
              key="top"
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-11 w-11 items-center justify-center border border-navy/20 bg-navy text-white shadow-[0_12px_28px_-12px_rgba(1,77,110,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </motion.button>
          ) : null}
        </AnimatePresence>

        <Link
          href="/quote"
          className="btn btn-primary btn-shine btn-shine-loop btn-pulse h-12 w-12 rounded-full px-0 sm:h-12 sm:w-auto sm:rounded-sm sm:px-4"
          aria-label="Request a quote"
        >
          <FileUp className="h-5 w-5 shrink-0" aria-hidden />
          <span className="hidden text-sm font-bold sm:inline">Get a Quote</span>
        </Link>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-shine btn-shine-loop dock-pulse h-12 w-12 rounded-full border-transparent bg-[#25D366] px-0 text-white hover:bg-[#1ebe57] sm:h-12 sm:w-auto sm:rounded-sm sm:px-4"
          aria-label="Send your requirement on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          <span className="hidden text-sm font-bold sm:inline">WhatsApp Sales</span>
        </a>
      </motion.div>
    </div>
  );
}
