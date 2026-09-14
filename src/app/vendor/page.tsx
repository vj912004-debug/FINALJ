import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BankDetailsSection from "@/components/BankDetailsSection";
import FinalCTA from "@/components/FinalCTA";
import { bankDetails } from "@/data/site";

export const metadata: Metadata = {
  title: "Vendor Registration & Bank Details",
  description: `${bankDetails.bankName} · A/C ${bankDetails.accountNumber} · IFSC ${bankDetails.ifsc} — for vendor registration and payment setup only.`,
};

export default function VendorPage() {
  return (
    <>
      <PageBanner
        eyebrow="Vendor Registration"
        title="Bank Details & Vendor Setup"
        description="Use these details for vendor registration and payment setup after verification with Jagdamba Procut Pvt. Ltd."
      />
      <BankDetailsSection />
      <FinalCTA />
    </>
  );
}
