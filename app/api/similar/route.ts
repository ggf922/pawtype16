import { NextRequest, NextResponse } from "next/server";
import { findSimilar, isSupabaseEnabled } from "../../lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isSupabaseEnabled()) {
    return NextResponse.json({ ok: false, items: [] });
  }
  const code = req.nextUrl.searchParams.get("code") ?? "";
  const kind = (req.nextUrl.searchParams.get("kind") as "dog" | "cat") ?? "dog";
  if (!code) return NextResponse.json({ ok: false, items: [] });

  const items = await findSimilar(code, kind, 12);
  return NextResponse.json({ ok: true, items });
}
