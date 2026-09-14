import type { Metadata } from "next";
import VideoLanding from "@/components/VideoLanding";

export const metadata: Metadata = {
  title: "Landing | Video Introduction",
  description:
    "Jagdamba Procut Pvt. Ltd. — video landing for steel plate stock, CNC profile cutting, 12 kW laser and UT in Vadodara.",
};

export default function LandingPage() {
  return <VideoLanding />;
}
