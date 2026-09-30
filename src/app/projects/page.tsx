"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, ArrowRight, Folder, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, CATEGORIES } from "@/lib/data";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono-accent mb-4">
            <span>🕹️</span>
            <span>THE CREATIVE VAULT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-heading">
            Things I&apos;ve <span className="gradient-brand">Built</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Full-stack applications, student platforms, and startup MVPs built with modern code.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md shadow-pink-500/20"
                      : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by tech or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-machan pl-10 text-xs py-2.5"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 max-w-md mx-auto">
            <Folder size={40} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-sm">No projects matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="playground-card p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Header Mockup */}
                  <div className="relative h-44 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden mb-5 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[10px] font-mono font-bold bg-slate-900/90 text-violet-300 px-2.5 py-0.5 rounded-full border border-violet-500/25">
                        {project.category}
                      </span>
                      <span className="text-xl">{project.emoji || "🚀"}</span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-bold text-white text-base line-clamp-1 font-heading group-hover:text-violet-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{project.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Problem & Solution Mini Highlight */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-5 text-[11px] space-y-1">
                    <div className="text-pink-300/90 flex items-start gap-1">
                      <span className="font-bold shrink-0">Problem:</span>
                      <span className="line-clamp-1 text-slate-300">{project.problem}</span>
                    </div>
                    <div className="text-emerald-300/90 flex items-start gap-1">
                      <span className="font-bold shrink-0">Solution:</span>
                      <span className="line-clamp-1 text-slate-300">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 text-[10px] font-mono border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white"
                        aria-label="View source code"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet-400 hover:text-pink-400 transition-colors"
                  >
                    <span>Peek Inside</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
