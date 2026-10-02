import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import EnquiryTracker from "@/components/enquiry/EnquiryTracker";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Track Your Enquiry",
  description:
    "Check the status of your Jagdamba Procut quotation or stock enquiry using your reference number and email.",
  path: "/track",
  noindex: true,
});

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { ref } = await searchParams;
  return (
    <>
      <PageBanner
        eyebrow="Customer Portal"
        title="Track Your Enquiry"
        description="Verify with your reference number and email to see where your enquiry stands."
      />
      <section className="section-atmosphere steel-mesh bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EnquiryTracker initialReference={typeof ref === "string" ? ref.slice(0, 20) : ""} />
        </div>
      </section>
    </>
  );
}
