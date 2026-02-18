import { NextRequest, NextResponse } from "next/server";
import { createOrUpdatePaidUser, type Plan } from "@/lib/supabase/admin";
import { listActiveSubscriptions } from "@/lib/dodo";

// Map Dodo product IDs to plans (same as webhook)
const PRODUCT_TO_PLAN: Record<string, Plan> = {
  "pdt_0NYZGp6tILAr3BWvuRCIx": "list",      // $9/month - The List
  "pdt_0NYZGtzTuEp5AZL5BRKqr": "edge",      // $19/month - The Edge
  "pdt_0NYZHBKaapeodleUfpIav": "concierge", // $199/month - The Concierge
};

// Admin API to sync existing Dodo customers to Supabase
// Fetches active subscriptions from Dodo and creates/updates accounts
export async function POST(request: NextRequest) {
  try {
    // Verify admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get("authorization");

    if (!adminSecret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET not configured" },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if Dodo API is configured
    if (!process.env.DODO_API_KEY) {
      return NextResponse.json(
        { error: "DODO_API_KEY not configured" },
        { status: 500 }
      );
    }

    console.log("Fetching active subscriptions from Dodo Payments...");

    // Fetch all active subscriptions from Dodo
    const subscriptions = await listActiveSubscriptions();

    console.log(`Found ${subscriptions.length} active subscriptions`);

    const results = {
      total: subscriptions.length,
      created: [] as string[],
      updated: [] as string[],
      skipped: [] as { email: string; reason: string }[],
      failed: [] as { email: string; error: string }[],
    };

    for (const sub of subscriptions) {
      const email = sub.customer.email;
      const customerId = sub.customer.customer_id;
      const plan = PRODUCT_TO_PLAN[sub.product_id];

      if (!plan) {
        results.skipped.push({
          email,
          reason: `Unknown product ID: ${sub.product_id}`,
        });
        continue;
      }

      try {
        const { created } = await createOrUpdatePaidUser(
          email,
          plan,
          customerId,
          true // Send password reset email for new users
        );

        if (created) {
          results.created.push(email);
          console.log(`Created account: ${email} (${plan})`);
        } else {
          results.updated.push(email);
          console.log(`Updated account: ${email} (${plan})`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        results.failed.push({ email, error: errorMessage });
        console.error(`Failed: ${email} - ${errorMessage}`);
      }
    }

    return NextResponse.json({
      message: `Sync completed. ${results.created.length} created, ${results.updated.length} updated, ${results.skipped.length} skipped, ${results.failed.length} failed.`,
      results,
    });
  } catch (error) {
    console.error("Import error:", error);
    const errorMessage = error instanceof Error ? error.message : "Import failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET endpoint to preview what would be imported (dry run)
export async function GET(request: NextRequest) {
  try {
    // Verify admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get("authorization");

    if (!adminSecret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET not configured" },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!process.env.DODO_API_KEY) {
      return NextResponse.json(
        { error: "DODO_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Fetch all active subscriptions from Dodo
    const subscriptions = await listActiveSubscriptions();

    const preview = subscriptions.map((sub) => ({
      email: sub.customer.email,
      customerId: sub.customer.customer_id,
      productId: sub.product_id,
      plan: PRODUCT_TO_PLAN[sub.product_id] || "unknown",
      status: sub.status,
    }));

    return NextResponse.json({
      message: `Found ${subscriptions.length} active subscriptions to import`,
      customers: preview,
    });
  } catch (error) {
    console.error("Preview error:", error);
    const errorMessage = error instanceof Error ? error.message : "Preview failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
