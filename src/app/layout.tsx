import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Space_Mono } from "next/font/google"; // Import Outfit, Inter, Playfair, and Space Mono
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: "italic" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Vogue | Premium Portfolio",
  description: "A premium portfolio showcasing high-end Upwork projects.",
};

import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased cursor-none", // Hide default cursor
          inter.variable,
          outfit.variable,
          playfair.variable,
          spaceMono.variable
        )}
      >
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
