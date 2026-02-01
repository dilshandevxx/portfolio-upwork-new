"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const projects = [
  {
    title: "E-Commerce Reform",
    category: "Web Design",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    year: "2025",
    href: "/work/ecommerce"
  },
  {
    title: "Finance Dashboard",
    category: "Product Design",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
    href: "/work/finance"
  },
  {
    title: "Travel App",
    category: "Mobile",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop",
    year: "2024",
    href: "/work/travel"
  },
  {
    title: "AI Startup",
    category: "Development",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    year: "2025",
    href: "/work/ai"
  }
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the floating image
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotate based on X velocity could be cool too, but keeping it simple for now
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // We want the image to be relative to the viewport or container? 
    // Fixed viewport is easiest for "floating anywhere".
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section 
        id="projects" 
        className="py-32 bg-background relative z-10"
        onMouseMove={handleMouseMove}
        ref={ref}
    >
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-20 gap-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold">
                Selected <span className="font-serif italic text-white/50">Works</span>
            </h2>
            <div className="w-full h-[1px] bg-white/10 mt-8" />
        </div>

        {/* Project List */}
        <div className="flex flex-col">
            {projects.map((project, index) => (
                <Link 
                    key={index} 
                    href={project.href}
                    className="group border-b border-white/5 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-none"
                    onMouseEnter={() => setActiveProject(index)}
                    onMouseLeave={() => setActiveProject(null)}
                >
                    <div className="w-full md:w-auto">
                        <div className="flex flex-col md:block transition-transform duration-500 group-hover:translate-x-4">
                            <h3 className="text-3xl md:text-5xl font-bold font-display group-hover:text-white/50 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm md:text-base text-white/40 mt-2 font-mono">
                                {project.category}
                            </p>
                        </div>
                        
                        {/* Mobile Image Preview */}
                        <div className="md:hidden w-full h-48 mt-6 relative overflow-hidden rounded-lg">
                             <Image
                                src={project.src}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                             />
                        </div>
                    </div>

                    <div className="flex items-center gap-8 mt-6 md:mt-0 transition-transform duration-500 group-hover:-translate-x-4 w-full md:w-auto justify-between md:justify-start">
                        <span className="text-white/20 font-mono hidden md:block">{project.year}</span>
                        
                        {/* Mobile Year */}
                        <span className="text-white/20 font-mono md:hidden block">{project.year}</span>

                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>

      {/* Floating Image Portal */}
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 hidden md:block overflow-hidden rounded-lg mix-blend-normal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: activeProject !== null ? 1 : 0,
            scale: activeProject !== null ? 1 : 0.8,
            x: "-50%",
            y: "-50%"
        }}
        transition={{ duration: 0.2 }}
      >
        {projects.map((project, index) => (
            <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeProject === index ? "opacity-100" : "opacity-0"}`}
            >
                <img /* Using img for instant WebGL texture feel/avoiding next/image loading lag on rapid hover */
                    src={project.src} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>
        ))}
      </motion.div>

    </section>
  );
}
