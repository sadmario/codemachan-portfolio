"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STUDENT_PROBLEMS } from "@/lib/data";

export function StudentProblemsSection() {
  return (
    <section className="py-28 relative overflow-hidden" aria-label="Student problems we solve">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-600/5 blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-4">
            <span>🎓</span>
            <span>Student Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            College life has <span className="gradient-brand">enough problems.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Your software project shouldn&apos;t be one of them. We&apos;ve seen it all — and we fix all of it.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {STUDENT_PROBLEMS.map((item) => (
            <div
              key={item.id}
              className="studio-card p-6 flex flex-col gap-4 group border-[#1a1d2e] hover:border-pink-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="text-[10px] font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1.5 font-heading leading-snug">
                  &ldquo;{item.title}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/[0.05] text-xs text-emerald-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                <span>{item.solution}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="studio-card p-7 sm:p-10 border-pink-500/20 bg-gradient-to-r from-pink-950/25 via-[#0f1117] to-violet-950/25">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-1">Yep, we understand.</p>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
                Tell us what you&apos;re building.
              </h4>
              <p className="text-slate-400 text-sm">
                Share your topic, deadline, or existing repo — we&apos;ll take it from there.
              </p>
            </div>
            <Link href="/#contact" className="btn-machan shrink-0 py-3.5 px-8">
              Start a Conversation
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
