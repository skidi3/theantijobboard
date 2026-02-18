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

export type { DodoCustomer, DodoSubscription };
