"use client";
import { InlineMath } from "react-katex";

export function SvgMi({ x, y, math, fill = "#000", fontSize = 12, anchor = "start" }) {
  const w = 100;
  const h = Math.ceil(fontSize * 2);
  const ox = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <foreignObject x={ox} y={y - fontSize} width={w} height={h} style={{ overflow: "visible" }}>
      <div
        style={{
          color: fill,
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          whiteSpace: "nowrap",
          textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left",
        }}
      >
        <InlineMath math={math} />
      </div>
    </foreignObject>
  );
}
