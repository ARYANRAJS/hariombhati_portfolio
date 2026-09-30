'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's Build <span className="gradient-text">Something</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to scale your brand? Drop a message and let's discuss your growth strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-3 glass-strong rounded-2xl p-8 border border-[#1F2937]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Name</label>
                  <input required type="text" className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input required type="email" className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Website URL</label>
                  <input type="url" className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Monthly Ad Budget</label>
                  <select className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all appearance-none">
                    <option>&lt;₹1L</option>
                    <option>₹1L-3L</option>
                    <option>₹3L-5L</option>
                    <option>₹5L-10L</option>
                    <option>₹10L+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Message</label>
                <textarea required rows={4} className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all resize-none"></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="https://wa.me/916265966868"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 glass rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="text-white font-medium">Chat on WhatsApp</h4>
                <p className="text-emerald-400 text-sm">Fastest response</p>
              </div>
            </a>

            <div className="p-6 glass rounded-xl border border-[#1F2937] space-y-6">
              <a href="mailto:bhatih038@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#1F2937] text-gray-400 rounded-lg flex items-center justify-center shrink-0 group-hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-200 group-hover:text-cyan-400 transition-colors">bhatih038@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#1F2937] text-gray-400 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-200">+91 6265966868</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-[#1F2937] text-gray-400 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-200">Indore, MP, India <span className="text-xs text-cyan-500 ml-1">(Available Remote)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
