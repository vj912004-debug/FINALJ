import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Products from "@/components/Products";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Material Grades",
  description:
    "Structural, boiler, alloy and wear-resistant steel grades — Jagdamba Procut Vadodara. Special grades subject to availability.",
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
      <FinalCTA />
    </>
  );
}
