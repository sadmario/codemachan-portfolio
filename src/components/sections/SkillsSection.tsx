"use client";

import { useState } from "react";
import { SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG = {
  frontend: { label: "Frontend", color: "#6366f1", emoji: "🎨" },
  backend: { label: "Backend", color: "#10b981", emoji: "⚙️" },
  tools: { label: "Tools & DevOps", color: "#f59e0b", emoji: "🛠️" },
  design: { label: "Design", color: "#ec4899", emoji: "✏️" },
  other: { label: "Other", color: "#94a3b8", emoji: "📦" },
};

type Category = keyof typeof CATEGORY_CONFIG;

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<Category>("frontend");
  const categories = [...new Set(SKILLS.map((s) => s.category))] as Category[];
  const activeSkills = SKILLS.filter((s) => s.category === activeTab);
  const config = CATEGORY_CONFIG[activeTab];

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Skills section">
      <div className="holo-orb w-[400px] h-[400px] bg-indigo-600/12 top-[10%] right-[-5%]" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">— Technical Skills</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            My Tech{" "}
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Tab selectors */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Skill categories">
          {categories.map((cat) => {
            const conf = CATEGORY_CONFIG[cat];
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  isActive
                    ? "text-white border"
                    : "glass text-white/50 border border-white/[0.07] hover:text-white/80"
                )}
                style={
                  isActive
                    ? {
                        backgroundColor: `${conf.color}20`,
                        borderColor: `${conf.color}50`,
                        color: conf.color,
                      }
                    : undefined
                }
              >
                <span>{conf.emoji}</span>
                {conf.label}
              </button>
            );
          })}
        </div>

        {/* Skills cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {activeSkills.map((skill) => (
            <div
              key={skill.id}
              className="card p-5 text-center group"
              style={{ "--skill-color": skill.color } as React.CSSProperties}
            >
              {/* Skill circle */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke={skill.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - skill.proficiency / 100)}`}
                    opacity="0.8"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: skill.color }}>
                    {skill.proficiency}%
                  </span>
                </div>
              </div>

              <h4 className="font-semibold text-white text-sm">{skill.name}</h4>

              {/* Bar */}
              <div className="skill-bar mt-3">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: `${skill.proficiency}%`,
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* All skills pill cloud */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-white/60 mb-6">All Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {SKILLS.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1.5 glass rounded-full text-xs font-medium text-white/55 border border-white/[0.07] hover:text-white/90 hover:border-white/20 transition-all duration-200 cursor-default"
                style={{ borderColor: `${skill.color}20` }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
