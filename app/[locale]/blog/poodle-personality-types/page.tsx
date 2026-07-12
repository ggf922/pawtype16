import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "푸들 성격 유형 완벽 가이드: 토이/미니어처/스탠다드 크기별 성격 차이 | PawType-16";
  const description =
    "한국 인기견종 2위 푸들의 성격을 4가지 축으로 완벽 분석. 토이·미니어처·스탠다드 크기별 성격 차이, 지능 순위 2위인 이유, 훈련법, 궁합까지 완벽 정리했습니다.";

  return {
    title,
    description,
    keywords: [
      "푸들 성격",
      "토이푸들 성격",
      "미니어처푸들 성격",
      "스탠다드푸들 성격",
      "푸들 MBTI",
      "푸들 지능",
      "푸들 훈련",
      "푸들 배변훈련",
      "PawType-16",
      "반려동물 성격 테스트",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/poodle-personality-types`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "푸들 성격 완벽 가이드",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/poodle-personality-types`,
    },
  };
}

export default async function PoodlePersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "푸들 성격 유형 완벽 가이드: 토이/미니어처/스탠다드 크기별 성격 차이",
    description:
      "한국 인기견종 2위 푸들의 성격을 4가지 축으로 완벽 분석. 크기별 차이, 훈련법, 궁합까지.",
    author: { "@type": "Organization", name: "PawType-16" },
    publisher: {
      "@type": "Organization",
      name: "PawType-16",
      logo: { "@type": "ImageObject", url: "https://www.pawtype16.com/icon.png" },
    },
    datePublished: "2026-07-12",
    dateModified: "2026-07-12",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.pawtype16.com/${locale}/blog/poodle-personality-types`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "푸들이 지능이 높다는데 사실인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 스탠리 코렌 박사의 강아지 지능 순위에서 푸들은 보더콜리 다음으로 2위입니다. 새로운 명령어를 5번 이하로 학습하고, 첫 시도에서 95% 이상 성공률을 보입니다. 다만 지능이 높다는 것은 훈련 없이 방치하면 문제 행동으로 이어질 수 있음을 뜻하기도 합니다.",
        },
      },
      {
        "@type": "Question",
        name: "토이푸들과 스탠다드푸들의 성격이 다른가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 크기에 따라 성격 경향이 다릅니다. 토이푸들(2.5-3kg)은 활력이 매우 높고 예민한 편, 미니어처푸들(6-7kg)은 균형 잡힌 성격, 스탠다드푸들(20-30kg)은 안정적이고 침착한 성격이 많습니다. 하지만 개체차가 크므로 PawType-16 테스트로 정확히 확인할 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "푸들 배변훈련은 얼마나 걸리나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "푸들은 지능이 높아 일반적으로 2-4주 내에 배변훈련이 완료됩니다. 다만 성격 유형에 따라 다르며, 카리스마 리더 유형은 자기 주장이 강해 좀 더 시간이 걸릴 수 있습니다. 일관성 있는 훈련이 관건입니다.",
        },
      },
      {
        "@type": "Question",
        name: "푸들의 대표 성격 유형은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "푸들은 주로 3가지 유형에 분포합니다: 카리스마 리더(HHLH·자신감 있는 리더형), 파티 스타(HHLL·활발하고 사교적), 열정 폭발형(HHHL·에너지 넘치는 애정형). 3가지 모두 활력과 사교성이 High라는 공통점이 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "푸들도 짖음이 많나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "푸들은 말티즈보다는 짖음이 적지만, 소형 푸들(토이·미니어처)은 여전히 짖음이 있는 편입니다. 다만 훈련 반응이 좋아 '조용히' 명령어 학습이 빠릅니다. 크기가 클수록(스탠다드) 짖음이 적은 경향입니다.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="mx-auto max-w-3xl px-5 py-10">
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-orange-600">홈</Link>
          {" / "}<span>블로그</span>{" / "}
          <span className="text-neutral-800">푸들 성격 가이드</span>
        </nav>

        <header className="mb-10">
          <div className="text-6xl mb-4">🎩</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            푸들 성격 유형 완벽 가이드
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            토이·미니어처·스탠다드 크기별 성격 차이와 지능 2위 견종의 진짜 성격
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
            <span>📅 2026년 7월 12일</span>
            <span>⏱ 읽는 시간 12분</span>
            <span>🏷 푸들 · 성격분석 · 견종가이드</span>
          </div>
        </header>

        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 푸들 성격을 결정하는 4가지 핵심 축의 특징</li>
            <li>✓ 토이/미니어처/스탠다드 크기별 성격 차이 완벽 비교</li>
            <li>✓ 푸들이 지능 순위 2위인 진짜 이유와 성격 연관성</li>
            <li>✓ 푸들의 3대 대표 성격 유형과 상세 분석</li>
            <li>✓ 크기·유형별 최적화된 훈련법과 반려인 궁합</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧬</span> 푸들 성격의 4가지 축
          </h2>
          <p className="mb-4 leading-relaxed">
            푸들은 한국에서 <strong>10년 연속 인기 견종 상위권</strong>을 유지하는 대표 견종입니다.
            원래 독일에서 오리 사냥꾼 견으로 개발된 이 견종은, 지능·활력·사교성 면에서
            뛰어난 밸런스를 보입니다. 옥스퍼드 대학교 반려견 행동 연구에 따르면,
            푸들은 <strong>Big Five 4가지 축 모두에서 다양한 스펙트럼</strong>을 보이는 견종입니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy) - High 성향이 강함
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                푸들은 <strong>대부분 활력 High</strong>입니다. 원래 사냥견이었던 유전적 특성으로
                운동 욕구가 매우 높습니다. 토이푸들도 예외가 아니라 하루 1시간 이상의 놀이·산책이 필요합니다.
                스탠다드푸들은 하루 2시간 이상의 강도 높은 운동이 필수입니다.
                활력이 Low인 개체는 드물지만, 노령견이나 특정 개체차로 나타나기도 합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability) - 대체로 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                푸들은 <strong>사교성이 좋은 견종</strong>으로 유명합니다. 낯선 사람과 강아지에게
                우호적이며, 카페·산책·강아지 유치원에서 인기가 많습니다.
                단, 소심한 성격의 토이푸들이나 사회화가 부족했던 개체는 사교성 Low로 나타날 수 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection) - 개체차 큼
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                푸들의 친화성은 <strong>개체마다 큰 차이</strong>를 보입니다.
                반려인에게 붙어있길 좋아하는 유형(High)이 있는 반면,
                자기 주도적이고 독립적인 유형(Low)도 흔합니다.
                이는 지능이 높아 자기 판단으로 행동하는 경향 때문입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness) - 크기별 차이 큼
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                푸들의 침착성은 <strong>크기에 따라 명확히 다릅니다</strong>.
                토이푸들(High 짖음, 예민함)은 침착성 Low, 스탠다드푸들은 침착성 High 성향이 강합니다.
                미니어처푸들은 그 중간에 위치합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 크기별 비교표 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📏</span> 크기별 푸들 성격 완벽 비교
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-200 rounded-xl overflow-hidden">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-3 border border-neutral-200 text-left">구분</th>
                  <th className="p-3 border border-neutral-200 text-center">토이푸들</th>
                  <th className="p-3 border border-neutral-200 text-center">미니어처푸들</th>
                  <th className="p-3 border border-neutral-200 text-center">스탠다드푸들</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">체중</td>
                  <td className="p-3 border border-neutral-200 text-center">2.5-3kg</td>
                  <td className="p-3 border border-neutral-200 text-center">6-7kg</td>
                  <td className="p-3 border border-neutral-200 text-center">20-30kg</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 font-bold">활력</td>
                  <td className="p-3 border border-neutral-200 text-center">🔴 매우 높음</td>
                  <td className="p-3 border border-neutral-200 text-center">🟡 높음</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 매우 높음(체력)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">사교성</td>
                  <td className="p-3 border border-neutral-200 text-center">🟡 중간</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 높음</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 매우 높음</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 font-bold">친화성</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 높음</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 높음</td>
                  <td className="p-3 border border-neutral-200 text-center">🟡 중간</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">침착성</td>
                  <td className="p-3 border border-neutral-200 text-center">🔴 낮음(짖음↑)</td>
                  <td className="p-3 border border-neutral-200 text-center">🟡 중간</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 높음</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 font-bold">추천 반려인</td>
                  <td className="p-3 border border-neutral-200 text-center">활동적 1인 가구</td>
                  <td className="p-3 border border-neutral-200 text-center">가족·다견 가정</td>
                  <td className="p-3 border border-neutral-200 text-center">아웃도어형·마당 있는 집</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">일일 운동</td>
                  <td className="p-3 border border-neutral-200 text-center">1시간+</td>
                  <td className="p-3 border border-neutral-200 text-center">1.5시간+</td>
                  <td className="p-3 border border-neutral-200 text-center">2시간+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 지능 관련 섹션 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧠</span> 푸들이 지능 순위 2위인 진짜 이유
          </h2>
          <p className="mb-4 leading-relaxed">
            브리티시 컬럼비아 대학의 스탠리 코렌 박사가 발표한 <strong>강아지 지능 순위</strong>에서
            푸들은 <strong>2위</strong>를 차지했습니다(1위 보더콜리).
            "새로운 명령어를 5번 이하로 학습, 첫 시도에서 95% 이상 성공"하는 능력을 보여줍니다.
          </p>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-bold mb-3">🎯 지능이 높은 것의 양면성</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h4 className="font-bold text-green-700 text-sm mb-1">✅ 장점</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• 배변훈련 2-4주 완료</li>
                  <li>• 복잡한 명령어 학습 가능</li>
                  <li>• 감정 읽기 뛰어남</li>
                  <li>• 문제 해결력 우수</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-700 text-sm mb-1">⚠️ 단점</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• 지루하면 문제 행동</li>
                  <li>• 자기 판단으로 명령 무시</li>
                  <li>• 정신적 자극 부족 시 우울</li>
                  <li>• 훈련 게을리하면 반려인 무시</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 푸들의 3대 대표 성격 유형
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-100">
              <h3 className="text-lg font-bold mb-2">👑 유형 1: 카리스마 리더 (HHLH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 Low · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>스탠다드푸들에게 가장 흔한 유형</strong>입니다. 자신감 넘치고 주도적이며,
                반려인의 명령을 이해하되 자기 판단으로 행동합니다. 훈련 시 "왜 해야 하는지" 알려주면 놀랍게 잘 따르지만,
                일방적인 명령은 무시할 수 있습니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-l-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 카리스마 리더 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100">
              <h3 className="text-lg font-bold mb-2">🎉 유형 2: 파티 스타 (HHLL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 Low · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>미니어처푸들·토이푸들에게 흔한 유형</strong>. 어디서나 주목받는 활발한 성격으로,
                카페·강아지 유치원에서 인기 스타가 됩니다. 다만 흥분을 잘 못하고 짖음이 있어 훈련이 필요합니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-l-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 파티 스타 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2">🔥 유형 3: 열정 폭발형 (HHHL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>가장 사랑스러운 푸들 유형</strong>입니다. 반려인에게 무한 애정을 쏟으면서
                활발하게 움직입니다. 다만 분리불안 위험이 있어 어릴 때부터 혼자 있는 시간 훈련이 필수입니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-h-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 열정 폭발형 유형 자세히 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎓</span> 푸들 성격 유형별 훈련 팁
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">👑 카리스마 리더 유형</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>훈련 이유 설명 - "왜"를 알려주면 협조적</li>
                <li>도전적 과제 제공 - 지루함 방지 핵심</li>
                <li>일관된 리더십 - 흔들리면 즉시 반려인 무시</li>
                <li>어질리티·독쇼 등 목적 있는 활동 추천</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🎉 파티 스타 유형</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>사회화 극대화 - 다양한 사람·강아지 노출</li>
                <li>흥분 조절 훈련 - "앉아·기다려" 필수</li>
                <li>에너지 발산 활동 - 하루 2회 격렬한 놀이</li>
                <li>독불 유치원 강력 추천</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🔥 열정 폭발형 유형</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>분리불안 예방 최우선 - 어릴 때부터 훈련</li>
                <li>과도한 스킨십 자제 - 의존성 증가 방지</li>
                <li>정서 안정 도구 - 담요·인형·차분한 음악</li>
                <li>독립성 훈련 - 스스로 노는 시간 확보</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> 푸들에게 딱 맞는 반려인
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold mb-2 text-green-700">✅ 최고 궁합</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>매일 산책·운동 가능한 사람</li>
                <li>훈련·학습에 관심 있는 반려인</li>
                <li>미용 관리 부담 없는 사람(월 1회 미용 필수)</li>
                <li>지능형 놀이 좋아하는 가정</li>
                <li>알러지 있는 사람(푸들은 저알러지 견종)</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2 text-red-700">⚠️ 주의 필요</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>시간 없는 바쁜 직장인</li>
                <li>훈련·학습에 무관심한 반려인</li>
                <li>미용 관리 못하는 사람</li>
                <li>조용한 것만 원하는 사람</li>
                <li>초보자(지능 관리 어려움)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">❓</span> 푸들 성격 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 푸들이 지능이 높다는데 사실인가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 스탠리 코렌 박사의 강아지 지능 순위에서 <strong>보더콜리 다음 2위</strong>입니다.
                다만 지능이 높은 만큼 훈련 없이 방치하면 문제 행동으로 이어질 수 있습니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 토이푸들과 스탠다드푸들 성격이 다른가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 크기에 따라 성격 경향이 다릅니다. 토이푸들은 활력·예민함이 높은 편이고,
                스탠다드푸들은 안정적이고 침착한 성격이 많습니다. 위 비교표를 참고하세요.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 푸들 배변훈련은 얼마나 걸리나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                지능이 높아 <strong>2-4주 내 완료</strong>됩니다. 다만 카리스마 리더 유형은
                자기 주장이 강해 좀 더 시간이 걸릴 수 있습니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 푸들도 짖음이 많나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                말티즈보다는 적지만, 소형 푸들은 여전히 짖음이 있습니다.
                다만 훈련 반응이 좋아 조절이 가능합니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 푸들 미용은 얼마나 자주 해야 하나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                <strong>월 1회 이상 미용 필수</strong>입니다. 푸들의 곱슬 털은 자연 탈락이 없어
                방치하면 엉키고 피부 질환을 일으킵니다. 매일 브러싱도 필요합니다.
              </p>
            </details>
          </div>
        </section>

        <section className="mb-10 p-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">우리 푸들의 성격 유형이 궁금하다면?</h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 푸들만의 성격 유형과 반려인과의 궁합 점수를 확인하세요.
          </p>
          <Link href={`/${locale}/quiz`} className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-105 transition">
            무료 테스트 시작하기 →
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">📚 이런 글도 도움돼요</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href={`/${locale}/blog/maltese-personality-guide`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🤍</div>
              <div className="font-bold">말티즈 성격 완벽 분석</div>
              <div className="text-sm text-neutral-500">한국 인기견종 1위의 3대 유형</div>
            </Link>
            <Link href={`/${locale}/blog/pomeranian-personality-guide`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🍊</div>
              <div className="font-bold">포메라니안 성격 완전 정복</div>
              <div className="text-sm text-neutral-500">활발한 소형견의 MBTI 유형</div>
            </Link>
            <Link href={`/${locale}/blog/golden-retriever-personality`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🌟</div>
              <div className="font-bold">골든리트리버 성격 심층 분석</div>
              <div className="text-sm text-neutral-500">왜 가족견의 대명사일까?</div>
            </Link>
            <Link href={`/${locale}/blog/dog-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🐶</div>
              <div className="font-bold">강아지 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">16가지 유형 전체 소개</div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
