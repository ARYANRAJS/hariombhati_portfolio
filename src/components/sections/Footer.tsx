'use client';

import React from 'react';
import { ArrowUp } from '@phosphor-icons/react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] py-16 text-neutral-400 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
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

        {/* Quick Nav */}
        <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <a href="#case-studies" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            Philosophy
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Stack
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-neutral-600">
            © {new Date().getFullYear()} Hariom Bhati. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white hover:bg-white/[0.05] transition-all"
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
