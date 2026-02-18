"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cdn } from "@/lib/cdn";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/drops";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = redirect;
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="p-4 bg-rose-50 border border-dashed border-rose-200 rounded-xl text-rose-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm text-neutral-500 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-sm text-neutral-500">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm text-rose-400 hover:text-rose-500 transition-colors">
            Forgot?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-sm mx-auto">
          <Link href="/" className="inline-block mb-12">
            <img
              src={cdn("/logo.webp")}
              alt="The Anti Job Board"
              className="h-10 w-auto"
            />
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">
            Welcome back
          </h1>
          <p className="text-neutral-500 mb-8">
            Sign in to access your drops
          </p>

          <Suspense fallback={
            <div className="space-y-5 animate-pulse">
              <div className="h-14 bg-neutral-100 rounded-xl" />
              <div className="h-14 bg-neutral-100 rounded-xl" />
              <div className="h-14 bg-neutral-100 rounded-xl" />
            </div>
          }>
            <LoginForm />
          </Suspense>

          <p className="text-center text-neutral-500 mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-rose-400 hover:text-rose-500 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cdn('/hero-bg.webp')}')` }}
        />
        <div className="absolute inset-0 bg-white/40" />

        {/* Centered content */}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="max-w-md">
            {/* Quote card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <svg className="w-8 h-8 text-rose-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-serif text-2xl text-neutral-900 leading-relaxed mb-6">
                Found my role in 2 weeks. 4 interviews, 2 offers.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center text-white font-medium text-sm">
                  JK
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Recent subscriber</p>
                  <p className="text-xs text-neutral-400">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
