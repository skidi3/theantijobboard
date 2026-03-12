import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Server-side admin check - uses session, not headers (can't be spoofed)
async function checkAdmin(): Promise<{ isAdmin: boolean; email: string | null }> {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return { isAdmin: false, email: null };
    }

    const email = session.user.email || null;
    return { isAdmin: isAdminEmail(email), email };
  } catch {
    return { isAdmin: false, email: null };
  }
}

interface TalentProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  current_title: string | null;
  current_company: string | null;
  years_experience: string | null;
  skills: string[];
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  resume_text: string | null;
  photo_url: string | null;
  ai_summary: string | null;
  ai_tags: string[];
  looking_for: string[];
  remote_preference: string;
  salary_range: string | null;
  preferred_locations: string | null;
  work_authorization: string | null;
  notice_period: string | null;
  why_looking: string | null;
  ideal_role: string | null;
  additional_context: string | null;
  quality_score: number | null;
}

interface RoleRequirements {
  description: string;
  title?: string;
  required_skills?: string[];
  location?: string;
  remote_ok?: boolean;
  salary_max?: number;
  requires_us_auth?: boolean;
}

interface ExtractedFilters {
  role_types: string[];
  required_skills: string[];
  remote_preference: "remote_only" | "hybrid" | "onsite" | "flexible" | null;
  requires_us_auth: boolean;
  location: string | null;
  min_years_experience: number | null;
  salary_range: { min: number | null; max: number | null };
}

interface MatchResult {
  profile: TalentProfile;
  score: number;
  fit_summary: string;
  strengths: string[];
  considerations: string[];
  would_they_want_it: string;
}

// AI Step 1: Extract structured filters from job description
async function extractFiltersFromJD(
  roleTitle: string,
  roleDescription: string
): Promise<ExtractedFilters> {
  const openaiKey = process.env.OPENAI_API_KEY;

  const defaultFilters: ExtractedFilters = {
    role_types: [],
    required_skills: [],
    remote_preference: null,
    requires_us_auth: false,
    location: null,
    min_years_experience: null,
    salary_range: { min: null, max: null },
  };

  if (!openaiKey) return defaultFilters;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You extract structured hiring requirements from job descriptions. Be precise and only extract what's explicitly stated or strongly implied.

Return JSON:
{
  "role_types": ["matching role categories from this list: Software Engineer, Senior Software Engineer, Staff / Principal Engineer, Engineering Manager, Founding Engineer, Technical Co-founder, DevOps / SRE / Platform, Data Scientist / ML Engineer, Mobile Engineer, Frontend Engineer, Backend Engineer, Full Stack Engineer, Product Manager, Senior Product Manager, Head of Product, Product Designer, UX Designer, UI Designer, Design Lead, Brand Designer, Operations Manager, Chief of Staff, Business Operations, Growth Manager, Marketing Manager, Content Marketing, Performance Marketing, Sales, Account Executive, Customer Success, Business Development, Finance / Accounting, Legal / Compliance, HR / People Ops, Recruiter"],
  "required_skills": ["skill1", "skill2"],
  "remote_preference": "remote_only" | "hybrid" | "onsite" | "flexible" | null,
  "requires_us_auth": true/false (true if explicitly requires US work authorization, citizenship, or says no visa sponsorship),
  "location": "city/region if on-site or hybrid" | null,
  "min_years_experience": number | null,
  "salary_range": { "min": number | null, "max": number | null }
}

Only include skills that are explicitly required (not "nice to have").
For remote_preference: "onsite" if explicitly requires in-office, "hybrid" if mentions hybrid/flexible, "remote_only" if fully remote, null if not mentioned.`,
          },
          {
            role: "user",
            content: `Role Title: ${roleTitle || "Not specified"}

Job Description:
${roleDescription}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI extraction error:", await response.text());
      return defaultFilters;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "{}";
    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr);

    return {
      role_types: parsed.role_types || [],
      required_skills: parsed.required_skills || [],
      remote_preference: parsed.remote_preference || null,
      requires_us_auth: parsed.requires_us_auth || false,
      location: parsed.location || null,
      min_years_experience: parsed.min_years_experience || null,
      salary_range: parsed.salary_range || { min: null, max: null },
    };
  } catch (error) {
    console.error("Filter extraction error:", error);
    return defaultFilters;
  }
}

// Apply AI-extracted hard filters
function applyAIFilters(
  profiles: TalentProfile[],
  filters: ExtractedFilters
): { passed: TalentProfile[]; filtered: number; reasons: Record<string, number> } {
  const reasons: Record<string, number> = {};

  const passed = profiles.filter(profile => {
    // Filter by US work authorization if required
    if (filters.requires_us_auth) {
      if (profile.work_authorization === "need_visa") {
        reasons["needs_visa"] = (reasons["needs_visa"] || 0) + 1;
        return false;
      }
    }

    // Filter by remote preference
    if (filters.remote_preference === "onsite" && profile.remote_preference === "remote_only") {
      if (filters.location) {
        const profileLoc = (profile.location || "").toLowerCase();
        const roleLoc = filters.location.toLowerCase();
        if (!profileLoc.includes(roleLoc) && !roleLoc.includes(profileLoc)) {
          reasons["location_mismatch"] = (reasons["location_mismatch"] || 0) + 1;
          return false;
        }
      } else {
        reasons["remote_only_for_onsite"] = (reasons["remote_only_for_onsite"] || 0) + 1;
        return false;
      }
    }

    // Filter by salary (if candidate's minimum is way above role's max)
    if (filters.salary_range.max && profile.salary_range) {
      const salaryMatch = profile.salary_range.match(/\$?([\d,]+)/);
      if (salaryMatch) {
        const candidateMin = parseInt(salaryMatch[1].replace(/,/g, ""));
        if (candidateMin > filters.salary_range.max * 1.2) {
          reasons["salary_too_high"] = (reasons["salary_too_high"] || 0) + 1;
          return false;
        }
      }
    }

    return true;
  });

  return { passed, filtered: profiles.length - passed.length, reasons };
}

// Step 2: Role type pre-filtering - boost candidates looking for this type of role
function scoreRoleAlignment(profile: TalentProfile, roleTitle: string): number {
  if (!roleTitle || !profile.looking_for?.length) return 0;

  const roleLower = roleTitle.toLowerCase();
  const lookingForLower = profile.looking_for.map(r => r.toLowerCase());

  // Direct match
  for (const want of lookingForLower) {
    if (roleLower.includes(want) || want.includes(roleLower)) {
      return 100;
    }
  }

  // Partial matches
  const roleWords = roleLower.split(/\s+/);
  let matchScore = 0;
  for (const want of lookingForLower) {
    for (const word of roleWords) {
      if (word.length > 3 && want.includes(word)) {
        matchScore += 20;
      }
    }
  }

  return Math.min(matchScore, 80);
}

// Step 3: Build rich candidate context for AI matching
function buildCandidateContext(profile: TalentProfile): string {
  const parts: string[] = [];

  // Identity
  parts.push(`**${profile.name}**`);
  if (profile.current_title) {
    parts.push(`Currently: ${profile.current_title}${profile.current_company ? ` at ${profile.current_company}` : ""}`);
  }
  if (profile.years_experience) {
    parts.push(`Experience: ${profile.years_experience}`);
  }

  // What they're looking for
  if (profile.looking_for?.length) {
    parts.push(`Looking for: ${profile.looking_for.join(", ")}`);
  }
  if (profile.ideal_role) {
    parts.push(`Their ideal role: "${profile.ideal_role}"`);
  }
  if (profile.why_looking) {
    parts.push(`Why they're looking: "${profile.why_looking}"`);
  }

  // Skills and summary
  if (profile.skills?.length) {
    parts.push(`Skills: ${profile.skills.join(", ")}`);
  }
  if (profile.ai_summary) {
    parts.push(`Summary: ${profile.ai_summary}`);
  }

  // The gold - additional context
  if (profile.additional_context) {
    parts.push(`What they want you to know: "${profile.additional_context}"`);
  }

  // Logistics
  const logistics: string[] = [];
  if (profile.location) logistics.push(`Based in ${profile.location}`);
  if (profile.remote_preference) logistics.push(`Prefers ${profile.remote_preference.replace(/_/g, " ")}`);
  if (profile.notice_period) logistics.push(`Available: ${profile.notice_period.replace(/_/g, " ")}`);
  if (profile.salary_range) logistics.push(`Salary: ${profile.salary_range}`);
  if (logistics.length) {
    parts.push(`Logistics: ${logistics.join(" | ")}`);
  }

  return parts.join("\n");
}

// Step 4: AI deep matching - the real magic
async function deepMatchCandidates(
  roleDescription: string,
  roleTitle: string,
  candidates: TalentProfile[]
): Promise<MatchResult[]> {
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey || candidates.length === 0) {
    return [];
  }

  // Build candidate contexts
  const candidateContexts = candidates.map((c, i) => ({
    index: i,
    context: buildCandidateContext(c),
  }));

  const candidatesText = candidateContexts
    .map(c => `[Candidate ${c.index}]\n${c.context}`)
    .join("\n\n---\n\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an expert technical recruiter. Analyze candidates for a role and return ONLY valid JSON.

For each candidate, evaluate:
1. Would they be GREAT at this job? (skills, experience, trajectory)
2. Would they actually WANT this job? (based on what they're looking for)
3. What makes them stand out?
4. What should the hiring team know?

Return JSON in this exact format:
{"matches":[{"index":0,"score":85,"fit_summary":"One sentence on fit","strengths":["Strength 1","Strength 2"],"considerations":["Consideration"],"would_they_want_it":"Why they'd want this role"}]}

Scoring: 90-100=exceptional, 80-89=strong, 70-79=decent, 60-69=possible. Only include candidates scoring 60+. If no candidates qualify, return {"matches":[]}.`,
          },
          {
            role: "user",
            content: `# Role: ${roleTitle || "Open Role"}

## Job Description:
${roleDescription}

---

# Candidates to evaluate:

${candidatesText}`,
          },
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "{}";

    // Parse JSON from response - handle various formats
    let jsonStr = content;

    // Remove markdown code blocks
    jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Try to extract JSON object if there's extra text
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    jsonStr = jsonStr.trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON parse error. Raw content:", content.slice(0, 500));
      throw parseError;
    }

    const matches = parsed.matches || [];

    // Map back to full profiles and sort by score
    return matches
      .map((m: {
        index: number;
        score: number;
        fit_summary: string;
        strengths: string[];
        considerations: string[];
        would_they_want_it: string;
      }) => ({
        profile: candidates[m.index],
        score: m.score,
        fit_summary: m.fit_summary,
        strengths: m.strengths || [],
        considerations: m.considerations || [],
        would_they_want_it: m.would_they_want_it,
      }))
      .filter((m: MatchResult) => m.profile) // Filter out any undefined
      .sort((a: MatchResult, b: MatchResult) => b.score - a.score);
  } catch (error) {
    console.error("AI matching error:", error);

    // Fallback: basic scoring without AI
    return candidates
      .map(profile => {
        const roleAlignmentScore = scoreRoleAlignment(profile, roleTitle);
        const hasRelevantSkills = profile.skills?.some(skill =>
          roleDescription.toLowerCase().includes(skill.toLowerCase())
        );

        const score = roleAlignmentScore + (hasRelevantSkills ? 20 : 0) + (profile.quality_score || 0) * 5;

        return {
          profile,
          score: Math.min(score, 100),
          fit_summary: "AI matching unavailable - basic keyword match",
          strengths: profile.skills?.slice(0, 3) || [],
          considerations: ["Manual review recommended"],
          would_they_want_it: profile.looking_for?.join(", ") || "Unknown",
        };
      })
      .filter(m => m.score >= 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }
}

// GET: List all talent profiles (admin only)
export async function GET(request: NextRequest) {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status") || "active";
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("talent_profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profiles: data, count });
}

// POST: Match candidates to a role
export async function POST(request: NextRequest) {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      role_title,
      role_description,
      required_skills = [],
      location,
      remote_ok = true,
      salary_max,
      requires_us_auth = false,
      save_inquiry = false,
      company_name,
      contact_email
    } = body;

    if (!role_description) {
      return NextResponse.json(
        { error: "Role description is required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get active profiles
    const { data: profiles, error } = await supabase
      .from("talent_profiles")
      .select("*")
      .eq("status", "active");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const allProfiles = profiles as TalentProfile[];

    // AI Step 1: Extract structured filters from JD
    const extractedFilters = await extractFiltersFromJD(role_title || "", role_description);

    // Step 2: Apply AI-extracted hard filters
    const { passed: filteredProfiles, filtered: filteredCount, reasons: filterReasons } =
      applyAIFilters(allProfiles, extractedFilters);

    // Step 3: Pre-score by role alignment and take top candidates for AI matching
    const prescoredProfiles = filteredProfiles
      .map(profile => ({
        profile,
        preScore: scoreRoleAlignment(profile, role_title || ""),
      }))
      .sort((a, b) => b.preScore - a.preScore)
      .slice(0, 30) // Only send top 30 to AI to manage costs
      .map(p => p.profile);

    // AI Step 2: Deep AI matching with reasoning
    const matches = await deepMatchCandidates(
      role_description,
      role_title || "",
      prescoredProfiles
    );

    // Optionally save as B2B inquiry
    let inquiry_id = null;
    if (save_inquiry && company_name && contact_email) {
      const { data: inquiry } = await supabase
        .from("b2b_inquiries")
        .insert({
          company_name,
          contact_email,
          role_title: role_title || "Unknown Role",
          role_description,
          required_skills,
          matched_profiles: matches.map((m) => m.profile.id),
          status: "in_progress",
        })
        .select()
        .single();

      inquiry_id = inquiry?.id;
    }

    return NextResponse.json({
      matches,
      inquiry_id,
      total_candidates: allProfiles.length,
      after_filters: filteredProfiles.length,
      filtered_count: filteredCount,
      filter_reasons: filterReasons,
      sent_to_ai: prescoredProfiles.length,
      extracted_filters: extractedFilters,
    });
  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
