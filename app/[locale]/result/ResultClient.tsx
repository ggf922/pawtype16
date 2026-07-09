"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { matchScore, toCode, typeNameOf } from "../../lib/quiz";
import { decodeShare } from "../../lib/share-code";
import { Locale, isLocale, t } from "../../lib/i18n";
import { getBrowserSupabase } from "../../lib/supabase-browser";
import RadarChart from "./RadarChart";
import AdFitBanner from "../../components/AdFitBanner";

function ResultInner() {
  const params = useParams<{ locale: string }>();
  const locale: Locale = isLocale(params?.locale) ? (params.locale as Locale) : "ko";
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("d");

  const parsed = useMemo(() => (raw ? decodeShare(raw) : null), [raw]);

  // 로그인 상태 감지 (마이페이지 저장 유도 배너용)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const sb = getBrowserSupabase();
    if (!sb) {
      setIsLoggedIn(false);
      return;
    }
    sb.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  if (!parsed) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl">🐾</div>
          <h1 className="mt-4 text-xl font-bold">
            {t(locale, "not_found_title")}
          </h1>
          <p className="mt-2 text-charcoal/70">{t(locale, "not_found_desc")}</p>
          <Link
            href={`/${locale}/quiz`}
            className="mt-6 inline-flex items-center rounded-full bg-accent text-white px-6 py-3 font-semibold"
          >
            {t(locale, "not_found_cta")}
          </Link>
        </div>
      </main>
    );
  }

  const { petKind, petName, owner: ownerScore, pet: petScore } = parsed;
  const ownerCode = toCode(ownerScore);
  const petCode = toCode(petScore);
  const match = matchScore(ownerScore, petScore);
  const petEmoji = petKind === "cat" ? "🐱" : "🐶";

  function copyLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert(t(locale, "share_link_copied")))
      .catch(() => {});
  }

  async function nativeShare() {
    if (typeof navigator === "undefined" || !(navigator as any).share) {
      copyLink();
      return;
    }
    try {
      await (navigator as any).share({
        title: "PawType-16",
        text:
          t(locale, "result_headline", { name: petName }) +
          " " +
          match.score +
          "!",
        url: window.location.href,
      });
    } catch {}
  }

  // 카카오톡 공유 (모바일에서 앱 열림, PC에서는 링크 복사)
  function shareKakao() {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const text = `🐾 PawType-16: ${petName}와 나의 궁합 점수 ${match.score}점!`;

    // 카카오톡 앱 URL 스킴 (모바일)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `kakaotalk://msg?text=${encodeURIComponent(text + "\n" + url)}`;
      // 앱이 없으면 링크 복사로 폴백
      setTimeout(() => copyLink(), 1500);
    } else {
      // PC에서는 링크 복사 안내
      copyLink();
    }
  }

  // X (Twitter) 공유
  function shareTwitter() {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `🐾 PawType-16: ${petName}와 나의 궁합 점수 ${match.score}점! 우리는 '${match.title}' 케미 ${match.emoji}\n\n#PawType16 #반려동물성격 #펫궁합`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    );
  }

  // 페이스북 공유
  function shareFacebook() {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    );
  }

  function restart() {
    try {
      localStorage.removeItem("pawtype16_progress");
    } catch {}
    router.push(`/${locale}/quiz`);
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/85 border-b border-beige">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 h-14 flex items-center justify-between gap-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa whitespace-nowrap"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 text-sm">
            <button onClick={copyLink} className="text-charcoal/70 hover:text-cocoa whitespace-nowrap">
              {t(locale, "result_share_copy")}
            </button>
            <button onClick={restart} className="text-charcoal/70 hover:text-cocoa">
              ↺
            </button>
          </div>
        </div>
      </header>

      {/* Hero result - 개선: 그라데이션 배경 + 강조 효과 */}
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 animate-fade-in-up">
          <p className="text-cocoa font-medium">{t(locale, "result_kicker")}</p>
          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold text-charcoal leading-tight break-keep">
            {t(locale, "result_headline", { name: petName })}
          </h1>

          {/* 점수 강조 - 그라데이션 배경 + 큰 폰트 */}
          <div className="mt-6 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-orange-200/30 to-yellow-100/20 blur-2xl rounded-full" />
            <div className="relative flex items-end gap-2">
              <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent via-orange-500 to-red-500 leading-none drop-shadow-sm">
                {match.score}
              </span>
              <span className="text-2xl font-bold text-charcoal mb-2">
                {t(locale, "result_score_suffix")}
              </span>
            </div>
          </div>

          {/* 매치 타이틀 - 카드 형태로 강조 */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cocoa to-accent px-5 py-2.5 text-white font-semibold shadow-lg shadow-accent/20">
            <span className="text-lg">{match.emoji}</span>
            <span>'{match.title}'</span>
          </div>
        </div>

        <div className="order-1 md:order-2 animate-fade-in-scale">
          <div className="relative mx-auto w-full max-w-md aspect-square rounded-[36px] bg-gradient-to-br from-beige via-cream to-orange-50 border border-beige overflow-hidden shadow-lg flex items-center justify-center">
            <div className="text-[110px] md:text-[140px] flex items-center">
              <span className="-rotate-6 inline-block hover:rotate-0 transition-transform duration-500">🧑</span>
              <span className="mx-1 text-pink-400 text-5xl md:text-6xl animate-gentle-pulse">
                💛
              </span>
              <span className="rotate-6 inline-block hover:rotate-0 transition-transform duration-500">{petEmoji}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 로그인 유도 배너 - 비로그인 상태에서만 표시 */}
      {isLoggedIn === false && (
        <section className="mx-auto max-w-6xl px-5 mt-2 mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-accent/10 via-orange-50 to-yellow-50/50 border-2 border-accent/20 p-5 md:p-6 flex items-center gap-4 animate-fade-in-up">
            <div className="text-4xl md:text-5xl flex-shrink-0">💾</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-charcoal text-sm md:text-base">
                로그인하면 결과가 영구적으로 저장돼요
              </h3>
              <p className="text-xs md:text-sm text-charcoal/70 mt-1 leading-relaxed">
                내 반려동물의 케미 히스토리를 마이페이지에서 언제든 다시 볼 수 있어요.
              </p>
            </div>
            <Link
              href={`/${locale}`}
              className="hidden sm:inline-flex flex-shrink-0 rounded-full bg-accent text-white text-sm font-semibold px-5 py-2.5 hover:bg-accent/90 whitespace-nowrap cta-lift"
            >
              로그인하기 →
            </Link>
            <Link
              href={`/${locale}`}
              aria-label="로그인"
              className="sm:hidden flex-shrink-0 rounded-full bg-accent text-white p-2.5"
            >
              →
            </Link>
          </div>
        </section>
      )}

      {/* Type cards */}
      <section className="mx-auto max-w-6xl px-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-beige p-6 shadow-sm card-lift">
          <div className="text-sm text-charcoal/60">
            {t(locale, "result_owner_label")}
          </div>
          <div className="mt-1 text-3xl font-extrabold text-cocoa">{ownerCode}</div>
          <div className="mt-1 font-semibold text-charcoal">
            {typeNameOf(ownerCode, "owner")}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-beige p-6 shadow-sm card-lift">
          <div className="text-sm text-charcoal/60">
            {petEmoji} {t(locale, "result_pet_label", { name: petName })}
          </div>
          <div className="mt-1 text-3xl font-extrabold text-accent">{petCode}</div>
          <div className="mt-1 font-semibold text-charcoal">
            {typeNameOf(petCode, "pet")}
          </div>
        </div>
      </section>

      {/* Radar + Insights */}
      <section className="mx-auto max-w-6xl px-5 mt-10 grid gap-4 md:grid-cols-2 items-start">
        <div className="rounded-2xl bg-white border border-beige p-6 shadow-sm">
          <h3 className="font-bold text-lg">{t(locale, "result_chart_title")}</h3>
          <p className="text-sm text-charcoal/60 mt-1">
            {t(locale, "result_chart_subtitle")}
          </p>
          <div className="mt-6">
            <RadarChart
              owner={ownerScore}
              pet={petScore}
              petName={petName}
              locale={locale}
            />
          </div>
        </div>

        <div className="space-y-4">
          <InsightCard
            tone="strength"
            title={t(locale, "result_strengths")}
            emoji="💚"
            items={match.strengths}
          />
          <InsightCard
            tone="caution"
            title={t(locale, "result_cautions")}
            emoji="⚠️"
            items={match.cautions}
          />
          <InsightCard
            tone="activity"
            title={t(locale, "result_activities")}
            emoji="🎯"
            items={match.activities}
          />
        </div>
      </section>

      {/* Share - SNS별 전용 버튼으로 개선 */}
      <section className="mx-auto max-w-6xl px-5 mt-12">
        <div className="rounded-3xl bg-gradient-to-br from-beige/80 via-cream to-orange-50/50 border-2 border-beige/60 p-6 md:p-10 text-center shadow-sm">
          <div className="text-4xl mb-3">📣</div>
          <h3 className="text-xl md:text-2xl font-bold text-charcoal">
            {t(locale, "result_share_title")}
          </h3>
          <p className="text-sm text-charcoal/60 mt-2">
            우리 궁합 점수를 친구들에게도 보여주세요
          </p>

          {/* SNS별 버튼 그리드 */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {/* 카카오톡 */}
            <button
              onClick={shareKakao}
              aria-label="카카오톡 공유"
              className="flex flex-col items-center gap-2 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-charcoal p-4 font-semibold text-sm cta-lift"
            >
              <span className="text-2xl">💬</span>
              <span>카카오톡</span>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={shareTwitter}
              aria-label="X (트위터) 공유"
              className="flex flex-col items-center gap-2 rounded-2xl bg-black hover:bg-charcoal text-white p-4 font-semibold text-sm cta-lift"
            >
              <span className="text-2xl">𝕏</span>
              <span>X (Twitter)</span>
            </button>

            {/* 페이스북 */}
            <button
              onClick={shareFacebook}
              aria-label="페이스북 공유"
              className="flex flex-col items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-4 font-semibold text-sm cta-lift"
            >
              <span className="text-2xl">f</span>
              <span>Facebook</span>
            </button>

            {/* 링크 복사 */}
            <button
              onClick={copyLink}
              aria-label="링크 복사"
              className="flex flex-col items-center gap-2 rounded-2xl bg-white border-2 border-beige hover:border-cocoa/40 text-charcoal p-4 font-semibold text-sm cta-lift"
            >
              <span className="text-2xl">🔗</span>
              <span>링크 복사</span>
            </button>
          </div>

          {/* 네이티브 공유 (모바일 전용) */}
          <button
            onClick={nativeShare}
            className="mt-4 text-sm text-cocoa/70 hover:text-cocoa underline-slide inline-block"
          >
            📱 {t(locale, "share_native")}
          </button>
        </div>
      </section>

      {/* PawMarket Recommendation */}
      <section className="mx-auto max-w-6xl px-5 mt-10">
        <a
          href="https://modoomodoo.com/mcategory.php?category=575"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl bg-gradient-to-br from-accent/10 via-beige/40 to-cream border border-beige p-6 md:p-8 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-5 md:gap-7">
            <div className="text-5xl md:text-6xl select-none flex-shrink-0" aria-hidden>
              🛒🐾
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-accent mb-1">
                🛒 PawMarket
              </div>
              <h3 className="text-lg md:text-xl font-bold text-charcoal">
                {t(locale, "shop_result_title")}
              </h3>
              <p className="mt-1 text-sm text-charcoal/70">
                {t(locale, "shop_result_desc")}
              </p>
            </div>
            <div className="hidden md:flex flex-shrink-0 items-center justify-center rounded-full bg-accent text-white text-sm font-semibold px-5 py-3 group-hover:bg-accent/90 transition">
              {t(locale, "shop_cta")}
            </div>
          </div>
          <div className="mt-4 md:hidden text-center text-sm font-semibold text-accent">
            {t(locale, "shop_cta")}
          </div>
        </a>
      </section>

      {/* Upsell */}
      <section className="mx-auto max-w-6xl px-5 mt-10 grid gap-4 md:grid-cols-3">
        <UpsellCard
          emoji="💎"
          title={t(locale, "result_premium_title")}
          desc={t(locale, "result_premium_desc")}
          cta={t(locale, "result_premium_cta")}
          primary
          locale={locale}
        />
        <UpsellCard
          emoji="🐾"
          title={t(locale, "result_friends_title", { name: petName })}
          desc={t(locale, "result_friends_desc")}
          cta={t(locale, "result_friends_cta")}
          locale={locale}
        />
        <UpsellCard
          emoji="🛒"
          title={t(locale, "result_commerce_title")}
          desc={t(locale, "result_commerce_desc")}
          cta={t(locale, "result_commerce_cta")}
          locale={locale}
        />
      </section>

      {/* AdFit 광고 영역 - 반응형 (모바일 320x100 / PC 728x90) */}
      <section className="mx-auto max-w-6xl px-5 py-6 flex justify-center">
        // 결과 페이지에 추가할 "내 유형 상세 보기" 링크 섹션
        // 파일 위치: app/[locale]/result/ResultClient.tsx 안에 삽입
        // 삽입 위치: 결과 표시 후, AdFit 광고 위쪽

     {/* 내 유형 상세 보기 링크 */}
     <section className="mx-auto max-w-3xl px-5 py-6">
     <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center border border-orange-100">
      <h3 className="text-lg font-bold text-neutral-800 mb-2">
      🔍 내 유형에 대해 더 알고 싶다면?
      </h3>
     <p className="text-sm text-neutral-600 mb-4">
      강점·주의점·추천 활동·궁합까지 자세히 살펴보세요.
     </p>
     <Link
      href={`/${locale}/types`}
      className="inline-block px-6 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition"
     >
      16가지 유형 도감 보기 →
     </Link>
     </div>
     </section>

        <AdFitBanner
          adUnitMobile="DAN-Qi4CHnEvseWwqcwb"
          adUnitPc="DAN-TQjPODDs5dW0k7Xc"
        />
      </section>


      <section className="mx-auto max-w-6xl px-5 mt-10 mb-16 text-center">

        <button
          onClick={restart}
          className="text-charcoal/70 hover:text-cocoa text-sm underline-slide"
        >
          {t(locale, "result_restart")}
        </button>
      </section>

      <footer className="bg-cocoa/95 text-cream/90">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-cream/70">
          © 2026 PawType-16 · {t(locale, "result_footer_note")}
        </div>
      </footer>
    </main>
  );
}

function InsightCard({
  tone,
  title,
  emoji,
  items,
}: {
  tone: "strength" | "caution" | "activity";
  title: string;
  emoji: string;
  items: string[];
}) {
  const toneClass =
    tone === "strength"
      ? "border-emerald-200 bg-emerald-50/40"
      : tone === "caution"
      ? "border-amber-200 bg-amber-50/40"
      : "border-sky-200 bg-sky-50/40";
  return (
    <div className={`rounded-2xl border-2 ${toneClass} p-6 card-lift`}>
      <div className="flex items-center gap-2 font-bold">
        <span>{emoji}</span>
        <span>{title}</span>
      </div>
      <ul className="mt-3 space-y-2 text-charcoal/85 text-sm leading-relaxed">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-cocoa">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UpsellCard({
  emoji,
  title,
  desc,
  cta,
  primary,
  locale,
}: {
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  primary?: boolean;
  locale: Locale;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border-2 transition card-lift ${
        primary
          ? "border-accent bg-orange-50/60"
          : "border-beige bg-white"
      }`}
    >
      <div className="text-3xl">{emoji}</div>
      <div className="mt-3 font-bold">{title}</div>
      <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">{desc}</p>
      <button
        onClick={() => alert(t(locale, "share_soon"))}
        className={`mt-4 w-full rounded-full py-3 text-sm font-semibold transition ${
          primary
            ? "bg-accent text-white hover:bg-accent/90"
            : "bg-cocoa/10 text-cocoa hover:bg-cocoa/20"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-3xl animate-paw-walk">🐾</div>
        </main>
      }
    >
      <ResultInner />
    </Suspense>
  );
}
