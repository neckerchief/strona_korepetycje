"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad1",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–3",
    instruction: "Rozwiąż równanie",
    mathBlock: "\\log_x(27) = 2 + \\log_3(x)",
    noteItems: [
      { text: "gdzie " },
      { math: "x \\in (0,1) \\cup (1, +\\infty)" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>{"x = 3"}</Mi> lub <Mi>{"x = \\dfrac{1}{27}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>Wzór na zamianę podstawy logarytmu:</p>
        <p className="text-stone-500 text-xs">
          jeżeli <Mi>{"a > 0,\\ a \\neq 1,\\ b > 0,\\ b \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
        </p>
        <FormulaBox>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <p>
          Zastosuj dla <Mi>{"b = x,\\ c = 27,\\ a = 3"}</Mi>:
        </p>
        <Mb>{"\\log_x 27 = \\frac{\\log_3 27}{\\log_3 x} = \\frac{3}{\\log_3 x}"}</Mb>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Zmiana podstawy</p>
        <p>
          Korzystamy ze wzoru na zamianę podstawy logarytmu:
        </p>
        <FormulaBox>
          <p className="text-stone-500 text-xs mb-1">
            jeżeli <Mi>{"a > 0,\\ a \\neq 1,\\ b > 0,\\ b \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
          </p>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <p>
          Podstawiamy <Mi>{"b = x,\\ c = 27,\\ a = 3"}</Mi>:
        </p>
        <Mb>{"\\log_x 27 = \\frac{\\log_3 27}{\\log_3 x} = \\frac{3}{\\log_3 x}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Podstawienie</p>
        <p>
          Oznaczamy <Mi>{"t = \\log_3 x"}</Mi>. Ponieważ <Mi>{"x \\neq 1"}</Mi>, mamy <Mi>{"t \\neq 0"}</Mi>.
          Równanie przyjmuje postać:
        </p>
        <Mb>{"\\frac{3}{t} = 2 + t"}</Mb>
        <p>
          Mnożymy obie strony przez <Mi>{"t"}</Mi>:
        </p>
        <Mb>{"t^2 + 2t - 3 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Liczymy deltę</p>
        <Mb>{"\\Delta = b^2 - 4ac = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 + 12 = 16"}</Mb>
        <p>
          <Mi>{"\\sqrt{\\Delta} = 4"}</Mi>
        </p>
        <Mb>{"t_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{-2 - 4}{2} = -3"}</Mb>
        <Mb>{"t_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{-2 + 4}{2} = 1"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Powrót do zmiennej x</p>
        <p>Korzystamy z definicji logarytmu:</p>
        <FormulaBox>
          <Mb>{"\\log_a b = c \\iff a^c = b"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"t_1 = -3"}</Mi>:
        </p>
        <Mb>{"\\log_3 x = -3 \\iff x = 3^{-3} = \\frac{1}{27}"}</Mb>
        <p>
          Dla <Mi>{"t_2 = 1"}</Mi>:
        </p>
        <Mb>{"\\log_3 x = 1 \\iff x = 3^1 = 3"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie dziedziny</p>
        <p>
          Dziedzina: <Mi>{"x \\in (0,1) \\cup (1, +\\infty)"}</Mi>
        </p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li><Mi>{"x = \\tfrac{1}{27} \\in (0,1)"}</Mi> — spełnione</li>
          <li><Mi>{"x = 3 \\in (1, +\\infty)"}</Mi> — spełnione</li>
        </ul>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x = \\dfrac{1}{27}"}</Mi> lub <Mi>{"x = 3"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function LiczbyRzeczywistePage() {
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
          <span className="text-sm text-stone-400">Liczby rzeczywiste</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* Nagłówek */}
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 1
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Liczby rzeczywiste
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        {/* Zadania */}
        <div className="space-y-12">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
