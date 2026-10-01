'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { MagneticButton } from '../ui/MagneticButton';
import {
  EnvelopeSimple,
  WhatsappLogo,
  MapPin,
  DownloadSimple,
  PaperPlaneTilt,
  CircleNotch,
  CheckCircle,
  WarningCircle,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

// Credentials provided for direct message dispatch
const SERVICE_ID = 'service_q41r5uk';
const TEMPLATE_ID = 'template_bu6r8da';
const PUBLIC_KEY = 'Oe3dtBvOH1vud1uDV';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSent, setLastSent] = useState<{ name: string; email: string; phone: string; roleType: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleType: 'Full-time Growth Marketing Role',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || PUBLIC_KEY;

    setStatus('sending');

    try {
      // Build a comprehensive, formatted inquiry dossier in the message parameter.
      // This ensures 100% of lead data (Phone, Email, Reason, Name, Message)
      // appears in Hariom's Gmail even if the EmailJS template only outputs {{message}}.
      const enrichedMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📩 NEW INQUIRY DOSSIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 SENDER NAME     : ${formData.name}
📞 PHONE / WHATSAPP: ${formData.phone}
📧 EMAIL ADDRESS   : ${formData.email}
🎯 REASON / ROLE   : ${formData.roleType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 CLIENT MESSAGE:
${formData.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

      const templateParams = {
        from_name: formData.name,
        name: formData.name,
        from_email: formData.email,
        email: formData.email,
        reply_to: formData.email,
        phone: formData.phone,
        phone_number: formData.phone,
        mobile: formData.phone,
        contact_number: formData.phone,
        role_type: formData.roleType,
        reason: formData.roleType,
        subject: `[Portfolio Inquiry] ${formData.roleType} from ${formData.name}`,
        message: enrichedMessage,
        raw_message: formData.message,
        to_name: 'Hariom Bhati',
      };

      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (res.status === 200 || res.text === 'OK') {
        setLastSent({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          roleType: formData.roleType,
        });
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roleType: 'Full-time Growth Marketing Role',
          message: '',
        });
      } else {
        throw new Error(`Dispatch failed with status ${res.status}`);
      }
    } catch (err: unknown) {
      console.error('Message transmission error:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to deliver message right now. Please reach out directly via WhatsApp or personal email below.'
      );
    }
  };

  const mailtoFallback = `mailto:bhatih143@gmail.com?subject=${encodeURIComponent(
    `[Portfolio] ${formData.roleType} - ${formData.name || 'New Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRole / Inquiry: ${formData.roleType}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="relative py-28 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Personal Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available For Hire
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Let's discuss how I can help your team scale.
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed font-normal mb-10">
                I am actively interviewing for full-time Performance Marketing and Growth Specialist roles. I also take on select performance audits for high-potential D2C brands.
              </p>

              {/* Direct Channels */}
              <div className="flex flex-col gap-4 mb-10">
                
                <a
                  href="mailto:bhatih143@gmail.com"
                  className="group flex items-center gap-4 p-4 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 border border-white/10 hover:border-white/25"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] group-hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-white transition-colors">
                    <EnvelopeSimple size={20} weight="light" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      Personal Email
                    </div>
                    <div className="text-sm font-mono text-white font-semibold group-hover:text-neutral-200">
                      bhatih143@gmail.com
                    </div>
                  </div>
                  <ArrowSquareOut size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://wa.me/916265966868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 border border-white/10 hover:border-white/25"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] group-hover:bg-emerald-500/20 border border-white/10 group-hover:border-emerald-500/40 flex items-center justify-center text-white group-hover:text-emerald-400 transition-colors">
                    <WhatsappLogo size={20} weight="light" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      Direct WhatsApp / Call
                    </div>
                    <div className="text-sm font-mono text-white font-semibold group-hover:text-emerald-400 transition-colors">
                      +91 6265966868
                    </div>
                  </div>
                  <ArrowSquareOut size={16} className="text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10">
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
                href={getAssetPath('/cv.pdf')}
                download="Hariom_Bhati_Resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-white hover:bg-white/[0.08] transition-all group"
              >
                <DownloadSimple size={16} className="group-hover:translate-y-0.5 transition-transform" />
                <span>Download Hariom Bhati's Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative">
              {status === 'success' ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <CheckCircle size={32} weight="bold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Message Delivered to Hariom!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 font-normal leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{lastSent?.name}</span>. Your inquiry regarding{' '}
                    <span className="text-white font-mono text-xs">{lastSent?.roleType}</span> has been dispatched directly to Hariom's primary inbox (<span className="text-white font-mono text-xs">bhatih143@gmail.com</span>). Hariom will connect with you via{' '}
                    <span className="text-white font-mono text-xs">{lastSent?.phone}</span> or <span className="text-white font-mono text-xs">{lastSent?.email}</span>.
                  </p>
                  <p className="text-xs text-neutral-400 mb-8">
                    Hariom typically responds within 24 hours. A copy has been logged.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white text-xs font-mono uppercase tracking-widest text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <span>Send Another Note</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Send Me a Direct Message
                      </h3>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Direct Delivery
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Dispatched instantly to Hariom Bhati's personal Gmail inbox.
                    </p>
                  </div>

                  {/* Error Banner */}
                  {status === 'error' && errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex flex-col gap-3">
                      <div className="flex items-start gap-2.5">
                        <WarningCircle size={18} weight="fill" className="text-red-400 shrink-0 mt-0.5" />
                        <div className="flex-1 leading-relaxed">
                          {errorMessage}
                        </div>
                      </div>

                      {/* Direct Mailto Emergency Fallback */}
                      <div className="flex items-center justify-between pt-1 border-t border-red-500/20">
                        <span className="text-[11px] text-neutral-400">Prefer standard mail?</span>
                        <a
                          href={mailtoFallback}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-white underline hover:text-neutral-300"
                        >
                          <span>Open in Gmail / Mail Client</span>
                          <ArrowSquareOut size={12} />
                        </a>
                      </div>
                    </div>
                  )}

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
                      disabled={status === 'sending'}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        disabled={status === 'sending'}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={status === 'sending'}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                      Reason for Contact
                    </label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      disabled={status === 'sending'}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#111111] border border-white/15 focus:border-white text-white text-sm focus:outline-none transition-colors disabled:opacity-50"
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
                      placeholder="Tell me about your brand, current challenges, target ROAS, or role requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'sending'}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/15 focus:border-white text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="w-full">
                    <MagneticButton strength={status === 'sending' ? 0 : 0.2} className="w-full">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {status === 'sending' ? (
                          <>
                            <CircleNotch size={16} className="animate-spin text-black" />
                            <span>Transmitting Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message to Hariom</span>
                            <PaperPlaneTilt size={16} weight="bold" />
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Direct Inbox Transmission
                    </span>
                    <span>Average response &lt; 24h</span>
                  </div>
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
