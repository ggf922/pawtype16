"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [user, setUser] = useState<LiteUser | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          nickname:
            (data.user.user_metadata?.full_name as string) ||
            (data.user.user_metadata?.name as string) ||
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
            (session.user.user_metadata?.full_name as string) ||
            (session.user.user_metadata?.name as string) ||
            null,
          avatar_url: (session.user.user_metadata?.avatar_url as string) || null,
        });
      } else {
        setUser(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  async function signIn(provider: "google" | "kakao") {
    if (!sb) return;
    setBusy(true);
    const redirectTo = `${window.location.origin}/auth/callback?next=/${locale}/me`;
    await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
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
            onClick={() => setShowLoginModal(false)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
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
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => signIn("google")}
                  className="w-full rounded-full border border-beige bg-white py-3 font-semibold hover:bg-beige/40 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="text-lg">🔵</span>
                  <span>Google {t(locale, "auth_login")}</span>
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => signIn("kakao")}
                  className="w-full rounded-full bg-[#FEE500] text-[#3C1E1E] py-3 font-semibold hover:bg-[#FEE500]/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="text-lg">💬</span>
                  <span>Kakao {t(locale, "auth_login")}</span>
                </button>
              </div>
              <p className="mt-5 text-xs text-charcoal/50 text-center">
                {t(locale, "auth_modal_terms")}
              </p>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
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
            href={`/auth/signout?next=/${locale}`}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            ↩️ {t(locale, "auth_menu_signout")}
          </a>
        </div>
      )}
    </div>
  );
}
