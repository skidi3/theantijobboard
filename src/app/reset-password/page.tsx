"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cdn } from "@/lib/cdn";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsValidSession(true);
      }
      setChecking(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

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

          {!isValidSession ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-50 border border-dashed border-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-neutral-900 mb-3">Link expired</h2>
              <p className="text-neutral-500 mb-6">
                This password reset link is invalid or has expired
              </p>
              <Link
                href="/forgot-password"
                className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-all"
              >
                Request new link
              </Link>
            </div>
          ) : success ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 border border-dashed border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-neutral-900 mb-3">Password updated</h2>
              <p className="text-neutral-500">
                Redirecting you now...
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-3">
                New password
              </h1>
              <p className="text-neutral-500 mb-8">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-rose-50 border border-dashed border-rose-200 rounded-xl text-rose-600 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm text-neutral-500 mb-2">
                    New password
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-neutral-500 mb-2">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cdn('/hero-bg.webp')}')` }}
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>
    </div>
  );
}
