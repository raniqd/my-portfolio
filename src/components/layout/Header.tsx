'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '@/i18n';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useNav } from '@/providers/NavProvider';

export default function Header() {
  const { t } = useI18n();
  const { navigateTo } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(5,5,15,0)', 'rgba(5,5,15,0.90)']);

  const navItems = ['work', 'stack', 'about', 'contact'] as const;

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    navigateTo(id, e.clientX, e.clientY);
  };

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => handleNav(e, 'hero')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs font-mono tracking-tighter">rq</span>
          </div>
          <span className="text-white font-bold tracking-tight hidden sm:block font-mono">
            raniqd<span className="text-violet-400">.dev</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNav(e, item)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium relative group cursor-pointer"
            >
              {t(`nav.${item}`)}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.nav>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white/80 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white/80"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white/80 origin-center"
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNav(e, item)}
              className="text-white/70 hover:text-white font-medium py-2 border-b border-white/10 transition-colors"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
