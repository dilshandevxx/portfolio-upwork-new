"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Web Design",
    description: "Visually stunning designs that connect with your audience and reflect your brand identity.",
  },
  {
    icon: Code,
    title: "Development",
    description: "Clean, efficient code using modern technologies like Next.js and Tailwind CSS.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Seamless experiences across all devices, ensuring your site looks great everywhere.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and SEO to rank higher and keep users engaged.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative z-10">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
