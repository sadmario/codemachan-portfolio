"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  LogOut,
  Sparkles,
  Edit3,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const { user, profile, isLoading, signOut, refreshProfile } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.name || "");
      setEditTitle(profile.title || "Developer / Student");
      setEditBio(profile.bio || "");
    }
  }, [profile]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-slate-400 font-mono text-xs">
        Authenticating session...
      </div>
    );
  }

  const name = profile?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Machan";
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url;
  const provider = profile?.provider || user.app_metadata?.provider || "email";
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      const { error } = await (supabase as any)
        .from("profiles")
        .upsert({
          user_id: user.id,
          name: editName.trim(),
          title: editTitle.trim(),
          bio: editBio.trim(),
          email: user.email,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        setErrorMsg(error.message);
        setIsSaving(false);
        return;
      }

      await refreshProfile();
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (err: any) {
      setErrorMsg("Failed to save profile updates.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-4xl">
          {/* Top Welcome Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-2">
                <span>ACCOUNT DASHBOARD</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Hey, <span className="gradient-brand">{name}</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Manage your CodeMachan profile & project requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-machan text-xs py-2.5 px-4">
                <Sparkles size={14} />
                <span>Submit New Inquiry</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="btn-ghost-machan text-xs py-2.5 px-4 text-rose-400 hover:text-rose-300"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-4 mb-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-3">
              <CheckCircle2 size={18} />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 mb-8 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-center gap-3">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Card: Main Profile Info */}
            <div className="lg:col-span-7">
              <div className="playground-card p-6 sm:p-8 border-slate-800 relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/30 shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-violet-500/20">
                        {name[0]?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-white font-heading">{name}</h2>
                      <p className="text-xs text-pink-400 font-mono font-semibold">
                        {profile?.title || "CodeMachan Member"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                  >
                    <Edit3 size={13} />
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-slate-800">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input-machan text-xs py-2"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CS Student or Founder"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="input-machan text-xs py-2"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1 font-mono">
                        Short Bio
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us what you're currently building or studying..."
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="input-machan text-xs resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn-machan text-xs py-2.5 px-5"
                    >
                      {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-500 text-[10px] font-mono block mb-0.5">
                          EMAIL ADDRESS
                        </span>
                        <span className="text-slate-200 font-medium truncate block">
                          {user.email}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-500 text-[10px] font-mono block mb-0.5">
                          AUTH PROVIDER
                        </span>
                        <span className="text-violet-300 font-semibold capitalize">
                          {provider}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-500 text-[10px] font-mono block mb-0.5">
                          MEMBER SINCE
                        </span>
                        <span className="text-slate-200 font-medium">{joinedDate}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-500 text-[10px] font-mono block mb-0.5">
                          ACCOUNT ROLE
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {profile?.is_admin ? "Administrator" : "Standard User"}
                        </span>
                      </div>
                    </div>

                    {profile?.bio && (
                      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                        <span className="text-slate-500 font-mono text-[10px] block mb-1">
                          ABOUT YOU
                        </span>
                        <p>{profile.bio}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Card: Quick Actions & Navigation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="playground-card p-6 border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  CodeMachan Features
                </h3>

                <div className="space-y-2.5">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare size={16} className="text-pink-400" />
                      <div>
                        <span className="text-white font-bold block">Start New Inquiry</span>
                        <span className="text-slate-400 text-[10px]">
                          Submit custom web app or project specs
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                  </Link>

                  <Link
                    href="/projects"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      <div>
                        <span className="text-white font-bold block">Explore Shipped Projects</span>
                        <span className="text-slate-400 text-[10px]">
                          Browse templates and live demos
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                  </Link>

                  <Link
                    href="/admin/messages"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <UserIcon size={16} className="text-violet-400" />
                      <div>
                        <span className="text-white font-bold block">Admin Messages Dashboard</span>
                        <span className="text-slate-400 text-[10px]">
                          Manage received contact submissions
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
