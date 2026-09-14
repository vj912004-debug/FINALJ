"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroMedia } from "@/data/site";

type Props = {
  className?: string;
  overlayClassName?: string;
};

export default function VideoBackground({
  className = "",
  overlayClassName = "bg-gradient-to-br from-navy/70 via-navy/45 to-[#012a3c]/65",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>(heroMedia.localSrc);
  const [failedLocal, setFailedLocal] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
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
  }, []);

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
        className="object-cover"
        sizes="100vw"
      />
      {allowVideo ? (
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
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
