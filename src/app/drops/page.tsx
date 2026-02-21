"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";
import { DotDistortion } from "@/components/DotDistortion";

type Plan = "free" | "list" | "edge" | "concierge";

export default function DropsPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("plan")
          .eq("id", session.user.id)
          .single();
        if (data) {
          setPlan(data.plan as Plan);
        }
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  const isPaid = plan === "list" || plan === "edge" || plan === "concierge";

  return (
    <div
      className="min-h-screen p-6 lg:p-10 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">Welcome back</h1>
          <p className="text-xl text-white/70">Here's what's fresh for you today.</p>
        </div>

        {/* Disposable Job Board Card */}
        <Link
          href="/drops/jobs"
          className="group relative block bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 mb-8 hover:border-neutral-300 transition-colors overflow-hidden"
        >
          <DotDistortion
            dotColor="rgba(251, 113, 133, 0.6)"
            dotSize={1}
            dotSpacing={14}
            distortionStrength={20}
            distortionRadius={100}
          />
          <div className="relative z-10 flex items-center gap-2 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-6 h-6" />
            <span className="text-sm text-neutral-500">The Anti Job Board presents</span>
            <span className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full ml-auto">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <h2 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">The Disposable Job Board</h2>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            Live job listings sourced from X, Reddit, Discord, and YC boards. No ghost jobs, no noise—just quality roles refreshed every few days.
          </p>
          <div className="relative z-10 flex flex-wrap gap-3 mb-6">
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Social Feed</span>
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">100+ Startups</span>
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Refreshes 2-3 days</span>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-neutral-900 group-hover:gap-3 transition-all">
            <span>Browse roles</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </Link>

        {/* This Week's Drop */}
        <p className="text-sm text-white/80 uppercase tracking-wider mb-4">This Week's Drop</p>
        <Link
          href="/drops/drop-001"
          className="group relative block bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 mb-8 hover:border-neutral-300 transition-colors overflow-hidden"
        >
          <DotDistortion
            dotColor="rgba(251, 113, 133, 0.6)"
            dotSize={1}
            dotSpacing={14}
            distortionStrength={20}
            distortionRadius={100}
          />
          <div className="relative z-10 flex items-center gap-2 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-6 h-6" />
            <span className="text-sm text-neutral-500">Premium Drop</span>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">Wed</span>
              <span className="text-xs text-neutral-400">Feb 18</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">12 Funded Startups · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            In-depth analysis of recently funded startups. Hiring likelihood, warm outreach templates, and cold DMs tailored to your role.
          </p>
          <div className="relative z-10 flex flex-wrap gap-3 mb-6">
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Hiring Signals</span>
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Founder Contacts</span>
            <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Outreach Playbooks</span>
          </div>
          {isPaid ? (
            <div className="relative z-10 flex items-center gap-2 text-neutral-900 group-hover:gap-3 transition-all">
              <span>View drop</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          ) : (
            <span className="relative z-10 text-rose-500 border-b border-rose-500 pb-0.5">Upgrade to access</span>
          )}
        </Link>

        {/* Quick Stats for paid users */}
        {isPaid && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 text-center">
              <p className="font-serif text-3xl text-neutral-900">100+</p>
              <p className="text-sm text-neutral-500">Startups hiring rn</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 text-center">
              <p className="font-serif text-3xl text-neutral-900">2-3</p>
              <p className="text-sm text-neutral-500">Day refresh</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 text-center">
              <p className="font-serif text-3xl text-neutral-900">12</p>
              <p className="text-sm text-neutral-500">Startups deep dive</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 text-center">
              <p className="font-serif text-3xl text-rose-500">Live</p>
              <p className="text-sm text-neutral-500">Status</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
