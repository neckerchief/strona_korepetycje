"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

const SOURCE = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const tasks = [
  {
    id: "smwp-2025-pazdziernik-zad2",
    source: SOURCE,
    number: "1",
    points: "0–2",
    instruction: <span>Oblicz granicę</span>,
    mathBlock: "\\lim_{x \\to 3^-} \\frac{\\sqrt{2x^2 - x}}{|x - 6| - 3}",
    noteItems: null,
    answers: null,

    answer: (
      <p><Mi>{"+\\infty"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dla <Mi>{"x < 3 < 6"}</Mi> mamy <Mi>{"|x-6| = 6-x"}</Mi>, więc mianownik przyjmuje postać:
        </p>
        <Mb>{"|x-6| - 3 = 6 - x - 3 = 3 - x"}</Mb>
        <p>
          Gdy <Mi>{"x \\to 3^-"}</Mi>, to <Mi>{"3-x \\to 0^+"}</Mi>, a licznik dąży do{" "}
          <Mi>{"\\sqrt{2 \\cdot 9 - 3} = \\sqrt{15}"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Upraszczamy wartość bezwzględną</p>
        <p>
          Ponieważ <Mi>{"x \\to 3^-"}</Mi>, mamy <Mi>{"x < 3 < 6"}</Mi>, więc{" "}
          <Mi>{"x - 6 < 0"}</Mi> i:
        </p>
        <Mb>{"|x - 6| = -(x-6) = 6 - x"}</Mb>
        <p>Mianownik:</p>
        <Mb>{"|x-6| - 3 = 6-x-3 = 3-x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Badamy zachowanie licznika i mianownika</p>
        <p>Gdy <Mi>{"x \\to 3^-"}</Mi>:</p>
        <Mb>{"\\sqrt{2x^2 - x} \\to \\sqrt{2 \\cdot 9 - 3} = \\sqrt{15} > 0"}</Mb>
        <Mb>{"3 - x \\to 0^+ \\quad \\text{(mianownik dąży do zera od strony dodatniej)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy granicę</p>
        <Mb>{"\\lim_{x \\to 3^-} \\frac{\\sqrt{2x^2-x}}{3-x} = \\frac{\\sqrt{15}}{0^+} = +\\infty"}</Mb>
      </div>
    ),
  },
];

export default function ElementyAnalizyPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/matura/matematyka-rozszerzona" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Elementy analizy matematycznej</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">Dział 15</p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Elementy analizy matematycznej</h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">{tasks.length} zadanie</p>
        </div>
        <div className="space-y-12">
          {tasks.map((task) => <TaskCard key={task.id} {...task} />)}
        </div>
      </main>
    </div>
  );
}
