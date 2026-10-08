"use client";

import React, { useState } from "react";
import { fabricCatalog, FabricProduct } from "@/data/content";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Check,
  Shield,
  Layers,
  Info,
} from "lucide-react";

export const ProductSection: React.FC = () => {
  const { addToCart, setActiveProductModal } = useCart();
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Local state for meters and color per product
  const [productMeters, setProductMeters] = useState<Record<string, number>>({
    "noor-zari-organza": 3,
    "al-miraj-velvet-brocade": 2,
    "chanderi-gilded-chiffon": 5,
    "zuleikha-embroidered-tulle": 3,
    "shahmaran-tissue-brocade": 2,
    "banu-ivory-twill": 4,
  });

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    "noor-zari-organza": "Alabaster Gold",
    "al-miraj-velvet-brocade": "Palace Gold",
    "chanderi-gilded-chiffon": "Pearl Cream",
    "zuleikha-embroidered-tulle": "Ivory Mist",
    "shahmaran-tissue-brocade": "24K Real Gold",
    "banu-ivory-twill": "Warm Alabaster",
  });

  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const filters = [
    "All",
    "Silk Organza",
    "Brocade & Velvet",
    "Gilded Chiffon",
    "Embroidered Tulle",
  ];

  const filteredProducts = fabricCatalog.filter((item) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Silk Organza") return item.name.includes("Organza");
    if (selectedFilter === "Brocade & Velvet")
      return item.name.includes("Brocade") || item.name.includes("Velvet");
    if (selectedFilter === "Gilded Chiffon") return item.name.includes("Chiffon");
    if (selectedFilter === "Embroidered Tulle") return item.name.includes("Tulle");
    return true;
  });

  const handleMeterChange = (id: string, delta: number) => {
    setProductMeters((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(30, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAddMeters = (product: FabricProduct) => {
    const meters = productMeters[product.id] || 1;
    const color = selectedColors[product.id] || product.colors[0].name;
    addToCart(product, "meters", meters, color);

    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  const handleAddSample = (product: FabricProduct) => {
    const color = selectedColors[product.id] || product.colors[0].name;
    addToCart(product, "sample", 1, color);

    setAddedAnimation(`${product.id}-sample`);
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  return (
    <section id="collection" className="relative py-16 sm:py-24 md:py-36 bg-[#0A0A0C] border-t border-[#D4AF37]/15">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full max-w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#161618] mb-4 sm:mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#F3E8D2] font-mono">
              PERFECT CUTS BY THE METER
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light uppercase tracking-wide">
            Haute Couture <span className="italic font-serif text-gold-gradient font-normal">Repertoire</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#FAF7F2]/70 font-light leading-relaxed">
            Spun on heritage shuttle looms from pure mulberry silk and electroplated precious gold bullion. Available in custom cut yardage or archival swatch dossiers.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-[#D4AF37] text-[#0A0A0C] font-semibold shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
                    : "bg-[#161618] text-[#FAF7F2]/60 hover:text-white border border-white/5 hover:border-[#D4AF37]/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const meters = productMeters[product.id] || 1;
            const chosenColor = selectedColors[product.id] || product.colors[0].name;
            const isAdded = addedAnimation === product.id;
            const isSampleAdded = addedAnimation === `${product.id}-sample`;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#121214] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Visual Header / Image Preview */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0C]">
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30" />

                  {/* Stock & Origin Badge */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center space-x-1.5 sm:space-x-2">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0A0A0C]/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider border border-[#D4AF37]/20">
                      {product.weight}
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0A0A0C]/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-white/80 uppercase tracking-wider border border-white/10 truncate max-w-[120px] sm:max-w-none">
                      {product.origin.split("&")[0]}
                    </span>
                  </div>

                  {/* Quick Technical Dossier Trigger */}
                  <button
                    onClick={() => setActiveProductModal(product)}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-[#0A0A0C]/80 hover:bg-[#D4AF37] text-white hover:text-[#0A0A0C] transition-colors border border-white/10"
                    title="View Technical Specifications"
                    aria-label="View Technical Specifications"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-mono block">
                        {product.weaveType}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white font-normal leading-tight truncate">
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-base sm:text-lg font-serif text-white font-semibold">
                        ${product.pricePerMeter}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/60 block font-mono">
                        / METER
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#FAF7F2]/75 font-light leading-relaxed mb-4">
                      {product.tagline}
                    </p>

                    {/* Color Palette Selection */}
                    <div className="mb-4 sm:mb-5">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                        <span>SHADE:</span>
                        <span className="text-[#D4AF37] font-semibold truncate max-w-[150px] text-right">
                          {chosenColor}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-2.5">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() =>
                              setSelectedColors((prev) => ({
                                ...prev,
                                [product.id]: color.name,
                              }))
                            }
                            className={`w-6 h-6 rounded-full transition-all duration-300 relative ${
                              chosenColor === color.name
                                ? "ring-2 ring-[#D4AF37] scale-110"
                                : "opacity-70 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            aria-label={`Select ${color.name} shade`}
                          >
                            {chosenColor === color.name && (
                              <Check className="w-3 h-3 text-[#0A0A0C] absolute inset-0 m-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ideal Applications tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-5 sm:mb-6">
                      {product.idealFor.map((use) => (
                        <span
                          key={use}
                          className="px-2 py-0.5 rounded bg-white/5 text-[9px] sm:text-[10px] text-white/60 font-mono tracking-wider"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Purchase Actions */}
                  <div className="pt-3 sm:pt-4 border-t border-white/5 space-y-2.5 sm:space-y-3">
                    {/* Meter Adjustment Bar */}
                    <div className="flex items-center justify-between bg-[#161618] rounded-lg p-1.5 border border-white/10">
                      <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-white/50 font-mono ml-2">
                        LENGTH (METERS):
                      </span>
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        <button
                          onClick={() => handleMeterChange(product.id, -1)}
                          className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-sm font-mono transition-colors"
                          aria-label="Decrease meters"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono text-xs sm:text-sm font-semibold text-white">
                          {meters}m
                        </span>
                        <button
                          onClick={() => handleMeterChange(product.id, 1)}
                          className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-sm font-mono transition-colors"
                          aria-label="Increase meters"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Main CTA: Add Custom Yardage */}
                    <button
                      onClick={() => handleAddMeters(product)}
                      className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg bg-gold-gradient text-[#0A0A0C] font-mono text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold flex items-center justify-between hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
                    >
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{isAdded ? "Added to Bag" : "Add to Bag"}</span>
                      </div>
                      <span className="font-semibold">
                        ${product.pricePerMeter * meters}
                      </span>
                    </button>

                    {/* Secondary Action: Order Sample Swatch */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAddSample(product)}
                        className="flex-1 py-2 px-2.5 sm:px-3 rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#F3E8D2] hover:text-white bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 font-mono text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                        <span className="truncate">
                          {isSampleAdded ? "Swatch Added" : `Order Swatch ($${product.samplePrice})`}
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveProductModal(product)}
                        className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors flex-shrink-0"
                        title="View Full Specifications"
                        aria-label="View Full Specifications"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Assurance Guarantee Banner */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl bg-[#121214] border border-[#D4AF37]/25 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3 sm:space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base text-white">Silk Mark Certified</h4>
              <p className="text-[11px] sm:text-xs text-white/60 font-light">100% natural mulberry yarn purity verified.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 flex-shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base text-white">Precision Custom Cuts</h4>
              <p className="text-[11px] sm:text-xs text-white/60 font-light">Inspected inch by inch before archival rolling.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/10 flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base text-white">White-Glove Courier</h4>
              <p className="text-[11px] sm:text-xs text-white/60 font-light">Dispatched in moisture-sealed luxury cases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
