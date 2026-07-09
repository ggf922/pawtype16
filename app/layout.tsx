import Script from "next/script";
import Footer from "./components/Footer";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.pawtype16.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PawType-16 — Pet Personality Chemistry Test | 반려동물 궁합 테스트",
    template: "%s · PawType-16",
  },
  description:
    "Discover your unique chemistry with your pet through the Big Five personality science. Free 3-minute test reveals 16 pet-owner matches. 나와 반려동물의 16가지 케미스토리를 3분 만에 확인하세요.",
  applicationName: "PawType-16",
  authors: [{ name: "PawType-16 Team" }],
  creator: "PawType-16",
  publisher: "큰바구니 (Modoomodoo)",
  keywords: [
    "PawType", "반려동물 성격", "반려동물 궁합", "펫 성향 테스트",
    "반려견 성격", "반려묘 성격", "MBTI 반려동물", "강아지 성격 테스트",
    "고양이 성격 테스트", "pet personality test", "pet MBTI",
    "dog personality", "cat personality", "owner pet matching",
    "Big Five pets", "pet chemistry test", "pet compatibility test",
    "ペット性格診断", "犬 性格テスト", "猫 性格テスト",
    "宠物性格测试", "宠物MBTI",
    "test de personalidad de mascotas", "Haustier Persönlichkeitstest",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ko-KR": `${SITE_URL}/ko`,
      "en-US": `${SITE_URL}/en`,
      "ja-JP": `${SITE_URL}/ja`,
      "zh-CN": `${SITE_URL}/zh`,
      "es-ES": `${SITE_URL}/es`,
      "de-DE": `${SITE_URL}/de`,
      "ar-SA": `${SITE_URL}/ar`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: "PawType-16",
    title: "PawType-16 — Pet Personality Chemistry Test",
    description:
      "Discover your unique chemistry with your pet through Big Five personality science. Free 3-minute test.",
    url: SITE_URL,
    locale: "ko_KR",
    alternateLocale: ["en_US", "ja_JP", "zh_CN", "es_ES", "de_DE", "ar_SA"],
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "PawType-16 - Pet Personality Chemistry Test",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawtype16",
    creator: "@pawtype16",
    title: "PawType-16 — Pet Personality Chemistry Test",
    description:
      "Discover your unique chemistry with your pet. Free 3-minute Big Five personality test.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "rB4gzPyN3KaGDbYRfWMAzT23iPDC4xpzJ9aQwFvfo3E",
    other: {
      "naver-site-verification": "fb67c608ddd4291c09e624efad0108093bc9e1ad",
    },
  },
  category: "Pets & Animals",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#8B6F47" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PawType-16",
  "alternateName": "펫타입-16",
  "url": SITE_URL,
  "description": "Big Five behavioral science based pet personality chemistry test",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "38420"
  },
  "author": {
    "@type": "Organization",
    "name": "큰바구니 (Modoomodoo)",
    "url": SITE_URL
  },
  "inLanguage": ["ko", "en", "ja", "zh", "es", "de", "ar"],
  "audience": { "@type": "Audience", "audienceType": "Pet Owners" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense - MUST BE IN HEAD FOR OWNERSHIP VERIFICATION */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7342222228523366"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-7342222228523366" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="alternate" hrefLang="ko-KR" href={`${SITE_URL}/ko`} />
        <link rel="alternate" hrefLang="en-US" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ja-JP" href={`${SITE_URL}/ja`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${SITE_URL}/zh`} />
        <link rel="alternate" hrefLang="es-ES" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="de-DE" href={`${SITE_URL}/de`} />
        <link rel="alternate" hrefLang="ar-SA" href={`${SITE_URL}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body>
        {children}
        <Footer />
        {/* AdFit SDK - 전체 사이트에서 광고 렌더링 보장 */}
        <Script
          src="//t1.kakaocdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
