import Link from "next/link";
import { cdn } from "@/lib/cdn";

export const metadata = {
  title: "The 72-Hour Window | The Anti Job Board",
};

export default function SeventyTwoHourWindowPage() {
  return (
    <div
      className="min-h-screen p-6 lg:p-10 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-dashed border-neutral-200">
            <Link href="/drops" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back to drops
            </Link>
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-3">02</p>
            <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">
              The 72-hour window
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="max-w-none">
              <p className="text-neutral-600 leading-relaxed mb-6">
                March 2024. Cognition announces Devin, the "AI software engineer." Two weeks later, they close a $175M Series A at a $2B valuation. 10 employees.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The day the funding hit TechCrunch, Scott Wu's phone exploded. Every VC who passed wanted back in. Every FAANG engineer who ignored the cold email six months ago suddenly wanted to "grab coffee."
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                By hour 72, the first three engineering hires were already locked. One came through Sequoia's talent team. One was a former colleague from Scale AI. One cold emailed Scott the morning of the announcement with a specific technical question about Devin's architecture.
              </p>

              {/* Timeline */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-4">How Cognition's first hires happened</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-16 shrink-0 pt-0.5">Hour 0</span>
                    <p className="text-neutral-600 text-sm">TechCrunch breaks the funding news. Scott texts three former colleagues: "We just closed. Interested?"</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-16 shrink-0 pt-0.5">Hour 8</span>
                    <p className="text-neutral-600 text-sm">Sequoia's talent partner sends over a list of engineers who've expressed interest in "agentic AI" roles. Three look strong.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-16 shrink-0 pt-0.5">Hour 14</span>
                    <p className="text-neutral-600 text-sm">A stranger cold emails Scott. Not "I'd love to connect." A specific technical question about how Devin handles multi-file edits. Scott replies in 20 minutes.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-16 shrink-0 pt-0.5">Hour 24</span>
                    <p className="text-neutral-600 text-sm">First interviews scheduled. Three candidates already in pipeline from network referrals. One from the cold email.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-16 shrink-0 pt-0.5">Hour 48</span>
                    <p className="text-neutral-600 text-sm">One offer extended. Two more in negotiation. Scott hasn't written a single job description.</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-400 w-16 shrink-0 pt-0.5">Week 3</span>
                    <p className="text-neutral-400 text-sm">Job finally posted on Lever. 1,200 applications pour in. Key roles already filled.</p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">This happens every time</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                This pattern repeats with every funding announcement. The 72 hours after a raise is when founders are most responsive, most excited, and most likely to hire fast. They just got validation from investors. They have money to deploy. Their board is pressuring them to scale.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                And they don't want to sort through 1,200 resumes. They want someone they trust to say "talk to this person." Or they want someone who shows up with genuine interest and a specific point of view.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                So they text their network. They ask their investors. They respond to the one person who emailed them something specific that morning.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The response rate cliff</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                We tracked cold outreach response rates from people who reached founders at different points after a funding announcement. The drop-off is steep:
              </p>

              {/* Stats */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Within 72 hours of announcement</span>
                    <span className="font-serif text-lg text-neutral-900">30-40%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "37%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">1-2 weeks after announcement</span>
                    <span className="font-serif text-lg text-neutral-900">10-15%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "13%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">3+ weeks after (job post is live)</span>
                    <span className="font-serif text-lg text-neutral-900">3-5%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-400 h-1.5 rounded-full" style={{ width: "4%" }} />
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                Same email. Same person. 10x difference in response rate. The only variable is timing.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Why founders respond in the window</h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">01</span>
                  <div>
                    <p className="text-neutral-900 font-medium">They're in hiring mode</p>
                    <p className="text-neutral-500 text-sm mt-1">The day after a raise, the first board call is about hiring plan. How many engineers? When do we start? Talent is the #1 priority and the founder is actively thinking about it.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">02</span>
                  <div>
                    <p className="text-neutral-900 font-medium">They're riding momentum</p>
                    <p className="text-neutral-500 text-sm mt-1">They just raised. Press coverage is happening. They're excited about the future. This is when founders are most open to conversations with strangers who share their excitement.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">03</span>
                  <div>
                    <p className="text-neutral-900 font-medium">You demonstrate awareness</p>
                    <p className="text-neutral-500 text-sm mt-1">Reaching out the day after their funding shows you're paying attention to their space. That's a signal. Founders notice when someone cares enough to reach out before the job post exists.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">04</span>
                  <div>
                    <p className="text-neutral-900 font-medium">There's no competition yet</p>
                    <p className="text-neutral-500 text-sm mt-1">Three weeks later, the job post goes live and 800 people apply. In the first 72 hours? Maybe 3-5 people reach out directly. You're not competing with a pile of resumes. You're having a conversation.</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-neutral-300 pl-6 mb-8">
                <p className="text-neutral-900 italic leading-relaxed">
                  "I saw they raised on a Monday. Emailed the founder that night with a specific question about their infra challenges. Had a call Wednesday. Offer by Friday. The job was never posted."
                </p>
                <p className="text-sm text-neutral-400 mt-3">— Senior Engineer, Series A startup</p>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The hard part</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The window works. But catching it requires tracking every funding announcement, every day. Across TechCrunch, The Information, Twitter, Crunchbase, SEC filings. Then researching each company. Finding the founder's email. Writing something specific enough to get a reply.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                By the time you find out about the raise, read the article, research the company, and draft an email, the window might already be closing. Speed matters. Preparation matters more.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-dashed border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">We track every funding round. You get the email while the window is still open.</p>
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
