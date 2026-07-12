import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "말티즈 성격 완벽 분석: 우리 말티즈는 어떤 유형일까? (16가지 MBTI 진단) | PawType-16";
  const description =
    "한국 인기견종 1위 말티즈의 성격을 4가지 축(활력·사교성·친화성·침착성)으로 완벽 분석합니다. 말티즈의 3대 성격 유형, 짖음 원인, 훈련법, 반려인과의 궁합까지 모든 것을 담았습니다.";

  return {
    title,
    description,
    keywords: [
      "말티즈 성격",
      "말티즈 MBTI",
      "말티즈 키우기",
      "말티즈 짖음",
      "몰티즈 성격",
      "말티즈 성격 유형",
      "말티즈 훈련",
      "말티즈 초보자",
      "PawType-16",
      "반려동물 성격 테스트",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/maltese-personality-guide`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "말티즈 성격 완벽 가이드",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/maltese-personality-guide`,
    },
  };
}

export default async function MaltesePersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "말티즈 성격 완벽 분석: 우리 말티즈는 어떤 유형일까?",
    description:
      "한국 인기견종 1위 말티즈의 성격을 4가지 축으로 완벽 분석. 3대 성격 유형, 짖음 원인, 훈련법, 궁합까지.",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/maltese-personality-guide`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "말티즈는 성격이 좋은 편인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "말티즈는 일반적으로 애정 표현이 풍부하고 반려인과의 유대감이 강한 온순한 성격입니다. 다만 개체마다 성격 축(활력·사교성·친화성·침착성)의 조합이 다르므로, PawType-16 무료 테스트로 우리 말티즈만의 성격 유형을 정확히 확인할 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "말티즈가 왜 이렇게 자주 짖나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "말티즈의 짖음은 대부분 '침착성(Calmness) Low' 성향에서 비롯됩니다. 작은 자극에도 민감하게 반응하는 견종 특성이며, 분리불안·경계심·관심 요구 등 3가지 주요 원인이 있습니다. 성격 유형을 파악하면 효과적인 훈련이 가능합니다.",
        },
      },
      {
        "@type": "Question",
        name: "말티즈 초보자도 키우기 쉬운가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "말티즈는 크기가 작고 운동량이 많지 않아 아파트에서도 키우기 좋습니다. 다만 예민한 성격, 잦은 짖음, 미용 관리가 초보자에게 도전이 될 수 있습니다. 성격 유형을 미리 파악하면 훨씬 수월합니다.",
        },
      },
      {
        "@type": "Question",
        name: "말티즈의 대표 성격 유형은 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "말티즈는 주로 3가지 유형에 분포합니다: 평화의 수호자(LHHH·온화한 유형), 감성 소통가(LHHL·섬세한 애정형), 조용한 감성가(LLHL·차분한 애정형). 3가지 모두 친화성이 High라는 공통점이 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "말티즈에게 맞는 반려인 스타일은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "말티즈는 실내 생활 중심이고 애정을 자주 표현하는 반려인과 최고의 궁합을 이룹니다. 활동량이 적은 편이라 어르신이나 재택근무자에게 특히 좋고, 예민함을 이해하고 차분히 대응하는 성격이 적합합니다.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="mx-auto max-w-3xl px-5 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-orange-600">홈</Link>
          {" / "}<span>블로그</span>{" / "}
          <span className="text-neutral-800">말티즈 성격 가이드</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-6xl mb-4">🤍</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            말티즈 성격 완벽 분석: 우리 말티즈는 어떤 유형일까?
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            한국 반려견 1위 말티즈, 4가지 축으로 알아보는 3대 성격 유형과 궁합 완벽 가이드
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
            <span>📅 2026년 7월 12일</span>
            <span>⏱ 읽는 시간 10분</span>
            <span>🏷 말티즈 · 성격분석 · 견종가이드</span>
          </div>
        </header>

        {/* Intro Box */}
        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 말티즈 성격을 결정하는 4가지 핵심 축의 특징</li>
            <li>✓ 말티즈의 3대 대표 성격 유형과 상세 분석</li>
            <li>✓ 말티즈 짖음의 진짜 원인과 성격 유형별 해결법</li>
            <li>✓ 유전·환경·훈련이 말티즈 성격에 미치는 영향</li>
            <li>✓ 우리 말티즈에게 가장 잘 맞는 반려인 스타일</li>
          </ul>
        </section>

        {/* Section 1: 4가지 축 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧬</span> 말티즈 성격을 결정하는 4가지 축
          </h2>
          <p className="mb-4 leading-relaxed">
            말티즈는 한국 반려견 전체의 <strong>약 20% 이상</strong>을 차지하는 인기 1위 견종입니다.
            지중해 몰타섬이 원산지인 이 작고 하얀 강아지는 겉으로 비슷해 보이지만,
            성격은 개체마다 크게 다릅니다. 옥스퍼드 대학교와 헬싱키 대학교의 반려견 성격 연구는
            개의 성격을 <strong>Big Five(빅파이브)</strong> 이론에 기반한 4가지 축으로 분석할 수 있음을 밝혔습니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy) - Low 성향이 강함
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                말티즈는 대체로 <strong>활력 Low 성향</strong>이 강한 견종입니다.
                하루 30분~1시간의 산책이면 충분하며, 실내에서 조용히 지내는 것을 선호합니다.
                다만 어린 말티즈나 개체차로 High 성향인 아이는 하루 종일 뛰어놀 준비가 되어 있기도 합니다.
                아파트 생활자·1인 가구·어르신에게 이상적인 이유가 여기에 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability) - 개체차 큼
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                말티즈의 사교성은 <strong>어린 시절 사회화 경험</strong>에 크게 좌우됩니다.
                생후 2~7주 사회화가 잘 된 말티즈는 낯선 사람에게도 우호적이지만,
                그렇지 못한 경우 낯선 대상에게 짖거나 경계하는 성향이 나타납니다.
                사교성이 High면 카페·산책에서 인기 스타, Low면 반려인만 바라보는 원-퍼슨 도그가 됩니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection) - 대부분 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                거의 모든 말티즈가 <strong>친화성 High</strong>에 속합니다.
                반려인 곁을 떠나지 않으려 하고, 무릎에 앉거나 이불 속에 파고드는 걸 좋아합니다.
                이는 몰타섬에서 수천 년간 귀족의 무릎 반려견(Lap dog)으로 사육된 유전적 특성입니다.
                단, 지나친 애착은 <strong>분리불안</strong>으로 이어질 수 있어 관리가 필요합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness) - Low 성향이 강함
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                말티즈는 <strong>침착성 Low 성향</strong>이 두드러집니다.
                초인종·발소리·낯선 소리에 민감하게 반응해 자주 짖고, 흥분을 진정시키기 어려운 편입니다.
                이 특성이 바로 "말티즈는 잘 짖는다"는 이미지의 원인입니다.
                다만 침착성이 High인 개체는 놀랍도록 차분하고 안정적입니다.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm">
              💡 <strong>포인트</strong>: 4가지 축의 High/Low 조합으로 총{" "}
              <strong>16가지 유형</strong>이 만들어지지만, 말티즈는 유전적으로 특정 유형에 집중되는 경향이 있습니다.
              아래에서 말티즈에게 가장 흔한 3가지 유형을 확인하세요.
            </p>
          </div>
        </section>

        {/* Section 2: 3대 대표 유형 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 말티즈의 3대 대표 성격 유형
          </h2>
          <p className="mb-6 leading-relaxed">
            PawType-16의 16가지 유형 중 말티즈에게 가장 자주 나타나는 세 가지 유형입니다.
            여러분의 말티즈는 어느 유형에 가까운지 살펴보세요.
          </p>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2">🕊 유형 1: 평화의 수호자 (LHHH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>가장 이상적인 말티즈 유형</strong>입니다. 차분하고 사람을 좋아하며,
                반려인에게 깊은 애정을 보이면서도 흥분을 잘 조절합니다.
                낯선 사람이 와도 잠깐 짖고 금세 진정합니다.
              </p>
              <p className="text-sm text-neutral-600">
                <strong>특징</strong>: 아이와도 잘 어울리고, 카페 산책 매너 최상,
                초보자에게도 부담 없이 키울 수 있는 유형.
              </p>
              <Link href={`/${locale}/types/e-l-s-h-a-h-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 평화의 수호자 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100">
              <h3 className="text-lg font-bold mb-2">💖 유형 2: 감성 소통가 (LHHL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>말티즈에게 가장 흔한 유형</strong>입니다. 반려인의 감정을 귀신같이 알아채고
                위로해주는 섬세한 소통가입니다. 활동량은 적지만 감정적으로 매우 풍부하며,
                반려인이 슬퍼하면 함께 침울해지고 기뻐하면 함께 흥분합니다.
              </p>
              <p className="text-sm text-neutral-600">
                <strong>특징</strong>: 애정 표현 풍부, 반려인 그림자처럼 따라다님,
                다만 자극에 예민해 자주 짖고 분리불안 위험 있음.
              </p>
              <Link href={`/${locale}/types/e-l-s-h-a-h-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 감성 소통가 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2">🌙 유형 3: 조용한 감성가 (LLHL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 Low · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>내향적인 말티즈 유형</strong>입니다. 낯선 사람은 어려워하지만
                반려인에게는 무한한 애정을 보이는 "원-퍼슨 도그"입니다.
                작은 소리에도 놀라고 예민하지만, 신뢰하는 반려인 앞에서는 완전히 마음을 엽니다.
              </p>
              <p className="text-sm text-neutral-600">
                <strong>특징</strong>: 한 사람에게만 헌신, 낯가림 심함,
                조용한 가정에서 이상적, 사회화 훈련 필수.
              </p>
              <Link href={`/${locale}/types/e-l-s-l-a-h-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 조용한 감성가 유형 자세히 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: 성격 형성 요인 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span> 말티즈 성격 형성 3대 요인
          </h2>
          <p className="mb-6 leading-relaxed">
            말티즈의 성격은 태어날 때 이미 정해진 것이 아닙니다.
            <strong>유전·환경·훈련</strong> 세 가지 요인이 복합적으로 작용해 성격이 형성됩니다.
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🧬 요인 1: 유전 (약 40%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                부모견의 성격이 자견에게 유전됩니다. 특히 <strong>아빠 말티즈의 성격이
                자견에게 강하게 유전</strong>되는 경향이 있습니다(어미는 임신·수유 중 스트레스로 유전 영향이 왜곡될 수 있음).
                분양 시 부모견을 확인할 수 있다면, 그 성격을 관찰하는 것이 큰 도움이 됩니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🌱 요인 2: 초기 사회화 (약 35%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                생후 <strong>2~7주가 결정적 시기</strong>입니다. 이 시기에 다양한 사람·소리·환경을
                경험한 말티즈는 성체가 되어도 안정적입니다. 반대로 이 시기 사회화가 부족하면,
                성격이 소심하고 낯가림 심한 성체가 됩니다. 분양 후에도 생후 3~6개월까지의 경험이 성격을 다듬습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🎓 요인 3: 훈련과 일상 (약 25%)</h3>
              <p className="text-neutral-700 leading-relaxed">
                일관성 있는 훈련과 반려인과의 상호작용은 성격을 다듬습니다.
                긍정적 강화(칭찬·간식)로 훈련된 말티즈는 자신감 있고 안정적이며,
                꾸중 중심의 훈련은 불안·공격성을 유발할 수 있습니다.
                하루 15분씩의 규칙적인 놀이와 훈련이 성격 형성에 큰 영향을 줍니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 짖음 원인 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔊</span> 말티즈 짖음, 성격 유형으로 이해하기
          </h2>
          <p className="mb-6 leading-relaxed">
            "말티즈는 왜 이렇게 짖을까요?" 답은 <strong>침착성 Low 성향</strong>에 있습니다.
            하지만 짖음의 원인은 성격 유형마다 다릅니다.
          </p>

          <div className="grid gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2">🚨 원인 1: 경계 짖음 (사교성 Low + 침착성 Low)</h3>
              <p className="text-sm text-neutral-700">
                낯선 사람·소리에 반응. "여기는 내 영역이야!" 경고 짖음.
                <br /><strong>해결법</strong>: 사회화 훈련, 다양한 자극에 노출.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <h3 className="font-bold mb-2">💔 원인 2: 분리불안 (친화성 High + 침착성 Low)</h3>
              <p className="text-sm text-neutral-700">
                반려인이 없을 때 짖음. 애정이 지나쳐 의존적이 된 상태.
                <br /><strong>해결법</strong>: 짧은 부재부터 시작해 점진적 훈련, 켄넬 훈련.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 className="font-bold mb-2">🎯 원인 3: 관심 요구 짖음 (활력 High + 사교성 High)</h3>
              <p className="text-sm text-neutral-700">
                놀아달라, 안아달라는 요구. 반려인이 반응하면 학습되어 반복.
                <br /><strong>해결법</strong>: 짖을 때 관심 주지 말고, 조용해질 때 보상.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: 훈련 및 케어 팁 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎓</span> 말티즈 성격 유형별 훈련·케어 팁
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🕊 평화의 수호자 유형에게</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>기본 훈련만 확실히 - 이미 안정적이라 어렵지 않음</li>
                <li>사회화 유지가 관건 - 정기적으로 다양한 환경 경험</li>
                <li>과도한 자극 피하고 일관된 루틴 제공</li>
                <li>다른 강아지나 아이와 함께해도 무난</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">💖 감성 소통가 유형에게</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>분리불안 예방이 최우선 - 어릴 때부터 혼자 있는 시간 훈련</li>
                <li>짖음 조절 훈련 - "조용히" 명령어 학습</li>
                <li>정서적 안정감 제공 - 담요·인형 등 안심 도구</li>
                <li>과도한 스킨십은 오히려 의존성 증가 - 적절한 거리 유지</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">🌙 조용한 감성가 유형에게</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>강제 사회화 금물 - 본인 페이스로 점진적 노출</li>
                <li>낯선 자극은 안전한 거리에서 시작</li>
                <li>안전한 은신처 제공 - 침대 밑, 방석 뒤 등</li>
                <li>신뢰가 최우선 - 급하지 않게, 꾸준한 애정으로</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: 궁합 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> 말티즈에게 딱 맞는 반려인
          </h2>
          <p className="mb-4 leading-relaxed">
            모든 말티즈가 모든 사람에게 잘 맞는 것은 아닙니다.
            성격 유형에 따라 최고의 궁합이 다릅니다.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold mb-2 text-green-700">✅ 최고 궁합</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>실내 생활 중심 (재택근무·프리랜서)</li>
                <li>1인 가구 또는 부부</li>
                <li>정서적 교감 좋아하는 사람</li>
                <li>조용한 아파트 생활자</li>
                <li>어르신·초등학생 이상 아이 있는 가정</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2 text-red-700">⚠️ 주의 필요</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>장시간 외출하는 직장인 (분리불안)</li>
                <li>3세 미만 유아 (예민한 성격)</li>
                <li>층간소음 예민한 이웃 있는 곳</li>
                <li>대형견과 다견 가정 (겁 많음)</li>
                <li>야외 활동 위주 라이프스타일</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">❓</span> 말티즈 성격 자주 묻는 질문
          </h2>

          <div className="space-y-3">
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 말티즈는 성격이 좋은 편인가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 대부분 애정 표현이 풍부하고 반려인과의 유대감이 강한 온순한 성격입니다.
                다만 개체마다 4가지 성격 축의 조합이 달라 짖음·분리불안 등의 문제가 나타날 수 있습니다.
                <Link href={`/${locale}/quiz`} className="text-orange-600 hover:underline">
                  {" "}PawType-16 무료 테스트
                </Link>로 우리 말티즈만의 성격 유형을 확인하세요.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 말티즈가 왜 이렇게 자주 짖나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                말티즈의 짖음은 대부분 <strong>침착성(Calmness) Low</strong> 성향에서 비롯됩니다.
                경계·분리불안·관심 요구 등 3가지 주요 원인이 있으며, 성격 유형별로 접근법이 다릅니다.
                위 "짖음 원인" 섹션을 참고하세요.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 말티즈 초보자도 키우기 쉬운가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                크기와 운동량 면에서는 초보자 친화적이지만, 예민한 성격과 잦은 짖음, 미용 관리가 도전이 될 수 있습니다.
                성격 유형을 미리 파악하면 훨씬 수월합니다. 평화의 수호자 유형이 초보자에게 가장 무난합니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 말티즈에게 산책이 꼭 필요한가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 필수입니다. 활력이 Low인 견종이라도 하루 30분~1시간의 산책은 정신 건강과 사회화에 필수적입니다.
                단, 여름 아스팔트 화상·겨울 저체온에 주의하세요.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 말티즈의 평균 수명은?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                평균 <strong>12~15년</strong>이며, 잘 관리하면 18년까지 사는 경우도 있습니다.
                주의할 건강 문제는 슬개골 탈구·눈물 자국·심장 질환입니다.
                안정적인 성격 유형(평화의 수호자)일수록 스트레스가 적어 장수하는 경향이 있습니다.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10 p-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">
            우리 말티즈의 정확한 성격 유형이 궁금하다면?
          </h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 말티즈만의 성격 유형과 반려인과의 궁합 점수를 확인하세요.
            Big Five 행동과학 기반, 7개 언어 지원.
          </p>
          <Link
            href={`/${locale}/quiz`}
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-105 transition"
          >
            무료 테스트 시작하기 →
          </Link>
        </section>

        {/* Related Posts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">📚 이런 글도 도움돼요</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href={`/${locale}/blog/poodle-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🎩</div>
              <div className="font-bold">푸들 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">토이/미니어처/스탠다드 크기별 성격 차이</div>
            </Link>
            <Link href={`/${locale}/blog/pomeranian-personality-guide`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🍊</div>
              <div className="font-bold">포메라니안 성격 완전 정복</div>
              <div className="text-sm text-neutral-500">활발한 소형견의 MBTI 유형은?</div>
            </Link>
            <Link href={`/${locale}/blog/dog-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🐶</div>
              <div className="font-bold">강아지 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">16가지 유형 전체 소개</div>
            </Link>
            <Link href={`/${locale}/blog/pet-owner-compatibility`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">💕</div>
              <div className="font-bold">반려인·반려동물 궁합 심층 분석</div>
              <div className="text-sm text-neutral-500">최고의 케미 조합 찾기</div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
