// Run this script with: npx ts-node scripts/seed-hiring-tweets.ts
// Or: npx tsx scripts/seed-hiring-tweets.ts

const ADMIN_SECRET = process.env.ADMIN_SECRET || "e22a1daea9c7332ccce26d06221735180a28a28f323c8e9fb027592aaec012d1";
const API_URL = process.env.API_URL || "http://localhost:3000";

interface Tweet {
  tweet_url: string;
  company: string;
  roles: string;
  category: "tech" | "product" | "design" | "marketing" | "operations" | "vc" | "other";
  why_included: string;
}

const tweets: Tweet[] = [
  // TECH - Engineering roles
  { tweet_url: "https://twitter.com/logangraham/status/2024976853723979801", company: "Anthropic", roles: "Cybersecurity Engineer", category: "tech", why_included: "Leading AI company with massive recent funding" },
  { tweet_url: "https://twitter.com/HeyGen/status/2023462790649065905", company: "HeyGen", roles: "Backend Engineer", category: "tech", why_included: "Funded AI video startup with strong growth" },
  { tweet_url: "https://twitter.com/KamounLab/status/2024140701793960312", company: "Resurrect Bio", roles: "AI Research Scientist", category: "tech", why_included: "Series A biotech startup led by renowned scientist" },
  { tweet_url: "https://twitter.com/ibnKhalid_/status/2024559733663797331", company: "Aloft", roles: "Founding Engineer", category: "tech", why_included: "Seed-funded startup with founder from fintech background" },
  { tweet_url: "https://twitter.com/aiandchai/status/2024499215641022504", company: "Thita.ai", roles: "Founding Engineer Intern", category: "tech", why_included: "Early AI startup with founder from Salesforce" },
  { tweet_url: "https://twitter.com/MosheMalawach/status/2024524156386115717", company: "Aleph.im", roles: "Developer", category: "tech", why_included: "VC-backed web3 AI infrastructure startup" },
  { tweet_url: "https://twitter.com/CholagharGokul/status/2024726680116646051", company: "Libra AI", roles: "AI Founding Engineers", category: "tech", why_included: "Pre-seed funded AI startup" },
  { tweet_url: "https://twitter.com/george_nqu/status/2022994052250046607", company: "Not Quite Unicorns", roles: "Senior Engineers", category: "tech", why_included: "Bubble AI startup with founder hiring" },
  { tweet_url: "https://twitter.com/vasuman/status/2024650370190811160", company: "Varick AI", roles: "Applied AI Engineer", category: "tech", why_included: "Fast-growing AI startup hiring top engineers" },
  { tweet_url: "https://twitter.com/mange_manali/status/2024703696807088306", company: "ClanX", roles: "Founding Engineer Backend", category: "tech", why_included: "AI startup hiring for founding roles" },
  { tweet_url: "https://twitter.com/nazzari/status/2024551493869981873", company: "Stealth Startups", roles: "Full-Stack Engineer, iOS Engineer", category: "tech", why_included: "Multiple stealth startups with experienced founders" },
  { tweet_url: "https://twitter.com/theantijobboard/status/2022922529480880304", company: "Resolve AI, Simile, Entire, Newo, Matia", roles: "Various Engineers", category: "tech", why_included: "$125M+ combined Series A/B funding" },
  { tweet_url: "https://twitter.com/techdaily24/status/2024831922816385435", company: "Hyperbound", roles: "Full-Stack Engineer", category: "tech", why_included: "YC S23 sales-tech startup" },
  { tweet_url: "https://twitter.com/upbound_io/status/2024936610127904871", company: "Upbound", roles: "Various", category: "tech", why_included: "AI-native infrastructure platform" },
  { tweet_url: "https://twitter.com/TracySimek/status/2024935104049447314", company: "Locus Robotics", roles: "Various Engineers", category: "tech", why_included: "Robotics startup with engineering roles" },
  { tweet_url: "https://twitter.com/heisbleep/status/2024425878785036339", company: "Monad", roles: "Various", category: "tech", why_included: "Blockchain startup expanding team" },
  { tweet_url: "https://twitter.com/solanalabs/status/2024265954407174221", company: "Solana Labs", roles: "Operations Lead", category: "tech", why_included: "Major VC-backed web3 company" },
  { tweet_url: "https://twitter.com/antonosika/status/1918429039280439645", company: "Lovable", roles: "Engineers", category: "tech", why_included: "Fastest growing EU startup, $40M ARR" },
  { tweet_url: "https://twitter.com/gregpr07/status/1901686296902615122", company: "Browser Use", roles: "Founding Engineer", category: "tech", why_included: "45K GitHub stars, web agents leader" },
  { tweet_url: "https://twitter.com/kennandavison/status/1976710519563125208", company: "Icon", roles: "Founding Engineers", category: "tech", why_included: "$10M ARR, Founders Fund backed" },
  { tweet_url: "https://twitter.com/mifuapp/status/1960739614269886748", company: "Mifu", roles: "Founding Engineer", category: "tech", why_included: "Fast-paced AI startup" },
  { tweet_url: "https://twitter.com/hdubugras/status/1969413654081638868", company: "Stealth (Brex founder)", roles: "Founding Team", category: "tech", why_included: "Brex co-founder new stealth company" },
  { tweet_url: "https://twitter.com/beefan/status/1863653262647300207", company: "Tono", roles: "Full Stack Engineer", category: "tech", why_included: "Fast-moving startup with equity" },
  { tweet_url: "https://twitter.com/TheHumanoidHub/status/1803847954484392040", company: "Persona AI", roles: "Founding Team (10-20)", category: "tech", why_included: "Ex-Figure AI CTO, humanoid robotics" },
  { tweet_url: "https://twitter.com/KasakGupta7/status/2024366009646534683", company: "Celigo", roles: "Senior Software Engineers", category: "tech", why_included: "Growing integration platform" },
  { tweet_url: "https://twitter.com/svpino/status/2024212649274462656", company: "TinyFish", roles: "Agentic App Builders", category: "tech", why_included: "Accelerator for agentic apps with funding" },
  { tweet_url: "https://twitter.com/CWNazarian/status/2024923458887700964", company: "Valar Atomics", roles: "Various", category: "tech", why_included: "Reindustrialization startup cohort" },
  { tweet_url: "https://twitter.com/conor_ai/status/2022841746171007117", company: "Hyperspell", roles: "Various", category: "tech", why_included: "YC F25 AI agents startup" },
  { tweet_url: "https://twitter.com/WalnutJobs/status/2022602045610680715", company: "Tilde Research", roles: "Engineering and Research", category: "tech", why_included: "$8M seed AI startup" },
  { tweet_url: "https://twitter.com/techdaily24/status/2024197316777844830", company: "Weave", roles: "AI, Design, Product Engineers", category: "tech", why_included: "YC W25 AI productivity startup" },
  { tweet_url: "https://twitter.com/yurakbothn/status/2023814006176444778", company: "Trata", roles: "Founding Engineers", category: "tech", why_included: "YC W25 chat alternative startup" },
  { tweet_url: "https://twitter.com/skillsxchange_x/status/2025118703499542671", company: "Thera", roles: "Founding Engineer", category: "tech", why_included: "Startup hiring founding roles" },
  { tweet_url: "https://twitter.com/super_bavario/status/2024945208958275598", company: "Hud Evals", roles: "RL & Data Engineer", category: "tech", why_included: "AI evals startup" },
  { tweet_url: "https://twitter.com/mange_manali/status/2024823942750634302", company: "ClanX", roles: "Senior Backend Engineer", category: "tech", why_included: "AI startup with multiple backend roles" },
  { tweet_url: "https://twitter.com/emmanuelbasy/status/2024074142471897261", company: "BrightHire", roles: "Customer Success Manager", category: "tech", why_included: "Series B HR tech SaaS startup" },

  // PRODUCT - Product roles
  { tweet_url: "https://twitter.com/Internoun/status/2024405965769232890", company: "Emanate, Simile, 11x, Hebbia, Rillet, Harvey, Mercury, Decagon", roles: "Head of GTM, Product Lead, Product Designer", category: "product", why_included: "Multiple funded startups hiring product roles" },
  { tweet_url: "https://twitter.com/benln/status/2024177748407661022", company: "Clay, Notion, Gamma, Harvey, Eleven Labs, Linear, Hightouch", roles: "Various", category: "product", why_included: "Top startups with tender offers" },
  { tweet_url: "https://twitter.com/michlimlim/status/2024650219611443304", company: "Flint", roles: "Various", category: "product", why_included: "Autonomous websites startup" },

  // DESIGN - Design roles
  { tweet_url: "https://twitter.com/ycocerious/status/2024869162896818424", company: "Sedona Health", roles: "Founding Designer", category: "design", why_included: "Early consumer healthcare startup" },
  { tweet_url: "https://twitter.com/colin__flaherty/status/1875063947981697187", company: "FLORA", roles: "Design Engineers, Growth", category: "design", why_included: "AI x creativity intersection" },
  { tweet_url: "https://twitter.com/WeAreDesignX/status/2024936604486566216", company: "Motion", roles: "Senior Product Designer", category: "design", why_included: "Design engineer role at startup" },
  { tweet_url: "https://twitter.com/endingwithali/status/2025023980768288777", company: "Mr Beast", roles: "Design Engineer", category: "design", why_included: "Content creator hiring design engineer" },
  { tweet_url: "https://twitter.com/ltblatwloyinade/status/2024919852540940698", company: "Osimum Tech", roles: "UI UX Designer", category: "design", why_included: "Tech startup hiring designer" },

  // MARKETING - Marketing & GTM roles
  { tweet_url: "https://twitter.com/DustinKamali/status/2023424942516453696", company: "Meow", roles: "Business Development", category: "marketing", why_included: "Fintech startup scaling team" },
  { tweet_url: "https://twitter.com/rameetsingh/status/2024853642063606178", company: "RPO AI", roles: "Senior Recruiters", category: "marketing", why_included: "AI recruiting startup" },

  // OPERATIONS - Ops roles
  { tweet_url: "https://twitter.com/clemo004/status/2024705088548225320", company: "Y-Combinator Startups", roles: "Non-Tech Talent", category: "operations", why_included: "YC startups hiring ops" },
  { tweet_url: "https://twitter.com/StartupJobsIN/status/2024384619618193649", company: "Showroom B2B", roles: "Founder's Office", category: "operations", why_included: "B2B startup high-ownership role" },

  // VC - Venture Capital roles
  { tweet_url: "https://twitter.com/nic_detommaso/status/2024500529116721614", company: "a16z, SV Angel, ResilienceVC, Dragonfly, YXS Capital, Foreground Capital, Creator Fund, Catalyst Health Ventures", roles: "Partners, Associates, Analysts, AI Lead", category: "vc", why_included: "Top VCs hiring multiple roles" },
  { tweet_url: "https://twitter.com/DanielDarling/status/2024162360106057841", company: "Focal VC", roles: "Head of Technology & Applied AI", category: "vc", why_included: "VC firm hiring technical leadership" },
  { tweet_url: "https://twitter.com/PascalUnger/status/2024153318256214299", company: "Focal VC", roles: "Founding Head of Technology & Applied AI", category: "vc", why_included: "VC firm hiring key technical role" },
  { tweet_url: "https://twitter.com/AriNewman/status/2024159210594766945", company: "Massive VC", roles: "Partners", category: "vc", why_included: "VC firm expanding team" },
  { tweet_url: "https://twitter.com/GrantMKemp/status/2024226085215306205", company: "Consensus Capital", roles: "Web3 Professionals", category: "vc", why_included: "Crypto VC funding startups" },

  // OTHER - Mixed/Other roles
  { tweet_url: "https://twitter.com/EverywhereVC/status/2024135721443881235", company: "Andercore", roles: "Various", category: "other", why_included: "$40M Series B industrial trade startup" },
  { tweet_url: "https://twitter.com/andrewdsouza/status/2024171364131770421", company: "Boardy AI", roles: "Various", category: "other", why_included: "AI hiring platform startup" },
  { tweet_url: "https://twitter.com/shaig/status/2023760056777667044", company: "Brex", roles: "Various", category: "other", why_included: "Fintech startup newsletter highlights" },
  { tweet_url: "https://twitter.com/LoganSugarman/status/2024630396332159461", company: "Refresh", roles: "Various", category: "other", why_included: "Sustainability tech startup" },
  { tweet_url: "https://twitter.com/cygridio/status/2024923985515811120", company: "Cygrid", roles: "Various", category: "other", why_included: "Cyber risk management startup" },
  { tweet_url: "https://twitter.com/theantijobboard/status/2024673759568023802", company: "Various Funded Startups", roles: "Engineers", category: "other", why_included: "Funded startups hiring before postings" },
  { tweet_url: "https://twitter.com/theantijobboard/status/2024706273078567099", company: "Resolve AI, Simile, Entire, Newo, Matia", roles: "Engineers", category: "other", why_included: "Series A/B AI startups" },
  { tweet_url: "https://twitter.com/theantijobboard/status/2024467369738064114", company: "Various", roles: "Engineers", category: "other", why_included: "Funded startups hiring" },
];

async function seedTweets() {
  console.log(`Seeding ${tweets.length} tweets...`);

  try {
    const response = await fetch(`${API_URL}/api/hiring-tweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ADMIN_SECRET}`,
      },
      body: JSON.stringify({ tweets }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`Successfully seeded ${result.inserted} tweets!`);
    } else {
      console.error("Failed to seed tweets:", result.error);
    }
  } catch (error) {
    console.error("Error seeding tweets:", error);
  }
}

seedTweets();
