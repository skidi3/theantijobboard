"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal(0.2);

  const steps = [
    {
      num: "01",
      title: "A startup just raised $4M",
      desc: "We catch it within 24 hours. SEC filings, Crunchbase, VC announcements, YC batches. Every day, new companies get funded and start hiring."
    },
    {
      num: "02",
      title: "We pick up the phone",
      desc: "Not email. Not LinkedIn DMs. We actually call the founder or head of HR. 'Hey, we saw you just raised. What roles are you hiring for?' Most say yes. They need people."
    },
    {
      num: "03",
      title: "You get the intel",
      desc: "Who's hiring, what they're looking for, how to reach them. Before any job board. Before any recruiter posts it. While the startup is still deciding where to post."
    },
    {
      num: "04",
      title: "You apply when it matters",
      desc: "Not as applicant #847. As one of the first 10. The hiring manager actually reads your resume. They remember your name. That's how you get interviews."
    },
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
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-4">
            We do the work you can't.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl">
            You don't have time to track every funding round, call every startup, and find roles before they're posted. We do. Every single day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`bg-white border border-neutral-200 rounded-2xl p-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <span className="font-serif text-4xl md:text-5xl text-neutral-200">{step.num}</span>
              <h3 className="text-xl text-neutral-900 mt-4 mb-2">{step.title}</h3>
              <p className="text-neutral-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
