"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { PROFILE } from "@/lib/data";

const STICKY_NOTES = [
  { color: "#fbbf24", bg: "#fef3c7", text: "Deadline: yesterday 💀", label: "STATUS", rotate: "-rotate-2" },
  { color: "#8b5cf6", bg: "#ede9fe", text: "Fix one bug → 3 more appear", label: "REALITY", rotate: "rotate-1" },
  { color: "#34d399", bg: "#d1fae5", text: "Idea approved! 🎉", label: "CONCEPT", rotate: "-rotate-1" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [launched, setLaunched] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden"
      aria-label="CodeMachan Hero"
    >
      {/* Ambient glow that tracks mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[160px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * 80}px), calc(-50% + ${mousePos.y * 60}px))` }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-pink-600/8 blur-[120px] pointer-events-none bottom-0 right-0" />

      <div className="container-custom relative z-10 text-center">

        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold font-mono-accent mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {PROFILE.availabilityStatus}
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto mb-5">
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-black text-white tracking-tight leading-[1.0] font-heading mb-3">
            Got an idea?
          </h1>
          <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
            <span className="gradient-brand">Let&apos;s build the thing.</span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-2 leading-relaxed">
          {PROFILE.supportingText}
        </p>
        <p className="text-xs text-violet-400 font-mono mb-10">
          ✨ {PROFILE.playfulSubtext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link href="/#contact" className="btn-machan py-3.5 px-7">
            <span>Let&apos;s Build It</span>
            <ArrowRight size={15} />
          </Link>
          <Link href="/#projects" className="btn-ghost-machan py-3.5 px-7">
            <Layers size={15} className="text-violet-400" />
            <span>See What We&apos;ve Built</span>
          </Link>
        </div>

        {/* ═══════════════════════════════════════════════════════
            FLOATING WORKSPACE CARD
            ═══════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto">
          <div
            className="studio-card p-5 sm:p-8 border-[#1a1d2e]"
            style={{
              transform: `perspective(1200px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
              transition: "transform 0.25s ease",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="text-[11px] font-mono text-slate-500 ml-2">codemachan-studio</span>
              </div>
              <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
                ● live session
              </span>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">

              {/* Left: Sticky Notes */}
              <div className="md:col-span-4 flex flex-col gap-3 text-left">
                {STICKY_NOTES.map((note, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-transform hover:rotate-0 ${note.rotate}`}
                    style={{ backgroundColor: note.bg }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1 font-mono" style={{ color: note.color }}>
                      {note.label}
                    </span>
                    <span className="text-xs font-bold text-gray-800">{note.text}</span>
                  </div>
                ))}
              </div>

              {/* Center: Code Snippet */}
              <div className="md:col-span-5">
                <div className="bg-[#04040a] rounded-2xl border border-white/[0.06] p-5 text-left shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4 text-[11px]">
                    <span className="font-mono text-slate-300 font-semibold">codemachan.build</span>
                    <span className="font-mono text-emerald-400">● live</span>
                  </div>
                  <div className="font-mono text-xs space-y-2.5 leading-relaxed">
                    <div className="text-slate-500">
                      <span className="text-violet-400">const</span>{" "}
                      <span className="text-sky-300">idea</span>
                      {" = "}
                      <span className="text-amber-300">&quot;your-concept&quot;</span>;
                    </div>
                    <div className="text-slate-500">
                      <span className="text-pink-400">await</span>{" "}
                      <span className="text-violet-400">CodeMachan</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-emerald-400">build</span>
                      <span className="text-slate-400">(idea);</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-emerald-400 text-[11px] font-semibold">✓ deployed to production</span>
                      <span className="inline-block w-1.5 h-3.5 bg-violet-400 rounded-sm opacity-80 animate-[blink-cursor_1s_steps(1)_infinite]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Widgets */}
              <div className="md:col-span-3 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setCoffeeCount(c => c + 1)}
                  className="p-4 rounded-2xl bg-[#0f1117] border border-white/[0.07] text-left hover:border-amber-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl group-hover:scale-125 transition-transform">☕</span>
                    <span className="text-xs font-mono text-amber-400 font-bold">{coffeeCount} cups</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Click to fuel the build</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setLaunched(true); setTimeout(() => setLaunched(false), 2000); }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    launched
                      ? "bg-pink-500/15 border-pink-500/50"
                      : "bg-[#0f1117] border-white/[0.07] hover:border-pink-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xl transition-transform duration-300 ${launched ? "-translate-y-1 translate-x-1" : ""}`}>🚀</span>
                    <span className="text-[10px] font-mono text-pink-400 font-bold">{launched ? "LAUNCHING!" : "ship it"}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Click to go live</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-center">
          {[
            { value: "15+", label: "Projects shipped" },
            { value: "< 12h", label: "Response time" },
            { value: "100%", label: "Deadline respect" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-white font-heading gradient-brand">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
