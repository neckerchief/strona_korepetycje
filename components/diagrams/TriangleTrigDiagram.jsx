"use client";
import { SvgMi } from "@/components/svg/SvgMi";

export function TriangleTrigDiagram({ variant = "slim" }) {
  if (variant === "bold") {
    return (
      <svg viewBox="0 0 185 148" className="w-full max-w-[200px] mx-auto block">
        <line x1="20" y1="120" x2="145" y2="28" stroke="#f97316" strokeWidth="2.5" />
        <line x1="20" y1="120" x2="145" y2="120" stroke="#6d3a8e" strokeWidth="2.5" />
        <line x1="145" y1="120" x2="145" y2="28" stroke="#3b82f6" strokeWidth="2.5" />
        <path d="M 132,120 A 13,13 0 0,0 145,107" stroke="#6b7280" strokeWidth="1.5" fill="none" />
        <circle cx="136" cy="112" r="2" fill="#6b7280" />
        <path d="M 46,120 A 26,26 0 0,0 41,100" stroke="#374151" strokeWidth="1.5" fill="none" />
        <SvgMi x={47} y={116} math="\alpha" fill="#374151" fontSize={13} />
        <SvgMi x={64} y={62} math="c" fill="#f97316" fontSize={13} />
        <SvgMi x={81} y={138} math="b" fill="#6d3a8e" fontSize={13} anchor="middle" />
        <SvgMi x={150} y={80} math="a" fill="#3b82f6" fontSize={13} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 185 148" className="w-full max-w-[200px] mx-auto block">
      <line x1="20" y1="120" x2="145" y2="28" stroke="#f97316" strokeWidth="1.5" />
      <line x1="20" y1="120" x2="145" y2="120" stroke="#6d3a8e" strokeWidth="1.5" />
      <line x1="145" y1="120" x2="145" y2="28" stroke="#3b82f6" strokeWidth="1.5" />
      <polyline points="145,110 135,110 135,120" fill="none" stroke="#6b7280" strokeWidth="1.5" />
      <path d="M 46,120 A 26,26 0 0,0 40.9,104.6" fill="none" stroke="#374151" strokeWidth="1.5" />
      <SvgMi x={33} y={116} math="\alpha" fill="#374151" fontSize={13} />
      <SvgMi x={64} y={62} math="c" fill="#f97316" fontSize={13} />
      <SvgMi x={81} y={138} math="b" fill="#6d3a8e" fontSize={13} anchor="middle" />
      <SvgMi x={150} y={80} math="a" fill="#3b82f6" fontSize={13} />
    </svg>
  );
}
