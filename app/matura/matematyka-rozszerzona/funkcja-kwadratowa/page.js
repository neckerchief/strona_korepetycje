"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad9",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–6",
    instruction: (
      <span>
        Wyznacz wszystkie wartości parametru <Mi>{"m"}</Mi>, dla których równanie
      </span>
    ),
    mathBlock: "x^2 - (2m+3)\\cdot x + 4m + 6 = 0",
    noteItems: [
      {
        text: "ma dwa różne rozwiązania rzeczywiste ",
      },
      { math: "x_1,\\ x_2" },
      { text: " spełniające warunek" },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup \\left(\\dfrac{5}{2},\\,+\\infty\\right)"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: dwa różne pierwiastki rzeczywiste wymagają <Mi>{"\\Delta > 0"}</Mi>.
          Oblicz deltę i znajdź przedział wartości <Mi>{"m"}</Mi>.
        </p>
        <p>
          Krok 2: z wzorów Viète'a wyraź <Mi>{"x_1+x_2"}</Mi> i{" "}
          <Mi>{"x_1 x_2"}</Mi> przez <Mi>{"m"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"x_1+x_2 = 2m+3 \\qquad x_1 x_2 = 4m+6"}</Mb>
        </FormulaBox>
        <p>
          Krok 3: skorzystaj z tożsamości, żeby przekształcić lewą stronę nierówności:
        </p>
        <FormulaBox>
          <Mb>{"x_1^3+x_2^3 = (x_1+x_2)\\bigl[(x_1+x_2)^2 - 3x_1 x_2\\bigr]"}</Mb>
        </FormulaBox>
        <p>
          Krok 4: znajdź część wspólną obu warunków (na <Mi>{"\\Delta"}</Mi> i na nierówność).
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">

        {/* ── Dodatkowy wzór (treść) ── */}
        <div className="bg-white border border-[#c4a8e8] rounded-xl px-5 py-4 my-2 text-center">
          <Mb>{"x_1^3 + x_2^3 > 7\\cdot(x_1 + x_2)"}</Mb>
        </div>

        <p className="font-semibold text-stone-800">Krok 1. Wzory Viète'a</p>
        <p>
          Dla równania <Mi>{"x^2 - (2m+3)x + 4m+6 = 0"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"x_1+x_2 = 2m+3 \\qquad x_1 x_2 = 4m+6"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Przekształcamy nierówność</p>
        <p>Korzystamy z tożsamości:</p>
        <FormulaBox>
          <Mb>{"x_1^3+x_2^3 = (x_1+x_2)\\bigl[(x_1+x_2)^2 - 3x_1 x_2\\bigr]"}</Mb>
        </FormulaBox>
        <p>Podstawiamy:</p>
        <Mb>{"(x_1+x_2)^2 - 3x_1 x_2 = (2m+3)^2 - 3(4m+6) = 4m^2+12m+9-12m-18 = 4m^2-9"}</Mb>
        <p>Zatem:</p>
        <Mb>{"x_1^3+x_2^3 = (2m+3)(4m^2-9) = (2m+3)(2m-3)(2m+3) = (2m+3)^2(2m-3)"}</Mb>
        <p>Nierówność przyjmuje postać:</p>
        <Mb>{"(2m+3)^2(2m-3) > 7(2m+3)"}</Mb>
        <Mb>{"(2m+3)^2(2m-3) - 7(2m+3) > 0"}</Mb>
        <Mb>{"(2m+3)\\bigl[(2m+3)(2m-3)-7\\bigr] > 0"}</Mb>
        <Mb>{"(2m+3)(4m^2-9-7) > 0"}</Mb>
        <Mb>{"(2m+3)(4m^2-16) > 0"}</Mb>
        <Mb>{"4(2m+3)(m^2-4) > 0"}</Mb>
        <Mb>{"(2m+3)(m+2)(m-2) > 0"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 3. Analiza znaku <Mi>{"(2m+3)(m+2)(m-2)"}</Mi>
        </p>
        <p>
          Miejsca zerowe: <Mi>{"m = -\\dfrac{3}{2}"}</Mi>,{" "}
          <Mi>{"m = -2"}</Mi>, <Mi>{"m = 2"}</Mi>.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm text-center w-full border-collapse my-2">
            <thead>
              <tr className="bg-[#f2ecfb]">
                <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"2m+3"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"m+2"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"m-2"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5">iloczyn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"m < -2"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(-2,\\,-\\tfrac{3}{2}\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
              </tr>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(-\\tfrac{3}{2},\\,2\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"m > 2"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Nierówność spełniona dla{" "}
          <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup (2,\\,+\\infty)"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Warunek <Mi>{"\\Delta > 0"}</Mi></p>
        <Mb>{"\\Delta = (2m+3)^2 - 4(4m+6) = 4m^2+12m+9-16m-24 = 4m^2-4m-15"}</Mb>
        <p>
          Pierwiastki: <Mi>{"\\Delta = 0"}</Mi> daje <Mi>{"m = \\dfrac{4 \\pm 16}{8}"}</Mi>,
          czyli <Mi>{"m = -\\dfrac{3}{2}"}</Mi> i <Mi>{"m = \\dfrac{5}{2}"}</Mi>.
        </p>
        <Mb>{"4m^2 - 4m - 15 > 0 \\quad \\Leftrightarrow \\quad m < -\\frac{3}{2} \\quad \\text{lub} \\quad m > \\frac{5}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Część wspólna obu warunków</p>
        <Mb>{"\\left[\\left(-2,\\,-\\tfrac{3}{2}\\right) \\cup (2,\\,+\\infty)\\right] \\cap \\left[\\left(-\\infty,\\,-\\tfrac{3}{2}\\right) \\cup \\left(\\tfrac{5}{2},\\,+\\infty\\right)\\right]"}</Mb>
        <p>
          Przedział <Mi>{"\\left(-2,\\,-\\tfrac{3}{2}\\right)"}</Mi> zawiera wyłącznie wartości
          mniejsze od <Mi>{"-\\tfrac{3}{2}"}</Mi>, więc leży w całości w zbiorze{" "}
          <Mi>{"\\Delta > 0"}</Mi>. Z <Mi>{"(2,\\,+\\infty)"}</Mi> zostaje część powyżej{" "}
          <Mi>{"\\tfrac{5}{2}"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup \\left(\\dfrac{5}{2},\\,+\\infty\\right)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad10",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–5",
    instruction: (
      <span>
        Funkcja <Mi>{"f"}</Mi> jest określona wzorem
      </span>
    ),
    mathBlock: "f(x) = (2m+1)\\cdot x^2 - 6x + m - 3",
    noteItems: [
      { text: "dla każdej liczby rzeczywistej " }, { math: "x" }, { text: ". Wyznacz wszystkie wartości parametru " }, { math: "m" }, { text: ", dla których funkcja " }, { math: "f" }, { text: " ma dokładnie dwa miejsca zerowe " }, { math: "x_1" }, { text: " oraz " }, { math: "x_2" }, { text: " przeciwnych znaków, które spełniają warunek " },
    ],
    answers: null,
    mathBlock2: "x_1^3 + x_2^3 > (x_1 + x_2)^4",

    answer: <p><Mi>{"m \\in \\left(\\dfrac{3}{2},\\, 3\\right)"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Dwa miejsca zerowe przeciwnych znaków <Mi>{"\\Leftrightarrow x_1 x_2 < 0"}</Mi>.
          Ze wzorów Viète'a:
        </p>
        <FormulaBox>
          <Mb>{"x_1 + x_2 = \\frac{6}{2m+1}, \\qquad x_1 x_2 = \\frac{m-3}{2m+1}"}</Mb>
        </FormulaBox>
        <p>
          Warunek <Mi>{"x_1 x_2 < 0"}</Mi> daje <Mi>{"m \\in (-\\frac{1}{2}, 3)"}</Mi>.
          Następnie uprość <Mi>{"x_1^3 + x_2^3 = (x_1+x_2)^3 - 3x_1 x_2(x_1+x_2)"}</Mi>
          i rozwiąż nierówność.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Warunek na dwa miejsca zerowe przeciwnych znaków</p>
        <p>Potrzebujemy: <Mi>{"2m+1 \\neq 0"}</Mi> i <Mi>{"x_1 x_2 < 0"}</Mi>.</p>
        <p>Wzory Viète'a: <Mi>{"s = x_1+x_2 = \\frac{6}{2m+1}"}</Mi>, <Mi>{"p = x_1 x_2 = \\frac{m-3}{2m+1}"}</Mi></p>
        <Mb>{"p < 0 \\quad\\Leftrightarrow\\quad \\frac{m-3}{2m+1} < 0 \\quad\\Leftrightarrow\\quad m \\in \\left(-\\frac{1}{2},\\, 3\\right)"}</Mb>
        <p>Na tym przedziale DELTA <Mi>{"= 36-4(2m+1)(m-3) = -8m^2+20m+48 > 0"}</Mi> ✓</p>

        <p className="font-semibold text-stone-800">Krok 2. Nierówność <Mi>{"x_1^3+x_2^3 > (x_1+x_2)^4"}</Mi></p>
        <Mb>{"x_1^3+x_2^3 = s^3-3ps"}</Mb>
        <p>Nierówność: <Mi>{"s^3-3ps > s^4"}</Mi>. Ponieważ <Mi>{"s = \\frac{6}{2m+1} > 0"}</Mi>, dzielimy przez <Mi>{"s > 0"}</Mi>:</p>
        <Mb>{"s^2(1-s) > 3p"}</Mb>
        <p>Podstawiamy i upraszczamy (mnożąc przez <Mi>{"(2m+1)^2 > 0"}</Mi>):</p>
        <Mb>{"12(2m-5) > (m-3)(2m+1)^2"}</Mb>
        <Mb>{"24m-60 > 4m^3-8m^2-11m-3"}</Mb>
        <Mb>{"4m^3-8m^2-35m+57 < 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozkład trójmianu</p>
        <p>Sprawdzamy <Mi>{"m = \\frac{3}{2}"}</Mi>: <Mi>{"4\\cdot\\frac{27}{8}-8\\cdot\\frac{9}{4}-35\\cdot\\frac{3}{2}+57 = \\frac{27}{2}-18-\\frac{105}{2}+57 = 0"}</Mi> ✓</p>
        <Mb>{"4m^3-8m^2-35m+57 = (2m-3)(2m^2-m-19)"}</Mb>
        <p>Pierwiastki <Mi>{"2m^2-m-19=0"}</Mi>: <Mi>{"m = \\frac{1\\pm\\sqrt{153}}{4} = \\frac{1\\pm 3\\sqrt{17}}{4}"}</Mi></p>
        <p><Mi>{"m_1 \\approx 3{,}34"}</Mi> (poza <Mi>{"(-\\frac{1}{2},3)"}</Mi>), <Mi>{"m_2 \\approx -2{,}84"}</Mi> (poza <Mi>{"(-\\frac{1}{2},3)"}</Mi>)</p>
        <p>Na przedziale <Mi>{"(-\\frac{1}{2},3)"}</Mi>: <Mi>{"2m^2-m-19 < 0"}</Mi>, więc znak <Mi>{"(2m-3)\\cdot(-)"}</Mi>:</p>
        <div className="overflow-x-auto my-2">
          <table className="text-sm text-center w-full border-collapse">
            <thead><tr className="bg-[#f2ecfb]">
              <th className="border border-[#d4b8f0] px-3 py-1">przedział</th>
              <th className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(2m-3)"}</Mi></th>
              <th className="border border-[#d4b8f0] px-3 py-1">iloczyn</th>
            </tr></thead>
            <tbody>
              <tr><td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(-\\tfrac{1}{2},\\,\\tfrac{3}{2})"}</Mi></td><td className="border border-[#d4b8f0] px-3 py-1 text-red-700">-</td><td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+ (niespeł.)</td></tr>
              <tr className="bg-emerald-50"><td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(\\tfrac{3}{2},\\,3)"}</Mi></td><td className="border border-[#d4b8f0] px-3 py-1 text-green-700">+</td><td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">- ✓</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"m \\in \\left(\\dfrac{3}{2},\\, 3\\right)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function FunkcjaKwadratowaPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/matura/matematyka-rozszerzona"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Funkcja kwadratowa</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 5
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Funkcja kwadratowa
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
