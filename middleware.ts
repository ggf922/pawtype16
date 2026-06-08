import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ko", "en", "de", "es", "zh", "ja", "ar"];
const DEFAULT_LOCALE = "ko";

function pickLocaleFromAcceptLanguage(header: string | null): string {
  if (!header) return DEFAULT_LOCALE;
  const candidates = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const cand of candidates) {
    const short = cand.split("-")[0];
    if (LOCALES.includes(short)) return short;
  }
  return DEFAULT_LOCALE;
}

function isAdminPath(pathname: string): boolean {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 2 && LOCALES.includes(parts[0]) && parts[1] === "admin")
    return true;
  return false;
}

function unauthorized(): NextResponse {
  return new NextResponse(
    "🐾 PawType-16 Admin — authentication required",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="PawType-16 Admin", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}

function decodeBasic(header: string | null): { user: string; pass: string } | null {
  if (!header || !header.toLowerCase().startsWith("basic ")) return null;
  const b64 = header.slice(6).trim();
  try {
    const raw = atob(b64);
    const idx = raw.indexOf(":");
    if (idx < 0) return null;
    return { user: raw.slice(0, idx), pass: raw.slice(idx + 1) };
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 1) Admin gate (BEFORE locale handling)
  if (isAdminPath(pathname)) {
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASS;

    // Fail-closed: if env vars missing OR weak defaults, block entirely.
    const isWeakDefault =
      !user || !pass || pass === "changeme" || pass === "admin" || pass.length < 8;
    if (isWeakDefault) {
      return new NextResponse(
        "🔒 Admin disabled. Set ADMIN_USER and a strong ADMIN_PASS (≥8 chars) in env vars.",
        {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
      );
    }
    const creds = decodeBasic(req.headers.get("authorization"));
    if (!creds || creds.user !== user || creds.pass !== pass) {
      return unauthorized();
    }
    // fall through to locale handling
  }

  // 2) Locale routing
  const firstSeg = pathname.split("/")[1];
  if (LOCALES.includes(firstSeg)) return NextResponse.next();

  const locale = pickLocaleFromAcceptLanguage(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};
