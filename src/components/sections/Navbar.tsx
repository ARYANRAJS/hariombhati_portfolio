'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#case-studies', id: 'case-studies' },
  { label: 'Skills', href: '#skills', id: 'skills' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section based on scroll position
      const scrollPos = window.scrollY + 140;
      const sectionIds = ['contact', 'skills', 'case-studies', 'about'];
      
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler for all internal navigation
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const lenis = (window as any).lenis;

    if (targetId === 'home' || !targetId) {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setActiveSection('home');
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl, {
          offset: -80,
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setActiveSection(targetId);
    }
  };

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
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center font-mono text-xs font-bold text-white group-hover:border-white group-hover:bg-white/[0.1] transition-all duration-300">
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

        {/* Desktop Navigation with Smooth Interactive Transition */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/[0.1] border border-white/15 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
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
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.25)] cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer with Smooth Framer Motion Transition */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.08]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-white bg-white/[0.08] font-bold border border-white/10'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <a
                  href={getAssetPath('/cv.pdf')}
                  target="_blank"
                  download="Hariom_Bhati_Resume.pdf"
                  className="text-center py-2.5 rounded-full border border-white/15 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/[0.05] transition-colors"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.25)] cursor-pointer"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
