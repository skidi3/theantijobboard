/**
 * SEC Form D Scraper
 *
 * Fetches recent Form D filings (private placements/fundraising) from SEC EDGAR
 * and extracts company data for startup drops.
 *
 * Usage: npx tsx scripts/fetch-sec-form-d.ts
 */

const SEC_USER_AGENT = "TheAntiJobBoard hello@theantijobboard.com"; // Required by SEC

interface FormDFiling {
  companyName: string;
  cik: string;
  filingDate: string;
  accessionNumber: string;
  formType: string;
  filingUrl: string;
}

interface FormDDetails {
  companyName: string;
  cik: string;
  filingDate: string;
  // From Form D XML
  entityType?: string;
  yearOfIncorporation?: string;
  stateOfIncorporation?: string;
  street1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  // Offering details
  industryGroup?: string;
  revenueRange?: string;
  federalExemptions?: string[];
  isAmendment?: boolean;
  dateOfFirstSale?: string;
  // Securities offered
  totalOfferingAmount?: number;
  totalAmountSold?: number;
  totalRemaining?: number;
  minimumInvestment?: number;
  // People
  executives?: Array<{
    name: string;
    titles: string[];
    city?: string;
    state?: string;
  }>;
  // URLs
  secFilingUrl: string;
  formDXmlUrl?: string;
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": SEC_USER_AGENT,
          Accept: "application/xml, application/json, text/html, */*",
        },
      });

      if (response.status === 429) {
        console.log(`Rate limited, waiting ${(i + 1) * 2} seconds...`);
        await new Promise((r) => setTimeout(r, (i + 1) * 2000));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Max retries exceeded");
}

async function getRecentFormDFilings(count: number = 100): Promise<FormDFiling[]> {
  console.log("Fetching recent Form D filings from SEC EDGAR...");

  const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=D&company=&dateb=&owner=include&count=${count}&output=atom`;

  const response = await fetchWithRetry(url);
  const xml = await response.text();

  const filings: FormDFiling[] = [];

  // Parse atom feed entries
  const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);

  for (const match of entryMatches) {
    const entry = match[1];

    // Extract title (contains company name, CIK, form type)
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    if (!titleMatch) continue;

    const title = titleMatch[1];

    // Only process D and D/A forms
    if (!title.startsWith("D ") && !title.startsWith("D/A ")) continue;

    // Parse title: "D - Company Name (CIK) (Filer)"
    const titleParts = title.match(/^(D(?:\/A)?) - (.+?) \((\d+)\)/);
    if (!titleParts) continue;

    const formType = titleParts[1];
    const companyName = titleParts[2];
    const cik = titleParts[3].padStart(10, "0");

    // Extract filing URL
    const linkMatch = entry.match(/<link[^>]+href="([^"]+)"/);
    const filingUrl = linkMatch ? linkMatch[1] : "";

    // Extract filing date from summary
    const dateMatch = entry.match(/Filed:<\/b>\s*(\d{4}-\d{2}-\d{2})/);
    const filingDate = dateMatch ? dateMatch[1] : "";

    // Extract accession number
    const accessionMatch = entry.match(/AccNo:<\/b>\s*([\d-]+)/);
    const accessionNumber = accessionMatch ? accessionMatch[1] : "";

    filings.push({
      companyName,
      cik,
      filingDate,
      accessionNumber,
      formType,
      filingUrl,
    });
  }

  return filings;
}

async function getFormDDetails(filing: FormDFiling): Promise<FormDDetails | null> {
  try {
    const details: FormDDetails = {
      companyName: filing.companyName,
      cik: filing.cik,
      filingDate: filing.filingDate,
      isAmendment: filing.formType === "D/A",
      secFilingUrl: filing.filingUrl,
    };

    // Fetch the filing index page to find the primary XML document
    const indexResponse = await fetchWithRetry(filing.filingUrl);
    const indexHtml = await indexResponse.text();

    // Find the primary_doc.xml link (not the xslFormDX01 transformed version)
    // We want: /Archives/edgar/data/XXX/XXXXXX/primary_doc.xml (without xslFormDX01)
    const allXmlMatches = [...indexHtml.matchAll(/href="([^"]*primary_doc\.xml)"/gi)];
    const rawXmlMatch = allXmlMatches.find(m => !m[1].includes('xslFormDX01'));

    if (rawXmlMatch) {
      const xmlPath = rawXmlMatch[1];
      const xmlUrl = xmlPath.startsWith("http")
        ? xmlPath
        : `https://www.sec.gov${xmlPath.startsWith("/") ? "" : "/"}${xmlPath}`;

      console.log(`   -> Found XML: ${xmlUrl}`);

      details.formDXmlUrl = xmlUrl;

      // Fetch and parse the Form D XML
      const xmlResponse = await fetchWithRetry(xmlUrl);
      const xml = await xmlResponse.text();

      // Parse from primaryIssuer section first
      const issuerMatch = xml.match(/<primaryIssuer>([\s\S]*?)<\/primaryIssuer>/i);
      if (issuerMatch) {
        const issuerXml = issuerMatch[1];

        const entityNameMatch = issuerXml.match(/<entityName>([^<]+)<\/entityName>/i);
        if (entityNameMatch) details.companyName = entityNameMatch[1];

        const streetMatch = issuerXml.match(/<street1>([^<]+)<\/street1>/i);
        if (streetMatch) details.street1 = streetMatch[1];

        const cityMatch = issuerXml.match(/<city>([^<]+)<\/city>/i);
        if (cityMatch) details.city = cityMatch[1];

        const stateMatch = issuerXml.match(/<stateOrCountry>([^<]+)<\/stateOrCountry>/i);
        if (stateMatch) details.state = stateMatch[1];

        const zipMatch = issuerXml.match(/<zipCode>([^<]+)<\/zipCode>/i);
        if (zipMatch) details.zipCode = zipMatch[1];

        const phoneMatch = issuerXml.match(/<issuerPhoneNumber>([^<]+)<\/issuerPhoneNumber>/i);
        if (phoneMatch) details.phoneNumber = phoneMatch[1];

        const stateIncMatch = issuerXml.match(/<jurisdictionOfInc>([^<]+)<\/jurisdictionOfInc>/i);
        if (stateIncMatch) details.stateOfIncorporation = stateIncMatch[1];

        const entityMatch = issuerXml.match(/<entityType>([^<]+)<\/entityType>/i);
        if (entityMatch) details.entityType = entityMatch[1];

        // Year of incorporation - look for value inside yearOfInc
        const yearMatch = issuerXml.match(/<yearOfInc>[\s\S]*?<value>([^<]+)<\/value>[\s\S]*?<\/yearOfInc>/i);
        if (yearMatch) details.yearOfIncorporation = yearMatch[1];
      }

      // Parse offering data
      const offeringMatch = xml.match(/<offeringData>([\s\S]*?)<\/offeringData>/i);
      if (offeringMatch) {
        const offeringXml = offeringMatch[1];

        // Industry group
        const industryMatch = offeringXml.match(/<industryGroupType>([^<]+)<\/industryGroupType>/i);
        if (industryMatch) details.industryGroup = industryMatch[1];

        // Revenue range
        const revenueMatch = offeringXml.match(/<revenueRange>([^<]+)<\/revenueRange>/i);
        if (revenueMatch) details.revenueRange = revenueMatch[1];

        // Date of first sale
        const saleMatch = offeringXml.match(/<dateOfFirstSale>[\s\S]*?<value>([^<]+)<\/value>/i);
        if (saleMatch) details.dateOfFirstSale = saleMatch[1];

        // Minimum investment
        const minMatch = offeringXml.match(/<minimumInvestmentAccepted>(\d+)<\/minimumInvestmentAccepted>/i);
        if (minMatch) details.minimumInvestment = parseInt(minMatch[1]);

        // Offering amounts - look in offeringSalesAmounts
        const amountsMatch = offeringXml.match(/<offeringSalesAmounts>([\s\S]*?)<\/offeringSalesAmounts>/i);
        if (amountsMatch) {
          const amountsXml = amountsMatch[1];

          const totalOfferingMatch = amountsXml.match(/<totalOfferingAmount>(\d+)<\/totalOfferingAmount>/i);
          if (totalOfferingMatch) details.totalOfferingAmount = parseInt(totalOfferingMatch[1]);

          const soldMatch = amountsXml.match(/<totalAmountSold>(\d+)<\/totalAmountSold>/i);
          if (soldMatch) details.totalAmountSold = parseInt(soldMatch[1]);

          const remainingMatch = amountsXml.match(/<totalRemaining>(\d+)<\/totalRemaining>/i);
          if (remainingMatch) details.totalRemaining = parseInt(remainingMatch[1]);
        }
      }

      // Extract executives/related persons
      details.executives = [];
      const personMatches = xml.matchAll(/<relatedPersonInfo>([\s\S]*?)<\/relatedPersonInfo>/gi);

      for (const personMatch of personMatches) {
        const personXml = personMatch[1];

        const firstName = personXml.match(/<firstName>([^<]*)<\/firstName>/i)?.[1] || "";
        const lastName = personXml.match(/<lastName>([^<]*)<\/lastName>/i)?.[1] || "";

        if (!firstName && !lastName) continue;

        // Get titles/relationships - now using <relationship> tags
        const titles: string[] = [];
        const relationshipMatches = personXml.matchAll(/<relationship>([^<]+)<\/relationship>/gi);
        for (const relMatch of relationshipMatches) {
          titles.push(relMatch[1]);
        }

        const personCity = personXml.match(/<city>([^<]+)<\/city>/i)?.[1];
        const personState = personXml.match(/<stateOrCountry>([^<]+)<\/stateOrCountry>/i)?.[1];

        details.executives.push({
          name: `${firstName} ${lastName}`.trim(),
          titles,
          city: personCity,
          state: personState,
        });
      }
    }

    return details;
  } catch (error) {
    console.error(`Error fetching details for ${filing.companyName}:`, error);
    return null;
  }
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

function filterStartups(filings: FormDFiling[]): FormDFiling[] {
  // Filter out investment funds, LPs, trusts - focus on operating companies
  const excludePatterns = [
    /fund/i,
    /\bLP\b/i,
    /\bL\.P\./i,
    /limited partnership/i,
    /trust/i,
    /capital/i,
    /ventures/i,
    /partners/i,
    /holdings.*llc/i,
    /investment/i,
    /bancorp/i,
    /bank/i,
    /series of/i,
    /real estate/i,
    /reit/i,
    /mortgage/i,
  ];

  // Prefer tech-sounding names
  const techKeywords = [
    /\bai\b/i,
    /tech/i,
    /software/i,
    /data/i,
    /cloud/i,
    /cyber/i,
    /digital/i,
    /app/i,
    /platform/i,
    /saas/i,
    /labs/i,
    /bio/i,
    /health/i,
    /med/i,
    /robot/i,
    /auto/i,
    /smart/i,
    /analytics/i,
    /machine/i,
    /quantum/i,
    /\binc\b/i,
    /\bcorp\b/i,
  ];

  return filings.filter((f) => {
    const name = f.companyName;

    // Exclude funds/LPs
    if (excludePatterns.some((p) => p.test(name))) {
      return false;
    }

    // Include if tech-sounding
    return techKeywords.some((p) => p.test(name));
  });
}

async function main() {
  console.log("🔍 Fetching recent SEC Form D filings...\n");

  // Get recent filings
  const allFilings = await getRecentFormDFilings(200);

  console.log(`\n📊 Found ${allFilings.length} Form D filings\n`);

  // Filter for likely startups (not funds)
  const startupFilings = filterStartups(allFilings);
  console.log(`🚀 Filtered to ${startupFilings.length} likely startups (excluding funds/LPs)\n`);

  // Get details for each (limit to avoid rate limiting)
  const detailedFilings: FormDDetails[] = [];
  const limit = Math.min(startupFilings.length, 25);

  for (let i = 0; i < limit; i++) {
    const filing = startupFilings[i];
    console.log(`[${i + 1}/${limit}] Fetching: ${filing.companyName}`);

    const details = await getFormDDetails(filing);
    if (details) {
      console.log(`   -> Offering: ${details.totalOfferingAmount || 'N/A'}, Sold: ${details.totalAmountSold || 'N/A'}`);
      if (details.totalOfferingAmount && details.totalOfferingAmount > 0) {
        detailedFilings.push(details);
      }
    }

    // Rate limiting - be nice to SEC servers
    await new Promise((r) => setTimeout(r, 300));
  }

  // Sort by offering amount (largest first)
  detailedFilings.sort((a, b) => (b.totalOfferingAmount || 0) - (a.totalOfferingAmount || 0));

  // Output results
  console.log("\n" + "=".repeat(70));
  console.log("📋 FORM D FILINGS - STARTUP FUNDRAISING");
  console.log("=".repeat(70));

  for (const filing of detailedFilings) {
    console.log(`\n📌 ${filing.companyName}`);
    console.log(`   📅 Filed: ${filing.filingDate}${filing.isAmendment ? " (Amendment)" : ""}`);
    if (filing.totalOfferingAmount) {
      console.log(`   💰 Offering Amount: ${formatCurrency(filing.totalOfferingAmount)}`);
    }
    if (filing.totalAmountSold) {
      console.log(`   💵 Amount Sold: ${formatCurrency(filing.totalAmountSold)}`);
    }
    if (filing.industryGroup) console.log(`   🏭 Industry: ${filing.industryGroup}`);
    if (filing.city && filing.state) console.log(`   📍 Location: ${filing.city}, ${filing.state}`);
    if (filing.yearOfIncorporation) console.log(`   🗓️  Founded: ${filing.yearOfIncorporation}`);
    if (filing.revenueRange) console.log(`   📈 Revenue: ${filing.revenueRange}`);
    if (filing.executives?.length) {
      console.log(`   👥 People:`);
      for (const exec of filing.executives.slice(0, 4)) {
        const titles = exec.titles.length > 0 ? ` (${exec.titles.join(", ")})` : "";
        const location = exec.city && exec.state ? ` - ${exec.city}, ${exec.state}` : "";
        console.log(`      • ${exec.name}${titles}${location}`);
      }
    }
    console.log(`   🔗 SEC: ${filing.secFilingUrl}`);
  }

  // Summary stats
  console.log("\n" + "=".repeat(70));
  console.log("📊 SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total startups found: ${detailedFilings.length}`);

  const totalRaised = detailedFilings.reduce((sum, f) => sum + (f.totalAmountSold || 0), 0);
  const totalOffering = detailedFilings.reduce((sum, f) => sum + (f.totalOfferingAmount || 0), 0);
  console.log(`Total Amount Sold: ${formatCurrency(totalRaised)}`);
  console.log(`Total Offering Size: ${formatCurrency(totalOffering)}`);

  // Save to JSON
  const outputPath = "./sec-form-d-results.json";
  const fs = await import("fs");
  fs.writeFileSync(outputPath, JSON.stringify(detailedFilings, null, 2));
  console.log(`\n✅ Results saved to ${outputPath}`);

  return detailedFilings;
}

main().catch(console.error);
