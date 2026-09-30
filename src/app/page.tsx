import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { StudentProblemsSection } from "@/components/sections/StudentProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsFaqSection } from "@/components/sections/TestimonialsFaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. What We Build */}
      <ServicesSection />

      {/* 3. Things We've Shipped */}
      <ProjectsGrid />

      {/* 4. Student SOS */}
      <StudentProblemsSection />

      {/* 5. How It Works */}
      <ProcessSection />

      {/* 6. About */}
      <AboutSection />

      {/* 7. Testimonials + FAQ */}
      <TestimonialsFaqSection />

      {/* 8. Contact */}
      <ContactSection />
    </div>
  );
}
