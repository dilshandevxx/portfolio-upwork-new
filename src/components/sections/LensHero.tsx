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

  const maskImage = useMotionTemplate`radial-gradient(circle at ${lensX}px ${lensY}px, black 350px, transparent 350px)`; // Large lens
  
  // Content variants
  const Content = ({ isLens = false }: { isLens?: boolean }) => (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      
      {/* Top Meta */}
      <div className={`absolute top-12 left-0 w-full px-12 flex justify-between text-xs font-mono tracking-[0.2em] uppercase ${isLens ? "text-white" : "text-white/40"}`}>
        <span>Veronica PW</span>
        <div className="flex gap-12">
            <span>Playbook</span>
            <span>Socials</span>
            <span>Contacts</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="relative z-10 flex flex-col items-center leading-[0.9] select-none pointer-events-none">
        <h1 className="text-[14vw] font-sans font-medium tracking-tighter text-white">
          {/* Creative */}
          Creative
        </h1>
        <div className="flex items-center gap-[2vw]">
             {/* visual (Serif Italic) */}
             <span className={`text-[9vw] font-serif italic ${isLens ? "text-white" : "text-[#FFD700]"}`}>
                visual
             </span>
             {/* designer */}
             <span className="text-[14vw] font-sans font-medium tracking-tighter text-white">
                designer
             </span>
        </div>
      </div>

       {/* Floating Note to user */}
       <div className={`mt-20 text-xs font-mono tracking-widest ${isLens ? "text-white" : "text-white/30"}`}>
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
      {/* 1. Base Layer (Normal) */}
      <div className="absolute inset-0 z-0">
         <Content isLens={false} />
      </div>

      {/* 2. Lens Layer (Masked Reveal) */}
      <motion.div 
        className="absolute inset-0 z-10 bg-[#050505]" // Background matches specific color to hide overlay except in mask? 
        // Actually, we want the Lens to reveal a "Different" version of the content.
        // So the Lens DIV should contain the ALTERNATE content, and use maskImage to optionally show it.
        // Wait, maskImage makes the element VISIBLE where the mask is BLACK (or opaque).
        // So if we put the "Distorted" content here, it will only show in the circle.
        style={{ 
            maskImage,
            WebkitMaskImage: maskImage,
            background: "transparent" // Ensure container doesn't block
        }}
      >
         {/* The "Lens" Content - We add effects here */}
         <div className="relative w-full h-full flex flex-col items-center justify-center">
             {/* Background for the lens itself to obscure the bottom layer? 
                 If we want "magnification/distortion", the bottom layer is visible outside the lens.
                 Inside the lens, we see this top layer.
                 So this top layer should have a BACKGROUND color if we want to hide the bottom layer inside the lens.
                 Or just rely on opacity if they are identical positions.
             */}
              
             {/* We can add a "Glass" background to the lens area? No, mask applies to children. */}
             
             {/* Chromatic Aberration / Scaled Content */}
             {/* To simulate scale: we scale the wrapper slightly. But we need to translate it opposite to mouse to keep alignment? 
                 "Simplest effective lens": Just change style (Color/Blur). 
                 The reference shows "designer" becoming blurry/chromatic.
             */}
             <div className="scale-[1.1] relative origin-center filter blur-[1px] hue-rotate-90 mix-blend-lighten text-pink-500"> 
                {/* Note: Simply scaling the whole container from center works if the lens is near center. 
                    For a true lens anywhere, complex math is needed. 
                    Let's stick to style change for robustness.
                */}
                <Content isLens={true} /> 
             </div>
         </div>
      </motion.div>

      {/* 3. Lens Border / Glare (The visual circle itself) */}
      <motion.div
        style={{ x: lensX, y: lensY }}
        className="absolute top-0 left-0 w-[350px] h-[350px] -ml-[175px] -mt-[175px] rounded-full border border-white/20 pointer-events-none z-20 backdrop-blur-[2px] shadow-2xl shadow-white/5"
      >
          {/* Optional: Glass reflection gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50" />
      </motion.div>
      
    </section>
  );
}
