import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for The Anti Job Board. Read our terms for using our startup job discovery service.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://theantijobboard.com/terms",
  },
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity">
          <img src="/logo.png" alt="The Anti Job Board" className="h-8 w-auto" />
          <span className="font-serif text-lg text-neutral-900">The Anti Job Board</span>
        </a>

        <h1 className="font-serif text-4xl text-neutral-900 mb-8">Terms of Service</h1>

        <div className="space-y-8 text-neutral-600">
          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">What you get</h2>
            <p>
              We send you curated job opportunities at recently funded startups. We verify these by calling founders and HR teams directly. That's it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">No refunds</h2>
            <p>
              All sales are final. We don't offer refunds or guarantees. We give you opportunities with less competition and save you time, but we can't make you get hired. If you're a fresher applying for senior roles, that's on you.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Cancellation</h2>
            <p>
              You can cancel your subscription anytime. You'll keep access until the end of your billing period. No refunds for partial months.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Our role</h2>
            <p>
              We're not recruiters. We don't represent you to companies. We give you information early. What you do with it is up to you.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Accuracy</h2>
            <p>
              We verify roles by phone, but things change. Startups move fast. A role might get filled or pulled before you apply. We do our best but can't guarantee every listing stays open.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Don't be shady</h2>
            <p>
              Don't share your subscription with others. Don't scrape our content. Don't spam the founders we connect you with. Be a decent human.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Changes</h2>
            <p>
              We might update these terms. If we do, we'll let you know by email.
            </p>
          </section>

          <p className="text-sm text-neutral-400 pt-8">
            Last updated: February 2025
          </p>
        </div>
      </div>
    </main>
  );
}
