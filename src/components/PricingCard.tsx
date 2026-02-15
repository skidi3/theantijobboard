"use client";

import { Check } from "lucide-react";
import { Button } from "./Button";

interface PricingCardProps {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  badge?: string;
}

export function PricingCard({
  name,
  tagline,
  price,
  period,
  features,
  highlighted = false,
  ctaText = "Get Started",
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-200 ${
        highlighted
          ? "border-neutral-900 bg-white shadow-xl scale-[1.02] z-10"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-1 text-xs font-medium text-white">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-serif text-2xl text-neutral-900">{name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{tagline}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="font-serif text-5xl text-neutral-900">{price}</span>
          <span className="ml-2 text-neutral-500">{period}</span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <Check className="h-3 w-3 text-neutral-600" strokeWidth={2.5} />
            </div>
            <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "primary" : "outline"}
        className="w-full"
        size="lg"
      >
        {ctaText}
      </Button>
    </div>
  );
}
