"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, CATEGORIES } from "@/lib/data";
import { PageTransition } from "@/components/ui/PageTransition";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = PROJECTS.filter((p) =>
    activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6">
        {/* Hero */}
        <div className="container-custom max-w-5xl mb-16">
          <p className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-4">Portfolio</p>
          <h1 className="text-5xl sm:text-7xl font-black text-white font-heading tracking-tight leading-[0.95] mb-5">
            Things we&apos;ve<br />
            <span className="gradient-brand">shipped.</span>
          </h1>
          <p className="text-slate-400 text-lg">Real projects. Real problems. Real builds.</p>
        </div>

        {/* Category Filters */}
        <div className="container-custom max-w-5xl mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.07] hover:border-white/[0.14]"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container-custom max-w-5xl">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-500">
              <p className="text-lg">No projects in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured Project — Large Card */}
              {featured && (
                <Link
                  href={`/projects/${featured.slug}`}
                  className="group studio-card block mb-6 overflow-hidden hover:border-violet-500/30"
                >
                  <div className="p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
                    {/* Emoji visual */}
                    <div
                      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shrink-0 bg-gradient-to-br ${featured.gradient}`}
                    >
                      {featured.emoji}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-3">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          ⭐ Featured
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.07]">
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading group-hover:text-violet-300 transition-colors mb-2">
                        {featured.title}
                      </h2>
                      <p className="text-slate-400 mb-5 leading-relaxed">{featured.shortDescription}</p>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featured.tech.slice(0, 4).map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-500 text-xs font-mono border border-white/[0.06]">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-400 group-hover:text-pink-400 transition-colors">
                          View case study <ArrowRight size={14} />
                        </span>
                        <div className="flex gap-2">
                          {featured.githubUrl && (
                            <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="GitHub">
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {featured.liveUrl && (
                            <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Live demo">
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of Projects — Horizontal Cards */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rest.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="group studio-card p-7 flex flex-col gap-5 hover:border-violet-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${project.gradient} opacity-80`}>
                          {project.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-mono text-slate-600">{project.category}</span>
                            {project.status === "in_progress" && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                In Progress
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-white font-heading group-hover:text-violet-300 transition-colors leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">{project.tagline}</p>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">{project.shortDescription}</p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                        <div className="flex gap-1.5">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.03] text-slate-600 border border-white/[0.05]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-violet-400 group-hover:text-pink-400 transition-colors flex items-center gap-1">
                          View <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <div className="container-custom max-w-5xl mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">Want something like this?</p>
          <Link href="/contact" className="btn-machan">
            Start a Project <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
