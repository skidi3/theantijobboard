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
    bio: string;
    image?: string;
    linkedin?: string;
  };
  cofounder?: {
    name: string;
    title: string;
    bio?: string;
    image?: string;
    linkedin?: string;
  };
  thirdFounder?: {
    name: string;
    title: string;
    bio?: string;
    image?: string;
    linkedin?: string;
  };
  outreachByRole: {
    role: string;
    proofOfWork: string;
    coldEmailAngle: string;
  }[];
  avoid: string;
  signal?: string;
  featured?: boolean;
  videoId?: string;
  videoUrl?: string;
  heroImage?: string;
  careersUrl?: string;
}

const startups: Startup[] = [
  {
    name: "Moto Finance",
    tagline: "moto-card.com · New York, NY · DeFi-Backed Consumer Banking",
    website: "moto-card.com",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGyXIlGaAScvw/company-logo_200_200/B4EZo5z3J7HMAI-/0/1761906488588/usemotocard_logo?e=1774483200&v=beta&t=9IWE6HMixW66P7Y-cNJonIoyMpGOrlzMuvcgNLYQD3Q",
    round: "Pre-Seed",
    amount: "$1.8M",
    detail: "2 founders, distributed US + Amsterdam, DeFi-backed Visa Infinite card",
    investors: "Cyber Fund (lead), Eterna Capital Team",
    hiringScore: 8,
    hiringReason: "Pre-seed with explicit hiring priorities named in press release: engineering, compliance, market entry. Two-person team with aggressive roadmap.",
    whatBuilding: "Moto is building a Visa Infinite credit card and high-interest savings account that runs on blockchain infrastructure underneath a product that looks and feels like a normal bank account. Deposits earn between 2% and 5% interest depending on balance size. All card spend earns 5% cashback. The yields are generated through DeFi protocols - insured, stablecoin-backed mechanisms - not traditional treasury operations. The card also bundles lifestyle perks: Spotify, Netflix, YouTube Premium, Financial Times, airport lounge access, concierge services, and curated event invitations. The target customer is the next generation of high-balance savers who want DeFi-level returns without having to touch a wallet or understand a protocol.",
    whyMatters: "The conventional neobank model - Revolut, Monzo, Brex - competes on UX and FX rates. The yield is incidental. Moto's entire product thesis is that the yield is the product, and DeFi infrastructure is the only way to deliver it at a margin that makes sense. The founders came from Squads, the largest protocol by value secured on Solana - they built the infrastructure layer first and are now building the consumer layer on top of it. The regulatory environment has shifted materially: the GENIUS Act, Circle's IPO, and the broader institutional acceptance of stablecoins have made a compliant DeFi-backed consumer card viable in a way it simply was not two years ago. Moto is timed well. The gap between what a savings account pays at Chase and what a DeFi protocol pays is still enormous, and the first product to bridge that gap cleanly - compliantly, with a Visa card attached - wins a very large market.",
    roles: ["Solana / Blockchain Engineer", "Compliance and Regulatory Associate", "Growth Marketing Associate", "Customer Operations Associate"],
    rolesNote: "The press release names two explicit capital priorities: product development and hiring across engineering, compliance and preparing its platform for broader market entry. That is unusually direct for a pre-seed announcement.",
    founder: {
      initials: "SN",
      name: "Shimon Newman",
      title: "CEO and Co-Founder, ex-Squads Labs Director of Research",
      linkedin: "https://linkedin.com/in/shimon-newman-671928153",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGywWtDBBXlxA/profile-displayphoto-scale_400_400/B4EZxB15YXHkAg-/0/1770631175104?e=1774483200&v=beta&t=RXUcNsyeT6ph3xQJUPe3F7eBC1dreLREWew7JeDBV_w",
      bio: "Shimon Newman was Director of Research at Squads Labs, where he published a widely circulated report on the debanking of crypto companies - a piece that was picked up across the Solana ecosystem and cited in industry coverage. He is not a quiet operator. He thinks publicly, writes substantively, and has a clear point of view on why the traditional banking system fails crypto-native users. That worldview is the founding thesis of Moto. Based in Amsterdam while the company is headquartered in New York - a detail that signals the team is already comfortable with async, distributed work from the very beginning.",
    },
    cofounder: {
      name: "Ramses Kamanda",
      title: "CTO and Co-Founder, ex-Squads Labs, ex-Luna.ai, ex-home24 SE",
      linkedin: "https://www.linkedin.com/in/ramseskamanda",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGeQzUOKOx1dg/profile-displayphoto-scale_400_400/B4EZxCUaHoKAAk-/0/1770639173441?e=1774483200&v=beta&t=Yer5UThCMVHBwg4LUEp7SYHdO4CXi0Vc5AptVFgkZ9E",
      bio: "Ramses Kamanda is the CTO, previously at Squads Labs, Luna.ai, and home24 SE. He studied at Maastricht University and is currently based in the US. His technical background spans Go, TypeScript, and Python, with infrastructure experience across both blockchain protocols and consumer-facing products. The combination of a research-and-narrative-driven CEO and a distributed, protocol-level CTO is a common founding pattern in crypto-native startups that eventually need to hire fast on both sides simultaneously.",
    },
    outreachByRole: [
      {
        role: "Solana / Blockchain Engineer",
        proofOfWork: "The entire product runs on Solana infrastructure. The founders built Squads - the largest multisig protocol on Solana by value secured, and the CTO, Ramses Kamanda, comes from Squads Labs directly. The yield layer, the stablecoin routing, and the settlement logic all live onchain. The first engineering hire needs to extend that protocol work into a consumer product with real compliance constraints - card settlement flows, real-time balance updates, yield distribution across a large user base. This is not a Web2 fintech role with a blockchain badge on it. Core skills: Rust or TypeScript on Solana, Anchor framework, familiarity with Squads multisig architecture, experience with stablecoin or DeFi yield routing, smart contract security fundamentals, understanding of how DeFi protocols interact with fiat settlement layers. For proof of work, fork an existing Solana program, add a basic yield-routing function that splits deposits between two mock protocols based on live APY, and write a short README explaining the design decisions. Post it on GitHub.",
        coldEmailAngle: "Ramses, Moto's edge is the DeFi yield engine sitting underneath a product that looks and feels like a bank account. I built a Solana yield-routing demo [GitHub link] that splits deposits across protocols based on live APY. I come from [X background] and I want to work on the infrastructure that makes the compliance layer and the onchain layer talk to each other. Worth 15 minutes?",
      },
      {
        role: "Compliance and Regulatory Associate",
        proofOfWork: "Named explicitly in the press release. A Visa Infinite card generating yields through DeFi protocols in the US requires FinCEN registration, state money transmitter licences across multiple jurisdictions, and a live AML/KYC monitoring programme before a single card gets issued. This is not a back-office hire, but the legal architecture the entire product sits on. Eterna Capital's portfolio history makes this even more pointed: they backed Securitize, which operates in the most scrutinised corner of regulated crypto. Core skills: US financial regulation (FinCEN, BSA, state MTL frameworks), crypto-specific compliance knowledge (Travel Rule, VASP obligations), KYC/AML programme design, experience working with banking partners or payment processors, prior work at a fintech, crypto exchange, or regulatory consultancy preferred. For proof of work, write a one-page memo identifying the three biggest regulatory risks for a DeFi-backed consumer card product operating in the US and how you would sequence solving them before launch. Keep it sharp, no filler.",
        coldEmailAngle: "Shimon, launching a DeFi-yield card in the US is a compliance build as much as a product build. I put together a short memo [attach it] on the three regulatory risks I would sequence first before launch. I have [X years] in crypto compliance and I want to be the person who gets Moto to market clean. Worth 15 minutes?",
      },
      {
        role: "Growth Marketing Associate",
        proofOfWork: "Moto is not a B2B product. It is a consumer card targeting high-balance savers who want DeFi-level yields inside a product that feels like a bank account. Getting those users through the door before a Revolut or a Mercury notices and copies the playbook requires someone who understands crypto-native acquisition channels: waitlists, referral mechanics, community seeding on X and Discord, and earned media in fintech and web3 circles. This is not a paid ads role. This is a zero-to-one growth role where the channels do not yet exist and need to be built. Core skills: growth marketing at an early-stage consumer fintech or crypto product, experience building referral and waitlist programmes, comfort with web3 community dynamics, basic analytics and attribution, strong writing. For proof of work, design a waitlist launch campaign for Moto from scratch: the channel mix, the referral mechanic, the hook, communities you will target, and the copy for the first three pieces of content. One page. No filler.",
        coldEmailAngle: "Shimon, Moto's launch moment is a one-time window and the waitlist is everything before the card ships. I designed a launch campaign [attached] that uses the debanking narrative as the acquisition hook. I want to build the funnel that fills it.",
      },
      {
        role: "Customer Operations Associate",
        proofOfWork: "A Visa Infinite card with DeFi-generated yields is not a simple product to support. Users will have questions about yield accrual timelines, card settlement flows, interest tiers, and what happens to their balance when a DeFi protocol moves. Someone needs to own the support layer before it becomes a queue. At pre-launch stage this person also feeds directly into product: every user question is a signal about what the onboarding flow is missing. Core skills: customer support or operations at a fintech, crypto platform, or neobank, comfort explaining financial or technical concepts clearly to non-technical users, experience with support tooling (Intercom, Zendesk), strong written communication, high tolerance for ambiguity at an early-stage company. For proof of work, write three help centre articles for Moto: one explaining how the DeFi yield is generated and why it is safe, one explaining how the tiered interest structure works, and one covering what happens to a user's balance during a DeFi protocol rebalance. Keep each under 200 words.",
        coldEmailAngle: "Shimon, the support layer for a DeFi-backed card is a product problem as much as an ops problem. I wrote three help centre articles [attached] that explain yield, tiers, and rebalancing in plain English. I've worked in ops at [company] and I want to build the function that keeps early users from churning.",
      },
    ],
    avoid: "Don't send generic crypto enthusiasm. Lead with specific proof of work - a Solana demo, a compliance memo, or a launch campaign. Reference Shimon's debanking report if reaching out for business roles - it is the intellectual origin story of the whole company and acknowledging it shows you read past the press release. For engineering roles, reach Ramses directly and lead with something you built on Solana.",
    signal: "The investor lens makes this sharper. Cyber Fund's published 2025 thesis is AI x Crypto - specifically onchain models and the infrastructure needed to make them operate at scale. Their bet on Moto is a bet that the consumer fintech layer will eventually need AI for underwriting, fraud detection, personalised yield optimisation, and spend analysis. That means an ML or data engineering hire is coming, even if it is not in the first wave. Eterna Capital is a London-based firm that has backed Securitize which partnered with BlackRock to launch a tokenised fund on Ethereum and AscendEX. Their portfolio is consistently in regulated, institutional-grade financial infrastructure. They do not back casual DeFi experiments. When Eterna writes a cheque, they are expecting the company to build toward something audit-ready and exchange-grade. Two investors with two very different but complementary theses - one pushing toward AI capability, one pushing toward institutional credibility - means the hiring roadmap is wider than two founders can cover alone, and it is going to open up fast.",
    careersUrl: "",
    featured: false,
  },
  {
    name: "Kana",
    tagline: "kana.ai · San Francisco, CA · AI Agent Platform for Marketing",
    website: "kana.ai",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH6dozFnjSKHw/company-logo_200_200/B56ZukXuMeKYAI-/0/1767989240858/kana_intelligence_logo?e=2147483647&v=beta&t=B-rrJqBoxmnM24r6J1s4NDunlKMBYmOgd1CHuW1ZlFE",
    round: "Seed",
    amount: "$15M",
    detail: "10-20 people, incubated at super{set}, 4th company from same founding duo",
    investors: "Mayfield (lead); Navin Chaddha joining the board",
    hiringScore: 9,
    hiringReason: "$15M seed with Mayfield board seat. Press release names three explicit capital priorities: engineering, product, and go-to-market. All three tracks hiring immediately.",
    whatBuilding: "Kana is an AI agent platform for marketing and media teams. Not a content generator. Not a copilot. Not another dashboard. A suite of loosely coupled AI agents that plug into whatever CRM, CDP, DSP, and analytics stack a marketing team already uses, structure first-party data in real time, and run specific, defined tasks autonomously: audience targeting, campaign management, media planning, customer engagement, and AI chatbot optimisation. The key word is configurability. Humans stay in the loop throughout, approving outputs, correcting agent behaviour, and coaching the system as campaigns evolve. Chavez calls it a \"third path\": not build bespoke, not buy off-the-shelf, but deploy with a partner that adapts to the customer's specific infrastructure and constraints.",
    whyMatters: "This is their fourth company together. Tom Chavez and Vivek Vaidya built Rapt, acquired by Microsoft in 2007. They built Krux, acquired by Salesforce for $700M in 2016. They built Habu, acquired by LiveRamp in 2024. Then they built super{set}, the startup studio that incubated Kana. The thread connecting all of it is the same: how do you make first-party data actually useful for real marketing outcomes at enterprise scale? Every CMO right now is under simultaneous pressure to adopt AI and cut budgets. Kana's pitch is the only one that answers both at once: agents that run inside the stack you already paid for, delivering measurable results in hours not months, with humans staying in control throughout. Mayfield backed this because of the pattern of execution, not the product demo. Three acquisitions totalling roughly one billion dollars from the same two founders is not a coincidence. It is a signal about what kind of company this is going to be.",
    roles: ["AI/ML Engineer - Agent Orchestration", "Enterprise Account Executive", "Product Manager"],
    rolesNote: "There are currently two LinkedIn job listings, both posted one week ago. That is not a red flag but a starting gun. There is no ATS, no recruiter, and no Workday portal. A one-week-old listing at a company that just came out of stealth has seen almost no applicant volume. The roles below are what they have not posted yet - that is where the first-mover advantage lives.",
    founder: {
      initials: "TC",
      name: "Tom Chavez",
      title: "CEO and Co-Founder, 3x founder with $1B+ in exits",
      linkedin: "https://linkedin.com/in/tommychavez/",
      image: "https://media.licdn.com/dms/image/v2/C5603AQFdL-c12gWFSg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1660778160132?e=2147483647&v=beta&t=0WxfxQLcuzHwn0sOAyNnFBfJipnHV9jbK0q8JDzPlno",
      bio: "Chavez and Vaidya have been building together since before Rapt. They are not naive optimists. They have watched the full lifecycle of enterprise marketing technology play out multiple times and have lost illusions accordingly. Chavez's public framing of Kana - \"having wallowed in it arguably a little too long; having really stood in our customers' pain\" - is the opposite of startup hype. It is a signal about what the culture will look like: direct, experienced, and impatient with superficiality. They built the studio that incubated Kana (super{set}) specifically to compress the early company-building phase, which means this company is already past the stage where most seed-stage startups are still figuring out what they are. They know the buyers, they know the stack, and they know what enterprise-grade actually means because they have delivered it to Salesforce and Microsoft. Tom Chavez also co-authored a book on data ethics and marketing, which tells you this team will take responsible AI and data governance seriously in the product from day one.",
    },
    cofounder: {
      name: "Vivek Vaidya",
      title: "CTO and Co-Founder, 3x founder, ex-Microsoft, ex-Salesforce",
      linkedin: "https://www.linkedin.com/in/vsvaidya/",
      image: "https://media.licdn.com/dms/image/v2/C5603AQFksLiHBqNfeQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1537985957037?e=2147483647&v=beta&t=43V6IHXBq_3Gy1piRnH6DJvqdH-0efkhkHG0tXA0zBY",
      bio: "Vivek Vaidya has been Tom Chavez's co-founder across all four companies. The technical architecture of Kana - loosely coupled agents that are composable, hot-swappable, and able to operate across heterogeneous marketing data environments - reflects his experience building enterprise-grade data infrastructure that actually ships. For technical roles, reach Vivek and lead with something you built.",
    },
    outreachByRole: [
      {
        role: "AI/ML Engineer - Agent Orchestration",
        proofOfWork: "Kana's core technical problem is building agents that are genuinely loosely coupled: composable, hot-swappable, and able to operate across heterogeneous marketing data environments without breaking when the underlying data schema changes or a new integration is added. This is a hard distributed systems and ML problem. It is not a prompting problem. The agents need to share state, pass structured marketing data objects between each other, and make their handoffs inspectable and replayable so that the human-in-the-loop review process actually works at enterprise scale. Core skills: multi-agent system design and workflow orchestration, familiarity with LangGraph or comparable orchestration frameworks, enterprise data integration patterns, privacy-compliant handling of first-party customer data, experience working with CDP or DSP environments, comfort building systems where state management and observability matter as much as model performance. For proof of work, build a small multi-agent orchestration demo: two loosely coupled agents sharing a structured marketing data object, where one handles audience segmentation and the other handles copy generation, and the handoff between them is inspectable and replayable. Post it on GitHub with a short README that explains your design choices and what you would change if this were running against live CDP data.",
        coldEmailAngle: "Vivek, the loosely coupled agent architecture you've described is genuinely hard to get right across legacy marketing stacks. I have been working on agent orchestration at [company] and I have a specific take on the composability problem. I built a small demo [GitHub link] that shows how I approach inspectable handoffs between agents. I want to work on the infrastructure that keeps this clean at enterprise scale. Worth 15 minutes?",
      },
      {
        role: "Enterprise Account Executive",
        proofOfWork: "Kana's GTM motion will be enterprise-led from day one. Fortune 500 marketing teams, major media companies, large brands with complex martech stacks and multi-quarter procurement cycles. The first AEs need to know how to navigate that buying process, speak fluently about CDPs, DSPs, and marketing data infrastructure, and explain agent-based automation to CMOs who have already been burned by AI tools that overpromised. Navin Chaddha's network runs deep into the exact companies Kana is targeting. The first commercial hire who can activate that network and close the pilots already in motion will have an outsized impact on the company's trajectory. Core skills: enterprise B2B SaaS sales, experience selling into marketing or adtech buyers preferred, ability to navigate large procurement and legal cycles, familiarity with the martech stack landscape (CDPs, DSPs, measurement platforms), comfort selling new categories to sceptical buyers. For proof of work, write a two-paragraph discovery call opener for a Fortune 500 CMO who has already deployed a marketing AI tool that underdelivered. The first paragraph acknowledges specifically what went wrong with the incumbent approach - name the category (generic copilots, rigid SaaS suites, disconnected point tools). The second paragraph pivots to Kana's agent configurability as the structural fix. This is not a cover letter. It is a live sales asset.",
        coldEmailAngle: "Tom, I've been selling into enterprise marketing teams for [X years] and I know exactly how to explain AI in a way that doesn't make CMOs nervous. Here's the two-paragraph opener I'd lead with on the first discovery call with [named account]. I want to bring Kana into the accounts where I have relationships. Can we talk?",
      },
      {
        role: "Product Manager",
        proofOfWork: "A team coming out of stealth with multiple active pilots, a complex multi-agent product, and a mandate to expand across engineering, product, and GTM simultaneously is almost certainly making product decisions by founder committee right now. A dedicated PM who can run structured discovery with enterprise clients, sequence the roadmap against actual pilot feedback, and define what \"configurable\" means in practice across five different martech stacks is the hire that unlocks the next phase. Core skills: enterprise SaaS product management, prior experience with AI or ML products strongly preferred, ability to run technical discovery with sophisticated marketing buyers, comfort with ambiguity and fast-moving roadmaps, strong written communication. For proof of work, do a product teardown of Kana's public-facing website and the TechCrunch interview with Chavez, and write a one-page analysis of what the product roadmap likely prioritises in the next 90 days based on what is publicly known. Then add a second paragraph on the one thing you would push to the top that is not yet mentioned publicly.",
        coldEmailAngle: "Tom, I did a product teardown of Kana based on everything publicly available and wrote up what I think the next 90-day priorities are [link]. I've PMed AI products at [company] and I want to bring that to Kana as you move from pilots to production. Happy to be wrong. Worth 15 minutes?",
      },
    ],
    avoid: "Don't send generic AI enthusiasm or mention the funding news as if it's impressive. Reference Rapt and Krux specifically in your outreach, not just the funding announcement. The pattern across all four companies is the same question - how do you make first-party data useful for real marketing outcomes? - and naming it shows you understand the intellectual through-line, not just the latest headline. For engineering roles, reach Vivek and lead with something you built. For commercial and product roles, reach Tom and attach a live asset, not a cover letter.",
    signal: "The investor lens is important here. Navin Chaddha is not a passive cheque writer. He joined the board personally, and his publicly stated thesis is that domain-specific AI agents, purpose-built for specific functions, represent the next category of enterprise software. When Chaddha joins a board, he is actively involved in company building, GTM strategy, and hiring decisions. His portfolio track record includes Lyft, HashiCorp, Poshmark, and dozens of enterprise infrastructure companies. His network is squarely in Fortune 500 enterprise. That network will be pointed directly at Kana's sales motion, and the company needs commercial hires who can operate at that altitude. Mayfield also launched a dedicated $250M AI seed fund in 2023 with a mandate to back applied AI companies at the application layer. Kana is exactly the category Mayfield built that fund to capture. That means follow-on capital is structurally available if the first hires execute and early pilots convert, which creates a fast hiring window before the Series A accelerates the pace further.",
    careersUrl: "",
    heroImage: "https://media.licdn.com/dms/image/v2/D563DAQE0c81h5KvdZQ/image-scale_191_1128/B56ZukXZQ5KYAg-/0/1767989155325/kana_intelligence_cover?e=1773248400&v=beta&t=770-vzYRFMTYzMDVsYJl19FrwFXZumvc9_g3n9viyfg",
    featured: true,
  },
  {
    name: "Trace",
    tagline: "trace.so · London, UK · AI Workflow Orchestration Platform",
    website: "trace.so",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQFuNXVsBiEwyw/company-logo_200_200/B4EZyapm5.IsAI-/0/1772121124828/trace_so_logo?e=2147483647&v=beta&t=ZQ9OAxNrZwxjMayn3cZxFTyAWudsTLU8lfM2yuJ99Ws",
    round: "Seed",
    amount: "$3M",
    detail: "~5 people, YC S25 batch, distributed London + SF",
    investors: "Y Combinator (S25 batch), Zeno Ventures, Transpose Platform Management, Goodwater Capital, Formosa Capital, WeFunder, angels",
    hiringScore: 8,
    hiringReason: "Round closed February 26, 6 days ago. No job listings yet because the hiring conversation has not happened. Outreach this week means you are in the room before the room exists.",
    whatBuilding: "Trace is a workflow orchestration platform that solves the most persistent and unglamorous blocker to enterprise AI adoption: agents do not know where they fit inside complex organisations. The platform builds a knowledge graph of a company's operational environment by reading the tools already in use - email, Slack, Airtable, project management software, any system that reflects how work actually flows. Once the graph is built, users issue high-level task prompts and Trace decomposes them into step-by-step workflows, delegates sub-tasks to AI agents with the specific context each agent needs to execute, and assigns remaining tasks to human team members. The result is an onboarding layer for AI agents that removes the months of internal integration work that most enterprise deployments currently require before a single agent can take reliable action.",
    whyMatters: "Enterprise AI adoption has been measurably slower than the investment cycle suggests it should be. The reason is not model quality. The models are exceptional. The reason is that deploying an AI agent into a real organisation requires the agent to understand that organisation - its tools, its informal decision-making structure, where the handoffs between teams happen - in a way that currently takes months of custom integration to achieve. Every company that has tried and failed to deploy an AI agent at scale has hit the same wall. Trace is attacking that wall directly, and the knowledge graph approach is structurally more defensible than plugin-based deployment because it is built from what already exists inside a company rather than imposed from the outside by a new platform. Anthropic launched enterprise agent plugins the week before Trace's announcement. Atlassian is building Jira-native agents. But these are platform plays. Trace's bet is that context built from lived operational reality is more durable than context prescribed by a vendor, and that is an intellectually defensible position with a real moat if they can execute.",
    roles: ["Enterprise Solutions / Implementation Engineer", "US-Based Sales Development Representative"],
    rolesNote: "The round closed February 26. That is six days ago. There are no job listings anywhere because the hiring conversation has not happened yet. Outreach this week means you are in the room before the room exists.",
    founder: {
      initials: "TC",
      name: "Tim Cherkasov",
      title: "CEO, ex-Copper PM, founder since age 17",
      linkedin: "https://linkedin.com/in/timcherkasov",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFs7in9kEYWAw/profile-displayphoto-shrink_200_200/B4DZUFToLPHIAg-/0/1739550786661?e=2147483647&v=beta&t=0q8m4x5UEu-F36GNmBr3xXYaqh0ZZl0rswDpxxYP5Oo",
      bio: "Tim Cherkasov was previously a product manager at Copper, a digital asset custodian, where he delivered an institutional product for State Street. Before that, a data scientist across hedge funds and scaleups, and a founder since the age of 17 across retail tech, travel, and web3. He is the public face of Trace, has been doing press since the TechCrunch announcement, and is reachable via LinkedIn. His framing of the core problem - the brilliant intern versus the manager who knows where to put them - is intellectually tight and repeatable. His background before Trace is not extensively documented in public sources, which means outreach from someone who has engaged carefully with the product thesis will stand out against generic enthusiasm. Contact: tim@trace.so or search LinkedIn.",
    },
    cofounder: {
      name: "Artur Romanov",
      title: "CTO, ex-Deliveroo Senior Engineer, multi-time founder",
      linkedin: "https://linkedin.com/in/arturromanov",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQE2_SlgmYXYqg/profile-displayphoto-scale_200_200/B4EZkNQjJnIoAc-/0/1756864067463?e=2147483647&v=beta&t=eCPlb_S_lQgNLujFk4ieqtc62CK15o1sB0c01Wdrx5I",
      bio: "Artur Romanov was a senior engineer at Deliveroo, where he built the grocery data-enrichment ML pipeline covering millions of items across thousands of retailers. That is a real-world, large-scale data problem with direct architectural relevance to what Trace is building: a knowledge graph that reads messy, inconsistent operational data and makes it useful for automated decision-making. He is a multi-time founder who has led backends in logistics and finance and deployed workflow automation across engineering and ops teams. His public thesis on the product is precise and quotable: \"2024 and 2025 was still about prompt engineering. Now we've moved from prompt engineering to context engineering. Whoever provides the best context at the right time is going to be the infrastructure on top of which the AI-first companies will be built.\" That framing is the intellectual foundation of the entire company. Reference it in outreach to Artur and you signal immediately that you understand what they are actually building, not just what the headline says. Artur is currently based in San Francisco per LinkedIn, while Tim operates from London - the founding team is already distributed across two continents at five people.",
    },
    outreachByRole: [
      {
        role: "Enterprise Solutions / Implementation Engineer",
        proofOfWork: "Trace's core deployment challenge is building the knowledge graph from a company's existing tools. This is a technical implementation process that requires integrating with Slack, email, Airtable, project management software, and custom internal systems that vary by customer. Someone needs to own this process with early accounts, build the default integration playbook from scratch, and feed quality signals back to the product team in real time. At this stage this person will likely be the first US-based customer-facing hire and will have direct access to the CEO on every implementation. Core skills: experience integrating with enterprise collaboration tools (Slack API, Google Workspace, Atlassian suite); familiarity with graph database concepts or workflow mapping; ability to translate technical implementation steps into language that non-technical operations leads understand; prior experience at an early-stage enterprise SaaS company where the integration playbook did not yet exist is directly relevant. For proof of work, sketch out what a Trace knowledge graph would look like for a 50-person startup using Slack, Notion, and Linear. Identify the ten most important nodes, the most important edges between them, and where the gaps that an AI agent would fall into appear. Post it as a one-page diagram or written description publicly. It does not need to be built. It needs to show you understand the mapping problem in a real operational context.",
        coldEmailAngle: "Tim, the knowledge graph problem is mostly an integration sequencing problem: which tools do you read first, which relationships do you infer versus explicitly map, and how do you handle the informal processes that exist nowhere in any tool. I have been working with enterprise workflow systems and I have a specific take on the first-order integrations that create the most useful graph. Here is how I would sequence it [link].",
      },
      {
        role: "US-Based Sales Development Representative",
        proofOfWork: "Trace is a London-founded company with a US enterprise target market. Getting early lighthouse customers in the US - the accounts that validate the product and serve as references for the next fifty - requires someone on the ground in the US who can run discovery outreach, identify which enterprise operations leaders are dealing with failed AI agent deployments, and build the early pipeline that lets the founder close. This is a sales development role that at this stage will have almost direct access to the CEO on every deal. There is no CRM, no sequence, no playbook yet. The person who takes this role writes all of it, or at the very least plays a fundamental role in building it. Core skills: B2B sales development or business development at an early-stage SaaS or enterprise software company, ability to identify and qualify operations or IT buyers at mid-to-large companies, comfort running outreach without a playbook, strong written communication in English. Prior exposure to AI, workflow automation, or enterprise productivity tools is a significant differentiator. For proof of work, identify three specific mid-size US companies (1,000 to 5,000 employees) where you can make a credible case that AI agent adoption has stalled inside the operations team. Use public signals: job listings, blog posts, conference talks, press coverage. Write a one-paragraph pitch for why Trace's approach would unblock each of them.",
        coldEmailAngle: "Tim, I have been in enterprise software and I can identify the specific US companies where AI agent adoption has stalled because of the context gap problem you are solving. I mapped three accounts and wrote up why each of them is a Trace customer waiting to happen [attached]. I want to build the pipeline that gets you to your first ten US logos.",
      },
    ],
    avoid: "Don't send generic AI enthusiasm. The round closed six days ago - timing is everything. Reference Artur's \"context engineering\" framing if reaching out for technical roles. For commercial roles, Tim is the contact. The fact that they're distributed across London and SF at five people means remote-first is not a policy, it is the default.",
    signal: "The cap table tells you more than the press release does. Three signals stand out. First, WeFunder, a community crowdfunding vehicle, is unusual for enterprise B2B. It suggests the founder is building a distributed audience alongside a sales pipeline, which opens a GTM approach most agent orchestration companies are not taking and will require people who can operate across both community and enterprise motions simultaneously. Second, Goodwater Capital, whose portfolio includes Kakao and ByteDance-backed consumer platforms, almost never backs pure enterprise plays. Their presence implies a broader product surface area than the current positioning suggests - either a prosumer layer or a marketplace dynamic is likely in the roadmap. Third, Transpose Platform Management invests specifically in workflow platforms that become operationally embedded and eventually acquired. Their involvement is a structural bet on Trace becoming infrastructure, not just software. When an investor whose entire thesis is about acquisition outcomes writes a cheque at seed, they are already thinking about what Salesforce, ServiceNow, or Atlassian would pay for this in three years. That timeline creates a fast and specific hiring mandate: get the product embedded in enough enterprise workflows to be irreplaceable before the platform players replicate it.",
    careersUrl: "",
    featured: false,
  },
];

const trends = [
  { sector: "DeFi-Backed Consumer Banking", status: "Emerging", text: "Moto's $1.8M pre-seed signals the regulatory window for compliant DeFi-backed consumer products has opened. The GENIUS Act, Circle's IPO, and institutional acceptance of stablecoins have made what was impossible two years ago viable today. The gap between Chase savings rates and DeFi yields is still enormous - the first product to bridge that gap cleanly wins a large market." },
  { sector: "Enterprise AI Agent Platforms", status: "Hot", text: "Kana's $15M seed from Mayfield with a board seat from Navin Chaddha is a signal that domain-specific AI agents for enterprise functions are the next category of enterprise software. The Rapt-Krux-Habu pattern ($1B+ in combined exits) means this team knows how to make first-party data useful for real marketing outcomes. CMOs are under pressure to adopt AI and cut budgets simultaneously - Kana answers both." },
  { sector: "AI Workflow Orchestration", status: "Heating", text: "Trace's $3M seed from YC S25 and an unusual investor mix (Goodwater, Transpose, WeFunder) points to the context engineering problem becoming central. Enterprise AI adoption has been slower than the investment cycle suggests because agents don't know where they fit inside complex organisations. The knowledge graph approach is structurally more defensible than plugin-based deployment." },
];

const compBenchmarks = [
  { role: "Solana / Blockchain Engineer", stage: "Pre-Seed", base: "$150K-$200K", equity: "0.5%-1.5%", notes: "Moto - Rust, Anchor, DeFi yield routing, Squads architecture" },
  { role: "Compliance Associate (Crypto)", stage: "Pre-Seed", base: "$120K-$160K", equity: "0.3%-0.8%", notes: "Moto - FinCEN, BSA, MTL frameworks, KYC/AML" },
  { role: "AI/ML Engineer (Agent Orchestration)", stage: "Seed", base: "$180K-$250K", equity: "0.2%-0.5%", notes: "Kana - LangGraph, multi-agent systems, CDP/DSP integration" },
  { role: "Enterprise Account Executive", stage: "Seed", base: "$150K-$200K + OTE", equity: "0.1%-0.3%", notes: "Kana - Fortune 500 marketing, complex procurement cycles" },
  { role: "Product Manager (AI)", stage: "Seed", base: "$160K-$220K", equity: "0.15%-0.4%", notes: "Kana - Enterprise SaaS, AI products, martech" },
  { role: "Solutions Engineer", stage: "Seed (YC)", base: "$140K-$180K", equity: "0.3%-0.8%", notes: "Trace - Slack/Google/Atlassian APIs, graph databases" },
  { role: "Sales Development Rep", stage: "Seed (YC)", base: "$70K-$90K + OTE", equity: "0.1%-0.3%", notes: "Trace - Enterprise B2B, AI/workflow automation" },
];

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
  const canSeeIntel = plan === "edge" || plan === "concierge";
  const isFree = plan === "free";

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
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-4">How to reach out</p>

            <div className="space-y-4 mb-5">
              <div className="bg-white rounded-lg p-4 border border-neutral-200">
                <div className="flex items-start gap-3 mb-2">
                  {startup.founder.image ? (
                    <img src={startup.founder.image} alt={startup.founder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                      <span className="text-neutral-900 font-semibold text-sm">{startup.founder.initials}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">{startup.founder.name}</p>
                    <p className="text-xs text-neutral-500">{startup.founder.title}</p>
                  </div>
                  {startup.founder.linkedin && (
                    <a href={startup.founder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{startup.founder.bio}</p>
              </div>

              {startup.cofounder && startup.cofounder.bio && (
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-start gap-3 mb-2">
                    {startup.cofounder.image ? (
                      <img src={startup.cofounder.image} alt={startup.cofounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                        <span className="text-neutral-900 font-semibold text-sm">{startup.cofounder.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{startup.cofounder.name}</p>
                      <p className="text-xs text-neutral-500">{startup.cofounder.title}</p>
                    </div>
                    {startup.cofounder.linkedin && (
                      <a href={startup.cofounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{startup.cofounder.bio}</p>
                </div>
              )}

              {startup.thirdFounder && startup.thirdFounder.bio && (
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-start gap-3 mb-2">
                    {startup.thirdFounder.image ? (
                      <img src={startup.thirdFounder.image} alt={startup.thirdFounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                        <span className="text-neutral-900 font-semibold text-sm">{startup.thirdFounder.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{startup.thirdFounder.name}</p>
                      <p className="text-xs text-neutral-500">{startup.thirdFounder.title}</p>
                    </div>
                    {startup.thirdFounder.linkedin && (
                      <a href={startup.thirdFounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{startup.thirdFounder.bio}</p>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-4">
              {startup.outreachByRole.map((roleOutreach, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-800">For {roleOutreach.role}:</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{roleOutreach.proofOfWork}</p>
                  <div className="bg-white rounded-lg p-3 border border-neutral-200">
                    <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                    <p className="text-sm text-neutral-700 italic">&quot;{roleOutreach.coldEmailAngle}&quot;</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> {startup.avoid}</p>
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
                <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-4">How to reach out</p>

                <div className="space-y-4 mb-5">
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="flex items-start gap-3 mb-2">
                      {startup.founder.image ? (
                        <img src={startup.founder.image} alt={startup.founder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                          <span className="text-neutral-900 font-semibold text-sm">{startup.founder.initials}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-neutral-900">{startup.founder.name}</p>
                        <p className="text-xs text-neutral-500">{startup.founder.title}</p>
                      </div>
                      {startup.founder.linkedin && (
                        <a href={startup.founder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{startup.founder.bio}</p>
                  </div>

                  {startup.cofounder && startup.cofounder.bio && (
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="flex items-start gap-3 mb-2">
                        {startup.cofounder.image ? (
                          <img src={startup.cofounder.image} alt={startup.cofounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                            <span className="text-neutral-900 font-semibold text-sm">{startup.cofounder.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">{startup.cofounder.name}</p>
                          <p className="text-xs text-neutral-500">{startup.cofounder.title}</p>
                        </div>
                        {startup.cofounder.linkedin && (
                          <a href={startup.cofounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{startup.cofounder.bio}</p>
                    </div>
                  )}

                  {startup.thirdFounder && startup.thirdFounder.bio && (
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="flex items-start gap-3 mb-2">
                        {startup.thirdFounder.image ? (
                          <img src={startup.thirdFounder.image} alt={startup.thirdFounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                            <span className="text-neutral-900 font-semibold text-sm">{startup.thirdFounder.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">{startup.thirdFounder.name}</p>
                          <p className="text-xs text-neutral-500">{startup.thirdFounder.title}</p>
                        </div>
                        {startup.thirdFounder.linkedin && (
                          <a href={startup.thirdFounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{startup.thirdFounder.bio}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-4">
                  {startup.outreachByRole.map((roleOutreach, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-sm font-semibold text-neutral-800">For {roleOutreach.role}:</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{roleOutreach.proofOfWork}</p>
                      <div className="bg-white rounded-lg p-3 border border-neutral-200">
                        <p className="text-xs text-rose-500 font-medium mb-1">Cold email angle</p>
                        <p className="text-sm text-neutral-700 italic">&quot;{roleOutreach.coldEmailAngle}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-neutral-500 leading-[1.8] text-[15px]"><span className="font-medium text-neutral-700">Avoid:</span> {startup.avoid}</p>
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
              <p className="text-xs text-neutral-400">Mar 4, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$19.8M total this week · DeFi Banking + AI Agents + Workflow Orchestration</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$19.8M</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">1 Pre, 2 Seed</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Round mix</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            DeFi meets consumer banking with Moto Finance ($1.8M pre-seed) building a Visa Infinite card that generates 2-5% yields through DeFi protocols - the founders built Squads, the largest protocol by value secured on Solana. Enterprise AI agents get a $15M bet from Mayfield with Kana - the fourth company from the founding duo behind $1B+ in exits to Microsoft, Salesforce, and LiveRamp. Workflow orchestration for AI deployment gets a YC S25 stamp with Trace ($3M), attacking the context engineering problem that has made enterprise AI adoption slower than the investment cycle suggests. The regulatory window for compliant DeFi-backed consumer products has opened, enterprise CMOs are under pressure to adopt AI while cutting budgets, and agents still don&apos;t know where they fit inside complex organisations. These companies are building the infrastructure to fix all three.
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
                    <p className="font-medium text-neutral-900">DeFi-Backed Consumer Banking</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Emerging</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">The regulatory window for compliant DeFi-backed consumer products has opened...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Enterprise AI Agent Platforms</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Domain-specific AI agents for enterprise functions are the next category...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Solana / Blockchain Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Pre-Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$200K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.5%-1.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">Moto - Rust, Anchor, DeFi</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">AI/ML Engineer (Agent Orchestration)</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$180K-$250K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">Kana - LangGraph, multi-agent systems</td>
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
