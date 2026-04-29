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

        <div className="space-y-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
