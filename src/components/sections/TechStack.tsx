"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Framer Motion", icon: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" }, // Custom fallback or just text
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

export function TechStack() {
  return (
    <section className="py-20 bg-background overflow-hidden border-t border-white/5">
      <div className="container px-6 mx-auto mb-10 text-center">
        <p className="text-sm font-medium text-white/40 tracking-widest uppercase">Powered By Modern Stack</p>
      </div>

      <div className="relative flex overflow-hidden mask-linear-fade">
        {/* Gradient Masks for fading edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-16 items-center flex-nowrap pr-16"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Adjust speed
          }}
          style={{ width: "fit-content" }}
        >
          {/* Double the list for seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="flex items-center gap-4 group opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
               {/* Use text-white for now to keep it minimal/premium if images fail or look clashing */}
               <span className="text-2xl font-display font-bold whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
