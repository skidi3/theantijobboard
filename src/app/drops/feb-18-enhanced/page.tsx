"use client";

import { cdn } from "@/lib/cdn";

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
    whatBuilding: "Not a chip company, an AI lab that designs chips. Their founders led Google's AlphaChip project, which cut chip layout from months to 6 hours using reinforcement learning, and shaped 4+ generations of Google TPUs. Ricursive's vision: a recursive loop where AI designs better chips, better chips power better AI, repeat.",
    whyMatters: "$335M with no product and only 4 months of existence is essentially unheard of. It happened because the founders have production scale proof of concept with AlphaChip, chip design is a massive TAM ($200-650M per chip design cycle), and Lightspeed and Sequoia are betting on category definition.",
    roles: ["LLM Infra Engineer", "EDA Algorithm Engineer", "LLM Modeling & Scaling Researcher", "Founding Security Engineer", "Operations"],
    rolesNote: "Competition is very low right now. Might hire remotely especially for tech roles if you're cracked enough, or are in the US. They've pulled from DeepMind, Anthropic, Apple, and Cadence. Window for early numbered employees closes in 60-90 days.",
    founder: {
      initials: "AG",
      name: "Anna Goldie",
      title: "Founder & CEO, ex Google DeepMind",
      hook: "Best path in: warm intro through Stanford CS, Google Brain/DeepMind, or Anthropic alumni. Even a second degree LinkedIn connection who can forward your name beats 50 cold apps. Anna (@annadgoldie) and Azalia are both on X. Engage with their technical posts for a few weeks before asking about roles. When you do reach out, keep it under 150 words, be specific about what you'd work on, reference AlphaChip or the recursive improvement loop, include one concrete proof point. No flattery, no life story.",
      avoid: "\"I'd love to join your amazing team\" energy. They're not looking for resume keywords. They want people genuinely obsessed with AI + chip design who can ship and won't need hand holding.",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/7ee982c5169847c78d18238e4973595a",
    },
    cofounder: {
      name: "Azalia Mirhoseini",
      title: "Founder, ex Google DeepMind",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6e575ab801fa48ae981f27a332a2bc99",
    },
    signal: "10 person team, $4B valuation, hiring is deeply personal here. Anna organized ICLAD 2025 and multiple NeurIPS/ISCA workshops. Showing up at these events and having a real conversation is probably the highest impact thing you can do. Direct applications to ricursive.com/careers actually get read at this stage. Timing is ideal, they just got featured in TechCrunch, flush with Series A cash, actively building out the team.",
    featured: true,
    videoId: "Mb2nioDfpJA",
  },
  {
    name: "Monaco",
    tagline: "monaco.com · San Francisco · AI Sales Platform",
    website: "monaco.com",
    logo: "https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/04fedb3f0ebb400cb7fca2c4b1016d9c",
    videoUrl: "https://cdn.monaco.com/landing/public/pages/home/hero-video.webm",
    round: "Series A",
    amount: "$25M",
    detail: "Founded 2024, Founders Fund led",
    investors: "Founders Fund, Patrick & John Collison, Garry Tan, Neil Mehta",
    hiringScore: 8,
    hiringReason: "40 employees, scaling fast post Series A",
    whatBuilding: "All-in-one AI native sales platform replacing the patchwork of CRM + outbound + prospecting tools. The twist: they embed experienced human salespeople into the AI loop to monitor and guide the AI's work. Targets seed and Series A startups that can't afford a full sales team yet.",
    whyMatters: "Arguably the most stacked founding team in sales tech. Sam was CRO at Brex, then partner at Founders Fund. Brother Brian was MD at Sutter Hill. CTO Malay Desai was VP Eng at Clari. CPO from Apollo/Qualtrics. Peter Thiel's fund led the round. The Collison brothers are angels.",
    roles: ["AI/Agent Engineers", "Full Stack Engineers", "ML Engineers", "Account Executives", "Forward Deployed Sales Executives"],
    founder: {
      initials: "BB",
      name: "Brian Blond",
      title: "Co-founder & Chairman, ex Sutter Hill Ventures MD",
      linkedin: "https://www.linkedin.com/in/brianblond/",
      hook: "Sam (@SamBlond on X) is the public face but Brian runs the board. He's a career sales operator turned VC. If you're an engineer, show you understand why sales tech is broken. If you're in sales, show you get the AI native angle. Lead with specific metrics.",
      avoid: "Don't pitch yourself as someone who wants to work at an 'AI company' generically. Monaco is a sales company that uses AI. Domain expertise matters as much as tech.",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/1b4b1c8a22c14105a2f04e80a25b5a29",
    },
    cofounder: {
      name: "Malay Desai",
      title: "Co-founder & CTO, ex Clari VP Engineering",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6c93b8e265594c7ca0943adbb740344a",
    },
    signal: "Been building since 2024, not a brand new company. Office first in SF with WWII era motivational posters and an office gong. Warm intro paths: Founders Fund network, Brex alumni, Sutter Hill portfolio, YC network, Clari/Qualtrics/Apollo alumni.",
    careersUrl: "",
  },
  {
    name: "Entire",
    tagline: "entire.io · Fully Remote · AI Dev Infrastructure",
    website: "entire.io",
    round: "Seed",
    amount: "$60M",
    detail: "$300M valuation, largest dev tool seed ever",
    investors: "Felicis, Madrona, M12 (Microsoft), Basis Set",
    hiringScore: 8,
    hiringReason: "15 person team doubling to 30, fully remote",
    whatBuilding: "Git observability layer for AI agents. Their open source CLI (Checkpoints) records the reasoning behind AI generated code: the original prompt, the agent's reasoning steps, decisions made, why it chose specific implementations. Stores sessions on a hidden branch (entire/checkpoints/v1) so your main history stays clean. Supports Claude Code and Gemini CLI at launch. 2.6k GitHub stars already.",
    whyMatters: "Thomas literally built the thing Entire is disrupting. GitHub CEO for 4 years, oversaw Copilot's rise to 180M developers. Felicis called this the largest seed ever for dev tools. Microsoft's own VC arm invested even though he left Microsoft. Team is ex GitHub and Atlassian. Angels include Garry Tan, Jerry Yang, Olivier Pomel, Gergely Orosz, Theo Browne, Harry Stebbings.",
    roles: ["Go Engineers (CLI is in Go)", "Distributed Systems Engineers", "Git Internals Engineers", "Developer Experience Engineers", "AI Agent Infrastructure Engineers"],
    founder: {
      initials: "TD",
      name: "Thomas Dohmke",
      title: "CEO, ex GitHub CEO (2021-2025), sold HockeyApp to Microsoft 2015",
      linkedin: "https://www.linkedin.com/in/ashtom/",
      image: "https://entire.io/team/thomas.png",
      hook: "Thomas is on X (@ashtom). He's a developer founder who cares about craft. Best signal: actually use Checkpoints (github.com/entireio/cli), contribute to the repo, file thoughtful issues, or build something on top of it. They're dogfooding their own tools to manage development. Community contribution is the ultimate resume.",
      avoid: "Don't position yourself as an 'AI engineer' who wants to build agents. Entire is explicitly not building agents, they're building infrastructure around agents. They want to scale to 'hundreds of agents' internally, not hundreds of employees.",
    },
    signal: "Fully remote team. 15 people with $60M means each hire matters enormously. Bar is GitHub/Atlassian level dev tools experience. CLI is MIT licensed, so you can see exactly how they build. Warm intro paths: GitHub alumni, Microsoft/M12 network, Felicis portfolio, Atlassian alumni, developer community figures (Orosz, Theo are investors).",
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
    investors: "General Atlantic, Nvidia, Fidelity, SoftBank, Google",
    hiringScore: 7,
    hiringReason: "101-250 employees, mature startup hire",
    whatBuilding: "Generative AI tools for creating images, videos, and simulations. Users generate and edit videos from text prompts. Gen 4.5 ranks #1 on Video Arena leaderboard. They describe themselves as building 'world simulators', AI that understands physics, motion, and causality. Used by Hollywood, Amazon's House of David Season 2 had 350+ AI shots via Runway.",
    whyMatters: "First mover in AI video with real traction: 300K+ customers. Unlike pure research labs, Runway has paying users and enterprise API customers. Founded Oct 2018, all three founders met at NYU's Interactive Telecommunications Program. Chilean born Cristóbal is TIME100 AI list.",
    roles: ["ML Researchers (diffusion, video)", "World Model Researchers", "GPU Infrastructure Engineers", "Enterprise Sales", "Creative Partnerships", "Product Engineers"],
    founder: {
      initials: "CB",
      name: "Cristobal Barrera",
      title: "Co-founder & CEO",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_170,w_170,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/816d1507ebcb459e8276f35efcab0ea3",
      hook: "Cristóbal is on X (@c_valenzuelab). Runway sits at the intersection of art and engineering. If you can show creative taste and technical depth, that's the sweet spot. Show work that combines visual/creative output with ML understanding. He speaks at NeurIPS, SIGGRAPH, and creative industry events.",
      avoid: "Don't approach Runway as purely an ML shop. They care deeply about creative tools and artist empowerment. Treating video generation as 'just another AI problem' misses the mark.",
    },
    cofounder: {
      name: "Anastasis Germanidis",
      title: "Co-founder & CTO",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/skjjl34apuxsdergxhj7",
    },
    signal: "Runway hosts its own AI Film Festival. Warm intro paths: NYU ITP alumni, Google AI alumni, creative agency world, Hollywood/media connections. This is a mature startup hire with stability, equity upside is more moderate than earlier rounds.",
    careersUrl: "https://runwayml.com/careers",
    videoId: "AwKSrJFvdps",
  },
  {
    name: "Vega Security",
    tagline: "vega.io · Tel Aviv + NYC · AI Native Cybersecurity",
    website: "vega.io",
    videoUrl: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe%2F6967b6d377447e8a045b5031_01_mp4.mp4",
    round: "Series B",
    amount: "$120M",
    detail: "$700M valuation, $185M total raised",
    investors: "Accel, Cyberstarts, Redpoint, CRV",
    hiringScore: 8,
    hiringReason: "21 open roles, Fortune 500 contracts, expanding US",
    whatBuilding: "AI native security operations platform that replaces traditional SIEM. Traditional SIEMs require shipping all security data to one place, expensive and slow at modern volumes. Vega detects threats directly where enterprise data resides: cloud services, data lakes, distributed storage. No data migration needed.",
    whyMatters: "SIEM is a massive entrenched market (Splunk, IBM QRadar, Microsoft Sentinel). Vega's federated approach is architecturally different enough to be a genuine platform shift. Already landing multi million dollar contracts with Fortune 500, banking, healthcare, and Instacart despite being only 2 years old. Both founders are IDF Unit 8200 veterans.",
    roles: ["AI Engineer", "Software Engineer (Go/Python/React)", "Security Research Team Lead", "Product Manager", "Regional Sales Managers (US)", "Sales Engineers (US)", "Threat Response Expert"],
    rolesNote: "13 roles in Tel Aviv (on-site), 8 roles remote US (sales/marketing focus). They need 7+ years enterprise sales experience for US roles, 5+ years backend for engineering.",
    founder: {
      initials: "SS",
      name: "Shay Sandler",
      title: "CEO & Co-founder",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacbf5f00da1414b95a2_cbcd0223efbc31b2efe33e49f55b46f3_shay%20sandler.avif",
      linkedin: "https://www.linkedin.com/in/shay-sandler-305508107/",
      hook: "Both founders are ex intelligence, ex Granulate. They value substance over flash. If you can articulate why SIEM is broken in a way that shows you've lived the pain (SOC experience, data pipeline experience), that's powerful.",
      avoid: "Don't approach with generic 'I'm interested in cybersecurity'. Vega is replacing one of the most entrenched enterprise tools. Show you understand the specific pain of SIEM at scale.",
    },
    cofounder: {
      name: "Eli Rozen",
      title: "CTO & Co-founder",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacb39949d0f629a9de0_169b7405ef19c513276671a924cc224e_eli%20rozen.avif",
      linkedin: "https://www.linkedin.com/in/eli-rozen/",
    },
    signal: "Warm intro paths: IDF 8200 alumni, Cyberstarts portfolio (Gili Raanan's network), Accel portfolio, Intel/Granulate alumni. RSA Conference, Black Hat, BSides are where they show up.",
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
    whatBuilding: "Cloud software for garbage/waste management companies. Route planning, CRM, billing, customer portals, fleet visibility. Basically ServiceTitan for waste management. Recently added Hero Vision (camera feeds from trucks for pickup verification), Hero Chat (AI customer support), Hero Route (automated route optimization). 35M+ pickups facilitated.",
    whyMatters: "Waste management is a $90B industry running on software that looks like 'the Oregon Trail'. CEO's words. Two main competitors (Routeware and Wastech) merged in 2024, creating a vacuum. Clients include Verizon, Wells Fargo, McDonald's, UPS, PG&E, US Army, Marriott. This is real product market fit in an unsexy space.",
    roles: ["Full Stack Engineers", "AI/ML Engineers (route optimization, computer vision)", "Account Executives", "Customer Success", "Implementation Specialists"],
    founder: {
      initials: "MH",
      name: "Mark Hoadley",
      title: "CEO, ex ServiceTitan (top sales exec, closed largest deal in company history), Harvard",
      hook: "Mark is very active on LinkedIn. He's a former top sales exec who respects people who understand customers and can ship. He's genuinely passionate about helping waste management workers. Show you understand or care about the industry, not just the tech. hello@haulerhero.com for direct contact.",
      avoid: "Don't position this as a 'stepping stone' to a more glamorous AI company. They want people genuinely excited about an underserved industry.",
    },
    cofounder: {
      name: "Ben Sikma",
      title: "President, ex ESG (Dover), M&A in waste management, Georgetown MBA",
    },
    signal: "Less competitive than unicorns on this list. Series A vertical SaaS in waste management, not a hyped AI lab. If you're good and genuinely interested, you stand out fast. Warm intros: ServiceTitan alumni, I2BF portfolio, K5 Global network, waste industry contacts. WasteExpo is where they show up.",
  },
  {
    name: "Fundamental",
    tagline: "fundamental.tech · San Francisco · Enterprise Data AI",
    website: "fundamental.tech",
    round: "Series A",
    amount: "$255M",
    detail: "$1.4B valuation",
    investors: "Oak HC/FT, Salesforce Ventures, Battery",
    hiringScore: 8,
    hiringReason: "7 figure Fortune 100 contracts at seed stage",
    whatBuilding: "LLMs handle unstructured data (text, images, video) well. They handle structured data (spreadsheets, databases, transaction records) terribly, they truncate rows, lose precision, hallucinate numbers. Fundamental's NEXUS is a Large Tabular Model built from the ground up for structured data. Not transformer based, fully deterministic, can process billions of rows.",
    whyMatters: "Founded October 2024, unicorn by February 2026. Revenue already in from Fortune 100 contracts. DeepMind alumni team. AWS partnership creates distribution without a massive sales team. This is the rarest combination: deep tech plus early enterprise revenue plus $255M to scale.",
    roles: ["ML Researchers (tabular data)", "ML Engineers", "Enterprise Account Executives", "Solutions Engineers", "Data Scientists", "Product Manager"],
    founder: {
      initials: "JF",
      name: "Jeremy Fraenkel",
      title: "CEO, Co-founder",
      hook: "Jeremy is solving an extremely specific problem: LLMs can't reason over tabular data at enterprise scale. Your opening should reflect that you understand the gap. For research roles, reference your work on structured data models, tree based methods, or tabular deep learning. For enterprise roles, reference specific industries you've sold predictive analytics into.",
      avoid: "Talking about LLMs or generative AI broadly. Nexus is explicitly not an LLM. Conflating them signals you haven't read past the headline.",
    },
    featured: true,
  },
  {
    name: "Modal Labs",
    tagline: "modal.com · San Francisco · AI Inference Infrastructure",
    website: "modal.com",
    round: "Pre-raise",
    amount: "~$2.5B",
    detail: "In talks, current val $1.1B, $50M ARR",
    investors: "General Catalyst (in talks)",
    hiringScore: 8,
    hiringReason: "Valuation 2.3x in 5 months, $50M ARR",
    whatBuilding: "AI inference infrastructure, the compute layer that runs trained AI models to generate outputs. As AI model usage explodes, inference costs and latency become existential. Modal optimizes both. With $50M ARR and competitor Baseten valued at $5B, Modal at $1.1B looks undervalued heading into this raise.",
    whyMatters: "Valuation doubling in 5 months on $50M ARR is a very strong signal they're riding genuine demand growth. This raise hasn't closed yet, which means job postings could come 4-8 weeks after announcement. Getting your application in early in that window is the move.",
    roles: ["Infrastructure / Systems Engineers", "GPU / CUDA Optimization Engineers", "Developer Advocates", "Enterprise Sales", "Developer focused PM", "Site Reliability Engineers"],
    founder: {
      initials: "EB",
      name: "Erik Bernhardsson",
      title: "CEO, ex Spotify ML, ex Better.com CTO",
      hook: "Erik is an engineer's engineer who has built open source tools and written deeply technical blog posts for over a decade. He responds to technical depth and genuine curiosity. Reference a specific inference optimization problem you've tackled, batching, quantization, cold start latency, GPU utilization.",
      avoid: "Waiting too long. The raise isn't closed yet. This is the best window to reach out before they're inundated with applications post announcement.",
    },
    signal: "Raise in talks means act now. Outreach before the round closes gets you in front of founders who still have time to talk. After close, hiring velocity ramps but founder access drops.",
  },
];

const trends = [
  { sector: "AI Infrastructure", status: "Hot", text: "Three of eight rounds this week are pure AI infrastructure plays. Ricursive (chip design), Modal (inference), and Fundamental (tabular data). The market is bifurcating: consumer AI is slowing while infrastructure bets are accelerating. If you work in systems, ML infrastructure, or enterprise data, you're in the most in demand skill category of 2026." },
  { sector: "AI Sales Tech", status: "Heating", text: "Monaco joins a growing pile of AI native CRM challengers. The market is real but crowded. Y Combinator has seeded hundreds of similar plays. Watch Monaco's human in the loop model specifically, it's the most defensible angle in the category right now." },
  { sector: "Vertical SaaS", status: "Steady", text: "Hauler Hero quietly doubled everything since seed. This is a pattern: legacy industries (waste, logistics, agriculture, field services) are being converted to modern SaaS for the first time, with AI layered on top. Low competition, high switching costs, sticky revenue." },
  { sector: "World Models", status: "Emerging", text: "Runway's Series E signals that world models, AI that builds internal 3D representations to simulate and plan, are the next major infrastructure category after LLMs. Gaming, robotics, architecture, and medicine will all be impacted." },
  { sector: "Cybersecurity", status: "Expanding", text: "Vega's raise reflects continued enterprise spending on cloud native security. The angle of threat detection without data centralization is the clearest enterprise wedge. Regulated industries can't move data but still need threat detection." },
];

const compBenchmarks = [
  { role: "ML / AI Researcher", stage: "Seed", base: "$200-280K", equity: "0.5-1.5%", notes: "Ricursive, Fundamental territory" },
  { role: "ML / AI Researcher", stage: "Series A", base: "$220-320K", equity: "0.1-0.5%", notes: "Still meaningful upside at $4B valuation" },
  { role: "Senior Software Engineer", stage: "Seed", base: "$160-220K", equity: "0.2-0.8%", notes: "Entire, early Modal territory" },
  { role: "Senior Software Engineer", stage: "Series A/B", base: "$170-240K", equity: "0.05-0.2%", notes: "Standard at Vega, Hauler Hero range" },
  { role: "Enterprise AE", stage: "Series A", base: "$120-160K base", equity: "0.05-0.15%", notes: "OTE typically 2x base" },
  { role: "Founding AE / First Sales", stage: "Seed", base: "$100-140K base", equity: "0.1-0.4%", notes: "Monaco, early Hauler Hero territory" },
  { role: "Product Manager", stage: "Series A", base: "$160-210K", equity: "0.05-0.2%", notes: "Runway, Fundamental range" },
  { role: "GPU / Infra Engineer", stage: "Series A/B", base: "$200-280K", equity: "0.05-0.25%", notes: "Modal Labs, highest demand right now" },
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

function StartupCard({ startup, index }: { startup: Startup; index: number }) {
  return (
    <div className={`rounded-2xl overflow-hidden ${startup.featured ? "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 border-2 border-rose-200" : "bg-white border border-neutral-200"}`}>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-neutral-400 mb-1">{String(index + 1).padStart(2, "0")} of 08</p>
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

        {/* Founder outreach */}
        <div className="bg-neutral-50 rounded-xl p-4 mb-6">
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

        {/* Signal */}
        {startup.signal && (
          <div className="flex items-start gap-3 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4 mt-0.5" />
            <p className="text-sm text-neutral-600">{startup.signal}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-neutral-100">
          <a
            href={startup.founder.linkedin || `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(startup.founder.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-500 hover:to-rose-600 transition-colors"
          >
            {startup.founder.linkedin ? "LinkedIn" : "Find on LinkedIn"}
          </a>
          {startup.careersUrl !== "" && (
            <a
              href={startup.careersUrl || `https://${startup.website}/careers`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors text-sm"
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
            <p className="text-xs text-neutral-400">Feb 18, 2026</p>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-2">
            8 startups that just raised
          </h1>
          <p className="text-neutral-500">$1.1B+ total this week</p>
        </div>

        {/* Stats */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-neutral-200 grid grid-cols-3 divide-x divide-neutral-200 mb-8">
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">8</p>
            <p className="text-xs text-neutral-400">Startups</p>
          </div>
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">$1.1B+</p>
            <p className="text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-5 px-3">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">3</p>
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
            AI infrastructure dominates. Chip design, inference, and tabular data all raised unicorn rounds. Sales tech heats up. Waste management quietly going enterprise SaaS.
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
            <StartupCard key={startup.name} startup={startup} index={index} />
          ))}
        </div>

        {/* Sector trends */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">Sector trends</h3>
          </div>
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
        </div>

        {/* Comp benchmarks */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-5 h-5" />
            <h3 className="font-serif text-xl text-neutral-900">Comp benchmarks</h3>
          </div>
          <p className="text-sm text-neutral-400 mb-6">Use as a floor in negotiation, not a ceiling.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 text-neutral-400 font-normal">Role</th>
                  <th className="text-left py-3 text-neutral-400 font-normal">Stage</th>
                  <th className="text-left py-3 text-neutral-400 font-normal">Base</th>
                  <th className="text-left py-3 text-neutral-400 font-normal">Equity (4yr)</th>
                  <th className="text-left py-3 text-neutral-400 font-normal">Notes</th>
                </tr>
              </thead>
              <tbody>
                {compBenchmarks.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100">
                    <td className="py-3 text-neutral-900">{row.role}</td>
                    <td className="py-3 text-neutral-500">{row.stage}</td>
                    <td className="py-3 text-neutral-900">{row.base}</td>
                    <td className="py-3 text-neutral-900">{row.equity}</td>
                    <td className="py-3 text-neutral-500 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
