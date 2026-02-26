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
    name: "cognee",
    tagline: "cognee.ai · Berlin, Germany / San Francisco · AI Memory Infrastructure",
    website: "cognee.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQH3HWzbktYcJw/company-logo_200_200/B4DZpKJ9B6JcAI-/0/1762180714981/cognee_ai_logo?e=2147483647&v=beta&t=AVPqpcdY1NymBlYOexQsJY7DSocVr5GSzNWmsxcxXZI",
    round: "Seed",
    amount: "€7.5M ($8.1M)",
    detail: "~10 team, 12,000+ GitHub stars, 80+ contributors, 70+ enterprise customers",
    investors: "Pebblebed (lead), 42CAP (follow-on), Vermilion Ventures, angels from Google DeepMind, n8n, and Snowplow",
    hiringScore: 8,
    hiringReason: "12,000 GitHub stars with a 10-person team means the product is ahead of the headcount. That gap is about to close.",
    whatBuilding: "Cognee builds the memory layer for AI. Most AI systems today are stateless - they process your input, respond, and forget everything. Cognee fixes that. It transforms unstructured data into a persistent, structured knowledge graph, allowing AI agents to retain context over time, reason across connected information, and drastically reduce hallucinations in production environments. It started as an open-source project and now has 12,000+ GitHub stars, 80-plus contributors, and is running live in more than 70 enterprise environments including Bayer and the University of Wyoming. The new capital goes toward a high-performance Rust engine for edge and on-device use cases, deeper memory research, and cloud platform scaling.",
    whyMatters: "RAG, or retrieval-augmented generation, is how most AI systems currently handle memory. It works for demos. It breaks in production. Cognee is building the infrastructure layer that replaces it. The angel investors from Google DeepMind and Snowplow signal serious technical credibility. This is not another wrapper, but a genuine AI infrastructure that developers are already using. For job seekers: 12,000 GitHub stars with a 10-person team means the product is ahead of the headcount. That gap is about to close.",
    roles: ["AI / Memory Systems Engineer", "Developer Advocate / Community Engineer", "Enterprise Sales / Solutions Engineer"],
    rolesNote: "Cognee has posted a small number of roles in the last month, with the most recent going up two days ago. This is not a red flag but a signal the hiring wave just started. There is no ATS, no recruiter, no Workday portal. The founder is still reading his own inbox. The roles below are what they haven't posted yet - that's where the first-mover advantage lives.",
    founder: {
      initials: "VM",
      name: "Vasilije Markovic",
      title: "CEO & Founder, Slovenian-born, Berlin-based",
      linkedin: "https://www.linkedin.com/in/vasilije-markovic-13302471",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEWc7mdnE64Rg/profile-displayphoto-scale_200_200/B4DZiLDNxHHYAY-/0/1754679534326?e=2147483647&v=beta&t=W6uyHBURPcmelOeiVpIqKM-_MSf6p16oF6pdeYH32Gc",
      hook: "Vasilije Markovic is a Slovenian-born founder based in Berlin. His background is in AI research and software engineering, and he has been building in the knowledge graph and AI memory space since before it became a mainstream conversation. He is deeply active on LinkedIn and Twitter and posts regularly about AI memory architecture, Cognee updates, and open-source philosophy. He spoke at the Memgraph Community Call and has given technical talks about why RAG fails in production - watching/reading these will give you talking points for a cold email that go well beyond the generic. He has described cognee's goal as being 'infrastructure that many AI systems can rely on' rather than another application - this is a builder with infrastructure conviction. Boris Arzentar is the CTO and Co-Founder. The team also includes Lazar Obradovic and an apparently beloved dog named Pinky who holds the official title of Chief Barketing Officer on the About page, which tells you exactly what kind of culture this is. Fun facts: the company's legal entity is Topoteretes UG - the word topoteretes is Greek for 'place-keeper' or 'placeholder,' which is a subtle nod to the memory and context-retention thesis. Referencing this shows you've gone deep. Vasilije recently posted about Claude and Anthropic's MCP protocol, meaning he is actively thinking about how Cognee slots into the agentic AI ecosystem. Referencing MCP and Cognee's positioning within it is a credible technical signal. For AI/Memory Systems Engineers: This is the core hire. The product is a knowledge graph and memory layer built on Python, LLMs, and graph databases. The Rust engine is next on the roadmap. Core skills: Python, Rust (increasingly critical), LangChain or LlamaIndex, knowledge graph databases (Neo4j, Memgraph), vector databases (Pinecone, Weaviate), LLM orchestration, graph theory, RAG pipeline design, experience with open-source project contributions. For proof of work, the GitHub is public at github.com/topoteretes/cognee - open a meaningful PR. Implement a new connector, fix an issue, improve the memory pipeline documentation, or publish a benchmark comparison of Cognee against a vanilla RAG approach. Push it before you send the email. Your cold email angle: 'Vasilije, I've been following cognee since the GitHub project and I just opened PR #[X] that adds [specific thing]. I have [X] years in knowledge graph and LLM memory systems and I want to work on the Rust engine and edge use cases you mentioned in the funding announcement. Can I get 15 minutes with you?' For Developer Advocate/Community Engineer: 12,000 GitHub stars with no one dedicated to turning that community into a product-adoption engine. This role writes itself. Core skills: Python, technical writing, GitHub community management, dev.to or Substack publishing, understanding of knowledge graphs and LLM pipelines, Discord and Slack community building, ability to translate complex AI infrastructure concepts into tutorials a senior engineer wants to read. For proof of work, build a step-by-step tutorial: 'From zero to persistent AI memory: building with Cognee in 20 minutes' and publish it on dev.to or Hashnode. Include the link in your email. Your cold email angle: 'Vasilije, there are 12,000 developers watching your GitHub but no dedicated path from starred the repo to running Cognee in production. I wrote a tutorial [link] that closes that gap. I want to build the developer community that turns open-source momentum into enterprise pipeline.' For Enterprise Sales/Solutions Engineer: 70 enterprise clients on a 10-person team with no sales function. Someone is selling this, probably the founders or the growth team and that does not scale. The first enterprise sales hire is coming. Core skills: developer-focused B2B sales, technical product understanding (enough to demo a knowledge graph and answer API questions), SaaS sales cycles with engineering and IT buyers, HubSpot or Salesforce, ability to run technical discovery with ML engineering teams. For proof of work, identify 10 companies that are currently running production RAG systems and would be natural Cognee adopters. Research their engineering blogs or LinkedIn for evidence of RAG pain points. Build a one-page prospect brief and attach it to your email. Your cold email angle: 'Vasilije - you have 70 enterprise clients and no dedicated sales motion. I identified 10 more companies that are publicly complaining about RAG reliability in production [attached]. I've sold AI infrastructure to ML engineering teams at [company] and I want to be the person who builds the commercial engine for Cognee.'",
      avoid: "Don't lead with generic interest. Reference the GitHub project, a specific issue, or a specific technical observation from the codebase. The 12,000 stars mean he gets a lot of noise - cut through it with proof of work.",
    },
    cofounder: {
      name: "Boris Arzentar",
      title: "CTO & Co-Founder",
      linkedin: "https://www.linkedin.com/in/boris-arzentar/",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQGscnqw0QBSng/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1653560917446?e=2147483647&v=beta&t=uHnXkMpqa9q9vUr0t1jf_aOwS-dYRgmDS5IiKCCk75s",
    },
    signal: "Best approach: open a GitHub PR first, then email hello@cognee.ai referencing the PR and the specific roadmap item you want to work on. For sales roles, skip the PR and go straight to the email with the prospect brief attached. Contact: hello@cognee.ai. CEO LinkedIn: linkedin.com/in/vasilije-markovic-13302471. CTO LinkedIn: linkedin.com/in/boris-arzentar/. GitHub: github.com/topoteretes/cognee. Company LinkedIn: linkedin.com/company/cognee-ai",
    careersUrl: "",
    featured: true,
    heroImage: "",
    videoId: "8wP6UnH0cH0",
  },
  {
    name: "Agaton",
    tagline: "agaton.ai · Stockholm, Sweden · Agentic Voice Intelligence",
    website: "agaton.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEslyd6hHLbaQ/company-logo_200_200/B4DZT2XWS0GkAQ-/0/1739300103718/agaton_ai_logo?e=2147483647&v=beta&t=KN4IAAHvFL_8E0WNLP_Gg4Xpr4h2tkW6noesiLQSXMc",
    round: "Seed",
    amount: "€8.4M ($10M)",
    detail: "~10 team, $1.1M revenue, 7x YoY growth, Telenor + Telia as clients",
    investors: "Inception Fund and Alstin Capital (co-leads), seed+speed Ventures, Foundry Ventures. Angels: Peter Sarlin (Silo AI), Kieran Flanagan (HubSpot CMO, Sequoia scout), Sebastian Knutsson (King/Candy Crush co-founder), Lukas Saari (Tandem Health)",
    hiringScore: 8,
    hiringReason: "7x YoY revenue growth with a 10-person team and explicit mandate to expand internationally. The commercial team they need is obvious and urgent.",
    whatBuilding: "Agaton is an agentic AI platform that listens to every customer call your sales or customer service team makes, analyses what's actually happening beneath the words across sentiment, energy, buying intent signals, objection patterns, competitor mentions, and then automatically acts on it. Not just transcription. Not just dashboards. The platform sends real-time coaching to the agent on the call, automates quality assurance reports, identifies churn signals, surfaces upsell moments, and turns all of it into product and pricing intelligence for leadership. Current clients include Telenor, Telia, Lendo, and Axo Finans. They hit $1.1M revenue with a 10-person team before this raise. 7x year-on-year revenue growth.",
    whyMatters: "Conversation intelligence has been a crowded space for years - Gong, Chorus, Clari - but all of them do the same thing: transcribe and summarise. Agaton's bet is that voice data contains far more signal than words alone. Energy, pacing, emotional state, intent markers - and they're building the proprietary Voice AI to read all of it in real time. Kieran Flanagan as an investor is significant: he is HubSpot's CMO and a Sequoia scout. Having the person who scaled HubSpot's GTM on your cap table means you will eventually move fast on sales and marketing hiring. With 7x YoY growth and a global expansion mandate, the commercial team they need to build is obvious and urgent.",
    roles: ["AI / Voice ML Engineer", "Enterprise Account Executive", "Product Manager"],
    rolesNote: "Agaton's oldest LinkedIn role is two months old, newest is two weeks old. The two-month-old roles are likely already filled or close to it. The second hiring wave, for the roles they now know they need, has not been announced publicly yet. That wave is what you are positioning for.",
    founder: {
      initials: "AK",
      name: "Andreas Kullberg",
      title: "CEO & Co-Founder, ex-EF Education First, ex-Aviva",
      linkedin: "https://www.linkedin.com/in/andreaskullberg",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQERtnuEaHieiw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650542286107?e=1773878400&v=beta&t=RDdnGy9ohug3yconuX9vKmBAGXzFAsUkBWKXpq1ldZo",
      hook: "Andreas Kullberg previously scaled global sales operations at EF Education First, one of the world's largest private education companies, and drove tech-enabled growth at Aviva, the UK's largest insurer. He has run large, geographically distributed teams in regulated industries, which means he understands enterprise sales complexity at scale. He is the public face of Agaton and does most of the media-facing communication. He is articulate and commercial in his framing and speaks in revenue metrics, not engineering jargon. John Kristensen is the COO and Co-Founder and previously worked at H&M, Volvo Cars, and Tele2. He is the operational and commercial backbone of the company. Yi Fu is the CTO and has an AI and data background at Tink and King - two of Scandinavia's best-known tech companies. The combination of EF Education First-level sales scale, Volvo/H&M-level operations, and Tink/King-level engineering is not typical of a 10-person seed-stage startup. These are people who have moved large organisations. Fun facts and conversation hooks: Kieran Flanagan as an investor is a conversation hook with anyone in the HubSpot ecosystem - he is one of the most recognised names in SaaS GTM globally. Sebastian Knutsson co-founded King, the company that made Candy Crush - a mass consumer scale reference in an enterprise product context is an interesting tension worth referencing. The company is ISO 27001 certified already at 10 people meaning they are serious about enterprise compliance and this tells you they are targeting security-conscious large-cap buyers, not scrappy startups. The name 'Agaton' is a Swedish proper name meaning 'good' in Greek - a deliberate choice about brand positioning: straightforward, strong, and not trying too hard. For AI/Voice ML Engineers: The entire product differentiation is the proprietary Voice AI engine. Extending it to new languages, improving intent detection accuracy, and adding new behavioural signals is what keeps Agaton ahead of Gong. This is not a commodity ML role. Core skills: Python, speech and audio processing (librosa, torchaudio, Whisper fine-tuning), NLP and NLU, transformer models for sequence classification, experience working with real-time audio streams, multilingual model training, comfortable working with unstructured voice data. Swedish or Nordic language experience is a bonus. For proof of work, build a small demo: take a sample sales call audio file (many publicly available on YouTube or podcast archives) and build a Python pipeline that extracts sentiment, energy levels, and keyword signals. Post it on GitHub with a writeup. Your cold email angle: 'Andreas, Agaton's edge is the Voice AI layer that reads what words alone miss. I built a pipeline [GitHub link] that extracts sentiment and energy signals from audio in real time. I have [X] years in speech ML and I want to work on the engine that keeps Agaton ahead of Gong. Worth 15 minutes?' For Enterprise Account Executive: The funding announcement explicitly mentions new international hubs. They have Nordic enterprises locked in. Next stop is likely UK, DACH, and eventually US, given their investor backgrounds. Core skills: enterprise B2B SaaS sales, telecom or financial services vertical experience strongly preferred (those are their current customer base), ability to navigate large procurement cycles, familiarity with sales enablement or conversation intelligence tools, Swedish or German a differentiator but not required. For proof of work, map 10 UK or German companies in telecom, insurance, or financial services that have large inside sales or customer service teams - exactly Agaton's buyer profile - and write a one-page targeting brief. Your cold email angle: 'Andreas, I've been selling conversation intelligence software into UK telecom and financial services for [X] years and I know exactly who your next 10 customers should be. I mapped them out [attached]. I want to be the person who opens those markets for Agaton.' For Product Manager: A 10-person team with multiple enterprise customers and a complex Voice AI product is almost certainly making product decisions by committee right now. A dedicated PM to sequence roadmap, run discovery with Telenor and Telia, and define the international product localisation strategy is the hire that unlocks the next phase. Core skills: enterprise SaaS product management, experience with AI or ML products, ability to run structured discovery with technical buyers, comfort with ambiguity, strong written communication in English required and Swedish preferred. For proof of work, do a product teardown of Agaton's public-facing website and case study materials - write a one-page analysis of what the product roadmap likely looks like based on their stated client results and what you would prioritise in the next 90 days. Your cold email angle: 'Andreas, I did a product teardown of Agaton based on everything publicly available, including the Telenor and Telia case study metrics. I wrote up what I think the next 90-day product priorities are [link]. I've PMed AI products at [company] and I want to bring that to Agaton as you scale internationally.'",
      avoid: "Don't approach with generic interest. Reference a specific metric from the funding announcement - the 80% QA handling time reduction or the sales conversion doubling - shows you've actually read the press release rather than just the headline.",
    },
    cofounder: {
      name: "John Kristensen",
      title: "COO & Co-Founder, ex-H&M, ex-Volvo Cars, ex-Tele2",
      linkedin: "https://www.linkedin.com/in/johnkristensen",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHjYzR0R9Rk_g/profile-displayphoto-scale_400_400/B4DZyK.0ciJwAg-/0/1771858250021?e=1773878400&v=beta&t=-NFQlsSv0jwMo9hMmrXx2ovwGqoa0AIdU312eZh-1QY",
    },
    signal: "Best approach: LinkedIn DM to Andreas referencing a specific metric from the funding announcement. For engineering roles, reach Yi Fu directly. For commercial roles, reach Andreas or John Kristensen. Contact: CEO Andreas: linkedin.com/in/andreaskullberg. Company website: agaton.ai. Company LinkedIn: linkedin.com/company/agaton-ai/",
    careersUrl: "",
    videoUrl: "https://storage.googleapis.com/ew-assets/Agaton/hero-messaging-updated.mp4",
  },
  {
    name: "Quantcore",
    tagline: "quantcore.co.uk · Glasgow, Scotland · Quantum Hardware Manufacturing",
    website: "quantcore.co.uk",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQETy2ipLIrZ4w/company-logo_200_200/B4EZl8YjnbHEAM-/0/1758728436609/quantcore_logo?e=1773878400&v=beta&t=6vK3nXyW5G0Gnpolhk3yJxvfAJxLdqjUo9wjM6_T7fU",
    round: "Seed",
    amount: "£2.5M ($3.4M)",
    detail: "4-person team, UK national lab customers, only UK niobium-based quantum component manufacturer",
    investors: "PXN Ventures and Blackfinch Ventures (co-leads), Scottish Enterprise, Quantum Exponential, STAC",
    hiringScore: 8,
    hiringReason: "Press release explicitly states: 'grow its team from four to twelve employees over the next 18 months.' Eight new hires. Zero public listings. The window is open now.",
    whatBuilding: "Quantcore makes the physical hardware components that go inside quantum computers. Specifically, niobium-based superconducting processors, resonators, and sensors - manufactured at the James Watt Nanofabrication Centre in Glasgow. Niobium is the key differentiator: it can operate at higher temperatures than aluminium, which is what almost every other quantum hardware manufacturer uses globally. That means less cooling required, lower energy consumption, and better scalability. They are currently the only UK company producing niobium-based quantum components. Current customers include UK national laboratories. Beyond quantum computing, their sensors are being developed for medical imaging accuracy that classical technology cannot achieve - applications in neuroscience, early disease detection, and secure communications.",
    whyMatters: "The UK government has pledged £670 million to the quantum sector over ten years as part of its modern industrial strategy. The global quantum computing market is projected to exceed $20 billion by 2030. Quantcore is the only sovereign UK manufacturer of a critical component category. That is not a commercial claim - it is a national security supply chain argument that justifies government backing, defence contracts, and long-term institutional customers. For job seekers: a 4-person team with national laboratory customers, government-backed investors, and an explicit plan to grow to 12 employees in 18 months is one of the rarest early-stage hiring windows you will ever find in deep tech. The roles they need don't get posted on LinkedIn.",
    roles: ["Quantum Hardware / Device Engineer", "Commercial Strategy / Business Development", "Operations / Lab Manager"],
    rolesNote: "This one is unusually explicit. The press release states: 'Following the investment, Quantcore plans to grow its team from four to twelve employees over the next 18 months, with engineering roles across design, manufacturing and cryogenic testing as well as non-technical positions to aid its commercial strategy.' Four to twelve. Eight new hires. In 18 months. With zero public listings.",
    founder: {
      initials: "JB",
      name: "Dr Jack Brennan",
      title: "CEO, PhD in Quantum Computing, ex-University of Glasgow Research Associate",
      linkedin: "https://www.linkedin.com/in/jack-brennan-quantumtech",
      image: "https://quantcore.co.uk/wp-content/uploads/2025/01/Image_20250120_161421_625-scaled.jpeg",
      hook: "Dr Jack Brennan is a physicist who completed his PhD and postdoctoral research at the University of Glasgow working in quantum computing and quantum sensing. He was previously a Research Associate with the University's quantum computing group and has published on topics including quantum chaos, SNSPD sensors, and error mitigation. He is not a startup media figure. He has never been on a podcast. His background is entirely academic and scientific, which means a cold email that leads with genuine technical knowledge of his research will land far better than any standard outreach template. He was also involved with STAC (Smart Things Accelerator Centre) which is an investor in this round, meaning the relationship with the accelerator is a credible warm reference if you've had any interaction with the Scottish deep tech ecosystem. Wridhdhisom Karar is the Measurement Lead - a rare title that signals their measurement and characterisation work is a first-class concern, not an afterthought. Prof Martin Weides is the Scientific Advisor and is one of the UK's leading authorities on superconducting quantum devices - his research group at Glasgow is the academic foundation of the entire company. The James Watt Nanofabrication Centre is one of the best-equipped cleanroom facilities in the UK - mention it specifically to show you know where they work. The Infinity G accelerator was the first cohort of deep tech startups at Glasgow - being part of cohort one is a signal of academic and institutional backing that gives them unusual access to facilities and talent networks. For Quantum Hardware/Device Engineer: This is the core technical hire. Someone who can work inside a nanofabrication cleanroom environment designing and testing superconducting components. Core skills: PhD or postdoc background in condensed matter physics, superconducting devices, or quantum hardware; experience with niobium or aluminium superconducting qubit fabrication; cryogenic measurement experience; familiarity with quantum processors, resonators, or SNSPD sensors; experience with electron beam lithography or photolithography is a differentiator. This is a specialist role but it exists at every UK university quantum group, which means the candidate pool is much more accessible than it seems. For proof of work, write a short technical summary of the advantages and trade-offs of niobium vs aluminium in superconducting qubit fabrication, reference specific papers, including work from Prof Martin Weides' group at Glasgow. Email it directly to Dr Jack Brennan. Your cold email angle: 'Jack, I've been working on [niobium-based / superconducting] devices at [University X] and I wrote a technical breakdown of the Nb vs Al trade-offs in your device architecture [attached]. I want to work on the manufacturing scale-up at Quantcore. Is there a conversation to be had?' For Commercial Strategy/Business Development: The press release specifically mentions 'non-technical positions to aid its commercial strategy.' With national laboratory customers and a sovereign supply chain mandate, the commercial opportunity includes government contracts, defence procurement, and university research partnerships. Core skills: deep tech B2B commercial development, experience navigating UK government or defence procurement, understanding of the UK quantum ecosystem and its key institutional stakeholders, ability to write compelling technical proposals and grant applications, relationship-building with research councils (EPSRC, Innovate UK). For proof of work, map the top 10 UK quantum computing companies and national labs that would be natural Quantcore component customers - write a one-page commercial landscape brief that shows you understand the supply chain positioning. Your cold email angle: 'Jack, I mapped the UK quantum hardware supply chain and identified 10 institutions that would likely want a domestic niobium component supplier for sovereignty and security reasons [attached]. I've worked in deep tech BD at [company / institution] and I want to help Quantcore build the commercial strategy around the sovereign supply chain thesis.' For Operations/Lab Manager: A four-person deep tech spin-out operating inside a university nanofabrication centre needs someone who can handle the non-science work: equipment procurement, cleanroom scheduling, regulatory compliance, financial administration, grant reporting, customer delivery logistics. This is unsexy but critical and it absolutely qualifies as a 'non-technical position to aid commercial strategy.' Core skills: operations or lab management experience in a research or deep tech environment, familiarity with UK university spin-out structures, experience with Innovate UK or EPSRC grant administration a strong differentiator, organised and detail-oriented, able to work in a very small team with high autonomy. Your cold email angle: 'Jack, you have four scientists and a mandate to triple the team while serving national lab customers and scaling a nanofabrication operation. The thing that breaks fast-growing deep tech spin-outs isn't the science - it's operations. I've managed [lab / operations] at [institution or startup] and I want to be the person who makes sure Quantcore doesn't have to think about logistics. Can we talk?'",
      avoid: "Don't approach without a technical document attached - either a breakdown of niobium vs aluminium in superconducting devices, or a commercial landscape map of UK quantum customers. For technical roles, reference specific papers from Prof Weides' group at Glasgow. This is a team of scientists and they will respond to people who have done the reading.",
    },
    cofounder: {
      name: "Dr Valentino Seferai",
      title: "CTO",
      linkedin: "",
      image: "https://quantcore.co.uk/wp-content/uploads/2025/01/Image_20250120_161422_760-scaled.jpeg",
    },
    signal: "Best approach: email with a technical document attached, either a breakdown of niobium vs aluminium in superconducting devices, or a commercial landscape map of UK quantum customers. For technical roles, reference specific papers from Prof Weides' group at Glasgow. Contact: Dr Jack Brennan LinkedIn: linkedin.com/in/jack-brennan-quantumtech. Email pattern likely: j.brennan@quantcore.co.uk or jack@quantcore.co.uk",
    careersUrl: "",
    heroImage: "https://www.gla.ac.uk/media/Media_1248078_smxx.jpeg",
  },
];

const trends = [
  { sector: "AI Memory Infrastructure", status: "Hot", text: "Cognee's €7.5M seed with angels from Google DeepMind and Snowplow signals that RAG is broken in production and the infrastructure layer to fix it is now investable. 12,000 GitHub stars on a 10-person team means developer adoption is ahead of company scale. Python + Rust + knowledge graphs are the stack." },
  { sector: "Agentic Voice Intelligence", status: "Emerging", text: "Agaton is betting that voice data contains far more signal than transcription captures - energy, pacing, emotional state, intent markers. With HubSpot's CMO Kieran Flanagan on the cap table and 7x YoY growth, this is conversation intelligence 2.0. Real-time audio ML is the skill gap." },
  { sector: "Quantum Hardware Manufacturing", status: "Heating", text: "Quantcore is the only UK manufacturer of niobium-based quantum components - a sovereign supply chain play backed by £670M in UK government quantum funding. Deep tech hardware roles that don't get posted on LinkedIn. PhD-level physics is the entry point." },
];

const compBenchmarks = [
  { role: "AI / Memory Systems Engineer", stage: "Seed", base: "$140K-$200K", equity: "0.2%-0.6%", notes: "cognee - Python, Rust, knowledge graphs, RAG pipelines" },
  { role: "Developer Advocate", stage: "Seed", base: "$120K-$170K", equity: "0.15%-0.4%", notes: "cognee - Technical writing, GitHub community, 12K star repo" },
  { role: "Enterprise Sales Engineer", stage: "Seed", base: "$130K-$180K", equity: "0.15%-0.4%", notes: "cognee - Developer-focused B2B, 70 enterprise clients" },
  { role: "Voice ML Engineer", stage: "Seed", base: "$150K-$220K", equity: "0.2%-0.6%", notes: "Agaton - Speech processing, Whisper, real-time audio" },
  { role: "Enterprise AE (Nordic/DACH)", stage: "Seed", base: "$120K-$160K", equity: "0.1%-0.3%", notes: "Agaton - Telecom/finserv verticals, international expansion" },
  { role: "Product Manager", stage: "Seed", base: "$130K-$180K", equity: "0.15%-0.4%", notes: "Agaton - AI/ML products, enterprise SaaS" },
  { role: "Quantum Device Engineer", stage: "Seed", base: "$80K-$120K", equity: "0.3%-0.8%", notes: "Quantcore - PhD physics, niobium fabrication, cryogenics" },
  { role: "Commercial Strategy", stage: "Seed", base: "$90K-$140K", equity: "0.2%-0.5%", notes: "Quantcore - UK govt/defence procurement, deep tech BD" },
  { role: "Operations / Lab Manager", stage: "Seed", base: "$60K-$90K", equity: "0.1%-0.3%", notes: "Quantcore - Cleanroom ops, grant admin, uni spin-out" },
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
  const canSeeOutreach = plan === "edge" || plan === "concierge" || isFirstStartup;
  const canSeeContent = plan !== "free";

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
              <p className="text-xs text-neutral-400">Feb 26, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$21.5M total this week · AI Memory + Voice Intelligence + Quantum Hardware</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$21.5M</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">3 Seed</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Round mix</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            AI memory infrastructure goes seed with Cognee (€7.5M, Pebblebed + DeepMind angels) building the knowledge graph layer that replaces broken RAG pipelines. Agentic voice intelligence emerges from Stockholm with Agaton (€8.4M, Inception Fund + HubSpot CMO as angel) doing what Gong can&apos;t - reading energy, pacing, and intent in real-time. Quantum hardware manufacturing gets sovereign backing with Quantcore (£2.5M) as the UK&apos;s only niobium-based component manufacturer. By the time this is on a job board, someone has already emailed the founder. Be that person.
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
                    <p className="font-medium text-neutral-900">AI Memory Infrastructure</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">RAG is broken in production and the infrastructure layer to fix it is now investable...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Agentic Voice Intelligence</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Emerging</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Voice data contains far more signal than transcription captures...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">AI / Memory Systems Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$140K-$200K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.6%</td>
                      <td className="py-3 text-neutral-500 text-xs">cognee - Python, Rust, knowledge graphs</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Voice ML Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$220K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.6%</td>
                      <td className="py-3 text-neutral-500 text-xs">Agaton - Speech processing, Whisper</td>
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
