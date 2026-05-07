"use client";

import { useState } from "react";
import {
  ChevronRight,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { cn } from "./cn";

export function WorkedExample({ title, steps }) {
  const [revealed, setRevealed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const reset = () => {
    setRevealed(0);
    setShowHint(false);
  };
  const next = () => {
    setRevealed((r) => Math.min(r + 1, steps.length - 1));
    setShowHint(false);
  };

  return (
    <div className="bg-[#f4eef3] border border-stone-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="px-5 py-3 border-b border-stone-200 flex items-center gap-2">
        <BookOpen size={14} className="text-[#6d3a8e]" />
        <p className="font-display text-stone-600 text-sm">{title}</p>
      </div>
      <div className="p-5 space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border transition-all duration-500 overflow-hidden",
              i <= revealed
                ? "border-stone-200 bg-white opacity-100"
                : "border-transparent bg-transparent opacity-0 h-0 pointer-events-none"
            )}
          >
            <div className="px-4 pt-3 pb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6d3a8e] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-[#6d3a8e] uppercase tracking-wide">{step.label}</span>
              </div>
              <div className="text-stone-700 text-sm leading-relaxed">{step.content}</div>
              {step.formula && (
                <div className="mt-2 px-5 py-2 bg-[#f4eef3] rounded-lg border border-stone-200 text-stone-800 text-center text-base leading-loose">
                  {step.formula}
                </div>
              )}
              {step.diagram && <div className="mt-3">{step.diagram}</div>}
              {i === revealed && showHint && step.hint && (
                <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <Lightbulb size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{step.hint}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5 flex items-center gap-3">
        {steps[revealed]?.hint && (
          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-2 hover:bg-stone-50 transition-colors"
          >
            {showHint ? <EyeOff size={12} /> : <Eye size={12} />}
            {showHint ? "Ukryj wskazówkę" : "Wskazówka"}
          </button>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={reset}
          className="text-stone-400 hover:text-stone-600 transition-colors p-2"
          title="Zacznij od nowa"
        >
          <RotateCcw size={15} />
        </button>
        {revealed < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Następny krok <ChevronRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <CheckCircle size={15} /> Gotowe!
          </button>
        )}
      </div>
      <div className="flex justify-center gap-2 pb-4">
        {steps.map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i <= revealed ? "bg-[#6d3a8e]" : "bg-stone-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}