"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageTransition } from "@/components/ui/PageTransition";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } catch (err: any) {
      setErrorMsg("Failed to update password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden px-4">
        <div className="w-full max-w-md relative z-10">
          <div className="playground-card p-8 sm:p-10 border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-xl text-white mx-auto mb-4 shadow-lg shadow-violet-500/20">
                🔒
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-2">
                Set New Password 🔒
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Choose a strong new password for your account.
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Password Updated!
                </h3>
                <p className="text-xs text-slate-300">
                  Your password has been reset successfully. Redirecting to your account...
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-center gap-2.5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-machan text-xs py-2.5 pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <span>Updating password...</span>
                  ) : (
                    <span>Update Password →</span>
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
