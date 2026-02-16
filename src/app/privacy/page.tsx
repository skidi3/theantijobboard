import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Anti Job Board. Learn how we collect, use, and protect your data.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://theantijobboard.com/privacy",
  },
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity">
          <img src="/logo.png" alt="The Anti Job Board" className="h-8 w-auto" />
          <span className="font-serif text-lg text-neutral-900">The Anti Job Board</span>
        </a>

        <h1 className="font-serif text-4xl text-neutral-900 mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-neutral-600">
          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">What we collect</h2>
            <p>
              When you subscribe, we collect your email and payment info. Payment is handled by DodoPayments, we don't store your card details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">How we use it</h2>
            <p>
              Your email is for sending you job drops and updates. That's it. We don't sell your data to anyone. We don't spam you with random marketing.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Cookies</h2>
            <p>
              We use basic analytics to see how people use the site. Nothing creepy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Third parties</h2>
            <p>
              We use DodoPayments for payments and email tools to send you drops. They have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Your data</h2>
            <p>
              Want your data deleted? Email us and we'll remove you from everything.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-neutral-900 mb-3">Changes</h2>
            <p>
              If we change this policy, we'll update it here.
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
