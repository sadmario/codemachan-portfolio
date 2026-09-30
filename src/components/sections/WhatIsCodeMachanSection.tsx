"use client";

import { WHAT_IS_CODEMACHAN_ITEMS } from "@/lib/data";

export function WhatIsCodeMachanSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#070707]" aria-label="What is CodeMachan">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono-accent mb-3">
            <span>💡</span>
            <span>THE STUDIO IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight font-heading">
            Okay, so... <span className="gradient-brand">what is CodeMachan?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            CodeMachan is a software development studio focused on turning ideas into useful digital products. We handle design, database architecture, frontend engineering, and cloud deployment so you don&apos;t have to worry about broken code.
          </p>
        </div>

        {/* 6 Outcome Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {WHAT_IS_CODEMACHAN_ITEMS.map((item) => (
            <div
              key={item.id}
              className="studio-card p-6 flex flex-col justify-between group border-slate-800"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <span>{item.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.punchline}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <span>✓ Tested & outcome-focused</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
