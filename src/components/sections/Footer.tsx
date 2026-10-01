'use client';

import React from 'react';
import { ArrowUp } from '@phosphor-icons/react';

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
    <footer className="relative bg-[#050505] border-t border-white/[0.08] py-14 text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center font-mono text-xs text-white">
              HB
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-white">
              Hariom Bhati
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            Performance Marketing & Telemetry Architecture
          </p>
        </div>

        {/* Quick Nav - Flex Wrap with Touch-Friendly Hit Targets */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400 text-center max-w-md md:max-w-none">
          <a
            href="#case-studies"
            onClick={(e) => handleNavClick(e, 'case-studies')}
            className="hover:text-white transition-colors py-1 px-1 cursor-pointer"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="hover:text-white transition-colors py-1 px-1 cursor-pointer"
          >
            Philosophy
          </a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, 'skills')}
            className="hover:text-white transition-colors py-1 px-1 cursor-pointer"
          >
            Stack
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-white transition-colors py-1 px-1 cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center justify-center sm:justify-end gap-5 w-full md:w-auto">
          <span className="text-xs font-mono text-neutral-600 text-center sm:text-left">
            © {new Date().getFullYear()} Hariom Bhati. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white hover:bg-white/[0.05] transition-all cursor-pointer shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} weight="bold" />
          </button>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
