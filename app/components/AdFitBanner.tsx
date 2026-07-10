"use client";

import { useEffect, useState } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v9 - 모바일 광고 요청 문제 완전 해결)
 *
 * 🎯 v9 핵심 변경사항 (v8 대비):
 * - Tailwind의 `hidden md:block` 방식 폐기 (CSS display:none 사용 → AdFit SDK가 스캔 실패)
 * - JavaScript `useMediaQuery` 훅으로 실제 화면 너비 감지 후 조건부 렌더링
 * - 모바일 접속 시 오직 모바일 <ins>만 DOM에 존재 → AdFit SDK가 정상 스캔 → 광고 요청 발생
 * - PC 접속 시 오직 PC <ins>만 DOM에 존재 → PC 광고만 요청
 *
 * 📊 문제 진단 근거:
 * - AdFit 대시보드에서 모바일 광고단위(DAN-BsercUGiOOF1n3f9) 요청수 0
 * - PC 광고단위(DAN-OAKFCKdcL2PcJs9x) 요청수 100+ (정상 작동)
 * - HTML에는 두 태그 모두 존재하지만 CSS display:none이 SDK 스캔 방해
 *
 * 🔧 작동 원리:
 * 1. 초기 렌더링: null 반환 (하이드레이션 오류 방지)
 * 2. useEffect로 window.innerWidth 확인 → isMobile 상태 설정
 * 3. isMobile === true → 모바일 <ins> 렌더링
 * 4. isMobile === false → PC <ins> 렌더링
 * 5. DOM에 렌더링 완료 후 AdFit SDK가 자동으로 광고 요청
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

/**
 * 화면 너비 감지 훅
 * - 768px 미만이면 mobile
 * - 768px 이상이면 desktop
 */
function useIsMobile(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // SSR 환경 대응
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth < 768);

    // 초기 체크
    check();

    // 리사이즈 감지 (테블릿 회전 등 대응)
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/**
 * AdFit SDK 재스캔 트리거
 * - <ins> 태그가 DOM에 추가된 후 SDK가 자동으로 스캔하지만,
 *   클라이언트 사이드에서 동적으로 추가된 경우 강제 스캔 필요
 */
function triggerAdFitScan() {
  if (typeof window === "undefined") return;
  // AdFit SDK의 전역 함수 호출
  const win = window as unknown as { kakao_ad_area?: () => void };
  try {
    win.kakao_ad_area?.();
  } catch (e) {
    // SDK가 아직 로드되지 않은 경우 무시
  }
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
}: AdFitBannerProps) {
  const isMobile = useIsMobile();

  // <ins> 태그가 DOM에 추가된 직후 AdFit SDK에 스캔 요청
  useEffect(() => {
    if (isMobile === null) return;
    // 100ms 지연으로 DOM 렌더링 완료 후 스캔
    const timer = setTimeout(triggerAdFitScan, 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // 초기 렌더링 시 (isMobile === null) 아무것도 렌더링하지 않음
  // → 하이드레이션 오류 방지 & 잘못된 광고 요청 방지
  if (isMobile === null) {
    return (
      <div
        className={`w-full flex justify-center my-6 ${className}`}
        style={{ minHeight: "100px" }}
        aria-label="광고 로딩 중"
      />
    );
  }

  return (
    <div
      className={`w-full flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 300x250 광고 (PC/M 겸용, 지정된 경우 우선) */}
      {adUnit300 && (
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit={adUnit300}
          data-ad-width="300"
          data-ad-height="250"
        />
      )}

      {/* 모바일 광고 (< 768px) - adUnit300 없을 때만 */}
      {!adUnit300 && isMobile && adUnitMobile && (
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit={adUnitMobile}
          data-ad-width="320"
          data-ad-height="100"
        />
      )}

      {/* PC 광고 (>= 768px) - adUnit300 없을 때만 */}
      {!adUnit300 && !isMobile && adUnitPc && (
        <ins
          className="kakao_ad_area"
          style={{ display: "block" }}
          data-ad-unit={adUnitPc}
          data-ad-width="728"
          data-ad-height="90"
        />
      )}
    </div>
  );
}
