'use client';

import React from 'react';
import { 
  Megaphone, 
  TerminalWindow, 
  Browsers, 
  Sparkle, 
  TrendUp,
  Cpu
} from '@phosphor-icons/react';

const SKILL_GROUPS = [
  {
    title: 'Paid Media Channels',
    description: 'Direct response paid acquisition across high-intent and algorithmic discovery networks.',
    icon: Megaphone,
    skills: ['Meta Ads Manager', 'Advantage+ Campaigns', 'Google Search Ads', 'Performance Max', 'YouTube Direct Response', 'TikTok Ads'],
    highlight: '₹4.1L+ Direct Revenue Scaled',
    colSpan: 'lg:col-span-7',
  },
  {
    title: 'Attribution & Telemetry',
    description: 'Eliminating conversion discrepancies and signal decay post-iOS 14.5.',
    icon: TerminalWindow,
    skills: ['Google Tag Manager (Server-Side)', 'Google Analytics 4 (GA4)', 'Meta Conversions API (CAPI)', 'Event Deduplication', 'UTM Architecture'],
    highlight: '95%+ Match Quality',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'Funnel & Conversion Architecture',
    description: 'Landing page friction reduction, basket size growth, and checkout optimization.',
    icon: Browsers,
    skills: ['Shopify Liquid & Apps', 'WooCommerce Setup', 'Custom Landing Pages', 'AOV Bundle Strategies', 'Post-Purchase Upsells', 'Heatmap Analysis'],
    highlight: '38% CPA Reduction',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'Creative Strategy & Testing',
    description: 'Hypothesis-driven creative iteration frameworks built to combat rapid ad fatigue.',
    icon: Sparkle,
    skills: ['Hook Rate Optimization', 'UGC Creative Direction', 'Video Split-Testing', 'Dynamic Product Ads (DPA)', 'Offer Matrix Mapping', 'Competitor Ad Auditing'],
    highlight: '15+ Angles Tested / Mo',
    colSpan: 'lg:col-span-7',
  },
];

export function SkillsMatrix() {
  return (
    <section id="skills" className="relative py-28 bg-[#080808] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Growth Stack & Tooling
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Validated by Live Commercial Deployments
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className={`${group.colSpan} glass-panel glass-panel-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                        <Icon size={18} weight="light" />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {group.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
                      {group.highlight}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-8 font-normal">
                    {group.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-300 hover:border-white/30 hover:bg-white/[0.07] transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  <span>Standardized Production Workflow</span>
                  <span>Domain 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default SkillsMatrix;
