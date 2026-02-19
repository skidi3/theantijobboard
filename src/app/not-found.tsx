"use client";

import Link from "next/link";
import { cdn } from "@/lib/cdn";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col dither">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${cdn("/hero-bg.webp")}')` }}
      />
      <div className="absolute inset-0 bg-white/5" />

      {/* Nav */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero image */}
          <div className="relative mx-auto w-48 sm:w-56 md:w-64 mb-8 animate-fade-in">
            <img
              src={cdn("/hero-image.webp")}
              alt=""
              className="w-full h-auto rounded-xl"
            />
            {/* 404 badge overlaid on image */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white border border-neutral-200 rounded-2xl px-4 py-2 shadow-sm">
              <span className="font-serif text-3xl sm:text-4xl text-neutral-800">404</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight animate-fade-in-up">
            Page not found.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white font-medium max-w-md mx-auto leading-relaxed animate-fade-in-up stagger-1 backdrop-blur-[2px]">
            The page you&apos;re looking for doesn&apos;t exist. But hey, neither
            do most job postings for recently funded startups. That&apos;s
            kind of our thing.
          </p>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up stagger-3">
            <Link
              href="/"
              className="bg-neutral-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-neutral-900"
            >
              Back to funded startups
            </Link>
            <Link
              href="/drops"
              className="bg-white border border-neutral-200 text-neutral-700 px-6 py-3 rounded-xl text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              View your drops
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
