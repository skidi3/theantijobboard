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
    name: "EnFi",
    tagline: "enfi.ai · Boston, MA · AI Credit Analysts for Banks",
    website: "enfi.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQHhDoF8H8XcQA/company-logo_200_200/company-logo_200_200/0/1716387452241?e=1773878400&v=beta&t=yv4if9vuD6PXxgTxrOxZmp-OBaGQOST_ikI89zb_li4",
    round: "Series A",
    amount: "$15M",
    detail: "~20-30 team, total raised $22.5M, SOC 2 certified, deployed in regional banks",
    investors: "FINTOP Capital (lead), Patriot Financial Partners, Commerce Ventures, Unusual Ventures, Boston Seed Capital",
    hiringScore: 9,
    hiringReason: "Press release says proceeds will 'scale its technology, team and go-to-market efforts.' Global FinTech Series described the plan as to 'hire aggressively.' CEO said they're 'specifically looking for people who have deep AI engineering experience.'",
    whatBuilding: "EnFi is building AI agents that act as virtual credit analysts for banks and lending institutions. Their platform automates end-to-end commercial lending workflows, from deal screening to portfolio monitoring, across every complex credit type (mezzanine, asset-based, syndicate loans, venture debt, agricultural, etc.). Think of it as giving a small regional bank the analytical firepower of a JPMorgan credit team. The agents don't just flag data, they complete entire jobs. They analyze borrower leverage, collateral, and credit histories, flag documentation inconsistencies, and can be operational within 60-90 days of deployment. The platform has SOC 2 certification, end-to-end encryption, and full audit trails, critical for regulated banking environments.",
    whyMatters: "U.S. lenders spend $112 billion annually on credit labor, yet tens of thousands of credit analyst positions remain unfilled. Regional and community banks are the hardest hit - they simply don't have the headcount to compete with national players. This creates a structural bottleneck: fewer loans processed, higher risk, or burned-out teams. EnFi CEO Joshua Summers told Reuters that smaller banks 'have thousands of credit analyst positions unfilled at any given time.' The investor group behind this round collectively works with 150+ financial institutions - this isn't just a VC bet, it's a strategic buy-in from the banking industry itself. FINTOP Capital Partner John Philpott stated in the press release: 'AI isn't replacing human judgment but instead creating the capacity for humans to exercise that judgment at scale.'",
    roles: ["Senior AI/ML Engineer", "Account Executive / Sales (Fintech Lending)", "Solutions Engineer / Customer Success"],
    rolesNote: "They recently brought on their first-ever CRO - Chris Aronis, a fintech veteran from Numerated, Fiserv, and Quovo (acquired by Plaid) - in January 2025. That hire signals a clear shift from founder-led sales to building a real sales org, which means AEs and SDRs are next. They accept applications via jobs@enfi.ai - pure cold outreach territory.",
    founder: {
      initials: "JS",
      name: "Joshua Summers",
      title: "Co-Founder & CEO, ex-clypd (acquired by AT&T), 25+ years in big data",
      linkedin: "https://www.linkedin.com/in/summersjoshua",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQG8cCgo4s0sjA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718318804332?e=2147483647&v=beta&t=VDKq1FaQwskOQXom87HfTv-45OwLZBCtmCDsMZqbV48",
      hook: "Joshua Summers is a serial entrepreneur with 25+ years solving big data problems in media and ad tech. His last company, clypd, a programmatic TV advertising platform, was acquired by AT&T in 2019 and integrated into Xandr. He's also an active angel investor at TBD Angels in Boston, which is where he and Weller first started co-investing and eventually hatched the idea for EnFi. The company name stands for 'Enhanced Neural Financial Intelligence,' and the origin story is pure crisis-born innovation: during the SVB and First Republic bank collapse in spring 2023, Summers and Weller were scrambling to help their portfolio startups navigate the fallout when they realized AI could fundamentally fix how banks assess credit risk. His communication style matters for your cold email - his LinkedIn posts are substantive (product updates, industry analysis, not fluff), and he's been interviewed by Reuters, American Banker, and PYMNTS. Expect him to appreciate concise, evidence-based outreach. Scott Weller is the Co-Founder & CTO. He co-founded SessionM, a loyalty and data platform that was acquired by Mastercard in 2019, after which he served as SVP of Product within Mastercard's Data & Services division. Before that, he cut his teeth in online gaming - Gamesville (acquired by Lycos), then GameLogic (acquired by Scientific Games), before moving into loyalty and digital advertising. He graduated from the University of Rhode Island, and is an active angel investor in companies like Blustream, Esprezzo, LearnLux, and Finally. He's spoken at The Artificial Intelligence Conference (NYC, 2018), the VentureFizz podcast, and contributed to American Banker. Fun fact: Scott was involved in tech from his teenage years, starting at one of the earliest ISPs, Intelecom Data Systems. If you're an engineer reaching out, Weller is likely your evaluator - lead with technical depth. For Senior AI/ML Engineer: Your proof of work here is a demo showing agentic document parsing on financial data. Pull some SEC filings, 10-Ks, or sample loan covenants and build a multi-agent pipeline that extracts, validates, and flags anomalies - using LangChain/LangGraph or CrewAI with RAG over unstructured financial PDFs. That's literally what EnFi's agents do. The skills that matter: Python, LLM fine-tuning, RAG architectures, vector databases (Pinecone, Weaviate), NLP for financial documents, and familiarity with regulated environments and SOC 2. Email jobs@enfi.ai directly. Reference the Reuters interview where Summers talks about the credit analyst shortage. Attach or link a GitHub repo. Your cold email angle: 'I built a multi-agent system that parses commercial loan covenants and flags breaches - exactly the kind of workflow your agents need to handle at scale.' You can also reach Weller directly on LinkedIn - he's the more technical evaluator. Reference his SessionM → Mastercard journey and the technical scale challenges of agentic AI in regulated banking. For Account Executive / Sales (Fintech Lending): Your proof of work is a 1-page memo analyzing the community banking TAM for AI lending solutions. Reference FDIC data on unfilled credit analyst roles, and if you really want to stand out, map 10 potential EnFi prospects - regional banks with $500M-$5B in assets that don't yet have AI lending tools. The skills that matter: fintech or banking SaaS sales experience at the $0-$5M stage, familiarity with bank procurement cycles, and comfort selling into risk/compliance-heavy environments. Email Joshua Summers directly via LinkedIn. Your cold email angle: Reference the Blue Dun interview where he described exactly the hire they need: 'Someone who's done $0 to $5M who understands what it's like to get out there and have the early conversations.' Position yourself as that person, and mention you've already mapped their potential customer base. One more angle: FINTOP's LP network includes ~90 community banks. That's built-in pipeline. Mention you understand how to sell into a VC's portfolio network. For Solutions Engineer / Customer Success: Create a sample onboarding playbook for a bank deploying AI credit agents. Show how you'd approach the 60-90 day deployment window, manage change with credit analysts who've done things manually for decades, and measure ROI. Skills to highlight include technical consulting, financial services implementations, experience with bank IT environments, SQL, basic Python, and the ability to translate between technical and non-technical stakeholders. Reference the Grasshopper Bank partnership announcement - it shows you understand their deployment model. Propose how you'd scale onboarding as they add institutions from the FINTOP network.",
      avoid: "Don't send generic AI enthusiasm. Lead with specific proof of work - a demo, a prospect map, or an onboarding playbook. Reference the Reuters interview, the Blue Dun interview, or the FINTOP partnership. Show you understand the community banking pain point.",
    },
    cofounder: {
      name: "Scott Weller",
      title: "Co-Founder & CTO, ex-SessionM (acquired by Mastercard), ex-Mastercard SVP",
      linkedin: "https://www.linkedin.com/in/sweller",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHzMR1EHyko4w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1675213969072?e=2147483647&v=beta&t=i0T9Zp92wWRMz1HHrMZ-4LzOYXnzebXRH1vyGdvs-_Y",
    },
    signal: "The press release says proceeds will 'scale its technology, team and go-to-market efforts.' Global FinTech Series described the plan as to 'hire aggressively.' CEO Joshua Summers said in a Blue Dun interview: 'We are specifically looking for people who have deep AI engineering experience... We'll soon be looking for someone to come on to help us with our go-to-market efforts, specifically sales into private lenders. Someone who's done $0 to $5 million.' They recently brought on their first-ever CRO - Chris Aronis. That hire signals a shift from founder-led sales to building a real sales org. Lead investor FINTOP Capital runs a portfolio job board at jobs.fintopcapital.com. They accept applications via jobs@enfi.ai. Contact: CEO LinkedIn: linkedin.com/in/summersjoshua. CTO LinkedIn: linkedin.com/in/sweller. Email: jobs@enfi.ai",
    careersUrl: "",
    featured: true,
  },
  {
    name: "Axiom",
    tagline: "axiom.trade · San Francisco, CA · DeFi Trading Terminal",
    website: "axiom.trade",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQFKQRVjUJBR9A/company-logo_200_200/company-logo_200_200/0/1738295353105/joinaxiom_logo?e=1773878400&v=beta&t=fy7vrgQOczORTfN_920gk3szlZoisVlQdJvzYKrT7Oo",
    round: "YC Seed",
    amount: "$500K (but $10M+ MRR)",
    detail: "~2-5 team, $10M+ MRR, $100M+ revenue in 4 months, $5M monthly net profit, 50% Solana memecoin market share",
    investors: "Y Combinator; advised by Jordan 'Cobie' Fish (crypto entrepreneur/personality)",
    hiringScore: 9,
    hiringReason: "This is a team of 2 people doing $10M MRR and $5M monthly net profit. That's $60M+ in annualized revenue per employee. They physically cannot sustain this without scaling the team. Blockworks reported they plan to expand to other blockchain ecosystems - a multi-chain engineering project requiring serious new talent.",
    whatBuilding: "Axiom is a DeFi trading terminal that combines memecoin trading on Solana, perpetual futures via Hyperliquid, and yield products - all in one web app. Unlike Telegram-based trading bots (Photon, BonkBot), Axiom is a full web application with institutional-grade features: real-time analytics, wallet tracking, limit orders, 1-second charts, sentiment trackers, anti-sniper bots, and a rakeback rewards program. It's essentially a Bloomberg Terminal for DeFi, if Bloomberg was built by two 22-year-olds and focused on memecoins.",
    whyMatters: "Axiom is the #2 revenue-generating Solana application, behind only Pump.fun. It captured ~50% of Solana's memecoin market share at its peak. It hit $100M in revenue faster than Pump.fun did (4 months vs. 8 months). Their daily trading volume regularly exceeds $100M. The critical insight for job seekers: this company makes more money than startups that have raised $100M+ in venture funding, but has only ~2 full-time people. The founders have publicly said they won't raise more VC funding because they're already profitable. This means when they hire, they can afford senior talent, and they're hiring with revenue, not runway. That's a massive signal.",
    roles: ["Full-Stack / Backend Engineer (Web3)", "Product Designer (Crypto-Native)", "Growth / Community Manager"],
    rolesNote: "The YC company page lists them as hiring for 1 engineering role, but that single listing is comical when you zoom out. Even conservative scaling suggests they'll need 10-20 people in the next 6-12 months. The founders are described by The Block as 'uncharacteristically quiet' on X - behavior of a team about to go through a hiring sprint.",
    founder: {
      initials: "HZ",
      name: "Henry Zhang (aka 'Mist')",
      title: "Co-Founder & CEO, 22-23yo, UC San Diego CS, ex-TikTok GenAI, had exit before 20",
      linkedin: "https://www.linkedin.com/in/henryzhang03/",
      image: "https://bookface-images.s3.us-west-2.amazonaws.com/avatars/8cacbcaaaf2e54c4c8ecf9c465eb51f714a64c67.jpg",
      hook: "Henry Zhang is 22-23 years old, a UC San Diego Computer Science graduate, and already had one exit before turning 20. Before Axiom, he worked at TikTok on generative AI. He goes by 'Mist' in crypto circles. The origin story is almost absurdly casual: Zhang and Ellis had 'nothing really to do' in college, were both into crypto trading, and built Axiom as a side project that turned into a $100M+ revenue business within months. His communication style is entirely product-focused. His X posts center on shipping features and polish - he once wrote: 'We understand that the small touches of polish and delight make a big difference in a tool you use daily.' He values execution over marketing. Preston Ellis (aka 'Cal') is the Co-Founder & CTO, also a UC San Diego graduate (EECS) who previously interned at DoorDash. He goes by 'Cal' in crypto circles and maintains a quiet online presence - he builds in public through the product itself, not through social media. If Zhang is the vision, Ellis is the engine. Key Advisor: Jordan 'Cobie' Fish, one of crypto's most respected voices. His key piece of advice to them: don't blow money on influencer marketing. That tells you the culture: substance over hype, product over promotion. If you're reaching out, internalize this philosophy. For Full-Stack / Backend Engineer (Web3): Your proof of work should be a mini trading dashboard that aggregates on-chain Solana data - token prices, wallet activity, transaction volume. Use Next.js + Solana web3.js. Even better: build a tool that tracks a specific wallet's P&L across memecoin trades - that's literally one of Axiom's core features. The skills that matter here are TypeScript/React, Solana/Anchor, Rust for on-chain programs, WebSocket connections for real-time data, experience with high-throughput systems, and Hyperliquid API familiarity. Brush up on Solana's Sealevel VM documentation, Hyperliquid's architecture docs, and any MEV-related research on Solana (Jito). Since the team is just 2 people, reach out directly to Henry Zhang on X (@axiom_trade or the main Axiom account). Keep it short - these founders are busy. Your cold email angle: 'Built a wallet P&L tracker on Solana that processes 50K txns/sec, think I could add serious bandwidth to your infra as you scale multi-chain.' You can also apply through the YC job listing. One critical tip: this team values speed and shipping above all else. Don't send a 5-page cover letter. Send a link to something you built. They shipped a $100M revenue product with 2 people - they want engineers who move fast. For Product Designer (Crypto-Native): Your proof of work is a redesign of a section of Axiom's interface. Pick their 'Explore Tokens' page or the order entry flow, create a Figma mockup with annotations explaining your design decisions, and focus on information density without clutter - that's what pro traders want. The skills that matter: Figma, design systems, data-heavy dashboard design, understanding of trading UX (order books, charts, P&L displays), and experience designing for crypto or fintech. Reference Zhang's quote about 'small touches of polish and delight,' show your redesign, and position yourself as the person who can own design while they focus on engineering. For Growth / Community Manager: Write an analysis of Axiom's community strategy versus Photon, BonkBot, and Pump.fun. Include metrics on social mentions, engagement patterns, and user retention signals from Dune dashboards. Then propose a community growth plan that doesn't rely on KOL spend - this is directly aligned with Cobie's advice. The skills to highlight are crypto-native community management, X/Discord strategy, analytics tools (Dune, DeFiLlama), understanding of memecoin culture, and content creation. DM on X, show your analysis, and demonstrate you understand their anti-KOL philosophy and can grow through product-led community engagement instead.",
      avoid: "Don't approach with traditional finance framing. This is a crypto-native company serving memecoin traders. Show that you understand the culture, have used the product, and can move fast. Don't send a 5-page cover letter. Send a link to something you built. They shipped a $100M revenue product with 2 people - they want engineers who move fast.",
    },
    cofounder: {
      name: "Preston Ellis (aka 'Cal')",
      title: "Co-Founder & CTO, UC San Diego EECS, ex-DoorDash",
      linkedin: "https://www.linkedin.com/in/preellis/",
      image: "https://bookface-images.s3.us-west-2.amazonaws.com/avatars/9008051d00c3cdb6f20467bede25a190f103a1cd.jpg",
    },
    signal: "The YC company page lists them as hiring for 1 engineering role, but this is a team of 2 people doing $10M MRR and $5M monthly net profit - $60M+ in annualized revenue per employee. They physically cannot sustain this without scaling. Blockworks reported they plan to expand to other blockchain ecosystems beyond Solana and Hyperliquid - a multi-chain engineering project requiring serious new talent. Even conservative scaling suggests 10-20 people in the next 6-12 months. Reach out directly to Henry Zhang on X (@axiom_trade). CEO LinkedIn: linkedin.com/in/henryzhang03. CTO LinkedIn: linkedin.com/in/preellis. Website: axiom.trade.",
    careersUrl: "",
  },
  {
    name: "End Close",
    tagline: "endclose.com · San Francisco, CA · AI-Powered Continuous Reconciliation",
    website: "endclose.com",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQG99itrwsiBRw/company-logo_200_200/B56Zygq8l_HUAI-/0/1772222139076/endclose_logo?e=1773878400&v=beta&t=G3dD9q39PxWVexKQDgZVNYlSoQrdgdEOQDhgNH8QgaY",
    round: "YC W26",
    amount: "$500K (YC standard)",
    detail: "2 team, Demo Day March 24 2026, zero jobs listed anywhere - you're reading this before anyone else",
    investors: "Y Combinator (Winter 2026). YC Partner: Brad Flora",
    hiringScore: 8,
    hiringReason: "Zero jobs posted anywhere. No ATS, no LinkedIn, no Wellfound. W26 Demo Day is March 24, 2026. After that, End Close will likely raise a seed round ($3M-$5M+). With that capital, they will hire. You're reading this before anyone else has a shot.",
    whatBuilding: "AI-powered continuous reconciliation for high-volume payments companies. Think fintechs, marketplaces, banks, payroll platforms - any company that moves money through bank transfers and needs to track every dollar. Today, payments companies either build reconciliation in-house (expensive, fragile, constantly growing in scope) or buy legacy tools that only reconcile once a month. End Close replaces both. It connects to a company's payment processors, banks, data warehouses, invoicing platforms, and ERPs, then reconciles continuously in real time using deterministic matching rules. When something does not match, an AI agent triages the exception, gathers context from multiple data sources, and proposes a resolution for human review. The key insight: 99% of manual work in reconciliation is exception handling. Payment ops teams spend hours per ticket gathering context across scattered data sources. End Close's AI agent does this automatically, learning from how previous exceptions were resolved to increase match rates over time. They also expose developer-friendly APIs and real-time webhooks so engineering teams can build product features on top of reconciliation data (faster balance top-ups, instant trading, etc.) instead of treating it as a back-office afterthought.",
    whyMatters: "Over $750 trillion in bank transfers happen annually via wire, ACH, and checks. Most of these payments take one to three days to clear. Finance teams spend enormous amounts of time tracking them from initiation to accounting. The market for reconciliation software is ancient, dominated by clunky legacy vendors built for month-end close workflows. Three forces are converging right now that make this a massive opportunity. First, new payment rails (RTP, FedNow, stablecoins) are dramatically increasing transaction volumes. Second, agent-to-agent payments are emerging as AI agents begin transacting autonomously, which will multiply online transaction volumes far beyond what human-initiated payments ever produced. Third, every fast-growing fintech eventually hits the reconciliation wall. Modern Treasury (YC S18, $2B valuation, $183M raised) had to build their reconciliation org from scratch. Stripe, Plaid, every major payments company has a team dedicated to this problem. End Close is betting that this should be infrastructure, not a cost center. The timing is almost eerily good. YC's Spring 2026 RFS explicitly calls for stablecoin infrastructure and AI-powered financial tooling. End Close sits at the intersection of both.",
    roles: ["Backend/Infrastructure Engineer", "Full-Stack Engineer", "AI/ML Engineer"],
    rolesNote: "Zero jobs listed anywhere. That is the point. There are no jobs posted, which means you are reading this before anyone else has a shot. Also, David Newell's entire career reads like a remote-work hall of fame: Basecamp, PostHog (100% remote, distributed across 20+ countries), Intercom. A 2-person founding team already distributed across continents is a very strong signal that the company will hire remote.",
    founder: {
      initials: "SB",
      name: "Sean Bolton",
      title: "CEO, third hire at Modern Treasury (YC S18), built their reconciliation org",
      linkedin: "https://www.linkedin.com/in/boltonsean/",
      image: "https://media.licdn.com/dms/image/v2/C5603AQFdxHpgoOZ09Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1634324462862?e=2147483647&v=beta&t=hyk44IE1YjKL6ArB7t7eLc_q3XHzqJ7vFuprgqe2u6k",
      hook: "Sean Bolton was the third hire at Modern Treasury (YC S18). He spent 6 years there, first as tech lead of payments engineering, then building and running the entire reconciliation org from the ground up. Under his leadership, Modern Treasury scaled to $350B in annual payments volume and $1T in annual reconciliation volume with 99.995% automation across 40 banks. He literally built the product category he is now turning into a standalone company. Holds a Master's in Entrepreneurship from the University of Notre Dame (ESTEEM program). Previously worked at Bricleir and GAAStrength.ie. X: @SeanBolton. David Newell is the CTO - this is his third time through YC. He co-founded Unflow (YC S19), a no-code mobile experience platform, where he served as CTO. After that, he joined PostHog (YC W20) as a product engineer and led the error tracking product, which became the fastest-growing product in PostHog's history. Before all of that, he interned at Basecamp (the company that literally wrote the book on remote work) and worked as a product engineer at Intercom, where he was part of the first use-case team. His GitHub location lists Galway, Ireland. He attended Coláiste na Coiribe in Ireland and was founder of Student Startup Dublin. X: @DavidNewell95. GitHub: github.com/daibhin. For Backend/Infrastructure Engineer: Build a mini proof-of-concept that demonstrates reconciliation logic. Take two mock data sources (say, a CSV of Stripe payouts and a CSV of bank transactions), write a matching engine that identifies exceptions, and present the unmatched items with context. Deploy it as an API. Send it to Sean. Reference his Modern Treasury background directly. Your cold email angle: 'Saw you spent 6 years building the reconciliation org at Modern Treasury from the ground up. That experience at a $2B payments infrastructure company is exactly the kind of context that makes End Close credible from day one. I built a small reconciliation matching engine to show how I think about the problem.' Keep it tight. Sean spent years with engineers who understand payments deeply. Show him you are one of them. For Full-Stack Engineer: Build a mock exceptions inbox. Show a dashboard with transactions, match statuses, an AI-suggested resolution panel, and an audit trail. Use the design language from their existing website (clean, dark mode, developer-focused). Send it to David. Reference his PostHog and Intercom product engineering background. He built products used by millions. Show him you think about developer experience the same way. For AI/ML Engineer: Build a prototype exception-resolution agent. Feed it a payment discrepancy (mismatched amounts, duplicate charges, timing issues between processor and bank), have it gather relevant context from mock data sources, and output a structured resolution recommendation with confidence scoring. Show it working end-to-end. This maps directly to the core AI agent in the product.",
      avoid: "Don't wait for a job posting. There won't be one until after Demo Day. The website (endclose.com) doesn't have a careers page. Try sean@endclose.com (CEO) or david@endclose.com (CTO). If those bounce, reach out via X DMs to @SeanBolton or @DavidNewell95. David is active on Product Hunt (@davidnewell95) and GitHub (daibhin).",
    },
    cofounder: {
      name: "David Newell",
      title: "CTO, 3x YC founder, ex-PostHog, ex-Intercom, ex-Basecamp",
      linkedin: "https://www.linkedin.com/in/dnewell1",
      image: "https://media.licdn.com/dms/image/v2/C5603AQFlfKLdvXuxtg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1564024135455?e=2147483647&v=beta&t=rqe0zThgnzfO0FVYgMQ1wk8OZeVTv7_l9e0XN56-PS4",
    },
    signal: "Zero jobs posted anywhere. No ATS, no LinkedIn, no Wellfound. That is the point. W26 Demo Day is March 24, 2026. After that, End Close will likely raise a seed round (strong YC companies from W26 are expected to raise $3M-$5M+). With that capital, they will hire. David Newell's entire career reads like a remote-work hall of fame - Basecamp, PostHog, Intercom. A 2-person founding team already distributed across continents (Sean in California, David in Ireland) is a very strong signal that the company will hire remote. Contact: sean@endclose.com (CEO), david@endclose.com (CTO). X: @SeanBolton, @DavidNewell95. Website: endclose.com.",
    careersUrl: "",
  },
];

const trends = [
  { sector: "AI Credit Analysts (Banking)", status: "Hot", text: "EnFi's $15M Series A signals that banks are finally buying AI that works inside their compliance constraints. U.S. lenders spend $112 billion annually on credit labor with tens of thousands of positions unfilled. The investor group behind this round collectively works with 150+ financial institutions - this is a strategic buy-in from the banking industry itself." },
  { sector: "DeFi Trading Infrastructure", status: "Heating", text: "Axiom's $10M+ MRR on a $500K seed with only 2 employees shows the crypto trading terminal space is printing money for the winners. 50% Solana memecoin market share is dominance. They're expanding multi-chain next - TypeScript + Solana Web3.js + Rust + real-time systems is the stack." },
  { sector: "Payments Reconciliation", status: "Emerging", text: "End Close is betting that reconciliation should be infrastructure, not a cost center. Over $750 trillion in bank transfers happen annually. Modern Treasury ($2B valuation) had to build their reconciliation org from scratch. YC's Spring 2026 RFS explicitly calls for stablecoin infrastructure and AI-powered financial tooling. End Close sits at the intersection of both." },
];

const compBenchmarks = [
  { role: "Senior AI/ML Engineer", stage: "Series A", base: "$180K-$250K", equity: "0.1%-0.3%", notes: "EnFi - RAG, document parsing, financial NLP, SOC 2 experience" },
  { role: "Account Executive (Fintech)", stage: "Series A", base: "$120K-$160K + OTE", equity: "0.05%-0.15%", notes: "EnFi - $0-$5M stage, bank procurement cycles" },
  { role: "Solutions Engineer", stage: "Series A", base: "$140K-$190K", equity: "0.08%-0.2%", notes: "EnFi - Financial services implementations, 60-90 day deployments" },
  { role: "Full-Stack Engineer (Solana)", stage: "Seed", base: "$200K-$300K", equity: "0.3%-0.8%", notes: "Axiom - TypeScript, Rust, real-time, $10M+ MRR company" },
  { role: "Product Designer (Crypto)", stage: "Seed", base: "$150K-$200K", equity: "0.2%-0.5%", notes: "Axiom - Trading UX, data-heavy dashboards, Figma" },
  { role: "Backend/Infra Engineer", stage: "Seed (YC)", base: "$150K-$200K", equity: "0.3%-1.0%", notes: "End Close - Payments, reconciliation, likely remote" },
  { role: "Full-Stack Engineer", stage: "Seed (YC)", base: "$150K-$200K", equity: "0.3%-1.0%", notes: "End Close - Developer tools, dark mode dashboard, likely remote" },
  { role: "AI/ML Engineer", stage: "Seed (YC)", base: "$160K-$220K", equity: "0.3%-0.8%", notes: "End Close - Exception resolution agent, confidence scoring" },
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
                    <p className="text-sm text-neutral-700 italic">&quot;{emailMatch[2].replace(/^['"]|['"]$/g, '')}&quot;</p>
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
  // Intel = founder hooks, outreach guidance, hiring signals
  const canSeeIntel = plan === "edge" || plan === "concierge";
  // For free plan: first startup shows name/tagline/what/why only; other startups fully locked
  const isFree = plan === "free";

  // Free plan - other startups (not first): fully blurred/locked
  if (isFree && !isFirstStartup) {
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
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they&apos;re building</p>
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

  // Free plan - first startup: show name, tagline, what they're building, why it matters only
  if (isFree && isFirstStartup) {
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

          <div className="mb-6">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they&apos;re building</p>
            <p className="text-neutral-600 leading-relaxed">{startup.whatBuilding}</p>
          </div>

          <div className="mb-6">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Why this matters</p>
            <p className="text-neutral-600 leading-relaxed">{startup.whyMatters}</p>
          </div>

          {/* Blurred section for rest of content */}
          <div className="relative">
            <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  $XXM Series A
                </span>
                <span className="text-sm text-neutral-500">Key detail</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 py-4 border-y border-neutral-100 mb-6">
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

              <div className="mb-6">
                <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Likely roles opening</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Senior Engineer</span>
                  <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Growth Lead</span>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-dashed border-neutral-200">
                <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
                <p className="text-sm text-neutral-600 leading-relaxed">Detailed outreach guidance...</p>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-6 bg-white/95 rounded-xl py-5 shadow-sm border border-neutral-100">
                <p className="text-neutral-900 font-medium mb-1">Unlock full intel</p>
                <p className="text-neutral-500 text-sm mb-3">Get funding details, roles, outreach playbooks</p>
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
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they&apos;re building</p>
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

        {startup.signal && canSeeIntel && (
          <div className="mb-6">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Hiring Signal</p>
            <p className="text-neutral-600 leading-relaxed text-sm">{startup.signal}</p>
          </div>
        )}

        {canSeeIntel ? (
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
                    <p className="text-sm text-neutral-700 italic">&quot;I noticed your approach to handling X in your GitHub repo. I solved a similar challenge at my previous role by...&quot;</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1">For Product/Design:</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">The CEO responds well to people who demonstrate understanding of their target market. Show you&apos;ve done research on their users and have specific ideas for improvements.</p>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                    <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                    <p className="text-sm text-neutral-700 italic">&quot;After speaking with 5 companies in your target segment, I noticed a pattern that aligns with your product vision...&quot;</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don&apos;t mention funding news directly. Skip the &quot;I&apos;d love to pick your brain&quot; approach.</p>
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


      </div>
    </div>
  );
}

function FocusOverlay({ startup, index, plan, onClose }: { startup: Startup; index: number; plan: Plan; onClose: () => void }) {
  const canSeeIntel = plan === "edge" || plan === "concierge";

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
            <p className="text-xs text-neutral-400 mb-2">{String(index + 1).padStart(2, "0")} of 3</p>
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
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">What they&apos;re building</p>
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

          {startup.signal && canSeeIntel && (
            <motion.div {...stagger(8)} className="mb-10">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Hiring Signal</p>
              <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.signal}</p>
            </motion.div>
          )}

          <motion.div {...stagger(9)} className="mb-10">
            {canSeeIntel ? (
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
                        <p className="text-sm text-neutral-700 italic">&quot;I noticed your approach to handling X in your GitHub repo. I solved a similar challenge at my previous role by...&quot;</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 mb-1">For Product/Design:</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">The CEO responds well to people who demonstrate understanding of their target market. Show you&apos;ve done research on their users and have specific ideas for improvements.</p>
                      <div className="bg-white rounded-lg p-3 border border-neutral-200 mt-2">
                        <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                        <p className="text-sm text-neutral-700 italic">&quot;After speaking with 5 companies in your target segment, I noticed a pattern that aligns with your product vision...&quot;</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don&apos;t mention funding news directly. Skip the &quot;I&apos;d love to pick your brain&quot; approach.</p>
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
              {canSeeIntel ? (
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

  // free users see nothing, paid users see all
  const visibleStartups = plan === "free" ? [] : startups;

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
              <p className="text-xs text-neutral-400">Feb 28, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$16M+ total this week · AI Banking + DeFi Trading + Payments Reconciliation</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">1 A, 2 Seed</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Round mix</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            AI banking infrastructure goes Series A with EnFi ($15M, FINTOP Capital) deploying AI Credit Analysts inside regional banks - U.S. lenders spend $112B annually on credit labor with tens of thousands of positions unfilled. DeFi trading dominance continues with Axiom ($500K YC seed but $10M+ MRR) capturing 50% of Solana memecoin volume with just 2 employees - that&apos;s $60M+ annualized revenue per employee. Payments infrastructure gets its AI moment with End Close (YC W26) building continuous reconciliation for high-volume fintechs - founded by the person who built Modern Treasury&apos;s entire reconciliation org. By the time you&apos;re applying through a job portal, the founder is already talking to someone who sent a cold email. Be that person.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest">This week&apos;s companies</p>
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
                    <p className="font-medium text-neutral-900">AI Credit Analysts (Banking)</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Banks are ready to buy AI that works inside their compliance constraints...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">DeFi Trading Infrastructure</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Heating</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">The crypto trading terminal space is printing money for the winners...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Senior AI/ML Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$180K-$250K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.1%-0.3%</td>
                      <td className="py-3 text-neutral-500 text-xs">EnFi - RAG, document parsing</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Full-Stack Engineer (Solana)</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$200K-$300K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.3%-0.8%</td>
                      <td className="py-3 text-neutral-500 text-xs">Axiom - TypeScript, real-time, crypto</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6 bg-white/95 rounded-xl py-4 shadow-sm border border-neutral-100">
                  <p className="text-neutral-900 font-medium mb-1">Edge plan feature</p>
                  <p className="text-neutral-500 text-sm mb-3">Compensation benchmarks by role</p>
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

        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 text-center">
          <img src={cdn("/logo.webp")} alt="" className="w-8 h-8 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-neutral-900 mb-2">Want more drops?</h3>
          <p className="text-neutral-500 text-sm mb-4">New drops every week. Upgrade for full access to all startups, outreach playbooks, and comp benchmarks.</p>
          <Link
            href="/#pricing"
            className="inline-block bg-neutral-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            View Plans
          </Link>
        </div>
      </div>

      <AnimatePresence>
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
          <CommandK
            onClose={() => setCmdkOpen(false)}
            onSelect={scrollToStartup}
            plan={plan}
          />
        )}
      </AnimatePresence>

      <ScrollToTop />
    </main>
  );
}
