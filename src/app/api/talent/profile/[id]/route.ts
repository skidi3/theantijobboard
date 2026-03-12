import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Server-side admin check
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

// PATCH: Update profile admin fields
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, quality_score, admin_notes, last_contacted_at } = body;

    const supabase = createAdminClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (quality_score !== undefined) updateData.quality_score = quality_score;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    if (last_contacted_at !== undefined) updateData.last_contacted_at = last_contacted_at;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("talent_profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
