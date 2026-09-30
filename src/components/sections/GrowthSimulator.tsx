'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Calculator, 
  TrendUp, 
  CurrencyInr, 
  Target, 
  Sparkle, 
  ArrowRight,
  ShieldCheck,
  WhatsappLogo
} from '@phosphor-icons/react';

interface IndustryPreset {
  name: string;
  category: string;
  baselineRoas: number;
  scaledRoas: number;
  cpaReduction: string;
  protocol: string;
  recommendedTools: string[];
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    name: 'Fashion & Apparel D2C',
    category: 'E-Commerce',
    baselineRoas: 3.2,
    scaledRoas: 6.8,
    cpaReduction: '38%',
    protocol: 'Meta Advantage+ Catalog + High-velocity hook testing (15+ angles/mo) + WhatsApp checkout.',
    recommendedTools: ['Meta Advantage+', 'Shopify CAPI', 'Klaviyo SMS', 'GA4 E-com'],
  },
  {
    name: 'Home & Kitchen Essentials',
    category: 'Retail & FMCG',
    baselineRoas: 2.8,
    scaledRoas: 5.2,
    cpaReduction: '34%',
    protocol: 'Click-to-WhatsApp direct buying + bundle offer architecture to drive immediate AOV increase.',
    recommendedTools: ['WhatsApp Business API', 'Meta CAPI', 'GTM Server-Side'],
  },
  {
    name: 'EdTech & B2B SaaS',
    category: 'Lead Gen & Inbound',
    baselineRoas: 3.5,
    scaledRoas: 6.0,
    cpaReduction: '45%',
    protocol: 'High-intent Google Search capture + Programmatic SEO content funnels + Retargeting nurture.',
    recommendedTools: ['Google Search Ads', 'HubSpot CRM', 'LeadSquared', 'GA4 Funnels'],
  },
  {
    name: 'Real Estate & High-Ticket',
    category: 'Services',
    baselineRoas: 3.0,
    scaledRoas: 5.5,
    cpaReduction: '40%',
    protocol: 'Pre-qualified lead capture forms with OTP verification + Instant sales rep routing via CRM.',
    recommendedTools: ['Meta Lead Gen', 'Zapier Automation', 'Custom GA4 Telemetry'],
  },
];

export function GrowthSimulator() {
  const [adSpend, setAdSpend] = useState<number>(150000);
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [roasMultiplier, setRoasMultiplier] = useState<number>(5.5);

  const revenueRef = useRef<HTMLDivElement>(null);
  const profitRef = useRef<HTMLDivElement>(null);

  const preset = INDUSTRY_PRESETS[selectedIndustry];

  const projectedRevenue = Math.round(adSpend * roasMultiplier);
  const projectedProfit = Math.round(projectedRevenue - adSpend);

  // GSAP animated number transitions when slider or preset changes
  useEffect(() => {
    if (revenueRef.current) {
      gsap.fromTo(
        revenueRef.current,
        { scale: 0.96, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
      );
    }
  }, [projectedRevenue]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi Hariom, I ran your Portfolio Growth Simulator with a monthly ad budget of ${formatINR(
      adSpend
    )} in ${preset.name} targeting ${roasMultiplier.toFixed(1)}x ROAS. Let's discuss an audit for my account.`;
    return `https://wa.me/916265966868?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="simulator" className="relative bg-[#090909] py-28 border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              <Calculator size={14} className="text-white" />
              <span>Interactive ROI Modeler</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Simulate Your Revenue Scale
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 max-w-sm">
            Drag the sliders to project how Hariom's 5.5x–7.25x ROAS playbooks scale your unit economics.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left 6 cols) */}
          <div className="lg:col-span-6 bg-[#111111] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            {/* Step 1: Select Industry Preset */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                01 / Choose Your Vertical
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {INDUSTRY_PRESETS.map((item, idx) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSelectedIndustry(idx);
                      setRoasMultiplier(item.scaledRoas);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedIndustry === idx
                        ? 'bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-neutral-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-70 mb-1">
                      {item.category}
                    </div>
                    <div className="text-xs truncate">{item.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Monthly Ad Spend Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  02 / Monthly Media Budget
                </label>
                <span className="font-mono text-base sm:text-lg font-bold text-white">
                  {formatINR(adSpend)}
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="1000000"
                step="10000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                <span>₹30K / Mo</span>
                <span>₹5 Lakh / Mo</span>
                <span>₹10 Lakh / Mo</span>
              </div>
            </div>

            {/* Step 3: Target ROAS Multiplier Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  03 / Target ROAS
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-white">
                    {roasMultiplier.toFixed(1)}x
                  </span>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 px-2 py-0.5 rounded-full border border-white/15 bg-white/[0.04]">
                    Peak: 7.25x
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="2.5"
                max="7.5"
                step="0.1"
                value={roasMultiplier}
                onChange={(e) => setRoasMultiplier(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                <span>2.5x (Baseline)</span>
                <span>5.0x (Optimal)</span>
                <span>7.5x (Peak Scale)</span>
              </div>
            </div>

          </div>

          {/* Output Card (Right 6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#161616] to-[#0f0f0f] rounded-3xl p-8 sm:p-10 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between">
            <div>
              {/* Output Header */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkle size={16} weight="fill" className="text-white animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                    Projected Scaling Forecast
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400">
                  CPA Drop: <span className="text-white font-bold">~{preset.cpaReduction}</span>
                </div>
              </div>

              {/* Big Projected Revenue Callout */}
              <div className="mb-8">
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Estimated Gross Sales Revenue
                </div>
                <div
                  ref={revenueRef}
                  className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-white tracking-tight"
                >
                  {formatINR(projectedRevenue)}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-2">
                  <span>Gross Return on Media Spend:</span>
                  <span className="text-white font-bold">+{formatINR(projectedProfit)} Profit Pool</span>
                </div>
              </div>

              {/* Hariom's Strategy Protocol */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-8">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-white" />
                  <span>Hariom's Execution Architecture for {preset.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                  {preset.protocol}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {preset.recommendedTools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/[0.08]">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Simulate On WhatsApp</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.08] text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span>Book Audit</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default GrowthSimulator;
