"use client";

import { useEffect, useState } from "react";

const KEY = "pawtype16_last_result";

export default function LinkLastResult() {
  const [status, setStatus] = useState<"idle" | "linking" | "done" | "error">("idle");

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(KEY);
    } catch {}
    if (!raw) return;
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }
    if (!parsed?.petName || !parsed?.answers) return;
    if (Date.now() - (parsed.ts || 0) > 24 * 3600_000) {
      try { localStorage.removeItem(KEY); } catch {}
      return;
    }

    setStatus("linking");
    fetch("/api/save-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        petKind: parsed.petKind,
        petName: parsed.petName,
        answers: parsed.answers,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.saved && res?.signedIn) {
          try { localStorage.removeItem(KEY); } catch {}
          setStatus("done");
          setTimeout(() => window.location.reload(), 800);
        } else {
          setStatus("idle");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status !== "linking" && status !== "done") return null;
  return (
    <div className="fixed bottom-5 right-5 z-40 rounded-2xl bg-cocoa text-cream px-4 py-3 shadow-lg text-sm flex items-center gap-2 animate-fade-in">
      <span className="animate-paw-walk">🐾</span>
      <span>
        {status === "linking" ? "이전 결과를 연결 중…" : "결과가 추가됐어요!"}
      </span>
    </div>
  );
}
