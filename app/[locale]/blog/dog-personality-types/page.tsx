import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "강아지 성격 유형 완벽 가이드 - 우리 강아지는 어떤 타입일까? | PawType-16";
  const description =
    "우리 강아지의 성격 유형을 4가지 축(활력·사교성·친화성·침착성)으로 분석하는 방법을 알려드립니다. 견종별 성격 특징, 성격 형성 요인, 그리고 반려인과의 최고 궁합까지 완벽 가이드.";

  return {
    title,
    description,
    keywords: [
      "강아지 성격",
      "반려견 성격 유형",
      "강아지 MBTI",
      "견종별 성격",
      "강아지 성격 테스트",
      "반려견 심리",
      "강아지 행동 분석",
      "펫타입16",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/dog-personality-types`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "강아지 성격 유형 가이드",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/dog-personality-types`,
    },
  };
}

export default async function DogPersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "강아지 성격 유형 완벽 가이드 - 우리 강아지는 어떤 타입일까?",
    description:
      "우리 강아지의 성격 유형을 4가지 축으로 분석하는 방법과 견종별 특징, 성격 형성 요인을 완벽하게 정리한 가이드입니다.",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/dog-personality-types`,
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
          <span className="text-neutral-800">강아지 성격 유형 가이드</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-6xl mb-4">🐶</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            강아지 성격 유형 완벽 가이드
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            우리 강아지는 어떤 타입일까? 4가지 축으로 알아보는 반려견 성격의
            비밀
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>📅 2026년 7월 9일</span>
            <span>⏱ 읽는 시간 8분</span>
            <span>🏷 강아지 · 성격분석</span>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-lg leading-relaxed">
            💡 <strong>이 글에서 알 수 있는 것</strong>
          </p>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>✓ 강아지 성격을 결정짓는 4가지 핵심 축</li>
            <li>✓ 견종별 대표적인 성격 유형과 특징</li>
            <li>✓ 강아지 성격이 형성되는 3가지 결정적 요인</li>
            <li>✓ 우리 강아지 성격을 정확히 파악하는 관찰법</li>
            <li>✓ 반려인과의 최고 궁합을 찾는 방법</li>
          </ul>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span> 강아지 성격을 결정하는 4가지 축
          </h2>
          <p className="mb-4 leading-relaxed">
            강아지의 성격은 무수히 다양해 보이지만, 사실 <strong>4가지 핵심
            축</strong>으로 체계적으로 분류할 수 있습니다. PawType-16은 이
            4가지 축을 기반으로 16가지 유형을 정의합니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy) - High vs Low
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                하루 종일 뛰어놀 준비가 된 강아지인가요, 아니면 조용히
                엎드려있는 걸 좋아하는 강아지인가요? 활력 축은 강아지의{" "}
                <strong>일일 에너지 수준과 운동 욕구</strong>를 나타냅니다.
                보더콜리·잭러셀 테리어는 High, 불독·바셋하운드는 Low에
                가깝습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability) - High vs Low
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                낯선 사람과 강아지를 만났을 때 반응이 어떤가요? 사교성 축은{" "}
                <strong>새로운 대상에 대한 개방성</strong>을 측정합니다. 골든
                리트리버는 High, 시바견·차우차우는 Low 성향이 강합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection) - High vs Low
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                항상 반려인 옆에 붙어있으려 하는지, 자기만의 공간을 좋아하는지
                살펴보세요. 친화성 축은 <strong>반려인에 대한 애착
                수준</strong>을 나타냅니다. 카발리에 킹 찰스 스파니엘은 High,
                아프간하운드는 Low 쪽입니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness) - High vs Low
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                초인종이 울리면 어떤 반응을 보이나요? 침착성 축은{" "}
                <strong>자극에 대한 감정 조절 능력</strong>을 측정합니다.
                버니즈 마운틴 도그·그레이트 피레니즈는 High, 치와와·요크셔
                테리어는 Low 성향이 강합니다.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm">
              💡 <strong>포인트</strong>: 4가지 축의 High/Low 조합으로 총{" "}
              <strong>2⁴ = 16가지 유형</strong>이 만들어집니다. 각 유형은
              고유한 이름과 특징을 가지고 있어요.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🐕</span> 견종별 대표 성격 유형 6가지
          </h2>
          <p className="mb-6 leading-relaxed">
            같은 견종이라도 개체 차이는 크지만, 견종별로 유전적으로 강한 성격
            경향은 분명 존재합니다. 대표적인 사례를 살펴보겠습니다.
          </p>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🌟 골든 리트리버 - "궁극의 낙천가" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                모든 축이 High에 위치한 이상적인 가족견입니다. 아이·낯선
                사람·다른 강아지 모두에게 우호적이며, 반려인과 붙어있길
                좋아하면서도 흥분을 잘 조절합니다. 초보 반려인에게 강력
                추천되는 견종입니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🔥 잭 러셀 테리어 - "열정 폭발형" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed">
                엄청난 에너지를 자랑하는 활동가입니다. 사람과 동물 모두에게
                친화적이지만 자극에 예민하게 반응하며 짖는 경향이 있습니다.
                매일 최소 2시간의 활발한 산책·놀이가 필요합니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🎩 시바견 - "독립적 사색가" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 Low · 친화성 Low · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                고양이 같은 강아지로 유명합니다. 자기만의 공간과 규칙을
                중시하며, 낯선 이에게 쉽게 마음을 열지 않지만 신뢰한 가족에겐
                깊은 애정을 보입니다. 자기 주장이 강한 반려인과 잘 맞습니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                💕 카발리에 킹 찰스 스파니엘 - "달콤한 로맨티스트" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                온화하고 사랑스러운 무릎견입니다. 반려인 옆에 붙어있는 것을
                가장 좋아하며, 아파트 생활에도 적합합니다. 노인·1인 가구에게
                이상적인 파트너입니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🏔 버니즈 마운틴 도그 - "온화한 수호자" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                거대한 몸집과 달리 매우 온순하고 침착합니다. 가족을 지키려는
                본능이 강하지만 공격적이지 않고, 아이들의 좋은 놀이 친구가
                됩니다. 넓은 공간과 시원한 환경이 필요합니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                ⚡ 치와와 - "작은 카리스마" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 Low · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed">
                작은 몸집에 큰 성격이 담긴 대표적 예입니다. 반려인 한 명에게
                극도로 헌신하지만 낯선 이에겐 경계심이 강하고, 자극에 민감해
                자주 짖습니다. 조용한 1인 가구에 잘 맞습니다.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm">
              📌 <strong>주의</strong>: 견종은 참고일 뿐, 개별 강아지의 성격은
              양육 환경과 경험에 따라 크게 달라집니다. 반드시{" "}
              <Link
                href={`/${locale}/quiz`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                직접 성격 테스트
              </Link>
              로 확인해 보세요!
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧬</span> 강아지 성격을 형성하는 3가지
            결정적 요인
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-white rounded-xl border-l-4 border-orange-400">
              <h3 className="text-lg font-bold mb-2">
                1️⃣ 유전 (Genetics) - 30~40%
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                견종의 원래 목적(사냥·목축·경비·반려)에 따라 유전적으로 강한
                성격 성향이 존재합니다. 예를 들어 보더콜리는 수백 년간 양치기
                작업을 위해 개량되어 높은 활력과 지능을 유전적으로
                물려받았습니다. 부모견의 성격도 강한 영향을 미치므로 분양 시
                부모견 관찰이 중요합니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-blue-400">
              <h3 className="text-lg font-bold mb-2">
                2️⃣ 사회화 시기 경험 (Socialization) - 40~50%
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                생후 <strong>3주~16주</strong>는 강아지의 성격이 결정되는{" "}
                <strong>결정적 시기(Critical Period)</strong>입니다. 이 시기에
                다양한 사람·동물·환경·소리에 긍정적으로 노출되면 사교성 High,
                침착성 High 성향으로 발달할 확률이 높아집니다. 반대로 이
                시기에 격리되면 두려움 많고 소극적인 성격이 될 수 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-green-400">
              <h3 className="text-lg font-bold mb-2">
                3️⃣ 성장기 환경과 반려인 스타일 - 20~30%
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                반려인의 훈련 방식, 가족 구성, 다른 반려동물의 존재, 산책
                빈도, 놀이 시간 등이 강아지의 성격을 미세하게 조정합니다.
                긍정 강화 훈련은 친화성과 침착성을 높이고, 강압적 훈련은
                두려움과 공격성을 유발할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔍</span> 우리 강아지 성격을 파악하는
            5가지 관찰법
          </h2>

          <div className="grid gap-4">
            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">
                📍 상황 1: 초인종이 울렸을 때
              </h3>
              <p className="text-sm text-neutral-700">
                → 격렬하게 짖고 뛰어다닌다면 <strong>침착성 Low</strong>,
                조용히 관찰만 한다면 <strong>침착성 High</strong>
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">
                📍 상황 2: 산책 중 다른 강아지를 만났을 때
              </h3>
              <p className="text-sm text-neutral-700">
                → 꼬리를 흔들며 다가간다면 <strong>사교성 High</strong>, 짖거나
                뒤로 물러난다면 <strong>사교성 Low</strong>
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">
                📍 상황 3: 반려인이 외출했을 때
              </h3>
              <p className="text-sm text-neutral-700">
                → 분리불안 증상(짖음·파괴)을 보이면 <strong>친화성 High</strong>,
                편안하게 자거나 놀면 <strong>친화성 Low</strong> 또는 안정형
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">
                📍 상황 4: 하루 산책 30분 후 상태
              </h3>
              <p className="text-sm text-neutral-700">
                → 여전히 뛰어놀 준비가 되었다면 <strong>활력 High</strong>,
                집에 오자마자 잔다면 <strong>활력 Low</strong>
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">
                📍 상황 5: 새로운 장난감을 줬을 때
              </h3>
              <p className="text-sm text-neutral-700">
                → 즉시 달려들어 물고 뜯는다면 <strong>활력·사교성 High</strong>,
                한참 관찰 후 접근한다면 <strong>침착성 High</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10 p-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            🎯 지금 바로 우리 강아지 성격 테스트!
          </h2>
          <p className="mb-6 opacity-95">
            36개 정밀 질문으로 우리 강아지의 16가지 유형 중 하나를 정확히
            찾아드립니다. 무료 · 3분 소요 · 7개 언어 지원
          </p>
          <Link
            href={`/${locale}/quiz`}
            className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:scale-105 transition"
          >
            무료 테스트 시작하기 →
          </Link>
        </section>

        {/* Related posts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">📚 관련 글 더 보기</h2>
          <div className="grid gap-3">
            <Link
              href={`/${locale}/blog/pet-personality-guide`}
              className="p-4 border rounded-xl hover:bg-orange-50 transition"
            >
              <h3 className="font-bold mb-1">
                🐾 반려동물 성격을 아는 5가지 방법
              </h3>
              <p className="text-sm text-neutral-600">
                과학적으로 검증된 반려동물 성격 분석 방법 완벽 정리
              </p>
            </Link>
            <Link
              href={`/${locale}/blog/cat-personality-types`}
              className="p-4 border rounded-xl hover:bg-orange-50 transition"
            >
              <h3 className="font-bold mb-1">🐱 고양이 성격 유형 완벽 가이드</h3>
              <p className="text-sm text-neutral-600">
                우리 고양이의 성격을 4가지 축으로 이해하는 방법
              </p>
            </Link>
            <Link
              href={`/${locale}/blog/pet-owner-compatibility`}
              className="p-4 border rounded-xl hover:bg-orange-50 transition"
            >
              <h3 className="font-bold mb-1">
                💞 반려인과 반려동물 궁합 심층 분석
              </h3>
              <p className="text-sm text-neutral-600">
                16가지 유형별 최고의 반려인 유형은?
              </p>
            </Link>
            <Link
              href={`/${locale}/types`}
              className="p-4 border rounded-xl hover:bg-orange-50 transition"
            >
              <h3 className="font-bold mb-1">📖 16가지 유형 도감 보기</h3>
              <p className="text-sm text-neutral-600">
                모든 성격 유형의 상세 정보를 확인해보세요
              </p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
