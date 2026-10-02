import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QualityContent from "@/components/QualityContent";
import FinalCTA from "@/components/FinalCTA";
import { utTesting } from "@/data/site";

export const metadata: Metadata = {
  title: "Quality & Ultrasonic Testing",
  description:
    "UT to ASTM A578 and EN 10160, thickness verification, heat/plate traceability, MTC/TC and TPI coordination with SGS / TUV / BV as required.",
};

export default function QualityPage() {
  return (
    <>
      <PageBanner
        eyebrow="Quality & UT"
        title="Quality, Testing & Traceability"
        description={utTesting.subheading}
      />
      <QualityContent />
      <FinalCTA />
    </>
  );
}
