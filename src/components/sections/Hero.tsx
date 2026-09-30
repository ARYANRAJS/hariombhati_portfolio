'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, Download, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { CountUp } from '../ui/CountUp';
import { ScrollReveal } from '../ui/ScrollReveal';
import { MagneticButton } from '../ui/MagneticButton';
import { BorderBeam } from '../ui/BorderBeam';

const HeroSphere = dynamic(() => import('../../components/3d/HeroSphere').then((mod: any) => mod.default || mod.HeroSphere).catch(() => () => null), { ssr: false });

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-[60%] flex flex-col z-10">
            <ScrollReveal delay={0.1}>
              <div className="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6 w-fit overflow-hidden">
                <BorderBeam size={120} duration={8} colorFrom="#10b981" colorTo="#06b6d4" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-gray-300">
                  Available for High-Impact Growth Roles & Audits
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6">
                Turning paid traffic into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300">
                  predictable profit.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl font-normal leading-relaxed">
                Performance marketer specializing in direct-to-consumer e-commerce scaling, full-funnel CRO, and zero-CAC organic lead engines. Engineered with data, validated with ROI.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 mb-12">
                {/* Magnetic Primary CTA */}
                <MagneticButton strength={0.3}>
                  <a
                    href="#case-studies"
                    className="inline-flex justify-center items-center gap-2 bg-white text-gray-950 hover:bg-gray-100 px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
                  >
                    View Case Studies
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </MagneticButton>

                {/* Magnetic Secondary CTA */}
                <MagneticButton strength={0.25}>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 border border-white/15 hover:border-white/30 text-white bg-white/[0.03] hover:bg-white/[0.08] px-6 py-3.5 rounded-full text-sm font-semibold transition-all backdrop-blur-sm"
                  >
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Book Discovery Call
                  </a>
                </MagneticButton>

                <a
                  href="/cv.pdf"
                  target="_blank"
                  className="inline-flex justify-center items-center gap-2 text-gray-400 hover:text-white px-4 py-3 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </ScrollReveal>

            {/* High-Trust Monospace Metric Bar */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 border-y border-white/[0.08] py-6 max-w-xl">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                    <CountUp prefix="₹" end={4.1} suffix="L+" duration={2500} />
                  </span>
                  <span className="text-xs font-mono uppercase text-gray-500 mt-1">Direct Revenue</span>
                </div>
                
                <div className="flex flex-col border-x border-white/[0.08] px-4 sm:px-6">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight">
                    <CountUp end={4} suffix="x" />–<CountUp end={7} suffix="x" />
                  </span>
                  <span className="text-xs font-mono uppercase text-gray-500 mt-1">Average ROAS</span>
                </div>

                <div className="flex flex-col pl-2 sm:pl-0">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tracking-tight">
                    <CountUp end={500} suffix="+" />
                  </span>
                  <span className="text-xs font-mono uppercase text-gray-500 mt-1">Orders Delivered</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right 3D Interactive Canvas */}
          <div className="w-full lg:w-[40%] h-[320px] sm:h-[420px] lg:h-[550px] relative z-0 flex items-center justify-center mb-4 lg:mb-0">
             <ScrollReveal delay={0.3} direction="left">
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
                  {HeroSphere && <HeroSphere />}
                </div>
             </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
