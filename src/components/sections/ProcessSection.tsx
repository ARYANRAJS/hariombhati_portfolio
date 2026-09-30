'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crosshair, Cpu, Graph, RocketLaunch, CheckCircle, ArrowRight } from '@phosphor-icons/react';

interface Step {
  num: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  impactMetric: string;
  description: string;
  deliverables: string[];
  icon: any;
}

const STEPS: Step[] = [
  {
    num: '01',
    shortLabel: 'Audit & Diagnostics',
    title: 'Audit & Diagnostic Review',
    subtitle: 'Uncovering Capital Leakage',
    impactMetric: '100% Signal Audit',
    description: 'A forensic review of historical account data, attribution discrepancy between ad managers and Shopify/CRM, and audience saturation checks to eliminate wasted ad spend.',
    deliverables: [
      'Telemetry & Pixel Signal Audit',
      'Creative Fatigue & Audience Saturation',
      'Unit Economics & CAC Baselines',
      'Historical Campaign Post-Mortem',
    ],
    icon: Crosshair,
  },
  {
    num: '02',
    shortLabel: 'Tracking Architecture',
    title: 'Funnel & Tracking Architecture',
    subtitle: 'Eliminating Data Blindspots',
    impactMetric: '95%+ Match Quality',
    description: 'Setting up enterprise-grade tracking with Meta CAPI and Google Tag Manager server container. Optimizing landing pages and checkout friction points for maximum conversion.',
    deliverables: [
      'Server-Side GTM Container',
      'Custom GA4 E-Commerce Funnel',
      'AOV Bundle & Checkout CRO',
      'UTM Attribution Taxonomy',
    ],
    icon: Cpu,
  },
  {
    num: '03',
    shortLabel: 'Algorithmic Execution',
    title: 'Algorithmic Execution',
    subtitle: 'Systematic Creative Velocity',
    impactMetric: '15+ Creatives / Month',
    description: 'Deploying structured testing frameworks across hook angles, video formats, and messaging pillars. Identifying statistically significant winners with minimal testing budget.',
    deliverables: [
      'Advantage+ Campaign Architecture',
      'Dynamic Catalog Feed Testing',
      '15+ Creative Variations / Month',
      'Real-Time Fatigue Detection',
    ],
    icon: Graph,
  },
  {
    num: '04',
    shortLabel: 'Scale & Profit',
    title: 'Scale & Profit Maximization',
    subtitle: 'Aggressive Capital Allocation',
    impactMetric: '4x to 7x Target ROAS',
    description: 'Safely ramping budget on validated winning assets without spiking CPA. Expanding horizontally into Google Performance Max, YouTube, and retention remarketing.',
    deliverables: [
      'Horizontal & Vertical Budget Scaling',
      'Multi-Touch Attribution Monitoring',
      'Weekly EBITDA & ROAS Accounting',
      'LTV Re-engagement Funnels',
    ],
    icon: RocketLaunch,
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-progress steps on scroll while user is scrolling through this section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // When section is in viewport, calculate scroll progress through the section
            if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
              const totalDistance = rect.height - windowHeight * 0.4;
              const scrolledDistance = (windowHeight * 0.4) - rect.top;
              const progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));
              const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
              setActiveStep(stepIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <section id="process" ref={containerRef} className="relative bg-[#080808] py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Execution Methodology
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The 4-Step Growth Engine
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Click any step to inspect deliverables / Systematic Repeatability
          </p>
        </div>

        {/* Step Selector Tabs (Zero Overlap, Clean Interactive Navigation) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {STEPS.map((step, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#181818] border-white text-white shadow-[0_10px_30px_rgba(255,255,255,0.06)]'
                    : 'bg-[#101010]/60 border-white/[0.08] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-white' : 'text-neutral-500'}`}>
                    {step.num}
                  </span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                <div className="font-semibold text-xs sm:text-sm tracking-tight text-white mb-1 truncate">
                  {step.shortLabel}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 truncate">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Stage Card (Isolated Stage with AnimatePresence: Mathematically impossible to overlap text) */}
        <div className="relative min-h-[460px] sm:min-h-[420px] bg-[#111111] rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              
              {/* Left Column: Big Step Meta */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {current.num}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-white">
                      <IconComponent size={24} weight="light" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    {current.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
                    {current.subtitle}
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/15">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Standard KPI:
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      {current.impactMetric}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-3 pt-10 text-xs font-mono text-neutral-500">
                  <span>Phase {current.num} of 04</span>
                  <span>/</span>
                  <span>Full-Funnel Ownership</span>
                </div>
              </div>

              {/* Right Column: Narrative & Key Deliverables */}
              <div className="lg:col-span-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-10">
                <div>
                  <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8">
                    {current.description}
                  </p>

                  <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-4">
                    Documented Deliverables
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {current.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-200"
                      >
                        <CheckCircle size={16} weight="fill" className="text-white flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Switcher Footer Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))}
                    className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                  >
                    Previous Phase
                  </button>
                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeStep ? 'w-6 bg-white' : 'w-2 bg-white/20'
                        }`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-200 transition-colors"
                  >
                    <span>Next Phase</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
export default ProcessSection;
