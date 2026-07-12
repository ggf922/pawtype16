import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "포메라니안 성격 완전 정복: 활발한 소형견의 MBTI 유형은? | PawType-16";
  const description =
    "포메라니안의 활발한 성격, 잦은 짖음, 예민함의 진짜 이유를 4가지 축으로 분석합니다. 포메의 3대 성격 유형, 훈련법, 짖음 해결법, 반려인 궁합까지 완벽 가이드.";

  return {
    title,
    description,
    keywords: [
      "포메라니안 성격",
      "포메 성격",
      "포메라니안 짖음",
      "포메 예민함",
      "포메 활발한 이유",
      "포메라니안 훈련",
      "포메라니안 키우기",
      "포메 MBTI",
      "PawType-16",
      "반려동물 성격 테스트",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/pomeranian-personality-guide`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "포메라니안 성격 완벽 가이드",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/pomeranian-personality-guide`,
    },
  };
}

export default async function PomeranianPersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "포메라니안 성격 완전 정복: 활발한 소형견의 MBTI 유형은?",
    description: "포메라니안의 활발한 성격, 짖음, 예민함을 4가지 축으로 분석한 완벽 가이드",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/pomeranian-personality-guide`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "포메라니안 짖음이 왜 이렇게 심한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "포메라니안의 잦은 짖음은 침착성 Low + 활력 High + 사교성 개체차 3가지 조합에서 나옵니다. 원래 대형견인 스피츠에서 소형화된 견종이라 '작지만 강한' 자기 인식과 함께 자극에 매우 민감합니다. 초인종·발소리·외부인 등 다양한 자극에 반응하며, 훈련으로 조절이 가능합니다.",
        },
      },
      {
        "@type": "Question",
        name: "포메라니안이 왜 이렇게 활발한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "포메는 활력 High 성향이 매우 강한 견종입니다. 원조 스피츠(대형 썰매견)의 유전자를 물려받아 몸집은 작지만 에너지는 엄청납니다. 하루 1시간 이상의 산책과 놀이가 필수적이며, 정신적 자극도 함께 필요합니다.",
        },
      },
      {
        "@type": "Question",
        name: "포메라니안이 예민한 이유는?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "침착성(Calmness) Low 성향 때문입니다. 작은 자극에도 크게 반응하는 유전적 특성으로, 스트레스에 취약합니다. 조용하고 안정된 환경에서 자란 포메는 예민함이 완화될 수 있으며, 반려인의 감정 상태에도 크게 영향받습니다.",
        },
      },
      {
        "@type": "Question",
        name: "포메라니안 훈련은 어렵나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "포메는 지능이 높아 훈련 자체는 어렵지 않지만, 자기 주장이 강해 반려인의 일관된 리더십이 중요합니다. 특히 짖음 조절과 사회화 훈련이 필수적입니다. 성격 유형에 맞는 훈련법을 사용하면 훨씬 효과적입니다.",
        },
      },
      {
        "@type": "Question",
        name: "포메라니안의 대표 성격 유형은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "포메는 주로 3가지 유형에 분포합니다: 파티 스타(HHLL·활발하고 사교적), 열정 폭발형(HHHL·에너지 넘치는 애정형), 자유로운 영혼(HLLL·독특한 개성파). 3가지 모두 활력이 High라는 공통점이 있습니다.",
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
          <span className="text-neutral-800">포메라니안 성격 가이드</span>
        </nav>

        <header className="mb-10">
          <div className="text-6xl mb-4">🍊</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            포메라니안 성격 완전 정복
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            활발한 소형견의 진짜 성격과 짖음의 원인, 3대 MBTI 유형 완벽 분석
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
            <span>📅 2026년 7월 12일</span>
            <span>⏱ 읽는 시간 10분</span>
            <span>🏷 포메라니안 · 성격분석 · 견종가이드</span>
          </div>
        </header>

        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 포메라니안이 유독 활발한 이유 (스피츠 유전자)</li>
            <li>✓ 포메 짖음의 3가지 유형별 원인과 해결법</li>
            <li>✓ 왜 포메가 예민한지 - 침착성 Low의 진짜 의미</li>
            <li>✓ 포메의 3대 대표 성격 유형과 상세 분석</li>
            <li>✓ 포메에게 최고의 반려인 유형과 훈련 팁</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧬</span> 포메라니안 성격의 4가지 축
          </h2>
          <p className="mb-4 leading-relaxed">
            포메라니안은 <strong>스피츠(Spitz)</strong> 계열의 소형견입니다.
            원래 독일·폴란드 국경 지역인 포메라니아에서 유래했으며,
            <strong>19세기 빅토리아 여왕이 애견</strong>으로 삼으며 유명해졌습니다.
            흥미롭게도 초기 포메는 <strong>15~20kg</strong>의 중형견이었으나, 소형화 개량으로 지금의 크기가 되었습니다.
          </p>
          <p className="mb-4 leading-relaxed">
            이런 역사 덕분에 포메는 <strong>"작은 몸속의 큰 성격"</strong>을 가진 견종이 되었습니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy) - 매우 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                포메는 <strong>활력이 매우 높은 견종</strong>입니다. 스피츠 유전자로 인해
                썰매견의 에너지를 물려받았으며, 몸집은 작지만 하루 1시간 이상의 활동이 필수입니다.
                아파트 안에서도 뛰어다니고, 장난감을 물고 흔들며 놀기를 좋아합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability) - 개체차 큼
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                포메의 사교성은 <strong>사회화 경험에 크게 좌우</strong>됩니다.
                잘 사회화된 포메는 낯선 사람에게도 활발하고 우호적이지만,
                그렇지 않은 경우 낯선 이에게 짖고 경계하는 성향이 강합니다.
                작은 몸집 때문에 위협을 크게 느끼는 특성도 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection) - 개체차 큼
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                포메의 친화성은 <strong>매우 다양한 스펙트럼</strong>을 보입니다.
                반려인 무릎에서 떨어지지 않는 유형이 있는 반면,
                독립적으로 자기만의 시간을 즐기는 유형도 있습니다.
                이는 스피츠의 독립성과 소형견의 애착 성향이 섞인 결과입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness) - 매우 Low
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                포메는 <strong>침착성이 매우 낮은 견종</strong>입니다.
                작은 자극에도 크게 반응하고, 흥분을 진정시키기 어렵습니다.
                이 특성이 잦은 짖음, 예민함, 스트레스 취약성의 원인입니다.
                침착성이 High인 포메는 매우 드물지만 존재합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔊</span> 포메 짖음의 진짜 원인
          </h2>
          <p className="mb-6 leading-relaxed">
            "포메는 왜 이렇게 짖을까?" 답은 <strong>3가지 원인</strong>이 복합적으로 작용하기 때문입니다.
          </p>

          <div className="grid gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2">🚨 원인 1: 스피츠 본능 (경계 짖음)</h3>
              <p className="text-sm text-neutral-700">
                포메의 조상 스피츠는 썰매를 끌면서 <strong>낯선 이의 접근을 알리는 역할</strong>을 했습니다.
                이 유전자가 남아 낯선 소리·사람에게 즉각 짖음으로 반응합니다.
                <br /><strong>해결법</strong>: 사회화 훈련 강화, "괜찮아" 명령어 학습.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <h3 className="font-bold mb-2">💔 원인 2: 나폴레옹 콤플렉스</h3>
              <p className="text-sm text-neutral-700">
                작은 몸집을 큰 목소리로 보완하려는 심리입니다.
                자기보다 큰 강아지·사람에게 오히려 강하게 짖으며 자신감을 표현합니다.
                <br /><strong>해결법</strong>: 자신감 있는 사회화 경험, 안전한 환경 조성.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 className="font-bold mb-2">🎯 원인 3: 관심 요구</h3>
              <p className="text-sm text-neutral-700">
                반려인의 관심을 얻기 위해 짖음. 한 번 반응해주면 학습되어 반복됩니다.
                <br /><strong>해결법</strong>: 짖을 때 무시하고, 조용해질 때 즉시 보상.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm">
              💡 <strong>중요</strong>: 짖음은 완전히 없앨 수 없지만 <strong>조절 가능</strong>합니다.
              완벽한 무음보다는 "필요할 때만 짖는 포메"가 현실적인 목표입니다.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 포메라니안 3대 대표 성격 유형
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-100">
              <h3 className="text-lg font-bold mb-2">🎉 유형 1: 파티 스타 (HHLL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 Low · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>가장 전형적인 포메 유형</strong>입니다. 어디서나 주목받는 활발한 성격으로,
                카페·산책·강아지 모임에서 인기 스타가 됩니다. 다만 흥분을 잘 못하고 짖음이 있어 훈련이 필요합니다.
                자기 주도적이라 명령보다 요청형 훈련이 효과적입니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-l-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 파티 스타 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2">🔥 유형 2: 열정 폭발형 (HHHL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>애정 표현이 폭발적인 포메 유형</strong>. 반려인에게 무한 애정을 쏟으면서
                동시에 활발하게 움직이고 짖습니다. 온몸으로 사랑을 표현하지만
                분리불안 위험이 높아 어릴 때부터 혼자 있는 시간 훈련이 필수입니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-h-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 열정 폭발형 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2">🦋 유형 3: 자유로운 영혼 (HLLL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 Low · 친화성 Low · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>독특한 개성파 포메 유형</strong>. 규칙에 얽매이지 않고 자기 방식대로 행동합니다.
                낯선 사람은 어려워하지만 자기만의 세계가 뚜렷하며,
                예측 불가한 매력이 있습니다. 훈련 시 개성을 존중하는 접근이 필요합니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-l-a-l-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 자유로운 영혼 유형 자세히 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span> 포메 성격 형성 요인
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🧬 유전 (약 40%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                포메는 스피츠 유전자의 <strong>활력·독립성·경계심</strong>을 물려받습니다.
                부모견 성격을 관찰하면 자견의 성격을 예측할 수 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🌱 초기 사회화 (약 35%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                포메는 <strong>사회화가 특히 중요한 견종</strong>입니다.
                생후 2~7주에 다양한 자극에 노출되지 않으면, 성체가 되어도 극도로 예민해집니다.
                가급적 8주 이후 분양된 개체 선택 권장.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🎓 훈련과 일상 (약 25%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                일관된 훈련과 정기적 운동은 포메의 예민함과 짖음을 크게 완화합니다.
                <strong>지루한 포메 = 문제 있는 포메</strong>. 매일 정신적·신체적 자극을 제공하세요.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎓</span> 포메라니안 훈련·케어 팁
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🎯 필수 훈련</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li><strong>사회화</strong> - 어릴 때 다양한 자극 노출</li>
                <li><strong>짖음 조절</strong> - "조용히" 명령어 학습</li>
                <li><strong>혼자 있기</strong> - 분리불안 예방</li>
                <li><strong>배변훈련</strong> - 일관성 유지</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">⚠️ 특별 주의사항</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li><strong>슬개골 탈구</strong> - 소형견 최다 질환, 뛰어내리기 자제</li>
                <li><strong>기관 협착증</strong> - 하네스 사용 권장 (목줄 X)</li>
                <li><strong>이중 털 관리</strong> - 매일 브러싱, 주 1회 미용</li>
                <li><strong>과체중 주의</strong> - 작은 몸에 큰 부담</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> 포메라니안에게 딱 맞는 반려인
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold mb-2 text-green-700">✅ 최고 궁합</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>활발한 라이프스타일의 반려인</li>
                <li>훈련·놀이에 시간 투자 가능한 사람</li>
                <li>인내심 있는 성격</li>
                <li>짖음 어느 정도 감내 가능</li>
                <li>SNS·인스타 활발한 반려인</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2 text-red-700">⚠️ 주의 필요</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>극도로 조용한 환경 원하는 사람</li>
                <li>층간소음 예민한 이웃 있는 곳</li>
                <li>3세 미만 유아 있는 가정</li>
                <li>대형견 다견 가정</li>
                <li>바쁜 직장인 (분리불안)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">❓</span> 포메 성격 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 포메 짖음이 왜 이렇게 심한가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                침착성 Low + 스피츠 유전자 + 나폴레옹 콤플렉스 조합입니다.
                훈련으로 완화 가능하지만 완전히 없앨 수는 없습니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 포메가 왜 이렇게 활발한가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                원조 스피츠(대형 썰매견)의 유전자 때문입니다. 몸집은 작지만 에너지는 대형견 수준입니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 포메가 예민한 이유는?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                침착성(Calmness) Low 성향 때문입니다. 작은 자극에도 크게 반응하는 유전적 특성입니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 포메 털은 어떻게 관리하나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                이중 털 구조로 <strong>매일 브러싱, 월 1-2회 미용</strong>이 필수입니다.
                다만 <strong>클리핑(짧게 미는 것)은 금물</strong> - 털이 다시 자라지 않을 수 있습니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 포메 평균 수명은?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                평균 <strong>12~16년</strong>입니다. 소형견 중 장수 견종이며, 잘 관리하면 18년까지 사는 경우도 있습니다.
                주의할 건강 문제는 슬개골 탈구·기관 협착증·심장 질환입니다.
              </p>
            </details>
          </div>
        </section>

        <section className="mb-10 p-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">우리 포메의 성격 유형이 궁금하다면?</h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 포메만의 성격 유형과 반려인과의 궁합 점수를 확인하세요.
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
              <div className="text-sm text-neutral-500">비교: 조용한 소형견</div>
            </Link>
            <Link href={`/${locale}/blog/poodle-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🎩</div>
              <div className="font-bold">푸들 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">활력 있는 스마트견</div>
            </Link>
            <Link href={`/${locale}/blog/shiba-inu-personality`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🦊</div>
              <div className="font-bold">시바견 성격 대해부</div>
              <div className="text-sm text-neutral-500">비교: 독립적 소형견</div>
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
