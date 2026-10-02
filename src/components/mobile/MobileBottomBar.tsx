"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Home, MessageCircle, FileUp, Phone } from "lucide-react";
import { company } from "@/data/site";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/landing") return null;

  const home = pathname === "/";
  const quote = pathname.startsWith("/quote");

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-3 z-[69] flex h-10 w-10 items-center justify-center border border-navy/20 bg-navy text-white shadow-[0_10px_24px_-12px_rgba(11,35,72,0.8)] transition-[opacity,transform] duration-200 md:hidden ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </button>
      <nav
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        aria-label="Mobile actions"
      >
        <div className="grid grid-cols-4">
          <Link
            href="/"
            aria-current={home ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${
              home ? "text-brand" : "text-navy"
            }`}
          >
            <Home className="h-5 w-5" aria-hidden />
            Home
          </Link>
          <Link
            href="/quote"
            aria-current={quote ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${
              quote ? "text-brand" : "text-navy"
            }`}
          >
            <FileUp className="h-5 w-5" aria-hidden />
            Quote
          </Link>
          <a
            href={`https://wa.me/91${company.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#128C7E]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:+91${company.inquiryPhone}`}
            className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-navy"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Call
          </a>
        </div>
      </nav>
    </>
  );
}
