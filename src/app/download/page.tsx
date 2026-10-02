import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import DownloadsGrid from "@/components/DownloadsGrid";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download company profile, brochure and certificates — Jagdamba Procut Pvt. Ltd.",
};

export default function DownloadPage() {
  return (
    <>
      <PageBanner
        eyebrow="Downloads"
        title="Company Documents"
        description="Request the company profile, brochure or certificates from our Vadodara sales team."
      />
      <DownloadsGrid />
      <FinalCTA />
    </>
  );
}
