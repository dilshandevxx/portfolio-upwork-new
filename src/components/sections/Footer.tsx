import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-white/5">
      <div className="container px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold font-display">SPARKS.</div>
        
        <div className="flex gap-6">
          <Link href="#" className="text-white/50 hover:text-white transition-colors"><Github size={20} /></Link>
          <Link href="#" className="text-white/50 hover:text-white transition-colors"><Linkedin size={20} /></Link>
          <Link href="#" className="text-white/50 hover:text-white transition-colors"><Twitter size={20} /></Link>
        </div>

        <div className="text-sm text-white/30">
          © {new Date().getFullYear()} Simon Sparks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
