"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PawType-16] error:", error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="font-sans bg-cream min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl">🐾</div>
          <h1 className="mt-4 text-2xl font-bold">잠시 길을 잃었어요</h1>
          <p className="mt-3 text-charcoal/70 text-sm leading-relaxed">
            예상치 못한 오류가 발생했어요.
            <br />다시 시도해 주세요.
          </p>
          {error?.digest && (
            <p className="mt-4 text-xs text-charcoal/40 font-mono">
              code: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-accent text-white font-semibold px-6 py-3 hover:bg-accent/90"
          >
            다시 시도 →
          </button>
        </div>
      </body>
    </html>
  );
}
