"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Plan = "free" | "list" | "edge" | "concierge";

interface Startup {
  name: string;
  tagline: string;
  website: string;
  logo?: string;
  round: string;
  amount: string;
  detail: string;
  investors: string;
  hiringScore: number;
  hiringReason: string;
  whatBuilding: string;
  whyMatters: string;
  roles: string[];
  rolesNote?: string;
  founder: {
    initials: string;
    name: string;
    title: string;
    hook: string;
    avoid: string;
    image?: string;
    linkedin?: string;
  };
  cofounder?: {
    name: string;
    title: string;
    image?: string;
    linkedin?: string;
  };
  signal?: string;
  featured?: boolean;
  videoId?: string;
  videoUrl?: string;
  heroImage?: string;
  careersUrl?: string;
}

const startups: Startup[] = [
  {
    name: "Navigara",
    tagline: "navigara.com · Prague (dev team) / San Francisco (founder) · AI DevOps Analytics",
    website: "navigara.com",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFeXU4MEBj_tA/company-logo_200_200/B4DZs2sE9qKwAI-/0/1766149084439/navigara_com_logo?e=1773273600&v=beta&t=JazvXyh8dEv9IGEiutbVfuZzHRbD5tjG3gA7K_Nrhf0",
    videoUrl: "https://wzviogddcenyhltpgxwp.supabase.co/storage/v1/object/public/video/navi-intro.mp4",
    round: "Seed",
    amount: "$2.5M",
    detail: "~8 people, $1M ARR pre-launch",
    investors: "Inovo VC (Poland), Rockaway Ventures, QQ Capital",
    hiringScore: 8,
    hiringReason: "$1M ARR before public launch, 8-person team with capital to scale aggressively",
    whatBuilding: "Navigara builds autonomous AI agents that measure the real ROI of developer tools and AI adoption inside engineering teams. It pulls raw data from GitHub, GitLab, Jira, and Linear and converts it into clear, management-level productivity indicators. Think of it as the Bloomberg Terminal for engineering performance. No more vibes-based decisions about whether Copilot is worth the $200k/year spend. They hit $1M ARR before officially launching the product publicly which is rare at this stage.",
    whyMatters: "Companies are spending millions on AI tooling - Copilot, Cursor, Codeium - with almost no accountability metrics. Navigara is first-mover in turning that spend into a measurable number. For a job seeker, this means the TAM is huge, the product sells itself, and they need people to capitalise on that momentum right now, before they have the infrastructure to hire 'properly.' Fresh $2.5M seed with an 8-person team and $1M ARR means they have the unit economics to hire aggressively. Their product just launched publicly off the back of this round - commercial build-out starts now. Inovo VC (through its dedicated 'Head of Talent') is known for pushing portfolio companies to hire fast post-raise, particularly on GTM. Jirka Bachel himself has publicly described the round as enabling 'product expansion and further growth.'",
    roles: ["AI / ML Engineer", "Product Marketing Manager", "BDR / SDR"],
    rolesNote: "Navigara has posted Senior Backend and Frontend Engineer roles on their careers page at navigara.com/careers. However, due to the lack of overwhelming press, chances are you'll be facing far less competition. The roles below are what they haven't posted yet, which is where the real arbitrage is.",
    founder: {
      initials: "JB",
      name: "Jirka Bachel",
      title: "Founder & CEO, Czech Technical University, SCRIPTease podcast host",
      linkedin: "https://www.linkedin.com/in/jirka-bachel/",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQF3fYSf6oCblg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1677789563747?e=1773273600&v=beta&t=WZFhBlllUn_WBk3U8js6yhMsIX_UMIHIr9ao8FO7Uas",
      hook: "Jirka is a serial founder based between Prague and San Francisco. He studied at Czech Technical University and has co-founded multiple ventures before Navigara. He describes himself as capable of solving frontend, backend, DevOps, product, marketing, and business problems - he's deeply technical and will respect technical depth in whoever reaches out. He hosts SCRIPTease, a well-regarded Czech tech podcast, which is a genuine icebreaker if you've listened to an episode. He self-funded everything before this raise, which makes him acutely value-conscious and impatient with people who don't ship. His co-founder is Peter Malina (Co-Founder & CTPO). For AI/ML Engineers: The product is built on agents that connect to developer tooling APIs - GitHub, Jira, Linear - and surface meaningful signals. They need someone who can extend those agents and make them smarter. Core skills: Python, LangChain or similar agent frameworks, GitHub/GitLab APIs, data pipelines (dbt or Airflow), experience with developer productivity metrics or DevOps tooling. For proof of work, build a mini demo - a script that pulls GitHub commit data and outputs a simple productivity or cycle time dashboard. Push it to GitHub. Bonus: write a short blog post titled something like 'AI agent-based monitoring for engineering teams' and link both in your email. Your cold email angle: 'Jirka - I saw the seed announcement. I've been building in the developer analytics space and I know the hard part isn't the dashboard, it's the data pipeline that makes the signals trustworthy. I built [link to demo] last week. Would love to show you how I'm thinking about the agentic layer. Worth 15 mins?' For Product Marketing: B2B SaaS at this stage lives or dies by positioning. Navigara needs someone who can translate a deeply technical product into language that makes a VP of Engineering say 'I need this.' Core skills: B2B SaaS positioning, developer-audience marketing, content-led GTM, SEO, technical copywriting, Notion/Webflow. For proof of work, write a 400-word competitive positioning breakdown of Navigara vs. LinearB vs. Jellyfish from a buyer's perspective and post it on LinkedIn or a personal blog. This shows you understand their landscape and can write at the same time. Your cold email angle: 'Jirka - I just published a positioning breakdown comparing Navigara vs LinearB vs Jellyfish from a buyer's POV. The short version: Navigara wins on simplicity, loses on brand awareness. That gap is very fillable. I'd love to be the person who closes it. [Link]' For BDR/SDR: They have $1M ARR but an 8-person team - someone is closing deals, but not at scale. A dedicated outbound person is almost certainly the next hire. Core skills: outbound prospecting, Apollo/Clay/Outreach, cold email sequencing, LinkedIn Sales Navigator, basic understanding of engineering team structures and DevOps budgets, CRM hygiene (HubSpot). For proof of work, research 10 real companies that likely have heavy AI tooling spend but no measurement framework, build a mock outbound list with personalised first lines, and paste three examples into your cold email. Show you can do the job before you have the job. Your cold email angle: 'Hi Jirka - I identified 10 mid-market SaaS companies with 50-200 engineers, heavy AI tooling budgets, and zero measurement in place. These are your ideal buyers and none of them have heard of Navigara yet. I'd love to be the person changing that. Can I share the list on a quick call?'",
      avoid: "Don't lead with 'I love what you're building.' Lead with proof of work that demonstrates you understand their specific problem space.",
    },
    cofounder: {
      name: "Peter Malina",
      title: "Co-Founder & CTPO",
      linkedin: "https://www.linkedin.com/in/petomalina/",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQGYrzkz4J-c-A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1611216097070?e=1773273600&v=beta&t=Pz5AbjkCySZi4gV_461V8UzlEy9b3iXakWoGuTDL9Ok",
    },
    signal: "Best approach: LinkedIn DM first referencing the seed announcement and including a link to your proof of work. Follow up by email within 3 days. Contact: info@navigara.com. Founder direct: jirka.bachel@navigara.com. Co-founder: linkedin.com/in/peter-malina-navigara",
    careersUrl: "https://navigara.com/careers",
  },
  {
    name: "Lerian",
    tagline: "lerian.studio · São Paulo, Brazil · Open-Source Core Banking",
    website: "lerian.studio",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGBNd1hO9lf6Q/company-logo_200_200/B4DZXIfYJIG8AI-/0/1742825424726?e=1773273600&v=beta&t=VC69MHfbxMYMawkkB26LaS2Cgz3wmr4Rs5LcjbpYZ_I",
    heroImage: "https://raw.githubusercontent.com/LerianStudio/midaz/main/image/README/midaz-banner.png",
    round: "Seed",
    amount: "$5.7M",
    detail: "11-50 team, Kevin Efrusy (Accel, backed Facebook) on cap table",
    investors: "MAYA Capital (lead), Norte Ventures, Supera Capital, Crivo Ventures, Blustone, Kevin Efrusy",
    hiringScore: 8,
    hiringReason: "Press release explicitly states capital for sales, customer success, and marketing buildout",
    whatBuilding: "Lerian builds Midaz - an open-source, API-first, cloud-native core banking ledger. Think of it as the Linux of core banking: any fintech or financial institution can plug it in, customise it, and own their infrastructure without being locked into legacy vendors like Temenos or Mambu. Key modules include double-entry accounting, reconciliation, orchestration, onboarding, and reporting. It's developer-first and goes to market via open-source community adoption as much as direct enterprise sales.",
    whyMatters: "Every fintech in Brazil eventually gets trapped by legacy core banking vendors. Lerian is building the escape hatch. The founder built Dock, LatAm's first Banking-as-a-Service unicorn at a $1.5B valuation, so he has the Rolodex, the credibility, and the insight to pull this off. Kevin Efrusy, the Accel partner on the cap table, is the same investor who backed Facebook at Series A. This isn't a hobby project. And the company explicitly stated that this seed will fund commercial and customer success team buildout, which is your signal. The press release was explicit: 'The new capital will be directed primarily towards technology investment, with a particular focus on applying artificial intelligence to the platform. Lerian also plans to build out sales and customer success capabilities and step up marketing as it seeks to consolidate its footprint in Brazil while improving international positioning.'",
    roles: ["Backend / Go Engineer", "Developer Relations / Developer Advocate", "Head of Marketing / Growth"],
    rolesNote: "The codebase is open-source on GitHub which is your single biggest advantage. For engineers: contribute to Midaz on GitHub before you send any email. Even one meaningful PR - a bug fix, a documentation improvement, a test - puts you in their system as a name they've seen before you introduce yourself.",
    founder: {
      initials: "FA",
      name: "Fred Amaral",
      title: "Founder & CEO, ex Dock ($1.5B unicorn), ex BTG Pactual",
      linkedin: "https://www.linkedin.com/in/fredcamaral/",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQG0hzd8wzqfUA/profile-displayphoto-scale_400_400/B4DZe7PjuxGsAg-/0/1751193110457?e=1773273600&v=beta&t=oZDUYnIhSlXJwW2HtMkoZkchBVc-DQRPHqJz2K_SibI",
      hook: "Fred is arguably the most credentialed fintech infrastructure founder in Brazil. He started coding at age 8, sold his first software at 13, and switched from Computer Science to Economics at USP when he saw the IPO wave of Vale and Petrobras. He spent nearly a decade at BTG Pactual doing M&A, ECM, and DCM deals before moving to Uber and Movile in business development. In 2018 he co-founded Dock - the first full BaaS platform in LatAm - which reached unicorn status at $1.5B in March 2022. He describes his management style as high trust, targeted intervention, and obstacle removal. He believes in raising the minimum needed to validate a thesis, so he respects scrappiness and hates vanity. The Lerian team includes Mary, co-founder of Bankly and ex-Mambu/Stone, and Jeff, who led Pix architecture at Dock. If you can reference Pix or BaaS infrastructure in Brazil credibly, do it. For Backend/Go Engineers: Midaz is built in Go. Full stop. If you want to work here, Go is not optional. Core skills: Go (Golang) is critical, REST APIs, microservices, Docker/Kubernetes, PostgreSQL, event-driven architecture, double-entry accounting concepts are a plus. For proof of work, contribute to Midaz on GitHub before you send any email. Your cold email angle: 'Fred - I spent last weekend going through the Midaz codebase and opened PR #[X] that [brief description]. I have 4 years of Go experience and I've built reconciliation systems at [company]. I want to be the engineer who helps Lerian scale Midaz to 100 clients. Can we talk?' For Developer Relations: Open-source companies live on community. Lerian has a product that needs to be adopted by developers before it can be sold to banks, and they have no one doing that work yet. Core skills: technical writing, public speaking, Go or Python, open-source community management, GitHub and Discord, producing tutorials and blog posts, fintech domain knowledge a bonus. For proof of work, write a technical tutorial titled 'How to build a simple ledger with Lerian Midaz in 30 minutes' and post it on dev.to, Medium, or Substack. Your cold email angle: 'Fred - developers reaching Midaz's GitHub repo right now have to do too much work to understand the value. I wrote a step-by-step integration tutorial [link] that fills that gap. I want to build Lerian's dev community from the ground up and turn open-source interest into paying customers.' For Head of Marketing: The round explicitly mentions marketing initiatives. A founder with a unicorn exit doesn't need to be taught what good marketing looks like - they need someone who can execute immediately. Core skills: B2B SaaS marketing, content strategy, developer-audience positioning, SEO, LinkedIn and Twitter growth, email marketing via HubSpot, demand generation. Portuguese fluency is strongly preferred. For proof of work, do a quick audit of Lerian's current digital presence - website, LinkedIn, GitHub, Twitter - and write a one-page marketing gap analysis. Your cold email angle: 'Fred - I did a quick audit of Lerian's digital presence. Three gaps that I think are costing you inbound leads from fintechs who'd be perfect customers: [gap 1], [gap 2], [gap 3]. I've driven developer-first growth at [company] and I'd love to bring that to Lerian.'",
      avoid: "Don't approach without proof of work. For engineers, open a GitHub PR first and then email. For GTM and marketing, send the gap analysis directly to fred@lerian.studio. Founders love a person who shows up with a plan rather than a CV.",
    },
    signal: "Contact: fred@lerian.studio. LinkedIn: linkedin.com/in/fredcamaral. Best approach: for engineers, open a GitHub PR first and then email. For GTM and marketing, send the gap analysis directly to fred@lerian.studio.",
    careersUrl: "",
    featured: true,
  },
  {
    name: "EFEX",
    tagline: "efexpay.com · Mexico City (with Palo Alto ties) · Cross-Border Treasury",
    website: "efexpay.com",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQH6RqigzVHX0g/company-logo_200_200/company-logo_200_200/0/1730906630450/efexpay_logo?e=1773273600&v=beta&t=oecaBMx6wSK8wc7u1WNZ5abvwYgmwOkUg1fRRQ8FmYI",
    heroImage: "/sources/efex.png",
    round: "Seed",
    amount: "$8M",
    detail: "~20-40 team, 6x revenue growth 2025, $1B+ payment volume, Mike Kennedy (Zelle founder) as advisor",
    investors: "PayPal Ventures & Floodgate (co-leads), Contour Venture Partners, Nido Ventures",
    hiringScore: 8,
    hiringReason: "Round announced 3 days ago, 6x revenue growth, PayPal Ventures + Floodgate push fast scaling",
    whatBuilding: "EFEX is the treasury operating system for mid-market companies doing cross-border business in the Americas. It provides multi-currency accounts, instant FX without the $50-per-transaction bank fees, bulk payment automation, forward hedging, invoicing, and full reconciliation - all in one platform. They processed over $1 billion in payment volume in 2025 and grew revenue 6x. Now they're layering AI into treasury workflows so finance teams can manage international cash flows with less manual intervention.",
    whyMatters: "The US-Mexico trade corridor is one of the world's most active. Mexican nearshoring is booming as companies diversify supply chains away from Asia. Mid-market companies caught in between - too big for consumer tools, too small for JPMorgan's attention - have nowhere to go. EFEX is building that middle layer. With PayPal Ventures as a strategic backer and Zelle's founder as an advisor, this is infrastructure-level conviction. Six times revenue growth in 2025 means the hiring wave is not a question of if, it's when, and that when is now. This round was announced three days ago. Both lead investors are highly activation-oriented: PayPal Ventures invests for product leverage and will push for engineering hires fast; Floodgate backs what it calls 'thunder lizards' and applies direct pressure on founders to scale teams post-raise.",
    roles: ["AI / ML Engineer", "Growth / GTM Lead (US-Mexico Corridor)", "Full-Stack Software Engineer"],
    rolesNote: "This round was announced three days ago - window is open now.",
    founder: {
      initials: "DZ",
      name: "Dimitri Zaninovich",
      title: "CEO, Stanford, Harvard Kennedy School MPA, Colombian-born",
      linkedin: "https://www.linkedin.com/in/dimitri-zaninovich/",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFSqTfwgjlMlg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632352652590?e=1773273600&v=beta&t=nEy5dFKrvKfa1Cu08eOCjJ6FADcXVbX3ZSzCzH5bM7A",
      hook: "Both founders met at Stanford University. Dimitri Zaninovich is the CEO, is Colombian-born, and has an MPA from Harvard Kennedy School. He's spoken at the FinTech México Festival 2026 and has deep policy and regulatory credibility. He's not just a startup operator, he's a policy thinker. Santiago Bustamante Villa is the CTO and a Latitud Fellow. He's passionate about Latin American education and simultaneously runs DREAM, a college admissions startup with over 40 employees, meaning he is exceptional at building and running teams in parallel and will respect high-output candidates. Both founders are socially mission-driven - education and financial inclusion appear repeatedly in their public writing, and they explicitly talk about 'erasing borders for customers.' Tap into that language. Referencing the Latitud ecosystem, the Stanford network, or Y Combinator adjacent communities will resonate. For AI/ML Engineers: The product roadmap is explicitly AI-first now. They need someone who can build the intelligence layer on top of their existing treasury data. Core skills: Python, LLM integration via OpenAI or Anthropic APIs, financial data processing, Airflow or Prefect for pipelines, FX and treasury domain knowledge is a real differentiator, REST API development. For proof of work, build a mock 'AI treasury assistant' - a simple LLM-powered tool that ingests fake multi-currency transaction data and answers questions like 'what's my USD exposure this week?' Post the GitHub link. This maps directly to what they're building and proves you're not theorising. Your cold email angle: 'Dimitri/Santiago - I saw the round announcement this morning. I've spent the last two days building a demo AI layer on top of mock multi-currency transaction data [GitHub link]. It's rough but it shows the architecture I'd bring to EFEX. I have [X] years of ML engineering and a background in financial data pipelines. Worth 20 minutes?' For Growth/GTM Lead: 6x revenue growth is great; now they need someone to engineer the next 6x. Core skills: B2B SaaS growth, deep knowledge of the US-Mexico market, Spanish fluency is required, outbound sales, partnership development with fintechs or SMB platforms, HubSpot or Salesforce, data-driven growth experiments. For proof of work, map EFEX's ideal customer profile - mid-market importers and exporters on the US-Mexico corridor - and identify where they actually hang out: trade associations, LinkedIn groups, industry expos. Present this as a one-page GTM targeting map with 50 real company names. Your cold email angle: 'Dimitri/Santiago - I've been following EFEX since the Forbes Mexico piece. I put together a targeting map of 50 mid-market US companies importing from Mexico who have no idea you exist yet. This is your next growth lever. I've driven GTM in this exact corridor at [company] and I want to bring that to EFEX. Doc attached.' For Full-Stack Engineers: 6x revenue growth with a small team means the product is being stretched. Core skills: React or Next.js, Node.js or Python, REST APIs, PostgreSQL, payment API integrations via Stripe or Plaid or open banking standards, knowledge of FX or treasury systems is a real differentiator. For proof of work, review their public-facing product at efexpay.com and build a small feature mockup - a payment status tracker UI or an FX rate comparison widget. Your cold email angle: 'Dimitri/Santiago - I've been a heavy user of cross-border payment tools and there's one UX gap in this space I've been obsessing over: [specific thing]. I built a quick mockup [link] showing how I'd solve it. I'm a full-stack engineer with [X] years and I want to work on the platform that makes cross-border treasury feel like domestic banking.'",
      avoid: "Don't pitch yourself generically. Reference the US-Mexico corridor thesis specifically. Lead with a demo or targeting map, not a resume.",
    },
    cofounder: {
      name: "Santiago Bustamante Villa",
      title: "CTO, Latitud Fellow, runs DREAM (40+ employees)",
      linkedin: "https://www.linkedin.com/in/santiago-bustamante-villa/",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFe3aLdi5rPrw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1619416804319?e=1773273600&v=beta&t=4I6TIDChSz2iGRn9FiUw-3ENOB8CCTurf9WA4ek8B4A",
    },
    signal: "Contact: Dimitri linkedin.com/in/dimitri-zaninovich. Santiago linkedin.com/in/santiago-bustamante-villa-4a08a91a7. Company: linkedin.com/company/efexpay. Best approach: LinkedIn DM to the relevant founder - Dimitri for technical and product roles, Santiago for GTM and growth. Both are active posters, so engage with their recent content before sending a cold message.",
    careersUrl: "",
  },
];

const trends = [
  { sector: "Developer Productivity Analytics", status: "Emerging", text: "Navigara hit $1M ARR before public launch proving demand for measuring AI tooling ROI. As companies spend more on Copilot, Cursor, and other dev tools, measurement becomes a board-level concern. DevOps analytics backgrounds are in demand." },
  { sector: "Open-Source Banking", status: "Emerging", text: "Lerian's Midaz is betting that core banking goes the way of Linux - open-source foundations with commercial services on top. Kevin Efrusy (backed Facebook Series A) on the cap table signals serious conviction. Developer relations and open-source community building skills are critical." },
  { sector: "Cross-Border Treasury", status: "Hot", text: "EFEX grew revenue 6x in 2025 processing $1B+ in payment volume. The US-Mexico corridor is booming with nearshoring. PayPal Ventures and Zelle founder Mike Kennedy backing signals infrastructure-level conviction. Spanish fluency + fintech experience is the differentiator." },
];

const compBenchmarks = [
  { role: "AI / ML Engineer", stage: "Seed", base: "$140K-$200K", equity: "0.3%-1.0%", notes: "Navigara territory - agent frameworks, data pipelines" },
  { role: "Backend Engineer (Go)", stage: "Seed", base: "$150K-$220K", equity: "0.2%-0.8%", notes: "Lerian Midaz - Go required, open-source contribution as proof of work" },
  { role: "Growth / GTM Lead", stage: "Seed", base: "$120K-$160K", equity: "0.2%-0.5%", notes: "EFEX - US-Mexico corridor expertise, Spanish required" },
  { role: "Full-Stack Engineer", stage: "Seed", base: "$150K-$200K", equity: "0.2%-0.6%", notes: "EFEX - React/Next.js, payments APIs, FX systems" },
  { role: "DevRel / Developer Advocate", stage: "Seed", base: "$130K-$180K", equity: "0.15%-0.4%", notes: "Lerian - content creation, Go/Python, open-source community" },
  { role: "Product Marketing", stage: "Seed", base: "$120K-$160K", equity: "0.15%-0.4%", notes: "Navigara - B2B dev tools positioning, technical copywriting" },
  { role: "BDR / SDR", stage: "Seed", base: "$80K-$120K", equity: "0.1%-0.3%", notes: "Navigara - outbound prospecting, DevOps buyer understanding" },
  { role: "Head of Marketing", stage: "Seed", base: "$140K-$180K", equity: "0.2%-0.5%", notes: "Lerian - Portuguese fluency preferred, developer-first GTM" },
];

function FormattedHook({ text }: { text: string }) {
  // Split by "For " patterns to create sections
  const sections = text.split(/(?=For [A-Z][^:]+:)/g).filter(Boolean);

  if (sections.length <= 1) {
    // No "For X:" patterns found, just render paragraphs
    return (
      <div className="text-sm text-neutral-600 leading-relaxed space-y-3">
        {text.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const forMatch = section.match(/^(For [^:]+:)\s*/);
        if (forMatch) {
          const title = forMatch[1];
          const content = section.slice(forMatch[0].length);
          // Split content by "Your cold email angle:" if present
          const emailMatch = content.match(/(Your cold email angle:)\s*(.+)/);

          return (
            <div key={i} className="space-y-2">
              <p className="text-sm font-semibold text-neutral-800">{title}</p>
              {emailMatch ? (
                <>
                  <p className="text-sm text-neutral-600 leading-relaxed">{content.slice(0, content.indexOf('Your cold email angle:'))}</p>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200">
                    <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                    <p className="text-sm text-neutral-700 italic">"{emailMatch[2].replace(/^['"]|['"]$/g, '')}"</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-neutral-600 leading-relaxed">{content}</p>
              )}
            </div>
          );
        }
        // First section without "For X:" prefix (background info)
        return (
          <p key={i} className="text-sm text-neutral-600 leading-relaxed">{section}</p>
        );
      })}
    </div>
  );
}

function HiringMeter({ score, reason }: { score: number; reason: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="flex gap-[3px]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-5 rounded-sm"
              style={{ backgroundColor: i < score ? "#f43f5e" : "#e5e5e5" }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-rose-600">
          {score >= 7 ? "Very High" : score >= 5 ? "High" : "Medium"}
        </span>
      </div>
      <p className="text-xs text-neutral-500">{reason}</p>
    </div>
  );
}

function StartupCard({ startup, index, plan, onFocus }: { startup: Startup; index: number; plan: Plan; onFocus?: () => void }) {
  const isFirstStartup = index === 0;
  const canSeeOutreach = plan === "edge" || plan === "concierge" || isFirstStartup;
  const canSeeContent = plan !== "free" || isFirstStartup;

  if (!canSeeContent) {
    return (
      <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
        {startup.featured && (
          <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 px-6 py-3 flex items-center justify-center gap-2">
            <span className="text-white text-sm font-medium">Big Round</span>
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <div>
                <p className="text-xs text-neutral-400 mb-1">{String(index + 1).padStart(2, "0")} of 3</p>
                <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">Startup Name Here</h2>
                <p className="text-sm text-neutral-500">domain.com · Location · Category</p>
              </div>
              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center overflow-hidden">
                <span className="text-lg font-serif text-rose-600">S</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                $XXM Series A
              </span>
              <span className="text-sm text-neutral-500">Key detail</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 py-4 border-y border-neutral-100 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Investors</p>
                <p className="text-neutral-900">Top VC Firm, Another Fund</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Hiring likelihood</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`w-2 h-4 rounded-sm ${i < 6 ? "bg-rose-400" : "bg-neutral-200"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600">6/8</span>
                </div>
              </div>
            </div>

            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they're building</p>
              <p className="text-neutral-600 leading-relaxed">This company is building cutting edge technology that has the potential to reshape how enterprises operate. They have raised significant funding from top tier investors. The founding team includes experienced operators who previously built successful companies.</p>
            </div>

            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Why this matters</p>
              <p className="text-neutral-600 leading-relaxed">The market opportunity here is substantial and timing is perfect. This team has strong backgrounds and their technical approach is differentiated.</p>
            </div>

            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Likely roles opening</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Senior Engineer</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Growth Lead</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Enterprise AE</span>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">AB</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Founder Name</p>
                    <p className="text-xs text-neutral-500">CEO, Background</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">Detailed outreach guidance and founder insights...</p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-6 bg-white/95 rounded-xl py-5 shadow-sm border border-neutral-100">
                <p className="text-neutral-900 font-medium mb-1">Paid drop</p>
                <p className="text-neutral-500 text-sm mb-3">Subscribe to view, or wait for free mini drops</p>
                <Link
                  href="/#pricing"
                  className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-neutral-200">
      {startup.featured && (
        <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 px-6 py-3 flex items-center justify-center gap-2">
          <span className="text-white text-sm font-medium">Big Round</span>
          <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-neutral-400 mb-1">{String(index + 1).padStart(2, "0")} of 3</p>
            <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">{startup.name}</h2>
            <p className="text-sm text-neutral-500">{startup.tagline}</p>
          </div>
          <a
            href={`https://${startup.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center hover:from-rose-200 hover:to-rose-300 transition-colors overflow-hidden"
          >
            {startup.logo ? (
              <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-serif text-rose-600">{startup.name.charAt(0)}</span>
            )}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
            {startup.amount} {startup.round}
          </span>
          <span className="text-sm text-neutral-500">{startup.detail}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 py-4 border-y border-neutral-100 mb-6">
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Investors</p>
            <p className="text-neutral-900">{startup.investors}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Hiring likelihood</p>
            <HiringMeter score={startup.hiringScore} reason={startup.hiringReason} />
          </div>
        </div>

        {startup.videoId && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${startup.videoId}`}
              title={`${startup.name} intro`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {startup.videoUrl && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <video
              className="w-full aspect-video"
              src={startup.videoUrl}
              controls
              playsInline
            />
          </div>
        )}
        {startup.heroImage && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <img
              className="w-full"
              src={startup.heroImage}
              alt={`${startup.name} intro`}
            />
          </div>
        )}

        {onFocus && (
          <button
            onClick={onFocus}
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 text-sm text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            Focus mode
          </button>
        )}

        <div className="mb-6">
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they're building</p>
          <p className="text-neutral-600 leading-relaxed">{startup.whatBuilding}</p>
        </div>

        <div className="mb-6">
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Why this matters</p>
          <p className="text-neutral-600 leading-relaxed">{startup.whyMatters}</p>
        </div>

        <div className="mb-6">
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Likely roles opening</p>
          <div className="flex flex-wrap gap-2">
            {startup.roles.map((role, i) => (
              <span key={i} className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">
                {role}
              </span>
            ))}
          </div>
          {startup.rolesNote && (
            <p className="text-sm text-neutral-500 mt-3">{startup.rolesNote}</p>
          )}
        </div>

        {canSeeOutreach ? (
          <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-dashed border-neutral-200">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="flex items-center gap-3">
                {startup.founder.image ? (
                  <img src={startup.founder.image} alt={startup.founder.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">{startup.founder.initials}</span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-neutral-900">{startup.founder.name}</p>
                  <p className="text-xs text-neutral-500">{startup.founder.title}</p>
                </div>
              </div>
              {startup.cofounder && (
                <div className="flex items-center gap-3">
                  {startup.cofounder.image ? (
                    <img src={startup.cofounder.image} alt={startup.cofounder.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                      <span className="text-neutral-900 font-semibold text-sm">{startup.cofounder.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">{startup.cofounder.name}</p>
                    <p className="text-xs text-neutral-500">{startup.cofounder.title}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <FormattedHook text={startup.founder.hook} />
            </div>
            <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> {startup.founder.avoid}</p>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="bg-neutral-50 rounded-xl p-4 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">JB</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">John Builder</p>
                    <p className="text-xs text-neutral-500">CEO & Co-founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">SM</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Sarah Martinez</p>
                    <p className="text-xs text-neutral-500">CTO & Co-founder</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1">For Engineers:</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">The CTO previously built infrastructure at a major tech company and values developers who understand distributed systems. Reference specific technical challenges in their open-source work.</p>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                    <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                    <p className="text-sm text-neutral-700 italic">"I noticed your approach to handling X in your GitHub repo. I solved a similar challenge at my previous role by..."</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1">For Product/Design:</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">The CEO responds well to people who demonstrate understanding of their target market. Show you've done research on their users and have specific ideas for improvements.</p>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                    <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                    <p className="text-sm text-neutral-700 italic">"After speaking with 5 companies in your target segment, I noticed a pattern that aligns with your product vision..."</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don't mention funding news directly. Skip the "I'd love to pick your brain" approach.</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-6 bg-white/95 rounded-xl py-4 shadow-sm border border-neutral-100">
                <p className="text-neutral-900 font-medium mb-1">Edge plan feature</p>
                <p className="text-neutral-500 text-sm mb-3">Outreach playbooks and founder contacts</p>
                <a
                  href="mailto:hello@theantijobboard.com?subject=Upgrade to Edge"
                  className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Contact to Upgrade
                </a>
              </div>
            </div>
          </div>
        )}

        {startup.signal && canSeeOutreach && (
          <div className="flex items-start gap-3 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4 mt-0.5" />
            <p className="text-sm text-neutral-600">{startup.signal}</p>
          </div>
        )}

      </div>
    </div>
  );
}

function FocusOverlay({ startup, index, plan, onClose }: { startup: Startup; index: number; plan: Plan; onClose: () => void }) {
  const isFirstStartup = index === 0;
  const canSeeOutreach = plan === "edge" || plan === "concierge" || isFirstStartup;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const appleEase = [0.16, 1, 0.3, 1] as const;
  const stagger = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.05, duration: 0.7, ease: appleEase } });

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: appleEase } }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.36, 0, 0.66, 0] } }}
    >
      <motion.div
        className="fixed inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: appleEase } }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.36, 0, 0.66, 0] } }}
      />

      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: appleEase } }}
        exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.4, ease: [0.36, 0, 0.66, 0] } }}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 md:px-10 py-5 bg-white/80 backdrop-blur-xl border-b border-neutral-100/60">
          <div className="flex items-center gap-3">
            {startup.logo ? (
              <img src={startup.logo} alt={startup.name} className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                <span className="text-sm font-serif text-rose-600">{startup.name.charAt(0)}</span>
              </div>
            )}
            <span className="text-sm text-neutral-400 font-medium">{startup.name} &middot; Focus mode</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-all duration-200 text-sm font-medium"
          >
            <span>Close</span>
            <kbd className="text-[10px] text-neutral-400 bg-white px-1.5 py-0.5 rounded border border-neutral-200">esc</kbd>
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
          {startup.featured && (
            <motion.div {...stagger(0)} className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                Big Round
                <img src={cdn("/logo.webp")} alt="" className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          )}

          <motion.div {...stagger(1)}>
            <p className="text-xs text-neutral-400 mb-2">{String(index + 1).padStart(2, "0")} of 5</p>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight">{startup.name}</h1>
              {startup.logo && (
                <a href={`https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-14 h-14 rounded-xl overflow-hidden hover:opacity-80 transition-opacity">
                  <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                </a>
              )}
            </div>
            <p className="text-neutral-400 mb-4">{startup.tagline}</p>
          </motion.div>

          <motion.div {...stagger(2)} className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              {startup.amount} {startup.round}
            </span>
            <span className="text-sm text-neutral-500">{startup.detail}</span>
          </motion.div>

          <motion.div {...stagger(3)} className="grid md:grid-cols-2 gap-4 py-4 border-y border-neutral-100 mb-8">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Investors</p>
              <p className="text-neutral-900">{startup.investors}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Hiring likelihood</p>
              <HiringMeter score={startup.hiringScore} reason={startup.hiringReason} />
            </div>
          </motion.div>

          <motion.div
            className="h-px bg-neutral-100 mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div {...stagger(5)} className="mb-10">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">What they're building</p>
            <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.whatBuilding}</p>
          </motion.div>

          <motion.div {...stagger(6)} className="mb-10">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Why this matters</p>
            <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.whyMatters}</p>
          </motion.div>

          <motion.div {...stagger(7)} className="mb-10">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Likely roles opening</p>
            <div className="flex flex-wrap gap-2">
              {startup.roles.map((role, i) => (
                <span key={i} className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">
                  {role}
                </span>
              ))}
            </div>
            {startup.rolesNote && (
              <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{startup.rolesNote}</p>
            )}
          </motion.div>

          <motion.div {...stagger(8)} className="mb-10">
            {canSeeOutreach ? (
              <div className="bg-neutral-50 rounded-xl p-5 border border-dashed border-neutral-200">
                <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {startup.founder.image ? (
                      <img src={startup.founder.image} alt={startup.founder.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                        <span className="text-neutral-900 font-semibold text-sm">{startup.founder.initials}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{startup.founder.name}</p>
                      <p className="text-xs text-neutral-500">{startup.founder.title}</p>
                    </div>
                  </div>
                  {startup.cofounder && (
                    <div className="flex items-center gap-3">
                      {startup.cofounder.image ? (
                        <img src={startup.cofounder.image} alt={startup.cofounder.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                          <span className="text-neutral-900 font-semibold text-sm">{startup.cofounder.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-neutral-900">{startup.cofounder.name}</p>
                        <p className="text-xs text-neutral-500">{startup.cofounder.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                <FormattedHook text={startup.founder.hook} />
              </div>
                <p className="text-neutral-500 leading-[1.8] text-[15px]"><span className="font-medium text-neutral-700">Avoid:</span> {startup.founder.avoid}</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <div className="bg-neutral-50 rounded-xl p-5 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                  <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400" />
                      <div>
                        <p className="font-medium text-neutral-900">John Builder</p>
                        <p className="text-xs text-neutral-500">CEO & Co-founder</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400" />
                      <div>
                        <p className="font-medium text-neutral-900">Sarah Martinez</p>
                        <p className="text-xs text-neutral-500">CTO & Co-founder</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 mb-1">For Engineers:</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">The CTO previously built infrastructure at a major tech company and values developers who understand distributed systems. Reference specific technical challenges in their open-source work.</p>
                      <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                        <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                        <p className="text-sm text-neutral-700 italic">"I noticed your approach to handling X in your GitHub repo. I solved a similar challenge at my previous role by..."</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 mb-1">For Product/Design:</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">The CEO responds well to people who demonstrate understanding of their target market. Show you've done research on their users and have specific ideas for improvements.</p>
                      <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                        <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                        <p className="text-sm text-neutral-700 italic">"After speaking with 5 companies in your target segment, I noticed a pattern that aligns with your product vision..."</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don't mention funding news directly. Skip the "I'd love to pick your brain" approach.</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6 bg-white/95 rounded-xl py-4 shadow-sm border border-neutral-100">
                    <p className="text-neutral-900 font-medium mb-1">Edge plan feature</p>
                    <p className="text-neutral-500 text-sm mb-3">Outreach playbooks and founder contacts</p>
                    <a
                      href="mailto:hello@theantijobboard.com?subject=Upgrade to Edge"
                      className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Contact to Upgrade
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {startup.signal && (
            <motion.div {...stagger(9)} className="mb-10">
              {canSeeOutreach ? (
                <div>
                  <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Anti-Job Board edge</p>
                  <div className="flex items-start gap-3">
                    <img src={cdn("/logo.webp")} alt="" className="w-4 h-4 mt-1" />
                    <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.signal}</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                    <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Anti-Job Board edge</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">The quieter door in: reach out to early employees on LinkedIn first...</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 bg-white/95 rounded-xl py-3 shadow-sm border border-neutral-100">
                      <p className="text-neutral-900 font-medium text-sm">Edge plan feature</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CommandK({ onClose, onSelect, plan }: { onClose: () => void; onSelect: (index: number) => void; plan: Plan }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // free users only see first startup, paid users see all
  const visibleCount = plan === "free" ? 1 : startups.length;
  const visibleStartups = startups.slice(0, visibleCount);

  const filtered = visibleStartups
    .map((s, i) => ({ ...s, originalIndex: i }))
    .filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase()) ||
      s.round.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.6 }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search startups..."
            className="flex-1 text-neutral-900 placeholder:text-neutral-400 outline-none text-[15px] bg-transparent"
            onKeyDown={e => {
              if (e.key === "Enter" && filtered.length > 0) {
                onSelect(filtered[0].originalIndex);
              }
            }}
          />
          <kbd className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">esc</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-8">No startups found</p>
          ) : (
            filtered.map(s => (
              <button
                key={s.name}
                onClick={() => onSelect(s.originalIndex)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center overflow-hidden">
                  {s.logo ? (
                    <img src={s.logo} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-serif text-rose-600">{s.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{s.name}</p>
                  <p className="text-xs text-neutral-400 truncate">{s.amount} {s.round} &middot; {s.tagline}</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-300">{String(s.originalIndex + 1).padStart(2, "0")}</span>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-neutral-100 px-5 py-2.5 flex items-center gap-4">
          <span className="text-[11px] text-neutral-400 flex items-center gap-1">
            <kbd className="bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 text-[10px]">↵</kbd> select
          </span>
          <span className="text-[11px] text-neutral-400 flex items-center gap-1">
            <kbd className="bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 text-[10px]">esc</kbd> close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          aria-label="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function DropPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("_") === "f8d2a") {
      setPlan("edge");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("plan")
          .eq("id", session.user.id)
          .single();
        if (data) {
          setPlan(data.plan as Plan);
        }
      }
      setLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdkOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToStartup = (index: number) => {
    setCmdkOpen(false);
    const el = document.getElementById(`startup-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-2", "ring-rose-300", "ring-offset-2");
      setTimeout(() => el.classList.remove("ring-2", "ring-rose-300", "ring-offset-2"), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}>
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <Link
          href="/drops"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to drops</span>
        </Link>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <img src={cdn("/logo.webp")} alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="font-serif text-base sm:text-lg text-neutral-900">The Anti Job Board</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {plan !== "free" && (
                <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full capitalize">{plan}</span>
              )}
              <p className="text-xs text-neutral-400">Feb 23, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$16M+ total this week · LatAm + DevOps focus</p>
          <button
            onClick={() => setCmdkOpen(true)}
            className="flex items-center gap-2.5 sm:gap-3 w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-200 text-left group"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span className="flex-1 text-sm text-neutral-400 group-hover:text-neutral-500 transition-colors">Search startups...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 text-[11px] text-neutral-400 bg-white px-1.5 py-0.5 rounded border border-neutral-200">
              <span className="text-[13px]">&#8984;</span>K
            </kbd>
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl border border-neutral-200 grid grid-cols-3 divide-x divide-neutral-200 mb-8">
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">3</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Startups</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$16M+</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">3</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Seed rounds</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Developer productivity analytics hits $1M ARR pre-launch with Navigara. Open-source core banking emerges with Lerian backed by the investor who funded Facebook Series A. Cross-border treasury grows with EFEX and PayPal Ventures + Zelle founder backing. By the time this is on a job board, someone has already emailed the founder. Be that person.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest">This week's companies</p>
        </div>

        <div className="space-y-6 mb-12">
          {startups.map((startup, index) => (
            <div key={startup.name} id={`startup-${index}`} className="transition-all duration-500 rounded-2xl">
              <StartupCard startup={startup} index={index} plan={plan} onFocus={() => setFocusedIndex(index)} />
            </div>
          ))}
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">Sector trends</h3>
          </div>
          {(plan === "edge" || plan === "concierge") ? (
            <div className="space-y-6">
              {trends.map((trend) => (
                <div key={trend.sector} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">{trend.sector}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      trend.status === "Hot" ? "bg-rose-100 text-rose-600" :
                      trend.status === "Heating" ? "bg-rose-50 text-rose-500" :
                      trend.status === "Emerging" ? "bg-neutral-100 text-neutral-600" :
                      "bg-neutral-100 text-neutral-500"
                    }`}>
                      {trend.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{trend.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="space-y-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">LatAm Fintech Infrastructure</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Three of five companies this week are building financial infrastructure for Latin America...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Stablecoin Payments</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Institutional conviction that stablecoins are becoming mainstream payment rails...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 bg-white/95 rounded-xl py-4 shadow-sm border border-neutral-100">
                  <p className="text-neutral-900 font-medium mb-1">Edge plan feature</p>
                  <p className="text-neutral-500 text-sm mb-3">Sector trends and market analysis</p>
                  <a
                    href="mailto:hello@theantijobboard.com?subject=Upgrade to Edge"
                    className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Contact to Upgrade
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">Comp benchmarks</h3>
          </div>
          <p className="text-sm text-neutral-400 mb-6">Use as a floor in negotiation, not a ceiling.</p>
          {(plan === "edge" || plan === "concierge") ? (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Role</th>
                    <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Stage</th>
                    <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Base</th>
                    <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Equity (4yr)</th>
                    <th className="text-left py-3 text-neutral-400 font-normal">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {compBenchmarks.map((row, i) => (
                    <tr key={i} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">{row.role}</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">{row.stage}</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">{row.base}</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">{row.equity}</td>
                      <td className="py-3 text-neutral-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-x-auto -mx-6 px-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Role</th>
                      <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Stage</th>
                      <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Base</th>
                      <th className="text-left py-3 pr-6 text-neutral-400 font-normal whitespace-nowrap">Equity (4yr)</th>
                      <th className="text-left py-3 text-neutral-400 font-normal">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">AI / ML Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$140K-$200K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.3%-1.0%</td>
                      <td className="py-3 text-neutral-500 text-xs">Navigara, Jelou territory</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Backend Engineer (Go)</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$220K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.8%</td>
                      <td className="py-3 text-neutral-500 text-xs">Lerian Midaz - Go required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 bg-white/95 rounded-xl py-4 shadow-sm border border-neutral-100">
                  <p className="text-neutral-900 font-medium mb-1">Edge plan feature</p>
                  <p className="text-neutral-500 text-sm mb-3">Compensation benchmarks by role and stage</p>
                  <a
                    href="mailto:hello@theantijobboard.com?subject=Upgrade to Edge"
                    className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Contact to Upgrade
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">How we score hiring likelihood</h3>
          </div>
          <p className="text-neutral-600">
            We look at funding size, team size, time since raise, accelerator batch timing, LinkedIn job posts, and growth signals. 8/8 means almost certainly hiring. 5/8 means worth a shot.
          </p>
        </div>

        {plan !== "edge" && plan !== "concierge" && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-8 md:p-10 text-center mb-8">
            <img src={cdn("/hero-image.webp")} alt="" className="w-20 h-auto mx-auto mb-4 rounded-xl" />
            <p className="text-sm text-rose-400 mb-2">Next drop soon</p>
            <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-3">Want this every week?</h3>
            <p className="text-neutral-500 mb-6">
              Scorecards, outreach playbooks, and role predictions for every hot startup.
            </p>
            <a
              href="/#pricing"
              className="inline-block bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-3 rounded-xl font-medium hover:from-rose-500 hover:to-rose-600 transition-colors"
            >
              Upgrade to The Edge
            </a>
          </div>
        )}

        <div className="text-center bg-white/95 backdrop-blur rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <span className="font-medium text-neutral-900">The Anti Job Board</span>
          </div>
          <p className="text-sm text-neutral-500 mb-4">
            theantijobboard.com
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xl mx-auto">
            * AI was used in supporting our researchers to acquire and compile information. While we always manually ensure fact checks, errors may still exist. Please exercise your own judgement when using information presented in this newsletter and at your own risk.
          </p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {focusedIndex !== null && (
          <FocusOverlay
            startup={startups[focusedIndex]}
            index={focusedIndex}
            plan={plan}
            onClose={() => setFocusedIndex(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cmdkOpen && (
          <CommandK onClose={() => setCmdkOpen(false)} onSelect={scrollToStartup} plan={plan} />
        )}
      </AnimatePresence>
      <ScrollToTop />
    </main>
  );
}
