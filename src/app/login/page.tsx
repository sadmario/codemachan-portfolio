"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/AuthProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import { GoogleIcon } from "@/components/ui/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("Email or password is incorrect.");
        } else {
          setErrorMsg(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push("/account");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMsg("Google sign-in didn't work. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden px-4">
        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="playground-card p-8 sm:p-10 border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-xl text-white mx-auto mb-4 shadow-lg shadow-violet-500/20">
                👋
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-2">
                Welcome back, Machan 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Your projects are waiting.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3.5 mb-6 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                  Email Address
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

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-300 font-mono">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-mono text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <span>Signing in...</span>
                ) : (
                  <>
                    <LogIn size={14} />
                    <span>Sign In →</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative bg-[#0b0c10] px-3 text-[10px] font-mono text-slate-500 uppercase">
                OR
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-md"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Continue with Google</span>
            </button>

            {/* Footer Link */}
            <p className="text-center text-xs text-slate-400 mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-violet-400 font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
