"use client";

import { useEffect, useRef } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v10 - 최종 완성판)
 *
 * 🎯 v10 핵심 로직 (검증된 프로덕션 패턴):
 * - <ins> 태그와 <script> 태그를 컴포넌트 마운트 시 함께 동적 삽입
 * - AdFit SDK는 <script> 로드 시 자신의 형제 <ins> 태그를 스캔
 * - React SSR에서 <ins>를 미리 렌더링하지 않음 (CSS display:none 문제 회피)
 * - useRef로 중복 로드 방지
 * - 화면 크기에 따라 320x100(모바일) / 728x90(PC) 자동 선택
 * - 300x250 옵션도 지원 (PC/M 겸용)
 *
 * 📊 이전 버전 문제점 분석:
 * - v8: Tailwind hidden md:block → CSS display:none이 AdFit SDK 스캔 방해
 * - v9: 조건부 렌더링 도입했으나, layout.tsx의 <Script>는 최초 1회만 실행되어
 *       클라이언트 사이드에서 나중에 추가된 <ins>를 스캔하지 못함
 * - v10: <ins>와 <script>를 동시에 컨테이너에 삽입 → SDK가 확실히 스캔
 *
 * 📚 참고: https://curryyou.tistory.com/507 (Next.js + Kakao AdFit 검증된 패턴)
 */

interface AdFitBannerProps {
  /** 모바일용 320x100 광고 단위 ID */
  adUnitMobile?: string;
  /** PC용 728x90 광고 단위 ID */
  adUnitPc?: string;
  /** 300x250 광고 단위 ID (PC/M 겸용) */
  adUnit300?: string;
  className?: string;
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
}: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    // 중복 로드 방지
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    // 화면 크기 감지
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 768;

    // 광고 단위 및 사이즈 결정
    let adUnit: string | undefined;
    let adWidth: string;
    let adHeight: string;

    if (adUnit300) {
      // 300x250 우선
      adUnit = adUnit300;
      adWidth = "300";
      adHeight = "250";
    } else if (isMobile && adUnitMobile) {
      // 모바일: 320x100
      adUnit = adUnitMobile;
      adWidth = "320";
      adHeight = "100";
    } else if (!isMobile && adUnitPc) {
      // PC: 728x90
      adUnit = adUnitPc;
      adWidth = "728";
      adHeight = "90";
    } else {
      // 유효한 광고 단위 없음
      return;
    }

    // <ins> 태그 동적 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "block";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    // <script> 태그 동적 생성
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;

    // 컨테이너에 <ins>와 <script>를 순서대로 추가
    // 스크립트가 로드되면 위쪽 <ins>를 스캔하여 광고 요청
    container.appendChild(ins);
    container.appendChild(script);

    // 로드 완료 표시
    loadedRef.current = true;

    // 클린업 함수 (컴포넌트 언마운트 시)
    return () => {
      // 스크립트/ins 태그는 그대로 두어도 무방
      // 페이지 이동 시 자동 정리됨
    };
  }, [adUnit300, adUnitMobile, adUnitPc]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center my-6 ${className}`}
      style={{ minHeight: "100px" }}
      aria-label="광고"
    />
  );
}
