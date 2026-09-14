import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Online material enquiry with drawing upload — CNC, laser, drilling, UT and delivery details.",
};

export default function QuotePage() {
  return (
    <>
      <PageBanner
        eyebrow="Request a Quote"
        title="Online Material Enquiry"
        description="Fill the form, upload drawings, and our team will share availability and quotation."
      />
      <QuoteForm />
      <FinalCTA />
    </>
  );
}
