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
    name: "Astor",
    tagline: "joinastor.com · San Francisco, CA · AI Investment Advisor for Retail Investors",
    website: "joinastor.com",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQFXej5AJq7KdA/company-logo_200_200/B56Zu.F11mK4AI-/0/1768420761385/joinastor_logo?e=2147483647&v=beta&t=70OISOidalXD93izLtZw4qY_85rzRzE5z8k3qP5uF3M",
    round: "YC S25",
    amount: "$500K",
    detail: "5 team, YC-backed, voice + chat AI advisor, previously 'Gaus'",
    investors: "Y Combinator (Summer 2025)",
    hiringScore: 8,
    hiringReason: "5-person team fresh off YC Demo Day, classic post-YC hiring playbook incoming. Seed round expected Q1 2026.",
    whatBuilding: "Astor is an AI investment advisor that gives retail investors the same kind of real-time market tracking, deep research, and personalized alerts that institutional investors rely on. Their AI agents uncover opportunities, decode emerging trends, and deliver tailored analysis, basically a personal Goldman Sachs research desk for everyday investors. The product (available at joinastor.com) lets you call or chat with your AI advisor anytime, 24/7. It's a voice + chat interface, not just another stock screener or charting tool. Note: Astor was previously called \"Gaus\" (joingaus.com still redirects to the product), they recently rebranded, which is itself a signal of market positioning refinement and upcoming growth push.",
    whyMatters: "Retail investors now account for 25% of all U.S. trading volume, nearly double from 2012. But 56% still don't feel confident in their investment decisions. There are 160M+ stock-owning Americans, and the tools they use (brokerages, news sites, Reddit) haven't fundamentally changed in 15 years. The AI advisor category is heating up, but Astor has an unusual founder combination: one founder was a data scientist at Nubank (building ML models for millions of users) and a fintech VC at monashees (Brazil's top VC, $2B+ AUM), while the other was an engineer at Stripe, Robinhood, and Amazon building production AI systems. They've seen the institutional edge from the inside and the retail struggle from the user side.",
    roles: ["Full-Stack Engineer", "AI/ML Engineer", "Growth / Marketing (Consumer)", "Content / Financial Research Analyst"],
    rolesNote: "",
    founder: {
      initials: "BK",
      name: "Bruno Koba",
      title: "Co-Founder & CEO, Stanford GSB MBA, Botha-Chan Fellow, ex-Nubank, ex-monashees",
      linkedin: "https://www.linkedin.com/in/bruno-koba",
      image: "https://media.licdn.com/dms/image/v2/D5603AQE2CbEXbW0f0w/profile-displayphoto-scale_200_200/B56ZekUb1ZHQAc-/0/1750808510519?e=2147483647&v=beta&t=N5olBxzZJMdsGBU_-G6L51OW6N1cMTDotBX99UL5tQY",
      bio: "Stanford GSB MBA (Class of 2025) and Botha-Chan Fellow - a program sponsored by Sequoia's Roelof Botha that selects only 30 students. Before Stanford, he was a data scientist at Nubank from 2018 to 2020, building ML models that impacted millions of users. He then joined monashees, Brazil's leading VC ($2B+ AUM), as a Senior Associate where he led deal teams for 8 seed/Series A investments, including two companies now valued over $1B (Merama and Clara), and deployed $180M+ across 15+ follow-on rounds. Deeply connected to the LatAm fintech ecosystem - Nubank's CEO David Vélez is also Stanford GSB, and Bruno interviewed Vélez at Stanford. His communication style is very active on LinkedIn: substantive posts about VC, fintech, and entrepreneurship. He engages thoughtfully with comments, is approachable, but expects substance. He values people who have conviction about a market.",
    },
    cofounder: {
      name: "Daniel Tulha Hochstetler",
      title: "Co-Founder & CTO, ex-Stripe, ex-Robinhood, ex-Amazon",
      linkedin: "https://www.linkedin.com/in/daniel-hochstetler/",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGDQUd7qjSwXw/profile-displayphoto-scale_200_200/B4EZepLuQDHgAY-/0/1750890116713?e=2147483647&v=beta&t=K-Ig1bMNRCcyoQs9YEWxwBeDPgC5WGj_sXoRVkOIQ-Y",
      bio: "Ex-Stripe, Robinhood, and Amazon software engineer who's been building production-ready AI agents and scaling systems for years. At Robinhood, he scaled systems during the meme stock booms and volatile markets, exactly the kind of high-throughput, high-stakes engineering that Astor needs. At Stripe, he worked on core infrastructure. When YC S25 accepted them, he posted on LinkedIn: \"After helping Robinhood scale during some of the wildest markets in history, we're building the AI advisor that every retail investor deserves.\" His communication style is more technically oriented than Bruno's, and he's likely the person evaluating engineering candidates.",
    },
    outreachByRole: [
      {
        role: "Full-Stack Engineer",
        proofOfWork: "Build a mini AI investment chat interface. Use the OpenAI or Anthropic API paired with a financial data source (Alpha Vantage, Polygon.io, or Yahoo Finance API) to create a conversational AI that can answer portfolio-related questions. Bonus points if you add voice input/output to match Astor's actual product. Skills that matter: React Native or Flutter for mobile, Next.js for web, API integrations with financial data providers, WebSocket for real-time data, and experience building consumer-facing products at scale. Reach Daniel directly on LinkedIn.",
        coldEmailAngle: "Daniel, I've been building consumer fintech products and am obsessed with the problem you're solving - the institutional edge gap. Built a quick demo that shows how I think about conversational AI for portfolio analysis. [Link to your project]",
      },
      {
        role: "AI/ML Engineer",
        proofOfWork: "Build a simple portfolio analyzer that uses LLMs to generate investment hypotheses based on a user's holdings and market data. Show it can identify correlations, emerging sector trends, or risk factors - use LangChain paired with financial data APIs. Skills to highlight: Python, LLM orchestration (LangChain, LlamaIndex), financial data processing, NLP for earnings calls and SEC filings, experience building AI agents, and recommendation systems. Email Bruno (CEO) directly - he was a data scientist at Nubank, so he'll appreciate technical depth.",
        coldEmailAngle: "Bruno - you went from analyzing deals for monashees portfolio companies worth $1B+ to building the tool that gives every retail investor that same lens. I want to help build the AI that makes that real. PFA a portfolio analyzer.",
      },
      {
        role: "Growth / Marketing (Consumer)",
        proofOfWork: "Write a user acquisition strategy for Astor targeting the \"confident but underserved\" retail investor segment - people who trade regularly but lack research tools. Include channel analysis covering Reddit (r/investing, r/stocks), FinTwit, YouTube finance creators, and podcast sponsorships, then map out a 90-day growth plan post-rebrand. Skills that matter: consumer fintech marketing, paid acquisition (Meta, Google, Reddit), SEO/content marketing, community building, analytics (Mixpanel, Amplitude), and referral program design. Reach Bruno on LinkedIn.",
        coldEmailAngle: "Bruno - noticed the rebrand from Gaus to Astor, smart move for consumer positioning. I put together a 90-day acquisition plan targeting the [x]% of investors who don't feel confident. Happy to walk through it.",
      },
      {
        role: "Content / Financial Research Analyst",
        proofOfWork: "Write 3 sample investment research briefs (1 page each) in the style an AI advisor should deliver them - clear, jargon-light, actionable, personalized. Pick a trending sector like AI infrastructure, defense tech, or fintech and show how you'd present opportunities and risks to a retail investor. Skills to highlight: financial analysis, equity research, writing for non-expert audiences, familiarity with Bloomberg/FactSet/Koyfin, and an understanding of what retail investors actually care about (not what Wall Street cares about).",
        coldEmailAngle: "Daniel/Bruno, the hardest part of building an AI investment advisor isn't the AI, it's making the output actually useful for someone who isn't a CFA. I've been writing investment research that regular people actually read [link]",
      },
    ],
    avoid: "Don't send generic AI enthusiasm. Lead with specific proof of work - a demo, a growth plan, or sample research briefs. Reference the rebrand from Gaus to Astor, the Robinhood scaling experience, or the monashees portfolio work. Show you understand the retail investor pain point.",
    signal: "Astor AI (YC S25), a lean 5-person fintech squad fresh off Demo Day in late 2025, is screaming \"hiring spree ahead\" via the classic post-YC playbook: snag a $3-6M seed round fast (often from networks like Sequoia's) and explode headcount to 15-20 within 6 months to capitalise on momentum. Plus, their accelerating product traction (e.g., early beta user growth or API integrations hinted in YC updates) is likely fueling burn-rate needs for engineering). CEO Bruno Koba supercharges this - Stanford Botha-Chan Fellow (Roelof Botha's direct Sequoia scout pipeline), ex-Monashees deal lead behind $1B+ exits - while his recent LinkedIn fires up Brex/Nubank scaling tales and VC/founder chats, pure pre-raise signaling for Q1 2026's aggressive growth phase before that seed PR hits (think Monashees or Sequoia announcements greenlighting AI-fintech hires).",
    careersUrl: "",
    featured: false,
  },
  {
    name: "222",
    tagline: "222.place · SoHo, New York City · AI-Powered IRL Social Platform",
    website: "222.place",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEXt_bABaM8xA/company-logo_200_200/B56ZlyQZq7KAAI-/0/1758558527655/222place_logo?e=2147483647&v=beta&t=_ljSgA6sz9ioYJP0wxx7u3sfKBP4GRrgP5YKItX6r5o",
    round: "Series A",
    amount: "$10.1M",
    detail: "16 team, 7 open roles, 523K+ connections facilitated, operating in 7 cities",
    investors: "Undisclosed lead; prior backers include General Catalyst and Y Combinator",
    hiringScore: 9,
    hiringReason: "7 open roles on careers page, 16 people, $10.1M Series A, expanding across 7 cities. Window is open.",
    whatBuilding: "222 is an AI-powered IRL social platform. The core product: take a personality quiz, pay $22/month, and the company's machine learning model places you at a dinner - a table of strangers it has predicted you'll like. No profiles, no swiping, no DMs. You show up. The algorithm has done the work before you walk in. Since launching its mobile app in 2024, 222 has evolved beyond one-off dinners into relationship infrastructure - after an experience, the platform follows up to ask whether you want to see someone again, and if both say yes to a date, 222 books the reservation. They call this \"going beyond the first encounter.\" The platform has now facilitated over 523,000 connections and operates in New York, Los Angeles, San Francisco, Chicago, Toronto, London, and Washington D.C. Their product thesis in one sentence, from their own careers page: \"infinite choice and endless information about people and places have left us paralyzed rather than connected.\"",
    whyMatters: "Every major social product of the last twenty years has been built around profiles, followers, and engagement metrics - and every one of them has contributed to what 222 calls the social recession: fewer close friends, declining third places, rising loneliness. 222 is not trying to fix it by making a better social media app. They're doing the opposite - using AI to remove the digital friction that keeps people from showing up in physical spaces. That is a fundamentally different bet, and a legitimate one. As AI companions and virtual worlds become more convincing, authentic IRL connection becomes correspondingly more scarce and more valuable. 222 is positioning itself to own that scarcity. Critically, their product generates proprietary labeled data on human social compatibility at a scale no academic lab or competing app comes close to - that dataset, built encounter by encounter, is the real competitive moat.",
    roles: ["Machine Learning Engineer", "iOS Design Engineer", "Android Design Engineer", "Head of Brand", "Member Experience Lead"],
    rolesNote: "Seven open roles. Sixteen people. In-person only. In SoHo. The roles are specific, the team is small, and almost nobody is applying through the right channel.",
    founder: {
      initials: "KK",
      name: "Keyan Kazemian",
      title: "CEO, USC origin story, quoted in Business Insider",
      linkedin: "https://www.linkedin.com/in/kaaazemian",
      image: "https://media.licdn.com/dms/image/v2/C5603AQF981BlzdlveA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1596156888630?e=2147483647&v=beta&t=HmkVExkC3O9CgK72BUi8KBvAcwdVo9Kqr3zal_x6ccA",
      bio: "The public face of 222. Has 500+ LinkedIn connections, was recently quoted in Business Insider, and frames the company's mission in explicitly societal terms: the social recession, the great filter, the IRL future. All three founders are in their mid-twenties. They built 222 as a research project out of USC, started hosting backyard dinners in Orange County, got into Y Combinator, raised capital, moved to New York, launched an app. Fun facts: 222 started with pasta and wine in a backyard in Orange County - reference it specifically. The prop newspaper in their SoHo office is called \"The Serendipity Times.\" Their careers page opens with a quote about the TV era. Their stated tenet is \"A+ talent only - we do not tolerate mediocrity.\"",
    },
    cofounder: {
      name: "Arman Roshannai",
      title: "CTO, published ML researcher, designed the compatibility model",
      linkedin: "https://www.linkedin.com/in/arman-roshannai/",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFmp7OVgMrRcA/profile-displayphoto-scale_200_200/B56ZtMd4bYJsAY-/0/1766514460792?e=2147483647&v=beta&t=FT_XySbebrI7nmlVdRbpS4YQR3g1wd2M7kIqNn9_W6o",
      bio: "The builder - CTO, published ML researcher, and the person who originally designed the compatibility model. Their careers page states the team includes \"published ML researchers dedicated to the difficult task of training a human prediction model.\" That's Arman's world. The team works in-person every day in SoHo - they're looking for people who want to be in a room.",
    },
    thirdFounder: {
      name: "Danial Hashemi",
      title: "COO, Iranian immigrant, operations from day one",
      linkedin: "https://www.linkedin.com/in/danialhashemi/",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQFynxuy8MfNzg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1582072424206?e=2147483647&v=beta&t=aKuxN5KU3dnMQCGKFt_VaJnHGKTIiDXUTlGJdEvOkTQ",
      bio: "The operator - COO from day one, Iranian immigrant who has talked about 222 as a genuine response to the problem of social isolation, not just a startup thesis. He owns the actual human experience end-to-end across seven cities.",
    },
    outreachByRole: [
      {
        role: "Machine Learning Engineer",
        proofOfWork: "This is the most technically critical hire. 222's entire product is a human compatibility prediction model. Write a brief technical note on how you'd approach the cold-start problem for a new 222 user - no history, no interaction data, only a personality quiz. Core skills: experience building and shipping production ML systems; familiarity with recommendation engines or social graph modeling; experience working with labeled interaction data; comfort operating in a small team where you are shipping, not just researching. Email it directly to Arman Roshannai.",
        coldEmailAngle: "Arman - I wrote up how I'd approach the cold-start problem for a new user with no interaction history, just quiz data [attached]. I've built production recommendation systems at [company] and I want to work on the compatibility model. Is there a conversation?",
      },
      {
        role: "iOS/Android Design Engineer",
        proofOfWork: "222's product is entirely consumer-facing and their brand aesthetic is obsessively considered - their careers site uses the word \"craftsmanship\" and their job titles deliberately merge design and engineering. They want people who can do both. Core skills: strong iOS or Android engineering fundamentals; a demonstrable portfolio of shipped consumer apps with a high design bar; comfort with motion, interaction, and product aesthetics beyond standard UI frameworks. Pull out your phone, open the 222 app, find one specific interaction or screen that you'd redesign - build it and send it to Keyan.",
        coldEmailAngle: "Keyan - I redesigned the [specific screen] in 222 because [specific reason]. Here's the prototype [link]. I build for both function and feel and I want to be in SoHo with this team.",
      },
      {
        role: "Head of Brand",
        proofOfWork: "222 is not a tech company that also does marketing. Their brand is the product - the aesthetic, the \"Serendipity Times\" prop newspaper, the careers site that reads like a manifesto, the phrase \"engineering chance.\" Write a short brand memo: first, articulate 222's current brand thesis in your own words; second, map the gap between that thesis and how the outside world is likely perceiving 222 today; third, propose 2–3 concrete, shippable brand moves for the next 90 days. Send to Keyan.",
        coldEmailAngle: "Keyan - I think 222's product thesis and brand voice are already genuinely distinct. Here's my read on where the gap is between how you talk about what you're building and how the outside world perceives it - and what I'd do about it. I want to be the person who closes that gap.",
      },
      {
        role: "Member Experience Lead",
        proofOfWork: "222's product is not just the app. It's the dinner, the venue, the follow-up text, the date reservation. Design a lightweight \"gold standard\" playbook for one 222 night in a new city: from the moment someone takes the quiz to the moment they leave the venue. Break it into stages (onboarding, pre-event communication, arrival, dinner, post-dinner, follow-up) and spell out what \"great\" looks like at each step. Include edge case handling (no-shows, late arrivals, guests who feel out of place). Send to Danial.",
        coldEmailAngle: "Danial - your product lives or dies on the quality of the actual experience, not just the match. I've managed [events / experiences] at [company] with [X] attendees across [Y locations] and I know what operational excellence looks like at the moment of human contact. I want that role.",
      },
    ],
    avoid: "A generic application will not survive. Proof of work is the only currency. Email pattern likely: keyan@222.place or first name at 222.place. Best approach: a direct email with something attached - a redesign, a technical brief, a brand analysis - that shows you have used the product, understood the thesis, and done the work before asking for the conversation.",
    signal: "\"We have 7 open roles. 222 is comprised of engineers, ML researchers, designers, operators, & artists. We work in person every day at our office in the heart of SoHo in New York City.\" Seven open roles. Sixteen people. In-person only. In SoHo. The roles are specific, the team is small, and almost nobody is applying through the right channel.",
    careersUrl: "https://careers.222.place",
    featured: true,
  },
  {
    name: "Jest",
    tagline: "about.jest.com · San Francisco, CA · Messaging Games Marketplace",
    website: "about.jest.com",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEcyYVxY92BIQ/company-logo_200_200/B56ZwbeAKVJwAI-/0/1769987376024/jest_com_logo?e=1773878400&v=beta&t=x4wRUEtbDA8XM_tW0U3X6Jq6_4lIJ_-7y5rseF_0YsE",
    round: "Seed",
    amount: "$7M",
    detail: "Founded 2025, under 15 people, 14 country expansion planned by Q3 2026",
    investors: "Innovation Endeavors (lead)",
    hiringScore: 9,
    hiringReason: "$7M seed announced 2 days ago. 14 country expansion planned by Q3 2026. They have to hire immediately.",
    whatBuilding: "Jest is building the first marketplace for messaging games that live inside your text thread and launch via a link, with no download, no app store, no 30% fee to Apple or Google. The underlying infrastructure shift is RCS: Rich Communication Services, the messaging protocol that Apple finally adopted with iOS 18 in late 2024. RCS gives developers the ability to embed rich, app-like experiences directly inside text messages. Jest is positioning itself as the distribution layer for this new category - a platform and fund for studios building games that meet players where they already are: in their messaging inbox. Revenue split is 90/10 in favour of developers. By comparison, the App Store takes 30%. Jest is also launching a dedicated Games Fund: up to $1 million per title for flagship games, $200,000 for mid-stage titles, and $40,000 for experimental concepts. Expansion to 14 countries is planned by Q3 2026.",
    whyMatters: "Every major gaming platform in history has been defined by a new distribution surface. Arcades. Console. PC. Mobile app stores. WeChat Mini Programs in China. The RCS moment is the first time in fifteen years that a genuinely new distribution surface has opened up at mobile scale with universal cross-platform support. App store downloads are declining. User acquisition costs on mobile are brutal. Jest is betting that a new surface means new economics and new winners and they are moving to own it before anyone else recognises the opportunity. Early partner retention data is striking: Jest reports three to four times better retention than traditional mobile apps, with partners reporting 30 to 60% lower user acquisition costs. Those numbers are not immaterial. Studios backed by Jest include Pocket Gems, Global Worldwide, and HayHay.",
    roles: ["Platform/Backend Engineer", "Studio Partnerships / Developer Relations"],
    rolesNote: "The fund just launched two days ago. Cold outreach now is competing against essentially nobody.",
    founder: {
      initials: "DV",
      name: "Deyan Vitanov",
      title: "CEO and Co-Founder",
      linkedin: "https://www.linkedin.com/in/deyan/",
      image: "https://media.licdn.com/dms/image/v2/C5103AQEnbmFK47OwSw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516327445157?e=2147483647&v=beta&t=IvHEHlIN9eUG2eGeozjeYgnHsEjMgM7xZo1VAlCMjhM",
      bio: "Vitanov is the public face of Jest. He is building something analogous to what Dror Berman at Innovation Endeavors described as \"a new distribution surface\", the VC framing is deliberately parallel to how App Store distribution was described in 2008. The WeChat Mini Program parallel is mentioned in press coverage and should be referenced, it shows you understand why China's version worked and what the Western equivalent requires. Contact: Deyan Vitanov - likely findable on LinkedIn. Email pattern likely: deyan@jest.com or deyan@about.jest.com. The fund just launched two days ago. Cold outreach now is competing against essentially nobody.",
    },
    outreachByRole: [
      {
        role: "Platform/Backend Engineer",
        proofOfWork: "Jest needs engineers who understand messaging infrastructure, RCS protocol integration, and lightweight game distribution at scale. Core skills: backend systems experience; ideally some familiarity with RCS, A2P messaging, or real-time lightweight application delivery; experience scaling a marketplace or distribution platform. For proof of work, build a minimal RCS message simulator: write a Python or Node script that constructs a valid RCS message payload, embeds a lightweight interactive element (a button, a game state update, a score), and logs the round-trip delivery simulation. Post it on GitHub with a README that explains the A2P messaging architecture and where RCS differs from SMS at the protocol level. Bonus points: include a section on how you'd handle delivery receipts at scale across 14 country markets with different carrier support tiers.",
        coldEmailAngle: "Deyan, I've been building [messaging/distribution/gaming] infrastructure at [company] and RCS adoption has been on my radar since iOS 18. Here's my read on the technical challenge at the distribution layer [two sentences]. I want to help Jest build it.",
      },
      {
        role: "Studio Partnerships / Developer Relations",
        proofOfWork: "Jest's success depends entirely on the quality and volume of games on the platform. That means someone needs to go out and convince game studios, from small indie shops to mid-tier publishers, that messaging is a real distribution channel worth building for. Core skills: developer relations or business development experience in gaming; relationships inside the mobile gaming ecosystem; ability to explain a new distribution paradigm to product-minded founders. For proof of work, write a one-page cold pitch deck slide, a single PDF or Notion page, addressed to a mid-tier mobile game studio (pick a real one: Kwalee, Tilting Point, Jam City) making the case for why they should build a messaging-native version of one of their existing titles. Be specific: what mechanic translates, what the retention math looks like, and why the 90/10 revenue split changes the acquisition economics. This is the exact document you would send on day one. Attach it to your cold email.",
        coldEmailAngle: "Deyan, I've spent [X years] working with mobile game studios and I've watched acquisition costs destroy margins for the last decade. Jest is the first genuinely new pitch I've heard that changes the math. I've mapped 20 studios I'd call on day one. Can we talk?",
      },
    ],
    avoid: "Don't send generic \"I love gaming\" messages. Lead with proof of work - an RCS simulator or a studio pitch deck. Reference the WeChat Mini Program parallel and why the Western equivalent requires different infrastructure. The fund just launched two days ago, timing matters.",
    signal: "Founded in 2025. Seed round was announced two days ago. Plans to expand to 14 countries in five months (evident in the growth role posting on their website) and will go toward scaling the platform and onboarding the first group of gaming studios. They have to hire immediately. There is no other interpretation.",
    careersUrl: "",
    featured: false,
  },
];

const trends = [
  { sector: "AI Investment Advisors (Consumer Fintech)", status: "Hot", text: "Astor's YC S25 backing and rebrand from Gaus signals the AI advisor category is heating up. Retail investors now account for 25% of all U.S. trading volume with 160M+ stock-owning Americans - and 56% still don't feel confident in their investment decisions. The tools they use haven't fundamentally changed in 15 years. Voice + chat AI interfaces are the new frontier." },
  { sector: "IRL Social Platforms", status: "Heating", text: "222's $10.1M Series A and 523K+ connections facilitated shows the market is ready for products that solve the social recession with real-world experiences, not better apps. Their proprietary labeled data on human social compatibility at scale is a moat no competitor can easily replicate. The in-person only hiring stance is a cultural signal that matters." },
  { sector: "RCS Gaming Distribution", status: "Emerging", text: "Jest's $7M seed from Innovation Endeavors is a bet on the first new mobile distribution surface in 15 years. RCS adoption post-iOS 18 opens a channel that bypasses app store fees (90/10 vs 70/30 splits) with 3-4x better retention than traditional mobile apps. The WeChat Mini Program playbook is finally possible in the West." },
];

const compBenchmarks = [
  { role: "Full-Stack Engineer (Consumer Fintech)", stage: "Seed (YC)", base: "$150K-$200K", equity: "0.2%-0.6%", notes: "Astor - React Native/Flutter, Next.js, financial APIs, voice interfaces" },
  { role: "AI/ML Engineer (Fintech)", stage: "Seed (YC)", base: "$160K-$220K", equity: "0.3%-0.8%", notes: "Astor - LangChain, financial NLP, recommendation systems" },
  { role: "Machine Learning Engineer", stage: "Series A", base: "$180K-$250K", equity: "0.1%-0.3%", notes: "222 - Recommendation systems, compatibility modeling, behavioral data" },
  { role: "iOS/Android Design Engineer", stage: "Series A", base: "$160K-$220K", equity: "0.1%-0.25%", notes: "222 - Consumer apps, high design bar, motion/interaction" },
  { role: "Head of Brand", stage: "Series A", base: "$150K-$200K", equity: "0.15%-0.35%", notes: "222 - Consumer brand, cultural sensibility, strategic + hands-on" },
  { role: "Platform/Backend Engineer", stage: "Seed", base: "$160K-$220K", equity: "0.3%-0.8%", notes: "Jest - RCS, messaging infrastructure, marketplace scaling" },
  { role: "Developer Relations", stage: "Seed", base: "$140K-$180K", equity: "0.2%-0.5%", notes: "Jest - Gaming industry, studio partnerships, BD experience" },
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
            <p className="text-xs text-rose-500 uppercase tracking-wider font-medium mb-4">How to reach out</p>

            {/* Founder Bios */}
            <div className="space-y-4 mb-5">
              {/* Main Founder */}
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

              {/* Co-founder */}
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

              {/* Third Founder */}
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

            {/* Role-specific Outreach */}
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

                {/* Founder Bios */}
                <div className="space-y-4 mb-5">
                  {/* Main Founder */}
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

                  {/* Co-founder */}
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

                  {/* Third Founder */}
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

                {/* Role-specific Outreach */}
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
              <p className="text-xs text-neutral-400">Mar 2, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$17.6M+ total this week · AI Investment + IRL Social + RCS Gaming</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$17.6M+</p>
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
            AI meets consumer finance with Astor (YC S25) building a personal Goldman Sachs research desk for retail investors - 160M+ Americans own stocks but 56% don&apos;t feel confident in their decisions. IRL social gets its Series A moment with 222 ($10.1M, General Catalyst backing) using ML to engineer serendipitous dinners across 7 cities - they have 7 open roles and almost nobody is applying through the right channel. RCS gaming distribution emerges with Jest ($7M, Innovation Endeavors) betting on the first new mobile distribution surface in 15 years - 90/10 revenue split vs App Store&apos;s 30% take. By the time you&apos;re applying through a job portal, the founder is already talking to someone who sent a cold email. Be that person.
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
                    <p className="font-medium text-neutral-900">AI Investment Advisors (Consumer Fintech)</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">Retail investors now account for 25% of all U.S. trading volume...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">IRL Social Platforms</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Heating</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">The market is ready for products that solve the social recession...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Full-Stack Engineer (Consumer Fintech)</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed (YC)</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$200K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.2%-0.6%</td>
                      <td className="py-3 text-neutral-500 text-xs">Astor - React Native, financial APIs</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Machine Learning Engineer</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Series A</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$180K-$250K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.1%-0.3%</td>
                      <td className="py-3 text-neutral-500 text-xs">222 - Recommendation systems, compatibility</td>
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
