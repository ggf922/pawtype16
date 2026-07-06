"use client";

import { useEffect } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v4 - 인라인 style 제거 + SDK 강제 로드)
 *
 * 수정 포인트:
 * 1. style={{ display: "none" }} 인라인 제거 → Tailwind 클래스가 정상 작동
 * 2. AdFit SDK를 <Script> 없이 매 마운트 시 안전하게 확인/삽입
 * 3. 모바일/PC 각각 별도 wrapper로 분리하여 CSS 충돌 방지
 */

interface AdFitBannerProps {
  adUnitMobile: string;
  adUnitPc?: string;
  className?: string;
}

const ADFIT_SDK_SRC = "//t1.kakaocdn.net/kas/static/ba.min.js";

function ensureAdFitSdk() {
  if (typeof window === "undefined") return;
  // 이미 로드된 스크립트가 있는지 확인
  const existing = document.querySelector(
    `script[src="${ADFIT_SDK_SRC}"], script[src="https:${ADFIT_SDK_SRC}"]`
  );
  if (existing) return;

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = ADFIT_SDK_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  className = "",
}: AdFitBannerProps) {
  useEffect(() => {
    ensureAdFitSdk();
  }, []);

  return (
    <div
      className={`w-full flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 모바일 광고 (< 768px에서만 표시) */}
      <div className="block md:hidden">
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit={adUnitMobile}
          data-ad-width="320"
          data-ad-height="100"
        />
      </div>

      {/* PC 광고 (>= 768px에서만 표시) */}
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
