"use client";

import { Download as DownloadIcon, FileText } from "lucide-react";
import { downloads } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

export default function DownloadsGrid() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Documents
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy">
            Profiles &amp; Certificates
          </h2>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((doc) => (
            <StaggerItem key={doc.id}>
              <article className="surface-lift flex h-full flex-col border border-line bg-background p-5">
                <FileText className="h-8 w-8 text-brand" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-navy">
                  {doc.title}
                </h3>
                {doc.file ? (
                  <a
                    href={doc.file}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold uppercase tracking-wide text-brand hover:text-brand-deep"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </a>
                ) : (
                  <p className="mt-auto pt-6 text-sm text-steel">
                    To be uploaded — contact sales for a copy.
                  </p>
                )}
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
