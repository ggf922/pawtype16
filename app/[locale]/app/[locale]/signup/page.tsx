"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getBrowserSupabase } from "../../lib/supabase-browser";

export default function SignupPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const sb = getBrowserSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function formatPhone(v: string) {
    // 숫자만 추출
    const digits = v.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // 검증
    if (!email || !password || !name) {
      setError("이메일, 비밀번호, 이름은 필수입니다.");
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
    if (!agree) {
      setError("이용약관과 개인정보처리방침에 동의해 주세요.");
      return;
    }
    if (!sb) {
      setError("서비스 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
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
            nickname: name,
            phone,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("이미 가입된 이메일입니다. 로그인해 주세요.");
        } else {
          setError(signUpError.message);
        }
        setBusy(false);
        return;
      }

      // 자동 로그인 (이메일 인증 없이 즉시 사용)
      if (data.user && !data.session) {
        // 세션이 없으면 명시적 로그인 시도
        await sb.auth.signInWithPassword({ email, password });
      }

      setSuccess(true);

      // 1.5초 후 마이페이지로 이동
      setTimeout(() => {
        router.push(`/${locale}/me`);
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "회원가입 중 오류가 발생했습니다.");
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
          <div className="text-5xl">🐾</div>
          <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-charcoal">
            회원가입
          </h1>
          <p className="mt-2 text-sm text-charcoal/70">
            PawType-16과 함께, 우리 아이의 성향을 발견해 보세요
          </p>
        </div>

        {success ? (
          <div className="mt-10 rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            <div className="text-4xl">🎉</div>
            <h2 className="mt-3 text-lg font-bold text-green-900">
              가입이 완료됐어요!
            </h2>
            <p className="mt-2 text-sm text-green-800">
              잠시 후 마이페이지로 이동합니다...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                이름 <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                이메일 <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                전화번호
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="010-1234-5678"
                maxLength={13}
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <p className="mt-1 text-xs text-charcoal/50">선택사항</p>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                비밀번호 <span className="text-accent">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상"
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                비밀번호 확인 <span className="text-accent">*</span>
              </label>
              <input
                type="password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호 재입력"
                className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {/* 약관 동의 */}
            <label className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-accent"
              />
              <span className="text-xs text-charcoal/70 leading-relaxed">
                <Link
                  href={`/${locale}/terms`}
                  target="_blank"
                  className="text-accent hover:underline"
                >
                  이용약관
                </Link>
                과{" "}
                <Link
                  href={`/${locale}/privacy`}
                  target="_blank"
                  className="text-accent hover:underline"
                >
                  개인정보처리방침
                </Link>
                에 동의합니다.
              </span>
            </label>

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
              {busy ? "가입 처리 중..." : "가입하기 🐾"}
            </button>

            <p className="text-center text-sm text-charcoal/70 pt-2">
              이미 계정이 있으신가요?{" "}
              <Link
                href={`/${locale}`}
                className="text-accent font-medium hover:underline"
              >
                로그인
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
