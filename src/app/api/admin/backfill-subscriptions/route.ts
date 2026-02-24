import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { listActiveSubscriptions } from "@/lib/dodo";

// POST - Sync all subscription IDs from Dodo to users table (by email match)
export async function POST(request: NextRequest) {
  try {
    // Check for admin secret
    const authHeader = request.headers.get("authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Get all active subscriptions from Dodo
    const subscriptions = await listActiveSubscriptions();

    const results = {
      updated: [] as string[],
      notFound: [] as string[],
      errors: [] as { email: string; error: string }[],
    };

    // Update each user by email
    for (const sub of subscriptions) {
      const email = sub.customer.email.toLowerCase();

      try {
        const { data, error: updateError } = await supabase
          .from("users")
          .update({
            dodo_subscription_id: sub.subscription_id,
            dodo_customer_id: sub.customer.customer_id,
          })
          .eq("email", email)
          .select()
          .single();

        if (updateError) {
          if (updateError.code === "PGRST116") {
            // No user found with this email
            results.notFound.push(email);
          } else {
            results.errors.push({ email, error: updateError.message });
          }
        } else if (data) {
          results.updated.push(email);
        }
      } catch (err) {
        results.errors.push({
          email,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      message: "Sync complete",
      totalSubscriptions: subscriptions.length,
      updated: results.updated.length,
      notFound: results.notFound.length,
      errors: results.errors.length,
      details: results,
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { error: "Sync failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
