import { NextRequest, NextResponse } from "next/server";
import {
  Answers,
  OWNER_QUESTIONS,
  PET_QUESTIONS,
  computeScores,
  matchScore,
  toCode,
} from "../../lib/quiz";
import { saveResult } from "../../lib/supabase";
import { getServerSupabase } from "../../lib/supabase-server";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024;
const HITS: Map<string, { count: number; reset: number }> = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_MIN = 30;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = HITS.get(ip);
  if (!cur || now > cur.reset) {
    HITS.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  cur.count += 1;
  return cur.count <= MAX_PER_MIN;
}

function validateAnswers(a: unknown): Answers | null {
  if (!a || typeof a !== "object") return null;
  const out: Answers = {};
  const obj = a as Record<string, unknown>;
  let count = 0;
  for (const k of Object.keys(obj)) {
    if (count++ > 40) return null;
    if (k.length > 8) return null;
    const v = obj[k];
    if (typeof v !== "number" || !Number.isFinite(v)) return null;
    if (v < -2 || v > 2) return null;
    out[k] = v;
  }
  return out;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let bodyText: string;
  try {
    bodyText = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_body" }, { status: 400 });
  }
  if (bodyText.length > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 }
    );
  }

  let body: any;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const petKind: "dog" | "cat" = body.petKind === "cat" ? "cat" : "dog";
  const petNameRaw = typeof body.petName === "string" ? body.petName : "";
  const petName = petNameRaw.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 24);
  if (!petName) {
    return NextResponse.json(
      { ok: false, error: "no_pet_name" },
      { status: 400 }
    );
  }
  const answers = validateAnswers(body.answers);
  if (!answers) {
    return NextResponse.json(
      { ok: false, error: "bad_answers" },
      { status: 400 }
    );
  }

  const ownerScore = computeScores(answers, OWNER_QUESTIONS);
  const petScore = computeScores(answers, PET_QUESTIONS);
  const match = matchScore(ownerScore, petScore);

  let userId: string | null = null;
  try {
    const sb = getServerSupabase();
    if (sb) {
      const { data } = await sb.auth.getUser();
      userId = data.user?.id ?? null;
    }
  } catch {}

  const id = await saveResult({
    user_id: userId,
    pet_kind: petKind,
    pet_name: petName,
    owner_code: toCode(ownerScore),
    pet_code: toCode(petScore),
    match_score: match.score,
    match_title: match.title,
    owner_e: ownerScore.E,
    owner_s: ownerScore.S,
    owner_a: ownerScore.A,
    owner_c: ownerScore.C,
    pet_e: petScore.E,
    pet_s: petScore.S,
    pet_a: petScore.A,
    pet_c: petScore.C,
  });

  return NextResponse.json({ ok: true, id, saved: !!id, signedIn: !!userId });
}
