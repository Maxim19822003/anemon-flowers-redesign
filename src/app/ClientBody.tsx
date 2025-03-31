"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { FloatingCartWidget } from "@/components/FloatingCartWidget";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      <FloatingCartWidget />
    </ThemeProvider>
  );
}
