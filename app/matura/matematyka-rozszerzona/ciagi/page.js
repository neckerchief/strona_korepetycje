"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad10",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–6",
    instruction: (
      <span>
        Ciągi <Mi>{"(a_n)"}</Mi> i <Mi>{"(b_n)"}</Mi> są geometryczne i monotoniczne
        oraz spełnione są zależności:
      </span>
    ),
    mathBlock:
      "a_3 + 2 = b_1 \\qquad \\text{oraz} \\qquad 2a_2 = 21b_2 \\qquad \\text{oraz} \\qquad b_1 \\cdot b_3 = 16",
    noteItems: [
      { text: "Ciąg " },
      { math: "(a_3,\\; 127,\\; b_1)" },
      { text: " jest arytmetyczny." },
    ],
    answers: null,

    answer: (
      <div className="space-y-2">
        <p>
          <Mi>{"a_n = \\dfrac{14}{3} \\cdot 3^n"}</Mi> - ciąg rosnący
        </p>
        <p>
          <Mi>{"b_n = \\dfrac{4096}{32^n}"}</Mi> - ciąg malejący
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: z warunku, że <Mi>{"(a_3, 127, b_1)"}</Mi> jest ciągiem arytmetycznym,
          środkowy wyraz jest średnią arytmetyczną skrajnych:
        </p>
        <FormulaBox>
          <Mb>{"a_3 + b_1 = 2 \\cdot 127 = 254"}</Mb>
        </FormulaBox>
        <p>
          W połączeniu z <Mi>{"a_3 + 2 = b_1"}</Mi> wyznacz <Mi>{"a_3"}</Mi> i{" "}
          <Mi>{"b_1"}</Mi>.
        </p>
        <p>
          Krok 2: z <Mi>{"b_1 \\cdot b_3 = 16"}</Mi> i własności ciągu geometrycznego{" "}
          (<Mi>{"b_3 = b_1 q_b^2"}</Mi>) wyznacz iloraz <Mi>{"q_b"}</Mi>. Pamiętaj, że
          ciąg jest monotoniczny.
        </p>
        <p>
          Krok 3: wyznacz <Mi>{"b_2"}</Mi>, a następnie z <Mi>{"2a_2 = 21b_2"}</Mi>{" "}
          znajdź <Mi>{"a_2"}</Mi>. Iloraz <Mi>{"q_a = a_3 / a_2"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy a₃ i b₁</p>
        <p>
          Ciąg <Mi>{"(a_3, 127, b_1)"}</Mi> jest arytmetyczny, więc środkowy wyraz to
          średnia skrajnych:
        </p>
        <FormulaBox>
          <Mb>{"2 \\cdot 127 = a_3 + b_1 \\quad \\Rightarrow \\quad a_3 + b_1 = 254"}</Mb>
        </FormulaBox>
        <p>
          Z warunki <Mi>{"a_3 + 2 = b_1"}</Mi> podstawiamy <Mi>{"b_1 = a_3 + 2"}</Mi>:
        </p>
        <Mb>{"a_3 + (a_3 + 2) = 254 \\quad \\Rightarrow \\quad 2a_3 = 252 \\quad \\Rightarrow \\quad a_3 = 126"}</Mb>
        <Mb>{"b_1 = 126 + 2 = 128"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy iloraz <Mi>{"q_b"}</Mi></p>
        <p>
          Dla ciągu geometrycznego <Mi>{"b_3 = b_1 \\cdot q_b^2"}</Mi>. Z warunku
          <Mi>{"\\; b_1 \\cdot b_3 = 16"}</Mi>:
        </p>
        <Mb>{"128 \\cdot b_3 = 16 \\quad \\Rightarrow \\quad b_3 = \\frac{1}{8}"}</Mb>
        <Mb>{"b_1 \\cdot q_b^2 = b_3 \\quad \\Rightarrow \\quad 128 \\cdot q_b^2 = \\frac{1}{8} \\quad \\Rightarrow \\quad q_b^2 = \\frac{1}{1024}"}</Mb>
        <Mb>{"q_b = \\pm\\frac{1}{32}"}</Mb>
        <p>
          Ciąg <Mi>{"(b_n)"}</Mi> jest monotoniczny, więc nie może zmieniać znaku. Dla{" "}
          <Mi>{"q_b = -\\tfrac{1}{32}"}</Mi> kolejne wyrazy na przemian byłyby dodatnie
          i ujemne. Stąd <Mi>{"q_b = \\dfrac{1}{32}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy iloraz <Mi>{"q_a"}</Mi></p>
        <p>
          Obliczamy <Mi>{"b_2 = b_1 \\cdot q_b = 128 \\cdot \\dfrac{1}{32} = 4"}</Mi>.
        </p>
        <p>
          Z warunku <Mi>{"2a_2 = 21b_2"}</Mi>:
        </p>
        <Mb>{"2a_2 = 21 \\cdot 4 = 84 \\quad \\Rightarrow \\quad a_2 = 42"}</Mb>
        <p>
          Iloraz ciągu <Mi>{"(a_n)"}</Mi>:
        </p>
        <Mb>{"q_a = \\frac{a_3}{a_2} = \\frac{126}{42} = 3"}</Mb>
        <p>
          Pierwszy wyraz: <Mi>{"a_1 = \\dfrac{a_2}{q_a} = \\dfrac{42}{3} = 14"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Wzory ogólne</p>
        <Mb>{"a_n = 14 \\cdot 3^{n-1} = \\frac{14}{3} \\cdot 3^n"}</Mb>
        <FormulaBox>
          <Mb>{"a_n = \\frac{14}{3} \\cdot 3^n"}</Mb>
        </FormulaBox>
        <Mb>{"b_n = 128 \\cdot \\left(\\frac{1}{32}\\right)^{n-1} = 128 \\cdot 32 \\cdot \\frac{1}{32^n} = \\frac{4096}{32^n}"}</Mb>
        <FormulaBox>
          <Mb>{"b_n = \\frac{4096}{32^n}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 5. Monotoniczność</p>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi>: iloraz <Mi>{"q_a = 3 > 1"}</Mi> i pierwszy wyraz{" "}
          <Mi>{"a_1 = 14 > 0"}</Mi>, więc ciąg jest <strong>rosnący</strong>.
        </p>
        <p>
          Ciąg <Mi>{"(b_n)"}</Mi>: iloraz <Mi>{"q_b = \\tfrac{1}{32} \\in (0,1)"}</Mi> i
          pierwszy wyraz <Mi>{"b_1 = 128 > 0"}</Mi>, więc ciąg jest <strong>malejący</strong>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p className="mt-3">
            <Mi>{"a_n = \\dfrac{14}{3} \\cdot 3^n"}</Mi> - ciąg rosnący
          </p>
          <p className="mt-4">
            <Mi>{"b_n = \\dfrac{4096}{32^n}"}</Mi> - ciąg malejący
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad7",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–4",
    instruction: (
      <span>
        Nieskończony ciąg geometryczny <Mi>{"(a_n)"}</Mi> jest określony dla każdej
        liczby naturalnej <Mi>{"n \\geq 1"}</Mi>. Suma wszystkich wyrazów ciągu{" "}
        <Mi>{"(a_n)"}</Mi> o numerach parzystych jest równa <Mi>{"444{,}(4)"}</Mi>, tj.
      </span>
    ),
    mathBlock: "a_2 + a_4 + a_6 + \\ldots = 444{,}(4)",
    noteItems: [{ text: "Ponadto " }, { math: "\\sqrt{a_1 \\cdot a_3} = 160" }, { text: " oraz ciąg " }, { math: "(a_n)" }, { text: " jest monotoniczny. Oblicz sumę wszystkich wyrazów tego ciągu. Zapisz obliczenia." }],
    answers: null,

    answer: <p><Mi>{"S = 1000"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"\\sqrt{a_1 \\cdot a_3} = \\sqrt{a_1^2 q^2} = a_1 q = a_2"}</Mi>,
          więc <Mi>{"a_2 = 160"}</Mi>.
        </p>
        <p>
          Suma wyrazów parzystych to ciąg geometryczny z pierwszym wyrazem <Mi>{"a_1 q"}</Mi>
          i ilorazem <Mi>{"q^2"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{a_1 q}{1-q^2} = \\frac{4000}{9}"}</Mb>
        </FormulaBox>
        <p>
          Monotoniczność eliminuje jeden przypadek <Mi>{"q"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"a_1 q"}</Mi></p>
        <Mb>{"\\sqrt{a_1 \\cdot a_3} = \\sqrt{a_1 \\cdot a_1 q^2} = a_1|q| = 160"}</Mb>
        <p>
          Suma wyrazów parzystych: <Mi>{"\\frac{4000}{9}"}</Mi>{" "}
          (<Mi>{"444{,}(4) = \\frac{4000}{9}"}</Mi>) jest dodatnia, więc <Mi>{"a_1 q > 0"}</Mi>,
          zatem <Mi>{"a_2 = a_1 q = 160"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy iloraz <Mi>{"q"}</Mi></p>
        <p>Suma wyrazów parzystych (ciąg geometryczny z wyrazem pierwszym <Mi>{"a_1 q"}</Mi> i ilorazem <Mi>{"q^2"}</Mi>):</p>
        <FormulaBox>
          <Mb>{"\\frac{a_1 q}{1-q^2} = \\frac{4000}{9} \\quad\\Rightarrow\\quad \\frac{160}{1-q^2} = \\frac{4000}{9}"}</Mb>
        </FormulaBox>
        <Mb>{"1-q^2 = \\frac{160 \\cdot 9}{4000} = \\frac{9}{25} \\quad\\Rightarrow\\quad q^2 = \\frac{16}{25} \\quad\\Rightarrow\\quad q = \\pm\\frac{4}{5}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Monotoniczność</p>
        <p>
          Dla <Mi>{"q = -\\tfrac{4}{5}"}</Mi>: <Mi>{"a_1 = -200"}</Mi>,
          ciąg zmienia znaki - nie jest monotoniczny. Odrzucamy.
        </p>
        <p>
          Dla <Mi>{"q = \\tfrac{4}{5}"}</Mi>: <Mi>{"a_1 = 200"}</Mi>,
          ciąg malejący. ✓
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Suma całkowita</p>
        <FormulaBox>
          <Mb>{"S = \\frac{a_1}{1-q} = \\frac{200}{1-\\tfrac{4}{5}} = \\frac{200}{\\tfrac{1}{5}} = 1000"}</Mb>
        </FormulaBox>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function CiagiPage() {
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
          <span className="text-sm text-stone-400">Ciągi</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 11
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Ciągi
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
