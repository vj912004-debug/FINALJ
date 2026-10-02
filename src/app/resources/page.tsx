import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Resources from "@/components/Resources";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Steel Mills – Jindal, SAIL, JSW, Tata Steel & AM/NS Plates",
  description:
    "Steel plates from Jindal Steel, SAIL, JSW, Tata Steel, AM/NS India and imported / China-origin plates subject to availability — with MTC and traceability, stocked in Vadodara.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Steel From Leading Mills"
        path="/resources"
        crumb="Steel Mills"
        title="Indian & Imported Material"
        description="Stock and supply from leading Indian and international manufacturers — Mill Test Certificates as applicable."
      />
      <Resources />
      <FinalCTA />
    </>
  );
}
