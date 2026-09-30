'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Target, Server, Cpu, TrendingUp, GitFork, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BorderBeam } from '@/components/ui/BorderBeam';

// Dynamic import of 3D Scene (no SSR)
const InteractiveGrowthScene = dynamic(
  () => import('@/components/3d/InteractiveGrowthScene').then((mod) => mod.InteractiveGrowthScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] flex items-center justify-center text-gray-500 font-mono text-xs">
        Initializing 3D Pipeline...
      </div>
    ),
  }
);

const PROCESS_STAGES = [
  {
    id: 0,
    num: '01',
    name: 'Paid Influx',
    sub: 'Meta & Google CBO',
    color: '#06B6D4',
    icon: Target,
    metric: '24k Clicks / Mo',
    title: 'Discovery & Creative Testing',
    desc: 'Deploying dynamic creative testing (DCT) across broad interest stacks. Spend routes to winning hooks with high 3-second stop rates.',
    tools: ['Meta Ads CBO', 'Google PMax', 'Creative Testing', 'Broad Lookalikes'],
  },
  {
    id: 1,
    num: '02',
    name: 'Attribution',
    sub: 'Server-Side CAPI',
    color: '#3B82F6',
    icon: Server,
    metric: '98.4% Match Rate',
    title: 'Tracking & Data Layer',
    desc: 'First-party server-side tracking bypassing iOS14+ cookie loss. Hashed conversion signals sent directly to Meta Pixel & GA4.',
    tools: ['Stape.io Cloud', 'GTM Server-Side', 'Meta CAPI', 'Zero Data Loss'],
  },
  {
    id: 2,
    num: '03',
    name: 'Optimization',
    sub: 'CRO & Bid Caps',
    color: '#A855F7',
    icon: Cpu,
    metric: '-$90 CPA Cut',
    title: 'Funnel & Bid Controls',
    desc: 'Enforcing cost-caps during high-CPM auction spikes while streamlining checkout friction to maximize visitor-to-order velocity.',
    tools: ['Bid Cap Rules', 'Landing Page CRO', 'Cohort Analysis', 'Drop-off Audit'],
  },
  {
    id: 3,
    num: '04',
    name: 'Revenue Compounding',
    sub: 'ROAS & WhatsApp',
    color: '#10B981',
    icon: TrendingUp,
    metric: '7.25x Peak ROAS',
    title: 'Scale & LTV Compounding',
    desc: 'Scaling budget on verified winners while triggering automated post-purchase WhatsApp & email retention flows for repeat orders.',
    tools: ['WhatsApp API', 'Shopify Automation', 'LTV Retention', 'Klaviyo Flows'],
  },
];

export default function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="process" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 mb-4">
              <GitFork className="w-3.5 h-3.5" />
              THE 3D GROWTH PIPELINE • INTERACTIVE ENGINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The 4-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300">Growth Engine</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
            Move your mouse or hover the 3D nodes below to see how raw paid clicks transform into verified, compounded profit.
          </p>
        </div>

        {/* Seamless 3D Visual Animation (No harsh rigid container box!) */}
        <div className="relative mb-8">
          <InteractiveGrowthScene
            activeStage={activeStage}
            onSelectStage={(id) => setActiveStage(id)}
          />
        </div>

        {/* 4 Interactive Synchronized Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STAGES.map((step) => {
            const isActive = activeStage === step.id;
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                onMouseEnter={() => setActiveStage(step.id)}
                className="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <SpotlightCard
                  spotlightColor={`${step.color}1f`}
                  className={`p-6 h-full flex flex-col justify-between transition-all duration-300 relative group ${
                    isActive
                      ? 'border-white/20 bg-[#0e1624] shadow-[0_0_25px_rgba(6,182,212,0.15)] ring-1 ring-white/10'
                      : 'border-white/[0.06] bg-[#090d15]/80 opacity-80 hover:opacity-100'
                  }`}
                >
                  {isActive && (
                    <BorderBeam
                      size={180}
                      duration={8}
                      colorFrom={step.color}
                      colorTo="#ffffff"
                    />
                  )}

                  <div>
                    {/* Header: Icon & Stage Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${step.color}15`,
                          border: `1px solid ${step.color}35`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Metric & Stage Subtitle */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[11px] font-mono font-bold uppercase tracking-wider"
                        style={{ color: step.color }}
                      >
                        {step.metric}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        {step.sub}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                      {step.desc}
                    </p>
                  </div>

                  {/* Tool Badges */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {step.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                        {tool}
                      </span>
                    ))}
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
