"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";
import Link from "next/link";

type Plan = "free" | "list" | "edge" | "concierge";

interface HiringStartup {
  name: string;
  category: "Engineering" | "Design" | "Marketing";
  roles: string[];
  link: string;
}

// Data refreshes every 2-3 days - last updated: Feb 20, 2026
const startups: HiringStartup[] = [
  // New roles (Feb 20)
  { name: "Raindrop AI", category: "Engineering", roles: ["Founding ML Engineer (SF)", "Product Engineer (SF)", "Backend / Infra Engineer (SF)", "Developer Experience (SF)"], link: "https://www.raindrop.ai/careers" },
  { name: "Sarvam AI", category: "Engineering", roles: ["AI Researcher – Autonomous Agents", "Software Engineer – Backend", "ML Engineer – Computer Vision & VLM", "Frontend Engineer, API Platform", "Backend AI Engineer", "Backend Engineer - API Team", "Senior Frontend Engineer", "Principal Security Engineer", "ML Engineer", "Backend Engineer - Samvaad", "Frontend Engineer Intern", "ML Engineer – Studio", "Business Development Rep", "Senior Account Executive", "GTM - Reasoning AI", "Partnerships Lead (GSIs)", "Account Executive – Enterprise", "Product Marketing Manager"], link: "https://careers.kula.ai/sarvam-ai" },
  { name: "SuperLiving", category: "Engineering", roles: ["AI Engineer (Bengaluru)"], link: "https://superliving.app/careers/" },
  { name: "Wavelength", category: "Engineering", roles: ["Cold DM founder for roles"], link: "https://www.heywavelength.com/" },
  { name: "Plexe AI", category: "Engineering", roles: ["Forward Deployed Engineer (Remote India)"], link: "https://www.linkedin.com/jobs/view/4370997460/" },
  { name: "Mygate", category: "Engineering", roles: ["SDE-1 Backend (Java, Spring Boot)"], link: "https://binary.so/Ni2ZZm1" },
  { name: "Stealth Healthtech (AI Care Coordination)", category: "Engineering", roles: ["Full-Stack Engineer (Founding)", "ML Engineer (Founding)"], link: "https://x.com/nazzari/status/2024551493869981873" },
  { name: "Stealth (Social Media Leads)", category: "Engineering", roles: ["Founding Engineer"], link: "https://x.com/nazzari/status/2024551493869981873" },
  { name: "Stealth Consumer App (Tamagotchi)", category: "Engineering", roles: ["iOS Engineer"], link: "https://x.com/nazzari/status/2024551493869981873" },
  { name: "BelonixHQ", category: "Engineering", roles: ["Frontend Engineer", "Backend Engineer"], link: "https://x.com/alexabelonix/status/2024546064003371480" },
  { name: "Pre-launch Startup", category: "Engineering", roles: ["Senior Frontend Engineer"], link: "https://x.com/amosuibk/status/2024175260719870410" },
  { name: "Unnamed Startup", category: "Engineering", roles: ["Lead Front End Engineer", "Senior Full Stack Engineer (web3)"], link: "https://x.com/tommartell/status/2024621133170118809" },
  { name: "Startup in Port Harcourt", category: "Marketing", roles: ["Digital Marketer", "Product Designer", "Mobile Developer"], link: "https://x.com/BarnabasBe4043/status/2024367929962209667" },
  { name: "Dmazing Studio", category: "Design", roles: ["Product Design Intern"], link: "https://x.com/kiawisherman/status/2024067900672237884" },
  { name: "FujiCommerce", category: "Design", roles: ["Graphic Designer Intern"], link: "https://x.com/UseFujiCommerce/status/2023059532155691136" },
  { name: "Idylabs", category: "Design", roles: ["Product Designer"], link: "https://x.com/Ifekam_Ebunu/status/2022596974520815826" },
  { name: "Sewna", category: "Design", roles: ["UX Designer"], link: "https://x.com/i_sudeepa/status/2022555275606327491" },
  { name: "Legal AI Startup", category: "Engineering", roles: ["Full Stack Engineer"], link: "https://x.com/theantijobboard/status/2022215264469930319" },
  { name: "VeriBite", category: "Marketing", roles: ["Short-Form Video Editor"], link: "https://x.com/GorillaGator_/status/2023629504246108461" },
  { name: "Eusate", category: "Marketing", roles: ["Marketing Lead"], link: "https://x.com/eusate_ai/status/2023359616307147231" },
  { name: "Unnamed Startup Project", category: "Marketing", roles: ["Social Media Manager Intern", "Animator"], link: "https://x.com/zmmagic0/status/2023988891674452122" },
  { name: "Appistryy", category: "Marketing", roles: ["Business Development Intern"], link: "https://x.com/appistryy/status/2022744843466998022" },
  { name: "AI Web Scraping Startup", category: "Engineering", roles: ["Engineering Roles", "Marketing Roles"], link: "https://x.com/theantijobboard/status/2024472977941897492" },
  // Previous roles (Feb 19)
  { name: "Fast-Growing Tech Startup", category: "Engineering", roles: ["Backend Software Engineer (Node.js)", "Full Stack Software Engineer (Laravel + Vue.js)"], link: "https://x.com/Technavie/status/2024248503229436123" },
  { name: "Healthverity", category: "Engineering", roles: ["Forward Deployed Engineer (SW Engineer IV+)"], link: "https://x.com/WellfoundHQ/status/2024144482778636604" },
  { name: "Very Cool Startup", category: "Engineering", roles: ["Founding Engineer"], link: "https://x.com/ViktorPlacifai/status/2024120979312574768" },
  { name: "Simple (Crypto Wallet)", category: "Engineering", roles: ["DevOps Engineer"], link: "https://x.com/crypto_vazima/status/2024095167293128965" },
  { name: "Dubai-Based FinTech Startup", category: "Engineering", roles: ["Data Engineer"], link: "https://x.com/crypto_vazima/status/2023771013062791495" },
  { name: "Aquis Search (for Dubai Startup)", category: "Engineering", roles: ["Data Engineer"], link: "https://x.com/crypto_vazima/status/2023755463008153818" },
  { name: "Tao.app (Bittensor Ecosystem)", category: "Engineering", roles: ["Senior Front-End/Full-Stack Developer", "Senior Python Developer"], link: "https://x.com/crypto_vazima/status/2022254384910913965" },
  { name: "Pradeep's Startup", category: "Engineering", roles: ["Full Stack Developer (Frontend Heavy)"], link: "https://x.com/exvillager/status/2021831187329962424" },
  { name: "Juspay", category: "Engineering", roles: ["Software Development Engineer (Backend)"], link: "https://x.com/StartupJobsIN/status/2022858878946558286" },
  { name: "ET Money", category: "Engineering", roles: ["Software Engineer I"], link: "https://x.com/StartupJobsIN/status/2022174355669803479" },
  { name: "Venture-Backed Crypto Startup", category: "Engineering", roles: ["Staff Fullstack Engineer"], link: "https://x.com/melkxy/status/2022676348993667114" },
  { name: "Fleetx", category: "Engineering", roles: ["Backend Engineers"], link: "https://x.com/StartupJobsIN/status/2024147542309789991" },
  { name: "Stream", category: "Engineering", roles: ["Backend Team Lead (Go)"], link: "https://x.com/aihackerjobs/status/2023775146042126557" },
  { name: "Seed-Stage LLM Infrastructure Startup", category: "Engineering", roles: ["Senior Rust Backend Engineer"], link: "https://x.com/rustjobs_dev/status/2023291846185644332" },
  { name: "CSA", category: "Engineering", roles: ["Python Developer", "Systems Administrator"], link: "https://x.com/TechStartupJobs/status/2023351827618525449" },
  { name: "AI Company", category: "Design", roles: ["Visual Designer"], link: "https://x.com/RockyRoark/status/2022154560949698891" },
  { name: "Terminal X (AI Fintech)", category: "Marketing", roles: ["Marketing/Content Role"], link: "https://x.com/Terminalx_ai/status/2024266336831230074" },
  { name: "Knot", category: "Marketing", roles: ["Performance Marketing Lead"], link: "https://x.com/StartupJobsIN/status/2023730842120679514" },
  { name: "UnlearnAI", category: "Marketing", roles: ["Director of Product Marketing"], link: "https://x.com/WellfoundHQ/status/2023418342871023628" },
  { name: "TenseAI", category: "Marketing", roles: ["HR & Marketing Interns"], link: "https://x.com/MrDeependraa/status/2023284024370946529" },
  { name: "Global Company", category: "Marketing", roles: ["Marketing Generalist (Growth & Content)"], link: "https://x.com/the_careerblog/status/2022145363705233465" },
];

const categoryColors: Record<string, string> = {
  Engineering: "bg-neutral-100 text-neutral-700",
  Design: "bg-rose-100 text-rose-700",
  Marketing: "bg-neutral-200 text-neutral-600",
};

export default function SevenDayListPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Engineering" | "Design" | "Marketing">("All");

  useEffect(() => {
    // Temp preview bypass - DELETE AFTER USE
    const params = new URLSearchParams(window.location.search);
    if (params.get("_") === "f8d2a") {
      setPlan("edge");
      setLoading(false);
      return;
    }

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

  // Plan-based limits: free=5, list=10, edge/concierge=all
  const getVisibleCount = () => {
    if (plan === "edge" || plan === "concierge") return Infinity;
    if (plan === "list") return 10;
    return 5;
  };
  const visibleCount = getVisibleCount();

  const filteredStartups = filter === "All"
    ? startups
    : startups.filter(s => s.category === filter);

  const engineeringCount = startups.filter(s => s.category === "Engineering").length;
  const designCount = startups.filter(s => s.category === "Design").length;
  const marketingCount = startups.filter(s => s.category === "Marketing").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}>
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <img src={cdn("/logo.webp")} alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-sm text-neutral-400">The Anti Job Board presents</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {plan !== "free" && (
                <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full capitalize">{plan}</span>
              )}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-neutral-400">Live</p>
              </div>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            The Disposable Job Board
          </h1>
          <p className="text-sm sm:text-base text-neutral-500">Fresh roles from X. Flushed every 2-3 days.</p>
        </div>

        {/* Stats */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-neutral-200 grid grid-cols-2 divide-x divide-neutral-200 mb-8">
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">{startups.length}</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Startups</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">2-3</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Days fresh</p>
          </div>
        </div>

        {/* The problem - dark card */}
        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">The problem</p>
          </div>
          <p className="text-neutral-300 leading-relaxed mb-4">
            By the time a job hits LinkedIn, 500+ people have already applied. The role was probably filled through a referral before it even went public. You&apos;re not late because you&apos;re slow. You&apos;re late because you&apos;re using the wrong source.
          </p>
          <div className="border-t border-neutral-800 pt-4">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">The solution</p>
            <p className="text-neutral-300 leading-relaxed">
              We monitor X, founder networks, and hiring signals in real-time. When a startup tweets they&apos;re hiring, you see it here within hours, not weeks. This list refreshes every 2-3 days. Old roles flush out. Fresh ones come in. You&apos;re always looking at what&apos;s active right now.
            </p>
          </div>
        </div>

        {/* Why this works */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Why this works</p>
          </div>
          <div className="grid gap-4">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="text-sm font-medium text-rose-600">1</span>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-0.5">Timing beats talent</p>
                <p className="text-sm text-neutral-500">Being first matters more than being perfect. These roles have &lt;50 applicants, not 500.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="text-sm font-medium text-rose-600">2</span>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-0.5">Direct signal</p>
                <p className="text-sm text-neutral-500">Every link goes to the original X post. DM the founder directly. Skip the ATS black hole.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="text-sm font-medium text-rose-600">3</span>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-0.5">Always fresh</p>
                <p className="text-sm text-neutral-500">This list auto-flushes every 2-3 days. No stale postings. No filled roles. Just what&apos;s hiring now.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-3 mb-6">
          <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest">This week&apos;s roles</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["All", "Engineering", "Design", "Marketing"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-white/90 backdrop-blur text-neutral-600 hover:bg-white border border-neutral-200"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                {cat === "All" ? startups.length : cat === "Engineering" ? engineeringCount : cat === "Design" ? designCount : marketingCount}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4 mb-8">
          {filteredStartups.map((startup, index) => {
            const isLocked = index >= visibleCount;

            if (isLocked) {
              // Blurred placeholder card
              return (
                <div
                  key={startup.name + index}
                  className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-6 border border-neutral-100"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 blur-sm" />
                      <div>
                        <div className="h-5 w-32 bg-neutral-200 rounded blur-sm mb-2" />
                        <div className="h-4 w-20 bg-neutral-100 rounded-full blur-sm" />
                      </div>
                    </div>
                    <div className="shrink-0 h-9 w-24 bg-neutral-200 rounded-xl blur-sm" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-28 bg-neutral-100 rounded-lg blur-sm" />
                    <div className="h-7 w-36 bg-neutral-100 rounded-lg blur-sm" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={startup.name + index}
                className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-6 border border-neutral-100 transition-all hover:border-neutral-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <span className="font-serif text-neutral-600">{startup.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-1">{startup.name}</h3>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${categoryColors[startup.category]}`}>
                        {startup.category}
                      </span>
                    </div>
                  </div>
                  <a
                    href={startup.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View
                  </a>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
                  {startup.roles.map((role) => (
                    <span
                      key={role}
                      className="text-sm bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA */}
        {visibleCount < filteredStartups.length && (
          <div className="bg-neutral-900 rounded-2xl p-6 sm:p-8 text-center mb-8">
            <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
              {plan === "free" ? "Stop competing with 500 applicants" : `Unlock ${filteredStartups.length - visibleCount} more roles`}
            </h3>
            <p className="text-neutral-400 mb-5 text-sm sm:text-base">
              {plan === "free"
                ? "Get the full list + our deep-dive drops on funded startups every week."
                : "Upgrade to Edge for unlimited access to all roles."
              }
            </p>
            <Link
              href="/#pricing"
              className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              {plan === "free" ? "See pricing" : "Upgrade to Edge"}
            </Link>
          </div>
        )}

        {/* Footer note */}
        <div className="text-center">
          <p className="text-xs text-white font-medium backdrop-blur-[2px]">
            Last updated: Feb 20, 2026 · Refreshes every 2-3 days
          </p>
        </div>
      </div>
    </main>
  );
}
