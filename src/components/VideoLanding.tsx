"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Factory } from "lucide-react";
import { company, navLinks, plantImages, stats } from "@/data/site";
import VideoBackground from "@/components/VideoBackground";
import Logo from "@/components/Logo";

const quickLinks = navLinks.filter((l) =>
  ["/about", "/machinery", "/grades", "/quote", "/contact"].includes(l.href),
);

const mobileShots = [
  { src: plantImages.shed, label: "Shed" },
  { src: plantImages.laser, label: "Laser" },
  { src: plantImages.yard, label: "Yard" },
  { src: plantImages.dispatch, label: "Dispatch" },
] as const;

export default function VideoLanding() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">
      {/* Desktop: video background. Mobile: static factory image. */}
      <div className="absolute inset-0 hidden md:block" aria-hidden>
        <VideoBackground overlayClassName="bg-gradient-to-b from-navy/80 via-navy/60 to-navy/92" />
      </div>
      <div className="absolute inset-0 md:hidden" aria-hidden>
        <Image
          src={plantImages.factory}
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/65 to-navy/95" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-w-0 items-center gap-3">
            <Logo variant="dark" showWordmark />
          </Link>
          <Link
            href="/"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-brand sm:text-sm"
          >
            <span className="sm:hidden">Website →</span>
            <span className="hidden sm:inline">Enter full website →</span>
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-8 sm:py-14 md:py-16">
          <p className="inline-flex max-w-full w-fit items-center gap-2 border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:rounded-full sm:text-[11px] sm:tracking-[0.16em]">
            <Factory className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
            <span className="truncate md:hidden">Vadodara · Steel Plant</span>
            <span className="hidden truncate md:inline">Video landing · Multipage site</span>
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-[2.15rem] font-bold uppercase leading-[1.05] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl">
            <span className="text-white">Jagdamba</span>{" "}
            <span className="text-brand">Procut</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-snug text-white sm:mt-4 sm:text-xl md:text-2xl">
            {company.tagline}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-steel-light sm:mt-4 sm:text-base">
            <span className="md:hidden">
              Steel Plates · CNC · Laser · Drilling · UT · Delivery
            </span>
            <span className="hidden md:inline">{company.serviceLine}</span>
          </p>

          {/* Mobile plant grid instead of video framing */}
          <div className="mt-6 grid grid-cols-4 gap-1.5 md:hidden">
            {mobileShots.map((shot) => (
              <figure key={shot.label} className="overflow-hidden border border-white/20">
                <div className="relative aspect-square">
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-7 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:mt-10 sm:max-w-none sm:grid-cols-3 sm:gap-3 lg:flex lg:flex-wrap">
            <Link
              href="/quote"
              className="btn btn-primary btn-shine btn-shine-loop inline-flex w-full items-center justify-center gap-2 lg:w-auto"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="btn btn-ghost-light btn-shine inline-flex w-full items-center justify-center gap-2 lg:w-auto"
            >
              Explore Website
            </Link>
            <a
              href={`https://wa.me/91${company.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-shine btn-shine-loop inline-flex w-full items-center justify-center gap-2 lg:w-auto"
            >
              WhatsApp
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-2 sm:mt-14 sm:max-w-4xl sm:gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-white/15 bg-black/30 px-3 py-3 sm:px-4 sm:py-4"
              >
                <dt className="font-display text-xl font-bold text-brand sm:text-2xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-wide text-steel-light sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <nav
          className="-mx-4 flex gap-2 overflow-x-auto border-t border-white/15 px-4 py-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-6"
          aria-label="Landing quick links"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 transition-colors hover:border-brand hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
