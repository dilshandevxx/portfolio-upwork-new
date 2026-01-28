"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by understanding your goals, audience, and brand to create a strategy that works."
  },
  {
    number: "02",
    title: "Design",
    description: "I craft pixel-perfect visuals that align with your brand, focusing on aesthetics and usability."
  },
  {
    number: "03",
    title: "Development",
    description: "Turning designs into a functional, high-performance website using the latest tech."
  },
  {
    number: "04",
    title: "Launch",
    description: "Testing, optimizing, and deploying your site to the world, ensuring a smooth takeoff."
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-background relative border-t border-white/5">
      <div className="container px-6 mx-auto">
        <h2 className="text-4xl font-bold font-display mb-16 text-center">My Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 pt-12 border-l border-white/10 hover:border-accent/50 transition-colors"
            >
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-xs font-mono text-white/50">
                {step.number}
              </span>
              <h3 className="text-xl font-bold mb-4 font-display">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
