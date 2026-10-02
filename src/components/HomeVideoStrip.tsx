"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { galleryVideos } from "@/data/site";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/Motion";

function HoverVideo({
  src,
  poster,
  title,
  reduce,
}: {
  src: string;
  poster: string;
  title: string;
  reduce: boolean | null;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-navy">
      {reduce ? (
        <Image src={poster} alt="" fill className="object-cover" sizes="25vw" />
      ) : (
        <video
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onMouseEnter={(e) => {
            const play = e.currentTarget.play();
            if (play) play.catch(() => undefined);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_12px_28px_-12px_rgba(244,124,32,0.9)]">
          <Play className="h-5 w-5 fill-current" aria-hidden />
        </span>
      </span>
      <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </p>
    </div>
  );
}

export default function HomeVideoStrip() {
  const reduce = useReducedMotion();
  const clips = galleryVideos.slice(0, 4);

  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Watch the Plant
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Motion from the shop floor
            </h2>
            <p className="mt-3 max-w-xl text-sm text-steel sm:text-base">
              Hover a clip to preview. Open the gallery for the full set.
            </p>
          </div>
          <Link href="/gallery" className="btn btn-outline btn-shine">
            All videos
          </Link>
        </FadeIn>

        <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clips.map((clip) => (
            <StaggerItem key={clip.id}>
              <Link href="/gallery" className="group block overflow-hidden border border-line bg-white">
                <HoverVideo
                  src={clip.src}
                  poster={clip.poster}
                  title={clip.title}
                  reduce={reduce}
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
