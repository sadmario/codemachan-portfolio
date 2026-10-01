"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageTransition } from "@/components/ui/PageTransition";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${siteUrl}/reset-password`,
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden px-4">
        <div className="w-full max-w-md relative z-10">
          <div className="playground-card p-8 sm:p-10 border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Back Link */}
            <div className="mb-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={13} />
                Back to Sign In
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-xl text-white mx-auto mb-4 shadow-lg shadow-violet-500/20">
                🔑
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-2">
                Forgot Password? 🔑
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Enter your email address to receive a password reset link.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Check your inbox
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  We&apos;ve sent a password reset link to <span className="text-violet-400 font-semibold">{email}</span>. Please check your email inbox and spam folder.
                </p>
                <Link href="/login" className="btn-ghost-machan text-xs inline-block mt-2">
                  Return to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-center gap-2.5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                    Your Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-machan text-xs py-2.5 pl-10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-machan w-full py-3 text-xs font-bold uppercase tracking-wider mt-2"
                >
                  {isLoading ? (
                    <span>Sending reset link...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Reset Link →</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
