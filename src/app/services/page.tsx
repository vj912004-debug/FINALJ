import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Steel Plate Processing – CNC, Laser, Drilling & UT",
  description:
    "CNC profile cutting up to 350 mm, 12 kW laser cutting on 3000 × 12000 mm beds, CNC drilling, heavy plate oxy-fuel cutting and ultrasonic testing (ASTM A578 / EN 10160) in Vadodara.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Advanced Processing"
        path="/services"
        crumb="Services"
        title="CNC · Laser · Drilling · UT"
        description="Precision processing of steel plates with quality verification under one roof."
      />
      <Services />
      <FinalCTA />
    </>
  );
}
