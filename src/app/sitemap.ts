import type { MetadataRoute } from "next";
import { seoPages } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/quote", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/machinery", priority: 0.8 },
  { path: "/grades", priority: 0.8 },
  { path: "/stock-enquiry", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/facilities", priority: 0.7 },
  { path: "/quality", priority: 0.7 },
  { path: "/industries", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/download", priority: 0.5 },
  { path: "/logistics", priority: 0.6 },
  { path: "/resources", priority: 0.5 },
  { path: "/vendor", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...routes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...seoPages.map((p) => ({
      url: absoluteUrl(`/seo/${p.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
