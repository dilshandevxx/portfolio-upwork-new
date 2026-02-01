"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading percentage
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Slight delay at 100%
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
            key="preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center pointer-events-none"
        >
            <div className="relative flex flex-col items-center">
                {/* Large Counter */}
                <span className="text-9xl md:text-[12rem] font-bold font-display tracking-tighter text-white">
                    {count}%
                </span>
                
                {/* Loading Status Text */}
                <div className="absolute -bottom-12 items-center gap-2 flex">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Initializing Assets
                    </span>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
