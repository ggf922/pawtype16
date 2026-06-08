// Dynamic OG image — accepts ?d=<share-code>

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { matchScore, toCode, typeNameOf } from "../../lib/quiz";
import { decodeShare } from "../../lib/share-code";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("d");
  const data = raw ? decodeShare(raw) : null;

  if (!data) {
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
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const ownerCode = toCode(data.owner);
  const petCode = toCode(data.pet);
  const result = matchScore(data.owner, data.pet);
  const petEmoji = data.petKind === "cat" ? "🐱" : "🐶";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #FBF7F0 0%, #F5EFE6 100%)",
          color: "#3A3A3A",
          padding: 56,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 36 }}>🐾</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#8B6F47" }}>
              PawType-16
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, color: "#8B6F47", fontWeight: 600 }}>
              나와 {data.petName}의 케미
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 8 }}>
              <span
                style={{
                  fontSize: 180,
                  lineHeight: 1,
                  fontWeight: 900,
                  color: "#FF8C42",
                }}
              >
                {result.score}
              </span>
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  marginLeft: 8,
                  paddingBottom: 24,
                }}
              >
                점
              </span>
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignSelf: "flex-start",
                background: "#F5EFE6",
                padding: "12px 22px",
                borderRadius: 999,
                fontSize: 32,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              {result.emoji} '{result.title}'
            </div>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "2px solid #F5EFE6",
                borderRadius: 20,
                padding: "14px 22px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 18, color: "#9b9b9b" }}>🧑 나</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#8B6F47" }}>
                {ownerCode}
              </span>
              <span style={{ fontSize: 16 }}>{typeNameOf(ownerCode, "owner")}</span>
            </div>
            <div
              style={{
                background: "#FFFFFF",
                border: "2px solid #F5EFE6",
                borderRadius: 20,
                padding: "14px 22px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 18, color: "#9b9b9b" }}>
                {petEmoji} {data.petName}
              </span>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#FF8C42" }}>
                {petCode}
              </span>
              <span style={{ fontSize: 16 }}>{typeNameOf(petCode, "pet")}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            width: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: 60,
              background: "linear-gradient(135deg, #F5EFE6, #FFE4CF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 160,
            }}
          >
            <span>🧑</span>
            <span style={{ fontSize: 60, margin: "0 4px", color: "#FF8C42" }}>
              💛
            </span>
            <span>{petEmoji}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
