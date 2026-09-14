"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { company, navLinks } from "@/data/site";
import Logo from "@/components/Logo";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const base = href.split("#")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}

const spotlightItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Machinery", href: "/machinery" },
  { label: "Grades", href: "/grades" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const pathname = usePathname();
  const [navPath, setNavPath] = useState(pathname);

  if (navPath !== pathname) {
    setNavPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setElevated(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/landing") return null;

  return (
    <header className={`sticky top-0 z-50 ${elevated ? "header-elevated" : ""}`}>
      <div className="hidden bg-navy text-white sm:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-[11px] leading-relaxed sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-steel-light">
            <span className="font-semibold uppercase tracking-wide text-brand">
              Steel Processing · Vadodara
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
              {company.location}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-steel-light">
            <a
              href={`tel:+91${company.contacts[0].phones[0]}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
              +91 {company.contacts[0].phones[0]}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-brand md:inline-flex"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-surface/98">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
          <Link
            href="/"
            className="group min-w-0 max-w-[70%] shrink"
            onClick={() => setOpen(false)}
          >
            <Logo showWordmark />
          </Link>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <SpotlightNavbar items={spotlightItems} />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/quote" className="btn btn-primary btn-shine px-4 py-2 text-xs">
              Get Quote
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Link
              href="/quote"
              className="btn btn-primary inline-flex min-h-10 px-3 py-2 text-[11px]"
            >
              Quote
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line p-2 text-navy"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="fixed inset-x-0 bottom-0 top-[52px] z-50 overflow-y-auto overscroll-contain border-t border-line bg-surface px-4 py-4 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] sm:top-[92px] lg:hidden"
          >
            {/* Compact mobile contact strip */}
            <div className="mb-3 flex flex-wrap gap-2 sm:hidden">
              <a
                href={`tel:+91${company.whatsappNumber}`}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 border border-line bg-background px-3 text-xs font-semibold text-navy"
              >
                <Phone className="h-3.5 w-3.5 text-brand" />
                Call
              </a>
              <a
                href={`https://wa.me/91${company.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 border border-[#25D366]/40 bg-[#25D366]/10 px-3 text-xs font-semibold text-navy"
              >
                WhatsApp
              </a>
            </div>

            <nav className="mx-auto flex max-w-lg flex-col gap-0.5" aria-label="Mobile">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className={`rounded-sm px-3 py-3.5 text-base font-medium active:bg-surface-muted ${
                      active ? "bg-navy/5 text-brand" : "text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/quote"
                className="mt-3 min-h-12 bg-brand px-4 py-3.5 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get Quote
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
