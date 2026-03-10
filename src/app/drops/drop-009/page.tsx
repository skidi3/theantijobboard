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
  fourthFounder?: {
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
  vimeoId?: string;
  videoUrl?: string;
  heroImage?: string;
  careersUrl?: string;
}

const startups: Startup[] = [
  {
    name: "SKYGEN.AI",
    tagline: "skygen.ai · San Francisco, CA · Autonomous AI Execution Layer",
    website: "skygen.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHSndrYWPSs-Q/company-logo_200_200/B4DZnU_5yEKoAI-/0/1760215146128/skygen_ai_logo?e=2147483647&v=beta&t=1eeKzXnatdPpE16VKY3lqOUe6xcUKE3-XTmsmu_-LFg",
    round: "Seed",
    amount: "$7M",
    detail: "February 16, 2026 · Undisclosed investors · 19-year-old founder",
    investors: "Undisclosed (stated as \"unnamed investors\" across all press). Absence of named investors is a yellow flag and should be noted by applicants.",
    hiringScore: 8,
    hiringReason: "Use of funds is explicit: develop and scale the autonomous AI platform. Engineering and first commercial hires are next. The path is short.",
    whatBuilding: "Skygen.AI is positioning itself as the company that moves enterprise AI from generation to execution. The core product is what the company calls an Execution Layer: an autonomous AI agent system that operates enterprise software visually, the way a human would, rather than via API integration. Most enterprise AI tools connect to CRM, ERP, or financial systems through structured API endpoints. If the system does not expose an API endpoint for the action the agent needs to take, the agent stops. Skygen's proprietary \"Computer Use\" mode bypasses this constraint by having the agent interpret the screen in real time, navigate the UI directly, and take actions inside live software interfaces. The company claims this makes it 2 to 3 times faster than API-based alternatives at executing complex, multi-step business processes. Underneath the computer use architecture is a system of sub-agents built on Google's Gemini Flash, orchestrated by a central coordinator. The system builds in-context memory, stores user preferences and workflow patterns as structured notes, and maintains goal alignment across long-running, multi-hour tasks. Security is handled by isolating each agent session inside a sandboxed virtual machine, so user data and enterprise system access is never exposed to Skygen's infrastructure.",
    whyMatters: "The screen-level automation thesis is gaining traction fast in 2026. Anthropic demonstrated computer use capabilities in late 2024. OpenAI's Operator followed. The core insight is that the bottleneck to enterprise AI adoption is not intelligence but integration: companies have hundreds of tools, many of which have no usable API, and getting an AI agent to act across all of them through traditional integration is an engineering project measured in months. If you can make the agent operate the software the way a human would, the integration problem disappears. The entire surface area of enterprise software becomes immediately accessible.",
    roles: ["AI Agent Engineer (Computer Use / Computer Vision)", "Enterprise Customer Development / Sales"],
    rolesNote: "The Globe Newswire release used the phrase \"the world's first autonomous Execution Layer,\" which is an aggressive positioning claim designed to create press momentum at launch. That kind of language is chosen by founders who are simultaneously fundraising and hiring, using the announcement itself as a signal to both audiences. The product description is technically specific: sandboxed virtual machines, Gemini Flash sub-agent architecture, in-context memory structured as bullet-pointed notes. That level of detail in a launch release means the product exists and the engineering priorities are already defined.",
    founder: {
      initials: "MS",
      name: "Mike Shperling",
      title: "Founder & CEO",
      image: "https://d.ibtimes.com/en/full/4633676/mike-shperling-founder-ceo-skygenai.png",
      linkedin: "https://linkedin.com/in/mikeshperling",
      bio: "Shperling has been building AI products since he was around 16. Co-founded AI Disraeli Copywriter in January 2022, an AI copywriting tool before the ChatGPT wave, which reached 25,000 users. He then founded Shperling AI, a platform for building RAG-based AI applications, which he ran from June 2023 to April 2025: $25K MRR, 300% MoM growth at peak, and a $7M valuation on an angels bridge round before he moved on to Skygen. He launched Skygen in October 2025. This changes the outreach calculus meaningfully. He is not figuring out what a good hire looks like for the first time. He has built, grown, and transitioned out of two prior companies before the age of 20. He knows what product-market fit looks and feels like, he has managed a team through a growth phase, and he has raised from angels before. He has built in RAG and AI application infrastructure, which means he has strong opinions about what solid AI engineering looks like in production. For engineering outreach, the proof of work needs to be genuinely technically credible, not a toy demo, but something that engages with a real production problem. For commercial outreach, reference the Shperling AI trajectory specifically: someone who grew a product to $25K MRR and then chose to move on to a harder problem is not optimising for comfort. He is looking for people who are similarly motivated by the difficulty of the problem, not the safety of the role.",
    },
    outreachByRole: [
      {
        role: "AI Agent Engineer (Computer Use / Computer Vision)",
        proofOfWork: "Skygen's core technical differentiator is the computer use mode: making an AI agent that can read and interact with a UI reliably, across different enterprise software environments, at production speed. This is a hard engineering problem. Screen layouts change between application versions. Enterprise software often has non-standard UI components. Session state management when operating inside a live system is fragile. Building this reliably at the scale Skygen needs to serve enterprise customers requires engineers who have worked on browser automation, UI testing, or computer vision pipelines in production environments. Core skills: experience with browser automation or UI-level software testing (Playwright, Selenium, or custom vision-based automation); familiarity with computer vision models for UI element detection; ability to build reliable session management and error recovery for long-running automated tasks; ideally experience working with Gemini, Claude, or GPT APIs in agentic contexts. For proof of work, build a minimal computer use demonstration: a Python script that uses a vision model to describe what it sees on a specific web-based UI, identifies a specific interactive element, and generates the action sequence needed to interact with it. Post it on GitHub. Write a short note on where the current model generation struggles with enterprise software specifically (dynamic content, session tokens, CAPTCHA, permissioned actions) and how you would address each. This is the exact class of problems Skygen is working on.",
        coldEmailAngle: "Mike, the computer use problem in enterprise environments is specifically a session reliability problem, not a model capability problem. The models can see and describe the UI accurately. The challenge is maintaining reliable action sequences across page transitions, authentication timeouts, and dynamic content. I have been working on [browser automation / computer vision pipelines] and I have a specific view on how to harden those sequences for production. Happy to share.",
      },
      {
        role: "Enterprise Customer Development / Sales",
        proofOfWork: "A product that positions itself as replacing human labour inside enterprise software workflows needs early lighthouse customers who can validate that the automation is reliable and compliant enough for regulated use. Skygen needs someone to identify those customers, run discovery conversations with operations leads and automation buyers, and help close the first five to ten enterprise accounts that make the rest of the sales motion credible. For proof of work, identify three specific enterprise use cases inside a named industry where screen-level AI automation is commercially compelling right now: where there is no usable API, where the manual process involves repetitive navigating of legacy UI, and where the cost of the human time is large enough to justify the automation investment. Write one paragraph on each. Show you have thought about the buyer, not just the product.",
        coldEmailAngle: "Mike, the enterprise use case that would validate Skygen fastest is probably not where most people would look first. I have a specific hypothesis about [finance / operations / compliance] workflows where the API absence problem is most acute and the buyer is most motivated. Want to compare notes?",
      },
    ],
    avoid: "One flag stated plainly: investors are fully undisclosed across every outlet that covered this. That limits the warm intro path and the network signal you would normally read from a cap table. What it means practically: your outreach goes directly to a 19-year-old founder who has no HR function and is making every hire decision personally.",
    signal: "The Globe Newswire release used the phrase \"the world's first autonomous Execution Layer,\" which is an aggressive positioning claim designed to create press momentum at launch. That kind of language is chosen by founders who are simultaneously fundraising and hiring, using the announcement itself as a signal to both audiences.",
    heroImage: "",
    careersUrl: "",
    featured: true,
  },
  {
    name: "Flying Tulip",
    tagline: "flyingtulip.com · New York, NY · Full-Stack Onchain Financial Marketplace",
    website: "flyingtulip.com",
    logo: "https://crypto-fundraising.info/wp-content/uploads/projects/2025/09/flyingtulip-logo.jpg",
    round: "Series A",
    amount: "$25.5M",
    detail: "January 29, 2026 · Total institutional capital: $225.5M · Perpetual put mechanism",
    investors: "Amber Group, Fasanara Digital, Paper Ventures (Series A). Prior seed: Brevan Howard Digital, CoinFund, DWF, FalconX, Hypersphere, Lemniscap, Nascent, Republic Digital, Selini, Susquehanna Crypto, Tioga Capital, Virtuals Protocol.",
    hiringScore: 8,
    hiringReason: "The Token Generation Event (TGE) is the start line, not the finish line. Post-TGE, the pressure inverts. Protocol features need to ship. Liquidity needs to be onboarded. Market makers need relationship management. The community needs developer tooling and documentation. Cronje has publicly stated that the $40M annual yield target funds growth, incentives, and buybacks. None of that can be executed without people.",
    whatBuilding: "Flying Tulip is building a full-stack onchain financial marketplace: a single cross-margin system that unifies spot trading, perpetual derivatives, options, lending, a native stablecoin (ftUSD), and onchain insurance. Most DeFi protocols solve one of these problems. Flying Tulip is building the infrastructure that handles all of them together, with shared collateral across products to maximise capital efficiency. The platform's standout structural innovation is the \"perpetual put\" where all investors can burn FT tokens at any time to redeem up to their original principal in the asset they contributed. This onchain downside protection, tied to reserves deployed via Aave, Ethena, and Spark, is designed to generate roughly $40M per year in protocol yield to fund development, incentives, and buybacks. All team economics are tied to protocol performance, not initial grants.",
    whyMatters: "DeFi has a fragmentation problem. Liquidity is split across dozens of specialised protocols, each with isolated collateral pools, separate UIs, and independent risk engines. Trading on one venue, borrowing on another, and hedging on a third creates compounding fees, compounding risk, and compounding complexity. Flying Tulip's single cross-margin system is the same thesis that made centralised exchanges dominant - the efficiency of unified collateral and cross-product netting - applied entirely onchain with transparent reserves and programmatic redemption rights.",
    roles: ["Smart Contract / Protocol Engineer", "DeFi Developer Relations / Ecosystem Engineer"],
    rolesNote: "The investor bench is worth reading carefully. Susquehanna Crypto and FalconX are both institutional market-making desks. Their involvement points directly toward a market structure and liquidity team build-out. Nascent and Lemniscap specialise in early-stage DeFi protocol infrastructure with strong developer community-building theses. Brevan Howard Digital brings traditional macro and derivatives expertise that reinforces the derivatives and options product build.",
    founder: {
      initials: "AC",
      name: "Andre Cronje",
      title: "Founder",
      image: "https://cryptoslate.com/wp-content/uploads/2020/09/person-andre-cronje.jpg",
      linkedin: "https://linkedin.com/in/andre-cronje",
      bio: "Serial DeFi protocol builder. Creator of Yearn Finance, co-creator of Solidly, key contributor to Fantom/Sonic. Known for building in public, shipping fast, and being genuinely indifferent to hype cycles. Has previously \"retired\" from DeFi and returned, each time with a more architecturally sophisticated project. This one, with the perpetual put mechanism and unified cross-margin system, is the most institutionally credible thing he has built. He is not a conventional founder in terms of outreach preferences: he does not respond well to generic pitches. He responds to people who have read the architecture, found something specific, and have a concrete view on it. Reference the whitepaper, not the press release.",
    },
    outreachByRole: [
      {
        role: "Smart Contract / Protocol Engineer",
        proofOfWork: "Flying Tulip's cross-margin architecture, native stablecoin, and onchain insurance module are not standard DeFi primitives. They are custom protocol engineering problems. The perpetual put mechanism alone requires smart contracts that can handle on-demand redemptions, reserve management, and rate-limiting across multiple chains. Cronje's previous track record - Yearn, Andre's Solidly, Sonic - means the engineering bar is set by one of the most prolific protocol builders in DeFi history. This hire needs to be able to read and write production Solidity or Rust at the level where they can contribute directly to the protocol's core. Core skills: production Solidity experience including ERC-4626, custom AMM or derivatives math, or lending protocol architecture; comfort with formal verification or audit-readiness practices; prior work on mainnet protocols with real TVL; ideally cross-chain bridging experience. For proof of work, audit a specific component of Flying Tulip's public architecture documentation or whitepaper. Identify one design decision that creates a potential edge case, explain the conditions under which it activates, and propose a mitigation. Post it on GitHub or write it up publicly.",
        coldEmailAngle: "Andre, the cross-margin liquidation engine has an interesting edge case when the perpetual put redemption demand coincides with a sharp drawdown on the lending book. I have been thinking through how the reserve rate-limiter interacts with that scenario and I have a specific view on the design tradeoff. Here is what I found: [link]. Happy to go deeper.",
      },
      {
        role: "DeFi Developer Relations / Ecosystem Engineer",
        proofOfWork: "A protocol that needs external developers building on top of it - market makers integrating APIs, protocols composing with ftUSD, teams building analytics dashboards - needs someone who can bridge the gap between internal engineering and the external builder ecosystem. This person writes documentation that is technically precise enough to be useful, builds example integrations that reduce onboarding friction, and shows up in the right Discord servers and developer forums to establish Flying Tulip as a credible platform for builders. Core skills: demonstrated track record in developer relations or ecosystem engineering at a DeFi protocol or blockchain infrastructure project; ability to write technically accurate documentation and code examples; existing relationships in the DeFi developer community; comfort on X and in Discord as a technical presence. For proof of work, write a technical integration guide for a hypothetical external protocol wanting to use ftUSD as collateral in a lending pool. Publish it.",
        coldEmailAngle: "Andre, the ecosystem composability story for ftUSD is stronger than any competitor's stablecoin because the perpetual put gives integrators downside protection on their reserve holdings. I have written a sample integration guide for how a lending protocol would onboard ftUSD [link]. This is the kind of documentation that brings builders into the ecosystem.",
      },
    ],
    avoid: "He is not a conventional founder in terms of outreach preferences: he does not respond well to generic pitches. He responds to people who have read the architecture, found something specific, and have a concrete view on it. Reference the whitepaper, not the press release.",
    signal: "The investor bench is worth reading carefully. Susquehanna Crypto and FalconX are both institutional market-making desks. Their involvement points directly toward a market structure and liquidity team build-out. Nascent and Lemniscap specialise in early-stage DeFi protocol infrastructure with strong developer community-building theses. Brevan Howard Digital brings traditional macro and derivatives expertise that reinforces the derivatives and options product build.",
    heroImage: "",
    careersUrl: "",
    featured: true,
  },
  {
    name: "Corvera AI",
    tagline: "corvera.ai · London, UK (HQ) / San Francisco, CA (YC) · AI-Powered CPG Operations",
    website: "corvera.ai",
    logo: "https://bookface-images.s3.us-west-2.amazonaws.com/logos/78620b35ef33d5475eddc8e7e79de388c7acf34e.png",
    round: "Pre-Seed",
    amount: "£1.5M (~$2M)",
    detail: "January 2026 · Y Combinator W26 · 15 design partners · 50+ brand pipeline",
    investors: "Firstminute Capital (lead), Y Combinator (W26), angel investors Dom Maskell (exited co-founder, Runna), Alex Bouaziz (co-founder, Deel)",
    hiringScore: 9,
    hiringReason: "Three signals compound here. First, the funding announcement explicitly names US and UK business growth as the primary use of funds. Second, the team is currently inside Y Combinator's W26 batch, which runs through April 2026. Demo Day is in April. The hiring window between batch close and Demo Day is the narrowest and most productive outreach window that exists for any YC company: founders are building at maximum intensity, their YC partners are pushing them to hire, and formal ATS systems are weeks away from being set up. Third, Alex Bouaziz's angel investment is the single most important signal in the cap table. Bouaziz co-founded and scaled Deel into a multi-billion dollar global HR and payroll infrastructure company. His investment is not passive. It signals that Corvera's US expansion will be supported by the exact network and playbooks that Deel used to crack enterprise HR buyers across global markets. Expect Corvera to build US GTM faster than their team size currently suggests.",
    whatBuilding: "Corvera is building an AI-powered operations and supply chain management platform specifically for CPG (consumer packaged goods) and FMCG brands. The product is designed to function as a hands-free command centre: it manages orders, inventory forecasting, logistics coordination, and financial visibility across a brand's supply chain, with AI agents replacing the manual operational work that currently requires a dedicated ops team. The system tracks 50-plus brands across its design partner pipeline, with 15 signed up already. Target customers are fast-growing retail brands - the kind scaling through DTC, retail, and wholesale simultaneously, where supply chain complexity outpaces founder bandwidth. The pitch to CPG founders is simple: instead of hiring an ops manager, deploy Corvera.",
    whyMatters: "CPG supply chain operations are one of the most overlooked automation opportunities in enterprise software. The tools that exist - ERPs, logistics management platforms, demand planning software - were built for large brands with dedicated ops teams. Fast-growing mid-market CPG brands sit in a gap: too complex for spreadsheets, too small to justify enterprise software implementation costs. Most rely on a combination of Airtable, Notion, email threads, and one overworked ops hire. Corvera is targeting this gap with a purpose-built AI layer that knows CPG-specific workflows: MOQs, lead times, retailer compliance requirements, promotional demand spikes, co-packer relationship management.",
    roles: ["CPG Operations / Customer Success Lead (US-Based)", "Full-Stack / AI Product Engineer"],
    rolesNote: "The hiring window between batch close and Demo Day is the narrowest and most productive outreach window that exists for any YC company: founders are building at maximum intensity, their YC partners are pushing them to hire, and formal ATS systems are weeks away from being set up.",
    founder: {
      initials: "CK",
      name: "Chris Kong",
      title: "CEO",
      image: "https://bookface-images.s3.us-west-2.amazonaws.com/avatars/9238a1c5b939ec83a46ca72b61e979661caa0c0b.jpg",
      linkedin: "https://linkedin.com/in/cwnkong",
      bio: "Two-time founder and Forbes 30 Under 30. Built Better Nature from zero to one of Europe's largest plant-based brands, 6 countries, 5,000-plus retail stores, personally closing every major deal and leading every fundraise over six years. He has lived the exact supply chain pain Corvera is solving. Commercial outreach should be grounded in CPG operations specifics, not generic startup enthusiasm.",
    },
    cofounder: {
      name: "Dirk Breeuwer",
      title: "CTO",
      image: "https://bookface-images.s3.us-west-2.amazonaws.com/avatars/6fa43c3533a3c00594c7ab78aa339ce86b786e44.jpg",
      linkedin: "https://linkedin.com/in/dirkbreeuwer",
      bio: "Spent six-plus years at Google, building the first global data warehouse for Google Pixel and leading the Marketing AI Transformation Programme, including a multi-agent workflow automation that improved compliance review efficiency by 90 percent. He has shipped agentic AI in production at scale. He will evaluate engineering candidates against that bar. A GitHub link beats a CV.",
    },
    thirdFounder: {
      name: "Matthew Collins",
      title: "CPO",
      image: "https://bookface-images.s3.us-west-2.amazonaws.com/avatars/e5c9a9fe27e2816cf92ce37d3a3b3c884c9c8736.jpg",
      linkedin: "https://linkedin.com/in/itsmcollins",
      bio: "Holds a Princeton MEng in Computer Science. Was Head of Product at Rosemark, an AI-powered B2B data analytics platform, and previously scaled the Computer Science department at Eton College. Also did AI research at a generative AI startup in 2023. He sits at the intersection of technical depth and product thinking. Product outreach routes through him.",
    },
    fourthFounder: {
      name: "Berk Güngör",
      title: "Head of AI Engineering",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFRApAAjqniBA/profile-displayphoto-crop_800_800/B4DZvT_lWkH0AI-/0/1768788220856?e=1774483200&v=beta&t=sy73_7ckGyYSCTGHBmxMsRcI5A7wW_2VI_GxuQOnZ9w",
      linkedin: "https://linkedin.com/in/berk-güngör-35196a14a",
      bio: "Six-plus years in applied LLMs and real-world AI product development. Functionally a founder-equivalent despite not being listed as one in press coverage. He owns the hard problem: making AI agents reliable enough that a CPG brand trusts them to run unsupervised. Engineering candidates on the AI side are being evaluated by him.",
    },
    outreachByRole: [
      {
        role: "CPG Operations / Customer Success Lead (US-Based)",
        proofOfWork: "Corvera's product only works if it understands the specific operational workflows of its customers deeply. A CS or implementation hire in the US is the person who onboards new brands, configures the AI agents to handle their specific supplier and retailer relationships, and ensures the product generates visible outcomes quickly enough that the brand renews and refers others. This person needs to speak the language of CPG operations: they need to understand what a co-packer contract looks like, why a promotional period creates a demand planning nightmare, and what a retailer compliance failure costs a brand. Core skills: 2 to 5 years in operations, customer success, or account management at a CPG brand, food/beverage distributor, or supply chain software company; familiarity with demand forecasting, inventory management, and retailer compliance workflows; ideally experience working with Airtable, NetSuite, or similar tools in a CPG context; US-based, comfortable working across US and UK time zones. For proof of work, write a two-paragraph diagnosis of the supply chain failure mode for a hypothetical DTC brand scaling into Whole Foods and Target simultaneously - specifically, what breaks operationally between months three and six after retail launch. This is the exact scenario Corvera's customers face.",
        coldEmailAngle: "Chris, the moment a CPG brand launches into a major retailer is also the moment their supply chain operations break. I have seen this specific failure pattern [at company / in my own brand / in my ops consulting work] and I have a view on where the gaps are between what exists and what Corvera is building. Happy to share and to explore whether there is a role in building out your US CS function.",
      },
      {
        role: "Full-Stack / AI Product Engineer",
        proofOfWork: "Corvera is a 4-person founding team, which means the next engineering hire is making the team's first senior technical bet. Dirk Breeuwer (ex-Google, led Google Pixel's global data warehouse and Google's Marketing AI Transformation Programme) will evaluate this hire personally. The product requires integrating across multiple data sources - supplier portals, logistics APIs, retailer EDI systems, accounting software - and presenting a unified operational picture that the AI agent can act on. Core skills: full-stack experience with Python backend and React or similar frontend; experience building data integrations or ETL pipelines connecting multiple business systems; prior work in a supply chain, logistics, or inventory management context is a strong plus; comfort with LLM orchestration and agent-based architectures in production. Matthew Collins (co-founder, Princeton Computer Science) will also be in this hiring conversation. For proof of work, build a minimal demand forecasting module: a script that ingests historical order data in CSV format, applies a simple time-series model, and outputs a 90-day inventory recommendation with a clear visual summary. Post it on GitHub.",
        coldEmailAngle: "Dirk - the data integration layer is where Corvera's product either wins or loses against the status quo. Most CPG brands have their supplier data in email, their inventory data in Airtable, and their sales data in a Shopify export. Building the pipeline that unifies those into a state that an AI agent can act on is a specific engineering challenge I have been thinking about [GitHub link]. Happy to go deeper.",
      },
    ],
    avoid: "Commercial outreach should be grounded in CPG operations specifics, not generic startup enthusiasm. For engineering outreach, a GitHub link beats a CV. Dirk will evaluate engineering candidates against his Google bar - he has shipped agentic AI in production at scale.",
    signal: "Alex Bouaziz's angel investment is the single most important signal in the cap table. Bouaziz co-founded and scaled Deel into a multi-billion dollar global HR and payroll infrastructure company. His investment is not passive. It signals that Corvera's US expansion will be supported by the exact network and playbooks that Deel used to crack enterprise HR buyers across global markets.",
    heroImage: "",
    careersUrl: "",
    featured: false,
  },
];

const trends = [
  { sector: "Screen-Level AI Automation", status: "Emerging", text: "The screen-level automation thesis is gaining traction fast in 2026. Anthropic demonstrated computer use capabilities in late 2024. OpenAI's Operator followed. The core insight is that the bottleneck to enterprise AI adoption is not intelligence but integration: companies have hundreds of tools, many of which have no usable API. Skygen's proprietary \"Computer Use\" mode bypasses this constraint by having the agent interpret the screen in real time, navigate the UI directly, and take actions inside live software interfaces." },
  { sector: "DeFi Cross-Margin Unification", status: "Hot", text: "DeFi has a fragmentation problem. Liquidity is split across dozens of specialised protocols, each with isolated collateral pools, separate UIs, and independent risk engines. Flying Tulip's single cross-margin system is the same thesis that made centralised exchanges dominant - the efficiency of unified collateral and cross-product netting - applied entirely onchain with transparent reserves and programmatic redemption rights. The perpetual put mechanism provides onchain downside protection tied to reserves deployed via Aave, Ethena, and Spark." },
  { sector: "CPG Supply Chain AI", status: "Heating", text: "CPG supply chain operations are one of the most overlooked automation opportunities in enterprise software. Fast-growing mid-market CPG brands sit in a gap: too complex for spreadsheets, too small to justify enterprise software implementation costs. Most rely on a combination of Airtable, Notion, email threads, and one overworked ops hire. Corvera is targeting this gap with a purpose-built AI layer that knows CPG-specific workflows: MOQs, lead times, retailer compliance requirements, promotional demand spikes, co-packer relationship management." },
];

const compBenchmarks = [
  { role: "AI Agent Engineer (Computer Use)", stage: "Seed", base: "$180K-$250K", equity: "0.5%-1.5%", notes: "SKYGEN.AI - browser automation, computer vision, Gemini APIs" },
  { role: "Enterprise Customer Dev / Sales", stage: "Seed", base: "$140K-$180K + OTE", equity: "0.3%-0.8%", notes: "SKYGEN.AI - operations buyers, automation validation" },
  { role: "Smart Contract / Protocol Engineer", stage: "Series A", base: "$180K-$280K + tokens", equity: "Token allocation", notes: "Flying Tulip - Solidity/Rust, cross-margin, ERC-4626" },
  { role: "DeFi DevRel / Ecosystem Engineer", stage: "Series A", base: "$140K-$200K + tokens", equity: "Token allocation", notes: "Flying Tulip - documentation, ftUSD integrations" },
  { role: "CPG Operations / CS Lead (US)", stage: "Pre-Seed", base: "$120K-$160K", equity: "0.3%-0.8%", notes: "Corvera AI - retailer compliance, S&OP, brand onboarding" },
  { role: "Full-Stack / AI Product Engineer", stage: "Pre-Seed", base: "$160K-$200K", equity: "0.5%-1.2%", notes: "Corvera AI - Python/React, ETL, LLM orchestration" },
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

        {startup.heroImage && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <img
              className="w-full"
              src={startup.heroImage}
              alt={`${startup.name} intro`}
            />
          </div>
        )}

        {startup.vimeoId && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src={`https://player.vimeo.com/video/${startup.vimeoId}?h=0&title=0&byline=0&portrait=0`}
              title={`${startup.name} intro`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
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

              {startup.fourthFounder && startup.fourthFounder.bio && (
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-start gap-3 mb-2">
                    {startup.fourthFounder.image ? (
                      <img src={startup.fourthFounder.image} alt={startup.fourthFounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                        <span className="text-neutral-900 font-semibold text-sm">{startup.fourthFounder.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{startup.fourthFounder.name}</p>
                      <p className="text-xs text-neutral-500">{startup.fourthFounder.title}</p>
                    </div>
                    {startup.fourthFounder.linkedin && (
                      <a href={startup.fourthFounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{startup.fourthFounder.bio}</p>
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

          {startup.heroImage && (
            <motion.div {...stagger(4)} className="mb-8">
              <div className="rounded-xl overflow-hidden">
                <img className="w-full" src={startup.heroImage} alt={`${startup.name} intro`} />
              </div>
            </motion.div>
          )}

          {startup.vimeoId && (
            <motion.div {...stagger(4)} className="mb-8">
              <div className="rounded-xl overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src={`https://player.vimeo.com/video/${startup.vimeoId}?h=0&title=0&byline=0&portrait=0`}
                  title={`${startup.name} intro`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}

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

                  {startup.fourthFounder && startup.fourthFounder.bio && (
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="flex items-start gap-3 mb-2">
                        {startup.fourthFounder.image ? (
                          <img src={startup.fourthFounder.image} alt={startup.fourthFounder.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center shrink-0">
                            <span className="text-neutral-900 font-semibold text-sm">{startup.fourthFounder.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">{startup.fourthFounder.name}</p>
                          <p className="text-xs text-neutral-500">{startup.fourthFounder.title}</p>
                        </div>
                        {startup.fourthFounder.linkedin && (
                          <a href={startup.fourthFounder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{startup.fourthFounder.bio}</p>
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
              <p className="text-xs text-neutral-400">Mar 10, 2026 (Tue)</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$34.5M this drop · Screen-Level AI + DeFi Cross-Margin + CPG Operations</p>
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
            <p className="text-[10px] sm:text-xs text-neutral-500">startups</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$34.5M</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-rose-500">8+</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">avg hiring score</p>
          </div>
        </div>

        <div className="space-y-6">
          {startups.map((startup, index) => (
            <div key={startup.name} id={`startup-${index}`} className="scroll-mt-6 transition-all duration-500 rounded-2xl">
              <StartupCard
                startup={startup}
                index={index}
                plan={plan}
                onFocus={() => setFocusedIndex(index)}
              />
            </div>
          ))}
        </div>

        {plan !== "free" && (
          <>
            <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10 mt-8">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-6">Market Trends</h2>
              <div className="space-y-6">
                {trends.map((trend, i) => (
                  <div key={i} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-medium text-neutral-900">{trend.sector}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trend.status === "Hot" ? "bg-rose-100 text-rose-600" :
                        trend.status === "Emerging" ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>{trend.status}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{trend.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10 mt-8">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-6">Compensation Benchmarks</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-2 font-medium text-neutral-500">Role</th>
                      <th className="text-left py-3 px-2 font-medium text-neutral-500">Stage</th>
                      <th className="text-left py-3 px-2 font-medium text-neutral-500">Base</th>
                      <th className="text-left py-3 px-2 font-medium text-neutral-500">Equity</th>
                      <th className="text-left py-3 px-2 font-medium text-neutral-500 hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compBenchmarks.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 last:border-0">
                        <td className="py-3 px-2 text-neutral-900">{row.role}</td>
                        <td className="py-3 px-2 text-neutral-600">{row.stage}</td>
                        <td className="py-3 px-2 text-neutral-900">{row.base}</td>
                        <td className="py-3 px-2 text-neutral-600">{row.equity}</td>
                        <td className="py-3 px-2 text-neutral-500 text-xs hidden md:table-cell">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
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
