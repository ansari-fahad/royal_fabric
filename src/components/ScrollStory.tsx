"use client";

import React from "react";
import { StoryBeat, storyBeats } from "@/data/content";
import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

interface ScrollStoryOverlayProps {
  progress: number;
  currentFrame: number;
}

export const ScrollStory: React.FC<ScrollStoryOverlayProps> = ({
  progress,
  currentFrame,
}) => {
  // Determine which beat is active based on progress range
  const getBeatOpacity = (beat: StoryBeat) => {
    if (progress < beat.startProgress || progress > beat.endProgress) {
      return 0;
    }
    const mid = (beat.startProgress + beat.endProgress) / 2;
    const halfSpan = (beat.endProgress - beat.startProgress) / 2;
    const dist = Math.abs(progress - mid);
    const normalized = 1 - dist / halfSpan;
    // Smooth ramp in and out
    return Math.max(0, Math.min(1, normalized * 1.5));
  };

  // Hero title opacity at top (1 at 0.0, fades by 0.12)
  const heroOpacity = Math.max(0, 1 - progress / 0.12);
  const heroTranslateY = -progress * 150;

  // Final CTA opacity at end of sequence (fades in past 0.88)
  const finalCtaOpacity = Math.max(0, Math.min(1, (progress - 0.86) / 0.1));

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-14 select-none">
      {/* Top Status & Timeline Bar */}
      <div className="flex items-center justify-between w-full pt-16 md:pt-20">
        <div className="flex items-center space-x-3 bg-[#0A0A0C]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#F3E8D2] font-mono">
            CINEMATIC DRAPE • FRAME {String(currentFrame).padStart(3, "0")} / 240
          </span>
        </div>

        {/* Scroll Progress Meter */}
        <div className="hidden sm:flex items-center space-x-3 bg-[#0A0A0C]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-mono">
            FLOW
          </span>
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFF3D6] transition-all duration-75"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-white/60 font-mono">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>

      {/* Hero Opening Title (Visible at top 0-12% scroll) */}
      <div
        className="my-auto text-center pointer-events-auto transition-all duration-300"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          display: heroOpacity <= 0 ? "none" : "block",
        }}
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0A0A0C]/70 backdrop-blur-md mb-6">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#F3E8D2] font-mono">
            ATELIER EDITORIAL 2026
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-[0.12em] text-white uppercase font-light drop-shadow-2xl">
          Ansari <span className="text-gold-gradient font-normal italic font-serif">Fabric</span>
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-[#FAF7F2]/80 font-light tracking-[0.18em] uppercase">
          The Architecture of Pure Silk &amp; 24K Dipped Gold Zari
        </p>

        <div className="mt-12 flex flex-col items-center space-y-2">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#D4AF37] font-mono animate-pulse">
            SCROLL TO COMMENCE THE DRAPE
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce" />
        </div>
      </div>

      {/* Story Beats Overlays (0.15 - 0.85 scroll) */}
      <div className="relative w-full max-w-6xl mx-auto my-auto pointer-events-none">
        {storyBeats.map((beat) => {
          const beatOpacity = getBeatOpacity(beat);
          if (beatOpacity <= 0) return null;

          const isRight = beat.alignment === "right";
          const isCenter = beat.alignment === "center";

          return (
            <div
              key={beat.id}
              className={`absolute top-1/2 -translate-y-1/2 w-full flex ${
                isCenter
                  ? "justify-center text-center"
                  : isRight
                  ? "justify-end text-right"
                  : "justify-start text-left"
              }`}
              style={{
                opacity: beatOpacity,
                transform: `translateY(calc(-50% + ${(1 - beatOpacity) * 20}px))`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              <div
                className={`max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0A0A0C]/75 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto ${
                  isCenter ? "mx-auto" : ""
                }`}
              >
                <div
                  className={`flex items-center space-x-2 mb-3 text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono ${
                    isRight ? "justify-end" : isCenter ? "justify-center" : "justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{beat.phase}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-2">
                  {beat.title}
                </h2>

                <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono mb-4">
                  {beat.subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light mb-5">
                  {beat.description}
                </p>

                <div
                  className={`pt-3 border-t border-white/10 flex items-center space-x-2 text-[9px] tracking-[0.25em] uppercase text-[#F3E8D2]/60 font-mono ${
                    isRight ? "justify-end" : isCenter ? "justify-center" : "justify-start"
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>{beat.accentText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Sequence Call to Action (Appears at 88% - 100% scroll) */}
      <div
        className="my-auto text-center pointer-events-auto transition-all duration-300 max-w-xl mx-auto"
        style={{
          opacity: finalCtaOpacity,
          transform: `translateY(${(1 - finalCtaOpacity) * 30}px)`,
          display: finalCtaOpacity <= 0 ? "none" : "block",
        }}
      >
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0A0C]/85 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-mono block mb-2">
            THE DRAPE COMPLETE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Own the Masterpiece
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed mb-6">
            Bespoke yardage cuts and bridal swatches prepared on demand. Certified 100% pure silk and real bullion gold.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#collection"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient text-[#0A0A0C] font-mono text-xs tracking-[0.25em] uppercase font-bold rounded hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
            >
              Explore Collection
            </a>
            <a
              href="#bespoke"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-mono text-xs tracking-[0.25em] uppercase transition-colors rounded"
            >
              Bespoke Reel Inquiries
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Navigation Indicator */}
      <div className="flex items-center justify-between text-[10px] text-white/40 tracking-[0.2em] font-mono uppercase pb-2">
        <span>HERITAGE ATELIER EST. 1984</span>
        <span className="hidden sm:inline">SWISS &amp; MUGHAL SILK WEAVE CERTIFIED</span>
        <span>ANSARI FABRIC © 2026</span>
      </div>
    </div>
  );
};
