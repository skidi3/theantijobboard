"use client";

import { Button } from "../Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
        src="/logo.png"
        alt=""
        className="absolute -bottom-20 -left-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div ref={ref} className="mx-auto max-w-6xl">
        <h2
          className={`font-serif text-3xl md:text-4xl text-neutral-900 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Pricing
        </h2>
        <p
          className={`text-neutral-500 mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Cancel anytime. No refunds.
        </p>

        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-6 items-stretch md:items-end transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* The List */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <h3 className="text-lg text-neutral-900">The List</h3>
              <p className="text-sm text-neutral-400 mt-1">Passive seekers</p>
            </div>
            <div className="mb-6">
              <span className="font-serif text-4xl text-neutral-900">$9</span>
              <span className="text-neutral-400 ml-1">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-600 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Biweekly drops of 10-15 startups
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Funding amount & details
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Careers page + founder LinkedIn
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Email or Discord delivery
              </li>
            </ul>
            <a href="https://checkout.dodopayments.com/buy/pdt_0NYZGp6tILAr3BWvuRCIx?quantity=1" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full">
                Get started
              </Button>
            </a>
          </div>

          {/* The Edge - Popular */}
          <div className="bg-neutral-900 border border-neutral-900 rounded-2xl p-6 md:p-8 text-white flex flex-col relative mt-6 md:mt-0 md:-my-4 md:py-12 shadow-xl order-first md:order-none">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-neutral-900 text-xs font-medium px-3 py-1 rounded-full border border-dashed border-neutral-400 whitespace-nowrap">
              Most popular
            </span>
            <div className="mb-6">
              <h3 className="text-lg">The Edge</h3>
              <p className="text-sm text-neutral-400 mt-1">Active hunters</p>
            </div>
            <div className="mb-6">
              <span className="font-serif text-4xl">$19</span>
              <span className="text-neutral-400 ml-1">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-300 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-0.5">—</span>
                Everything in The List
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-0.5">—</span>
                Daily drops, not biweekly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-0.5">—</span>
                Warm intro templates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-0.5">—</span>
                Founder approach notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-0.5">—</span>
                Priority access
              </li>
            </ul>
            <a href="https://checkout.dodopayments.com/buy/pdt_0NYZGtzTuEp5AZL5BRKqr?quantity=1" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="white" className="w-full">
                Get started
              </Button>
            </a>
          </div>

          {/* The Concierge */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <h3 className="text-lg text-neutral-900">The Concierge</h3>
              <p className="text-sm text-neutral-400 mt-1">Done for you</p>
            </div>
            <div className="mb-6">
              <span className="font-serif text-4xl text-neutral-900">$199</span>
              <span className="text-neutral-400 ml-1">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-neutral-600 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                30 days of personal recruiting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Roles matched to your stack
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                We write & send intros for you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                We call founders to pitch you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-300 mt-0.5">—</span>
                Weekly check-in call
              </li>
            </ul>
            <a href="https://checkout.dodopayments.com/buy/pdt_0NYZHBKaapeodleUfpIav?quantity=1" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full">
                Apply
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
