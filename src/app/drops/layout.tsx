"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";

type Plan = "free" | "list" | "edge" | "concierge";

interface UserData {
  email: string;
  plan: Plan;
}

// Mock drops data - in production this would come from database
const drops: { id: string; date: string; title: string; type: string }[] = [
  // { id: "feb-18-enhanced", date: "Feb 18", title: "8 Startups · Scorecards · Playbooks", type: "wednesday" },
];

const planDetails: Record<Plan, { name: string; color: string; benefits: string[] }> = {
  free: {
    name: "Free",
    color: "bg-neutral-100 text-neutral-600",
    benefits: ["Weekly newsletter"],
  },
  list: {
    name: "The List",
    color: "bg-rose-100 text-rose-600",
    benefits: ["Wednesday drops", "Hiring signals", "Founder contacts"],
  },
  edge: {
    name: "The Edge",
    color: "bg-gradient-to-r from-rose-400 to-rose-500 text-white",
    benefits: ["Wed + Sun drops", "Hiring signals", "Founder contacts", "Approach notes"],
  },
  concierge: {
    name: "Concierge",
    color: "bg-neutral-900 text-white",
    benefits: ["Personalized matching", "Direct intros", "1-on-1 support"],
  },
};

function getNextDropDay(plan: Plan): string {
  if (plan === "free") return "Upgrade for access";
  if (plan === "concierge") return "Personalized";

  // For now, just show "Tonight" since first batch is dropping tonight
  return "Tonight";
}

export default function DropsLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login?redirect=/drops");
        return;
      }

      // Get user plan from users table
      const { data: userData } = await supabase
        .from("users")
        .select("email, plan")
        .eq("id", session.user.id)
        .single();

      if (userData) {
        setUser(userData as UserData);
      } else {
        // Fallback if no users row yet
        setUser({
          email: session.user.email || "",
          plan: "free",
        });
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const plan = planDetails[user.plan];
  const nextDrop = getNextDropDay(user.plan);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 px-4 flex items-center justify-between">
        <Link href="/drops" className="flex items-center gap-2">
          <img src={cdn("/logo.webp")} alt="The Anti Job Board" className="h-8 w-auto" />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-100">
            <Link href="/" className="flex items-center gap-3">
              <img src={cdn("/logo.webp")} alt="The Anti Job Board" className="h-10 w-auto" />
              <span className="font-serif text-lg text-neutral-900">The Anti Job Board</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-neutral-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                <span className="text-neutral-900 font-semibold text-sm">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{user.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${plan.color}`}>
                  {plan.name}
                </span>
              </div>
            </div>

            {/* Next Drop */}
            <div className="bg-neutral-50 rounded-xl p-3 border border-dashed border-neutral-200">
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Next Drop</p>
              <p className="text-sm font-medium text-neutral-900">{nextDrop}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3 px-2">Drops</p>
            <div className="space-y-1">
              {drops.map((drop) => {
                const isActive = pathname === `/drops/${drop.id}`;
                return (
                  <Link
                    key={drop.id}
                    href={`/drops/${drop.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-rose-50 text-rose-600 font-medium"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{drop.date}</span>
                      {drop.type === "sunday" && (
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400">Sun</span>
                      )}
                      {drop.type === "wednesday" && (
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400">Wed</span>
                      )}
                    </span>
                    <span className="text-xs text-neutral-400 mt-0.5 block truncate">{drop.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Plan Benefits */}
            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3 px-2">Your Plan Includes</p>
              <div className="space-y-2 px-2">
                {plan.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-neutral-100 space-y-2">
            {user.plan !== "concierge" && (
              <Link
                href="/#pricing"
                className="block w-full text-center bg-gradient-to-r from-rose-400 to-rose-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-rose-500 hover:to-rose-600 transition-colors"
              >
                Upgrade Plan
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-center text-neutral-500 hover:text-neutral-700 px-4 py-2 text-sm transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
