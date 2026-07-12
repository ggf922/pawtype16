import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "시바견 성격 대해부: 도도한 이유는? 반려인과 궁합 유형 진단 | PawType-16";
  const description =
    "시바견이 도도해 보이는 진짜 이유부터 애교 없다는 오해까지. 4가지 축으로 완벽 분석한 시바견의 3대 성격 유형, 마메시바 vs 일본시바 차이, 반려인 궁합 가이드.";

  return {
    title,
    description,
    keywords: [
      "시바견 성격",
      "시바 이누",
      "시바견 도도한 이유",
      "시바견 애교 없음",
      "시바견 키우기",
      "마메시바 성격",
      "일본 시바견",
      "시바견 훈련",
      "PawType-16",
      "반려동물 성격 테스트",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/shiba-inu-personality`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "시바견 성격 완벽 가이드",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/shiba-inu-personality`,
    },
  };
}

export default async function ShibaPersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "시바견 성격 대해부: 도도한 이유는? 반려인과 궁합 유형 진단",
    description: "시바견이 도도해 보이는 진짜 이유와 3대 성격 유형, 반려인 궁합 완벽 가이드",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/shiba-inu-personality`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "시바견이 왜 이렇게 도도해 보이나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "시바견의 '도도함'은 사교성 Low + 친화성 Low + 침착성 High 조합에서 비롯됩니다. 일본 원산 사냥견의 유전적 특성으로, 낯선 사람에게 무관심하고 자기 페이스를 지킵니다. 이는 성격 결함이 아닌 시바견 고유의 매력이며, 신뢰하는 사람에게는 완전히 다른 모습을 보입니다.",
        },
      },
      {
        "@type": "Question",
        name: "시바견은 정말 애교가 없나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "'애교가 없다'는 오해입니다. 시바견의 애정 표현은 다른 견종과 다를 뿐입니다. 골든리트리버처럼 격렬한 스킨십은 없지만, 반려인 곁에 조용히 앉아 있거나 눈을 마주치는 등 절제된 표현을 합니다. '사탕고양이 견종'이라 불리는 이유입니다.",
        },
      },
      {
        "@type": "Question",
        name: "시바견 키우기가 어려운가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "초보자에게는 어려울 수 있습니다. 독립적이고 자기 주장이 강해 훈련이 까다롭고, 사회화가 부족하면 공격성이 나타날 수 있습니다. 다만 시바견 성격을 이해하고 존중하면 최고의 파트너가 됩니다. PawType-16 테스트로 우리 시바견을 정확히 파악하세요.",
        },
      },
      {
        "@type": "Question",
        name: "일본 시바와 마메시바는 성격이 다른가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "일본 시바(표준)와 마메시바(작은 시바)는 크기 차이 외에 성격은 크게 다르지 않습니다. 다만 마메시바는 소형화 과정에서 개체차가 크며, 일반적으로 표준 시바보다 조금 더 예민한 경향이 있습니다. 성격 유형은 개체에 따라 다양합니다.",
        },
      },
      {
        "@type": "Question",
        name: "시바견의 대표 성격 유형은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "시바견은 주로 3가지 유형에 분포합니다: 독립 사냥꾼(HLLH·목표 지향적 실용주의), 고독한 현자(LLLH·사색적 은둔형), 사교 관찰자(LHLH·조용한 통찰가). 3가지 모두 침착성이 High라는 공통점이 있어 흥분을 잘 조절합니다.",
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
          <span className="text-neutral-800">시바견 성격 가이드</span>
        </nav>

        <header className="mb-10">
          <div className="text-6xl mb-4">🦊</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            시바견 성격 대해부: 도도한 이유는?
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            일본 원산 사냥견의 3대 성격 유형과 반려인과의 궁합 완벽 진단
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
            <span>📅 2026년 7월 12일</span>
            <span>⏱ 읽는 시간 12분</span>
            <span>🏷 시바견 · 성격분석 · 견종가이드</span>
          </div>
        </header>

        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 시바견이 '도도해 보이는' 진짜 유전적·성격적 이유</li>
            <li>✓ "애교 없다"는 오해와 시바견의 진짜 애정 표현법</li>
            <li>✓ 시바견의 3대 대표 성격 유형과 상세 분석</li>
            <li>✓ 일본 시바 vs 마메시바 성격 차이 완벽 비교</li>
            <li>✓ 시바견에게 최고의 반려인 유형과 훈련법</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎌</span> 시바견은 왜 "도도해" 보일까?
          </h2>
          <p className="mb-4 leading-relaxed">
            시바견(柴犬, Shiba Inu)은 일본 6대 견종 중 하나로, <strong>3,000년 이상의 역사</strong>를 지닌
            원시견에 가까운 견종입니다. 산에서 작은 동물을 사냥하기 위해 개발되어,
            <strong>독립성·판단력·인내심</strong>이 유전적으로 강합니다.
          </p>
          <p className="mb-4 leading-relaxed">
            흔히 "도도하다", "고양이 같다"고 불리는 시바견의 성격은 사실 <strong>3가지 유전적 특성</strong>의
            조합입니다:
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                🎯 특성 1: 낯선 사람에 대한 무관심 (사교성 Low)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                시바견은 골든리트리버처럼 낯선 사람을 반기지 않습니다.
                <strong>"내 무리(가족)와 아닌 사람"을 명확히 구분</strong>하며, 낯선 이에게는 무관심하거나 경계합니다.
                이는 원시 사냥견의 본능으로, 침입자를 견제하기 위한 특성입니다.
                산책 중 다른 사람이 만지려 해도 슬쩍 피하는 이유입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🏹 특성 2: 자기 페이스 유지 (친화성 Low)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                시바견은 반려인에게도 <strong>독립적</strong>입니다. 항상 붙어있으려 하지 않고,
                자기만의 공간과 시간을 좋아합니다. 산책도 반려인의 속도가 아닌 자기 관심사를 따라가려 합니다.
                이는 산에서 스스로 판단하며 사냥하던 유전적 특성입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 특성 3: 감정 절제 (침착성 High)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                시바견은 <strong>감정을 격렬하게 표현하지 않습니다</strong>.
                반가워도 꼬리만 살짝, 슬퍼도 조용히 엎드립니다. 이 절제된 감정 표현이 "무심하다"는 인상을 줍니다.
                하지만 신뢰하는 사람에게는 눈빛과 미묘한 몸짓으로 애정을 표현합니다.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm">
              💡 <strong>중요</strong>: '도도함'은 성격 결함이 아닌 <strong>시바견 고유의 매력</strong>입니다.
              이를 이해하지 못하고 다른 견종처럼 대하면 시바견에게 큰 스트레스가 됩니다.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> "애교 없다"는 오해, 시바견 애정 표현 이해하기
          </h2>
          <p className="mb-4 leading-relaxed">
            시바견 초보 반려인이 가장 많이 하는 질문: <em>"우리 시바 저를 좋아하는 걸까요?"</em>
            <br />답은 <strong>YES</strong>. 다만 표현 방식이 다릅니다.
          </p>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-bold mb-3">🔍 시바견의 진짜 애정 신호 6가지</h3>
            <div className="grid gap-3">
              <div className="flex gap-3">
                <span className="text-2xl">👀</span>
                <div>
                  <div className="font-bold">눈 마주치기</div>
                  <div className="text-sm text-neutral-600">
                    시바가 조용히 여러분을 응시하면 최고의 신뢰 표현입니다.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🚶</span>
                <div>
                  <div className="font-bold">거리 두고 따라오기</div>
                  <div className="text-sm text-neutral-600">
                    골든처럼 딱 붙지 않아도 여러분이 가는 곳에 항상 함께합니다.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🛏</span>
                <div>
                  <div className="font-bold">같은 방에서 자기</div>
                  <div className="text-sm text-neutral-600">
                    반려인 침대 옆이나 발치에서 자는 것은 큰 애정 표현입니다.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🐾</span>
                <div>
                  <div className="font-bold">앞발로 톡톡</div>
                  <div className="text-sm text-neutral-600">
                    관심을 요구할 때 앞발로 부드럽게 두드리는 신호를 보냅니다.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🧻</span>
                <div>
                  <div className="font-bold">배 보이기 (희귀!)</div>
                  <div className="text-sm text-neutral-600">
                    시바가 배를 보이면 최고의 신뢰. 다른 견종보다 훨씬 드문 행동입니다.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">😊</span>
                <div>
                  <div className="font-bold">시바 스마일</div>
                  <div className="text-sm text-neutral-600">
                    입꼬리를 올린 특유의 미소. 편안하고 행복할 때만 나타납니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 시바견의 3대 대표 성격 유형
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold mb-2">🏹 유형 1: 독립 사냥꾼 (HLLH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 Low · 친화성 Low · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>가장 전형적인 시바견 유형</strong>입니다. 자기 관심사가 뚜렷하고 목표 지향적이며,
                사냥·탐색·달리기를 즐깁니다. 낯선 사람에게 무관심하고 반려인에게도 독립적이지만,
                흥분을 잘 조절하는 안정적인 성격입니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-l-a-l-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 독립 사냥꾼 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2">📚 유형 2: 고독한 현자 (LLLH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 Low · 친화성 Low · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>내향적이고 사색적인 시바견 유형</strong>. 조용히 창밖을 바라보거나
                혼자만의 시간을 즐깁니다. 격렬한 놀이보다 산책과 관찰을 좋아하며,
                깊이 있는 유대감을 소수와만 나눕니다. 노령 시바에게 흔한 유형입니다.
              </p>
              <Link href={`/${locale}/types/e-l-s-l-a-l-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 고독한 현자 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-100">
              <h3 className="text-lg font-bold mb-2">👀 유형 3: 사교 관찰자 (LHLH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 Low · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>사회화가 잘 된 시바견 유형</strong>. 낯선 사람에게 개방적이지만
                여전히 자기 주도적입니다. 카페 산책에서 조용히 사람 구경을 즐기고,
                다른 강아지와도 무리 없이 어울립니다. 도시 시바에게 이상적인 유형입니다.
              </p>
              <Link href={`/${locale}/types/e-l-s-h-a-l-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 사교 관찰자 유형 자세히 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎌</span> 일본 시바 vs 마메시바 성격 차이
          </h2>
          <p className="mb-4 leading-relaxed">
            한국에서 인기 있는 두 종류의 시바견을 비교해보겠습니다.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-neutral-200 rounded-xl overflow-hidden">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-3 border border-neutral-200 text-left">구분</th>
                  <th className="p-3 border border-neutral-200 text-center">일본 시바 (표준)</th>
                  <th className="p-3 border border-neutral-200 text-center">마메시바</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">체중</td>
                  <td className="p-3 border border-neutral-200 text-center">8-11kg</td>
                  <td className="p-3 border border-neutral-200 text-center">4-6kg</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 font-bold">공인 여부</td>
                  <td className="p-3 border border-neutral-200 text-center">국제 공인</td>
                  <td className="p-3 border border-neutral-200 text-center">비공인 (개량종)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">기본 성격</td>
                  <td className="p-3 border border-neutral-200 text-center">전형적 시바 (독립·용맹)</td>
                  <td className="p-3 border border-neutral-200 text-center">유사하나 개체차 큼</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 font-bold">예민함</td>
                  <td className="p-3 border border-neutral-200 text-center">중간</td>
                  <td className="p-3 border border-neutral-200 text-center">약간 높음</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 font-bold">건강</td>
                  <td className="p-3 border border-neutral-200 text-center">🟢 강건함</td>
                  <td className="p-3 border border-neutral-200 text-center">🟡 유전 질환 위험</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎓</span> 시바견 훈련·케어 팁
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🎯 훈련의 핵심 원칙</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li><strong>존중 기반 훈련</strong> - 강압 절대 금물, 시바는 거부합니다</li>
                <li><strong>보상 중심</strong> - 간식과 칭찬으로 협조 유도</li>
                <li><strong>일관성</strong> - 규칙을 자주 바꾸면 무시당함</li>
                <li><strong>사회화 필수</strong> - 어릴 때 다양한 경험 제공</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">⚠️ 시바 초보자 주의사항</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>목줄 놓지 않기 - 사냥 본능으로 뛰어나감</li>
                <li>펫 프렌들리 리소스 부족 - 시바 특화 훈련사 찾기</li>
                <li>이중 털 관리 - 봄·가을 심각한 털갈이</li>
                <li>"시바 스크림" - 스트레스 시 비명 지르는 특유의 소리</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> 시바견에게 딱 맞는 반려인
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold mb-2 text-green-700">✅ 최고 궁합</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>독립적인 성격의 반려인</li>
                <li>강아지 훈련 경험자</li>
                <li>산책·하이킹 좋아하는 사람</li>
                <li>절제된 애정 표현 이해자</li>
                <li>일본 문화·시바 매력 이해자</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2 text-red-700">⚠️ 주의 필요</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>격렬한 애정 표현 원하는 사람</li>
                <li>강아지 초보자</li>
                <li>다견 가정 (동성 시바 경계)</li>
                <li>고양이·소동물과 사는 가정</li>
                <li>어린 아이 있는 가정 (예민함)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">❓</span> 시바견 성격 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 시바견이 왜 이렇게 도도해 보이나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                일본 원산 사냥견의 유전적 특성입니다. 낯선 사람에게 무관심하고 자기 페이스를 지키는 것이
                시바견 고유의 매력이자 원시견의 본능입니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 시바견은 정말 애교가 없나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                애교의 형태가 다를 뿐입니다. 눈 마주치기·같은 방에서 자기·시바 스마일 등 절제된 표현을 합니다.
                위 "시바견의 진짜 애정 신호 6가지" 섹션을 참고하세요.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 시바견 키우기가 어려운가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                초보자에게는 어려울 수 있습니다. 독립성·자기 주장이 강해 훈련이 까다롭습니다.
                다만 성격을 이해하면 최고의 파트너가 됩니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. "시바 스크림"이 뭔가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                시바견이 극도의 스트레스나 불편함을 느낄 때 지르는 특유의 <strong>비명 같은 소리</strong>입니다.
                주로 목욕·발톱깎기·병원 진료 시 발생하며, 시바견 특유의 방어 반응입니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 시바견 털갈이가 심하나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, <strong>매우 심합니다</strong>. 이중 털 구조로 봄·가을에 심각한 털갈이(블로잉 코트)를 겪습니다.
                이 시기에는 매일 브러싱과 자주 목욕이 필요합니다.
              </p>
            </details>
          </div>
        </section>

        <section className="mb-10 p-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">우리 시바견의 진짜 성격이 궁금하다면?</h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 시바만의 성격 유형과 반려인과의 궁합을 확인하세요.
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
              <div className="text-sm text-neutral-500">한국 인기견종 1위</div>
            </Link>
            <Link href={`/${locale}/blog/poodle-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🎩</div>
              <div className="font-bold">푸들 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">지능 2위 견종</div>
            </Link>
            <Link href={`/${locale}/blog/golden-retriever-personality`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🌟</div>
              <div className="font-bold">골든리트리버 성격 심층 분석</div>
              <div className="text-sm text-neutral-500">가족견의 대명사</div>
            </Link>
            <Link href={`/${locale}/blog/dog-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🐶</div>
              <div className="font-bold">강아지 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">16가지 유형 전체</div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
