'use client';

import dynamic from 'next/dynamic';
import { MagneticButton } from '../ui/MagneticButton';
import { CountUp } from '../ui/CountUp';
import { ArrowDown, ArrowUpRight, DownloadSimple } from '@phosphor-icons/react';

// Dynamic import for 3D HeroScene (WebGL)
const HeroScene = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border border-white/10 border-t-white animate-spin" />
    </div>
  ),
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden architect-grid"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Intro & CTAs */}
          <div className="lg:col-span-7 flex flex-col z-10">
            {/* Status Pill with Name */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-200">
                Hariom Bhati / Open for Full-Time Roles
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
              I turn paid traffic into scalable, profitable revenue.
            </h1>

            {/* Personal Value Prop */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
              Hi, I am a Performance Marketer and Growth Specialist. I help D2C e-commerce brands and startups scale profitably through Meta Ads, Google Ads, and server-side tracking.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <MagneticButton strength={0.3}>
                <a
                  href="#case-studies"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <span>Explore My Work</span>
                  <ArrowDown size={14} weight="bold" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.03] text-white hover:bg-white/[0.08] transition-all font-bold text-xs uppercase tracking-wider backdrop-blur-sm"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </MagneticButton>

              <a
                href="/cv.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-4 py-3 transition-colors"
              >
                <DownloadSimple size={15} />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Monospace Metric Strip */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  <CountUp prefix="₹" end={4.1} suffix="L+" duration={2000} />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">
                  Direct Revenue
                </div>
              </div>

              <div className="border-x border-white/[0.08] px-4">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  <CountUp end={4} suffix="x" /> to <CountUp end={7} suffix="x" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">
                  Average ROAS
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  <CountUp end={500} suffix="+" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">
                  Orders Delivered
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Scene Viewport */}
          <div className="lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[560px] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-radial from-white/[0.05] via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />
            <div className="w-full h-full relative z-10">
              <HeroScene />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Hero;
