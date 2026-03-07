import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getSafeRedirectPath(path: string): string {
  // Remove whitespace
  const trimmed = path.trim();

  // Must start with single forward slash (not //)
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/drops";
  }

  // Block backslash tricks
  if (trimmed.includes("\\")) {
    return "/drops";
  }

  // Block URLs with @ sign (credential injection)
  if (trimmed.includes("@")) {
    return "/drops";
  }

  return trimmed;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/drops";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if next is an external URL (e.g., Dodo checkout)
      if (next.startsWith("http://") || next.startsWith("https://")) {
        // Only allow specific trusted domains
        const trustedDomains = ["checkout.dodopayments.com"];
        try {
          const nextUrl = new URL(next);
          if (trustedDomains.some(domain => nextUrl.host === domain)) {
            return NextResponse.redirect(next);
          }
        } catch {
          // Invalid URL, redirect to drops
        }
        return NextResponse.redirect(`${origin}/drops`);
      }
      // Internal path - validate it
      const safePath = getSafeRedirectPath(next);
      return NextResponse.redirect(`${origin}${safePath}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
