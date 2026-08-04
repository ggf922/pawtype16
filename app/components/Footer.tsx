"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

/**
 * 사이트 전체 푸터 컴포넌트 v3
 * - AdSense 승인 필수: 개인정보처리방침·이용약관·문의하기 링크 필수
 * - 견종별 블로그 5개 링크 추가 (SEO 강화)
 * - Contact 페이지 링크 연결 (mailto → /contact)
 * - 다국어 지원
 */

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || "ko";

  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* 브랜드 섹션 */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-lg font-bold text-neutral-800">
              PawType-16
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            반려동물 성격 궁합 테스트 · Big Five 행동과학 기반
          </p>
        </div>

        {/* 링크 섹션 */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">서비스</h3>
            <ul className="space-y-1 text-neutral-600">
              <li>
                <Link href={`/${locale}`} className="hover:text-orange-600 transition">
                  홈
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/quiz`} className="hover:text-orange-600 transition">
                  검사 시작
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/types`} className="hover:text-orange-600 transition">
                  16가지 유형 도감
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">블로그</h3>
            <ul className="space-y-1 text-neutral-600">
              <li>
                <Link href={`/${locale}/blog/pet-personality-guide`} className="hover:text-orange-600 transition">
                  성격 분석법
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/dog-personality-types`} className="hover:text-orange-600 transition">
                  강아지 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/cat-personality-types`} className="hover:text-orange-600 transition">
                  고양이 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/pet-owner-compatibility`} className="hover:text-orange-600 transition">
                  궁합 분석
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">견종별 가이드</h3>
            <ul className="space-y-1 text-neutral-600">
              <li>
                <Link href={`/${locale}/blog/maltese-personality-guide`} className="hover:text-orange-600 transition">
                  🤍 말티즈 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/poodle-personality-types`} className="hover:text-orange-600 transition">
                  🎩 푸들 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/shiba-inu-personality`} className="hover:text-orange-600 transition">
                  🦊 시바견 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/pomeranian-personality-guide`} className="hover:text-orange-600 transition">
                  🍊 포메 성격
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/golden-retriever-personality`} className="hover:text-orange-600 transition">
                  🌟 골든 성격
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">회사</h3>
            <ul className="space-y-1 text-neutral-600">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-orange-600 transition">
                  소개
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-orange-600 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-orange-600 transition font-semibold">
                  📮 문의하기
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-orange-600 transition">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-orange-600 transition">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-800 mb-2">언어</h3>
            <ul className="space-y-1 text-neutral-600 text-xs">
              <li>
                <Link href="/ko" className="hover:text-orange-600">한국어</Link>
                {" · "}
                <Link href="/en" className="hover:text-orange-600">EN</Link>
                {" · "}
                <Link href="/ja" className="hover:text-orange-600">日本</Link>
              </li>
              <li>
                <Link href="/zh" className="hover:text-orange-600">中文</Link>
                {" · "}
                <Link href="/es" className="hover:text-orange-600">ES</Link>
                {" · "}
                <Link href="/de" className="hover:text-orange-600">DE</Link>
                {" · "}
                <Link href="/ar" className="hover:text-orange-600">AR</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-neutral-200 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500">
          <p>
            © 2026 PawType-16 by 큰바구니 (Modoomodoo). All rights reserved.
          </p>
          <p className="text-neutral-400">
            헬싱키대·옥스퍼드 동물성격 연구 기반
          </p>
        </div>
      </div>
    </footer>
  );
}
