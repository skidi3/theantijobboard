"use client";

import { FAQItem } from "../FAQItem";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cdn } from "@/lib/cdn";

const faqs = [
  {
    question: "How do you find these jobs?",
    answer:
      "We track Crunchbase, SEC filings, VC announcements, YC batches daily. When a company raises, we call their HR or founders to verify what roles they're hiring for.",
  },
  {
    question: "Is this just a newsletter?",
    answer:
      "No. Every role we list has been verified by a phone call. We know the hiring manager's name, what they're looking for, and often have a direct intro path.",
  },
  {
    question: "Do you offer refunds or guarantees?",
    answer:
      "Nope. We give you opportunities with zero competition and save you time. But we can't make you cracked. If you're a fresher applying for senior roles, that's on you. We open doors, you walk through them.",
  },
  {
    question: "Why early stage startups?",
    answer:
      "Early equity can make you a millionaire if you negotiate properly. We focus on recently funded startups where your equity actually means something.",
  },
  {
    question: "What industries do you cover?",
    answer:
      "Tech startups. Engineering, design, product roles. AI/ML, fintech, SaaS, dev tools, consumer tech.",
  },
];

export function FAQ() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="faq" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 halftone overflow-hidden">
      {/* Animated curvy pink ribbon - top right to bottom left (opposite direction) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className={`absolute w-[150%] h-[150%] -right-[25%] -top-[25%] transition-all duration-1500 ease-out ${
            isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-[10%] translate-y-[-10%]"
          }`}
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: "scaleX(-1)" }}
        >
          <defs>
            <linearGradient id="ribbonMain4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="15%" stopColor="#fda4af" />
              <stop offset="30%" stopColor="#fb7185" />
              <stop offset="45%" stopColor="#fecdd3" />
              <stop offset="60%" stopColor="#fb7185" />
              <stop offset="75%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fecdd3" />
            </linearGradient>
            <linearGradient id="ribbonGlass4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0.8" />
              <stop offset="60%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="ribbonShadow4">
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
            stroke="url(#ribbonMain4)"
            strokeWidth="45"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonShadow4)"
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
            stroke="url(#ribbonGlass4)"
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
            stroke="url(#ribbonMain4)"
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
        src={cdn("/logo.webp")}
        alt=""
        className="absolute -top-20 -left-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div ref={ref} className="mx-auto max-w-6xl">
        <h2
          className={`font-serif text-3xl md:text-4xl text-neutral-900 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Questions
        </h2>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
