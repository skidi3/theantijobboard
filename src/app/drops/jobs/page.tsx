"use client";

import { useEffect, useState } from "react";
import { cdn } from "@/lib/cdn";
import Link from "next/link";
import { Tweet } from "react-tweet";
import { DotDistortion } from "@/components/DotDistortion";

type Plan = "free" | "list" | "edge" | "concierge";
type Category = "all" | "tech" | "product" | "design" | "marketing" | "operations" | "vc" | "other";

interface HiringTweet {
  id: string;
  tweet_url: string;
  company: string;
  roles: string;
  category: Category;
  why_included: string;
}

interface Job {
  id: string;
  rank: number;
  company: string;
  roles: string;
  funding: string;
  location: string;
  source: string;
  careers_link: string;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tech", label: "Tech" },
  { value: "product", label: "Product" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "vc", label: "VC" },
  { value: "other", label: "Other" },
];

// Extract tweet ID from URL
function getTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

export default function SevenDayListPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<HiringTweet[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [tweetsLoading, setTweetsLoading] = useState(true);

  // Jobsheet state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsTotal, setJobsTotal] = useState(0);
  const [jobsLoading, setJobsLoading] = useState(true);

  // View toggle
  const [activeView, setActiveView] = useState<"social" | "jobsheet">("jobsheet");

  // Fetch tweets from API (server enforces plan limits)
  const fetchTweets = async (category: Category, bypass?: string) => {
    setTweetsLoading(true);
    try {
      const url = bypass
        ? `/api/hiring-tweets?category=${category}&_=${bypass}`
        : `/api/hiring-tweets?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setTweets(data.tweets || []);
      setTotalCount(data.total || 0);
      if (data.plan) {
        setPlan(data.plan as Plan);
      }
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
    }
    setTweetsLoading(false);
  };

  // Fetch jobs from API
  const fetchJobs = async (bypass?: string) => {
    setJobsLoading(true);
    try {
      const url = bypass ? `/api/jobsheet?_=${bypass}` : `/api/jobsheet`;
      const res = await fetch(url);
      const data = await res.json();
      setJobs(data.jobs || []);
      setJobsTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
    setJobsLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bypass = params.get("_") || undefined;

    // API handles auth and plan detection
    Promise.all([
      fetchTweets("all", bypass),
      fetchJobs(bypass)
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(window.location.search);
    const bypass = params.get("_") || undefined;
    fetchTweets(category, bypass);
  };

  const hasMoreLocked = totalCount > tweets.length;

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/drops"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to drops</span>
        </Link>

        {/* Header Card */}
        <div className="relative rounded-2xl overflow-hidden bg-white border border-neutral-200 p-6 md:p-8 mb-8">
          <DotDistortion
            dotColor="rgba(251, 113, 133, 0.6)"
            dotSize={1}
            dotSpacing={14}
            distortionStrength={20}
            distortionRadius={100}
          />
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src={cdn("/logo.webp")} alt="" className="w-6 h-6" />
              <span className="text-sm text-neutral-500">The Anti Job Board presents</span>
            </div>
            {plan !== "free" && (
              <span className="text-xs bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full capitalize">{plan}</span>
            )}
          </div>
          <h1 className="relative z-10 font-serif text-3xl sm:text-4xl text-neutral-900 mb-3 leading-tight">
            The Disposable Job Board
          </h1>
          <p className="relative z-10 text-neutral-500 text-lg mb-6">
            Real hiring posts from founders. Refreshed every 48 hours. No ghost listings.
          </p>

          {/* View Toggle */}
          <div className="relative z-10 flex gap-2 p-1 bg-neutral-100 rounded-full w-fit">
            <button
              onClick={() => setActiveView("jobsheet")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeView === "jobsheet"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Jobsheet
            </button>
            <button
              onClick={() => setActiveView("social")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeView === "social"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Social Feed
            </button>
          </div>
        </div>

        {/* Hiring Feed Card */}
        {activeView === "social" && (
        <>
        <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200 mb-8">
          {/* Card Header */}
          <div className="p-6 md:p-8 border-b border-neutral-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <p className="text-xs uppercase tracking-widest text-neutral-400">Live Hiring Feed</p>
              </div>
              <span className="text-sm font-medium text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full">
                {totalCount} posts
              </span>
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">Fresh from the trenches</h2>
            <p className="text-neutral-500 text-sm mb-4">X, Reddit, YC, tier-1 VCs, and the deepest corners of the internet.</p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Pain point callout */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex gap-3">
                <img src={cdn("/logo.webp")} alt="" className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-neutral-900 font-medium mb-1">Skip the 1,247 applicant queue.</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    These posts get buried in hours. We surface them fresh, before the ATS flood.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Content */}
          <div className="p-4 md:p-6 space-y-4">
            {tweetsLoading ? (
              // Loading skeleton - show 3 placeholders
              [1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-rose-50 border border-rose-100 p-6 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-200 shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-rose-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-rose-100 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-rose-100 rounded" />
                    <div className="h-4 w-full bg-rose-100 rounded" />
                    <div className="h-4 w-3/4 bg-rose-200 rounded" />
                  </div>
                </div>
              ))
            ) : tweets.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                No posts found for this category.
              </div>
            ) : (
              tweets.map((tweet) => {
                const tweetId = getTweetId(tweet.tweet_url);

                if (!tweetId) {
                  return (
                    <div key={tweet.id} className="rounded-xl bg-neutral-50 border border-neutral-100 p-6 text-center text-neutral-500">
                      Invalid tweet URL
                    </div>
                  );
                }

                return (
                  <div key={tweet.id} className="flex justify-center [&>div]:!my-0" data-theme="light">
                    <Tweet id={tweetId} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upgrade CTA - blurred placeholder for social feed */}
        {hasMoreLocked && (plan === "free" || plan === "list") && (
          <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200 p-6 mb-8">
            <div className="relative">
              <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-neutral-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-neutral-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-neutral-100 rounded" />
                  <div className="h-4 w-full bg-neutral-100 rounded" />
                  <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <div className="text-center">
                  <p className="text-neutral-900 font-medium mb-1">+{totalCount - tweets.length} more posts</p>
                  <Link
                    href="/#pricing"
                    className="text-rose-500 text-sm font-medium hover:text-rose-600 transition-colors"
                  >
                    {plan === "free" ? "Upgrade to unlock →" : "Upgrade to Edge →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
        )}

        {/* Jobsheet Table */}
        {activeView === "jobsheet" && (
        <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200 mb-8">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full" />
                <p className="text-xs uppercase tracking-widest text-neutral-400">Curated List</p>
              </div>
              <span className="text-sm font-medium text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full">
                {jobsTotal} startups
              </span>
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-2">The Startup Jobsheet</h2>
            <p className="text-neutral-500 text-sm mb-6">Recently funded startups actively hiring. Sorted by funding.</p>

            <div className="overflow-x-auto">
              {jobsLoading ? (
                <div className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto" />
                </div>
              ) : (
                <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className="text-left py-3 pl-0 pr-4 font-medium text-neutral-500 whitespace-nowrap">#</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-500 whitespace-nowrap">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-500 whitespace-nowrap">Role(s)</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-500 whitespace-nowrap">Funding</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-500 whitespace-nowrap">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-500 whitespace-nowrap">Source</th>
                    <th className="text-left py-3 pl-4 pr-0 font-medium text-neutral-500 whitespace-nowrap">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr
                      key={job.id}
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-neutral-50/50"
                      }`}
                    >
                      <td className="py-3 pl-0 pr-4 text-neutral-400 whitespace-nowrap">{job.rank}</td>
                      <td className="py-3 px-4 font-medium text-neutral-900 whitespace-nowrap">{job.company}</td>
                      <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">{job.roles}</td>
                      <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700">
                          {job.funding}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">{job.location}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-600">
                          {job.source}
                        </span>
                      </td>
                      <td className="py-3 pl-4 pr-0 whitespace-nowrap">
                        <a
                          href={job.careers_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-500 hover:text-rose-600 font-medium"
                        >
                          Apply →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>

          {/* Upgrade CTA for jobsheet */}
          {jobsTotal > jobs.length && (plan === "free" || plan === "list") && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50">
              <div className="flex items-center justify-between">
                <p className="text-neutral-600 text-sm">
                  <span className="font-medium text-neutral-900">+{jobsTotal - jobs.length} more startups</span> available
                </p>
                <Link
                  href="/#pricing"
                  className="text-rose-500 text-sm font-medium hover:text-rose-600 transition-colors"
                >
                  {plan === "free" ? "Upgrade to unlock →" : "Upgrade to Edge →"}
                </Link>
              </div>
            </div>
          )}
        </div>
        )}

        {/* Footer */}
        <div className="pt-8 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <span className="text-white/90 [text-shadow:_0_0_10px_rgba(0,0,0,0.5)]">The Anti Job Board</span>
          </div>
          <span className="text-white/90 [text-shadow:_0_0_10px_rgba(0,0,0,0.5)]">Updated Feb 21</span>
        </div>
      </div>
    </main>
  );
}
