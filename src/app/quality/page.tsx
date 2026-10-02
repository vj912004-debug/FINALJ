import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QualityPillars from "@/components/QualityPillars";
import QualityContent from "@/components/QualityContent";
import FinalCTA from "@/components/FinalCTA";
import { utTesting } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ultrasonic Testing & Quality – ASTM A578, EN 10160",
  description:
    "Ultrasonic testing of steel plates to ASTM A578 and EN 10160, thickness verification, heat/plate traceability, MTC/TC and TPI coordination with SGS / TUV / BV as required.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <PageBanner
        eyebrow="Quality & UT"
        path="/quality"
        crumb="Quality & UT"
        title="Quality, Testing & Traceability"
        description={utTesting.subheading}
      />
      <QualityPillars />
      <QualityContent />
      <FinalCTA />
    </>
  );
}
