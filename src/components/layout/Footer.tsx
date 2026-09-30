import Link from "next/link";
import { Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";

const FOOTER_NAV = {
  explore: [
    { label: "Services", href: "/#what-we-build" },
    { label: "Projects", href: "/#projects" },
    { label: "Students", href: "/#student-problems" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
  ],
  services: [
    { label: "Websites & Landing Pages", href: "/#what-we-build" },
    { label: "Full-Stack Web Apps", href: "/#what-we-build" },
    { label: "Student Capstone Projects", href: "/#what-we-build" },
    { label: "Startup MVP Prototyping", href: "/#what-we-build" },
    { label: "Backend & API Dev", href: "/#what-we-build" },
  ],
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#06070c] py-16" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-[11px] font-black text-white">
                CM
              </div>
              <span className="font-bold text-base text-white font-heading">
                Code<span className="text-violet-400">Machan</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The friendly software studio for college students, founders, and creators. We build the thing you currently have open in 47 browser tabs.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.url.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="w-8 h-8 rounded-xl bg-[#0f1117] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
                  >
                    {Icon ? <Icon className="w-3.5 h-3.5" /> : <span className="text-xs font-mono">{link.platform[0]}</span>}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {FOOTER_NAV.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <p>© {year} CodeMachan. All rights reserved.</p>
          <p>Made with ☕ + Next.js 15 for students everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
