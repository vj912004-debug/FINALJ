import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import Products from "@/components/Products";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Material Grades",
  description:
    "Structural, boiler & pressure vessel, alloy & engineering, high strength and wear resistant steel plates — Jagdamba Procut Vadodara.",
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Material Grades"
        title="Steel Grades We Supply"
        description="Carbon, structural, boiler, alloy, high strength and wear resistant plates — special grades subject to availability."
      />
      <Products />
      <FinalCTA />
    </>
  );
}
