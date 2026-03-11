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
  ai_summary: string | null;
  ai_tags: string[];
  looking_for: string[];
  remote_preference: string;
  salary_range: string | null;
  quality_score: number | null;
}

interface MatchResult {
  profile: TalentProfile;
  score: number;
  reasons: string[];
}

// AI-powered matching
async function matchCandidates(
  roleDescription: string,
  requiredSkills: string[],
  profiles: TalentProfile[]
): Promise<MatchResult[]> {
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey || profiles.length === 0) {
    return [];
  }

  // Prepare candidate summaries for AI
  const candidateSummaries = profiles.map((p, i) => ({
    index: i,
    name: p.name,
    title: p.current_title,
    skills: p.skills.join(", "),
    experience: p.years_experience,
    summary: p.ai_summary,
    tags: p.ai_tags.join(", "),
    looking_for: p.looking_for.join(", "),
  }));

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
            content: `You are a talent matching expert. Given a job role and a list of candidates, rank the top 10 best matches.

For each match, provide:
- index: the candidate's index from the list
- score: 1-100 match score
- reasons: 2-3 bullet points explaining why they're a good fit

Respond in JSON format:
{
  "matches": [
    { "index": 0, "score": 95, "reasons": ["reason1", "reason2"] },
    ...
  ]
}

Be strict with scoring. Only high scores (80+) for excellent matches.`,
          },
          {
            role: "user",
            content: `Role: ${roleDescription}

Required skills: ${requiredSkills.join(", ")}

Candidates:
${JSON.stringify(candidateSummaries, null, 2)}`,
          },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "{}";

    // Parse JSON from response
    const parsed = JSON.parse(content);
    const matches = parsed.matches || [];

    // Map back to full profiles
    return matches.map((m: { index: number; score: number; reasons: string[] }) => ({
      profile: profiles[m.index],
      score: m.score,
      reasons: m.reasons,
    }));
  } catch (error) {
    console.error("AI matching error:", error);

    // Fallback: simple keyword matching
    return profiles
      .map((profile) => {
        let score = 0;
        const reasons: string[] = [];

        // Check skill overlap
        const profileSkills = profile.skills.map((s) => s.toLowerCase());
        const matchedSkills = requiredSkills.filter((s) =>
          profileSkills.some((ps) => ps.includes(s.toLowerCase()))
        );

        if (matchedSkills.length > 0) {
          score += matchedSkills.length * 10;
          reasons.push(`Matches ${matchedSkills.length} required skills`);
        }

        // Check AI tags
        const profileTags = profile.ai_tags.map((t) => t.toLowerCase());
        const roleWords = roleDescription.toLowerCase().split(/\s+/);
        const tagMatches = roleWords.filter((w) =>
          profileTags.some((t) => t.includes(w))
        );

        if (tagMatches.length > 0) {
          score += tagMatches.length * 5;
          reasons.push(`Profile tags match role keywords`);
        }

        // Boost for quality score
        if (profile.quality_score) {
          score += profile.quality_score * 2;
        }

        return { profile, score, reasons };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
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
    const { role_title, role_description, required_skills = [], save_inquiry = false, company_name, contact_email } = body;

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

    // Run matching
    const matches = await matchCandidates(
      role_description,
      required_skills,
      profiles as TalentProfile[]
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
      total_candidates: profiles?.length || 0,
    });
  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
