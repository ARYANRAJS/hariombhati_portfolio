'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  roas: string;
  revenue: string;
  metricLabel: string;
  strategy: string;
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'modamecca',
    client: 'Modamecca Apparel',
    category: 'E-Commerce Fashion',
    headline: 'Scaling seasonal fashion sales with Advantage+ Shopping and dynamic creative testing.',
    roas: '7.25x',
    revenue: '₹1.80L+',
    metricLabel: '38% CPA Reduction',
    strategy: 'Rebuilt top-of-funnel targeting around behavioral lookalikes and structured 15 high-converting video variations.',
    tags: ['Meta Advantage+', 'Dynamic Catalog', 'Creative Strategy'],
  },
  {
    id: 'parshwanath',
    client: 'Parshwanath Mart',
    category: 'Home & Kitchen D2C',
    headline: 'Overcoming cold traffic resistance with bundle offers and direct messaging funnels.',
    roas: '5.27x',
    revenue: '220+ Orders',
    metricLabel: 'Zero Ad Fatigue in 90 Days',
    strategy: 'Deployed WhatsApp business API click-to-chat ads combined with value-pack bundling that raised average order value.',
    tags: ['Meta Ads', 'WhatsApp Funnels', 'AOV Optimization'],
  },
  {
    id: 'vidyalaybox',
    client: 'VidyalayBox',
    category: 'EdTech & B2B SaaS',
    headline: 'Securing #1 Google organic rankings for high-intent school management software queries.',
    roas: 'Infinite',
    revenue: '#1 Rank',
    metricLabel: 'Zero Paid Ad Spend',
    strategy: 'Engineered programmatic landing pages, technical site architecture, and targeted long-tail commercial keyword clusters.',
    tags: ['Search Engine Optimization', 'B2B Funnels', 'Technical SEO'],
  },
  {
    id: 'kgnstore',
    client: 'KGN Retail Store',
    category: 'Electronics & Retail',
    headline: 'Eliminating conversion drop-offs through server-side GA4 and Meta CAPI integration.',
    roas: '4.80x',
    revenue: '-$90 CPA',
    metricLabel: '100% Signal Match Quality',
    strategy: 'Implemented Google Tag Manager server container with automatic event deduplication and enriched purchase attribution.',
    tags: ['Server-Side GTM', 'Meta CAPI', 'Attribution Modeling'],
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP horizontal scroll on desktop (min-width 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${distance + 300}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="case-studies" ref={containerRef} className="relative bg-[#080808] overflow-hidden">
      {/* Section Header */}
      <div className="pt-24 pb-8 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Verified Case Studies
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Scroll horizontally to navigate / 4 Flagship Projects
          </p>
        </div>
      </div>

      {/* Horizontal Pan Track (Desktop) / Vertical Stack (Mobile) */}
      <div className="lg:h-[80vh] flex items-center">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 px-6 sm:px-8 lg:px-12 w-full lg:w-max pb-16 lg:pb-0"
        >
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              className="w-full lg:w-[620px] flex-shrink-0 glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 flex flex-col justify-between"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-white">
                      {study.client}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
                    {study.category}
                  </span>
                </div>

                {/* Big Stat Callout */}
                <div className="grid grid-cols-2 gap-6 mb-8 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                      Primary ROAS
                    </div>
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                      {study.roas}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                      {study.metricLabel}
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-neutral-200 tracking-tight">
                      {study.revenue}
                    </div>
                  </div>
                </div>

                {/* Narrative Headline */}
                <h3 className="text-lg sm:text-xl font-medium text-white mb-4 leading-snug">
                  {study.headline}
                </h3>

                {/* Strategy summary */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                  {study.strategy}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-white hover:text-neutral-300 transition-colors">
                  <ArrowUpRight size={18} weight="bold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default CaseStudies;
