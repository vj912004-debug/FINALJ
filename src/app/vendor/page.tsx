import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BankDetailsSection from "@/components/BankDetailsSection";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vendor Registration & Bank Details",
  description:
    "Add Jagdamba Procut Pvt. Ltd. to your approved vendor database — company profile, GST / PAN, infrastructure and quality documents on request, plus bank details for payment setup after verification.",
  path: "/vendor",
});

export default function VendorPage() {
  return (
    <>
      <PageBanner
        eyebrow="Vendor Registration"
        path="/vendor"
        crumb="Vendor Registration"
        title="Bank Details & Vendor Setup"
        description="Use these details for vendor registration and payment setup after verification with Jagdamba Procut Pvt. Ltd."
      />
      <BankDetailsSection />
      <FinalCTA />
    </>
  );
}
