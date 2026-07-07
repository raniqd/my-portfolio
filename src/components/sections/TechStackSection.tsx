'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = {
  languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Flutter', 'Kotlin'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'],
  backend: ['Node.js', 'Supabase', 'Prisma', 'PostgreSQL'],
  tools: ['Vercel', 'Git', 'Figma', 'VS Code', 'Cursor'],
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend & DB',
  tools: 'Tools & DevOps',
};

function SpecRow({
  category,
  items,
  index,
}: {
  category: string;
  items: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 py-8 border-t border-[#1A1A1A] group"
    >
      <div className="md:col-span-1">
        <span className="text-[#8A8A8A] font-mono text-xs tracking-widest uppercase group-hover:text-[#FFFFFF] transition-colors">
          {CATEGORY_LABELS[category]}
        </span>
      </div>
      <div className="md:col-span-3 flex flex-wrap gap-x-8 gap-y-4">
        {items.map((tech) => (
          <span key={tech} className="text-[#FFFFFF] text-lg font-medium tracking-tight">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {

  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const filter = useTransform(scrollYProgress, [0, 1], ["blur(8px) grayscale(100%)", "blur(0px) grayscale(0%)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section id="stack" ref={sectionRef} className="relative py-20 md:py-48 bg-[#000000]">
      <motion.div style={{ filter, opacity }} className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-32">
          <h2 className="text-[10vw] md:text-[6vw] leading-[0.85] font-black tracking-tight-display text-[#FFFFFF] uppercase m-0">
            Tech<br />Specs
          </h2>
          <p className="text-[#8A8A8A] text-lg md:text-xl max-w-md tracking-tight">
            The core architecture and tools I use to engineer robust, high-performance web applications.
          </p>
        </div>

        {/* Specs List */}
        <div className="flex flex-col border-b border-[#1A1A1A]">
          {Object.entries(TECH_STACK).map(([key, items], index) => (
            <SpecRow key={key} category={key} items={items} index={index} />
          ))}
        </div>
        
      </motion.div>
    </section>
  );
}
