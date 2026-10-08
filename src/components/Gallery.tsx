"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { fabricCatalog } from "@/data/content";

export const Gallery: React.FC = () => {
  const { setActiveProductModal } = useCart();
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const lookbookItems = [
    {
      title: "The Haute Couture Finale",
      fabric: "Zuleikha Hand-Worked Tulle & Bullion Gold",
      frame: "/frames/ezgif-frame-240.jpg",
      caption: "The culmination of the 240-frame drape — imperial silhouette sculpted in pure 24K dipped bullion gold wire.",
      specs: "95 GSM • INVISIBLE ILLUSION NET • FRENCH DYE",
      productId: "zuleikha-embroidered-tulle",
    },
    {
      title: "The Royal Turning",
      fabric: "Al-Miraj Royal Brocade",
      frame: "/frames/ezgif-frame-120.jpg",
      caption: "Persian botanical motifs glistening under direct twilight rays with structural gold density.",
      specs: "360 GSM • CUT VELVET PILE • 24K DIPPED WIRE",
      productId: "al-miraj-velvet-brocade",
    },
    {
      title: "Liquid Silhouette in Motion",
      fabric: "Chanderi Gilded Chiffon",
      frame: "/frames/ezgif-frame-060.jpg",
      caption: "High-twist crepe weave undulating in gentle natural breezes without static friction.",
      specs: "32 GSM • FEATHERWEIGHT CREPE • CRUELTY-FREE",
      productId: "chanderi-gilded-chiffon",
    },
    {
      title: "The Golden Hour Inception",
      fabric: "Noor-e-Zari Silk Organza",
      frame: "/frames/ezgif-frame-001.jpg",
      caption: "Translucent silk billowing against panoramic mountain sunset as the story begins.",
      specs: "48 GSM • 138 CM WIDTH • PURE WARP ZARI",
      productId: "noor-zari-organza",
    },
  ];

  return (
    <section id="craftsmanship" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#0A0A0C] via-[#0E0E11] to-[#0A0A0C] text-[#FAF7F2] relative overflow-hidden">
      {/* Visual Bridge connecting Hero's final frame into Living Drape */}
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-b from-[#0A0A0C] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4">
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              <span>CONTINUATION OF MOTION • EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl uppercase tracking-wider font-light">
              Living <span className="font-serif italic text-gold-gradient font-normal">Drape</span>
            </h2>
          </div>
          <p className="mt-3 md:mt-0 max-w-md text-xs sm:text-sm text-[#FAF7F2]/70 font-light leading-relaxed">
            Transitioning directly from the 240-frame motion sequence into our archival lookbook. Witness how our fabrics drape naturally under movement with zero synthetic stiffness.
          </p>
        </div>

        {/* Dynamic Editorial Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Main Hero Viewer (Left 7 Cols) */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-[#0A0A0C] border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="relative min-h-[380px] sm:min-h-0 sm:aspect-[16/10] w-full overflow-hidden flex flex-col justify-between">
              <img
                src={lookbookItems[activeFrameIndex].frame}
                alt={lookbookItems[activeFrameIndex].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-black/30 pointer-events-none" />

              {/* Top Details Pill */}
              <div className="relative z-10 p-4 sm:p-6 flex items-center space-x-2 sm:space-x-3">
                <span className="px-2.5 sm:px-3 py-1 rounded bg-[#0A0A0C]/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30">
                  LOOK 0{activeFrameIndex + 1}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded bg-[#0A0A0C]/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-white/80 uppercase tracking-widest border border-white/10 truncate max-w-[200px] sm:max-w-none">
                  {lookbookItems[activeFrameIndex].fabric}
                </span>
              </div>

              {/* Bottom Information Overlay */}
              <div className="relative z-10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mt-auto">
                <div className="max-w-md">
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal mb-1">
                    {lookbookItems[activeFrameIndex].title}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 font-light mb-2 line-clamp-3 sm:line-clamp-none">
                    {lookbookItems[activeFrameIndex].caption}
                  </p>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] tracking-[0.15em] sm:tracking-[0.2em] uppercase block">
                    {lookbookItems[activeFrameIndex].specs}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const match = fabricCatalog.find(
                      (p) => p.id === lookbookItems[activeFrameIndex].productId
                    );
                    if (match) setActiveProductModal(match);
                  }}
                  className="inline-flex items-center justify-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#D4AF37] text-[#0A0A0C] font-mono text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold hover:brightness-110 active:scale-95 transition-all flex-shrink-0 w-full sm:w-auto"
                >
                  <span>Weave Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Lookbook Thumbnails / Scene Selectors (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37] font-mono block">
              SELECT STUDY CHOREOGRAPHY:
            </span>

            {lookbookItems.map((item, idx) => {
              const isActive = activeFrameIndex === idx;
              return (
                <button
                  key={item.title}
                  onClick={() => setActiveFrameIndex(idx)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 flex items-center space-x-3 sm:space-x-4 border ${
                    isActive
                      ? "bg-[#18181B] border-[#D4AF37] shadow-[0_4px_25px_rgba(212,175,55,0.15)]"
                      : "bg-[#121214] border-white/5 hover:border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#0A0A0C]">
                    <img
                      src={item.frame}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                        Phase 0{idx + 1}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-white/40">
                        {item.productId.split("-")[0].toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm sm:text-base text-white truncate mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/50 truncate font-light mt-0.5">
                      {item.fabric}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
