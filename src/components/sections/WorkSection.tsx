'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

function useProjects() {
  const { t } = useI18n();
  return [
    {
      id: 'zzpizza',
      title: 'ZZPizza',
      subtitle: t('work.project_zzpizza_subtitle'),
      category: t('work.project_zzpizza_category'),
      year: '2026',
      color: '#f59e0b',
      tags: ['HTML', 'TypeScript', 'JavaScript', 'CSS', 'Next.js', 'Tailwind'],
      description: t('work.project_zzpizza_description'),
      highlights: [t('work.project_zzpizza_h1'), t('work.project_zzpizza_h2'), t('work.project_zzpizza_h3')],
      arch: {
        diagram: [
          { label: 'Next.js App', color: '#ffffff', x: 5, y: 8 },
          { label: 'Tailwind UI', color: '#06b6d4', x: 38, y: 8 },
          { label: 'TypeScript', color: '#3178c6', x: 68, y: 8 },
          { label: 'Supabase DB', color: '#3ecf8e', x: 5, y: 60 },
          { label: 'Prisma ORM', color: '#5a67d8', x: 38, y: 60 },
          { label: 'Vercel', color: '#ffffff', x: 68, y: 60 },
        ],
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma', 'Vercel'],
      },
      gradient: 'from-amber-600/20 to-orange-900/20',
      link: 'https://zzpizza.raniqd.tech/',
      github: 'https://github.com/raniqd',
    },
    {
      id: 'portfolio',
      title: 'raniqd.dev',
      subtitle: t('work.project_portfolio_subtitle'),
      category: t('work.project_portfolio_category'),
      year: '2026',
      color: '#8b5cf6',
      tags: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP'],
      description: t('work.project_portfolio_description'),
      highlights: [t('work.project_portfolio_h1'), t('work.project_portfolio_h2'), t('work.project_portfolio_h3')],
      arch: {
        diagram: [
          { label: 'Next.js 16', color: '#ffffff', x: 5, y: 8 },
          { label: 'React 3 Fiber', color: '#61dafb', x: 38, y: 8 },
          { label: 'Framer Motion', color: '#ff0055', x: 68, y: 8 },
          { label: 'GSAP', color: '#88ce02', x: 5, y: 60 },
          { label: 'Lenis Scroll', color: '#8b5cf6', x: 38, y: 60 },
          { label: 'Vercel Edge', color: '#ffffff', x: 68, y: 60 },
        ],
        stack: ['Next.js 16', 'Three.js', 'R3F', 'GSAP', 'Framer Motion', 'Lenis'],
      },
      gradient: 'from-violet-600/20 to-purple-900/20',
      link: '#',
      github: 'https://github.com/raniqd',
    },
  ];
}

type Project = ReturnType<typeof useProjects>[0];

function ArchDiagram({ diagram }: { diagram: Project['arch']['diagram'] }) {
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[0, 1].map((i) => (
          <line
            key={`h${i}`}
            x1={`${(diagram[i]?.x || 0) + 14}%`}
            y1={`${(diagram[i]?.y || 0) + 5}%`}
            x2={`${(diagram[i + 1]?.x || 0) + 2}%`}
            y2={`${(diagram[i + 1]?.y || 0) + 5}%`}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
          />
        ))}
        {[0, 1, 2].map((i) => (
          <line
            key={`v${i}`}
            x1={`${(diagram[i]?.x || 0) + 10}%`}
            y1={`${(diagram[i]?.y || 0) + 8}%`}
            x2={`${(diagram[i + 3]?.x || 0) + 10}%`}
            y2={`${(diagram[i + 3]?.y || 0) + 5}%`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        ))}
      </svg>

      {diagram.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          className="absolute flex items-center justify-center"
          style={{ left: `${node.x}%`, top: `${node.y}%`, width: '28%', height: '26%' }}
        >
          <div
            className="w-full h-full rounded-lg border flex items-center justify-center px-1 text-[9px] font-mono font-bold leading-tight text-center"
            style={{
              backgroundColor: `${node.color === '#ffffff' ? 'rgba(255,255,255' : node.color.replace('#', 'rgba(')}${node.color === '#ffffff' ? ',0.06)' : ',0.12)'}`,
              borderColor: `${node.color}50`,
              color: node.color === '#ffffff' ? 'rgba(255,255,255,0.7)' : node.color,
            }}
          >
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="relative group"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`relative w-full ${large ? 'h-96' : 'h-80'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${project.gradient} backdrop-blur-sm`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative z-10 p-7 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  {project.category}
                </span>
                <span className="text-white/30 text-xs font-mono">{project.year}</span>
              </div>

              <h3 className="text-3xl font-black text-white mb-1.5">{project.title}</h3>
              <p className="text-white/45 text-sm mb-5">{project.subtitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div>
              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-full font-mono font-bold"
                    style={{ backgroundColor: `${project.color}20`, color: project.color }}
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono text-white/40 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flip hint */}
          <div className="absolute bottom-4 right-5 text-white/20 text-xs font-mono flex items-center gap-1">
            <span>↺</span>
            <span className="hidden md:block">{t('work.flip_hint')}</span>
          </div>
        </div>

        {/* Back face — Architecture */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/15 overflow-hidden bg-[#0d1117]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-mono text-sm font-bold">{t('work.backend_label')}</h4>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: `${project.color}20`, color: project.color }}
              >
                {project.title}
              </span>
            </div>

            <div className="flex-1 relative mb-4">
              <ArchDiagram diagram={project.arch.diagram} />
            </div>

            <div>
              <p className="text-white/30 text-xs font-mono mb-2">$ cat stack.yml</p>
              <div className="flex flex-wrap gap-1.5">
                {project.arch.stack.map((s) => (
                  <span key={s} className="text-xs font-mono text-emerald-400/80 border border-emerald-400/20 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-lg"
              >
                ⌥ {t('work.github')}
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-lg"
              >
                ↗ {t('work.live')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkSection() {
  const { t } = useI18n();
  const projects = useProjects();

  return (
    <section id="work" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            {'>'} {t('work.title')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight"
          >
            {t('work.title_line1')}<br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t('work.title_line2')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg mt-4"
          >
            {t('work.subtitle')}
          </motion.p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ZZPizza — large, spans full on mobile, left col on desktop */}
          <div className="md:col-span-1">
            <ProjectCard project={projects[0]} index={0} large />
          </div>

          {/* Portfolio — right col */}
          <div className="md:col-span-1">
            <ProjectCard project={projects[1]} index={1} large />
          </div>
        </div>

        {/* "More coming" teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/2 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white/60 font-mono text-sm mb-1">
              <span className="text-violet-400">{'>'}</span> next_project.status
            </p>
            <p className="text-white font-bold text-xl">{t('work.more_title')}</p>
            <p className="text-white/35 text-sm mt-1">{t('work.more_subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-violet-500/30 bg-violet-500/10">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-400 text-sm font-mono">{t('work.more_status')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
