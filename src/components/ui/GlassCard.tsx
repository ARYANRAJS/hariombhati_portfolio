'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald';
}

export function GlassCard({ children, className = '', glowColor = 'cyan' }: GlassCardProps) {
  const glowClass = glowColor === 'cyan' 
    ? 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
    : 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`glass rounded-xl border border-gray-800 transition-colors duration-300 ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
