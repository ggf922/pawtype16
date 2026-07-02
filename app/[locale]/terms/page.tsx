import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, isLocale } from "../../lib/i18n";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import AuthButton from "../../components/AuthButton";

export const metadata: Metadata = {
  title: "이용약관 · PawType-16",
  description: "PawType-16 서비스 이용약관",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-beige">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
          <div className="flex items-center gap-3">
            <LocaleSwitcher current={locale} />
            <AuthButton locale={locale} />
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal">
          이용약관
        </h1>
        <p className="mt-3 text-sm text-charcoal/60">
          시행일: 2026년 7월 2일
        </p>

        <div className="mt-10 space-y-8 text-charcoal/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 큰바구니(브랜드명 &ldquo;모두모두&rdquo;, 이하 &ldquo;회사&rdquo;)가 운영하는
              PawType-16(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와
              이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
              목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제2조 (정의)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                &ldquo;서비스&rdquo;란 회사가 제공하는 PawType-16 성향 분석 및
                반려동물 궁합 진단 웹서비스를 의미합니다.
              </li>
              <li>
                &ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 회원 및
                비회원을 말합니다.
              </li>
              <li>
                &ldquo;회원&rdquo;이란 Google 소셜 로그인을 통해 회사와
                서비스이용계약을 체결한 자를 말합니다.
              </li>
              <li>
                &ldquo;콘텐츠&rdquo;란 진단 문항, 결과 리포트, 이미지, 텍스트 등
                서비스에서 제공하는 모든 자료를 말합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
                공지함으로써 효력을 발생합니다.
              </li>
              <li>
                회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
                변경할 수 있으며, 변경 시 개정 내용과 시행일을 최소 7일 전에
                공지합니다. 다만, 이용자에게 불리한 변경의 경우에는 최소 30일
                전에 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제4조 (서비스의 제공)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>회사는 다음과 같은 서비스를 제공합니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Big Five 기반 반려인-반려동물 성향 궁합 진단</li>
                  <li>16가지 케미스토리 유형별 결과 리포트</li>
                  <li>진단 이력 저장 및 조회 (회원 한정)</li>
                  <li>외부 반려동물 관련 쇼핑몰 링크 제공</li>
                  <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
                </ul>
              </li>
              <li>
                서비스는 연중무휴 24시간 제공을 원칙으로 하나, 시스템 점검·
                교체·장애 발생 시 일시적으로 중단될 수 있습니다.
              </li>
              <li>
                회사는 향후 프리미엄 리포트 등 유료 서비스를 추가할 수 있으며,
                이 경우 별도의 약관 및 이용료 안내를 통해 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제5조 (회원가입 및 계정)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                이용자는 회사가 정한 절차(Google 소셜 로그인 등)에 따라 회원가입을
                신청할 수 있으며, 회사가 이를 승낙함으로써 회원가입이 완료됩니다.
              </li>
              <li>
                회원은 자신의 계정정보를 선량한 관리자의 주의로 관리하여야 하며,
                이를 제3자에게 이용하게 하거나 양도, 대여, 매매할 수 없습니다.
              </li>
              <li>
                회원은 언제든지 회원 탈퇴를 요청할 수 있으며, 회사는 관계법령이
                정하는 바에 따라 즉시 처리합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제6조 (콘텐츠의 저작권)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                서비스가 제공하는 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사에
                귀속됩니다.
              </li>
              <li>
                이용자는 회사의 사전 서면 승인 없이 콘텐츠를 복제·전송·출판·
                배포·방송 기타의 방법으로 이용하거나 제3자에게 이용하게 할 수
                없습니다.
              </li>
              <li>
                이용자가 서비스 내에서 작성한 진단 결과 및 개인 데이터는 이용자
                본인의 것이며, 회사는 개인정보처리방침에 따라 이를 보호합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제7조 (서비스의 성격 및 면책)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                본 서비스는 Big Five 성격 이론 등의 학술 연구를 참고한
                <strong className="text-cocoa"> 라이프스타일 궁합 가이드</strong>이며,
                수의학적·심리학적·의학적 진단 도구가 아닙니다.
              </li>
              <li>
                반려동물의 건강 상태, 행동 문제, 훈련 관련 결정은 반드시
                <strong className="text-cocoa"> 수의사 또는 전문가</strong>와 상담
                하시기 바랍니다.
              </li>
              <li>
                회사는 이용자가 서비스 결과에 기반하여 내린 판단·행동·결정에
                대해 법적 책임을 지지 않습니다.
              </li>
              <li>
                회사는 천재지변, 불가항력, 이용자의 귀책사유, 통신망 장애 등으로
                발생한 손해에 대하여 책임을 지지 않습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제8조 (이용자의 의무)
            </h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 무단 변경</li>
              <li>회사 및 제3자의 저작권 등 지적재산권 침해</li>
              <li>서비스의 안정적 운영을 방해하는 행위</li>
              <li>기타 관계법령에 위반되는 행위</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제9조 (외부 링크)
            </h2>
            <p>
              서비스에는 회사가 운영하는 다른 서비스 또는 제휴사 사이트로의 링크가
              포함될 수 있습니다. 링크된 외부 사이트에서 제공하는 상품·서비스에
              관한 거래는 이용자와 해당 사이트 운영자 간에 이루어지며, 회사는
              해당 거래에 대한 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              제10조 (준거법 및 재판관할)
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                본 약관의 해석 및 회사와 이용자 간의 분쟁에 관하여는 대한민국
                법령을 적용합니다.
              </li>
              <li>
                서비스 이용과 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우,
                민사소송법에 따른 관할법원에 소를 제기할 수 있습니다.
              </li>
            </ol>
          </section>

          {/* 부칙 및 사업자 정보 */}
          <section className="mt-10 pt-8 border-t border-beige">
            <h2 className="text-lg font-bold text-charcoal mb-4">
              사업자 정보
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="font-medium text-charcoal/60">상호</dt>
              <dd>큰바구니 (브랜드: 모두모두)</dd>


              <dt className="font-medium text-charcoal/60">대표자</dt>
              <dd>임몽규</dd>

              <dt className="font-medium text-charcoal/60">소재지</dt>
              <dd>경기도 시흥시</dd>

              <dt className="font-medium text-charcoal/60">사업자등록번호</dt>
              <dd>806-58-00641</dd>

              <dt className="font-medium text-charcoal/60">통신판매업신고</dt>
              <dd>제2024-경기시흥-1913호</dd>

              <dt className="font-medium text-charcoal/60">대표 전화</dt>
              <dd>010-8265-1123</dd>

              <dt className="font-medium text-charcoal/60">이메일</dt>
              <dd>
                <a
                  href="mailto:modoomodoo88@gmail.com"
                  className="text-accent hover:underline"
                >
                  modoomodoo88@gmail.com
                </a>
              </dd>
            </dl>
            <p className="mt-6 text-sm text-charcoal/60">
              부칙: 본 약관은 2026년 7월 2일부터 시행됩니다.
            </p>
          </section>

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-beige flex flex-wrap gap-4 text-sm">
            <Link
              href={`/${locale}/privacy`}
              className="text-accent hover:underline"
            >
              개인정보처리방침 →
            </Link>
            <Link
              href={`/${locale}`}
              className="text-charcoal/60 hover:text-charcoal"
            >
              ← 홈으로
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
