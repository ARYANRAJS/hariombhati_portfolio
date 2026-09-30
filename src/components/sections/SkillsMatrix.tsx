'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, MessageSquare, Layers, Search, Layout, Settings, Link as LinkIcon, Cpu } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

const CATEGORIES = ['All', 'Paid Ads', 'Tracking & Data', 'Automation & n8n', 'SEO', 'CRO'];

const TOOLS = [
  { name: 'Meta Ads', slug: 'meta', category: 'Paid Ads', iconType: 'simple', description: 'Advanced campaign structure & CBO' },
  { name: 'Google Ads', slug: 'googleads', category: 'Paid Ads', iconType: 'simple', description: 'Search, Display, Performance Max' },
  { name: 'Funnel Economics', slug: '', category: 'Paid Ads', iconType: 'lucide', icon: Layers, description: 'LTV, CAC, Margin Analysis' },
  { name: 'GA4', slug: 'googleanalytics', category: 'Tracking & Data', iconType: 'simple', description: 'Event tracking & reporting' },
  { name: 'GTM', slug: 'googletagmanager', category: 'Tracking & Data', iconType: 'simple', description: 'Custom tags & triggers' },
  { name: 'Shopify', slug: 'shopify', category: 'Tracking & Data', iconType: 'simple', description: 'Data layer implementation' },
  { name: 'Stape', slug: '', category: 'Tracking & Data', iconType: 'lucide', icon: Server, description: 'Server-side tracking' },
  { name: 'n8n', slug: 'n8n', category: 'Automation & n8n', iconType: 'simple', description: 'Workflow automation' },
  { name: 'HubSpot', slug: 'hubspot', category: 'Automation & n8n', iconType: 'simple', description: 'CRM & marketing automation' },
  { name: 'AiSensy', slug: '', category: 'Automation & n8n', iconType: 'lucide', icon: MessageSquare, description: 'WhatsApp Business API' },
  { name: 'Webhooks', slug: '', category: 'Automation & n8n', iconType: 'lucide', icon: LinkIcon, description: 'API integrations' },
  { name: 'Semrush', slug: 'semrush', category: 'SEO', iconType: 'simple', description: 'Keyword & competitor research' },
  { name: 'WordPress', slug: 'wordpress', category: 'SEO', iconType: 'simple', description: 'Technical SEO setup' },
  { name: 'On-page', slug: '', category: 'SEO', iconType: 'lucide', icon: Search, description: 'Content optimization' },
  { name: 'Landing Pages', slug: '', category: 'CRO', iconType: 'lucide', icon: Layout, description: 'High-converting design' },
  { name: 'UX Audits', slug: '', category: 'CRO', iconType: 'lucide', icon: Settings, description: 'User experience optimization' },
];

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredTools = TOOLS.filter(
    tool => activeTab === 'All' || tool.category === activeTab
  );

  return (
    <section id="skills" className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              SYSTEM ARCHITECTURE • STACK
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Skills & Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300">Stack</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
            The complete instrument stack deployed to drive acquisition, configure server-side attribution, and automate post-click pipelines.
          </p>
        </div>

        {/* 21st.dev style Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                activeTab === category
                  ? 'bg-white text-gray-950 shadow-[0_0_20px_rgba(255,255,255,0.3)] font-semibold'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid with SpotlightCard */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTools.map(tool => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(6, 182, 212, 0.12)"
                  className="p-5 h-full flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all">
                      {tool.iconType === 'simple' ? (
                        <img
                          src={`https://cdn.simpleicons.org/${tool.slug}/06B6D4`}
                          alt={tool.name}
                          className="w-5 h-5 transition-transform group-hover:scale-110"
                        />
                      ) : tool.icon ? (
                        <tool.icon className="w-5 h-5 text-cyan-400 transition-transform group-hover:scale-110" />
                      ) : null}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm tracking-tight">{tool.name}</h3>
                      <span className="text-[10px] font-mono text-cyan-400/90 uppercase">{tool.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{tool.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
