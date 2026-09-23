import Image from "next/image";
import Link from "next/link";
import { FileUp, MessageCircle } from "lucide-react";
import {
  company,
  homeCtas,
  plantImages,
  processFlow,
  stats,
} from "@/data/site";
import Resources from "@/components/Resources";

const shortcuts = [
  { href: "/services", label: "Capabilities", image: plantImages.laser },
  { href: "/machinery", label: "Machinery", image: plantImages.cnc },
  { href: "/grades", label: "Grades", image: plantImages.plates },
  { href: "/quality", label: "Quality", image: plantImages.ut },
  { href: "/gallery", label: "Gallery", image: plantImages.shed },
  { href: "/contact", label: "Contact", image: plantImages.factory },
] as const;

const units = ["Sq. Ft.", "Sq. Ft.", "", ""] as const;

export default function MobileHome() {
  return (
    <div className="bg-background md:hidden">
      <section className="relative overflow-hidden text-white">
        <div className="relative h-[58vh] min-h-[420px]">
          <Image
            src={plantImages.factory}
            alt="Jagdamba Procut plant"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
              Vadodara · Steel Processing
            </p>
            <h1 className="mt-2 font-display text-[2.1rem] font-semibold uppercase leading-[0.95] tracking-tight">
              Jagdamba <span className="text-brand">Procut</span>
            </h1>
            <p className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.12em]">
              Pvt. Ltd.
            </p>
            <p className="mt-3 text-sm font-medium text-white/90">
              Precision in Steel. Strength in Every Cut.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-navy px-4 pb-4">
          <Link href="/quote" className="btn btn-primary min-h-12 text-sm">
            Get a Quote
          </Link>
          <a
            href={homeCtas[2].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp min-h-12 text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <Link href="/quote#upload" className="btn btn-ghost-light col-span-2 min-h-12 text-sm">
            <FileUp className="h-4 w-4" aria-hidden />
            Upload Drawing
          </Link>
        </div>
      </section>

      <section className="px-4 py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Open a section
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="overflow-hidden border border-line bg-white"
            >
              <span className="relative block aspect-[16/10]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </span>
              <span className="block px-3 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-navy">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white px-4 py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Capability
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
          Strength in Numbers
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-px bg-line">
          {stats.map((stat, index) => (
            <article key={stat.label} className="bg-white px-3 py-4">
              <p className="font-display text-2xl font-semibold tabular-nums text-navy">
                {stat.value}
                {stat.suffix}
              </p>
              {units[index] ? (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {units[index]}
                </p>
              ) : null}
              <p className="mt-1 text-[11px] font-semibold uppercase leading-snug text-steel">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Process
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
          Stock to Delivery
        </h2>
        <ol className="mt-4 space-y-3 border-l border-line pl-4">
          {processFlow.map((step, index) => (
            <li key={step}>
              <p className="font-display text-sm font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="text-sm text-steel">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <Resources compact />

      <section className="px-4 py-8">
        <h2 className="font-display text-3xl font-semibold text-navy">
          Have a drawing?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          Share grade, size and drawings. The {company.location.split(",")[0]} team
          replies with stock and processing options.
        </p>
        <div className="mt-5 flex flex-col gap-2.5">
          <Link href="/quote#upload" className="btn btn-primary min-h-12">
            Upload Drawing
          </Link>
          <Link href="/quote" className="btn btn-outline min-h-12">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
