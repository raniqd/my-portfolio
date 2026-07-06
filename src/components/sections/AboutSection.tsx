'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function Word({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="relative mx-[0.1em] inline-block">
      {children}
    </motion.span>
  );
}

export default function AboutSection() {
  const text = "I build everything, start to finish - from the interface someone taps, to the database that makes sure it actually works. I'll always put in the work for something simple that actually holds up, over something flashy that breaks in a week. Give me any task and I can handle it.";

  const words = text.split(" ");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"]
  });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-64 bg-[#000000] flex items-center justify-center min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">

        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 text-[#8A8A8A] font-mono text-xs tracking-widest uppercase">
            <div className="w-8 h-[1px] bg-[#1A1A1A]" />
            <span>Philosophy</span>
            <div className="w-8 h-[1px] bg-[#1A1A1A]" />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#FFFFFF] leading-[1.3] flex flex-wrap justify-center">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 flex justify-center"
        >
          <a
            href="/ccna-certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col md:flex-row items-center gap-6 px-8 py-6 rounded-2xl bg-[#050505] border border-[#1A1A1A] hover:border-[#333333] hover:bg-[#0A0A0A] transition-all overflow-hidden"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFFFF]/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-full border border-[#1A1A1A] bg-[#000000] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFFFFF]">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>

            {/* Text details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm tracking-wider text-[#FFFFFF] uppercase">Cisco CCNA</span>
                <span className="px-2 py-0.5 rounded-full border border-[#1A1A1A] text-[10px] text-[#8A8A8A] font-mono uppercase tracking-widest">Verified</span>
              </div>
              <span className="text-[#8A8A8A] text-sm tracking-tight">Introduction to Networks</span>
            </div>

            {/* Arrow link icon */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#1A1A1A] bg-[#000000] md:ml-4 group-hover:bg-[#FFFFFF] group-hover:text-[#000000] text-[#FFFFFF] transition-colors z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <line x1="5" y1="19" x2="19" y2="5" />
                <polyline points="10 5 19 5 19 14" />
              </svg>
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
