"use client";

import { PROCESS_STEPS } from "@/lib/data";

export function ProcessSection() {
  return (
    <section id="process" className="py-28 relative overflow-hidden" aria-label="How we work">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4">
            <span>🗺️</span>
            <span>The Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            From idea <span className="gradient-brand">→ internet.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A clear 5-step process designed for speed, clarity, and zero surprises.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-9 left-9 right-9 h-px bg-gradient-to-r from-violet-600/30 via-pink-500/30 to-sky-400/30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className="studio-card p-6 flex flex-col border-[#1a1d2e] group hover:border-violet-500/25 transition-all">
                {/* Step Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/20 flex items-center justify-center">
                    <span className="text-sm font-black text-violet-400 font-mono">{step.number}</span>
                  </div>
                  <span className="text-xl">{step.emoji}</span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 font-heading">{step.stepTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{step.description}</p>

                <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <span>✓</span>
                  <span>{step.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
