import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Facilities from "@/components/Facilities";
import InfrastructureSection from "@/components/InfrastructureSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Infrastructure & Capacity",
  description:
    "26,000 sq. ft. covered shed, 75,000 sq. ft. open plate yard, 4×20-ton overhead cranes, Hydra facility, 12 kW laser — Jagdamba Procut Vadodara.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Infrastructure"
        title="Large-Scale Steel Stocking & Processing"
        description="Facility designed specifically for handling, storing and processing heavy steel plates."
      />
      <StatsBar />
      <InfrastructureSection />
      <Facilities />
      <FinalCTA />
    </>
  );
}
