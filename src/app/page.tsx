import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROFILE, SERVICES, PROJECTS, STUDENT_PROBLEMS } from "@/lib/data";
import { PageTransition } from "@/components/ui/PageTransition";

// ─── Hero Section ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6" aria-label="Hero">
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300 text-[11px] font-semibold font-mono mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          HEY, I&apos;M ARAVINT 👋
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl sm:text-8xl lg:text-[96px] font-black text-white tracking-tight leading-[0.95] font-heading mb-4">
          Got an idea?
        </h1>
        <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading mb-8">
          <span className="gradient-brand">Let&apos;s build the thing.</span>
        </div>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-3 leading-relaxed">
          Websites, apps, student projects and startup ideas — turned into products that actually work.
        </p>
        <p className="text-sm text-violet-400/80 font-mono mb-12">
          Yes, even that idea currently living in your Notes app.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-machan py-4 px-8 text-base">
            Start a Project
            <ArrowRight size={16} />
          </Link>
          <Link href="/projects" className="btn-ghost-machan py-4 px-8 text-base">
            Explore Projects
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-violet-500/40" />
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ─── What We Do (3 services teaser) ───────────────────────────────────────
const FEATURED_SERVICES = SERVICES.slice(0, 4);

function WhatWeDo() {
  return (
    <section className="py-24 px-6" aria-label="Services overview">
      <div className="container-custom max-w-5xl">
        <div className="mb-14">
          <p className="text-[11px] font-mono uppercase tracking-widest text-violet-400 mb-3">What I build</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
            What can we build?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURED_SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.slug}`}
              className="group studio-card p-8 hover:border-violet-500/30 flex flex-col gap-4 transition-all"
            >
              <div className="text-3xl">{service.emoji}</div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-violet-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.shortDescription}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-auto" style={{ color: service.color }}>
                Learn more <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/services" className="btn-ghost-machan">
            View all services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Selected Projects (3 featured) ──────────────────────────────────────
const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured).slice(0, 3);

function SelectedProjects() {
  return (
    <section className="py-24 px-6" aria-label="Featured projects">
      <div className="container-custom max-w-5xl">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-3">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-heading">
              Things we&apos;ve built.
            </h2>
          </div>
          <Link href="/projects" className="btn-ghost-machan text-sm">
            See all projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          {FEATURED_PROJECTS.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group studio-card p-6 sm:p-8 flex items-center justify-between gap-6 hover:border-violet-500/20"
            >
              <div className="flex items-center gap-5 min-w-0">
                {/* Number */}
                <span className="text-[11px] font-mono text-slate-600 font-bold shrink-0 tabular-nums">
                  0{i + 1}
                </span>
                {/* Emoji */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${project.gradient} opacity-80`}
                >
                  {project.emoji}
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-violet-300 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 truncate">{project.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:block text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-slate-500">
                  {project.category}
                </span>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-violet-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Student Section Teaser ────────────────────────────────────────────────
const STUDENT_TEASERS = STUDENT_PROBLEMS.slice(0, 3);

function StudentTeaser() {
  return (
    <section className="py-24 px-6" aria-label="Student section">
      <div className="container-custom max-w-5xl">
        <div className="studio-card p-10 sm:p-14 border-violet-500/20 overflow-hidden relative">
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <p className="text-[11px] font-mono uppercase tracking-widest text-violet-400 mb-4">For students</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-3">
            College life has enough problems.
          </h2>
          <p className="text-slate-400 text-base mb-10 max-w-lg">
            Your software project shouldn&apos;t be one of them.
          </p>

          <div className="space-y-3 mb-10">
            {STUDENT_TEASERS.map((problem) => (
              <div key={problem.id} className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="text-xl">{problem.emoji}</span>
                <span>{problem.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <span>...</span>
              <span>and more</span>
            </div>
          </div>

          <Link href="/students" className="btn-machan">
            See student solutions <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── About Preview ─────────────────────────────────────────────────────────
function AboutPreview() {
  return (
    <section className="py-24 px-6" aria-label="About preview">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start gap-10">
          <div className="flex-1">
            <p className="text-[11px] font-mono uppercase tracking-widest text-pink-400 mb-4">Behind the build</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">
              Who&apos;s behind CodeMachan?
            </h2>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/20">
                👨‍💻
              </div>
              <div>
                <p className="text-white font-bold text-lg font-heading">{PROFILE.name}</p>
                <p className="text-violet-400 text-sm font-mono">{PROFILE.role}</p>
              </div>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-lg">
              {PROFILE.bio}
            </p>
            <Link href="/about" className="btn-ghost-machan">
              Meet {PROFILE.firstName} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 sm:max-w-xs space-y-3">
            {[
              { label: "Currently building", value: PROFILE.currently, emoji: "🔨" },
              { label: "Usually found with", value: PROFILE.usuallyFound, emoji: "💻" },
              { label: "Obsessed with", value: PROFILE.currentObsession, emoji: "⚡" },
            ].map((item) => (
              <div key={item.label} className="playground-card p-4 flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.emoji}</span>
                <div>
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-slate-300 font-medium mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 px-6" aria-label="Call to action">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight mb-4">
          Got something<br className="hidden sm:block" /> to build?
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          Let&apos;s turn the idea into something real.
        </p>
        <Link href="/contact" className="btn-machan py-4 px-8 text-base">
          Start a Project
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <WhatWeDo />
        <SelectedProjects />
        <StudentTeaser />
        <AboutPreview />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
