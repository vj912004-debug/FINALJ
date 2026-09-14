import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ContactContent from "@/components/ContactContent";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Jagdamba Procut Pvt. Ltd., Vadodara. Mukesh Patel +91 ${company.whatsappNumber}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact Us"
        title="Contact Sales Team"
        description="Vadodara, Gujarat — steel plate stock, processing, UT and delivery."
      />
      <ContactContent />
    </>
  );
}
