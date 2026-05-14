"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

const SOURCE_CKE_F2023 =
  "Matura z matematyki, poziom rozszerzony, formuła 2023, egzamin w 2026 roku CKE (arkusz z 11 maja 2023)";
const SOURCE_SMWP = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const tasks = [
  {
    id: "cke-2026-formula2023-maj-zad1-analiza",
    source: SOURCE_CKE_F2023,
    number: "1",
    points: "0–2",
    instruction: <span>Oblicz granicę</span>,
    mathBlock:
      "\\lim_{n \\to +\\infty} \\frac{\\displaystyle \\binom{n+2}{n-1}}{\\displaystyle \\frac{1}{2}n^3 - 4n + 7}",
    noteItems: [{ text: "Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"\\dfrac{1}{3}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Z tablic (symbol Newtona) masz{" "}
          <Mi>{"\\displaystyle \\binom{m}{p}=\\frac{m!}{p!(m-p)!}"}</Mi>. Dla{" "}
          <Mi>{"\\binom{n+2}{n-1}"}</Mi> licz <Mi>{"(n+2)-(n-1)=3"}</Mi>, więc w mianowniku pojawia się{" "}
          <Mi>{"3!"}</Mi>, a po skróceniu silni zostaje iloczyn <Mi>{"n(n+1)(n+2)"}</Mi>.
        </p>
        <p>
          Gdy licznik i mianownik mają stopień trzeci względem <Mi>{"n"}</Mi>, podziel licznik i mianownik
          przez <Mi>{"n^3"}</Mi>, a potem przejdź do granicy przy <Mi>{"n \\to +\\infty"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozwinięcie symbolu Newtona</p>
        <p>
          Ze standardowego wzoru na symbol Newtona dla <Mi>{"m=n+2"}</Mi> oraz <Mi>{"p=n-1"}</Mi> (przy{" "}
          <Mi>{"n \\geq 1"}</Mi>) mamy <Mi>{"m-p=(n+2)-(n-1)=3"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {"\\binom{n+2}{n-1}=\\frac{(n+2)!}{(n-1)!\\,3!}=\\frac{(n+2)(n+1)n}{3!}=\\frac{n(n+1)(n+2)}{6}"}
          </Mb>
        </FormulaBox>
        <p>Pomnożenie nawiasów:</p>
        <Mb>
          {"(n+1)(n+2)=n^2+3n+2 \\quad\\Rightarrow\\quad n(n+1)(n+2)=n^3+3n^2+2n"}
        </Mb>
        <Mb>{"\\binom{n+2}{n-1}=\\frac{1}{6}n^3+\\frac{1}{2}n^2+\\frac{1}{3}n"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Granica ilorazu wielomianów</p>
        <p>Oznaczmy</p>
        <Mb>{"L_n=\\frac{\\frac{1}{6}n^3+\\frac{1}{2}n^2+\\frac{1}{3}n}{\\frac{1}{2}n^3-4n+7}"}</Mb>
        <p>
          Dzielimy licznik i mianownik przez <Mi>{"n^3"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {"L_n=\\frac{\\frac{1}{6}+\\frac{1}{2n}+\\frac{1}{3n^2}}{\\frac{1}{2}-\\frac{4}{n^2}+\\frac{7}{n^3}}"}
          </Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 3. Przejście granicy przy <Mi>{"n \\to +\\infty"}</Mi></p>
        <p>
          Ponieważ <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n}=0"}</Mi>,{" "}
          <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n^2}=0"}</Mi> oraz{" "}
          <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n^3}=0"}</Mi>, przy granicy nieskończonej dostajemy
        </p>
        <Mb>
          {"\\lim_{n \\to +\\infty} L_n=\\frac{\\frac{1}{6}+0+0}{\\frac{1}{2}-0+0}=\\frac{\\frac{1}{6}}{\\frac{1}{2}}=\\frac{1}{6}\\cdot 2=\\frac{1}{3}"}
        </Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\dfrac{1}{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2025-pazdziernik-zad2",
    source: SOURCE_SMWP,
    number: "2",
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
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>
        <div className="space-y-12">
          {tasks.map((task) => <TaskCard key={task.id} {...task} />)}
        </div>
      </main>
    </div>
  );
}
