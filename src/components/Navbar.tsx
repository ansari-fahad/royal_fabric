"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "The Drape Story", href: "#story" },
    { label: "Haute Weaves", href: "#collection" },
    { label: "24K Gold Craft", href: "#craftsmanship" },
    { label: "Bespoke Cut", href: "#bespoke" },
    { label: "Client Inquiries", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3.5 sm:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-[#0A0A0C]/95 via-[#0A0A0C]/50 to-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity / Monogram */}
          <a
            href="#"
            className="group flex items-center space-x-2.5 sm:space-x-3 text-left focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 bg-[#161618] flex-shrink-0">
              <span className="text-[#D4AF37] text-xs font-serif font-bold">A</span>
            </div>
            <div>
              <span className="block font-display tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm md:text-base font-semibold text-white uppercase group-hover:text-[#D4AF37] transition-colors leading-tight">
                Ansari Fabric
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#D4AF37]/80 font-mono">
                HAUTE COUTURE SILK
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-[11px] tracking-[0.2em] uppercase text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors py-1 group font-mono"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs: Swatch Request & Shopping Bag */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
            <a
              href="#collection"
              onClick={(e) => scrollToSection(e, "#collection")}
              className="hidden sm:inline-flex items-center space-x-2 text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#D4AF37] hover:text-white transition-colors border border-[#D4AF37]/40 hover:border-[#D4AF37] px-3.5 sm:px-4 py-2 rounded-full font-mono bg-[#D4AF37]/5"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Sample Swatches</span>
            </a>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Bag"
              className="relative p-2 sm:p-2.5 rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#FAF7F2] hover:text-[#D4AF37] bg-[#161618]/70 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D4AF37] text-[#0A0A0C] text-[9px] sm:text-[10px] font-bold flex items-center justify-center font-mono animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-full border border-[#D4AF37]/30 text-[#FAF7F2] hover:text-[#D4AF37] transition-colors bg-[#161618]/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0C]/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-8 pt-24 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 sm:space-y-6 pt-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono">
                NAVIGATION ATELIER
              </span>
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xl sm:text-2xl font-serif text-[#FAF7F2] hover:text-[#D4AF37] transition-colors flex items-center justify-between border-b border-white/5 py-2.5 sm:py-3"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#D4AF37]/60 font-mono">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-col space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 bg-[#D4AF37] text-[#0A0A0C] font-mono text-xs tracking-[0.2em] uppercase font-bold rounded flex items-center justify-center space-x-2 active:scale-[0.99] transition-transform"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Cart ({cartCount})</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] sm:text-[11px] text-white/50 tracking-wider">
                  Express Global Delivery • 100% Certified Mulberry Silk
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
