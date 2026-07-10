"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v13 - 강제 표시 + 모바일 완전 대응)
 *
 * 🎯 v13 핵심 개선:
 * - 인라인 스타일로 모든 CSS 강제 (외부 CSS 간섭 차단)
 * - visibility, opacity, display 강제 설정
 * - 배경색·테두리로 광고 자리 시각적 확인 가능
 * - 큰 디버그 텍스트로 모바일에서도 확실히 보임
 * - z-index 강제 최상위
 *
 * 📊 문제 원인 (v12에서 발견):
 * - HTML에 광고 컨테이너 존재하지만 실제 모바일 화면에서 안 보임
 * - 부모 <section>의 CSS 클래스가 모바일에서 컨테이너를 숨기는 문제
 * - v13는 인라인 스타일로 부모 CSS 완전 무시하고 강제 표시
 */

interface AdFitBannerProps {
  adUnitMobile?: string;
  adUnitPc?: string;
  adUnit300?: string;
  className?: string;
  debug?: boolean;
}

const ADFIT_SDK_URL = "//t1.kakaocdn.net/kas/static/ba.min.js";

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
  debug = true,
}: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);
  const [status, setStatus] = useState<string>("⏳ 초기화 중...");
  const [adInfo, setAdInfo] = useState<string>("");
  const [screenInfo, setScreenInfo] = useState<string>("");

  useEffect(() => {
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const windowWidth = window.innerWidth;
    const screenWidth = window.screen.width;

    setScreenInfo(`창:${windowWidth}px 화면:${screenWidth}px ${isMobile ? "📱모바일" : "🖥️PC"}`);
    setStatus(`✅ 화면 감지 완료`);

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
      setStatus(`❌ 사용 가능한 광고 단위 없음`);
      return;
    }

    setAdInfo(`${adUnit} (${adWidth}x${adHeight})`);
    setStatus(`📦 광고 태그 삽입 중...`);

    console.log(
      `[AdFit v13] Loading: ${adUnit} (${adWidth}x${adHeight}), isMobile: ${isMobile}, window: ${windowWidth}px`
    );

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.cssText = "display:block !important; margin:0 auto;";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    container.appendChild(ins);
    setStatus(`✅ <ins> 삽입 완료`);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_URL;
    script.async = true;

    script.onload = () => {
      setStatus(`✅ SDK 로드 완료`);
      console.log(`[AdFit v13] SDK loaded for ${adUnit}`);

      setTimeout(() => {
        const insEl = container.querySelector("ins.kakao_ad_area");
        if (insEl && insEl.children.length > 0) {
          setStatus(`🎉 광고 표시 성공!`);
        } else {
          setStatus(`⚠️ SDK 로드됨. 매칭 대기중 (24-72h)`);
        }
      }, 3000);
    };

    script.onerror = () => {
      setStatus(`❌ SDK 로드 실패`);
      console.error(`[AdFit v13] SDK failed`);
    };

    container.appendChild(script);
    loadedRef.current = true;
  }, [adUnit300, adUnitMobile, adUnitPc]);

  return (
    <div
      style={{
        // 강제 표시 스타일 (부모 CSS 무시)
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "180px",
        padding: "16px",
        margin: "24px 0",
        // 시각적 확인용 (배포 후 문제 없으면 제거)
        border: "2px dashed #FFA500",
        borderRadius: "12px",
        background: "#FFF8F0",
        // 강제 표시
        visibility: "visible",
        opacity: 1,
        position: "relative",
        zIndex: 1,
      }}
      aria-label="광고"
    >
      {/* 디버그 정보 - 크게 표시 */}
      {debug && (
        <div
          style={{
            fontSize: "13px",
            color: "#333",
            background: "#FFE4B5",
            padding: "8px 12px",
            borderRadius: "6px",
            marginBottom: "12px",
            fontFamily: "monospace",
            textAlign: "center",
            fontWeight: "bold",
            border: "1px solid #FFA500",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <div>🔍 AdFit v13 상태</div>
          <div style={{ marginTop: "4px", fontSize: "11px" }}>{status}</div>
          {screenInfo && (
            <div style={{ marginTop: "2px", fontSize: "10px", color: "#666" }}>
              {screenInfo}
            </div>
          )}
          {adInfo && (
            <div style={{ marginTop: "2px", fontSize: "10px", color: "#666" }}>
              {adInfo}
            </div>
          )}
        </div>
      )}

      {/* 광고 실제 컨테이너 - 강제 표시 */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100px",
          minWidth: "300px",
          width: "100%",
          visibility: "visible",
          opacity: 1,
        }}
      />
    </div>
  );
}
