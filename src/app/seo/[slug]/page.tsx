import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import {
  company,
  gradeCategories,
  plantImages,
  seoPages,
  services,
  utTesting,
  whyCustomersChooseUs,
} from "@/data/site";
import { SITE_URL, absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

function resolve(slug: string) {
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) return null;
  const service = page.serviceId ? services.find((s) => s.id === page.serviceId) : undefined;
  const gradeCategory = page.gradeCategoryId
    ? gradeCategories.find((c) => c.id === page.gradeCategoryId)
    : undefined;
  const image = service?.image ?? (page.gradeCategoryId ? plantImages.plates : plantImages.cnc);
  const related = page.related
    .map((s) => seoPages.find((p) => p.slug === s))
    .filter((p) => p !== undefined);
  return { page, service, gradeCategory, image, related };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) return {};
  const { page, image } = data;
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/seo/${page.slug}`,
    keywords: page.keywords,
    image: { url: image, alt: page.h1 },
  });
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const data = resolve(slug);
  if (!data) notFound();
  const { page, service, gradeCategory, image, related } = data;
  const path = `/seo/${page.slug}`;
  const parent = gradeCategory
    ? { name: "Grades", path: "/grades" }
    : { name: "Services", path: "/services" };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: service?.title ?? gradeCategory?.name ?? page.h1,
    description: page.description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "City", name: "Vadodara" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceJsonLd)} />
      <PageBanner
        eyebrow="Vadodara · Gujarat"
        title={page.h1}
        description={page.description}
        path={path}
        parent={parent}
      />

      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
          <div>
            {page.intro.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-base leading-relaxed text-steel">
                {paragraph}
              </p>
            ))}

            {service ? (
              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy">
                  {service.title} capability
                </h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
                  {service.capacity}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {gradeCategory ? (
              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy">
                  {gradeCategory.name} grades we supply
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {gradeCategory.grades.map((grade) => (
                    <li
                      key={grade}
                      className="border border-line bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy"
                    >
                      {grade}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/grades"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-deep"
                >
                  Chemical &amp; mechanical data for all grades
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ) : null}

            {page.showUt ? (
              <div className="mt-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy">
                  Ultrasonic testing options
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">{utTesting.body}</p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="border border-line bg-background p-4">
                    <dt className="font-bold text-navy">{utTesting.astm.standard}</dt>
                    <dd className="mt-1 text-steel">{utTesting.astm.levels.join(", ")}</dd>
                  </div>
                  <div className="border border-line bg-background p-4">
                    <dt className="font-bold text-navy">{utTesting.en.standard}</dt>
                    <dd className="mt-1 text-steel">
                      Body {utTesting.en.bodyClasses.join(", ")} · Edge {utTesting.en.edgeClasses.join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-line">
              <Image
                src={image}
                alt={`${page.h1} at ${company.name}, Vadodara`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
            <div className="mt-6 border border-line bg-background p-5">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-navy">
                Why customers choose {company.name}
              </h2>
              <ul className="mt-3 space-y-2">
                {whyCustomersChooseUs.slice(0, 6).map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
            Related services &amp; materials
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/seo/${r.slug}`}
                  className="group flex h-full items-center justify-between gap-3 border border-line bg-surface p-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {r.h1}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
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
