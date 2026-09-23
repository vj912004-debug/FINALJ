"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, FileUp, Phone } from "lucide-react";
import { company } from "@/data/site";

export default function MobileBottomBar() {
  const pathname = usePathname();
  if (pathname === "/landing") return null;

  const home = pathname === "/";
  const quote = pathname.startsWith("/quote");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile actions"
    >
      <div className="grid grid-cols-4">
        <Link
          href="/"
          className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${
            home ? "text-brand" : "text-navy"
          }`}
        >
          <Home className="h-5 w-5" aria-hidden />
          Home
        </Link>
        <Link
          href="/quote"
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
  );
}
