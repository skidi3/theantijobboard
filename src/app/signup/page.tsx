"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cdn } from "@/lib/cdn";

function SignupContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const prefillEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    let callbackUrl = `${window.location.origin}/auth/callback`;
    if (redirect) {
      callbackUrl += `?next=${encodeURIComponent(redirect)}`;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callbackUrl,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError("An account with this email already exists. Please sign in instead.");
      setLoading(false);
      return;
    }

    setSubmittedEmail(email);
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <Link href="/" className="inline-block mb-10">
            <img
              src={cdn("/logo.webp")}
              alt="The Anti Job Board"
              className="h-10 w-auto mx-auto"
            />
          </Link>

          <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl text-neutral-900 mb-3">Check your email</h1>
          <p className="text-neutral-500 mb-2">
            We sent a confirmation link to
          </p>
          <p className="text-neutral-900 font-medium mb-6">{submittedEmail}</p>
          <p className="text-sm text-neutral-400 mb-8">
            Click the link to activate your account
          </p>

          <Link
            href="/login"
            className="inline-block text-rose-400 hover:text-rose-500 font-medium transition-colors"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile back button */}
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <Link href="/" className="inline-block mb-12">
            <img
              src={cdn("/logo.webp")}
              alt="The Anti Job Board"
              className="h-10 w-auto"
            />
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">
            Create your account
          </h1>
          <p className="text-neutral-500 mb-8">
            Get startup jobs before they go public
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
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
              <label htmlFor="password" className="block text-sm text-neutral-500 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-xs text-neutral-400 text-center">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-neutral-600">Terms</Link> and{" "}
              <Link href="/privacy" className="underline hover:text-neutral-600">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-neutral-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-rose-400 hover:text-rose-500 font-medium transition-colors">
              Sign in
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
          <div className="max-w-sm w-full">
            {/* Stats card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <p className="text-sm text-neutral-400 uppercase tracking-wider mb-6">This week</p>

              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-500">Roles shared</span>
                  <span className="font-serif text-3xl text-neutral-900">47</span>
                </div>

                <div className="h-px bg-neutral-100" />

                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-500">Avg applicants</span>
                  <span className="font-serif text-3xl text-neutral-900">&lt;10</span>
                </div>

                <div className="h-px bg-neutral-100" />

                <div className="flex items-baseline justify-between">
                  <span className="text-neutral-500">Time to interview</span>
                  <span className="font-serif text-3xl text-neutral-900">24h</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-neutral-200">
                <p className="text-sm text-neutral-400 text-center">
                  Jobs that don't exist on the internet yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
