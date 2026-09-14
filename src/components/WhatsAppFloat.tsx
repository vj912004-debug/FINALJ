"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { company } from "@/data/site";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname === "/landing") return null;

  const href = `https://wa.me/91${company.whatsappNumber}?text=${encodeURIComponent(
    "Hello Jagdamba Procut, I want to send a steel / processing requirement.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:px-4"
      aria-label="Send your requirement on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">Send Your Requirement</span>
    </a>
  );
}
