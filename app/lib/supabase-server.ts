// Server-side Supabase client bound to the current request's cookies.
// Compatible with @supabase/ssr ^0.5 (getAll/setAll signature).

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function getServerSupabase() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map((c) => ({ name: c.name, value: c.value }));
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options });
          });
        } catch {
          // Called from a Server Component — Next disallows mutation, ignore.
        }
      },
    },
  });
}

export async function getCurrentUser() {
  const sb = getServerSupabase();
  if (!sb) return null;
  const { data, error } = await sb.auth.getUser();
  if (error) return null;
  return data.user;
}
