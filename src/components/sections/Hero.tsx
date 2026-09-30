'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { MagneticButton } from '../ui/MagneticButton';
import { CountUp } from '../ui/CountUp';
import PortraitBrushReveal from '../ui/PortraitBrushReveal';
import CircularScrollBadge from '../ui/CircularScrollBadge';
import { getAssetPath } from '@/lib/paths';
import { 
  ArrowDown, 
  ArrowUpRight, 
  DownloadSimple, 
  CheckCircle, 
  Sparkle,
  TrendUp,
  MapPin,
  Certificate
} from '@phosphor-icons/react';

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden architect-grid"
    >
      {/* Interactive 3D Ambient WebGL Core & Orbiting Particles */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] opacity-25 pointer-events-none z-0 hidden sm:block">
        <HeroScene />
      </div>

      {/* Ambient background light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-200">
                Digital Marketing Specialist • Available for Roles
              </span>
            </div>

            {/* Main Personal Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
              Hi, I'm Hariom Bhati.
              <span className="block text-neutral-400 font-normal text-3xl sm:text-5xl lg:text-6xl mt-2">
                I scale brands with paid ads &amp; data.
              </span>
            </h1>

            {/* Value Proposition from Resume */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
              Specializing in Meta Ads, Google Ads, and full-funnel conversion tracking (GA4, GTM, CAPI). Running high-performance campaigns for 8+ clients across real estate, education, and healthcare.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton strength={0.3}>
                <a
                  href="#case-studies"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <span>View My Work</span>
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
                href={getAssetPath('/cv.pdf')}
                target="_blank"
                download="Hariom_Bhati_Resume.pdf"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-4 py-3 transition-colors"
              >
                <DownloadSimple size={15} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Verified Stats Strip */}
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
                  <CountUp end={8} suffix="+" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">
                  Clients Scaled
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hariom's Cinematic Portrait with Floating Live Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Portrait Frame Card with Interactive Paint Brush Color Reveal */}
            <div className="relative w-full max-w-[400px] rounded-3xl overflow-hidden border border-white/20 bg-[#111111] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <PortraitBrushReveal
                src="/hariom-bhati-color.jpg"
                alt="Hariom Bhati - Digital Marketing Specialist"
                className="w-full h-[460px] sm:h-[520px]"
                priority
              />

              {/* Bottom Bar Info */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-30 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                  <MapPin size={13} className="text-white" />
                  <span>Indore, India</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  <span>Open to Roles</span>
                </div>
              </div>
            </div>

            {/* Floating Live Chip 1: ROAS Badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 sm:-left-6 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141414]/90 backdrop-blur-xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-white">
                <TrendUp size={16} weight="bold" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">7.25x Peak ROAS</div>
                <div className="text-[10px] font-mono text-neutral-400">Parshwanath &amp; Modamecca</div>
              </div>
            </motion.div>

            {/* Floating Live Chip 2: Certified Badge */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 -right-4 sm:-right-8 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141414]/95 backdrop-blur-xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-white">
                <Certificate size={16} weight="bold" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Google &amp; HubSpot</div>
                <div className="text-[10px] font-mono text-neutral-400">Certified Specialist</div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Bottom Right: Circular Rotating Scroll Badge */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20">
        <CircularScrollBadge targetId="about" />
      </div>
    </section>
  );
}
export default Hero;
