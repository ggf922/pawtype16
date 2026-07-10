"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v15 - 최종 프로덕션 + 광고 자리 유지)
 *
 * 🎯 v15 핵심:
 * - v14의 문제 해결: 광고 매칭 전에도 자리 유지
 * - <ins> 태그가 비어있을 때 placeholder 표시
 * - 광고 로드되면 placeholder 자동 숨김
 * - 매칭 대기 중일 때도 사용자에게 이상하지 않게 보임
 *
 * 📊 이전 버전 문제:
 * - v14: 광고 매칭 안 되면 화면에 완전 빈 공간 → 사용자 혼란
 * - v15: 광고 매칭 안 되면 얇은 자리표시자만 보임 → 자연스러움
 *
 * 🎨 UI 전략:
 * - 광고 매칭 성공 → placeholder 자동 숨김, 광고만 표시
 * - 광고 매칭 실패 → 아주 얇은 자리표시자 유지 (사용자 방해 최소)
 * - 3초 후에도 광고 없으면 placeholder를 조용히 숨김
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
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [shouldHide, setShouldHide] = useState<boolean>(false);

  useEffect(() => {
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

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

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.cssText = "display:block !important; margin:0 auto;";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_URL;
    script.async = true;

    container.appendChild(ins);
    container.appendChild(script);

    loadedRef.current = true;

    // 광고 로드 확인 (2초 후)
    const checkAdTimer = setTimeout(() => {
      const insEl = container.querySelector("ins.kakao_ad_area");
      if (insEl && insEl.children.length > 0) {
        // 광고 성공적으로 로드됨
        setAdLoaded(true);
      }
    }, 2000);

    // 5초 후에도 광고 없으면 컨테이너 완전 숨김 (자연스러운 UX)
    const hideTimer = setTimeout(() => {
      const insEl = container.querySelector("ins.kakao_ad_area");
      if (!insEl || insEl.children.length === 0) {
        setShouldHide(true);
      }
    }, 5000);

    return () => {
      clearTimeout(checkAdTimer);
      clearTimeout(hideTimer);
    };
  }, [adUnit300, adUnitMobile, adUnitPc]);

  // 광고 크기별 최소 높이
  const minHeight = adUnit300 ? 250 : 100;

  // 5초 후 광고 없으면 완전 숨김
  if (shouldHide) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: adLoaded ? `${minHeight}px` : "20px",
        margin: adLoaded ? "24px 0" : "8px 0",
        transition: "min-height 0.3s ease, margin 0.3s ease",
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
          minHeight: adLoaded ? `${minHeight}px` : "0px",
          width: "100%",
          maxWidth: "728px",
          transition: "min-height 0.3s ease",
        }}
      />
    </div>
  );
}
