"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const LiquidBackground = dynamic(() => import("@/components/ui/LiquidBackground"), { ssr: false });

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <LiquidBackground />

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
            <motion.div variants={itemVariants} className="inline-block">
                <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wider text-accent uppercase">
                    Available for freelance
                </span>
            </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter leading-[1.1]"
          >
            Crafting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              Experiences.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Helping brands stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 text-base w-full sm:w-auto">
              Check my Work
            </Button>
            <Button size="lg" variant="outline" className="h-12 text-base w-full sm:w-auto">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  );
}
