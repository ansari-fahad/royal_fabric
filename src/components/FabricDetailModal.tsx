"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Sparkles, Shield, Check, ShoppingBag, Layers, Ruler, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FabricDetailModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToCart } = useCart();
  const [selectedMeters, setSelectedMeters] = useState(3);
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Lock body scroll while modal is open
  useEffect(() => {
    if (activeProductModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProductModal]);

  if (!activeProductModal) return null;

  const currentColor =
    selectedColor || activeProductModal.colors[0]?.name || "Standard";

  const handleAddMeters = () => {
    addToCart(activeProductModal, "meters", selectedMeters, currentColor);
    setActiveProductModal(null);
  };

  const handleAddSample = () => {
    addToCart(activeProductModal, "sample", 1, currentColor);
    setActiveProductModal(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveProductModal(null)}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#111114] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[92vh] flex flex-col md:flex-row my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveProductModal(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#0A0A0C]/85 hover:bg-[#D4AF37] text-white hover:text-[#0A0A0C] transition-colors border border-white/10"
            aria-label="Close Dossier"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left Column: Image & Highlights */}
          <div className="h-48 sm:h-60 md:h-auto md:w-5/12 relative bg-[#0A0A0C] flex-shrink-0 overflow-hidden">
            <img
              src={activeProductModal.featuredImage}
              alt={activeProductModal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-black/30" />

            <div className="absolute bottom-3 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-mono block">
                ATELIER DOSSIER # {activeProductModal.id.toUpperCase()}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl text-white font-normal truncate">
                {activeProductModal.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#FAF7F2]/80 mt-0.5 font-light truncate">
                {activeProductModal.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Technical Specifications & Actions */}
          <div className="md:w-7/12 p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[11px] sm:text-xs font-mono tracking-widest uppercase">
                    Technical Specifications
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-serif text-white font-semibold">
                    ${activeProductModal.pricePerMeter}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/50 font-mono ml-1">
                    / METER
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed">
                {activeProductModal.description}
              </p>

              {/* Key Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs font-mono">
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#18181C] border border-white/5">
                  <div className="text-white/40 text-[9px] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                    <Layers className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                    <span>COMPOSITION</span>
                  </div>
                  <div className="text-white text-[11px] font-sans">
                    {activeProductModal.composition}
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#18181C] border border-white/5">
                  <div className="text-white/40 text-[9px] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                    <Ruler className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                    <span>WIDTH &amp; WEIGHT</span>
                  </div>
                  <div className="text-white text-[11px]">
                    {activeProductModal.width} • {activeProductModal.weight}
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#18181C] border border-white/5">
                  <div className="text-white/40 text-[9px] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                    <span>ANCESTRAL ORIGIN</span>
                  </div>
                  <div className="text-white text-[11px]">
                    {activeProductModal.origin}
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg bg-[#18181C] border border-white/5">
                  <div className="text-white/40 text-[9px] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                    <Shield className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                    <span>CERTIFICATION</span>
                  </div>
                  <div className="text-[#D4AF37] text-[11px]">
                    100% Silk Mark Standard
                  </div>
                </div>
              </div>

              {/* Characteristics Checklist */}
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-white/50 block mb-1.5 sm:mb-2">
                  CHARACTERISTICS:
                </span>
                <ul className="space-y-1 sm:space-y-1.5">
                  {activeProductModal.characteristics.map((char, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#FAF7F2]/75 flex items-start space-x-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Swatch Selection */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                  <span>SELECT PALETTE SHADE:</span>
                  <span className="text-[#D4AF37] font-semibold truncate max-w-[150px]">
                    {currentColor}
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  {activeProductModal.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all relative ${
                        currentColor === color.name
                          ? "ring-2 ring-[#D4AF37] scale-110"
                          : "opacity-75 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Choose shade ${color.name}`}
                    >
                      {currentColor === color.name && (
                        <Check className="w-3.5 h-3.5 text-[#0A0A0C] absolute inset-0 m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div className="p-2.5 sm:p-3 rounded-lg bg-[#18181C]/60 border border-white/5 text-[11px] text-white/60">
                <span className="text-[#D4AF37] font-mono uppercase text-[9px] block mb-0.5">
                  CARE PROTOCOL:
                </span>
                {activeProductModal.careInstructions}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 sm:pt-4 border-t border-white/10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between bg-[#18181C] p-2 rounded-lg">
                <span className="text-[10px] sm:text-xs font-mono uppercase text-white/60 ml-2">
                  CUT YARDAGE:
                </span>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <button
                    onClick={() =>
                      setSelectedMeters(Math.max(1, selectedMeters - 1))
                    }
                    className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-mono text-sm"
                    aria-label="Decrease meters"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-xs sm:text-sm font-semibold text-white">
                    {selectedMeters}m
                  </span>
                  <button
                    onClick={() =>
                      setSelectedMeters(Math.min(30, selectedMeters + 1))
                    }
                    className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-mono text-sm"
                    aria-label="Increase meters"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  onClick={handleAddMeters}
                  className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg bg-gold-gradient text-[#0A0A0C] font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">
                    Add {selectedMeters}m ($
                    {activeProductModal.pricePerMeter * selectedMeters})
                  </span>
                </button>

                <button
                  onClick={handleAddSample}
                  className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Sample Swatch (${activeProductModal.samplePrice})</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
