import type { Metadata } from "next";
import VideoLanding from "@/components/VideoLanding";

export const metadata: Metadata = {
  title: "Landing | Jagdamba Procut",
  description:
    "Jagdamba Procut Pvt. Ltd. — steel plate stock, CNC profile cutting, 12 kW laser and UT in Vadodara. Mobile-friendly plant introduction.",
};

export default function LandingPage() {
  return <VideoLanding />;
}
