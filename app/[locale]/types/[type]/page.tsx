// app/[locale]/types/[type]/page.tsx
// 16가지 유형 상세 페이지 (최소 안전 버전)

import Link from "next/link";
import { notFound } from "next/navigation";
import { TYPES, TYPE_UI_LABELS, getTypeBySlug } from "../../../lib/petTypes";

type LocaleParam = "ko" | "en" | "de" | "es" | "zh" | "ja" | "ar";
const VALID_LOCALES: LocaleParam[] = ["ko", "en", "de", "es", "zh", "ja", "ar"];

function normalizeLocale(input: string): LocaleParam {
  return (VALID_LOCALES as string[]).includes(input)
    ? (input as LocaleParam)
    : "ko";
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const resolved = await params;
  const locale = normalizeLocale(resolved.locale);
  const type = getTypeBySlug(resolved.type);
  const t = TYPE_UI_LABELS[locale];

  if (!type) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <Link
        href={"/" + locale + "/types"}
        className="inline-block text-sm text-neutral-500 hover:text-orange-600 mb-4"
      >
        {t.backToList}
      </Link>

      <header className="text-center mb-10">
        <div className="text-6xl mb-3">{type.emoji}</div>
        <div className="text-xs font-mono text-neutral-400 mb-2">
          {type.code}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-3">
          {type.nickname[locale]}
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {type.tagline[locale]}
        </p>
      </header>

      <section className="bg-neutral-50 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-3">
          {t.description}
        </h2>
        <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
          {type.description[locale]}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-3">
          ✨ {t.strengths}
        </h2>
        <ul className="space-y-2">
          {type.strengths[locale].map((s, i) => (
            <li
              key={i}
              className="flex gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg text-neutral-700"
            >
              <span className="text-orange-500 font-bold shrink-0">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-3">
          ⚠️ {t.cautions}
        </h2>
        <ul className="space-y-2">
          {type.cautions[locale].map((c, i) => (
            <li
              key={i}
              className="flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-neutral-700"
            >
              <span className="text-blue-500 font-bold shrink-0">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-neutral-800 mb-3">
          🎯 {t.activities}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {type.activities[locale].map((a, i) => (
            <div
              key={i}
              className="p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-neutral-700"
            >
              {a}
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
          {t.discoverYours}
        </h2>
        <p className="text-neutral-600 mb-5">{t.discoverDesc}</p>
        <Link
          href={"/" + locale + "/quiz"}
          className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          {t.takeTest}
        </Link>
      </section>
    </main>
  );
}
