'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe, MagnifyingGlass, Sparkle, CheckCircle } from '@phosphor-icons/react';
import TiltCard3D from '../ui/TiltCard3D';
import GsapTextReveal from '../ui/GsapTextReveal';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  myRole: string;
  creatorBadge: string;
  liveUrl: string;
  linkLabel: string;
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
    category: 'E-Commerce Fashion & D2C',
    myRole: 'Store Creator & Growth Lead',
    creatorBadge: 'Created & Scaled by Hariom',
    liveUrl: 'https://modamecca.in/',
    linkLabel: 'Visit Modamecca Store',
    headline: 'How I built Modamecca and scaled seasonal sales to ₹1.80L+ at 7.25x ROAS with 38% CPA reduction.',
    roas: '7.25x',
    revenue: '₹1.80L+',
    metricLabel: '38% CPA Reduction',
    whatIDid: 'Built and configured the Modamecca e-commerce storefront, restructured the ad account with Meta Advantage+ Shopping, segmented top-of-funnel audiences with 1% behavioral lookalikes, and tested 15 high-converting video angles.',
    tags: ['Store Created by Hariom', 'Meta Advantage+', 'Dynamic Catalog', 'Creative Strategy'],
  },
  {
    id: 'parshwanath',
    client: 'Parshwanath Mart',
    category: 'Home & Kitchen D2C',
    myRole: 'Store Creator & Funnel Architect',
    creatorBadge: 'Created & Scaled by Hariom',
    liveUrl: 'https://parshwanathmart.com/',
    linkLabel: 'Visit Parshwanath Mart',
    headline: 'How I built Parshwanath Mart and drove 220+ orders with 5.27x ROAS via direct WhatsApp checkout funnels.',
    roas: '5.27x',
    revenue: '220+ Orders',
    metricLabel: 'Zero Ad Fatigue in 90 Days',
    whatIDid: 'Designed and developed the Parshwanath Mart online shopping experience from scratch, then deployed click-to-WhatsApp ad funnels for immediate friction-free checkout, combined with high-AOV bundle offer architecture.',
    tags: ['Store Created by Hariom', 'WhatsApp Funnels', 'Meta Ads', 'AOV Optimization'],
  },
  {
    id: 'vidyalaybox',
    client: 'VidyalayBox (SEO Ranking)',
    category: 'EdTech & B2B SaaS',
    myRole: 'SEO & Inbound Lead Architect',
    creatorBadge: '#1 Google SERP Proof',
    liveUrl: 'https://www.google.com/search?q=best+school+management+bihar&oq=best+school+management+bihar&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAjIHCAIQIRiPAtIBCDc3NDRqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8&sei=K_-8aoaPG_aMnesP-5CRwQY',
    linkLabel: 'Verify #1 Google Search Proof',
    headline: 'How I ranked VidyalayBox #1 on Google for "best school management bihar" with zero paid ad spend.',
    roas: 'Infinite',
    revenue: '#1 Rank',
    metricLabel: 'Zero Paid Ad Spend',
    whatIDid: 'Targeted high-intent commercial keywords ("best school management bihar"), engineered programmatic landing pages, optimized technical on-page schema, and secured the undisputed #1 organic rank on Google SERP.',
    tags: ['Google Search Proof', 'Programmatic SEO', 'B2B Funnels', 'Technical SEO'],
  },
  {
    id: 'kgnstore',
    client: 'KGN Official',
    category: 'Dropshipping & D2C E-Commerce',
    myRole: 'Dropshipping & Growth Lead',
    creatorBadge: 'Dropshipping Scaled by Hariom',
    liveUrl: 'https://kgnofficial.com/',
    linkLabel: 'Visit KGN Dropshipping Store',
    headline: 'How I scaled the KGN Official dropshipping store with Meta CAPI telemetry and high-converting ad hooks.',
    roas: '4.80x',
    revenue: 'Scalable D2C',
    metricLabel: '100% Attribution Accuracy',
    whatIDid: 'Architected end-to-end performance marketing funnels for KGN dropshipping operations, integrated Server-Side Google Tag Manager and Meta Conversions API for pristine event deduplication, driving sustained ROAS at scale.',
    tags: ['Dropshipping Store', 'Server-Side GTM', 'Meta CAPI', 'Attribution Modeling'],
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
              Featured Work &amp; Live Proofs
            </div>
            <GsapTextReveal as="h2" className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Brands I Have Built &amp; Scaled
            </GsapTextReveal>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Scroll horizontally to navigate / 4 Verified Live Case Studies
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
              className="w-full lg:w-[640px] flex-shrink-0"
            >
              <div className="w-full h-full glass-panel glass-panel-hover rounded-2xl p-5 sm:p-10 flex flex-col justify-between border border-white/10 hover:border-white/25 transition-all">
                <div>
                  {/* Card Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                      <span className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                        {study.client}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {study.creatorBadge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] self-start sm:self-auto">
                      {study.myRole}
                    </span>
                  </div>

                  {/* Big Stat Callout - Responsive Stack on Mobile to prevent text collision */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 sm:p-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
                    <div className="min-w-0 pb-3 sm:pb-0">
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                        Primary ROAS
                      </div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white tracking-tight break-words">
                        {study.roas}
                      </div>
                    </div>
                    <div className="min-w-0 pt-3 sm:pt-0 sm:pl-6">
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                        {study.metricLabel}
                      </div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-neutral-200 tracking-tight break-words">
                        {study.revenue}
                      </div>
                    </div>
                  </div>

                  {/* Narrative Headline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                    {study.headline}
                  </h3>

                  {/* What I Did */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    {study.whatIDid}
                  </p>
                </div>

                {/* Bottom Section: Live Store / Proof Link & Tags */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Tags */}
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

                  {/* Direct Clickable Live Link Button */}
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] w-full sm:w-auto shrink-0 cursor-pointer"
                  >
                    <span>{study.linkLabel}</span>
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
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
