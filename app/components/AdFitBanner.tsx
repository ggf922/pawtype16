"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v2)
 *
 * 화면 크기에 따라 자동으로 광고 단위 전환
 * - 모바일 (< 768px): 320x100
 * - PC/태블릿 (>= 768px): 728x90 (adUnitPc 지정 시)
 */

interface AdFitBannerProps {
  /** 모바일용 320x100 광고 단위 ID */
  adUnitMobile: string;
  /** PC용 728x90 광고 단위 ID (선택: 없으면 모바일 사이즈 사용) */
  adUnitPc?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** PC 판별 breakpoint (px, 기본 768) */
  breakpoint?: number;
}

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  className = "",
  breakpoint = 768,
}: AdFitBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isPc, setIsPc] = useState<boolean | null>(null);

  // 화면 크기 감지
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSize = () => setIsPc(window.innerWidth >= breakpoint);
    checkSize();

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  // 광고 SDK 삽입
  useEffect(() => {
    if (!adRef.current || isPc === null) return;

    // PC용 광고 단위가 지정되지 않으면 모바일 단위 사용
    const useAdUnit = isPc && adUnitPc ? adUnitPc : adUnitMobile;
    const width = isPc && adUnitPc ? 728 : 320;
    const height = isPc && adUnitPc ? 90 : 100;

    // 기존 광고 요소 제거 (재렌더링 시 중복 방지)
    adRef.current.innerHTML = "";

    // <ins> 요소 생성 (AdFit 광고 태그)
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", useAdUnit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));

    // <script> 요소 생성 (AdFit SDK)
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;

    adRef.current.appendChild(ins);
    adRef.current.appendChild(script);
  }, [isPc, adUnitMobile, adUnitPc]);

  return (
    <div
      className={`flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      <div ref={adRef} />
    </div>
  );
}
