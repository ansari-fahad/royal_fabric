"use client";

import React, { useState } from "react";
import { craftsmanshipPillars, testimonials, faqList } from "@/data/content";
import { Sparkles, Star, ChevronDown, CheckCircle, ShieldCheck } from "lucide-react";

export const CraftsmanshipSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 md:py-36 bg-[#08080A] text-[#FAF7F2] border-t border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#161618] border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HERITAGE ATELIER PRINCIPLES</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider font-light">
            The Science of <span className="font-serif italic text-gold-gradient font-normal">Pure Zari</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#FAF7F2]/70 font-light leading-relaxed">
            Where ancestral Banarasi &amp; Persian loom traditions harmonize with modern couture standards. Every fiber is documented from silkworm mulberry grove to ceremonial final cut.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {craftsmanshipPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#101014] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xl sm:text-2xl font-light text-[#D4AF37] block mb-3 sm:mb-4">
                  {pillar.number}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/70 font-mono block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-normal mb-2 sm:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono text-white/40">
                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span>ATELIER VERIFIED SPEC</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Couture Client Testimonials */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37] block mb-2">
              CLIENT TESTIMONIALS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
              Praised by Couture Maisons &amp; Royal Brides
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#121216] border border-[#D4AF37]/20 flex flex-col justify-between space-y-5 sm:space-y-6"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm sm:text-base text-white/90 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="font-sans text-xs font-semibold text-white">
                      {t.author}
                    </h5>
                    <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-mono block">
                      {t.role}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/40 font-mono">
                      {t.city}
                    </span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]/60 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atelier Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37] block mb-2">
              CLARIFICATIONS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Frequently Addressed Inquiries
            </h3>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#121216] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-serif text-white hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs text-[#FAF7F2]/75 font-light leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
