import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// POST - Update last_active_at for current user's talent profile
export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ ok: false });
    }

    // Update last_active_at for their talent profile (if exists)
    const adminSupabase = createAdminClient();
    await adminSupabase
      .from("talent_profiles")
      .update({ last_active_at: new Date().toISOString() })
      .eq("email", user.email);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
