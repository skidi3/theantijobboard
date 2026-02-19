"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";

type Plan = "free" | "list" | "edge" | "concierge";

const premiumDrops = [
  {
    id: "drop-001",
    date: "Feb 18",
    title: "12 Funded Startups · Scorecards · Playbooks",
    description: "Recently funded startups with hiring signals, founder contacts, and outreach playbooks.",
    tag: "Wed",
    startups: 12,
  },
];

const freeDrops = [
  { slug: "500-people", num: "01", title: "Why you're competing with 500 people" },
  { slug: "72-hour-window", num: "02", title: "The 72-hour window" },
  { slug: "50m-no-posts", num: "03", title: "$50M raised, no job posts" },
  { slug: "resume-black-hole", num: "04", title: "The resume black hole" },
  { slug: "timing-advantage", num: "05", title: "Funded last week, hiring next week" },
];

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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src={cdn("/logo.webp")} alt="" className="w-10 h-10" />
          <p className="font-serif text-xl text-white">Your Drops</p>
        </div>

        {/* Premium Drops */}
        <div className="mb-8">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-4 px-1">Latest Drops</p>
          <div className="grid gap-4">
            {premiumDrops.map((drop) => (
              <Link
                key={drop.id}
                href={`/drops/${drop.id}`}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">{drop.tag}</span>
                      <span className="text-xs text-neutral-400">{drop.date}</span>
                    </div>
                    {isPaid ? (
                      <svg className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-neutral-900 mb-2">{drop.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{drop.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {drop.startups} startups
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Hiring signals
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Founder contacts
                    </span>
                  </div>
                </div>
                {!isPaid && (
                  <div className="bg-neutral-50 border-t border-neutral-200 px-6 py-3 flex items-center justify-between">
                    <p className="text-sm text-neutral-500">Upgrade to access this drop</p>
                    <span className="text-sm font-medium text-rose-500">View Plans →</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Free Resources */}
        <div className="mb-8">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-4 px-1">Free Resources</p>
          <div className="grid gap-3">
            {freeDrops.map((item) => (
              <Link
                key={item.slug}
                href={`/drops/${item.slug}`}
                className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4 hover:border-neutral-300 transition-colors group"
              >
                <span className="font-serif text-2xl text-neutral-200 group-hover:text-neutral-300 transition-colors">{item.num}</span>
                <p className="text-neutral-900 flex-1">{item.title}</p>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Concierge Extra */}
        {plan === "concierge" && (
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="font-serif text-lg">Concierge</p>
            </div>
            <p className="text-white/70 text-sm">
              As a Concierge member, you'll also receive personalized matching and direct intros. We'll reach out within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
