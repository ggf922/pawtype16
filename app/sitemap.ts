import type { MetadataRoute } from "next";
import { LOCALES } from "./lib/i18n";
import { TYPES } from "./lib/petTypes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pawtype16.com";
  const now = new Date();

  // 기본 페이지들 (about, faq 추가)
  const basicPaths = [
    "",
    "/quiz",
    "/result",
    "/me",
    "/types",
    "/about",
    "/faq",
    "/privacy",
    "/terms",
  ];

  // 기본 페이지 sitemap 엔트리 생성
  const basicEntries = LOCALES.flatMap((locale) =>
    basicPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority:
        p === ""
          ? 1
          : p === "/types"
          ? 0.9
          : p === "/about" || p === "/faq"
          ? 0.8
          : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${base}/${alt}${p}`])
        ),
      },
    }))
  );

  // 16개 유형 상세 페이지 (16 x 7 = 112개)
  const typeEntries = LOCALES.flatMap((locale) =>
    TYPES.map((type) => ({
      url: `${base}/${locale}/types/${type.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${base}/${alt}/types/${type.slug}`])
        ),
      },
    }))
  );

  // 블로그 포스트 4편 (4 x 7 = 28개)
  const blogSlugs = [
    "pet-personality-guide",
    "dog-personality-types",
    "cat-personality-types",
    "pet-owner-compatibility",
  ];

  const blogEntries = LOCALES.flatMap((locale) =>
    blogSlugs.map((slug) => ({
      url: `${base}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, `${base}/${alt}/blog/${slug}`])
        ),
      },
    }))
  );

  return [...basicEntries, ...typeEntries, ...blogEntries];
}
