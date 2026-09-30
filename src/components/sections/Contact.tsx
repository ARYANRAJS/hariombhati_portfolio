'use client';

import React, { useState } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { EnvelopeSimple, WhatsappLogo, MapPin, DownloadSimple, PaperPlaneTilt } from '@phosphor-icons/react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'Full-time Growth Marketing Role',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Personal Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Let's discuss how I can help your team scale.
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed font-normal mb-10">
                I am currently actively interviewing for full-time Performance Marketing and Growth Specialist roles. I also take on select performance audits for high-potential D2C brands.
              </p>

              {/* Direct Channels */}
              <div className="flex flex-col gap-4 mb-10">
                
                <a
                  href="mailto:bhatih143@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel glass-panel-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                    <EnvelopeSimple size={20} weight="light" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      Personal Email
                    </div>
                    <div className="text-sm font-mono text-white font-semibold">
                      bhatih143@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/916265966868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel glass-panel-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                    <WhatsappLogo size={20} weight="light" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      Direct WhatsApp / Call
                    </div>
                    <div className="text-sm font-mono text-white font-semibold">
                      +91 6265966868
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                    <MapPin size={20} weight="light" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      Location
                    </div>
                    <div className="text-sm font-mono text-white font-semibold">
                      Indore, MP, India (Remote & Hybrid Ready)
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Resume Download */}
            <div>
              <a
                href="/cv.pdf"
                target="_blank"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-white hover:bg-white/[0.08] transition-all"
              >
                <DownloadSimple size={16} />
                <span>Download Hariom Bhati's Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6">
                    <PaperPlaneTilt size={24} weight="bold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Message Sent to Hariom
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8 font-normal">
                    Thank you for reaching out! I will check your note and reply within 24 hours to schedule a conversation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono uppercase tracking-widest text-white border-b border-white pb-1"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                      Send Me a Message
                    </h3>
                    <p className="text-xs text-neutral-400 mb-6">
                      Fill out the details below and I will get back to you directly.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan (Hiring Manager / Founder)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Reason for Contact
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#111111] border border-white/15 focus:border-white text-white text-sm focus:outline-none transition-colors"
                    >
                      <option value="Full-time Growth Marketing Role">Full-time Growth / Performance Role</option>
                      <option value="Ad Account Audit">Free Performance Marketing Audit</option>
                      <option value="Consulting / Freelance Project">Advisory / Growth Consulting</option>
                      <option value="Quick Networking Chat">General Networking / Intro Chat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your brand, current challenges, or role expectations..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <MagneticButton strength={0.2}>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <span>Send Message to Hariom</span>
                      <PaperPlaneTilt size={16} weight="bold" />
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Contact;
