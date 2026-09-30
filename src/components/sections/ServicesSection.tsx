"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/data";

export function ServicesSection() {
  return (
    <section id="what-we-build" className="py-28 relative overflow-hidden" aria-label="Services section">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container-custom relative z-10">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-4">
            <span>🛠️</span>
            <span>What We Build</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            From idea to{" "}
            <span className="gradient-brand">shipped product.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Websites, web apps, student projects, startup MVPs — we handle the full build so you can focus on what matters.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="studio-card p-7 flex flex-col justify-between group border-[#1a1d2e]"
            >
              <div>
                {/* Icon + Tag */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm flex-shrink-0"
                    style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}30` }}
                  >
                    {service.emoji}
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{ backgroundColor: `${service.color}12`, color: service.color, border: `1px solid ${service.color}25` }}
                  >
                    {service.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-violet-300 transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                {/* Deliverables */}
                <div className="space-y-1.5">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all duration-200"
                  style={{ color: service.color }}
                >
                  Request This Build
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 studio-card p-7 sm:p-9 border-violet-500/20 bg-gradient-to-r from-violet-950/30 via-[#0f1117] to-pink-950/20 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-1">Not sure what you need?</p>
            <h4 className="text-xl font-bold text-white font-heading">Just describe your idea — we&apos;ll figure out the rest.</h4>
          </div>
          <Link href="/#contact" className="btn-machan shrink-0">
            Talk to Us
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
