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
      // Stage 1: Top metadata bar smoothly fades in & slides into place as footer enters
      if (topBarRef.current) {
        gsap.fromTo(
          topBarRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 92%',
              end: 'top 72%',
              scrub: 0.8,
            },
          }
        );
      }

      // Stage 2: As user continues scrolling, "Bhati" and the 3D diamond emerge smoothly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 72%',
          end: 'bottom 98%',
          scrub: 0.9,
        },
      });

      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          {
            yPercent: 65,
            opacity: 0,
            scale: 0.96,
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
            scale: 0.2,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
          },
          0.08
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
      className="relative bg-[#050505] border-t border-white/[0.08] pt-8 sm:pt-10 pb-4 sm:pb-6 overflow-hidden text-neutral-400 select-none"
    >
      {/* ── Top Bar (Minimalist Editorial Meta & Links) ── */}
      <div ref={topBarRef} className="max-w-7xl mx-auto px-6 sm:px-8 will-change-transform">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-white/[0.06]">
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
      <div className="relative w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pt-6 sm:pt-8 pb-2 sm:pb-4">
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
                <div
                  className="absolute left-1/2 pointer-events-auto flex items-center justify-center z-20"
                  style={{
                    top: '0.07em',
                    transform: 'translate(-50%, -50%)',
                    width: '0.28em',
                    height: '0.28em',
                  }}
                >
                  <div
                    ref={gemRef}
                    className="relative w-full h-full flex items-center justify-center will-change-transform"
                    style={{
                      filter:
                        'drop-shadow(0 0 12px rgba(37, 99, 235, 0.75)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))',
                    }}
                  >
                    {/* Ambient Radial Cobalt Aura */}
                    <div
                      className="absolute rounded-full bg-blue-500/25 blur-md pointer-events-none animate-pulse"
                      style={{
                        width: '0.42em',
                        height: '0.42em',
                        animationDuration: '4s',
                      }}
                    />

                    {/* Interactive 3D WebGL Gemstone - Scales 1:1 with font */}
                    <InteractiveGem3D className="w-full h-full" />
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
