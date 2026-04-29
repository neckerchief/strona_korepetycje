"use client";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import { ChevronDown } from "lucide-react";

export const Mi = ({ children }) => <InlineMath math={children} />;
export const Mb = ({ children }) => <BlockMath math={children} />;

// Ramka na wzór z tablic (fioletowa, jak w podręcznikach)
export const FormulaBox = ({ children }) => (
  <div className="border-2 border-[#8b5cf6] rounded-lg px-6 py-4 my-4 text-center">
    {children}
  </div>
);

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Panel rozkładany ─────────────────────────────────────────

const Panel = ({ color, children }) => {
  const styles = {
    green:  "bg-emerald-50  border-t border-emerald-100",
    amber:  "bg-amber-50    border-t border-amber-100",
    purple: "bg-[#f9f5ff]   border-t border-[#e0d0f8]",
  };
  return (
    <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", styles[color])}>
      {children}
    </div>
  );
};

// ─── Trzy przyciski ───────────────────────────────────────────

const btn = {
  green:  "border-emerald-300 text-emerald-700 bg-emerald-50  hover:bg-emerald-100 data-[active=true]:bg-emerald-200 data-[active=true]:border-emerald-500",
  amber:  "border-amber-300   text-amber-700   bg-amber-50    hover:bg-amber-100   data-[active=true]:bg-amber-200   data-[active=true]:border-amber-500",
  purple: "border-[#c4a8e8]   text-[#52297a]   bg-[#f2ecfb]   hover:bg-[#ead5fb]  data-[active=true]:bg-[#d4bef5]   data-[active=true]:border-[#8b5cf6]",
};

const ToggleBtn = ({ label, color, active, onClick }) => (
  <button
    data-active={active}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
      btn[color]
    )}
  >
    {label}
    <ChevronDown
      size={12}
      className={cn("transition-transform duration-200", active && "rotate-180")}
    />
  </button>
);

// ─── Karta złożona: podpunkty (np. 1.1 / 1.2) ────────────────

export const SubTask = ({ label, points, children, answer, hint, solution }) => {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));
  const panelStyle = {
    green:  "bg-emerald-50  border-t border-emerald-100",
    amber:  "bg-amber-50    border-t border-amber-100",
    purple: "bg-[#f9f5ff]   border-t border-[#e0d0f8]",
  };
  return (
    <div className="border-t border-[#e8d8f8]">
      <div className="bg-[#ece4f9] px-5 py-2">
        <span className="font-semibold text-[#3b1a6e] text-sm">
          Zadanie {label}. ({points})
        </span>
      </div>
      <div className="bg-white px-5 py-4 text-sm text-stone-800 leading-relaxed">
        {children}
      </div>
      <div className="bg-stone-50 border-t border-stone-100 px-5 py-3 flex flex-wrap gap-2">
        {answer   && <ToggleBtn label="Odpowiedź"   color="green"  active={open === "answer"}   onClick={() => toggle("answer")} />}
        {hint     && <ToggleBtn label="Wskazówka"   color="amber"  active={open === "hint"}     onClick={() => toggle("hint")} />}
        {solution && <ToggleBtn label="Rozwiązanie" color="purple" active={open === "solution"} onClick={() => toggle("solution")} />}
      </div>
      {open === "answer"   && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.green)}>{answer}</div>}
      {open === "hint"     && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.amber)}>{hint}</div>}
      {open === "solution" && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.purple)}>{solution}</div>}
    </div>
  );
};

// ─── Karta zadania (styl maturalny) ──────────────────────────
//
// Pola zadania:
//   id, source, number, points
//   instruction  – tekst nad wzorem (opcjonalny)
//   mathBlock    – wzór w bloku (opcjonalny)
//   noteItems    – [{ text }, { math }] pod wzorem (opcjonalne)
//   answers      – ["A. ...", ...] dla zadań zamkniętych (opcjonalne)
//   answer       – ReactNode: krótka odpowiedź (opcjonalny)
//   hint         – ReactNode: wskazówka (opcjonalna)
//   solution     – ReactNode: rozwiązanie krok po kroku (opcjonalne)

export const TaskCard = ({
  number, points, instruction, mathBlock, noteItems,
  answers, answer, hint, solution, source,
}) => {
  const [open, setOpen] = useState(null); // "answer" | "hint" | "solution" | null

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  const hasAny = answer || hint || solution;

  return (
    <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
      {/* Nagłówek fioletowy */}
      <div className="bg-[#d4bef5] px-5 py-2.5">
        <span className="font-bold text-[#2d1458] text-sm">
          Zadanie {number}. ({points})
        </span>
      </div>

      {/* Treść */}
      <div className="bg-white px-5 py-5">
        {instruction && (
          <p className="font-semibold text-stone-800 text-base mb-3">{instruction}</p>
        )}
        {mathBlock && (
          <div className="text-center my-4">
            <Mb>{mathBlock}</Mb>
          </div>
        )}
        {noteItems && noteItems.length > 0 && (
          <p className="font-semibold text-stone-800 text-base mt-3">
            {noteItems.map((item, i) =>
              item.math
                ? <Mi key={i}>{item.math}</Mi>
                : <span key={i}>{item.text}</span>
            )}
          </p>
        )}
        {answers && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {answers.map((ans) => (
              <div key={ans} className="text-stone-700 text-sm font-semibold">{ans}</div>
            ))}
          </div>
        )}
      </div>

      {/* Przyciski */}
      {hasAny && (
        <div className="bg-stone-50 border-t border-stone-100 px-5 py-3 flex flex-wrap gap-2">
          {answer   && <ToggleBtn label="Odpowiedź" color="green"  active={open === "answer"}   onClick={() => toggle("answer")} />}
          {hint     && <ToggleBtn label="Wskazówka" color="amber"  active={open === "hint"}     onClick={() => toggle("hint")} />}
          {solution && <ToggleBtn label="Rozwiązanie" color="purple" active={open === "solution"} onClick={() => toggle("solution")} />}
        </div>
      )}

      {/* Panele */}
      {open === "answer"   && <Panel color="green">{answer}</Panel>}
      {open === "hint"     && <Panel color="amber">{hint}</Panel>}
      {open === "solution" && <Panel color="purple">{solution}</Panel>}

      {/* Stopka ze źródłem */}
      <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
        <span className="text-xs text-stone-400 italic">{source}</span>
      </div>
    </div>
  );
};
