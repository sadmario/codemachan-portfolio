"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Filter,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageTransition } from "@/components/ui/PageTransition";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "completed";
  created_at: string;
  user_id?: string;
}

export default function AdminMessagesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient();

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      // Fetch from contact_submissions or fallback contact_messages
      const { data, error } = await supabase
        .from("contact_submissions" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // Fallback fetch from contact_messages
        const { data: fallbackData } = await supabase
          .from("contact_messages" as any)
          .select("*")
          .order("created_at", { ascending: false });

        if (fallbackData) {
          const mapped: Submission[] = fallbackData.map((item: any) => ({
            id: item.id,
            name: item.sender_name || "Anonymous",
            email: item.sender_email,
            project_type: item.service || "General Inquiry",
            budget: item.timeline,
            message: item.message,
            status: item.status || "new",
            created_at: item.created_at,
          }));
          setSubmissions(mapped);
        } else {
          setErrorMsg("Could not fetch messages. Verify your Supabase tables.");
        }
      } else if (data) {
        setSubmissions(data as Submission[]);
      }
    } catch (err: any) {
      console.warn("Fetch submissions error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await (supabase as any)
        .from("contact_submissions")
        .update({ status: newStatus })
        .eq("id", id);

      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus as any } : sub))
      );
    } catch (err) {
      console.warn("Status update error:", err);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterStatus === "all") return true;
    return sub.status === filterStatus;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-5xl">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              Back to Account
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-2">
                <MessageSquare size={13} />
                <span>ADMIN MESSAGES DASHBOARD</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
                Received Project Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                View & manage incoming project requests from visitors and clients.
              </p>
            </div>

            <button
              onClick={fetchSubmissions}
              className="btn-ghost-machan text-xs py-2 px-4 flex items-center gap-2"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Filter Status Pills */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
              <Filter size={13} /> Filter:
            </span>
            {["all", "new", "contacted", "in_progress", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold capitalize transition-all ${
                  filterStatus === st
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 mb-6 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Content List */}
          {isLoading ? (
            <div className="text-center py-16 text-slate-400 font-mono text-xs">
              Loading inquiries from Supabase database...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="playground-card p-12 text-center text-slate-400 border-slate-800 space-y-3">
              <MessageSquare size={32} className="mx-auto text-slate-600" />
              <h3 className="text-lg font-bold text-white font-heading">
                No inquiries found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No contact form submissions match the selected filter. Test the contact form on the <Link href="/contact" className="text-violet-400 underline">Contact Page</Link>.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((item) => (
                <div
                  key={item.id}
                  className="playground-card p-6 border-slate-800 relative space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-bold text-white font-heading">
                          {item.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {item.project_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail size={12} className="text-slate-500" /> {item.email}
                        </span>
                        {item.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-slate-500" /> {item.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">STATUS:</span>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-xs font-mono text-violet-300 py-1.5 px-3 rounded-xl cursor-pointer"
                      >
                        <option value="new">New 🟡</option>
                        <option value="contacted">Contacted 🔵</option>
                        <option value="in_progress">In Progress 🟣</option>
                        <option value="completed">Completed 🟢</option>
                      </select>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200 leading-relaxed white-space-pre-wrap font-sans">
                    {item.message}
                  </div>

                  {item.budget && (
                    <div className="text-[11px] font-mono text-slate-400">
                      ⚡ Timeline / Budget: <span className="text-emerald-400 font-semibold">{item.budget}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
