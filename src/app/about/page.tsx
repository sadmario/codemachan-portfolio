"use client";

import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Laptop,
  Terminal,
  Coffee,
} from "lucide-react";
import { PROFILE } from "@/lib/data";

const VALUES = [
  {
    emoji: "⚡",
    title: "Clean Code That Won't Break at 3 AM",
    description: "Commented, structured, type-safe Next.js + TypeScript code so you or any teammate can easily modify and understand it.",
  },
  {
    emoji: "🛡️",
    title: "Real Security (Not Just Placeholders)",
    description: "Supabase Row-Level Security (RLS) policies, environment secrets, and sanitization built-in from day one.",
  },
  {
    emoji: "🎨",
    title: "Interfaces That Don't Look Like 2004",
    description: "Modern dark mode, responsive mobile layouts, crisp typography, and subtle micro-interactions that impress recruiters and examiners.",
  },
  {
    emoji: "🎓",
    title: "Student Empathy & Viva Walkthroughs",
    description: "I know how stressful college deadlines are. I explain the code logic in plain English so you can ace your presentation.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="container-custom relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono-accent mb-4">
            <span>👋</span>
            <span>WHO&apos;S THIS MACHAN?</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-heading">
            The Student Builder Behind <span className="gradient-brand">CodeMachan</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            3rd-year CS student turning midnight ideas into production-ready software.
          </p>
        </div>

        {/* Bio Card */}
        <div className="playground-card p-8 sm:p-12 mb-16 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-3xl shadow-lg shadow-violet-500/20">
              👨‍💻
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-heading">{PROFILE.name}</h2>
              <p className="text-xs text-violet-400 font-mono font-semibold">{PROFILE.education} • {PROFILE.institution}</p>
            </div>
          </div>

          <p>{PROFILE.bio}</p>
          <p>{PROFILE.bioExtended}</p>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span>☕</span>
              <span>Fueled by cold coffee & curiosity</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span>🟢</span>
              <span>{PROFILE.availabilityText}</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center sm:text-left font-heading">
            How I Build & What I Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((val, idx) => (
              <div key={idx} className="playground-card p-6 border-slate-800">
                <div className="text-3xl mb-3">{val.emoji}</div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-pink-950/40 border border-violet-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2 font-heading">
            Got an idea or urgent university project?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Let&apos;s talk about what you&apos;re building. No corporate nonsense, just direct communication.
          </p>
          <Link href="/contact" className="btn-machan text-xs py-3.5 px-7">
            <Sparkles size={16} />
            Let&apos;s Build It →
          </Link>
        </div>
      </div>
    </div>
  );
}
