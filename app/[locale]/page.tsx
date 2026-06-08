import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Locale, isLocale, t } from "../lib/i18n";
import LocaleSwitcher from "../components/LocaleSwitcher";
import AuthButton from "../components/AuthButton";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-beige">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
          <div className="flex items-center gap-3">
            <LocaleSwitcher current={locale} />
            <AuthButton locale={locale} />
            <Link
              href={`/${locale}/quiz`}
              className="hidden md:inline-flex items-center rounded-full bg-cocoa text-white text-sm px-4 py-2 hover:bg-cocoa/90 transition"
            >
              {t(locale, "hero_cta")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-20 pb-14 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <span className="inline-flex items-center gap-1 rounded-full bg-beige text-cocoa text-xs font-medium px-3 py-1">
              {t(locale, "hero_badge")}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-charcoal">
              {t(locale, "hero_title_1")}
              <br />
              {t(locale, "hero_title_2")} <span className="inline-block">🐾</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-charcoal/75 leading-relaxed">
              {t(locale, "hero_subtitle")}{" "}
              <span className="font-semibold text-cocoa">
                {t(locale, "hero_subtitle_highlight")}
              </span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/quiz`}
                className="inline-flex items-center justify-center rounded-full bg-accent text-white text-base font-semibold px-6 py-4 shadow-lg shadow-accent/20 hover:bg-accent/90 transition"
              >
                {t(locale, "hero_cta")}
              </Link>
              <span className="self-center text-sm text-charcoal/60">
                {t(locale, "hero_cta_note")}
              </span>
            </div>
          </div>

          {/* Hero photoreal image */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto w-full max-w-md aspect-[4/3] md:aspect-square rounded-[36px] overflow-hidden shadow-xl ring-1 ring-beige">
              <Image
                src="/images/hero-dog.jpg"
                alt="A warm moment between a person and their pet"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cocoa/10 via-transparent to-transparent" />
              <span className="absolute bottom-4 right-5 text-3xl drop-shadow">🐾</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-beige/40 border-y border-beige">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-charcoal">
            {t(locale, "why_title")}
          </h2>
          <p className="text-center mt-2 text-charcoal/60 text-sm md:text-base">
            {t(locale, "why_subtitle")}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { emoji: "🧬", k: "why_1" },
              { emoji: "💞", k: "why_2" },
              { emoji: "🎯", k: "why_3" },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-2xl bg-white p-6 shadow-sm border border-beige hover:-translate-y-1 transition"
              >
                <div className="text-3xl">{f.emoji}</div>
                <div className="mt-3 font-semibold text-charcoal">
                  {t(locale, (f.k + "_title") as any)}
                </div>
                <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">
                  {t(locale, (f.k + "_desc") as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How — with photo on right at desktop */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20 grid md:grid-cols-[1fr_minmax(0,420px)] gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              {t(locale, "how_title")}
            </h2>

            <div className="mt-8 grid gap-3">
              {[
                { step: "①", k: "how_1" },
                { step: "②", k: "how_2" },
                { step: "③", k: "how_3" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-beige shadow-sm"
                >
                  <div className="text-2xl font-extrabold text-accent w-9">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {t(locale, (s.k + "_title") as any)}
                    </div>
                    <div className="text-sm text-charcoal/70">
                      {t(locale, (s.k + "_desc") as any)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square rounded-[36px] overflow-hidden shadow-lg ring-1 ring-beige">
            <Image
              src="/images/hero-cat.jpg"
              alt="A cozy moment with a cat"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-beige/40 border-y border-beige">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-charcoal">
            {t(locale, "social_title_count", { count: "38,420" })}
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                quote:
                  locale === "ko"
                    ? '"ENFP 보호자 × 탐험가형 푸들 — 산책이 왜 길어지는지 알겠어요 😂"'
                    : locale === "ja"
                    ? '"ENFPの私 × 探検家タイプのプードル — お散歩が長くなる理由がわかった😂"'
                    : locale === "ar"
                    ? '"أنا منفتح وكلبي مستكشف — الآن أعرف لماذا تطول نزهاتنا 😂"'
                    : '"ENFP me × Explorer-type poodle — now I know why our walks run long 😂"',
                who: "@mungchi_mom",
              },
              {
                quote:
                  locale === "ko"
                    ? '"내 신경증이 우리 고양이 불안에 영향을 준다는 결과가 충격…"'
                    : '"Shocked that my neuroticism influences my cat\'s anxiety…"',
                who: "@catlife_seoul",
              },
              {
                quote:
                  locale === "ko"
                    ? '"추천 활동대로 노즈워크 시작했더니 산만함이 확 줄었어요!"'
                    : '"Started nose-work from the recommendations — calmness improved a lot!"',
                who: "@dduddu.daily",
              },
            ].map((r) => (
              <blockquote
                key={r.who}
                className="rounded-2xl bg-white p-6 border border-beige shadow-sm"
              >
                <p className="text-charcoal/90 leading-relaxed">{r.quote}</p>
                <footer className="mt-4 text-sm text-cocoa font-medium">
                  {r.who}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-charcoal">
            {t(locale, "final_title")}
          </h2>
          <p className="mt-3 text-charcoal/70">{t(locale, "final_desc")}</p>
          <Link
            href={`/${locale}/quiz`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-white text-base font-semibold px-8 py-4 shadow-lg shadow-accent/20 hover:bg-accent/90 transition"
          >
            {t(locale, "final_cta")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cocoa/95 text-cream/90">
        <div className="mx-auto max-w-6xl px-5 py-10 grid gap-6 md:grid-cols-4 text-sm">
          <div>
            <div className="font-bold text-lg">🐾 PawType-16</div>
            <p className="mt-2 text-cream/70 leading-relaxed">
              {t(locale, "brand_tag")}
            </p>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="border-t border-cream/10 text-center text-xs text-cream/50 py-4">
          © 2026 PawType-16
        </div>
      </footer>
    </main>
  );
}
