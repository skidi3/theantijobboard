"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal(0.2);

  const steps = [
    { num: "01", title: "We track funded startups", desc: "Crunchbase, SEC filings, VC announcements, YC batches — monitored daily." },
    { num: "02", title: "We call to verify", desc: "Not email. Not LinkedIn. We pick up the phone and confirm open roles." },
    { num: "03", title: "You get the list first", desc: "Before it hits any job board. While everyone else is still waiting." },
    { num: "04", title: "You apply early", desc: "10 applicants, not 1000. Your resume actually gets read." },
  ];

  return (
    <section id="how" className="relative bg-neutral-50 px-6 py-24 md:px-12 md:py-32 lg:px-20 dither halftone overflow-hidden">
      {/* Half logo - top right */}
      <img
        src="/logo.png"
        alt=""
        className="absolute -top-20 -right-20 w-40 md:w-64 h-auto pointer-events-none opacity-50 md:opacity-100"
      />
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div>
            <h2
              className={`font-serif text-3xl md:text-4xl text-neutral-900 mb-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              How it works
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`grid grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr] gap-3 sm:gap-4 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <span className="font-serif text-3xl sm:text-4xl text-neutral-200">{step.num}</span>
                  <div>
                    <h3 className="text-lg text-neutral-900 mb-1">{step.title}</h3>
                    <p className="text-neutral-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <img
              src="/how-it-works.png"
              alt="How it works"
              className="w-full max-w-md mx-auto lg:max-w-none h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
