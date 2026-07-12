import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "골든리트리버 성격 심층 분석: 왜 가족견의 대명사일까? (16유형 매칭) | PawType-16";
  const description =
    "골든리트리버가 왜 세계 최고의 가족견인지 4가지 성격 축으로 완벽 분석합니다. 골든의 온순함·사교성·지능의 비밀과 3대 성격 유형, 훈련법, 궁합까지 모든 것을 담았습니다.";

  return {
    title,
    description,
    keywords: [
      "골든리트리버 성격",
      "골든리트리버 키우기",
      "골든리트리버 훈련",
      "골든 성격",
      "골든 사교성",
      "가족견 추천",
      "대형견 성격",
      "골든리트리버 MBTI",
      "PawType-16",
      "반려동물 성격 테스트",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/golden-retriever-personality`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "골든리트리버 성격 심층 분석",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/golden-retriever-personality`,
    },
  };
}

export default async function GoldenPersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "골든리트리버 성격 심층 분석: 왜 가족견의 대명사일까?",
    description: "골든리트리버의 온순함·사교성·지능을 4가지 축으로 완벽 분석한 가이드",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/golden-retriever-personality`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "골든리트리버는 왜 가족견 대명사인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "골든리트리버는 4가지 성격 축이 모두 이상적입니다: 활력 High(놀이 좋아함), 사교성 High(모든 사람에게 우호적), 친화성 High(가족에게 헌신적), 침착성 High(흥분 조절 능력). AKC 인기 순위에서 20년 이상 3위 안에 들며, 안내견·치료견으로도 최다 사용되는 견종입니다.",
        },
      },
      {
        "@type": "Question",
        name: "골든리트리버의 사교성이 왜 특별한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "골든은 19세기 스코틀랜드에서 조류 사냥 회수견으로 개발되어, 사냥꾼과 완벽하게 협력해야 했습니다. 이 유전적 특성으로 사람에 대한 신뢰와 협력 성향이 극대화되었습니다. 낯선 사람·아이·다른 강아지 모두에게 개방적입니다.",
        },
      },
      {
        "@type": "Question",
        name: "골든리트리버 훈련이 쉬운가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 훈련이 가장 쉬운 견종 중 하나입니다. 스탠리 코렌 박사의 지능 순위 4위이며, 특히 '먹을 것 얻으려는 의지'가 매우 강해 보상 훈련이 효과적입니다. 초보 반려인도 3-4주면 기본 명령어 훈련이 가능합니다.",
        },
      },
      {
        "@type": "Question",
        name: "골든의 대표 성격 유형은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "골든은 주로 3가지 유형에 분포합니다: 궁극의 낙천가(HHHH·완벽한 밸런스), 평화의 수호자(LHHH·차분한 사교형), 감성 소통가(LHHL·섬세한 애정형). 3가지 모두 사교성과 친화성이 High라는 공통점이 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "골든리트리버 키우기 힘든 점은?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "성격은 완벽하지만 관리는 만만치 않습니다: 1) 하루 2시간 이상 운동 필요, 2) 심각한 털 빠짐(1년 내내), 3) 대형견 사료·의료비 부담, 4) 활동적 공간 필요, 5) 유전 질환(고관절 이형성, 암) 관리 필요. 시간과 자원 투자가 가능한 반려인에게 최적입니다.",
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
          <span className="text-neutral-800">골든리트리버 성격 가이드</span>
        </nav>

        <header className="mb-10">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            골든리트리버 성격 심층 분석
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            왜 골든이 세계 최고의 가족견일까? 4가지 축과 3대 성격 유형 완벽 분석
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
            <span>📅 2026년 7월 12일</span>
            <span>⏱ 읽는 시간 12분</span>
            <span>🏷 골든리트리버 · 성격분석 · 대형견</span>
          </div>
        </header>

        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 골든이 가족견의 대명사가 된 유전적·성격적 이유</li>
            <li>✓ 4가지 성격 축이 모두 이상적인 이유</li>
            <li>✓ 골든의 3대 대표 성격 유형과 상세 분석</li>
            <li>✓ 골든 훈련의 5가지 필승 팁</li>
            <li>✓ 골든 키우기의 현실적 도전과 해결법</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 골든이 "가족견 대명사"가 된 이유
          </h2>
          <p className="mb-4 leading-relaxed">
            골든리트리버(Golden Retriever)는 <strong>19세기 후반 스코틀랜드</strong>에서
            <strong>조류 사냥 회수견</strong>으로 개발된 견종입니다. 하지만 오늘날에는
            사냥견보다 <strong>세계 최고의 가족견</strong>으로 더 유명합니다.
          </p>
          <p className="mb-4 leading-relaxed">
            AKC(미국 켄넬 클럽) 인기 순위에서 <strong>20년 이상 3위 안</strong>을 유지하고 있으며,
            <strong>안내견·치료견·구조견</strong>으로도 최다 사용되는 견종입니다.
            그 이유는 골든의 성격 4가지 축이 모두 이상적이기 때문입니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy) - High (긍정적 활력)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                골든은 <strong>활력 High</strong>이지만, 포메나 잭러셀 같은 예민한 활력이 아닌
                <strong>차분하고 지속적인 활력</strong>을 가지고 있습니다.
                하루 2시간의 운동으로도 만족하며, 실내에서는 조용히 지냅니다.
                수영을 특히 좋아하는 견종입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability) - 최상급 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                골든은 <strong>사교성이 극도로 높은</strong> 견종입니다.
                낯선 사람에게 처음 만나도 꼬리를 흔들며 다가가고, 다른 강아지와도 무리 없이 어울립니다.
                이는 사냥꾼과의 협력이 필수였던 유전적 특성입니다. 경비견으로는 부적합할 정도입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection) - 매우 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                골든은 <strong>가족에 대한 애착이 매우 강합니다</strong>.
                아이·노인·환자 모두에게 부드럽게 대하며, 감정을 잘 읽고 위로해줍니다.
                치료견으로 최다 사용되는 이유입니다. 다만 지나친 애착으로 <strong>분리불안</strong>이 오기도 합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness) - 대체로 High
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                골든은 <strong>흥분을 잘 조절</strong>합니다. 초인종·발소리에 반응하지만
                금세 진정됩니다. 성체가 되면 매우 안정적이며, 시끄러운 아이들 옆에서도 편안히 잠들 수 있습니다.
                다만 어린 골든(1-3세)은 활발한 시기라 침착성이 낮게 나타날 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm">
              💡 <strong>핵심</strong>: 골든이 4가지 축 모두에서 균형 잡힌 High 성향이라는 것은
              <strong>"궁극의 낙천가(HHHH)"</strong> 유형에 가깝다는 의미입니다.
              이는 PawType-16의 16가지 유형 중 가장 이상적인 유형입니다.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span> 골든리트리버의 3대 성격 유형
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-100">
              <h3 className="text-lg font-bold mb-2">⭐ 유형 1: 궁극의 낙천가 (HHHH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>가장 전형적인 골든 유형</strong>입니다. 4가지 축이 모두 이상적으로 균형 잡혀 있어
                아이·노인·다른 강아지 모두와 완벽하게 어울립니다.
                <strong>초보 반려인에게 강력히 추천</strong>되는 유형이며, 안내견·치료견으로 최다 선발됩니다.
              </p>
              <Link href={`/${locale}/types/e-h-s-h-a-h-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 궁극의 낙천가 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2">🕊 유형 2: 평화의 수호자 (LHHH)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>노령 골든이나 차분한 개체</strong>에게 흔한 유형입니다.
                활동량은 적지만 사람과의 유대는 여전히 깊고, 아파트 생활자·어르신에게 이상적입니다.
                방문객이 와도 조용히 인사하고 다시 자리 잡습니다.
              </p>
              <Link href={`/${locale}/types/e-l-s-h-a-h-c-h`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 평화의 수호자 유형 자세히 보기
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100">
              <h3 className="text-lg font-bold mb-2">💖 유형 3: 감성 소통가 (LHHL)</h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed mb-3">
                <strong>감정이 풍부한 골든 유형</strong>입니다. 반려인의 기분을 완벽하게 읽어내고
                위로해주는 최고의 정서적 동반자입니다. 치료견·정서지원견(ESA)으로 최적화된 유형이며,
                아이·환자와의 유대가 특히 강합니다.
              </p>
              <Link href={`/${locale}/types/e-l-s-h-a-h-c-l`} className="inline-block mt-3 text-sm text-orange-600 hover:underline">
                → 감성 소통가 유형 자세히 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 검증 데이터 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span> 골든의 우수성, 데이터로 증명
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">🥉</div>
              <h3 className="font-bold mb-1">AKC 인기 순위</h3>
              <p className="text-sm text-neutral-600">
                미국 켄넬 클럽 20년 연속 <strong>Top 3</strong>. 2022년 3위 등 안정적 인기.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold mb-1">지능 순위 4위</h3>
              <p className="text-sm text-neutral-600">
                스탠리 코렌 박사 지능 순위 <strong>4위</strong>. 새 명령어 5회 이하 학습, 95%+ 성공률.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">🦮</div>
              <h3 className="font-bold mb-1">안내견 1위</h3>
              <p className="text-sm text-neutral-600">
                전 세계 <strong>안내견의 60% 이상</strong>이 골든 또는 골든 믹스.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-2">💊</div>
              <h3 className="font-bold mb-1">치료견 최다 사용</h3>
              <p className="text-sm text-neutral-600">
                병원·요양원·재활센터 치료견 <strong>1위 견종</strong>. 감정 조절 능력 최상급.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎓</span> 골든 훈련의 5가지 필승 팁
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">1️⃣ 먹을 것 활용</h3>
              <p className="text-sm text-neutral-700">
                골든은 "먹을 것 얻으려는 의지"가 매우 강합니다.
                간식 기반 훈련이 가장 효과적이며, 3-4주면 기본 명령어 완성됩니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">2️⃣ 물건 물어오기 훈련</h3>
              <p className="text-sm text-neutral-700">
                회수견의 유전적 본능을 활용하세요. 공·프리즈비를 물어오는 훈련은
                운동 + 정신 자극 + 유대 강화를 한꺼번에 해결합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">3️⃣ 수영 활용</h3>
              <p className="text-sm text-neutral-700">
                골든은 <strong>물을 매우 좋아합니다</strong>. 수영은 관절에 부담이 적으면서
                에너지를 크게 소모시켜 가장 좋은 운동입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">4️⃣ 사회화 유지</h3>
              <p className="text-sm text-neutral-700">
                이미 사교적이지만 <strong>지속적인 사회화</strong>가 중요합니다.
                다양한 환경·사람·강아지 경험이 낙천적 성격을 유지시킵니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200">
              <h3 className="text-lg font-bold mb-2">5️⃣ 흥분 자제 훈련</h3>
              <p className="text-sm text-neutral-700">
                어린 골든(1-3세)은 흥분해서 뛰어오르는 습관이 있습니다.
                "앉아" 명령어와 함께 무시 훈련으로 조절할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> 골든 키우기의 현실적 도전
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2">🐾 심각한 털 빠짐</h3>
              <p className="text-sm text-neutral-700">
                1년 내내 털이 빠지고, 봄·가을에는 심각한 털갈이. 매일 청소·브러싱 필수.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <h3 className="font-bold mb-2">🏃 하루 2시간 운동</h3>
              <p className="text-sm text-neutral-700">
                산책·놀이·수영 등 하루 2시간+ 필수. 부족하면 문제 행동 발생.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <h3 className="font-bold mb-2">💰 대형견 유지비</h3>
              <p className="text-sm text-neutral-700">
                사료·의료비가 소형견의 3-4배. 월 30-50만원 예상 필요.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold mb-2">🏥 유전 질환 위험</h3>
              <p className="text-sm text-neutral-700">
                고관절 이형성·암·심장 질환 다발. 정기 검진 필수.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">💕</span> 골든에게 딱 맞는 반려인
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold mb-2 text-green-700">✅ 최고 궁합</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>활동적 가족 (아이 있는 가정)</li>
                <li>마당 있는 주택 거주자</li>
                <li>매일 산책 시간 확보 가능</li>
                <li>대형견 유지비 감당 가능</li>
                <li>정서적 교감 원하는 반려인</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <h3 className="font-bold mb-2 text-red-700">⚠️ 주의 필요</h3>
              <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
                <li>작은 아파트 거주자</li>
                <li>바쁜 1인 가구 (분리불안)</li>
                <li>결벽증 있는 사람 (털)</li>
                <li>운동 어려운 사람</li>
                <li>경비견 원하는 사람</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">❓</span> 골든리트리버 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 골든이 왜 가족견 대명사인가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                4가지 성격 축(활력·사교성·친화성·침착성)이 모두 이상적으로 균형 잡혀 있기 때문입니다.
                AKC 인기 순위 20년 연속 Top 3이며, 안내견·치료견으로 최다 사용됩니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 골든 훈련이 쉬운가요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                네, 훈련이 가장 쉬운 견종 중 하나입니다. 지능 4위, 보상 훈련 반응 최상급.
                초보자도 3-4주면 기본 명령어 훈련 완성 가능합니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 골든이 짖음이 많나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                <strong>거의 짖지 않는 견종</strong>입니다. 사교성이 매우 높아 낯선 이에게 짖기보다는
                꼬리 흔들며 다가갑니다. 경비견으로는 매우 부적합합니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 골든 평균 수명은?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                평균 <strong>10~12년</strong>입니다. 대형견 중에서는 평균 수명이지만
                소형견에 비해 짧습니다. 암 발생률이 높아 정기 검진이 매우 중요합니다.
              </p>
            </details>
            <details className="p-4 bg-white rounded-xl border border-neutral-200">
              <summary className="font-bold cursor-pointer">Q. 아파트에서 골든 키울 수 있나요?</summary>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                가능하지만 <strong>매일 2시간 이상 산책</strong>이 필수입니다.
                활동량 확보만 되면 아파트에서도 조용히 지냅니다.
                다만 대형견 사이즈로 이동·엘리베이터 등 현실적 어려움도 고려해야 합니다.
              </p>
            </details>
          </div>
        </section>

        <section className="mb-10 p-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl text-white text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold mb-3">우리 골든의 성격 유형이 궁금하다면?</h2>
          <p className="mb-6 opacity-90">
            3분 무료 테스트로 우리 골든만의 성격 유형과 반려인과의 궁합 점수를 확인하세요.
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
              <div className="text-sm text-neutral-500">소형견 비교</div>
            </Link>
            <Link href={`/${locale}/blog/poodle-personality-types`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🎩</div>
              <div className="font-bold">푸들 성격 유형 완벽 가이드</div>
              <div className="text-sm text-neutral-500">지능 견종 비교</div>
            </Link>
            <Link href={`/${locale}/blog/shiba-inu-personality`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">🦊</div>
              <div className="font-bold">시바견 성격 대해부</div>
              <div className="text-sm text-neutral-500">독립성 대비</div>
            </Link>
            <Link href={`/${locale}/blog/pet-owner-compatibility`} className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-orange-300 transition">
              <div className="text-2xl mb-1">💕</div>
              <div className="font-bold">반려인·반려동물 궁합 심층 분석</div>
              <div className="text-sm text-neutral-500">최고 케미 찾기</div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
