"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FabricProduct, fabricCatalog } from "@/data/content";

export interface CartItem {
  id: string;
  fabricId: string;
  name: string;
  type: "meters" | "sample";
  meters?: number;
  selectedColor: string;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    fabric: FabricProduct,
    type: "meters" | "sample",
    meters: number,
    selectedColor: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateItemMeters: (itemId: string, newMeters: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  activeProductModal: FabricProduct | null;
  setActiveProductModal: (product: FabricProduct | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] =
    useState<FabricProduct | null>(null);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ansari_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ansari_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (
    fabric: FabricProduct,
    type: "meters" | "sample",
    meters: number,
    selectedColor: string
  ) => {
    const unitPrice =
      type === "meters" ? fabric.pricePerMeter : fabric.samplePrice;
    const finalMeters = type === "meters" ? Math.max(1, meters) : 1;
    const totalPrice = unitPrice * (type === "meters" ? finalMeters : 1);

    const newItem: CartItem = {
      id: `${fabric.id}-${type}-${selectedColor}-${Date.now()}`,
      fabricId: fabric.id,
      name: fabric.name,
      type,
      meters: type === "meters" ? finalMeters : undefined,
      selectedColor,
      unitPrice,
      totalPrice,
      image: fabric.featuredImage,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateItemMeters = (itemId: string, newMeters: number) => {
    const validMeters = Math.max(1, Math.min(50, newMeters));
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.type === "meters") {
          return {
            ...item,
            meters: validMeters,
            totalPrice: validMeters * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (acc, item) => acc + (item.type === "meters" ? (item.meters || 1) : 1),
    0
  );

  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateItemMeters,
        clearCart,
        cartCount,
        cartSubtotal,
        activeProductModal,
        setActiveProductModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
