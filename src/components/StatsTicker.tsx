"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "$2.4B+", label: "startup funding tracked" },
  { value: "47", label: "verified roles this week" },
  { value: "0", label: "ghost jobs. ever." },
  { value: "<10", label: "applicants when you apply" },
];

export function StatsTicker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden border-y border-neutral-100 bg-neutral-50/80 backdrop-blur-sm py-4">
      <div className="ticker-container">
        <div className="ticker-content flex animate-ticker-scroll whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {stats.map((stat, index) => (
                <div
                  key={`${i}-${index}`}
                  className="mx-8 md:mx-12 flex items-baseline gap-2"
                >
                  <span className="font-serif text-2xl md:text-3xl italic text-neutral-900">
                    {stat.value}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
