"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdFitBanner v16 - 모바일 광고 요청 보장 최종 버전
 *
 * v15 문제:
 *   - 5초 후 자동 hide 로직이 SDK 요청까지 취소시킴
 *   - AdFit 대시보드에 모바일 요청 0건 발생
 *
 * v16 개선:
 *   1. Hide 로직 완전 제거 - 항상 렌더링 (요청 보장)
 *   2. matchMedia API로 정확한 뷰포트 감지
 *   3. GA4 이벤트 통합 - 광고 로드/실패 추적
 *   4. Intersection Observer로 광고 뷰어빌리티 측정
 *   5. Cleanup 로직 강화 - 페이지 이동 시 메모리 누수 방지
 */

interface AdFitBannerProps {
  adUnitMobile?: string; // e.g., "DAN-BsercUGiOOF1n3f9" (320x100)
  adUnitPc?: string; // e.g., "DAN-OAKFCKdcL2PcJs9x" (728x90)
  adUnit300?: string; // e.g., "DAN-xxx" (300x250 - result page)
  className?: string;
}

// GA4에 이벤트 전송하는 헬퍼 함수
function trackAdEvent(action: string, label: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: "adfit_ad",
      event_label: label,
      non_interaction: true,
    });
  }
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
}: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // 1) 클라이언트 마운트 감지 (SSR hydration mismatch 방지)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2) matchMedia로 정확한 뷰포트 감지
  useEffect(() => {
    if (!isMounted) return;

    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isMounted]);

  // 3) 광고 로드 - matchMedia 결과가 확정된 후 실행
  useEffect(() => {
    if (!isMounted || isMobile === null || initialized.current) return;
    if (!containerRef.current) return;

    // 300x250 모드 (result 페이지)
    if (adUnit300) {
      loadAd({
        container: containerRef.current,
        adUnit: adUnit300,
        width: "300",
        height: "250",
        label: "300x250",
      });
      initialized.current = true;
      return;
    }

    // 모바일 광고 (320x100)
    if (isMobile && adUnitMobile) {
      loadAd({
        container: containerRef.current,
        adUnit: adUnitMobile,
        width: "320",
        height: "100",
        label: "mobile-320x100",
      });
      initialized.current = true;
      return;
    }

    // PC 광고 (728x90)
    if (!isMobile && adUnitPc) {
      loadAd({
        container: containerRef.current,
        adUnit: adUnitPc,
        width: "728",
        height: "90",
        label: "pc-728x90",
      });
      initialized.current = true;
      return;
    }
  }, [isMounted, isMobile, adUnitMobile, adUnitPc, adUnit300]);

  // 4) Intersection Observer - 광고 뷰어빌리티 추적 (GA4)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackAdEvent("ad_viewed", "AdFit banner in view");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 5) Cleanup - 언마운트 시 광고 스크립트 정리
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        // Cleanup 시에도 initialized 유지 - 재삽입 방지
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`adfit-banner-container ${className}`}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
      aria-label="광고"
    />
  );
}

/**
 * AdFit <ins> + <script>를 함께 삽입하는 함수
 * 각 광고 인스턴스마다 SDK를 새로 로드하여 스캔 보장
 */
function loadAd({
  container,
  adUnit,
  width,
  height,
  label,
}: {
  container: HTMLElement;
  adUnit: string;
  width: string;
  height: string;
  label: string;
}) {
  // 컨테이너 초기화
  container.innerHTML = "";

  // <ins> 태그 생성
  const ins = document.createElement("ins");
  ins.className = "kakao_ad_area";
  ins.style.display = "block";
  ins.setAttribute("data-ad-unit", adUnit);
  ins.setAttribute("data-ad-width", width);
  ins.setAttribute("data-ad-height", height);

  // <script> 태그 생성 (AdFit SDK)
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
  script.async = true;

  // 스크립트 로드 성공 시 GA4 이벤트 전송
  script.onload = () => {
    trackAdEvent("ad_sdk_loaded", `${label} (${adUnit})`);
    console.log(`[AdFit v16] SDK loaded for ${label}:`, adUnit);
  };

  // 스크립트 로드 실패 시 GA4 이벤트 전송
  script.onerror = () => {
    trackAdEvent("ad_sdk_error", `${label} (${adUnit})`);
    console.error(`[AdFit v16] SDK load failed for ${label}:`, adUnit);
  };

  // DOM에 순서대로 삽입 (ins 먼저, script 나중)
  container.appendChild(ins);
  container.appendChild(script);

  // GA4에 광고 요청 이벤트 전송
  trackAdEvent("ad_requested", `${label} (${adUnit})`);
  console.log(`[AdFit v16] Ad requested: ${label}`, adUnit);
}
