"use client";

import { Button } from "../Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cdn } from "@/lib/cdn";

export function Pricing() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="pricing" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 stipple overflow-hidden">
      {/* Animated curvy pink ribbon - bottom left to top right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className={`absolute w-[150%] h-[150%] -left-[25%] -bottom-[25%] transition-all duration-1500 ease-out ${
            isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-[-10%] translate-y-[10%]"
          }`}
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="ribbonMain3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="15%" stopColor="#fda4af" />
              <stop offset="30%" stopColor="#fb7185" />
              <stop offset="45%" stopColor="#fecdd3" />
              <stop offset="60%" stopColor="#fb7185" />
              <stop offset="75%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fecdd3" />
            </linearGradient>
            <linearGradient id="ribbonGlass3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0.8" />
              <stop offset="60%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="ribbonShadow3">
              <feDropShadow dx="4" dy="4" stdDeviation="8" floodColor="#881337" floodOpacity="0.15"/>
            </filter>
          </defs>
          <path
            d="M-50 850
               C 100 750, 150 700, 200 720
               C 280 750, 320 680, 400 650
               C 500 610, 480 550, 550 500
               C 620 450, 680 480, 720 420
               C 780 340, 750 300, 820 250
               C 890 200, 920 220, 980 150
               C 1040 80, 1020 50, 1100 -20"
            stroke="url(#ribbonMain3)"
            strokeWidth="45"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonShadow3)"
            opacity="0.6"
          />
          <path
            d="M-50 850
               C 100 750, 150 700, 200 720
               C 280 750, 320 680, 400 650
               C 500 610, 480 550, 550 500
               C 620 450, 680 480, 720 420
               C 780 340, 750 300, 820 250
               C 890 200, 920 220, 980 150
               C 1040 80, 1020 50, 1100 -20"
            stroke="url(#ribbonGlass3)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            transform="translate(-8, -8)"
          />
          <path
            d="M0 900
               C 150 820, 180 780, 250 790
               C 330 805, 380 740, 450 700
               C 530 655, 540 600, 600 560
               C 670 515, 720 540, 770 480
               C 840 400, 820 360, 880 310
               C 950 255, 970 270, 1030 210
               C 1100 145, 1080 100, 1150 40"
            stroke="url(#ribbonMain3)"
            strokeWidth="30"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Half logo - bottom left */}
      <img
        src={cdn("/logo.webp")}
        alt=""
        className="absolute -bottom-20 -left-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div ref={ref} className="mx-auto max-w-6xl">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-6">
            You've sent 200 applications.<br />
            <span className="text-neutral-400">How many responses?</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl">
            The average job post gets 250 applicants. We send you roles with less than 10. Pick how deep you want to go.
          </p>
        </div>

        <div
          className={`space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* The List */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">The List</h3>
                <p className="text-neutral-500 mb-4 max-w-lg">
                  Once a week, we send you 10-15 startups that just raised. Funding amount, careers page, founder LinkedIn. You take it from there.
                </p>
                <p className="text-sm text-neutral-400">For people casually exploring. Low commitment.</p>
              </div>
              <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-4">
                <div>
                  <span className="font-serif text-4xl md:text-5xl text-neutral-900">$9</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <a
                  href="https://checkout.dodopayments.com/buy/pdt_0NYZGp6tILAr3BWvuRCIx?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>

          {/* The Edge */}
          <div className="relative mt-4">
            <span className="absolute top-0 right-8 -translate-y-1/2 bg-rose-400 text-white text-sm px-4 py-1.5 rounded-full z-10">
              Most founders pick this
            </span>
            <div className="bg-neutral-900 text-white rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl mb-3">The Edge</h3>
                <p className="text-neutral-300 mb-4 max-w-lg">
                  Twice a week instead of once. Plus warm intro templates, notes on how to approach each founder, and you get roles before List subscribers.
                </p>
                <p className="text-sm text-neutral-500">For people actively hunting. Want every advantage.</p>
              </div>
              <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-4">
                <div>
                  <span className="font-serif text-4xl md:text-5xl">$19</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <a
                  href="https://checkout.dodopayments.com/buy/pdt_0NYZGtzTuEp5AZL5BRKqr?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white border-b border-white pb-0.5 hover:text-neutral-300 hover:border-neutral-300 transition-colors"
                >
                  Get started
                </a>
              </div>
            </div>
            </div>
          </div>

          {/* The Concierge */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">The Concierge</h3>
                <p className="text-neutral-500 mb-4 max-w-lg">
                  We do everything. Match roles to your stack, write your intros, call founders to pitch you directly. Real recruiters review your resume and portfolio. Weekly check-ins over text.
                </p>
                <p className="text-sm text-neutral-400">For people who want it done. No time to waste.</p>
              </div>
              <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-4">
                <div>
                  <span className="font-serif text-4xl md:text-5xl text-neutral-900">$199</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <a
                  href="https://checkout.dodopayments.com/buy/pdt_0NYZHBKaapeodleUfpIav?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-400 text-center pt-4">Cancel anytime. No refunds.</p>
        </div>
      </div>
    </section>
  );
}
