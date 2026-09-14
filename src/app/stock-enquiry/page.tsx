import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import StockEnquiryForm from "@/components/StockEnquiryForm";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Stock Enquiry",
  description:
    "Enquire steel plate availability by grade, thickness, width, length, make and quantity — Jagdamba Procut Vadodara.",
};

export default function StockEnquiryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Stock Enquiry"
        title="Check Material Availability"
        description="Send your requirement to our sales team. Internal stock quantities are not published online."
      />
      <StockEnquiryForm />
      <FinalCTA />
    </>
  );
}
