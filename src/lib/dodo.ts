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
        status: "cancelled",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to cancel subscription: ${response.status} - ${error}`);
  }
}

export type { DodoCustomer, DodoSubscription };
