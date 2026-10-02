import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ContactContent from "@/components/ContactContent";
import { company } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us – Steel Plate & Cutting Enquiries, Vadodara",
  description: `Call +91 ${company.whatsappNumber} or email ${company.email}. Visit ${company.address} for steel plate stock, CNC profile cutting, laser cutting and UT. ${company.officeHours}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Contact Us"
        path="/contact"
        crumb="Contact Us"
        title="Contact Sales Team"
        description="Vadodara, Gujarat — steel plate stock, processing, UT and delivery."
      />
      <ContactContent />
    </>
  );
}
