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
    whatBuilding: "The chip design industry has a profound bottleneck. Building a single advanced semiconductor, takes teams of hundreds of engineers, 12-18 months of iterative design work, and anywhere from $100M to $650M in engineering labour. The finished chip is already outdated by the time it ships, because AI models have moved on. Ricursive's insight is structurally simple and staggeringly ambitious: use AI to design the chips that train better AI, then use those better chips to design even smarter AI. A recursive loop; hence the name. Their co-founders Anna Goldie and Azalia Mirhoseini proved this was possible at Google with AlphaChip, which compressed chip layout design from multiple months to just a few hours using deep reinforcement learning, and has been baked into multiple generations of Google's TPUs, including v5e, v5p, and the 6th generation Trillium. Ricursive is building a full-stack platform that handles every phase of chip creation - from placement, routing, verification, and architecture search, to using AI agents that get smarter with every chip they design.",
    whyMatters: "The semiconductor industry is a $600B+ market, and it is structurally stuck. The dominant or the 'Big Three', EDA (Electronic Design Automation) tooling vendors, Cadence, Synopsys, Siemens EDA, have barely changed their software paradigm in 30 years. Human engineers are still the bottleneck. AI cannot advance faster than the hardware it runs on, and hardware cannot advance faster than humans can design it. Ricursive attacks that constraint at its root. If their platform delivers even 10x improvement in design throughput, it doesn't just make existing chips cheaper, it makes custom, purpose-built chips (for robotics, drugs, climate, medicine) economically viable for companies that could never afford bespoke silicon before. The downstream effect on the entire AI industry is difficult to overstate. Medicine: Drug discovery today is constrained not just by biology but by compute. Training a protein-folding model or running a molecular dynamics simulation requires months of GPU time on hardware that was designed for general AI workloads, not biochemistry. A purpose-built chip for protein simulation - optimised for the specific mathematical operations that dominate that workload - could cut that timeline by an order of magnitude. The bottleneck preventing its existence has always been cost: a bespoke chip costs $100M+ to design and fabricate. Ricursive's platform, if it works, brings that cost into range for a well-funded biotech, not just a hyperscaler. Climate and energy: Power grid optimisation, weather modelling, and carbon capture simulation are all compute-bound problems that run on chips designed for advertising inference and image generation. The mismatch is enormous. A custom chip for climate simulation would process fluid dynamics calculations - the mathematical core of weather and grid modelling - far more efficiently than anything currently available. The reason it doesn't exist is the same: design cost. Ricursive changes that equation. Robotics: The physical intelligence problem, giving robots the ability to sense, plan, and act in unstructured environments, requires real-time inference at extremely low power budgets. A robot arm running on a GPU draws too much power and generates too much heat. The robotics industry has been waiting for purpose-built inference chips for years; Qualcomm, NVIDIA, and a dozen startups are all trying to solve it. Ricursive's platform, in theory, could compress the design cycle for exactly these chips from 18 months to weeks. The compounding effect is the thing to understand. Faster chip design → better chips → faster AI → better chip design tools → faster chip design again. This is the loop Ricursive is trying to own. It's not a product company in the traditional sense - it's a bid to own the recursive feedback mechanism at the centre of the entire AI economy. That's why Lightspeed and Sequoia invested at a $4B valuation into a company with no product and four months of existence. They're not betting on a tool. They're betting on a new law of the industry.",
    roles: ["LLM Infra Engineer", "EDA Algorithm Engineer", "LLM Modeling & Scaling Researcher", "Founding Security Engineer", "Operations"],
    rolesNote: "Competition is very low right now. They've pulled from DeepMind, Anthropic, Apple, and Cadence. Window for early numbered employees closes in 60 to 90 days.",
    founder: {
      initials: "AG",
      name: "Anna Goldie",
      title: "CEO, MIT CS+Linguistics, 15,977 Google Scholar cites",
      hook: "Anna has an MIT bachelor's in Computer Science and Linguistics. Before chip design, she was a co-first author on research into neural machine translation (EMNLP 2017) and Constitutional AI at Anthropic. She's also a co-author of RAPTOR (ICLR 2024), a paper on recursive retrieval for LLMs. Her Google Scholar profile lists thousands of citations. She and co-founder Azalia Mirhoseini have been professionally synchronised for over a decade - same start date at Google Brain, Anthropic, and back to Google, all on the same day. Jeff Dean nicknamed their AlphaChip project 'chip circuit training' because they both did circuit training workouts together. That detail is known inside the AI community and signals the depth of their professional bond. Anna and Azalia reportedly received 'weird emails from Zuckerberg making crazy offers' while they were building AlphaChip. They turned Meta down. The reason matters: they were waiting to do something they fully owned. For ML/RL Researchers: Your opening line must reference the reward signal architecture from the 2021 Nature paper, specifically the proxy objective (wirelength + congestion) that AlphaChip optimises. Mention your specific work in RL-based combinatorial optimisation or physical design. If you have a GitHub repo with RL implementations, link it in your first message. Anna responds to intellectual specificity. For Infrastructure/MLOps Engineers: Ricursive runs distributed RL training at massive scale, the infrastructure challenge is enormous. Lead with your specific experience in distributed training frameworks, multi-GPU orchestration, or simulation environments for RL. Reference Modal or similar GPU compute platforms if you've used them. Show your GitHub. For Enterprise Partnerships: Reference specific semiconductor customers (MediaTek adopted AlphaChip; chip companies like Marvell, Broadcom, and Qualcomm are obvious targets). Frame your value in terms of customer relationships in the EDA or semiconductor ecosystem, not 'AI enthusiasm.'",
      avoid: "Do not lead with 'I love what you're building.' Lead with a technical observation or question. Example opener: 'I've been following the debate around AlphaChip's pre-training methodology since the CACM paper, curious how Ricursive's architecture handles the transfer learning problem across heterogeneous chip topologies.' That sentence shows you've read the controversy, understand the architecture, and are thinking about what comes next.",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/7ee982c5169847c78d18238e4973595a",
    },
    cofounder: {
      name: "Azalia Mirhoseini",
      title: "CTO, ex Google DeepMind",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6e575ab801fa48ae981f27a332a2bc99",
    },
    signal: "The Ricursive team pulled its first hires directly from AlphaChip colleagues - Ebrahim Songhori and Jiwoo Pak all came over from Google. The most effective non-research route in right now is reaching out to these early employees on LinkedIn, engaging with their public posts (Ebrahim in particular posts about the technical work), and podcasts and demonstrating that you understand what they're building at the implementation level. The employee to watch is Azalia Mirhoseini (CTO), she is arguably the most technically rigorous of the two founders and leads hiring for research roles. Her Google Scholar page lists her key interests and co-authors, which is a roadmap to what she values in candidates.",
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
    whatBuilding: "Monaco is built on a single, uncomfortable observation: the way early-stage startups sell hasn't changed since 2010, but the cost of doing it badly has never been higher. The standard playbook - hire two SDRs, buy a Salesforce seat, plug in Apollo for prospecting, hope - costs $300-500K per year before a single enterprise deal closes. For a seed-stage company with 18 months of runway, that's not a sales motion. It's a coin flip. Monaco's product replaces that entire stack. Its AI agents build the prospect database, score and rank targets by fit, write and execute personalised outreach sequences, handle follow-ups, and book meetings, all before a human salesperson is involved. The human layer kicks in at the call itself: experienced operators supervise the AI's decisions and handle the nuance that closes deals. The pitch to a founder is simple: the first meeting your sales team takes is already qualified, warmed up, and scheduled. Everything before that was AI. In essence, Monaco's proposition is that it provides the full sales motion - from building a ranked TAM, to running outreach campaigns, to scheduling meetings, using AI agents supervised by experienced human salespeople. Not AI pretending to be a rep. Actual senior sales operators watching over AI that executes.",
    whyMatters: "The $112B+ CRM market is one of the most bloated software categories in existence. Salesforce alone generates $35B in annual revenue - largely from companies that use 15% of its features, resent the cost, and can't leave because their data is trapped inside it. The dissatisfaction is chronic and well-documented. But until now, no challenger has successfully attacked it, because the real switching cost isn't the software, it's the sales motion that runs on top of it. You can migrate a CRM database in a weekend. You can't migrate a trained sales team, an established outreach cadence, and a working pipeline in less than a year. Monaco's approach sidesteps this entirely. Rather than asking companies to migrate away from Salesforce, it's targeting the companies that haven't yet committed to it - specifically the seed-to-Series A cohort that is making its first real sales infrastructure decision right now. That is a market of roughly 50,000 companies globally at any given moment, all simultaneously trying to figure out how to sell. Monaco wants to be the default answer before Salesforce ever becomes a consideration. The broader disruption, though, is to the role of the SDR itself. The Sales Development Representative, the entry-level function responsible for cold outreach, prospecting, and meeting booking, is the most structurally vulnerable white-collar job in the AI transition. It is repetitive, rules-based, and volume-driven. Every major research firm tracking AI's labour market impact has identified SDR as one of the first roles to be substantially automated. Monaco is not trying to hide this: their product explicitly does what SDRs do, supervised by senior salespeople rather than managed by junior ones. What Monaco has to prove, and hasn't yet, is that the human-in-the-loop model holds at scale. The risk isn't whether AI can book meetings. It's whether an AI-booked meeting, with a prospect who was identified by an algorithm and warmed up by a language model, converts at the same rate as one built through a human relationship. That answer will define whether Monaco becomes infrastructure or a feature that Salesforce eventually ships. The Founders Fund bet, alongside Patrick Collison and Garry Tan, is that the answer is yes, and that Monaco will have enough runway to prove it before the incumbents catch up.",
    roles: ["AI/Agent Engineers", "Full Stack Engineers", "ML Engineers", "Account Executives", "Forward Deployed Sales Executives"],
    rolesNote: "Sam started as an SDR at EchoSign for Jason Lemkin (now SaaStr). He understands what it's like to cold-call from a list. He's distinctly not a Silicon Valley insider by background.",
    founder: {
      initials: "SB",
      name: "Sam Blond",
      title: "CEO, ex Brex CRO, ex Founders Fund Partner",
      linkedin: "https://www.linkedin.com/in/samblond/",
      hook: "The founders are a family operation built on genuine domain expertise. Sam was first sales leader and the highest-ranking executive at Zenefits, a top sales rep at EchoSign (sold to Adobe), and CRO at Brex - the company that famously grew faster than almost any B2B startup in history. Sam spent 18 months at Founders Fund as a partner before publicly stating 'VC isn't for me' and returning to operating. His co-founder brother Brian Blond is a VC (Human Capital) and serial CRO. CPO Abishek Viswanathan was CPO at Apollo.io and Qualtrics. CTO Malay Desai was SVP Engineering at Clari. Sam's X feed is unusually educational, he's published detailed breakdowns of Brex's most successful outbound campaigns, including a '75% demo rate, 75% demo to close' campaign they ran when Brex had ~30 employees and near-zero revenue. He's also written about how the Brex billboard campaign was one of the most successful billboard campaigns of any tech startup in history and a champagne-sending campaign (300 bottles of Veuve Clicquot) to startup founders. Sam started his career as an SDR at EchoSign for Jason Lemkin, the same Jason Lemkin who now runs SaaStr, the world's largest SaaS community. He is distinctly not a Silicon Valley insider by background. For Account Executives / Sales Reps: Sam has been explicit in multiple interviews that he hates external recruiters and that his best hires at Brex came through personal referrals and people who found their way to him directly. If you are a strong AE, the single most effective move is to cold-email Sam with a specific metric in the first sentence: 'I closed $1.4M ARR as AE #2 at [company] in 18 months, sourcing 60% of my own pipeline.' He has literally said that the ability to 'reach power and know how to target a CEO' is the scarcer skill he values over raw SDR output. Show you can do that. For AI/Agent Engineers: Frame your work in terms of workflow orchestration and human oversight systems, not just model fine-tuning. Monaco's differentiation is the human-in-the-loop - the technical challenge is building a system that routes AI decisions to human reviewers at exactly the right moment. If you've built similar approval or supervision flows, describe the specific architecture. For BDRs (early-career): Reference Sam's Brex campaigns directly - he's written about the champagne campaign, the billboard campaign, and his first days at EchoSign. Demonstrate you've done your homework by referencing one and explaining what you'd try for Monaco's current stage. He rewards initiative and homework above credentials.",
      avoid: "Don't pitch yourself as someone who wants to work at an 'AI company' generically. Monaco is a sales company that uses AI. The ability to 'reach power and know how to target a CEO' is the scarcer skill he values over raw SDR output.",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/1b4b1c8a22c14105a2f04e80a25b5a29",
    },
    cofounder: {
      name: "Brian Blond",
      title: "Co-founder, VC at Human Capital, serial CRO",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/6c93b8e265594c7ca0943adbb740344a",
    },
    signal: "Co-founder Brian Blond is the quieter door in. He's a VC (Human Capital) with a huge network and is specifically responsible for the sales team culture and methodology. He's also less approached than Sam. CPO Abishek Viswanathan (ex-Apollo, ex-Qualtrics) is the hiring lens for any product or operations role - he's been on several podcasts about PLG and product-led sales. Engaging with his LinkedIn content before reaching out creates a genuine warm context.",
    careersUrl: "",
  },
  {
    name: "Entire",
    tagline: "entire.io · Fully Remote · AI Dev Infrastructure",
    website: "entire.io",
    logo: "https://avatars.githubusercontent.com/u/33188652?s=200&v=4",
    heroImage: "https://entire.io/entire-funding-announcement-even-logos.png",
    round: "Seed",
    amount: "$60M",
    detail: "$300M valuation, largest dev tool seed ever",
    investors: "Felicis, Madrona, M12 (Microsoft), Basis Set",
    hiringScore: 8,
    hiringReason: "15 person team doubling to 30, fully remote",
    whatBuilding: "Here's the problem Entire is solving in one sentence: AI can write code faster than humans can understand it. GitHub Copilot, Cursor, and Claude are generating production code at a pace that has broken the traditional human-review model. A PR might contain 2,000 lines of AI-generated code, and the reviewer has no idea what prompted it, what constraints the AI was working within, or what alternatives it considered. Entire's first product, Checkpoints, solves this by creating a new kind of repository: a Git-compatible database that stores not just the code, but the full creation context - the prompts, the reasoning sessions, the decision trees. Their semantic reasoning layer then lets humans and AI agents query across this context, not just the code. This repository structure enables auditing the 'why' behind changes, not just the 'what,' by capturing atomic steps, configuration, and state updates, advancing beyond traditional code-only storage, such as Github. The phrase Thomas Dohmke uses: 'We're moving away from engineering as a craft, where you build code manually and in files and folders [...] to a much higher abstraction, which is specifications - reasoning, session logs, intent, outcomes.' Version control for the age of agentic software.",
    whyMatters: "The numbers make this concrete. GitHub Copilot users report that AI now writes between 30-40% of their code. At companies running multiple AI agents in parallel - the direction every major engineering platform is moving - that figure is higher. A senior engineer reviewing a pull request in 2026 may be looking at 2,000 lines of code they didn't write, can't fully trace, and are being asked to approve in a sprint cycle measured in days. The context that produced that code - the prompt that initiated it, the constraints the agent was working within, the alternatives it considered and rejected - exists nowhere. It evaporated the moment the session ended. Git, the version control system that underpins virtually all software development, was designed for a world where humans wrote every line and could explain every decision. It records what changed. It has no architecture for recording why, and no concept of an AI agent as an author with its own reasoning chain. The entire code review and accountability infrastructure of modern software engineering is built on an assumption that code has a human author who can be questioned. That is becoming less true every month. The deepest impact is on multi-agent software development. The industry is moving rapidly toward architectures where multiple AI agents collaborate on a single codebase simultaneously - one agent writing tests, another refactoring, another generating documentation, all operating in parallel. The coordination problem this creates is orders of magnitude more complex than human team coordination, because agents have no shared memory, no implicit understanding of each other's reasoning, and no way to resolve conflicts without a system that explicitly stores and shares context. The market this opens is significant. Developer tools is a $26B+ market growing at 20%+ annually, and the tooling layer for AI-generated code is almost entirely unbuilt. Every company running AI coding agents - which will be effectively every software company within three years - will need some version of what Entire is building. The $60M seed, the largest in developer tools history, reflects how much conviction Felicis and M12 (Microsoft's venture arm) have that this is a category-defining bet. The Microsoft angle is particularly notable: Satya Nadella told Dohmke personally to 'keep pushing until your last day' and supported his departure amicably. M12 investing in Entire signals Microsoft sees this as complementary infrastructure, not a threat.",
    roles: ["Backend/Infrastructure Engineers", "Developer Experience Engineers", "DevRel", "Developer Focused PMs"],
    rolesNote: "Reference Entire's three layer architecture: Git compatible database, semantic reasoning layer, UI. The interesting problem is the database layer. It must handle agents emitting far more context than humans ever did. Show your GitHub profile prominently. Thomas actively keeps his own green.",
    founder: {
      initials: "TD",
      name: "Thomas Dohmke",
      title: "CEO, East Berlin-raised, PhD Mechanical Engineering Glasgow",
      linkedin: "https://www.linkedin.com/in/ashtom/",
      image: "https://entire.io/team/thomas.png",
      hook: "Thomas grew up in East Berlin (pre-reunification Germany), got his first computer access in a school geography lab, and then bought a Commodore 64. He taught himself to code without internet access, later earning a PhD in mechanical engineering and leading GitHub. His first major startup was HockeyApp (mobile app crash reporting and analytics), which Microsoft acquired in 2014, which is how he ended up at GitHub. On GitHub, Thomas's handle is @ashtom and he actively maintains a green contribution graph - he codes regularly, even as a CEO. His GitHub bio says: 'I'm a LEGO enthusiast, and love turning that GitHub contribution graph more green.' He has been public about being a LEGO collector. He gave a TED Talk in 2024 titled 'With AI, anyone can be a coder now.' He frequently posts about his love for India (he's visited multiple times, and calls it his 'new home away from home'). He's an engineer who happened to become a CEO, not a businessman who learned to code. He has cited Charlie Munger's wisdom on his GitHub profile. He explicitly believes that AI should 'inspire developers, not replace them', a philosophical position he's held consistently since 2021. For Backend/Infrastructure Engineers: Reference Entire's three-layer architecture (new Git-compatible database → semantic reasoning layer → UI). The interesting technical problem is the database layer, it must handle agents emitting far more context than humans ever did in git commits. If you've worked on high-throughput append-only systems, event sourcing, or distributed databases, frame your message around that specific constraint. Show your GitHub profile prominently. Thomas actively keeps his own green. For Developer Experience Engineers / DevRel: Reference the Pragmatic Engineer podcast he did in June 2025 (Gergely Orosz's newsletter/podcast) - that interview is the most detailed technical account of his thinking about developer workflows. Show you've listened or read it. Thomas has been explicit that developer experience is a first-class concern at Entire, not an afterthought. For Developer-Focused PMs: Reference the HockeyApp acquisition story - Thomas understands what makes developer tools adoption happen because he built a tool that reached millions of iOS developers. Frame your experience in terms of developer adoption, not feature roadmaps.",
      avoid: "Don't position yourself as an 'AI engineer' who wants to build agents. Entire is explicitly not building agents, they're building infrastructure around agents. They want to scale to 'hundreds of agents' internally, not hundreds of employees.",
    },
    signal: "M12 (Microsoft's venture arm) invested in Entire. This means Entire has an implicit distribution relationship with Microsoft's enterprise developer ecosystem. If you have enterprise software sales experience with Microsoft accounts, name it. Madrona Ventures also invested - they are Seattle-based, which means the Pacific Northwest developer community is a hiring pipeline. The cleanest non-founder door in is through Felicis Ventures' portfolio network, whose team partners actively post about Entire's progress.",
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
    hiringReason: "~140 employees, mature startup with research credibility + real revenue",
    whatBuilding: "Runway started in 2018 as three NYU art students who wanted to make AI-powered creative tools - Cristobal Valenzuela (Chilean economist turned media artist), Anastasis Germanidis, and Alejandro Matamala. Their Gen-1 model allowed users to apply visual styles to videos. Gen-2 produced video from text. Gen-3 and Gen-4.5 now generate HD video with native audio, complex physics, and 'consistent world' logic across scenes. A user can describe a scene, generate it, extend it, edit specific elements without regenerating the whole, and export it directly into post-production workflows. The output quality has crossed a threshold that matters commercially: it is now being used in actual film and television production, not as a novelty but as a cost reduction tool that replaces location shoots, reshoots, and expensive VFX sequences. You've seen their output: Everything Everywhere All at Once used their tools. So did multiple House of David scenes, and a Chime ad that was filmed on Times Square without shutting it down. The pivot that explains the Series E: Runway is no longer a video generation tool company. They are building 'world models' - AI systems that construct internal 3D representations of how environments work, including physics, causality, and time. The implication: the same architecture that makes a believable AI video also has applications in robotics (simulating physical environments), gaming (infinite procedural worlds), medicine (protein folding, cellular simulation), and architecture (realistic spatial planning).",
    whyMatters: "The creative industry disruption is the most visible effect and the least interesting one in the long run. Yes, a filmmaker can now generate a crowd scene, a period-accurate street, or a zero-gravity environment for a fraction of what physical production costs. Yes, advertising agencies are already using Runway to produce campaign assets that would previously have required three-day shoots. Yes, the economics of video content production are being permanently restructured - the cost of generating a minute of high-quality video is collapsing, and the number of people who can produce professional-grade content is expanding by orders of magnitude. That's significant, but it's the surface. The deeper disruption is what world models unlock in industries that have nothing to do with entertainment. In robotics, the central unsolved problem is training robots to operate in unstructured real-world environments like kitchens, warehouses, construction sites, where the physical conditions are never identical twice. The current approach requires either enormous amounts of real-world trial-and-error training (expensive, slow, physically dangerous) or synthetic simulation environments that don't transfer well to the real world because they're not accurate enough. A world model that genuinely understands physics and causality produces synthetic training environments that are physically realistic enough to transfer. This is why Nvidia, whose entire business increasingly depends on robotics and physical AI, invested in Runway's Series E. They're not buying a video tool. They're buying proximity to the architecture that makes humanoid robots trainable at scale. In medicine, world models open a parallel set of possibilities. Surgical training currently requires cadavers, expensive simulators, or direct patient contact under supervision. A world model that accurately simulates human tissue behaviour, how it deforms, tears, bleeds, heals, under surgical instruments could produce training environments of sufficient fidelity to replace much of that. Drug interaction modelling, tumour progression simulation, and physical therapy outcome prediction are all problems that require an accurate internal model of how biological systems behave over time. That's a world model problem. In architecture and urban planning, the gap between a design and its real-world consequences - how a building affects pedestrian flow, wind patterns, natural light across neighbouring buildings across different seasons - currently requires expensive computational fluid dynamics software and specialist engineers. A world model collapses that into a prompt. Runway is one of the few AI companies that simultaneously has strong research credibility, a real consumer product, enterprise revenue, and a credible long-term thesis. The Series E at $5.3B (up from $3.3B just ten months prior) reflects that General Atlantic, Nvidia, and Adobe all believe the world models thesis is real and Runway is best positioned to execute it. Adobe's investment is notable - they're a potential acquirer and/or distribution partner, depending on how the regulatory environment evolves. The 'full-stack' philosophy that Cris articulates - from model research to infrastructure to product design to brand, is unusual. Most AI companies either do research or do product. Runway does both. That's expensive and complex, which explains why they need to keep raising.",
    roles: ["Computer Vision / World Model Researchers", "Enterprise AEs (gaming/robotics/media)", "Creative/Brand Roles", "Product Engineers"],
    rolesNote: "Runway is at ~140 employees and Series E, this is not a founding team hire, it's a scale-up hire. Equity upside is more moderate. The specific hiring push right now is in robotics and gaming partnerships, if you have relationships in those verticals, you are going after an underserved pipeline.",
    founder: {
      initials: "CV",
      name: "Cristóbal Valenzuela",
      title: "CEO, Chilean economist turned media artist, TIME100 AI",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_170,w_170,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/816d1507ebcb459e8276f35efcab0ea3",
      hook: "Cris is a Chilean immigrant who came to the US to study at NYU's ITP (Interactive Telecommunications Program), described as 'an art school for engineers and an engineering school for artists.' He has said publicly that being an immigrant was 'both a blessing and a curse', forcing resourcefulness, but adding bureaucratic friction. He continues to live in Brooklyn. He contributed to ml5.js, an open-source machine learning library built on top of TensorFlow.js, designed to make machine learning accessible to artists, creative coders, and educators. This is the origin of Runway's philosophical DNA: tools that make powerful technology accessible to non-technical creators. He worked with Daniel Shiffman (the creator of The Coding Train YouTube channel, a beloved resource for creative coders) at NYU's ITP. He was named to TIME's 100 Most Influential People in AI in September 2023. He gave a Bloomberg interview in October 2024. He has actively thought and written about the 'camera' metaphor for AI - that AI is a new kind of camera that creates a new art form, just as cinema created a seventh art form. That's his philosophical North Star. For Computer Vision / World Model Researchers: Reference the ml5.js contribution and the ITP research philosophy, that tools should democratise access to powerful methods. Frame your research background in terms of 3D understanding, physics-based simulation, or video diffusion, not just image generation. If you've worked on NeRFs, Gaussian splatting, or similar spatial representations, that's directly relevant to world models. Cris is an open-source contributor himself, a public GitHub profile with relevant work matters here. For Enterprise Account Executives (gaming/robotics/media): Runway is expanding into robotics, gaming, and media in parallel. If you have enterprise relationships in any of these verticals, name the specific companies and deal types. The Adobe partnership means enterprise sales reps who've sold into creative agencies or post-production studios have a natural entry. For Creative/Brand Roles: Cris has described Runway as 'full-stack' - they build their own brand, visuals, and culture. He cares about aesthetics. Show a portfolio. The company ran their own AI Film Festival. Demonstrating that you understand both the technology and the creative output is how you stand out.",
      avoid: "Don't approach Runway as purely an ML shop. They care deeply about creative tools and artist empowerment. Cris cares about aesthetics. Treating video generation as 'just another AI problem' misses the mark.",
    },
    cofounder: {
      name: "Anastasis Germanidis",
      title: "CTO, most technically rigorous of the three founders",
      image: "https://images.crunchbase.com/image/upload/c_thumb,h_50,w_50,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_2/skjjl34apuxsdergxhj7",
    },
    signal: "The employee to find on LinkedIn is Anastasis Germanidis (CTO), he's the most technically rigorous of the three founders and has been the one posting publicly about world model research. Engaging with his research notes before reaching out is the most effective warm approach.",
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
    whatBuilding: "Every major enterprise security team runs a SIEM (Security Information and Event Management) platform - Splunk being the dominant one, which Cisco acquired in 2024 for $28 billion. SIEM requires pulling all your security-relevant data into a centralised lake before you can analyse it for threats. For a bank with petabytes of transaction logs spread across 40 cloud environments, that data centralisation costs tens of millions of dollars a year and takes 18-24 months to set up properly. This is a fundamental 'Data Gravity' crisis facing modern enterprise security. That assumption is now structurally broken, for three reasons happening simultaneously. First, the volume of security-relevant data has exploded - a mid-sized enterprise today generates terabytes of logs per day across cloud services, SaaS applications, data lakes, and on-premise infrastructure. Ingesting all of it into a centralised SIEM costs, at Splunk's pricing model, millions of dollars annually just in data ingestion fees before a single analyst touches it. Second, regulated industries across banking, healthcare, insurance, critical infrastructure, increasingly cannot move data at all. GDPR, HIPAA, financial data sovereignty laws, and sector-specific regulations create hard legal constraints on where data can physically reside. A bank with transaction logs in a Frankfurt data centre cannot pipe them to a US-based SIEM without triggering regulatory exposure. Third, cloud-native architectures have fragmented data across dozens of environments simultaneously across AWS S3 buckets, Snowflake warehouses, Databricks lakehouses, GCP BigQuery instances, in ways that were never designed to feed a centralised collection point. Vega's architecture inverts this. Instead of moving the data to where the analysis happens, they bring the analysis to where the data lives - directly in the cloud services, data lakes, and storage systems without ever extracting or centralising the underlying data. They call it 'operational silence': instead of generating more alerts for already-overwhelmed SOC teams, they surface distilled, investigated threats, with context. Shay Sandler's phrase for what they sell: 'We are a platform that investigates the threat in your own environment and distills the truth.'",
    whyMatters: "The SIEM market is broken and everyone knows it. Splunk customers routinely complain about cost (priced by data ingestion volume, costs explode as companies grow), complexity (multi-year implementation projects), and false positives (SOC teams drowning in alerts they can't triage). The alert fatigue problem alone justifies an architectural rethink. The average enterprise SOC team receives between 1,000 and 10,000 security alerts per day. Analyst capacity to investigate those alerts is roughly 40 per analyst per day. The math produces a triage backlog that is structurally impossible to clear, which means the current SIEM model, by design, produces more noise than any human team can process. The response across the industry has been to add more analysts, which is expensive, or to raise alert thresholds, which means missing real threats. Vega's 'operational silence' approach attacks the problem differently: instead of generating alerts for human triage, the platform investigates autonomously and surfaces only confirmed, contextualised findings. The output is not a queue of alerts. It is a set of answers. The regulated industry wedge is the most defensible part of Vega's position. A bank with petabytes of transaction data spread across multiple jurisdictions cannot use a centralised SIEM regardless of cost or capability, the regulatory prohibition is absolute. That customer segment, which includes some of the largest security budgets on earth, has been chronically underserved by every major SIEM vendor because the vendors' architectures physically cannot serve them. Vega's in-place detection model is the first architecture that is natively compliant with data sovereignty requirements - not through workarounds or regional deployments, but by design. Instacart, Fortune 500 financial institutions, and major healthcare systems are already live customers. The AI dimension adds a further layer. As AI workloads generate their own security surface area, model weights being exfiltrated, prompt injection attacks, training data poisoning, inference endpoint abuse, the data volumes and data locations involved are even more distributed and even less amenable to centralisation. Vega's architecture scales naturally to AI-native threat detection in a way that centralised SIEMs cannot, because the data that needs protecting increasingly cannot leave the environment where it was created. The threat detection market for AI infrastructure alone is projected to reach $20B+ by 2030. Vega is positioned at the intersection of that emerging market and the existing $6B SIEM replacement cycle, which is a more valuable position than either one alone.",
    roles: ["Security/Detection Engineers", "Enterprise Sales (US expansion)", "Solutions/Sales Engineers", "Backend Engineers (Go/Python)"],
    rolesNote: "13 roles Tel Aviv (on site), 8 roles US (remote, sales focus). For detection engineers: reference in situ threat detection architecture, query performance over distributed storage at petabyte scale. If you have DuckDB, Iceberg, Delta Lake experience, that's relevant. For US sales: frame around specific regulated industry accounts (banking, healthcare) you've closed.",
    founder: {
      initials: "SS",
      name: "Shay Sandler",
      title: "CEO, Open University of Israel, ex Granulate ($650M Intel acquisition)",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacbf5f00da1414b95a2_cbcd0223efbc31b2efe33e49f55b46f3_shay%20sandler.avif",
      linkedin: "https://www.linkedin.com/in/shay-sandler-305508107/",
      hook: "Shay Sandler comes from Unit 8200, the Israeli military's elite intelligence and cyber unit, which has produced the founders of Check Point, Palo Alto Networks, CyberArk, and dozens of other major security companies. That's not a vanity credential; it's a signal that he has deep classified-level understanding of how threats actually behave, which almost no commercial security founder has. Shay studied at the Open University of Israel, not a prestigious tech university, which means his credentials come entirely from operational experience, not academic pedigree. He was a founding team member (not a co-founder) at Granulate, a performance optimisation company that Intel acquired for $650M in 2022. Intel then shut Granulate down as part of its global restructuring. That experience, building a $650M company and then watching the acquirer close it, likely shapes Shay's drive to build independently. He wants to build 'a billion-dollar company in Israel that remains independent.' That phrase appears explicitly in his interviews. His stated cultural filter is stark: 'I am not looking for the standard programmer. I recruit people with hunger in their eyes, those who are not afraid to go all out.' Vega is deliberately building for engineers who are comfortable operating without process and structure, in the style of a Unit 8200 mission environment. He attended AWS re:Invent 2025 and was present at major cloud security conferences, his LinkedIn shows him at Instacart meetups and cloud summits. He's socially active in the US enterprise tech community despite being Tel Aviv-based. For Security / Detection Engineers: This role is the most technically demanding. Reference Vega's specific architecture - the key papers to understand are around in-situ threat detection and SIEM-less architectures. If you've worked on detection logic that operates without centralised aggregation, make that the centrepiece of your message. The specific technical challenge Vega is solving is query performance over distributed storage at petabyte scale. If you have direct experience with DuckDB, Iceberg, Delta Lake, or similar query engines on cloud object stores, that's the relevant background. For Enterprise Sales (US expansion): Shay has explicitly said the $120M round is being deployed to build a global sales and support organisation. US-based enterprise sales reps who've sold into banking or healthcare are the most valuable profile. Frame your message around specific regulated-industry accounts you've closed. Shay responds to the 'painful problem' framing - if you've talked to enterprise security teams about SIEM costs and heard the frustration firsthand, open with that story. For Solutions/Sales Engineers: Vega's North Star is 'adopt within minutes.' If you've run POCs at enterprise scale for cloud security tooling, that's the specific experience they need. Reference your fastest-ever enterprise deployment.",
      avoid: "Don't approach with generic 'I'm interested in cybersecurity'. Vega is replacing one of the most entrenched enterprise tools. Show you understand the specific pain of SIEM at scale.",
    },
    cofounder: {
      name: "Eli Rozen",
      title: "CTO, Unit 8200 + Granulate veteran",
      image: "https://cdn.prod.website-files.com/68791f04ead01339340acbbe/68c8eacb39949d0f629a9de0_169b7405ef19c513276671a924cc224e_eli%20rozen.avif",
      linkedin: "https://www.linkedin.com/in/eli-rozen/",
    },
    signal: "CTO Eli Rozen is also a Unit 8200 alumnus and Granulate veteran. He leads the technical team and is responsible for engineering hires. He is less publicly visible than Shay but Vega's first investors at Cyberstarts (Gili Raanan, Lior Simon) are active LinkedIn publishers and deeply networked in the Israeli/US cyber ecosystem. Getting an introduction through the Cyberstarts or Accel networks is more effective than a cold outreach. Look for Vega employees on LinkedIn who were previously at Palo Alto Networks, CrowdStrike, or Wiz, that's the talent pipeline Vega is drawing from.",
    careersUrl: "https://www.comeet.com/jobs/vega/C9.009",
  },
  {
    name: "Hauler Hero",
    tagline: "haulerhero.com · San Diego · Waste Management SaaS",
    website: "haulerhero.com",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEUaN5qeD7K2Q/company-logo_200_200/company-logo_200_200/0/1630641641284/haulerhero_logo?e=1773273600&v=beta&t=hc8MOnYDplQwnIY9tPPZPCY95m2q0A_lbzv6P2MZbVQ",
    videoId: "77Xjf2MhifE",
    round: "Series A",
    amount: "$16M",
    detail: "$27M total, 120+ customers across 40 states",
    investors: "Frontier Growth, I2BF Ventures, K5 Global, Somersault",
    hiringScore: 7,
    hiringReason: "200% revenue growth, doubled everything since seed",
    whatBuilding: "Waste management is a $90B+ industry in the US, and until very recently, it was running largely on software from the 1990s. Dispatch was done on whiteboards. Billing was done in QuickBooks. Customer complaints were tracked in notebooks. The inefficiency was not incidental, it was structural. Waste management software vendors had no incentive to build modern tooling for a fragmented market of small operators who had been running the same way for decades. Hauler Hero is the ServiceTitan for trash \u2013 an all\u2013in\u2013one SaaS platform that handles routing, billing, customer relationship management, two\u2013way SMS, and now AI\u2013powered image verification from truck\u2013mounted cameras (Hero Vision), which automatically confirms pickups and flags missed collections or contaminated materials. The CRM layer handles customer accounts, service agreements, and communication, including two\u2013way SMS that lets customers report missed pickups, schedule bulk item collections, and receive automated service confirmations without calling a dispatcher. The billing layer automates invoice generation, payment collection, and accounts receivable across multiple service types and pricing structures simultaneously. The routing layer optimises daily collection routes dynamically, accounting for new service requests, cancelled stops, and vehicle availability in real time rather than requiring a dispatcher to manually rebuild routes each morning. The most technically differentiated product is Hero Vision, an AI\u2013powered image capture system that uses cameras mounted on collection trucks to automatically photograph and verify each pickup as it happens. The images are timestamped, geotagged, and fed into the platform in real time, creating an auditable record of every service interaction. Hero Vision's computer vision models flag contaminated bins, missed collections, overfilled containers, and damaged infrastructure automatically, surfacing exceptions for dispatcher review rather than requiring manual inspection of every image. The company has processed 35M+ trash pickups, serves 120+ haulers across 40 states, and counts Verizon, Wells Fargo, McDonald's, PG&E, the US Army, and Marriott among its indirect clients (i.e., companies whose waste they help haul). Since their seed round, they've doubled customers, doubled revenue, and doubled headcount.",
    whyMatters: "The US waste management industry generates $90B+ in annual revenue and has one of the most unusual competitive structures in the American economy. The top four companies \u2013 Waste Management, Republic Services, Clean Harbors, and GFL Environmental \u2013 control roughly 40% of the market. The remaining 60% is served by thousands of independent regional and local haulers, many of them family\u2013owned businesses operating 5 to 50 trucks, who collectively move more waste than any single national player. That long tail of independent operators is the largest underserved vertical SaaS market most people have never thought about. The software penetration in this segment is almost nonexistent by modern standards. Estimates suggest fewer than 15% of independent waste haulers use purpose\u2013built software for more than one function. This is not because the operators are unsophisticated. It is because until very recently, no one built software that understood their specific workflow well enough to be worth the switching cost. The regulatory tailwind is underappreciated. Municipal waste contracts are increasingly requiring digital verification of service delivery as a contract condition. Cities that were burned by haulers billing for missed pickups, or that faced resident complaints they couldn't adjudicate, are writing image verification and GPS tracking requirements directly into new contract terms. Hero Vision, which Hauler Hero built as a product feature, is becoming a compliance requirement for operators who want to bid on municipal work. That converts a nice\u2013to\u2013have into a must\u2013have overnight, and Hauler Hero is the only platform that ships it natively. The AI layer compounds this. Route optimisation in waste collection is a genuinely complex combinatorial problem, not just finding the shortest path between stops, but accounting for truck capacity, bin fill levels, time window constraints, traffic patterns, and the physical reality that a rear\u2013loader truck cannot reverse down certain streets. Static routing software solves a simplified version of this problem. Hauler Hero's dynamic routing layer, trained on 35M+ real collection events, solves the real version, and gets more accurate with every additional pickup it processes. The proprietary dataset is the moat. A competitor starting today would need years of operational data before their routing models approached the same accuracy, and by that point Hauler Hero's models will have trained on 200M+ pickups. The comparable that matters most for understanding where this goes is ServiceTitan. ServiceTitan spent a decade building vertical SaaS for HVAC, plumbing, and electrical contractors, another fragmented, unsexy market with high switching costs and chronic software underinvestment. It IPO'd in December 2024 at a $9.5B valuation. Hauler Hero is the same thesis applied to a market that is, if anything, more fragmented, more underserved, and more structurally sticky than the one ServiceTitan conquered. The $27M total raised to date is not the ceiling, it is the floor of what this company could become if it executes the same playbook in a vertical with no incumbent worth the name.",
    roles: ["SMB Account Executives", "Full Stack/Product Engineers", "ML/Computer Vision Engineers", "Customer Success", "Implementation Specialists"],
    rolesNote: "For AEs: Mark was a top sales rep himself. Be explicit about ACV, deal cycle length, and whether you've sold to operations heavy buyers (field service, logistics, construction). For engineers: Hero Vision (AI image capture from truck cameras) is the newest product. Edge ML, on device inference, or CV pipelines with limited connectivity are relevant.",
    founder: {
      initials: "MH",
      name: "Mark Hoadley",
      title: "CEO, Harvard math/science, Illinois Math & Science Academy",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQE-fDkMXmR9Yg/profile-displayphoto-scale_200_200/B4EZxIMctzGcAY-/0/1770737753417?e=2147483647&v=beta&t=zG8gkGQ739Hrttqep5w1YdW5LkDY5SS3Ug4tSfc_9wQ",
      linkedin: "https://www.linkedin.com/in/hoadley/",
      hook: "Mark Hoadley's background is the key signal here. He spent nearly four years at ServiceTitan, one of the rare vertical SaaS companies that went public and watched it grow from ~$20M run\u2013rate to a multi\u2013billion\u2013dollar valuation. He specifically chose not to build an MVP, citing how ServiceTitan struggled to expand into adjacent categories (pest control) without acquiring an existing player. Hauler Hero was built as a full platform from day one. Mark graduated from Harvard (math/science background, he also attended the Illinois Mathematics and Science Academy, a selective public boarding school for gifted students). He worked at ServiceTitan not as an engineer but as a top sales rep \u2013 his proudest professional stat is that he generated $10M in ARR for ServiceTitan when the company's entire run\u2013rate was ~$20M. Hoadley was personally responsible for 50% of the company's entire revenue base at the time. He found Hauler Hero through Ben Sikma, who was doing M&A in waste management and kept finding technologically ancient businesses changing hands. Hauler Hero is likely to be at WasteExpo 2026 as an exhibitor (considering they participated in 2025). If you can attend or engage with their presence there on LinkedIn, it's a direct path to the team in a non\u2013competitive context. For SMB Account Executives: Mark was a top sales rep himself. He knows immediately whether a sales candidate understands what 'enterprise motion' looks like versus 'SMB velocity.' Be explicit about your ACV (average contract value), deal cycle length, and whether you've sold to operations\u2013heavy buyers (field service, logistics, construction), these profiles transfer directly. Reference ServiceTitan specifically if you've sold against or alongside them, he'll appreciate the depth of understanding. For Full\u2013Stack / Product Engineers: Hauler Hero is expanding into enterprise integrations \u2013 transfer stations, material recovery facilities (MRFs), and scale\u2013house integrations (they just announced MyTruckScales integration). If you've built integrations between operational software systems (IoT data, logistics APIs, billing systems), that's the most valuable background. Reference specific integration patterns you've worked on. For ML/Computer Vision Engineers: Hero Vision (AI image capture from truck cameras) is the newest and most technically differentiated product. If you've worked on edge ML, on\u2013device inference, or computer vision pipelines with limited connectivity (trucks aren't always online), those specific constraints are relevant.",
      avoid: "Don't position this as a 'stepping stone' to a more glamorous AI company. They want people genuinely excited about an underserved industry.",
    },
    cofounder: {
      name: "Ben Sikma",
      title: "President, ex ESG (Dover), M&A in waste management, Georgetown MBA",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHbP7q7PJDf3w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721341953288?e=1773273600&v=beta&t=U2AAyYWzWHoIYoc3EtAzelbBAuUDz07O8PFZaEhJhRA",
    },
    signal: "Co\u2013founder and President Ben Sikma handles much of the operational and customer\u2013facing side. He's Mark's brother\u2013in\u2013law and the one who originally identified waste management as the opportunity. For customer success or implementation roles, reaching out to Ben directly with a background in field service or logistics software is more direct than going through Mark. The Hauler Hero jobs page is sparse, roles often go unlisted and are filled through referral. Following their LinkedIn page and engaging with their product announcements (they post fairly actively) puts you in front of the team before a role is even posted.",
  },
  {
    name: "Fundamental",
    tagline: "fundamental.tech · San Francisco · Enterprise Data AI",
    website: "fundamental.tech",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHRg4wfLuP9GA/company-logo_200_200/B4DZwuVOUSJcAI-/0/1770303841955/fundamentalhq_logo?e=1773273600&v=beta&t=49wRt4UQLE0FAcQwOT-YqlvL3kvP4-P1iSaQSxptfrA",
    heroImage: "https://framerusercontent.com/images/Q3VMIDLztRsVhR7kdwvEWJitw.jpeg?width=3000&height=2000",
    round: "Series A",
    amount: "$255M",
    detail: "$1.4B valuation",
    investors: "Oak HC/FT, Salesforce Ventures, Battery",
    hiringScore: 8,
    hiringReason: "7 figure Fortune 100 contracts at seed stage",
    whatBuilding: "Structured data \u2013 spreadsheets, databases, transaction logs, medical records \u2013 makes up roughly 80% of all enterprise data by volume, and it's the data that actually drives consequential decisions. Which drug goes to trial. Which financial transactions get flagged. When to cut power to prevent wildfires. But LLMs, built on Transformer architectures, are terrible at this data type. They truncate rows. They lose precision over long tables. They hallucinate numbers. They can't reason over a dataset with billions of rows. For tasks where precision is the entire point, fraud detection, credit risk, clinical prediction, hallucination is not a minor limitation. It is a disqualifying failure. For the past decade, the dominant approach to extracting predictive intelligence from this data has been gradient boosting, specifically XGBoost and LightGBM, the ensemble methods that win virtually every structured data competition on Kaggle and power the majority of production ML systems in banking, insurance, and retail. These methods work well, but they require significant human labour: a data scientist must manually engineer features, handle missing values, encode categorical variables, tune hyperparameters, and rebuild the entire pipeline from scratch for every new prediction task. A fraud detection model built for one bank cannot be transferred to another without repeating this process entirely. The knowledge is in the engineer's head and the custom code they write, not in the model itself. NEXUS is Fundamental's answer to this architectural gap. It is not a Transformer. It is trained on massive quantities of tabular data across industries, it ingests raw tables with minimal preprocessing, it produces fully deterministic outputs with no probabilistic variation between runs, and it generalises across prediction tasks without task\u2013specific fine\u2013tuning. The claim, that a single model can be dropped onto a new tabular dataset and produce state\u2013of\u2013the\u2013art predictions without the feature engineering and pipeline construction that XGBoost requires, is the central bet. Fortune 100 customers, like AWS and those in banking and healthcare already running seven\u2013figure contracts suggest the claim is holding in production.",
    whyMatters: "Globally, there are roughly 4 million data scientists and ML engineers, the majority of whom spend the majority of their time doing the same set of tasks: cleaning data, engineering features, building pipelines, tuning models, and maintaining the resulting systems in production. McKinsey estimated in 2023 that data preparation alone consumes 60\u201380% of a data scientist's working time. That is not an anecdote about inefficiency, it is a structural description of an industry where the highest\u2013paid technical specialists spend most of their hours on work that is repetitive, manual, and in principle automatable. Jeremy Fraenkel's formulation is worth sitting with: 'If you look at what LLMs have done with unstructured data, it's been amazing. But it only covers 20% of data.' The other 80%, the tables, is where the real economic value sits. NEXUS, if the generalisation claim holds at scale, automates that majority. A data scientist working with NEXUS does not engineer features or tune hyperparameters, they define the prediction task, point the model at the data, and evaluate the output. The pipeline construction collapses into a single API call. The implication for enterprise data science teams is not subtle: the same output that currently requires a team of ten data scientists could be produced by a team of three with NEXUS handling the modelling layer. The AWS partnership is the distribution mechanism that makes this commercially significant at speed. Enterprise software sales into Fortune 500 companies typically requires an 18\u2013month procurement cycle \u2013 vendor evaluation, security review, legal negotiation, budget approval, implementation. AWS Marketplace collapses this. Companies that already have AWS enterprise agreements can purchase NEXUS directly through their existing procurement relationship, drawing down from pre\u2013committed cloud spend without a new vendor approval process. That is not a go\u2013to\u2013market convenience, it is a structural bypass of the primary barrier to enterprise AI adoption. Snowflake built a $60B+ business partly on the same insight: distribution through existing cloud relationships reduces sales cycles from years to weeks. Fundamental is starting in financial services and healthcare, the two industries with the largest structured datasets, the highest stakes for prediction accuracy, the most regulatory pressure on model explainability, and the deepest frustration with LLM hallucination. A fraud detection system cannot explain to a regulator that its model 'sometimes gets numbers wrong.' A clinical readmission risk tool cannot be deployed in a hospital that cannot audit how a prediction was made. NEXUS's determinism \u2013 the fact that the same input always produces the same output, and that output can be traced \u2013 is not just a technical property. It is a compliance feature that unlocks markets that probabilistic models cannot enter. Once embedded in a bank's fraud infrastructure or a hospital's clinical decision support system, the switching cost is effectively infinite.",
    roles: ["ML Researchers (tabular data)", "ML Engineers", "Enterprise Account Executives", "Solutions Engineers", "Data Scientists", "Product Manager"],
    rolesNote: "For ML researchers: frame your work in terms of tabular specific architectures like tree ensembles, TabNet, SAINT, FT Transformer. If you've worked on structured prediction problems (fraud, credit, pricing), that's more relevant than NLP or vision work. For AEs: name the enterprise accounts (banks, insurers, healthcare systems) you've closed predictive analytics or data infra into. They need people who can sell into CFOs and CDOs.",
    founder: {
      initials: "JF",
      name: "Jeremy Fraenkel",
      title: "CEO, UC Berkeley ML, ex Drift cofounder, ex Bridgewater/JPMorgan",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGAaYfc96TJaw/profile-displayphoto-scale_400_400/B4EZwtXrkIHsAg-/0/1770287711718?e=1773273600&v=beta&t=Il2TUA5n-U3Kfm1JfPYTMm3J8fQI2D5dFKVzOO3YUvE",
      linkedin: "https://www.linkedin.com/in/jeremyfraenkel/",
      hook: "Jeremy has a graduate degree in Machine Learning from UC Berkeley with a rigorous quantitative background. Before Fundamental, he co\u2013founded Drift \u2013 a conversational marketing platform that reached significant scale before being acquired. That's two companies with meaningful outcomes, which makes him unusual among AI research founders: he combines deep technical understanding with real commercial execution. His investors at Oak HC/FT specifically cited his 'finance background through roles at JPMorgan and Bridgewater' \u2013 he knows how structured financial data works from the inside, which is why banking is his primary vertical. He wrote a blog post called 'Revealing the Hidden Language of Tables' which is the clearest articulation of Fundamental's thesis, required reading before any outreach. His angel investors are signal: Perplexity CEO Aravind Srinivas, Datadog CEO Olivier Pomel, and Brex co\u2013founder Henrique Dubugras are not passive cheque\u2013writers but operators who validated the thesis from a commercial perspective. For ML Researchers (tabular/structured data specialists): Reference the deep learning on tabular data literature \u2013 the key debate is whether neural networks can genuinely beat XGBoost/gradient boosting on tabular data. Jeremy's thesis is that with enough training data and a model architecture built for rows\u2013and\u2013columns rather than adapted from NLP, they can. If you've worked on TabNet, NODE, or similar tabular deep learning approaches, or have views on why prior tabular neural networks underperformed, lead with that technical perspective. NEXUS's DeepMind alumni research team is the hiring bar \u2013 come with papers or public code. For Enterprise AEs (financial services / healthcare): Jeremy comes from Bridgewater and JPMorgan context and he understands how financial services procurement works, and he's already closed Fortune 100 banking and healthcare contracts. If you've sold ML/analytics products into these verticals, reference the specific compliance constraints (SOC2, HIPAA, banking regulators) you navigated to close. The AWS channel means deals increasingly come through existing AWS relationships \u2013 if you have an AWS partner background, that's directly relevant.",
      avoid: "Don't say 'I want to work on LLMs.' NEXUS is explicitly not an LLM. It's a purpose built architecture for structured data. If you conflate them, you signal you haven't read past the headline. Don't pitch yourself as a generalist ML engineer. They want specificity on tabular methods.",
    },
    cofounder: {
      name: "Sam Batchelor",
      title: "Co-founder, ex DeepMind Research",
    },
    signal: "Co\u2013founder Gabriel Suissa is Israeli and leads much of the R&D (the team has engineers from AI21 Labs). For research roles, finding Gabriel's professional network through the Israeli AI ecosystem (particularly AI21 Labs alumni on LinkedIn) is the most direct path. The Cloudera partnership (announced September 2025) means Fundamental is building integration work \u2013 if you have Cloudera platform experience, it's a genuine warm lead into a technical role.",
    featured: true,
  },
  {
    name: "Modal Labs",
    tagline: "modal.com · San Francisco · AI Inference Infrastructure",
    website: "modal.com",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQHy7exnpF9hzA/company-logo_200_200/B4EZmTj1JVKQAI-/0/1759117267991/modal_labs_logo?e=1773273600&v=beta&t=UQLrsqy7tU3jnCTyuTtIR_GSFv1dUjZcA2Ihp_jB49w",
    videoId: "ii9E5z8Gsrc",
    round: "Pre-raise",
    amount: "~$2.5B",
    detail: "In talks, current val $1.1B, $50M ARR",
    investors: "General Catalyst (in talks)",
    hiringScore: 8,
    hiringReason: "Valuation 2.3x in 5 months, $50M ARR",
    whatBuilding: "The workflow for deploying an AI model into production is deceptively hard. A data scientist or ML engineer finishes training a model on their local machine or a cloud notebook. They then hand it to a platform engineering team, who containerises it, writes Kubernetes configuration files, sets up autoscaling rules, configures a load balancer, establishes monitoring, manages GPU quota requests, and wires it into the company's existing infrastructure. That process takes days to weeks, requires specialised infrastructure knowledge that most ML practitioners don't have, and must be repeated in some form every time the model changes, the load profile shifts, or a new use case requires a different hardware configuration. The model itself might have taken an afternoon to train. The infrastructure work to run it reliably takes a sprint. Modal abstracts all of this. You write a Python function, add a @modal.function decorator, and Modal handles everything else: container construction, GPU provisioning, autoscaling from zero to hundreds of parallel workers, cold start optimisation, job scheduling for background tasks, secret management, and monitoring. The billing model matches the architecture: you pay per second of actual compute used, with no idle costs when nothing is running. For a team running inference workloads that spike unpredictably, a common pattern in production AI applications, the cost difference versus a reserved GPU cluster can be 60\u201370%. Modal builds and caches container images that start in under a second, compared to the 30\u201390 second cold starts that make naive containerised GPU workloads unusable for latency\u2013sensitive applications. Their custom network file system allows large model weights to be loaded into GPU memory faster than any cloud provider's native storage solution. Their sandboxing architecture lets untrusted code run safely at scale, which enables use cases like code execution environments and customer\u2013facing AI agents that cloud providers' general\u2013purpose compute cannot safely support. Erik's insight: the biggest bottleneck in ML deployment isn't model quality \u2013 it's the gap between 'it works on my laptop' and 'it runs reliably at scale.' Modal closes that gap with a developer\u2013first interface.",
    whyMatters: "AI Training, the phase that dominated AI infrastructure spending from 2020 to 2024, involving massive GPU clusters running for weeks to produce a single model, is becoming a smaller fraction of total AI compute spend. Inference, or running trained models to generate outputs for actual users and applications, is becoming the dominant cost centre, and it is growing faster than training ever did because every new AI application generates continuous, ongoing inference demand from the moment it ships. For context, OpenAI processes over 10 billion words of inference output per day. Every enterprise that deploys an internal AI assistant, every consumer app that integrates a language model, every production system that runs AI\u2013powered decisions generates inference compute demand continuously, around the clock, at volumes that compound as adoption grows. The current solutions are inadequate in ways that are becoming increasingly expensive. Hyperscaler GPU clouds \u2013 AWS, Google Cloud, Azure \u2013 were built for general\u2013purpose compute workloads and adapted for AI inference. They are expensive, operationally complex, and optimised for reserved capacity rather than the spiky, unpredictable demand profiles that characterise real AI applications. A company running a consumer AI product cannot predict whether it will need 10 or 1,000 GPU instances at 3pm on a Tuesday \u2013 and paying for reserved capacity to handle the peak means paying for idle capacity during the troughs. The economics are structurally inefficient for the actual usage pattern of production AI. Modal's serverless abstraction converts infrastructure time into model time, a trade that, at the margin, is worth more than the raw compute cost difference, because ML engineer time is priced at $200\u2013300K annually and infrastructure debugging compounds into weeks per quarter. The competitive dynamics of the inference infrastructure market are moving fast. Baseten, Modal's closest comparable, raised at a $5B valuation in late 2025. Together AI, Replicate, and Fireworks AI are all pursuing adjacent positions. The hyperscalers are shipping dedicated inference products. But the developer\u2013first positioning \u2013 the bet that the primary buyer of inference infrastructure is the individual ML engineer or small team, not the enterprise procurement committee \u2013 is Modal's specific angle, and it reflects Erik Bernhardsson's background as a practitioner who built tools for other practitioners rather than a founder who came up through enterprise sales. The $50M ARR at Modal's current scale suggests that positioning is working. The question the General Catalyst raise is designed to answer is whether it can be the foundation for a $10B+ infrastructure company, or whether it gets commoditised as the hyperscalers build equivalent abstractions into their existing platforms. The bet is that developer loyalty, performance compounding, and the head start in serverless GPU architecture create a moat that is harder to replicate than it looks from the outside.",
    roles: ["Infrastructure / Systems Engineers", "GPU / CUDA Optimization Engineers", "Developer Advocates", "Enterprise Sales", "Developer focused PM", "Site Reliability Engineers"],
    rolesNote: "For infrastructure engineers: they built their own container runtime (not Docker), their own scheduler (not Kubernetes), their own distributed file system. Reference work on similar ground up systems. For GPU engineers: frame work in terms of utilization optimization, cold start latency, batching strategies, quantization. For DevRel: show your technical writing portfolio. Erik values people who can explain complex systems clearly.",
    founder: {
      initials: "EB",
      name: "Erik Bernhardsson",
      title: "CEO, ex Spotify ML (built Luigi), ex Better.com CTO, KTH Sweden",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH6pzr4eaE_dw/profile-displayphoto-scale_200_200/B4EZlzD3iRIQAY-/0/1758572018374?e=2147483647&v=beta&t=1bV9zQmd0yFdbLnRW84htEDbG0KRKSTNU5bq7KDwZ7Q",
      linkedin: "https://www.linkedin.com/in/erikbern/",
      hook: "Erik is a prolific blogger at erikbern.com. His most famous post is 'Why software projects take longer than you think,' which argues that software project completion times follow a log\u2013normal distribution. It's been shared hundreds of thousands of times. He's also written 'What I want from software infrastructure,' which is basically the architectural manifesto for why Modal exists. Reading these posts before reaching out is non\u2013negotiable. He won an IOI Gold Medal in 2003 (International Olympiad in Informatics), a fiercely competitive algorithms competition. Between 2003 and 2010, him and his team also won the Nordic programming competition five times. He's not just an ML person; he's a deeply competitive algorithms programmer who happens to have built ML systems. His GitHub handle is @erikbern and he maintains open source projects actively. He built 'Deep Pink' \u2013 a chess AI that learns to play using deep learning \u2013 as a personal project. He studied physics at KTH (Royal Institute of Technology, Stockholm), not computer science. He describes himself in interviews as someone who 'grew up coding' and did programming competitions before anything else. He is blunt, direct, and allergic to hype. For Infrastructure / Systems Engineers: Read his blog post 'What I want from software infrastructure' before reaching out. Reference a specific claim he makes and respond to it, agree, disagree, or extend it with your own experience. He respects intellectual engagement over compliments. If you've built distributed task queues, container orchestration systems, or GPU scheduling systems, show your GitHub. Contributing to Annoy (still active) or flagging a specific technical issue with Modal's public API is the most powerful signal you can send. For GPU / CUDA Optimisation Engineers: This role is Modal's most urgent need and hardest to fill. Reference specific GPU kernel optimisation work \u2013 quantisation, CUDA custom ops, attention optimisation (FlashAttention\u2013style), or batching strategies. If you've contributed to vLLM, TensorRT\u2013LLM, or similar inference optimisation projects, link directly to those contributions. For Developer Advocates: Erik has been explicit that Modal's growth is community\u2013driven. Reference specific technical content you've created that got traction in the ML or developer community \u2013 a blog post, a YouTube video, an open\u2013source tool. Show your GitHub stars. He understands the metrics of developer community growth intimately.",
      avoid: "Waiting too long. The raise hasn't closed yet. This is the single best window to reach out before they're inundated with post announcement applications. Don't be generic. Erik has seen thousands of 'I'm passionate about infrastructure' pitches. Show you've read his blog.",
    },
    cofounder: {
      name: "Akshat Bubna",
      title: "Cofounder, Systems Engineer",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEZbKIjJB6I9A/profile-displayphoto-scale_400_400/B4EZl3ChkHKcAg-/0/1758638774967?e=1773273600&v=beta&t=veqYAx4j2gGRXchMBioqL9IOT4ah2XAxG8rlmVRjZvs",
    },
    signal: "The raise hasn't closed yet, this is the single most important timing signal in this drop. Companies that are in talks to raise are not yet flooded with applications. The window to reach Erik directly, before the round closes and hiring ramps into a formal process, is the next 4\u20136 weeks. His LinkedIn is active and he posts thoughtful ML infrastructure content regularly. Comment genuinely on a post before reaching out directly. He has described a role called 'Cloud Quant', someone who works very closely with the CEO to optimise infrastructure costs, as a priority hire. That role isn't likely listed anywhere yet.",
  },
  {
    name: "ElevenLabs",
    tagline: "elevenlabs.io · Remote (London/NYC hubs) · Voice AI",
    website: "elevenlabs.io",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQG8vBl8F4QX1w/company-logo_200_200/company-logo_200_200/0/1668126895834/elevenlabsio_logo?e=1773273600&v=beta&t=f3-zwcWV-gSo6VjBUCsvMAPRO-jNnjZwQUPUx9zxIrs",
    videoId: "6s4Ab_8SCaQ",
    round: "Series D",
    amount: "$500M",
    detail: "$11B valuation, $330M+ ARR",
    investors: "Sequoia (lead), a]6z, ICONIQ, Lightspeed, BOND",
    hiringScore: 8,
    hiringReason: "400 employees, tripled valuation in a year, IPO track",
    whatBuilding: "Two Polish founders who grew up frustrated by badly dubbed American films (emotion, tone, and nuance lost in translation) built what is now the world's leading voice AI platform. Co-founded in April 2022, ElevenLabs reached 1 million users within five months of launching its beta in January 2023. They trained their text-to-speech models from first principles rather than fine-tuning existing ones. Voice naturalness is rated 9.5/10, the highest among competitors. The product suite has expanded well beyond text-to-speech. Eleven v3, their latest flagship model, supports 70+ languages with the highest emotional range in the industry. Flash v2.5 delivers ~75ms latency for real-time applications. The Conversational AI platform (launched November 2024) deploys interactive voice agents with native integrations into HubSpot, Salesforce, ServiceNow, and Zendesk. The Dubbing Studio preserves a speaker's original voice across 29 languages. GenFM generates multi-speaker AI podcasts from uploaded content, a direct competitor to Google's NotebookLM. Eleven Music (August 2025) generates studio-grade music from natural language prompts, developed in collaboration with record labels and cleared for commercial use. The Voice Library hosts 10,000+ voices, and the Iconic Voices marketplace licenses celebrity voices. Michael Caine, Matthew McConaughey, and the estates of Judy Garland, James Dean, Burt Reynolds, and Babe Ruth are on the platform. Enterprise customers include The Washington Post, HarperCollins, Square, MasterClass, and Paradox Interactive. Employees from over 75% of the Fortune 500 use the platform.",
    whyMatters: "The funding trajectory tells the story: $2M pre-seed (January 2023), $19M Series A (June 2023, a16z), $80M Series B (January 2024, $1.1B unicorn), $250M Series C (January 2025, ~$3B, ICONIQ Growth), $100M employee tender offer (September 2025, $6.6B), and $500M Series D (February 2026, $11B, Sequoia led). That is a 10x valuation increase in two years. Revenue grew ~175% year-over-year to $330M ARR by end of 2025, with ~400 employees organised into micro-teams of 5 to 10 people with no traditional titles or management hierarchy. The founders still personally interview every single hire. In the first half of 2025 alone, they conducted 3,200 interviews and hired 143 people across 39 countries. The company is no longer just a voice tool. Mati Staniszewski told TechCrunch in September 2025 that 'the real money isn't in voice anymore', signalling expansion into conversational AI agents and music as growth vectors. The $100M tender offer at $6.6B was a classic pre-IPO liquidity event. Sequoia Capital leading the Series D (with Andrew Reed joining the board) is a strong IPO signal. Staniszewski said in July 2025 the company 'would like to be ready for an IPO in about five years,' though more recent language suggests that timeline could accelerate. Both founders have crossed the billion-dollar mark in personal net worth according to Forbes.",
    roles: ["Full Stack Engineers (Frontend Leaning)", "ML Research Scientists", "Voice Agent Engineers", "Enterprise Sales", "Technical Recruiters", "Solutions Engineers"],
    rolesNote: "Remote first but have hubs in London and NYC. Founders interview everyone. Micro team structure means you'll have real ownership.",
    founder: {
      initials: "MS",
      name: "Mati Staniszewski",
      title: "CEO & Co-founder, ex Palantir",
      linkedin: "https://www.linkedin.com/in/matiii/",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQG0LNRBscpNzA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710763388152?e=1773273600&v=beta&t=ZWY5C3pwHE3F-LlEe7PJFLE_gsxJcQHW-zSBmwpyXas",
      hook: "Mati and Piotr met as teenagers at Copernicus High School in Warsaw. Mati has a First-Class Honours degree in Mathematics from Imperial College London. He founded Mathscon, a student-led maths conference that attracted 1,000+ students over three years. He worked in business intelligence at Opera Software, then product development at BlackRock and Palantir. Piotr studied Computer Science at Oxford (undergrad) and Cambridge (graduate). He published a thesis on AI-based image detection at NeurIPS that has 677 citations. He created Js2Py, an open-source project with over 2M downloads, before working as an ML engineer at Google. Both were named Forbes 30 Under 30 Europe 2024. They removed all titles from the company, no traditional management hierarchy. Mati has found hires in unusual places, including a researcher working at a call centre. He still personally interviews every candidate at 400+ employees. For Full Stack Engineers: The micro-team structure (5 to 10 people, no titles) means you will ship real product within your first week. Show you've worked in high-autonomy environments with minimal process. Reference specific products if you've used them, the Conversational AI platform, GenFM, or the Dubbing Studio. For ML Research Scientists: Piotr's NeurIPS background sets the bar. Reference specific voice AI research: speech synthesis architectures, voice cloning, emotional expressiveness in TTS, or multilingual prosody. If you've published at Interspeech, ICASSP, or NeurIPS, cite your work. For Enterprise Sales: ElevenLabs already has employees from 75% of the Fortune 500 using the platform. The opportunity is converting that bottoms-up usage into enterprise contracts. If you've run that playbook (PLG to enterprise) at a developer tools or SaaS company, that's the relevant experience.",
      avoid: "Generic AI enthusiasm. They've heard it all. Show you understand the specific technical or business challenges of voice: latency, expressiveness, multilingual support, enterprise deployment. Don't treat this as 'just a TTS company', they've expanded into agents, music, dubbing, and podcasts.",
    },
    cofounder: {
      name: "Piotr Dąbkowski",
      title: "CTO & Cofounder, ex Google ML",
      image: "https://media.licdn.com/dms/image/v2/C5603AQGl4tBRJF5ZAQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516930466249?e=1773273600&v=beta&t=th9pPiRQRNtV_Q23SeGf6sBbr0WeBrjXX6VwNG2r8kk",
    },
    signal: "Remote-first across 30+ countries with offices in New York (HQ, 169 Madison Ave), London (Wardour Street, European HQ), Warsaw, San Francisco, Berlin, and Tokyo. In H1 2025 they conducted 3,200 interviews and hired 143 people across 39 countries. Warm intro paths: Palantir alumni (Mati's background), Google ML alumni (Piotr's background), Sequoia portfolio, a16z portfolio (quadrupled down across four rounds), ICONIQ network. Their inaugural Summit in November 2025 (where Square, MasterClass, and the Hollywood voice partnerships were announced) is the company's emerging community event. Engaging with content from that event signals you follow the company closely. Matthew McConaughey is both a voice partner and an investor, which is unusual and signals Hollywood's buy-in.",
    careersUrl: "https://jobs.ashbyhq.com/elevenlabs/",
    featured: true,
  },
  {
    name: "PolyAI",
    tagline: "poly.ai · London + SF · Enterprise Voice Agents",
    website: "poly.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGmCIr__8aYiA/company-logo_200_200/company-logo_200_200/0/1697640572943/polyai_logo?e=1773273600&v=beta&t=iTFPWjG3o2Tn0y3jyKQ91zAXm-A9f_sd82skA7RKmok",
    videoId: "De-rjyUlNSQ",
    round: "Series D",
    amount: "$86M",
    detail: "$750M valuation, $200M+ total raised",
    investors: "Georgian, Hedosophia, Khosla Ventures, NVentures (Nvidia), Citi Ventures",
    hiringScore: 8,
    hiringReason: "2000+ live deployments, 45 languages, Fortune 500 clients",
    whatBuilding: "The phone call is the most important customer service channel that technology has consistently failed to improve. Despite decades of investment in Interactive Voice Response (IVR) systems, chatbots, and call centre automation, the experience of calling a large enterprise for help remains, for most people, a reliable source of frustration: long hold times, scripted systems that can't handle anything outside a narrow decision tree, and the eventual transfer to a human agent who has to be told everything from the beginning. The problem is not that enterprises haven't tried to automate it. The problem is that every previous generation of voice automation was built on rules \u2013 rigid, hand-crafted logic that broke the moment a caller deviated from the expected script.\nPolyAI was founded in 2017 by three Cambridge PhD researchers \u2013 Nikola Mrk\u0161i\u0107, Tsung-Hsien Wen, and Pei-Hao Su \u2013 who had spent years building the academic foundations of data-driven conversational AI at the University of Cambridge's Machine Intelligence Lab. Their specific insight was that the right approach to voice AI was not to build better rules but to build better models: AI systems trained on real conversational data that could handle the full messy, interrupted, accented, digressive reality of human telephone speech. Their platform's voice agents handle calls for Marriott, Caesars Entertainment, PG&E, UniCredit, Foot Locker, FedEx, and 100+ other enterprises across 45 languages and 25+ countries, managing over 500 million calls. The company's agentic AI does the work equivalent to 1,000+ full-time employees at multiple enterprises simultaneously.\nTheir flagship product, Agent Studio, launched in April 2025, is the platform layer that sits above the voice models. It gives enterprises full visibility into how their AI agents behave, why they respond the way they do, and how to tune their performance over time, including safety filters, tone calibration, vocabulary customisation, and real-time analytics. An enterprise can build a voice agent with a \"strong Texan accent\" (a real customer request, per Nikola) or fine-tune the system to handle a specific regulatory disclosure requirement in financial services. The platform is self-serve: enterprises can modify their agents without requesting changes from PolyAI, which dramatically reduces total cost of ownership and accelerates deployment. PolyAI deploys in as little as two weeks for a proof of value and two months for a full production rollout.\nThe Series D funding, announced December 15, 2025, will be used to expand Agent Studio's capabilities and accelerate go-to-market in North America, Europe, and new verticals beyond the company's current base in hospitality, financial services, healthcare, and retail.",
    whyMatters: "The $540B global customer service industry runs on a labour model that is structurally broken. Contact centre attrition rates average 30\u201345% annually in the US and regularly exceed 100% in markets with high competition for labour, meaning the average contact centre replaces its entire workforce every 12 months. Training costs, quality inconsistency, and the human cost of repetitive, high-pressure work compound into an industry that spends enormous resources simply maintaining baseline function. The Forrester Total Economic Impact study of PolyAI customers found a 391% ROI, with an average of $10.3M in savings per enterprise customer per year.\nBut voice AI's impact on customer service is only the first-order effect. Nikola Mrk\u0161i\u0107's more ambitious framing is the \"agentic enterprise\" where AI agents don't just handle inbound calls but proactively monitor the full customer and operational landscape in real time, detecting and resolving problems before human agents are even aware they exist. PG&E uses PolyAI (Peggy) to handle power outage calls at scale, including during peak emergency events when call volumes spike by orders of magnitude and human capacity is physically insufficient.\nThe regulatory dimension is significant and underappreciated. As voice AI handles increasingly consequential interactions across payment processing, medical appointment scheduling, financial account management, the requirements for accuracy, privacy, and auditability escalate. PolyAI has built its platform for enterprise-grade compliance from the ground up, which is part of why regulated industries are adopting it faster than consumer-grade voice AI alternatives. The Citi Ventures and Point72 Ventures participation in the Series D is a direct signal that financial services, one of the most compliance-intensive and highest-call-volume industries on earth, is a primary expansion target.\nThe competitive dynamic is an important context. Sierra Technologies (founded by ex-Salesforce CEO Bret Taylor) raised at a $10B valuation in September 2025. Decagon AI is also well-funded. PolyAI's specific differentiator is not that it is the only voice AI company but that it has been building voice-first, enterprise-grade conversational AI since 2017, has proprietary models trained on hundreds of millions of real enterprise calls, and has the deployment track record (100+ enterprise customers, 2,000+ live deployments) that new entrants will need years to replicate. The moat is the data flywheel: every call PolyAI handles makes its models more accurate, which wins more enterprise contracts, which generates more call data. That cycle has been running for eight years.",
    roles: ["ML Engineers (Speech/NLU)", "Backend Engineers (Python/Go)", "Solutions Architects", "Enterprise Sales (US expansion)", "Customer Success Managers", "Applied Scientists"],
    rolesNote: "Dual headquarters in London and SF. Actively expanding US presence. Enterprise sales roles likely need US based.",
    founder: {
      initials: "NM",
      name: "Nikola Mrkšić",
      title: "CEO & Co-founder, Cambridge ML PhD",
      linkedin: "https://www.linkedin.com/in/nikola-mrksic/",
      image: "https://cdn.sanity.io/images/u9ir40pr/production/cea6e4162f8fc0da70bc3a8cd43e6e1be2997c15-856x1124.png",
      hook: "The verified facts most people miss: Nikola was born in Belgrade in 1991, two months before Yugoslavia began to dissolve. He was a mathematics prodigy at a grammar school designed by Tito to rival Soviet academic output. He describes leaving that school 'basically doing undergrad-level maths.' He studied computer science and mathematics at Cambridge, where he met Professor Steve Young \u2013 a pioneer of statistical spoken dialogue systems \u2013 who recruited him to VocalIQ, the Cambridge spinout that Apple acquired in 2015 to improve Siri. Nikola was the first technical hire at VocalIQ Fundraise Insider and subsequently spent two years as a Machine Learning Researcher at Apple working on Siri before returning to Cambridge to complete his PhD and co-found PolyAI.\nThe Amadeus Capital interview (May 2025) contains the richest personal detail available on Nikola and is essential reading before outreach. He describes the early PolyAI customer development strategy: testing their system in London pubs, approaching people to try it. One guy said, 'I don't want to help AI. It's going to destroy us all.'\nCo-founder Tsung-Hsien Wen (CTO) did his PhD at Cambridge and worked at Google AI on deep learning for dialogue management. His academic papers on neural network-based dialogue systems are the technical foundation of PolyAI's models. Co-founder Pei-Hao Su (Chief Scientist) worked at Facebook AI Research on natural language generation. Both have published extensively \u2013 reading their Cambridge-era papers signals to the research team that you've done real homework.\nOutreach by Role \u2013 For Enterprise Account Executives: Nikola has been explicit that voice AI is no longer experimental \u2013 it is infrastructure. Your opening must reflect this. Don't frame PolyAI as an 'AI startup' to your prospects \u2013 frame it as a category-defining infrastructure provider for enterprise customer service. Before reaching out to Nikola or the sales leadership team, read PolyAI's 2025 research report on voice in customer service as it contains data on call channel usage that Nikola quotes directly in media appearances. Reference that specific data in your outreach. For US-based AEs: name the specific enterprise accounts you have relationships with, by industry. Hospitality and financial services contacts are the highest priority.\nFor Conversational AI / NLU Engineers: Reference PolyAI's ConveRT model \u2013 their pre-trained conversational representation model \u2013 and their published research from the Cambridge dialogue systems group. If you have papers or GitHub contributions in ASR, dialogue state tracking, or end-to-end spoken language understanding, link them directly. Nikola has been building in this space since 2015, superficial technical framing will be visible immediately. Reference a specific technical challenge in voice AI (accented speech recognition, real-time latency, contextual dialogue management) that you've personally worked on.\nFor Solutions Engineers: Reference a specific telephony integration you've completed such as, name the platform (Genesys, Avaya, Amazon Connect, Five9), the integration pattern (SIP trunk, WebRTC, REST API), and the deployment scale. PolyAI's competitive advantage includes its ability to deploy in two weeks \u2013 show that you can contribute to that pace specifically.\nFor Linguists: This is the most underserved route into the company. Reference specific phonology or prosody research \u2013 the study of speech rhythm and intonation, and connect it to how voice agents can be designed to feel more natural. If you have experience with accent variation in specific languages, name them. PolyAI supports 45 languages and is expanding, so language-specific voice design expertise is directly relevant.",
      avoid: "Treating voice as 'just another AI modality'. PolyAI has been doing production voice for 7 years. They've seen every failure mode. Show you understand why voice is hard.",
    },
    cofounder: {
      name: "Shawn Wen",
      title: "CTO & Co-founder",
      image: "https://cdn.sanity.io/images/u9ir40pr/production/b1fedf4b8a6524d52c02d84d88a590f1d4e7fbc9-450x600.jpg",
    },
    signal: "The Cambridge academic pipeline: PolyAI was spun out of Cambridge's Machine Intelligence Lab and all three founders did their PhDs there. The research group, led by Professor Steve Young's successors, is still the primary talent pipeline. If you are a current Cambridge PhD student or recent graduate in dialogue systems, NLU, or speech processing, you are the single most warm candidate this company sees. Email the research team directly, not through the jobs page.\nThe Zendesk Ventures signal: Zendesk invested in this round as a strategic partner. This means PolyAI is building deep integrations with Zendesk's enterprise customer service platform. If you have Zendesk platform experience, either as an admin, developer, or solutions architect, that is a warm angle into a commercial partnership or solutions engineering role that most applicants won't have thought about.\nThe published PolyAI research report: Nikola references PolyAI's proprietary research on voice channel usage in customer service in multiple media appearances. Finding this report (it's on the PolyAI website and has been cited in press coverage), reading it thoroughly, and referencing a specific data point in your outreach immediately signals that you've done more work than 95% of applicants. Most candidates will read the press release. Read the research.\nThe employee to find: CTO Tsung-Hsien Wen is the most technically rigorous of the three co-founders and leads the engineering and research hiring. His academic papers are on Google Scholar. Reading his most recent published work and referencing a specific finding, not just 'I read your work' but a substantive observation, is the warmest possible cold outreach to the technical team. For commercial roles, look for PolyAI's VP of Sales or Head of Enterprise (the person filling this role is the hiring manager for AE roles and is less approached than the founders).\nThe attrition argument: PolyAI's primary commercial argument to enterprise customers is that they eliminate the 30\u201345% annual contact centre attrition cycle. If you have ever managed a contact centre, worked in workforce management, or analysed attrition data in a customer service context, you have a direct experiential understanding of the problem PolyAI solves, and that lived experience is worth more in a sales or solutions role than any technical credential. Lead with that story.",
    careersUrl: "https://poly.ai/careers",
  },
  {
    name: "Goodfire",
    tagline: "goodfire.ai · San Francisco · AI Interpretability",
    website: "goodfire.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGngqASFV71cQ/company-logo_200_200/B4EZW54COnGwAM-/0/1742580229457/goodfire_ai_logo?e=1773273600&v=beta&t=sc3JOCIzDnl-eFJUMdQKbru05-nFdl5Hg7z-iIZ5Jow",
    videoId: "5KhYF-yVPtk",
    round: "Series B",
    amount: "$150M",
    detail: "$1.25B valuation, $209M total raised",
    investors: "B Capital (lead), Juniper, Menlo, Lightspeed, Salesforce Ventures, Eric Schmidt",
    hiringScore: 8,
    hiringReason: "Raised $150M less than a year after Series A, scaling research team",
    whatBuilding: "Every neural network in existence today is, at its core, a black box. You put data in. You get output out. What happens in between \u2013 the billions of mathematical operations that transform a question into an answer, a prompt into a policy decision, a scan into a cancer diagnosis \u2013 is functionally invisible, even to the researchers who built it. The standard engineering response to this has been to treat it as an acceptable limitation: run more tests, add more safeguards, fine\u2013tune on better data, and hope the outputs stay within acceptable bounds. That approach, naturally, is breaking down. Goodfire's thesis is that this opacity is not a fundamental property of neural networks but an engineering gap that can be closed. The science they're built on is called mechanistic interpretability: the practice of reverse\u2013engineering neural networks to understand what is actually happening inside them, at the level of individual neurons, circuits, and features. The breakthrough that made this commercially viable is the Sparse Autoencoder (SAE): a technique for decomposing the tangled, overlapping activations of neural network neurons into individual, human\u2013readable concepts. Goodfire's product, Ember, is the first hosted API that gives developers programmatic access to this capability at scale, i.e., developers can directly access and influence an AI model's internal workings to understand, debug, and safely steer its behavior. It ships as an API wrapper around large language models, currently supporting Llama 3 and other open models, that lets engineers inspect which internal features are activating during a model's reasoning, intervene on those features directly, and measure the precise behavioural effect of each intervention. The company has already demonstrated several real applications: cutting hallucinations in a large language model by nearly half by directly suppressing the internal features associated with confabulation; identifying a novel class of Alzheimer's biomarkers by reverse\u2013engineering an epigenetic foundation model built by Prima Mente \u2013 the first major scientific finding obtained by interpreting a foundation model's internals rather than just its outputs; and improving safety benchmark scores for enterprise customers including Rakuten, Apollo Research, and Haize Labs. Their Series B funding, announced February 5, 2026 (less than 18 months after founding) will be used to build what they call a 'model design environment': a full platform for understanding, debugging, and intentionally designing AI models from the inside out. The phrase Eric Ho uses to describe the ambition: moving from growing AI 'like a wild tree' to shaping it 'like bonsai.' MIT Technology Review named mechanistic interpretability one of the 10 Breakthrough Technologies of 2026, and Goodfire is the company most directly commercialising that breakthrough.",
    whyMatters: "The history of engineering is a history of fields that were transformed when practitioners stopped treating their medium as a black box and started understanding it from first principles. Steam engineers built more powerful engines for decades before thermodynamics gave them the science to understand why steam behaved the way it did and how to design engines rather than just iterate on them. Geneticists bred crops and mapped hereditary traits for a century before understanding DNA and once they understood DNA, the entire discipline of bioengineering became possible. Eric Ho makes this analogy explicitly and it is not rhetorical flourish: it is the actual structure of what is happening in AI right now. The black\u2013box approach to AI development of training large models on vast data, evaluating outputs, adjusting training, repeat, has produced remarkable results and will continue to do so. But it is fundamentally a trial\u2013and\u2013error process applied to a system no one fully understands. The consequences of that opacity are becoming acute in three specific ways that are driving commercial demand for interpretability tools. First, enterprise deployment risk: 47% of organisations deploying AI in 2025 reported at least one negative consequence from that deployment, and the primary reason cited is unpredictable model behaviour that could not be diagnosed or fixed. When an AI model produces a harmful output, biased decision, or compliance violation, the current tools for diagnosing why it happened are rudimentary \u2013 the equivalent of trying to debug software by only looking at the program's final output. Ember gives enterprises a structured way to find the specific internal mechanism responsible and intervene on it directly. Second, regulatory pressure: the EU AI Act, which activates its highest\u2013risk provisions in August 2026, requires that AI systems making consequential decisions \u2014 in credit, healthcare, hiring, law enforcement \u2014 be auditable. The current state of AI does not meet this requirement. Goodfire's interpretability layer is one of the few technically credible paths to AI systems that can be audited at the mechanistic level, not just evaluated on benchmarks. Third, and most consequentially in the long run: as AI models surpass human understanding in specific scientific domains \u2013 protein folding, drug discovery, materials science, genomics \u2013 the models themselves contain knowledge that cannot be extracted through normal interfaces. Asking an AI what it knows about Alzheimer's biomarkers only surfaces what it can articulate in language. Reverse\u2013engineering what it has actually learned, for example, the internal representations it uses to make predictions that no human has thought of, extracts knowledge that is genuinely novel. Goodfire has done this once already, with the Alzheimer's biomarker discovery. If the technique generalises, the downstream implications for medicine and science are extraordinary.",
    roles: ["Interpretability Researchers", "ML Engineers", "Research Engineers", "Applied Scientists", "Enterprise Partnership leads"],
    rolesNote: "Deep research focus. They want people who've published or have serious ML engineering chops. Not a place for AI tourists.",
    founder: {
      initials: "EH",
      name: "Eric Ho",
      title: "CEO & Cofounder, ex RippleMatch founder, Forbes 30u30",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEmSpZ4d5KXTw/profile-displayphoto-scale_200_200/B56Zv.BYzMKkAY-/0/1769493336010?e=2147483647&v=beta&t=iDt4ou_DrTltiMTOtY_rlS_ApTxx9JoLNp7bv5iN4kM",
      linkedin: "https://www.linkedin.com/in/eric-ho-53981862/",
      hook: "Eric Ho is Yale\u2013educated and previously co\u2013founded RippleMatch, a campus recruiting platform that grew to over $10M ARR and connected more than 4 million students with employers. He sold or stepped back from the company in 2022 specifically to focus on AI safety and interpretability. On X, he posted in 2023: 'Today was my last day at xAI, the company that I helped start with Elon Musk in 2023.' This is a significant and often\u2013overlooked detail: Eric briefly co\u2013founded xAI before leaving to start Goodfire, which suggests both that he has elite\u2013level access to the AI frontier and that he made a deliberate choice to pursue interpretability over raw capability scaling. His Sequoia podcast appearance is one of the most accessible and intellectually rich interviews he's done, required listening before outreach. In the same interview, he publicly predicted that neural networks will be fully decodable by 2028. Co\u2013founder Tom McGrath is the scientific anchor. He founded the interpretability team at Google DeepMind and is a co\u2013author of the foundational 'Open Problems in Mechanistic Interpretability' paper. Reading that paper before reaching out to anyone on the research team is non\u2013negotiable. Co\u2013founder Lee Sharkey was the key early adopter and developer of the use of Sparse Autoencoders in language models which is the core technical breakthrough that makes Ember possible. His alignment forum post 'Sparsify: A Mechanistic Interpretability Research Agenda' is the clearest articulation of the research direction. For Interpretability Researchers: The single most effective thing you can do before reaching out is post publicly about mechanistic interpretability on the Alignment Forum, LessWrong, or arXiv. The Goodfire team is deeply embedded in this community and monitors it actively. If you have published work or public writing, link it in your first message. Reference Tom McGrath's 'Open Problems in Mechanistic Interpretability' paper specifically and identify which open problem your work addresses. If you've used Ember, describe a specific finding you made with it. Eric has said he is looking for people who understand 'the engineering lift', frame your experience in terms of what you've built at scale, not just what you've studied. For ML Infrastructure Engineers: Reference Eric's X post about engineering scale explicitly. Describe the largest\u2013scale experiment infrastructure you've built, for example, number of GPUs, experiment throughput, parallelisation strategy. If you've worked on anything adjacent to model activation logging, feature extraction pipelines, or interpretability tooling, that's the most relevant background. Show your GitHub prominently. For Enterprise Solutions Engineers: Reference Goodfire's Ember API documentation and describe a specific enterprise use case where interpretability would have changed a decision. Background in AI governance, model auditing, or EU AI Act compliance preparation is a genuine differentiator, like regulatory compliance is an explicit commercial driver for Goodfire's enterprise customers. For Life Sciences Candidates: Reference the Alzheimer's biomarker paper directly. If you have a biology, genomics, or clinical AI background, frame your outreach around the specific scientific domain where you believe interpretability could surface hidden knowledge. Patrick Hsu's Arc Institute and the Mayo Clinic partnership are the public reference points \u2013 if you have connections or experience in either ecosystem, name them.",
      avoid: "Positioning yourself as a generalist ML engineer. They want deep expertise in interpretability or adjacent areas. This is a research lab, not a product company.",
    },
    cofounder: {
      name: "Tom McGrath",
      title: "Chief Scientist, ex DeepMind Interpretability founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEUxh2ihnFk-A/profile-displayphoto-shrink_400_400/B4EZZE3.7EG0Ag-/0/1744912248799?e=1773273600&v=beta&t=E6vDRSis8wtHNXN3yGDGBRLlEJWDjhMsGhEUm9SRsFM",
      linkedin: "https://www.linkedin.com/in/tom-mcgrath-7337bb151/",
    },
    signal: "The open\u2013source entry point: Goodfire has open\u2013sourced its Sparse Autoencoder interpreters. The best non\u2013application path into the company is to fork the repo, run experiments on your own models, and share your findings publicly on the Alignment Forum, arXiv, or X. This is exactly how Goodfire's own team built their reputations, and Eric monitors this community directly. A well\u2013written public post that uses Goodfire's tools and cites their papers is worth more than a cold email. The community shortcut: The mechanistic interpretability research community is small and tight\u2013knit. The key gathering point is the MATS (ML Alignment Theory Scholars) programme \u2013 several Goodfire researchers went through it or supervise it. Attending MATS, applying for ARENA (the AI safety training programme), or engaging with Neel Nanda's TransformerLens community puts you in direct contact with the researchers who hired the Goodfire team. The B Capital signal: The Series B was led by B Capital with Eric Schmidt and Salesforce Ventures joining. Salesforce Ventures specifically signals that enterprise CRM and workflow AI is a target market for Ember. If you have Salesforce ecosystem experience combined with any ML background, that combination is unusual and directly relevant to an underserved hiring need. The employee to find: Search LinkedIn for 'Goodfire' and look specifically for researchers who transitioned from Anthropic's interpretability team or from MATS cohorts. These individuals are the natural referral network, engaging with their published work before requesting a referral is the warmest path in.",
    careersUrl: "https://www.goodfire.ai/careers",
  },
  {
    name: "Simile",
    tagline: "simile.ai · Bay Area + NYC · Human Behavior AI",
    website: "simile.ai",
    logo: "https://simile.ai/icon.png",
    videoId: "_7FuglsjhbM",
    round: "Series A",
    amount: "$100M",
    detail: "Stanford spinout, Index Ventures led, Feb 12",
    investors: "Index Ventures (lead), Bain Capital Ventures, Fei-Fei Li, Andrej Karpathy",
    hiringScore: 8,
    hiringReason: "Just emerged from stealth with $100M, building founding team",
    whatBuilding: "In 2023, a Stanford PhD student named Joon Sung Park populated a virtual town with 25 AI agents \u2013 each given a biography, a daily routine, and the ability to remember, reflect, and initiate conversations with each other. The agents planned a Valentine's Day party. They ran for mayor. They gossiped. They went to work and came home. The simulation was so behaviourally realistic it won the Best Paper award at UIST 2023 (the top human\u2013computer interaction conference) and was covered by the New York Times, The Guardian, Nature, Science, and PC Gamer. Simile is the commercial version of that research. The product: a foundation model for human behaviour simulation that can represent real individuals based on their actual memories, preferences, and decision patterns from deep interview data, and predict how they will behave in response to decisions, products, campaigns, or policies. It constructs a simulation agent \u2013 a computational representation of that specific individual that can be queried about how they would respond to situations they've never encountered. Ask it whether they'd switch banks if the interest rate changed by 0.5%. Ask it how they'd react to a packaging redesign. Ask it how they'd vote if a candidate changed their position on a specific policy. The agent doesn't retrieve a stored answer. It reasons from the individual's documented psychology to generate a response consistent with how that person actually thinks. Scale this to thousands of agents simultaneously, weight the panel to match demographic distributions, and you have something that has never existed before: a research panel that can be queried in minutes rather than weeks, that doesn't suffer from survey response bias, that can be run hundreds of times on different versions of the same question without fatigue effects, and that costs a fraction of a traditional study. CVS Health is using this to make product stocking decisions across 9,000+ stores \u2013 simulating how different customer segments will respond to shelf changes before committing to them across an estate that would cost millions to revert if the decision was wrong. Wealthfront runs simulated investor panels to stress\u2013test how their customers would react to different market scenarios and communication strategies. The Gallup partnership, currently in waitlist phase, will extend this to political and social research polling.",
    whyMatters: "Market research is a $140B+ global industry built on surveys, focus groups, and expert intuition. It is slow, expensive, demographically biased (surveys over\u2013represent people who respond to surveys), and can't be run at the pace of modern product development. The basic unit of market research is the survey: a set of questions, administered to a sample of respondents, producing aggregate statistics that are used to make decisions about products, policies, campaigns, and resource allocation. The problems with this approach are chronic and well\u2013documented. Surveys over\u2013represent people who respond to surveys, a demographic that is systematically different from the population being studied. Response rates have collapsed over the past two decades, from around 35% in the 1990s to under 6% for many online panels today, making sampling bias an increasingly serious validity concern. And the cost \u2013 $50,000 to $500,000 for a serious quantitative study means that most questions never get researched at all, because the budget doesn't exist to answer them. Simile's approach includes training simulation agents on real interview data from real people and sidesteps all of these problems. The November 2024 paper showed that agents simulating 1,052 real people matched those individuals' actual survey responses with 85% accuracy \u2013 comparable to those individuals re\u2013taking the same survey two weeks later. That's not synthetic data. That's a statistically valid stand\u2013in for the real person. Simile collapses the cost and time of that process by an order of magnitude. A study that currently takes six weeks and $200,000 can be run on simulated agents in 48 hours for a fraction of the cost, and iterated on in real time as the question evolves. The implications cascade across every industry that currently uses market research which is effectively every large organisation in the world. A pharmaceutical company can simulate patient responses to different drug packaging and dosing instructions before a clinical trial. A government policy team can model how different demographic groups will respond to a regulatory change before it is implemented. A financial institution can stress\u2013test customer reactions to a fee change across thousands of simulated account holders before deciding whether to proceed. The investor signal here is unusually strong. Andrej Karpathy (who coined 'vibe coding,' co\u2013founded OpenAI, and built Tesla Autopilot) and Fei\u2013Fei Li (who created ImageNet, defined computer vision research, and co\u2013founded World Labs) are not investing in this for financial returns at this stage but endorsing the scientific validity of the approach.",
    roles: ["ML Research Scientists (agents/simulation)", "Behavioral Scientists", "Full Stack Engineers", "Enterprise Sales", "Product Managers"],
    rolesNote: "Research grade bar. Read both the original Generative Agents paper (arXiv 2304.03442) and the 1,000 People follow up (arXiv 2411.10109) before applying. For ML roles: reference agent memory systems, reflection architectures, LLM reasoning. For behavioural science: GSS methodology, Big Five, survey design. For enterprise sales: reference insights teams at CVS, Wealthfront, Gallup, or Suntory.",
    founder: {
      initials: "JP",
      name: "Joon Sung Park",
      title: "CEO & Cofounder, Stanford PhD, GitHub: joonspk research",
      image: "https://joonsungpark.s3.amazonaws.com/static/img/collaborators/joonsung_park.jpg",
      linkedin: "https://www.linkedin.com/in/joon-sung-park/",
      hook: "Joon's generative agents GitHub repo has been forked and starred hundreds of thousands of times, it's one of the most influential open\u2013source AI projects of the last three years. The repo's README contains a personal note that 'all locations featured in Smallville (the simulated town) are inspired by real\u2013world locations that Joon has frequented as an undergraduate and graduate student.' It's a small, human detail that reveals a thoughtful, grounded researcher. Joon gave a TED Talk on simulation of human reality (now live on TED's website). He taught a Stanford CS course in Fall 2024 on 'simulating individuals and their societies' from agent\u2013based modelling foundations through generative agents. He also co\u2013organised workshops at UIST 2023 and EACL 2024. His Google Scholar cites are almost 16,000, remarkable for a researcher who is still in his PhD/early career phase. For AI / Agents Researchers: You must read both the original generative agents paper and the follow\u2013up 'Generative Agent Simulations of 1,000 People' before making contact. The second paper is more directly relevant to Simile's commercial product \u2013 it introduces the interview\u2013based agent architecture and describes the 85% accuracy result on the General Social Survey. If you have a GitHub repo with relevant agent architecture work, link it. If you have publications on multi\u2013agent systems, LLM\u2013based simulation, or social computing, cite them. The hiring bar here is explicitly research\u2013grade. For Behavioural Scientists: Joon's work explicitly bridges social science and AI. Reference specific methodology you've used in survey research, experimental economics, or computational social science. The General Social Survey and Big Five Inventory are the ground\u2013truth benchmarks in the '1,000 People' paper \u2013 familiarity with these instruments signals domain credibility. For Enterprise Sales: Simile's customers are market research teams at Fortune 500 companies like CVS Health, Wealthfront, Suntory. Reference specific enterprise analytics or research tools you've sold into these buying centres (insights teams, consumer research, strategy). The Gallup partnership signals the company is pursuing the polling/research industry specifically.",
      avoid: "Treating this as 'just another LLM wrapper.' The November 2024 paper shows 85% accuracy on real human prediction. That's rigorous social science meets ML. Come prepared or don't come. Don't skip the papers.",
    },
    cofounder: {
      name: "Percy Liang",
      title: "Co-founder, Stanford CS Professor, coined 'foundation model', runs CRFM",
    },
    signal: "Chief Scientist Percy Liang is the intellectual anchor of Simile's scientific advisory \u2013 he's one of the most cited NLP researchers alive, co\u2013founder of Together.ai, and the person who coined 'foundation model.' Engaging with Percy's published work (HELM benchmark, CRFM at Stanford) before outreach to Joon positions you as someone who has read the full research ecosystem. CPO Michael Bernstein is a Stanford CS professor and active publisher \u2013 his HCI research lab has students who are the natural pipeline for product and research roles. The most effective non\u2013founder path in is through Stanford's CS and HCI departments.",
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

function StartupCard({ startup, index, plan, onFocus }: { startup: Startup; index: number; plan: Plan; onFocus?: () => void }) {
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
        {startup.heroImage && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <img
              className="w-full"
              src={startup.heroImage}
              alt={`${startup.name} intro`}
            />
          </div>
        )}

        {/* Focus mode button */}
        {onFocus && (
          <button
            onClick={onFocus}
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 text-sm text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            Focus mode
          </button>
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

      </div>
    </div>
  );
}

function FocusOverlay({ startup, index, plan, onClose }: { startup: Startup; index: number; plan: Plan; onClose: () => void }) {
  const canSeeOutreach = plan === "edge" || plan === "concierge";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Apple-style cubic bezier: slow start, gentle decelerate
  const appleEase = [0.16, 1, 0.3, 1] as const;
  const stagger = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.05, duration: 0.7, ease: appleEase } });

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: appleEase } }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.36, 0, 0.66, 0] } }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: appleEase } }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.36, 0, 0.66, 0] } }}
      />

      {/* Content */}
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: appleEase } }}
        exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.4, ease: [0.36, 0, 0.66, 0] } }}
      >
        {/* Sticky header */}
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
          {/* Featured badge */}
          {startup.featured && (
            <motion.div {...stagger(0)} className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                Big Round
                <img src={cdn("/logo.webp")} alt="" className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          )}

          {/* Header */}
          <motion.div {...stagger(1)}>
            <p className="text-xs text-neutral-400 mb-2">{String(index + 1).padStart(2, "0")} of 12</p>
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

          {/* Funding */}
          <motion.div {...stagger(2)} className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              {startup.amount} {startup.round}
            </span>
            <span className="text-sm text-neutral-500">{startup.detail}</span>
          </motion.div>

          {/* Investors & Hiring */}
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

          {/* Video / Image */}
          {(startup.videoId || startup.videoUrl || startup.heroImage) && (
            <motion.div {...stagger(4)} className="mb-8">
              {startup.videoId && (
                <div className="rounded-xl overflow-hidden">
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
                <div className="rounded-xl overflow-hidden">
                  <video className="w-full aspect-video" src={startup.videoUrl} controls playsInline />
                </div>
              )}
              {startup.heroImage && (
                <div className="rounded-xl overflow-hidden">
                  <img className="w-full" src={startup.heroImage} alt={`${startup.name} intro`} />
                </div>
              )}
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            className="h-px bg-neutral-100 mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
            style={{ transformOrigin: "left" }}
          />

          {/* What they're building */}
          <motion.div {...stagger(5)} className="mb-10">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">What they're building</p>
            <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.whatBuilding}</p>
          </motion.div>

          {/* Why it matters */}
          <motion.div {...stagger(6)} className="mb-10">
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">Why this matters</p>
            <p className="text-neutral-700 leading-[1.8] text-[16px]">{startup.whyMatters}</p>
          </motion.div>

          {/* Roles */}
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

          {/* Founder outreach - respects plan gating */}
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
                <p className="text-neutral-700 leading-[1.8] text-[16px] mb-4">{startup.founder.hook}</p>
                <p className="text-neutral-500 leading-[1.8] text-[15px]"><span className="font-medium text-neutral-700">Avoid:</span> {startup.founder.avoid}</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <div className="bg-neutral-50 rounded-xl p-5 border border-dashed border-neutral-200 select-none pointer-events-none" style={{ filter: "blur(6px)" }} aria-hidden="true">
                  <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-3">How to reach out</p>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-rose-400" />
                      <div>
                        <p className="font-medium text-neutral-900">Firstname Lastname</p>
                        <p className="text-xs text-neutral-500">CEO, ex Google DeepMind, MIT PhD</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">This founder has a unique background in machine learning and previously led a core infrastructure team at a major AI lab. Best approach is to reference their recent paper or their talk at the AI conference last month. They respond well to technical depth.</p>
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

          {/* Signal - respects plan gating */}
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
                    <p className="text-sm text-neutral-600 leading-relaxed">The quieter door in: reach out to early employees on LinkedIn first. Engage with their technical posts. The CTO is the hiring lens for engineering roles. They've been on podcasts about their approach which is the most detailed account of their thinking.</p>
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

function CommandK({ onClose, onSelect }: { onClose: () => void; onSelect: (index: number) => void }) {
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

  const filtered = startups
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.6 }}
      >
        {/* Search input */}
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

        {/* Results */}
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

        {/* Footer hint */}
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

  // Cmd+K shortcut
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
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
              <p className="text-xs text-neutral-400">Feb 18, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            12 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$2.1B+ total this week</p>
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

        {/* Stats */}
        <div className="bg-white/95 backdrop-blur rounded-2xl border border-neutral-200 grid grid-cols-3 divide-x divide-neutral-200 mb-8">
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">12</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Startups</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$2.1B+</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">5</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Unicorn rounds</p>
          </div>
        </div>

        {/* This week's signal */}
        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
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
            <div key={startup.name} id={`startup-${index}`} className="transition-all duration-500 rounded-2xl">
              <StartupCard startup={startup} index={index} plan={plan} onFocus={() => setFocusedIndex(index)} />
            </div>
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

        {/* Upgrade CTA - only show to non-edge users */}
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

        {/* Footer */}
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
          <CommandK onClose={() => setCmdkOpen(false)} onSelect={scrollToStartup} />
        )}
      </AnimatePresence>
      <ScrollToTop />
    </main>
  );
}
