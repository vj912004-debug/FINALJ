import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import TransportSection from "@/components/TransportSection";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Transport & Logistics",
  description:
    "From stockyard to your factory — heavy-duty trailers, plate transport, tempo, pickup and local delivery with crane & Hydra loading.",
};

export default function LogisticsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Transport & Logistics"
        title="From Our Stockyard to Your Factory"
        description="Material Supply → Processing → Testing → Inspection → Loading → Transportation → Delivery."
      />
      <StatsBar />
      <TransportSection />
      <FinalCTA />
    </>
  );
}
