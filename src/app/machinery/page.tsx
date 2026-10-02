import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";
import MachineExplorer from "@/components/MachineExplorer";
import MachineCapacitySection from "@/components/MachineCapacitySection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Machinery – 8 CNC Profile Cutting Machines & 12 kW Laser",
  description:
    "8 CNC profile cutting machines, 12 kW laser, CNC drilling (2500 × 6000 mm) and oxy-fuel cutting — beds up to 3000 × 12000 mm, profile cutting up to 350 mm, in Vadodara.",
  path: "/machinery",
});

export default function MachineryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Machinery"
        path="/machinery"
        crumb="Machinery"
        title="Processing Capability"
        description="Dedicated machines for profile cutting, laser cutting, drilling and heavy plate oxy-fuel work."
      />
      <MachineExplorer />
      <MachineCapacitySection />
      <FinalCTA />
    </>
  );
}
