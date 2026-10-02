import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Products from "@/components/Products";
import GradeTechTables from "@/components/GradeTechTables";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Steel Plate Grades – IS 2062, SA516, S355, Hardox",
  description:
    "IS 2062, S355, SA516, C45 and wear-resistant plates with approx. 2,500 MT ready stock, 3–300 mm thickness and grade-wise chemical/mechanical data — Jagdamba Procut Vadodara.",
  path: "/grades",
});

export default function GradesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Grades"
        path="/grades"
        title="Material Grades"
        description="Structural & carbon, boiler & pressure vessel, alloy & engineering, high strength & wear resistant — more grades can be added anytime."
      />
      <Products />
      <GradeTechTables />
      <FinalCTA />
    </>
  );
}
