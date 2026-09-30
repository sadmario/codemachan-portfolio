"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { PROFILE } from "@/lib/data";

const SERVICE_OPTIONS = [
  "Student / Capstone Project 🎓",
  "Website / Landing Page 🌐",
  "Full-Stack Web App 📱",
  "Startup MVP 🚀",
  "Portfolio Website 🎨",
  "Backend & API Development ⚙️",
  "Bug Fixing / Urgent Help 🛠️",
];

const TIMELINE_OPTIONS = [
  "🚨 Urgent (< 1 week)",
  "⚡ 1 – 2 weeks",
  "📅 2 – 4 weeks",
  "🛋️ Flexible timeline",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[1],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden" aria-label="Contact section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-4">
            <span>🚀</span>
            <span>Okay, Enough Scrolling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            Got something to <span className="gradient-brand">build?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Drop your project details below. I&apos;ll reply within 12 hours — probably sooner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl">

          {/* Left: Info */}
          <div className="lg:col-span-4 space-y-4">

            {/* Availability Card */}
            <div className="studio-card p-5 border-[#1a1d2e]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 font-mono">{PROFILE.availabilityText}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Taking on university projects, landing pages, and full-stack MVPs this month.
              </p>
              <div className="p-3 bg-[#0a0b10] rounded-xl border border-white/[0.06] text-[11px] font-mono text-slate-400">
                ⚡ Reply time: <span className="text-violet-300 font-semibold">&lt; 12 hours</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="studio-card p-5 border-[#1a1d2e] space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Direct Channels
              </h4>

              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0b10] border border-white/[0.06] hover:border-violet-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">Email</span>
                  <span className="text-xs text-white font-semibold group-hover:text-violet-300 transition-colors">
                    {PROFILE.email}
                  </span>
                </div>
              </a>

              <a
                href={PROFILE.instagramUrl || "https://instagram.com/codemachan"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0b10] border border-white/[0.06] hover:border-pink-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center flex-shrink-0 text-sm">
                  📸
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">Instagram DM</span>
                  <span className="text-xs text-white font-semibold group-hover:text-pink-300 transition-colors">
                    @codemachan
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <div className="studio-card p-7 sm:p-8 border-[#1a1d2e]">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-2xl flex items-center justify-center mx-auto">
                    🎉
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">Message Received!</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out! I&apos;ll reply to{" "}
                    <span className="text-violet-400 font-semibold">{formData.email}</span> within 12 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn-ghost-machan text-xs mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 font-mono uppercase tracking-wider">
                        Your Name / Team
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul or CS-Team"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-machan"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 font-mono uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-machan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 font-mono uppercase tracking-wider">
                        What are we building?
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="input-machan cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0f1117] text-white">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 font-mono uppercase tracking-wider">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="input-machan cursor-pointer"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0f1117] text-white">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1.5 font-mono uppercase tracking-wider">
                      Tell me about your project
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Briefly describe what you need — tech stack, deadline, college requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-machan resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-mono">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-machan w-full py-3.5 font-bold text-sm mt-1"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message →</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
