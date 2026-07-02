import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pawtype16.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PawType-16 — 우리는 어떤 발자국 한 쌍일까?",
    template: "%s · PawType-16",
  },
  description:
    "Big Five 행동과학으로 알아보는, 나와 반려동물의 16가지 케미스토리. 3분 진단으로 우리 사이 궁합 점수를 확인하세요.",
  applicationName: "PawType-16",
  keywords: [
    "PawType",
    "반려동물 성격",
    "반려동물 궁합",
    "펫 성향 테스트",
    "반려견 성격",
    "반려묘 성격",
    "Big Five",
    "pet personality test",
    "owner pet matching",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "PawType-16",
    title: "PawType-16 — 우리는 어떤 발자국 한 쌍일까?",
    description:
      "Big Five 행동과학으로 알아보는, 나와 반려동물의 16가지 케미스토리.",
    url: SITE_URL,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "PawType-16",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PawType-16 — 우리는 어떤 발자국 한 쌍일까?",
    description:
      "Big Five 행동과학으로 알아보는, 나와 반려동물의 16가지 케미스토리.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans">{children}</body>
    </html>
  );
}

