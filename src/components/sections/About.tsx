'use client';

import React from 'react';
import { 
  GraduationCap, 
  Certificate, 
  ShieldCheck, 
  ChartLineUp, 
  Lightning,
  MapPin
} from '@phosphor-icons/react';

const CREDENTIALS = [
  {
    title: 'Google Ads AI-Powered Performance Ads Certified',
    issuer: 'Google Skillshop',
    period: '2026 - 2027',
    type: 'Certification',
    active: true,
  },
  {
    title: 'Digital Marketing Certified',
    issuer: 'HubSpot Academy',
    period: '2026 - 2027',
    type: 'Certification',
    active: true,
  },
  {
    title: 'PGDCA (Post Graduate Diploma in Computer Applications)',
    issuer: 'Makhanlal Chaturvedi National University',
    period: 'Completed',
    type: 'Degree',
    active: false,
  },
  {
    title: 'B.Com (Computer Applications)',
    issuer: 'Pragya Sagar Mahavidyalaya',
    period: 'Completed',
    type: 'Degree',
    active: false,
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
            About Hariom Bhati
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            I bridge the gap between technical data architecture and profitable creative advertising.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            With a background in Computer Applications (B.Com & PGDCA), I approach performance marketing with an engineer's mindset. Rather than relying on guesswork, I build first-party server tracking, analyze unit economics, and rapidly test creative angles to scale revenue sustainably.
          </p>
        </div>

        {/* 2 Column Layout: Personal Edge + Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: What I Bring to Your Team */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              My Core Advantages
            </h3>

            <div className="glass-panel glass-panel-hover rounded-2xl p-7 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <ShieldCheck size={22} weight="light" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Technical Server-Side Tracking
                  </h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Most marketers rely on failing browser pixels. I personally build server-side GTM containers, Stape cloud proxies, and Meta CAPI pipelines to ensure 95%+ event match quality and zero attribution blindness.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover rounded-2xl p-7 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <ChartLineUp size={22} weight="light" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Margin-First Financial Modeling
                  </h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    I calculate contribution margins, shipping costs, and customer LTV before setting budget caps. I treat your ad spend as an investment portfolio where the primary KPI is net bottom-line cash.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover rounded-2xl p-7 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <Lightning size={22} weight="light" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    High-Velocity Creative Direction
                  </h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    I run structured testing cycles testing 15+ ad creatives every month across different hooks, formats, and value propositions to consistently defeat ad fatigue.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-3 pt-4 text-xs font-mono text-neutral-400">
              <MapPin size={16} className="text-white" />
              <span>Based in Indore, MP, India / Available for On-Site, Hybrid, and Global Remote Roles</span>
            </div>
          </div>

          {/* Right Column: Credentials & Education */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-tight mb-2 flex items-center gap-2">
              <Certificate size={20} className="text-white" />
              <span>Certifications & Education</span>
            </h3>

            <div className="flex flex-col gap-4">
              {CREDENTIALS.map((cred, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
                      {cred.type}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {cred.period}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight mb-1">
                    {cred.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400">
                    {cred.issuer}
                  </p>
                </div>
              ))}
            </div>

            {/* Work Status Box */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-white">
                  Current Status
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Actively interviewing for full-time Growth Marketing / Performance Marketing roles and taking on select strategic growth audits.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default About;
