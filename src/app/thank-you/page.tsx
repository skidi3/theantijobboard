import { Metadata } from "next";
import { Button } from "@/components/Button";
import { cdn } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Welcome to The Anti Job Board. Your first drop is coming soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <img src={cdn("/logo.webp")} alt="The Anti Job Board" className="h-12 w-auto mx-auto mb-8" />

        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mb-4">
          You're in.
        </h1>

        <p className="text-neutral-500 mb-8">
          Welcome to The Anti Job Board. Check your email for next steps — your first drop is coming soon.
        </p>

        <a href="/">
          <Button variant="outline">
            Back to home
          </Button>
        </a>
      </div>
    </main>
  );
}
