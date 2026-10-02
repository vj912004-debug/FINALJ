import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import TransportSection from "@/components/TransportSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Steel Plate Transport & Delivery from Vadodara",
  description:
    "From our Vadodara stockyard to your factory — heavy-duty trailers, plate transport trailers, tempo and pickup vehicles, loading with 5 Nos. 20-ton EOT cranes and Hydra. Local and outstation dispatch.",
  path: "/logistics",
});

export default function LogisticsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Transport & Logistics"
        path="/logistics"
        crumb="Logistics"
        title="From Our Stockyard to Your Factory"
        description="Material Supply → Processing → Testing → Inspection → Loading → Transportation → Delivery."
      />
      <StatsBar />
      <TransportSection />
      <FinalCTA />
    </>
  );
}
