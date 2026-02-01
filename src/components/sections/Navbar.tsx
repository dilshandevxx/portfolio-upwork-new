"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false); 
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 px-6 py-4 md:py-6"
    >
      <nav className="relative flex items-center justify-between max-w-[1440px] mx-auto bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/5 shadow-2xl shadow-black/50">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-display font-bold tracking-tight z-50">
          SPARKS.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
            {["Work", "Info", "Contact"].map((item) => (
                <Link 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                    {item}
                </Link>
            ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
            <Button variant="outline" className="rounded-full px-6 text-xs font-mono uppercase tracking-wider h-9 border-white/20 hover:bg-white hover:text-black transition-all">
                Let's Talk
            </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 md:hidden shadow-2xl"
            >
                {["Work", "Info", "Contact"].map((item) => (
                    <Link 
                        key={item} 
                        href={`#${item.toLowerCase()}`}
                        className="text-lg font-display font-medium text-white/80 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {item}
                    </Link>
                ))}
            </motion.div>
        )}

      </nav>
    </motion.header>
  );
}
