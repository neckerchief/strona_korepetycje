"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

const SOURCE_CKE_F2023 =
  "Matura z matematyki, poziom rozszerzony, formuła 2023, egzamin w 2026 roku CKE (arkusz z 11 maja 2023)";
const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";
const SOURCE_SMWP = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const tasks = [
  {
    id: "cke-2025-czerwiec-dod-zad8-styczna-wielomian",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "8",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Wielomian <Mi>{"f"}</Mi> zmiennej rzeczywistej <Mi>{"x"}</Mi> jest określony wzorem{" "}
          <Mi>{"f(x) = x^3 + ax^2 + bx + c"}</Mi>, gdzie <Mi>{"a, b, c \\in \\mathbb{R}"}</Mi>. Liczba{" "}
          <Mi>{"(-2)"}</Mi> jest miejscem zerowym tego wielomianu. W kartezjańskim układzie współrzędnych{" "}
          <Mi>{"(x, y)"}</Mi> styczna do wykresu wielomianu <Mi>{"f"}</Mi> w punkcie <Mi>{"A"}</Mi> o pierwszej
          współrzędnej równej <Mi>{"(-2)"}</Mi> przecina ten wykres w punkcie <Mi>{"P = (1, 9)"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Wyznacz wzór wielomianu <Mi>{"f"}</Mi>. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Skoro <Mi>{"(-2)"}</Mi> jest miejscem zerowym, to <Mi>{"f(-2) = 0"}</Mi>, więc punkt styczności to{" "}
          <Mi>{"A = (-2, 0)"}</Mi>.
        </p>
        <p>Wzór na styczną w punkcie <Mi>{"(x_0, f(x_0))"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"y = a(x - x_0) + f(x_0), \\qquad a = f'(x_0)"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"x_0 = -2"}</Mi> i <Mi>{"f(x_0) = 0"}</Mi> styczna ma postać{" "}
          <Mi>{"y = f'(-2)(x + 2)"}</Mi>. Podstaw punkt <Mi>{"P = (1, 9)"}</Mi>: dostaniesz jedno równanie na{" "}
          <Mi>{"a, b, c"}</Mi>. Do trzech niewiadomych potrzebujesz jeszcze <Mi>{"f(-2) = 0"}</Mi> oraz warunku, że{" "}
          <Mi>{"P"}</Mi> leży na wykresie, czyli <Mi>{"f(1) = 9"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Warunki z treści zadania</p>
        <p>
          <Mi>{"f(x) = x^3 + ax^2 + bx + c"}</Mi>, więc <Mi>{"f'(x) = 3x^2 + 2ax + b"}</Mi>.
        </p>
        <p>
          Liczba <Mi>{"(-2)"}</Mi> jest miejscem zerowym, więc punkt <Mi>{"A"}</Mi> ma współrzędne{" "}
          <Mi>{"(-2, 0)"}</Mi>:
        </p>
        <Mb>{"f(-2) = 0"}</Mb>
        <p>
          Styczna w punkcie <Mi>{"A"}</Mi> przechodzi przez <Mi>{"P = (1, 9)"}</Mi>, a ponieważ styczna przecina
          wykres w <Mi>{"P"}</Mi>, punkt <Mi>{"P"}</Mi> leży też na wykresie <Mi>{"f"}</Mi>:
        </p>
        <Mb>{"f(1) = 9"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Równanie ze stycznej</p>
        <p>Wzór na styczną w punkcie <Mi>{"(x_0, f(x_0))"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"y = f'(x_0)(x - x_0) + f(x_0)"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"x_0 = -2"}</Mi> i <Mi>{"f(-2) = 0"}</Mi>:
        </p>
        <Mb>{"y = f'(-2)(x + 2)"}</Mb>
        <p>
          Punkt <Mi>{"P = (1, 9)"}</Mi> leży na stycznej, więc:
        </p>
        <Mb>{"9 = f'(-2)(1 + 2) = 3 \\cdot f'(-2) \\quad \\Rightarrow \\quad f'(-2) = 3"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Układ równań na <Mi>{"a, b, c"}</Mi></p>
        <p>Z warunku <Mi>{"f(-2) = 0"}</Mi>:</p>
        <Mb>{"(-2)^3 + a(-2)^2 + b(-2) + c = 0 \\quad \\Rightarrow \\quad -8 + 4a - 2b + c = 0"}</Mb>
        <Mb>{"4a - 2b + c = 8 \\quad \\text{(I)}"}</Mb>
        <p>Z warunku <Mi>{"f'(-2) = 3"}</Mi>:</p>
        <Mb>{"3(-2)^2 + 2a(-2) + b = 3 \\quad \\Rightarrow \\quad 12 - 4a + b = 3"}</Mb>
        <Mb>{"b = 4a - 9 \\quad \\text{(II)}"}</Mb>
        <p>Z warunku <Mi>{"f(1) = 9"}</Mi>:</p>
        <Mb>{"1 + a + b + c = 9 \\quad \\Rightarrow \\quad a + b + c = 8 \\quad \\text{(III)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Rozwiązanie układu</p>
        <p>Podstawiamy (II) do (I) i (III):</p>
        <Mb>{"c = 8 - 4a + 2(4a - 9) = 4a - 10"}</Mb>
        <Mb>{"a + (4a - 9) + (4a - 10) = 8 \\quad \\Rightarrow \\quad 9a = 27 \\quad \\Rightarrow \\quad a = 3"}</Mb>
        <Mb>{"b = 4 \\cdot 3 - 9 = 3, \\qquad c = 4 \\cdot 3 - 10 = 2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie</p>
        <Mb>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mb>
        <Mb>{"f(-2) = -8 + 12 - 6 + 2 = 0, \\qquad f(1) = 1 + 3 + 3 + 2 = 9"}</Mb>
        <Mb>{"f'(x) = 3x^2 + 6x + 3, \\qquad f'(-2) = 12 - 12 + 3 = 3"}</Mb>
        <p>
          Styczna: <Mi>{"y = 3(x + 2)"}</Mi>, dla <Mi>{"x = 1"}</Mi> daje <Mi>{"y = 9"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

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
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
