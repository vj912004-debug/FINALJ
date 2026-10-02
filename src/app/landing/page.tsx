import type { Metadata } from "next";
import VideoLanding from "@/components/VideoLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Plant Introduction",
  description:
    "Jagdamba Procut Pvt. Ltd. — steel plate stock, CNC profile cutting, 12 kW laser and UT in Vadodara. Mobile-friendly plant introduction.",
  path: "/landing",
  noindex: true,
});

export default function LandingPage() {
  return <VideoLanding />;
}
