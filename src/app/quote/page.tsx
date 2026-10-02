import type { Metadata } from "next";
import { Clock, FileCheck2, ShieldCheck } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";
import RfqWizard from "@/components/enquiry/RfqWizard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote – Steel Plates & CNC Cutting",
  description:
    "Request a quotation for steel plates, CNC profile cutting, 12 kW laser cutting and CNC drilling in Vadodara. Upload PDF, DXF or DWG drawings and get an enquiry reference number.",
  path: "/quote",
});

const assurances = [
  { icon: FileCheck2, title: "Reference number", text: "Every request gets a JP- reference for follow-up and tracking." },
  { icon: ShieldCheck, title: "Secure drawings", text: "Files are type-checked and stored privately — never published." },
  { icon: Clock, title: "Direct to sales", text: "Your request goes straight to the Vadodara sales team." },
] as const;

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <PageBanner
        eyebrow="Request for Quotation"
        path="/quote"
        title="Request a Quote"
        description="Five quick steps: service, material, drawings, your details and review."
      />
      <section id="upload" className="section-atmosphere steel-mesh scroll-mt-24 bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
          <RfqWizard initialService={typeof service === "string" ? service : undefined} />
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:self-start">
            {assurances.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border border-line bg-white p-4">
                <Icon className="h-5 w-5 text-brand" aria-hidden />
                <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-navy">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-steel">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
