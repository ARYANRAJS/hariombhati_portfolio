'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SpotlightCard } from '../ui/SpotlightCard';
import { BorderBeam } from '../ui/BorderBeam';
import { TrendingUp, ArrowUpRight, Award, Target, Zap, ShieldCheck } from 'lucide-react';

const FloatingCube = dynamic(() => import('../../components/3d/FloatingCube').then((mod: any) => mod.default || mod.FloatingCube).catch(() => () => null), { ssr: false });

type CategoryType = 'all' | 'ecommerce' | 'seo' | 'audit';

const caseStudies = [
  {
    id: 1,
    client: 'Modamecca',
    category: 'ecommerce',
    badge: 'Featured Growth Case Study',
    highlight: 'Scaled 3.4x MoM',
    metric: '7.25x',
    metricLabel: 'Verified ROAS',
    revenue: '₹2,20,514',
    spend: '₹56,552',
    cpa: '₹163.00',
    orders: '210+ Orders',
    title: 'Apparel E-Commerce Scaling',
    description: 'Scaled Facebook and Instagram ad campaigns with dynamic creative testing (DCT) and hyper-targeted lookalike segments, maintaining low CPA despite 4x spend hike.',
    strategy: 'Full-funnel architecture: Catalog sales for high-intent visitors, broad interest stacks for top-of-funnel testing, and automated CBO budget shifting.',
    glow: '#10b981',
    isHero: true,
  },
  {
    id: 2,
    client: 'Parshwanath Mart',
    category: 'ecommerce',
    badge: 'DTC Performance',
    highlight: '281 Paid Conversions',
    metric: '5.27x',
    metricLabel: 'Blended ROAS',
    revenue: '₹1,91,541',
    spend: '₹41,788',
    cpa: '₹131.72',
    orders: '281 Orders',
    title: 'Profitable Customer Acquisition',
    description: 'Generated ₹1,91,541 in tracked sales with just ₹41,788 ad spend in 30 days via custom retargeting windows.',
    strategy: 'Structured retargeting funnels (1-3d, 7-14d), video hooks with 3-second stop rates >42%, and conversion-rate CRO optimization.',
    glow: '#06b6d4',
    isHero: false,
  },
  {
    id: 3,
    client: 'VidyalayBox',
    category: 'seo',
    badge: 'Zero-CAC Acquisition',
    highlight: 'AI Overview Citation',
    metric: '#1',
    metricLabel: 'Google SERP Rank',
    revenue: 'Zero Ad Spend',
    spend: '₹0 Ad Spend',
    cpa: '₹0 Organic CAC',
    orders: 'Daily Pipeline',
    title: 'SEO Dominance & Organic Inbound',
    description: 'Secured the absolute #1 organic spot on Google Search and earned an official Google Gemini AI Overview citation for primary keywords.',
    strategy: 'Semantic entity SEO, technical core web vitals speed audit, high-authority backlink architecture, and intent-focused programmatic content hubs.',
    glow: '#10b981',
    isHero: false,
  },
  {
    id: 4,
    client: 'KGN Store',
    category: 'audit',
    badge: 'US Market Tier-1',
    highlight: '68% Friction Resolved',
    metric: '-$90',
    metricLabel: 'Target CPA Reduction',
    revenue: 'Tier-1 Geo',
    spend: 'Global Audit',
    cpa: 'High Efficiency',
    orders: 'Funnel Overhaul',
    title: 'Funnel Optimization & Audit',
    description: 'Comprehensive performance & conversion rate audit for an international e-commerce brand operating in competitive US tier-1 traffic segments.',
    strategy: 'Mapped drop-offs from ad click to one-click checkout, eliminated 3 redundant form fields, and restructured pixel server-side CAPI tracking.',
    glow: '#06b6d4',
    isHero: false,
  }
];

export function CaseStudies() {
  const [activeTab, setActiveTab] = useState<CategoryType>('all');

  const filteredStudies = activeTab === 'all' 
    ? caseStudies 
    : caseStudies.filter(s => s.category === activeTab);

  return (
    <section id="case-studies" className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 mb-4">
                <Target className="w-3.5 h-3.5" />
                VERIFIED TRACK RECORD • LIVE RESULTS
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Case Studies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300">Proof of ROI</span>
              </h2>
            </div>
            
            <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
              Every campaign is engineered for profitable unit economics. No vanity metrics — only real sales, verified ROAS, and scalable acquisition systems.
            </p>
          </div>
        </ScrollReveal>

        {/* 21st.dev style Tab Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Results (4)' },
            { id: 'ecommerce', label: 'E-Commerce Scaling' },
            { id: 'seo', label: 'Zero-CAC SEO' },
            { id: 'audit', label: 'Tier-1 Audits' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CategoryType)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-gray-950 shadow-[0_0_20px_rgba(255,255,255,0.3)] font-semibold'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => {
            const isFeatured = study.isHero && activeTab === 'all';
            return (
              <div
                key={study.id}
                className={isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}
              >
                <SpotlightCard
                  spotlightColor={study.glow === '#10b981' ? 'rgba(16, 185, 129, 0.14)' : 'rgba(6, 182, 212, 0.14)'}
                  className="h-full p-6 sm:p-8 flex flex-col justify-between group"
                >
                  {isFeatured && <BorderBeam size={250} duration={10} colorFrom="#10b981" colorTo="#06b6d4" />}
                  
                  <div>
                    {/* Top Row: Meta Badge & Status */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-gray-300">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        {study.badge}
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {study.highlight}
                      </span>
                    </div>

                    {/* Client Name & Big Metric */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                          {study.client}
                          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h3>
                        <p className="text-xs font-mono text-gray-400 mt-0.5">{study.title}</p>
                      </div>

                      <div className="text-left sm:text-right mt-2 sm:mt-0">
                        <div className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tighter text-white">
                          {study.metric}
                        </div>
                        <div className="text-[11px] font-mono uppercase text-gray-500 tracking-wider">
                          {study.metricLabel}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Visual Key Data Metrics Box for Featured */}
                    {isFeatured && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.06] mb-6">
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Revenue</div>
                          <div className="text-base font-mono font-bold text-emerald-400">{study.revenue}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Ad Spend</div>
                          <div className="text-base font-mono font-bold text-gray-200">{study.spend}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">CPA</div>
                          <div className="text-base font-mono font-bold text-cyan-400">{study.cpa}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Scale</div>
                          <div className="text-base font-mono font-bold text-white">{study.orders}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Strategy Footer */}
                  <div className="pt-4 border-t border-white/[0.06] mt-4">
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      <span className="font-semibold text-gray-200">Execution: </span>
                      {study.strategy}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
