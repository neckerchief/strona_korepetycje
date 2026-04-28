"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad2",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–3",
    instruction: (
      <span>
        Oblicz <Mi>{"\\operatorname{tg}\\alpha"}</Mi> wiedząc, że{" "}
        <Mi>{"\\alpha \\in \\left(\\pi,\\, \\frac{3\\pi}{2}\\right)"}</Mi> oraz{" "}
        <Mi>{"\\sin 2\\alpha = \\dfrac{12}{13}"}</Mi>. Zapisz obliczenia.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{2}{3}"}</Mi> lub{" "}
        <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{3}{2}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: rozłóż <Mi>{"\\sin 2\\alpha"}</Mi> ze wzoru na sinus podwojonego kąta:
        </p>
        <FormulaBox>
          <Mb>{"\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Krok 2: podziel jedynkę trygonometryczną przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1 \\quad \\Bigg|\\div\\cos^2\\alpha \\quad \\Rightarrow \\quad \\operatorname{tg}^2\\alpha + 1 = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        </FormulaBox>
        <p>
          Następnie podziel równanie z kroku 1 przez <Mi>{"\\cos^2\\alpha"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">

        {/* ── Metoda 1 ── */}
        <p className="font-bold text-[#52297a] text-base">Metoda 1</p>

        <p className="font-semibold text-stone-800">Krok 1. Wzór na sinus podwojonego kąta</p>
        <FormulaBox>
          <Mb>{"\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Podstawiamy <Mi>{"\\sin 2\\alpha = \\dfrac{12}{13}"}</Mi>:
        </p>
        <Mb>{"2\\sin\\alpha\\cos\\alpha = \\frac{12}{13}"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Jedynka trygonometryczna podzielona przez <Mi>{"\\cos^2\\alpha"}</Mi>
        </p>
        <p>Zaczynamy od jedynki trygonometrycznej:</p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1"}</Mb>
        </FormulaBox>
        <p>
          Dzielimy obie strony przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <Mb>{"\\frac{\\sin^2\\alpha}{\\cos^2\\alpha} + \\frac{\\cos^2\\alpha}{\\cos^2\\alpha} = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <Mb>{"\\operatorname{tg}^2\\alpha + 1 = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <p>
          Otrzymaliśmy ważny fakt: <Mi>{"\\dfrac{1}{\\cos^2\\alpha} = 1 + \\operatorname{tg}^2\\alpha"}</Mi>.
          Skorzystamy z niego zaraz po prawej stronie.
        </p>

        <p>
          Teraz dzielimy równanie z kroku 1 przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <Mb>{"\\frac{2\\sin\\alpha\\cos\\alpha}{\\cos^2\\alpha} = \\frac{12}{13} \\cdot \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <p>
          Po lewej: <Mi>{"\\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\operatorname{tg}\\alpha"}</Mi>.
          Po prawej używamy faktu, który właśnie wyliczyliśmy:
        </p>
        <Mb>{"2\\operatorname{tg}\\alpha = \\frac{12}{13}\\left(1 + \\operatorname{tg}^2\\alpha\\right)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Równanie kwadratowe</p>
        <p>
          Oznaczamy <Mi>{"t = \\operatorname{tg}\\alpha"}</Mi>:
        </p>
        <Mb>{"2t = \\frac{12}{13}(t^2 + 1)"}</Mb>
        <Mb>{"26t = 12t^2 + 12"}</Mb>
        <Mb>{"6t^2 - 13t + 6 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczymy deltę</p>
        <Mb>{"\\Delta = b^2 - 4ac = (-13)^2 - 4 \\cdot 6 \\cdot 6 = 169 - 144 = 25"}</Mb>
        <p><Mi>{"\\sqrt{\\Delta} = 5"}</Mi></p>
        <Mb>{"t_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{13 - 5}{12} = \\frac{8}{12} = \\frac{2}{3}"}</Mb>
        <Mb>{"t_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{13 + 5}{12} = \\frac{18}{12} = \\frac{3}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie dziedziny</p>
        <p>
          Dla <Mi>{"\\alpha \\in \\left(\\pi,\\, \\frac{3\\pi}{2}\\right)"}</Mi> (trzecia ćwiartka):{" "}
          <Mi>{"\\sin\\alpha < 0"}</Mi> i <Mi>{"\\cos\\alpha < 0"}</Mi>, więc{" "}
          <Mi>{"\\operatorname{tg}\\alpha > 0"}</Mi>.
          Obie wartości są dodatnie: obie spełniają warunek.
        </p>

        {/* ── Metoda 2 ── */}
        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2</p>

        <p className="font-semibold text-stone-800">Krok 1. Wyrażamy cos przez sin</p>
        <p>
          Ze wzoru na sinus podwojonego kąta:
        </p>
        <Mb>{"2\\sin\\alpha\\cos\\alpha = \\frac{12}{13} \\quad \\Rightarrow \\quad \\sin\\alpha\\cos\\alpha = \\frac{6}{13}"}</Mb>
        <p>
          Wyznaczamy <Mi>{"\\cos\\alpha"}</Mi>:
        </p>
        <Mb>{"\\cos\\alpha = \\frac{6}{13\\sin\\alpha}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Podstawiamy do jedynki trygonometrycznej</p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin^2\\alpha + \\frac{36}{169\\sin^2\\alpha} = 1"}</Mb>
        <p>
          Mnożymy obie strony przez <Mi>{"169\\sin^2\\alpha"}</Mi>:
        </p>
        <Mb>{"169\\sin^4\\alpha - 169\\sin^2\\alpha + 36 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Podstawienie <Mi>{"u = \\sin^2\\alpha"}</Mi></p>
        <Mb>{"169u^2 - 169u + 36 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczymy deltę</p>
        <Mb>{"\\Delta = 169^2 - 4 \\cdot 169 \\cdot 36 = 169(169 - 144) = 169 \\cdot 25"}</Mb>
        <p><Mi>{"\\sqrt{\\Delta} = 13 \\cdot 5 = 65"}</Mi></p>
        <Mb>{"u_1 = \\frac{169 - 65}{338} = \\frac{104}{338} = \\frac{4}{13}"}</Mb>
        <Mb>{"u_2 = \\frac{169 + 65}{338} = \\frac{234}{338} = \\frac{9}{13}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Obliczamy tg</p>
        <p>
          Korzystamy z tego, że <Mi>{"\\cos\\alpha = \\dfrac{6}{13\\sin\\alpha}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{\\sin\\alpha}{\\dfrac{6}{13\\sin\\alpha}} = \\frac{13\\sin^2\\alpha}{6}"}</Mb>
        <p>
          Dla <Mi>{"u_1 = \\sin^2\\alpha = \\dfrac{4}{13}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{13 \\cdot \\frac{4}{13}}{6} = \\frac{4}{6} = \\frac{2}{3}"}</Mb>
        <p>
          Dla <Mi>{"u_2 = \\sin^2\\alpha = \\dfrac{9}{13}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{13 \\cdot \\frac{9}{13}}{6} = \\frac{9}{6} = \\frac{3}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{2}{3}"}</Mi>{" "}
            lub{" "}
            <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{3}{2}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function TrygonometriaPage() {
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
          <span className="text-sm text-stone-400">Trygonometria</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 10
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Trygonometria
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
