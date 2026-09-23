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
  const [footerInView, setFooterInView] = useState(false);

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

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/landing") return null;

  const wa = `https://wa.me/91${company.whatsappNumber}?text=${encodeURIComponent(
    "Hello Jagdamba Procut, I want to send a steel / processing requirement.",
  )}`;

  const showCtas = !footerInView;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] hidden justify-end p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-[max(0.75rem,env(safe-area-inset-right))] md:flex sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:p-0">
      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {showTop ? (
            <motion.button
              key="top"
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-11 w-11 items-center justify-center border border-navy/20 bg-navy text-white shadow-[0_12px_28px_-12px_rgba(1,77,110,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </motion.button>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showCtas ? (
            <motion.div
              key="cta-stack"
              className="flex flex-col items-end gap-2.5"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22 }}
            >
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
                className="group btn btn-shine btn-shine-loop dock-pulse h-14 w-14 rounded-full border-transparent bg-[#25D366] px-0 text-white hover:bg-[#1ebe57] sm:h-12 sm:w-auto sm:rounded-sm sm:px-4"
                aria-label="Talk to sales on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                <span className="hidden text-sm font-bold sm:inline sm:max-w-0 sm:overflow-hidden sm:whitespace-nowrap sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:max-w-40 sm:group-hover:opacity-100">
                  Talk to Sales
                </span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
