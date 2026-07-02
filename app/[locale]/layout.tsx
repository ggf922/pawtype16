import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, Locale, getDir, isLocale } from "../lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dir = getDir(locale);
  return (
    <div lang={locale} dir={dir}>
      {children}
    </div>
  );
}
