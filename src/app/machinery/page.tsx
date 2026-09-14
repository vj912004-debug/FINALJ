import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";
import MachineryGrid from "@/components/MachineryGrid";
import { machinery } from "@/data/site";

export const metadata: Metadata = {
  title: "Machinery & Processing Capability",
  description:
    "CNC profile cutting, 12 kW laser, CNC drilling and oxy-fuel heavy plate cutting — bed sizes up to approx. 3000 × 12000 mm.",
};

export default function MachineryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Machinery"
        title="Processing Capability"
        description="Dedicated machines for profile cutting, laser cutting, drilling and heavy plate oxy-fuel work."
      />
      <MachineryGrid items={machinery} />
      <FinalCTA />
    </>
  );
}
