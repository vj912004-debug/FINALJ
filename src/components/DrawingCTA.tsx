import Link from "next/link";
import { company } from "@/data/site";

export default function DrawingCTA() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Enquiry
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Have a drawing?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-steel sm:text-lg">
            Share grade, size and drawings. The Vadodara team replies with stock,
            processing options and delivery support.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Link href="/quote#upload" className="btn btn-primary">
            Upload Drawing
          </Link>
          <Link href="/quote" className="btn btn-outline">
            Get a Quote
          </Link>
          <a
            href={`https://wa.me/91${company.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-navy"
          >
            WhatsApp Sales
          </a>
        </div>
      </div>
    </section>
  );
}
