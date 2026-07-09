// app/[locale]/types/page.tsx
// 16가지 유형 도감 목록 페이지

import Link from "next/link";
import type { Metadata } from "next";
import { TYPES, TYPE_UI_LABELS, isLocale, DEFAULT_LOCALE, type Locale } from "../../lib/petTypes";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = TYPE_UI_LABELS[locale];

  const titles: Record<Locale, string> = {
    ko: "16가지 케미 유형 도감 | PawType-16",
    en: "16 Chemistry Types Catalog | PawType-16",
    de: "16 Chemie-Typen Katalog | PawType-16",
    es: "Catálogo de 16 Tipos | PawType-16",
    zh: "16种化学类型图鉴 | PawType-16",
    ja: "16種類のケミストリー図鑑 | PawType-16",
    ar: "كتالوج 16 نوعاً | PawType-16",
  };

  const descriptions: Record<Locale, string> = {
    ko: "Big Five 행동과학 기반 반려동물-보호자 16가지 케미 유형을 모두 확인하세요. 각 유형별 강점·주의점·추천 활동까지.",
    en: "Explore all 16 pet-owner chemistry types based on Big Five behavioral science. Strengths, cautions, and activities for each type.",
    de: "Entdecken Sie alle 16 Haustier-Besitzer-Chemie-Typen basierend auf Big Five.",
    es: "Explora los 16 tipos de química mascota-dueño basados en Big Five.",
    zh: "探索基于大五人格科学的16种宠物-主人化学类型。",
    ja: "Big Five行動科学に基づく16種類のペット-飼い主ケミストリータイプをすべて確認。",
    ar: "استكشف جميع أنواع الكيمياء الـ 16 بين الحيوان الأليف والمالك.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `/${locale}/types`,
      languages: Object.fromEntries(
        (Object.keys(TYPE_UI_LABELS) as Locale[]).map((l) => [l, `/${l}/types`])
      ),
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `/${locale}/types`,
      type: "website",
    },
  };
}

export default async function TypesListPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = TYPE_UI_LABELS[locale];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-3">
          🐾 {t.browsAll}
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          {t.discoverDesc}
        </p>
        <Link
          href={`/${locale}/quiz`}
          className="inline-block mt-5 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          {t.takeTest}
        </Link>
      </section>

      {/* 16 Types Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TYPES.map((type) => (
          <Link
            key={type.slug}
            href={`/${locale}/types/${type.slug}`}
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

// 정적 페이지로 처리 (성능·SEO 최적화)
export const dynamic = "force-static";
export const revalidate = 86400; // 24시간마다 재생성
