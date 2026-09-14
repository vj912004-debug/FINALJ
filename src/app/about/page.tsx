import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Jagdamba Procut Pvt. Ltd. — your complete steel solution partner in Vadodara. Stockholding, CNC, laser, drilling, UT testing and delivery under one roof.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="Your Complete Steel Solution Partner"
        description="Professionally managed steel stockholding, processing and supply — Vadodara, Gujarat."
      />
      <About />
      <FinalCTA />
    </>
  );
}
