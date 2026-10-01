'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

export function Footer() {
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
    <footer className="relative bg-[#050505] border-t border-white/[0.08] pt-12 sm:pt-16 pb-6 overflow-hidden text-neutral-400 select-none">
      
      {/* ── Top Bar (Minimalist Editorial Meta & Links) ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
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

      {/* ── Giant Editorial Typographic Banner: "Bhati" with Glowing Gem ── */}
      <div className="relative w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pt-8 sm:pt-14 pb-0">
        <div className="relative inline-flex items-baseline justify-center tracking-tighter">
          
          {/* Main Giant Word */}
          <span
            className="font-extrabold tracking-[-0.04em] text-[22vw] sm:text-[21vw] lg:text-[20vw] leading-[0.78] text-transparent bg-clip-text select-none"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(120, 120, 120, 0.16) 40%, rgba(20, 20, 20, 0.08) 100%)',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)',
            }}
          >
            Bhati
          </span>

          {/* ── Glowing 3D Emerald Gem Floating Over the 'i' ── */}
          <div
            className="absolute right-[1.2%] sm:right-[1.8%] top-[12%] sm:top-[14%] -translate-y-1/2 pointer-events-none flex items-center justify-center"
            style={{ filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.65)) drop-shadow(0 0 50px rgba(16, 185, 129, 0.35))' }}
          >
            {/* Ambient Radial Aura */}
            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-emerald-400/25 blur-2xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

            {/* Faceted 3D Crystal Gemstone SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-7 h-7 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back facet shadow */}
              <polygon points="50,6 88,34 76,86 24,86 12,34" fill="#044e3b" />

              {/* Main Cut Facets */}
              {/* Top Crown facet (lightest highlight) */}
              <polygon points="50,6 68,26 32,26" fill="#a7f3d0" fillOpacity="0.95" />
              
              {/* Top-right facet */}
              <polygon points="50,6 88,34 68,26" fill="#6ee7b7" fillOpacity="0.9" />
              
              {/* Top-left facet */}
              <polygon points="50,6 32,26 12,34" fill="#34d399" fillOpacity="0.85" />
              
              {/* Center table facet */}
              <polygon points="32,26 68,26 72,58 28,58" fill="#10b981" fillOpacity="0.95" />
              
              {/* Upper right side */}
              <polygon points="68,26 88,34 78,58 72,58" fill="#059669" />
              
              {/* Upper left side */}
              <polygon points="32,26 28,58 22,58 12,34" fill="#10b981" fillOpacity="0.8" />
              
              {/* Lower center pavilion */}
              <polygon points="28,58 72,58 64,86 36,86" fill="#047857" />
              
              {/* Lower right facet */}
              <polygon points="72,58 78,58 76,86 64,86" fill="#065f46" />
              
              {/* Lower left facet */}
              <polygon points="28,58 36,86 24,86 22,58" fill="#059669" />

              {/* Specular White Sparkle Glint */}
              <polygon points="46,14 54,14 50,8" fill="#ffffff" fillOpacity="0.8" />
              <circle cx="50" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.9" />
            </svg>
          </div>

        </div>
      </div>

    </footer>
  );
}
export default Footer;
