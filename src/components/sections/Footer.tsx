import { cdn } from "@/lib/cdn";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-8 md:py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer">
            <img
              src={cdn("/logo.webp")}
              alt="The Anti Job Board"
              className="h-5 sm:h-6 md:h-7 max-w-[120px] sm:max-w-[140px] md:max-w-none object-contain"
            />
            <span className="font-serif text-base sm:text-lg text-neutral-400">The Anti Job Board</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 md:gap-8 text-sm text-neutral-400">
            <a href="#pricing" className="hover:text-neutral-900 transition-colors duration-300">
              Pricing
            </a>
            <a href="#faq" className="hover:text-neutral-900 transition-colors duration-300">
              FAQ
            </a>
            <a href="#how" className="hover:text-neutral-900 transition-colors duration-300">
              How it works
            </a>
          </div>
        </div>

        <div className="mt-6 pt-5 sm:mt-10 sm:pt-6 md:mt-12 md:pt-8 border-t border-neutral-100 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} The Anti Job Board</span>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
