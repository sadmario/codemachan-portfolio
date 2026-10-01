"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Send, Rocket, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { PageTransition } from "@/components/ui/PageTransition";
import { useAuth } from "@/components/providers/AuthProvider";

const PROJECT_TYPE_OPTIONS = [
  "Student / Capstone Project 🎓",
  "Full-Stack Web App 📱",
  "Website / Landing Page 🌐",
  "Startup MVP 🚀",
  "Portfolio Website 🎨",
  "Backend & API Development ⚙️",
  "Bug Fixing / Urgent Help 🛠️",
];

const BUDGET_OPTIONS = [
  "Flexible / Discussion",
  "₹5,000 – ₹15,000 (Student Starter)",
  "₹15,000 – ₹35,000 (Standard Web App)",
  "₹35,000+ (Full Production SaaS / MVP)",
];

function ContactContent() {
  const searchParams = useSearchParams();
  const preService = searchParams.get("service");
  const preProject = searchParams.get("project");
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: PROJECT_TYPE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.user_metadata?.full_name || user.user_metadata?.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (preService) {
      const match = PROJECT_TYPE_OPTIONS.find((s) => s.toLowerCase().includes(preService.toLowerCase()));
      if (match) setFormData((prev) => ({ ...prev, project_type: match }));
    } else if (preProject) {
      setFormData((prev) => ({
        ...prev,
        message: `Hey Aravint, I'm interested in building something similar to "${preProject}". Here's what I have in mind: `,
      }));
    }
  }, [preService, preProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success || !data.emailSent) {
        const errorText = data.message || data.error || "We received your message, but the email notification failed. Please try again or contact us directly.";
        setErrorMessage(errorText);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please verify your connection or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
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
              Drop your project details below. Submissions notify <span className="text-violet-400 font-semibold">{PROFILE.email}</span> directly.
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
                  Booking slots for this month. Taking on student projects, landing pages, and full-stack MVPs.
                </p>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
                  ⚡ Typical reply time: <span className="text-violet-300 font-semibold">&lt; 12 hours</span>
                </div>
              </div>

              <div className="playground-card p-5 border-slate-800 space-y-3">
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Direct Channels
                </h3>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all text-xs group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-slate-400 text-[10px] block font-mono">Email Direct</span>
                    <span className="text-white font-bold group-hover:text-violet-300 transition-colors truncate block">
                      {PROFILE.email}
                    </span>
                  </div>
                </a>

                <a
                  href={PROFILE.instagramUrl || "https://instagram.com/codemachan"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all text-xs group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center text-sm shrink-0">
                    📸
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-mono">Instagram DM</span>
                    <span className="text-white font-bold group-hover:text-pink-300 transition-colors">
                      @codemachan
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="playground-card p-6 sm:p-7 border-slate-800">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      Message sent successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                      We&apos;ll get back to you soon 🚀! Notification email accepted and sent to <span className="text-violet-400 font-semibold">{PROFILE.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          project_type: PROJECT_TYPE_OPTIONS[0],
                          budget: BUDGET_OPTIONS[0],
                          message: "",
                        });
                      }}
                      className="btn-ghost-machan text-xs mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-start gap-2.5">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                          Your Name / Team *
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
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                          Email Address *
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-machan text-xs py-2.5"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                          Project Type *
                        </label>
                        <select
                          value={formData.project_type}
                          onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                          className="input-machan text-xs py-2.5 cursor-pointer"
                        >
                          {PROJECT_TYPE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0e121a] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                        Target Budget / Timeline (Optional)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="input-machan text-xs py-2.5 cursor-pointer"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0e121a] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                        Tell me about your idea or upcoming deadline *
                      </label>
                      <textarea
                        rows={4}
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
                      className="btn-machan w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-2"
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
      </div>
    </PageTransition>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading inquiry portal...</div>}>
      <ContactContent />
    </Suspense>
  );
}
