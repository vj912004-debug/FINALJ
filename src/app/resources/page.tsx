import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Resources from "@/components/Resources";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Steel Mills & Material Sources",
  description:
    "Jindal Steel, SAIL, JSW, Tata Steel, AM/NS India and imported / China-origin plates subject to availability — with MTC and traceability.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Steel From Leading Mills"
        title="Indian & Imported Material"
        description="Stock and supply from leading Indian and international manufacturers — Mill Test Certificates as applicable."
      />
      <Resources />
      <FinalCTA />
    </>
  );
}
