"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, SideWork, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna z matematyki, Politechnika Łódzka, marzec 2025, poziom rozszerzony";

const tasks = [
  {
    id: "smwp-2026-styczen-zad8",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–6",
    instruction: (
      <span>
        Wielomian <Mi>{"W(x) = x^3 + ax^2 + bx + c"}</Mi> jest określony dla każdej liczby
        rzeczywistej <Mi>{"x"}</Mi>. W kartezjańskim układzie współrzędnych{" "}
        <Mi>{"(x,y)"}</Mi> punkt <Mi>{"(-2,\\,-4)"}</Mi> należy do wykresu wielomianu{" "}
        <Mi>{"W"}</Mi>. Współczynnik kierunkowy stycznej do wykresu wielomianu <Mi>{"W"}</Mi>{" "}
        w punkcie o pierwszej współrzędnej równej <Mi>{"2"}</Mi> wynosi <Mi>{"23"}</Mi>.
        Ponadto, suma współczynników wielomianu <Mi>{"W"}</Mi> jest równa <Mi>{"8"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: [{ text: "Wyznacz wzór wielomianu W oraz oblicz jego wszystkie pierwiastki. Zapisz obliczenia." }],
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>
          <Mi>{"W(x) = x^3 + 2x^2 + 3x + 2"}</Mi>
        </p>
        <p>
          Jedyny pierwiastek rzeczywisty: <Mi>{"x = -1"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Trzy warunki z treści dają układ trzech równań:</p>
        <p>
          1. Punkt <Mi>{"(-2,-4)"}</Mi> należy do wykresu, więc{" "}
          <Mi>{"W(-2) = -4"}</Mi>.
        </p>
        <p>
          2. Suma współczynników <Mi>{"W"}</Mi> to wartość wielomianu w{" "}
          <Mi>{"x = 1"}</Mi>, więc <Mi>{"W(1) = 8"}</Mi>.
        </p>
        <p>
          3. Współczynnik kierunkowy stycznej w punkcie o odciętej <Mi>{"2"}</Mi> to{" "}
          <Mi>{"W'(2) = 23"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"W'(x) = 3x^2 + 2ax + b"}</Mb>
        </FormulaBox>
        <p>
          Po wyznaczeniu <Mi>{"a, b, c"}</Mi> szukaj pierwiastków metodą prób (np. <Mi>{"x = -1"}</Mi>),
          a resztę sprawdź deltą.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Trzy równania z warunków zadania</p>

        <p>
          <span className="font-semibold">Warunek 1.</span> Punkt <Mi>{"(-2,-4)"}</Mi>{" "}
          leży na wykresie, więc <Mi>{"W(-2) = -4"}</Mi>:
        </p>
        <Mb>{"(-2)^3 + a(-2)^2 + b(-2) + c = -4"}</Mb>
        <Mb>{"4a - 2b + c = 4 \\quad \\text{(I)}"}</Mb>

        <p>
          <span className="font-semibold">Warunek 2.</span> Suma współczynników wielomianu to{" "}
          <Mi>{"W(1)"}</Mi>, więc <Mi>{"W(1) = 8"}</Mi>:
        </p>
        <Mb>{"1 + a + b + c = 8"}</Mb>
        <Mb>{"a + b + c = 7 \\quad \\text{(II)}"}</Mb>

        <p>
          <span className="font-semibold">Warunek 3.</span> Współczynnik kierunkowy stycznej
          w punkcie o odciętej <Mi>{"2"}</Mi> to wartość pochodnej w tym punkcie:
        </p>
        <FormulaBox>
          <Mb>{"W'(x) = 3x^2 + 2ax + b"}</Mb>
        </FormulaBox>
        <Mb>{"W'(2) = 23 \\quad \\Rightarrow \\quad 12 + 4a + b = 23"}</Mb>
        <Mb>{"4a + b = 11 \\quad \\text{(III)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Rozwiązujemy układ równań</p>
        <p>Z równania (III):</p>
        <Mb>{"b = 11 - 4a"}</Mb>
        <p>
          Podstawiamy do (II):
        </p>
        <Mb>{"a + (11-4a) + c = 7 \\quad \\Rightarrow \\quad c = 3a - 4 \\quad \\text{(IV)}"}</Mb>
        <p>Podstawiamy <Mi>{"b"}</Mi> i <Mi>{"c"}</Mi> do (I):</p>
        <Mb>{"4a - 2(11-4a) + (3a-4) = 4"}</Mb>
        <Mb>{"4a - 22 + 8a + 3a - 4 = 4"}</Mb>
        <Mb>{"15a = 30 \\quad \\Rightarrow \\quad a = 2"}</Mb>
        <p>Stąd:</p>
        <Mb>{"b = 11 - 4 \\cdot 2 = 3, \\qquad c = 3 \\cdot 2 - 4 = 2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wzór wielomianu</p>
        <FormulaBox>
          <Mb>{"W(x) = x^3 + 2x^2 + 3x + 2"}</Mb>
        </FormulaBox>
        <p>Sprawdzenie:</p>
        <Mb>{"W(-2) = -8+8-6+2 = -4 \\checkmark, \\quad W'(2) = 12+8+3 = 23 \\checkmark, \\quad W(1) = 1+2+3+2 = 8 \\checkmark"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Szukamy pierwiastków</p>
        <p>
          Próbujemy <Mi>{"x = -1"}</Mi>:
        </p>
        <Mb>{"W(-1) = -1 + 2 - 3 + 2 = 0 \\quad \\Rightarrow \\quad x = -1 \\text{ jest pierwiastkiem}"}</Mb>
        <p>
          Dzielimy <Mi>{"W(x)"}</Mi> przez <Mi>{"(x+1)"}</Mi>:
        </p>

        <div className="flex flex-col gap-4">
          <div className="min-w-0">
            <Mb>{"W(x) = (x+1)(x^2 + x + 2)"}</Mb>
          </div>
          <SideWork className="w-full" title="Dzielenie wielomianów">
            <Mb>
              {[
                "\\begin{aligned}",
                "& \\underline{\\hspace{0.1em}x^2+x+2\\hspace{4.1em}} \\\\[0.25em]",
                "& (x^3+2x^2+3x+2):(x+1) \\\\[0.45em]",
                "& \\underline{-(x^3+x^2)\\hspace{2.8em}} \\\\[0.25em]",
                "& \\hspace{1.5em}x^2+3x+2 \\\\[0.45em]",
                "& \\hspace{1.5em}\\underline{-(x^2+x)\\hspace{1.25em}} \\\\[0.25em]",
                "& \\hspace{3em}2x+2 \\\\[0.45em]",
                "& \\hspace{3em}\\underline{-(2x+2)} \\\\[0.25em]",
                "& \\hspace{4.5em}0",
                "\\end{aligned}",
              ].join("")}
            </Mb>
          </SideWork>
        </div>

        <p className="font-semibold text-stone-800">Krok 5. Badamy trójmian <Mi>{"x^2 + x + 2"}</Mi></p>
        <Mb>{"\\Delta = 1^2 - 4 \\cdot 1 \\cdot 2 = 1 - 8 = -7 < 0"}</Mb>
        <p>
          Mamy <Mi>{"\\Delta < 0"}</Mi>, więc <Mi>{"x^2+x+2"}</Mi> nie ma pierwiastków rzeczywistych.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"W(x) = x^3 + 2x^2 + 3x + 2"}</Mi>. Jedyny pierwiastek rzeczywisty:{" "}
            <Mi>{"x = -1"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad4-reszta-wielomian",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "4",
    points: null,
    instruction: (
      <span>
        Reszta z dzielenia wielomianu <Mi>{"W(x) = x^{2025} - 2x^{2024} + 2x^{2023} - 1"}</Mi> przez{" "}
        <Mi>{"x^3 - x"}</Mi> jest postaci <Mi>{"Ax^2 + Bx + C"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: [{ text: "Oblicz współczynniki " }, { math: "A" }, { text: ", " }, { math: "B" }, { text: ", " }, { math: "C" }, { text: "." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"A = -2"}</Mi>, <Mi>{"B = 3"}</Mi>, <Mi>{"C = -1"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>Rozłóż dzielnik na czynniki:</p>
        <Mb>{"x^3 - x = x(x - 1)(x + 1)"}</Mb>
        <p>
          Skoro <Mi>{"W(x) = Q(x) \\cdot (x^3 - x) + Ax^2 + Bx + C"}</Mi>, to dla każdego
          pierwiastka dzielnika reszta musi dawać tę samą wartość co <Mi>{"W(x)"}</Mi>.
          Podstaw <Mi>{"x = 0"}</Mi>, <Mi>{"x = 1"}</Mi> i <Mi>{"x = -1"}</Mi>, żeby
          dostać układ trzech równań na <Mi>{"A"}</Mi>, <Mi>{"B"}</Mi>, <Mi>{"C"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozkład dzielnika</p>
        <Mb>{"x^3 - x = x(x-1)(x+1)"}</Mb>
        <p>
          Dzielnik ma trzy pierwiastki: <Mi>{"x = 0"}</Mi>, <Mi>{"x = 1"}</Mi>, <Mi>{"x = -1"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Kluczowa obserwacja</p>
        <p>
          Z algorytmu dzielenia wielomianów wiemy, że:
        </p>
        <Mb>{"W(x) = Q(x) \\cdot (x^3 - x) + Ax^2 + Bx + C"}</Mb>
        <p>
          Dla każdego pierwiastka dzielnika iloczyn <Mi>{"Q(x) \\cdot (x^3 - x)"}</Mi> zeruje się,
          więc <Mi>{"W(x) = Ax^2 + Bx + C"}</Mi>. Podstawiamy kolejno <Mi>{"x = 0"}</Mi>,{" "}
          <Mi>{"x = 1"}</Mi> i <Mi>{"x = -1"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Trzy równania</p>

        <p><strong>Dla <Mi>{"x = 0"}</Mi>:</strong></p>
        <Mb>{"W(0) = 0 - 0 + 0 - 1 = -1"}</Mb>
        <Mb>{"C = -1 \\quad \\text{(I)}"}</Mb>

        <p><strong>Dla <Mi>{"x = 1"}</Mi>:</strong></p>
        <Mb>{"W(1) = 1 - 2 + 2 - 1 = 0"}</Mb>
        <Mb>{"A + B + C = 0 \\quad \\text{(II)}"}</Mb>

        <p><strong>Dla <Mi>{"x = -1"}</Mi>:</strong></p>
        <Mb>
          {"W(-1) = (-1)^{2025} - 2 \\cdot (-1)^{2024} + 2 \\cdot (-1)^{2023} - 1"}
        </Mb>
        <Mb>{"W(-1) = -1 - 2 \\cdot 1 + 2 \\cdot (-1) - 1 = -1 - 2 - 2 - 1 = -6"}</Mb>
        <Mb>{"A - B + C = -6 \\quad \\text{(III)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Rozwiązujemy układ</p>
        <p>Z (I): <Mi>{"C = -1"}</Mi>. Podstawiamy do (II) i (III):</p>
        <Mb>{"A + B = 1 \\quad \\text{(II')}"}</Mb>
        <Mb>{"A - B = -5 \\quad \\text{(III')}"}</Mb>
        <p>Dodajemy stronami:</p>
        <Mb>{"2A = -4 \\quad \\Rightarrow \\quad A = -2"}</Mb>
        <p>Odejmujemy (III') od (II'):</p>
        <Mb>{"2B = 6 \\quad \\Rightarrow \\quad B = 3"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"A = -2"}</Mi>, <Mi>{"B = 3"}</Mi>, <Mi>{"C = -1"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "probna-pl-2025-marzec-zad5-dwumian-newtona",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "5",
    points: "0–2",
    instruction: (
      <div className="space-y-3">
        <p>
          Rozwiąż równanie
        </p>
        <Mb>{"\\binom{n}{3} - \\binom{n}{2} = 14"}</Mb>
        <p>
          gdzie <Mi>{"n \\in \\mathbb{N}"}</Mi>, <Mi>{"n \\geq 3"}</Mi>.
        </p>
        <p>a) Ile to równanie ma rozwiązań?</p>
        <p>b) Podaj wartość największej liczby naturalnej spełniającej to równanie.</p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>a) Równanie ma <Mi>{"1"}</Mi> rozwiązanie.</p>
        <p>b) <Mi>{"n = 7"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Rozpisz symbole Newtona:</p>
        <FormulaBox>
          <Mb>{"\\binom{n}{3} = \\frac{n(n-1)(n-2)}{6}, \\qquad \\binom{n}{2} = \\frac{n(n-1)}{2}"}</Mb>
        </FormulaBox>
        <p>
          Po podstawieniu i pomnożeniu obu stron przez <Mi>{"6"}</Mi> wyciągnij wspólny
          czynnik <Mi>{"n(n-1)"}</Mi>. Otrzymasz równanie postaci{" "}
          <Mi>{"n(n-1)(\\ldots) = \\ldots"}</Mi>, które po rozwinięciu daje wielomian trzeciego
          stopnia. Szukaj jego pierwiastków całkowitych wśród dzielników wyrazu wolnego.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozpisujemy symbole Newtona</p>
        <FormulaBox>
          <Mb>{"\\binom{n}{3} = \\frac{n(n-1)(n-2)}{6}, \\qquad \\binom{n}{2} = \\frac{n(n-1)}{2}"}</Mb>
        </FormulaBox>
        <p>Równanie przyjmuje postać:</p>
        <Mb>{"\\frac{n(n-1)(n-2)}{6} - \\frac{n(n-1)}{2} = 14"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Mnożymy przez <Mi>{"6"}</Mi> i upraszczamy</p>
        <Mb>{"n(n-1)(n-2) - 3n(n-1) = 84"}</Mb>
        <p>Wyciągamy wspólny czynnik <Mi>{"n(n-1)"}</Mi>:</p>
        <Mb>{"n(n-1)\\bigl[(n-2) - 3\\bigr] = 84"}</Mb>
        <Mb>{"n(n-1)(n-5) = 84"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozwiązujemy równanie wielomianowe</p>
        <p>Po rozwinięciu:</p>
        <Mb>{"n^3 - 6n^2 + 5n - 84 = 0"}</Mb>
        <p>
          Szukamy pierwiastków całkowitych wśród dzielników wyrazu wolnego{" "}
          <Mi>{"84"}</Mi>. Sprawdzamy <Mi>{"n = 7"}</Mi>:
        </p>
        <Mb>{"7^3 - 6 \\cdot 7^2 + 5 \\cdot 7 - 84 = 343 - 294 + 35 - 84 = 0 \\quad \\checkmark"}</Mb>
        <p>
          Dzielimy wielomian przez <Mi>{"(n - 7)"}</Mi>:
        </p>

        <div className="flex flex-col gap-4">
          <div className="min-w-0">
            <Mb>{"n^3 - 6n^2 + 5n - 84 = (n - 7)(n^2 + n + 12)"}</Mb>
          </div>
          <SideWork className="w-full" title="Dzielenie wielomianów">
            <Mb>
              {[
                "\\begin{aligned}",
                "& \\underline{\\hspace{0.1em}n^2+n+12\\hspace{5.3em}} \\\\[0.25em]",
                "& (n^3-6n^2+5n-84):(n-7) \\\\[0.45em]",
                "& \\underline{-(n^3-7n^2)\\hspace{3.5em}} \\\\[0.25em]",
                "& \\hspace{1.5em}n^2+5n-84 \\\\[0.45em]",
                "& \\hspace{1.5em}\\underline{-(n^2-7n)\\hspace{1.5em}} \\\\[0.25em]",
                "& \\hspace{3em}12n-84 \\\\[0.45em]",
                "& \\hspace{3em}\\underline{-(12n-84)} \\\\[0.25em]",
                "& \\hspace{5.5em}0",
                "\\end{aligned}",
              ].join("")}
            </Mb>
          </SideWork>
        </div>

        <p className="font-semibold text-stone-800">Krok 4. Badamy trójmian <Mi>{"n^2 + n + 12"}</Mi></p>
        <Mb>{"\\Delta = 1^2 - 4 \\cdot 1 \\cdot 12 = 1 - 48 = -47 < 0"}</Mb>
        <p>
          Mamy <Mi>{"\\Delta < 0"}</Mi>, więc trójmian <Mi>{"n^2 + n + 12"}</Mi> nie ma
          pierwiastków rzeczywistych. Jedynym rozwiązaniem jest <Mi>{"n = 7"}</Mi>, które
          spełnia warunek <Mi>{"n \\geq 3"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            a) Równanie ma <Mi>{"1"}</Mi> rozwiązanie.
          </p>
          <p className="font-semibold text-stone-800 mt-1">
            b) Największa (i jedyna) liczba naturalna: <Mi>{"n = 7"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function WielomianyPage() {
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
          <span className="text-sm text-stone-400">Wielomiany</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 6
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Wielomiany
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
