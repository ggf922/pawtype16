"use client";

/**
 * AdFit 반응형 배너 컴포넌트 (v5 - SDK는 layout.tsx에서 전역 로드)
 *
 * - SDK 로드는 app/layout.tsx의 <Script>가 담당
 * - 이 컴포넌트는 광고 자리(<ins>)만 렌더링
 * - 모바일/PC를 CSS로 분리
 */

interface AdFitBannerProps {
  adUnitMobile: string;
  adUnitPc?: string;
  className?: string;
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  className = "",
}: AdFitBannerProps) {
  return (
    <div
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
