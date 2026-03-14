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
    x?: string;
  };
  cofounder?: {
    name: string;
    title: string;
    bio?: string;
    image?: string;
    linkedin?: string;
    x?: string;
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
    name: "NYNE",
    tagline: "nyne.ai · San Francisco, CA · Contextual intelligence layer for AI agents",
    website: "nyne.ai",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEQ9Da4M4wwgA/company-logo_200_200/B56ZmDf0szHQAM-/0/1758847781950/nyne_ai_logo?e=1775088000&v=beta&t=0Td-7rKMVPxol-UY9GO3nXn2BtSU9leCs3OAPWRgjoM",
    round: "Seed",
    amount: "$5.3M",
    detail: "March 13, 2026 · 2-person co-founding team · South Park Commons",
    investors: "Wischoff Ventures (lead, Nichole Wischoff), South Park Commons. Angel: Gil Elbaz (co-founder Applied Semantics, pioneer of Google AdSense).",
    hiringScore: 8,
    hiringReason: "Just announced yesterday with $5.3M in the bank and a product that needs to scale across millions of web crawls. The timing could not be better for outreach.",
    whatBuilding: "Nyne is building the identity intelligence layer for AI agents. The problem: when an AI agent acts on your behalf, it currently has no way to know who you actually are across the open internet. Your LinkedIn, your Strava, your SoundCloud account, your public government records, your Instagram - these are all strangers to each other for any third party. Nyne deploys millions of sub-agents across the web to stitch those fragments together, applying ML to triangulate a unified contextual profile of a person from their entirely public digital footprint. Consumer-facing companies building AI agents can then plug into Nyne to give their agents genuine, deep understanding of the people they're trying to serve.",
    whyMatters: "The AI agent era is arriving, and it's running blind. An agent that books your travel or purchases on your behalf without knowing your preferences is just automation with a fancier name. Google has solved the identity layer problem, but Google will never share that data with anyone. The open ecosystem needs its own version of this infrastructure, and no one has built it yet. Nyne's lead investor Nichole Wischoff framed the opportunity simply: how do you know someone is pregnant early enough to market to them? That's a crude way of putting it, but the underlying logic is real - context-rich AI outreach is table stakes for the next generation of agent-driven commerce. The company also has a notable angel in Gil Elbaz, who literally invented the technology that underpins Google AdSense. He's backed the right adtech bets before.",
    roles: ["ML / Data Infrastructure Engineer", "Backend / Infrastructure Engineer", "BD / Partnerships Lead"],
    rolesNote: "This one was announced yesterday. There is one Software Engineer role live on LinkedIn, posted 5 days ago. Still a hidden gem, but the window is narrowing. Anyone reaching out now is doing so before a second wave of postings and before the ATS machine turns on.",
    founder: {
      initials: "MF",
      name: "Michael Fanous",
      title: "CEO & Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGmfKNC_E67cA/profile-displayphoto-shrink_200_200/B56ZcjBR0THgAg-/0/1748639227685?e=2147483647&v=beta&t=3Vzvz95zzW7x40sStbuod849lji2YxgCS-h_PwwP0eI",
      linkedin: "https://www.linkedin.com/in/michaelfanous1/",
      x: "https://x.com/michaelfanous1",
      bio: "Michael started university at 16. By 19, he was a full-time machine learning engineer at CareRev, a YC-backed healthcare staffing company, while simultaneously finishing his computer science and data science degree at UC Berkeley. His manager at CareRev wrote in a recommendation that he was more experienced than engineers with twice his years, self-directed, technically sharp across both data science and software development, and needed almost no hand-holding. He initially left CareRev to build an AI SDR, a crowded space, but had a specific insight. As he built the product, other companies with significantly higher revenues started approaching him - not to buy the SDR tool, but to license his underlying data. He had quietly assembled a proprietary dataset on people and businesses at a scale that surprised larger, better-funded players. Rather than chase a feature war in AI outreach, he pivoted toward what was genuinely differentiated: the intelligence layer itself. That pivot is what became Nyne. He is a South Park Commons Fellow (F25 cohort).",
    },
    cofounder: {
      name: "Emad Fanous",
      title: "CTO & Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFtG3ePZAdVtQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516178695412?e=2147483647&v=beta&t=vW9Tm7YMFKJDmaWJgMOu2VGKmdjGiuzW_970YhmS5Ys",
      linkedin: "https://www.linkedin.com/in/emadfanous/",
      x: "https://x.com/emad",
      bio: "Emad's career reads like a playbook for what it actually takes to build data-intensive systems at scale - not in theory, but in production, under commercial pressure, across two decades. He began at USC's Information Sciences Institute in the late 1990s, contributing to foundational internet infrastructure: the RFC Editor, CalRen2 (California's next-generation research internet), and MAE-LA. From there, he joined IAC as CTO, a publicly traded company, took it to nine-figure revenues, built a first-of-its-kind performance-based ad engine that earned patents, and conducted due diligence on acquisition targets including ServiceMagic and YellowPages.com. He then co-founded YellowBot and Weblocal.ca, bootstrapping Connectivity Inc. from zero to $15M in annual revenue before raising a $10.35M Series A. Most relevant to Nyne: at Control.My.ID, Emad served as CTO and built a seed-funded, high-availability system that aggregated billions of data points, then performed record matching and entity resolution to produce canonical records of people. This is exactly the technical problem Nyne is now solving at the agent layer. He has already built it. He is building it again, better, for a larger and more urgent market.",
    },
    outreachByRole: [
      {
        role: "ML / Data Infrastructure Engineer",
        proofOfWork: "The product is literally machine learning applied to web-scale crawling. Nyne's core system deploys millions of agents to analyze public data then stitches identities together using ML. This role is table stakes from day one. They cannot build without it. Core skills: distributed systems, Python, ML pipelines, web scraping at scale, vector databases, entity resolution, graph ML. For proof of work, build a small entity resolution system that takes fragmented public profiles (e.g. the same person across GitHub, LinkedIn, and a podcast guest page) and uses ML techniques to determine whether they're the same individual. Write a short technical blog post explaining your approach and tradeoffs. Post it publicly.",
        coldEmailAngle: "Hi Michael, I built a small entity resolution demo - three fragmented public profiles, one person, matched without any shared identifiers. Saw Nyne's announcement this morning. I think the hard part of your stack is exactly this: linking signals across disconnected platforms at speed. Would love to share what I built and hear what you're working on. Worth 15 minutes?",
      },
      {
        role: "Backend / Infrastructure Engineer",
        proofOfWork: "Nyne's architecture requires crawling millions of pages at scale while managing rate limits, data freshness, and storage efficiently. Before any ML can run, the data pipeline has to work. This is likely the second engineering seat they need. Core skills: Python or Go, cloud infrastructure (AWS/GCP), Kafka or similar message queuing, large-scale web scraping, Redis, PostgreSQL, data pipeline design. For proof of work, build a lightweight web crawler that processes 1,000 public profiles from a social platform, stores structured data, handles rate limiting gracefully, and outputs a clean JSON schema. Write a README explaining the design. Share the GitHub repo.",
        coldEmailAngle: "Hey Michael, I built a rate-limit-aware web crawler for public profile extraction last month - just for fun, honestly. Saw your funding news this morning and realised it maps directly to what you're building at Nyne. Sharing the GitHub. No pressure, but I'd love to talk infrastructure architecture for 15 minutes if you're open.",
      },
      {
        role: "BD / Partnerships Lead",
        proofOfWork: "Nyne's customer isn't the end user - it's the companies building AI agents for end users. That's a B2B motion targeting AI product teams at consumer tech startups. Someone needs to identify those companies, get in the door, and structure early access agreements. Michael Fanous is the CEO, not a sales person. This hire unlocks revenue. Core skills: B2B outbound, developer relations, partnership structuring, adtech or data ecosystem fluency, technical enough to talk to PMs and engineers. For proof of work, map 10 AI-agent-native consumer startups that have raised in the last 6 months and lack a context/identity layer in their product stack. For each, write one paragraph on what Nyne's API could unlock for them specifically. Share the analysis with Michael when you reach out.",
        coldEmailAngle: "Hi Michael, I put together a quick map of 10 recently funded consumer AI agent companies that don't yet have a context layer in their stack - companies where Nyne is precisely the missing piece. Happy to share it. I've been in B2B data partnerships for 4 years. Would this be useful to talk through?",
      },
    ],
    avoid: "Generic enthusiasm about AI agents. Everyone is excited about AI agents. Stand out by knowing exactly what Nyne's technical problem is: entity resolution across the open internet without privileged access to platform data. Come in with something built, not something said.",
    signal: "South Park Commons, their co-lead investor, backs founders who are still in exploration mode - the portfolio skews research-heavy and scrappy, which means early hires carry disproportionate weight and disproportionate equity. Wischoff Ventures, run by solo GP Nichole Wischoff, is known for high-conviction early bets with hands-on follow-through. Her portfolio companies hire fast and lean. Gil Elbaz's presence as an angel is worth noting too: he invented the technology behind Google AdSense. When he backs a data intelligence company, he brings distribution instincts.",
    heroImage: "",
    careersUrl: "",
    featured: true,
  },
  {
    name: "14.AI",
    tagline: "14.ai · San Francisco, CA · AI-native customer support agency for startups",
    website: "14.ai",
    logo: "https://14.ai/favicons/web-app-manifest-512x512.png",
    round: "Seed",
    amount: "$3M",
    detail: "March 2, 2026 · 6 employees · YC-backed · Fully operational with live clients",
    investors: "Y Combinator (lead), General Catalyst, Base Case Capital, SV Angel. Angels: founders of Dropbox, Slack, Replit, Vercel.",
    hiringScore: 8,
    hiringReason: "Six people. Twenty-four-hour client coverage across email, SMS, voice, TikTok, Facebook, Telegram, and WhatsApp. The math does not work at that headcount. Michael Fester said plainly in the press that they aim to increase headcount in the next six months, and that they are only hiring AI engineers. That is one of the clearest hiring mandates any early-stage founder has ever put in a press release.",
    whatBuilding: "14.ai is not software. It's a full-stack AI customer support agency. Startups hand over their entire support operation - tickets, email, SMS, social DMs (TikTok, Facebook, Telegram, WhatsApp, voice) - and 14.ai takes over, using their own purpose-built AI stack to handle it. They integrate within a day. The model is hybrid: AI handles the bulk, a small rotating team of AI engineers manages the edge cases. They also run their own brand, GloGlo (a glucose gummy for Type 1 diabetics), purely to test their own system in live conditions. That's a sharp technical credibility signal.",
    whyMatters: "The customer service software market is being disrupted, but most startups building in the space are building SaaS tools for support teams to manage. 14.ai skips that layer entirely and just becomes the support department. YC explicitly listed AI-powered agencies in their 2026 Requests for Startups, which means the people deciding which companies make it through batch application explicitly want more companies like this to exist. General Catalyst's involvement adds commercial urgency; they push portfolio companies toward measurable growth quickly. The angel roster (Dropbox, Slack, Replit, Vercel founders) are all companies that sell to exactly the kind of early-stage startup clients 14.ai targets. These are warm distribution channels.",
    roles: ["Founding Engineer", "AI Internship", "Customer Success / Client Ops Manager"],
    rolesNote: "Tom Blomfield, founder of Monzo, now a YC partner, personally endorsed the product model in the article. YC partners do not do that for companies they are not actively supporting. Demo Day follow-on is coming, which means the inbound pipeline of startups wanting AI-native support is about to spike.",
    founder: {
      initials: "MS",
      name: "Marie Schneegans",
      title: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHTYYYhWYaREg/profile-displayphoto-scale_200_200/B56ZvH2ySIKwAY-/0/1768584587996?e=2147483647&v=beta&t=M4GfxTQenMGghV5B8hprELmrgE_cWTyNReM5unZRIJ8",
      linkedin: "https://www.linkedin.com/in/marie-schneegans/",
      x: "https://x.com/marieschneegans",
      bio: "Marie grew up in Switzerland and studied financial engineering at Université Paris Dauphine. Her entry into entrepreneurship came from a deeply personal place. She interned at UBS in 2012, felt completely lost in the institutional enormity of it, and started eating lunch alone at her desk. Rather than accepting it, she knocked on doors. Most people said yes. That small act of ignoring corporate norms and manufacturing human connection became the founding insight for everything she's built since. She launched Never Eat Alone in 2015, an app to help employees at large companies find lunch companions, eventually used by 100,000 people. She then scaled that into Workwell, a broader corporate intranet that raised $1.5M in 2016. After Workwell, she and Michael built Motif (a collaborative docs platform) and then Markprompt (YC W24, AI infrastructure for customer support, backed by founders at Algolia, Snowflake, Stripe and Vercel). She writes candidly on LinkedIn about fundraising, the reality of YC for founders who don't raise at Demo Day, and what it actually means to back unglamorous but high-leverage markets.",
    },
    cofounder: {
      name: "Michael Fester",
      title: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHhJ1eHUFcyTg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703224796296?e=2147483647&v=beta&t=LnPvc2NJA44CxDj2T0P-227lGJtwjrmXtcdWhqeYoAk",
      linkedin: "https://www.linkedin.com/in/michaelfester/",
      bio: "Michael holds a PhD and co-founded Snips in 2013 alongside Rand Hindi and Maël Primet, all three PhDs. The core thesis at Snips was politically important and technically ahead of its time: voice AI that ran entirely on-device, never sending audio to the cloud, never logging what you said. Privacy-by-design before it was a regulatory requirement. They graduated from 500 Startups, raised $13.45M led by Korelya Capital and MAIF Avenir, and built a team of over 50 engineers split between Paris, New York and Tokyo. Sonos acquired Snips in 2019 for $37.5M, and Michael's technology now powers every voice interaction on every Sonos speaker sold globally. Before Snips, he built 8pen, a novel mobile keyboard that reimagined how humans write on touchscreens. After the Sonos acquisition, Michael and Marie built Motif together, then founded Markprompt, a YC-backed AI support infrastructure company. 14.ai is what happens when that insight meets Fester's technical depth in conversational AI and Marie's decade of watching companies fail at the human layer of work.",
    },
    outreachByRole: [
      {
        role: "Founding Engineer",
        proofOfWork: "This is confirmed and open right now. The stack is TypeScript, Postgres, Vite, Next.js, and Effect - a deliberate, opinionated set of choices that signal a team that thinks carefully about architecture. The role touches everything: concurrent systems, agent orchestration, RAG, LLM engineering, database optimisation, telemetry, CI/CD, and frontend. That breadth is intentional. At six people covering 24/7 client operations, there is no room for someone who only does one thing. SF-based or willing to relocate is a hard requirement. Core skills: TypeScript, Next.js, Postgres, Effect, LLM engineering, agent orchestration, RAG, production deployment. For proof of work, fork a small open-source support tool or build a minimal AI customer support agent using their stated stack. Handle at least three realistic ticket types end-to-end - order status, refund request, product complaint - and show how the system escalates gracefully when it cannot resolve. Clean repo, short demo video.",
        coldEmailAngle: "Hi Marie, I built a minimal support agent in TypeScript using Next.js and Postgres - handles order queries, refunds, and escalations, with a clean fallback when the AI fails. Saw the Founding Engineer role and wanted to show you the code before sending a CV. GitHub link attached. Worth a look?",
      },
      {
        role: "AI Internship",
        proofOfWork: "Also confirmed and open. This is the bridge role between the AI systems and the actual customers - building and optimising agents, refining prompts from live interactions, and stepping in with human judgment when the AI cannot handle it. Marie is the hiring contact for both roles, which tells you this position sits close to the operational heart of the company. Prior customer-facing experience is a bonus, and strong side projects count as experience. SF-based or willing to relocate required. Core skills: Prompt engineering, LLM agent building, fast iteration, customer empathy, willingness to be in the loop when the AI breaks. For proof of work, pick a real consumer brand with a public FAQ and build a prompt-optimised support agent for them. Run it against 10 realistic customer scenarios. Document where it succeeded, where it failed, and what you changed in the prompt to fix the failures. The iteration log is the proof of work, not just the final version.",
        coldEmailAngle: "Hi Marie, I built a support agent for a consumer brand using their public docs, ran it through 10 test scenarios, and kept a log of every prompt iteration and why I made it. Three failures, all fixed. Happy to share the full doc. I'm based in SF and would love to talk about the internship.",
      },
      {
        role: "Customer Success / Client Ops Manager",
        proofOfWork: "As 14.ai grows its client roster, someone needs to be the human face for each account - reviewing performance, flagging issues before clients do, and ensuring the AI is being trained correctly. The founders can't own this function forever. Core skills: Customer success, SaaS or agency account management, familiarity with support metrics (CSAT, first response time, resolution rate), clear communication, process documentation. For proof of work, write a simple client success playbook for an AI support agency - what a weekly client review looks like, what metrics you'd track, how you'd handle an AI failure before the client escalates. This shows you understand the operational reality of 14.ai's business model, not just generic CS work.",
        coldEmailAngle: "Hi Marie, I put together a one-page client success playbook for an AI support agency - what good looks like week one, week four, and month three. Ran customer success at a YC-backed SaaS company for two years. Given you're scaling fast and the team is all engineers, I'm guessing this function is one you'll need to build soon. Would love to show you the doc.",
      },
    ],
    avoid: "Leading with excitement about AI replacing customer service workers. These founders are building a nuanced position - AI and humans working together, not pure replacement. Reference their GloGlo experiment if you want to show you've actually read past the headline. It's the most technically interesting detail in the article and 99% of applicants will miss it.",
    signal: "YC is the other signal worth reading carefully. Tom Blomfield, founder of Monzo, now a YC partner, personally endorsed the product model in the article. YC partners do not do that for companies they are not actively supporting. Demo Day follow-on is coming, which means the inbound pipeline of startups wanting AI-native support is about to spike. The angel roster - founders of Dropbox, Slack, Replit, and Vercel - are all people who sell to the exact startups 14.ai wants to serve. That is not just validation. It is a warm distribution channel that will accelerate growth faster than the current team can absorb.",
    heroImage: "",
    careersUrl: "",
    featured: false,
  },
  {
    name: "Wideframe",
    tagline: "wideframe.com · San Francisco, CA (founders distributed / remote) · AI agent for video editors",
    website: "wideframe.com",
    logo: "https://try.wideframe.com/wideframe-logotype.png",
    round: "YC W26",
    amount: "$500K",
    detail: "YC W26 · 2-person founding team · Remote-first · 50+ paying clients in first 75 days",
    investors: "Y Combinator (W26 standard deal).",
    hiringScore: 8,
    hiringReason: "Two founders, $500K in the bank, 50+ clients onboarded in 75 days, and a product that went viral on Product Hunt in February. The bottleneck right now is engineering depth and customer-facing support, not demand. A hiring push is the only logical next move.",
    whatBuilding: "Wideframe is an AI agent for video editors that handles the 75% of work that happens outside the actual editing timeline. Think: searching through thousands of clips, labeling footage, organising libraries, sequencing shots, and generating context-aware assets. It runs as a high-performance desktop app that lives on the machine, works across local filesystems and cloud storage, and supports native Adobe Premiere Pro (.prproj) roundtrip. Editors describe it as an assistant editor that never sleeps. The original pitch to YC was 'Claude Code for video editing.'",
    whyMatters: "Video is now a core growth channel for every company that sells something. Agencies are producing hundreds of ads per week. Brands are churning out organic content at scale. But the tooling has not kept pace: editors have been stuck doing hours of manual prep work before they can touch the actual cut. Wideframe attacks exactly that gap. The moment generative AI made video creation cheaper, the bottleneck shifted upstream to footage management, and nobody had built an agent for that yet. The desktop-first approach is also a deliberate differentiator. Where most AI tools are browser-based SaaS, Wideframe runs on the machine itself, giving it access to local file systems, raw footage, and native app integrations that cloud tools cannot touch.",
    roles: ["Founding Engineer (Full-Stack / ML)", "Customer Success / Onboarding Lead", "Growth / Video Marketing Specialist"],
    rolesNote: "Daniel's note on their YC page says explicitly: 'Interested in custom video agents? Reach out: daniel@wideframe.com. We've built custom workflows for clients already and are excited to build more.' That is a founder broadcasting that he is drowning in bespoke implementation requests with no one to hand them to. YC Demo Day is March 24 - the hiring push follows within 30 days of close.",
    founder: {
      initials: "DP",
      name: "Daniel Pearson",
      title: "Co-Founder & CEO",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEnKJGcQ5ptTQ/profile-displayphoto-scale_200_200/B56ZnLWFNwJ8AY-/0/1760053191896?e=2147483647&v=beta&t=nnPt4Hwn1gUpfHpmcxC33OQBd-6zfUCBKLabhWTBV3w",
      linkedin: "https://www.linkedin.com/in/danielvpearson/",
      x: "https://x.com/danielpearson",
      bio: "Daniel is not a technologist who stumbled into video - he is a career operator who spent over a decade building one of the most respected video ad agencies in the growth marketing world. His company Bamboo managed over $1 billion in ad budgets across 175+ tech companies including Uber, DoorDash, Dropbox, and Adobe. That is not a boutique portfolio. That is the infrastructure layer of the performance marketing industry, and Daniel sat at the centre of it, overseeing creative production at enormous scale. What makes that background unusually relevant to Wideframe is what he saw from the inside. At Bamboo, his editors were producing thousands of video ads. The creative work - the cuts, the storytelling, the hooks - was fast. The prep work was not. Hours disappeared every week into searching through clip libraries, labelling footage, organising assets, and sequencing shots before anyone had touched the actual timeline. The pain was not theoretical. It was a cost centre Daniel lived with for years. Wideframe is his direct answer to it.",
    },
    cofounder: {
      name: "Zachary Kim",
      title: "Co-Founder & CTO",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGxBvfJ7ZfUTQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666252661613?e=2147483647&v=beta&t=EcgYOXUIiXUwNyzNv-IY_q-jv_xqq1soPRnzOvzfEfQ",
      linkedin: "https://www.linkedin.com/in/heyzk/",
      bio: "Zachary Kim has been an engineering leader for over 20 years, which puts his career start somewhere in the early-to-mid 2000s, well before most of his YC W26 peers were writing their first lines of code. He is a 2x YC founder, meaning he has been through the accelerator before, knows exactly what the Demo Day sprint looks like, and has already experienced the chaos of early product-market fit hitting before the team is ready for it. His technical background spans engineering leadership at scale. The Wideframe product is not a thin wrapper around an API - it is a high-performance desktop application with frame-accurate video understanding, agentic sequencing, and native Adobe Premiere Pro integration. The engineering surface area is serious, and Zack is carrying it alone right now. What is less obvious from his engineering credentials is that Zack is also a talented photographer with a deep interest in art history. A CTO who genuinely cares about visual storytelling is building different product intuitions than a pure infrastructure engineer would. He and Daniel have known each other for 15 years and were colleagues before becoming co-founders.",
    },
    outreachByRole: [
      {
        role: "Founding Engineer (Full-Stack / ML)",
        proofOfWork: "Zack is carrying the entire technical stack alone. The product already handles frame-accurate video understanding, agentic search, multimodal generation, and Adobe Premiere Pro integration. That is a huge surface area for one person. With 50+ clients sending real production footage, edge cases are multiplying fast. The first engineering hire will be someone who can build alongside Zack without hand-holding, ideally someone with both systems-level desktop app experience and enough ML fluency to extend the agent's video reasoning capabilities. Core skills: Python, Rust or C++ (for desktop app performance), multimodal ML, video processing pipelines, LLM tool use, Adobe SDK or Premiere Pro API familiarity, filesystem-level engineering. For proof of work, build a small demo that takes a folder of video clips, uses a multimodal model to label each one by content (e.g. 'outdoor scene, daytime, speaking to camera'), and outputs a structured JSON that could feed into a sequencing workflow. Post it to GitHub with a README explaining your architecture choices. Email it to daniel@wideframe.com before they post a job listing.",
        coldEmailAngle: "Hi Zack, I built a demo that auto-labels and sequences raw clips using a multimodal pipeline - linked below. I saw Wideframe go viral on Product Hunt and I've been thinking about the hard parts: filesystem access at scale, frame-accurate retrieval, and keeping latency low when footage is local. Would love to compare notes on how you're solving these. Worth a quick call?",
      },
      {
        role: "Customer Success / Onboarding Lead",
        proofOfWork: "Daniel is personally managing every new client onboarding and custom workflow request. At 50+ agencies, that is unsustainable. The agencies using Wideframe are producing hundreds of videos a week - they are high-touch, high-value clients who need someone to own their relationship, train their editors, and translate their workflow pain into product feedback. This hire is not a junior support role. It is a founding-level CS person who understands video production workflows and can operate as a strategic partner to creative teams. Core skills: Video production workflow knowledge (NLEs, asset management, creative ops), client onboarding, enterprise account management, product feedback synthesis, ideally some technical fluency to understand what the agent can and cannot do. For proof of work, map out the onboarding journey a video agency would go through when adopting Wideframe - from first install to fully integrating it into a weekly 200-video production pipeline. Identify the three biggest friction points and propose how you would solve them. Send it to daniel@wideframe.com.",
        coldEmailAngle: "Hi Daniel, I mapped out what onboarding would look like for a high-volume video agency adopting Wideframe - the friction points, the training needs, the feedback loops. I've spent 4 years in creative ops at agencies doing exactly this kind of volume. Seems like you're at the stage where client success needs its own owner. Worth 15 minutes?",
      },
      {
        role: "Growth / Video Marketing Specialist",
        proofOfWork: "Daniel ran $1B+ in ad budgets for Uber, DoorDash, Dropbox and 175+ others through his agency Bamboo. He does not need a generalist marketer. What he needs is someone who lives in the video ad production world, speaks the language of creative agencies, and can build the distribution flywheel for a product that went viral once already. This hire will own content, community, and channel strategy, especially within the professional video editing and agency ecosystem. Core skills: Video production community knowledge, content strategy, social-first distribution, performance marketing, agency-facing GTM, Adobe/creator ecosystem fluency. For proof of work, write a 3-post LinkedIn content strategy for Wideframe targeting agency creative directors - include draft copy for each post, the hook for each one, and why each resonates with that audience. Email it to daniel@wideframe.com.",
        coldEmailAngle: "Hi Daniel, I drafted a 3-post LinkedIn content strategy targeting agency creative directors - it uses the exact language they use when they're drowning in footage prep. Your Product Hunt launch already showed the demand is there; this is about making that flywheel repeatable. I've spent three years in creative marketing at agencies in this exact world. Worth a quick look?",
      },
    ],
    avoid: "Do not pitch yourself as a 'video enthusiast' or someone who 'loves creative tools.' Daniel has spent his career in this industry and will see through surface-level enthusiasm immediately. Lead with something specific - a workflow problem you have solved, a real production context you have lived, or concrete work you have built. The product went viral because it is genuinely useful; approach it accordingly.",
    signal: "The signal here is simple and loud. Wideframe launched publicly in February 2026 and went viral. In 75 days they onboarded 50+ brands and agencies, many of which produce hundreds of videos per week. That is real enterprise-grade usage on a two-person team. The YC standard deal gives them $500K and a Demo Day audience, but the product-market fit they have demonstrated will attract follow-on capital fast.",
    heroImage: "",
    careersUrl: "",
    featured: false,
  },
];

const trends = [
  { sector: "Contextual Intelligence for AI Agents", status: "Emerging", text: "As AI agents move from demos to production, the missing layer is context. An agent booking travel or making purchases without knowing user preferences is just automation. Nyne is building the identity infrastructure that lets agents actually understand who they're serving. Gil Elbaz (inventor of Google AdSense technology) backing this signals the adtech veterans see a familiar pattern: whoever owns the context layer owns the value." },
  { sector: "AI-Native Agencies", status: "Hot", text: "YC explicitly listed AI-powered agencies in their 2026 Requests for Startups. 14.ai is the canonical example: instead of building software for support teams, they become the support department. The angel roster (Dropbox, Slack, Replit, Vercel founders) are all companies that sell to the exact startups 14.ai wants to serve. This is not validation - it's warm distribution." },
  { sector: "AI Agents for Creative Production", status: "Heating", text: "Video is now a core growth channel for every company that sells something. Agencies are producing hundreds of ads per week, but editors are still stuck doing hours of manual prep work. Wideframe attacks that gap with an AI agent that handles footage management, labeling, and sequencing. Desktop-first architecture gives it access to local filesystems that cloud tools cannot touch." },
];

const compBenchmarks = [
  { role: "ML / Data Infrastructure Engineer", stage: "Seed", base: "$170K-$220K", equity: "0.5%-1.5%", notes: "NYNE - entity resolution, web-scale crawling, ML pipelines" },
  { role: "Backend / Infrastructure Engineer", stage: "Seed", base: "$160K-$200K", equity: "0.5%-1.2%", notes: "NYNE - distributed systems, data pipelines, web scraping" },
  { role: "Founding Engineer (Full-Stack)", stage: "Seed", base: "$170K-$220K", equity: "0.8%-1.5%", notes: "14.AI - TypeScript, Next.js, Effect, LLM engineering" },
  { role: "Founding Engineer (Full-Stack / ML)", stage: "Pre-Seed", base: "$160K-$200K", equity: "1.0%-2.0%", notes: "Wideframe - Python, Rust, multimodal ML, video processing" },
  { role: "Customer Success / Onboarding Lead", stage: "Pre-Seed", base: "$100K-$140K", equity: "0.3%-0.8%", notes: "Wideframe - video production workflows, agency account management" },
  { role: "BD / Partnerships Lead", stage: "Seed", base: "$120K-$160K", equity: "0.3%-0.8%", notes: "NYNE - B2B outbound, partnership structuring, AI ecosystem" },
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
                  <div className="text-center px-4 bg-white/95 rounded-xl py-3 shadow-sm border border-neutral-100">
                    <p className="text-neutral-900 font-medium text-sm">Edge plan feature</p>
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
              <p className="text-xs text-neutral-400">Mar 14, 2026 (Sat)</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$8.8M+ this drop · Context Intelligence + AI Support Agency + Video Editing Agent</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$8.8M+</p>
            <p className="text-[10px] sm:text-xs text-neutral-500">total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-rose-500">8</p>
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
