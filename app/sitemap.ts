import type { MetadataRoute } from "next";
import { LOCALES } from "./lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://pawtype16.example.com";
  const now = new Date();
  const paths = ["", "/quiz", "/result", "/me"];
  return LOCALES.flatMap((locale) =>
    paths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${base}/${alt}${p}`])
        ),
      },
    }))
  );
}
