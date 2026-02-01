"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const projects = [
  { id: "01", src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop" },
  { id: "02", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
  { id: "03", src: "https://images.unsplash.com/photo-1558655146-509959095333?q=80&w=600&auto=format&fit=crop" },
  { id: "04", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" },
];

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen overflow-hidden bg-[#050505] text-white pt-6 md:pt-10 px-6 md:px-12 flex flex-col justify-between pb-8 relative border-x border-white/5">
      
      {/* Vertical Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12">
          {/* Create 3 vertical lines to simulate the 4-column structure of the reference grid */}
          <div className="h-full w-px bg-white/5" />
          <div className="h-full w-px bg-white/5" />
          <div className="h-full w-px bg-white/5" />
      </div>

      {/* Top Grid: Title & Nav */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-8 mb-6 flex-grow relative z-10">
          
          {/* Left Column: Title */}
          <div className="md:col-span-8 flex flex-col justify-start">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 md:mb-8"
              >
                DILSHAD WORK
              </motion.span>
              
              <h1 className="text-[11vw] leading-[0.8] font-bold font-sans tracking-tighter uppercase whitespace-pre-wrap -ml-1 md:-ml-2">
                 <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className="overflow-hidden">
                    DEVELOPER
                 </motion.div>
              </h1>
          </div>

          {/* Right Column: Nav & Info */}
          <div className="md:col-span-4 flex flex-col justify-between h-full min-h-[200px] md:min-h-[300px] md:pl-8 border-l border-white/5">
              {/* Navigation */}
              <div className="flex justify-between items-start text-xs md:text-sm font-mono uppercase tracking-wider w-full">
                  <span className="text-cyan-400 cursor-pointer">[ WORK ]</span>
                  <span className="hover:text-cyan-400 cursor-pointer transition-colors text-neutral-400 hover:text-white">INFO</span>
                  <span className="hover:text-cyan-400 cursor-pointer transition-colors text-neutral-400 hover:text-white">ARCHIVE</span>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-8 text-xs font-mono uppercase text-neutral-500 mt-auto pt-8 md:pt-0">
                   <div className="flex flex-col justify-end">
                      <p className="text-white mb-2 tracking-widest">DESIGNER &</p>
                      <p className="text-white tracking-widest">DEVELOPER</p>
                   </div>
                   <div className="flex flex-col justify-end">
                      <p className="text-white mb-2 tracking-widest">KERALA, IN</p>
                      <p className="text-cyan-500/80 tracking-widest">{time}</p>
                   </div>
              </div>
          </div>
      </div>

      {/* Bottom Project Strip */}
      <div className="w-full border-t border-white/5 pt-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {projects.map((p, i) => (
                  <motion.div 
                    key={i} 
                    className="group cursor-pointer relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                  >
                     <div className="aspect-[3/4] relative bg-neutral-900 mb-2 overflow-hidden rounded-sm">
                        <Image 
                            src={p.src} 
                            fill 
                            alt={`Project ${p.id}`}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                        />
                     </div>
                     <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-cyan-500/50 transition-colors">
                        <span className="font-mono text-xs text-neutral-600 group-hover:text-cyan-400 transition-colors">[{p.id}]</span>
                     </div>
                  </motion.div>
              ))}
          </div>
      </div>

    </section>
  );
}
