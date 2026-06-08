// Admin dashboard — basic stats from /api/admin/stats.
// Auth: none (open route, per user request — "라우트만 만들고 인증은 추후").
// NOTE for production: protect this route with Supabase Auth or a middleware
// gate before going live.

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Row = {
  id: string;
  created_at: string;
  pet_kind: "dog" | "cat";
  pet_name: string;
  owner_code: string;
  pet_code: string;
  match_score: number;
  match_title: string;
  region?: string | null;
};

type Stats = {
  ok: boolean;
  enabled: boolean;
  total: number;
  rows: Row[];
};

export default function AdminPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "ko";
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        const json = (await res.json()) as Stats;
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    if (!data?.rows?.length) return null;
    const rows = data.rows;
    const ownerCount: Record<string, number> = {};
    const petCount: Record<string, number> = {};
    const titleCount: Record<string, number> = {};
    const kindCount: Record<string, number> = { dog: 0, cat: 0 };
    let scoreSum = 0;
    for (const r of rows) {
      ownerCount[r.owner_code] = (ownerCount[r.owner_code] || 0) + 1;
      petCount[r.pet_code] = (petCount[r.pet_code] || 0) + 1;
      titleCount[r.match_title] = (titleCount[r.match_title] || 0) + 1;
      kindCount[r.pet_kind] = (kindCount[r.pet_kind] || 0) + 1;
      scoreSum += r.match_score;
    }
    return {
      total: rows.length,
      avgScore: Math.round(scoreSum / rows.length),
      ownerTop: top(ownerCount),
      petTop: top(petCount),
      titleTop: top(titleCount),
      kindCount,
    };
  }, [data]);

  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-cocoa text-cream">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span>🐾</span>
            <span>PawType-16 Admin</span>
          </div>
          <Link href={`/${locale}`} className="text-sm hover:underline">
            ← back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        {loading && <p className="text-charcoal/70">Loading…</p>}

        {!loading && data && !data.enabled && (
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
            <h2 className="font-bold text-lg">
              ⚠️ Supabase가 아직 설정되지 않았어요
            </h2>
            <p className="mt-2 text-charcoal/80 text-sm leading-relaxed">
              <code>.env.local</code> 에 <code>NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              과 <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 를 설정하고,{" "}
              <code>supabase/schema.sql</code> 을 Supabase SQL 에디터에서
              실행한 뒤 다시 방문하세요.
            </p>
            <p className="mt-3 text-charcoal/70 text-sm">
              그 전까지는 아래에 데모 카드만 보입니다.
            </p>
          </div>
        )}

        {!loading && data?.enabled && data.total === 0 && (
          <div className="rounded-2xl border border-beige bg-white p-8 text-center">
            <div className="text-5xl">🐾</div>
            <p className="mt-3 text-charcoal/80">
              아직 저장된 결과가 없습니다. 검사 한 번 돌려보면 여기에 통계가
              쌓여요!
            </p>
          </div>
        )}

        {stats && (
          <>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <KPI title="총 검사" value={stats.total.toLocaleString()} />
              <KPI title="평균 케미 점수" value={`${stats.avgScore} 점`} />
              <KPI
                title="강아지 / 고양이"
                value={`${stats.kindCount.dog} / ${stats.kindCount.cat}`}
              />
              <KPI
                title="가장 흔한 케미"
                value={stats.titleTop[0]?.key ?? "-"}
              />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Panel title="🧑 보호자 타입 TOP">
                <BarList items={stats.ownerTop} accent="#8B6F47" />
              </Panel>
              <Panel title="🐾 반려동물 타입 TOP">
                <BarList items={stats.petTop} accent="#FF8C42" />
              </Panel>
              <Panel title="💞 케미 콤비 TOP">
                <BarList items={stats.titleTop} accent="#1f9d72" />
              </Panel>
            </div>

            <Panel title="최근 검사 20건" className="mt-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-start text-charcoal/60">
                    <tr>
                      <th className="py-2 pr-3">시각</th>
                      <th className="py-2 pr-3">종</th>
                      <th className="py-2 pr-3">이름</th>
                      <th className="py-2 pr-3">보호자</th>
                      <th className="py-2 pr-3">반려동물</th>
                      <th className="py-2 pr-3">점수</th>
                      <th className="py-2 pr-3">콤비</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data!.rows.slice(0, 20).map((r) => (
                      <tr key={r.id} className="border-t border-beige/80">
                        <td className="py-2 pr-3 text-charcoal/70 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-3">{r.pet_kind === "cat" ? "🐱" : "🐶"}</td>
                        <td className="py-2 pr-3">{r.pet_name}</td>
                        <td className="py-2 pr-3 font-mono text-cocoa">
                          {r.owner_code}
                        </td>
                        <td className="py-2 pr-3 font-mono text-accent">
                          {r.pet_code}
                        </td>
                        <td className="py-2 pr-3 font-semibold">{r.match_score}</td>
                        <td className="py-2 pr-3 text-charcoal/80">
                          {r.match_title}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </>
        )}
      </div>
    </main>
  );
}

function top(map: Record<string, number>) {
  return Object.entries(map)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-beige p-5">
      <div className="text-xs text-charcoal/60">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-charcoal">{value}</div>
    </div>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl bg-white border border-beige p-6 ${className}`}
    >
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BarList({
  items,
  accent,
}: {
  items: { key: string; value: number }[];
  accent: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.key}>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono">{it.key}</span>
            <span className="text-charcoal/60">{it.value}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-beige overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${(it.value / max) * 100}%`,
                background: accent,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
