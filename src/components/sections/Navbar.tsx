'use client';

import { useState, useEffect } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Work', href: '#case-studies' },
  { label: 'Philosophy', href: '#about' },
  { label: 'System', href: '#process' },
  { label: 'Stack', href: '#skills' },
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
          ? 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a href="#home" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center font-mono text-xs font-semibold text-white group-hover:border-white transition-colors">
            HB
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
            Hariom Bhati
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-8 flex flex-col gap-6">
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
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      )}
    </header>
  );
}
export default Navbar;
