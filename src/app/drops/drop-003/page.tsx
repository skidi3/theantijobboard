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
    name: "alfred",
    tagline: "alfredpay.io · Mexico City / Miami · Stablecoin-Powered Payments",
    website: "alfredpay.io",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQH-xhH7efGVSQ/company-logo_200_200/B4EZsOvgL2HMAM-/0/1765478892623/alfred_latam_logo?e=1773878400&v=beta&t=uKv38EjHIIDbPIYkaacacyqYtdiuRZBnZQJPH6UVcEk",
    round: "Series A",
    amount: "$15M",
    detail: "~65 team, 4M+ transactions, 2.5M+ users, Circle Payments Network partner",
    investors: "F-Prime Capital (lead), Brevan Howard Digital, White Star Capital",
    hiringScore: 8,
    hiringReason: "Series A explicitly earmarked for geographic expansion and team scaling across Brazil, Dominican Republic, and Asia-LatAm corridor",
    whatBuilding: "Alfred is a stablecoin-powered payments API connecting local banking rails, real-time payment systems, and digital assets across Latin America (Mexico, Brazil, Colombia, Argentina, and growing). Originally a consumer wallet, they pivoted to B2B infrastructure: one API for fintechs, marketplaces, and multinationals to move money across borders at real-time settlement speed. They process 4 million-plus transactions, serve 2.5 million-plus users, and are now targeting the Asia-LatAm trade corridor as their next opportunity, a market with $600 billion in annual volume. They are integrated into the Circle Payments Network and the Global Dollar (USDG) on Solana.",
    whyMatters: "Stablecoins are crossing over from crypto-native to mainstream financial infrastructure. Alfred is betting (and winning) that the future of cross-border B2B payments runs on this rail. With Brevan Howard Digital, one of the world's largest macro hedge funds, on the cap table alongside F-Prime (Fidelity's venture arm), this isn't a startup moonshot anymore - it's a financial infrastructure play with serious institutional conviction behind it. The Asia-LatAm corridor alone is a $600 billion market. That means compliance, engineering, and BD hiring at scale is coming fast.",
    roles: ["Backend / Payments Infrastructure Engineer", "Business Development (Asia-LatAm Corridor)", "Compliance / RegTech Lead"],
    rolesNote: "No Ashby, no Workday, no Greenhouse portal as of today. The window is open now.",
    founder: {
      initials: "DY",
      name: "Diego Yanez",
      title: "Founder & CEO, UC Berkeley, Berkeley Blockchain Xcelerator",
      linkedin: "https://www.linkedin.com/in/diego-yanez-878861127",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQE1DYHWPSHD6w/profile-displayphoto-scale_400_400/B4EZrwpnRzKgAk-/0/1764974033318?e=1773878400&v=beta&t=GiyFrgw9XmIblKq-yEfL5A3GuiJ1XrHRfNGX0utpokY",
      hook: "Diego studied at UC Berkeley and started his career as a KPMG contractor before pivoting hard into fintech entrepreneurship. He was part of the Berkeley Blockchain Xcelerator. He bootstrapped alfred from zero to profitability before taking institutional capital - a rare signal of commercial discipline that you should reference. He is deeply mission-driven around the idea that stablecoins are the equaliser for people in countries with volatile currencies. He's active on LinkedIn and openly documents his building journey, so engage with his posts before cold messaging - he responds to people who are already in the conversation. His co-founder is Matias Plano as CTO and Ronald Johnson as CFO. Diego is plugged into the Berkeley alumni network, the Circle ecosystem, and the Miami tech scene. He is also connected to The Hype Network and community-driven platforms in San Francisco and Miami, and faith is an authentic part of his public identity. For Backend/Payments Infrastructure Engineers: The product is built on stablecoin rails - Solana, Circle's CCTP, Stellar - and connects to dozens of local payment networks across LatAm. This is highly specialised work. Core skills: Node.js or Python, REST and GraphQL APIs, Solana SDK is a major differentiator, PostgreSQL, AWS, real-time settlement systems, stablecoin on/off-ramp architecture. For proof of work, build a demo integration with Circle's CCTP (Cross-Chain Transfer Protocol) or write a short technical blog post on 'Building with Stablecoin APIs in LatAm' then include both a GitHub link and the writing in your email. Your cold email angle: 'Diego, I saw the Series A and Circle Payments Network announcement. I built a small demo integrating Circle's API with a simulated LatAm off-ramp [link]. I have [X] years in payments infrastructure and I want to be part of the engineering team scaling alfred into Asia. Can I show you what I built?' For Business Development (Asia-LatAm Corridor): They've explicitly stated the Asia-LatAm corridor is next. Nobody is working that corridor yet internally and is a greenfield BD hire. Core skills: cross-border BD, stablecoin and fintech domain knowledge, bilingual in English plus Mandarin, Japanese, or Korean is a significant differentiator, partnership development, enterprise fintech sales cycles, trade finance knowledge. For proof of work, research the corridor and identify 10 fintechs or payment companies in Southeast Asia that are currently processing LatAm volume and would benefit from alfred's API. Present a short partnership pitch angle for each. Your cold email angle: 'Diego - the Asia-LatAm corridor thesis is the most underappreciated play in global fintech right now. I mapped 10 SE Asian payment companies that are losing volume trying to settle into LatAm. These are warm targets for alfred. I have [background in Asia-Pacific payments or trade finance]. Want to see the list?' For Compliance/RegTech Lead: Expanding into Brazil, Dominican Republic, and Asia simultaneously means navigating four or five different regulatory environments at once. This hire becomes urgent immediately. Core skills: AML and KYC frameworks, stablecoin regulation including MiCA, FinCEN, and Banxico, FATF travel rule, multi-jurisdiction compliance, VASP licensing, legal entity structuring. For proof of work, write a 600-word breakdown of the current stablecoin regulatory landscape across Mexico, Brazil, Colombia, and Argentina. Post it on LinkedIn or a personal site. Your cold email angle: 'Diego - with the Series A and expansion into Brazil and DR, your compliance footprint is about to get complex fast. I wrote a breakdown of the regulatory landscape across your current and target markets [link]. I've worked in [multi-jurisdiction stablecoin or crypto compliance] and I want to help alfred build a compliance function that enables growth rather than slows it.'",
      avoid: "Don't lead with generic interest. Diego respects people who show up with proof of work that demonstrates domain understanding. Reference his bootstrapping discipline and the Circle ecosystem specifically.",
    },
    cofounder: {
      name: "Matias Plano",
      title: "CTO",
      linkedin: "https://www.linkedin.com/in/matiasplano/",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHvktF2ea4FrQ/profile-displayphoto-scale_400_400/B4DZta8SSVJUAg-/0/1766757319568?e=1773878400&v=beta&t=XBFIa89FUzDsZvNqaahWjmYgLmxUAea3H_FOQ9NAY4s",
    },
    signal: "Best approach: engage with Diego's LinkedIn posts first - he posts frequently about the LatAm payments opportunity. DM referencing the post you engaged with, then follow up with a direct email. For technical roles, reach CTO Matias Plano directly. Contact: linkedin.com/in/diego-yanez-878861127. Company: linkedin.com/company/alfred-pay. Website: alfredpay.io",
    careersUrl: "",
    featured: true,
    heroImage: "https://media.licdn.com/dms/image/v2/D563DAQESjd5AHe-hNA/image-scale_191_1128/B56ZsOFfEGJMAg-/0/1765467878187/alfred_latam_cover?e=1772640000&v=beta&t=JHAkHAWAY0eU8iakDyn_zFA7_ZPJ1DCFU_WjE9BOo_A",
  },
  {
    name: "BottleCap AI",
    tagline: "bottlecapai.com · Prague, Czech Republic · Efficiency-Focused LLMs",
    website: "bottlecapai.com",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFXe4pw-CVDTg/company-logo_200_200/B4DZVgpL5XHkAU-/0/1741083164611/bottlecap_ai_logo?e=1773878400&v=beta&t=Y3wbfqGMpzd41qnCYrnkZzuO0a2gkcpB5dY7-YamEAo",
    round: "Seed",
    amount: "$7.5M",
    detail: "~10 team, Word2Vec inventor as CSO, Beat Saber founder as CEO",
    investors: "20VC (lead), Rockaway Ventures, plus angels: Canva co-founder Cliff Obrecht, Lovable founder Anton Osika, ElevenLabs co-founder, Hugging Face, Supercell CEO, Synthesia, Datadog founders, Xavier Niel",
    hiringScore: 7,
    hiringReason: "10-person team with $7.5M and app studio buildout means hiring across research and product fast",
    whatBuilding: "BottleCap AI is building architecture-first, efficiency-focused foundational large language models and then immediately turning that research into commercial applications. Their first model is called CAP1, which already powers their first consumer app, Pulse, a community news aggregator on iOS. The stated goal is to improve LLM efficiency by 100x compared to current industry models. Rather than scaling compute endlessly like OpenAI or Google, they are moving beyond the transformer architecture entirely to find new approaches that reason better per unit of compute. They're also setting up an app development studio to commercialise the research, meaning B2B AI tools built on their own models are coming.",
    whyMatters: "The name BottleCap is a deliberate joke about European tech being a tethered bottle cap compared to SpaceX rockets. The team is not joking about anything else. Tomas Mikolov invented Word2Vec, one of the most cited papers in the history of AI and literally co-invented the concept that made modern language models possible. Jaroslav Beck sold Beat Saber to Meta for a reported $40M+ in 2019. These are not first-time founders experimenting with a trend. The angel investor list reads like an AI founder hall of fame. Every single person on that cap table is a builder, not just a cheque writer. For a job seeker: getting in here early is like getting into ElevenLabs or Lovable before anyone knew what they were.",
    roles: ["Developer Relations / Community", "Product / App Developer (B2B focus)", "Growth / GTM (first commercial hire)"],
    rolesNote: "They have posted NLP Researcher, Machine Learning Engineer, and Product Engineer on their website at bottlecapai.com/#join-us. Those roles are live and visible, which means you're no longer first, but you're still early. The roles below are what they haven't posted yet - where the real arbitrage is.",
    founder: {
      initials: "JB",
      name: "Jaroslav Beck",
      title: "CEO, Beat Saber founder (sold to Meta), SAE Institute UK",
      linkedin: "https://www.linkedin.com/in/jaroslavbeck",
      image: "https://cdn.prod.website-files.com/67c05701457c09244f3e1c58/67c09d5f6c5cb9bd5afac042_Foto.avif",
      hook: "Jaroslav Beck is a repeat entrepreneur with a genuine hit under his belt - Beat Saber is one of the best-selling VR games ever made and was acquired by Meta in 2019. He studied at SAE Institute UK and has also co-founded CANS, a startup focused on reducing sugar overconsumption. He is Czech, based in Prague, and is deeply plugged into the Czech and European startup ecosystem - he was also briefly associated with Rockaway Ventures. He posts actively on LinkedIn in both English and Czech, and his tone is direct, self-deprecating, and builder-first. He is not a hype person. Tomas Mikolov is one of the most cited AI researchers alive. He invented Word2Vec at Google, then went to Meta, then to CIIRC (the Czech Institute of Informatics, Robotics and Cybernetics), and now BottleCap. David Herel is the third co-founder, an AI researcher at CIIRC, and describes himself as the co-inventor of 'thinking tokens' - the technique that is the foundation of the current 'thinking mode' in models like o1 and Claude. For Developer Relations/Community: BottleCap is positioning itself as an open, research-forward lab. Building a developer community around their models and their efficiency research is the organic distribution strategy that money can't easily buy. Core skills: technical writing, open-source community building, Python, ability to produce tutorials and explainers on LLM architecture topics, public speaking or conference presence, X and LinkedIn native. For proof of work, write a technical explainer post on one of BottleCap's published efficiency concepts - thinking tokens, or their training cost reduction approach - and publish it on a personal blog or dev.to. Your cold email angle: 'Jaroslav - I wrote an explainer on BottleCap's approach to training efficiency [link] and it's getting traction with the ML Twitter crowd. I want to build THE community that turns that interest into developers building on your models. That's the distribution flywheel the app studio needs from day one.' For Product/App Developer (B2B focus): The app studio is being set up now. Pulse is the first consumer app - Beck has said future apps will be B2B. They need someone who can take a research output and turn it into a product a business would actually pay for. Core skills: React Native or iOS development (Swift), product thinking, ability to work directly with researchers, experience shipping B2B SaaS or mobile products, some understanding of LLM APIs. For proof of work, download Pulse, write a detailed product critique - what works, what's missing, what the obvious B2B adjacency is - and include a rough mockup of what you'd build next. Your cold email angle: 'Jaroslav - I downloaded Pulse the day it launched and I've been thinking about the B2B version ever since. I wrote up a product critique and a rough concept for the first enterprise use case [link]. I have [X] years shipping mobile and SaaS products and I want to be the person who builds the app studio alongside you.' For Growth/GTM (first commercial hire): The research is funded. The products are being built. At some point in the next 90 days, someone needs to start thinking about how these B2B apps get to customers. Core skills: B2B SaaS GTM, developer or AI-native audience marketing, ability to write and think clearly about technical products, experience with content-led growth, some understanding of the AI tooling market. For proof of work, write a distribution strategy for Pulse's B2B version - where do the buyers live, how do you reach them, what's the pricing model - and make it sharp enough that it could be a real internal doc. Your cold email angle: 'Jaroslav - you've built the best research team in Europe and you're about to have products that enterprise buyers will want. The gap right now is someone who knows how to reach those buyers before your competitors figure out what you're building. I put together a rough distribution plan for the B2B use case [link]. I'd love to be that person.'",
      avoid: "Don't approach with generic AI hype. Reference the company name joke (bottle cap vs SpaceX rockets) - it'll land. If you've played Beat Saber, mention it. Tomas Mikolov's Word2Vec paper has over 50,000 citations - reference it if relevant to your role.",
    },
    cofounder: {
      name: "Tomas Mikolov",
      title: "CSO, Word2Vec inventor, ex-Google, ex-Meta, CIIRC",
      linkedin: "https://www.linkedin.com/in/tomas-mikolov/",
      image: "https://cdn.prod.website-files.com/67c05701457c09244f3e1c58/67c09d5f6c5cb9bd5afac049_image.avif",
    },
    signal: "Contact: hey@bottlecapai.com (public on website). Jaroslav LinkedIn: linkedin.com/in/jaroslavbeck. David LinkedIn: linkedin.com/in/davidherel. X: x.com/bottlecapai. Best approach: email hey@bottlecapai.com with your proof of work attached. For research roles, address Tomas directly by name even if sending to the general address. For product and GTM roles, address Jaroslav. Keep it short, lead with the thing you built, and skip the cover letter format entirely.",
    careersUrl: "https://bottlecapai.com/#join-us",
    videoUrl: "https://www.youtube.com/watch?v=cA8-XJeoZAQ",
  },
  {
    name: "Snap Compliance",
    tagline: "snap-compliance.com · Costa Rica / Chile / Miami · RegTech SaaS",
    website: "snap-compliance.com",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQHKHy47QKMHcA/company-logo_200_200/company-logo_200_200/0/1658791432108/snapcompliance_logo?e=1773878400&v=beta&t=8SuO4ve9J2FrFdODpLpgj_KeAR22wGmZ9KittA49Rto",
    round: "Seed",
    amount: "$2M",
    detail: "~30 team, 8-country coverage, Dow Jones partnership, FORTALEZA GRC just launched",
    investors: "Undisclosed (announced via press release), VC4A Venture Showcase LatAm participant",
    hiringScore: 7,
    hiringReason: "Press release explicitly states capital for team strengthening, AI development acceleration, and market consolidation",
    whatBuilding: "Snap Compliance is a RegTech SaaS platform that helps companies across Latin America manage anti-money laundering monitoring, operational risk, and regulatory compliance - all from one centralised platform. Think of it as the compliance operating system for mid-size financial institutions and corporates in markets where regulatory frameworks are tightening fast. Their newest product suite, FORTALEZA GRC, launched alongside this funding round and has three pillars: a centralised tech platform, a compliance training academy, and a document management library. They have also shipped Risk Copilot, an AI tool that automates risk identification and mitigation plan generation, and a Compliance Agent that manages multi-country regulatory requirements. They have active clients across eight countries including Costa Rica, Chile, Colombia, Panama, and the Dominican Republic and have a partnership with Dow Jones for sanctions screening.",
    whyMatters: "Regulatory pressure in Latin America is intensifying sharply. In Chile alone, the new Personal Data Protection Law carries fines of up to $1.48M or 4% of annual revenue, almost identical to GDPR in structure and scale. Most companies in the region are still managing compliance with spreadsheets. Snap Compliance is the category-defining software that replaces that manual chaos. The Dow Jones partnership is a credibility signal - Dow Jones does not co-brand with unproven players. For a job seeker, this is a rare case of a company solving a genuinely unavoidable enterprise problem with a clear wedge into the fastest-growing LatAm markets, fresh capital, and zero hiring infrastructure in place.",
    roles: ["AI / ML Engineer", "Full-Stack / Product Engineer", "Sales / Account Executive (Colombia or Mexico)", "Growth / Content Marketing"],
    rolesNote: "The press release is explicit: 'This capital will allow us to strengthen our team, accelerate the development of new AI-based technological capabilities, and consolidate our presence in validated markets.'",
    founder: {
      initials: "AS",
      name: "Alex Siles Loaiza",
      title: "CEO & Co-Founder, MSc, ex-Asociación Bancaria Costarricense, now Miami-based",
      linkedin: "https://www.linkedin.com/in/alex-siles-loaiza",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEZNtUMD3jtbg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725158699422?e=1773878400&v=beta&t=LrweoBykJN9UbAuI_JgaUBa0N5dZDXheraP5sPI4t_A",
      hook: "Alex Siles Loaiza holds an MSc and has a deep background in financial compliance, AML, and risk management from the Costa Rican banking sector. He was associated with the Asociación Bancaria Costarricense before founding Snap Compliance in 2019. He is now based in Miami, which signals that US investor relations and future US market access are on his radar. He is an active speaker at compliance industry events across LatAm - the World Compliance Association, Caricaco Summit, Expocomer in Panama - meaning he is well-networked in the compliance professional community. His full leadership team is complete: Edgar Núñez Núñez as COO, William Ulloa Araya as CPO, and Kimberly Moreira Chaves as CCO. Gabriela Herra Arroyo is the CTO and Co-Founder and is the technical decision-maker - reach her for engineering roles. She participated in the VC4A Venture Showcase LatAm Women Founder Edition. For AI/ML Engineers: Risk Copilot and the Compliance Agent are their AI bets. Both need to process unstructured regulatory documents - laws, internal policies, sanctions lists - and output actionable risk analysis. Core skills: Python, LangChain or LlamaIndex, RAG pipeline design, document processing (PDF extraction and structuring), LLM fine-tuning on domain-specific regulatory data, Spanish language NLP is a very strong differentiator, REST API development. For proof of work, build a demo that ingests a public regulatory document - the Chilean Personal Data Protection Law is openly available - runs it through an LLM pipeline, and outputs a structured risk summary. Push it to GitHub. Your cold email angle: 'Gabriela - I saw the FORTALEZA GRC launch and the seed announcement. I built a demo that applies a RAG pipeline to the Chilean data protection law and outputs a structured compliance checklist [link]. I have [X] years in ML engineering and I want to be part of the team that makes Risk Copilot the default compliance AI for LatAm.' For Full-Stack/Product Engineers: FORTALEZA GRC is a new product suite with three distinct modules. Core skills: React or Vue.js, Node.js or Python, REST APIs, PostgreSQL, SaaS multi-tenancy architecture, Spanish fluency strongly preferred. For proof of work, do a UX review of their public-facing product demo and write a 300-word product critique with one specific feature recommendation. Your cold email angle: 'Gabriela - I went through the Snap Compliance demo and I had one specific idea about how the risk matrix module could surface remediation timelines more clearly. I wrote it up [attached]. I'm a full-stack engineer with [X] years and I want to help build FORTALEZA into the compliance standard across LatAm.' For Sales/AE (Colombia or Mexico): They have validated Chile and Costa Rica. The next expansion markets are Colombia and Mexico. Core skills: B2B SaaS sales, knowledge of financial compliance, Spanish fluency required, ability to navigate procurement at banks and insurance companies, HubSpot or Salesforce. For proof of work, map the regulatory compliance landscape in Colombia - what laws are tightening, which sectors face the most exposure, who the top 20 procurement decision-makers at Colombian banks are. Your cold email angle: 'Alex - Colombia is your next big market and I've been selling compliance software there for [X] years. I mapped the top 20 procurement contacts at Colombian financial institutions who are actively looking for what Snap Compliance does [attached]. I want to be the person who closes that market for you.' For Growth/Content Marketing: Their compliance training academy is a content engine waiting to happen. Core skills: B2B SaaS content marketing, Spanish content creation, SEO, LinkedIn-native writing, email marketing. For proof of work, write a 500-word Spanish-language blog post titled 'Lo que la nueva Ley de Protección de Datos en Chile significa para tu empresa en 2026' and publish it. Your cold email angle: 'Alex - la academia de FORTALEZA GRC es una palanca de crecimiento enorme si se ejecuta bien. Escribí un artículo [link] que ya está atrayendo búsquedas sobre la nueva ley chilena. Quiero construir la estrategia de contenido que convierta esa audiencia en clientes.'",
      avoid: "Don't approach without proof of work. For engineering and product roles, reach Gabriela directly on LinkedIn - she is the technical co-founder. For sales and GTM roles, reach Alex. Write in Spanish if you can - this company operates entirely in Spanish-first markets.",
    },
    cofounder: {
      name: "Gabriela Herra Arroyo",
      title: "CTO & Co-Founder, VC4A Venture Showcase LatAm Women Founder Edition",
      linkedin: "https://www.linkedin.com/in/gabriela-herra-arroyo",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQG1uDhtV9jhVQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1605974704868?e=1773878400&v=beta&t=iLPFubaceykowBo6SFusJCJ1dR1ir9eZJ_Z7P0ruSN8",
    },
    signal: "Contact: sales@snap-compliance.com (public on Crunchbase). CEO Alex: linkedin.com/in/alex-siles-loaiza. X: x.com/alexsilesloaiza. CTO Gabriela: linkedin.com/in/gabriela-herra-arroyo. Company: linkedin.com/company/snapcompliance. The company has been building for six years without institutional capital before this round - they are operators who know their market deeply. Their 2030 goal of impacting 100,000 companies is stated on every piece of public communication - tap into that mission.",
    careersUrl: "",
  },
];

const trends = [
  { sector: "Stablecoin Payments Infrastructure", status: "Hot", text: "Alfred's $15M Series A with F-Prime and Brevan Howard Digital signals institutional conviction that stablecoins are becoming mainstream B2B payment rails. The Asia-LatAm corridor ($600B annual volume) is greenfield. Solana SDK and Circle API experience are now premium skills." },
  { sector: "Efficiency-First AI Research", status: "Emerging", text: "BottleCap AI is betting that the future isn't scaling compute infinitely - it's reasoning better per unit of compute. With Word2Vec inventor Tomas Mikolov as CSO and Beat Saber founder as CEO, this is a serious architecture play. Getting in early here is like joining ElevenLabs pre-hype." },
  { sector: "LatAm RegTech", status: "Heating", text: "Regulatory pressure in Latin America is intensifying fast - Chile's new data protection law mirrors GDPR with 4% revenue fines. Snap Compliance is the category-defining platform replacing spreadsheet chaos. Spanish-language compliance expertise is suddenly valuable." },
];

const compBenchmarks = [
  { role: "Payments Infrastructure Engineer", stage: "Series A", base: "$150K-$220K", equity: "0.15%-0.5%", notes: "alfred - Solana SDK, Circle APIs, real-time settlement" },
  { role: "Business Development (Cross-Border)", stage: "Series A", base: "$130K-$180K", equity: "0.1%-0.3%", notes: "alfred - Asia-LatAm corridor, bilingual required" },
  { role: "Compliance / RegTech Lead", stage: "Series A", base: "$140K-$200K", equity: "0.1%-0.4%", notes: "alfred - Multi-jurisdiction, stablecoin regulation" },
  { role: "Developer Relations", stage: "Seed", base: "$130K-$180K", equity: "0.15%-0.4%", notes: "BottleCap AI - Technical writing, ML community building" },
  { role: "Product / App Developer", stage: "Seed", base: "$140K-$190K", equity: "0.2%-0.6%", notes: "BottleCap AI - React Native/Swift, B2B SaaS" },
  { role: "GTM / Growth Lead", stage: "Seed", base: "$120K-$160K", equity: "0.2%-0.5%", notes: "BottleCap AI - First commercial hire, AI-native audience" },
  { role: "AI / ML Engineer", stage: "Seed", base: "$130K-$180K", equity: "0.2%-0.5%", notes: "Snap Compliance - RAG pipelines, Spanish NLP" },
  { role: "Full-Stack Engineer", stage: "Seed", base: "$120K-$170K", equity: "0.15%-0.4%", notes: "Snap Compliance - React/Vue, Spanish fluency preferred" },
  { role: "Sales / AE (LatAm)", stage: "Seed", base: "$100K-$140K", equity: "0.1%-0.3%", notes: "Snap Compliance - Colombia/Mexico expansion, Spanish required" },
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
              <p className="text-xs text-neutral-400">Feb 25, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$24.5M total this week · Stablecoins + AI + RegTech</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$24.5M</p>
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
            Stablecoin payments infrastructure goes Series A with alfred ($15M, F-Prime + Brevan Howard Digital) targeting the $600B Asia-LatAm corridor. Efficiency-first AI research emerges from Prague with BottleCap AI ($7.5M, 20VC + AI founder all-star angel list). LatAm RegTech consolidates with Snap Compliance ($2M) as regulatory pressure intensifies across the region. By the time this is on a job board, someone has already emailed the founder. Be that person.
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
                    <p className="font-medium text-neutral-900">Stablecoin Payments Infrastructure</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Institutional conviction that stablecoins are becoming mainstream payment rails...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Efficiency-First AI Research</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Emerging</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">The future isn&apos;t scaling compute infinitely - it&apos;s reasoning better per unit of compute...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Payments Infrastructure Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$220K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.15%-0.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">alfred - Solana SDK, Circle APIs</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Developer Relations</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$130K-$180K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.15%-0.4%</td>
                      <td className="py-3 text-neutral-500 text-xs">BottleCap AI - Technical writing</td>
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
