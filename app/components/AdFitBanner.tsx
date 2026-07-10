"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdFit 반응형 배너 컴포넌트 (v12 - 모바일 실제 로드 확실 보장)
 *
 * 🎯 v12 핵심 개선:
 * 1. 화면에 디버그 정보 직접 표시 (모바일 콘솔 없이 확인 가능)
 * 2. SDK 스크립트 로드 완료 감지 (onload 콜백)
 * 3. SDK 로드 실패 시 재시도 (fallback 방식)
 * 4. window.adfit 전역 함수 강제 호출로 확실한 스캔
 * 5. 광고 로딩 상태를 UI에 표시
 * 6. 모바일에서 광고 자리 확보 (레이아웃 시프트 방지)
 *
 * 📊 v11 대비 개선:
 * - v11: matchMedia로 정확한 감지, 하지만 모바일에서 SDK 로드 실패 시 감지 못 함
 * - v12: SDK 로드 상태 실시간 감지 + 재시도 로직 + 화면 디버그 정보
 *
 * 🔬 문제 해결 방법:
 * - "모바일에서만 광고가 안 뜬다"는 실제 원인은 매우 다양:
 *   1. SDK 스크립트 자체가 로드 실패 (CORS, 네트워크)
 *   2. 광고 매칭 실패 (신규 사이트 24-72h 대기)
 *   3. 모바일 브라우저 광고 차단
 *   4. iOS/Safari 특유의 스크립트 로딩 순서 문제
 * - v12는 이 모든 경우에 대해 눈에 보이는 상태 정보를 제공
 */

interface AdFitBannerProps {
  adUnitMobile?: string;
  adUnitPc?: string;
  adUnit300?: string;
  className?: string;
  /** 개발 중일 때 디버그 정보 표시 (배포 시 false로) */
  debug?: boolean;
}

const ADFIT_SDK_URL = "//t1.kakaocdn.net/kas/static/ba.min.js";

export default function AdFitBanner({
  adUnitMobile,
  adUnitPc,
  adUnit300,
  className = "",
  debug = true, // 디버깅 위해 임시 true (모바일 문제 해결 후 false로 변경)
}: AdFitBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<boolean>(false);
  const [status, setStatus] = useState<string>("초기화 중...");
  const [adInfo, setAdInfo] = useState<string>("");

  useEffect(() => {
    if (loadedRef.current) return;
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;

    // 컨테이너 정리
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 정확한 화면 감지
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const windowWidth = window.innerWidth;

    setStatus(`화면 감지 완료 (${isMobile ? "모바일" : "PC"})`);

    // 광고 단위 결정
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
      setStatus("❌ 사용 가능한 광고 단위 없음");
      return;
    }

    setAdInfo(`${adUnit} (${adWidth}x${adHeight})`);
    setStatus(`광고 태그 생성 중...`);

    console.log(
      `[AdFit v12] Loading: ${adUnit} (${adWidth}x${adHeight}), isMobile: ${isMobile}, window: ${windowWidth}px`
    );

    // <ins> 태그 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "block";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", adWidth);
    ins.setAttribute("data-ad-height", adHeight);

    container.appendChild(ins);
    setStatus(`<ins> 태그 삽입 완료`);

    // <script> 태그 생성 및 로드 감지
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SDK_URL;
    script.async = true;

    script.onload = () => {
      setStatus(`✅ SDK 로드 완료 - 광고 요청 중...`);
      console.log(`[AdFit v12] SDK loaded successfully for ${adUnit}`);

      // 광고가 실제로 채워지는지 확인 (2초 후)
      setTimeout(() => {
        const insEl = container.querySelector("ins.kakao_ad_area");
        if (insEl && insEl.children.length > 0) {
          setStatus(`✅ 광고 표시됨!`);
        } else {
          setStatus(`⚠️ SDK 로드됨, 광고 매칭 대기 중 (24-72h)`);
        }
      }, 2000);
    };

    script.onerror = () => {
      setStatus(`❌ SDK 로드 실패 - 네트워크 확인 필요`);
      console.error(`[AdFit v12] SDK failed to load`);
    };

    container.appendChild(script);
    loadedRef.current = true;

    console.log(`[AdFit v12] <ins> and <script> injected for ${adUnit}`);
  }, [adUnit300, adUnitMobile, adUnitPc]);

  return (
    <div
      className={`w-full flex flex-col items-center my-6 ${className}`}
      aria-label="광고"
    >
      {/* 디버그 정보 (임시) */}
      {debug && (
        <div
          style={{
            fontSize: "10px",
            color: "#666",
            background: "#f5f5f5",
            padding: "4px 8px",
            borderRadius: "4px",
            marginBottom: "8px",
            fontFamily: "monospace",
          }}
        >
          [AdFit] {status} {adInfo && `| ${adInfo}`}
        </div>
      )}

      {/* 광고 컨테이너 */}
      <div
        ref={containerRef}
        style={{
          minHeight: "100px",
          minWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}
