"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, navLinks } from "@/data/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/landing") return null;

  return (
    <footer
      id="site-footer"
      className="border-t border-white/10 bg-navy pb-[max(1rem,env(safe-area-inset-bottom))] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="inline-block">
            <Logo showWordmark variant="dark" />
          </Link>
          <p className="mt-4 break-words text-xs uppercase tracking-[0.1em] text-brand sm:text-[0.7rem] sm:tracking-[0.12em]">
            {company.serviceLine}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-steel-light">
            {company.tagline}. {company.certification} certified. Serving the
            engineering industry since {company.since}.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand">
            Address
          </h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-steel-light">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            {company.address}
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm text-steel-light">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            {company.officeHours}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-steel-light">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              Office: {company.officePhones.join(" / ")}
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              Inquiry: {company.inquiryPhone}
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              Land Line: {company.landLine}
            </li>
            {company.contacts.map((c) => (
              <li key={c.name}>
                <a
                  href={`tel:+91${c.phones[0]}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {c.name}: {c.phones.join(" / ")}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand">
            Navigate
          </h3>
          <nav
            className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-col"
            aria-label="Footer"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-steel-light transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-mid/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-lg font-bold uppercase text-white">
              Need plates cut to drawing?
            </p>
            <p className="mt-1 text-sm text-steel-light">
              Send grade, size and DXF — we respond with stock and processing options.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
            <Link href="/quote" className="btn btn-primary btn-shine">
              Get a Quote
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-steel-light sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {company.name}. All Rights Reserved.
          </p>
          <p className="break-words">
            {company.subTagline} · {company.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
