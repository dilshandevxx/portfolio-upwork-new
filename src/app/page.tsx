import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-accent/30">
      <Navbar />
      <Hero />
      <Features />
      <Projects />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
