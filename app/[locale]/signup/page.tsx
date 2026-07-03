"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getBrowserSupabase } from "../../lib/supabase-browser";

export default function SignUpPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const sb = getBrowserSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!sb) {
      setError("Supabase 클라이언트를 초기화할 수 없습니다.");
      return;
    }

    // 유효성 검사
    if (!email || !password || !name) {
      setError("이메일, 비밀번호, 이름은 필수입니다.");
      return;
    }
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
      const { data, error: signUpError } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            full_name: name,
            phone: phone || null,
          },
          emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("이미 가입된 이메일입니다. 로그인해주세요.");
        } else {
          setError(signUpError.message);
        }
        setBusy(false);
        return;
      }

      // 즉시 로그인 시도 (이메일 인증 비활성화 상태)
      if (data.user && !data.session) {
        const { error: signInError } = await sb.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError("가입은 되었으나 자동 로그인에 실패했습니다. 로그인 페이지에서 다시 시도해주세요.");
          setBusy(false);
          return;
        }
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/${locale}/me`);
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "회원가입 중 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2">회원가입 완료!</h1>
          <p className="text-charcoal/70">마이페이지로 이동합니다...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🐾</div>
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-charcoal/60 text-sm mt-2">
            PawType-16에 오신 것을 환영합니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              비밀번호 <span className="text-red-500">*</span>
            </label>
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
            <label className="block text-sm font-semibold mb-1">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
              placeholder="비밀번호 재입력"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              전화번호 <span className="text-charcoal/40 text-xs">(선택)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none"
              placeholder="010-1234-5678"
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
            {busy ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-charcoal/10 text-center text-sm">
          <span className="text-charcoal/60">이미 계정이 있으신가요? </span>
          <Link href={`/${locale}`} className="text-accent font-semibold hover:underline">
            로그인
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href={`/${locale}`} className="text-xs text-charcoal/40 hover:underline">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
