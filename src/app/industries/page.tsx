import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import IndustriesSection from "@/components/IndustriesSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Industries & Applications",
  description:
    "Pressure vessel, heavy engineering, power, oil & gas, cement & mining, infrastructure, cranes, OEM — stock, cutting and processing support.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Industries & Applications"
        title="Industries We Serve"
        description="Where our stock, cutting and processing support adds value across engineering and project industries."
      />
      <StatsBar />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}
