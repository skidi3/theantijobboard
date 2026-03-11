"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";
import { DotDistortion } from "@/components/DotDistortion";
import { isAdminEmail } from "@/lib/admin";

type Plan = "free" | "list" | "edge" | "concierge";

export default function DropsPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEmail(session.user.email || "");
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

  const isAdmin = isAdminEmail(email);

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

        {/* Admin Section - Only visible to admins */}
        {isAdmin && (
          <div className="mb-8 p-6 bg-neutral-900 border border-neutral-700 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-white">Admin Panel</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/drops/talent"
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-900 rounded-xl text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Talent Pool
              </Link>
              <a
                href="/get-discovered"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 text-white rounded-xl text-sm font-medium hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                View Upload Page
                <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

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
            Live job listings sourced from X, Reddit, Discord, and YC boards. No ghost jobs, no noise. Just quality roles refreshed every few days.
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

        {/* Latest Drop */}
        <p className="text-sm text-white/80 uppercase tracking-wider mb-4">Latest Drop</p>
        <Link
          href="/drops/drop-009"
          className="group relative block bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 mb-8 hover:border-neutral-300 transition-colors"
        >
          {/* New Badge */}
          <span className="absolute -top-3 -right-3 z-20 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            New
          </span>
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
              <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">Tue</span>
              <span className="text-xs text-neutral-400">Mar 10</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $34.5M Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            Autonomous AI execution layer, full-stack onchain financial marketplace, and AI-powered CPG operations. Fresh raises with founder intel and outreach playbooks.
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

        {/* Previous Drops */}
        <p className="text-sm text-white/80 uppercase tracking-wider mb-4">Previous Drops</p>
        <Link
          href="/drops/drop-008"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Fri</span>
              <span className="text-xs text-neutral-400">Mar 6</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $25M Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            AI verification layer for enterprise, semantic engineering platform, and agentic AI for corporate travel. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-007"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Tue</span>
              <span className="text-xs text-neutral-400">Mar 4</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $19.8M Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            DeFi-backed consumer banking with Visa Infinite card, AI agent platform for enterprise marketing, and workflow orchestration for AI deployment. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-006"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Mon</span>
              <span className="text-xs text-neutral-400">Mar 2</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $17.6M+ Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            AI investment advisors for retail, IRL social platform with ML-powered dinners, and RCS gaming marketplace. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-005"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Sat</span>
              <span className="text-xs text-neutral-400">Feb 28</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $16M+ Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            AI credit analysts for banks, DeFi trading terminals, and AI-powered payments reconciliation. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-004"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Thu</span>
              <span className="text-xs text-neutral-400">Feb 26</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $21M+ Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            AI memory infrastructure, agentic voice intelligence, and quantum hardware manufacturing. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-003"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Wed</span>
              <span className="text-xs text-neutral-400">Feb 25</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $24M+ Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            Stablecoin payments, efficiency-focused LLMs, and RegTech compliance. Fresh raises with founder intel and outreach playbooks.
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

        <Link
          href="/drops/drop-002"
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Tue</span>
              <span className="text-xs text-neutral-400">Feb 24</span>
              {!isPaid && (
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
          </div>
          <h3 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3">3 Startups · $16M+ Raised · Scorecards · Playbooks</h3>
          <p className="relative z-10 text-neutral-500 mb-6 max-w-2xl">
            Developer productivity analytics, open-source core banking, and cross-border treasury. Fresh raises with founder intel and outreach playbooks.
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
              <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Wed</span>
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
            Voice AI, chip design, AI interpretability, and human simulation. $2.1B+ total raised with 5 unicorn rounds.
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
