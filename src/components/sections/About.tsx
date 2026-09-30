'use client';

import { ShieldCheck, ChartLineUp, Lightning } from '@phosphor-icons/react';

export function About() {
  return (
    <section id="about" className="relative py-28 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Lead */}
        <div className="max-w-3xl mb-20">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-4">
            Growth Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            Performance marketing is not creative guesswork. It is applied probability and audience economics.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Most ad accounts burn capital because they optimize for platform vanity metrics instead of net cash contribution. My methodology unifies clean attribution infrastructure with high-velocity creative testing.
          </p>
        </div>

        {/* Core Pillars (3 asymmetric high-contrast cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6">
                <ShieldCheck size={24} weight="light" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                Bulletproof Attribution
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                iOS privacy updates degraded browser pixel tracking. I build server-side GTM containers and direct Meta CAPI integrations with deduplication for 95%+ event match quality.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono uppercase tracking-widest text-neutral-500">
              Zero Signal Loss
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6">
                <ChartLineUp size={24} weight="light" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                Margin-First Scaling
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                ROAS without profit margins is misleading. Every campaign is calibrated against product COGS, payment gateway fees, and shipping costs to ensure every scale phase produces real EBITDA.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono uppercase tracking-widest text-neutral-500">
              Contribution Margin Focus
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6">
                <Lightning size={24} weight="light" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                Systematic Creative Velocity
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Ad fatigue kills campaigns faster than bid changes. I construct rapid testing frameworks across hooks, visual formats, and angles to produce evergreen winning assets.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono uppercase tracking-widest text-neutral-500">
              Continuous Iteration
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default About;
