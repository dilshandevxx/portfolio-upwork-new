"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard"; // Import SpotlightCard

const features = [
  {
    icon: Layout,
    title: "Web Design",
    description: "Visually stunning designs that connect with your audience and reflect your brand identity. We focus on micro-interactions and fluidity.",
    className: "md:col-span-2",
  },
  {
    icon: Code,
    title: "Development",
    description: "Clean, efficient code using modern technologies like Next.js.",
    className: "md:col-span-1",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Seamless experiences across all devices, ensuring your site looks great everywhere.",
    className: "md:col-span-1",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and SEO to rank higher and keep users engaged. Fast load times are non-negotiable.",
    className: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-background relative z-10">
      <div className="container px-6 mx-auto">
        <div className="mb-20">
             <h2 className="text-4xl md:text-6xl font-display font-bold">
                Core <span className="font-serif italic text-white/50">Services</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <SpotlightCard key={index} className={`rounded-3xl p-8 ${feature.className}`}>
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="h-full flex flex-col justify-between"
               >
                  <div className="mb-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-white">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 font-display">{feature.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
               </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
