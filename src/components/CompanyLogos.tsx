"use client";

const companies = [
  "Resolve AI",
  "Simile",
  "Entire",
  "Stealth YC",
  "Series A Fintech",
  "Seed Stage AI",
  "Pre-Series B SaaS",
];

export function CompanyLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {companies.map((company) => (
        <div
          key={company}
          className="rounded-md border border-border bg-white px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-dark"
        >
          {company}
        </div>
      ))}
    </div>
  );
}
