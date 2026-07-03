"use client";

import { useEffect, useRef } from "react";

interface AdFitBannerProps {
  adUnit?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function AdFitBanner({
  adUnit = "DAN-Qi4CHnEvseWwqcwb",
  width = 320,
  height = 100,
  className = "",
}: AdFitBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // 기존 광고 요소 제거 (재렌더링 시 중복 방지)
    adRef.current.innerHTML = "";

    // <ins> 요소 생성 (AdFit 광고 태그)
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));

    // <script> 요소 생성 (AdFit SDK)
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;

    adRef.current.appendChild(ins);
    adRef.current.appendChild(script);
  }, [adUnit, width, height]);

  return (
    <div
      id="adfit-result-bottom"
      className={`flex justify-center my-6 ${className}`}
      aria-label="광고"
    >
      <div ref={adRef} />
    </div>
  );
}
