"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./Cart";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingCartWidget() {
  const { totalItems, totalPrice, openCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Format price in Russian rubles
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
  };

  // Set mounted state after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show widget only when there are items in cart AND user has scrolled down
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 300);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Control visibility based on items and scroll position
  useEffect(() => {
    if (isMounted) {
      setIsVisible(totalItems > 0 && hasScrolled);
    }
  }, [totalItems, hasScrolled, isMounted]);

  // Don't render anything during SSR or before mounting to prevent hydration mismatch
  if (!isMounted) return null;

  // If cart is empty, don't render anything
  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={openCart}
            className="flex items-center space-x-2 bg-[#50714d] hover:bg-[#3f5a3c] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-[#3a543a] dark:hover:bg-[#304830]"
          >
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e1da68] text-xs text-[#50714d] font-semibold dark:bg-[#d5ce5e] dark:text-[#3a543a]">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs whitespace-nowrap">Корзина</span>
              <span className="text-sm font-bold whitespace-nowrap">{formatPrice(totalPrice)}</span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
