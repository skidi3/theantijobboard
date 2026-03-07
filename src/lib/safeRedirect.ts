// Trusted external domains for checkout flows
const TRUSTED_EXTERNAL_DOMAINS = ["checkout.dodopayments.com"];

/**
 * Validates and sanitizes redirect URLs to prevent open redirect attacks.
 * Only allows relative paths, same-origin URLs, or explicitly trusted external domains.
 */
export function getSafeRedirectUrl(url: string | null, fallback: string = "/drops"): string {
  if (!url) return fallback;

  // Remove any whitespace
  const trimmed = url.trim();

  // Block empty strings
  if (!trimmed) return fallback;

  // Allow relative paths starting with /
  if (trimmed.startsWith("/")) {
    // Block protocol-relative URLs (//evil.com)
    if (trimmed.startsWith("//")) return fallback;

    // Block backslash tricks (\/evil.com or /\evil.com)
    if (trimmed.includes("\\")) return fallback;

    // Block URLs with @ sign that could be interpreted as credentials
    if (trimmed.includes("@")) return fallback;

    return trimmed;
  }

  // For absolute URLs, validate they're on our domain or trusted external domains
  try {
    const parsed = new URL(trimmed);

    // Check trusted external domains (for checkout flows)
    if (TRUSTED_EXTERNAL_DOMAINS.includes(parsed.hostname)) {
      return trimmed; // Return the full URL for trusted external domains
    }

    const allowedHosts = [
      "theantijobboard.com",
      "www.theantijobboard.com",
      "localhost",
    ];

    // Check if hostname matches allowed hosts
    if (allowedHosts.some(host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))) {
      return parsed.pathname + parsed.search + parsed.hash;
    }
  } catch {
    // Invalid URL, fall through to fallback
  }

  return fallback;
}

/**
 * Check if a URL is an allowed external redirect (for server-side use)
 */
export function isAllowedExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return TRUSTED_EXTERNAL_DOMAINS.includes(parsed.hostname);
  } catch {
    return false;
  }
}
