import Hero from "@/components/Hero";
import CapabilityTicker from "@/components/ui/capability-ticker";
import StrengthInNumbers from "@/components/StrengthInNumbers";
import TrustStrip from "@/components/TrustStrip";
import HomeOverview from "@/components/HomeOverview";
import MediaShowcase from "@/components/MediaShowcase";
import AiVideoShowcase from "@/components/AiVideoShowcase";
import InteractiveCTABand from "@/components/InteractiveCTABand";
import FinalCTA from "@/components/FinalCTA";

/**
 * Lean multipage home — overview, trust strip, plant visuals & 12 AI video showcase.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityTicker />
      <StrengthInNumbers />
      <TrustStrip />
      <HomeOverview />
      <MediaShowcase />
      <AiVideoShowcase />
      <InteractiveCTABand />
      <FinalCTA />
    </>
  );
}

