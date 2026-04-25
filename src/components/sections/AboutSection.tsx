'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

interface TerminalLine {
  type: 'command' | 'output' | 'prompt';
  text: string;
  delay: number;
}

function useTypingEffect(text: string, speed = 30, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function TerminalBlock({ isInView, containerRef }: { isInView: boolean; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lines: TerminalLine[] = [
    { type: 'prompt', text: t('about.terminal_prompt'), delay: 0 },
    { type: 'command', text: t('about.line1'), delay: 600 },
    { type: 'output', text: t('about.line1_result'), delay: 1200 },
    { type: 'prompt', text: t('about.terminal_prompt'), delay: 2400 },
    { type: 'command', text: t('about.line2'), delay: 3000 },
    { type: 'output', text: t('about.line2_result'), delay: 3600 },
    { type: 'prompt', text: t('about.terminal_prompt'), delay: 4600 },
    { type: 'command', text: t('about.line3'), delay: 5200 },
    { type: 'output', text: t('about.line3_result'), delay: 5800 },
    { type: 'prompt', text: t('about.terminal_prompt'), delay: 6800 },
    { type: 'command', text: t('about.line4'), delay: 7400 },
    { type: 'output', text: t('about.line4_result'), delay: 8000 },
    { type: 'prompt', text: t('about.terminal_prompt'), delay: 9000 },
    { type: 'command', text: t('about.line5'), delay: 9600 },
    { type: 'output', text: t('about.line5_result'), delay: 10200 },
  ];

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((line, i) => {
      const t = setTimeout(() => setStep((s) => Math.max(s, i + 1)), line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // Auto-scroll the terminal container to the bottom whenever a new line appears
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [step, containerRef]);

  return (
    <div className="font-mono text-sm space-y-1.5 p-2">
      {lines.slice(0, step).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex gap-2 flex-wrap"
        >
          {line.type === 'prompt' && (
            <span className="text-emerald-400">{line.text}</span>
          )}
          {line.type === 'command' && (
            <span className="text-white">{line.text}</span>
          )}
          {line.type === 'output' && (
            <span className="text-white/55 pl-4">{line.text}</span>
          )}
        </motion.div>
      ))}

      {/* Blinking cursor */}
      <div ref={bottomRef} className="flex gap-2">
        {step >= lines.length ? (
          <span className="text-emerald-400">{t('about.terminal_prompt')}</span>
        ) : null}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-emerald-400"
        >
          █
        </motion.span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Brutalist background lines - Anti-design accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-4"
            >
              {'>'} {t('about.title')}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white tracking-tight mb-8 leading-none"
            >
              About<br />
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Me.
              </span>
            </motion.h2>

            {/* Stats row - Brutalist style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mb-8"
            >
              {[
                { num: '4mo', label: 'Coding' },
                { num: '2', label: 'Projects' },
                { num: '1', label: 'Client' },
              ].map((stat, i) => (
                <div key={i} className="bg-black/50 p-5 text-center">
                  <div className="text-3xl font-black text-white">{stat.num}</div>
                  <div className="text-xs text-white/40 font-mono mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 flex-wrap"
            >
              <motion.a
                href="#contact"
                whileHover={{ x: 4, y: -4 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="px-6 py-3 border-2 border-white text-white font-bold font-mono text-sm uppercase tracking-widest"
                style={{ boxShadow: '4px 4px 0 rgba(139,92,246,0.8)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139,92,246,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '';
                }}
              >
                {t('about.contact_me')} →
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Terminal window */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0d1117] shadow-2xl shadow-black/50">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                <div className="flex-1 text-center">
                  <span className="text-white/30 text-xs font-mono">raniqd@portfolio — zsh</span>
                </div>
              </div>

              {/* Terminal content */}
              <div ref={terminalContentRef} className="p-5 min-h-64 max-h-96 overflow-y-auto scrollbar-thin">
                {/* Startup header */}
                <div className="text-emerald-400/50 text-xs font-mono mb-4 space-y-1">
                  <p>Last login: {new Date().toDateString()} on console</p>
                  <p className="text-violet-400/50">Portfolio OS v2026.04 - Powered by passion ✦</p>
                </div>
                <TerminalBlock isInView={isInView} containerRef={terminalContentRef} />
              </div>
            </div>

            {/* Anti-design accent elements */}
            <div className="mt-4 flex gap-3 flex-wrap">
              <div
                className="px-4 py-2 border border-violet-500 text-violet-400 font-mono text-xs rotate-[-1deg] hover:rotate-0 transition-transform cursor-default"
                style={{ boxShadow: '2px 2px 0 rgba(139,92,246,0.5)' }}
              >
                &gt; open_to_work=true
              </div>
              <div
                className="px-4 py-2 border border-cyan-500 text-cyan-400 font-mono text-xs rotate-[1deg] hover:rotate-0 transition-transform cursor-default"
                style={{ boxShadow: '-2px 2px 0 rgba(6,182,212,0.5)' }}
              >
                &gt; location=Ukraine
              </div>
              <a
                href="https://github.com/raniqd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white/20 text-white/40 hover:text-white hover:border-white/40 font-mono text-xs rotate-[-0.5deg] hover:rotate-0 transition-all cursor-pointer"
                style={{ boxShadow: '2px 2px 0 rgba(255,255,255,0.1)' }}
              >
                &gt; github=@raniqd
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
