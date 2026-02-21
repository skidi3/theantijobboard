import Link from "next/link";
import { cdn } from "@/lib/cdn";

export const metadata = {
  title: "The Resume Black Hole | The Anti Job Board",
};

export default function ResumeBlackHolePage() {
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
            <p className="text-xs text-rose-400 uppercase tracking-wider mb-3">04</p>
            <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">
              The resume black hole
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="max-w-none">
              <p className="text-neutral-600 leading-relaxed mb-6">
                I talked to a recruiter at a Series C startup last month. She showed me her Greenhouse dashboard. 4,847 open applications across 12 roles. One recruiter. Part-time, because she also handles HR, onboarding, and office management.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                "How many of these will you actually look at?"
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                "Maybe 200. The ATS filters out about 75% automatically. I'll spend maybe 15 seconds on the ones that pass. If I'm not hooked by line 3 of the resume, I'm on to the next one. I don't have a choice. The math doesn't work any other way."
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">What happens to your resume</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                People imagine a human reading their resume, carefully weighing their experience, maybe circling back to re-read a bullet point. That's not what happens. Here's the actual process:
              </p>

              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="font-serif text-xl text-neutral-300 shrink-0">01</span>
                    <div>
                      <p className="text-neutral-900 font-medium">ATS keyword scan</p>
                      <p className="text-neutral-500 text-sm mt-1">Software scans for exact matches against the job description. "Project management" does not equal "program management." Had a weird PDF format? Two-column layout? Automatic reject. The ATS can't parse it. 75% of resumes never make it past this stage. No human ever sees them.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="font-serif text-xl text-neutral-300 shrink-0">02</span>
                    <div>
                      <p className="text-neutral-900 font-medium">The queue</p>
                      <p className="text-neutral-500 text-sm mt-1">If you pass, congratulations. You're now in a list with 200 other people. The recruiter has 12 roles to fill and no hiring manager has told her which to prioritize this week. Average wait before a human looks: 2-4 weeks. Sometimes months. Sometimes forever. There's no SLA.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="font-serif text-xl text-neutral-300 shrink-0">03</span>
                    <div>
                      <p className="text-neutral-900 font-medium">The 7-second scan</p>
                      <p className="text-neutral-500 text-sm mt-1">When the recruiter finally opens your resume, she glances at company names, job titles, and education. Familiar logos? Keep reading. All small companies she hasn't heard of? Into the "maybe" pile. The average initial screen takes 7.4 seconds. Not 7 minutes. Seconds.</p>
                    </div>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div className="flex gap-4">
                    <span className="font-serif text-xl text-neutral-300 shrink-0">04</span>
                    <div>
                      <p className="text-neutral-900 font-medium">The void</p>
                      <p className="text-neutral-500 text-sm mt-1">Meanwhile, the hiring manager already has 3 strong candidates from referrals. One is a former colleague. One came through an investor intro. One cold emailed the founder directly. The role gets filled. The job post stays up for "pipeline building." Your application sits in the system indefinitely.</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Nobody sends rejections</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                I asked her: "What about rejection emails? When do people hear back?"
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                She laughed. "That's nobody's job. We're supposed to send them, but there's no time. The system can send an auto-reject after 90 days if we remember to turn it on. Most companies forget. Most people just never hear anything."
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                This creates a brutal feedback loop. You apply, hear nothing, wonder what you did wrong. You tweak your resume. You try different keywords. You apply to 30 more. Silence. You start questioning if your experience is good enough. It probably is. The system just isn't designed to tell you.
              </p>

              {/* Stats */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-4">The numbers</p>
                <div className="grid grid-cols-3 divide-x divide-neutral-200 text-center">
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">75%</p>
                    <p className="text-xs text-neutral-500 mt-1">filtered by ATS</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">7s</p>
                    <p className="text-xs text-neutral-500 mt-1">recruiter scan</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-3xl text-neutral-900">65%</p>
                    <p className="text-xs text-neutral-500 mt-1">never hear back</p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">The "apply to 100 jobs" trap</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                There's advice everywhere that says: apply to more jobs. Cast a wider net. Treat it like a numbers game. Some people even brag about applying to 200 jobs in a week using AI tools.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                But the math doesn't improve with volume. If 75% are filtered by ATS and 93% of what remains is passed over in 7 seconds, it doesn't matter if you apply to 100 or 1,000. You're optimizing a broken channel.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                It's like trying to win at roulette by placing more bets. You're still playing a game where the house always wins.
              </p>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Two approaches, side by side</h2>

              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Job board applications</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Sent</span>
                        <span className="text-neutral-900 font-medium">147 applications</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Responses</span>
                        <span className="text-neutral-900 font-medium">6</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Interviews</span>
                        <span className="text-neutral-900 font-medium">2</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Offers</span>
                        <span className="text-neutral-900 font-medium">0</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Time</span>
                        <span className="text-neutral-900 font-medium">4 months</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-3">Direct founder outreach</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Sent</span>
                        <span className="text-neutral-900 font-medium">20 emails</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Responses</span>
                        <span className="text-neutral-900 font-medium">8</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Interviews</span>
                        <span className="text-neutral-900 font-medium">3</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Offers</span>
                        <span className="text-neutral-900 font-medium">1</span>
                      </div>
                      <div className="h-px bg-neutral-200" />
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Time</span>
                        <span className="text-neutral-900 font-medium">3 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-neutral-300 pl-6 mb-8">
                <p className="text-neutral-900 italic leading-relaxed">
                  "Applied to 147 jobs over 4 months. 6 responses. 2 interviews. Zero offers. Then I emailed 20 founders directly after their funding rounds. 8 responses. 3 interviews. 1 offer in 3 weeks."
                </p>
                <p className="text-sm text-neutral-400 mt-3">— Product designer, now at a $50M startup</p>
              </div>

              <h2 className="font-serif text-xl text-neutral-900 mb-4">Skip the system</h2>

              <p className="text-neutral-600 leading-relaxed mb-6">
                The black hole exists because these systems were built for a different era. When there were 50 applicants per role, not 500. When recruiters had time to read. When companies had dedicated talent teams from day one.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Early-stage startups don't have that infrastructure. They have a founder, a product, and money to hire. The fastest path to them isn't through their non-existent application system.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                The workaround: skip the system entirely. Referrals don't go through ATS. Direct founder emails don't sit in queues. You become a person with a specific point of view, not a PDF in a database.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-dashed border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">We give you the contacts. You skip the queue.</p>
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
