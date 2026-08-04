import type { MetadataRoute } from "next";

const SITE_URL = "https://www.pawtype16.com";
const LOCALES = ["ko", "en", "ja", "zh", "es", "de", "ar"] as const;

// 16가지 유형 slug
const TYPE_SLUGS = [
  "e-h-s-h-a-h-c-h", "e-h-s-h-a-h-c-l", "e-h-s-h-a-l-c-h", "e-h-s-h-a-l-c-l",
  "e-h-s-l-a-h-c-h", "e-h-s-l-a-h-c-l", "e-h-s-l-a-l-c-h", "e-h-s-l-a-l-c-l",
  "e-l-s-h-a-h-c-h", "e-l-s-h-a-h-c-l", "e-l-s-h-a-l-c-h", "e-l-s-h-a-l-c-l",
  "e-l-s-l-a-h-c-h", "e-l-s-l-a-h-c-l", "e-l-s-l-a-l-c-h", "e-l-s-l-a-l-c-l",
];

// 블로그 포스트 slug (기존 4개 + 신규 5개 = 총 9개)
const BLOG_SLUGS = [
  "pet-personality-guide",
  "dog-personality-types",
  "cat-personality-types",
  "pet-owner-compatibility",
  "maltese-personality-guide",
  "poodle-personality-types",
  "shiba-inu-personality",
  "pomeranian-personality-guide",
  "golden-retriever-personality",
];

// 정적 페이지 slug (Contact 추가!)
const STATIC_SLUGS = [
  "", // home
  "quiz",
  "about",
  "faq",
  "contact", // ← 신규 추가!
  "privacy",
  "terms",
  "types",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 정적 페이지 (7개 언어 × 8개 = 56개)
  for (const locale of LOCALES) {
    for (const slug of STATIC_SLUGS) {
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: slug === "" ? "daily" : "weekly",
        priority: slug === "" ? 1.0 : 0.8,
      });
    }
  }

  // 16가지 유형 페이지 (7 × 16 = 112개)
  for (const locale of LOCALES) {
    for (const typeSlug of TYPE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/types/${typeSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // 블로그 포스트 (7 × 9 = 63개)
  for (const locale of LOCALES) {
    for (const blogSlug of BLOG_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${blogSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
