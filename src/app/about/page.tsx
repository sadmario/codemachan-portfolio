"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Heart,
} from "lucide-react";
import { PROFILE } from "@/lib/data";
import { PageTransition } from "@/components/ui/PageTransition";

const VALUES = [
  {
    icon: "⚡",
    title: "Clean, Maintainable Code",
    description: "Commented, structured Next.js + TypeScript codebase so you or your examiners can read and understand every line.",
  },
  {
    icon: "🛡️",
    title: "Production-Grade Security",
    description: "Supabase Row-Level Security (RLS), sanitized API endpoints, and environment key protection by default.",
  },
  {
    icon: "🎨",
    title: "Modern Interactive UI",
    description: "Sleek dark mode, responsive layouts, dynamic animations, and clean typography that leaves a lasting impression.",
  },
  {
    icon: "🎓",
    title: "Student-Friendly Guidance",
    description: "Code logic explained in plain English with complete documentation so you can confidently present your project.",
  },
];

const SKILLS = [
  "Next.js / React",
  "TypeScript",
  "Node.js / Express",
  "Supabase / PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "REST APIs & Webhooks",
  "Git & Vercel Deployment",
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono-accent mb-4">
              <span>👋</span>
              <span>BEHIND THE CODE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-heading">
              Meet <span className="gradient-brand">{PROFILE.name}</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              {PROFILE.role} • Turning ideas into high-performance web software.
            </p>
          </div>

          {/* Bio Card */}
          <div className="playground-card p-8 sm:p-12 mb-16 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed border-slate-800 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-3xl shadow-lg shadow-violet-500/20 shrink-0">
                👨‍💻
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{PROFILE.name}</h2>
                <p className="text-xs sm:text-sm text-pink-400 font-mono font-semibold">
                  {PROFILE.role} • {PROFILE.brandName}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>{PROFILE.bio}</p>
              <p>{PROFILE.bioExtended}</p>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300">{PROFILE.availabilityText}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <span>📍</span>
                <span>Chennai, India</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <span>💻</span>
                <span>Full-Stack Development</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center sm:text-left font-heading">
              Tech Stack & Tooling
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="playground-card p-4 border-slate-800/80 text-center font-mono text-xs font-semibold text-slate-200 hover:text-violet-300 transition-colors"
                >
                  {skill}
                </div>
              ))}
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
                  <div className="text-3xl mb-3">{val.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2 font-heading">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-pink-950/40 border border-violet-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
              Have a project or deadline coming up?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              Let&apos;s talk about what you&apos;re building. Direct communication, transparent execution.
            </p>
            <Link href="/contact" className="btn-machan text-xs py-3.5 px-7">
              <Sparkles size={16} />
              Start a Conversation →
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
