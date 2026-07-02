import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] || "ko";
  const nextParam = url.searchParams.get("next");

  // 최종 이동할 경로 결정
  let redirectPath = `/${locale}/me`;
  if (nextParam) {
    const decoded = decodeURIComponent(nextParam);
    redirectPath = decoded.startsWith(`/${locale}`)
      ? decoded
      : `/${locale}${decoded.startsWith("/") ? decoded : "/" + decoded}`;
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("OAuth exchange error:", error.message);
      return NextResponse.redirect(new URL(`/${locale}?auth_error=1`, url.origin));
    }
  }

  return NextResponse.redirect(new URL(redirectPath, url.origin));
}
