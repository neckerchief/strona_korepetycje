"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Diagram ──────────────────────────────────────────────────

// Wierzchołki: A(155,50) góra, B(290,130) prawo, C(185,215) dół, D(65,130) lewo
// Okrąg wpisany: środek (173,131) r=68, punkty styczne obliczone analitycznie
const DiagramCzworokatABCD = () => (
  <svg viewBox="0 0 340 255" className="w-full max-w-sm mx-auto my-4 block">
    {/* Okrąg wpisany */}
    <circle cx="170" cy="131" r="67" fill="#f9f5ff" stroke="#c4a8e8" strokeWidth="1.5" strokeDasharray="5,3" />

    {/* Boki czworokąta ABCD */}
    <polygon points="155,50 290,130 185,215 65,130" fill="none" stroke="#9b7fd4" strokeWidth="1.8" />

    {/* Przekątna AC - wyróżniona */}
    <line x1="155" y1="50" x2="185" y2="215" stroke="#6d3a8e" strokeWidth="2" strokeDasharray="6,3" />

    {/* Punkty styczne z okręgiem */}
    <circle cx="204" cy="79"  r="3.5" fill="#c4a8e8" stroke="#9b7fd4" strokeWidth="1" />
    <circle cx="219" cy="188" r="3.5" fill="#c4a8e8" stroke="#9b7fd4" strokeWidth="1" />
    <circle cx="137" cy="181" r="3.5" fill="#c4a8e8" stroke="#9b7fd4" strokeWidth="1" />
    <circle cx="125" cy="77"  r="3.5" fill="#c4a8e8" stroke="#9b7fd4" strokeWidth="1" />

    {/* Łuk kąta ACB - sweep=1 (zgodnie ze wskazówkami zegara w SVG) */}
    <path d="M 179,181 A 35,35 0 0,1 212,193" fill="none" stroke="#6d3a8e" strokeWidth="1.5" />

    {/* Wierzchołki */}
    <circle cx="155" cy="50"  r="3.5" fill="#6d3a8e" />
    <circle cx="290" cy="130" r="3.5" fill="#6d3a8e" />
    <circle cx="185" cy="215" r="3.5" fill="#6d3a8e" />
    <circle cx="65"  cy="130" r="3.5" fill="#6d3a8e" />

    {/* Etykiety wierzchołków */}
    <text x="143" y="47"  fontSize="14" fontFamily="serif" fontStyle="italic" fill="#2d1458">A</text>
    <text x="295" y="135" fontSize="14" fontFamily="serif" fontStyle="italic" fill="#2d1458">B</text>
    <text x="186" y="233" fontSize="14" fontFamily="serif" fontStyle="italic" fill="#2d1458">C</text>
    <text x="46"  y="135" fontSize="14" fontFamily="serif" fontStyle="italic" fill="#2d1458">D</text>

    {/* Kąt 60° */}
    <text x="203" y="173" fontSize="11" fill="#6d3a8e" textAnchor="middle">60°</text>

    {/* |AC| = 2√3 - na lewo od przekątnej */}
    <foreignObject x="72" y="123" width="78" height="22">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:"11px",color:"#6d3a8e",whiteSpace:"nowrap"}}>
        <Mi>{'|AC|=2\\sqrt{3}'}</Mi>
      </div>
    </foreignObject>

    {/* |BC| = 4√3 - na prawo od boku BC */}
    <foreignObject x="246" y="170" width="82" height="22">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:"11px",color:"#2d1458",whiteSpace:"nowrap"}}>
        <Mi>{'|BC|=4\\sqrt{3}'}</Mi>
      </div>
    </foreignObject>
  </svg>
);

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad5",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–4",
    instruction: (
      <span>
        W czworokąt <Mi>{"ABCD"}</Mi> o obwodzie <Mi>{"30"}</Mi> wpisano okrąg. Przekątna{" "}
        <Mi>{"|AC|"}</Mi> ma długość <Mi>{"2\\sqrt{3}"}</Mi> i tworzy kąt{" "}
        <Mi>{"ACB"}</Mi> o mierze <Mi>{"60°"}</Mi>. Bok <Mi>{"|BC|"}</Mi> tego
        czworokąta jest dwukrotnie dłuższy od jego przekątnej <Mi>{"|AC|"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: [{ text: "Oblicz długości wszystkich boków czworokąta ABCD. Zapisz obliczenia." }],
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>
          <Mi>{"|AB| = 6"}</Mi>
        </p>
        <p>
          <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>
        </p>
        <p>
          <Mi>{"|CD| = 9"}</Mi>
        </p>
        <p>
          <Mi>{"|DA| = 15 - 4\\sqrt{3}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: oblicz <Mi>{"|BC| = 2|AC| = 4\\sqrt{3}"}</Mi>.
        </p>
        <p>
          Krok 2: w trójkącie <Mi>{"ABC"}</Mi> znasz dwa boki i kąt między nimi (przy wierzchołku{" "}
          <Mi>{"C"}</Mi>). Użyj twierdzenia cosinusów, żeby znaleźć <Mi>{"|AB|"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"c^2 = a^2 + b^2 - 2ab\\cos\\gamma"}</Mb>
        </FormulaBox>
        <p>
          Krok 3: skorzystaj z twierdzenia Pitota dla czworokąta z wpisanym okręgiem. Mówi ono, że
          sumy par przeciwległych boków są równe:
        </p>
        <FormulaBox>
          <Mb>{"|AB| + |CD| = |BC| + |DA|"}</Mb>
        </FormulaBox>
        <p>
          W połączeniu z warunkiem na obwód wyznaczysz wszystkie boki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Obliczamy |BC|</p>
        <p>
          Z treści zadania <Mi>{"|BC| = 2|AC| = 2 \\cdot 2\\sqrt{3} = 4\\sqrt{3}"}</Mi>.
        </p>

        <DiagramCzworokatABCD />

        <p className="font-semibold text-stone-800">Krok 2. Twierdzenie cosinusów w trójkącie ABC</p>
        <p>
          Znamy: <Mi>{"|AC| = 2\\sqrt{3}"}</Mi>, <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>,{" "}
          <Mi>{"\\angle ACB = 60°"}</Mi>. Szukamy <Mi>{"|AB|"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"|AB|^2 = |AC|^2 + |BC|^2 - 2 \\cdot |AC| \\cdot |BC| \\cdot \\cos(\\angle ACB)"}</Mb>
        </FormulaBox>
        <Mb>
          {"|AB|^2 = (2\\sqrt{3})^2 + (4\\sqrt{3})^2 - 2 \\cdot 2\\sqrt{3} \\cdot 4\\sqrt{3} \\cdot \\cos 60°"}
        </Mb>
        <Mb>{"|AB|^2 = 12 + 48 - 2 \\cdot 2\\sqrt{3} \\cdot 4\\sqrt{3} \\cdot \\frac{1}{2}"}</Mb>
        <Mb>{"|AB|^2 = 60 - 2\\sqrt{3} \\cdot 4\\sqrt{3} = 60 - 8 \\cdot 3 = 60 - 24 = 36"}</Mb>
        <p>
          <Mi>{"|AB| = 6"}</Mi>
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Twierdzenie Pitota</p>
        <p>
          Jeżeli w czworokąt wpisano okrąg, to sumy par przeciwległych boków są równe:
        </p>
        <FormulaBox>
          <Mb>{"|AB| + |CD| = |BC| + |DA|"}</Mb>
        </FormulaBox>
        <p>
          Z warunkiem na obwód:{" "}
          <Mi>{"|AB| + |BC| + |CD| + |DA| = 30"}</Mi>, co oznacza:
        </p>
        <Mb>{"(|AB| + |CD|) + (|BC| + |DA|) = 30"}</Mb>
        <p>
          Ponieważ obie sumy są równe:
        </p>
        <Mb>{"|AB| + |CD| = |BC| + |DA| = 15"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy |CD| i |DA|</p>
        <Mb>{"|AB| + |CD| = 15 \\quad \\Rightarrow \\quad 6 + |CD| = 15 \\quad \\Rightarrow \\quad |CD| = 9"}</Mb>
        <Mb>{"|BC| + |DA| = 15 \\quad \\Rightarrow \\quad 4\\sqrt{3} + |DA| = 15 \\quad \\Rightarrow \\quad |DA| = 15 - 4\\sqrt{3}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p>
            <Mi>{"|AB| = 6"}</Mi>, <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>,{" "}
            <Mi>{"|CD| = 9"}</Mi>, <Mi>{"|DA| = 15 - 4\\sqrt{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function PlanimetriaPage() {
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
          <span className="text-sm text-stone-400">Planimetria</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 12
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Planimetria
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
