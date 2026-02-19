import Link from "next/link";
import { cdn } from "@/lib/cdn";

export const metadata = {
  title: "$50M Raised, No Job Posts | The Anti Job Board",
};

export default function FiftyMillionNoPostsPage() {
  return (
    <div
      className="min-h-screen p-6 lg:p-10 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-dashed border-neutral-200">
            <Link href="/drops" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to drops
            </Link>
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-3">03</p>
            <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">
              $50M raised, no job posts
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="max-w-none">
              <p className="text-neutral-600 leading-relaxed mb-6">
                Anysphere raised $100M in December 2024 at a $2.5B valuation. They make Cursor, the AI code editor that every developer on Twitter seems to be using. At the time of the raise: 12 employees.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Go check their careers page. Check LinkedIn. Check Indeed. Check Greenhouse, Lever, Ashby.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                Nothing. Zero public job posts. And yet they've hired 8 people in the last 4 months.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Why they don't post</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                This is normal. This is how most well-funded startups at the early stage hire. They don't post jobs because they don't need to, and frankly, posting creates more work than it saves.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">01</span>
                  <div>
                    <p className="text-neutral-900 font-medium">They don't have time</p>
                    <p className="text-neutral-500 text-sm mt-1">12 people means no HR department. No recruiting ops. No dedicated talent team. The founders are shipping code, not writing job descriptions. Michael Truell at Anysphere reviews every PR himself. Writing a Lever posting and triaging 800 applications is not how he wants to spend his week.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">02</span>
                  <div>
                    <p className="text-neutral-900 font-medium">They don't need to</p>
                    <p className="text-neutral-500 text-sm mt-1">Andreessen's talent team sends candidates directly. OpenAI engineers who want more equity and ownership reach out on their own. YC's internal Slack has a channel where founders share referrals. The pipeline fills itself through the network without a single posting going live.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">03</span>
                  <div>
                    <p className="text-neutral-900 font-medium">They prefer stealth</p>
                    <p className="text-neutral-500 text-sm mt-1">A job post for "AI Agent Infrastructure Engineer" tells every competitor exactly what you're building next. Cursor's roadmap is competitive intelligence. GitHub Copilot, Windsurf, Codeium are all watching. Why broadcast your hiring priorities to the market?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">04</span>
                  <div>
                    <p className="text-neutral-900 font-medium">Public posts attract noise</p>
                    <p className="text-neutral-500 text-sm mt-1">If Cursor posts a role, they'll get 2,000+ applications. Most from people who haven't used the product. The signal-to-noise ratio is terrible. It's easier to hire through warm intros where someone they trust has already vetted the candidate.</p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">How the hires actually happened</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                We talked to people close to Cursor's hiring. Their last 5 hires came from:
              </p>

              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Hire 1-2</span>
                    <p className="text-neutral-600 text-sm">Two former Stripe engineers. Introduced by Patrick Collison after he saw what Cursor was building at a YC demo.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Hire 3</span>
                    <p className="text-neutral-600 text-sm">An ex-Figma designer. Referred by an angel investor who knew both teams. Never applied anywhere.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Hire 4</span>
                    <p className="text-neutral-600 text-sm">An MIT PhD. Cold emailed the founders about a specific technical problem with Cursor's context window handling. Got a reply in 2 hours.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Hire 5</span>
                    <p className="text-neutral-600 text-sm">A Notion engineer. Had been using Cursor daily for 3 months. Reached out saying he wanted to work on the product he couldn't stop using.</p>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Notice what all 5 have in common: none of them applied through a job board. None of them found a posting on LinkedIn. The roles existed. The budget existed. The urgency existed. But the process was entirely through relationships and direct outreach.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">It's not just Cursor</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                This pattern is everywhere at the early stage. We looked at 50 startups that raised $20M+ in the last 6 months with fewer than 30 employees. Here's what we found:
              </p>

              {/* Stats */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Had zero public job posts at time of raise</span>
                    <span className="font-serif text-lg text-neutral-900">62%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "62%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Had 1-3 posts (mostly senior/exec roles)</span>
                    <span className="font-serif text-lg text-neutral-900">24%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "24%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Had a full careers page with 5+ roles</span>
                    <span className="font-serif text-lg text-neutral-900">14%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-400 h-1.5 rounded-full" style={{ width: "14%" }} />
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                Nearly two-thirds had zero public job posts. But every single one of them hired at least 3 people within 90 days of the raise. The jobs existed. They were just invisible to anyone who only looks on job boards.
              </p>

              {/* Quote */}
              <div className="border-l-2 border-neutral-300 pl-6 mb-8">
                <p className="text-neutral-900 italic leading-relaxed">
                  "We've hired 6 people this year. Zero job posts. I literally don't have time to manage inbound applications. When I need someone, I text 5 people I trust and ask who they know."
                </p>
                <p className="text-sm text-neutral-400 mt-3">— Founder, $30M seed round</p>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Where the jobs live</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The jobs live in group chats, not job boards. They live in investor intros and founder DMs and "hey, know anyone good?" texts. They live in YC Slack channels and a16z's talent portal and first-round capital's network.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Job boards show you maybe 30% of the market. The other 70% is hidden. Not secret, exactly. Just invisible if you only look where everyone else looks.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                The way in: find companies that just raised and reach out before they've even thought about posting. You don't need a referral. You need to show up with genuine interest at the right moment.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-dashed border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">We find these companies. You reach out first.</p>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
