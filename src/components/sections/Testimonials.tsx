"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The attention to detail and creative solutions provided were outstanding. Truly a premium experience.",
    author: "Client A",
    role: "CEO, Tech StartUp"
  },
  {
    quote: "Transformed our online presence completely. The new site is faster, cleaner, and converts better.",
    author: "Client B",
    role: "Marketing Director"
  },
  {
    quote: "Professional, timely, and innovative. The design exceeded all our expectations.",
    author: "Client C",
    role: "Founder"
  },
  {
      quote: "A masterclass in modern web design. Our traffic increased by 40% after the redesign.",
      author: "Client D",
      role: "Product Manager"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-white/5">
      <div className="container px-6 mx-auto mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
            Client <span className="font-serif italic text-white/50">Stories</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden mask-linear-fade">
         <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
           className="flex gap-8 items-stretch flex-nowrap pr-8"
           animate={{ x: "-50%" }}
           transition={{
             repeat: Infinity,
             ease: "linear",
             duration: 40,
           }}
           style={{ width: "fit-content" }}
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
               key={index}
               className="w-[400px] flex-shrink-0 p-10 rounded-3xl bg-white/5 border border-white/5 relative flex flex-col justify-between group hover:bg-white/10 transition-colors"
            >
               <Quote className="text-white/20 mb-6 w-8 h-8" />
              <p className="text-xl font-display text-white/90 mb-8 leading-relaxed">
                  "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10" /> {/* Avatar Placeholder */}
                <div>
                    <div className="font-bold text-white">{t.author}</div>
                    <div className="text-sm text-white/40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
