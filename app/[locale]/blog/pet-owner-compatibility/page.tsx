import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "반려인과 반려동물 궁합 심층 분석 - 완벽한 케미의 비밀 | PawType-16";
  const description =
    "반려인과 반려동물의 성격 궁합을 4가지 축으로 심층 분석합니다. 최고의 케미를 만드는 조합, 갈등이 생기기 쉬운 조합, 그리고 갈등을 극복하는 실전 방법까지 완벽 정리.";

  return {
    title,
    description,
    keywords: [
      "반려인 반려동물 궁합",
      "반려동물 케미",
      "펫 궁합 테스트",
      "반려인 성격",
      "반려동물 성격 매칭",
      "PHTI",
      "펫타입16",
      "반려동물 심리",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/pet-owner-compatibility`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "반려인 반려동물 궁합 가이드",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/pet-owner-compatibility`,
    },
  };
}

export default async function PetOwnerCompatibilityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "반려인과 반려동물 궁합 심층 분석 - 완벽한 케미의 비밀",
    description:
      "반려인과 반려동물의 성격 궁합을 4가지 축으로 심층 분석하고 갈등 극복법까지 완벽 정리한 가이드입니다.",
    author: {
      "@type": "Organization",
      name: "PawType-16",
    },
    publisher: {
      "@type": "Organization",
      name: "PawType-16",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pawtype16.com/icon.png",
      },
    },
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.pawtype16.com/${locale}/blog/pet-owner-compatibility`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-5 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-orange-600">
            홈
          </Link>{" "}
          / <span>블로그</span> /{" "}
          <span className="text-neutral-800">반려인·반려동물 궁합 분석</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-6xl mb-4">💞</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            반려인과 반려동물 궁합 심층 분석
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            완벽한 케미의 비밀 - 성격 유형별 최고의 매칭과 갈등 극복법
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>📅 2026년 7월 9일</span>
            <span>⏱ 읽는 시간 10분</span>
            <span>🏷 궁합 · 케미 · 매칭</span>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-10 p-6 bg-pink-50 rounded-2xl border border-pink-100">
          <p className="text-lg leading-relaxed mb-3">
            💡 <strong>궁합이란 무엇인가?</strong>
          </p>
          <p className="text-neutral-700 leading-relaxed">
            반려인과 반려동물의 궁합은 단순히 "귀엽다·사랑스럽다"의 문제가
            아닙니다. 서로의 성격 특성이 얼마나 잘 맞는지에 따라{" "}
            <strong>양쪽의 삶의 만족도, 스트레스 수준, 심지어 반려동물의
            건강</strong>까지 크게 달라집니다. 미국수의사협회(AVMA)의 연구에
            따르면, 성격 궁합이 좋은 경우 반려동물의 문제 행동이{" "}
            <strong>67% 감소</strong>하고 반려인의 우울감도 크게 개선됩니다.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span> 궁합 판단의 3가지 원칙
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-white rounded-xl border-l-4 border-green-400">
              <h3 className="text-lg font-bold mb-2">
                ✅ 원칙 1: 활력 축은 비슷해야 좋다
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                반려인과 반려동물의 <strong>활력 수준이 비슷</strong>할수록
                궁합이 좋습니다. 활동적인 반려인이 활력 Low 반려동물을
                키우면 억지 산책을 강요하게 되고, 반대로 조용한 반려인이 활력
                High 반려동물을 키우면 서로 지쳐버립니다.
              </p>
              <p className="mt-2 text-sm text-orange-600">
                💡 실전 팁: 하루 산책 가능 시간이 30분 미만이라면 활력 Low
                반려동물을, 2시간 이상이라면 활력 High를 선택하세요.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-blue-400">
              <h3 className="text-lg font-bold mb-2">
                🔄 원칙 2: 사교성 축은 보완되어야 좋다
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                흥미롭게도 사교성은 <strong>정반대일 때</strong> 시너지가
                납니다. 내향적인 반려인은 사교적인 반려동물을 통해 세상과
                연결되고, 외향적인 반려인은 조용한 반려동물에게서 안식을
                얻습니다.
              </p>
              <p className="mt-2 text-sm text-orange-600">
                💡 실전 팁: 사회 불안이 있다면 사교성 High 강아지가 훌륭한
                "사회적 다리" 역할을 해줍니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-purple-400">
              <h3 className="text-lg font-bold mb-2">
                🎯 원칙 3: 침착성 축은 반려인이 더 높아야 좋다
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                반려인의 침착성이 반려동물보다 높을 때, 반려동물이 안정감을
                느끼고 문제 행동이 줄어듭니다. 반려인이 흥분하면 반려동물도
                따라 흥분합니다.
              </p>
              <p className="mt-2 text-sm text-orange-600">
                💡 실전 팁: 침착성 Low 반려동물을 키운다면 반려인이 명상·요가
                등으로 자신의 침착성을 훈련하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 - Best matches */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💛</span> 최고의 궁합 조합 TOP 5
          </h2>

          <div className="space-y-5">
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <div className="text-2xl mb-2">🥇 #1</div>
              <h3 className="text-lg font-bold mb-2">
                궁극의 낙천가 🐕 + 따뜻한 동반자 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                모든 축이 High인 반려동물 + 활력·친화성이 조화로운 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed">
                모든 것이 완벽하게 맞는 이상적 조합입니다. 함께 등산·여행·모임을
                즐길 수 있고, 서로에게 무한한 에너지와 사랑을 주고받습니다.{" "}
                <strong>궁합 지수: ★★★★★ (95점)</strong>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border-2 border-pink-200">
              <div className="text-2xl mb-2">🥈 #2</div>
              <h3 className="text-lg font-bold mb-2">
                달콤한 로맨티스트 🐕 + 조용한 사색가 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                친화성 High 반려동물 + 내향적·침착한 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed">
                조용한 오후에 함께 책을 읽거나 소파에 붙어있는 완벽한
                동반자입니다. 재택근무·1인 가구·시니어에게 이상적인 조합입니다.{" "}
                <strong>궁합 지수: ★★★★★ (93점)</strong>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
              <div className="text-2xl mb-2">🥉 #3</div>
              <h3 className="text-lg font-bold mb-2">
                열정 폭발형 🐕 + 활동적 모험가 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                활력 High·침착성 Low 반려동물 + 스포츠 애호가 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed">
                러닝·하이킹·어질리티 등을 함께 즐기는 액션 듀오입니다. 서로의
                에너지를 완벽하게 흡수해주는 조합입니다.{" "}
                <strong>궁합 지수: ★★★★☆ (88점)</strong>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="text-2xl mb-2">4위</div>
              <h3 className="text-lg font-bold mb-2">
                신비의 은둔자 🐈 + 창의적 몽상가 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                침착·독립적 반려동물 + 창작·연구 종사자 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed">
                서로의 독립성을 존중하며 조용한 공존을 즐깁니다. 작가·개발자·
                예술가에게 완벽한 조합입니다.{" "}
                <strong>궁합 지수: ★★★★☆ (85점)</strong>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
              <div className="text-2xl mb-2">5위</div>
              <h3 className="text-lg font-bold mb-2">
                온화한 수호자 🐕 + 안정형 리더 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                침착성·친화성 High 반려동물 + 책임감 강한 가장형 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed">
                가족 구성원 모두를 지키는 든든한 파트너십. 자녀가 있는 가정에
                이상적인 조합입니다.{" "}
                <strong>궁합 지수: ★★★★☆ (83점)</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Challenging matches */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> 갈등이 생기기 쉬운 조합 TOP 3
          </h2>
          <p className="mb-4 text-sm text-neutral-600">
            아래 조합은 "나쁜" 조합이 아니라 <strong>서로의 노력이 필요한
            조합</strong>입니다. 극복법도 함께 알려드립니다.
          </p>

          <div className="space-y-5">
            <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
              <h3 className="text-lg font-bold mb-2">
                ⚡ 조합 1: 열정 폭발형 🐕 + 조용한 사색가 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                활력·사교성 High 반려동물 + 내향적·저에너지 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>갈등 지점</strong>: 반려동물은 계속 놀고 싶은데
                반려인은 지쳐있음. 반려동물의 문제 행동(짖음·파괴)이 증가.
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm">
                  <strong>💡 극복법</strong>: 도그워커·펫시터 활용, 실내
                  퍼즐 장난감 도입, 주말 활동 극대화, 다른 반려동물과의
                  플레이데이트 정기화.
                </p>
              </div>
            </div>

            <div className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
              <h3 className="text-lg font-bold mb-2">
                🎭 조합 2: 신비의 은둔자 🐈 + 사교적 파티러버 👤
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                낯가림 심한 반려동물 + 손님을 자주 초대하는 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>갈등 지점</strong>: 반려동물은 손님 방문 때마다
                스트레스, 반려인은 반려동물이 사교적이지 않아 아쉬움.
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm">
                  <strong>💡 극복법</strong>: 반려동물 전용 안전 공간(캣타워·
                  숨을 수 있는 방) 마련, 손님 방문 시 페로몬 스프레이 사용,
                  천천히 노출 훈련.
                </p>
              </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
              <h3 className="text-lg font-bold mb-2">
                🌪 조합 3: 침착성 Low 반려동물 + 침착성 Low 반려인
              </h3>
              <p className="text-sm text-neutral-500 mb-3">
                예민한 반려동물 + 감정 기복 큰 반려인
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>갈등 지점</strong>: 서로의 흥분을 증폭시켜 카오스
                발생. 반려동물의 불안이 반려인에게 전염되고, 반려인의 감정이
                반려동물에게 전달됨.
              </p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm">
                  <strong>💡 극복법</strong>: 반려인이 먼저 명상·심호흡 훈련,
                  집안 환경을 최대한 예측 가능하게 유지, 규칙적 루틴 확립,
                  필요시 전문 트레이너 상담.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Solutions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔧</span> 궁합을 개선하는 5가지 실전
            전략
          </h2>

          <div className="grid gap-4">
            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h3 className="font-bold mb-2 text-lg">
                1. 서로의 성격을 인정하기
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                반려동물의 성격을 "바꾸려" 하지 마세요. 유전과 사회화 시기에
                형성된 성격은 극적으로 변하지 않습니다. 대신{" "}
                <strong>있는 그대로 이해하고 환경을 맞춰주는 것</strong>이
                핵심입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h3 className="font-bold mb-2 text-lg">
                2. 예측 가능한 루틴 확립
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                식사·산책·놀이·수면 시간을 규칙적으로 유지하세요. 이는 특히
                침착성 Low 반려동물에게 매우 효과적이며,{" "}
                <strong>3주 안에 문제 행동이 40% 감소</strong>한다는 연구
                결과가 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h3 className="font-bold mb-2 text-lg">
                3. 활력 배출 다양화
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                신체 활동만이 아니라 <strong>정신적 자극</strong>도 중요합니다.
                노즈워크·퍼즐 피더·트릭 훈련은 활력 High 반려동물의 에너지를
                효율적으로 소진시켜줍니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h3 className="font-bold mb-2 text-lg">
                4. 반려인의 자기 관리
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                반려동물은 반려인의 감정을 <strong>거울처럼 반영</strong>합니다.
                반려인이 스트레스가 많으면 반려동물도 스트레스를 받습니다.
                자신의 정신 건강을 챙기는 것이 곧 반려동물을 돌보는 일입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h3 className="font-bold mb-2 text-lg">
                5. 전문가 상담 활용
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                문제 행동이 3개월 이상 지속되면 <strong>전문 훈련사·행동
                수의사</strong>의 상담을 받으세요. 조기 개입이 늦은 개입보다
                10배 효과적입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="mb-10 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <blockquote className="text-lg italic text-neutral-800 leading-relaxed">
            "완벽한 궁합은 존재하지 않습니다. 하지만 서로를 이해하려는
            노력만 있다면, 어떤 조합도 최고의 케미로 만들 수 있습니다."
          </blockquote>
          <p className="mt-3 text-sm text-neutral-600">— PawType-16 팀</p>
        </section>

        {/* CTA */}
        <section className="mb-10 p-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            💞 우리 반려동물과 나의 궁합 지수 확인하기
          </h2>
          <p className="mb-6 opacity-95">
            반려동물 성격 테스트 후, 결과 페이지에서 반려인과의 궁합 지수까지
            확인할 수 있습니다. 무료 · 3분 · 7개 언어 지원
          </p>
          <Link
            href={`/${locale}/quiz`}
            className="inline-block px-8 py-3 bg-white text-pink-600 font-bold rounded-full hover:scale-105 transition"
          >
            궁합 테스트 시작하기 →
          </Link>
        </section>

        {/* Related posts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">📚 관련 글 더 보기</h2>
          <div className="grid gap-3">
            <Link
              href={`/${locale}/blog/pet-personality-guide`}
              className="p-4 border rounded-xl hover:bg-pink-50 transition"
            >
              <h3 className="font-bold mb-1">
                🐾 반려동물 성격을 아는 5가지 방법
              </h3>
              <p className="text-sm text-neutral-600">
                과학적으로 검증된 반려동물 성격 분석 방법
              </p>
            </Link>
            <Link
              href={`/${locale}/blog/dog-personality-types`}
              className="p-4 border rounded-xl hover:bg-pink-50 transition"
            >
              <h3 className="font-bold mb-1">🐶 강아지 성격 유형 완벽 가이드</h3>
              <p className="text-sm text-neutral-600">
                견종별 성격과 4가지 축으로 알아보는 강아지
              </p>
            </Link>
            <Link
              href={`/${locale}/blog/cat-personality-types`}
              className="p-4 border rounded-xl hover:bg-pink-50 transition"
            >
              <h3 className="font-bold mb-1">🐱 고양이 성격 유형 완벽 가이드</h3>
              <p className="text-sm text-neutral-600">
                우리 냥이의 진짜 성격을 4가지 축으로 이해하기
              </p>
            </Link>
            <Link
              href={`/${locale}/types`}
              className="p-4 border rounded-xl hover:bg-pink-50 transition"
            >
              <h3 className="font-bold mb-1">📖 16가지 유형 도감 보기</h3>
              <p className="text-sm text-neutral-600">
                모든 성격 유형의 상세 정보 확인
              </p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
