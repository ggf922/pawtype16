// Static fallback OG image for /[locale]/result
// Dynamic OG (with score) is served from /api/og?d=<payload> instead.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PawType-16 — chemistry result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FBF7F0, #F5EFE6)",
          color: "#3A3A3A",
        }}
      >
        <div style={{ fontSize: 120 }}>🐾</div>
        <div style={{ marginTop: 16, fontSize: 64, fontWeight: 800 }}>
          PawType-16
        </div>
        <div style={{ fontSize: 30, color: "#8B6F47", marginTop: 12 }}>
          What kind of paw-pair are we?
        </div>
        <div
          style={{
            marginTop: 30,
            padding: "12px 28px",
            borderRadius: 999,
            background: "#FF8C42",
            color: "white",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Take the quiz →
        </div>
      </div>
    ),
    { ...size }
  );
}
