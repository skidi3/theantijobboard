import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import { TalentDashboard } from "./TalentDashboard";

// Server Component - all auth happens server-side, no client manipulation possible
export default async function TalentPage() {
  // 1. Check authentication server-side
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login?redirect=/drops/talent");
  }

  // 2. Check admin authorization server-side
  const userEmail = session.user.email;
  if (!isAdminEmail(userEmail)) {
    // Don't even hint this page exists - just redirect to drops
    redirect("/drops");
  }

  // 3. Fetch talent data server-side using admin client
  const adminSupabase = createAdminClient();

  const { data: profiles, error } = await adminSupabase
    .from("talent_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching talent profiles:", error);
  }

  // 4. Pass data to client component for interactivity
  // The client component CANNOT fetch different data - it only displays what server gives it
  return (
    <TalentDashboard
      profiles={profiles || []}
      adminEmail={userEmail || ""}
    />
  );
}
