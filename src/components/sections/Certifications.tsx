'use client';

import { motion } from 'framer-motion';

const CREDENTIALS = [
  {
    title: 'Google Ads AI-Powered Performance Ads Certified',
    institution: 'Google Skillshop',
    date: '2026 - 2027',
    active: true
  },
  {
    title: 'Digital Marketing Certified',
    institution: 'HubSpot Academy',
    date: '2026 - 2027',
    active: true
  },
  {
    title: 'PGDCA (Computer Applications)',
    institution: 'Makhanlal Chaturvedi National University',
    date: 'Completed',
    active: false
  },
  {
    title: 'B.Com (Computer Applications)',
    institution: 'Pragya Sagar Mahavidyalaya',
    date: 'Completed',
    active: false
  }
];

export default function Certifications() {
  return (
    <section id="credentials" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Credentials</span> & Education
          </h2>
          <p className="text-gray-400">Continuous learning to stay ahead of the curve.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-emerald-500/50 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {CREDENTIALS.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Glowing Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] -translate-x-1.5 md:-translate-x-1.5 top-5 z-10" />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass p-6 rounded-xl border border-[#1F2937] hover:border-cyan-500/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-medium text-cyan-400 px-2 py-1 bg-cyan-500/10 rounded-full">
                          {item.date}
                        </span>
                        {item.active && (
                          <span className="text-xs font-medium text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-full flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.institution}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
