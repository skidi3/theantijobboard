"use client";

import { Button } from "../Button";
import { ScatteredCards } from "../ScatteredCards";
import { cdn } from "@/lib/cdn";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-white overflow-hidden flex flex-col dither">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${cdn('/hero-bg.webp')}')` }}
      />
      <div className="absolute inset-0 bg-white/5" />
      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3">
          <img src={cdn("/logo.webp")} alt="The Anti Job Board" className="h-10 md:h-12 w-auto" />
          <span className="font-serif text-xl md:text-2xl text-neutral-900">The Anti Job Board</span>
        </div>
        <div className="flex items-center gap-6 md:gap-10">
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
            className="text-base text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            FAQ
          </a>
        </div>
      </nav>

      {/* Hero content - split layout */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left side - Text content */}
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="font-serif text-5xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.08] tracking-[-0.02em] font-medium lg:font-normal">
                Jobs that don&apos;t exist
                <span className="block relative w-fit mx-auto lg:mx-0">
                  <span className="relative z-10">on the internet yet.</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-4 z-0" viewBox="0 0 300 10" preserveAspectRatio="none">
                    <path
                      d="M0 6 C 30 3, 60 8, 90 5 S 150 7, 180 4 S 240 8, 270 5 S 290 6, 300 5"
                      stroke="#d1d5db"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-lg lg:text-xl text-neutral-600 lg:text-neutral-500 font-medium lg:font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                We call founders who just raised, ask who they&apos;re hiring, and send you the roles before they go public.
              </p>

              <div className="mt-8">
                <a href="#pricing">
                  <Button size="lg">
                    Get early access
                  </Button>
                </a>
                <p className="mt-4 text-base text-neutral-600">
                  Starting at $9/month
                </p>
              </div>
            </div>

            {/* Desktop version - unchanged */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
              <ScatteredCards />
              <img
                src={cdn("/hero-image.webp")}
                alt="Anti Job Board"
                className="relative z-10 w-72 h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat - infinite scroll ticker */}
      <div className="relative z-20 border-y border-dashed border-neutral-300 bg-neutral-50 overflow-hidden">
        <div className="py-3 sm:py-5 flex animate-ticker">
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-6 sm:gap-12 px-4 sm:px-8">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">47</span>
                <span className="text-xs sm:text-sm text-neutral-400">roles this week</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">0</span>
                <span className="text-xs sm:text-sm text-neutral-400">ghost jobs</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">&lt;10</span>
                <span className="text-xs sm:text-sm text-neutral-400 whitespace-nowrap">applicants</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">312</span>
                <span className="text-xs sm:text-sm text-neutral-400 whitespace-nowrap">founders called</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">89%</span>
                <span className="text-xs sm:text-sm text-neutral-400 whitespace-nowrap">response rate</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl text-neutral-900">24h</span>
                <span className="text-xs sm:text-sm text-neutral-400 whitespace-nowrap">avg to interview</span>
              </div>
              <img src={cdn("/logo.webp")} alt="" className="h-4 sm:h-5 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
