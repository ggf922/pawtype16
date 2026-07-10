"use client";

import { useEffect, useRef } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v14 - 최종 프로덕션 버전)
 *
 * 🎯 v14 특징:
 * - v13 검증 완료: PC/모바일 모두 정상 작동 확인됨
 * - 프로덕션용: 디버그 UI 제거 (깔끔한 사용자 경험)
 * - 인라인 스타일 유지 (부모 CSS 간섭 완전 차단)
 * - 광고 매칭 전 자리 확보 (레이아웃 시프트 방지)
 * - 크로스 브라우저 호환성 극대화
 *
 * 📊 검증된 상태:
 * - PC (1707px): 728x90 광고 정상 노출 ✅
 * - 모바일 (384px): 320x100 광고 요청 정상 (매칭 대기중) ✅
 *
 * 🔍 로직:
 * - matchMedia로 정확한 화면 감지
 * - <ins> + <script> 동적 삽입
 * - React Strict Mode 대응 (중복 방지)
 */

interface AdFitBannerProps {
  adUnitMobile?: string;
  adUnitPc?: string;
  adUnit300?: string;
  className?: string;
}

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
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    // 컨테이너 정리 (재렌더링 대응)
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 정확한 화면 감지 (CSS 미디어 쿼리와 일치)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // 광고 단위 결정
    let adUnit: string | undefined;
    let adWidth: string;
    let adHeight: string;

    if (adUnit300) {
      adUnit = adUnit300;
      adWidth = "300";
      adHeight = "250";
    } else if (isMobile && adUnitMobile) {
      adUnit = adUnitMobile;
      adWidth = "320";
      adHeight = "100";
    } else if (!isMobile && adUnitPc) {
      adUnit = adUnitPc;
      adWidth = "728";
      adHeight = "90";
    } else {
      return;
    }

    // <ins> 태그 동적 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.cssText = "display:block !important; margin:0 auto;";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    // <script> 태그 동적 생성
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_URL;
    script.async = true;

    // 순서: <ins> → <script> (SDK가 형제 <ins>를 스캔)
    container.appendChild(ins);
    container.appendChild(script);

    loadedRef.current = true;
  }, [adUnit300, adUnitMobile, adUnitPc]);

  // 광고 크기에 맞는 최소 높이 (레이아웃 시프트 방지)
  const minHeight = adUnit300 ? 250 : 100;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: `${minHeight}px`,
        margin: "24px 0",
        visibility: "visible",
        opacity: 1,
      }}
      aria-label="광고"
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: `${minHeight}px`,
          width: "100%",
          maxWidth: "728px",
        }}
      />
    </div>
  );
}
