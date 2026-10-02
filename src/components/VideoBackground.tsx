"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/data/site";

type Props = {
  className?: string;
  overlayClassName?: string;
  /** Force image-only (no video), e.g. for mobile-first sections */
  imageOnly?: boolean;
};

const DESKTOP_MIN = "(min-width: 768px)";

export default function VideoBackground({
  className = "",
  overlayClassName = "bg-gradient-to-br from-navy/70 via-navy/45 to-[#06152d]/65",
  imageOnly = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>(heroMedia.localSrc);
  const [failedLocal, setFailedLocal] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);

  useEffect(() => {
    if (imageOnly) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );

    const update = () => setAllowVideo(!(mqReduce.matches || saveData));

    update();
    mqReduce.addEventListener("change", update);
    return () => mqReduce.removeEventListener("change", update);
  }, [imageOnly]);

  useEffect(() => {
    const el = videoRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    el.muted = true;
    if (!allowVideo) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const play = el.play();
          if (play && typeof play.catch === "function") play.catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [src, allowVideo]);

  function onSourceError() {
    // Phones skip the source via its media query, which also fires "error".
    if (!window.matchMedia(DESKTOP_MIN).matches) return;
    if (!failedLocal) {
      setFailedLocal(true);
      setSrc(heroMedia.fallbackSrc);
      return;
    }
    if (src !== heroMedia.fallbackSrcAlt) setSrc(heroMedia.fallbackSrcAlt);
  }

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <Image
        src={heroMedia.poster}
        alt=""
        fill
        priority
        className="hero-settle object-cover"
        sizes="100vw"
      />
      {imageOnly ? null : (
        <video
          ref={videoRef}
          key={src}
          className={`hero-settle absolute inset-0 hidden h-full w-full object-cover md:block ${
            allowVideo ? "" : "md:hidden"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroMedia.poster}
        >
          {!failedLocal && heroMedia.localWebm ? (
            <source
              src={heroMedia.localWebm}
              type="video/webm"
              media={DESKTOP_MIN}
              onError={onSourceError}
            />
          ) : null}
          <source
            src={src}
            type="video/mp4"
            media={DESKTOP_MIN}
            onError={onSourceError}
          />
        </video>
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />
    </div>
  );
}
