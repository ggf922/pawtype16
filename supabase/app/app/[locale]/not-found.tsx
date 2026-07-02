import Link from "next/link";

/**
 * Locale-aware 404 page.
 *
 * Note: Next.js does not pass params to not-found pages, so we cannot
 * detect the current locale automatically. We infer it from the URL
 * via a client component would be too heavy — instead we provide language
 * buttons that let the user pick their locale.
 *
 * For the common case (Korean users), Korean text is shown by default.
 */
export default function LocaleNotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-in">
        {/* Big paw emoji */}
        <div className="text-7xl md:text-8xl mb-2">🐾</div>

        {/* 404 badge */}
        <div className="inline-flex items-center gap-1 rounded-full bg-beige text-cocoa text-xs font-semibold px-3 py-1 mb-4">
          <span>404</span>
          <span className="text-cocoa/60">Not Found</span>
        </div>

        {/* Multilingual title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-charcoal leading-tight">
          이 발자국은 어디로 갔을까요?
        </h1>
        <p className="mt-2 text-sm text-charcoal/50">
          Where did this paw print go?
        </p>

        {/* Description */}
        <p className="mt-4 text-charcoal/70 leading-relaxed">
          찾으시는 페이지가 없어졌거나 이동된 것 같아요.
          <br />
          다른 언어의 홈페이지로 이동해 주세요.
        </p>

        {/* Language home links */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-md mx-auto">
          <Link
            href="/ko"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇰🇷 한국어
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇬🇧 English
          </Link>
          <Link
            href="/ja"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇯🇵 日本語
          </Link>
          <Link
            href="/zh"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇨🇳 中文
          </Link>
          <Link
            href="/es"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇪🇸 Español
          </Link>
          <Link
            href="/de"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition"
          >
            🇩🇪 Deutsch
          </Link>
          <Link
            href="/ar"
            className="rounded-full border border-beige bg-white text-cocoa text-sm font-medium px-3 py-2 hover:bg-beige/40 transition col-span-2 sm:col-span-2"
          >
            🇸🇦 العربية
          </Link>
        </div>

        {/* Primary action */}
        <div className="mt-8">
          <Link
            href="/ko/quiz"
            className="inline-flex items-center justify-center rounded-full bg-accent text-white text-base font-semibold px-6 py-3 shadow-lg shadow-accent/20 hover:bg-accent/90 transition"
          >
            🐾 검사 시작하기
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-charcoal/40">
          문제가 계속되면{" "}
          <a
            href="mailto:modoomodoo88@gmail.com"
            className="text-accent hover:underline"
          >
            modoomodoo88@gmail.com
          </a>
          으로 알려주세요
        </p>
      </div>
    </main>
  );
}
