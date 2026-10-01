'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Force browser to never restore previous scroll position on reload/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Clear hash if present on reload so page always starts fresh at the top Hero
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false, // Keep mobile touch scrolling completely native, fluid & frictionless
      touchMultiplier: 1.0,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Immediately pin to top (0, 0)
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis & native window scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleNativeScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
