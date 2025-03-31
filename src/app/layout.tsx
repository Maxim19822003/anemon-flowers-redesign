import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { CartProvider } from "@/components/Cart";
import Script from "next/script";

// Configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anemon - Flower Salon",
  description: "A boutique flower shop with individual approach to every arrangement.",
  icons: {
    icon: [{ url: '/images/logo.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Add script to disable hydration warnings */}
        <Script id="suppress-hydration-warning" strategy="beforeInteractive">
          {`
            window.__NEXT_HYDRATION_DEV_SUPPORT = {
              onHydrationWarning: () => {} // Empty function to suppress warnings
            };
          `}
        </Script>
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-b from-[#3a543a] to-[#50714d] dark:from-gray-900 dark:to-gray-800">
          <CartProvider>
            <ClientBody>{children}</ClientBody>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
