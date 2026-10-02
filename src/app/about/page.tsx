import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us – Steel Plate Stockist in Vadodara Since 2001",
  description:
    "Jagdamba Procut Pvt. Ltd. has served the engineering industry from Vadodara since 2001 — steel plate stockholding, CNC profile cutting, 12 kW laser cutting, drilling, UT testing and delivery under one roof.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        path="/about"
        crumb="About Us"
        title="Your Complete Steel Solution Partner"
        description="Professionally managed steel stockholding, processing and supply — Vadodara, Gujarat."
      />
      <About />
      <FinalCTA />
    </>
  );
}
