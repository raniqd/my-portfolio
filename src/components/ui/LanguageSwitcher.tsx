'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n, Locale } from '@/i18n';

const LOCALES: Locale[] = ['en', 'ru', 'cz'];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [hovered, setHovered] = useState<Locale | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, loc: Locale) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setMagnetPos({ x: dx, y: dy });
    setHovered(loc);
  };

  const handleMouseLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
    setHovered(null);
  };

  return (
    <div ref={containerRef} className="flex items-center gap-1">
      {LOCALES.map((loc) => (
        <motion.button
          key={loc}
          onMouseMove={(e) => handleMouseMove(e, loc)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setLocale(loc)}
          animate={
            hovered === loc
              ? { x: magnetPos.x, y: magnetPos.y }
              : { x: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-colors duration-300 ${
            locale === loc
              ? 'text-white'
              : 'text-white/40 hover:text-white/80'
          }`}
        >
          {locale === loc && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{loc.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );
}
