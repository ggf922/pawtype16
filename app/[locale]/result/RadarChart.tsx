"use client";

import type { AxisScore } from "../../lib/quiz";
import { Locale, t } from "../../lib/i18n";

type Props = {
  owner: AxisScore;
  pet: AxisScore;
  petName: string;
  locale: Locale;
};

const toRatio = (v: number) => (v + 100) / 200;

export default function RadarChart({ owner, pet, petName, locale }: Props) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 36;

  const LABELS = [
    { key: "E", label: t(locale, "result_axis_E") },
    { key: "S", label: t(locale, "result_axis_S") },
    { key: "A", label: t(locale, "result_axis_A") },
    { key: "C", label: t(locale, "result_axis_C") },
  ] as const;

  const angles = LABELS.map(
    (_, i) => (Math.PI * 2 * i) / LABELS.length - Math.PI / 2
  );

  function point(i: number, ratio: number) {
    const r = radius * ratio;
    return {
      x: cx + r * Math.cos(angles[i]),
      y: cy + r * Math.sin(angles[i]),
    };
  }

  function poly(scores: AxisScore) {
    return LABELS.map((l, i) => {
      const p = point(i, toRatio((scores as any)[l.key]));
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" ");
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[340px] h-auto">
        {gridLevels.map((g) => (
          <polygon
            key={g}
            points={LABELS.map((_, i) => {
              const p = point(i, g);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="#E8DFD0"
            strokeWidth={1}
          />
        ))}
        {LABELS.map((_, i) => {
          const p = point(i, 1);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#E8DFD0"
              strokeWidth={1}
            />
          );
        })}
        <polygon
          points={poly(owner)}
          fill="#8B6F47"
          fillOpacity={0.25}
          stroke="#8B6F47"
          strokeWidth={2}
        />
        <polygon
          points={poly(pet)}
          fill="#FF8C42"
          fillOpacity={0.25}
          stroke="#FF8C42"
          strokeWidth={2}
        />
        {LABELS.map((l, i) => {
          const p = point(i, 1.18);
          return (
            <text
              key={l.key}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={13}
              fontWeight={600}
              fill="#3A3A3A"
            >
              {l.label}
            </text>
          );
        })}
      </svg>
      <div className="mt-4 flex gap-5 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-cocoa" />{" "}
          {t(locale, "result_legend_owner")}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-accent" /> {petName}
        </span>
      </div>
    </div>
  );
}
