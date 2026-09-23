import Hero from "@/components/Hero";
import CapabilityTicker from "@/components/ui/capability-ticker";
import StrengthInNumbers from "@/components/StrengthInNumbers";
import TrustStrip from "@/components/TrustStrip";
import Resources from "@/components/Resources";
import HomeOverview from "@/components/HomeOverview";
import MediaShowcase from "@/components/MediaShowcase";
import InteractiveCTABand from "@/components/InteractiveCTABand";
import DrawingCTA from "@/components/DrawingCTA";
import FinalCTA from "@/components/FinalCTA";
import MobileHome from "@/components/mobile/MobileHome";

export default function HomePage() {
  return (
    <>
      <MobileHome />
      <div className="hidden md:block">
        <Hero />
        <CapabilityTicker />
        <StrengthInNumbers />
        <TrustStrip />
        <Resources compact />
        <HomeOverview />
        <MediaShowcase />
        <DrawingCTA />
        <InteractiveCTABand />
        <FinalCTA />
      </div>
    </>
  );
}
