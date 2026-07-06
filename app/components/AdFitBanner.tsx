"use client";

import { useEffect, useRef } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v6 - 마운트 후 SDK 로드 강제)
 *
 * 핵심:
 * 1. 광고 <ins> 태그가 DOM에 마운트된 후 SDK를 삽입
 * 2. SDK가 이미 로드되어 있으면 새 <ins>를 스캔하도록 다시 삽입 유도
 * 3. 매 마운트마다 새로운 SDK 삽입 → AdFit이 DOM 재스캔
 */

interface AdFitBannerProps {
  adUnitMobile: string;
  adUnitPc?: string;
  className?: string;
}

const ADFIT_SDK_SRC = "//t1.kakaocdn.net/kas/static/ba.min.js";

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  className = "",
}: AdFitBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // 광고 태그가 DOM에 있음을 보장한 뒤 SDK 실행
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_SRC;
    script.async = true;

    // wrapper 내부에 script를 추가하면 AdFit이 해당 영역을 스캔함
    wrapperRef.current.appendChild(script);

    return () => {
      // 언마운트 시 스크립트 정리
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adUnitMobile, adUnitPc]);

  return (
    <div
      ref={wrapperRef}
      className={`w-full flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 모바일 광고 (< 768px) */}
      <div className="block md:hidden">
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit={adUnitMobile}
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>

      {/* PC 광고 (>= 768px) */}
      {adUnitPc && (
        <div className="hidden md:block">
          <ins
            className="kakao_ad_area"
            style={{ display: "block" }}
            data-ad-unit={adUnitPc}
            data-ad-width="728"
            data-ad-height="90"
          />
        </div>
      )}
    </div>
  );
}
