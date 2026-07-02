"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "../lib/supabase-browser";
import type { Locale } from "../lib/i18n";
import { t } from "../lib/i18n";

type LiteUser = {
  id: string;
  email?: string | null;
  nickname?: string | null;
  avatar_url?: string | null;
};

export default function AuthButton({ locale }: { locale: Locale }) {
  const sb = getBrowserSupabase();
  const router = useRouter();
  const [user, setUser] = useState<LiteUser | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 이메일 로그인 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          nickname:
            (data.user.user_metadata?.nickname as string) ||
            (data.user.user_metadata?.name as string) ||
            (data.user.user_metadata?.full_name as string) ||
            null,
          avatar_url: (data.user.user_metadata?.avatar_url as string) || null,
        });
      }
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          nickname:
            (session.user.user_metadata?.nickname as string) ||
            (session.user.user_metadata?.name as string) ||
            (session.user.user_metadata?.full_name as string) ||
            null,
          avatar_url: (session.user.user_metadata?.avatar_url as string) || null,
        });
      } else {
        setUser(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  async function signInWithGoogle() {
    if (!sb) return;
    setBusy(true);
    const redirectTo = `${window.location.origin}/auth/callback?next=/${locale}/me`;
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);

    if (!email || !password) {
      setLoginError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }
    if (!sb) return;

    setBusy(true);
    try {
      const { error } = await sb.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else if (error.message.includes("Email not confirmed")) {
          setLoginError("이메일 인증이 필요합니다. 이메일을 확인해 주세요.");
        } else {
          setLoginError(error.message);
        }
        setBusy(false);
        return;
      }

      // 로그인 성공
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
      router.push(`/${locale}/me`);
      router.refresh();
    } catch (err: any) {
      setLoginError(err?.message || "로그인 중 오류가 발생했습니다.");
      setBusy(false);
    }
  }

  // Supabase not configured → hide
  if (!sb) return null;

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowLoginModal(true)}
          className="text-sm rounded-full border border-beige bg-white px-3 py-1.5 hover:bg-beige/40 transition"
        >
          {t(locale, "auth_login")}
        </button>
        {showLoginModal && (
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowLoginModal(false);
              setLoginError(null);
            }}
          >
            <div
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-4xl">🐾</div>
                <h2 className="mt-3 text-xl font-bold">
                  {t(locale, "auth_modal_title")}
                </h2>
                <p className="mt-2 text-sm text-charcoal/70">
                  {t(locale, "auth_modal_desc")}
                </p>
              </div>

              {/* Google 로그인 (상단) */}
              <div className="mt-6">
                <button
                  type="button"
                  disabled={busy}
                  onClick={signInWithGoogle}
                  className="w-full rounded-full border border-beige bg-white py-3 font-semibold hover:bg-beige/40 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google로 계속하기</span>
                </button>
              </div>

              {/* 구분선 */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-beige" />
                <span className="text-xs text-charcoal/50">또는</span>
                <div className="flex-1 h-px bg-beige" />
              </div>

              {/* 이메일 로그인 폼 */}
              <form onSubmit={signInWithEmail} className="mt-6 space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일"
                  className="w-full rounded-xl border border-beige bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full rounded-xl border border-beige bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />

                {loginError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-accent text-white py-3 font-semibold hover:bg-accent/90 disabled:opacity-50 transition"
                >
                  {busy ? "로그인 중..." : "이메일로 로그인"}
                </button>
              </form>

              {/* 회원가입 / 비밀번호 찾기 링크 */}
              <div className="mt-4 flex items-center justify-between text-xs text-charcoal/70">
                <Link
                  href={`/${locale}/signup`}
                  onClick={() => setShowLoginModal(false)}
                  className="hover:text-accent hover:underline"
                >
                  회원가입 →
                </Link>
                <Link
                  href={`/${locale}/forgot-password`}
                  onClick={() => setShowLoginModal(false)}
                  className="hover:text-accent hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>

              <p className="mt-5 text-xs text-charcoal/50 text-center">
                {t(locale, "auth_modal_terms")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError(null);
                }}
                className="mt-3 w-full text-sm text-charcoal/60 hover:text-cocoa"
              >
                {t(locale, "auth_modal_cancel")}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Logged in: avatar + dropdown
  const initials =
    (user.nickname || user.email || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full border border-beige bg-white pl-1 pr-3 py-1 hover:bg-beige/40 transition"
        aria-haspopup="menu"
      >
        {user.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar_url}
            alt=""
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <span className="inline-flex w-7 h-7 rounded-full bg-cocoa text-white items-center justify-center text-sm font-bold">
            {initials}
          </span>
        )}
        <span className="text-sm max-w-[100px] truncate">
          {user.nickname || user.email}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-2xl border border-beige bg-white shadow-lg py-2 z-50"
          role="menu"
        >
          <Link
            href={`/${locale}/me`}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-beige/40"
          >
            🐾 {t(locale, "auth_menu_me")}
          </Link>
          <Link
            href={`/${locale}/quiz`}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-beige/40"
          >
            📝 {t(locale, "auth_menu_new_test")}
          </Link>
          <div className="my-1 border-t border-beige" />
          <a
            href={`/${locale}/auth/signout?next=/${locale}`}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            ↩️ {t(locale, "auth_menu_signout")}
          </a>
        </div>
      )}
    </div>
  );
}
