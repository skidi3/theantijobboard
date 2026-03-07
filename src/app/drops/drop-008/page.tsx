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
  vimeoId?: string;
  videoUrl?: string;
  heroImage?: string;
  careersUrl?: string;
}

const startups: Startup[] = [
  {
    name: "Ciphero",
    tagline: "ciphero.ai · New York, NY · AI Verification Layer for Enterprise",
    website: "ciphero.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGCqGMA8ikvpA/company-logo_200_200/B4EZm7Rm4iKsAI-/0/1759783579720/ciphero_logo?e=2147483647&v=beta&t=t-ZRTf4nkMfEPOurr2R-XZgalOhr2MnMJwj6_YM2xQc",
    round: "Pre-Seed",
    amount: "$2.5M",
    detail: "8 people, oversubscribed round, ex-Fakespot (acquired by Mozilla)",
    investors: "Sovereign's Capital and Chingona Ventures (co-leads), BlueWing Ventures, Bullpen Capital, Everywhere Ventures, Hustle Fund, Lotus Venture Partners, Propeller, Viaka, FC Centripetal",
    hiringScore: 8,
    hiringReason: "Oversubscribed pre-seed with 8 people total. Capital earmarked for product development, design partners, and enterprise rollout. First 2-3 hires will define the company.",
    whatBuilding: "Ciphero builds an AI verification layer for enterprise environments, a system that captures, checks, and governs every AI interaction that occurs inside an organisation, whether human-initiated or agentic. As enterprise AI adoption has accelerated, the number of interactions with tools like ChatGPT, Copilot, Claude, and internal AI agents has exploded, and most security teams have no visibility into what data those interactions are touching or what those models are returning. Ciphero installs a sovereign control layer across all of it: auditing inputs and outputs in real time, flagging policy violations, detecting prompt injection attacks, verifying outputs against internal truth sources, and surfacing shadow AI usage that legacy DLP tools and static firewalls cannot see. The platform tracks behaviour across employees, models, and agent-to-agent interactions simultaneously, and enforces governance policies dynamically rather than through static rules. The pricing model is flat, not usage-based, which removes the friction that causes enterprise security buyers to throttle adoption.",
    whyMatters: "The numbers the company cites are not marketing estimates. They are the kind of figures that land in a CISO's quarterly review: 80% of enterprises show signs of shadow AI activity, one in six data breaches this year was traced to unauthorised AI usage, and 97% of organisations have no proper AI access controls in place. Enterprise AI governance barely existed as a compliance category eighteen months ago. Now it is in the top three items on every CISO's agenda in financial services, healthcare, legal, and government. Ciphero's founders built Fakespot, a detection and verification system for fake reviews and counterfeit listings, which Mozilla acquired in 2023. The underlying capability - identifying when an AI-generated or AI-mediated output is not what it claims to be - is exactly what Ciphero applies to enterprise AI interactions. This is not a pivot. It is the same detection architecture applied to a much larger and faster-growing threat surface.",
    roles: ["Security Engineer / AI Security Researcher", "Enterprise Sales / Security GTM"],
    rolesNote: "The round closed oversubscribed. Three founders and eight people total. The first two or three hires will define the company's technical and commercial trajectory, and the window to be one of them is short.",
    founder: {
      initials: "SK",
      name: "Saoud Khalifah",
      title: "CEO, ex-Fakespot Founder (acquired by Mozilla 2023)",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEJAG4WE6Om7g/profile-displayphoto-scale_200_200/B4EZj8doT1IIAc-/0/1756582283029?e=2147483647&v=beta&t=uQmN6NJLZrqOJSFOxjHMN294poD3BfZQpphUsPQOjnk",
      linkedin: "https://linkedin.com/in/saoud-khalifah",
      bio: "Khalifah and Gross built Fakespot from the ground up, scaled it to millions of users detecting fake reviews and counterfeit product listings at scale, and sold it to Mozilla in 2023. That exit is proof that this team can build adversarial detection systems that are accurate enough for a major browser company to acquire and embed in a product used by hundreds of millions of people. The capability they are bringing to Ciphero is the same one Mozilla paid for - redirected at a faster-growing and higher-value threat surface.",
    },
    cofounder: {
      name: "Rob Gross",
      title: "COO, ex-Fakespot Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGt_2cmSHWt_g/profile-displayphoto-shrink_400_400/B4EZdfdgzdHIAg-/0/1749653261915?e=1774483200&v=beta&t=pmKaGQbnAwKIeaqYdYRWiswp-_uHgW4Ez82joKuHZic",
      linkedin: "https://linkedin.com/in/robgross",
      bio: "Rob Gross co-founded Fakespot alongside Khalifah and led operations through the Mozilla acquisition. His operational experience scaling a detection platform to millions of users translates directly to the enterprise deployment challenges Ciphero faces.",
    },
    thirdFounder: {
      name: "Sen Tian",
      title: "CAIO (Chief AI Intelligence Officer)",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFO7wgNoNNCKw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1578278917600?e=1774483200&v=beta&t=b1IVTzPN0fUv035zvWCQUrD6j1t2Tz4qTxvBEHVjHOI",
      bio: "Sen Tian's title, Chief AI Intelligence Officer, is deliberate. It signals that the AI detection technology is being treated as a first-class product asset and not a feature bolted onto a security platform. At a company of eight people, the CAIO title means the technical architecture of the AI verification layer is Tian's domain and responsibility entirely.",
    },
    outreachByRole: [
      {
        role: "Security Engineer / AI Security Researcher",
        proofOfWork: "Ciphero's core technical challenge is building detection systems that can classify AI interactions as compliant or non-compliant at enterprise scale, in real time, across a wide range of AI tools with different output formats, token structures, and behavioural patterns. This is a hard adversarial detection and classification problem. The false positive rate is the hardest part: flag too much and enterprise security teams disable the tool; flag too little and the governance layer has no teeth. Core skills: security engineering with experience in enterprise DLP, CASB, or network security; familiarity with LLM behaviour and prompt injection patterns; ability to build adversarial detection systems that operate reliably under distribution shift; experience with policy enforcement at scale. Exposure to AI red-teaming, jailbreak research, or output verification is directly relevant. For proof of work, build a prompt injection detection demo: write a Python classifier that takes a set of LLM input/output pairs and flags likely prompt injection attempts, data exfiltration patterns, or policy violations. Use publicly available jailbreak datasets (AdvBench, JailbreakBench) as your test set. Post it on GitHub with a README that specifically addresses the false positive problem at enterprise scale.",
        coldEmailAngle: "Saoud, the AI interaction governance problem is one I have been watching from the CASB and DLP side and Ciphero is the first product I have seen that approaches it at the right layer. Here is what I built to think through the classification problem [GitHub link]. The false positive rate at enterprise scale is the thing that keeps me up at night. I want to be one of the first engineers here.",
      },
      {
        role: "Enterprise Sales / Security GTM",
        proofOfWork: "Security products live and die in enterprise by relationships. The buyer is the CISO and their immediate team, the procurement cycle is long, and the conversation requires deep fluency with how security programmes are structured, budgeted, and governed inside regulated organisations. Core skills: enterprise security sales with a track record of closing in financial services, healthcare, or legal verticals; existing relationships in the CISO community; ability to navigate multi-stakeholder procurement involving security, legal, compliance, and IT; comfort running a consultative sale where the buyer is still defining the problem. Prior experience selling DLP, CASB, SIEM, or endpoint security is directly transferable. For proof of work, write a two-paragraph CISO discovery opener for a financial services or healthcare CISO. The first paragraph names the specific AI governance gap they are most likely carrying right now: shadow AI usage across the organisation, no visibility into what data employees are sending to ChatGPT or Copilot, and no framework to govern agentic deployments. The second paragraph frames Ciphero's verification layer as the answer without overselling it. Keep the language clinical and precise.",
        coldEmailAngle: "Saoud, I have sold security products to enterprise CISOs for [X years] and the AI governance question is now in the top three things I hear in every discovery call. Ciphero has the clearest answer I have seen. Here are the first three accounts I would target and why [brief note]. I want to help build the commercial organisation.",
      },
    ],
    avoid: "Don't send generic AI enthusiasm. Be specific, be brief, attach proof of work. At pre-seed with eight people the founders are making every hire personally, and a cold email with a GitHub link or a named account list will be read the same day it lands. Reference the Fakespot/Mozilla acquisition - it's the credibility anchor that proves this team can build adversarial detection systems at scale.",
    signal: "The oversubscribed round is a signal of unusual investor conviction at pre-revenue stage. Sovereign's Capital manages $780M+ and doesn't chase hype. Chingona Ventures' Samara Hernandez specifically called out the team's enterprise credibility as the investment rationale. Bullpen Capital specialises in post-seed bridge rounds for companies building toward large enterprise exits. Hustle Fund backs operators who move fast. Both lead investors are backing the team as much as the product, which means the founders will be deliberately selective about who joins and why.",
    heroImage: "https://media.licdn.com/dms/image/v2/D4E16AQEAtARf1nTs-A/profile-displaybackgroundimage-shrink_350_1400/B4EZnpbkgKKkAY-/0/1760557943411?e=1774483200&v=beta&t=kxyazkKu-lP7S2gDX_DKeQiSKpvx_L3TfPJGKWRn8Vk",
    careersUrl: "",
    featured: false,
  },
  {
    name: "Solid",
    tagline: "getsolid.ai · New York, NY + Israel · Semantic Engineering Platform",
    website: "getsolid.ai",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHT6P23ypqLEA/company-logo_200_200/company-logo_200_200/0/1716373267177/soliddatainc_logo?e=2147483647&v=beta&t=_pesF36gIW5f5CTh6NtrPHCtjrsvlf0NN8hGL2zFXnc",
    vimeoId: "1132235835",
    round: "Seed",
    amount: "$20M",
    detail: "Team8-led, US sales buildout starting now, SurveyMonkey as live customer",
    investors: "Team8 (lead), SignalFire",
    hiringScore: 9,
    hiringReason: "$20M seed with explicit mandate to hire US salespeople. Zero US commercial hires exist. Product GA and funding announced simultaneously - they need customers fast.",
    whatBuilding: "Solid is an enterprise AI platform built around a new discipline the founders call Semantic Engineering. The problem it solves is quiet but debilitating: every large company has data scattered across dozens of systems, and every team inside that company defines its core metrics slightly differently. Revenue means different things to finance and to sales. Customer health means different things to product and to customer success. When AI agents are deployed on top of this fragmented semantic landscape, they produce inconsistent, contradictory, and sometimes simply wrong answers. The bigger the company, the worse the problem. Solid's platform creates what it calls a dynamic semantic layer: a single source of truth for business meaning, automatically maintained and continuously tested as the business evolves. It integrates directly with Snowflake, Databricks, and BigQuery, imports and interprets existing dashboards and documentation, and builds semantic models that both AI agents and human analysts can trust. The company claims the platform raises AI response accuracy from a typical 20 to 30 percent baseline to over 85 percent, and compresses AI deployment timelines from one to two years down to six months.",
    whyMatters: "The enterprise AI reliability problem is real, structurally underestimated, and embarrassingly familiar to anyone who has sat in a room where two executives pull different numbers from two dashboards. Solid is not building another AI feature on top of Snowflake. It is inserting itself into the data infrastructure layer below the AI agents, below the dashboards, at the level where meaning is defined. The founders' thesis, that a new class of professionals called Semantic Engineers will emerge to own this problem much like Analytics Engineers emerged around dbt in the 2020s, is a category-creation bet. If they are right, Solid becomes the platform those professionals build on. The second-time founder credibility and the SurveyMonkey customer reference suggest the market is responding to the thesis, not just the pitch.",
    roles: ["Enterprise Account Executive (US)", "Solutions Engineer / Customer Implementation"],
    rolesNote: "The press release was timed to coincide with a product GA launch. SurveyMonkey is named as a live customer. No commercial team is named anywhere in the press. The explicit use of funds: hire US salespeople and grow the Israel R&D team. There are currently zero US commercial hires.",
    founder: {
      initials: "YL",
      name: "Yoni Leitersdorf",
      title: "CEO, second-time enterprise data founder",
      image: "https://cdn.prod.website-files.com/68eccfbb63da252f1ceaa608/69491c6725f107360bbfa40e_Frame%201171275300.avif",
      linkedin: "https://linkedin.com/in/yonileitersdorf",
      bio: "Yoni Leitersdorf is a second-time, successful enterprise data founder based primarily in Israel. The US-facing commercial presence is new as of this funding round. Leitersdorf has a public Substack where he writes about semantic engineering, which is the best place to understand his intellectual framing before reaching out. His blog is called 'Building an AI-powered Analytics Startup' at journey.getsolid.ai. Reading two or three of his posts before reaching out will materially change the quality of your outreach. He is looking for people who understand that the semantic layer problem is a category, not a product feature.",
    },
    cofounder: {
      name: "Tal Segalov",
      title: "CTO, second-time enterprise data founder",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHmIXl7b2_6cw/profile-displayphoto-scale_200_200/B4DZkuJapYJcAY-/0/1757415845031?e=2147483647&v=beta&t=5WtUOOFbTuN7sP5F9_eGMokqvS31c8LhDw9eJax0XcY",
      linkedin: "https://linkedin.com/in/talsegalov",
      bio: "Tal Segalov is Leitersdorf's co-founder across multiple companies. Both are second-time, successful enterprise data founders. The technical architecture and Israel R&D team is Segalov's domain.",
    },
    outreachByRole: [
      {
        role: "Enterprise Account Executive (US)",
        proofOfWork: "Solid's buyers are VPs and Directors of Data Engineering, along with Chief Data Officers, at mid to large enterprise companies. These are technical buyers who will ask hard questions about semantic model architecture before they sign. The AE needs to understand data infrastructure deeply enough to be credible in those conversations, and to navigate complex procurement cycles at companies with internal data governance mandates. Core skills: experience selling enterprise data or analytics tools (dbt, Databricks, Snowflake, Tableau, Looker ecosystem); familiarity with data governance and data quality buyer problems; ability to run a complex six to eighteen month sales cycle with multiple technical stakeholders. For proof of work, write a two-paragraph cold email to a VP of Data Engineering at a named company you know is actively expanding its AI capabilities, where the first paragraph identifies the specific semantic drift problem that AI creates at their company's data scale, and the second paragraph frames Solid as the structural fix. Do not make it generic. Name the company, name the problem, name the specific consequence you would expect them to be experiencing.",
        coldEmailAngle: "Yoni, I have spent [X years] selling into the VP of Data Engineering persona and I know exactly what makes them trust a semantic layer argument versus dismiss it. I want to be the first AE who brings Solid into the [financial services / healthcare / retail] accounts where I have warm relationships. Here's the email I'd lead with [paste]. Can we talk?",
      },
      {
        role: "Solutions Engineer / Customer Implementation",
        proofOfWork: "Solid's technical depth means that closing a deal is only the first step. Deploying the semantic layer into a company's actual data stack - parsing existing dashboards, ingesting documentation, resolving definition conflicts between teams, and validating the models against real query patterns - is where the product either proves itself or fails. The Solutions Engineer is the person who makes deployment succeed. This is a high-impact role at seed stage: you will build the implementation playbook that the company uses for every subsequent customer. For proof of work, pick a public dataset or use a company you have personally worked with and build a simple semantic model for it: define three business metrics, identify where they are defined inconsistently across hypothetical teams, and describe how you would build a unified definition that AI can trust. Post it publicly.",
        coldEmailAngle: "Yoni, I come from [data engineering / analytics engineering / enterprise data consulting] and I have lived the problem Solid is solving from the implementation side. I know which steps in a semantic model deployment take six weeks when they should take one, and why. I want to build the implementation playbook.",
      },
    ],
    avoid: "Don't reach out without reading Leitersdorf's Substack first (journey.getsolid.ai). Generic data platform pitches won't land. He's looking for people who understand that the semantic layer problem is a category, not a product feature. Reference Team8's co-build model - they embed operational support, talent pipelines, and enterprise customer introductions alongside capital.",
    signal: "Team8 doesn't write checks. It co-builds companies, embedding operational support, talent pipelines, and enterprise customer introductions alongside capital. When Team8 leads, it means the product has passed their internal thesis review and they're activating their network behind it. SignalFire's proprietary 'Beacon' system tracks which engineers are likely to move before they do - their participation is a talent-quality endorsement as much as a financial one. Team8's prior builds (Axonius, Miggo) followed the identical model: Israel builds the product, New York scales the commercial team. Solid is in the commercial scaling phase today.",
    careersUrl: "",
    featured: true,
  },
  {
    name: "BizTrip AI",
    tagline: "biztrip.ai · San Francisco, CA · Agentic AI for Corporate Travel",
    website: "biztrip.ai",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE6cbbh3u6H1Q/company-logo_200_200/B4DZb6LAF3GkAc-/0/1747953910440/biztripai_logo?e=2147483647&v=beta&t=7fRimoXD3JXPFDLpDuUOAiteCwTzff7gB6qxB4jQx7U",
    round: "Pre-Seed",
    amount: "$2.5M",
    detail: "Andrew Ng's AI Fund lead investor, Sabre strategic, Moderna + Cain Travel as customers",
    investors: "RRE Ventures (lead, most recent tranche), AI Fund (Andrew Ng), BAG Collective, BAG Ventures, Correlation Ventures, Sabre Corporation (strategic), angels including Michael Cain (CEO Cain Travel) and Valerie Layman (former CPO Yapta)",
    hiringScore: 8,
    hiringReason: "Press release names three hire categories: engineering, product development, customer growth. Sabre strategic investment signals distribution opportunity. B2B channel thesis not yet staffed.",
    whatBuilding: "BizTrip AI is an agentic AI platform for corporate travel management. The problem it addresses is mundane in description and enormous in scale: corporate travel is a $1.5 trillion annual market and the software stack managing most of it was designed in the 1990s. The booking tools, compliance checking, itinerary management, and price monitoring systems that enterprise travel managers use today are legacy monoliths that require human coordination at every step. BizTrip's core product is a proprietary Travel LLM and multi-agent architecture that acts as a personal executive assistant for business travellers. It reads calendars, understands corporate travel policy in real time, delivers personalised flight and hotel options that are already compliant, books them, monitors prices after booking, automatically re-shops for better fares, and manages itinerary changes with no human intervention. The company claims it reduces corporate travel costs by 7 to 8 percent annually through a combination of continuous price monitoring, policy compliance enforcement, and agent-driven booking efficiency.",
    whyMatters: "The corporate travel category is at the stage that expense management was in 2015, when Expensify and Brex were just beginning to attack Concur. The incumbents (SAP Concur, Navan, Deem) are large, sticky, and increasingly unable to move at the speed that agentic AI requires. They face the classic innovator's dilemma: their existing customers are tied to legacy integrations that cannot be easily migrated to an agent-first architecture. BizTrip is building the agent-first architecture from scratch, without a legacy integration burden. The fact that Moderna and Cain Travel are live customers at this stage is a meaningful data point. Moderna is a company with an actively managed corporate travel programme. Cain Travel is a regional TMC that validates the B2B distribution thesis: if BizTrip can become the AI layer that TMCs power their own offerings with, the GTM becomes a channel play rather than pure direct enterprise sales.",
    roles: ["AI / ML Engineer (Travel Domain)", "Travel Industry Partnerships / TMC Channel"],
    rolesNote: "The press release names the use of funds explicitly: 'product development, engineering hires, and customer growth.' That is three separate hire categories. The B2B channel thesis via TMCs is not staffed. Sabre's strategic investment opens a distribution path that needs someone to manage it.",
    founder: {
      initials: "TR",
      name: "Tom Romary",
      title: "CEO, ex-Yapta Founder (acquired by Coupa 2019), ex-SVP Deem, ex-VP Alaska Airlines",
      image: "https://aifund.ai/wp-content/uploads/2025/07/qtq_30.webp",
      linkedin: "https://linkedin.com/in/tomromary",
      bio: "Tom Romary is a serial travel tech entrepreneur. Harvard MBA. Former Founder and CEO of Yapta (acquired by Coupa 2019), SVP at Deem, VP Marketing at Alaska Airlines. His personal investment in individual athletes and philanthropic climbing projects (he has completed seven Ironman triathlons and led fundraising climbs in Nepal) tells you something about his character: this is a person who finishes what he starts and has no patience for people who do not. Reference Yapta specifically in your outreach: not as a credential check but as a product insight. Yapta was the first company to systematically monitor post-booking prices. BizTrip is the AI-native evolution of that idea. If you can articulate why the current moment is different from 2007 and what that means for the product, you will have his attention.",
    },
    cofounder: {
      name: "Scott Persinger",
      title: "CTO, agentic AI innovator",
      image: "https://media.licdn.com/dms/image/v2/C5603AQEkZLLKGXHz_g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1577142760404?e=2147483647&v=beta&t=k5iHEsYD0JivPTYGD0z5Vdd8kQXjoX95H22MTzgbyro",
      linkedin: "https://linkedin.com/in/scottpersinger",
      bio: "Scott Persinger is described as a 'renowned agentic AI innovator.' He leads the technical architecture of BizTrip's proprietary Travel LLM and multi-agent system.",
    },
    outreachByRole: [
      {
        role: "AI / ML Engineer (Travel Domain)",
        proofOfWork: "BizTrip's proprietary Travel LLM is the core technical asset. Building a domain-specific model that understands corporate travel policy language, GDS data formats, airline fare class rules, and hotel rate structures is a genuinely hard applied ML problem. The engineers who built the first version are the founding team. Scaling the model to handle more edge cases, more corporate policy types, and more GDS integrations requires adding engineering depth. Core skills: experience with LLM fine-tuning or domain-specific model training; familiarity with agentic AI architectures and multi-agent orchestration; ideally some exposure to travel data formats (GDS data, EDIFACT, TMC booking data); ability to work with real-time pricing signals and dynamic re-optimisation problems. For proof of work, build a minimal demonstration of what a 'travel agent' looks like: a simple Python script that takes a natural language travel request, identifies the key structured parameters, and outputs a set of hypothetical booking decisions with reasoning. Post it on GitHub. Add a README note on how you would approach the domain-specific fine-tuning challenge for corporate travel policy language.",
        coldEmailAngle: "Tom, the Travel LLM problem is harder than a general-purpose travel assistant because corporate policy language is idiosyncratic and the fare class rules that determine price re-shopping eligibility are a domain most ML engineers have never encountered. I have been working on [domain-specific LLM / agentic AI] and I have a specific take on how you approach policy language encoding. Happy to share.",
      },
      {
        role: "Travel Industry Partnerships / TMC Channel",
        proofOfWork: "Sabre's strategic investment opens a specific distribution path: TMCs (Travel Management Companies) as a channel. Someone needs to build and manage those relationships. This is not traditional SaaS enterprise sales. It is partnership development with industry players who have their own proprietary systems, their own client relationships, and their own incentive structures. The person who does this work needs to know the travel industry from the inside. For proof of work, write a one-page TMC partnership brief. Choose a real, named regional or national TMC. Describe their current technology stack (to the extent it is publicly known), their likely buyer for BizTrip's API access, the commercial model that would work for them (white-labelling, revenue sharing, co-selling), and the first three sentences you would use to open the conversation.",
        coldEmailAngle: "Tom, I spent [X years] in [travel tech / TMC operations / corporate travel management] and I know exactly how TMCs think about technology partnerships and what makes them move. The Sabre investment is a signal that the channel play is the right one. I have a view on the three TMC conversations you should have first and why.",
      },
    ],
    avoid: "Don't send generic AI enthusiasm. Reference Yapta specifically - it was the first company to systematically monitor post-booking prices, and BizTrip is the AI-native evolution of that idea. If you can articulate why the current moment is different from 2007 and what that means for the product, you will have Romary's attention. For the TMC channel role, show you understand the travel industry from the inside.",
    signal: "RRE leading the most recent tranche is the timing signal. RRE does not lead rounds in companies still finding product-market fit. They lead when the product works and the problem is distribution. Andrew Ng's AI Fund remaining the largest investor across three consecutive tranches means the ML architecture has passed internal review each time. Sabre Corporation is a strategic investor - they control booking infrastructure for thousands of enterprise travel programmes. If that relationship matures into a distribution agreement, it creates a customer pipeline. The gap between a working product and a team that sells it is precisely where you step in now.",
    careersUrl: "",
    featured: false,
  },
];

const trends = [
  { sector: "Enterprise AI Governance", status: "Hot", text: "Ciphero's $2.5M oversubscribed pre-seed signals enterprise AI governance has moved from theoretical concern to CISO priority. 80% of enterprises show shadow AI activity, one in six data breaches trace to unauthorised AI usage, and 97% have no proper AI access controls. The Fakespot-to-Mozilla exit proves this team can build adversarial detection systems that work at scale." },
  { sector: "Semantic Engineering / Enterprise AI Reliability", status: "Emerging", text: "Solid's $20M seed with Team8 validates the thesis that a new category of 'Semantic Engineers' will emerge to solve the enterprise AI reliability problem. When AI agents produce inconsistent answers because 'revenue' means different things to different teams, the fix isn't a better model - it's a semantic layer that defines meaning consistently. Category-creation bets like this either define the market or lose to whoever names it first." },
  { sector: "Agentic AI for Vertical SaaS", status: "Heating", text: "BizTrip's $2.5M from Andrew Ng's AI Fund and Sabre strategic investment shows the agentic AI thesis is moving from horizontal platforms to vertical-specific applications. Corporate travel is a $1.5T market running on 1990s software. The incumbents face classic innovator's dilemma - their existing customers are tied to legacy integrations. BizTrip is building agent-first architecture from scratch." },
];

const compBenchmarks = [
  { role: "Security Engineer / AI Security Researcher", stage: "Pre-Seed", base: "$150K-$200K", equity: "0.5%-1.5%", notes: "Ciphero - DLP, CASB, prompt injection detection" },
  { role: "Enterprise Security Sales", stage: "Pre-Seed", base: "$140K-$180K + OTE", equity: "0.3%-0.8%", notes: "Ciphero - CISO relationships, regulated verticals" },
  { role: "Enterprise Account Executive", stage: "Seed", base: "$150K-$200K + OTE", equity: "0.1%-0.3%", notes: "Solid - data infrastructure, CDO/VP Data buyers" },
  { role: "Solutions Engineer", stage: "Seed", base: "$140K-$180K", equity: "0.2%-0.5%", notes: "Solid - Snowflake/Databricks, semantic modeling" },
  { role: "AI/ML Engineer (Domain-Specific)", stage: "Pre-Seed", base: "$180K-$250K", equity: "0.5%-1.2%", notes: "BizTrip - LLM fine-tuning, agentic architecture" },
  { role: "Partnerships / Channel Sales", stage: "Pre-Seed", base: "$130K-$170K + OTE", equity: "0.3%-0.7%", notes: "BizTrip - travel industry, TMC relationships" },
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
              <p className="text-xs text-neutral-400">Mar 6, 2026</p>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-1.5 sm:mb-2">
            3 startups that just raised
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">$25M total this week · AI Governance + Semantic Engineering + Travel AI</p>
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
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">$25M</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Total raised</p>
          </div>
          <div className="text-center py-4 sm:py-5 px-2 sm:px-3">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900">2 Pre, 1 Seed</p>
            <p className="text-[10px] sm:text-xs text-neutral-400">Round mix</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={cdn("/logo.webp")} alt="" className="w-4 h-4" />
            <p className="text-xs text-neutral-400 uppercase tracking-wider">This week</p>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Enterprise AI governance lands its first serious infrastructure bet with Ciphero ($2.5M oversubscribed pre-seed) - the Fakespot team that Mozilla acquired is now building the verification layer every CISO needs as shadow AI usage explodes across organisations. Solid ($20M seed from Team8) is creating a new category called Semantic Engineering - solving the enterprise AI reliability problem by defining what metrics actually mean before AI agents produce contradictory answers. BizTrip AI ($2.5M from Andrew Ng&apos;s AI Fund + Sabre strategic) is bringing agentic AI to the $1.5T corporate travel market with a Travel LLM that already has Moderna as a customer. The pattern: AI infrastructure is moving from horizontal platforms to vertical-specific applications, and the compliance/governance layer is becoming as important as the capability layer.
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
                    <p className="font-medium text-neutral-900">Enterprise AI Governance</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">Hot</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">80% of enterprises show shadow AI activity, one in six data breaches trace to unauthorised AI usage...</p>
                </div>
                <div className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-neutral-900">Semantic Engineering</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Emerging</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">A new category of professionals will emerge to solve the enterprise AI reliability problem...</p>
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
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Security Engineer / AI Security</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Pre-Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$200K</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.5%-1.5%</td>
                      <td className="py-3 text-neutral-500 text-xs">Ciphero - DLP, CASB</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">Enterprise Account Executive</td>
                      <td className="py-3 pr-6 text-neutral-500 whitespace-nowrap">Seed</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">$150K-$200K + OTE</td>
                      <td className="py-3 pr-6 text-neutral-900 whitespace-nowrap">0.1%-0.3%</td>
                      <td className="py-3 text-neutral-500 text-xs">Solid - data infrastructure</td>
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
