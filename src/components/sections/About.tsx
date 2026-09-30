'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import TiltCard3D from '../ui/TiltCard3D';
import GsapTextReveal from '../ui/GsapTextReveal';
import { 
  Certificate, 
  Briefcase, 
  MapPin, 
  CheckCircle,
  GraduationCap,
  ShieldCheck,
  ChartLineUp,
  Lightning,
  ArrowUpRight,
} from '@phosphor-icons/react';

const InteractiveGlobe3D = dynamic(() => import('../3d/InteractiveGlobe3D'), { ssr: false });

const EXPERIENCES = [
  {
    role: 'Digital Marketing Specialist',
    company: 'Freelance / Remote',
    period: 'Jan 2024 – Present',
    status: 'Current',
    highlights: [
      'Planned and managed Meta Ads & Google Ads for 8+ clients across real estate, education, and healthcare.',
      'Optimized for CPL, CTR, and ROAS with data-driven audience segmentation.',
      'Configured Meta Pixel, GTM, and GA4 for conversion tracking and built custom KPI reporting dashboards.',
      'Engineered high-converting landing pages with optimized CTAs and lead capture forms.',
    ],
  },
  {
    role: 'Digital Marketing Executive',
    company: 'Quintus Tech Pvt Ltd, Indore',
    period: 'Oct 2025 – Mar 2026',
    status: 'Completed',
    highlights: [
      'Managed Meta Ads and Google Ads for B2B and B2C clients, conducting audience targeting and A/B ad testing to reduce CPL.',
      'Conducted keyword research and on-page SEO; built and optimized lead capture pages on WordPress.',
    ],
  },
  {
    role: 'Digital Marketing Executive',
    company: 'Vidyalaybox (SaaS Application)',
    period: 'Apr 2025 – Oct 2025',
    status: 'Completed',
    highlights: [
      'Executed programmatic on-page and off-page SEO, achieving #1 organic rank on Google for "best school management bihar".',
      'Configured GTM conversion tracking events and automated monthly inbound lead pipeline.',
    ],
    proofUrl:
      'https://www.google.com/search?q=best+school+management+bihar&oq=best+school+management+bihar&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAjIHCAIQIRiPAtIBCDc3NDRqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8&sei=K_-8aoaPG_aMnesP-5CRwQY',
    proofLabel: 'Verify #1 Google SERP Ranking Proof',
  },
];

const CREDENTIALS = [
  {
    title: 'AI-Powered Performance Ads',
    issuer: 'Google Ads Certification',
    period: 'May 2026 – May 2027',
    type: 'Certification',
    active: true,
  },
  {
    title: 'Digital Marketing Certified',
    issuer: 'HubSpot Academy',
    period: 'Mar 2026 – Apr 2027',
    type: 'Certification',
    active: true,
  },
  {
    title: 'PGDCA (Computer Applications)',
    issuer: 'Makhanlal Chaturvedi National University',
    period: '2021 – 2022',
    type: 'Degree',
    active: false,
  },
  {
    title: 'B.Com (Computer Applications)',
    issuer: 'Pragya Sagar Mahavidyalaya',
    period: '2018 – 2021',
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
            About Me & Career History
          </div>
          <GsapTextReveal as="h2" className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-6">
            Bridging technical data architecture with profitable advertising.
          </GsapTextReveal>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            With a formal background in Computer Applications (B.Com & PGDCA), I approach performance marketing with an engineering mindset. I build first-party server tracking, analyze unit economics, and rapidly test creative angles to scale revenue sustainably.
          </p>
        </div>

        {/* 2 Column Main Grid: Core Advantages + Work Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Advantages & Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              My Technical Edge
            </h3>

            <TiltCard3D maxTilt={6} scale={1.01}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={20} weight="light" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      First-Party Server Tracking
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      I build server-side GTM containers and Meta CAPI pipelines ensuring 95%+ event match quality and zero attribution blindness.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} scale={1.01}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <ChartLineUp size={20} weight="light" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Margin-First Scaling
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      I calculate contribution margins and customer LTV before scaling budget caps, prioritizing real EBITDA over vanity ROAS.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} scale={1.01}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Lightning size={20} weight="light" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      High-Velocity Creative Direction
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      I test 15+ ad creatives every month across different hooks and angles to consistently defeat ad fatigue.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            {/* Certifications Box */}
            <TiltCard3D maxTilt={5} scale={1.01}>
              <div className="glass-panel rounded-2xl p-6 border border-white/10 mt-2">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-neutral-400">
                  <Certificate size={16} className="text-white" />
                  <span>Certifications & Degrees</span>
                </div>
                <div className="flex flex-col gap-3">
                  {CREDENTIALS.map((cred, idx) => (
                    <div key={idx} className="pb-3 border-b border-white/[0.06] last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white tracking-tight">{cred.title}</span>
                        <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">{cred.period}</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">{cred.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard3D>

            {/* Interactive 3D Attribution Core */}
            <div className="mt-2">
              <InteractiveGlobe3D />
            </div>
          </div>

          {/* Right Column: Work Experience Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                  <Briefcase size={16} weight="light" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Work Experience
                </h3>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Verified Career History
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {EXPERIENCES.map((exp, idx) => (
                <TiltCard3D key={idx} maxTilt={4} scale={1.01}>
                  <div className="glass-panel glass-panel-hover rounded-3xl p-8 border border-white/10 relative">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                      <div>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {exp.role}
                        </h4>
                        <p className="text-xs font-mono text-neutral-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-neutral-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Highlights Bullet List */}
                    <ul className="flex flex-col gap-3">
                      {exp.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          <CheckCircle size={16} weight="fill" className="text-white shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Live SERP Proof Link */}
                    {'proofUrl' in exp && exp.proofUrl && (
                      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <a
                          href={exp.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
                        >
                          <span>{'proofLabel' in exp ? exp.proofLabel : 'Verify Google Proof'}</span>
                          <ArrowUpRight size={13} weight="bold" />
                        </a>
                      </div>
                    )}
                  </div>
                </TiltCard3D>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
export default About;
