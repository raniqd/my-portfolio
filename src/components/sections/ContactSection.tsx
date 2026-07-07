'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="contact" ref={sectionRef} className="relative pt-32 pb-16 bg-[#000000] border-t border-[#1A1A1A]">
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">

        <div className="flex items-center gap-4 text-[#8A8A8A] font-mono text-xs tracking-widest uppercase mb-16">
          <span>Connect</span>
        </div>

        <a
          href="mailto:danilavasilenko15@gmail.com"
          className="group block w-full text-center py-16 md:py-32 border border-[#1A1A1A]"
        >
          <span className="text-[4.5vw] sm:text-[4vw] md:text-[3vw] font-black tracking-tight text-[#CCCCCC] group-hover:text-[#FFFFFF] transition-colors duration-500 break-all">
            danilavasilenko15@gmail.com
          </span>
        </a>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-16 text-[#8A8A8A] font-mono text-xs tracking-widest uppercase gap-8">
          <div className="flex gap-8">
            <a href="https://t.me/raniqd" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFFFFF] transition-colors">Telegram</a>
            <a href="https://wa.me/danjao" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFFFFF] transition-colors">WhatsApp</a>
          </div>
          <div>
            © {new Date().getFullYear()} DANYLO VASYLENKO
          </div>
        </div>

      </motion.div>
    </section>
  );
}
