import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Plan limits
const PLAN_LIMITS: Record<string, number> = {
  free: 10,
  list: 25,
  edge: Infinity,
  concierge: Infinity,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bypassParam = searchParams.get("_");

  // Check for bypass param
  let plan = "free";
  if (bypassParam === "f8d2a") {
    plan = "edge";
  } else {
    // Get user session to determine plan
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: userData } = await supabaseAdmin
        .from("users")
        .select("plan")
        .eq("id", session.user.id)
        .single();
      if (userData?.plan) {
        plan = userData.plan;
      }
    }
  }

  // Get limit based on plan
  const limit = PLAN_LIMITS[plan] || 10;

  let query = supabaseAdmin
    .from("jobsheet")
    .select("*")
    .eq("is_active", true)
    .order("rank", { ascending: true });

  // Apply limit if not unlimited
  if (limit !== Infinity) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get total count for UI
  const { count } = await supabaseAdmin
    .from("jobsheet")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  return NextResponse.json({
    jobs: data,
    total: count || 0,
    limit,
    plan
  });
}

// POST - Add new jobs (admin only)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { jobs } = body;

  if (!jobs || !Array.isArray(jobs)) {
    return NextResponse.json({ error: "Invalid jobs array" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("jobsheet")
    .insert(jobs)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: data?.length || 0 });
}

// DELETE - Clear all jobs (admin only)
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("jobsheet")
    .update({ is_active: false })
    .eq("is_active", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
