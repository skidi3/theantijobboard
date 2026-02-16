"use client";

import { Button } from "../Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cdn } from "@/lib/cdn";

export function CTA() {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${cdn('/hero-bg.webp')}')` }}
      />
      <div className="absolute inset-0 bg-white/5" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-6xl text-center flex flex-col items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight">
          Stop applying into the void.
        </h2>
        <p className="mt-6 text-lg text-neutral-500">
          Get the jobs before everyone else.
        </p>

        <div className="mt-10">
          <a href="#pricing">
            <Button variant="primary" size="lg">
              Get early access
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
