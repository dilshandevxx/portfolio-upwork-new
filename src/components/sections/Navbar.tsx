"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
                >
                    <div className="flex flex-col gap-8 text-center">
                        {["Work", "Info", "Contact"].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link 
                                    href={`#${item.toLowerCase()}`}
                                    className="text-5xl font-display font-medium text-white hover:text-white/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </nav>
    </motion.header>
  );
}
