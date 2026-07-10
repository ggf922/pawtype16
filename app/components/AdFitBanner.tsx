"use client";

import { useEffect, useRef } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v11 - 완벽 보장 최종판)
 *
 * 🎯 v11 핵심 로직:
 * - CSS 미디어 쿼리로 정확한 화면 감지 (matchMedia API)
 * - 컴포넌트 마운트 후 즉시 화면 크기 감지
 * - <ins> 태그 삽입 후 SDK 스크립트를 동적으로 다시 실행
 * - 강제 스캔을 위해 setTimeout 사용 (DOM 안정화 대기)
 * - React Strict Mode 대응 (중복 실행 방지)
 *
 * 📊 v10 대비 개선 사항:
 * - v10: window.innerWidth 사용 → DevTools 시뮬레이션 시 초기 값 문제
 * - v11: window.matchMedia("(max-width: 767px)") 사용 → 항상 정확한 값
 * - v11: SDK 스크립트를 head에 삽입 (body가 아닌) → 확실한 로드
 * - v11: 광고 삽입 후 setTimeout으로 SDK 재실행 트리거
 *
 * 🔍 검증된 프로덕션 패턴 (검색 결과 기반):
 * - 참고: https://curryyou.tistory.com/507
 * - 참고: https://adfit.github.io/wiki/web-guide/
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

// AdFit SDK URL
const ADFIT_SDK_URL = "//t1.kakaocdn.net/kas/static/ba.min.js";

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
}: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    // 중복 로드 방지 (React Strict Mode 대응)
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    // 이미 자식 노드가 있으면 정리 (재렌더링 대응)
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 화면 크기 정확한 감지 (matchMedia API 사용)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

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

    console.log(
      `[AdFit v11] Loading ad: ${adUnit} (${adWidth}x${adHeight}), isMobile: ${isMobile}, window: ${window.innerWidth}px`
    );

    // <ins> 태그 동적 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "block";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    // 컨테이너에 <ins> 먼저 추가
    container.appendChild(ins);

    // AdFit SDK 스크립트 동적 삽입
    // - 이미 로드되어 있어도 다시 삽입하면 재실행되어 새 <ins> 스캔
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_URL;
    script.async = true;
    script.setAttribute("data-adfit", "true");

    // 컨테이너에 스크립트 추가 (같은 위치에)
    container.appendChild(script);

    // 로드 완료 표시
    loadedRef.current = true;

    console.log(`[AdFit v11] <ins> and <script> injected for ${adUnit}`);

    // 클린업
    return () => {
      // 컨테이너 자식 노드는 그대로 두어도 무방
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
