import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Import Outfit and Inter
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Vogue | Premium Portfolio",
  description: "A premium portfolio showcasing high-end Upwork projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          inter.variable,
          outfit.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
