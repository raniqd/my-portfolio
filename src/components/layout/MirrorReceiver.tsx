'use client';

import { useEffect, useRef, useState } from 'react';

export default function MirrorReceiver() {
  const [isMirror, setIsMirror] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('mirror=true')) {
      setIsMirror(true);
      // Hide native scrollbars so the iframe looks clean
      document.body.style.overflow = 'hidden';

      const handleMessage = (e: MessageEvent) => {
        if (e.data?.type === 'mirror') {
          // Sync scroll
          if (e.data.scrollY !== undefined) {
            window.scrollTo(0, e.data.scrollY);
          }
          // Sync cursor directly via DOM for 0 lag
          if (e.data.mouseX !== undefined && e.data.mouseY !== undefined) {
            if (cursorRef.current) {
              cursorRef.current.style.transform = `translate(${e.data.mouseX}px, ${e.data.mouseY}px) translate(-50%, -50%)`;
            }
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  if (!isMirror) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[99999] top-0 left-0 flex items-center justify-center mix-blend-difference"
      style={{
        transform: 'translate(-100px, -100px)',
      }}
    >
      <div className="w-6 h-6 rounded-full bg-[#FFFFFF]" />
    </div>
  );
}
