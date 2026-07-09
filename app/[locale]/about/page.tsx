// app/[locale]/about/page.tsx
// About 페이지 - AdSense 승인용 사이트 신뢰도 콘텐츠

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PawType-16 | 우리는 왜 반려동물 성격 테스트를 만드는가",
  description:
    "PawType-16은 헬싱키 대학교와 옥스퍼드 대학교의 반려동물 성격 연구를 기반으로 한 과학적 성격 궁합 진단 서비스입니다. Big Five 행동과학으로 나와 반려동물의 케미를 알아보세요.",
  openGraph: {
    title: "About PawType-16 | 반려동물 성격 궁합 테스트",
    description:
      "Big Five 행동과학 기반, 16가지 유형으로 나와 반려동물의 궁합을 진단합니다.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="text-5xl mb-4">🐾</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-3">
          About PawType-16
        </h1>
        <p className="text-lg text-neutral-600">
          우리는 왜 반려동물 성격 궁합 테스트를 만드는가
        </p>
      </header>

      {/* 서비스 소개 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          🌟 PawType-16이란?
        </h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          <strong>PawType-16</strong>은 반려동물과 보호자의 성격 궁합을
          진단하는 세계 최초의 다국어 반려동물 심리 검사 서비스입니다. 사람에게
          MBTI가 있다면, 반려동물에게는 PawType-16이 있습니다. 우리는{" "}
          <strong>헬싱키 대학교(University of Helsinki)</strong>와{" "}
          <strong>옥스퍼드 대학교(University of Oxford)</strong>의 반려동물
          성격 연구를 기반으로, Big Five 행동과학 이론을 반려동물-보호자 관계에
          맞게 재해석하여 16가지 케미스토리 유형을 개발했습니다.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          단순한 재미 퀴즈가 아닙니다. 실제 반려견의{" "}
          <em>Canine Big Five</em> 성격 모델과 반려묘의 <em>Feline Five</em>
          모델을 통합하여, 활력(Energy)·사교성(Sociability)·친화성(Agreeableness)·침착성(Calmness)의
          4가지 축으로 우리 아이의 성향을 정확히 진단합니다.
        </p>
      </section>

      {/* 과학적 근거 */}
      <section className="mb-10 bg-orange-50 rounded-2xl p-6 border border-orange-100">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          🔬 과학적 근거
        </h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          우리의 진단 시스템은 다음과 같은 실증 연구를 기반으로 합니다:
        </p>
        <ul className="space-y-3 text-neutral-700">
          <li>
            <strong>Canine Big Five (Jones & Gosling, 2005):</strong> 반려견의
            성격을 5가지 축으로 분류한 최초의 실증 연구
          </li>
          <li>
            <strong>Feline Five (Litchfield et al., 2017):</strong> 호주와
            뉴질랜드의 2,802마리 고양이 데이터 기반 성격 모델
          </li>
          <li>
            <strong>Helsinki Behavioral Study (2020):</strong> 헬싱키 대학교의
            대규모 반려견 행동 유형 조사 (13,000마리 이상)
          </li>
          <li>
            <strong>Owner-Pet Compatibility Research:</strong> 보호자와
            반려동물의 성격 궁합이 반려동물 웰빙에 미치는 영향 연구
          </li>
        </ul>
      </section>

      {/* 우리의 미션 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          💛 우리의 미션
        </h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          우리는 <strong>&quot;모든 반려인이 자신의 반려동물을 더 깊이
          이해할 수 있도록&quot;</strong>이라는 미션을 가지고 있습니다.
        </p>
        <p className="text-neutral-700 leading-relaxed mb-4">
          많은 보호자들이 반려동물의 행동 문제로 고민합니다. &quot;왜 우리
          아이는 산책을 싫어할까?&quot;, &quot;왜 낯선 사람이 오면 짖을까?&quot;,
          &quot;왜 다른 고양이랑 어울리지 못할까?&quot; — 이런 질문들의 답은
          대부분 <strong>반려동물의 성격 유형</strong>과{" "}
          <strong>보호자와의 궁합</strong>에서 찾을 수 있습니다.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          PawType-16은 이런 문제들을 해결하기 위해 태어났습니다. 우리는 재미있는
          검사를 통해 보호자가 자연스럽게 반려동물을 이해하고, 더 나은 관계를
          만들 수 있도록 돕고자 합니다.
        </p>
      </section>

      {/* 16가지 유형 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          🎯 16가지 케미스토리 유형
        </h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          4가지 성격 축 각각의 High/Low 조합으로 총{" "}
          <strong>16가지 유형</strong>이 나옵니다. 각 유형은 고유의 강점,
          주의점, 추천 활동을 가지고 있습니다.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-neutral-50 p-3 rounded-lg">
            <strong className="text-orange-600">E - Energy</strong>
            <p className="text-sm text-neutral-600 mt-1">
              활력: 활동적 vs 차분한
            </p>
          </div>
          <div className="bg-neutral-50 p-3 rounded-lg">
            <strong className="text-orange-600">S - Sociability</strong>
            <p className="text-sm text-neutral-600 mt-1">
              사교성: 외향적 vs 내향적
            </p>
          </div>
          <div className="bg-neutral-50 p-3 rounded-lg">
            <strong className="text-orange-600">A - Agreeableness</strong>
            <p className="text-sm text-neutral-600 mt-1">
              친화성: 다정함 vs 독립적
            </p>
          </div>
          <div className="bg-neutral-50 p-3 rounded-lg">
            <strong className="text-orange-600">C - Calmness</strong>
            <p className="text-sm text-neutral-600 mt-1">
              침착성: 안정적 vs 예민한
            </p>
          </div>
        </div>
        <p className="text-neutral-700 leading-relaxed">
          각 축이 High(H) 또는 Low(L)로 조합되어 HHHH(궁극의 낙천가)부터
          LLLL(신비의 은둔자)까지 16가지 독특한 케미가 만들어집니다.
        </p>
      </section>

      {/* 팀 소개 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          👥 만든 사람들
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          PawType-16은 <strong>큰바구니 (Modoomodoo)</strong>에서 개발하고
          운영하고 있습니다. 우리 팀은 반려동물 행동학, 데이터 사이언스, 그리고
          웹 개발 전문가들로 구성되어 있으며, 전 세계 반려인들의 삶을 더
          풍요롭게 만들기 위해 매일 노력하고 있습니다.
        </p>
      </section>

      {/* 다국어 지원 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          🌐 7개 언어 지원
        </h2>
        <p className="text-neutral-700 leading-relaxed mb-3">
          PawType-16은 전 세계 반려인들이 사용할 수 있도록{" "}
          <strong>7개 언어</strong>를 지원합니다:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇰🇷 한국어
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇺🇸 English
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇯🇵 日本語
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇨🇳 中文
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇪🇸 Español
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇩🇪 Deutsch
          </div>
          <div className="bg-neutral-50 p-2 rounded text-center">
            🇸🇦 العربية
          </div>
        </div>
      </section>

      {/* 문의 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          📧 문의하기
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          서비스 관련 문의, 협업 제안, 언론 취재 등은 아래 이메일로 연락 주세요:
        </p>
        <p className="mt-3 text-neutral-700">
          📮{" "}
          <a
            href="mailto:pawtype16@gmail.com"
            className="text-orange-600 underline hover:text-orange-700"
          >
            pawtype16@gmail.com
          </a>
        </p>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
          지금 바로 시작해보세요!
        </h2>
        <p className="text-neutral-600 mb-5">
          3분이면 우리만의 케미 유형을 확인할 수 있어요.
        </p>
        <Link
          href="/ko/quiz"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
        >
          무료로 검사 시작 →
        </Link>
      </section>
    </main>
  );
}
