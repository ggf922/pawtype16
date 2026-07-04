import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Locale, isLocale, t } from "../lib/i18n";
import LocaleSwitcher from "../components/LocaleSwitcher";
import AuthButton from "../components/AuthButton";
import AdFitBanner from "../components/AdFitBanner";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-beige">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 h-14 flex items-center justify-between gap-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa whitespace-nowrap"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
            <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher current={locale} />
            <AuthButton locale={locale} />
            <a
              href="https://modoomodoo.com/mcategory.php?category=575"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center rounded-full bg-beige text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/80 transition"
              aria-label="PawMarket"
            >
              {t(locale, "shop_nav")}
            </a>
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
            <span className="inline-flex items-center gap-1 rounded-full bg-beige text-cocoa text-xs font-medium px-3 py-1 whitespace-nowrap">
              {t(locale, "hero_badge")}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.3] md:leading-[1.2] text-charcoal break-keep">

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

      {/* AdFit 광고 영역 - 히어로와 Why 섹션 사이 */}
      <section className="mx-auto max-w-6xl px-5 py-6 flex justify-center">
        <AdFitBanner
          adUnitMobile="DAN-BsercUGiOOF1n3f9"
          adUnitPc="DAN-OAKFCKdcL2PcJs9x"
        />
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

      {/* PawMarket Shop Section */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <div className="rounded-3xl bg-gradient-to-br from-beige/60 via-cream to-beige/40 border border-beige p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-white/70 rounded-full px-3 py-1.5 mb-4">
                  <span>🛒</span>
                  <span>PawMarket</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal leading-tight">
                  {t(locale, "shop_title")}
                </h2>
                <p className="mt-3 text-charcoal/70 leading-relaxed text-sm md:text-base">
                  {t(locale, "shop_desc")}
                </p>
                <a
                  href="https://modoomodoo.com/mcategory.php?category=575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-accent text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-accent/20 hover:bg-accent/90 transition"
                >
                  {t(locale, "shop_cta")}
                </a>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="text-7xl md:text-8xl drop-shadow-sm select-none" aria-hidden>
                  🛍️🐾
                </div>
              </div>
            </div>
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
        <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-4 text-sm">
          {/* Brand */}
          <div>
            <div className="font-bold text-lg">🐾 PawType-16</div>
            <p className="mt-2 text-cream/70 leading-relaxed">
              {t(locale, "brand_tag")}
            </p>
          </div>

          {/* Service */}
          <div>
            <div className="font-semibold text-cream mb-3">서비스</div>
            <ul className="space-y-2 text-cream/70">
              <li>
                <Link href={`/${locale}/quiz`} className="hover:text-cream transition">
                  검사 시작
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/me`} className="hover:text-cream transition">
                  마이페이지
                </Link>
              </li>
              <li>
                <a
                  href="https://modoomodoo.com/mcategory.php?category=575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition"
                >
                  PawMarket
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-semibold text-cream mb-3">약관</div>
            <ul className="space-y-2 text-cream/70">
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-cream transition">
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="hover:text-cream transition font-medium"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* Business info */}
          <div>
            <div className="font-semibold text-cream mb-3">사업자 정보</div>
            <ul className="space-y-1.5 text-cream/60 text-xs leading-relaxed">
              <li>상호: 큰바구니 (브랜드: 모두모두)</li>
              <li>대표: 임몽규</li>
              <li>사업자등록: 806-58-00641</li>
              <li>통신판매업: 2024-경기시흥-1913호</li>
              <li>소재지: 경기도 시흥시</li>
              <li className="pt-1">
                <a
                  href="mailto:modoomodoo88@gmail.com"
                  className="hover:text-cream transition"
                >
                  ✉ modoomodoo88@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:010-8265-1123" className="hover:text-cream transition">
                  ☎ 010-8265-1123
                </a>
              </li>
            </ul>
          </div>
         </div>

        <div className="border-t border-cream/10 text-center text-xs text-cream/50 py-4 px-5">
          © 2026 PawType-16 · 큰바구니. All rights reserved.
        </div>

      </footer>
    </main>
  );
}
