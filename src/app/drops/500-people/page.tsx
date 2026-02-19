import Link from "next/link";
import { cdn } from "@/lib/cdn";

export const metadata = {
  title: "Why You're Competing With 500 People | The Anti Job Board",
};

export default function FiveHundredPeoplePage() {
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
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-3">01</p>
            <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">
              Why you're competing with 500 people
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="max-w-none">
              <p className="text-neutral-600 leading-relaxed mb-6">
                Stripe posted a senior engineer role last month. Within 48 hours: 847 applications. The hiring manager looked at maybe 30. Interviewed 6. Hired someone who came through a referral.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                This isn't Stripe being lazy. It's math.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                A recruiter spending 2 minutes per resume, working an 8-hour day, can review 240 applications. That's optimistic. Most spend 7 seconds on the first scan. If your resume doesn't have the exact keywords their ATS is looking for, you're out before a human even sees it.
              </p>

              {/* Stats */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-4">One senior engineer role at Stripe</p>
                <div className="grid grid-cols-3 divide-x divide-neutral-200 text-center">
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">847</p>
                    <p className="text-xs text-neutral-500 mt-1">applied</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">30</p>
                    <p className="text-xs text-neutral-500 mt-1">reviewed</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">1</p>
                    <p className="text-xs text-neutral-500 mt-1">hired (via referral)</p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">It's not just Stripe</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                LinkedIn's own data says the average corporate job gets 250 applicants. For roles at companies people have heard of? 500+. For remote roles at well-funded startups? North of 1,000.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Ashby published hiring data from 100,000+ roles in 2024. The median time a recruiter spent on the initial resume screen was 7.4 seconds. Not 7 minutes. Seconds.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                In those 7 seconds, they're scanning for three things: company names they recognize, job titles that match, and keywords from the job description. Everything else is noise.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">What actually happens to your application</h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">01</span>
                  <div>
                    <p className="text-neutral-900 font-medium">ATS keyword scan</p>
                    <p className="text-neutral-500 text-sm mt-1">Your resume says "managed customer relationships." The job description says "client success." Different words, same skill. Doesn't matter. You're filtered out. The ATS is matching strings, not understanding context.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">02</span>
                  <div>
                    <p className="text-neutral-900 font-medium">The queue</p>
                    <p className="text-neutral-500 text-sm mt-1">If you pass, you join a pile. The recruiter has 15 open roles and 3,000 applications this month. Your resume sits for 2-4 weeks. Sometimes months. Sometimes forever. There's no SLA on reviewing applications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">03</span>
                  <div>
                    <p className="text-neutral-900 font-medium">The 7-second glance</p>
                    <p className="text-neutral-500 text-sm mt-1">The recruiter opens your resume. Scans company names, titles, education. If nothing jumps out in 7 seconds, you're in the "maybe later" pile. "Maybe later" means never.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-serif text-xl text-neutral-300 shrink-0">04</span>
                  <div>
                    <p className="text-neutral-900 font-medium">The referral wins</p>
                    <p className="text-neutral-500 text-sm mt-1">By the time the recruiter gets to your resume, the hiring manager already has 3 strong candidates from referrals. The job post stays up for compliance reasons. You never hear back. The role is filled, the posting lingers for another month.</p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The silence is the answer</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The rejection email you're waiting for? It's not coming. Nobody owns sending rejections. It's literally nobody's job. Most companies set an auto-reject after 90 days if they remember to turn it on. 65% of applicants never hear anything at all.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                This creates a brutal feedback loop. You apply, hear nothing, wonder if you did something wrong, tweak your resume, apply again. Repeat for months. The system isn't giving you feedback because the system isn't designed to.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Where hires actually come from</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Harvard Business Review tracked hiring data across 300 companies. The breakdown:
              </p>

              {/* Breakdown */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Referrals and internal network</span>
                    <span className="font-serif text-lg text-neutral-900">40%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "40%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Direct outreach and recruiting</span>
                    <span className="font-serif text-lg text-neutral-900">30%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: "30%" }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-neutral-600">Job boards and career pages</span>
                    <span className="font-serif text-lg text-neutral-900">30%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div className="bg-neutral-400 h-1.5 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                70% of jobs get filled through referrals and direct outreach. The job was never really "open" to the 500 people who applied. It was open to the 10 people the hiring manager already knew, plus whoever got introduced by someone they trust.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                At early-stage startups it's even more extreme. Founders at 10-50 person companies told us 85-90% of their hires came from their personal network, investor intros, or someone who cold emailed them directly.
              </p>

              {/* Quote */}
              <div className="border-l-2 border-neutral-300 pl-6 mb-8">
                <p className="text-neutral-900 italic leading-relaxed">
                  "I stopped applying to job posts. Response rate went from 2% to 35% when I started emailing founders directly after funding announcements. It's not even close."
                </p>
                <p className="text-sm text-neutral-400 mt-3">— Engineer, now at a Series B startup</p>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The actual game</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The game isn't "write a better resume." The game isn't "apply to more jobs." The game isn't "optimize for ATS keywords." Those are all ways to compete harder in a system designed to ignore you.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The game is: don't compete with 500 people.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                Find companies before they post. Reach the founder before the recruiter is even hired. Be one of 5 people who reached out, not one of 500 who applied.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-dashed border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">This is what we do.</p>
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
