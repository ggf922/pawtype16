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
    // Supabase 비밀번호 재설정 링크 클릭 시 URL fragment에 access_token이 포함됨
    // Supabase 클라이언트가 자동으로 감지하여 세션 설정
    if (!sb) return;

    sb.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      } else {
        setError(
          "재설정 링크가 만료되었거나 유효하지 않습니다. 다시 요청해 주세요."
        );
      }
    });
  }, [sb]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("새 비밀번호를 입력해 주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!sb) {
      setError("서비스 연결에 실패했습니다.");
      return;
    }

    setBusy(true);

    try {
      const { error: updateError } = await sb.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setBusy(false);
        return;
      }

      setSuccess(true);

      // 2초 후 홈으로 이동 (자동 로그인 상태)
      setTimeout(() => {
        router.push(`/${locale}/me`);
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "비밀번호 변경 중 오류가 발생했습니다.");
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
          <div className="text-5xl">🔐</div>
          <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-charcoal">
            새 비밀번호 설정
          </h1>
          <p className="mt-2 text-sm text-charcoal/70">
            사용하실 새 비밀번호를 입력해 주세요
          </p>
        </div>

        {success ? (
          <div className="mt-10 rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            <div className="text-4xl">✅</div>
            <h2 className="mt-3 text-lg font-bold text-green-900">
              비밀번호가 변경됐어요!
            </h2>
            <p className="mt-2 text-sm text-green-800">
              잠시 후 마이페이지로 이동합니다...
            </p>
          </div>
        ) : !ready && !error ? (
          <div className="mt-10 text-center text-sm text-charcoal/60">
            링크 확인 중...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                새 비밀번호
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상"
                disabled={!ready}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:bg-beige/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호 재입력"
                disabled={!ready}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:bg-beige/30"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
                {!ready && (
                  <div className="mt-2 text-center">
                    <Link
                      href={`/${locale}/forgot-password`}
                      className="text-accent font-medium hover:underline"
                    >
                      비밀번호 찾기 다시 하기 →
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !ready}
              className="w-full rounded-full bg-accent text-white font-semibold py-3.5 hover:bg-accent/90 disabled:opacity-50 transition"
            >
              {busy ? "변경 중..." : "비밀번호 변경 🔐"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
