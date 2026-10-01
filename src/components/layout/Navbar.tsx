"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, User as UserIcon, LogOut, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, profile, signOut, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const displayName = profile?.name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Machan";
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-xl shadow-black/40"
            : "bg-black/20 backdrop-blur-md py-5"
        }`}
        role="banner"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group select-none" aria-label="CodeMachan Home">
            <img
              src="/logo.png"
              alt="CodeMachan Logo"
              className="w-8.5 h-8.5 rounded-xl object-cover border border-violet-500/30 shadow-md shadow-violet-500/30"
            />
            <span className="font-bold text-[15px] tracking-tight text-white font-heading">
              Code<span className="text-violet-400">Machan</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/[0.08] rounded-full"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side Auth & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-violet-500/40 transition-all text-xs text-white"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-6 h-6 rounded-full object-cover border border-violet-500/30"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[11px]">
                          {displayName[0].toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium max-w-[100px] truncate">{displayName}</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0f1118]/95 border border-slate-800 backdrop-blur-2xl shadow-2xl p-2 z-50 text-xs"
                        >
                          <div className="p-3 border-b border-slate-800/80">
                            <p className="font-bold text-white truncate">{displayName}</p>
                            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                          </div>

                          <div className="py-1">
                            <Link
                              href="/account"
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/15 transition-colors"
                            >
                              <UserIcon size={14} className="text-violet-400" />
                              <span>My Account</span>
                            </Link>

                            <Link
                              href="/admin/messages"
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/15 transition-colors"
                            >
                              <Shield size={14} className="text-pink-400" />
                              <span>Admin Messages</span>
                            </Link>
                          </div>

                          <div className="pt-1 border-t border-slate-800/80">
                            <button
                              onClick={() => signOut()}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                            >
                              <LogOut size={14} />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link href="/signup" className="btn-machan text-xs py-2 px-4">
                      Get Started
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/[0.1] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#07080d]/95 backdrop-blur-xl md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <img
                  src="/logo.png"
                  alt="CodeMachan Logo"
                  className="w-8 h-8 rounded-xl object-cover border border-violet-500/30 shadow-md shadow-violet-500/30"
                />
                <span className="font-bold text-[15px] text-white font-heading">
                  Code<span className="text-violet-400">Machan</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-400 flex items-center justify-center"
              >
                <X size={17} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3.5 px-4 rounded-2xl text-xl font-bold font-heading transition-all ${
                        isActive(link.href)
                          ? "text-white bg-white/[0.07]"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="w-2 h-2 rounded-full bg-violet-400" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile Footer Auth */}
            <div className="p-6 border-t border-white/[0.06] space-y-3">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold text-xs"
                  >
                    <span>My Account ({displayName})</span>
                    <UserIcon size={14} className="text-violet-400" />
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost-machan justify-center text-xs py-3"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-machan justify-center text-xs py-3"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
