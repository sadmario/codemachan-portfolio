"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, CATEGORIES } from "@/lib/data";

interface ProjectsGridProps {
  featured?: boolean;
  limit?: number;
  showFilter?: boolean;
}

export function ProjectsGrid({ featured, limit, showFilter = true }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = PROJECTS
    .filter((p) => p.published)
    .filter((p) => (featured ? p.featured : true))
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .slice(0, limit);

  const active = filtered[activeIndex] || filtered[0];

  return (
    <section id="projects" className="py-28 relative overflow-hidden" aria-label="Projects showcase">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="container-custom relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4">
            <span>🕹️</span>
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            Things we&apos;ve <span className="gradient-brand">shipped.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Real projects. Real deadlines. Real results.
          </p>
        </div>

        {/* Category Filter */}
        {showFilter && !featured && (
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => { setActiveCategory(cat.id); setActiveIndex(0); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/20"
                      : "bg-[#0f1117] text-slate-500 border border-white/[0.07] hover:text-white hover:border-white/[0.12]"
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Spotlight */}
        {active && (
          <div className="studio-card border-[#1a1d2e] overflow-hidden mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-12">

              {/* Visual Panel */}
              <div
                className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${active.gradient?.replace("from-", "").replace("to-", "").split(" ").join(", ") || "#1a1d2e"})` }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(135deg, #1a1d2e 0%, transparent 60%)` }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold bg-black/30 backdrop-blur-sm text-violet-300 px-3 py-1.5 rounded-full">
                    {active.category}
                  </span>
                  <span className="text-3xl">{active.emoji || "🚀"}</span>
                </div>
                <div className="relative z-10">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 rounded-full inline-block mb-3">
                    ✓ {active.outcome}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-1">{active.title}</h3>
                  <p className="text-sm text-white/60 font-mono">{active.tagline}</p>
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{active.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3.5 rounded-xl bg-[#0a0b10] border border-white/[0.06] text-xs">
                      <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Problem</span>
                      <span className="text-pink-300">{active.problem}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0a0b10] border border-white/[0.06] text-xs">
                      <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Solution</span>
                      <span className="text-emerald-300">{active.solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {active.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-400 text-[11px] font-mono border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  {active.githubUrl && (
                    <a href={active.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#0f1117] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                      aria-label="Source code">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {active.liveUrl && (
                    <a href={active.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#0f1117] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                      aria-label="Live site">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <Link href={`/projects/${active.slug}`} className="btn-machan text-xs py-2.5 px-5 ml-auto">
                    Full Case Study →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {filtered.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-56 p-4 text-left rounded-2xl border transition-all ${
                activeIndex === idx
                  ? "bg-violet-600/15 border-violet-500/40 shadow-lg shadow-violet-500/10"
                  : "bg-[#0f1117] border-white/[0.07] hover:border-white/[0.12] text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{proj.emoji}</span>
                <span className="text-[10px] font-mono text-violet-300 font-bold">{proj.category}</span>
              </div>
              <h4 className="font-bold text-white text-sm line-clamp-1 font-heading mb-0.5">{proj.title}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{proj.outcome}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
