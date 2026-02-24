import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  cancelSubscription,
  changePlan,
  getSubscriptionByCustomerId,
  PRODUCT_IDS,
  PLAN_PRICES,
  PlanType
} from "@/lib/dodo";

// GET - Get current user's subscription
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get subscription info from our database
    const { data: userData } = await supabase
      .from("users")
      .select("plan, dodo_subscription_id")
      .eq("id", user.id)
      .single();

    if (!userData?.dodo_subscription_id) {
      return NextResponse.json({ subscription: null });
    }

    return NextResponse.json({
      subscription: {
        id: userData.dodo_subscription_id,
        plan: userData.plan,
      },
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

// DELETE - Cancel subscription
export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get subscription ID and customer ID from our database
    const { data: userData } = await supabase
      .from("users")
      .select("dodo_subscription_id, dodo_customer_id")
      .eq("id", user.id)
      .single();

    let subscriptionId = userData?.dodo_subscription_id;
    const customerId = userData?.dodo_customer_id;

    // If no subscription ID but we have customer ID, try to fetch it from Dodo
    if (!subscriptionId && customerId) {
      const subscription = await getSubscriptionByCustomerId(customerId);
      if (subscription) {
        subscriptionId = subscription.subscription_id;
        // Save it for future use
        await supabase
          .from("users")
          .update({ dodo_subscription_id: subscriptionId })
          .eq("id", user.id);
      }
    }

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    await cancelSubscription(subscriptionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}

// PATCH - Upgrade/change plan using Dodo's Change Plan API
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { newPlan, preview } = body as { newPlan: PlanType; preview?: boolean };

    if (!newPlan || !PRODUCT_IDS[newPlan]) {
      return NextResponse.json(
        { error: "Invalid plan specified" },
        { status: 400 }
      );
    }

    // Get user's current plan, subscription ID, and customer ID from database
    const { data: userData } = await supabase
      .from("users")
      .select("plan, dodo_subscription_id, dodo_customer_id")
      .eq("id", user.id)
      .single();

    const currentPlan = (userData?.plan || "free") as PlanType;
    let subscriptionId = userData?.dodo_subscription_id;
    const customerId = userData?.dodo_customer_id;
    const currentPrice = PLAN_PRICES[currentPlan] || 0;
    const newPrice = PLAN_PRICES[newPlan];

    // Can only upgrade (not downgrade via this endpoint)
    if (newPrice <= currentPrice) {
      return NextResponse.json(
        { error: "Can only upgrade to a higher plan" },
        { status: 400 }
      );
    }

    // Calculate price difference
    const priceDifference = newPrice - currentPrice;

    // If no subscription ID but we have customer ID, try to fetch it from Dodo
    if (!subscriptionId && customerId) {
      const subscription = await getSubscriptionByCustomerId(customerId);
      if (subscription) {
        subscriptionId = subscription.subscription_id;
        // Save it for future use
        await supabase
          .from("users")
          .update({ dodo_subscription_id: subscriptionId })
          .eq("id", user.id);
      }
    }

    // Check if we have subscription ID
    if (!subscriptionId) {
      return NextResponse.json(
        { error: "No subscription found. Please contact support at hello@theantijobboard.com" },
        { status: 404 }
      );
    }

    // If preview mode, return pricing info
    if (preview) {
      return NextResponse.json({
        currentPlan,
        newPlan,
        currentPrice: currentPrice / 100,
        newPrice: newPrice / 100,
        priceDifference: priceDifference / 100,
        hasSubscription: true,
      });
    }

    // Execute the plan change via Dodo API
    const result = await changePlan(
      subscriptionId,
      PRODUCT_IDS[newPlan],
      "difference_immediately" // Charges price difference immediately
    );

    // Update user's plan in database (webhook will also do this, but update immediately for UX)
    await supabase
      .from("users")
      .update({ plan: newPlan })
      .eq("id", user.id);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error changing plan:", error);
    return NextResponse.json(
      { error: "Failed to change plan. Please contact support." },
      { status: 500 }
    );
  }
}
