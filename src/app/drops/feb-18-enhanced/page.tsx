"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cdn } from "@/lib/cdn";
import Link from "next/link";

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
  careersUrl?: string;
}

const startups: Startup[] = [
  {
    name: "Ricursive Intelligence",
    tagline: "ricursive.ai · San Francisco · AI Chip Design",
    website: "ricursive.ai",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/0076c9cf634f46238c01aa0667386f5c",
    round: "Series A",
    amount: "$335M",
    detail: "$4B valuation",
    investors: "Lightspeed, Sequoia",
    hiringScore: 8,
    hiringReason: "$335M raised in 4 months, scaling fast",
    whatBuilding: "The chip design industry has a profound bottleneck. Building a single advanced semiconductor takes teams of hundreds of engineers, 12 to 18 months of iterative design work, and $100M to $650M in engineering labour. The finished chip is already outdated by the time it ships. Ricursive's insight: use AI to design the chips that train better AI, then use those better chips to design even smarter AI. A recursive loop. Anna Goldie and Azalia Mirhoseini proved this at Google with AlphaChip, which compressed chip layout from 12+ months to 6 hours using deep reinforcement learning and shipped in five generations of Google TPUs. Ricursive is building a full stack platform handling placement, routing, verification, and architecture search using AI agents that get smarter with every chip they design.",
    whyMatters: "The semiconductor industry is a $600B+ market that is structurally stuck. Cadence, Synopsys, Siemens EDA have barely changed their software paradigm in 30 years. Human engineers are still the bottleneck. AI cannot advance faster than the hardware it runs on, and hardware cannot advance faster than humans can design it. Ricursive attacks that constraint at its root. If their platform delivers even 10x improvement in design throughput, it makes custom purpose-built chips (for robotics, drugs, climate, medicine) economically viable for companies that could never afford bespoke silicon. Worth noting: AlphaChip attracted controversy, a 2022 peer dispute at Google led to a colleague's dismissal and Nature published a methodology correction. Goldie and Mirhoseini contested vigorously and Google's investigation found in their favour. Knowing this history signals to founders you've done real research.",
    roles: ["LLM Infra Engineer", "EDA Algorithm Engineer", "LLM Modeling & Scaling Researcher", "Founding Security Engineer", "Operations"],
    rolesNote: "Competition is very low right now. They've pulled from DeepMind, Anthropic, Apple, and Cadence. Window for early numbered employees closes in 60 to 90 days.",
    founder: {
      initials: "AG",
      name: "Anna Goldie",
      title: "CEO, MIT CS+Linguistics, 15,977 Google Scholar cites",
      hook: "Anna has an MIT bachelor's in CS and Linguistics. Before chip design, she co-first-authored neural machine translation research (EMNLP 2017) and Constitutional AI at Anthropic. She's also co-author of RAPTOR (ICLR 2024) on recursive retrieval for LLMs. She and Azalia have been professionally synchronised for over a decade, same start date at Google Brain, Anthropic, and back to Google. Jeff Dean nicknamed AlphaChip 'chip circuit training' because they both did circuit training workouts together. For ML/RL researchers: reference the reward signal architecture from the 2021 Nature paper, specifically the proxy objective (wirelength + congestion). For infra engineers: lead with distributed RL training experience, GPU orchestration, simulation environments. Show your GitHub.",
      avoid: "Do not lead with 'I love what you're building.' Lead with a technical observation. Example: 'I've been following the debate around AlphaChip's pre-training methodology since the CACM paper, curious how Ricursive's architecture handles transfer learning across heterogeneous chip topologies.'",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/7ee982c5169847c78d18238e4973595a",
    },
    cofounder: {
      name: "Azalia Mirhoseini",
      title: "CTO, ex Google DeepMind",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6e575ab801fa48ae981f27a332a2bc99",
    },
    signal: "First hires came directly from AlphaChip colleagues: Ebrahim Songhori, Hao Chen, Jiwoo Pak. The non-research route in: reach out to these early employees on LinkedIn, engage with their posts (Ebrahim posts about technical work), demonstrate implementation level understanding. Azalia leads hiring for research roles. Her Google Scholar page lists her key interests and co-authors, which is a roadmap to what she values. They reportedly received 'weird emails from Zuckerberg making crazy offers' while building AlphaChip. They turned Meta down to build something they fully owned.",
    featured: true,
    videoId: "Mb2nioDfpJA",
  },
  {
    name: "Monaco",
    tagline: "monaco.com · San Francisco · AI Sales Platform",
    website: "monaco.com",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/04fedb3f0ebb400cb7fca2c4b1016d9c",
    videoUrl: "https://cdn.monaco.com/landing/public/pages/home/hero-video.webm",
    round: "Seed + Series A",
    amount: "$35M",
    detail: "Founders Fund led",
    investors: "Founders Fund, Patrick & John Collison, Garry Tan, Neil Mehta",
    hiringScore: 8,
    hiringReason: "40 employees, scaling fast post Series A",
    whatBuilding: "Every seed stage startup hits the same wall: they need outbound sales but don't know how, can't afford a seasoned CRO, and existing tools were designed for Salesforce era companies with 50 person teams. Monaco provides the full sales motion (building ranked TAM, running outreach campaigns, scheduling meetings) using AI agents supervised by experienced human salespeople. Not AI pretending to be a rep. Actual senior sales operators watching over AI that executes.",
    whyMatters: "The $80B+ CRM and sales tech market is being disrupted from both sides: LLMs making outreach cheaper, and founders who don't want to spend $150K/year on Salesforce before having 10 customers. Monaco's wedge is seed to Series A companies, the most underserved segment. The risk: YC has funded hundreds of AI SDR startups. The moat: the human expertise in the loop model is hard to replicate without hiring operators like Sam Blond.",
    roles: ["AI/Agent Engineers", "Full Stack Engineers", "ML Engineers", "Account Executives", "Forward Deployed Sales Executives"],
    rolesNote: "Sam started as an SDR at EchoSign for Jason Lemkin (now SaaStr). He understands what it's like to cold-call from a list. He's distinctly not a Silicon Valley insider by background.",
    founder: {
      initials: "SB",
      name: "Sam Blond",
      title: "CEO, ex Brex CRO, ex Founders Fund Partner",
      linkedin: "https://www.linkedin.com/in/samblond/",
      hook: "Sam's X feed is unusually educational. He's published detailed breakdowns of Brex's most successful campaigns including a '75% demo rate, 75% demo to close' campaign when Brex had ~30 employees. He hates external recruiters; best hires came through personal referrals. For AEs: cold email Sam with a specific metric first: 'I closed $1.4M ARR as AE #2 at [company] in 18 months, sourcing 60% of my own pipeline.' For AI engineers: frame work in terms of workflow orchestration and human oversight systems, not just model fine tuning. Monaco's differentiation is the human in the loop.",
      avoid: "Don't pitch yourself as someone who wants to work at an 'AI company' generically. Monaco is a sales company that uses AI. The ability to 'reach power and know how to target a CEO' is the scarcer skill he values over raw SDR output.",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/1b4b1c8a22c14105a2f04e80a25b5a29",
    },
    cofounder: {
      name: "Brian Blond",
      title: "Co-founder, VC at Human Capital, serial CRO",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6c93b8e265594c7ca0943adbb740344a",
    },
    signal: "Brian is the quieter door in. VC at Human Capital with a huge network, responsible for sales team culture and methodology. Less approached than Sam. CPO Abishek Viswanathan (ex Apollo, ex Qualtrics) is the hiring lens for product/ops roles. He's been on podcasts about PLG. Office has WWII era motivational posters saying 'Save Startups' and a gong that rings every time AI books a meeting. High energy, sales first culture.",
    careersUrl: "",
  },
  {
    name: "Entire",
    tagline: "entire.io · Fully Remote · AI Dev Infrastructure",
    website: "entire.io",
    logo: "https://avatars.githubusercontent.com/u/33188652?s=200&v=4",
    round: "Seed",
    amount: "$60M",
    detail: "$300M valuation, largest dev tool seed ever",
    investors: "Felicis, Madrona, M12 (Microsoft), Basis Set",
    hiringScore: 8,
    hiringReason: "15 person team doubling to 30, fully remote",
    whatBuilding: "AI can write code faster than humans can understand it. A PR might contain 2,000 lines of AI generated code and the reviewer has no idea what prompted it, what constraints the AI was working within, or what alternatives it considered. Entire's first product, Checkpoints, creates a new kind of repository: a Git compatible database that stores not just the code, but the full creation context (prompts, reasoning sessions, decision trees). Their semantic reasoning layer lets humans and AI agents query across this context, not just the code. Thomas Dohmke's phrase: 'We're moving from file browsers to specifications.' Version control for the age of agentic software.",
    whyMatters: "Thomas ran GitHub from 2021 to 2025. He launched Copilot, grew it to 20 million users, watched it become responsible for a substantial portion of GitHub's revenue. Then he left to build Entire, not as a competitor to GitHub, but as a layer higher in the stack. The person who built the most successful AI coding tool in history thinks the infrastructure beneath it needs to be rebuilt from scratch. Satya Nadella told Thomas personally to 'keep pushing until your last day' and supported his departure amicably. M12 investing signals Microsoft sees this as complementary infrastructure, not a threat.",
    roles: ["Backend/Infrastructure Engineers", "Developer Experience Engineers", "DevRel", "Developer Focused PMs"],
    rolesNote: "Reference Entire's three layer architecture: Git compatible database, semantic reasoning layer, UI. The interesting problem is the database layer. It must handle agents emitting far more context than humans ever did. Show your GitHub profile prominently. Thomas actively keeps his own green.",
    founder: {
      initials: "TD",
      name: "Thomas Dohmke",
      title: "CEO, East Berlin-raised, PhD Mechanical Engineering Glasgow",
      linkedin: "https://www.linkedin.com/in/ashtom/",
      image: "https://entire.io/team/thomas.png",
      hook: "Thomas grew up in East Berlin (pre reunification), got computer access in a school geography lab, bought a Commodore 64. His GitHub handle is @ashtom and he maintains a green contribution graph. He codes regularly, even as CEO. His bio says: 'I'm a LEGO enthusiast, and love turning that GitHub contribution graph more green.' He gave a TED Talk in 2024: 'With AI, anyone can be a coder now.' Reference the Pragmatic Engineer podcast he did in June 2025 (Gergely Orosz's podcast), it's the most detailed technical account of his thinking. He contributed to ml5.js, understands developer adoption intimately from HockeyApp.",
      avoid: "Don't position yourself as an 'AI engineer' who wants to build agents. Entire is explicitly not building agents, they're building infrastructure around agents. They want to scale to 'hundreds of agents' internally, not hundreds of employees.",
    },
    signal: "M12 (Microsoft's VC arm) invested, meaning Entire has implicit distribution into Microsoft's enterprise developer ecosystem. If you have enterprise sales experience with Microsoft accounts, name it. Madrona is Seattle based, so Pacific Northwest developer community is a hiring pipeline. The cleanest non founder door in is through Felicis portfolio network. Fully remote team. 15 people with $60M means each hire matters enormously.",
    careersUrl: "",
  },
  {
    name: "Runway",
    tagline: "runwayml.com · New York · AI Video & World Models",
    website: "runwayml.com",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/saipwi1nv1mxdrpa9fmi",
    round: "Series E",
    amount: "$315M",
    detail: "$5.3B valuation, $860M total raised",
    investors: "General Atlantic, Nvidia, Fidelity, Adobe, Google",
    hiringScore: 7,
    hiringReason: "422 employees, mature startup with research credibility + real revenue",
    whatBuilding: "Runway started in 2018 as three NYU art students who wanted to make AI powered creative tools. Gen 1 allowed visual style transfer. Gen 2 produced video from text. Gen 3 and Gen 4.5 generate HD video with native audio, complex physics, and 'consistent world' logic across scenes. Everything Everywhere All at Once used their tools. So did Madison Beer's music video and House of David (350+ AI shots). The pivot that explains the Series E: they're no longer just a video tool company. They're building 'world models', AI that constructs internal 3D representations of how environments work, including physics, causality, and time. Same architecture has applications in robotics, gaming, medicine, and architecture.",
    whyMatters: "One of the few AI companies with strong research credibility, a real consumer product, enterprise revenue, and a credible long term thesis. Adobe's investment is notable. They're a potential acquirer and/or distribution partner. The 'full stack' philosophy Cris articulates (from model research to infrastructure to product design to brand) is unusual. Most AI companies do research or product. Runway does both. Expensive and complex, which explains why they keep raising.",
    roles: ["Computer Vision / World Model Researchers", "Enterprise AEs (gaming/robotics/media)", "Creative/Brand Roles", "Product Engineers"],
    rolesNote: "422 employees at Series E. This is a scale up hire, not a founding team hire. Equity upside is more moderate. The specific hiring push is robotics and gaming partnerships.",
    founder: {
      initials: "CV",
      name: "Cristóbal Valenzuela",
      title: "CEO, Chilean economist turned media artist, TIME100 AI",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_170,w_170,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/816d1507ebcb459e8276f35efcab0ea3",
      hook: "Cris is a Chilean immigrant who came to study at NYU's ITP ('an art school for engineers and an engineering school for artists'). He contributed to ml5.js, an open source ML library for artists and creative coders. He worked with Daniel Shiffman (The Coding Train YouTube channel) at ITP. He's written about AI as a 'new kind of camera that creates a new art form.' For CV researchers: frame background in 3D understanding, physics based simulation, or video diffusion. If you've worked on NeRFs or Gaussian splatting, that's directly relevant. For creative/brand roles: show a portfolio. They ran their own AI Film Festival.",
      avoid: "Don't approach Runway as purely an ML shop. They care deeply about creative tools and artist empowerment. Cris cares about aesthetics. Treating video generation as 'just another AI problem' misses the mark.",
    },
    cofounder: {
      name: "Anastasis Germanidis",
      title: "CTO, most technically rigorous of the three founders",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/skjjl34apuxsdergxhj7",
    },
    signal: "Anastasis (CTO) is the one posting publicly about world model research. Engaging with his research notes before reaching out is the most effective warm approach. Runway hosts its own AI Film Festival. Warm intro paths: NYU ITP alumni, Google AI alumni, creative agency world, Hollywood/media connections. If you have robotics or gaming enterprise relationships, you're going after an underserved pipeline.",
    careersUrl: "https://runwayml.com/careers",
    videoId: "AwKSrJFvdps",
  },
  {
    name: "Vega Security",
    tagline: "vega.io · Tel Aviv + NYC · AI Native Cybersecurity",
    website: "vega.io",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHazMKkdOBwUw/company-logo_200_200/B56ZlH_q8QI0AI-/0/1757849497789/vega_security_io_logo?e=1773273600&v=beta&t=VWHo8A1c0YtWk9symWQrJdgK3onKy6kZxx8iO4XCWJw",
    videoUrl: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe%2F6967b6d377447e8a045b5031_01_mp4.mp4",
    round: "Series B",
    amount: "$120M",
    detail: "$700M valuation, $185M total raised",
    investors: "Accel, Cyberstarts, Redpoint, CRV",
    hiringScore: 8,
    hiringReason: "21 open roles, Fortune 500 contracts, expanding US",
    whatBuilding: "Every major enterprise runs a SIEM (Splunk being dominant, Cisco acquired for $28B in 2024). SIEM requires pulling all security data into a centralised lake before you can analyse it. For a bank with petabytes of logs spread across 40 cloud environments, that centralisation costs tens of millions and takes 18 to 24 months. Vega's architecture inverts this: instead of moving data to where analysis happens, they bring analysis to where data lives, directly in cloud services, data lakes, storage. They call it 'operational silence': instead of more alerts for overwhelmed SOC teams, they surface distilled, investigated threats with context. Shay's phrase: 'We are a platform that investigates the threat in your own environment and distills the truth.'",
    whyMatters: "SIEM is broken and everyone knows it. Splunk costs explode as companies grow, implementation takes years, false positives drown SOC teams. Three conditions converging: AI exponentially increasing security data volume, regulated industries can't move data, cloud native architectures make centralisation structurally harder. Vega attacks the market at exactly the right technical inflection. Unit 8200 background matters. Shay has classified level understanding of how threats actually behave, which almost no commercial founder has.",
    roles: ["Security/Detection Engineers", "Enterprise Sales (US expansion)", "Solutions/Sales Engineers", "Backend Engineers (Go/Python)"],
    rolesNote: "13 roles Tel Aviv (on site), 8 roles US (remote, sales focus). For detection engineers: reference in situ threat detection architecture, query performance over distributed storage at petabyte scale. If you have DuckDB, Iceberg, Delta Lake experience, that's relevant. For US sales: frame around specific regulated industry accounts (banking, healthcare) you've closed.",
    founder: {
      initials: "SS",
      name: "Shay Sandler",
      title: "CEO, Open University of Israel, ex Granulate ($650M Intel acquisition)",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacbf5f00da1414b95a2_cbcd0223efbc31b2efe33e49f55b46f3_shay%20sandler.avif",
      linkedin: "https://www.linkedin.com/in/shay-sandler-305508107/",
      hook: "Shay studied at Open University of Israel, not a prestigious tech university, credentials come entirely from operational experience. He was founding team at Granulate (Intel acquired for $650M in 2022, then shut down in restructuring). That experience, building a $650M company and watching the acquirer close it, shapes his drive to build independently. He wants to build 'a billion dollar company in Israel that remains independent.' His cultural filter: 'I recruit people with hunger in their eyes, those who are not afraid to go all out.' He's at AWS re:Invent, RSA, cloud security conferences. He's socially active in US enterprise tech community despite being Tel Aviv based.",
      avoid: "Don't approach with generic 'I'm interested in cybersecurity'. Vega is replacing one of the most entrenched enterprise tools. Show you understand the specific pain of SIEM at scale.",
    },
    cofounder: {
      name: "Eli Rozen",
      title: "CTO, Unit 8200 + Granulate veteran",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacb39949d0f629a9de0_169b7405ef19c513276671a924cc224e_eli%20rozen.avif",
      linkedin: "https://www.linkedin.com/in/eli-rozen/",
    },
    signal: "Eli leads the technical team and is responsible for engineering hires. Less publicly visible than Shay. Cyberstarts investors (Gili Raanan, Lior Simon) are active LinkedIn publishers and deeply networked in Israeli/US cyber ecosystem. Getting intro through them is more effective than cold outreach. Look for Vega employees on LinkedIn who were previously at Palo Alto Networks, CrowdStrike, or Wiz. That's the talent pipeline.",
    careersUrl: "https://www.comeet.com/jobs/vega/C9.009",
  },
  {
    name: "Hauler Hero",
    tagline: "haulerhero.com · San Diego · Waste Management SaaS",
    website: "haulerhero.com",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEUaN5qeD7K2Q/company-logo_200_200/company-logo_200_200/0/1630641641284/haulerhero_logo?e=1773273600&v=beta&t=hc8MOnYDplQwnIY9tPPZPCY95m2q0A_lbzv6P2MZbVQ",
    round: "Series A",
    amount: "$16M",
    detail: "$27M total, 120+ customers across 40 states",
    investors: "Frontier Growth, I2BF Ventures, K5 Global, Somersault",
    hiringScore: 7,
    hiringReason: "200% revenue growth, doubled everything since seed",
    whatBuilding: "Waste management is a $90B+ industry in the US, and until recently was running on software from the 1990s. Dispatch done on whiteboards. Billing in Excel. Customer complaints tracked in notebooks. Hauler Hero is ServiceTitan for trash, an all in one SaaS platform handling routing, billing, CRM, two way SMS, and now AI powered image verification from truck mounted cameras (Hero Vision), which automatically confirms pickups and flags missed collections or contaminated materials. 35M+ trash pickups processed, serves 120+ haulers across 40 states, counts Verizon, Wells Fargo, McDonald's, PG&E, US Army, and Marriott among indirect clients.",
    whyMatters: "Every industry 'too boring' for software investment for 30 years is now being digitised, and first movers build massive switching cost moats. Waste haulers don't switch software. Migration cost is enormous. Once a hauler uses Hauler Hero for dispatch, billing, and CRM simultaneously, NRR approaches 120%+. Mark's background is the key signal: he spent nearly four years at ServiceTitan, watched it grow from ~$20M run rate to multi billion dollar valuation. He chose not to build an MVP, citing how ServiceTitan struggled to expand into adjacent categories without acquiring. Hauler Hero was built as a full platform from day one.",
    roles: ["SMB Account Executives", "Full Stack/Product Engineers", "ML/Computer Vision Engineers", "Customer Success", "Implementation Specialists"],
    rolesNote: "For AEs: Mark was a top sales rep himself. Be explicit about ACV, deal cycle length, and whether you've sold to operations heavy buyers (field service, logistics, construction). For engineers: Hero Vision (AI image capture from truck cameras) is the newest product. Edge ML, on device inference, or CV pipelines with limited connectivity are relevant.",
    founder: {
      initials: "MH",
      name: "Mark Hoadley",
      title: "CEO, Harvard math/science, Illinois Math & Science Academy",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQE-fDkMXmR9Yg/profile-displayphoto-scale_200_200/B4EZxIMctzGcAY-/0/1770737753417?e=2147483647&v=beta&t=zG8gkGQ739Hrttqep5w1YdW5LkDY5SS3Ug4tSfc_9wQ",
      linkedin: "https://www.linkedin.com/in/hoadley/",
      hook: "Mark graduated from Harvard with a math/science background, attended Illinois Mathematics and Science Academy (selective public boarding school for gifted students). His proudest stat: he generated $10M ARR for ServiceTitan when the company's entire run rate was ~$20M. He found Hauler Hero through his brother in law Ben Sikma, who was doing M&A in waste management and kept finding technologically ancient businesses. His philosophy: 'Egos get checked at the door and the best idea wins.' He describes waste haulers with genuine affection: 'These are people who really are doing backbreaking work and God's work.' Reference ServiceTitan specifically if you've sold against or alongside them.",
      avoid: "Don't position this as a 'stepping stone' to a more glamorous AI company. They want people genuinely excited about an underserved industry.",
    },
    cofounder: {
      name: "Ben Sikma",
      title: "President, ex ESG (Dover), M&A in waste management, Georgetown MBA",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHbP7q7PJDf3w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721341953288?e=1773273600&v=beta&t=U2AAyYWzWHoIYoc3EtAzelbBAuUDz07O8PFZaEhJhRA",
    },
    signal: "Ben Sikma handles much of the operational and customer facing side. For customer success or implementation roles, reaching out to Ben directly with field service or logistics software background is more direct than going through Mark. Jobs page is sparse. Roles often go unlisted and are filled through referral. Following their LinkedIn and engaging with product announcements puts you in front before roles are posted. WasteExpo 2025 (May 5 to 8, Las Vegas), if you can attend, it's a direct path to the team in a non competitive context.",
  },
  {
    name: "Fundamental",
    tagline: "fundamental.tech · San Francisco · Enterprise Data AI",
    website: "fundamental.tech",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHRg4wfLuP9GA/company-logo_200_200/B4DZwuVOUSJcAI-/0/1770303841955/fundamentalhq_logo?e=1773273600&v=beta&t=49wRt4UQLE0FAcQwOT-YqlvL3kvP4-P1iSaQSxptfrA",
    round: "Series A",
    amount: "$255M",
    detail: "$1.4B valuation",
    investors: "Oak HC/FT, Salesforce Ventures, Battery",
    hiringScore: 8,
    hiringReason: "7 figure Fortune 100 contracts at seed stage",
    whatBuilding: "LLMs are remarkably good at unstructured data (text, images, audio) and remarkably bad at structured data. Financial analysts asking GPT-4 about their spreadsheets watch it drop rows, invent numbers, and lose precision. Fundamental's NEXUS is a Large Tabular Model built from scratch to work with structured data at enterprise scale. Not transformer based. Fully deterministic. Can process billions of rows without breaking a sweat. Their insight: enterprise value isn't locked in PDFs and emails, it's locked in databases, transaction records, and spreadsheets that comprise 90% of an organisation's data.",
    whyMatters: "This is the fastest seed to unicorn trajectory in enterprise AI this year. Founded October 2024. Unicorn by February 2026. $255M Series A before most companies have a working prototype. The founding team is ex DeepMind (deep on research), ex Bridgewater (deep on data at scale), ex JPMorgan (deep on enterprise buyers). And they already have seven figure contracts with Fortune 100 companies before the Series A even closed. AWS partnership creates distribution without having to build a 200 person sales team.",
    roles: ["ML Researchers (tabular data)", "ML Engineers", "Enterprise Account Executives", "Solutions Engineers", "Data Scientists", "Product Manager"],
    rolesNote: "For ML researchers: frame your work in terms of tabular specific architectures like tree ensembles, TabNet, SAINT, FT Transformer. If you've worked on structured prediction problems (fraud, credit, pricing), that's more relevant than NLP or vision work. For AEs: name the enterprise accounts (banks, insurers, healthcare systems) you've closed predictive analytics or data infra into. They need people who can sell into CFOs and CDOs.",
    founder: {
      initials: "JF",
      name: "Jeremy Fraenkel",
      title: "CEO, UC Berkeley ML, ex Drift cofounder, ex Bridgewater/JPMorgan",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGAaYfc96TJaw/profile-displayphoto-scale_400_400/B4EZwtXrkIHsAg-/0/1770287711718?e=1773273600&v=beta&t=Il2TUA5n-U3Kfm1JfPYTMm3J8fQI2D5dFKVzOO3YUvE",
      linkedin: "https://www.linkedin.com/in/jeremyfraenkel/",
      hook: "Jeremy's undergraduate degree from UC Berkeley was in Machine Learning. He co-founded Drift (the conversational marketing platform that sold to Vista Equity for $1B) before pivoting into enterprise AI research. His career arc moves from finance (JPMorgan, Bridgewater) to consumer (Drift) to enterprise AI (Fundamental), that breadth is unusual. He's published 'Revealing the Hidden Language of Tables' on the Fundamental blog, which is the most technical explanation of their approach. Reference the NEXUS architecture (deterministic, not probabilistic), the difference between their approach and LLM fine tuning for tabular data, or ask about their AWS co sell motion.",
      avoid: "Don't say 'I want to work on LLMs.' NEXUS is explicitly not an LLM. It's a purpose built architecture for structured data. If you conflate them, you signal you haven't read past the headline. Don't pitch yourself as a generalist ML engineer. They want specificity on tabular methods.",
    },
    cofounder: {
      name: "Sam Batchelor",
      title: "Co-founder, ex DeepMind Research",
    },
    signal: "Fundamental's AWS partnership is the distribution hack that lets them punch above their weight. For enterprise sales roles, having existing AWS account relationships or experience with AWS Marketplace co sell is a significant advantage. Salesforce Ventures investing means CRM/data integration with Salesforce ecosystem is on the roadmap. Experience there is relevant. They hired senior talent from Stripe and Databricks. If you have connections into either company, those are warm intro paths.",
    featured: true,
  },
  {
    name: "Modal Labs",
    tagline: "modal.com · San Francisco · AI Inference Infrastructure",
    website: "modal.com",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQHy7exnpF9hzA/company-logo_200_200/B4EZmTj1JVKQAI-/0/1759117267991/modal_labs_logo?e=1773273600&v=beta&t=UQLrsqy7tU3jnCTyuTtIR_GSFv1dUjZcA2Ihp_jB49w",
    round: "Pre-raise",
    amount: "~$2.5B",
    detail: "In talks, current val $1.1B, $50M ARR",
    investors: "General Catalyst (in talks)",
    hiringScore: 8,
    hiringReason: "Valuation 2.3x in 5 months, $50M ARR",
    whatBuilding: "Inference infrastructure that removes the friction between writing Python code and running it on cloud GPUs. You write a function, add a decorator, and Modal handles the rest: spinning up containers, provisioning GPUs, managing cold starts, scaling to zero. They're the missing infrastructure layer between 'I trained a model' and 'it's running in production at scale.' Their architecture is technically ambitious. They built their own container runtime, scheduler, and file system from scratch instead of using Kubernetes.",
    whyMatters: "Valuation more than doubled in 5 months (from $1.1B to $2.5B in talks). $50M ARR with a small team. Competitor Baseten is valued at $5B, meaning Modal is arguably undervalued heading into this raise. The timing matters: this raise hasn't closed yet. That means formal job postings will spike 4 to 8 weeks after announcement. Getting your application in now, before the flood, is the strategic move.",
    roles: ["Infrastructure / Systems Engineers", "GPU / CUDA Optimization Engineers", "Developer Advocates", "Enterprise Sales", "Developer focused PM", "Site Reliability Engineers"],
    rolesNote: "For infrastructure engineers: they built their own container runtime (not Docker), their own scheduler (not Kubernetes), their own distributed file system. Reference work on similar ground up systems. For GPU engineers: frame work in terms of utilization optimization, cold start latency, batching strategies, quantization. For DevRel: show your technical writing portfolio. Erik values people who can explain complex systems clearly.",
    founder: {
      initials: "EB",
      name: "Erik Bernhardsson",
      title: "CEO, ex Spotify ML (built Luigi), ex Better.com CTO, KTH Sweden",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH6pzr4eaE_dw/profile-displayphoto-scale_200_200/B4EZlzD3iRIQAY-/0/1758572018374?e=2147483647&v=beta&t=1bV9zQmd0yFdbLnRW84htEDbG0KRKSTNU5bq7KDwZ7Q",
      linkedin: "https://www.linkedin.com/in/erikbern/",
      hook: "Erik built Luigi (the open source Python workflow engine used by Spotify, Foursquare, Stripe), which has 18k+ GitHub stars. He ran ML at Spotify (built their recommendation engine) and was CTO at Better.com. He's an engineer's engineer who has published deeply technical blog posts for over a decade (erikbernhardsson.com). He responds to technical depth and genuine curiosity. If you've contributed to Luigi, Airflow, Prefect, or any workflow orchestration tool, lead with that. Reference a specific inference optimization problem you've tackled: batching, quantization, cold start latency, GPU memory management.",
      avoid: "Waiting too long. The raise isn't closed yet. This is the single best window to reach out before they're inundated with post announcement applications. Don't be generic. Erik has seen thousands of 'I'm passionate about infrastructure' pitches. Show you've read his blog.",
    },
    cofounder: {
      name: "Akshat Bubna",
      title: "Cofounder, Systems Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEZbKIjJB6I9A/profile-displayphoto-scale_400_400/B4EZl3ChkHKcAg-/0/1758638774967?e=1773273600&v=beta&t=veqYAx4j2gGRXchMBioqL9IOT4ah2XAxG8rlmVRjZvs",
    },
    signal: "Raise in active talks with General Catalyst. Outreach now, before the round closes, gets you in front of founders who still have time to talk. After the close, hiring velocity ramps up, but founder accessibility drops significantly. The co founder Akshat Bubna is less publicly visible than Erik and potentially more accessible for engineering roles. Modal is remote friendly but has an SF presence.",
  },
  {
    name: "ElevenLabs",
    tagline: "elevenlabs.io · Remote (London/NYC hubs) · Voice AI",
    website: "elevenlabs.io",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQG8vBl8F4QX1w/company-logo_200_200/company-logo_200_200/0/1668126895834/elevenlabsio_logo?e=1773273600&v=beta&t=f3-zwcWV-gSo6VjBUCsvMAPRO-jNnjZwQUPUx9zxIrs",
    round: "Series D",
    amount: "$500M",
    detail: "$11B valuation, $330M+ ARR",
    investors: "Sequoia (lead), a]6z, ICONIQ, Lightspeed, BOND",
    hiringScore: 8,
    hiringReason: "400 employees, tripled valuation in a year, IPO track",
    whatBuilding: "Voice AI platform that generates human like speech in 32 languages. Started with text to speech, now powering voice agents for customer support, sales, and internal workflows. Enterprise customers include Deutsche Telekom, Revolut, Square, and the Ukrainian Government. Their Eleven v3 Conversational model enables real time voice agents with sub second response times.",
    whyMatters: "Europe's third largest AI unicorn. Crossed $330M ARR with only 250 employees organized into micro teams of 5 to 10 people. Founders still interview every single hire. They're building toward IPO and already did employee tender offers at $6.6B. This is a mature, profitable AI company with real revenue.",
    roles: ["Full Stack Engineers (Frontend Leaning)", "ML Research Scientists", "Voice Agent Engineers", "Enterprise Sales", "Technical Recruiters", "Solutions Engineers"],
    rolesNote: "Remote first but have hubs in London and NYC. Founders interview everyone. Micro team structure means you'll have real ownership.",
    founder: {
      initials: "MS",
      name: "Mati Staniszewski",
      title: "CEO & Co-founder, ex Palantir",
      linkedin: "https://www.linkedin.com/in/matiii/",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQG0LNRBscpNzA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710763388152?e=1773273600&v=beta&t=ZWY5C3pwHE3F-LlEe7PJFLE_gsxJcQHW-zSBmwpyXas",
      hook: "Mati (@elevaboratory on X) and Piotr still interview every hire. They're Polish founders who started ElevenLabs because American films were badly dubbed in Poland. They care deeply about craft and mission alignment. Reference specific voice AI challenges you've worked on, or show you understand why voice is the next interface.",
      avoid: "Generic AI enthusiasm. They've heard it all. Show you understand the specific technical or business challenges of voice: latency, expressiveness, multilingual support, enterprise deployment.",
    },
    cofounder: {
      name: "Piotr Dąbkowski",
      title: "CTO & Cofounder, ex Google ML",
      image: "https://media.licdn.com/dms/image/v2/C5603AQGl4tBRJF5ZAQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516930466249?e=1773273600&v=beta&t=th9pPiRQRNtV_Q23SeGf6sBbr0WeBrjXX6VwNG2r8kk",
    },
    signal: "Founders interview everyone even at 400 employees. This is rare. The company is profitable, growing fast, and eyeing IPO. Warm intro paths: Palantir alumni, Google ML alumni, Sequoia portfolio, a16z portfolio. They're remote first but London and NYC are where the hubs are.",
    careersUrl: "https://jobs.ashbyhq.com/elevenlabs/",
    featured: true,
  },
  {
    name: "PolyAI",
    tagline: "poly.ai · London + SF · Enterprise Voice Agents",
    website: "poly.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGmCIr__8aYiA/company-logo_200_200/company-logo_200_200/0/1697640572943/polyai_logo?e=1773273600&v=beta&t=iTFPWjG3o2Tn0y3jyKQ91zAXm-A9f_sd82skA7RKmok",
    round: "Series D",
    amount: "$86M",
    detail: "$750M valuation, $200M+ total raised",
    investors: "Georgian, Hedosophia, Khosla Ventures, NVentures (Nvidia), Citi Ventures",
    hiringScore: 8,
    hiringReason: "2000+ live deployments, 45 languages, Fortune 500 clients",
    whatBuilding: "AI voice agents that actually handle real customer service conversations, not just IVR menus. Their agents handle millions of calls for PG&E, UniCredit, healthcare systems, and restaurant groups. One restaurant client saw 10% revenue increase from AI handled reservations. They're going after the $400B call center industry.",
    whyMatters: "Founded in 2017, so they have 7 years of production voice AI experience. That's an eternity in AI years. Cambridge ML researchers who bet on voice when everyone else was doing chatbots. Nvidia's VC arm invested, which signals serious enterprise AI infrastructure credibility.",
    roles: ["ML Engineers (Speech/NLU)", "Backend Engineers (Python/Go)", "Solutions Architects", "Enterprise Sales (US expansion)", "Customer Success Managers", "Applied Scientists"],
    rolesNote: "Dual headquarters in London and SF. Actively expanding US presence. Enterprise sales roles likely need US based.",
    founder: {
      initials: "NM",
      name: "Nikola Mrkšić",
      title: "CEO & Co-founder, Cambridge ML PhD",
      linkedin: "https://www.linkedin.com/in/nikola-mrksic/",
      image: "https://cdn.sanity.io/images/u9ir40pr/production/cea6e4162f8fc0da70bc3a8cd43e6e1be2997c15-856x1124.png",
      hook: "Nikola is a Cambridge ML PhD who was first technical hire at VocalIQ (acquired by Apple). He knows voice AI from the ground up. Reference specific challenges in conversational AI: turn taking, context retention across long calls, handling accents and background noise, integrating with enterprise systems.",
      avoid: "Treating voice as 'just another AI modality'. PolyAI has been doing production voice for 7 years. They've seen every failure mode. Show you understand why voice is hard.",
    },
    cofounder: {
      name: "Shawn Wen",
      title: "CTO & Co-founder",
      image: "https://cdn.sanity.io/images/u9ir40pr/production/b1fedf4b8a6524d52c02d84d88a590f1d4e7fbc9-450x600.jpg",
    },
    signal: "Cambridge ML mafia. Warm intro paths: Cambridge CS alumni, Apple/VocalIQ alumni, Khosla portfolio, Georgian portfolio. They're expanding US aggressively so SF based roles are opening up.",
    careersUrl: "https://poly.ai/careers",
  },
  {
    name: "Goodfire",
    tagline: "goodfire.ai · San Francisco · AI Interpretability",
    website: "goodfire.ai",
    logo: "https://cdn.prod.website-files.com/67b4608695ee3b31a669d3a9/67ec4958590e172310498188_Clip%20path%20group.svg",
    round: "Series B",
    amount: "$150M",
    detail: "$1.25B valuation, $209M total raised",
    investors: "B Capital (lead), Juniper, Menlo, Lightspeed, Salesforce Ventures, Eric Schmidt",
    hiringScore: 8,
    hiringReason: "Raised $150M less than a year after Series A, scaling research team",
    whatBuilding: "AI interpretability research lab. They're building tools to understand what's actually happening inside AI models, not just what they output. Their approach lets you design AI systems with specific behaviors rather than hoping training produces what you want. Think of it as debugging tools for neural networks.",
    whyMatters: "Interpretability is the safety research that actually matters for deployment. Tom McGrath founded DeepMind's interpretability team. Nick Cammarata was core to OpenAI's interpretability work. Eric Schmidt personally invested. This is the team that will define how enterprises trust AI systems.",
    roles: ["Interpretability Researchers", "ML Engineers", "Research Engineers", "Applied Scientists", "Enterprise Partnership leads"],
    rolesNote: "Deep research focus. They want people who've published or have serious ML engineering chops. Not a place for AI tourists.",
    founder: {
      initials: "EH",
      name: "Eric Ho",
      title: "CEO & Cofounder, ex RippleMatch founder, Forbes 30u30",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEmSpZ4d5KXTw/profile-displayphoto-scale_200_200/B56Zv.BYzMKkAY-/0/1769493336010?e=2147483647&v=beta&t=iDt4ou_DrTltiMTOtY_rlS_ApTxx9JoLNp7bv5iN4kM",
      linkedin: "https://www.linkedin.com/in/eric-ho-53981862/",
      hook: "Eric built and sold RippleMatch, so he knows how to scale. But Goodfire is a research company first. Reference specific interpretability work: mechanistic interpretability, feature visualization, circuit analysis. Show you understand why understanding AI matters more than just making it bigger.",
      avoid: "Positioning yourself as a generalist ML engineer. They want deep expertise in interpretability or adjacent areas. This is a research lab, not a product company.",
    },
    cofounder: {
      name: "Tom McGrath",
      title: "Chief Scientist, ex DeepMind Interpretability founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEUxh2ihnFk-A/profile-displayphoto-shrink_400_400/B4EZZE3.7EG0Ag-/0/1744912248799?e=1773273600&v=beta&t=E6vDRSis8wtHNXN3yGDGBRLlEJWDjhMsGhEUm9SRsFM",
      linkedin: "https://www.linkedin.com/in/tom-mcgrath-7337bb151/",
    },
    signal: "Research lab with unicorn valuation. Rare combination. Warm intro paths: DeepMind alumni, OpenAI alumni (especially interpretability team), academic ML researchers, South Park Commons network. Tom is on X @banburismus_.",
    careersUrl: "https://www.goodfire.ai/careers",
  },
  {
    name: "Simile",
    tagline: "simile.ai · Bay Area + NYC · Human Behavior AI",
    website: "simile.ai",
    logo: "https://simile.ai/icon.png",
    round: "Series A",
    amount: "$100M",
    detail: "Stanford spinout, Index Ventures led, Feb 12",
    investors: "Index Ventures (lead), Bain Capital Ventures, Fei-Fei Li, Andrej Karpathy",
    hiringScore: 8,
    hiringReason: "Just emerged from stealth with $100M, building founding team",
    whatBuilding: "In 2023, Joon Sung Park populated a virtual town with 25 AI agents, each with a biography, daily routine, and ability to remember and reflect. The agents planned a Valentine's Day party, ran for mayor, gossiped, and spread information through emergent social dynamics. The paper won Best Paper at UIST 2023 and got covered by the NYT, The Guardian, Nature, and Science. Simile is the commercial version: a foundation model for human behaviour that represents real individuals based on their actual memories and decision patterns from deep interview data, predicting how they'll respond to products, campaigns, or policies. CVS uses it to decide which products to stock across 9,000+ stores. Wealthfront stress tests how investors will react to market scenarios. The Gallup partnership enables instant, demographically accurate synthetic polling.",
    whyMatters: "Market research is a $140B industry built on slow, expensive surveys that over represent people who respond to surveys. Simile's agents simulating 1,052 real people matched their actual survey responses with 85% accuracy, comparable to those individuals re taking the same survey two weeks later. Andrej Karpathy (Tesla Autopilot, OpenAI co founder) and Fei Fei Li (ImageNet creator, World Labs co founder) are personal investors. These are not financial bets, they're scientific endorsements.",
    roles: ["ML Research Scientists (agents/simulation)", "Behavioral Scientists", "Full Stack Engineers", "Enterprise Sales", "Product Managers"],
    rolesNote: "Research grade bar. Read both the original Generative Agents paper (arXiv 2304.03442) and the 1,000 People follow up (arXiv 2411.10109) before applying. For ML roles: reference agent memory systems, reflection architectures, LLM reasoning. For behavioural science: GSS methodology, Big Five, survey design. For enterprise sales: reference insights teams at CVS, Wealthfront, Gallup, or Suntory.",
    founder: {
      initials: "JP",
      name: "Joon Sung Park",
      title: "CEO & Cofounder, Stanford PhD, GitHub: joonspk research",
      image: "https://joonsungpark.s3.amazonaws.com/static/img/collaborators/joonsung_park.jpg",
      linkedin: "https://www.linkedin.com/in/joon-sung-park/",
      hook: "Joon's personal site (joonspk.com) has a Kernighan quote in the footer: 'Debugging is twice as hard as writing the code in the first place.' His generative_agents GitHub repo (under joonspk research) has hundreds of thousands of stars and forks. He gave a TED Talk in October 2023 and taught a Stanford CS course on simulating individuals. For research roles, cite both papers and specifically mention the memory retrieval reflection loop architecture. For behavioural science roles, reference GSS or Big Five methodology and how Simile's agents encode personality. For enterprise sales, reference insights teams at CVS, Wealthfront, or Suntory, companies already in the customer base.",
      avoid: "Treating this as 'just another LLM wrapper.' The November 2024 paper shows 85% accuracy on real human prediction. That's rigorous social science meets ML. Come prepared or don't come. Don't skip the papers.",
    },
    cofounder: {
      name: "Percy Liang",
      title: "Co-founder, Stanford CS Professor, coined 'foundation model', runs CRFM",
    },
    signal: "Percy Liang is one of the most cited NLP researchers alive, co founder of Together.ai, and runs Stanford's Center for Research on Foundation Models (CRFM). Michael Bernstein co authored work on crowd computing and social computing systems. The non founder path in is through Stanford's CS and HCI departments. They're hiring from their own research networks. Engaging with Percy's HELM benchmark work or Holistic Evaluation papers before reaching out to Joon positions you as someone who reads the full research ecosystem, not just the press coverage.",
    careersUrl: "https://simile.ai/careers",
  },
];

const trends = [
  { sector: "Healthcare AI", status: "Hot", text: "Clinical documentation AI reaching inflection point. Major health systems deploying at scale. Healthcare AI barriers are enormous: clinical accuracy, HIPAA, Epic integration. Companies with all three are 7 years ahead of new entrants. Clinical background is genuinely valued here, making it one of the few AI verticals where non engineers can break in at high levels." },
  { sector: "Voice AI", status: "Hot", text: "ElevenLabs at $11B and PolyAI at $750M signal voice is the next major AI interface. ElevenLabs crossed $330M ARR with 250 employees. PolyAI has 2000+ live deployments. Enterprise voice agents are replacing call centers. Speech ML, NLU, real time systems experience is in highest demand." },
  { sector: "AI Infrastructure", status: "Hot", text: "Four of thirteen rounds this week are pure AI infrastructure plays. Ricursive (chip design), Modal (inference), Fundamental (tabular data), Goodfire (interpretability). Consumer AI is slowing while infrastructure bets are accelerating." },
  { sector: "AI Interpretability", status: "Emerging", text: "Goodfire's $150M Series B at $1.25B valuation signals interpretability is graduating from research to enterprise. As AI regulation tightens, companies need to understand what their models are doing. DeepMind and OpenAI alumni are leading this space." },
  { sector: "Human Simulation", status: "New", text: "Simile's $100M raise from Index, with Fei Fei Li and Andrej Karpathy as angels, creates a new category. AI that predicts human behavior with 85% accuracy could replace market research, focus groups, and polling." },
  { sector: "Vertical SaaS", status: "Steady", text: "Hauler Hero quietly doubled everything since seed. Legacy industries are being converted to modern SaaS for the first time. Low competition, high switching costs, sticky revenue." },
];

const compBenchmarks = [
  { role: "ML / AI Researcher", stage: "Seed", base: "$200K-$280K", equity: "0.5%-1.5%", notes: "Ricursive, Fundamental territory" },
  { role: "ML / AI Researcher", stage: "Series A", base: "$220K-$320K", equity: "0.1%-0.5%", notes: "Still meaningful upside at $4B valuation" },
  { role: "Senior SWE", stage: "Seed", base: "$160K-$220K", equity: "0.2%-0.8%", notes: "Entire, early Modal territory" },
  { role: "Senior SWE", stage: "Series A/B", base: "$170K-$240K", equity: "0.05%-0.2%", notes: "Standard at Vega, Hauler Hero range" },
  { role: "Enterprise AE", stage: "Series A", base: "$120K-$160K", equity: "0.05%-0.15%", notes: "OTE typically 2x base" },
  { role: "Founding AE", stage: "Seed", base: "$100K-$140K", equity: "0.1%-0.4%", notes: "Monaco, early Hauler Hero territory" },
  { role: "Product Manager", stage: "Series A", base: "$160K-$210K", equity: "0.05%-0.2%", notes: "Runway, Fundamental range" },
  { role: "GPU / Infra Engineer", stage: "Series A/B", base: "$200K-$280K", equity: "0.05%-0.25%", notes: "Modal Labs, highest demand right now" },
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
              style={{ backgroundColor: i < score ? "#22c55e" : "#e5e5e5" }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-green-600">
          {score >= 7 ? "Very High" : score >= 5 ? "High" : "Medium"}
        </span>
      </div>
      <p className="text-xs text-neutral-500">{reason}</p>
    </div>
  );
}

// Blurred content placeholder component
function BlurredContent({ children, message, ctaText, ctaHref }: { children: React.ReactNode; message: string; ctaText: string; ctaHref: string }) {
  return (
    <div className="relative">
      <div className="select-none pointer-events-none" style={{ filter: "blur(8px)" }} aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl">
        <p className="text-neutral-600 text-center mb-3 px-4">{message}</p>
        <Link
          href={ctaHref}
          className="inline-block bg-neutral-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

// Placeholder text for blurred sections (can't be revealed via inspect element)
const PLACEHOLDER_TEXT = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";

function StartupCard({ startup, index, plan }: { startup: Startup; index: number; plan: Plan }) {
  const canSeeOutreach = plan === "edge" || plan === "concierge";
  const canSeeContent = plan !== "free";

  // For free users, show blurred card - hide real content completely
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
          {/* Header - only show index, blur everything else */}
          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <div>
                <p className="text-xs text-neutral-400 mb-1">{String(index + 1).padStart(2, "0")} of 12</p>
                <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">Startup Name Here</h2>
                <p className="text-sm text-neutral-500">domain.com · San Francisco · AI Category</p>
              </div>
              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center overflow-hidden">
                <span className="text-lg font-serif text-rose-600">S</span>
              </div>
            </div>

            {/* Funding */}
            <div className="flex flex-wrap items-center gap-3 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                $XXM Series A
              </span>
              <span className="text-sm text-neutral-500">$XB valuation</span>
            </div>

            {/* Details grid */}
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

            {/* What they're building */}
            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they're building</p>
              <p className="text-neutral-600 leading-relaxed">This company is building cutting edge technology in the AI space that has the potential to reshape how enterprises operate. They have raised significant funding from top tier investors including Sequoia, a]16z, and Founders Fund. The founding team includes ex-Google, ex-Meta, and ex-OpenAI engineers who previously built core infrastructure at scale. Their product addresses a $50B+ market opportunity and they're scaling their team rapidly to capture early market share before competitors catch up.</p>
            </div>

            {/* Why it matters */}
            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Why this matters</p>
              <p className="text-neutral-600 leading-relaxed">The market opportunity here is substantial and timing is perfect. Regulatory tailwinds are accelerating adoption while incumbents are too slow to adapt. This team has strong backgrounds from top companies and their technical approach is differentiated by a proprietary architecture that delivers 10x performance improvements. Early customers include Fortune 500 companies and they've achieved product market fit faster than comparable companies at this stage.</p>
            </div>

            {/* Roles */}
            <div className="mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Likely roles opening</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Senior Engineer</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Product Manager</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">ML Engineer</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Infrastructure</span>
                <span className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">Enterprise AE</span>
              </div>
              <p className="text-sm text-neutral-500 mt-3">Competition is relatively low right now. They've pulled from DeepMind, Anthropic, and top YC companies. Window for early employees closes soon.</p>
            </div>

            {/* Founder outreach */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">AB</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Founder Name</p>
                    <p className="text-xs text-neutral-500">CEO, ex Google DeepMind, Stanford PhD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">CD</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Cofounder Name</p>
                    <p className="text-xs text-neutral-500">CTO, ex Meta AI Research</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">This founder responds best to technical depth. Reference their recent paper on distributed systems or their talk at NeurIPS. They value implementation experience over credentials. Show your GitHub and lead with specific architectural questions about their approach.</p>
              <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don't lead with your resume. They get hundreds of those. Lead with a specific technical insight about their space that shows you've done real research.</p>
            </div>

            {/* Signal */}
            <div className="flex items-start gap-3 mb-6 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <img src={cdn("/logo.webp")} alt="" className="w-4 h-4 mt-0.5" />
              <p className="text-sm text-neutral-600">First hires came directly from the founders' previous teams. The non-research route in: reach out to early employees on LinkedIn, engage with their posts, demonstrate implementation level understanding. They turned down acquisition offers to build something they fully own.</p>
            </div>

            {/* Overlay */}
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
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-neutral-400 mb-1">{String(index + 1).padStart(2, "0")} of 12</p>
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

        {/* Funding */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
            {startup.amount} {startup.round}
          </span>
          <span className="text-sm text-neutral-500">{startup.detail}</span>
        </div>

        {/* Details grid */}
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

        {/* Video */}
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

        {/* What they're building */}
        <div className="mb-6">
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">What they're building</p>
          <p className="text-neutral-600 leading-relaxed">{startup.whatBuilding}</p>
        </div>

        {/* Why it matters */}
        <div className="mb-6">
          <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-2">Why this matters</p>
          <p className="text-neutral-600 leading-relaxed">{startup.whyMatters}</p>
        </div>

        {/* Roles */}
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

        {/* Founder outreach - only for edge/concierge */}
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
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">{startup.founder.hook}</p>
            <p className="text-sm text-neutral-500"><span className="font-medium">Avoid:</span> {startup.founder.avoid}</p>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="bg-neutral-50 rounded-xl p-4 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
              <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">XX</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Firstname Lastname</p>
                    <p className="text-xs text-neutral-500">CEO, ex Google DeepMind, MIT PhD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                    <span className="text-neutral-900 font-semibold text-sm">YY</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Cofounder Name</p>
                    <p className="text-xs text-neutral-500">CTO, ex Anthropic, Stanford CS</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">This founder has a unique background in machine learning and previously led a core infrastructure team at a major AI lab. Best approach is to reference their recent NeurIPS paper or their talk at the AI conference last month. They respond well to technical depth and specific questions about their architecture. For ML/RL researchers: reference the reward signal architecture. For infra engineers: lead with distributed RL training experience, GPU orchestration. Show your GitHub prominently.</p>
              <p className="text-sm text-neutral-500 mb-3"><span className="font-medium">Avoid:</span> Generic messages about loving their product. Don't lead with credentials alone. Lead with a specific technical observation that shows you understand their problem space deeply.</p>
              <p className="text-sm text-neutral-600">The quieter door in: reach out to early employees on LinkedIn first. Engage with their technical posts. The CTO is the hiring lens for engineering roles. They've been on podcasts about their technical approach which is the most detailed account of their thinking.</p>
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

        {/* Signal - only for edge/concierge */}
        {startup.signal && canSeeOutreach && (
          <div className="flex items-start gap-3 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4 mt-0.5" />
            <p className="text-sm text-neutral-600">{startup.signal}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
          {canSeeOutreach ? (
            <a
              href={startup.founder.linkedin || `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(startup.founder.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-500 hover:to-rose-600 transition-colors"
            >
              {startup.founder.linkedin ? "LinkedIn" : "Find on LinkedIn"}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-neutral-200 text-neutral-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
              LinkedIn (Edge only)
            </span>
          )}
          {startup.careersUrl !== "" && (
            <a
              href={startup.careersUrl || `https://${startup.website}/careers`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline underline-offset-2 decoration-1 hover:text-neutral-600 transition-colors text-sm"
            >
              Careers
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DropPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 md:p-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={cdn("/logo.webp")} alt="" className="w-8 h-8" />
              <span className="font-serif text-lg text-neutral-900">The Anti Job Board</span>
            </div>
            <div className="flex items-center gap-3">
              {plan !== "free" && (
                <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full capitalize">{plan}</span>
              )}
              <p className="text-xs text-neutral-400">Feb 18, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-2">
            12 startups that just raised
          </h1>
          <p className="text-neutral-500">$2.1B+ total this week</p>
        </div>

        {/* Stats */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-neutral-200 grid grid-cols-3 divide-x divide-neutral-200 mb-8">
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">12</p>
            <p className="text-xs text-neutral-400">Startups</p>
          </div>
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">$2.1B+</p>
            <p className="text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">5</p>
            <p className="text-xs text-neutral-400">Unicorn rounds</p>
          </div>
        </div>

        {/* This week's signal */}
        <div className="bg-neutral-900 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
Voice AI explodes: ElevenLabs $11B, PolyAI $750M. AI infrastructure dominates with Ricursive at $4B valuation. Five unicorn rounds total. Human simulation emerges as a category with Simile. Research and ML infrastructure backgrounds are in highest demand.
          </p>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest">This week's companies</p>
        </div>

        {/* Startups */}
        <div className="space-y-6 mb-12">
          {startups.map((startup, index) => (
            <StartupCard key={startup.name} startup={startup} index={index} plan={plan} />
          ))}
        </div>

        {/* Sector trends */}
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
                    <p className="font-medium text-neutral-900">Voice AI & Conversational</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Two unicorn rounds this week alone. Enterprise adoption accelerating as accuracy crosses human parity thresholds. Call center disruption entering mainstream with 40% cost reduction claims validated by early adopters. Expect aggressive hiring in voice engineering and ML ops roles.</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Healthcare AI</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Clinical documentation AI reaching inflection point. Major health systems deploying at scale. Regulatory tailwinds with FDA clearing more AI diagnostic tools than ever. The talent gap is real: clinical ML engineers command premium compensation.</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Developer Infrastructure</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">Heating</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">AI coding tools driving demand for new infrastructure paradigms. Context and versioning becoming critical. Companies rebuilding their entire dev stack around AI-first workflows. Infrastructure engineers with AI experience are the bottleneck.</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Cybersecurity</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">Heating</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">AI-native security emerging as a category. Traditional SIEM being disrupted by companies bringing analysis to data rather than centralizing. Detection engineers and threat researchers in high demand.</p>
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Robotics & Embodied AI</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Emerging</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">World models and simulation becoming core to robotics development. Gaming and media companies pivoting research to physical AI. Cross-functional roles combining CV, RL, and mechanical engineering.</p>
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

        {/* Comp benchmarks */}
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">ML / AI Researcher</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$200K-$280K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.5%-1.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">Ricursive, Fundamental territory</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">ML / AI Researcher</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$220K-$320K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.1%-0.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">Still meaningful upside at $4B valuation</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Senior SWE</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$160K-$220K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.8%</td>
                      <td className="py-3 text-neutral-500 text-xs">Entire, early Modal territory</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Senior SWE</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A/B</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$170K-$240K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.05%-0.2%</td>
                      <td className="py-3 text-neutral-500 text-xs">Standard at Vega, Hauler Hero range</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Enterprise AE</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$120K-$160K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.05%-0.15%</td>
                      <td className="py-3 text-neutral-500 text-xs">OTE typically 2x base</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Founding AE</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$100K-$140K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.1%-0.4%</td>
                      <td className="py-3 text-neutral-500 text-xs">Monaco, early Hauler Hero territory</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Product Manager</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$160K-$210K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.05%-0.2%</td>
                      <td className="py-3 text-neutral-500 text-xs">Runway, Fundamental range</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">GPU / Infra Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A/B</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$200K-$280K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.05%-0.25%</td>
                      <td className="py-3 text-neutral-500 text-xs">Modal Labs, highest demand right now</td>
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

        {/* How we calculate */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">How we score hiring likelihood</h3>
          </div>
          <p className="text-neutral-600">
            We look at funding size, team size, time since raise, accelerator batch timing, LinkedIn job posts, and growth signals. 8/8 means almost certainly hiring. 5/8 means worth a shot.
          </p>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-8 md:p-10 text-center mb-8">
          <img src={cdn("/hero-image.webp")} alt="" className="w-20 h-auto mx-auto mb-4 rounded-xl" />
          <p className="text-sm text-rose-400 mb-2">Next drop in 7 days</p>
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

        {/* Footer */}
        <div className="text-center bg-white/95 backdrop-blur rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <span className="font-medium text-neutral-900">The Anti Job Board</span>
          </div>
          <p className="text-sm text-neutral-500">
            theantijobboard.com
          </p>
        </div>
      </div>
    </main>
  );
}
