// Compact share-code encoder/decoder for result URLs.
// Replaces 1500-char JSON payload with a ~35-char base32 code.

import type { AxisScore } from "./quiz";

export type ShareData = {
  petKind: "dog" | "cat";
  petName: string;
  owner: AxisScore;
  pet: AxisScore;
};

function toByte(v: number): number {
  return Math.max(0, Math.min(200, Math.round(v + 100)));
}
function fromByte(b: number): number {
  return Math.max(-100, Math.min(100, b - 100));
}

const ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function encode40(bytes: number[]): string {
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b & 0xff);
  let out = "";
  for (let i = 0; i < 13; i++) {
    out = ALPHA[Number(n & 31n)] + out;
    n >>= 5n;
  }
  return out;
}

function decode40(s: string): number[] {
  let n = 0n;
  for (const ch of s) {
    const idx = ALPHA.indexOf(ch);
    if (idx < 0) throw new Error("bad share code");
    n = (n << 5n) | BigInt(idx);
  }
  const out: number[] = [];
  for (let i = 0; i < 8; i++) {
    out.unshift(Number(n & 0xffn));
    n >>= 8n;
  }
  return out;
}

export function encodeShare(d: ShareData): string {
  const bytes = [
    toByte(d.owner.E), toByte(d.owner.S), toByte(d.owner.A), toByte(d.owner.C),
    toByte(d.pet.E),   toByte(d.pet.S),   toByte(d.pet.A),   toByte(d.pet.C),
  ];
  const kindChar = d.petKind === "cat" ? "c" : "d";
  const safeName = d.petName.slice(0, 20);
  return `${encode40(bytes)}${kindChar}~${encodeURIComponent(safeName)}`;
}

export function decodeShare(code: string): ShareData | null {
  try {
    const tildeAt = code.indexOf("~");
    if (tildeAt < 0 || tildeAt < 14) return null;
    const head = code.slice(0, tildeAt);
    const name = decodeURIComponent(code.slice(tildeAt + 1));
    if (head.length !== 14) return null;
    const kindChar = head.charAt(13);
    const petKind: "dog" | "cat" = kindChar === "c" ? "cat" : "dog";
    const bytes = decode40(head.slice(0, 13));
    return {
      petKind,
      petName: name,
      owner: {
        E: fromByte(bytes[0]),
        S: fromByte(bytes[1]),
        A: fromByte(bytes[2]),
        C: fromByte(bytes[3]),
      },
      pet: {
        E: fromByte(bytes[4]),
        S: fromByte(bytes[5]),
        A: fromByte(bytes[6]),
        C: fromByte(bytes[7]),
      },
    };
  } catch {
    return null;
  }
}
