import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Photo & Video Gallery",
  description:
    "Plant photos plus videos for grades, heavy plate cutting, delivery and factory operations at Jagdamba Procut, Vadodara.",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        title="Photo & Video Gallery"
        description="Plant photos and videos — grades, heavy plate cutting, delivery and factory operations."
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
