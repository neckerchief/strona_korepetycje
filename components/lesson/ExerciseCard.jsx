"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export function ExerciseCard({ number, question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-[#f2ecfb] text-[#6d3a8e] text-sm font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <div className="text-stone-700 text-base leading-snug">{question}</div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors"
      >
        {open ? <EyeOff size={11} /> : <Eye size={11} />}
        {open ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
      </button>
      {open && (
        <div className="mt-3 text-sm text-[#52297a] bg-[#f2ecfb] border border-[#d4b8f0] rounded-xl px-4 py-3 font-semibold">
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            <div className="min-w-0 w-full">{answer}</div>
          </div>
        </div>
      )}
    </div>
  );
}