import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import IndustryFocus from "@/components/IndustryFocus";
import IndustriesSection from "@/components/IndustriesSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries Served – Steel Plates for Engineering & Boilers",
  description:
    "Steel plate supply and processing for heavy engineering, infrastructure, boiler & pressure equipment, industrial fabrication and mining & wear applications — from Vadodara, Gujarat.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Industries & Applications"
        path="/industries"
        crumb="Industries"
        title="Industries We Serve"
        description="Where our stock, cutting and processing support adds value across engineering and project industries."
      />
      <StatsBar />
      <IndustryFocus />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}
