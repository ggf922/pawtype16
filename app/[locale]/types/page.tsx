// app/[locale]/types/page.tsx
// 16가지 유형 도감 목록 페이지 (최소 안전 버전)

import Link from "next/link";
import { TYPES, TYPE_UI_LABELS } from "../../lib/petTypes";

type LocaleParam = "ko" | "en" | "de" | "es" | "zh" | "ja" | "ar";
const VALID_LOCALES: LocaleParam[] = ["ko", "en", "de", "es", "zh", "ja", "ar"];

function normalizeLocale(input: string): LocaleParam {
  return (VALID_LOCALES as string[]).includes(input)
    ? (input as LocaleParam)
    : "ko";
}

export default async function TypesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale = normalizeLocale(resolved.locale);
  const t = TYPE_UI_LABELS[locale];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-3">
          🐾 {t.browsAll}
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          {t.discoverDesc}
        </p>
        <Link
          href={"/" + locale + "/quiz"}
          className="inline-block mt-5 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          {t.takeTest}
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TYPES.map((type) => (
          <Link
            key={type.slug}
            href={"/" + locale + "/types/" + type.slug}
            className="group bg-white border border-neutral-200 rounded-2xl p-5 hover:border-orange-400 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-2">{type.emoji}</div>
            <div className="text-xs font-mono text-neutral-400 mb-1">
              {type.code}
            </div>
            <h2 className="text-lg font-bold text-neutral-800 mb-2 group-hover:text-orange-600 transition">
              {type.nickname[locale]}
            </h2>
            <p className="text-sm text-neutral-600 line-clamp-3">
              {type.tagline[locale]}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
