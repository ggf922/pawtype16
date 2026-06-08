// Sign-out endpoint — clears session cookie + redirect.

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

async function handle(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const back = req.nextUrl.searchParams.get("next") || "/ko";
  const response = NextResponse.redirect(new URL(back, req.url));

  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies
          .getAll()
          .map((c) => ({ name: c.name, value: c.value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set({ name, value, ...options })
        );
      },
    },
  });
  await supabase.auth.signOut();
  return response;
}

export const GET = handle;
export const POST = handle;
