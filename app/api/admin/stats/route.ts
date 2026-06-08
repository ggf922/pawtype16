import { NextResponse } from "next/server";
import { fetchAllStats, isSupabaseEnabled } from "../../../lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  if (!isSupabaseEnabled()) {
    return NextResponse.json({ ok: true, enabled: false, total: 0, rows: [] });
  }
  const rows = await fetchAllStats();
  return NextResponse.json({
    ok: true,
    enabled: true,
    total: rows.length,
    rows,
  });
}
