import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Processing Capabilities",
  description:
    "CNC profile cutting, 12 kW laser cutting up to approx. 3000×12000 mm, CNC drilling, heavy plate oxy-fuel cutting, and ultrasonic testing (ASTM A578 / EN 10160).",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Advanced Processing"
        title="CNC · Laser · Drilling · UT"
        description="Precision processing of steel plates with quality verification under one roof."
      />
      <Services />
      <FinalCTA />
    </>
  );
}
