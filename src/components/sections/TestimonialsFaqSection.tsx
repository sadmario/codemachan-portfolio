"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TESTIMONIALS, FAQS } from "@/lib/data";

export function TestimonialsFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-28 relative overflow-hidden" aria-label="Testimonials and FAQ">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="container-custom relative z-10">

        {/* Testimonials */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <div className="section-label bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
              <span>💬</span>
              <span>What People Say</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading mb-3">
              After surviving the{" "}
              <span className="gradient-brand">project deadline.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Real feedback from students who passed their viva and founders who launched their MVPs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="playground-card p-6 flex flex-col justify-between border-[#1a1d2e]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {item.institution}
                    </span>
                    <span className="text-2xl">{item.avatar}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-xs">{item.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.role}</p>
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 font-semibold">{item.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="section-label bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4">
              <span>❓</span>
              <span>FAQ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
              Questions you probably have.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The honest answers to the things everyone wonders about before reaching out.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/[0.07] bg-[#0f1117] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none group"
                  >
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-violet-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-0 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05]">
                      <div className="pt-3">{faq.answer}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
