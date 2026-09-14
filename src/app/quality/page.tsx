import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QualityContent from "@/components/QualityContent";
import FinalCTA from "@/components/FinalCTA";
import { utTesting } from "@/data/site";

export const metadata: Metadata = {
  title: "Quality & Ultrasonic Testing",
  description:
    "UT to ASTM A578 and EN 10160, ultrasonic thickness meter, material traceability and inspection support.",
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
