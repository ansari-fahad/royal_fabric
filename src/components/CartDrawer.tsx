"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateItemMeters,
    clearCart,
    cartSubtotal,
    cartCount,
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#D4AF37", "#FFFFFF", "#E6CA65", "#C5A038"],
      });
    } catch {
      // ignore
    }

    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0D0D10] border-l border-[#D4AF37]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg sm:text-xl text-white">
                  Haute Atelier Bag ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Courier Progress Bar */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#141418] border-b border-white/5">
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mb-1.5">
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    <span>Complimentary Express Courier Unlocked</span>
                  </span>
                ) : (
                  <span className="text-white/70 truncate max-w-[280px]">
                    Add ${freeShippingThreshold - cartSubtotal} more for Free Courier
                  </span>
                )}
                <span className="text-white/40 ml-2">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFF3D6] transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {checkoutSuccess ? (
                <div className="py-12 sm:py-16 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-white">
                    Order Reserved with Honour
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 max-w-xs mx-auto leading-relaxed">
                    Your bespoke yardage cut reservation has been recorded. Our master loom technician is preparing your certified package.
                  </p>
                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="mt-4 px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs font-mono tracking-widest uppercase hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    Return to Atelier
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 sm:py-20 text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mx-auto" />
                  <h4 className="font-serif text-lg sm:text-xl text-white/80">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Discover our collection of hand-loomed mulberry silk and 24K gold zari brocades.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0A0A0C] font-mono text-xs tracking-widest uppercase font-bold hover:brightness-110 active:scale-95"
                  >
                    Explore Weaves
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-4 rounded-xl bg-[#141418] border border-white/5 flex space-x-3 sm:space-x-4 items-start"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded-lg bg-[#0A0A0C] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm sm:text-base text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-400 p-1 transition-colors flex-shrink-0"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase mt-0.5 truncate">
                        {item.type === "sample"
                          ? "Archival Swatch Sample"
                          : `Custom Cut (${item.meters}m)`}{" "}
                        • {item.selectedColor}
                      </div>

                      <div className="mt-2.5 sm:mt-3 flex items-center justify-between">
                        {item.type === "meters" ? (
                          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                            <button
                              onClick={() =>
                                updateItemMeters(
                                  item.id,
                                  (item.meters || 1) - 1
                                )
                              }
                              className="text-white/60 hover:text-white font-mono text-xs px-1"
                              aria-label="Decrease meters"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono text-white">
                              {item.meters}m
                            </span>
                            <button
                              onClick={() =>
                                updateItemMeters(
                                  item.id,
                                  (item.meters || 1) + 1
                                )
                              }
                              className="text-white/60 hover:text-white font-mono text-xs px-1"
                              aria-label="Increase meters"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-[9px] sm:text-[10px] text-white/50 font-mono">
                            8x10 INCH SWATCH
                          </span>
                        )}

                        <span className="font-serif text-xs sm:text-sm text-white font-semibold">
                          ${item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {!checkoutSuccess && cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-white/10 bg-[#121216] space-y-3 sm:space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal:</span>
                    <span className="text-white font-serif text-sm">
                      ${cartSubtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Archival Packing:</span>
                    <span className="text-[#D4AF37]">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Courier Delivery:</span>
                    <span className="text-white">
                      {cartSubtotal >= freeShippingThreshold
                        ? "FREE (Express)"
                        : "$25.00"}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm text-white font-bold">
                    <span>Estimated Total:</span>
                    <span className="text-base sm:text-lg font-serif text-[#D4AF37]">
                      $
                      {cartSubtotal +
                        (cartSubtotal >= freeShippingThreshold ? 0 : 25)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-gold-gradient text-[#0A0A0C] font-mono text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold flex items-center justify-center space-x-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.35)]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[9px] sm:text-[10px] text-center text-white/40 font-mono tracking-wider">
                  Insured DHL Express • Silk Mark Certificate Included
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
