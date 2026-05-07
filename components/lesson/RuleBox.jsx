"use client";

import { cn } from "./cn";

const border = {
  green: "border-[#6d3a8e] bg-[#f2ecfb]",
  purple: "border-[#6d3a8e] bg-[#f2ecfb]",
  emerald: "border-[#10b981] bg-[#f0fdf4]",
  amber: "border-[#f97316] bg-[#fff3e6]",
  blue: "border-[#3b82f6] bg-[#eff6ff]",
  red: "border-[#ef4444] bg-[#fef2f2]",
};

const titleColor = {
  green: "text-[#52297a]",
  purple: "text-[#52297a]",
  emerald: "text-[#065f46]",
  amber: "text-[#9a3412]",
  blue: "text-[#1d4ed8]",
  red: "text-[#b91c1c]",
};

export function RuleBox({ title, color = "green", children }) {
  return (
    <div className={cn("border-l-4 rounded-xl px-5 py-4 my-5", border[color])}>
      {title && (
        <p className={cn("text-xs font-bold tracking-widest mb-2", titleColor[color])}>{title}</p>
      )}
      <div className="text-stone-700 text-base leading-relaxed space-y-1">{children}</div>
    </div>
  );
}