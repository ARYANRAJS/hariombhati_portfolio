'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const gemRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Giant "Bhati" name smooth entrance as user scrolls into footer
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          {
            y: 120,
            opacity: 0.35,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 92%',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Cobalt Blue Gemstone rises smoothly and locks into position
      if (gemRef.current) {
        gsap.fromTo(
          gemRef.current,
          {
            y: 90,
            scale: 0.65,
            opacity: 0.25,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1.0,
            },
          }
        );
      }

      // 3. Top metadata bar subtle slide up
      if (topBarRef.current) {
        gsap.fromTo(
          topBarRef.current,
          {
            y: 35,
            opacity: 0.5,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 98%',
              end: 'top 75%',
              scrub: 0.8,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    const targetEl = document.getElementById(targetId);
    if (lenis && targetEl) {
      lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050505] border-t border-white/[0.08] pt-12 sm:pt-16 pb-6 overflow-hidden text-neutral-400 select-none"
    >
      {/* ── Top Bar (Minimalist Editorial Meta & Links) ── */}
      <div ref={topBarRef} className="max-w-7xl mx-auto px-6 sm:px-8 will-change-transform">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/[0.06]">
          {/* Left: Brand Identity & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold">
              Hariom Bhati
            </span>
            <span className="hidden sm:inline text-neutral-600 text-xs">•</span>
            <span className="font-mono text-xs tracking-wider text-neutral-500">
              ©{new Date().getFullYear()} ®
            </span>
            <span className="hidden sm:inline text-neutral-600 text-xs">•</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              Indore, India
            </span>
          </div>

          {/* Right: Quick Links & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <a
              href="#case-studies"
              onClick={(e) => handleNavClick(e, 'case-studies')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Contact
            </a>
            <a
              href="https://wa.me/916265966868"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer py-1 inline-flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ArrowUpRight size={11} weight="bold" />
            </a>
            <a
              href={getAssetPath('/cv.pdf')}
              target="_blank"
              download="Hariom_Bhati_Resume.pdf"
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Resume
            </a>

            {/* Back to top circular button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-white hover:bg-white/[0.05] transition-all cursor-pointer shrink-0 ml-1"
              aria-label="Scroll to top"
            >
              <ArrowUp size={13} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Giant Editorial Typographic Banner: "Bhati" with Smooth Scroll Reveal ── */}
      <div className="relative w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pt-8 sm:pt-14 pb-0">
        <div className="relative inline-flex items-baseline justify-center tracking-tighter">
          {/* Main Giant Word with Smooth Scrub Rise Animation */}
          <div ref={nameRef} className="will-change-transform inline-block">
            <span
              className="font-extrabold tracking-[-0.04em] text-[22vw] sm:text-[21vw] lg:text-[20vw] leading-[0.78] text-transparent bg-clip-text select-none block"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(120, 120, 120, 0.16) 40%, rgba(20, 20, 20, 0.08) 100%)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)',
              }}
            >
              Bhati
            </span>
          </div>

          {/* ── Glowing 3D Cobalt Blue Gem Floating Over the 'i' ── */}
          <div
            ref={gemRef}
            className="absolute right-[1.2%] sm:right-[1.8%] top-[12%] sm:top-[14%] -translate-y-1/2 pointer-events-none flex items-center justify-center will-change-transform"
            style={{
              filter:
                'drop-shadow(0 0 25px rgba(37, 99, 235, 0.85)) drop-shadow(0 0 55px rgba(59, 130, 246, 0.45))',
            }}
          >
            {/* Ambient Radial Cobalt Aura */}
            <div
              className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-blue-500/30 blur-2xl pointer-events-none animate-pulse"
              style={{ animationDuration: '4s' }}
            />

            {/* Faceted 3D Crystal Gemstone SVG (Pure Cobalt Blue Palette) */}
            <svg
              viewBox="0 0 100 100"
              className="w-7 h-7 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Deep navy back facet shadow */}
              <polygon points="50,6 88,34 76,86 24,86 12,34" fill="#0f172a" />

              {/* Main Cut Facets */}
              {/* Top Crown facet (ice blue specular highlight) */}
              <polygon points="50,6 68,26 32,26" fill="#bfdbfe" fillOpacity="0.95" />

              {/* Top-right facet */}
              <polygon points="50,6 88,34 68,26" fill="#93c5fd" fillOpacity="0.9" />

              {/* Top-left facet */}
              <polygon points="50,6 32,26 12,34" fill="#60a5fa" fillOpacity="0.88" />

              {/* Center table facet (pure radiant cobalt blue) */}
              <polygon points="32,26 68,26 72,58 28,58" fill="#2563eb" fillOpacity="0.98" />

              {/* Upper right side */}
              <polygon points="68,26 88,34 78,58 72,58" fill="#1d4ed8" />

              {/* Upper left side */}
              <polygon points="32,26 28,58 22,58 12,34" fill="#3b82f6" fillOpacity="0.85" />

              {/* Lower center pavilion */}
              <polygon points="28,58 72,58 64,86 36,86" fill="#1e40af" />

              {/* Lower right facet */}
              <polygon points="72,58 78,58 76,86 64,86" fill="#1e3a8a" />

              {/* Lower left facet */}
              <polygon points="28,58 36,86 24,86 22,58" fill="#1d4ed8" />

              {/* Specular White Sparkle Glint */}
              <polygon points="46,14 54,14 50,8" fill="#ffffff" fillOpacity="0.95" />
              <circle cx="50" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.95" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
