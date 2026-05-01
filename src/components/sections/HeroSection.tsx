'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useI18n } from '@/i18n';
import { useNav } from '@/providers/NavProvider';

const ArchitectureGraph = dynamic(() => import('@/components/three/ArchitectureGraph'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
    </div>
  ),
});

// Title chars are resolved inside the component via t()

function GlitchChar({ char, index }: { char: string; index: number }) {
  const [glitching, setGlitching] = useState(false);
  const GLITCH_CHARS = '!@#$%^&*<>/\\|{}[]0123456789';

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 300);
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index + 0.5, duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={triggerGlitch}
      className="inline-block cursor-default select-none transition-colors"
      style={{
        color: glitching
          ? `hsl(${Math.random() * 60 + 250}, 100%, 70%)`
          : 'inherit',
        textShadow: glitching
          ? '2px 0 #06b6d4, -2px 0 #ef4444'
          : 'none',
        transform: glitching ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : '',
      }}
    >
      {glitching && char !== ' '
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : char === ' '
        ? '\u00A0'
        : char}
    </motion.span>
  );
}

function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-white/30 text-xs tracking-widest uppercase font-mono">{label}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
      >
        <div className="w-1 h-2 rounded-full bg-violet-400" />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { t } = useI18n();
  const { navigateTo } = useNav();
  const sectionRef = useRef<HTMLElement>(null);
  const TITLE_CHARS = t('hero.title_chars').split('');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center"
      style={{ height: '100svh', minHeight: '100vh' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(139,92,246,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(6,182,212,0.1)_0%,transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3D Canvas - Right side.
           IMPORTANT: explicit min-h-screen + h-full ensures canvas
           always fills the section regardless of content height. */}
      <div
        className="absolute right-0 top-0 w-full md:w-1/2 opacity-80"
        style={{
          height: '100%',
          minHeight: '100vh',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%), linear-gradient(to left, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%), linear-gradient(to left, black 30%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
      >
        <ArchitectureGraph />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-0 w-full">
        <div className="max-w-2xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-violet-400 font-mono text-sm md:text-base tracking-widest uppercase mb-4"
          >
            <span className="text-white/30 mr-2">{'>'}</span>
            {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight text-white mb-2 leading-none"
          >
            {t('hero.name')}
          </motion.h1>

          {/* Nickname */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="font-mono text-base md:text-lg text-white/30 mb-4 tracking-wider"
          >
            <span className="text-violet-500/60">@</span>raniqd
          </motion.p>

          {/* Animated title */}
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span
              className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            >
              {TITLE_CHARS.map((char, i) => (
                <GlitchChar key={i} char={char} index={i} />
              ))}
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-white/50 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={(e) => navigateTo('work', e.clientX, e.clientY)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm tracking-wide overflow-hidden shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">{t('hero.cta_primary')}</span>
            </motion.button>

            <motion.button
              onClick={(e) => navigateTo('contact-email', e.clientX, e.clientY)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-2xl border border-white/15 text-white/70 hover:text-white hover:border-violet-500/50 font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-sm"
            >
              {t('hero.cta_secondary')}
            </motion.button>
          </motion.div>

          {/* Badges row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">{t('hero.badge_open')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10">
              <span className="text-violet-400 text-xs font-mono">{t('hero.badge_months')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <span className="text-cyan-400 text-xs font-mono">{t('hero.badge_location')}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade — softens all background decorations before section edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, transparent 0%, #05050f 100%)',
          zIndex: 5,
        }}
      />

      <ScrollIndicator label={t('hero.scroll_hint')} />
    </section>
  );
}
