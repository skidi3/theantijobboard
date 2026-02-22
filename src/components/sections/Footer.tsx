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
            <a href="https://x.com/theantijobboard" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/the-anti-job-board/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="/terms" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
