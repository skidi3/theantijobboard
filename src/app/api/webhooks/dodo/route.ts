import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { sendWelcomeEmail } from "@/lib/resend";
import { createOrUpdatePaidUser, updateUserPlan, type Plan } from "@/lib/supabase/admin";

// Map Dodo product IDs to plans
const PRODUCT_TO_PLAN: Record<string, Plan> = {
  "pdt_0NYZGp6tILAr3BWvuRCIx": "list",    // $9/month - The List
  "pdt_0NYZGtzTuEp5AZL5BRKqr": "edge",    // $19/month - The Edge
  "pdt_0NYZHBKaapeodleUfpIav": "concierge", // $199/month - The Concierge
};

// Dodo Payments webhook payload types
interface DodoWebhookPayload {
  business_id: string;
  type: string;
  timestamp: string;
  data: {
    payload_type: string;
    payment_id?: string;
    customer?: {
      customer_id: string;
      email: string;
      name?: string;
    };
    product_id?: string;
    total_amount?: number;
    currency?: string;
    status?: string;
    // Subscription specific fields
    subscription_id?: string;
    // Other fields as needed
  };
}

export async function POST(request: NextRequest) {
  try {
    const webhookKey = process.env.DODO_WEBHOOK_KEY;

    if (!webhookKey) {
      console.error("DODO_WEBHOOK_KEY not configured");
      return NextResponse.json(
        { error: "Webhook key not configured" },
        { status: 500 }
      );
    }

    const rawBody = await request.text();

    // Get webhook headers for verification
    const webhookHeaders = {
      "webhook-id": request.headers.get("webhook-id") || "",
      "webhook-signature": request.headers.get("webhook-signature") || "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
    };

    // Verify webhook signature
    const webhook = new Webhook(webhookKey);

    try {
      webhook.verify(rawBody, webhookHeaders);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody) as DodoWebhookPayload;

    console.log("Received Dodo webhook:", payload.type);

    // Handle different event types
    switch (payload.type) {
      case "payment.succeeded":
        await handlePaymentSucceeded(payload);
        break;

      case "subscription.active":
        await handleSubscriptionActive(payload);
        break;

      case "payment.failed":
        console.log("Payment failed:", payload.data.payment_id);
        break;

      case "subscription.cancelled":
      case "subscription.expired":
        await handleSubscriptionEnded(payload);
        break;

      default:
        console.log("Unhandled webhook event:", payload.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(payload: DodoWebhookPayload) {
  const customerEmail = payload.data.customer?.email;
  const customerId = payload.data.customer?.customer_id;
  const productId = payload.data.product_id;

  if (!customerEmail) {
    console.error("No customer email in payment webhook");
    return;
  }

  console.log("Processing successful payment for:", customerEmail);

  // Determine plan from product ID
  const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

  // Create or update user in Supabase (creates auth account if doesn't exist)
  if (plan) {
    try {
      const { created } = await createOrUpdatePaidUser(
        customerEmail,
        plan,
        customerId,
        true // Send password reset email if new user
      );
      console.log(
        created
          ? `Created account for ${customerEmail} with plan: ${plan}`
          : `Updated ${customerEmail} to plan: ${plan}`
      );
    } catch (error) {
      console.error("Failed to create/update user:", error);
      // Continue - still send welcome email
    }
  }

  // Send welcome email
  try {
    await sendWelcomeEmail(customerEmail);
    console.log("Welcome email sent to:", customerEmail);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

async function handleSubscriptionActive(payload: DodoWebhookPayload) {
  const customerEmail = payload.data.customer?.email;
  const customerId = payload.data.customer?.customer_id;
  const productId = payload.data.product_id;

  if (!customerEmail) {
    console.error("No customer email in subscription webhook");
    return;
  }

  console.log("New subscription activated for:", customerEmail);

  // Determine plan from product ID
  const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

  // Create or update user in Supabase (creates auth account if doesn't exist)
  if (plan) {
    try {
      const { created } = await createOrUpdatePaidUser(
        customerEmail,
        plan,
        customerId,
        true // Send password reset email if new user
      );
      console.log(
        created
          ? `Created account for ${customerEmail} with plan: ${plan}`
          : `Updated ${customerEmail} to plan: ${plan}`
      );
    } catch (error) {
      console.error("Failed to create/update user:", error);
    }
  }

  // Send welcome email
  try {
    await sendWelcomeEmail(customerEmail);
    console.log("Welcome email sent to:", customerEmail);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

async function handleSubscriptionEnded(payload: DodoWebhookPayload) {
  const customerEmail = payload.data.customer?.email;

  if (!customerEmail) {
    console.error("No customer email in subscription cancelled webhook");
    return;
  }

  console.log("Subscription ended for:", customerEmail);

  // Downgrade user to free plan
  try {
    await updateUserPlan(customerEmail, "free");
    console.log(`Downgraded ${customerEmail} to free plan`);
  } catch (error) {
    console.error("Failed to downgrade user plan:", error);
  }
}
