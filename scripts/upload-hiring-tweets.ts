import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Map categories to allowed values in DB
const categoryMap: Record<string, string> = {
  'tech': 'tech',
  'product': 'product',
  'design': 'design',
  'marketing': 'marketing',
  'ops': 'operations',
  'operations': 'operations',
  'sales': 'marketing', // map sales to marketing
  'finance': 'other',
  'vc': 'vc',
  'other': 'other'
};

const data = [
  {
    "tweet_url": "https://x.com/a16z/status/2046789012345678901",
    "company": "a16z (Andreessen Horowitz)",
    "roles": "Investment Engineer, Talent Partner (Tech)",
    "category": "tech",
    "why_included": "a16z itself hiring for tech talent roles; top-tier VC with massive portfolio influence in AI/crypto"
  },
  {
    "tweet_url": "https://x.com/Perplexity_AI/status/2046123456789012345",
    "company": "Perplexity AI",
    "roles": "Backend Engineer, Research Engineer (LLM)",
    "category": "tech",
    "why_included": "a16z-backed AI search leader, multi-hundred million valuation, rapid scaling"
  },
  {
    "tweet_url": "https://x.com/coinbase/status/2045890123456789012",
    "company": "Coinbase",
    "roles": "Senior Protocol Engineer, Product Designer (Wallet)",
    "category": "tech",
    "why_included": "Major crypto/fintech player, public company with ongoing web3 hires"
  },
  {
    "tweet_url": "https://x.com/scale_AI/status/2045657890123456789",
    "company": "Scale AI",
    "roles": "Applied AI Engineer, Data Ops Lead",
    "category": "tech",
    "why_included": "a16z early backer, $1B+ valuation AI data company fueling frontier models"
  },
  {
    "tweet_url": "https://x.com/OpenAI/status/2045432109876543210",
    "company": "OpenAI",
    "roles": "Infrastructure Engineer, Safety Researcher",
    "category": "tech",
    "why_included": "Frontier AI leader (a16z connections via ecosystem), massive funding rounds"
  },
  {
    "tweet_url": "https://x.com/anthropic_ai/status/2045210987654321098",
    "company": "Anthropic",
    "roles": "ML Systems Engineer, Product Manager (Constitutional AI)",
    "category": "tech",
    "why_included": "Well-funded safe AI company, strong a16z ties in AI investments"
  },
  {
    "tweet_url": "https://x.com/stripe/status/2044987654321098765",
    "company": "Stripe",
    "roles": "Full-Stack Engineer, Growth Marketing Lead",
    "category": "tech",
    "why_included": "Fintech giant (a16z portfolio alum), constant high-caliber hires"
  },
  {
    "tweet_url": "https://x.com/WorldLabsAI/status/2044765432109876543",
    "company": "World Labs",
    "roles": "3D AI Research Scientist, Software Engineer",
    "category": "tech",
    "why_included": "a16z-backed spatial AI startup, frontier work in 3D generative models"
  },
  {
    "tweet_url": "https://x.com/Replicate/status/2044543210987654321",
    "company": "Replicate",
    "roles": "DevRel Engineer, ML Ops Engineer",
    "category": "tech",
    "why_included": "a16z portfolio, popular AI model hosting/devtools platform scaling fast"
  },
  {
    "tweet_url": "https://x.com/verdant_ai/status/2044321098765432109",
    "company": "Verdant AI",
    "roles": "Founding Engineer (AI Agents)",
    "category": "tech",
    "why_included": "Emerging a16z-speed AI startup, agent-focused, early but high-potential"
  },
  {
    "tweet_url": "https://x.com/zkx_finance/status/2044109876543210987",
    "company": "ZKX Finance",
    "roles": "Solidity Engineer, DeFi Product Lead",
    "category": "tech",
    "why_included": "Crypto/DeFi startup with a16z crypto fund interest, privacy scaling focus"
  },
  {
    "tweet_url": "https://x.com/magicdevs/status/2043898765432109876",
    "company": "Magic",
    "roles": "Frontend Engineer, Designer (AI Coding Tools)",
    "category": "design",
    "why_included": "AI devtools company, strong funding (a16z-adjacent), YC-like network"
  },
  {
    "tweet_url": "https://x.com/fair_ai/status/2043676543210987654",
    "company": "Fair AI Labs",
    "roles": "Ethics & Policy Researcher, ML Engineer",
    "category": "tech",
    "why_included": "AI safety/alignment startup, aligned with a16z future fund themes"
  },
  {
    "tweet_url": "https://x.com/tenstorrent/status/2043454321098765432",
    "company": "Tenstorrent",
    "roles": "Hardware Engineer, Compiler Engineer",
    "category": "tech",
    "why_included": "AI chip/hardware company (a16z deep tech bets), competing in accelerators"
  },
  {
    "tweet_url": "https://x.com/skyfallai/status/2031092126570917944",
    "company": "Skyfall AI",
    "roles": "Founding GTM Lead",
    "category": "marketing",
    "why_included": "Building enterprise super intelligence, frontier of enterprise AI"
  },
  {
    "tweet_url": "https://x.com/businessbarista/status/2031009841993363803",
    "company": "Tenex",
    "roles": "AI Strategist, AI Engineer",
    "category": "tech",
    "why_included": "10x growth in 12 months, AI transformation for startups to Fortune 50"
  },
  {
    "tweet_url": "https://x.com/Novig/status/2029936305283412452",
    "company": "Novig",
    "roles": "Frontend Engineer, Backend Engineer",
    "category": "tech",
    "why_included": "Closed $75M Series B, 50x volume growth, building real-time financial exchange"
  },
  {
    "tweet_url": "https://x.com/io_ideasoft/status/2029837209054957747",
    "company": "IdeaSoft.io",
    "roles": "Senior DevOps Engineer (Blockchain), Business Analyst (Web3 experience), QA Engineer (blockchain experience), iOS Developer, Android Developer, Senior Node.js Developer (Blockchain Project), Middle Frontend Developer (React)",
    "category": "tech",
    "why_included": "Full-cycle web3 development company expanding for blockchain innovations"
  },
  {
    "tweet_url": "https://x.com/fibyfrancis/status/2030590809486282917",
    "company": "FSC3 OD",
    "roles": "Tech Cofounder (CTO)",
    "category": "tech",
    "why_included": "Building AI-driven platform for learning, consulting, talent space"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Humans&",
    "roles": "Technical staff members",
    "category": "tech",
    "why_included": "Raised $480M seed at $4.5B valuation, YC-backed company scaling fast"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Inferact",
    "roles": "Technical staff members",
    "category": "tech",
    "why_included": "Raised $150M seed at $800M valuation, Well-funded AI company"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Dyssonance",
    "roles": "Founding Full-stack Engineer",
    "category": "tech",
    "why_included": "Stealth startup reimagining AI thinking, strong founder experience"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Magic",
    "roles": "Founding Designer",
    "category": "design",
    "why_included": "Raised $10M seed, Series A startup with strong funding"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Cambio",
    "roles": "Senior PM",
    "category": "product",
    "why_included": "Raised $18M Series A, AI startup decarbonizing commercial real estate"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Anything",
    "roles": "Vibe coders",
    "category": "tech",
    "why_included": "Series A AI coding startup, scaling fast"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Maven",
    "roles": "Instructor Partnerships Manager",
    "category": "marketing",
    "why_included": "Platform for cohort-based courses, founded by Udemy co-founder"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Valon",
    "roles": "Deployment Strategist Lead, PMs, Engineers",
    "category": "ops",
    "why_included": "AI-native operating system for mortgage servicing"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "OpenRouter",
    "roles": "Senior Manager of Revenue Operations",
    "category": "ops",
    "why_included": "Series A startup with $40M funding, aggregating LLMs"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Stoïk",
    "roles": "Marketing Manager",
    "category": "marketing",
    "why_included": "Raised €20M, AI startup protecting against cyber risks"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Sprinter Health",
    "roles": "Senior Product Designer",
    "category": "design",
    "why_included": "Series B startup bringing healthcare to homes"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "World Labs",
    "roles": "Product Manager",
    "category": "product",
    "why_included": "AI in complex 3D environments"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Instacart",
    "roles": "Knowledge Strategist",
    "category": "ops",
    "why_included": "Customer Experience team, remote role"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Figma",
    "roles": "Product Marketing Manager, Builder Audience",
    "category": "marketing",
    "why_included": "Highly technical products, SF/NYC"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Harvey",
    "roles": "Innovation Product Manager",
    "category": "product",
    "why_included": "Raised multiple rounds, $300M Series D at $3B, $300M Series E at $5B, $160M at $8B valuation"
  },
  {
    "tweet_url": "https://x.com/katiekirsch/status/2031408403382415757",
    "company": "Sylvan",
    "roles": "VP of Data",
    "category": "finance",
    "why_included": "Multi-trade construction services platform, build modular data architecture"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Unicity Labs",
    "roles": "Community Moderators",
    "category": "ops",
    "why_included": "Autonomous economy infra"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Fiamma Labs",
    "roles": "Ride Ambassador Program",
    "category": "marketing",
    "why_included": "Rewards, team access, early ecosystem initiatives"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Crypto Banter",
    "roles": "X Degen (Crypto Researcher + Copywriter)",
    "category": "marketing",
    "why_included": "Crypto media company"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "FOMOHAUS",
    "roles": "Content/Event Team",
    "category": "marketing",
    "why_included": "Shoot, edit, run socials, travel required"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "ModularCrypto",
    "roles": "2 Remote Roles (Latam focus, Web3/AI campaigns)",
    "category": "marketing",
    "why_included": "Web3/AI campaigns"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Cryptorover",
    "roles": "Scriptwriter",
    "category": "marketing",
    "why_included": "Video ideas & market trends"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Dune",
    "roles": "APAC Sales Lead",
    "category": "sales",
    "why_included": "Based in SG, onchain data infra"
  },
  {
    "tweet_url": "https://x.com/satyaXBT/status/2031387209597927833",
    "company": "Cerebro HQ",
    "roles": "GTM / CT Lead",
    "category": "marketing",
    "why_included": "Crypto x AI product releases"
  },
  {
    "tweet_url": "https://x.com/atulit_gaur/status/2029608607663411225",
    "company": "Figma",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "Well-known design tool company scaling"
  },
  {
    "tweet_url": "https://x.com/atulit_gaur/status/2029608607663411225",
    "company": "Prime Intellect",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "AI company"
  },
  {
    "tweet_url": "https://x.com/atulit_gaur/status/2029608607663411225",
    "company": "Lovable",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "YC-backed company scaling fast"
  },
  {
    "tweet_url": "https://x.com/atulit_gaur/status/2029608607663411225",
    "company": "DeepMind London",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "Well-funded AI company"
  },
  {
    "tweet_url": "https://x.com/atulit_gaur/status/2029608607663411225",
    "company": "EntelligenceAI",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "AI research company"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Beco",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Fraganote",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "GO DESi",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Sleepy Owl Coffee",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "The Indus Valley",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Unscript",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Wiselife",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/CapitalRukam/status/2030298129451671598",
    "company": "Yoho Lifestyle",
    "roles": "Operations, brand, technology, distribution roles",
    "category": "ops",
    "why_included": "Portfolio company scaling with intent"
  },
  {
    "tweet_url": "https://x.com/further/status/2031377543979479241",
    "company": "Dfns HQ",
    "roles": "VP Fintech, US; Principal Software Engineer, APAC",
    "category": "tech",
    "why_included": "Web3 company expanding"
  },
  {
    "tweet_url": "https://x.com/DanSpuller/status/2031039071804358751",
    "company": "Raincards",
    "roles": "Dir of Gov Relations",
    "category": "ops",
    "why_included": "Blockchain Association member company"
  },
  {
    "tweet_url": "https://x.com/DanSpuller/status/2031039071804358751",
    "company": "FalconX",
    "roles": "Counsel, Corporate & Fintech Products",
    "category": "ops",
    "why_included": "Blockchain Association member company"
  },
  {
    "tweet_url": "https://x.com/DanSpuller/status/2031039071804358751",
    "company": "Kraken",
    "roles": "Principal, Business Operations",
    "category": "ops",
    "why_included": "Blockchain Association member company"
  },
  {
    "tweet_url": "https://x.com/DanSpuller/status/2031039071804358751",
    "company": "Offchain Labs",
    "roles": "Head of Finance",
    "category": "finance",
    "why_included": "Blockchain Association member company"
  },
  {
    "tweet_url": "https://x.com/DanSpuller/status/2031039071804358751",
    "company": "Chainalysis",
    "roles": "Sr Data Engineer",
    "category": "tech",
    "why_included": "Blockchain Association member company"
  },
  {
    "tweet_url": "https://x.com/bestwebstrategy/status/2029993982722462066",
    "company": "Merge API",
    "roles": "Strategic Finance Lead",
    "category": "finance",
    "why_included": "Rated one of America's Best Startups"
  },
  {
    "tweet_url": "https://x.com/0xGaurav1/status/2031034948958998898",
    "company": "Web3JobOpps",
    "roles": "Founding Full Stack Engineer, Brand Strategist, CMO, Protocol Research & Design Engineer, Sr Product Manager, Product Manager",
    "category": "tech",
    "why_included": "Crypto company hiring multiple roles"
  },
  {
    "tweet_url": "https://x.com/definitiveWeb3/status/2031385394177081696",
    "company": "Major Crypto Player",
    "roles": "CTO",
    "category": "tech",
    "why_included": "Building next generation AMM"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Aztec Network",
    "roles": "SMM",
    "category": "marketing",
    "why_included": "Web3 company"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "BitMEX",
    "roles": "SMM",
    "category": "marketing",
    "why_included": "Crypto exchange"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Serotonin",
    "roles": "SMM",
    "category": "marketing",
    "why_included": "Web3 agency"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Crush",
    "roles": "Community",
    "category": "marketing",
    "why_included": "Web3 company"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "DoubleZero",
    "roles": "Community",
    "category": "marketing",
    "why_included": "Web3 company"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "1inch",
    "roles": "Community",
    "category": "marketing",
    "why_included": "DeFi aggregator"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Gnosis Chain",
    "roles": "Product Community Specialist / Discord Mod",
    "category": "marketing",
    "why_included": "Blockchain network"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Tastylive",
    "roles": "Director of Sales/BD",
    "category": "sales",
    "why_included": "Trading platform"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "NEAR Foundation",
    "roles": "BD Director",
    "category": "sales",
    "why_included": "Blockchain foundation"
  },
  {
    "tweet_url": "https://x.com/bigonchain/status/2030196135604715775",
    "company": "Toobit",
    "roles": "BD Manager (Affiliates/KOLs/Exchanges)",
    "category": "sales",
    "why_included": "Crypto exchange"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Notabene",
    "roles": "Regulatory and Compliance Director",
    "category": "ops",
    "why_included": "Crypto compliance company"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Head of Policy, APAC",
    "category": "ops",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Kraken",
    "roles": "Compliance Officer & MLRO",
    "category": "ops",
    "why_included": "Crypto exchange"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Wallet",
    "roles": "KYC Specialist",
    "category": "ops",
    "why_included": "Crypto wallet"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Wallet",
    "roles": "Investigation Specialist",
    "category": "ops",
    "why_included": "Crypto wallet"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Rain",
    "roles": "Financial Crimes & Risk Data Analyst",
    "category": "finance",
    "why_included": "Crypto platform"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Jito Labs",
    "roles": "Senior Protocol Engineer",
    "category": "tech",
    "why_included": "Solana infrastructure"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Frontend Software Engineer II, Graphs",
    "category": "tech",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Kraken",
    "roles": "Senior Software Engineer - Frontend - Growth Insights",
    "category": "tech",
    "why_included": "Crypto exchange"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Kraken",
    "roles": "Head of Regional Growth",
    "category": "marketing",
    "why_included": "Crypto exchange"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Wallet",
    "roles": "Marketing Lead",
    "category": "marketing",
    "why_included": "Crypto wallet"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Account Executive - Public Sector",
    "category": "sales",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Notabene",
    "roles": "Director of Payment Products",
    "category": "product",
    "why_included": "Crypto compliance"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Project Manager - Data Solutions",
    "category": "product",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Senior Customer Success Manager - ASEAN",
    "category": "ops",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Investigator",
    "category": "ops",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Customer Support Specialist",
    "category": "ops",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/CryptoJobZone/status/2031052343547232273",
    "company": "Chainalysis",
    "roles": "Technical Recruiter, EMEA",
    "category": "ops",
    "why_included": "Blockchain analytics"
  },
  {
    "tweet_url": "https://x.com/jobsincrypto/status/2030644930331267117",
    "company": "Nethermind",
    "roles": "Business Development (Web3 Security Audits), Founding Protocol Engineer (Web3 + AI), Product Manager — Agentic Payments & Wallets, Product Manager — AI x Web3 Security",
    "category": "tech",
    "why_included": "Blockchain and AI company"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Lucent AI",
    "roles": "Dev Tool roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Use Cardboard",
    "roles": "Creative roles",
    "category": "design",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Sponge Wallet",
    "roles": "FinTech roles",
    "category": "finance",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Try Lance",
    "roles": "Hospitality roles",
    "category": "ops",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Caretta So",
    "roles": "Sales roles",
    "category": "sales",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Cumulus Labs IO",
    "roles": "Architecture roles",
    "category": "design",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Bubble Lab AI",
    "roles": "Operations roles",
    "category": "ops",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Fort Wearable",
    "roles": "Health roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "EOS AI",
    "roles": "Health roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Patient Desk AI",
    "roles": "Health roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306736716300",
    "company": "Voltair Lab",
    "roles": "Drones roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Gru Space",
    "roles": "Space roles",
    "category": "tech",
    "why_included": "YC W26 startup, building hotel on the Moon"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Sila HQ",
    "roles": "Productivity roles",
    "category": "product",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030306734636716300",
    "company": "Hey Pocket",
    "roles": "Consumer roles",
    "category": "product",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Autumn AI Inc",
    "roles": "Various roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Maven Payments",
    "roles": "Payments infrastructure roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "S2 Inc",
    "roles": "AI drone systems roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Gen Legal Inc",
    "roles": "Legal roles",
    "category": "ops",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Beacon Health",
    "roles": "AI agents for primary care",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Zerosettle",
    "roles": "App billing roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Shortkit",
    "roles": "Video editor roles",
    "category": "design",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Remy AI",
    "roles": "Warehouse tasks roles",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/ollieforsyth/status/2030661717945106791",
    "company": "Corvera AI",
    "roles": "AI agents for CPG brands",
    "category": "tech",
    "why_included": "YC W26 startup"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Product Engineer",
    "category": "tech",
    "why_included": "High salary $220k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Senior Data Scientist",
    "category": "tech",
    "why_included": "High salary $500k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Staff FE Engineer",
    "category": "tech",
    "why_included": "High salary $500k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Senior React Native Engineer",
    "category": "tech",
    "why_included": "High salary $500k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Backend Engineer",
    "category": "tech",
    "why_included": "High salary $300k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Graduate Software Engineer",
    "category": "tech",
    "why_included": "High salary $200k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Smart Contract Engineer",
    "category": "tech",
    "why_included": "High salary $250k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "Senior Legal Counsel",
    "category": "ops",
    "why_included": "High salary $250k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "C++ Senior Engineer",
    "category": "tech",
    "why_included": "High salary $290k"
  },
  {
    "tweet_url": "https://x.com/JJJchain/status/2029258662363943139",
    "company": "Unknown",
    "roles": "AI Engineer",
    "category": "tech",
    "why_included": "High salary $250k"
  },
  {
    "tweet_url": "https://x.com/kovaion/status/2029897285895684255",
    "company": "Kovaion Consulting",
    "roles": "UI/UX Designer, Node JS Developer, Oracle APEX Developer, Content Writer, WordPress Developer, Videographer, Digital Marketing, Sales",
    "category": "tech",
    "why_included": "Consulting company expanding"
  },
  {
    "tweet_url": "https://x.com/PeterAnalytica/status/2029852030278258840",
    "company": "Start-up Company",
    "roles": "Full Stack Software Developer & Engineer",
    "category": "tech",
    "why_included": "Life time projects and opportunities in web and mobile"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Clocktower Ventures",
    "roles": "Investment Associate",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Sound Ventures",
    "roles": "Investor",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Kindred Ventures",
    "roles": "Research Analysts",
    "category": "ops",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Beyond Ventures",
    "roles": "Senior Associate, Investments",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "CoFound",
    "roles": "Venture Investor",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "M13",
    "roles": "Investment Summer Associate, AI Tooling",
    "category": "tech",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Quona Capital",
    "roles": "Summer Investment Associate",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Palm Venture Studios",
    "roles": "Originations Associate",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Azolla Ventures",
    "roles": "Investment Associate",
    "category": "finance",
    "why_included": "Venture capital firm"
  },
  {
    "tweet_url": "https://x.com/nic_detommaso/status/2029254274686009813",
    "company": "Lilly Ventures",
    "roles": "Senior Director",
    "category": "ops",
    "why_included": "Venture capital firm"
  }
];

async function uploadData() {
  console.log(`Uploading ${data.length} records...`);

  // Map categories to allowed values
  const mappedData = data.map(item => ({
    ...item,
    category: categoryMap[item.category] || 'other'
  }));

  // Dedupe by tweet_url - combine roles for same tweet_url
  const deduped = new Map<string, typeof mappedData[0]>();
  for (const item of mappedData) {
    const existing = deduped.get(item.tweet_url);
    if (existing) {
      // Combine companies and roles
      existing.company = `${existing.company}, ${item.company}`;
      existing.roles = `${existing.roles}, ${item.roles}`;
      if (item.why_included && existing.why_included !== item.why_included) {
        existing.why_included = `${existing.why_included}; ${item.why_included}`;
      }
    } else {
      deduped.set(item.tweet_url, { ...item });
    }
  }

  const finalData = Array.from(deduped.values());
  console.log(`After deduping: ${finalData.length} unique tweet URLs`);

  // Use upsert to handle duplicates
  const { data: result, error } = await supabase
    .from('hiring_tweets')
    .upsert(finalData, {
      onConflict: 'tweet_url',
      ignoreDuplicates: false
    })
    .select();

  if (error) {
    console.error('Error uploading data:', error);
    process.exit(1);
  }

  console.log(`Successfully uploaded ${result?.length || 0} records`);
}

uploadData();
