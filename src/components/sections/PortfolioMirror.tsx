'use client';

import { useEffect, useRef, useState } from 'react';

export default function PortfolioMirror() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        setScale(containerRef.current.clientWidth / window.innerWidth);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'mirror',
          mouseX: e.clientX,
          mouseY: e.clientY,
        }, '*');
      }
    };

    const handleScroll = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'mirror',
          scrollY: window.scrollY,
        }, '*');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#000000] pointer-events-none">
      <iframe
        ref={iframeRef}
        src="/?mirror=true"
        className="absolute top-0 left-0 border-none origin-top-left"
        style={{ 
          width: '100vw', 
          height: '100vh', 
          transform: `scale(${scale})` 
        }}
        title="Portfolio Interactive Preview"
      />
    </div>
  );
}
