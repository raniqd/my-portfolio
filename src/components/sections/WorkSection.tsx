'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PortfolioMirror from './PortfolioMirror';

function useProjects() {
  return [
    {
      id: 'zzpizza',
      title: 'ZZPizza',
      subtitle: "Full-Stack Pizza Delivery Platform",
      category: "Client Project",
      year: '2026',
      description: "A complete online pizza ordering platform built for a real client. Features a dynamic menu, product configurator, cart, admin dashboard, and a discount system.",
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma'],
      link: 'https://zzpizza.raniqd.tech/',
      status: "In Development",
      color: '#FFFFFF',
    },
    {
      id: 'portfolio',
      title: 'raniqd.dev',
      subtitle: "Personal Portfolio Website",
      category: "Personal",
      year: '2026',
      description: "The very site you're looking at - built with React Three Fiber for 3D WebGL, Framer Motion animations, Lenis smooth scroll, and modern design patterns.",
      stack: ['Next.js', 'TypeScript', 'Framer Motion', 'GSAP'],
      link: null,
      status: null,
      color: '#FFFFFF',
    },
  ];
}

type Project = ReturnType<typeof useProjects>[0];

function ProjectBlock({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"]
  });

  const filter = useTransform(scrollYProgress, [0, 1], ["blur(12px) grayscale(100%)", "blur(0px) grayscale(0%)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter, scale }}
      className="relative flex flex-col md:flex-row gap-6 md:gap-16 py-10 md:py-32 border-t border-[#1A1A1A] group"
    >
      <div className="w-full md:w-1/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 text-[#8A8A8A] font-mono text-xs tracking-widest uppercase mb-8">
            <span>{project.year}</span>
            {project.status && (
              <>
                <span className="w-1 h-1 bg-[#333333] rounded-full" />
                <span className="flex items-center gap-2 text-[#06b6d4]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]"></span>
                  </span>
                  {project.status}
                </span>
              </>
            )}
          </div>

          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#FFFFFF] mb-4">
            {project.title}
          </h3>
          <p className="text-base text-[#8A8A8A] mb-8 leading-relaxed max-w-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map(tech => (
              <span key={tech} className="px-3 py-1 border border-[#1A1A1A] rounded-full text-xs font-mono text-[#8A8A8A]">
                {tech}
              </span>
            ))}
          </div>
        </div>


      </div>

      <div className="w-full md:w-2/3">
        {/* Cinematic wide frame for the project */}
        <div className="w-full aspect-[16/10] bg-[#0A0A0A] border border-[#1A1A1A] overflow-hidden relative group/image hover:border-[#333333] transition-colors duration-500">

          {/* Visualization */}
          {project.id === 'portfolio' ? (
            <PortfolioMirror />
          ) : project.id === 'zzpizza' ? (
            <div className="absolute inset-0">
              <img 
                src="/zzpizza.jpg" 
                alt="ZZPizza website preview" 
                className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
              />
              {/* Inner Vignette to soften the sharp edges and blend into the dark site */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-10 pointer-events-none" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover/image:opacity-30 transition-opacity duration-700">
              <span className="text-[12vw] md:text-[10vw] font-black leading-none" style={{ color: project.color }}>
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 right-4 px-3 py-1.5 border border-[#1A1A1A] bg-[#000000] text-[#8A8A8A] font-mono text-[10px] tracking-widest uppercase z-10">
            {project.category}
          </div>

          {/* Central Icon Link */}
          {project.link && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-16 h-16 bg-[#000000]/60 backdrop-blur-md text-[#FFFFFF] rounded-full pointer-events-auto hover:bg-[#FFFFFF] hover:text-[#000000] hover:scale-110 transition-all duration-300 shadow-2xl"
                aria-label="Visit Site"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const projects = useProjects();

  return (
    <section id="work" className="relative py-20 md:py-48 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-24">
          <h2 className="text-[10vw] md:text-[6vw] leading-[0.85] font-black tracking-tight-display text-[#FFFFFF] uppercase m-0">
            My<br />Projects
          </h2>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectBlock key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
