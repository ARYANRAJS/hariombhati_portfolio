'use client';

import { useState, useEffect } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#case-studies' },
  { label: 'Playbook', href: '#process' },
  { label: 'Skills', href: '#skills' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#080808]/85 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none border-b border-white/[0.06] sm:border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Personal Monogram */}
        <a href="#home" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center font-mono text-xs font-bold text-white group-hover:border-white transition-colors">
            HB
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Hariom Bhati
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Performance Marketer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <a
            href={getAssetPath('/cv.pdf')}
            target="_blank"
            download="Hariom_Bhati_Resume.pdf"
            className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-2 py-1 transition-colors"
          >
            Resume
          </a>
          <MagneticButton strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-mono text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <a
              href={getAssetPath('/cv.pdf')}
              target="_blank"
              download="Hariom_Bhati_Resume.pdf"
              className="text-center py-2.5 rounded-full border border-white/15 text-xs font-mono uppercase tracking-wider text-white"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
