"use client";

import React, { useState } from "react";
import { Sparkles, Send, CheckCircle2, PackageCheck, Award } from "lucide-react";
import confetti from "canvas-confetti";

export const CTA: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Bridal Gown",
    fabricChoice: "Noor-e-Zari Silk Organza",
    estimatedMeters: "5-10 meters",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Luxury celebratory gold confetti
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E8D2", "#FAF7F2", "#C5A038"],
      });
    } catch {
      // ignore
    }

    setFormSubmitted(true);
  };

  return (
    <section id="bespoke" className="py-16 sm:py-24 md:py-36 bg-[#0A0A0C] relative border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#161619] to-[#0E0E10] border border-[#D4AF37]/30 p-5 sm:p-10 md:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>BESPOKE WEAVE COMMISSIONS</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-white uppercase font-light leading-tight">
                Commission Your <span className="font-serif italic text-gold-gradient font-normal">Masterpiece</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#FAF7F2]/75 font-light leading-relaxed">
                Whether creating a show-stopping bridal gown, dressing a red carpet muse, or developing a custom Pantone silk tone for Paris fashion week, our master artisans calibrate every warp thread to your vision.
              </p>

              {/* Atelier Trust Bullet Points */}
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3 text-xs text-[#FAF7F2]/85 font-mono">
                  <PackageCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>Complimentary Gold Wax-Sealed Swatch Book</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#FAF7F2]/85 font-mono">
                  <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>Certified 100% Mulberry Silk &amp; Pure 24K Zari Assay</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#FAF7F2]/85 font-mono">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>Direct Consultation with Master Loom Curators</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Concierge Form Column */}
            <div className="lg:col-span-6">
              {formSubmitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#121214] border border-[#D4AF37]/50 text-center space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">
                    Inquiry Received with Distinction
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.name}. Our Head of Atelier has been notified. You will receive an exclusive dossier and courier tracking for your swatch consultation within 12 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase underline pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#121214] border border-white/10 space-y-3.5 sm:space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
                      ATELIER CONCIERGE DESK
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/40">
                      24-HR DISPATCH
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Lady Genevieve"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white placeholder-white/30 text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Private Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="atelier@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white placeholder-white/30 text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Project Silhouette
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="Bridal Gown">Haute Bridal Silhouette</option>
                        <option value="Red Carpet Gala">Red Carpet Gala Ensemble</option>
                        <option value="Couture Maison Run">Couture Runway Collection</option>
                        <option value="Private Swatch Box">Archival Swatch Dossier Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Desired Yardage
                      </label>
                      <select
                        value={formData.estimatedMeters}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estimatedMeters: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="1-3 meters">1 - 3 meters (Accents &amp; Bodice)</option>
                        <option value="4-8 meters">4 - 8 meters (Full Gown)</option>
                        <option value="9-20 meters">9 - 20 meters (Cathedral Train)</option>
                        <option value="Full Bolt (30m+)">Full Bolt (30+ meters)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                      Preferred Silk Foundation
                    </label>
                    <select
                      value={formData.fabricChoice}
                      onChange={(e) =>
                        setFormData({ ...formData, fabricChoice: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Noor-e-Zari Silk Organza">Noor-e-Zari Silk Organza (48 GSM)</option>
                      <option value="Al-Miraj Royal Brocade Velvet">Al-Miraj Royal Velvet Brocade (360 GSM)</option>
                      <option value="Chanderi Gilded Chiffon">Chanderi Gilded Chiffon (32 GSM)</option>
                      <option value="Zuleikha Hand-Worked Tulle">Zuleikha Hand-Worked Tulle (95 GSM)</option>
                      <option value="Shahmaran Pure Tissue Brocade">Shahmaran Pure Tissue Brocade (180 GSM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                      Specific Inquiries / Silhouette Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Specify required timeline, custom Pantone shades, or delivery city..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181C] border border-white/10 text-white placeholder-white/30 text-xs font-sans focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-[#0A0A0C] font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.35)]"
                  >
                    <span>Transmit Atelier Commission</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
