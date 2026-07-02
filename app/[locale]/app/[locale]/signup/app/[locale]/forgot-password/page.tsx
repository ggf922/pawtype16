"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBrowserSupabase } from "../../lib/supabase-browser";

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const sb = getBrowserSupabase();

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    if (!sb) {
      setError("서비스 연결에 실패했습니다.");
      return;
    }

    setBusy(true);

    try {
      const redirectTo = `${window.location.origin}/${locale}/reset-password`;
      const { error: resetError } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) {
        setError(resetError.message);
        setBusy(false);
        return;
      }

      setSent(true);
    } catch (err: any) {
      setError(err?.message || "요청 처리 중 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-beige">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1.5 font-bold text-cocoa"
          >
            <span className="text-xl">🐾</span>
            <span>PawType-16</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-md px-5 py-10 md:py-16">
        <div className="text-center">
          <div className="text-5xl">🔑</div>
          <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-charcoal">
            비밀번호 찾기
          </h1>
          <p className="mt-2 text-sm text-charcoal/70">
            가입하신 이메일 주소로 재설정 링크를 보내드릴게요
          </p>
        </div>

        {sent ? (
          <div className="mt-10 rounded-2xl bg-green-50 border border-green-200 p-6">
            <div className="text-center">
              <div className="text-4xl">📧</div>
              <h2 className="mt-3 text-lg font-bold text-green-900">
                이메일을 확인해 주세요
              </h2>
              <p className="mt-2 text-sm text-green-800 leading-relaxed">
                <strong>{email}</strong>
                <br />
                주소로 비밀번호 재설정 링크를 보냈어요.
              </p>
              <p className="mt-4 text-xs text-green-700/80">
                이메일이 오지 않으면 스팸함도 확인해 주세요.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-green-200 text-center">
              <Link
                href={`/${locale}`}
                className="text-sm text-accent font-medium hover:underline"
              >
                ← 로그인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                이메일
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="가입하신 이메일 주소"
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-accent text-white font-semibold py-3.5 hover:bg-accent/90 disabled:opacity-50 transition"
            >
              {busy ? "전송 중..." : "재설정 링크 받기 📧"}
            </button>

            <div className="text-center text-sm text-charcoal/70 pt-2 space-y-2">
              <p>
                비밀번호가 기억나셨나요?{" "}
                <Link
                  href={`/${locale}`}
                  className="text-accent font-medium hover:underline"
                >
                  로그인
                </Link>
              </p>
              <p>
                아직 회원이 아니신가요?{" "}
                <Link
                  href={`/${locale}/signup`}
                  className="text-accent font-medium hover:underline"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
