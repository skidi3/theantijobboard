"use client";

import { useEffect, useState } from "react";

const startups = [
  { name: "Anthropic", logo: "https://cdn.brandfetch.io/anthropic.com/w/512/h/512/symbol", role: "Senior Engineer" },
  { name: "Stripe", logo: "https://cdn.brandfetch.io/stripe.com/w/512/h/512/icon", role: "Product Designer" },
  { name: "Figma", logo: "https://cdn.brandfetch.io/figma.com/w/512/h/512/symbol", role: "Frontend Dev" },
  { name: "Vercel", logo: "https://cdn.brandfetch.io/vercel.com/w/512/h/512/symbol", role: "DevRel" },
  { name: "Linear", logo: "https://cdn.brandfetch.io/linear.app/w/512/h/512/symbol", role: "Full Stack" },
  { name: "Notion", logo: "https://cdn.brandfetch.io/notion.so/w/512/h/512/symbol", role: "iOS Engineer" },
  { name: "Ramp", logo: "https://cdn.brandfetch.io/ramp.com/w/512/h/512/symbol", role: "ML Engineer" },
  { name: "OpenAI", logo: "https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol", role: "Research Engineer" },
];

// Positions scattered around the center image
const positions = [
  { top: "5%", left: "10%", rotate: -6 },      // top left
  { top: "0%", left: "55%", rotate: 4 },       // top center-right
  { top: "15%", right: "-5%", rotate: -8 },    // top right
  { top: "45%", left: "-8%", rotate: 5 },      // middle left
  { top: "50%", right: "-10%", rotate: -4 },   // middle right
  { top: "75%", left: "5%", rotate: 6 },       // bottom left
  { top: "85%", left: "45%", rotate: -3 },     // bottom center
  { top: "70%", right: "0%", rotate: 5 },      // bottom right
];

export function ScatteredCards() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cycle = () => {
      const randomIndex = Math.floor(Math.random() * startups.length);
      setActiveIndex(randomIndex);
      setTimeout(() => setActiveIndex(null), 2500);
    };

    cycle();
    const interval = setInterval(cycle, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {startups.map((startup, index) => {
        const pos = positions[index];
        const isActive = activeIndex === index;

        return (
          <div
            key={startup.name}
            className={`absolute transition-all duration-700 ease-out pointer-events-auto ${
              isActive ? "z-20" : "z-0"
            }`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `rotate(${pos.rotate}deg) scale(${isActive ? 1.05 : 1})`,
            }}
          >
            <div
              className={`transition-all duration-500 ${
                isActive
                  ? "bg-white shadow-xl border-neutral-300"
                  : "bg-white/95 backdrop-blur-sm shadow-md border-neutral-200 hover:shadow-lg hover:scale-105"
              } rounded-xl border p-2.5 cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs text-neutral-900 truncate">
                    {startup.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {startup.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
