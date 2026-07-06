"use client";

import { useEffect, useRef } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v3 - SSR 최적화)
 *
 * - 서버 렌더링 시 광고 태그 즉시 삽입 (빈 div 문제 해결)
 * - CSS media query로 모바일/PC 자동 전환
 * - AdFit SDK가 페이지 로드 즉시 광고 자리 인식
 */

interface AdFitBannerProps {
  /** 모바일용 320x100 광고 단위 ID */
  adUnitMobile: string;
  /** PC용 728x90 광고 단위 ID (선택: 없으면 모바일 사이즈 사용) */
  adUnitPc?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

// AdFit SDK 로드 상태 추적 (페이지당 1번만 로드)
let sdkLoaded = false;

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  className = "",
}: AdFitBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // AdFit SDK 로드 (한 번만)
    if (!sdkLoaded && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
      script.async = true;
      document.body.appendChild(script);
      sdkLoaded = true;
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 모바일 광고 (< 768px에서만 표시) */}
      <ins
        className="kakao_ad_area md:!hidden"
        style={{ display: "none" }}
        data-ad-unit={adUnitMobile}
        data-ad-width="320"
        data-ad-height="100"
      />

      {/* PC 광고 (>= 768px에서만 표시) */}
      {adUnitPc && (
        <ins
          className="kakao_ad_area !hidden md:!inline-block"
          style={{ display: "none" }}
          data-ad-unit={adUnitPc}
          data-ad-width="728"
          data-ad-height="90"
        />
      )}
    </div>
  );
}
