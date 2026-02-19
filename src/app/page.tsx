import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Sources } from "@/components/sections/Sources";
import { Pricing } from "@/components/sections/Pricing";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://theantijobboard.com/#website",
      url: "https://theantijobboard.com",
      name: "The Anti Job Board",
      description: "Find startup jobs before they hit job boards",
      publisher: {
        "@id": "https://theantijobboard.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://theantijobboard.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://theantijobboard.com/#organization",
      name: "The Anti Job Board",
      url: "https://theantijobboard.com",
      logo: {
        "@type": "ImageObject",
        url: "https://theantijobboard.com/logo.webp",
      },
      sameAs: [],
    },
    {
      "@type": "WebPage",
      "@id": "https://theantijobboard.com/#webpage",
      url: "https://theantijobboard.com",
      name: "The Anti Job Board | Find Startup Jobs Before They're Posted",
      isPartOf: {
        "@id": "https://theantijobboard.com/#website",
      },
      about: {
        "@id": "https://theantijobboard.com/#organization",
      },
      description:
        "Find startup jobs before they hit job boards. We call founders at recently funded startups and get you roles with 10 applicants, not 1000.",
    },
    {
      "@type": "Service",
      "@id": "https://theantijobboard.com/#service",
      name: "The Anti Job Board",
      provider: {
        "@id": "https://theantijobboard.com/#organization",
      },
      description:
        "Job discovery service that finds unlisted roles at recently funded startups by calling founders directly",
      serviceType: "Job Board",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Subscription Plans",
        itemListElement: [
          {
            "@type": "Offer",
            name: "The List",
            description:
              "Twice a week, get 10-15 startups that just raised with funding amount, careers page, and founder LinkedIn",
            price: "9",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "9",
              priceCurrency: "USD",
              billingDuration: "P1M",
            },
          },
          {
            "@type": "Offer",
            name: "The Edge",
            description:
              "Daily drops with warm intro templates, notes on how to approach each founder, and early access",
            price: "19",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "19",
              priceCurrency: "USD",
              billingDuration: "P1M",
            },
          },
          {
            "@type": "Offer",
            name: "The Concierge",
            description:
              "Full service: role matching, intro writing, founder outreach, resume review by real recruiters, weekly text check-ins",
            price: "199",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "199",
              priceCurrency: "USD",
              billingDuration: "P1M",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://theantijobboard.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do you find these jobs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We track Crunchbase, SEC filings, VC announcements, YC batches daily. When a company raises, we call their HR or founders to verify what roles they're hiring for.",
          },
        },
        {
          "@type": "Question",
          name: "Is this just a newsletter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every role we list has been verified by a phone call. We know the hiring manager's name, what they're looking for, and often have a direct intro path.",
          },
        },
        {
          "@type": "Question",
          name: "Why early stage startups?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Early equity can make you a millionaire if you negotiate properly. We focus on recently funded startups where your equity actually means something.",
          },
        },
        {
          "@type": "Question",
          name: "What industries do you cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tech startups. Engineering, design, product roles. AI/ML, fintech, SaaS, dev tools, consumer tech.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <Hero />
        <Problem />
        <HowItWorks />
        <Sources />
        <Pricing />
        <SocialProof />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
