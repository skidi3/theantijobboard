"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cdn } from "@/lib/cdn";

const testimonials = [
  {
    quote: "Applied to a stealth YC company. Response in 2 hours. Usually I'm lucky to hear back in 2 weeks.",
    author: "Sarah K.",
    role: "Software Engineer"
  },
  {
    quote: "They called the CTO and pitched me to him. Interview the next day.",
    author: "Marcus C.",
    role: "Product Designer"
  },
  {
    quote: "4 months, 200 applications, zero interviews. 2 weeks here? 3 interviews.",
    author: "Anonymous",
    role: "Full Stack Developer"
  }
];

export function SocialProof() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="relative bg-neutral-50 px-6 py-24 md:px-12 md:py-32 lg:px-20 crosshatch overflow-hidden">
      {/* Half logo - bottom right */}
      <img
        src={cdn("/logo.webp")}
        alt=""
        className="absolute -bottom-20 -right-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="space-y-16">
          {testimonials.map((testimonial, i) => (
            <blockquote
              key={i}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-neutral-400">
                {testimonial.author} — {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
