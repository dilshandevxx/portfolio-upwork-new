import { Button } from "@/components/ui/button";
import LiquidBackground from "@/components/ui/LiquidBackground";

export function CTA() {
  return (
    <section className="py-32 bg-background relative overflow-hidden text-center min-h-[60vh] flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-40">
        <LiquidBackground />
      </div>
      
      <div className="container relative z-10 px-6 mx-auto max-w-3xl pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-bold font-display mb-8 tracking-tight">
          Have an idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Let's build it.
          </span>
        </h2>
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-mono">
          I'm currently available for freelance projects. Let's discuss how we can work together to achieve your goals.
        </p>
        <div className="flex justify-center gap-4 pointer-events-auto">
            <Button size="lg" className="h-12 text-base px-8 cursor-interaction bg-white text-black hover:bg-gray-200">Start Your Project</Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 hover:bg-white/10">Email Me</Button>
        </div>
      </div>
    </section>
  );
}
