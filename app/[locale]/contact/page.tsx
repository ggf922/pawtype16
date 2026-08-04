import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "문의하기 | Contact Us - PawType-16";
  const description =
    "PawType-16 팀에 문의사항, 제안사항, 협업 문의를 보내주세요. 반려동물 성격 테스트 사이트 운영팀이 신속하게 답변드립니다.";

  return {
    title,
    description,
    keywords: [
      "PawType-16 문의",
      "반려동물 성격 테스트 문의",
      "PawType-16 연락처",
      "PawType-16 협업",
      "pet personality test contact",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.pawtype16.com/${locale}/contact`,
      siteName: "PawType-16",
    },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/contact`,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "PawType-16 문의하기",
    description: "PawType-16 팀에 문의사항을 보내는 방법",
    url: `https://www.pawtype16.com/${locale}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "PawType-16",
      alternateName: "펫타입-16",
      url: "https://www.pawtype16.com",
      email: "contact@pawtype16.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "contact@pawtype16.com",
          availableLanguage: ["Korean", "English", "Japanese"],
        },
        {
          "@type": "ContactPoint",
          contactType: "business partnership",
          email: "partnership@pawtype16.com",
          availableLanguage: ["Korean", "English"],
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-5 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-orange-600">
            홈
          </Link>
          {" / "}
          <span className="text-neutral-800">문의하기</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-6xl mb-4">📮</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">문의하기</h1>
          <p className="text-xl text-neutral-600">
            PawType-16 팀에 문의사항, 제안사항, 협업 문의를 보내주세요.
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💌 <strong>안녕하세요, PawType-16 운영팀입니다.</strong>
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            반려동물 성격 테스트 서비스 PawType-16을 이용해 주셔서 감사합니다.
            더 나은 서비스를 위해 여러분의 소중한 의견을 기다립니다.
            아래 이메일 주소로 언제든 편하게 문의해 주세요.
          </p>
        </section>

        {/* 문의 유형별 이메일 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">📧</span> 문의 유형별 연락처
          </h2>

          <div className="space-y-4">
            <div className="p-6 bg-white rounded-xl border-2 border-neutral-100 hover:border-orange-200 transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">일반 문의 · 서비스 이용 문의</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    사이트 이용 중 궁금한 점, 버그 리포트, 개선 제안
                  </p>
                  <a
                    href="mailto:contact@pawtype16.com"
                    className="inline-flex items-center gap-2 text-orange-600 font-mono font-semibold hover:underline"
                  >
                    📩 contact@pawtype16.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-neutral-100 hover:border-orange-200 transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🤝</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">비즈니스 · 협업 문의</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    광고, 마케팅 협업, 브랜드 파트너십, 미디어 문의
                  </p>
                  <a
                    href="mailto:partnership@pawtype16.com"
                    className="inline-flex items-center gap-2 text-orange-600 font-mono font-semibold hover:underline"
                  >
                    📩 partnership@pawtype16.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-neutral-100 hover:border-orange-200 transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔒</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">개인정보 · 법적 문의</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    개인정보 관련 요청, 저작권 문의, 법적 이슈
                  </p>
                  <a
                    href="mailto:privacy@pawtype16.com"
                    className="inline-flex items-center gap-2 text-orange-600 font-mono font-semibold hover:underline"
                  >
                    📩 privacy@pawtype16.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-neutral-100 hover:border-orange-200 transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📝</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">콘텐츠 · 미디어 문의</h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    블로그 콘텐츠 관련, 인터뷰 요청, 언론 취재
                  </p>
                  <a
                    href="mailto:media@pawtype16.com"
                    className="inline-flex items-center gap-2 text-orange-600 font-mono font-semibold hover:underline"
                  >
                    📩 media@pawtype16.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 운영 정보 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">🏢</span> 운영 정보
          </h2>

          <div className="p-6 bg-neutral-50 rounded-xl">
            <div className="grid gap-3">
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">🏷️ 서비스명</span>
                <span>PawType-16 (펫타입-16)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">🌐 웹사이트</span>
                <a href="https://www.pawtype16.com" className="text-orange-600 hover:underline">
                  https://www.pawtype16.com
                </a>
              </div>
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">🏛️ 운영</span>
                <span>큰바구니 (Modoomodoo)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">🌏 지원 언어</span>
                <span>한국어, English, 日本語, 中文, Español, Deutsch, العربية</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">⏰ 응답 시간</span>
                <span>영업일 기준 24~48시간 이내</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold min-w-[100px]">📅 운영 시작</span>
                <span>2026년 7월</span>
              </div>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">❓</span> 문의 전 확인해 주세요
          </h2>

          <div className="space-y-3">
            <details className="p-5 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">
                Q. PawType-16 테스트는 무료인가요?
              </summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, PawType-16의 반려동물 성격 테스트는 <strong>100% 무료</strong>입니다.
                회원가입 없이 누구나 3분 만에 이용 가능합니다.
              </p>
            </details>

            <details className="p-5 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">
                Q. 결과가 정확한 과학적 근거가 있나요?
              </summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, PawType-16은 Big Five 행동과학 이론과 헬싱키 대학·옥스퍼드 대학의
                반려동물 성격 연구를 기반으로 개발되었습니다.
                자세한 내용은 <Link href={`/${locale}/about`} className="text-orange-600 hover:underline">About 페이지</Link>를 참고해 주세요.
              </p>
            </details>

            <details className="p-5 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">
                Q. 테스트 결과를 SNS에 공유할 수 있나요?
              </summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 결과 페이지에서 카카오톡·인스타그램·페이스북·트위터 등으로
                자유롭게 공유하실 수 있습니다.
              </p>
            </details>

            <details className="p-5 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">
                Q. 광고 문의는 어디로 하나요?
              </summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                광고·마케팅 협업 문의는{" "}
                <a href="mailto:partnership@pawtype16.com" className="text-orange-600 hover:underline">
                  partnership@pawtype16.com
                </a>
                으로 보내주세요. 매체 소개서와 트래픽 통계를 함께 제공드립니다.
              </p>
            </details>

            <details className="p-5 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">
                Q. 내 개인정보는 안전한가요?
              </summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, PawType-16은 최소한의 정보만 수집하며 GDPR·개인정보보호법을 준수합니다.
                자세한 내용은{" "}
                <Link href={`/${locale}/privacy`} className="text-orange-600 hover:underline">
                  개인정보 처리방침
                </Link>
                을 확인해 주세요.
              </p>
            </details>
          </div>
        </section>

        {/* 응답 정책 */}
        <section className="mb-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold mb-3">📌 응답 정책</h3>
          <ul className="text-sm text-neutral-700 space-y-2">
            <li>✓ 평일 영업일 기준 <strong>24~48시간 이내</strong> 답변드립니다.</li>
            <li>✓ 주말·공휴일 문의는 <strong>다음 영업일</strong>에 순차적으로 답변됩니다.</li>
            <li>✓ 문의 내용에 따라 답변이 지연될 수 있으니 양해 부탁드립니다.</li>
            <li>✓ 스팸으로 판단되는 메일은 답변 없이 삭제될 수 있습니다.</li>
            <li>✓ 문의 시 정확한 내용과 필요한 정보를 함께 보내주시면 빠른 답변에 도움이 됩니다.</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mb-10 p-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">
            아직 반려동물 성격 테스트를 안 해보셨나요?
          </h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 반려동물과의 케미를 확인해 보세요!
          </p>
          <Link
            href={`/${locale}/quiz`}
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-105 transition"
          >
            무료 테스트 시작하기 →
          </Link>
        </section>

        {/* Related Links */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">📚 관련 페이지</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href={`/${locale}/about`}
              className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">ℹ️</div>
              <div className="font-bold">About Us</div>
              <div className="text-sm text-neutral-500">PawType-16 소개 및 팀</div>
            </Link>
            <Link
              href={`/${locale}/faq`}
              className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">❓</div>
              <div className="font-bold">FAQ</div>
              <div className="text-sm text-neutral-500">자주 묻는 질문</div>
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">🔒</div>
              <div className="font-bold">개인정보 처리방침</div>
              <div className="text-sm text-neutral-500">Privacy Policy</div>
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition"
            >
              <div className="text-2xl mb-1">📋</div>
              <div className="font-bold">이용약관</div>
              <div className="text-sm text-neutral-500">Terms of Service</div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
