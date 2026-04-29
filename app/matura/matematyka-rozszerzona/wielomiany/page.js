"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad8",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
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
        <Mb>{"W(x) = (x+1)(x^2 + x + 2)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Badamy trójmian <Mi>{"x^2 + x + 2"}</Mi></p>
        <Mb>{"\\Delta = 1^2 - 4 \\cdot 1 \\cdot 2 = 1 - 8 = -7 < 0"}</Mb>
        <p>
          Delta ujemna, więc <Mi>{"x^2+x+2"}</Mi> nie ma pierwiastków rzeczywistych.
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

        <div className="space-y-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
