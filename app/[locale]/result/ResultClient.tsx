"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { matchScore, toCode, typeNameOf } from "../../lib/quiz";
import { decodeShare } from "../../lib/share-code";
import { Locale, isLocale, t } from "../../lib/i18n";
import RadarChart from "./RadarChart";

function ResultInner() {
  const params = useParams<{ locale: string }>();
  const locale: Locale = isLocale(params?.locale) ? (params.locale as Locale) : "ko";
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("d");

  const parsed = useMemo(() => (raw ? decodeShare(raw) : null), [raw]);

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
            <button onClick={copyLink} className="text-charcoal/70 hover:text-cocoa">
              {t(locale, "result_share_copy")}
            </button>
            <button onClick={restart} className="text-charcoal/70 hover:text-cocoa">
              ↺
            </button>
          </div>
        </div>
      </header>

      {/* Hero result */}
      <section className="mx-auto max-w-6xl px-5 pt-8 md:pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <p className="text-cocoa font-medium">{t(locale, "result_kicker")}</p>
          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold text-charcoal leading-tight">
            {t(locale, "result_headline", { name: petName })}
          </h1>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-6xl md:text-7xl font-extrabold text-accent leading-none">
              {match.score}
            </span>
            <span className="text-2xl font-bold text-charcoal mb-1">
              {t(locale, "result_score_suffix")}
            </span>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-beige px-4 py-2 text-cocoa font-semibold">
            <span>{match.emoji}</span>
            <span>'{match.title}'</span>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-full max-w-md aspect-square rounded-[36px] bg-gradient-to-br from-beige via-cream to-orange-50 border border-beige overflow-hidden shadow-sm flex items-center justify-center">
            <div className="text-[110px] md:text-[140px] flex items-center">
              <span className="-rotate-6">🧑</span>
              <span className="mx-1 text-pink-400 text-5xl md:text-6xl animate-pulse">
                💛
              </span>
              <span className="rotate-6">{petEmoji}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Type cards */}
      <section className="mx-auto max-w-6xl px-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white border border-beige p-6 shadow-sm">
          <div className="text-sm text-charcoal/60">
            {t(locale, "result_owner_label")}
          </div>
          <div className="mt-1 text-3xl font-extrabold text-cocoa">{ownerCode}</div>
          <div className="mt-1 font-semibold text-charcoal">
            {typeNameOf(ownerCode, "owner")}
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-beige p-6 shadow-sm">
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

      {/* Share */}
      <section className="mx-auto max-w-6xl px-5 mt-12">
        <div className="rounded-2xl bg-beige/60 border border-beige p-6 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-bold">
            {t(locale, "result_share_title")}
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={nativeShare}
              className="rounded-full bg-accent text-white px-5 py-3 text-sm font-semibold hover:bg-accent/90 transition"
            >
              🔗 {t(locale, "share_native")}
            </button>
            <button
              onClick={copyLink}
              className="rounded-full bg-cocoa text-white px-5 py-3 text-sm font-semibold hover:bg-cocoa/90 transition"
            >
              {t(locale, "result_share_copy")}
            </button>
          </div>
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

      <section className="mx-auto max-w-6xl px-5 mt-10 mb-16 text-center">
        <button
          onClick={restart}
          className="text-charcoal/70 hover:text-cocoa text-sm"
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
    <div className={`rounded-2xl border-2 ${toneClass} p-6`}>
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

function ShareBtn({ label, locale }: { label: string; locale: Locale }) {
  return (
    <button
      onClick={() => alert(t(locale, "share_soon"))}
      className="rounded-full bg-white border border-beige px-5 py-3 text-sm font-semibold hover:bg-beige/40 transition"
    >
      {label}
    </button>
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
      className={`rounded-2xl p-6 border-2 transition ${
        primary
          ? "border-accent bg-orange-50/60"
          : "border-beige bg-white hover:-translate-y-0.5"
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
