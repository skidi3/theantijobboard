import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

// Force Node.js runtime (pdf-parse doesn't work with edge)
export const runtime = "nodejs";

// PDF text extraction using pdf-parse v1.x
// Note: We import the core module directly to avoid the test file issue
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF parsing error:", error);
    return "";
  }
}

// Extract profile data and generate summary using OpenAI
interface AIExtraction {
  summary: string;
  tags: string[];
  current_title: string;
  current_company: string;
  years_experience: string;
  skills: string[];
}

async function extractAndSummarize(
  resumeText: string,
  profileData: Record<string, unknown>
): Promise<AIExtraction> {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey || !resumeText) {
    return {
      summary: "",
      tags: [],
      current_title: "",
      current_company: "",
      years_experience: "",
      skills: [],
    };
  }

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
            content: `You are a talent analyst. Given a resume, extract key information and create a summary.

Extract and respond in JSON format:
{
  "current_title": "their most recent job title",
  "current_company": "their most recent company",
  "years_experience": "estimated total years (e.g., '5 years', '10+ years')",
  "skills": ["skill1", "skill2", ...],
  "summary": "2-3 sentence summary highlighting their strongest points",
  "tags": ["tag1", "tag2", ...]
}

For skills: Extract technical skills, tools, languages, frameworks.
For tags: Include skills + experience level + industries + specializations.
Be accurate - only include what's clearly in the resume.`,
          },
          {
            role: "user",
            content: `Additional profile info: ${JSON.stringify(profileData)}

Resume text:
${resumeText.slice(0, 10000)}`,
          },
        ],
        max_tokens: 800,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "{}";

    // Parse JSON from response (handle markdown code blocks)
    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr);

    return {
      summary: parsed.summary || "",
      tags: parsed.tags || [],
      current_title: parsed.current_title || "",
      current_company: parsed.current_company || "",
      years_experience: parsed.years_experience || "",
      skills: parsed.skills || [],
    };
  } catch (error) {
    console.error("AI extraction error:", error);
    return {
      summary: "",
      tags: [],
      current_title: "",
      current_company: "",
      years_experience: "",
      skills: [],
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const supabaseAuth = await createClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    // SECURITY: Always use authenticated user's email, ignore form input
    const email = user.email as string;
    const phone = formData.get("phone") as string;
    const linkedin_url = formData.get("linkedin_url") as string;
    const github_url = formData.get("github_url") as string;
    const portfolio_url = formData.get("portfolio_url") as string;

    // Location & Work Auth
    const current_location = formData.get("current_location") as string;
    const preferred_locations = formData.get("preferred_locations") as string;
    const work_authorization = formData.get("work_authorization") as string;

    // Availability
    const notice_period = formData.get("notice_period") as string;

    // Role preferences
    const looking_for_raw = formData.get("looking_for") as string;
    const remote_preference = formData.get("remote_preference") as string;
    const salary_min = formData.get("salary_min") as string;
    const salary_max = formData.get("salary_max") as string;

    // Context
    const why_looking = formData.get("why_looking") as string;
    const ideal_role = formData.get("ideal_role") as string;
    const additional_context = formData.get("additional_context") as string;

    const resume = formData.get("resume") as File | null;
    const photo = formData.get("photo") as File | null;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!linkedin_url) {
      return NextResponse.json(
        { error: "LinkedIn profile is required" },
        { status: 400 }
      );
    }

    // Parse arrays
    const looking_for = looking_for_raw ? JSON.parse(looking_for_raw) : [];

    if (looking_for.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one role type" },
        { status: 400 }
      );
    }

    // Format salary range
    const salary_range = salary_min && salary_max
      ? `${salary_min} - ${salary_max}`
      : salary_min || salary_max || null;

    const supabase = createAdminClient();

    // Handle resume upload
    let resume_url = null;
    let resume_text = "";

    if (resume) {
      // Read file buffer
      const buffer = Buffer.from(await resume.arrayBuffer());

      // Extract text from PDF
      resume_text = await extractTextFromPDF(buffer);

      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, buffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        // Continue without resume if upload fails
      } else {
        // Get signed URL (valid for 1 year)
        const { data: urlData } = await supabase.storage
          .from("resumes")
          .createSignedUrl(fileName, 60 * 60 * 24 * 365);

        resume_url = urlData?.signedUrl || null;
      }
    }

    // Handle photo upload
    let photo_url = null;

    if (photo) {
      const photoBuffer = Buffer.from(await photo.arrayBuffer());
      const photoExt = photo.type.split("/")[1] || "jpg";
      const photoFileName = `${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, "_")}.${photoExt}`;

      const { error: photoUploadError } = await supabase.storage
        .from("photos")
        .upload(photoFileName, photoBuffer, {
          contentType: photo.type,
          upsert: false,
        });

      if (photoUploadError) {
        console.error("Photo upload error:", photoUploadError);
        // Continue without photo if upload fails
      } else {
        // Get public URL for photos
        const { data: photoUrlData } = supabase.storage
          .from("photos")
          .getPublicUrl(photoFileName);

        photo_url = photoUrlData?.publicUrl || null;
      }
    }

    // Prepare profile data for AI
    const profileData = {
      name,
      location: current_location,
      looking_for,
      linkedin_url,
      github_url,
      portfolio_url,
    };

    // Extract info from resume and generate summary
    const extraction = await extractAndSummarize(resume_text, profileData);

    // Insert or update profile
    const { data, error } = await supabase
      .from("talent_profiles")
      .upsert(
        {
          email,
          name,
          phone: phone || null,
          location: current_location || null,
          linkedin_url: linkedin_url || null,
          github_url: github_url || null,
          portfolio_url: portfolio_url || null,
          current_title: extraction.current_title || null,
          current_company: extraction.current_company || null,
          years_experience: extraction.years_experience || null,
          skills: extraction.skills,
          ...(resume_url && { resume_url }),
          ...(resume_text && { resume_text }),
          ...(photo_url && { photo_url }),
          ai_summary: extraction.summary || null,
          ai_tags: extraction.tags,
          looking_for,
          remote_preference: remote_preference || "flexible",
          salary_range: salary_range || null,
          preferred_locations: preferred_locations || null,
          work_authorization: work_authorization || null,
          notice_period: notice_period || null,
          why_looking: why_looking || null,
          ideal_role: ideal_role || null,
          additional_context: additional_context || null,
          status: "active",
          source: "organic",
          user_id: user.id,
          last_active_at: new Date().toISOString(),
        },
        {
          onConflict: "email",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profile_id: data.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
