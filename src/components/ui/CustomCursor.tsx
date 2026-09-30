'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use gsap.quickTo for instant, lag-free hardware-accelerated tracking
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [data-cursor], input, select');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (interactive.tagName === 'A' || interactive.tagName === 'BUTTON') {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9990] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height,opacity] duration-200 ${
          isHovered ? 'w-1.5 h-1.5 opacity-60' : 'w-2 h-2 opacity-90'
        }`}
      />

      {/* Trailing Outer Ring with GSAP physics */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ${
          cursorText
            ? 'w-16 h-16 bg-white text-black border-transparent shadow-[0_0_25px_rgba(255,255,255,0.4)]'
            : isHovered
            ? 'w-12 h-12 bg-white/10 border-white/80'
            : 'w-8 h-8 bg-transparent border-white/30'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-black">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
