import type { CSSProperties } from "react";
import Link from "next/link";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

type PageBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Route of this page — enables BreadcrumbList structured data. */
  path?: string;
  /** Breadcrumb label for this page when it differs from the heading. */
  crumb?: string;
  parent?: Crumb;
};

const delay = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

export default function PageBanner({
  eyebrow,
  title,
  description,
  path,
  crumb,
  parent,
}: PageBannerProps) {
  const label = crumb ?? title;
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    ...(parent ? [parent] : []),
    ...(path ? [{ name: label, path }] : []),
  ];

  return (
    <section className="hero-plate relative overflow-hidden text-white">
      {path ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(trail))} />
      ) : null}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 60% at 85% 20%, rgba(241,90,36,0.28), transparent 55%), radial-gradient(ellipse 40% 50% at 10% 80%, rgba(14,165,198,0.16), transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="ambient-orb ambient-orb--brand right-8 top-0 h-40 w-40 opacity-60"
        aria-hidden
      />
      <div
        className="ambient-orb ambient-orb--peacock bottom-0 left-10 h-36 w-36"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <nav
          className="rise-in mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-steel-light sm:mb-4 sm:text-xs sm:tracking-[0.16em]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-gold-bright">
            Home
          </Link>
          {parent ? (
            <>
              <span className="mx-2 text-white/40">/</span>
              <Link href={parent.path} className="transition-colors hover:text-gold-bright">
                {parent.name}
              </Link>
            </>
          ) : null}
          <span className="mx-2 text-white/40">/</span>
          <span className="text-gold-bright" aria-current="page">
            {label}
          </span>
        </nav>
        <p
          className="rise-in text-[11px] font-bold uppercase tracking-[0.16em] text-brand sm:text-sm sm:tracking-[0.22em]"
          style={delay(0.05)}
        >
          {eyebrow}
        </p>
        <h1
          className="rise-in mt-2 max-w-3xl font-display text-xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl"
          style={delay(0.1)}
        >
          {title}
        </h1>
        <div className="accent-rule mt-3 sm:mt-4" aria-hidden />
        <p
          className="rise-in mt-3 max-w-2xl text-sm leading-relaxed text-steel-light sm:mt-5 sm:text-base md:text-lg"
          style={delay(0.2)}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
