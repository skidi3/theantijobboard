import { NextRequest, NextResponse } from "next/server";
import { updateCustomerEmail, listActiveSubscriptions } from "@/lib/dodo";
import { createAdminClient } from "@/lib/supabase/admin";

// POST - Update customer email in Dodo and sync to our DB
// Body: { oldEmail: string, newEmail: string }
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldEmail, newEmail } = await request.json();

    if (!oldEmail || !newEmail) {
      return NextResponse.json(
        { error: "Both oldEmail and newEmail are required" },
        { status: 400 }
      );
    }

    // Find the subscription with the old email to get customer_id
    const subscriptions = await listActiveSubscriptions();
    const subscription = subscriptions.find(
      (sub) => sub.customer.email.toLowerCase() === oldEmail.toLowerCase()
    );

    if (!subscription) {
      return NextResponse.json(
        { error: `No active subscription found for ${oldEmail}` },
        { status: 404 }
      );
    }

    const customerId = subscription.customer.customer_id;

    // Update email in Dodo
    await updateCustomerEmail(customerId, newEmail);

    // Update our database - link the subscription to the new email user
    const supabase = createAdminClient();

    const { data: updatedUser, error: dbError } = await supabase
      .from("users")
      .update({
        dodo_customer_id: customerId,
        dodo_subscription_id: subscription.subscription_id,
      })
      .eq("email", newEmail.toLowerCase())
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({
        message: "Email updated in Dodo but failed to update database",
        dodoUpdated: true,
        dbUpdated: false,
        error: dbError.message,
        customerId,
      });
    }

    return NextResponse.json({
      message: "Customer email updated successfully",
      oldEmail,
      newEmail,
      customerId,
      subscriptionId: subscription.subscription_id,
      dbUpdated: !!updatedUser,
    });
  } catch (error) {
    console.error("Update customer email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update email" },
      { status: 500 }
    );
  }
}
