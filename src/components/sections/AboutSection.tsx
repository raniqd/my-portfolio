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

      </div>
    </section>
  );
}
