"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Send, Rocket } from "lucide-react";
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

function ContactContent() {
  const searchParams = useSearchParams();
  const preService = searchParams.get("service");
  const preProject = searchParams.get("project");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[1],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preService) {
      const match = SERVICE_OPTIONS.find((s) => s.toLowerCase().includes(preService.toLowerCase()));
      if (match) setFormData((prev) => ({ ...prev, service: match }));
    } else if (preProject) {
      setFormData((prev) => ({
        ...prev,
        message: `Hey Machan, I'm interested in building something similar to "${preProject}". Here's what I have in mind: `,
      }));
    }
  }, [preService, preProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="container-custom relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono-accent mb-3">
            <Rocket size={13} />
            <span>LET&apos;S BUILD SOMETHING AWESOME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight font-heading">
            Got an idea? <span className="gradient-brand">Let&apos;s build it.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Drop your project details or deadline below. I&apos;ll reply within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="playground-card p-5 border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {PROFILE.availabilityText}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Booking slots for this month. Taking on university projects, landing pages, and full-stack MVPs.
              </p>
              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
                ⚡ Typical reply time: <span className="text-violet-300 font-semibold">&lt; 12 hours</span>
              </div>
            </div>

            <div className="playground-card p-5 border-slate-800 space-y-2.5">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Direct Channels
              </h3>
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all text-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block font-mono">Email</span>
                  <span className="text-white font-bold group-hover:text-violet-300 transition-colors">
                    {PROFILE.email}
                  </span>
                </div>
              </a>

              <a
                href={PROFILE.instagramUrl || "https://instagram.com/codemachan"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all text-xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center text-xs">
                  📸
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block font-mono">Instagram DM</span>
                  <span className="text-white font-bold group-hover:text-pink-300 transition-colors">
                    @codemachan
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="playground-card p-6 sm:p-7 border-slate-800">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    🎉
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Message Received!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out! I&apos;m reviewing your project requirements and will reply to <span className="text-violet-400 font-semibold">{formData.email}</span> within 12 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn-ghost-machan text-xs mt-3"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Your Name / Team
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul or Campus Team"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-machan text-xs py-2.5"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-machan text-xs py-2.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        What are we building?
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="input-machan text-xs py-2.5 cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0e121a] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="input-machan text-xs py-2.5 cursor-pointer"
                      >
                        {TIMELINE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0e121a] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                      Tell me about your idea or upcoming deadline
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what you want to build, tech requirements, or college submission dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-machan text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-machan w-full py-3 text-xs font-bold uppercase tracking-wider mt-1"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Let&apos;s Build It →</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading inquiry portal...</div>}>
      <ContactContent />
    </Suspense>
  );
}
