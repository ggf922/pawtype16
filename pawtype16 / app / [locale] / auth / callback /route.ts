import { NextResponse } from "next/server";

/**
 * Locale-aware OAuth callback redirect.
 *
 * When OAuth provider redirects to /[locale]/auth/callback?code=...
 * (e.g., /ko/auth/callback?code=...), this route forwards the request
 * to the actual handler at /auth/callback while preserving the locale
 * in the `next` query parameter.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const newUrl = new URL("/auth/callback", url.origin);

  // Forward all query parameters (code, error, error_description, etc.)
  url.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  // Extract locale from path: /ko/auth/callback -> "ko"
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] || "ko";

  // Ensure `next` includes locale prefix so user returns to localized page
  const existingNext = url.searchParams.get("next");
  if (existingNext) {
    // Decode in case it's URL-encoded
    const decoded = decodeURIComponent(existingNext);
    if (!decoded.startsWith(`/${locale}`)) {
      newUrl.searchParams.set("next", `/${locale}${decoded.startsWith("/") ? decoded : "/" + decoded}`);
    }
  } else {
    newUrl.searchParams.set("next", `/${locale}/me`);
  }

  return NextResponse.redirect(newUrl);
}
