"use client";

import { ServicesSection } from "@/components/sections/ServicesSection";
import { StudentProblemsSection } from "@/components/sections/StudentProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden">
      <ServicesSection />
      <StudentProblemsSection />
      <ProcessSection />
    </div>
  );
}
