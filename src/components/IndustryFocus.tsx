import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { industryFocus } from "@/data/site";
import { FadeIn, RiseIn } from "@/components/motion/Motion";

export default function IndustryFocus() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RiseIn className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Key Markets</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Processing Support by Industry
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </RiseIn>

        <nav aria-label="Industries" className="mt-8 flex flex-wrap gap-2">
          {industryFocus.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="border border-line bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {i.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-8">
          {industryFocus.map((ind, idx) => (
            <FadeIn key={ind.id}>
              <article
                id={ind.id}
                className="grid scroll-mt-28 overflow-hidden border border-line bg-white shadow-[0_24px_60px_-44px_rgba(11,35,72,0.5)] lg:grid-cols-5"
              >
                <div className={`relative min-h-56 bg-navy lg:col-span-2 ${idx % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={ind.image}
                    alt={`${ind.title} — steel processing`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                      {ind.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-7 lg:col-span-3">
                  <p className="text-base leading-relaxed text-steel">{ind.overview}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <Block title="Processing services" items={ind.services} />
                    <Block title="Material applications" items={ind.materials} />
                    <Block title="Quality requirements" items={ind.quality} />
                  </div>
                  <div className="mt-7 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-steel">
                      Related:
                      {ind.links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-navy underline-offset-4 hover:text-brand hover:underline">
                          {l.label}
                        </Link>
                      ))}
                    </p>
                    <Link href={`/quote?service=${ind.rfqService}`} className="btn btn-primary shrink-0">
                      Request a Quote
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{title}</h4>
      <ul className="mt-2.5 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-ink">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy/60" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
