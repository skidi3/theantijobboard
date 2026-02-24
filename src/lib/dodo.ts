// Dodo Payments API client

const getDodoConfig = () => {
  const apiKey = process.env.DODO_API_KEY;
  const apiUrl = process.env.DODO_API_URL || "https://live.dodopayments.com";

  if (!apiKey) {
    throw new Error("DODO_API_KEY not configured");
  }

  return { apiKey, apiUrl };
};

interface DodoCustomer {
  customer_id: string;
  business_id: string;
  name: string;
  email: string;
  created_at: string;
  phone_number?: string | null;
}

interface DodoSubscription {
  subscription_id: string;
  customer: {
    customer_id: string;
    email: string;
    name?: string;
  };
  product_id: string;
  status: "pending" | "active" | "on_hold" | "cancelled" | "failed" | "expired";
  billing: {
    amount: number;
    currency: string;
  };
  created_at: string;
  current_period_start?: string;
  current_period_end?: string;
}

export async function listCustomers(): Promise<DodoCustomer[]> {
  const { apiKey, apiUrl } = getDodoConfig();

  const allCustomers: DodoCustomer[] = [];
  let pageNumber = 0;
  const pageSize = 100;

  while (true) {
    const response = await fetch(
      `${apiUrl}/customers?page_size=${pageSize}&page_number=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.status}`);
    }

    const data = await response.json();
    allCustomers.push(...data.items);

    if (data.items.length < pageSize) {
      break;
    }
    pageNumber++;
  }

  return allCustomers;
}

export async function listActiveSubscriptions(): Promise<DodoSubscription[]> {
  const { apiKey, apiUrl } = getDodoConfig();

  const allSubscriptions: DodoSubscription[] = [];
  let pageNumber = 0;
  const pageSize = 100;

  while (true) {
    const response = await fetch(
      `${apiUrl}/subscriptions?status=active&page_size=${pageSize}&page_number=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subscriptions: ${response.status}`);
    }

    const data = await response.json();
    allSubscriptions.push(...data.items);

    if (data.items.length < pageSize) {
      break;
    }
    pageNumber++;
  }

  return allSubscriptions;
}

export async function getSubscriptionByEmail(email: string): Promise<DodoSubscription | null> {
  const subscriptions = await listActiveSubscriptions();
  return subscriptions.find(sub => sub.customer.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getSubscriptionByCustomerId(customerId: string): Promise<DodoSubscription | null> {
  const subscriptions = await listActiveSubscriptions();
  return subscriptions.find(sub => sub.customer.customer_id === customerId) || null;
}

export async function updateCustomerEmail(customerId: string, newEmail: string): Promise<void> {
  const { apiKey, apiUrl } = getDodoConfig();

  const response = await fetch(
    `${apiUrl}/customers/${customerId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newEmail,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update customer email: ${response.status} - ${error}`);
  }
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  const { apiKey, apiUrl } = getDodoConfig();

  const response = await fetch(
    `${apiUrl}/subscriptions/${subscriptionId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cancel_at_next_billing_date: true,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to cancel subscription: ${response.status} - ${error}`);
  }
}

// Product IDs for each plan
export const PRODUCT_IDS = {
  list: "pdt_0NYZGp6tILAr3BWvuRCIx",
  edge: "pdt_0NYZGtzTuEp5AZL5BRKqr",
  concierge: "pdt_0NYZHBKaapeodleUfpIav",
} as const;

// Plan prices in cents
export const PLAN_PRICES = {
  list: 900,
  edge: 1900,
  concierge: 19900,
} as const;

export type PlanType = keyof typeof PRODUCT_IDS;

interface ChangePlanResponse {
  status: string;
  subscription_id: string;
  invoice_id?: string;
  payment_id?: string;
  proration_billing_mode: string;
}

export async function changePlan(
  subscriptionId: string,
  newProductId: string,
  prorationMode: "prorated_immediately" | "difference_immediately" | "full_immediately" = "difference_immediately"
): Promise<ChangePlanResponse> {
  const { apiKey, apiUrl } = getDodoConfig();

  const response = await fetch(
    `${apiUrl}/subscriptions/${subscriptionId}/change-plan`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: newProductId,
        quantity: 1,
        proration_billing_mode: prorationMode,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to change plan: ${response.status} - ${error}`);
  }

  return response.json();
}

// Calculate prorated upgrade amount
export function calculateProratedAmount(
  currentPlanPrice: number,
  newPlanPrice: number,
  currentPeriodEnd: string
): number {
  const now = new Date();
  const periodEnd = new Date(currentPeriodEnd);
  const periodStart = new Date(periodEnd);
  periodStart.setMonth(periodStart.getMonth() - 1);

  const totalDays = Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (remainingDays <= 0) return newPlanPrice - currentPlanPrice;

  // For difference_immediately mode: charge the price difference
  const priceDiff = newPlanPrice - currentPlanPrice;

  // Prorate based on remaining days
  const proratedAmount = Math.round((priceDiff * remainingDays) / totalDays);

  return Math.max(0, proratedAmount);
}

export type { DodoCustomer, DodoSubscription };
