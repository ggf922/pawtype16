"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getBrowserSupabase } from "../lib/supabase-browser";

type UserInfo = {
  id: string;
  email?: string | null;
  name?: string | null;
  avatar_url?: string | null;
} | null;

export default function AuthButton() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "ko";
  const sb = getBrowserSupabase();

  const [user, setUser] = useState<UserInfo>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 로그인 모드: "signin" | "signup"
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // 이메일 로그인/가입 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sb) {
      setLoading(false);
      return;
    }

    sb.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name:
            (data.user.user_metadata?.name as string) ||
            (data.user.user_metadata?.full_name as string) ||
            data.user.email?.split("@")[0] ||
            null,
          avatar_url: (data.user.user_metadata?.avatar_url as string) || null,
        });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name:
            (session.user.user_metadata?.name as string) ||
            (session.user.user_metadata?.full_name as string) ||
            session.user.email?.split("@")[0] ||
            null,
          avatar_url: (session.user.user_metadata?.avatar_url as string) || null,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [sb]);

  async function handleGoogleSignIn() {
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${locale}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      if (mode === "signin") {
        const { error: signInError } = await sb.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
          } else {
            setError(signInError.message);
          }
          setBusy(false);
          return;
        }
        setShowModal(false);
        router.push(`/${locale}/me`);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "오류가 발생했습니다.");
      setBusy(false);
    }
  }

  function openModal() {
    setShowModal(true);
    setMode("signin");
    setError(null);
    setEmail("");
    setPassword("");
  }

  function closeModal() {
    setShowModal(false);
    setError(null);
  }

  if (loading) {
    return (
      <div className="w-20 h-9 rounded-full bg-charcoal/10 animate-pulse" />
    );
  }

  // 로그인 상태
  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-3 py-1.5 hover:bg-cream"
        >
          {user.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar_url}
              alt=""
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">
              {(user.name || user.email || "U")[0].toUpperCase()}
            </div>
          )}
          <span className="text-sm font-semibold max-w-[100px] truncate">
            {user.name || user.email}
          </span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-charcoal/10 py-2 z-50">
            <Link
              href={`/${locale}/me`}
              className="block px-4 py-2 text-sm hover:bg-cream"
              onClick={() => setMenuOpen(false)}
            >
              🐾 마이페이지
            </Link>
            <form action={`/${locale}/auth/signout`} method="post">
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm hover:bg-cream text-red-600"
              >
                🚪 로그아웃
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // 비로그인 상태
  return (
    <>
      <button
        onClick={openModal}
        className="rounded-full bg-accent text-white text-sm font-semibold px-4 py-1.5 hover:bg-accent/90"
      >
        로그인
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🐾</div>
              <h2 className="text-xl font-bold">로그인</h2>
              <p className="text-charcoal/60 text-sm mt-1">
                PawType-16에 오신 것을 환영합니다
              </p>
            </div>

            {/* 구글 로그인 (상단) */}
            <button
              onClick={handleGoogleSignIn}
              disabled={busy}
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-charcoal/20 bg-white px-4 py-3 hover:bg-cream font-semibold text-sm disabled:opacity-50 mb-4"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
                />
              </svg>
              Google로 계속하기
            </button>

            {/* 구분선 */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-charcoal/10" />
              <span className="text-xs text-charcoal/40">또는</span>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* 이메일 로그인 (하단) */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="이메일"
                className="w-full px-4 py-2.5 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none text-sm"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호"
                className="w-full px-4 py-2.5 rounded-lg border border-charcoal/20 focus:border-accent focus:outline-none text-sm"
              />

              {error && (
                <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-charcoal text-white font-semibold py-2.5 hover:bg-charcoal/90 disabled:opacity-50 text-sm"
              >
                {busy ? "로그인 중..." : "이메일로 로그인"}
              </button>
            </form>

            <div className="mt-4 flex justify-between text-xs">
              <Link
                href={`/${locale}/forgot-password`}
                onClick={closeModal}
                className="text-charcoal/60 hover:text-accent hover:underline"
              >
                비밀번호 찾기
              </Link>
              <Link
                href={`/${locale}/signup`}
                onClick={closeModal}
                className="text-accent font-semibold hover:underline"
              >
                회원가입 →
              </Link>
            </div>

            <button
              onClick={closeModal}
              className="w-full mt-4 text-xs text-charcoal/40 hover:text-charcoal/60"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
