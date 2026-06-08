// Server wrapper for /result — generates dynamic metadata based on ?d=

import type { Metadata } from "next";
import { decodeShare } from "../../lib/share-code";
import { matchScore } from "../../lib/quiz";
import ResultClient from "./ResultClient";

type Props = {
  params: { locale: string };
  searchParams: { d?: string };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  const code = searchParams?.d;
  const data = code ? decodeShare(code) : null;
  if (!data) {
    return {
      title: "결과",
      openGraph: { images: ["/api/og"] },
      twitter: { card: "summary_large_image", images: ["/api/og"] },
    };
  }
  const m = matchScore(data.owner, data.pet);
  const title = `${data.petName}와 나의 케미 ${m.score}점 · '${m.title}'`;
  const desc = `나와 ${data.petName}의 케미 — ${m.title} (${m.score}점). Big Five 기반 PawType-16 진단.`;
  const ogUrl = `/api/og?d=${encodeURIComponent(code!)}`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogUrl],
    },
  };
}

export default function ResultPage() {
  return <ResultClient />;
}
