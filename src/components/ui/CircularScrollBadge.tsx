'use client';

import React from 'react';
import { ArrowDown } from '@phosphor-icons/react';

interface CircularScrollBadgeProps {
  targetId?: string;
  className?: string;
}

export default function CircularScrollBadge({
  targetId = 'about',
  className = '',
}: CircularScrollBadgeProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(`#${targetId}`, { offset: -80, duration: 1.4 });
      } else {
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label="Scroll down to explore more"
      data-cursor="SCROLL"
      className={`group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 select-none cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {/* ── Rotating SVG Circular Text ── */}
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full animate-spin transition-all"
        style={{ animationDuration: '14s' }}
      >
        <defs>
          <path
            id="scrollCirclePath"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text className="text-[9.5px] font-mono uppercase tracking-[0.24em] fill-neutral-400 group-hover:fill-white transition-colors duration-300">
          <textPath href="#scrollCirclePath" startOffset="0%">
            • SCROLL • EXPLORE MORE • SCROLL • EXPLORE MORE 
          </textPath>
        </text>
      </svg>

      {/* ── Center Ambient Glow ── */}
      <div className="absolute inset-4 rounded-full bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors duration-500 blur-sm pointer-events-none" />

      {/* ── Center Circular Button with Down Arrow ── */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#121212]/90 backdrop-blur-md border border-white/15 group-hover:border-white/50 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
        <ArrowDown
          size={18}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce"
          style={{ animationDuration: '2s' }}
        />
      </div>
    </a>
  );
}
