import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { company, seoPages } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <PageBanner
        eyebrow="Services in Vadodara / Gujarat"
        title={page.h1}
        description={page.description}
      />
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-steel">
            {company.name} provides {page.h1.toLowerCase()} with complete
            support for material supply, CNC profile cutting, 12 kW laser
            cutting, CNC drilling, ultrasonic testing and delivery from
            Vadodara, Gujarat.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {page.keywords.map((k) => (
              <li
                key={k}
                className="border border-line bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy"
              >
                {k}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="bg-brand px-5 py-3 text-sm font-bold uppercase text-white hover:bg-brand-deep"
            >
              Get a Quote
            </Link>
            <Link
              href="/stock-enquiry"
              className="border border-navy px-5 py-3 text-sm font-bold uppercase text-navy hover:bg-navy hover:text-white"
            >
              Stock Enquiry
            </Link>
            <Link
              href="/contact"
              className="border border-line px-5 py-3 text-sm font-semibold uppercase text-ink"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
