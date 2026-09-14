import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Photo & Video Gallery",
  description:
    "Factory, covered shed, open yard, CNC, laser, cranes, Hydra, loading and finished components gallery — drone and plant videos supported.",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        title="Photo & Video Gallery"
        description="Professional coverage of plant, machines, stock, handling and dispatch."
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
