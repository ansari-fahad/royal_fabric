import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { ProductSection } from "@/components/ProductSection";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FabricDetailModal } from "@/components/FabricDetailModal";

export function App() {
  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#FAF7F2] selection:bg-[#D4AF37] selection:text-[#0A0A0C]">
      {/* Navigation Atelier */}
      <Navbar />

      {/* Hero & Cinematic Canvas Scroll Sequence (240 Frames) */}
      <Hero />

      {/* Lookbook Gallery & Motion Studies (Living Drape - Direct Smooth Continuation) */}
      <Gallery />

      {/* Haute Couture Fabric Collection (E-Commerce By The Meter) */}
      <ProductSection />

      {/* Craftsmanship Pillars, Reviews & FAQ */}
      <CraftsmanshipSection />

      {/* Bespoke Commission & Swatch Presentation Vault */}
      <CTA />

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Technical Dossier Modal */}
      <FabricDetailModal />
    </main>
  );
}

export default App;
