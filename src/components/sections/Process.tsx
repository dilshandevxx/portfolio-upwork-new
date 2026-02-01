"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your goals, audience, and brand essence."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Crafting a roadmap that aligns with your vision and market needs."
  },
  {
    number: "03",
    title: "Design",
    description: "Visualizing the concept with high-fidelity, pixel-perfect designs."
  },
  {
    number: "04",
    title: "Development",
    description: "Building a robust, scalable, and high-performance solution."
  }
];

export function Process() {
  return (
    <section id="process" className="py-32 bg-background relative border-t border-white/5">
      <div className="container px-6 mx-auto">
        <div className="mb-20">
             <h2 className="text-4xl md:text-6xl font-display font-bold">
                My <span className="font-serif italic text-white/50">Process</span>
            </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="block text-6xl font-serif italic text-white/10 mb-8 group-hover:text-white/30 transition-colors">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold mb-4 font-display">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
