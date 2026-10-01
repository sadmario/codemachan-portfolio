import Link from "next/link";
import { Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";

const FOOTER_NAV = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About Aravint", href: "/about" },
    { label: "Contact / Inquire", href: "/contact" },
  ],
  services: [
    { label: "Full-Stack Web Apps", href: "/services" },
    { label: "High-Converting Websites", href: "/services" },
    { label: "Student Capstone Projects", href: "/services" },
    { label: "Startup MVP Prototyping", href: "/services" },
    { label: "Backend & API Development", href: "/services" },
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
    <footer className="border-t border-white/[0.06] bg-[#06070c]/90 backdrop-blur-md py-16 relative z-10" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <img
                src="/logo.png"
                alt="CodeMachan Logo"
                className="w-8.5 h-8.5 rounded-xl object-cover border border-violet-500/30 shadow-md shadow-violet-500/30"
              />
              <span className="font-extrabold text-lg text-white tracking-tight font-heading">
                Code<span className="text-violet-400">Machan</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The friendly software studio founded by <span className="text-white font-semibold">{PROFILE.name}</span>. Building clean, high-performance web applications and capstones.
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
                    className="w-9 h-9 rounded-xl bg-[#0f1117] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/40 transition-all"
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-mono">{link.platform[0]}</span>}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-4">Pages</h4>
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
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-4">Capabilities</h4>
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
          <p>© {year} CodeMachan. Created by {PROFILE.name}.</p>
          <p>Next.js 15 &bull; TypeScript &bull; Supabase</p>
        </div>
      </div>
    </footer>
  );
}
