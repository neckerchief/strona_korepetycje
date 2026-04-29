"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Diagram: tabliczka znaków ────────────────────────────────

const DiagramZnaki = () => (
  <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto my-5 block">
    {/* Poziome linie siatki */}
    <line x1="85" y1="10" x2="385" y2="10" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="85" y1="40" x2="385" y2="40" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="85" y1="70" x2="385" y2="70" stroke="#e2e8f0" strokeWidth="1" />

    {/* Pionowe separatory w punktach krytycznych */}
    <line x1="175" y1="10" x2="175" y2="82" stroke="#c4a8e8" strokeWidth="1.5" />
    <line x1="280" y1="10" x2="280" y2="82" stroke="#c4a8e8" strokeWidth="1.5" />

    {/* Etykiety wyrażeń */}
    <text x="80" y="31" fontSize="12" textAnchor="end" fill="#444" fontStyle="italic">x + 2</text>
    <text x="80" y="61" fontSize="12" textAnchor="end" fill="#444" fontStyle="italic">x − 3</text>

    {/* Znaki – lewy segment (x < −2) */}
    <text x="130" y="33" fontSize="18" textAnchor="middle" fill="#991b1b" fontWeight="bold">−</text>
    <text x="130" y="63" fontSize="18" textAnchor="middle" fill="#991b1b" fontWeight="bold">−</text>

    {/* Znaki – środkowy segment (−2 ≤ x < 3) */}
    <text x="227" y="33" fontSize="18" textAnchor="middle" fill="#166534" fontWeight="bold">+</text>
    <text x="227" y="63" fontSize="18" textAnchor="middle" fill="#991b1b" fontWeight="bold">−</text>

    {/* Znaki – prawy segment (x ≥ 3) */}
    <text x="332" y="33" fontSize="18" textAnchor="middle" fill="#166534" fontWeight="bold">+</text>
    <text x="332" y="63" fontSize="18" textAnchor="middle" fill="#166534" fontWeight="bold">+</text>

    {/* Oś liczbowa */}
    <line x1="88" y1="82" x2="372" y2="82" stroke="#374151" strokeWidth="2" />
    <polygon points="372,77 384,82 372,87" fill="#374151" />
    <text x="388" y="86" fontSize="13" fill="#374151" fontStyle="italic">x</text>

    {/* Znaczniki */}
    <line x1="175" y1="77" x2="175" y2="87" stroke="#374151" strokeWidth="2" />
    <line x1="280" y1="77" x2="280" y2="87" stroke="#374151" strokeWidth="2" />

    {/* Etykiety na osi */}
    <text x="175" y="98" fontSize="12" textAnchor="middle" fill="#374151">−2</text>
    <text x="280" y="98" fontSize="12" textAnchor="middle" fill="#374151">3</text>
  </svg>
);

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad6",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–4",
    instruction: "Rozwiąż nierówność",
    mathBlock: "|x + 2| - |x - 3| < 6 + x",
    noteItems: [{ text: "Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p><Mi>{"x \\in (-11,\\, +\\infty)"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>Skorzystaj z definicji wartości bezwzględnej:</p>
        <FormulaBox>
          <Mb>{"\\left|w\\right| = \\begin{cases} w & \\text{jeżeli } w \\geq 0 \\\\ -w & \\text{jeżeli } w < 0 \\end{cases}"}</Mb>
        </FormulaBox>
        <p>
          Wyznacz miejsca zerowe wyrażeń pod modułami:{" "}
          <Mi>{"x + 2 = 0"}</Mi> daje <Mi>{"x = -2"}</Mi>, a{" "}
          <Mi>{"x - 3 = 0"}</Mi> daje <Mi>{"x = 3"}</Mi>.
          Podziel oś liczbową w tych punktach na trzy przedziały i rozwiązuj
          nierówność osobno w każdym z nich, pamiętając by na koniec wziąć sumę zbiorów.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Punkty krytyczne</p>
        <p>
          Wyrażenia pod modułami zmieniają znak w punktach{" "}
          <Mi>{"x = -2"}</Mi> i <Mi>{"x = 3"}</Mi>.
          Rozpatrujemy trzy przypadki.
        </p>
        <DiagramZnaki />

        {/* Przypadek 1 */}
        <p className="font-semibold text-stone-800">
          Przypadek 1: <Mi>{"x < -2"}</Mi>
        </p>
        <p>
          W tym przedziale <Mi>{"x + 2 < 0"}</Mi> i <Mi>{"x - 3 < 0"}</Mi>, więc:
        </p>
        <Mb>{"|x+2| = -(x+2), \\quad |x-3| = -(x-3)"}</Mb>
        <p>Nierówność staje się:</p>
        <Mb>{"-(x+2) - (-(x-3)) < 6 + x"}</Mb>
        <Mb>{"-x - 2 + x - 3 < 6 + x"}</Mb>
        <Mb>{"-5 < 6 + x \\quad\\Rightarrow\\quad x > -11"}</Mb>
        <p>
          Część wspólna z <Mi>{"x < -2"}</Mi>:{" "}
          <Mi>{"x \\in (-11,\\, -2)"}</Mi>
        </p>

        {/* Przypadek 2 */}
        <p className="font-semibold text-stone-800">
          Przypadek 2: <Mi>{"-2 \\leq x < 3"}</Mi>
        </p>
        <p>
          W tym przedziale <Mi>{"x + 2 \\geq 0"}</Mi> i <Mi>{"x - 3 < 0"}</Mi>, więc:
        </p>
        <Mb>{"|x+2| = x+2, \\quad |x-3| = -(x-3)"}</Mb>
        <p>Nierówność staje się:</p>
        <Mb>{"(x+2) - (-(x-3)) < 6 + x"}</Mb>
        <Mb>{"x + 2 + x - 3 < 6 + x"}</Mb>
        <Mb>{"2x - 1 < 6 + x \\quad\\Rightarrow\\quad x < 7"}</Mb>
        <p>
          Część wspólna z <Mi>{"-2 \\leq x < 3"}</Mi>:{" "}
          <Mi>{"x \\in [-2,\\, 3)"}</Mi>
        </p>

        {/* Przypadek 3 */}
        <p className="font-semibold text-stone-800">
          Przypadek 3: <Mi>{"x \\geq 3"}</Mi>
        </p>
        <p>
          W tym przedziale <Mi>{"x + 2 > 0"}</Mi> i <Mi>{"x - 3 \\geq 0"}</Mi>, więc:
        </p>
        <Mb>{"|x+2| = x+2, \\quad |x-3| = x-3"}</Mb>
        <p>Nierówność staje się:</p>
        <Mb>{"(x+2) - (x-3) < 6 + x"}</Mb>
        <Mb>{"5 < 6 + x \\quad\\Rightarrow\\quad x > -1"}</Mb>
        <p>
          Część wspólna z <Mi>{"x \\geq 3"}</Mi>:{" "}
          <Mi>{"x \\in [3,\\, +\\infty)"}</Mi>
        </p>

        {/* Suma */}
        <p className="font-semibold text-stone-800">Krok 2. Suma rozwiązań</p>
        <Mb>{"(-11,\\, -2) \\cup [-2,\\, 3) \\cup [3,\\, +\\infty) = (-11,\\, +\\infty)"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x \\in (-11,\\, +\\infty)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad5",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–3",
    instruction: (
      <span>
        Wykaż, że dla wszystkich liczb rzeczywistych <Mi>{"a"}</Mi>, <Mi>{"b"}</Mi> i{" "}
        <Mi>{"c"}</Mi> takich, że <Mi>{"2b = a - c"}</Mi> oraz <Mi>{"a^2 + b^2 = 1"}</Mi>{" "}
        prawdziwa jest nierówność
      </span>
    ),
    mathBlock: "2a^2 + 5b^2 > \\dfrac{1}{2}\\,c^2",
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Skorzystaj ze wzoru skróconego mnożenia na kwadrat sumy: z warunku{" "}
          <Mi>{"2b = a-c"}</Mi> wyraź <Mi>{"c = a-2b"}</Mi> i podstaw do prawej strony.
        </p>
        <FormulaBox>
          <Mb>{"(a-2b)^2 = a^2 - 4ab + 4b^2"}</Mb>
        </FormulaBox>
        <p>
          Pokaż, że różnica LHS - RHS jest zawsze dodatnia (wyróżnik trójmianu względem
          jednej zmiennej jest ujemny).
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Podstawiamy <Mi>{"c = a-2b"}</Mi></p>
        <p>Z warunku <Mi>{"2b = a-c"}</Mi> mamy <Mi>{"c = a-2b"}</Mi>. Prawa strona:</p>
        <Mb>{"\\frac{1}{2}c^2 = \\frac{1}{2}(a-2b)^2 = \\frac{1}{2}(a^2-4ab+4b^2)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Obliczamy różnicę LHS - RHS</p>
        <Mb>{"2a^2+5b^2 - \\frac{1}{2}(a^2-4ab+4b^2) = \\frac{3}{2}a^2 + 2ab + 3b^2"}</Mb>
        <p>Mnożymy przez 2 (nie zmienia znaku):</p>
        <Mb>{"3a^2 + 4ab + 6b^2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Pokazujemy, że trójmian jest zawsze dodatni</p>
        <p>
          Traktujemy <Mi>{"3a^2 + 4ab + 6b^2"}</Mi> jako trójmian względem <Mi>{"a"}</Mi>:
        </p>
        <Mb>{"\\Delta = (4b)^2 - 4 \\cdot 3 \\cdot 6b^2 = 16b^2 - 72b^2 = -56b^2 \\leq 0"}</Mb>
        <p>
          Dla <Mi>{"b \\neq 0"}</Mi>: DELTA <Mi>{"< 0"}</Mi> i współczynnik wiodący{" "}
          <Mi>{"3 > 0"}</Mi>, więc trójmian <Mi>{"> 0"}</Mi>.
        </p>
        <p>
          Dla <Mi>{"b = 0"}</Mi>: z <Mi>{"a^2+b^2=1"}</Mi> mamy <Mi>{"a = \\pm 1 \\neq 0"}</Mi>,
          więc <Mi>{"3a^2 = 3 > 0"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"\\text{Zatem } 2a^2+5b^2 - \\frac{1}{2}c^2 = \\frac{1}{2}(3a^2+4ab+6b^2) > 0 \\qquad \\blacksquare"}</Mb>
        </FormulaBox>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad11",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "3",
    points: "0–5",
    instruction: <span>Rozwiąż nierówność</span>,
    mathBlock: "\\frac{x+4}{x^2-9} - \\frac{x}{2x+6} \\geq \\frac{2x}{x-3} + 5",
    noteItems: null,
    answers: null,

    answer: <p><Mi>{"x \\in \\left(-3,\\,-\\dfrac{14}{5}\\right] \\cup \\left[\\dfrac{7}{3},\\,3\\right)"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Przenieś wszystko na lewą stronę i sprowadź do wspólnego mianownika{" "}
          <Mi>{"2(x-3)(x+3)"}</Mi>. Licznik uprość do postaci:
        </p>
        <Mb>{"-15x^2-7x+98 = -(3x-7)(5x+14)"}</Mb>
        <p>Rozwiąż nierówność wymierną, analizując znaki czynników.</p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Dziedzina</p>
        <Mb>{"x^2-9 \\neq 0 \\;\\text{ i }\\; 2x+6 \\neq 0 \\;\\text{ i }\\; x-3 \\neq 0 \\quad\\Rightarrow\\quad x \\neq \\pm 3"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Przenosimy wszystko na lewą stronę</p>
        <Mb>{"\\frac{x+4}{(x-3)(x+3)} - \\frac{x}{2(x+3)} - \\frac{2x}{x-3} - 5 \\geq 0"}</Mb>
        <p>Wspólny mianownik: <Mi>{"2(x-3)(x+3)"}</Mi>.</p>
        <Mb>{"\\frac{2(x+4) - x(x-3) - 4x(x+3) - 10(x-3)(x+3)}{2(x-3)(x+3)} \\geq 0"}</Mb>
        <p>Licznik:</p>
        <Mb>{"2x+8 - x^2+3x - 4x^2-12x - 10x^2+90 = -15x^2-7x+98"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozkład licznika</p>
        <Mb>{"-15x^2-7x+98 = -(15x^2+7x-98)"}</Mb>
        <p>DELTA <Mi>{"= 49 + 4 \\cdot 15 \\cdot 98 = 49 + 5880 = 5929 = 77^2"}</Mi></p>
        <Mb>{"x = \\frac{-7 \\pm 77}{30}: \\quad x_1 = \\frac{7}{3},\\quad x_2 = -\\frac{14}{5}"}</Mb>
        <Mb>{"15x^2+7x-98 = (3x-7)(5x+14)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Nierówność wymierna</p>
        <Mb>{"\\frac{-(3x-7)(5x+14)}{2(x-3)(x+3)} \\geq 0 \\quad\\Longleftrightarrow\\quad \\frac{(3x-7)(5x+14)}{2(x-3)(x+3)} \\leq 0"}</Mb>
        <p>Punkty krytyczne (po wyłączeniu dziedziny): <Mi>{"-3,\\; -\\tfrac{14}{5},\\; \\tfrac{7}{3},\\; 3"}</Mi></p>
        <div className="overflow-x-auto">
          <table className="text-sm text-center w-full border-collapse my-2">
            <thead>
              <tr className="bg-[#f2ecfb]">
                <th className="border border-[#d4b8f0] px-2 py-1">przedział</th>
                <th className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(3x{-}7)"}</Mi></th>
                <th className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(5x{+}14)"}</Mi></th>
                <th className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(x{-}3)"}</Mi></th>
                <th className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(x{+}3)"}</Mi></th>
                <th className="border border-[#d4b8f0] px-2 py-1">ułamek</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-[#d4b8f0] px-2 py-1"><Mi>{"x{<}-3"}</Mi></td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1 text-green-700 font-bold">+</td></tr>
              <tr className="bg-emerald-50"><td className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(-3,\\,-\\tfrac{14}{5})"}</Mi></td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1 text-red-700 font-bold">- ✓</td></tr>
              <tr><td className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(-\\tfrac{14}{5},\\,\\tfrac{7}{3})"}</Mi></td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1 text-green-700 font-bold">+</td></tr>
              <tr className="bg-emerald-50"><td className="border border-[#d4b8f0] px-2 py-1"><Mi>{"(\\tfrac{7}{3},\\,3)"}</Mi></td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">-</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1 text-red-700 font-bold">- ✓</td></tr>
              <tr><td className="border border-[#d4b8f0] px-2 py-1"><Mi>{"x{>}3"}</Mi></td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1">+</td><td className="border border-[#d4b8f0] px-2 py-1 text-green-700 font-bold">+</td></tr>
            </tbody>
          </table>
        </div>
        <p>Dołączamy punkty, gdzie licznik = 0 (<Mi>{"x=-\\tfrac{14}{5}"}</Mi> i <Mi>{"x=\\tfrac{7}{3}"}</Mi>).</p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x \\in \\left(-3,\\,-\\tfrac{14}{5}\\right] \\cup \\left[\\tfrac{7}{3},\\,3\\right)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function WyrazeniaAlgebraicznePage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/matura/matematyka-rozszerzona"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Wyrażenia algebraiczne, równania i nierówności</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 2
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Wyrażenia algebraiczne, równania i nierówności
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        <div className="space-y-12">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
