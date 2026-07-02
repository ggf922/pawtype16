import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, isLocale } from "../../lib/i18n";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import AuthButton from "../../components/AuthButton";

export const metadata: Metadata = {
  title: "개인정보처리방침 · PawType-16",
  description: "PawType-16 개인정보처리방침",
};

export default async function PrivacyPage({
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
          개인정보처리방침
        </h1>
        <p className="mt-3 text-sm text-charcoal/60">
          시행일: 2026년 7월 2일
        </p>

        <div className="mt-6 rounded-2xl bg-white border border-beige p-5 text-sm text-charcoal/80 leading-relaxed">
          <p>
            <strong className="text-cocoa">큰바구니</strong>(브랜드명 &ldquo;모두모두&rdquo;, 이하 &ldquo;회사&rdquo;)는
            이용자의 개인정보를 소중히 여기며,
            「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은
            <strong className="text-cocoa"> PawType-16</strong> 서비스에서
            수집·이용·보관·파기하는 개인정보에 대해 안내합니다.
          </p>
        </div>

        <div className="mt-10 space-y-8 text-charcoal/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              1. 수집하는 개인정보 항목
            </h2>
            <p>회사는 다음의 개인정보 항목을 수집합니다.</p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-beige bg-white">
              <table className="w-full text-sm">
                <thead className="text-charcoal/60 border-b border-beige">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium">구분</th>
                    <th className="py-3 px-4 text-left font-medium">수집 항목</th>
                    <th className="py-3 px-4 text-left font-medium">수집 시점</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-beige/60">
                    <td className="py-3 px-4 font-medium">필수</td>
                    <td className="py-3 px-4">이메일, 이름, 프로필 사진 URL</td>
                    <td className="py-3 px-4">Google 소셜 로그인 시</td>
                  </tr>
                  <tr className="border-b border-beige/60">
                    <td className="py-3 px-4 font-medium">서비스 이용</td>
                    <td className="py-3 px-4">
                      반려동물 이름, 종류(개/고양이), 진단 답변, 결과 코드,
                      매칭 점수
                    </td>
                    <td className="py-3 px-4">서비스 이용 시</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">자동 수집</td>
                    <td className="py-3 px-4">
                      접속 IP, 쿠키, 브라우저·OS 정보, 접속 일시
                    </td>
                    <td className="py-3 px-4">서비스 이용 시</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm text-charcoal/60">
              ※ 회사는 사상, 신념, 노동조합·정당의 가입·탈퇴, 정치적 성향,
              건강 및 성생활 등 민감정보는 수집하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              2. 개인정보의 수집 및 이용 목적
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>회원 식별 및 서비스 이용 인증</li>
              <li>PawType-16 진단 결과 제공 및 결과 이력 저장</li>
              <li>서비스 개선 및 통계 분석 (비식별 형태)</li>
              <li>고객 문의 대응 및 공지사항 전달</li>
              <li>부정 이용 방지 및 서비스 안정성 확보</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                회원의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 요청 시
                지체 없이 파기합니다.
              </li>
              <li>
                단, 다음의 경우에는 관련 법령이 정한 기간 동안 보관합니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    표시·광고에 관한 기록: 6개월 (전자상거래 등에서의 소비자
                    보호에 관한 법률)
                  </li>
                  <li>
                    계약 또는 청약철회 등에 관한 기록: 5년 (동법)
                  </li>
                  <li>
                    대금결제 및 재화 등의 공급에 관한 기록: 5년 (동법)
                  </li>
                  <li>
                    소비자 불만 또는 분쟁처리에 관한 기록: 3년 (동법)
                  </li>
                  <li>
                    접속 로그 기록: 3개월 (통신비밀보호법)
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              4. 개인정보의 제3자 제공
            </h2>
            <p>
              회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다.
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>
                법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와
                방법에 따라 수사기관의 요구가 있는 경우
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              5. 개인정보 처리업무의 위탁
            </h2>
            <p>
              회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리업무를
              위탁하고 있습니다.
            </p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-beige bg-white">
              <table className="w-full text-sm">
                <thead className="text-charcoal/60 border-b border-beige">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium">수탁업체</th>
                    <th className="py-3 px-4 text-left font-medium">위탁 업무</th>
                    <th className="py-3 px-4 text-left font-medium">보유 국가</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-beige/60">
                    <td className="py-3 px-4">Supabase Inc.</td>
                    <td className="py-3 px-4">데이터베이스, 인증 시스템</td>
                    <td className="py-3 px-4">미국(AWS 서울 리전 옵션)</td>
                  </tr>
                  <tr className="border-b border-beige/60">
                    <td className="py-3 px-4">Vercel Inc.</td>
                    <td className="py-3 px-4">웹 호스팅 및 배포</td>
                    <td className="py-3 px-4">미국</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Google LLC</td>
                    <td className="py-3 px-4">소셜 로그인 인증</td>
                    <td className="py-3 px-4">미국</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-charcoal/60">
              ※ 위 수탁업체들은 개인정보 보호 관련 법령을 준수하며, 회사와의
              계약을 통해 개인정보 보호 의무를 이행합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              6. 개인정보의 국외 이전
            </h2>
            <p>
              회사는 서비스 제공을 위해 이용자의 개인정보를 국외로 이전할 수
              있습니다. 이전되는 정보의 항목, 이전받는 자, 이전 국가, 이전 시기
              및 방법은 위 &ldquo;5. 개인정보 처리업무의 위탁&rdquo; 항목을 참고
              하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              7. 이용자의 권리와 행사 방법
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
                삭제·처리정지 및 회원 탈퇴를 요청할 수 있습니다.
              </li>
              <li>
                권리 행사는 서비스 내 &ldquo;내 페이지&rdquo;에서 직접 진행하거나,
                이메일(
                <a
                  href="mailto:modoomodoo88@gmail.com"
                  className="text-accent hover:underline"
                >
                  modoomodoo88@gmail.com
                </a>
                )을 통해 요청하실 수 있습니다.
              </li>
              <li>
                이용자의 권리 행사 요청에 대해 회사는 지체 없이 조치를 취하며,
                절차 진행 상황을 안내드립니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              8. 개인정보의 파기 절차 및 방법
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>파기 절차:</strong> 이용자가 회원 탈퇴 또는 서비스 이용
                종료 등의 사유가 발생한 개인정보는 관련 법령에 따른 보관 기간이
                경과한 후 지체 없이 파기됩니다.
              </li>
              <li>
                <strong>파기 방법:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    전자적 파일 형태: 복구 및 재생이 불가능한 방법으로 영구 삭제
                  </li>
                  <li>
                    서면 문서: 분쇄기로 분쇄하거나 소각
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              9. 쿠키(Cookie)의 운영
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                회사는 이용자에게 맞춤 서비스를 제공하기 위해 쿠키를 사용합니다.
              </li>
              <li>
                쿠키는 웹사이트를 운영하는 데 이용되는 서버가 이용자의 브라우저에
                보내는 소량의 정보이며, 이용자의 컴퓨터 하드디스크에 저장됩니다.
              </li>
              <li>
                이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이
                경우 로그인이 필요한 일부 서비스 이용에 제한이 있을 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              10. 개인정보의 안전성 확보 조치
            </h2>
            <p>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취합니다.
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 임직원 교육</li>
              <li>
                기술적 조치: 개인정보 처리 시스템 접근권한 관리, 접근통제시스템
                설치, 고유식별정보 등의 암호화, 보안프로그램 설치
              </li>
              <li>물리적 조치: 전산실·자료보관실 등의 접근통제</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              11. 개인정보 보호책임자
            </h2>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>

            <div className="mt-4 rounded-2xl bg-white border border-beige p-5">
              <dl className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="font-medium text-charcoal/60">성명</dt>
                <dd>임몽규</dd>

                <dt className="font-medium text-charcoal/60">직책</dt>
                <dd>대표자</dd>

                <dt className="font-medium text-charcoal/60">전화</dt>
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
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              12. 권익침해 구제방법
            </h2>
            <p>
              개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에
              문의하실 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                개인정보분쟁조정위원회 (privacy.go.kr / ☎ 1833-6972)
              </li>
              <li>
                개인정보침해신고센터 (privacy.kisa.or.kr / ☎ 118)
              </li>
              <li>
                대검찰청 사이버범죄수사단 (spo.go.kr / ☎ 1301)
              </li>
              <li>
                경찰청 사이버안전국 (cyberbureau.police.go.kr / ☎ 182)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">
              13. 개인정보처리방침의 변경
            </h2>
            <p>
              본 방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의
              추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
              공지사항을 통해 고지합니다.
            </p>
          </section>

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-beige flex flex-wrap gap-4 text-sm">
            <Link
              href={`/${locale}/terms`}
              className="text-accent hover:underline"
            >
              이용약관 →
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
