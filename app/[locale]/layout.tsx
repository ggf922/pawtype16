import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, Locale, getDir, isLocale } from "../lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dir = getDir(locale);
  return (
    <html lang={locale} dir={dir}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
