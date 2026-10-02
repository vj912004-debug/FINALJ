import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";
import MaterialFinder from "@/components/enquiry/MaterialFinder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Steel Plate Stock Enquiry – Check Availability",
  description:
    "Search steel plate grades by category and send an availability request with thickness, size, quantity and processing — Jagdamba Procut, Vadodara.",
  path: "/stock-enquiry",
});

export default function StockEnquiryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Material Finder"
        path="/stock-enquiry"
        crumb="Stock Enquiry"
        title="Check Material Availability"
        description="Pick a category and grade, add sizes and processing, and our sales team confirms availability."
      />
      <section className="section-atmosphere steel-mesh bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MaterialFinder />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
