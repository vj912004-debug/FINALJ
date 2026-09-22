import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import GalleryGrid from "@/components/GalleryGrid";
import AiVideoShowcase from "@/components/AiVideoShowcase";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | 12 Branded AI Videos",
  description:
    "Factory, covered shed, open yard, CNC, laser, cranes, Hydra, loading and finished components gallery — including 12 branded AI video showcases.",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        title="Photo & Video Gallery"
        description="Professional coverage of plant, machines, stock, handling, dispatch and 12 AI video showcases."
      />
      <GalleryGrid />
      <AiVideoShowcase />
      <FinalCTA />
    </>
  );
}

