// My Page — shows the logged-in user's quiz history.
// Server Component: reads user + results via supabase-server (cookie session).

import Link from "next/link";
import { redirect } from "next/navigation";
import { isLocale, Locale, t } from "../../lib/i18n";
import { getServerSupabase } from "../../lib/supabase-server";
import { fetchUserResults } from "../../lib/supabase";
import AuthButton from "../../components/AuthButton";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import LinkLastResult from "../../components/LinkLastResult";

export const dynamic = "force-dynamic";

export default async function MyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    redirect("/ko/me");
  }
  const locale = rawLocale as Locale;
  const T = (k: any, vars?: any) => t(locale, k, vars);

  const sb = getServerSupabase();
  if (!sb) {
    return (
      <SetupNotice locale={locale}>
        <p>
          Supabase가 아직 연결되지 않았어요. <code>.env.local</code>에
          키를 설정해주세요. 자세한 안내는 <code>SUPABASE.md</code>.
        </p>
      </SetupNotice>
    );
  }

  const { data: userData } = await sb.auth.getUser();
  const user = userData.user;

  if (!user) {
    // Not logged in — show a soft prompt instead of redirecting
    return (
      <PageShell locale={locale}>
        <div className="max-w-md mx-auto py-20 text-center animate-fade-in">
          <div className="text-6xl">🐾</div>
          <h1 className="mt-4 text-2xl font-bold">{T("auth_modal_title")}</h1>
          <p className="mt-3 text-charcoal/70">{T("auth_modal_desc")}</p>
          <p className="mt-6 text-sm text-charcoal/60">
            ↑ {T("auth_login")} 버튼을 클릭하세요
          </p>
        </div>
      </PageShell>
    );
  }

  const results = await fetchUserResults(user.id, 100);

  return (
    <PageShell locale={locale}>
      <LinkLastResult />
      <div className="mx-auto max-w-5xl px-5 py-10">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          {user.user_metadata?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.user_metadata.avatar_url as string}
              alt=""
              className="w-16 h-16 rounded-full object-cover border border-beige"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-cocoa text-white text-2xl font-bold flex items-center justify-center">
              {((user.user_metadata?.full_name as string) ||
                user.email ||
                "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              {(user.user_metadata?.full_name as string) ||
                (user.user_metadata?.name as string) ||
                user.email}
            </h1>
            <p className="text-sm text-charcoal/60">{user.email}</p>
          </div>
        </div>

        {/* Empty state */}
        {results.length === 0 && (
          <div className="mt-12 rounded-3xl bg-white border border-beige p-12 text-center shadow-sm">
            <div className="text-5xl">🐾</div>
            <h2 className="mt-4 text-xl font-bold">{T("me_empty_title")}</h2>
            <p className="mt-2 text-charcoal/70">{T("me_empty_desc")}</p>
            <Link
              href={`/${locale}/quiz`}
              className="mt-6 inline-flex rounded-full bg-accent text-white px-6 py-3 font-semibold hover:bg-accent/90"
            >
              {T("me_empty_cta")}
            </Link>
          </div>
        )}

        {/* History */}
        {results.length > 0 && (
          <div className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold">{T("me_history_title")}</h2>
              <span className="text-sm text-charcoal/60">
                {T("me_history_count", { count: results.length })}
              </span>
            </div>

            {/* Mobile cards */}
            <div className="mt-6 grid gap-3 md:hidden">
              {results.map((r) => (
                <article
                  key={r.id}
                  className="rounded-2xl bg-white border border-beige p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {r.pet_kind === "cat" ? "🐱" : "🐶"}
                      </span>
                      <span className="font-bold">{r.pet_name}</span>
                    </div>
                    <span className="text-2xl font-extrabold text-accent">
                      {r.match_score}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-charcoal/70">
                    {r.match_title}
                  </div>
                  <div className="mt-2 flex gap-2 text-xs font-mono">
                    <span className="rounded bg-beige px-2 py-0.5 text-cocoa">
                      {r.owner_code}
                    </span>
                    <span className="text-charcoal/40">×</span>
                    <span className="rounded bg-orange-100 px-2 py-0.5 text-accent">
                      {r.pet_code}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-charcoal/50">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleString("ko-KR", {
                          timeZone: "Asia/Seoul",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>

                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="mt-6 hidden md:block overflow-x-auto rounded-2xl border border-beige bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="text-charcoal/60 text-start border-b border-beige">
                  <tr>
                    <th className="py-3 px-4 font-medium">{T("me_table_date")}</th>
                    <th className="py-3 px-4 font-medium">{T("me_table_pet")}</th>
                    <th className="py-3 px-4 font-medium">{T("me_table_codes")}</th>
                    <th className="py-3 px-4 font-medium">{T("me_table_score")}</th>
                    <th className="py-3 px-4 font-medium">{T("me_table_title")}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-beige/60 hover:bg-beige/20"
                    >
                      <td className="py-3 px-4 text-charcoal/70 whitespace-nowrap">
                        {r.created_at
                          ? new Date(r.created_at).toLocaleDateString("ko-KR", {
                              timeZone: "Asia/Seoul",
                            })
                          : "-"}
                      </td>

                      <td className="py-3 px-4">
                        <span className="mr-2">
                          {r.pet_kind === "cat" ? "🐱" : "🐶"}
                        </span>
                        <span className="font-medium">{r.pet_name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex gap-1 font-mono text-xs">
                          <span className="rounded bg-beige px-2 py-0.5 text-cocoa">
                            {r.owner_code}
                          </span>
                          <span className="text-charcoal/40 self-center">×</span>
                          <span className="rounded bg-orange-100 px-2 py-0.5 text-accent">
                            {r.pet_code}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4 font-extrabold text-accent">
                        {r.match_score}
                      </td>
                      <td className="py-3 px-4 text-charcoal/80">
                        {r.match_title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <Link
                href={`/${locale}/quiz`}
                className="inline-flex rounded-full bg-accent text-white px-6 py-3 font-semibold hover:bg-accent/90"
              >
                {T("auth_menu_new_test")} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
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
          <div className="flex items-center gap-3">
            <LocaleSwitcher current={locale} />
            <AuthButton locale={locale} />
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}

function SetupNotice({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <PageShell locale={locale}>
      <div className="mx-auto max-w-2xl px-5 py-20">
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h2 className="font-bold text-lg">⚙️ Setup needed</h2>
          <div className="mt-2 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </PageShell>
  );
}
