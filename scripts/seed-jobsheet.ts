// Run with: npx tsx scripts/seed-jobsheet.ts

const ADMIN_SECRET = process.env.ADMIN_SECRET || "e22a1daea9c7332ccce26d06221735180a28a28f323c8e9fb027592aaec012d1";
const API_URL = process.env.API_URL || "http://localhost:3000";

interface Job {
  rank: number;
  company: string;
  roles: string;
  funding: string;
  location: string;
  source: string;
  careers_link: string;
}

const jobs: Job[] = [
  { rank: 1, company: "World Labs", roles: "ML Engineers, Research, Infra", funding: "$1B+ (a16z, NEA, AMD, Nvidia, Fidelity)", location: "SF", source: "Crunchbase", careers_link: "https://job-boards.greenhouse.io/worldlabs" },
  { rank: 2, company: "Vestwell", roles: "Engineering, Product, Sales", funding: "$385M Series E", location: "NYC (Hybrid)", source: "Crunchbase", careers_link: "https://www.vestwell.com/careers" },
  { rank: 3, company: "Runway", roles: "ML Engineers, Research, Product", funding: "$315M Series E (General Atlantic, Nvidia)", location: "NYC / SF / Remote NA", source: "Crunchbase", careers_link: "https://runwayml.com/careers" },
  { rank: 4, company: "Temporal Technologies", roles: "Staff SWE, Sr PM, Sr Frontend, AI SDK", funding: "$300M Series D (a16z, Sequoia)", location: "Remote US", source: "HN Feb 2026", careers_link: "https://www.temporal.io/careers" },
  { rank: 5, company: "Fundamental", roles: "Engineering, AI", funding: "$255M Series A (Oak HC/FT, Battery)", location: "Enterprise AI", source: "Crunchbase", careers_link: "https://www.fundamental.ai/careers" },
  { rank: 6, company: "Taalas", roles: "ML Engineers, Chip Design", funding: "$169M ($219M total, Quiet Capital, Fidelity)", location: "Toronto", source: "Crunchbase", careers_link: "https://taalas.com/position/" },
  { rank: 7, company: "Goodfire", roles: "ML Engineers, Research, GTM", funding: "$150M Series B (B Capital, Menlo, Lightspeed)", location: "SF", source: "Crunchbase", careers_link: "https://job-boards.greenhouse.io/goodfire" },
  { rank: 8, company: "Heron Power", roles: "Power Electronics Eng, Product", funding: "$140M (a16z, Breakthrough Energy)", location: "Scotts Valley, CA", source: "Crunchbase", careers_link: "https://heronpower.com/careers" },
  { rank: 9, company: "Code Metal", roles: "Engineers", funding: "$125M Series B (Salesforce Ventures)", location: "AI Code Translation", source: "Crunchbase", careers_link: "https://www.codemetal.ai/careers" },
  { rank: 10, company: "Render", roles: "Platform Engineers", funding: "$100M Series D", location: "SF / Remote", source: "Crunchbase", careers_link: "https://render.com/careers" },
  { rank: 11, company: "Jump (FinAdvisor AI)", roles: "Engineering, Product", funding: "$80M Series B (Insight Partners)", location: "Salt Lake City", source: "Crunchbase", careers_link: "https://www.jump.co/careers" },
  { rank: 12, company: "Braintrust", roles: "Engineering, AI", funding: "$80M Series B (Iconiq Capital)", location: "SF", source: "Crunchbase", careers_link: "https://www.braintrustdata.com/careers" },
  { rank: 13, company: "Accrual", roles: "Engineering", funding: "$75M Series A (General Catalyst)", location: "AI Accounting/Tax", source: "Crunchbase", careers_link: "https://www.accrual.com/careers" },
  { rank: 14, company: "Lawhive", roles: "Engineering, Product", funding: "$60M Series B (GV, Balderton)", location: "UK → US expansion", source: "Crunchbase", careers_link: "https://www.lawhive.co.uk/careers" },
  { rank: 15, company: "Ownwell", roles: "Engineering", funding: "$50M ($30M equity)", location: "AI Property Tax", source: "Crunchbase", careers_link: "https://www.ownwell.com/careers" },
  { rank: 16, company: "ChipAgents", roles: "Chip Design Engineers", funding: "$50M Series A1 (Micron, MediaTek)", location: "AI Chip Design Agents", source: "Crunchbase", careers_link: "https://www.chipagents.ai/careers" },
  { rank: 17, company: "Gather AI", roles: "CV/ML Engineers, Product", funding: "$40M Series B (Smith Point, Bain)", location: "Warehouse Drones", source: "Crunchbase", careers_link: "https://www.gather.ai/careers" },
  { rank: 18, company: "Turnstile", roles: "Engineering", funding: "$29M", location: "B2B Revenue Ops", source: "Crunchbase", careers_link: "https://www.turnstile.com/careers" },
  { rank: 19, company: "VulnCheck", roles: "Engineering", funding: "$25M", location: "Cybersecurity", source: "Crunchbase", careers_link: "https://vulncheck.com/careers" },
  { rank: 20, company: "TextQL", roles: "Sr SWE (Platform, Infra)", funding: "Funded, $200K-$400K TC", location: "NYC (Onsite)", source: "HN Feb 2026", careers_link: "mailto:gabriel@textql.com" },
  { rank: 21, company: "Graphite (joining Cursor)", roles: "Sr Software Engineers", funding: "Funded, $150-250K + equity", location: "NYC Soho (Onsite)", source: "HN Feb 2026", careers_link: "https://graphite.dev/careers#positions" },
  { rank: 22, company: "Modal", roles: "Product, Systems, SDK Engineers", funding: "Funded", location: "SF / NYC (Onsite)", source: "HN Feb 2026", careers_link: "https://modal.com/company#careers" },
  { rank: 23, company: "PostHog", roles: "Product Eng, Backend, Tech AM", funding: "Funded, open source analytics", location: "Remote (GMT-8 to GMT+2)", source: "HN Feb 2026", careers_link: "https://posthog.com/careers" },
  { rank: 24, company: "Goody", roles: "Staff SWE, Sr SWE (Growth, CustEng)", funding: "Funded, $150-250K + equity", location: "Remote (Americas)", source: "HN Feb 2026", careers_link: "https://jobs.ongoody.com/#hn" },
  { rank: 25, company: "Shepherd Insurance", roles: "Sr/Staff FS & Backend, 2x PMs", funding: "$20M+ raised", location: "SF (Onsite)", source: "HN Feb 2026", careers_link: "https://shepherdinsurance.com/careers" },
  { rank: 26, company: "Updater", roles: "Lead Platform Engineer", funding: "$450M+ raised (SoftBank)", location: "Remote US, $180K-$215K", source: "HN Feb 2026", careers_link: "https://job-boards.greenhouse.io/updater/jobs/7274396" },
  { rank: 27, company: "DuckDuckGo", roles: "Privacy Eng, Security, CloudOps, VP BD", funding: "Funded, $178.5K-$320K + equity", location: "Remote", source: "HN Feb 2026", careers_link: "https://duckduckgo.com/careers" },
  { rank: 28, company: "Cloudflare", roles: "Rust/DB Engineers (Data Platform)", funding: "Public company", location: "SF/Austin/Seattle/NYC/London", source: "HN Feb 2026", careers_link: "mailto:necubi (see HN profile)" },
  { rank: 29, company: "Artemis (Stealth AI-Security)", roles: "Staff/Principal Engineers", funding: "$15M seed, $200-250K", location: "NYC (Onsite)", source: "HN Feb 2026", careers_link: "mailto:christina@goartemis.ai" },
  { rank: 30, company: "Wave", roles: "Applied AI Engineer", funding: "Funded, up to $222.7K + equity", location: "Remote (US/UK/Canada/Spain)", source: "HN Feb 2026", careers_link: "https://www.wave.com/en/careers/job/5779974004/" },
  { rank: 31, company: "Songscription", roles: "Founding Fullstack Engineer", funding: "$5M raised", location: "SF (Onsite)", source: "HN Feb 2026", careers_link: "https://songscription.ai/careers/founding-fullstack-engineer" },
  { rank: 32, company: "Spiich Labs", roles: "Founding GTM, Fullstack Engineer", funding: "Pre-seed (Lovable/OpenAI/Creandum)", location: "Stockholm (Onsite)", source: "HN Feb 2026", careers_link: "mailto:hello@spiich.ai" },
  { rank: 33, company: "Uncountable", roles: "Full-Stack, LLM Apps Engineers", funding: "Profitable since 2016", location: "NY/SF/London/Munich", source: "HN Feb 2026", careers_link: "https://www.uncountable.com/hiring/hn" },
  { rank: 34, company: "Beautiful.ai", roles: "Sr/Staff Platform/Software Engineers", funding: "$16M Series B", location: "Remote US/CAN", source: "HN Feb 2026", careers_link: "https://job-boards.greenhouse.io/beautifulai/jobs/4802854007" },
  { rank: 35, company: "Midpage", roles: "Sr Software/Data Engineer", funding: "Funded, $170-240K + equity", location: "NYC / Remote", source: "HN Feb 2026", careers_link: "mailto:ben.hoffner-brodsky@midpage.ai" },
  { rank: 36, company: "Arcol", roles: "Sr Software Engineer", funding: "Funded", location: "NYC/SF/Remote US/CAN", source: "HN Feb 2026", careers_link: "https://www.arcol.io/careers" },
  { rank: 37, company: "FreightRoll", roles: "Software Engineer (Elixir)", funding: "Funded, $150K-$175K", location: "Remote US", source: "HN Feb 2026", careers_link: "mailto:hiring@freightroll.com" },
  { rank: 38, company: "Herakles Defense", roles: "Founding Engineer", funding: "Funded", location: "Munich / Remote", source: "HN Feb 2026", careers_link: "https://www.herakles-defense.com/founding-engineer" },
  { rank: 39, company: "MONUMENTAL", roles: "Software Engineers", funding: "Funded, revenue-generating", location: "Amsterdam (Onsite)", source: "HN Feb 2026", careers_link: "https://www.monumental.co/jobs" },
  { rank: 40, company: "Blue (Health AI)", roles: "Backend/Infra + iOS Engineers", funding: "Closing new round", location: "Remote", source: "HN Feb 2026", careers_link: "https://joinblueai.com/join-us" },
  { rank: 41, company: "Flok Health", roles: "Systems/Rust/FS/Data Engineers", funding: "Funded", location: "Cambridge UK (Onsite)", source: "HN Feb 2026", careers_link: "https://www.flok.health/careers/engineering-team" },
  { rank: 42, company: "Cliniko", roles: "Full-stack, React developer", funding: "Profitable, 100K+ daily users", location: "Remote (30hr week)", source: "HN Feb 2026", careers_link: "https://apply.workable.com/cliniko/j/B8F753BB53/" },
  { rank: 43, company: "Arenko", roles: "Sr Backend Engineer (Go)", funding: "Profitable, 10yr old", location: "London (Hybrid)", source: "HN Feb 2026", careers_link: "https://arenko.group/careers/" },
  { rank: 44, company: "Oximy (YC W26)", roles: "Founding Full Stack Engineer", funding: "YC W26", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 45, company: "Clicks (YC F25)", roles: "Software Engineer", funding: "YC F25", location: "Zürich", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 46, company: "Lightberry (YC F25)", roles: "Robotics Eng, Voice AI Eng", funding: "YC F25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 47, company: "Icarus (YC F25)", roles: "Sr FDE, Sr EE", funding: "YC F25", location: "LA", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 48, company: "Hypercubic (YC F25)", roles: "Founding Software Engineer", funding: "YC F25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 49, company: "Parametric (YC F25)", roles: "ML Research Eng, Data Engine Eng", funding: "YC F25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 50, company: "Manufact / mcp-use (YC S25)", roles: "Open Source Eng, Founding SWE", funding: "YC S25", location: "SF / Zürich", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 51, company: "Channel3 (YC S25)", roles: "Backend + Fullstack Engineers", funding: "YC S25", location: "NYC", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 52, company: "Idler (YC S25)", roles: "Staff SWE, Software Engineer", funding: "YC S25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 53, company: "Floot (YC S25)", roles: "Founding Full-Stack Engineer", funding: "YC S25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 54, company: "Verne Robotics (YC S25)", roles: "Robotics Data Infra Engineer", funding: "YC S25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 55, company: "EffiGov (YC S25)", roles: "Founding Engineer, FDE", funding: "YC S25", location: "SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 56, company: "Pangolin (YC S25)", roles: "Founding Engineer Full Stack", funding: "YC S25", location: "SF / Remote US", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 57, company: "MorphoAI (YC X25)", roles: "Founding Engineer (ML)", funding: "YC X25", location: "London/NYC/SF", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
  { rank: 58, company: "SnapMagic (YC S15)", roles: "Dir of Software & Product", funding: "YC S15", location: "Redwood City/Remote", source: "YC Jobs", careers_link: "https://www.workatastartup.com/jobs" },
];

async function seedJobs() {
  console.log(`Seeding ${jobs.length} jobs...`);

  try {
    const response = await fetch(`${API_URL}/api/jobsheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ADMIN_SECRET}`,
      },
      body: JSON.stringify({ jobs }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`Successfully seeded ${result.inserted} jobs!`);
    } else {
      console.error("Failed to seed jobs:", result.error);
    }
  } catch (error) {
    console.error("Error seeding jobs:", error);
  }
}

seedJobs();
