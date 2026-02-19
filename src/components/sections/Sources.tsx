"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cdn } from "@/lib/cdn";

interface Source {
  name: string;
  logo?: string;
  category: "platform" | "vc" | "news" | "social" | "official" | "podcast";
}

const sources: Source[] = [
  // Job platforms & data
  { name: "LinkedIn", logo: "/sources/linkedin.png", category: "platform" },
  { name: "Crunchbase", logo: "/sources/crunchbase.png", category: "platform" },
  { name: "PitchBook", logo: "/sources/pitchbook.png", category: "platform" },
  { name: "Indeed", logo: "/sources/indeed.png", category: "platform" },
  { name: "Glassdoor", logo: "/sources/glassdoor.png", category: "platform" },
  { name: "Wellfound", logo: "/sources/wellfound.png", category: "platform" },
  { name: "Product Hunt", logo: "/sources/producthunt.png", category: "platform" },

  // Tier 1 VCs
  { name: "Y Combinator", logo: "/sources/yc.png", category: "vc" },
  { name: "Sequoia Capital", logo: "/sources/sequoia.png", category: "vc" },
  { name: "a16z", logo: "/sources/a16z.png", category: "vc" },
  { name: "Accel", logo: "/sources/accel.png", category: "vc" },
  { name: "Benchmark", logo: "/sources/benchmark.png", category: "vc" },
  { name: "Founders Fund", logo: "/sources/foundersfund.png", category: "vc" },
  { name: "Lightspeed", logo: "/sources/lightspeed.png", category: "vc" },
  { name: "Greylock", logo: "/sources/greylock.png", category: "vc" },
  { name: "Khosla Ventures", logo: "/sources/khosla.png", category: "vc" },
  { name: "Index Ventures", logo: "/sources/indexventures.png", category: "vc" },
  { name: "General Catalyst", logo: "/sources/generalcatalyst.png", category: "vc" },
  { name: "Kleiner Perkins", logo: "/sources/kleiner.png", category: "vc" },
  { name: "NEA", logo: "/sources/nea.png", category: "vc" },
  { name: "IVP", logo: "/sources/ivp.png", category: "vc" },
  { name: "Tiger Global", logo: "/sources/tiger.png", category: "vc" },
  { name: "Insight Partners", logo: "/sources/insight.png", category: "vc" },
  { name: "Coatue", logo: "/sources/coatue.png", category: "vc" },
  { name: "Thrive Capital", logo: "/sources/thrive.png", category: "vc" },
  { name: "Bessemer", logo: "/sources/bessemer.png", category: "vc" },
  { name: "Spark Capital", logo: "/sources/spark.png", category: "vc" },

  // News & media
  { name: "TechCrunch", logo: "/sources/techcrunch.png", category: "news" },
  { name: "The Information", logo: "/sources/theinformation.png", category: "news" },
  { name: "Bloomberg", logo: "/sources/bloomberg.png", category: "news" },
  { name: "Forbes", logo: "/sources/forbes.png", category: "news" },
  { name: "Wired", logo: "/sources/wired.png", category: "news" },
  { name: "Semafor", logo: "/sources/semafor.png", category: "news" },
  { name: "Axios", logo: "/sources/axios.png", category: "news" },

  // Social & founder interviews
  { name: "X / Twitter", logo: "/sources/twitter.png", category: "social" },
  { name: "YouTube", logo: "/sources/youtube.png", category: "social" },
  { name: "Hacker News", logo: "/sources/hackernews.png", category: "social" },
  { name: "Spotify Podcasts", logo: "/sources/spotify.png", category: "podcast" },

  // Official filings
  { name: "SEC Filings", logo: "/sources/sec.png", category: "official" },
  { name: "State Filings", category: "official" },
  { name: "Company Blogs", category: "official" },
  { name: "Press Releases", category: "official" },
];

const categoryLabels: Record<Source["category"], string> = {
  platform: "Platforms & Data",
  vc: "VC Portfolios",
  news: "News & Media",
  social: "Social & Interviews",
  podcast: "Podcasts",
  official: "Official Sources",
};

const categoryOrder: Source["category"][] = ["platform", "vc", "news", "social", "podcast", "official"];

export function Sources() {
  const { ref, isVisible } = useScrollReveal(0.15);

  const grouped = categoryOrder
    .map(cat => ({ category: cat, label: categoryLabels[cat], items: sources.filter(s => s.category === cat) }))
    .filter(g => g.items.length > 0);

  let globalIndex = 0;

  return (
    <section className="relative bg-white px-6 py-24 md:px-12 md:py-32 lg:px-20 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs text-rose-400 uppercase tracking-widest mb-4">Where we look</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-4">
            We monitor everything.<br className="hidden md:block" /> So you don&apos;t have to.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl">
            Every day we scan funding announcements, SEC filings, VC portfolios, founder interviews, news, and job platforms to find startups that just raised and are about to hire.
          </p>
        </div>

        {/* Grouped sources */}
        <div className="space-y-8">
          {grouped.map((group) => (
            <div
              key={group.category}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${300 + categoryOrder.indexOf(group.category) * 100}ms` : "0ms" }}
            >
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-medium mb-3">{group.label}</p>
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                {group.items.map((source) => {
                  const idx = globalIndex++;
                  return (
                    <div
                      key={source.name}
                      className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-3.5 py-2 transition-all duration-700 hover:border-neutral-300 hover:bg-white"
                      style={{
                        transitionDelay: `${300 + idx * 30}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(12px)",
                      }}
                    >
                      {source.logo ? (
                        <div className="w-5 h-5 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={cdn(source.logo)}
                            alt={source.name}
                            className="w-4 h-4 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">{source.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className={`mt-10 text-sm text-neutral-400 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "1200ms" : "0ms" }}
        >
          Updated daily. We catch funding rounds within 24 hours of announcement.
        </p>
      </div>
    </section>
  );
}
