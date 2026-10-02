import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileUp, MessageCircle, PackageSearch } from "lucide-react";
import { company, homeCtas } from "@/data/site";
import VideoBackground from "@/components/VideoBackground";
import ShineLink from "@/components/ui/shine-link";

const heroFacts = [
  { value: `Since ${company.since}`, label: "Serving engineering industry" },
  { value: "2,500 MT", label: "Approx. ready stock" },
  { value: "3 – 300 mm", label: "Plate thickness range" },
] as const;

const delay = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="hero-plate relative overflow-hidden text-white md:diagonal-bottom">
      <VideoBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/15"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92vh,880px)] max-w-7xl flex-col justify-center px-6 py-20 lg:px-8 lg:py-24">
        <p className="rise-in inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          <span className="h-px w-10 bg-brand" aria-hidden />
          {company.name} · Vadodara
        </p>

        <h1
          className="rise-in mt-5 max-w-4xl font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white lg:text-7xl"
          style={delay(0.08)}
        >
          Precision Steel Processing.{" "}
          <span className="text-brand">Built for Industry.</span>
        </h1>

        <p className="rise-in mt-6 max-w-2xl text-lg leading-relaxed text-white/85" style={delay(0.18)}>
          Your trusted partner for steel plate stockholding, CNC profile cutting, laser cutting,
          drilling, and quality-controlled material processing.
        </p>

        <div className="rise-in mt-9 flex flex-wrap gap-3" style={delay(0.28)}>
          <ShineLink href="/quote" className="btn btn-primary btn-shine min-h-12 px-7" shine={false}>
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ShineLink>
          <ShineLink href="/services" className="btn btn-ghost-light btn-shine min-h-12 px-7" shine={false}>
            Explore Our Capabilities
          </ShineLink>
        </div>

        <ul
          className="rise-in mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/80"
          style={delay(0.36)}
        >
          <li>
            <Link href="/quote#upload" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
              <FileUp className="h-4 w-4 text-brand" aria-hidden /> Upload drawing
            </Link>
          </li>
          <li>
            <Link href="/stock-enquiry" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
              <PackageSearch className="h-4 w-4 text-brand" aria-hidden /> Check material
            </Link>
          </li>
          <li>
            <a
              href={homeCtas[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#25D366]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden /> WhatsApp sales
            </a>
          </li>
        </ul>

        <dl className="rise-in mt-12 grid max-w-3xl grid-cols-3 border-t border-white/20 pt-6" style={delay(0.44)}>
          {heroFacts.map((f) => (
            <div key={f.label} className="pr-4">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                {f.value}
              </dd>
              <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#strength"
        className="rise-in absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-light"
        style={delay(1.1)}
        aria-label="Scroll to content"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 animate-scroll-cue text-brand" />
      </a>
    </section>
  );
}
