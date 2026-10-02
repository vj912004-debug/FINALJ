import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";
import MachineryGrid from "@/components/MachineryGrid";
import MachineCapacitySection from "@/components/MachineCapacitySection";
import { machinery } from "@/data/site";

export const metadata: Metadata = {
  title: "Machinery & Processing Capability",
  description:
    "8 CNC profile cutting machines, 12 kW laser, CNC drilling (2500 × 6000 mm) and oxy-fuel cutting — beds up to 3000 × 12000 mm, profile cutting up to 350 mm.",
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
      <MachineCapacitySection />
      <FinalCTA />
    </>
  );
}
