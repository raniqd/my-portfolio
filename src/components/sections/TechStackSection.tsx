'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '@/i18n';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = {
  languages: [
    { name: 'TypeScript', color: '#3178c6', icon: 'TS' },
    { name: 'JavaScript', color: '#f7df1e', icon: 'JS' },
    { name: 'HTML', color: '#e34f26', icon: '</>' },
    { name: 'CSS', color: '#1572b6', icon: '✦' },
    { name: 'Flutter', color: '#02569b', icon: '◈' },
    { name: 'Kotlin', color: '#7f52ff', icon: 'K' },
  ],
  frontend: [
    { name: 'React', color: '#61dafb', icon: '⚛' },
    { name: 'Next.js', color: '#ffffff', icon: '▲' },
    { name: 'Tailwind CSS', color: '#06b6d4', icon: '≈' },
  ],
  backend: [
    { name: 'Supabase', color: '#3ecf8e', icon: '⚡' },
    { name: 'Prisma', color: '#5a67d8', icon: '△' },
  ],
  tools: [
    { name: 'Vercel', color: '#ffffff', icon: '▲' },
    { name: 'GitHub', color: '#ffffff', icon: '⌥' },
    { name: 'VS Code', color: '#007acc', icon: '⬡' },
  ],
};

function TechPill({ tech, delay }: { tech: { name: string; color: string; icon: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: 'backOut' }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-default hover:border-white/25 transition-all duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px 2px ${tech.color}30`;
        (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}60`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '';
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
    >
      <span className="text-base font-bold font-mono w-6 text-center" style={{ color: tech.color }}>
        {tech.icon}
      </span>
      <span className="text-sm text-white/70 group-hover:text-white font-medium transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
}

function CategoryBlock({
  category,
  items,
  label,
  delay,
}: {
  category: string;
  items: { name: string; color: string; icon: string }[];
  label: string;
  delay: number;
}) {
  const CATEGORY_COLORS: Record<string, string> = {
    languages: '#8b5cf6',
    frontend: '#06b6d4',
    backend: '#10b981',
    tools: '#f59e0b',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: `${CATEGORY_COLORS[category]}20`,
            border: `1px solid ${CATEGORY_COLORS[category]}40`,
            color: CATEGORY_COLORS[category],
          }}
        >
          {category[0].toUpperCase()}
        </div>
        <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white/40">
          {label}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((tech, i) => (
          <TechPill key={tech.name} tech={tech} delay={delay + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: { name: string; color: string; icon: string }[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ['0%', '-33.33%'] : ['-33.33%', '0%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 bg-white/3 text-sm font-mono shrink-0"
            style={{ borderColor: `${tech.color}25`, color: `${tech.color}90` }}
          >
            <span>{tech.icon}</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Big centered stat
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-1 px-8 py-6 rounded-2xl border border-white/8 bg-white/3"
    >
      <span className="text-4xl font-black text-white">{value}</span>
      <span className="text-xs font-mono text-white/35 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

export default function TechStackSection() {
  const { t } = useI18n();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const allItems = [
    ...TECH_STACK.languages,
    ...TECH_STACK.frontend,
    ...TECH_STACK.backend,
    ...TECH_STACK.tools,
  ];

  return (
    <section id="stack" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            {'>'} {t('stack.title')}
          </motion.p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 overflow-hidden"
          >
            {t('stack.title').split('').map((c, i) => (
              <span key={i} className="char inline-block">
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg max-w-md mx-auto"
          >
            {t('stack.subtitle')}
          </motion.p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-lg mx-auto">
          <StatBlock value="6" label={t('stack.stat_languages')} />
          <StatBlock value="2" label={t('stack.stat_projects')} />
          <StatBlock value="1" label={t('stack.stat_client')} />
        </div>

        {/* Marquee rows */}
        <div className="mb-16 space-y-3">
          <MarqueeRow items={[...TECH_STACK.languages, ...TECH_STACK.frontend]} />
          <MarqueeRow items={[...TECH_STACK.backend, ...TECH_STACK.tools, ...TECH_STACK.languages]} reverse />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <CategoryBlock
            category="languages"
            items={TECH_STACK.languages}
            label={t('stack.languages')}
            delay={0}
          />
          <CategoryBlock
            category="frontend"
            items={TECH_STACK.frontend}
            label={t('stack.frontend')}
            delay={0.1}
          />
          <CategoryBlock
            category="backend"
            items={TECH_STACK.backend}
            label={t('stack.backend')}
            delay={0.2}
          />
          <CategoryBlock
            category="tools"
            items={TECH_STACK.tools}
            label={t('stack.tools')}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
