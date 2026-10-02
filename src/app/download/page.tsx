import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import DownloadsGrid from "@/components/DownloadsGrid";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company Profile & Brochure Downloads",
  description:
    "Request the Jagdamba Procut Pvt. Ltd. company profile, brochure and certificates — steel plate stockist and processor in Vadodara, Gujarat.",
  path: "/download",
});

export default function DownloadPage() {
  return (
    <>
      <PageBanner
        eyebrow="Downloads"
        path="/download"
        crumb="Downloads"
        title="Company Documents"
        description="Request the company profile, brochure or certificates from our Vadodara sales team."
      />
      <DownloadsGrid />
      <FinalCTA />
    </>
  );
}
