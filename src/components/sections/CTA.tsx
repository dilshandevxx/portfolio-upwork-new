"use client";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-32 bg-background relative overflow-hidden text-center">
      <div className="absolute inset-0 z-0 bg-accent/5 rounded-full blur-[200px] scale-50 opacity-50" />
      
      <div className="container relative z-10 px-6 mx-auto max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-bold font-display mb-8 tracking-tight">
          Have an idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
            Let's build it.
          </span>
        </h2>
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          I'm currently available for freelance projects. Let's discuss how we can work together to achieve your goals.
        </p>
        <div className="flex justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-lg">Start a Project</Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg">Email Me</Button>
        </div>
      </div>
    </section>
  );
}
