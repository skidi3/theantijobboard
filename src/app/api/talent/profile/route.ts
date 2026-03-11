import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// GET - Fetch current user's talent profile and update last_active_at
export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch profile by email
    const { data: profile, error } = await supabase
      .from("talent_profiles")
      .select("*")
      .eq("email", user.email)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned (profile doesn't exist yet)
      console.error("Database error:", error);
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    // If profile exists, update last_active_at
    if (profile) {
      const adminSupabase = createAdminClient();
      await adminSupabase
        .from("talent_profiles")
        .update({ last_active_at: new Date().toISOString() })
        .eq("id", profile.id);
    }

    // Return profile or null if doesn't exist
    return NextResponse.json({
      profile: profile || null,
      user: {
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
