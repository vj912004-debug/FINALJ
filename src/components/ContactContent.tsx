"use client";

import { Clock3, Mail, MapPin, MessageCircle, Phone, User } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";
import { company } from "@/data/site";
import {
  RiseIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/Motion";
import TextReveal from "@/components/ui/text-reveal";
import ShineLink from "@/components/ui/shine-link";

export default function ContactContent() {
  return (
    <>
      <section
        className="section-atmosphere steel-mesh bg-surface py-14 sm:py-16"
        id="team"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <RiseIn className="lg:col-span-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
                Direct Line
              </p>
              <TextReveal
                as="h2"
                className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl"
              >
                {company.name}
              </TextReveal>
              <div className="accent-rule mt-4" aria-hidden />
              <p className="mt-5 text-sm leading-relaxed text-steel sm:text-base">
                Reach our Vadodara sales team for stock, processing, UT and
                delivery — or send a full enquiry below.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ShineLink
                  href={`tel:+91${company.whatsappNumber}`}
                  className="w-full border border-line bg-background text-navy hover:border-brand/40 sm:w-auto"
                  shine={false}
                >
                  <Phone className="h-4 w-4 text-brand" aria-hidden />
                  Call Now
                </ShineLink>
                <ShineLink
                  href={`https://wa.me/91${company.whatsappNumber}`}
                  external
                  className="btn btn-whatsapp btn-shine btn-shine-loop w-full border-0 sm:w-auto"
                  shine={false}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp
                </ShineLink>
              </div>
            </RiseIn>

            <StaggerChildren className="space-y-3 lg:col-span-7">
              {company.contacts.map((c) => (
                <StaggerItem key={c.name}>
                  <div className="surface-lift teaser-shine flex gap-3 border border-line bg-background p-4 sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-brand">
                      <User className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold uppercase text-navy">
                        {c.name}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                        {c.role}
                      </p>
                      <p className="mt-2 text-sm text-steel">
                        Mobile:{" "}
                        <a
                          href={`tel:+91${c.phones[0]}`}
                          className="link-underline font-semibold text-navy"
                        >
                          +91 {c.phones[0]}
                        </a>
                      </p>
                      {c.phones[1] ? (
                        <p className="text-sm text-steel">
                          Alternate:{" "}
                          <a
                            href={`tel:+91${c.phones[1]}`}
                            className="link-underline font-semibold text-navy"
                          >
                            +91 {c.phones[1]}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </StaggerItem>
              ))}

              <StaggerItem>
                <div className="surface-lift flex gap-3 border border-line bg-background p-4 text-sm text-steel sm:p-5">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <a
                      href={`mailto:${company.email}`}
                      className="link-underline font-semibold text-navy"
                    >
                      {company.email}
                    </a>
                    <p className="mt-1 text-xs">
                      GST / CIN / MSME / ISO: {company.gst} (update when
                      available)
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="surface-lift flex gap-3 border border-line bg-background p-4 text-sm text-steel sm:p-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="font-semibold text-navy">Works Address</p>
                    <p className="mt-1">{company.address}</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="surface-lift flex gap-3 border border-line bg-navy p-4 text-sm text-steel-light sm:p-5">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-brand">
                      Office Hours
                    </p>
                    <p className="mt-1 text-white">{company.officeHours}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </div>
        </div>
      </section>

      <QuoteForm compactHeading />
      <FinalCTA />
    </>
  );
}
