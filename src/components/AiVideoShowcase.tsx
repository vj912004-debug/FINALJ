"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Copy,
  Check,
  Volume2,
  Sparkles,
  Film,
  Layers,
  Award,
  X,
  Tv,
} from "lucide-react";
import { aiVideosList, AiVideoItem } from "@/data/videos";

export default function AiVideoShowcase() {
  const [filter, setFilter] = useState<"core" | "all">("core");
  const [selectedVideo, setSelectedVideo] = useState<AiVideoItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"gu" | "en">("gu");

  const displayedVideos =
    filter === "core"
      ? aiVideosList.filter((v) => v.isCore)
      : aiVideosList;

  function handleCopyPrompt(v: AiVideoItem) {
    navigator.clipboard.writeText(v.aiPrompt);
    setCopiedId(v.id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function handleSpeakVoiceover(v: AiVideoItem, lang: "gu" | "en") {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech voice preview is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === `${v.id}-${lang}`) {
      setSpeakingId(null);
      return;
    }

    const text = lang === "gu" ? v.voiceOverGu : v.voiceOverEn;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "gu" ? "gu-IN" : "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(`${v.id}-${lang}`);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24 text-white">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
            <Sparkles className="h-4 w-4" />
            AI Video Showcase & Production Hub
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Jagdamba <span className="text-brand">12 AI Videos</span> Strategy
          </h2>
          <p className="mt-3 text-base text-steel-light sm:text-lg">
            વેબસાઇટ માટે ૧૨ સ્પેશિયલ AI વિડિઓઝના Prompts, Screen Overlay Texts અને Voice-over સ્ક્રિપ્ટ્સ.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setFilter("core")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                filter === "core"
                  ? "bg-brand text-navy shadow-lg shadow-brand/20"
                  : "text-steel-light hover:text-white"
              }`}
            >
              <Award className="h-4 w-4" />
              High-Impact Core 6 Videos (મુખ્ય ૬)
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                filter === "all"
                  ? "bg-brand text-navy shadow-lg shadow-brand/20"
                  : "text-steel-light hover:text-white"
              }`}
            >
              <Layers className="h-4 w-4" />
              All 12 AI Videos (કુલ ૧૨ બ્રાન્ડેડ વિડિઓ)
            </button>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedVideos.map((video) => {
            const isCopying = copiedId === video.id;
            const isSpeakingGu = speakingId === `${video.id}-gu`;

            return (
              <div
                key={video.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-navy-light/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10"
              >
                {/* Video / Poster Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/80">
                  <Image
                    src={video.posterImage}
                    alt={video.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-95"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-md bg-navy-dark/90 border border-white/20 px-2.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">
                      #{video.number}
                    </span>
                    {video.isCore && (
                      <span className="rounded-md bg-brand text-navy px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                        Core 6
                      </span>
                    )}
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/90 text-navy shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110 group-hover:bg-brand"
                    title="Watch AI Video Preview"
                  >
                    <Play className="h-6 w-6 fill-navy translate-x-0.5" />
                  </button>

                  {/* Screen Text Badge on Thumbnail */}
                  <div className="absolute bottom-2 left-3 right-3 truncate rounded-md bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white/90 border border-white/10">
                    <span className="text-brand font-bold">Screen Text:</span> {video.screenText}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-brand transition-colors">
                      {video.titleEn}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-steel-light">
                      {video.titleGu}
                    </p>

                    <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs">
                      <p className="font-semibold text-white/90 italic">
                        &quot;{video.voiceOverGu}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-col gap-2 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors"
                      >
                        <Tv className="h-3.5 w-3.5 text-brand" />
                        Preview & Script
                      </button>

                      <button
                        onClick={() => handleCopyPrompt(video)}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors border ${
                          isCopying
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : "bg-white/5 border-white/10 hover:bg-white/15 text-steel-light hover:text-white"
                        }`}
                        title="Copy AI Prompt"
                      >
                        {isCopying ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-brand" />
                            AI Prompt
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => handleSpeakVoiceover(video, "gu")}
                      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors border ${
                        isSpeakingGu
                          ? "bg-brand/20 border-brand text-brand animate-pulse"
                          : "bg-white/5 border-white/10 hover:bg-brand/10 hover:border-brand/40 text-steel-light hover:text-brand"
                      }`}
                    >
                      <Volume2 className="h-3.5 w-3.5 text-brand" />
                      {isSpeakingGu ? "Playing Voiceover..." : "Listen Voice-over (Gujarati)"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Preview & Script Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-navy-dark shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-navy">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-brand text-navy px-2.5 py-1 text-xs font-bold">
                  Video #{selectedVideo.number}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {selectedVideo.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* HTML5 Video Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/15">
                <video
                  src={selectedVideo.videoSrc}
                  poster={selectedVideo.posterImage}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
                {/* On-screen Text Overlay */}
                <div className="absolute top-4 left-4 right-4 pointer-events-none rounded-lg bg-black/75 backdrop-blur-md p-3 border border-brand/40">
                  <p className="text-xs uppercase tracking-widest text-brand font-bold">
                    Screen Text Overlay:
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {selectedVideo.screenText}
                  </p>
                </div>
              </div>

              {/* Voice-over Player Controls */}
              <div className="rounded-xl border border-white/10 bg-navy-light/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                    <Volume2 className="h-4 w-4" />
                    Voice-Over Script & Audio
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveLang("gu")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeLang === "gu"
                          ? "bg-brand text-navy"
                          : "bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      ગુજરાતી (Gujarati)
                    </button>
                    <button
                      onClick={() => setActiveLang("en")}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeLang === "en"
                          ? "bg-brand text-navy"
                          : "bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <p className="text-base font-semibold text-white">
                  {activeLang === "gu"
                    ? selectedVideo.voiceOverGu
                    : selectedVideo.voiceOverEn}
                </p>

                <button
                  onClick={() => handleSpeakVoiceover(selectedVideo, activeLang)}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold uppercase text-navy transition-transform hover:scale-105"
                >
                  <Volume2 className="h-4 w-4" />
                  {speakingId === `${selectedVideo.id}-${activeLang}`
                    ? "Stop Audio"
                    : `Listen Voiceover (${activeLang === "gu" ? "Gujarati" : "English"})`}
                </button>
              </div>

              {/* AI Video Prompt */}
              <div className="rounded-xl border border-brand/30 bg-black/50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                    <Film className="h-4 w-4" />
                    Runway / Luma / Kling AI Prompt
                  </span>
                  <button
                    onClick={() => handleCopyPrompt(selectedVideo)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                  >
                    {copiedId === selectedVideo.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied Prompt!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Prompt
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono text-steel-light bg-black/80 p-3 rounded-lg border border-white/10 leading-relaxed select-all">
                  {selectedVideo.aiPrompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
