// Admin authorization
// Can be used in both server and client components

// Hardcoded admin emails - only these can access admin features
export const ADMIN_EMAILS = [
  "nikhilkatta10@gmail.com",
  "tannishtha.adhikary@gmail.com",
] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase() as typeof ADMIN_EMAILS[number]);
}

// For use in API routes
export function assertAdmin(email: string | null | undefined): void {
  if (!isAdminEmail(email)) {
    throw new Error("Unauthorized: Admin access required");
  }
}
