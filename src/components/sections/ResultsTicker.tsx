'use client';

import React from 'react';

const METRICS = [
  { value: '7.25x', label: 'PEAK ROAS' },
  { value: '₹4.1L+', label: 'DIRECT REVENUE' },
  { value: '500+', label: 'ORDERS DELIVERED' },
  { value: '#1 RANK', label: 'ORGANIC GOOGLE' },
  { value: '-$90 CPA', label: 'ACQUISITION COST' },
  { value: '95%+', label: 'CAPI MATCH QUALITY' },
  { value: '38%', label: 'CPA REDUCTION' },
  { value: '15+', label: 'CREATIVES TESTED / MO' },
];

export function ResultsTicker() {
  return (
    <section className="relative py-12 bg-[#080808] border-y border-white/[0.08] overflow-hidden select-none">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {METRICS.concat(METRICS).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                {item.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {item.label}
              </span>
              <span className="text-neutral-700 text-lg">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ResultsTicker;
