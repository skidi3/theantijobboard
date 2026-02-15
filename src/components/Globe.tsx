"use client";

import { useEffect, useState } from "react";

const startups = [
  {
    name: "Anthropic",
    logo: "https://cdn.brandfetch.io/anthropic.com/w/512/h/512/symbol",
    funding: "$450M",
    role: "Senior Engineer"
  },
  {
    name: "Stripe",
    logo: "https://cdn.brandfetch.io/stripe.com/w/512/h/512/icon",
    funding: "$600M",
    role: "Product Designer"
  },
  {
    name: "Figma",
    logo: "https://cdn.brandfetch.io/figma.com/w/512/h/512/symbol",
    funding: "$200M",
    role: "Frontend Dev"
  },
  {
    name: "Vercel",
    logo: "https://cdn.brandfetch.io/vercel.com/w/512/h/512/symbol",
    funding: "$150M",
    role: "DevRel"
  },
  {
    name: "Linear",
    logo: "https://cdn.brandfetch.io/linear.app/w/512/h/512/symbol",
    funding: "$35M",
    role: "Full Stack"
  },
  {
    name: "Notion",
    logo: "https://cdn.brandfetch.io/notion.so/w/512/h/512/symbol",
    funding: "$275M",
    role: "iOS Engineer"
  },
  {
    name: "Ramp",
    logo: "https://cdn.brandfetch.io/ramp.com/w/512/h/512/symbol",
    funding: "$300M",
    role: "ML Engineer"
  },
  {
    name: "OpenAI",
    logo: "https://cdn.brandfetch.io/openai.com/w/512/h/512/symbol",
    funding: "$10B",
    role: "Research Engineer"
  },
  {
    name: "Supabase",
    logo: "https://cdn.brandfetch.io/supabase.com/w/512/h/512/symbol",
    funding: "$116M",
    role: "Infra Engineer"
  },
  {
    name: "Plaid",
    logo: "https://cdn.brandfetch.io/plaid.com/w/512/h/512/icon",
    funding: "$425M",
    role: "Platform Eng"
  },
  {
    name: "Retool",
    logo: "https://cdn.brandfetch.io/retool.com/w/512/h/512/icon",
    funding: "$75M",
    role: "Product Manager"
  },
  {
    name: "Airtable",
    logo: "https://cdn.brandfetch.io/airtable.com/w/512/h/512/symbol",
    funding: "$735M",
    role: "Backend Dev"
  },
];

export function StartupOrbit() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through highlighting cards
  useEffect(() => {
    if (!mounted) return;

    const cycle = () => {
      const randomIndex = Math.floor(Math.random() * startups.length);
      setActiveIndex(randomIndex);

      setTimeout(() => setActiveIndex(null), 3000);
    };

    cycle();
    const interval = setInterval(cycle, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  // Position cards in an elliptical orbit
  const getCardPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radiusX = 46; // horizontal radius %
    const radiusY = 44; // vertical radius %

    const x = 50 + Math.cos(angle) * radiusX;
    const y = 50 + Math.sin(angle) * radiusY;

    // Rotation to make cards tangent to the circle
    const rotation = (angle * 180) / Math.PI + 90;

    // Scale based on position (larger at top, smaller at bottom for depth)
    const scale = 0.7 + (1 - Math.sin(angle)) * 0.2;

    // Z-index based on y position
    const zIndex = Math.round((1 - Math.sin(angle)) * 10);

    return { x, y, rotation, scale, zIndex };
  };

  return (
    <div className="absolute inset-0">
      {/* Orbital path - subtle */}
      <div
        className="absolute border border-neutral-200 rounded-full"
        style={{
          width: "92%",
          height: "88%",
          left: "4%",
          top: "6%",
          borderStyle: "dashed",
          opacity: 0.4,
        }}
      />

      {/* Startup cards in orbit */}
      {startups.map((startup, index) => {
        const pos = getCardPosition(index, startups.length);
        const isActive = activeIndex === index;

        return (
          <div
            key={startup.name}
            className={`absolute transition-all duration-700 ease-out cursor-pointer ${
              isActive ? "z-50" : ""
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${isActive ? 1.1 : pos.scale})`,
              zIndex: isActive ? 50 : pos.zIndex,
            }}
          >
            {/* Card */}
            <div
              className={`transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                isActive
                  ? "bg-white shadow-xl border-neutral-300"
                  : "bg-white/95 backdrop-blur-sm shadow-sm border-neutral-200 hover:border-neutral-300"
              } rounded-xl border p-3 min-w-[130px]`}
              style={{
                transform: `rotate(${-pos.rotation}deg)`, // Counter-rotate content
              }}
            >
              <div className="flex items-center gap-2.5">
                {/* Logo */}
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden p-1.5 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-sm text-neutral-900 truncate">
                    {startup.name}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    {startup.role}
                  </p>
                </div>
              </div>

              {/* Expanded info when active */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isActive ? "max-h-20 opacity-100 mt-2.5" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2.5 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wide">
                      Raised
                    </span>
                    <span className="text-xs font-semibold text-neutral-900">
                      {startup.funding}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Keep the old export name for compatibility
export { StartupOrbit as Globe };
