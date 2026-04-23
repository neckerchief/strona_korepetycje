"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronRight, CheckCircle, RotateCcw,
  Eye, EyeOff, BookOpen, Lightbulb,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Inline fraction renderer (scales with surrounding text) ─
const Frac = ({ top, bot }) => (
  <span
    className="inline-flex flex-col items-center mx-0.5"
    style={{ verticalAlign: "middle", lineHeight: 1 }}
  >
    <span style={{ fontSize: "0.82em", fontWeight: 600, lineHeight: 1.2, minWidth: "0.9em", textAlign: "center", padding: "0 2px" }}>
      {top}
    </span>
    <span style={{ display: "block", height: "1px", background: "currentColor", alignSelf: "stretch", flexShrink: 0, margin: "1px 0" }} />
    <span style={{ fontSize: "0.82em", fontWeight: 600, lineHeight: 1.2, minWidth: "0.9em", textAlign: "center", padding: "0 2px" }}>
      {bot}
    </span>
  </span>
);

// ─── Mixed number renderer ────────────────────────────────────
const Mixed = ({ whole, top, bot }) => (
  <span className="inline-flex items-center gap-0.5" style={{ verticalAlign: "middle" }}>
    <span style={{ fontWeight: 600 }}>{whole}</span>
    <Frac top={top} bot={bot} />
  </span>
);

// ─── Crossed-out number with reduced value superscript ───────
// color: "orange" (n1↔d2 pair) | "blue" (d1↔n2 pair)
const Cancel = ({ val, res, color = "orange" }) => {
  const cfg = {
    orange: { strike: "#f97316", sup: "#c2410c", bg: "#fff7ed" },
    blue:   { strike: "#3b82f6", sup: "#1d4ed8", bg: "#eff6ff" },
  }[color];
  return (
    <span className="inline-flex items-start leading-none">
      <span style={{
        textDecoration: "line-through",
        textDecorationColor: cfg.strike,
        color: "#94a3b8",
        fontWeight: 600,
        backgroundColor: cfg.bg,
        borderRadius: "3px",
        padding: "0 2px",
      }}>
        {val}
      </span>
      <sup style={{ fontSize: "0.65em", color: cfg.sup, fontWeight: 700, lineHeight: 1, marginLeft: "1px" }}>
        {res}
      </sup>
    </span>
  );
};

// ─── Cross-cancellation row for multiplication examples ───────
// n1/d1 · n2/d2 where n1↔d2 cancel (pair A, orange) and d1↔n2 cancel (pair B, blue)
const CrossCancelRow = ({ n1, rn1, d1, rd1, n2, rn2, d2, rd2, result }) => {
  const divA = parseInt(n1) / parseInt(rn1);
  const divB = parseInt(d1) / parseInt(rd1);
  return (
    <div className="bg-white border border-stone-200 rounded-xl px-5 py-4 shadow-sm space-y-2.5">
      <div className="flex flex-wrap items-center gap-3 text-xl">
        <Frac top={<Cancel val={n1} res={rn1} color="orange" />} bot={<Cancel val={d1} res={rd1} color="blue" />} />
        <span className="text-stone-500">·</span>
        <Frac top={<Cancel val={n2} res={rn2} color="blue" />} bot={<Cancel val={d2} res={rd2} color="orange" />} />
        <span className="text-stone-300 px-1">→</span>
        <Frac top={rn1} bot={rd1} />
        <span className="text-stone-500">·</span>
        <Frac top={rn2} bot={rd2} />
        <span className="text-stone-300 px-1">=</span>
        <span className="font-semibold text-[#6d3a8e]">{result}</span>
      </div>
      <div className="flex flex-wrap gap-5 text-xs text-stone-500 border-t border-stone-100 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#f97316" }} />
          <strong style={{ color: "#c2410c" }}>{n1}</strong>
          {" i "}
          <strong style={{ color: "#c2410c" }}>{d2}</strong>
          {" ÷ "}<strong>{divA}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#3b82f6" }} />
          <strong style={{ color: "#1d4ed8" }}>{d1}</strong>
          {" i "}
          <strong style={{ color: "#1d4ed8" }}>{n2}</strong>
          {" ÷ "}<strong>{divB}</strong>
        </span>
      </div>
    </div>
  );
};

// ─── Text helper: converts "digit/digit" substrings to <Frac> ─
// Also handles multiline strings via \n → <br/>.
// Pass-through for non-strings (already JSX).
const T = (input) => {
  if (typeof input !== "string") return input;

  // Handle newlines first
  if (input.includes("\n")) {
    const lines = input.split("\n");
    return (
      <>
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {T(line)}
          </span>
        ))}
      </>
    );
  }

  // Replace numeric fraction patterns "a/b"
  const parts = input.split(/(\d+\/\d+)/g);
  if (parts.length === 1) return <>{input}</>;
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^(\d+)\/(\d+)$/);
        return m ? <Frac key={i} top={m[1]} bot={m[2]} /> : <span key={i}>{part}</span>;
      })}
    </>
  );
};

// ─── Highlighted rule / definition box ──────────────────────
const RuleBox = ({ title, color = "green", children }) => {
  const styles = {
    green: "border-[#6d3a8e] bg-[#f2ecfb]",
    amber: "border-[#f97316] bg-[#fff3e6]",
    blue:  "border-[#f97316] bg-[#fff3e6]",
  };
  const titleStyles = {
    green: "text-[#52297a]",
    amber: "text-[#9a3412]",
    blue:  "text-[#9a3412]",
  };
  return (
    <div className={cn("border-l-4 rounded-xl px-5 py-4 my-5", styles[color])}>
      {title && (
        <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", titleStyles[color])}>
          {title}
        </p>
      )}
      <div className="text-stone-700 text-base leading-relaxed space-y-1">{children}</div>
    </div>
  );
};

// ─── Section heading with anchor ────────────────────────────
const SectionHead = ({ id, eyebrow, title }) => (
  <div id={id} className="pt-4 pb-2 scroll-mt-20">
    <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-1">{eyebrow}</p>
    <h2 className="font-display text-2xl md:text-3xl text-stone-800">{title}</h2>
  </div>
);

// ─── Worked example (step-by-step interactive) ───────────────
const WorkedExample = ({ title, steps }) => {
  const [revealed, setRevealed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const reset = () => { setRevealed(0); setShowHint(false); };
  const next = () => { setRevealed((r) => Math.min(r + 1, steps.length - 1)); setShowHint(false); };

  return (
    <div className="bg-[#f4eef3] border border-stone-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="px-5 py-3 border-b border-stone-200 bg-[#f4eef3] flex items-center gap-2">
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
              <p className="text-stone-700 text-sm leading-relaxed">{T(step.content)}</p>
              {step.formula && (
                <div className="mt-2 px-5 py-3 bg-[#f4eef3] rounded-lg border border-stone-200 text-stone-800 text-center text-base leading-loose">
                  {T(step.formula)}
                </div>
              )}
              {i === revealed && showHint && step.hint && (
                <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <Lightbulb size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{T(step.hint)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5 flex items-center gap-3">
        {steps[revealed]?.hint && (
          <button
            onClick={() => setShowHint((h) => !h)}
            className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-2 hover:bg-stone-50 transition-colors"
          >
            {showHint ? <EyeOff size={12} /> : <Eye size={12} />}
            {showHint ? "Ukryj wskazówkę" : "Wskazówka"}
          </button>
        )}
        <div className="flex-1" />
        <button onClick={reset} className="text-stone-400 hover:text-stone-600 transition-colors p-2" title="Zacznij od nowa">
          <RotateCcw size={15} />
        </button>
        {revealed < steps.length - 1 ? (
          <button
            onClick={next}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Następny krok <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <CheckCircle size={15} /> Gotowe!
          </button>
        )}
      </div>
      <div className="flex justify-center gap-2 pb-4">
        {steps.map((_, i) => (
          <span key={i} className={cn("w-2 h-2 rounded-full transition-all duration-300", i <= revealed ? "bg-[#6d3a8e]" : "bg-stone-200")} />
        ))}
      </div>
    </div>
  );
};

// ─── Exercise card with hidden answer ───────────────────────
const ExerciseCard = ({ number, level, question, answer }) => {
  const [open, setOpen] = useState(false);
  const levelStyles = {
    SP: "bg-[#f2ecfb] text-[#52297a]",
    LO: "bg-[#fef3c7] text-[#92400e]",
  };
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-[#f2ecfb] text-[#6d3a8e] text-sm font-bold flex items-center justify-center flex-shrink-0">
            {number}
          </span>
          <p className="text-stone-700 text-base leading-snug">{T(question)}</p>
        </div>
        <span className={cn("text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0", levelStyles[level] ?? levelStyles.SP)}>
          {level}
        </span>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors"
      >
        {open ? <EyeOff size={11} /> : <Eye size={11} />}
        {open ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
      </button>
      {open && (
        <div className="mt-3 flex items-center gap-2 text-sm text-[#52297a] bg-[#f2ecfb] border border-[#d4b8f0] rounded-lg px-4 py-2 font-semibold">
          <CheckCircle size={14} className="flex-shrink-0" />
          <span>{T(answer)}</span>
        </div>
      )}
    </div>
  );
};

// ─── Table of contents ───────────────────────────────────────
const toc = [
  { id: "czym-jest",    label: "Czym jest ułamek?" },
  { id: "skracanie",    label: "Skracanie ułamków" },
  { id: "rozszerzanie", label: "Rozszerzanie i NWW" },
  { id: "dodawanie",    label: "Dodawanie i odejmowanie" },
  { id: "mnozenie",     label: "Mnożenie" },
  { id: "dzielenie",    label: "Dzielenie" },
  { id: "calosci",      label: "Wyciąganie całości" },
  { id: "rownania",     label: "Ułamki w równaniach" },
  { id: "przyklady",    label: "Przykłady z rozwiązaniem" },
  { id: "zadania",      label: "Zadania" },
];

// ─── Worked example data ─────────────────────────────────────

const exampleDodawanie = [
  {
    label: "Zadanie",
    content: "Oblicz: 7/12 + 5/18 − 2/9",
    hint: "Mianowniki są różne, więc trzeba znaleźć wspólny mianownik dla liczb 12, 18 i 9.",
    formula: null,
  },
  {
    label: "Rozkładamy mianowniki",
    content: "Rozkładamy każdy mianownik na czynniki pierwsze:",
            hint: "Szukamy NWW: bierzemy każdy czynnik pierwszy z największą potęgą, w jakiej pojawia się w którymkolwiek rozkładzie.",
    formula: "12 = 2² · 3\n18 = 2 · 3²\n9 = 3²",
  },
  {
    label: "Wyznaczamy NWW",
    content: "NWW(12, 18, 9) bierzemy każdy czynnik z największą potęgą:",
    hint: "Z 12 bierzemy 2², z 18 bierzemy 3². Żadna inna liczba nie daje wyższej potęgi.",
    formula: "NWW = 2² · 3² = 4 · 9 = 36",
  },
  {
    label: "Rozszerzamy ułamki",
    content: "Każdy ułamek rozszerzamy tak, żeby mianownik wynosił 36:",
            hint: "12 · 3 = 36, 18 · 2 = 36, 9 · 4 = 36. Liczniki mnożymy przez te same czynniki.",
    formula: "7/12 = 21/36\n5/18 = 10/36\n2/9 = 8/36",
  },
  {
    label: "Wykonujemy działania",
    content: "Teraz mianowniki są jednakowe, działamy tylko na licznikach:",
    hint: "Mianownik zostaje ten sam (36). Liczymy: 21 + 10 − 8.",
    formula: (
      <>
        <Frac top="21" bot="36" /> + <Frac top="10" bot="36" /> − <Frac top="8" bot="36" />{" "}
        = <Frac top="21 + 10 − 8" bot="36" /> = <Frac top="23" bot="36" />
      </>
    ),
  },
  {
    label: "Sprawdzamy, czy można skrócić",
    content: "Czy 23 i 36 mają wspólny dzielnik większy od 1?",
    hint: "23 jest liczbą pierwszą (dzieli się tylko przez 1 i 23). 36 = 2²·3², nie dzieli się przez 23. Ułamek jest już w najprostszej postaci.",
    formula: <>NWD(23, 36) = 1 ✓ &nbsp; Wynik: <Frac top="23" bot="36" /></>,
  },
];

const exampleMnozenie = [
  {
    label: "Zadanie",
    content: (
      <>Oblicz: <Frac top="5" bot="6" /> · <Frac top="12" bot="25" /></>
    ),
    hint: "Mnożymy ułamki przez licznik × licznik i mianownik × mianownik, ale warto najpierw poszukać skróceń.",
    formula: null,
  },
  {
    label: "Szukamy skróceń",
    content: (
      <>
        Zanim pomnożymy, sprawdzamy czy licznik jednego ułamka i mianownik drugiego mają wspólny dzielnik (skracanie „na krzyż"):
      </>
    ),
    hint: "5 i 25 mają NWD = 5. Podobnie 6 i 12 mają NWD = 6. Skracamy obie pary, unikniemy dużych liczb.",
    formula: "5 i 25: podziel przez 5 → 1 i 5\n6 i 12: podziel przez 6 → 1 i 2",
  },
  {
    label: "Mnożymy po skróceniu",
    content: (
      <>
        Zamiast <Frac top="5" bot="6" /> · <Frac top="12" bot="25" /> mamy teraz (po skróceniu):
      </>
    ),
    hint: "Po skróceniu liczniki to 1 i 2, mianowniki to 1 i 5. Teraz mnożenie jest proste.",
    formula: (
      <>
        1 · <Frac top="2" bot="5" /> = <Frac top="2" bot="5" />
      </>
    ),
  },
  {
    label: "Wynik",
    content: "Wynik jest już w najprostszej postaci:",
    hint: "NWD(2, 5) = 1, nie da się bardziej skrócić.",
    formula: <>Wynik: <Frac top="2" bot="5" /></>,
  },
];

const exampleRownanie = [
  {
    label: "Zadanie",
    content: (
      <>Rozwiąż równanie: <Frac top="x" bot="3" /> + <Frac top="x" bot="4" /> = 7</>
    ),
    hint: "Gdy w równaniu są ułamki, najwygodniej pozbyć się mianowników: pomnożyć obie strony przez NWW wszystkich mianowników.",
    formula: null,
  },
  {
    label: "Szukamy NWW mianowników",
    content: "Mianowniki to 3 i 4. Wyznaczamy NWW:",
    hint: "3 = 3, 4 = 2². NWW = 2² · 3 = 12.",
    formula: "NWW(3, 4) = 12",
  },
  {
    label: "Mnożymy obie strony przez 12",
    content: "Każdy wyraz równania mnożymy przez 12 (obie strony!):",
    hint: (
      <>12 · <Frac top="x" bot="3" /> = 4x,&nbsp; 12 · <Frac top="x" bot="4" /> = 3x,&nbsp; 12 · 7 = 84. Ułamki znikają!</>
    ),
    formula: (
      <>
        12 · <Frac top="x" bot="3" /> + 12 · <Frac top="x" bot="4" /> = 12 · 7
        <br />
        4x + 3x = 84
      </>
    ),
  },
  {
    label: "Rozwiązujemy",
    content: "Mamy teraz proste równanie liniowe:",
    hint: "7x = 84, więc x = 84 ÷ 7 = 12.",
    formula: "7x = 84  →  x = 12",
  },
  {
    label: "Sprawdzamy",
    content: "Podstawiamy x = 12 do oryginalnego równania:",
    hint: "12/3 = 4, 12/4 = 3, 4 + 3 = 7. ✓",
    formula: "12/3 + 12/4 = 4 + 3 = 7  ✓",
  },
];

// ─── Exercises data ──────────────────────────────────────────
const exercises = [
  { number: 1,  level: "SP", question: "Skróć do najprostszej postaci: 18/24",          answer: "3/4" },
  { number: 2,  level: "SP", question: "Skróć do najprostszej postaci: 56/84",          answer: "2/3" },
  { number: 3,  level: "SP", question: "Oblicz: 2/5 + 3/4",                             answer: <>= <Frac top="23" bot="20" /> = <Mixed whole="1" top="3" bot="20" /></> },
  { number: 4,  level: "SP", question: "Oblicz: 5/6 − 3/8",                             answer: <>= <Frac top="11" bot="24" /></> },
  { number: 5,  level: "SP", question: <>Zamień na ułamek niewłaściwy: <Mixed whole="3" top="2" bot="7" /></>,  answer: <>= <Frac top="23" bot="7" /></> },
  { number: 6,  level: "SP", question: <>Wyciągnij część całkowitą: <Frac top="17" bot="5" /></>,              answer: <>= <Mixed whole="3" top="2" bot="5" /></> },
  { number: 7,  level: "SP", question: <>Oblicz: <Frac top="3" bot="4" /> · <Frac top="8" bot="9" /></>,      answer: <>= <Frac top="2" bot="3" /></> },
  { number: 8,  level: "SP", question: <>Oblicz: <Frac top="5" bot="8" /> ÷ <Frac top="15" bot="4" /></>,    answer: <>= <Frac top="1" bot="6" /></> },
  { number: 9,  level: "LO", question: <>Oblicz: <Frac top="5" bot="12" /> + <Frac top="7" bot="18" /> − <Frac top="1" bot="6" /></>, answer: <>= <Frac top="13" bot="18" /></> },
  { number: 10, level: "LO",
    question: (
      <>Oblicz:{" "}
        <span style={{ fontSize: "1.5em", lineHeight: 0.9, verticalAlign: "middle", fontWeight: 300 }}>(</span>
        <Frac top="3" bot="4" /> + <Frac top="1" bot="6" />
        <span style={{ fontSize: "1.5em", lineHeight: 0.9, verticalAlign: "middle", fontWeight: 300 }}>)</span>
        {" ÷ "}
        <span style={{ fontSize: "1.5em", lineHeight: 0.9, verticalAlign: "middle", fontWeight: 300 }}>(</span>
        <Frac top="11" bot="12" /> − <Frac top="1" bot="3" />
        <span style={{ fontSize: "1.5em", lineHeight: 0.9, verticalAlign: "middle", fontWeight: 300 }}>)</span>
      </>
    ),
    answer: <>= <Frac top="55" bot="42" /> = <Mixed whole="1" top="13" bot="42" /></>,
  },
  { number: 11, level: "LO", question: <>Rozwiąż: <Frac top="x" bot="5" /> − <Frac top="x" bot="3" /> = 4</>,                answer: "x = −30" },
  { number: 12, level: "LO", question: <>Rozwiąż: <Frac top="2x+1" bot="3" /> + <Frac top="x−2" bot="6" /> = 2</>,          answer: "x = 2" },
];

// ─── Inline example row helper ───────────────────────────────
// Renders a row with left label, middle description, right result
const ExRow = ({ left, mid, right, keyVal }) => (
  <div key={keyVal} className="bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center gap-3">
    <span className="font-semibold text-stone-800 text-base">{left}</span>
    <span className="text-stone-300 px-1">→</span>
    <span className="text-stone-500 text-sm flex-1">{mid}</span>
    <span className="font-semibold text-[#6d3a8e] text-base">= {right}</span>
  </div>
);

// ─── Main page ───────────────────────────────────────────────
export default function UlamkiPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">

      {/* ── Top bar ── */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Powrót
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Materiały</span>
          <span className="text-stone-300">/</span>
          <span className="text-sm text-stone-600 font-medium">Ułamki od zera</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="flex gap-12">

          {/* ── Sidebar TOC (desktop) ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Spis treści</p>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-stone-500 hover:text-[#6d3a8e] hover:translate-x-1 transition-all duration-150 py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0 space-y-14">

            {/* Header */}
            <div>
              <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-2">Materiały · Matematyka · kl. 5–8 i LO</p>
              <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Ułamki od zera</h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
                Definicje, działania, przykłady i zadania do ćwiczenia.
              </p>
              {/* Mobile TOC */}
              <div className="lg:hidden mt-6 bg-white border border-stone-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Spis treści</p>
                <div className="flex flex-wrap gap-2">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="text-xs text-[#6d3a8e] border border-[#d4b8f0] rounded-full px-3 py-1 hover:bg-[#f2ecfb] transition-colors">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 1. Czym jest ułamek ── */}
            <section>
              <SectionHead id="czym-jest" eyebrow="Rozdział 1" title="Czym jest ułamek?" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Ułamek to sposób zapisania <strong className="text-stone-800">części całości</strong>.
                Jeśli pizzę podzielimy na 4 równe kawałki i weźmiemy 3, mamy <Frac top="3" bot="4" /> pizzy.
              </p>
              <RuleBox title="Budowa ułamka">
                <p><strong>Licznik</strong> (góra): mówi, ile części bierzemy.</p>
                <p><strong>Mianownik</strong> (dół): mówi, na ile równych części podzielono całość.</p>
                <p className="text-center mt-3 text-xl">
                  <Frac top="licznik" bot="mianownik" />
                </p>
              </RuleBox>

              <p className="text-stone-600 text-base leading-relaxed mb-3">
                Rozróżniamy trzy typy ułamków zwykłych:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {[
                  { title: "Właściwy",    note: "Wartość mniejsza od 1",               ex: <Frac top="3" bot="4" /> },
                  { title: "Niewłaściwy", note: "Wartość równa lub większa od 1",      ex: <Frac top="7" bot="4" /> },
                  { title: "Mieszany",    note: "Inna notacja ułamka niewłaściwego",   ex: <Mixed whole="1" top="3" bot="4" /> },
                ].map((t) => (
                  <div key={t.title} className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-sm">
                    <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-2">{t.title}</p>
                    <div className="text-3xl my-3 flex items-center justify-center">{t.ex}</div>
                    <p className="text-xs text-stone-400">{t.note}</p>
                  </div>
                ))}
              </div>

              <RuleBox title="Ważne" color="amber">
                <p>Mianownik <strong>nie może być zerem</strong>. Dzielenie przez zero nie ma sensu matematycznego.</p>
              </RuleBox>
            </section>

            {/* ── 2. Skracanie ── */}
            <section>
              <SectionHead id="skracanie" eyebrow="Rozdział 2" title="Skracanie ułamków" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Skracanie polega na podzieleniu licznika i mianownika przez tę samą liczbę (większą od 1).
                Wartość ułamka się <strong className="text-stone-800">nie zmienia</strong>, tylko zapis staje się prostszy.
              </p>

              <RuleBox title="Zasada skracania">
                <p>
                  Ułamek <Frac top="a" bot="b" /> możemy skrócić przez liczbę k, jeżeli k dzieli i licznik, i mianownik:
                </p>
                <p className="text-center mt-3 text-lg">
                  <Frac top="a" bot="b" /> = <Frac top="a ÷ k" bot="b ÷ k" />
                </p>
                <p className="mt-2">
                  Najlepiej skracać od razu przez <strong>NWD(a, b)</strong>, wtedy dostajemy ułamek w <strong>najprostszej postaci</strong> za jednym razem.
                </p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Jak znaleźć NWD?</h3>
              <p className="text-stone-600 text-base leading-relaxed mb-4">
                <strong className="text-stone-800">NWD</strong> (Największy Wspólny Dzielnik) to największa liczba, przez którą obie liczby dzielą się bez reszty.
                Rozkładamy każdą liczbę na czynniki pierwsze i bierzemy te, które pojawiają się w obu rozkładach, z mniejszą potęgą.
              </p>
              <div className="space-y-4 mb-4">
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-2">Przykład: NWD(24, 36)</p>
                  <p className="font-mono text-sm text-stone-700">24 = 2³ · 3</p>
                  <p className="font-mono text-sm text-stone-700">36 = 2² · 3²</p>
                  <p className="text-stone-600 text-sm mt-3">
                    W obu rozkładach powtarza się <strong className="text-stone-800">2</strong> i <strong className="text-stone-800">3</strong>.
                    Dla dwójki mniejsza potęga to 2², dla trójki to 3¹. Bierzemy ich iloczyn:
                  </p>
                  <p className="font-mono text-sm text-stone-700 mt-1">NWD = 2² · 3 = 4 · 3 = <strong>12</strong></p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-2">Przykład: NWD(18, 30)</p>
                  <p className="font-mono text-sm text-stone-700">18 = 2 · 3²</p>
                  <p className="font-mono text-sm text-stone-700">30 = 2 · 3 · 5</p>
                  <p className="text-stone-600 text-sm mt-3">
                    Powtarza się <strong className="text-stone-800">2</strong> (potęga 1 w obu) i <strong className="text-stone-800">3</strong> (mniejsza potęga to 3¹). Piątka pojawia się tylko w 30, więc jej nie bierzemy:
                  </p>
                  <p className="font-mono text-sm text-stone-700 mt-1">NWD = 2 · 3 = <strong>6</strong></p>
                </div>
              </div>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Przykłady</h3>
              <div className="space-y-3">
                {[
                  { f: [6,8],    nwd: "NWD(6, 8) = 2",     w: [3,4]   },
                  { f: [24,36],  nwd: "NWD(24, 36) = 12",  w: [2,3]   },
                  { f: [84,126], nwd: "NWD(84, 126) = 42", w: [2,3]   },
                ].map((r) => (
                  <div key={r.nwd} className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm">
                    <span className="w-16 text-center text-lg"><Frac top={r.f[0]} bot={r.f[1]} /></span>
                    <span className="text-stone-300">→</span>
                    <span className="text-stone-500 text-sm flex-1">{r.nwd}</span>
                    <span className="font-semibold text-[#6d3a8e] text-lg">= <Frac top={r.w[0]} bot={r.w[1]} /></span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 3. Rozszerzanie i NWW ── */}
            <section>
              <SectionHead id="rozszerzanie" eyebrow="Rozdział 3" title="Rozszerzanie i wspólny mianownik (NWW)" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Rozszerzanie to operacja odwrotna do skracania: mnożymy licznik i mianownik przez tę samą liczbę.
                Jest potrzebne wtedy, gdy chcemy dodać lub odjąć ułamki o różnych mianownikach.
              </p>

              <RuleBox title="Zasada rozszerzania">
                <p className="text-center text-lg mt-1">
                  <Frac top="a" bot="b" /> = <Frac top="a · k" bot="b · k" />
                </p>
                <p className="mt-2">Wartość ułamka się nie zmienia, piszemy ten sam ułamek w inny sposób.</p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Jak znaleźć NWW?</h3>
              <p className="text-stone-600 text-base leading-relaxed mb-3">
                <strong className="text-stone-800">NWW</strong> (Najmniejsza Wspólna Wielokrotność) to najmniejsza liczba, która dzieli się przez każdą z podanych liczb.
                To właśnie NWW będzie naszym wspólnym mianownikiem.
              </p>

              <RuleBox title="Jak liczyć NWW?">
                <p>1. Rozkładamy każdą liczbę na czynniki pierwsze.</p>
                <p>2. Bierzemy każdy czynnik z <strong>największą potęgą</strong>, w jakiej pojawia się w którymkolwiek rozkładzie.</p>
                <p>3. Mnożymy wybrane czynniki.</p>
              </RuleBox>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-2">Przykład: NWW(6, 8)</p>
                  <p className="font-mono text-sm text-stone-700">6 = 2 · 3</p>
                  <p className="font-mono text-sm text-stone-700">8 = 2³</p>
                  <p className="font-mono text-sm text-stone-700 mt-2">NWW = 2³ · 3 = <strong>24</strong></p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-2">Przykład: NWW(4, 6, 9)</p>
                  <p className="font-mono text-sm text-stone-700">4 = 2²</p>
                  <p className="font-mono text-sm text-stone-700">6 = 2 · 3</p>
                  <p className="font-mono text-sm text-stone-700">9 = 3²</p>
                  <p className="font-mono text-sm text-stone-700 mt-2">NWW = 2² · 3² = <strong>36</strong></p>
                </div>
              </div>
            </section>

            {/* ── 4. Dodawanie i odejmowanie ── */}
            <section>
              <SectionHead id="dodawanie" eyebrow="Rozdział 4" title="Dodawanie i odejmowanie ułamków" />

              <RuleBox title="Ten sam mianownik: łatwy przypadek">
                <p>Gdy mianowniki są równe, dodajemy/odejmujemy tylko liczniki, mianownik zostaje:</p>
                <p className="text-center mt-3 text-lg">
                  <Frac top="a" bot="c" /> ± <Frac top="b" bot="c" /> = <Frac top="a ± b" bot="c" />
                </p>
              </RuleBox>

              <RuleBox title="Różne mianowniki: krok po kroku">
                <p>1. Wyznacz NWW wszystkich mianowników.</p>
                <p>2. Rozszerz każdy ułamek tak, by jego mianownik wynosił NWW.</p>
                <p>3. Wykonaj działanie na licznikach.</p>
                <p>4. Skróć wynik, jeśli można.</p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Przykłady</h3>
              <div className="space-y-3">
                <ExRow
                  left={<><Frac top="1" bot="4" /> + <Frac top="2" bot="3" /></>}
                  mid={<>NWW(4,3) = 12 <span className="text-stone-300 px-1">→</span> <Frac top="3" bot="12" /> + <Frac top="8" bot="12" /> = <Frac top="3+8" bot="12" /></>}
                  right={<Frac top="11" bot="12" />}
                />
                <ExRow
                  left={<><Frac top="5" bot="6" /> − <Frac top="3" bot="8" /></>}
                  mid={<>NWW(6,8) = 24 <span className="text-stone-300 px-1">→</span> <Frac top="20" bot="24" /> − <Frac top="9" bot="24" /> = <Frac top="20−9" bot="24" /></>}
                  right={<Frac top="11" bot="24" />}
                />
                <ExRow
                  left={<><Frac top="7" bot="12" /> + <Frac top="5" bot="18" /> − <Frac top="2" bot="9" /></>}
                  mid={<>NWW = 36 <span className="text-stone-300 px-1">→</span> <Frac top="21" bot="36" /> + <Frac top="10" bot="36" /> − <Frac top="8" bot="36" /> = <Frac top="21+10−8" bot="36" /></>}
                  right={<Frac top="23" bot="36" />}
                />
              </div>
            </section>

            {/* ── 5. Mnożenie ── */}
            <section>
              <SectionHead id="mnozenie" eyebrow="Rozdział 5" title="Mnożenie ułamków" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Mnożenie ułamków jest prostsze niż dodawanie, <strong className="text-stone-800">nie trzeba szukać wspólnego mianownika</strong>.
              </p>

              <RuleBox title="Zasada mnożenia">
                <p className="text-center text-lg mt-1">
                  <Frac top="a" bot="b" /> · <Frac top="c" bot="d" /> = <Frac top="a · c" bot="b · d" />
                </p>
                <p className="mt-2">Licznik przez licznik, mianownik przez mianownik.</p>
              </RuleBox>

              <RuleBox title="Skracanie na krzyż: sprytna technika" color="blue">
                <p>
                  Zanim pomnożysz, sprawdź czy licznik jednego ułamka i mianownik drugiego mają wspólny dzielnik.
                  Jeśli tak, skróć <strong>przed</strong> mnożeniem, żeby uniknąć dużych liczb.
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  Kolory pokazują pary:
                  {" "}<span className="font-semibold" style={{ color: "#c2410c" }}>pomarańczowy</span>
                  {" = licznik 1. z mianownikiem 2.,  "}
                  <span className="font-semibold" style={{ color: "#1d4ed8" }}>niebieski</span>
                  {" = mianownik 1. z licznikiem 2."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xl">
                  <Frac top={<Cancel val="5" res="1" color="orange" />} bot={<Cancel val="6" res="1" color="blue" />} />
                  <span className="text-stone-500">·</span>
                  <Frac top={<Cancel val="12" res="2" color="blue" />} bot={<Cancel val="25" res="5" color="orange" />} />
                  <span className="text-stone-300 px-1">→</span>
                  <Frac top="1" bot="1" />
                  <span className="text-stone-500">·</span>
                  <Frac top="2" bot="5" />
                  <span className="text-stone-300 px-1">=</span>
                  <Frac top="2" bot="5" />
                </div>
                <div className="flex flex-wrap gap-5 text-xs text-stone-500 mt-3 justify-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f97316" }} />
                    <strong style={{ color: "#c2410c" }}>5</strong> i <strong style={{ color: "#c2410c" }}>25</strong>: ÷ 5
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3b82f6" }} />
                    <strong style={{ color: "#1d4ed8" }}>6</strong> i <strong style={{ color: "#1d4ed8" }}>12</strong>: ÷ 6
                  </span>
                </div>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Przykłady</h3>
              <div className="space-y-3">
                {/* 2/3 · 3/4: (2↔4)÷2, (3↔3)÷3 */}
                <CrossCancelRow
                  n1="2" rn1="1" d1="3" rd1="1"
                  n2="3" rn2="1" d2="4" rd2="2"
                  result={<Frac top="1" bot="2" />}
                />
                {/* 5/6 · 12/25: (5↔25)÷5, (6↔12)÷6 */}
                <CrossCancelRow
                  n1="5" rn1="1" d1="6" rd1="1"
                  n2="12" rn2="2" d2="25" rd2="5"
                  result={<Frac top="2" bot="5" />}
                />
                {/* 7/8 · 4/21: (7↔21)÷7, (4↔8)÷4 */}
                <CrossCancelRow
                  n1="7" rn1="1" d1="8" rd1="2"
                  n2="4" rn2="1" d2="21" rd2="3"
                  result={<Frac top="1" bot="6" />}
                />
              </div>
            </section>

            {/* ── 6. Dzielenie ── */}
            <section>
              <SectionHead id="dzielenie" eyebrow="Rozdział 6" title="Dzielenie ułamków" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Dzielenie przez ułamek jest równoznaczne z <strong className="text-stone-800">mnożeniem przez jego odwrotność</strong>.
              </p>

              <RuleBox title="Zasada dzielenia: odwróć i mnóż">
                <p className="text-center text-lg mt-1">
                  <Frac top="a" bot="b" /> ÷ <Frac top="c" bot="d" /> = <Frac top="a" bot="b" /> · <Frac top="d" bot="c" /> = <Frac top="a · d" bot="b · c" />
                </p>
              </RuleBox>

              <RuleBox title="Dlaczego to działa?" color="blue">
                <p>
                  Podzielić przez <Frac top="c" bot="d" /> to to samo, co zapytać:
                  „ile razy <Frac top="c" bot="d" /> mieści się w wyniku?".
                  Odpowiedź jest równoważna pomnożeniu przez <Frac top="d" bot="c" />, czyli odwrotność ułamka.
                </p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Przykłady</h3>
              <div className="space-y-3">
                <ExRow
                  left={<><Frac top="3" bot="4" /> ÷ <Frac top="2" bot="5" /></>}
                  mid={<><Frac top="3" bot="4" /> · <Frac top="5" bot="2" /> = <Frac top="15" bot="8" /></>}
                  right={<Mixed whole="1" top="7" bot="8" />}
                />
                <ExRow
                  left={<><Frac top="7" bot="12" /> ÷ <Frac top="14" bot="3" /></>}
                  mid={<><Frac top="7" bot="12" /> · <Frac top="3" bot="14" /> = <Frac top="21" bot="168" /></>}
                  right={<Frac top="1" bot="8" />}
                />
                <ExRow
                  left={<><Frac top="5" bot="9" /> ÷ 5</>}
                  mid={<><Frac top="5" bot="9" /> · <Frac top="1" bot="5" /> = <Frac top="5" bot="45" /></>}
                  right={<Frac top="1" bot="9" />}
                />
              </div>
            </section>

            {/* ── 7. Wyciąganie całości ── */}
            <section>
              <SectionHead id="calosci" eyebrow="Rozdział 7" title="Wyciąganie całości i zamiana" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Ułamki mieszane (np. <Mixed whole="1" top="3" bot="4" />) i ułamki niewłaściwe (np. <Frac top="7" bot="4" />) to <strong className="text-stone-800">dwa zapisy tej samej wartości</strong>.
                Warto umieć sprawnie zamieniać jedne na drugie.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <RuleBox title="Ułamek niewłaściwy → mieszany">
                  <p>Podziel licznik przez mianownik z resztą:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Część całkowita = iloraz (bez reszty)</li>
                    <li>Licznik = reszta</li>
                    <li>Mianownik = bez zmian</li>
                  </ul>
                  <p className="text-center mt-3 text-lg">
                    <Frac top="7" bot="4" /> → 7 ÷ 4 = 1 reszta 3 → <Mixed whole="1" top="3" bot="4" />
                  </p>
                </RuleBox>
                <RuleBox title="Mieszany → ułamek niewłaściwy">
                  <p>Całość mnożymy przez mianownik i dodajemy licznik:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Nowy licznik = całość · mianownik + licznik</li>
                    <li>Mianownik = bez zmian</li>
                  </ul>
                  <p className="text-center mt-3 text-lg">
                    <Mixed whole="2" top="3" bot="5" /> = <Frac top="2·5+3" bot="5" /> = <Frac top="13" bot="5" />
                  </p>
                </RuleBox>
              </div>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Więcej przykładów</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { od: <Frac top="13" bot="5" />,              krok: <Frac top="10+3" bot="5" />,  do: <Mixed whole="2" top="3" bot="5" /> },
                  { od: <Frac top="17" bot="3" />,              krok: <Frac top="15+2" bot="3" />,  do: <Mixed whole="5" top="2" bot="3" /> },
                  { od: <Mixed whole="3" top="2" bot="7" />,    krok: <Frac top="3·7+2" bot="7" />, do: <Frac top="23" bot="7" /> },
                  { od: <Mixed whole="4" top="5" bot="6" />,    krok: <Frac top="4·6+5" bot="6" />, do: <Frac top="29" bot="6" /> },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-center flex-wrap gap-2 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm text-lg">
                    <span className="text-stone-700">{r.od}</span>
                    <span className="text-stone-400 text-sm font-normal">=</span>
                    <span className="text-stone-600">{r.krok}</span>
                    <span className="text-stone-400 text-sm font-normal">=</span>
                    <span className="font-semibold text-[#6d3a8e]">{r.do}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 8. Ułamki w równaniach ── */}
            <section>
              <SectionHead id="rownania" eyebrow="Rozdział 8 · Poziom LO" title="Ułamki w równaniach" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Gdy w równaniu pojawiają się ułamki, najwygodniej <strong className="text-stone-800">pomnożyć obie strony przez NWW mianowników</strong>.
                Dzięki temu ułamki znikają i zostaje proste równanie liniowe.
              </p>

              <RuleBox title="Strategia">
                <p>1. Znajdź NWW wszystkich mianowników w równaniu.</p>
                <p>2. Pomnóż <strong>każdy wyraz</strong> po obu stronach przez NWW.</p>
                <p>3. Uprość (ułamki znikają).</p>
                <p>4. Rozwiąż powstałe równanie liniowe.</p>
                <p>5. Sprawdź wynik, podstawiając do oryginalnego równania.</p>
              </RuleBox>

              <RuleBox title="Częsty błąd" color="amber">
                <p>
                  Mnożymy <strong>wszystkie wyrazy</strong> po obu stronach, nie tylko te z ułamkami!
                  Jeśli po prawej stronie stoi sama liczba całkowita (np. 7), też mnożymy ją przez NWW.
                </p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-4">Typowe równania</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    eq: <><Frac top="x" bot="3" /> + <Frac top="x" bot="4" /> = 7</>,
                    nww: "NWW = 12",
                    kroki: ["×12:  4x + 3x = 84", "7x = 84"],
                    wynik: "x = 12",
                  },
                  {
                    eq: <><Frac top="x" bot="2" /> − <Frac top="x" bot="5" /> = 3</>,
                    nww: "NWW = 10",
                    kroki: ["×10:  5x − 2x = 30", "3x = 30"],
                    wynik: "x = 10",
                  },
                  {
                    eq: <><Frac top="x+1" bot="3" /> + <Frac top="x" bot="6" /> = 2</>,
                    nww: "NWW = 6",
                    kroki: ["×6:  2(x+1) + x = 12", "2x + 2 + x = 12", "3x + 2 = 12  →  3x = 10"],
                    wynik: <>x = <Frac top="10" bot="3" /></>,
                  },
                  {
                    eq: <><Frac top="2x" bot="5" /> − <Frac top="3" bot="10" /> = <Frac top="x" bot="2" /></>,
                    nww: "NWW = 10",
                    kroki: ["×10:  4x − 3 = 5x", "4x − 5x = 3", "−x = 3"],
                    wynik: "x = −3",
                  },
                ].map((r, i) => (
                  <div key={i} className="bg-white border border-stone-200 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <span className="font-semibold text-stone-800 text-base">{r.eq}</span>
                      <span className="text-xs font-bold text-stone-400 bg-stone-50 border border-stone-200 rounded-full px-2 py-0.5 flex-shrink-0">{r.nww}</span>
                    </div>
                    <div className="border-l-2 border-[#d4b8f0] pl-3 space-y-1">
                      {r.kroki.map((k, ki) => (
                        <p key={ki} className="text-stone-600 text-sm font-mono">{k}</p>
                      ))}
                      <p className="font-semibold text-[#6d3a8e] pt-1">{r.wynik}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 9. Interaktywne przykłady ── */}
            <section>
              <SectionHead id="przyklady" eyebrow="Rozdział 9" title="Przykłady z pełnym rozwiązaniem" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-2">
                Rozwiązuj krok po kroku, klikaj „Następny krok" i proś o wskazówkę, kiedy chcesz.
              </p>

              <WorkedExample title="Przykład 1: dodawanie i odejmowanie z trzema ułamkami" steps={exampleDodawanie} />
              <WorkedExample title="Przykład 2: mnożenie ze skracaniem na krzyż" steps={exampleMnozenie} />
              <WorkedExample title="Przykład 3: ułamek w równaniu (poziom LO)" steps={exampleRownanie} />
            </section>

            {/* ── 10. Zadania ── */}
            <section>
              <SectionHead id="zadania" eyebrow="Rozdział 10" title="Zadania do samodzielnego rozwiązania" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-5">
                Rozwiąż zadanie, a następnie kliknij „Pokaż odpowiedź" i sprawdź wynik.
                Zadania oznaczone{" "}
                <span className="text-xs font-bold uppercase tracking-wide bg-[#f2ecfb] text-[#52297a] px-2 py-0.5 rounded-full">SP</span>{" "}
                są na poziomie klasy 7–8, a{" "}
                <span className="text-xs font-bold uppercase tracking-wide bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full">LO</span>{" "}
                to liceum.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {exercises.map((ex) => (
                  <ExerciseCard key={ex.number} {...ex} />
                ))}
              </div>
            </section>

            {/* ── CTA ── */}
            <div className="border-t border-stone-200 pt-12 text-center">
              <p className="text-stone-500 text-lg mb-2">Masz pytania albo coś jest niejasne?</p>
              <p className="text-stone-400 text-sm mb-8">Umów się na lekcję, wszystko omówimy razem, bez pośpiechu.</p>
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] font-bold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                Umów lekcję
              </Link>
            </div>

          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-5 mt-10 bg-white">
        <div className="max-w-5xl mx-auto text-center text-stone-400 text-sm">
          © 2025 Korepetycje Paulina · Warszawa
        </div>
      </footer>

    </div>
  );
}
