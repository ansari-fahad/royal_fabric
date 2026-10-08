"use client";

import React from "react";
import { StoryBeat, storyBeats } from "@/data/content";
import { Sparkles, ShieldCheck } from "lucide-react";

interface StorySectionsProps {
  progress: number;
  currentFrame: number;
}

export const StorySections: React.FC<StorySectionsProps> = ({
  progress,
  currentFrame,
}) => {
  const getBeatOpacity = (beat: StoryBeat) => {
    if (progress < beat.startProgress || progress > beat.endProgress) {
      return 0;
    }
    const mid = (beat.startProgress + beat.endProgress) / 2;
    const halfSpan = (beat.endProgress - beat.startProgress) / 2;
    const dist = Math.abs(progress - mid);
    const normalized = 1 - dist / halfSpan;
    return Math.max(0, Math.min(1, normalized * 1.5));
  };

  const heroOpacity = Math.max(0, 1 - progress / 0.12);
  const heroTranslateY = -progress * 150;
  const finalCtaOpacity = Math.max(0, Math.min(1, (progress - 0.92) / 0.06));

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-14 select-none">
      {/* Top Status & Timeline Bar */}
      <div className="flex items-center justify-between w-full pt-16 sm:pt-20">
        <div className="flex items-center space-x-2 sm:space-x-3 bg-[#0A0A0C]/75 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 max-w-[80vw] sm:max-w-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping flex-shrink-0" />
          <span className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#F3E8D2] font-mono truncate">
            CINEMATIC DRAPE • FRAME {String(currentFrame).padStart(3, "0")} / 240
          </span>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="flex items-center space-x-2 sm:space-x-3 bg-[#0A0A0C]/75 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 flex-shrink-0">
          <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#D4AF37] font-mono">
            FLOW
          </span>
          <div className="w-12 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFF3D6] transition-all duration-75"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/60 font-mono">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>

      {/* Hero Opening Title (0% - 12% scroll) */}
      <div
        className="my-auto text-center pointer-events-auto transition-all duration-300 px-2 sm:px-4"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          display: heroOpacity <= 0 ? "none" : "block",
        }}
      >
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0A0A0C]/70 backdrop-blur-md mb-4 sm:mb-6">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#F3E8D2] font-mono">
            ATELIER EDITORIAL 2026
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.06em] sm:tracking-[0.12em] text-white uppercase font-light drop-shadow-2xl">
          Ansari <span className="text-gold-gradient font-normal italic font-serif">Fabric</span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-[11px] sm:text-sm md:text-base text-[#FAF7F2]/80 font-light tracking-[0.12em] sm:tracking-[0.18em] uppercase">
          The Architecture of Pure Silk &amp; 24K Dipped Gold Zari
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col items-center space-y-2">
          <span className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#D4AF37] font-mono animate-pulse">
            SCROLL TO COMMENCE THE DRAPE
          </span>
          <div className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce" />
        </div>
      </div>

      {/* Story Sections Overlays (15% - 85% scroll) */}
      <div className="relative w-full max-w-6xl mx-auto my-auto pointer-events-none px-1 sm:px-0">
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
                  ? "justify-center sm:justify-end text-left sm:text-right"
                  : "justify-center sm:justify-start text-left"
              }`}
              style={{
                opacity: beatOpacity,
                transform: `translateY(calc(-50% + ${(1 - beatOpacity) * 20}px))`,
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
            >
              <div
                className={`w-full max-w-sm sm:max-w-md md:max-w-lg p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0A0A0C]/85 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto mx-auto sm:mx-0 ${
                  isCenter ? "sm:mx-auto" : ""
                }`}
              >
                <div
                  className={`flex items-center space-x-2 mb-2 sm:mb-3 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37] font-mono ${
                    isRight ? "justify-start sm:justify-end" : isCenter ? "justify-center" : "justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                  <span>{beat.phase}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-1.5 sm:mb-2">
                  {beat.title}
                </h2>

                <h3 className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#D4AF37] font-mono mb-3 sm:mb-4">
                  {beat.subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light mb-4 sm:mb-5">
                  {beat.description}
                </p>

                <div
                  className={`pt-3 border-t border-white/10 flex items-center space-x-2 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#F3E8D2]/70 font-mono ${
                    isRight ? "justify-start sm:justify-end" : isCenter ? "justify-center" : "justify-start"
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate">{beat.accentText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Sequence Call to Action (88% - 100% scroll) */}
      <div
        className="my-auto text-center pointer-events-auto transition-all duration-300 max-w-xl mx-auto w-full px-2 sm:px-0"
        style={{
          opacity: finalCtaOpacity,
          transform: `translateY(${(1 - finalCtaOpacity) * 30}px)`,
          display: finalCtaOpacity <= 0 ? "none" : "block",
        }}
      >
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0A0A0C]/90 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#D4AF37] font-mono block mb-2">
            THE DRAPE COMPLETE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4">
            Own the Masterpiece
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed mb-6 max-w-md mx-auto">
            Bespoke yardage cuts and bridal swatches prepared on demand. Certified 100% pure silk and real bullion gold.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#collection"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gold-gradient text-[#0A0A0C] font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold rounded hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)] text-center"
            >
              Explore Collection
            </a>
            <a
              href="#bespoke"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors rounded text-center"
            >
              Bespoke Reel Inquiries
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Navigation Indicator */}
      <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-white/40 tracking-[0.15em] sm:tracking-[0.2em] font-mono uppercase pb-2 px-1">
        <span>HERITAGE ATELIER EST. 1984</span>
        <span className="hidden md:inline">SWISS &amp; MUGHAL SILK WEAVE CERTIFIED</span>
        <span>ANSARI FABRIC © 2026</span>
      </div>
    </div>
  );
};
