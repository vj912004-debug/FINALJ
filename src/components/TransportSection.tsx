"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { company, plantImages, transport } from "@/data/site";
import { FadeIn } from "@/components/motion/Motion";

const featureIcons = [Truck, ShieldCheck, ShieldCheck, MapPin, Clock];

export default function TransportSection() {
  return (
    <section className="section-atmosphere bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="banner-media relative mb-8 overflow-hidden border border-line sm:mb-10">
          <Image
            src={plantImages.dispatch}
            alt="Steel plate loading and dispatch"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/35 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <p className="inline-block bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {transport.badge}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {transport.heading}
            </h2>
          </div>
        </FadeIn>

        <FadeIn className="max-w-3xl">
          <p className="text-base italic text-brand">{transport.subheading}</p>
          <div className="accent-rule mt-4" aria-hidden />
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <h3 className="font-display text-lg font-bold uppercase text-navy">
              Dispatch Strength
            </h3>
            <ul className="mt-4 space-y-3">
              {transport.dispatchStrength.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-steel">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.06} className="surface-lift border border-line bg-background p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy">
              Transport Contacts
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-steel">
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Office: {company.officePhones.join(" / ")}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Inquiry: {company.inquiryPhone}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Accounts: {company.accountsPhones.join(" / ")}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Land Line: {company.landLine}
              </li>
            </ul>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {transport.features.map((feature, i) => {
            const Icon = featureIcons[i] ?? Truck;
            return (
              <div
                key={feature.title}
                className="surface-lift border border-line bg-background p-4 text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-3 font-display text-xs font-bold uppercase tracking-wide text-navy">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs text-steel">{feature.detail}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 border border-line bg-background px-4 py-4 text-center text-sm font-semibold text-navy">
          {transport.logisticsChain}
        </p>
      </div>
    </section>
  );
}
