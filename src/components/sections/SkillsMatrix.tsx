'use client';

import React from 'react';
import { SpotlightCard } from '../ui/SpotlightCard';
import TiltCard3D from '../ui/TiltCard3D';
import GsapTextReveal from '../ui/GsapTextReveal';
import { 
  Cpu, 
  Database,
} from '@phosphor-icons/react';

interface Tool {
  name: string;
  slug?: string;
  category: 'Paid Traffic' | 'Server Telemetry' | 'Automation & n8n' | 'SEO & Inbound' | 'Funnels & CRO' | 'Web & Backend';
  icon?: any;
  proficiency: string;
  description: string;
}

const TOOLS: Tool[] = [
  {
    name: 'Meta Ads Manager',
    slug: 'meta',
    category: 'Paid Traffic',
    proficiency: 'Advantage+ & CBO',
    description: 'Scaling DTC campaigns via automated bid strategies, custom lookalikes, and dynamic creative iteration.',
  },
  {
    name: 'Google Ads',
    slug: 'googleads',
    category: 'Paid Traffic',
    proficiency: 'PMax & Search',
    description: 'High-intent search capture, Google Performance Max feed optimization, and YouTube direct response funnels.',
  },
  {
    name: 'Google Analytics 4',
    slug: 'googleanalytics',
    category: 'Server Telemetry',
    proficiency: 'Custom Funnels',
    description: 'Custom event schemas, conversion path exploration reports, and user-level purchase attribution.',
  },
  {
    name: 'Google Tag Manager',
    slug: 'googletagmanager',
    category: 'Server Telemetry',
    proficiency: 'Server-Side GTM',
    description: 'Container architecture, custom dataLayer variables, consent mode v2, and server-side client containers.',
  },
  {
    name: 'Meta Conversions API',
    slug: 'meta',
    category: 'Server Telemetry',
    proficiency: 'Event Deduplication',
    description: 'Server-to-server CAPI signal routing with external ID deduplication to bypass browser ad blockers.',
  },
  {
    name: 'n8n Workflow Automation',
    slug: 'n8n',
    category: 'Automation & n8n',
    proficiency: 'Workflow Automation',
    description: 'Self-hosted webhook triggers connecting Shopify order events to CRM pipelines and automated ad alerts.',
  },
  {
    name: 'Shopify Plus & Liquid',
    slug: 'shopify',
    category: 'Funnels & CRO',
    proficiency: 'Theme & DataLayer',
    description: 'Custom dataLayer injection, checkout upsells, bundle offer mechanics, and page loading speed optimization.',
  },
  {
    name: 'Semrush',
    slug: 'semrush',
    category: 'SEO & Inbound',
    proficiency: 'Competitive Intel',
    description: 'Commercial keyword gap analysis, SERP feature domination, and technical backlink profile audits.',
  },
  {
    name: 'WordPress & WooCommerce',
    slug: 'wordpress',
    category: 'Web & Backend',
    proficiency: 'Custom CMS & Themes',
    description: 'Building custom WordPress websites, WooCommerce stores, high-converting lead funnels, and Core Web Vitals optimization.',
  },
  {
    name: 'Custom Web Development',
    slug: 'javascript',
    category: 'Web & Backend',
    proficiency: 'HTML, CSS & JS Code',
    description: 'Engineering bespoke, fast-loading web applications and landing pages with clean semantic code, modern CSS, and JavaScript.',
  },
  {
    name: 'Backend & REST APIs',
    slug: 'nodedotjs',
    category: 'Web & Backend',
    proficiency: 'Server & Endpoints',
    description: 'Developing custom server endpoints, REST APIs, server-side data processing, and secure client-server integrations.',
  },
  {
    name: 'Webhooks & Databases',
    icon: Database,
    category: 'Web & Backend',
    proficiency: 'Data Pipelines',
    description: 'Configuring webhook listeners, relational/NoSQL databases, and automated data routing between checkout forms and backend systems.',
  },
];

export function SkillsMatrix() {
  return (
    <section id="skills" className="relative py-28 bg-[#080808] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 mb-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Capabilities & Instrument Stack
            </div>
            <GsapTextReveal as="h2" className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Tools & Technical Growth Stack
            </GsapTextReveal>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 max-w-sm sm:text-right">
            12 Core Tools / Verified Deployments
          </p>
        </div>

        {/* Tools Spotlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => {
            const FallbackIcon = tool.icon;
            return (
              <div key={tool.name}>
                <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                  <SpotlightCard className="p-6 h-full flex flex-col justify-between group">
                    <div>
                      {/* Top Bar with Icon & Tag */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/[0.08] transition-all">
                          {tool.slug ? (
                            <img
                              src={`https://cdn.simpleicons.org/${tool.slug}/ffffff`}
                              alt={tool.name}
                              className="w-5 h-5 transition-transform group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : FallbackIcon ? (
                            <FallbackIcon size={20} weight="light" className="text-white transition-transform group-hover:scale-110" />
                          ) : (
                            <Cpu size={20} weight="light" className="text-white" />
                          )}
                        </div>

                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                          {tool.proficiency}
                        </span>
                      </div>

                      {/* Tool Name & Category */}
                      <h3 className="text-base font-bold text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                        {tool.name}
                      </h3>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
                        {tool.category}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                      <span>Production Ready</span>
                      <span>Verified</span>
                    </div>
                  </SpotlightCard>
                </TiltCard3D>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default SkillsMatrix;
