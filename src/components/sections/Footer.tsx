'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

const InteractiveGem3D = dynamic(() => import('../3d/InteractiveGem3D'), { ssr: false });

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
      // 1. Unified Staged Timeline: When user reaches footer, top bar appears (Stage 1).
      // As user continues scrolling down, "Bhati" rises up from below (Stage 2).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 78%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          {
            yPercent: 115,
            opacity: 0,
            scale: 0.94,
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
          },
          0
        );
      }

      if (gemRef.current) {
        tl.fromTo(
          gemRef.current,
          {
            scale: 0.15,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
          },
          0.12
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
      <div className="relative w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pt-12 sm:pt-20 pb-4 sm:pb-8 min-h-[42vh] sm:min-h-[50vh]">
        <div className="relative inline-flex items-baseline justify-center tracking-tighter">
          {/* Main Giant Word with Smooth Scrub Rise Animation */}
          <div ref={nameRef} className="will-change-transform inline-block">
            <span
              aria-label="Bhati"
              className="font-extrabold tracking-[-0.04em] text-[22vw] sm:text-[21vw] lg:text-[20vw] leading-[0.78] text-transparent bg-clip-text select-none inline-flex items-baseline"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(120, 120, 120, 0.16) 40%, rgba(20, 20, 20, 0.08) 100%)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)',
              }}
            >
              <span>Bhat</span>
              <span className="relative inline-block">
                <span>ı</span>
                {/* ── Interactive 3D WebGL Cobalt Blue Gem Centered Exactly on the Dot of 'i' ── */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[40%] pointer-events-auto flex items-center justify-center z-20">
                  <div
                    ref={gemRef}
                    className="relative flex items-center justify-center will-change-transform"
                    style={{
                      filter:
                        'drop-shadow(0 0 25px rgba(37, 99, 235, 0.85)) drop-shadow(0 0 55px rgba(59, 130, 246, 0.45))',
                    }}
                  >
                    {/* Ambient Radial Cobalt Aura */}
                    <div
                      className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-blue-500/30 blur-2xl pointer-events-none animate-pulse"
                      style={{ animationDuration: '4s' }}
                    />

                    {/* Interactive 3D WebGL Gemstone */}
                    <InteractiveGem3D className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" />
                  </div>
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
