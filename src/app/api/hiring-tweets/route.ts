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
  free: 5,
  list: 10,
  edge: Infinity,
  concierge: Infinity,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
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
  const limit = PLAN_LIMITS[plan] || 5;

  let query = supabaseAdmin
    .from("hiring_tweets")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  // Apply limit if not unlimited
  if (limit !== Infinity) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get total count for UI
  let totalQuery = supabaseAdmin
    .from("hiring_tweets")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  if (category && category !== "all") {
    totalQuery = totalQuery.eq("category", category);
  }

  const { count } = await totalQuery;

  return NextResponse.json({
    tweets: data,
    total: count || 0,
    limit,
    plan
  });
}

// POST - Add new tweets (admin only)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { tweets } = body;

  if (!tweets || !Array.isArray(tweets)) {
    return NextResponse.json({ error: "Invalid tweets array" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("hiring_tweets")
    .upsert(tweets, { onConflict: "tweet_url" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: data?.length || 0 });
}

// DELETE - Clear old tweets (admin only)
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("hiring_tweets")
    .update({ is_active: false })
    .lt("expires_at", new Date().toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
