import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Plant Photos & Videos – Steel Plate Processing, Vadodara",
  description:
    "Photos and videos of CNC profile cutting, 12 kW laser cutting, heavy plate handling, stockyard and delivery operations at the Jagdamba Procut plant in Vadodara.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        path="/gallery"
        crumb="Gallery"
        title="Photo & Video Gallery"
        description="Plant photos and videos — grades, heavy plate cutting, delivery and factory operations."
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
