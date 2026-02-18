import { createClient } from "@supabase/supabase-js";

// Admin client for server-side operations (webhooks, etc.)
// Uses service role key - NEVER expose this to the client
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase admin credentials not configured");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type Plan = "free" | "list" | "edge" | "concierge";

export async function updateUserPlan(email: string, plan: Plan, dodoCustomerId?: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      plan,
      ...(dodoCustomerId && { dodo_customer_id: dodoCustomerId }),
    })
    .eq("email", email)
    .select()
    .single();

  if (error) {
    console.error("Failed to update user plan:", error);
    throw error;
  }

  return data;
}

export async function getUserByEmail(email: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found, which is fine
    console.error("Failed to get user:", error);
    throw error;
  }

  return data;
}

// Create or update a paid user (for importing existing customers or webhook handling)
// Creates auth account if doesn't exist, then sets their plan
export async function createOrUpdatePaidUser(
  email: string,
  plan: Plan,
  dodoCustomerId?: string,
  sendPasswordReset: boolean = true
): Promise<{ created: boolean; userId: string }> {
  const supabase = createAdminClient();

  // Check if user already exists in auth
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    // User exists - just update their plan
    await supabase
      .from("users")
      .update({
        plan,
        ...(dodoCustomerId && { dodo_customer_id: dodoCustomerId }),
      })
      .eq("id", existingUser.id);

    return { created: false, userId: existingUser.id };
  }

  // Create new auth user with a random password (they'll reset it)
  const tempPassword = crypto.randomUUID() + "Aa1!"; // Meets password requirements

  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true, // Auto-confirm their email since they already paid
  });

  if (createError) {
    console.error("Failed to create auth user:", createError);
    throw createError;
  }

  // The trigger should create the users row, but update it with plan info
  // Wait a bit for the trigger to execute
  await new Promise((resolve) => setTimeout(resolve, 500));

  await supabase
    .from("users")
    .update({
      plan,
      ...(dodoCustomerId && { dodo_customer_id: dodoCustomerId }),
    })
    .eq("id", newUser.user.id);

  // Send password reset email so they can set their own password
  if (sendPasswordReset) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.theantijobboard.com";
    await supabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${siteUrl}/reset-password`,
      },
    });
  }

  return { created: true, userId: newUser.user.id };
}

// Bulk import existing Dodo customers
export interface CustomerImport {
  email: string;
  plan: Plan;
  dodoCustomerId?: string;
}

export async function importDodoCustomers(
  customers: CustomerImport[]
): Promise<{ success: string[]; failed: { email: string; error: string }[] }> {
  const results = {
    success: [] as string[],
    failed: [] as { email: string; error: string }[],
  };

  for (const customer of customers) {
    try {
      await createOrUpdatePaidUser(
        customer.email,
        customer.plan,
        customer.dodoCustomerId,
        true // Send password reset emails
      );
      results.success.push(customer.email);
      console.log(`Imported customer: ${customer.email} with plan: ${customer.plan}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      results.failed.push({ email: customer.email, error: errorMessage });
      console.error(`Failed to import ${customer.email}:`, errorMessage);
    }
  }

  return results;
}
