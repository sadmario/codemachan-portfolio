"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { PROFILE } from "@/lib/data";

const NAV_LINKS = [
  { label: "Services", href: "/#what-we-build" },
  { label: "Projects", href: "/#projects" },
  { label: "Students", href: "/#student-problems" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#08090e]/90 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-lg shadow-black/30"
            : "bg-transparent py-5"
        }`}
        role="banner"
      >
        <div className="container-custom flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none"
            aria-label="CodeMachan Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-[11px] font-black text-white shadow-sm">
              CM
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white font-heading">
              Code<span className="text-violet-400">Machan</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.07] px-2 py-1.5 rounded-full backdrop-blur-sm"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Availability dot — desktop only */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] font-semibold text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PROFILE.availabilityStatus}</span>
            </div>

            <Link href="/#contact" className="btn-machan text-xs py-2 px-4">
              Start a Project
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0c0d15] border-l border-white/[0.08] transition-transform duration-300 ease-out md:hidden flex flex-col p-6 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.07] mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-[10px] font-black text-white">
              CM
            </div>
            <span className="font-bold text-white text-sm font-heading">CODEMACHAN</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] text-sm font-semibold transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="pt-5 border-t border-white/[0.07] space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400 font-mono px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {PROFILE.availabilityStatus}
          </div>
          <Link
            href="/#contact"
            className="btn-machan w-full justify-center text-sm py-3"
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
