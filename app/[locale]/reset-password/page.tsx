"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getBrowserSupabase } from "../../lib/supabase-browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const sb = getBrowserSupabase();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase 비밀번호 재설정 링크 클릭 시 URL fragment의 access_token이 자동으로 세션에 설정됨
    if (!sb) return;

    sb.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      } else {
        // 세션이 없으면 이벤트로 감지 (fragment 파싱 대기)
        const {
          data: { subscription },
        } = sb.auth.onAuthStateChange((event, session) => {
          if (event === "PASSWORD_RECOVERY" || session) {
            setReady(true);
          }
        });
        // 3초 후에도 세션 없으면 에러
        setTimeout(() => {
          sb.auth.getSession().then(({ data: d2 }) => {
            if (!d2.session) {
              setError("재설정 링크가 만료되었거나 유효하지 않습니다. 다시 요청해주세요.");
            }
          });
          subscription.unsubscribe();
        }, 3000);
      }
    });
  }, [sb]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setBusy(true);
    try {
      const { error: updateError } = await sb.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        setBusy(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/me`);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "비밀번호 변경 중 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">비밀번호 변경 완료!</h1>
          <p className="text-charcoal/70">마이페이지로 이동합니다...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔒</div>
          <h1 className="text-2xl font-bold">새 비밀번호 설정</h1>
          <p className="text-charcoal/60 text-sm mt-2">
            새로운 비밀번호를 입력해주세요.
          </p>
        </div>

        {!ready && !error && (
          <div className="text-center py-8 text-charcoal/50">
            <div className="animate-pulse">링크 확인 중...</div>
          </div>
        )}

        {ready && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">새 비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
                placeholder="최소 6자 이상"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">새 비밀번호 확인</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
                placeholder="비밀번호 재입력"
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
              {busy ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}

        {error && !ready && (
          <div className="text-center">
            <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm mb-4">
              {error}
            </div>
            <Link
              href={`/${locale}/forgot-password`}
              className="inline-block rounded-full bg-accent text-white font-semibold px-6 py-3 hover:bg-accent/90"
            >
              재설정 링크 다시 요청하기
            </Link>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-charcoal/10 text-center text-sm">
          <Link href={`/${locale}`} className="text-accent font-semibold hover:underline">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
