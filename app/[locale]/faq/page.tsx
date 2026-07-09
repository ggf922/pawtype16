// app/[locale]/faq/page.tsx
// FAQ 페이지 - 자주 묻는 질문 (AdSense 승인 필수 콘텐츠)

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 FAQ | PawType-16",
  description:
    "PawType-16 반려동물 성격 궁합 테스트에 대한 자주 묻는 질문 12가지. 검사 정확성, 결과 해석, 개인정보, 광고 정책 등에 대해 확인하세요.",
  openGraph: {
    title: "자주 묻는 질문 FAQ | PawType-16",
    description:
      "반려동물 성격 테스트에 대한 궁금증을 모두 해결해 드립니다.",
    type: "article",
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "🐾 PawType-16 검사는 정말 과학적인가요?",
    answer:
      "네, PawType-16은 헬싱키 대학교와 옥스퍼드 대학교의 반려동물 성격 연구를 기반으로 합니다. 특히 반려견의 Canine Big Five 모델(Jones & Gosling, 2005)과 반려묘의 Feline Five 모델(Litchfield et al., 2017)을 통합하여 개발되었습니다. 다만 검사 결과는 반려동물의 일반적 성향을 이해하는 참고 자료로 활용해 주시고, 실제 행동 문제 진단이 필요하시면 반드시 수의사나 전문 행동학자와 상담하시기 바랍니다.",
  },
  {
    question: "⏱ 검사 시간이 얼마나 걸리나요?",
    answer:
      "약 3분 정도 소요됩니다. 보호자에 대한 12문항, 반려동물에 대한 13문항으로 총 25문항으로 구성되어 있으며, 문항이 짧고 명확해서 빠르게 완료할 수 있습니다. 중간에 검사를 중단하셔도 이어서 진행하실 수 있습니다.",
  },
  {
    question: "💰 검사가 정말 무료인가요? 결제가 필요한가요?",
    answer:
      "네, 완전 무료입니다. 회원가입 없이도 검사를 진행하고 결과를 확인할 수 있습니다. 단, 결과를 영구적으로 저장하고 마이페이지에서 히스토리를 관리하려면 소셜 로그인이 필요합니다. 로그인도 무료이며, 어떤 결제도 요구하지 않습니다.",
  },
  {
    question: "🐕🐈 강아지와 고양이 모두 검사할 수 있나요?",
    answer:
      "네, 강아지(반려견)와 고양이(반려묘) 모두 검사 가능합니다. 검사 시작 시 우리 아이가 강아지인지 고양이인지 선택하시면, 각 종에 맞는 맞춤 문항이 제공됩니다. 강아지는 Canine Big Five, 고양이는 Feline Five 모델을 기반으로 진단합니다. 현재는 개와 고양이만 지원하며, 추후 소동물(햄스터, 토끼 등)로 확장할 예정입니다.",
  },
  {
    question: "📊 결과는 어떻게 해석하나요?",
    answer:
      "결과는 크게 3가지로 구성됩니다. 첫째, 궁합 점수(0-100점)로 나와 반려동물의 성격 매치 정도를 보여줍니다. 둘째, 4가지 축(활력·사교성·친화성·침착성)의 High/Low 조합으로 16가지 유형 중 하나가 도출됩니다. 셋째, 각 유형별 강점·주의점·추천 활동이 함께 제공됩니다. 궁합 점수가 낮다고 나쁜 관계라는 뜻이 아니라, 서로 다른 성격이 만나는 것이 자연스럽고, 그에 맞는 관계 관리 팁을 참고하시면 됩니다.",
  },
  {
    question: "🔒 개인정보는 어떻게 보호되나요?",
    answer:
      "우리는 최소한의 정보만 수집하며, 이를 매우 신중하게 관리합니다. 검사 응답은 결과 생성을 위해서만 사용되고, 저장 시에도 익명화됩니다. 소셜 로그인 시 이메일 주소만 수집하며, 이는 결과 저장과 로그인 인증 외 다른 용도로 사용되지 않습니다. 자세한 내용은 <a href='/ko/privacy' class='text-orange-600 underline'>개인정보처리방침</a>을 참고해 주세요.",
  },
  {
    question: "🌐 어떤 언어를 지원하나요?",
    answer:
      "현재 7개 언어를 지원합니다: 한국어, 영어, 일본어, 중국어(간체), 스페인어, 독일어, 아랍어. URL의 언어 코드(/ko, /en, /ja, /zh, /es, /de, /ar)를 통해 언어를 전환할 수 있으며, 페이지 상단의 언어 선택 버튼으로도 쉽게 변경 가능합니다.",
  },
  {
    question: "🔄 검사를 여러 번 반복해도 되나요?",
    answer:
      "네, 얼마든지 반복하셔도 됩니다. 실제로 반려동물의 나이·환경·건강 상태에 따라 성격이 변할 수 있으므로, 6개월-1년마다 재검사하시는 것을 권장합니다. 로그인 상태에서 검사하시면 마이페이지에서 시간대별 결과 변화를 비교할 수 있습니다.",
  },
  {
    question: "📱 광고가 나오는데, 이건 뭔가요?",
    answer:
      "PawType-16은 무료 서비스를 유지하기 위해 광고 수익 모델을 채택하고 있습니다. 우리는 Google AdSense와 Kakao AdFit을 통해 광고를 게재하며, 이 광고들은 서비스 운영과 지속적인 개선을 위해 사용됩니다. 광고 내용은 우리가 직접 선택하지 않으며, 광고 클릭 여부는 전적으로 사용자의 선택입니다. 광고가 방문 경험을 방해하지 않도록 최소한의 위치에만 배치하려 노력하고 있습니다.",
  },
  {
    question: "🎯 검사 결과에서 잘 맞지 않는 유형이라고 나왔는데, 어떻게 해야 하나요?",
    answer:
      "궁합 점수가 낮게 나오거나 &quot;조심할 케미&quot;로 분류되었다고 나쁜 관계라는 뜻이 아닙니다. 오히려 서로 다른 성격이 만나 배울 수 있는 것이 더 많다는 의미로 해석하는 것이 좋습니다. 결과 페이지에 각 유형별 &quot;살짝 조심할 점&quot;과 &quot;추천 활동&quot;이 제공되므로, 이를 참고해서 반려동물과의 소통 방식을 조금씩 조정해 보세요. 대부분의 궁합 문제는 이해와 배려로 해결됩니다.",
  },
  {
    question: "🔗 검사 결과를 친구에게 공유할 수 있나요?",
    answer:
      "네, 결과 페이지 하단의 공유 버튼을 통해 카카오톡, 트위터(X), 페이스북, 링크 복사 등 다양한 방법으로 공유할 수 있습니다. 공유 링크에는 검사 결과가 인코딩되어 있어, 친구가 링크를 클릭하면 같은 결과를 확인할 수 있습니다. 검사한 반려동물의 이름이 함께 표시되므로 대화의 시작점이 됩니다.",
  },
  {
    question: "❓ 검사 도중 문제가 생기면 어떻게 하나요?",
    answer:
      "검사 진행 중 오류가 발생하면 페이지를 새로고침하거나, 브라우저의 캐시를 삭제한 후 다시 시도해 보세요. 문제가 계속 발생하면 <a href='mailto:pawtype16@gmail.com' class='text-orange-600 underline'>pawtype16@gmail.com</a>으로 상세한 상황을 이메일 보내주시면 최대한 빨리 해결해 드리겠습니다. 스크린샷을 함께 보내주시면 더 빠른 진단이 가능합니다.",
  },
];

export default function FAQPage() {
  // JSON-LD 구조화 데이터 (Google 리치 스니펫)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question.replace(/^[^\s]+ /, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]+>/g, ""),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="mx-auto max-w-3xl px-5 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-3">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-neutral-600">
            PawType-16 서비스에 대한 궁금증을 모두 해결해 드립니다
          </p>
        </header>

        {/* FAQ List */}
        <section className="space-y-4 mb-12">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-neutral-200 rounded-2xl p-5 hover:border-orange-300 transition open:border-orange-400 open:shadow-md"
            >
              <summary className="cursor-pointer font-bold text-neutral-800 flex items-center justify-between gap-3">
                <span className="flex-1">{faq.question}</span>
                <span className="text-orange-500 group-open:rotate-180 transition-transform text-lg">
                  ▼
                </span>
              </summary>
              <div
                className="mt-4 text-neutral-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </section>

        {/* 추가 문의 CTA */}
        <section className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            원하는 답을 못 찾으셨나요?
          </h2>
          <p className="text-neutral-600 mb-5">
            언제든 이메일로 문의해 주세요. 최대한 빨리 답변드리겠습니다.
          </p>
          <a
            href="mailto:pawtype16@gmail.com"
            className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
          >
            📧 이메일 문의하기
          </a>
          <div className="mt-6">
            <Link
              href="/ko/quiz"
              className="text-sm text-neutral-600 underline hover:text-orange-600"
            >
              또는 지금 바로 검사 시작하기 →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
