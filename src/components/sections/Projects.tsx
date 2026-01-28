"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Reform",
    category: "Web Design / Development",
    image: "/project1.jpg", // Placeholder
    year: "2025"
  },
  {
    title: "Finance Dashboard",
    category: "Product Design",
    image: "/project2.jpg", // Placeholder
    year: "2024"
  },
  {
    title: "Travel App",
    category: "Mobile App",
    image: "/project3.jpg", // Placeholder
    year: "2024"
  },
  {
    title: "AI Startup",
    category: "Landing Page",
    image: "/project4.jpg", // Placeholder
    year: "2025"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-background relative">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-2 block">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Featured Projects</h2>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            View All Work <ArrowUpRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-secondary/10 border border-white/5">
                {/* Placeholder for Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                    {project.title[0]}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold font-display mb-1 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-white/60">{project.category}</p>
                </div>
                <span className="text-white/40 text-sm">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex md:hidden justify-center">
             <Button variant="outline" className="gap-2">
                View All Work <ArrowUpRight size={16} />
            </Button>
        </div>
      </div>
    </section>
  );
}
