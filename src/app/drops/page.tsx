"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";

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

  const getHeadline = () => {
    if (isPaid) return "First batch dropping tonight";
    return "Mini drops coming soon";
  };

  const getDescription = () => {
    if (isPaid) return "8 recently funded startups with hiring signals, founder contacts, and outreach playbooks.";
    return "We're working on mini drops for free users. A few startups each week to get you started.";
  };

  const getNoticeText = () => {
    if (isPaid) return { title: "Check back tonight", subtitle: "We'll also send you an email when it's ready" };
    return { title: "We'll notify you", subtitle: "When mini drops are ready for free users" };
  };

  const notice = getNoticeText();

  return (
    <div
      className="min-h-screen p-6 lg:p-10 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header with greeting */}
            <div className="flex items-center gap-3 mb-12 md:mb-8">
              <img src={cdn("/logo.webp")} alt="" className="w-10 h-10" />
              <p className="font-serif text-xl text-neutral-900">Welcome back</p>
            </div>

            {/* Hero section with scattered cards */}
            <div className="relative mb-12 md:mb-8 flex items-center justify-center min-h-[220px]">
              {/* Scattered startup cards */}
              <div className="absolute inset-0">
                {/* Desktop cards */}
                {[
                  { name: "Anthropic", logo: "https://cdn.brandfetch.io/anthropic.com/w/512/h/512/symbol", role: "Senior Engineer", top: "0%", left: "0%", rotate: -6 },
                  { name: "Stripe", logo: "https://cdn.brandfetch.io/stripe.com/w/512/h/512/icon", role: "Product Designer", top: "10%", right: "5%", rotate: 4 },
                  { name: "Linear", logo: "https://cdn.brandfetch.io/linear.app/w/512/h/512/symbol", role: "Full Stack", bottom: "0%", left: "10%", rotate: 5 },
                  { name: "OpenAI", logo: "https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol", role: "Research Engineer", bottom: "5%", right: "0%", rotate: -4 },
                ].map((startup) => (
                  <div
                    key={startup.name}
                    className="absolute bg-white/95 backdrop-blur-sm shadow-md border border-neutral-200 rounded-xl p-2.5 hidden md:block"
                    style={{
                      top: startup.top,
                      left: startup.left,
                      right: startup.right,
                      bottom: startup.bottom,
                      transform: `rotate(${startup.rotate}deg)`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs text-neutral-900 truncate">{startup.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{startup.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Mobile cards - with more gap */}
                {[
                  { name: "Anthropic", logo: "https://cdn.brandfetch.io/anthropic.com/w/512/h/512/symbol", role: "Senior Engineer", top: "-8%", left: "-8%", rotate: -6 },
                  { name: "Stripe", logo: "https://cdn.brandfetch.io/stripe.com/w/512/h/512/icon", role: "Product Designer", top: "0%", right: "-8%", rotate: 4 },
                  { name: "Linear", logo: "https://cdn.brandfetch.io/linear.app/w/512/h/512/symbol", role: "Full Stack", bottom: "-8%", left: "-3%", rotate: 5 },
                  { name: "OpenAI", logo: "https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol", role: "Research Engineer", bottom: "-3%", right: "-12%", rotate: -4 },
                ].map((startup) => (
                  <div
                    key={`${startup.name}-mobile`}
                    className="absolute bg-white/95 backdrop-blur-sm shadow-md border border-neutral-200 rounded-xl p-2.5 md:hidden"
                    style={{
                      top: startup.top,
                      left: startup.left,
                      right: startup.right,
                      bottom: startup.bottom,
                      transform: `rotate(${startup.rotate}deg)`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs text-neutral-900 truncate">{startup.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{startup.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center hero image */}
              <img
                src={cdn("/hero-image.webp")}
                alt="Anti Job Board"
                className="relative z-10 w-32 h-auto"
              />
            </div>

            <div className="text-center mb-6">
              <p className="text-xs font-medium text-rose-500 uppercase tracking-wider mb-2">Coming Soon</p>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">
                {getHeadline()}
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-md mx-auto">
                {getDescription()}
              </p>
            </div>

            {isPaid && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 px-4 py-2 rounded-full text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hiring signals
                </span>
                <span className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 px-4 py-2 rounded-full text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Founder contacts
                </span>
                <span className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 px-4 py-2 rounded-full text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Outreach playbooks
                </span>
              </div>
            )}

            <div className={`rounded-xl p-5 border ${isPaid ? "bg-rose-50 border-rose-200" : "bg-neutral-100 border-neutral-200"}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isPaid ? "bg-rose-100" : "bg-neutral-200"}`}>
                  <svg className={`w-6 h-6 ${isPaid ? "text-rose-500" : "text-neutral-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-neutral-900">{notice.title}</p>
                  <p className="text-sm text-neutral-500">{notice.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Upgrade CTA for free users */}
            {!isPaid && (
              <div className="border-t border-neutral-100 mt-8 pt-6 text-center">
                <p className="text-sm text-neutral-500 mb-4">
                  Want full access now? Upgrade to get complete drops with all startups.
                </p>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  View Plans
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Concierge Extra */}
        {plan === "concierge" && (
          <div className="mt-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white">
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
