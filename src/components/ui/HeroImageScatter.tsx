"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1542475179-813c93992015?q=80&w=600&auto=format&fit=crop", // Abstract
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", // Liquid
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop", // Portrait 1
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop", // Portrait 2
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop", // Portrait 3
];

export default function HeroImageScatter() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const centerIndex = (images.length - 1) / 2;

  // Reorder images so portraits are in front
  const orderedImages = [...images]; 

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {orderedImages.map((src, i) => {
         const offset = i - centerIndex;
         // Fan out values
         const initialX = offset * 40; 
         const initialRotate = offset * 5;

         // Dynamic values
         const x = useTransform(springX, [-1, 1], [initialX - 150, initialX + 150]);
         const y = useTransform(springY, [-1, 1], [-60, 60]); // Less vertical movement
         const rotate = useTransform(springX, [-1, 1], [initialRotate - 25, initialRotate + 25]);

        return (
          <motion.div
            key={i}
            style={{ x, y, rotate }}
            className="absolute w-32 h-44 md:w-48 md:h-64 rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-neutral-900 origin-bottom -mt-32" 
            // Added -mt-32 to shift stack upwards
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.8 }}
          >
            <Image 
                src={src} 
                alt="Scatter" 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 150px, 250px"
            />
             {/* Overlay to dim slightly */}
             <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        );
      })}
    </div>
  );
}
