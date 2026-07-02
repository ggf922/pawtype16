import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="ko">
      <body className="font-sans bg-cream min-h-screen">
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md animate-fade-in">
            {/* Big paw emoji */}
            <div className="text-7xl md:text-8xl mb-2">🐾</div>

            {/* 404 badge */}
            <div className="inline-flex items-center gap-1 rounded-full bg-beige text-cocoa text-xs font-semibold px-3 py-1 mb-4">
              <span>404</span>
              <span className="text-cocoa/60">Page Not Found</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-charcoal leading-tight">
              이 발자국은 어디로 갔을까요?
            </h1>

            {/* Description */}
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              찾으시는 페이지를 발견하지 못했어요.
              <br />
              주소가 정확한지 다시 한번 확인해 주세요.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ko"
                className="inline-flex items-center justify-center rounded-full bg-accent text-white text-base font-semibold px-6 py-3 shadow-lg shadow-accent/20 hover:bg-accent/90 transition"
              >
                🏠 홈으로 돌아가기
              </Link>
              <Link
                href="/ko/quiz"
                className="inline-flex items-center justify-center rounded-full border border-beige bg-white text-cocoa text-base font-medium px-6 py-3 hover:bg-beige/40 transition"
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
      </body>
    </html>
  );
}
