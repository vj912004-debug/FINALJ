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

const MOBILE_MAX = "(max-width: 767px)";

export default function VideoBackground({
  className = "",
  overlayClassName = "bg-gradient-to-br from-navy/70 via-navy/45 to-[#012a3c]/65",
  imageOnly = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>(heroMedia.localSrc);
  const [failedLocal, setFailedLocal] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    if (imageOnly) {
      setAllowVideo(false);
      return;
    }

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia(MOBILE_MAX);
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );

    const update = () => {
      // Phones: static plant image only — no video hero
      setAllowVideo(!(mqReduce.matches || mqMobile.matches || saveData));
    };

    update();
    mqReduce.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, [imageOnly]);

  useEffect(() => {
    const el = videoRef.current;
    const root = rootRef.current;
    if (!el || !allowVideo || !root) return;
    el.muted = true;
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

  function onError() {
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
        className="hero-kenburns object-cover object-[center_28%] sm:object-center"
        sizes="100vw"
      />
      {allowVideo ? (
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroMedia.poster}
          onError={onError}
        >
          {!failedLocal ? (
            <source src={heroMedia.localWebm} type="video/webm" />
          ) : null}
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />
    </div>
  );
}
