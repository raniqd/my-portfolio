'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, useScroll } from 'framer-motion';
import { useNav } from '@/providers/NavProvider';


const WorkIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const StackIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const AboutIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ContactIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

interface DockIconProps {
  mouseX?: MotionValue<number>;
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, href, children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const iconSize = 32;
  const iconMagnification = 48;
  const iconDistance = 160;

  const distance = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div ref={ref} style={{ width }} className="flex aspect-square items-center justify-center rounded-full">
      <a href={href} className="flex h-full w-full items-center justify-center group" onClick={onClick}>
        {children}
      </a>
    </motion.div>
  );
};

export default function Header() {
  const { navigateTo } = useNav();
  const mouseX = useMotionValue(Infinity);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']);
  const borderColor = useTransform(scrollY, [0, 80], ['rgba(26,26,26,0)', 'rgba(26,26,26,1)']);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    navigateTo(id, e.clientX, e.clientY);
  };

  const icons = [
    { name: 'stack', component: StackIcon, href: '#stack' },
    { name: 'work', component: WorkIcon, href: '#work' },
    { name: 'about', component: AboutIcon, href: '#about' },
    { name: 'contact', component: ContactIcon, href: '#contact' },
  ];

  return (
    <motion.header
      style={{ backgroundColor, borderColor }}
      className="fixed top-4 md:top-8 left-1/2 z-50 flex items-center gap-4 md:gap-20 rounded-full md:rounded-[2rem] border px-4 md:px-20 py-2 backdrop-blur-lg"
      initial={{ y: -50, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onTouchEnd={() => mouseX.set(Infinity)}
    >
      <a
        href="#hero"
        onClick={(e) => handleNav(e, 'hero')}
        className="flex w-[32px] h-[32px] items-center justify-center rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] hover:bg-[#FFFFFF] group transition-colors duration-300"
      >
        <span className="text-[#FFFFFF] group-hover:text-[#000000] font-black text-[10px] font-mono tracking-tighter transition-colors duration-300">dv</span>
      </a>

      <div className="w-[1px] h-5 bg-[#1A1A1A]" />

      {icons.map((icon) => (
        <DockIcon
          key={icon.name}
          href={icon.href}
          onClick={(e) => handleNav(e, icon.name)}
          mouseX={mouseX}
        >
          <icon.component className="h-full w-full p-2 text-[#8A8A8A] group-hover:text-[#FFFFFF] transition-colors duration-300" />
        </DockIcon>
      ))}
    </motion.header>
  );
}
