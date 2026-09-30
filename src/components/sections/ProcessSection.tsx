'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crosshair, Cpu, Graph, RocketLaunch } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: any;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Audit & Diagnostic Review',
    subtitle: 'Uncovering Capital Leakage',
    description: 'A forensic review of historical account data, attribution discrepancy between ad managers and Shopify/CRM, and audience saturation checks.',
    deliverables: ['Telemetry & Pixel Signal Audit', 'Creative Fatigue Analysis', 'Unit Economics & CAC Baselines'],
    icon: Crosshair,
  },
  {
    num: '02',
    title: 'Funnel & Tracking Architecture',
    subtitle: 'Eliminating Data Blindspots',
    description: 'Setting up enterprise-grade tracking with Meta CAPI and Google Tag Manager server container. Optimizing landing pages for maximum checkout completion.',
    deliverables: ['Server-Side GTM Container', 'Custom GA4 Event Funnel', 'AOV Bundle & Checkout CRO'],
    icon: Cpu,
  },
  {
    num: '03',
    title: 'Algorithmic Execution',
    subtitle: 'Systematic Creative Velocity',
    description: 'Deploying structured testing frameworks across hook angles, video formats, and messaging pillars. Identifying statistically significant winners quickly.',
    deliverables: ['Advantage+ Campaign Structure', 'Dynamic Catalog Feed Testing', '15+ Creative Variations / Month'],
    icon: Graph,
  },
  {
    num: '04',
    title: 'Scale & Profit Maximization',
    subtitle: 'Aggressive Capital Allocation',
    description: 'Safely ramping budget on validated winning assets without spiking CPA. Expanding into Google Performance Max and omni-channel retargeting.',
    deliverables: ['Horizontal & Vertical Budget Scaling', 'Multi-Touch Attribution Monitoring', 'Weekly Net Margin & ROAS Reports'],
    icon: RocketLaunch,
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current) return;

      const cardEls = gsap.utils.toArray<HTMLElement>('.stack-card');
      const triggers: ScrollTrigger[] = [];

      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;

        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cardEls[cardEls.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });
        triggers.push(st);

        const tween = gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative bg-[#080808]">
      {/* Section Header */}
      <div className="pt-24 pb-12 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Execution Methodology
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The 4-Step Growth Engine
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Systematic Repeatability / Zero Fluff
          </p>
        </div>
      </div>

      {/* Sticky Stack Cards Container */}
      <div className="relative">
        {STEPS.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              className="stack-card lg:sticky top-0 min-h-[75vh] lg:min-h-[90vh] flex items-center justify-center px-6 sm:px-8 py-8"
            >
              <div className="w-full max-w-5xl glass-panel rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Number & Big Title */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                          {step.num}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                          <IconComponent size={20} weight="light" />
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description & Deliverables */}
                  <div className="lg:col-span-7 flex flex-col justify-between lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0">
                    <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8">
                      {step.description}
                    </p>

                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-4">
                        Key Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default ProcessSection;
