"use client";

/**
 * AdFit 반응형 배너 컴포넌트 (v8 - 300x250 지원 추가)
 *
 * - SDK는 app/layout.tsx의 <script>가 전역에서 로드
 * - 이 컴포넌트는 광고 자리(<ins>)만 렌더링
 * - 3가지 모드:
 *   1) 반응형 (모바일 320x100 / PC 728x90) - 기본
 *   2) 고정 300x250 (PC/M 겸용) - adUnit300 지정 시
 *   3) 두 방식 혼합 - adUnit300 + adUnitMobile/Pc
 */

interface AdFitBannerProps {
  /** 모바일용 320x100 광고 단위 ID (반응형 모드) */
  adUnitMobile?: string;
  /** PC용 728x90 광고 단위 ID (반응형 모드) */
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
  return (
    <div
      className={`w-full flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 300x250 광고 (PC/M 겸용, 지정된 경우 우선) */}
      {adUnit300 && (
        <div className="block">
          <ins
            className="kakao_ad_area"
            style={{ display: "block" }}
            data-ad-unit={adUnit300}
            data-ad-width="300"
            data-ad-height="250"
          />
        </div>
      )}

      {/* 모바일 광고 (< 768px) - adUnit300 없을 때만 */}
      {!adUnit300 && adUnitMobile && (
        <div className="block md:hidden">
          <ins
            className="kakao_ad_area"
            style={{ display: "block" }}
            data-ad-unit={adUnitMobile}
            data-ad-width="320"
            data-ad-height="100"
          />
        </div>
      )}

      {/* PC 광고 (>= 768px) - adUnit300 없을 때만 */}
      {!adUnit300 && adUnitPc && (
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
