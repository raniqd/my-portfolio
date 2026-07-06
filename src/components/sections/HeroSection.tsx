'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { useNav } from '@/providers/NavProvider';

export default function HeroSection() {

  const { navigateTo } = useNav();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[700px] flex flex-col justify-between px-6 md:px-10 overflow-hidden bg-[#000000]"
    >
      {/* Large integrated portrait in B&W */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-full h-full max-w-4xl opacity-[0.25] mix-blend-screen grayscale">
          <Image
            src="/portrait.jpg"
            alt="Danylo Vasylenko"
            fill
            className="object-cover object-[50%_15%]"
            style={{
              filter: 'contrast(1.5) brightness(0.8)',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 60%)',
            }}
            priority
          />
        </div>
      </motion.div>

      {/* Top spacing */}
      <div className="pt-32"></div>

      {/* Main typographic block */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 text-[#8A8A8A] font-mono text-xs tracking-widest uppercase mb-10 md:mb-16"
        >
          <span>Hello, I'm</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] md:text-[9.5vw] leading-[0.85] font-black tracking-tight-display text-[#FFFFFF] uppercase m-0"
        >
          Danylo<br />Vasylenko
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-24"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-[#8A8A8A] max-w-2xl leading-snug">
            Full-Stack Developer based in <span className="text-[#FFFFFF]">Czech Republic</span>. <br />
            Building modern web apps from UI to database.
          </h2>

          <div className="flex flex-col gap-6 items-start md:items-end">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse" />
              <span className="text-[#FFFFFF] font-mono text-xs tracking-widest uppercase">Open to work</span>
            </div>

            <button
              onClick={(e) => navigateTo('work', e.clientX, e.clientY)}
              className="group text-[#FFFFFF] font-mono text-sm tracking-widest uppercase hover:text-[#8A8A8A] transition-colors flex items-center gap-2"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
