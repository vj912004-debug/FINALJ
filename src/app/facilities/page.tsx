import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Facilities from "@/components/Facilities";
import InfrastructureSection from "@/components/InfrastructureSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Infrastructure – Steel Plate Yard & Processing Shed, Vadodara",
  description:
    "26,000 sq. ft. covered shed, 75,000 sq. ft. open plate yard, approx. 2,500 MT ready stock, 5×20-ton EOT cranes, 8 CNC machines and a 12 kW laser at our Vadodara plant.",
  path: "/facilities",
});

export default function FacilitiesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Infrastructure"
        path="/facilities"
        crumb="Infrastructure"
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
