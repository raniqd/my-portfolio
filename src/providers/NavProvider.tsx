'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavContextType {
  navigateTo: (targetId: string, originX?: number, originY?: number) => void;
}

const NavContext = createContext<NavContextType>({ navigateTo: () => {} });

export function useNav() {
  return useContext(NavContext);
}

// Smooth scroll using Lenis if available, fallback to native
function scrollToElement(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // Try Lenis first
  const win = window as typeof window & { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } };
  if (win.__lenis) {
    win.__lenis.scrollTo(el, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function NavProvider({ children }: { children: ReactNode }) {
  const [burst, setBurst] = useState<{ x: number; y: number; id: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((targetId: string, originX?: number, originY?: number) => {
    const x = originX ?? window.innerWidth / 2;
    const y = originY ?? window.innerHeight / 2;

    setBurst({ x, y, id: targetId });

    // Scroll after the "peak" of the animation (~400ms)
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      scrollToElement(targetId);
    }, 380);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <NavContext.Provider value={{ navigateTo }}>
      {children}

      {/* ── TikTok burst overlay ── */}
      <AnimatePresence>
        {burst && (
          <motion.div
            key={burst.id + burst.x}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            onAnimationComplete={(def) => {
              // Remove after exit completes
              if ((def as { opacity: number }).opacity === 0) setBurst(null);
            }}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998 }}
          >
            {/* Radial ripple from click origin */}
            <motion.div
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 35, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: burst.x,
                top: burst.y,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(6,182,212,0.25) 50%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center',
              }}
            />

            {/* Horizontal streak lines (TikTok speed lines) */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0.8 }}
                animate={{ scaleX: 1.2, opacity: 0 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: '0',
                  top: `${15 + i * 14}%`,
                  width: '100%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, rgba(139,92,246,${0.4 - i * 0.05}), transparent)`,
                  transformOrigin: `${(burst.x / window.innerWidth) * 100}% 50%`,
                }}
              />
            ))}

            {/* Vertical wipe — dark fill that sweeps down and then exits up */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: ['−100%', '0%', '0%', '100%'] }}
              transition={{ duration: 0.65, times: [0, 0.35, 0.55, 1], ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(5,5,15,0.97) 0%, rgba(30,10,60,0.95) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </NavContext.Provider>
  );
}
