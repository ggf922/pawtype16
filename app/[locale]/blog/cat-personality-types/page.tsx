import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "고양이 성격 유형 완벽 가이드 - 우리 고양이의 진짜 성격은? | PawType-16";
  const description =
    "고양이는 정말 도도할까요? 4가지 축(활력·사교성·친화성·침착성)으로 고양이의 진짜 성격을 분석하는 방법. 품종별 특징, 성격 형성 요인, 그리고 반려인과의 최적 궁합 완벽 가이드.";

  return {
    title,
    description,
    keywords: [
      "고양이 성격",
      "반려묘 성격 유형",
      "고양이 MBTI",
      "품종별 성격",
      "고양이 성격 테스트",
      "반려묘 심리",
      "고양이 행동 분석",
      "펫타입16",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.pawtype16.com/${locale}/blog/cat-personality-types`,
      siteName: "PawType-16",
      images: [
        {
          url: "https://www.pawtype16.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "고양이 성격 유형 가이드",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.pawtype16.com/${locale}/blog/cat-personality-types`,
    },
  };
}

export default async function CatPersonalityBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "고양이 성격 유형 완벽 가이드 - 우리 고양이의 진짜 성격은?",
    description:
      "고양이의 진짜 성격을 4가지 축으로 분석하는 방법과 품종별 특징을 완벽하게 정리한 가이드입니다.",
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
      "@id": `https://www.pawtype16.com/${locale}/blog/cat-personality-types`,
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
          <span className="text-neutral-800">고양이 성격 유형 가이드</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            고양이 성격 유형 완벽 가이드
          </h1>
          <p className="text-xl text-neutral-600 mb-4">
            "고양이는 도도하다"는 오해를 풀어드립니다 - 우리 냥이의 진짜 성격
            분석법
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>📅 2026년 7월 9일</span>
            <span>⏱ 읽는 시간 9분</span>
            <span>🏷 고양이 · 성격분석</span>
          </div>
        </header>

        {/* Intro */}
        <section className="mb-10 p-6 bg-purple-50 rounded-2xl border border-purple-100">
          <p className="text-lg leading-relaxed mb-3">
            🐱 <strong>고양이에 대한 흔한 오해</strong>
          </p>
          <p className="text-neutral-700 leading-relaxed">
            많은 사람들이 "고양이는 다 도도하고 독립적이다"라고 생각합니다.
            하지만 실제로 고양이는 강아지 못지않게 <strong>다양한 성격
            스펙트럼</strong>을 가지고 있으며, 어떤 고양이는 강아지보다도 더
            사교적이고 애교가 많습니다. 이 글에서는 고양이의 진짜 성격을
            4가지 축으로 이해하는 방법을 알려드립니다.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span> 고양이 성격의 4가지 축
          </h2>
          <p className="mb-4 leading-relaxed">
            강아지와 마찬가지로 고양이의 성격도 4가지 축으로 분석할 수
            있습니다. 다만 고양이는 진화적으로 <strong>단독 사냥자</strong>였기
            때문에 강아지와는 다른 특징을 보입니다.
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-5 bg-white rounded-xl border-2 border-red-100">
              <h3 className="text-lg font-bold mb-2 text-red-600">
                ⚡ 축 1: 활력 (Energy)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                고양이는 하루 12~16시간을 자지만, 깨어있는 시간의 활동량은 큰
                차이가 있습니다. <strong>High</strong>: 벵갈·아비시니안,{" "}
                <strong>Low</strong>: 페르시안·랙돌.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                🤝 축 2: 사교성 (Sociability)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                낯선 사람이 오면 숨어버리는지, 오히려 다가가는지 관찰하세요.{" "}
                <strong>High</strong>: 메인쿤·랙돌·샴, <strong>Low</strong>:
                러시안블루·터키시앙고라.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-green-100">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                💚 축 3: 친화성 (Affection)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                반려인 무릎에 자주 올라오거나 뒤를 졸졸 따라다니는지
                살펴보세요. <strong>High</strong>: 랙돌·버만·스코티시폴드,{" "}
                <strong>Low</strong>: 노르웨이숲·이집션마우.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold mb-2 text-purple-600">
                🧘 축 4: 침착성 (Calmness)
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                진공청소기·초인종 등에 어떻게 반응하는지 확인하세요.{" "}
                <strong>High</strong>: 브리티시숏헤어·페르시안,{" "}
                <strong>Low</strong>: 샴·오리엔탈숏헤어.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🐈</span> 품종별 대표 성격 6가지
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                💫 랙돌 (Ragdoll) - "달콤한 로맨티스트" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                "인형 같은 고양이"라는 별명처럼 안겨있을 때 몸을 완전히
                이완시키는 특징이 있습니다. 강아지처럼 반려인을 따라다니고
                애교가 많아 "댕댕이 같은 냥이"로 불립니다. 초보 집사에게 강력
                추천됩니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🔥 벵갈 (Bengal) - "열정 폭발형" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed">
                야생 표범을 닮은 외모만큼 활동적입니다. 높은 곳 오르기·물놀이
                등을 즐기며, 하루에 최소 1시간 이상 놀아줘야 합니다. 지루하면
                가구를 파괴하는 경향이 있어 부지런한 반려인에게 적합합니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🎩 러시안블루 (Russian Blue) - "신비의 은둔자" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 Low · 친화성 Low · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed">
                조용하고 신중한 성격으로, 낯선 사람이 오면 반드시 숨습니다.
                하지만 신뢰한 가족에게는 조용한 애정을 표현합니다. 큰 소리에
                예민하므로 조용한 1인 가구·시니어 반려인에게 잘 맞습니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🌟 메인쿤 (Maine Coon) - "온화한 수호자" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 High · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                "고양이계의 골든 리트리버"로 불립니다. 거대한 몸집(수컷
                최대 12kg)과 달리 매우 온순하고 아이들과도 잘 지냅니다.
                낯선 이에게도 우호적이며 지능이 높아 클리커 훈련도 가능합니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                🎭 샴 (Siamese) - "카리스마 리더" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 High · 사교성 High · 친화성 High · 침착성 Low
              </p>
              <p className="text-neutral-700 leading-relaxed">
                수다쟁이 고양이로 유명합니다. 하루종일 반려인에게 말을 걸며
                (야옹 소리로) 관심을 요구합니다. 극도로 사교적이지만 혼자
                두면 분리불안을 겪을 수 있으니 다묘 가정이 좋습니다.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <h3 className="text-lg font-bold mb-2">
                👑 페르시안 (Persian) - "고귀한 관찰자" 유형
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                활력 Low · 사교성 Low · 친화성 High · 침착성 High
              </p>
              <p className="text-neutral-700 leading-relaxed">
                우아하고 조용한 성격의 대표주자입니다. 소파에서 종일 자는
                것을 좋아하며, 자극적인 놀이보다는 조용히 쓰다듬어주는 것을
                선호합니다. 조용한 가정 환경이 필수입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔬</span> 고양이 성격을 결정짓는
            결정적 요인
          </h2>

          <div className="space-y-5">
            <div className="p-5 bg-white rounded-xl border-l-4 border-purple-400">
              <h3 className="text-lg font-bold mb-2">
                🧬 유전 - 아빠 고양이의 영향력
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                흥미롭게도 고양이는 <strong>부계 유전</strong>이 성격에 큰
                영향을 미친다는 연구가 있습니다. 사교적인 아빠 고양이의 새끼는
                엄마를 만나본 적이 없어도 사교적으로 자랄 확률이 높습니다.
                분양 시 아빠 고양이의 성격도 확인해보세요.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-pink-400">
              <h3 className="text-lg font-bold mb-2">
                ⏰ 사회화 시기 - 2~7주의 마법
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                고양이의 사회화 결정적 시기는 <strong>생후 2~7주</strong>로,
                강아지보다 훨씬 짧고 이릅니다. 이 시기에 사람과 다양한 자극에
                노출된 고양이는 평생 사교적으로 자랍니다. 이 시기를 놓치면
                아무리 애정을 쏟아도 사교성이 크게 개선되지 않을 수 있습니다.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border-l-4 border-blue-400">
              <h3 className="text-lg font-bold mb-2">
                🏠 성장 환경 - 실내 vs 실외
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                실내에서만 자란 고양이는 자극이 적어 침착성 High 성향이
                강해지고, 실외 경험이 있는 고양이는 활력·사교성이 발달합니다.
                또한 다묘 가정에서 자란 고양이는 사교성이 크게 향상됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">👀</span> 우리 냥이 성격을 파악하는
            5가지 신호
          </h2>

          <div className="grid gap-4">
            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">🐾 신호 1: 꼬리의 위치</h3>
              <p className="text-sm text-neutral-700">
                → 꼬리를 곧게 세우고 다가온다면 <strong>사교성·친화성
                High</strong>. 낮게 늘어뜨리거나 부풀린다면 <strong>침착성
                Low</strong> 또는 경계 상태
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">😴 신호 2: 자는 자세</h3>
              <p className="text-sm text-neutral-700">
                → 배를 보이고 자면 <strong>친화성·침착성 High</strong> (극도의
                신뢰). 몸을 웅크리고 잔다면 경계심이 남아있는 상태
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">🗣 신호 3: 야옹 빈도</h3>
              <p className="text-sm text-neutral-700">
                → 자주 야옹거리며 대화하려 한다면 <strong>사교성·친화성
                High</strong>. 조용한 고양이는 <strong>사교성 Low</strong>{" "}
                또는 침착성 High
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">🎾 신호 4: 놀이 반응</h3>
              <p className="text-sm text-neutral-700">
                → 낚싯대 장난감에 격렬히 반응하면 <strong>활력 High</strong>.
                한두 번 쳐다보고 무시하면 <strong>활력 Low</strong>
              </p>
            </div>

            <div className="p-5 bg-cream rounded-xl">
              <h3 className="font-bold mb-2">🚪 신호 5: 손님이 왔을 때</h3>
              <p className="text-sm text-neutral-700">
                → 나와서 인사하면 <strong>사교성 High</strong>. 침대 밑에
                숨는다면 <strong>사교성 Low</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Fun fact */}
        <section className="mb-10 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
          <h2 className="text-xl font-bold mb-3">
            💡 재미있는 사실: 고양이의 "느린 눈 깜빡임"
          </h2>
          <p className="leading-relaxed text-neutral-700">
            고양이가 여러분을 바라보며 천천히 눈을 깜빡인다면{" "}
            <strong>"고양이 뽀뽀(Kitty Kiss)"</strong>를 보내는 중입니다. 이는
            극도의 애정과 신뢰의 표현이며, 여러분도 똑같이 천천히 눈을
            깜빡여주면 대화가 됩니다. 이 신호를 자주 보내는 고양이는{" "}
            <strong>친화성 High</strong> 성향이 강합니다.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-10 p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            🐱 우리 고양이는 어떤 유형일까?
          </h2>
          <p className="mb-6 opacity-95">
            36개 정밀 질문으로 우리 고양이의 16가지 유형 중 하나를 정확히
            찾아드립니다. 무료 · 3분 소요 · 7개 언어 지원
          </p>
          <Link
            href={`/${locale}/quiz`}
            className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:scale-105 transition"
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
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
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
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
            >
              <h3 className="font-bold mb-1">🐶 강아지 성격 유형 완벽 가이드</h3>
              <p className="text-sm text-neutral-600">
                견종별 성격 특징과 4가지 축으로 알아보는 강아지
              </p>
            </Link>
            <Link
              href={`/${locale}/blog/pet-owner-compatibility`}
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
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
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
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
