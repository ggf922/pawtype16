// app/[locale]/types/[type]/page.tsx
// 16가지 유형 상세 페이지 (풍부한 버전 - 4축 인디케이터, 궁합, JSON-LD)

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  TYPES,
  TYPE_UI_LABELS,
  getTypeBySlug,
} from "../../../lib/petTypes";

type LocaleParam = "ko" | "en" | "de" | "es" | "zh" | "ja" | "ar";
const VALID_LOCALES: LocaleParam[] = ["ko", "en", "de", "es", "zh", "ja", "ar"];

function normalizeLocale(input: string): LocaleParam {
  return (VALID_LOCALES as string[]).includes(input)
    ? (input as LocaleParam)
    : "ko";
}

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const locale = normalizeLocale(resolved.locale);
  const type = getTypeBySlug(resolved.type);

  if (!type) {
    return { title: "Not Found | PawType-16" };
  }

  const title = `${type.emoji} ${type.nickname[locale]} (${type.code}) | PawType-16`;
  const description = type.tagline[locale];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 4축 인디케이터 컴포넌트
function AxisIndicator({
  label,
  level,
  labelHigh,
  labelLow,
}: {
  label: string;
  level: "H" | "L";
  labelHigh: string;
  labelLow: string;
}) {
  const isHigh = level === "H";
  return (
    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      <span
        className={
          "text-xs font-bold px-3 py-1 rounded-full " +
          (isHigh
            ? "bg-orange-100 text-orange-700"
            : "bg-blue-100 text-blue-700")
        }
      >
        {isHigh ? labelHigh : labelLow}
      </span>
    </div>
  );
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

  // 4축 파싱
  const axes = {
    E: type.code[0] as "H" | "L",
    S: type.code[1] as "H" | "L",
    A: type.code[2] as "H" | "L",
    C: type.code[3] as "H" | "L",
  };

  // JSON-LD 구조화 데이터
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: type.nickname[locale] + " - " + type.code,
    description: type.tagline[locale],
    articleBody: type.description[locale],
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "PawType-16",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="mx-auto max-w-4xl px-5 py-10">
        {/* Back link */}
        <Link
          href={"/" + locale + "/types"}
          className="inline-block text-sm text-neutral-500 hover:text-orange-600 mb-4"
        >
          {t.backToList}
        </Link>

        {/* Header */}
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

        {/* 4축 인디케이터 */}
        <section className="grid grid-cols-2 gap-3 mb-10">
          <AxisIndicator
            label={t.axisE}
            level={axes.E}
            labelHigh={t.axisHigh}
            labelLow={t.axisLow}
          />
          <AxisIndicator
            label={t.axisS}
            level={axes.S}
            labelHigh={t.axisHigh}
            labelLow={t.axisLow}
          />
          <AxisIndicator
            label={t.axisA}
            level={axes.A}
            labelHigh={t.axisHigh}
            labelLow={t.axisLow}
          />
          <AxisIndicator
            label={t.axisC}
            level={axes.C}
            labelHigh={t.axisHigh}
            labelLow={t.axisLow}
          />
        </section>

        {/* 설명 */}
        <section className="bg-neutral-50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-3">
            {t.description}
          </h2>
          <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
            {type.description[locale]}
          </p>
        </section>

        {/* 강점 */}
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

        {/* 주의점 */}
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

        {/* 추천 활동 */}
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

        {/* 궁합 섹션 */}
        {(type.matchBest.length > 0 || type.matchChallenge.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {type.matchBest.length > 0 && (
              <div className="p-5 bg-pink-50 rounded-2xl">
                <h3 className="font-bold text-pink-700 mb-3">
                  💗 {t.matchBest}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {type.matchBest.map((code) => {
                    const matchType = TYPES.find((tp) => tp.code === code);
                    if (!matchType) return null;
                    return (
                      <Link
                        key={code}
                        href={"/" + locale + "/types/" + matchType.slug}
                        className="text-xs px-3 py-1 bg-white rounded-full text-neutral-700 hover:bg-pink-100 transition"
                      >
                        {matchType.emoji} {code}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {type.matchChallenge.length > 0 && (
              <div className="p-5 bg-amber-50 rounded-2xl">
                <h3 className="font-bold text-amber-700 mb-3">
                  ⚡ {t.matchChallenge}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {type.matchChallenge.map((code) => {
                    const matchType = TYPES.find((tp) => tp.code === code);
                    if (!matchType) return null;
                    return (
                      <Link
                        key={code}
                        href={"/" + locale + "/types/" + matchType.slug}
                        className="text-xs px-3 py-1 bg-white rounded-full text-neutral-700 hover:bg-amber-100 transition"
                      >
                        {matchType.emoji} {code}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CTA */}
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
    </>
  );
}
