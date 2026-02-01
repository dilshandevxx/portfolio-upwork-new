"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data (In a real app, this would be a CMS or database)
const projects: Record<string, { title: string; category: string; description: string; src: string; year: string }> = {
  "ecommerce": {
    title: "E-Commerce Reform",
    category: "Web Design",
    year: "2025",
    description: "A complete overhaul of a major fashion retailer's online presence, focusing on user experience, conversion optimization, and a new high-end visual identity.",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  "finance": {
    title: "Finance Dashboard",
    category: "Product Design",
    year: "2024",
    description: "A comprehensive SaaS dashboard for financial analytics. The goal was to simplify complex data visualization while maintaining professional trust and clarity.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  "travel": {
    title: "Travel App",
    category: "Mobile",
    year: "2024",
    description: "An immersive mobile experience for booking luxury travel. Features include AI-driven itinerary planning and seamless booking integrations.",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
  },
  "ai": {
    title: "AI Startup",
    category: "Development",
    year: "2025",
    description: "Landing page and core application interface for a generative AI startup. The design emphasizes futurisic aesthetics and ease of use.",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
  }
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const { slug } = use(params);
  const [project, setProject] = useState<typeof projects["ecommerce"] | null>(null);

  useEffect(() => {
    if (slug && projects[slug]) {
        setProject(projects[slug]);
    }
  }, [slug]);

  if (!project) {
    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center">
            <p className="text-white/50">Loading Project...</p>
        </div>
    );
  }

  return (
    <main className="bg-background min-h-screen relative selection:bg-white/20">
      <Navbar />
      
      {/* Project Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
                <ArrowLeft size={20} />
                <span>Back to Works</span>
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-12">
                    <div>
                        <span className="block text-accent text-sm tracking-widest uppercase mb-4">{project.category} — {project.year}</span>
                        <h1 className="text-5xl md:text-8xl font-bold font-display">{project.title}</h1>
                    </div>
                    <div className="mt-8 md:mt-0 max-w-md">
                        <p className="text-white/70 leading-relaxed text-lg">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="w-full aspect-video md:aspect-[21/9] relative overflow-hidden rounded-2xl">
                    <Image 
                        src={project.src} 
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </motion.div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Challenge</h3>
                <p className="text-white/80 leading-relaxed">
                    Creating a seamless experience that balances aesthetics with functionality was the primary challenge. We needed to ensure high performance while delivering rich visuals.
                </p>
            </div>
             <div>
                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Solution</h3>
                <p className="text-white/80 leading-relaxed">
                    We utilized Next.js and Tailwind CSS to build a robust architecture. The interface uses glassmorphism and subtle animations to guide the user.
                </p>
            </div>
             <div>
                <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">Result</h3>
                <p className="text-white/80 leading-relaxed">
                    A 40% increase in user engagement and a significantly lower bounce rate. The client saw immediate ROI within the first month of launch.
                </p>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
