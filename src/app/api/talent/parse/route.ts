import { NextRequest, NextResponse } from "next/server";
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

    // Debug logs removed for security
    return data.text || "";
  } catch (error) {
    console.error("[PARSE] PDF parsing error:", error);
    return "";
  }
}

// Regex-based fallback extraction (works without AI)
function extractWithRegex(text: string): {
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
} {
  // Email pattern
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

  // Phone patterns (various formats)
  const phoneMatch = text.match(/(?:\+?1[-.\s]?)?(?:\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}/);

  // LinkedIn URL
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);

  // GitHub URL
  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : null,
    github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : null,
  };
}

// Extract contact info from resume using AI
async function extractContactInfo(resumeText: string): Promise<{
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}> {
  const openaiKey = process.env.OPENAI_API_KEY;

  // First try regex extraction as fallback
  const regexResult = extractWithRegex(resumeText);

  if (!openaiKey || !resumeText) {
    return {
      name: null,
      email: regexResult.email,
      phone: regexResult.phone,
      location: null,
      linkedin: regexResult.linkedin,
      github: regexResult.github,
      portfolio: null,
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
            content: `Extract contact information from this resume. Return JSON only:
{
  "name": "full name or null",
  "email": "email address or null",
  "phone": "phone number or null",
  "location": "city, state/country or null",
  "linkedin": "linkedin URL or null",
  "github": "github URL or null",
  "portfolio": "website/portfolio URL or null"
}

Rules:
- Only extract what's clearly present
- For URLs, include the full URL if partial (e.g., "linkedin.com/in/john" -> "https://linkedin.com/in/john")
- Return null for anything not found
- Be accurate, don't guess`,
          },
          {
            role: "user",
            content: resumeText.slice(0, 4000), // First part usually has contact info
          },
        ],
        max_tokens: 300,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[PARSE] OpenAI API error:", response.status, errorText);
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "{}";

    // Parse JSON (handle markdown code blocks)
    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (error) {
    console.error("[PARSE] AI extraction error:", error);
    // Fall back to regex results
    return {
      name: null,
      email: regexResult.email,
      phone: regexResult.phone,
      location: null,
      linkedin: regexResult.linkedin,
      github: regexResult.github,
      portfolio: null,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check - prevent unauthorized API usage
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();
    const resume = formData.get("resume") as File | null;

    if (!resume) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file buffer
    const buffer = Buffer.from(await resume.arrayBuffer());

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(buffer);

    if (!resumeText) {
      return NextResponse.json({ error: "Could not read PDF" }, { status: 400 });
    }

    // Extract contact info using AI
    const contactInfo = await extractContactInfo(resumeText);

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("[PARSE] Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
