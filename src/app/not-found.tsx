import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FinalCTA from "@/components/FinalCTA";

export default function NotFound() {
  return (
    <>
      <PageBanner
        eyebrow="Page not found"
        title="This page is not available"
        description="The link may be incorrect or the page may have moved. Use the menu or return home."
      />
      <section className="bg-surface py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="btn btn-primary btn-shine">
            Back to Home
          </Link>
          <Link href="/quote" className="btn btn-outline">
            Request a Quote
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact
          </Link>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
