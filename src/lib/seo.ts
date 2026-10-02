import type { Metadata } from "next";
import { company } from "@/data/site";

const FALLBACK_SITE_URL = "https://finalj-wheat.vercel.app";

function resolveSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : FALLBACK_SITE_URL);
  return configured.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = company.name;
export const BRAND_SUFFIX = "Jagdamba Procut";

export const DEFAULT_OG_IMAGE = {
  url: "/images/plant/hero-first-frame.jpg",
  width: 1280,
  height: 720,
  alt: "CNC profile cutting at Jagdamba Procut, Vadodara",
};

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Use when the title already carries the brand name. */
  absoluteTitle?: boolean;
  keywords?: readonly string[];
  image?: { url: string; width?: number; height?: number; alt: string };
  noindex?: boolean;
};

/**
 * Page-level `openGraph` / `twitter` replace the root layout's objects entirely
 * (shallow merge), so every page must carry its own images and site fields.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND_SUFFIX}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Serialise JSON-LD safely for a `<script>` tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
