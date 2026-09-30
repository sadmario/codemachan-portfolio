import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, Zap, Layers, Target, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS } from "@/lib/data";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="container-custom relative z-10 max-w-5xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Things I&apos;ve Built
          </Link>
        </div>

        {/* Hero Header */}
        <div className="playground-card p-8 sm:p-12 mb-12 relative overflow-hidden border-slate-800">
          <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-violet-300 border border-violet-500/30">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Shipped & Tested
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-heading">
              {project.title}
            </h1>
            <p className="text-sm font-mono text-pink-400 font-semibold mb-6">
              {project.tagline}
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-machan text-xs py-3 px-6"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-machan text-xs py-3 px-6"
                >
                  <GithubIcon className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* The Challenge / Problem */}
            <div className="playground-card p-7 border-slate-800">
              <div className="flex items-center gap-2.5 mb-3 text-pink-400 font-bold text-base">
                <span>🎯</span>
                <h2 className="text-lg font-bold text-white font-heading">The Student Challenge / Problem</h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="playground-card p-7 border-slate-800">
              <div className="flex items-center gap-2.5 mb-3 text-violet-400 font-bold text-base">
                <span>⚡</span>
                <h2 className="text-lg font-bold text-white font-heading">The CodeMachan Solution</h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Key Features */}
            <div className="playground-card p-7 border-slate-800">
              <div className="flex items-center gap-2.5 mb-4 text-emerald-400 font-bold text-base">
                <span>🛠️</span>
                <h2 className="text-lg font-bold text-white font-heading">Core Capabilities Built</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="playground-card p-7 border-slate-800">
              <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-bold text-base">
                <span>🏆</span>
                <h2 className="text-lg font-bold text-white font-heading">Outcomes & Impact</h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Tech Specs & CTA */}
          <div className="space-y-6">
            <div className="playground-card p-6 border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 font-heading">Technologies Used</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 text-violet-300 border border-violet-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="playground-card p-6 border-slate-800 bg-gradient-to-br from-violet-950/30 to-slate-900">
              <h3 className="text-base font-bold text-white mb-2 font-heading">Want a similar app built?</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                I can develop a customized solution with this exact stack, tailored for your requirements or university submission.
              </p>
              <Link
                href="/#contact"
                className="btn-machan w-full text-xs py-3"
              >
                Inquire About Similar Project →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
