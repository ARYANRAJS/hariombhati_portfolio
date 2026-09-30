'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { MagneticButton } from '../ui/MagneticButton';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Skills & Stack', href: '#skills' },
    { name: 'ROI Calculator', href: '#calculator' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#090D14]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5' 
        : 'bg-[#090D14]/50 backdrop-blur-md border-b border-white/[0.04] py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                HB<span className="text-cyan-400">.</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-gray-400 border-l border-white/10 pl-2.5">
                Performance Lab
              </span>
            </Link>
          </div>

          {/* Desktop Nav with explicit gap */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <MagneticButton strength={0.25}>
              <Link 
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-white text-gray-950 hover:bg-gray-100 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-white focus:outline-none p-1.5"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-[#090D14] border-l border-white/10 z-50 p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-mono text-xl font-bold text-white">HB.</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-white text-sm font-mono uppercase tracking-wider py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-950 px-5 py-3 rounded-full text-xs font-mono font-semibold uppercase tracking-wider"
                >
                  Book Discovery Call
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
