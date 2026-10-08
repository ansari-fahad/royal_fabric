"use client";

import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer id="contact" className="bg-[#070709] border-t border-[#D4AF37]/20 text-[#FAF7F2] pt-14 sm:pt-20 pb-10 sm:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Atelier Gazette / Newsletter Strip */}
        <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37] font-mono block mb-2">
              THE HAUTE ATELIER GAZETTE
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
              Privileged Access to Limited Loom Reels
            </h3>
            <p className="text-xs text-[#FAF7F2]/60 font-light mt-1">
              Receive confidential invites to small-batch silk harvests, new gold zari formulations, and couture bridal showcases.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-mono">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>You have been enrolled in the private atelier ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your atelier email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded bg-[#121214] border border-white/10 focus:border-[#D4AF37] text-white text-xs font-sans outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded bg-[#D4AF37] text-[#0A0A0C] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  <span>Join Roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/5">
          {/* Brand Intro */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#161618] flex-shrink-0">
                <span className="text-[#D4AF37] text-xs font-serif font-bold">A</span>
              </div>
              <span className="font-display tracking-[0.25em] text-base font-semibold text-white uppercase">
                Ansari Fabric
              </span>
            </div>
            <p className="text-xs text-[#FAF7F2]/60 font-light leading-relaxed max-w-sm">
              Weaving timeless majesty from pure mulberry silk filaments and 24K electroplated gold bullion zari. Supplying leading Parisian couture houses, royal brides, and discerning creators worldwide.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-[#D4AF37] font-mono tracking-wider pt-1">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Certified Silk Mark Guild • 100% Genuine Zari</span>
            </div>
          </div>

          {/* Column 2: Repertoire */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
              Repertoire
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70 font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Pure Silk Organza</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">24K Brocade Velvet</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Gilded Chanderi Chiffon</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Hand-Embroidered Tulle</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Pure Tissue Brocade</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Heavy Ivory Silk Twill</a></li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/70 font-light">
              <li><a href="#story" className="hover:text-white transition-colors">The Drape Story</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Ancestral Looms</a></li>
              <li><a href="#bespoke" className="hover:text-white transition-colors">Bespoke Dyeing</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Swatch Presentation Box</a></li>
              <li><a href="#bespoke" className="hover:text-white transition-colors">Private Bridal Consultations</a></li>
            </ul>
          </div>

          {/* Column 4: Private Salons */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
              Private Salons
            </h4>
            <div className="text-xs text-[#FAF7F2]/60 font-light space-y-2.5">
              <div>
                <span className="text-white font-serif block">Paris Couture Studio</span>
                <span className="text-[11px]">Rue du Faubourg Saint-Honoré, 75008</span>
              </div>
              <div>
                <span className="text-white font-serif block">Dubai DIFC Salon</span>
                <span className="text-[11px]">Gate Village 04, DIFC, UAE</span>
              </div>
              <div>
                <span className="text-white font-serif block">Varanasi Looms</span>
                <span className="text-[11px]">Heritage Loom Guild, Chowk, Varanasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 font-mono tracking-widest uppercase gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            © 2026 ANSARI FABRIC ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:space-x-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Weave</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Care &amp; Storage</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
