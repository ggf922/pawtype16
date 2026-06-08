// Supabase client (browser + server) — graceful no-op when env vars are missing.
//
// To enable persistence, set in .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
//
// See README for the SQL schema.

type AnyClient = any;

let cached: AnyClient | null | undefined;

export function getSupabase(): AnyClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }

  try {
    // Lazy require so the package is optional at build time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createClient } = require("@supabase/supabase-js");
    cached = createClient(url, key, {
      auth: { persistSession: false },
    });
    return cached;
  } catch (e) {
    console.warn("[supabase] package not installed — running without persistence");
    cached = null;
    return null;
  }
}

export function isSupabaseEnabled() {
  return !!getSupabase();
}

export type StoredResult = {
  id?: string;
  created_at?: string;
  user_id?: string | null;
  pet_kind: "dog" | "cat";
  pet_name: string;
  owner_code: string;
  pet_code: string;
  match_score: number;
  match_title: string;
  owner_e: number;
  owner_s: number;
  owner_a: number;
  owner_c: number;
  pet_e: number;
  pet_s: number;
  pet_a: number;
  pet_c: number;
  nickname?: string | null;
  region?: string | null;
};

export async function fetchUserResults(userId: string, limit = 50): Promise<StoredResult[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[supabase] fetchUserResults failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function deleteUserResult(userId: string, resultId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb
    .from("results")
    .delete()
    .eq("id", resultId)
    .eq("user_id", userId);
  if (error) {
    console.error("[supabase] deleteUserResult failed:", error.message);
    return false;
  }
  return true;
}

export async function saveResult(row: StoredResult): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("results")
    .insert(row)
    .select("id")
    .single();
  if (error) {
    console.error("[supabase] saveResult failed:", error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function findSimilar(
  ownerCode: string,
  petKind: "dog" | "cat",
  limit = 10
): Promise<StoredResult[]> {
  const sb = getSupabase();
  if (!sb) return [];
  // similar = same owner_code OR same pet_kind, recent first
  const { data, error } = await sb
    .from("results")
    .select("*")
    .eq("pet_kind", petKind)
    .or(`owner_code.eq.${ownerCode},pet_code.eq.${ownerCode}`)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[supabase] findSimilar failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function fetchAllStats(): Promise<StoredResult[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) {
    console.error("[supabase] fetchAllStats failed:", error.message);
    return [];
  }
  return data ?? [];
}
