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
      setError("이메일을 입력해주세요.");
      return;
    }

    setBusy(true);
    try {
      const { error: resetError } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        setBusy(false);
        return;
      }

      setSent(true);
    } catch (err: any) {
      setError(err?.message || "요청 중 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-2">이메일을 확인해주세요</h1>
          <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
            <strong>{email}</strong> 주소로<br />
            비밀번호 재설정 링크를 보내드렸습니다.
          </p>
          <p className="text-xs text-charcoal/50 mb-6">
            메일이 오지 않으면 스팸함을 확인해주세요.
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block rounded-full bg-accent text-white font-semibold px-6 py-3 hover:bg-accent/90"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔑</div>
          <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
          <p className="text-charcoal/60 text-sm mt-2">
            가입하신 이메일 주소를 입력하시면<br />
            재설정 링크를 보내드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-accent text-white font-semibold px-6 py-3 hover:bg-accent/90 disabled:opacity-50"
          >
            {busy ? "전송 중..." : "재설정 링크 보내기"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-charcoal/10 text-center text-sm">
          <Link href={`/${locale}`} className="text-accent font-semibold hover:underline">
            ← 로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
