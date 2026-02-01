"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function LensHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [hovered, setHovered] = useState(false);

  // Smooth mouse movement for the lens
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Mask radius should match the visual circle radius (350px / 2 = 175px)
  const maskImage = useMotionTemplate`radial-gradient(circle at ${lensX}px ${lensY}px, black 175px, transparent 175px)`;

  // Content variants
  const Content = ({ isLens = false }: { isLens?: boolean }) => (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative z-20">
      
      {/* Top Meta */}
      <div className={`absolute top-24 md:top-32 left-0 w-full px-6 md:px-12 flex justify-between text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mix-blend-difference ${isLens ? "text-white" : "text-white/40"}`}>
        <span>Veronica PW</span>
        <div className="flex gap-4 md:gap-12">
            <span className="hidden md:inline">Playbook</span>
            <span className="hidden md:inline">Socials</span>
            <span>Contacts</span>
        </div>
      </div>

      {/* Main Title */}
      <div className={`relative z-10 flex flex-col items-center leading-[0.85] select-none pointer-events-none transition-all duration-300 ${isLens ? "" : ""}`}>
        <h1 className="text-[15vw] font-sans font-medium tracking-tighter text-white">
          Creative
        </h1>
        <div className="flex items-center gap-[1vw] translate-x-[4vw]"> {/* Offset slightly right for balance */}
             <span className={`text-[9vw] font-serif italic pr-4 ${isLens ? "text-white" : "text-[#FFD700]"}`}>
                visual
             </span>
             <span className="text-[15vw] font-sans font-medium tracking-tighter text-white">
                designer
             </span>
        </div>
      </div>

       {/* Floating Note */}
       <div className={`absolute bottom-12 text-[10px] md:text-xs font-mono tracking-widest ${isLens ? "text-white" : "text-white/30"}`}>
            SCROLL TO EXPLORE
       </div>
    </div>
  );

  return (
    <section 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center cursor-none"
    >
      {/* Background - Gradient & Noise */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-900/10" />
         <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
         {/* Glow spot */}
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. Base Layer (Normal) */}
      <div className="absolute inset-0 z-10">
         <Content isLens={false} />
      </div>

      {/* 2. Lens Layer (Masked Reveal) */}
      <motion.div 
        className="absolute inset-0 z-20"
        style={{ 
            maskImage,
            WebkitMaskImage: maskImage,
            background: "transparent"
        }}
      >
         {/* The "Lens" Content - Chromatic Aberration */}
         <div className="relative w-full h-full flex flex-col items-center justify-center">
             <div className="scale-[1.1] relative origin-center text-shadow-chromatic"> 
                {/* Custom Chromatic effect via style */}
                <div style={{ textShadow: "4px 0px 2px rgba(255,0,0,0.5), -4px 0px 2px rgba(0,0,255,0.5)" }} className="text-white mix-blend-overlay">
                    <Content isLens={true} /> 
                </div>
             </div>
         </div>
      </motion.div>

      {/* 3. Lens Border / Glare */}
      <motion.div
        style={{ x: lensX, y: lensY }}
        className="absolute top-0 left-0 w-[350px] h-[350px] -ml-[175px] -mt-[175px] rounded-full border border-white/10 pointer-events-none z-30 backdrop-blur-[1px]"
      >
          {/* Glass reflection gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-30" />
      </motion.div>
      
    </section>
  );
}
