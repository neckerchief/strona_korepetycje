"use client";

import { cn } from "./cn";

export function SectionHead({ id, eyebrow, title, spacing = "compact" }) {
  const pad = spacing === "roomy" ? "pt-12 pb-3" : "pt-4 pb-2";
  return (
    <div id={id} className={cn(pad, "scroll-mt-20")}>
      <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-1">{eyebrow}</p>
      <h2 className="font-display text-2xl md:text-3xl text-stone-800">{title}</h2>
    </div>
  );
}