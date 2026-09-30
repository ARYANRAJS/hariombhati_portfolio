'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GsapTextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export default function GsapTextReveal({
  children,
  className = '',
  as = 'h2',
  delay = 0,
}: GsapTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.gsap-word');

    const tween = gsap.fromTo(
      words,
      {
        y: '100%',
        opacity: 0,
        rotateX: -40,
      },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.85,
        stagger: 0.04,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [delay]);

  const Component = as as any;
  const words = children.split(' ');

  return (
    <Component
      ref={containerRef}
      className={`overflow-hidden inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      style={{ perspective: 600 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <span className="gsap-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
