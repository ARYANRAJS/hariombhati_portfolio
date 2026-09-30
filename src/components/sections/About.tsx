'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Certificate, 
  Briefcase, 
  MapPin, 
  CheckCircle,
  GraduationCap
} from '@phosphor-icons/react';

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
      'Executed on-page and off-page SEO across multiple websites, including keyword mapping and link outreach.',
      'Configured GTM conversion tracking events and supported monthly content planning for high-intent queries.',
    ],
  },
];

const CREDENTIALS = [
  {
    title: 'AI-Powered Performance Ads',
    issuer: 'Google Ads Certification',
    period: 'May 2026 – May 2027',
    active: true,
  },
  {
    title: 'Digital Marketing Certified',
    issuer: 'HubSpot Academy',
    period: 'Mar 2026 – Apr 2027',
    active: true,
  },
  {
    title: 'PGDCA (Computer Applications)',
    issuer: 'Makhanlal Chaturvedi National University',
    period: '2021 – 2022',
    active: false,
  },
  {
    title: 'B.Com (Computer Applications)',
    issuer: 'Pragya Sagar Mahavidyalaya',
    period: '2018 – 2021',
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
            Professional Profile
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-6">
            Data-backed performance marketing engineered with precision.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Digital Marketing Specialist with hands-on experience running Meta Ads and Google Ads campaigns focused on lead generation, CPL optimization, and funnel performance across real estate, education, healthcare, and SaaS verticals.
          </p>
        </div>

        {/* 2 Column Main Grid: Portrait + Experience & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Authentic Portrait & Personal Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="relative max-w-[400px] w-full mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-white/15 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              {/* Hariom's Real Portrait */}
              <div className="relative w-full h-[420px] sm:h-[460px] overflow-hidden bg-neutral-900">
                <Image
                  src="/hariom-bhati.jpg"
                  alt="Hariom Bhati - Digital Marketing Specialist"
                  fill
                  priority
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  sizes="(max-width: 1024px) 400px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                
                {/* Floating Location Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                    <MapPin size={14} className="text-white" />
                    <span>Indore, India</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span>Open to Roles</span>
                  </div>
                </div>
              </div>

              {/* Bio summary below photo */}
              <div className="p-6 border-t border-white/[0.08]">
                <h3 className="text-xl font-bold text-white mb-1">Hariom Bhati</h3>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                  Digital Marketing Specialist | Lead Gen & Paid Ads
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Adept at leveraging GA4, Google Tag Manager, and Meta Pixel to deliver verified commercial growth with full-funnel accountability.
                </p>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-neutral-400">
                <Certificate size={16} className="text-white" />
                <span>Verified Credentials & Education</span>
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

            <div className="flex flex-col gap-8">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-3xl p-8 border border-white/10 relative"
                >
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
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
export default About;
