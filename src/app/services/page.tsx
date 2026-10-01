import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata = {
  title: "Services",
  description: "Websites, web apps, student projects, portfolio sites, MVPs, and backend APIs — built for students and creators.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24">
        {/* Hero */}
        <div className="container-custom max-w-4xl mb-20 px-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-violet-400 mb-4">What I build</p>
          <h1 className="text-5xl sm:text-7xl font-black text-white font-heading tracking-tight leading-[0.95] mb-6">
            What can we<br />
            <span className="gradient-brand">build for you?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Tell me what you&apos;re trying to build. I&apos;ll figure out the technical part.
          </p>
        </div>

        {/* Services — full detail */}
        <div className="container-custom max-w-4xl px-6 space-y-6">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              id={service.slug}
              className="studio-card p-8 sm:p-10 group hover:border-violet-500/25 transition-all scroll-mt-32"
            >
              <div className="flex items-start gap-6 mb-6">
                {/* Number */}
                <span className="text-[11px] font-mono text-slate-700 font-bold tabular-nums shrink-0 pt-1">
                  0{idx + 1}
                </span>
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}30` }}
                >
                  {service.emoji}
                </div>
                {/* Title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h2 className="text-2xl font-bold text-white font-heading group-hover:text-violet-200 transition-colors">
                      {service.title}
                    </h2>
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: `${service.color}12`, color: service.color, border: `1px solid ${service.color}25` }}
                    >
                      {service.tagline}
                    </span>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="ml-[76px] mb-8">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-3">What&apos;s included</p>
                <ul className="space-y-2">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: service.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="ml-[76px]">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                  style={{ color: service.color }}
                >
                  Build this →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="container-custom max-w-4xl px-6 mt-16">
          <div className="studio-card p-10 text-center border-violet-500/20">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
              Not sure what you need?
            </h3>
            <p className="text-slate-400 mb-7 max-w-md mx-auto">
              Just describe your idea. We&apos;ll figure out the rest together.
            </p>
            <Link href="/contact" className="btn-machan">
              Talk to me <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
