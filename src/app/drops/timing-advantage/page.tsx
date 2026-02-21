import Link from "next/link";
import { cdn } from "@/lib/cdn";

export const metadata = {
  title: "Funded Last Week, Hiring Next Week | The Anti Job Board",
};

export default function TimingAdvantagePage() {
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
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-3">05</p>
            <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">
              Funded last week, hiring next week
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="max-w-none">
              <p className="text-neutral-600 leading-relaxed mb-6">
                A startup raises a $30M Series A on Monday.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                By Wednesday, they're having internal conversations about who to hire. By Friday, the founder is texting friends asking for referrals. The following Monday, the first interviews are happening. All before a job description exists.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8 font-medium">
                The job won't be posted for another 3 weeks. But if you reach out now, you're the only candidate.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The funding-to-hiring timeline</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                We tracked 40 startups from the moment they announced a raise to the point they made their first post-funding hire. The pattern was remarkably consistent:
              </p>

              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Week 1</span>
                    <div>
                      <p className="text-neutral-900 text-sm font-medium">Money lands</p>
                      <p className="text-neutral-500 text-sm mt-0.5">First board meeting about hiring plan. Founder makes a list of roles. Texts their network. Asks investors for intros. Internal planning starts immediately.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Week 2-3</span>
                    <div>
                      <p className="text-neutral-900 text-sm font-medium">Network hiring</p>
                      <p className="text-neutral-500 text-sm mt-0.5">Referrals and warm intros come in. First conversations happen. Founders are talking to people they already know or who were introduced by someone they trust. No formal process. Just calls.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-900 w-20 shrink-0 pt-0.5">Week 4+</span>
                    <div>
                      <p className="text-neutral-900 text-sm font-medium">Jobs get posted</p>
                      <p className="text-neutral-500 text-sm mt-0.5">Someone finally writes the job descriptions. Postings go live on Lever, Greenhouse, LinkedIn. 500+ applications pour in within days. The recruiter is overwhelmed immediately.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="text-xs font-medium text-neutral-400 w-20 shrink-0 pt-0.5">Week 6+</span>
                    <div>
                      <p className="text-neutral-400 text-sm font-medium">Key roles filled</p>
                      <p className="text-neutral-400 text-sm mt-0.5">Most critical positions are already taken. Posts stay up for pipeline building. You're applying to a role that was effectively filled 3 weeks ago.</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Why funding = hiring</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                When a startup raises money, there's exactly one thing the board wants them to do: spend it on growth. And the #1 expense for any startup? People. Engineers, designers, sales. The money is earmarked for talent before the wire transfer clears.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Carta published data on where venture funding goes in the first 12 months after a raise. The breakdown isn't surprising:
              </p>

              {/* Stats */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-4">Where a $30M Series A goes (first 12 months)</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Hiring (salaries, recruiting, equity)</span>
                    <span className="font-serif text-lg text-neutral-900">~$21M (70%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "70%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Infrastructure, tools, cloud</span>
                    <span className="font-serif text-lg text-neutral-900">~$4.5M (15%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "15%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Everything else</span>
                    <span className="font-serif text-lg text-neutral-900">~$4.5M (15%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-400 h-1.5 rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                $21M allocated to talent. That's 15-25 new hires, depending on seniority and location. Every one of those hires represents a job that will exist within the next 6 months. Most don't exist on any job board yet.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The first-mover advantage</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                If you reach out in Week 1, here's what's different about your position:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">01</span>
                  <div>
                    <p className="text-neutral-900 font-medium">You're one of 5, not one of 500</p>
                    <p className="text-neutral-500 text-sm mt-1">In the first week after a raise, maybe 3-5 people reach out proactively. By week 4, the job post has 800 applicants. The competition increases by 100x in three weeks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">02</span>
                  <div>
                    <p className="text-neutral-900 font-medium">Founders are at peak energy</p>
                    <p className="text-neutral-500 text-sm mt-1">They just raised. They feel validated. They're thinking about what's possible, not what's difficult. They're more open to conversations with strangers than they'll be in a month when they're drowning in execution.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">03</span>
                  <div>
                    <p className="text-neutral-900 font-medium">You show you're paying attention</p>
                    <p className="text-neutral-500 text-sm mt-1">Reaching out the day after a funding announcement signals something. You're following their space. You care about what they're building. That matters to founders. It's the difference between a cold email and a warm one.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">04</span>
                  <div>
                    <p className="text-neutral-900 font-medium">The role might not exist yet</p>
                    <p className="text-neutral-500 text-sm mt-1">This sounds like a disadvantage but it's not. When a role hasn't been formally defined, the founder is open to being convinced. Your skills might shape the job description rather than the other way around. You go from "does this candidate match our criteria?" to "this person is interesting, what could they do here?"</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-neutral-300 pl-6 mb-8">
                <p className="text-neutral-900 italic leading-relaxed">
                  "The day after we announced our Series A, someone emailed me asking about engineering roles. We hadn't even written the job descriptions yet. She asked a specific question about our architecture that told me she actually understood what we were building. We hired her."
                </p>
                <p className="text-sm text-neutral-400 mt-3">— Founder, $40M AI startup</p>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The hard part</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The timing advantage is real but capturing it requires doing something most people don't. You need to track every funding announcement, every day. Across TechCrunch, The Information, Twitter, Crunchbase, SEC filings, investor blogs.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Then you need to research each company. Understand what they're building. Find the founder's contact. Write something specific enough that they want to reply. All within 72 hours of the announcement, because that's when response rates are highest.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                It's a full-time job on top of your actual job. Which is why almost nobody does it, and why the people who do have a massive advantage.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-dashed border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">We do the tracking for you.</p>
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
