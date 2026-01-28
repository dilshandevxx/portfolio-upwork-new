"use client";

import { motion } from "framer-motion";

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
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-4xl font-bold font-display mb-12">Client Stories</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, index) => (
            <motion.div
               key={index}
               className="max-w-md p-8 rounded-2xl bg-white/5 border border-white/5"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
            >
              <p className="text-xl italic text-white/80 mb-6">"{t.quote}"</p>
              <div>
                <div className="font-bold">{t.author}</div>
                <div className="text-sm text-white/50">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
