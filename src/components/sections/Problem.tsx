"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Problem() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 stipple overflow-hidden">
      {/* Animated curvy pink ribbon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className={`absolute w-[150%] h-[150%] -left-[25%] -bottom-[25%] transition-all duration-1500 ease-out ${
            isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-[-10%] translate-y-[10%]"
          }`}
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* 3D ribbon gradient with folds */}
            <linearGradient id="ribbonMain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="15%" stopColor="#fda4af" />
              <stop offset="30%" stopColor="#fb7185" />
              <stop offset="45%" stopColor="#fecdd3" />
              <stop offset="60%" stopColor="#fb7185" />
              <stop offset="75%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fecdd3" />
            </linearGradient>
            {/* Highlight for 3D effect */}
            <linearGradient id="ribbonHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.7" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
            </linearGradient>
            {/* Glass shine */}
            <linearGradient id="ribbonGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0.8" />
              <stop offset="60%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="ribbonShadow">
              <feDropShadow dx="4" dy="4" stdDeviation="8" floodColor="#881337" floodOpacity="0.15"/>
            </filter>
          </defs>

          {/* Main curvy ribbon shape */}
          <path
            d="M-50 850
               C 100 750, 150 700, 200 720
               C 280 750, 320 680, 400 650
               C 500 610, 480 550, 550 500
               C 620 450, 680 480, 720 420
               C 780 340, 750 300, 820 250
               C 890 200, 920 220, 980 150
               C 1040 80, 1020 50, 1100 -20"
            stroke="url(#ribbonMain)"
            strokeWidth="45"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonShadow)"
            opacity="0.6"
          />

          {/* Top edge highlight */}
          <path
            d="M-50 850
               C 100 750, 150 700, 200 720
               C 280 750, 320 680, 400 650
               C 500 610, 480 550, 550 500
               C 620 450, 680 480, 720 420
               C 780 340, 750 300, 820 250
               C 890 200, 920 220, 980 150
               C 1040 80, 1020 50, 1100 -20"
            stroke="url(#ribbonGlass)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
            transform="translate(-8, -8)"
          />

          {/* Second ribbon layer for depth */}
          <path
            d="M0 900
               C 150 820, 180 780, 250 790
               C 330 805, 380 740, 450 700
               C 530 655, 540 600, 600 560
               C 670 515, 720 540, 770 480
               C 840 400, 820 360, 880 310
               C 950 255, 970 270, 1030 210
               C 1100 145, 1080 100, 1150 40"
            stroke="url(#ribbonMain)"
            strokeWidth="30"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Half logo - top left */}
      <img
        src="/logo.png"
        alt=""
        className="absolute -top-20 -left-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div className="max-w-lg">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight">
              LinkedIn has 1000+ applicants per post.
            </h2>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              ATS rejects you before humans see your resume. Ghost jobs waste your time.
              AI stuffing makes everyone look the same.
            </p>

            <p className="mt-12 font-serif text-2xl md:text-3xl text-neutral-900 leading-snug">
              You&apos;re not bad at applying.
              <br />
              <span className="text-neutral-400">The timing is.</span>
            </p>
          </div>

          {/* Right - Image */}
          <div
            className={`relative transition-all duration-1000 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <img
              src="/problems.png"
              alt="Job hunting frustration"
              className="w-full max-w-md mx-auto lg:max-w-none h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
