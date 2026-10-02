import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Products from "@/components/Products";
import GradeTechTables from "@/components/GradeTechTables";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Material Grades",
  description:
    "IS 2062, S355, SA516, C45 and wear-resistant plates with approx. 2,500 MT ready stock, 3–300 mm thickness and grade-wise chemical/mechanical data — Jagdamba Procut Vadodara.",
};

export default function GradesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Grades"
        title="Material Grades"
        description="Structural & carbon, boiler & pressure vessel, alloy & engineering, high strength & wear resistant — more grades can be added anytime."
      />
      <Products />
      <GradeTechTables />
      <FinalCTA />
    </>
  );
}
