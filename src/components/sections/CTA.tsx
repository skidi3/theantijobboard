"use client";

import { Button } from "../Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTA() {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 overflow-hidden">
      {/* Background image with dither effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/void.png')",
          filter: "contrast(1.1) brightness(0.9)",
        }}
      />
      {/* Dither overlay using noise pattern */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-neutral-900/80" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-2xl text-center flex flex-col items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          Stop applying into the void.
        </h2>
        <p className="mt-6 text-lg text-neutral-400">
          Get the jobs before everyone else.
        </p>

        <div className="mt-10">
          <Button variant="white" size="lg">
            Join the waitlist
          </Button>
        </div>
      </div>
    </section>
  );
}
