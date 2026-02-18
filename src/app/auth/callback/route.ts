import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if next is an external URL (e.g., Dodo checkout)
      if (next.startsWith("http://") || next.startsWith("https://")) {
        // Only allow specific trusted domains
        const trustedDomains = ["checkout.dodopayments.com"];
        const nextUrl = new URL(next);
        if (trustedDomains.some(domain => nextUrl.host === domain)) {
          return NextResponse.redirect(next);
        }
        // Untrusted external URL, redirect home
        return NextResponse.redirect(origin);
      }
      // Internal path
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
