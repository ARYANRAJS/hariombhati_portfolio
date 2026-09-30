'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import TiltCard3D from '../ui/TiltCard3D';
import GsapTextReveal from '../ui/GsapTextReveal';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  myRole: string;
  headline: string;
  roas: string;
  revenue: string;
  metricLabel: string;
  whatIDid: string;
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'modamecca',
    client: 'Modamecca Apparel',
    category: 'E-Commerce Fashion',
    myRole: 'Lead Performance Marketer',
    headline: 'How I scaled seasonal fashion sales to ₹1.80L+ at 7.25x ROAS and slashed CPA by 38%.',
    roas: '7.25x',
    revenue: '₹1.80L+',
    metricLabel: '38% CPA Reduction',
    whatIDid: 'Restructured the ad account with Meta Advantage+ Shopping, segmented top-of-funnel audiences with 1% behavioral lookalikes, and tested 15 high-converting video angles.',
    tags: ['Meta Advantage+', 'Dynamic Catalog', 'Creative Strategy'],
  },
  {
    id: 'parshwanath',
    client: 'Parshwanath Mart',
    category: 'Home & Kitchen D2C',
    myRole: 'Growth & Funnel Strategist',
    headline: 'How I drove 220+ orders with 5.27x ROAS by creating direct WhatsApp checkout funnels.',
    roas: '5.27x',
    revenue: '220+ Orders',
    metricLabel: 'Zero Ad Fatigue in 90 Days',
    whatIDid: 'Created click-to-WhatsApp ad funnels for immediate friction-free buying, combined with bundle offer structures that significantly boosted Average Order Value (AOV).',
    tags: ['WhatsApp Funnels', 'Meta Ads', 'AOV Optimization'],
  },
  {
    id: 'vidyalaybox',
    client: 'VidyalayBox',
    category: 'EdTech & B2B SaaS',
    myRole: 'SEO & Inbound Lead Architect',
    headline: 'How I ranked VidyalayBox #1 on Google for high-intent school software queries with zero ad spend.',
    roas: 'Infinite',
    revenue: '#1 Rank',
    metricLabel: 'Zero Paid Ad Spend',
    whatIDid: 'Engineered programmatic landing pages, targeted long-tail commercial intent keywords, and built clean technical site architecture for rapid organic lead generation.',
    tags: ['Programmatic SEO', 'B2B Funnels', 'Technical SEO'],
  },
  {
    id: 'kgnstore',
    client: 'KGN Retail Store',
    category: 'Electronics & Retail',
    myRole: 'Telemetry & Attribution Engineer',
    headline: 'How I reduced acquisition cost by $90 by fixing tracking with Server-Side GA4 and Meta CAPI.',
    roas: '4.80x',
    revenue: '-$90 CPA',
    metricLabel: '100% Signal Match Quality',
    whatIDid: 'Implemented a server-side Google Tag Manager container on a custom first-party domain with event deduplication, giving algorithms accurate conversion signals.',
    tags: ['Server-Side GTM', 'Meta CAPI', 'Attribution Modeling'],
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
              Featured Work
            </div>
            <GsapTextReveal as="h2" className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Brands I Have Scaled
            </GsapTextReveal>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Scroll horizontally to navigate / 4 Proven Case Studies
          </p>
        </div>
      </div>

      {/* Horizontal Pan Track */}
      <div className="lg:h-[80vh] flex items-center">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 px-6 sm:px-8 lg:px-12 w-full lg:w-max pb-16 lg:pb-0"
        >
          {CASE_STUDIES.map((study, idx) => (
            <TiltCard3D
              key={study.id}
              maxTilt={7}
              scale={1.015}
              className="w-full lg:w-[620px] flex-shrink-0"
            >
              <div className="w-full h-full glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Card Meta */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                      {study.client}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
                    {study.myRole}
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
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
                  {study.headline}
                </h3>

                {/* What I Did */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                  {study.whatIDid}
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
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
export default CaseStudies;
