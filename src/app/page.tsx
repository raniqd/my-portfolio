'use client';

import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import TechStackSection from "@/components/sections/TechStackSection";
import WorkSection from "@/components/sections/WorkSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <TechStackSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs font-mono">
          <span>© {new Date().getFullYear()} Danylo Vasylenko <span className="text-white/15">(@raniqd)</span>. All rights reserved.</span>

          <span>Next.js · Three.js · Framer Motion</span>
        </div>
      </footer>
    </main>
  );
}
