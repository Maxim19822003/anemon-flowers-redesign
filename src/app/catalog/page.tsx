"use client";

import { Navbar } from "@/components/Navbar";
import { CatalogWithFilters } from "@/components/CatalogWithFilters";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

export default function CatalogPage() {
  // Add console log to track page loading
  useEffect(() => {
    console.log("Catalog page loaded");
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="py-10"></div> {/* Отступ для компенсации высоты навигационной панели */}
        <CatalogWithFilters />
      </main>
      <Footer />
    </>
  );
}
