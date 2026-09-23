import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/services",
  "/machinery",
  "/grades",
  "/facilities",
  "/quality",
  "/industries",
  "/gallery",
  "/quote",
  "/contact",
  "/stock-enquiry",
  "/download",
  "/logistics",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://finalj-wheat.vercel.app${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
