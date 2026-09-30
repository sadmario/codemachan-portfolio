"use client";

import { PROFILE } from "@/lib/data";

export function AboutSection() {
  const highlights = [
    { label: "Currently", value: PROFILE.currently, color: "text-violet-300" },
    { label: "Usually Found", value: PROFILE.usuallyFound, color: "text-sky-300" },
    { label: "Obsessed With", value: PROFILE.currentObsession, color: "text-pink-300" },
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden" aria-label="About CodeMachan">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">

          {/* Left: Avatar Card */}
          <div className="lg:col-span-5">
            <div className="studio-card p-8 border-[#1a1d2e]">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600 via-pink-600 to-sky-400 flex items-center justify-center text-4xl shadow-xl shadow-violet-500/20 mb-6">
                👨‍💻
              </div>

              <h3 className="text-2xl font-bold text-white font-heading">{PROFILE.name}</h3>
              <p className="text-xs text-violet-400 font-mono font-semibold mb-0.5">aka &quot;Machan&quot;</p>
              <p className="text-xs text-slate-500 mb-5">{PROFILE.education} · {PROFILE.institution}</p>

              {/* Status */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl w-fit mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {PROFILE.availabilityStatus}
              </div>

              {/* Quick Stats */}
              <div className="pt-5 border-t border-white/[0.06] space-y-1.5 text-xs text-slate-500 font-mono">
                <div>📍 {PROFILE.location}</div>
                <div>⚡ Studio: CodeMachan</div>
                <div>✉️ {PROFILE.email}</div>
              </div>
            </div>
          </div>

          {/* Right: Story */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="section-label bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4">
                <span>👋</span>
                <span>The Creator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading mb-4">
                Who&apos;s behind <span className="gradient-brand">CodeMachan?</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-2">
                {PROFILE.bio}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {PROFILE.bioExtended}
              </p>
            </div>

            {/* Highlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((h) => (
                <div key={h.label} className="p-4 rounded-2xl bg-[#0f1117] border border-white/[0.07]">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">{h.label}</span>
                  <span className={`text-xs font-bold ${h.color}`}>{h.value}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="p-5 rounded-2xl bg-[#0f1117] border border-violet-500/15">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;You bring the idea. We figure out the code.&rdquo;
              </p>
              <p className="text-xs text-violet-400 font-mono mt-2">— CodeMachan Studio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
