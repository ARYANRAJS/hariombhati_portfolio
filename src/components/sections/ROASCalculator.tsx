'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { BorderBeam } from '../ui/BorderBeam';
import { MagneticButton } from '../ui/MagneticButton';

export default function ROASCalculator() {
  const [adSpend, setAdSpend] = useState(100000);
  const [targetRoas, setTargetRoas] = useState(4);

  const AOV = 750;

  const results = useMemo(() => {
    const revenue = adSpend * targetRoas;
    const orders = Math.floor(revenue / AOV);
    const cpa = orders > 0 ? adSpend / orders : 0;

    return { revenue, orders, cpa };
  }, [adSpend, targetRoas]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="calculator" className="py-28 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            ROI & UNIT ECONOMICS SIMULATOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Revenue Projection <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300">Calculator</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Simulate your expected e-commerce returns, target orders, and acquisition cost based on Hariom's verified historical client benchmarks.
          </p>
        </div>

        <SpotlightCard
          spotlightColor="rgba(6, 182, 212, 0.14)"
          className="p-8 sm:p-12 relative"
        >
          <BorderBeam size={280} duration={14} colorFrom="#06b6d4" colorTo="#10b981" />
          
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 relative z-10">
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Monthly Ad Spend</label>
                  <span className="text-lg font-mono font-bold text-white">{formatCurrency(adSpend)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>₹50,000</span>
                  <span>₹5,00,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Target ROAS Multiplier</label>
                  <span className="text-lg font-mono font-bold text-emerald-400">{targetRoas}x</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.25"
                  value={targetRoas}
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>2.0x (Break-even)</span>
                  <span>4.0x (Scaled)</span>
                  <span>8.0x (Hyper-profit)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-gray-400 leading-relaxed font-mono">
                <span className="text-emerald-400 font-semibold">[BENCHMARK]: </span>
                Modamecca apparel achieved 7.25x ROAS; Parshwanath Mart achieved 5.27x ROAS.
              </div>
            </div>

            {/* Results Display */}
            <div className="flex flex-col justify-between rounded-xl bg-black/50 border border-white/[0.08] p-6 sm:p-8">
              <div>
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Projected Gross Revenue</p>
                  <motion.div
                    key={results.revenue}
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl sm:text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"
                  >
                    {formatCurrency(results.revenue)}
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.08]">
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400 mb-1">Orders Driven</p>
                    <motion.div
                      key={results.orders}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-mono font-bold text-white"
                    >
                      {results.orders.toLocaleString('en-IN')}+
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400 mb-1">Estimated CPA</p>
                    <motion.div
                      key={results.cpa}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-mono font-bold text-cyan-400"
                    >
                      {formatCurrency(results.cpa)}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <p className="text-[10px] font-mono text-gray-500 mb-4">
                  *Calculated at ₹{AOV} AOV baseline. Units subject to seasonal inventory & creative stop-rates.
                </p>
                <MagneticButton strength={0.25} className="w-full">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-gray-100 text-gray-950 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Scale My Brand With This Framework
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
