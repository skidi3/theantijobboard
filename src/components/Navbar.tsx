"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { cdn } from "@/lib/cdn";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
      <Link href="/" className="flex items-center gap-3">
        <img src={cdn("/logo.webp")} alt="The Anti Job Board" className="h-10 md:h-12 w-auto" />
        <span className="font-serif text-xl md:text-2xl text-neutral-900">The Anti Job Board</span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <a
          href="#how"
          className="hidden sm:block text-base text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          How it works
        </a>
        <a
          href="#pricing"
          className="hidden sm:block text-base text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          Pricing
        </a>
        <a
          href="#faq"
          className="hidden md:block text-base text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          FAQ
        </a>

        {loading ? (
          <div className="w-20 h-9 bg-neutral-100 rounded-lg animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/drops"
              className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Drops
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
