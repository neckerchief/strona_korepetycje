"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, poziom rozszerzony, CKE, maj 2025";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna, Politechnika Łódzka, marzec 2025";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, poziom rozszerzony, CKE, grudzień 2024";

const tasks = [
  {
    id: "cke-mock-2024-grudzien-zad9-sin4-cos4",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "9",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\sin^4 x = \\sin x \\cdot \\cos x - \\cos^4 x",
    noteItems: [
      { text: "w zbiorze " },
      { math: "[-\\pi,\\,2\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{-\\dfrac{3\\pi}{4},\\,\\dfrac{\\pi}{4},\\,\\dfrac{5\\pi}{4}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Przenieś <Mi>{"\\cos^4 x"}</Mi> na lewą stronę, żeby po lewej była suma <Mi>{"\\sin^4 x + \\cos^4 x"}</Mi>.
        </p>
        <p>
          Zamień <Mi>{"\\sin^4 x + \\cos^4 x"}</Mi> na postać z kwadratem sumy:
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x"
            }
          </Mb>
        </FormulaBox>
        <p>
          Użyj jedynki trygonometrycznej <Mi>{"\\sin^2 x + \\cos^2 x = 1"}</Mi> oraz wzorów na kąt podwójny, żeby
          wyrazić wszystko przez <Mi>{"\\sin(2x)"}</Mi>. Powinno wyjść równanie kwadratowe na <Mi>{"\\sin(2x)"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"\\sin(2x) = 2\\sin x \\cos x"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przekształcenie równania</p>
        <p>
          Przenosimy <Mi>{"\\cos^4 x"}</Mi> na lewą stronę (równoważnie dla wszystkich <Mi>{"x"}</Mi>):
        </p>
        <Mb>{"\\sin^4 x + \\cos^4 x = \\sin x \\cos x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Suma czwartych potęg</p>
        <p>
          Korzystamy ze wzoru <Mi>{"a^2 + b^2 = (a+b)^2 - 2ab"}</Mi> dla <Mi>{"a = \\sin^2 x"}</Mi>,{" "}
          <Mi>{"b = \\cos^2 x"}</Mi>:
        </p>
        <Mb>
          {
            "\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x"
          }
        </Mb>
        <p>Z jedynki trygonometrycznej <Mi>{"\\sin^2 x + \\cos^2 x = 1"}</Mi>:</p>
        <Mb>{"\\sin^4 x + \\cos^4 x = 1 - 2\\sin^2 x \\cos^2 x"}</Mb>
        <p>Równanie przyjmuje postać:</p>
        <Mb>{"1 - 2\\sin^2 x \\cos^2 x = \\sin x \\cos x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Kąt podwójny</p>
        <p>
          Wiemy, że <Mi>{"\\sin(2x) = 2\\sin x \\cos x"}</Mi>, więc <Mi>{"\\sin x \\cos x = \\dfrac{1}{2}\\sin(2x)"}</Mi>.
          Ponadto <Mi>{"\\sin^2 x \\cos^2 x = \\dfrac{1}{4}\\sin^2(2x)"}</Mi>.
        </p>
        <Mb>{"1 - 2 \\cdot \\dfrac{1}{4}\\sin^2(2x) = \\dfrac{1}{2}\\sin(2x)"}</Mb>
        <Mb>{"1 - \\dfrac{1}{2}\\sin^2(2x) = \\dfrac{1}{2}\\sin(2x)"}</Mb>
        <p>Mnożymy obie strony przez <Mi>{"2"}</Mi>:</p>
        <Mb>{"2 - \\sin^2(2x) = \\sin(2x)"}</Mb>
        <Mb>{"\\sin^2(2x) + \\sin(2x) - 2 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Równanie kwadratowe na <Mi>{"\\sin(2x)"}</Mi></p>
        <p>Oznaczmy <Mi>{"t = \\sin(2x)"}</Mi>, gdzie <Mi>{"t \\in [-1,\\,1]"}</Mi>:</p>
        <Mb>{"t^2 + t - 2 = 0"}</Mb>
        <Mb>{"(t + 2)(t - 1) = 0 \\quad \\Longrightarrow \\quad t = -2 \\quad \\text{lub} \\quad t = 1"}</Mb>
        <p>
          Warunek <Mi>{"\\sin(2x) \\in [-1,\\,1]"}</Mi> odrzuca <Mi>{"t = -2"}</Mi>. Zostaje{" "}
          <Mi>{"\\sin(2x) = 1"}</Mi>.
        </p>
        <Mb>{"2x = \\dfrac{\\pi}{2} + 2k\\pi, \\quad k \\in \\mathbb{Z} \\quad \\Longrightarrow \\quad x = \\dfrac{\\pi}{4} + k\\pi"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Rozwiązania w <Mi>{"[-\\pi,\\,2\\pi]"}</Mi></p>
        <Mb>
          {
            "k = -1 \\Rightarrow x = -\\dfrac{3\\pi}{4},\\quad k = 0 \\Rightarrow x = \\dfrac{\\pi}{4},\\quad k = 1 \\Rightarrow x = \\dfrac{5\\pi}{4}"
          }
        </Mb>
        <p>
          Dla <Mi>{"k = 2"}</Mi> otrzymujemy <Mi>{"x = \\dfrac{9\\pi}{4} > 2\\pi"}</Mi>, więc poza zbiorem. Sprawdzenie
          (np. dla <Mi>{"x = \\dfrac{\\pi}{4}"}</Mi>): lewa i prawa strona równają się <Mi>{"\\dfrac{1}{4}"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{-\\dfrac{3\\pi}{4},\\,\\dfrac{\\pi}{4},\\,\\dfrac{5\\pi}{4}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-maj-zad9-rownanie-tryg",
    source: SOURCE_CKE_MAJ_2025,
    number: "9",
    points: "0–5",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "3\\cos^2 x + \\sqrt{3}\\sin(2x) - 3\\sin^2 x = 0",
    noteItems: [
      { text: "w przedziale " },
      { math: "[-\\pi,\\,\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"3\\cos^2 x - 3\\sin^2 x = 3(\\cos^2 x - \\sin^2 x) = 3\\cos(2x)"}</Mi>. Równanie
          sprowadza się do postaci z argumentem podwojonym:
        </p>
        <Mb>{"3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>
        <p>
          Podziel obie strony przez <Mi>{"2\\sqrt{3}"}</Mi> (liczba dodatnia, więc równoważność zachodzi) i
          porównaj z wzorem na cosinus sumy kątów:
        </p>
        <FormulaBox>
          <Mb>{"\\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta"}</Mb>
        </FormulaBox>
        <p>
          Powinieneś otrzymać równanie typu <Mi>{"\\cos\\left(2x - \\dfrac{\\pi}{6}\\right) = 0"}</Mi>, a potem
          rozwiąż je w zadanym przedziale.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-bold text-[#52297a] text-base">Metoda 1: cosinus argumentu podwojonego</p>

        <p className="font-semibold text-stone-800">Krok 1. Wzór na cosinus podwójny</p>
        <p>
          Korzystamy ze wzoru <Mi>{"\\cos(2x) = \\cos^2 x - \\sin^2 x"}</Mi>:
        </p>
        <Mb>{"3\\cos^2 x + \\sqrt{3}\\sin(2x) - 3\\sin^2 x = 3(\\cos^2 x - \\sin^2 x) + \\sqrt{3}\\sin(2x)"}</Mb>
        <Mb>{"= 3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Dzielenie przez <Mi>{"2\\sqrt{3}"}</Mi></p>
        <p>
          Dzielimy obie strony przez <Mi>{"2\\sqrt{3} > 0"}</Mi> (nie zmienia znaku równania):
        </p>
        <Mb>
          {"\\dfrac{3}{2\\sqrt{3}}\\cos(2x) + \\dfrac{\\sqrt{3}}{2\\sqrt{3}}\\sin(2x) = \\dfrac{\\sqrt{3}}{2}\\cos(2x) + \\dfrac{1}{2}\\sin(2x) = 0"}
        </Mb>
        <p>
          Liczby <Mi>{"\\dfrac{\\sqrt{3}}{2}"}</Mi> i <Mi>{"\\dfrac{1}{2}"}</Mi> to wartości cosinusa i sinusa kąta{" "}
          <Mi>{"\\dfrac{\\pi}{6}"}</Mi>:
        </p>
        <Mb>
          {"\\cos\\dfrac{\\pi}{6}\\cdot\\cos(2x) + \\sin\\dfrac{\\pi}{6}\\cdot\\sin(2x) = \\cos\\left(2x - \\dfrac{\\pi}{6}\\right) = 0"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozwiązanie równania</p>
        <Mb>{"2x - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2} + k\\pi, \\quad k \\in \\mathbb{Z}"}</Mb>
        <Mb>{"2x = \\dfrac{2\\pi}{3} + k\\pi \\quad \\Longrightarrow \\quad x = \\dfrac{\\pi}{3} + \\dfrac{k\\pi}{2}"}</Mb>
        <p>W przedziale <Mi>{"[-\\pi,\\,\\pi]"}</Mi>:</p>
        <Mb>
          {"k = -2 \\Rightarrow x = -\\dfrac{2\\pi}{3},\\quad k = -1 \\Rightarrow x = -\\dfrac{\\pi}{6},\\quad k = 0 \\Rightarrow x = \\dfrac{\\pi}{3},\\quad k = 1 \\Rightarrow x = \\dfrac{5\\pi}{6}"}
        </Mb>

        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2: tangens argumentu podwojonego</p>

        <p className="font-semibold text-stone-800">Krok 1. Ten sam początek</p>
        <Mb>{"3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Tangens</p>
        <p>
          Przenosimy wyraz z cosinusem na prawą stronę. Gdy <Mi>{"\\cos(2x) \\neq 0"}</Mi>, dzielimy przez{" "}
          <Mi>{"\\cos(2x)"}</Mi>:
        </p>
        <Mb>{"\\sqrt{3}\\sin(2x) = -3\\cos(2x) \\quad \\Longrightarrow \\quad \\tg(2x) = -\\sqrt{3}"}</Mb>
        <p>
          (Gdy <Mi>{"\\cos(2x) = 0"}</Mi>, lewa strona pierwotnego równania daje{" "}
          <Mi>{"\\sqrt{3}\\sin(2x) = \\pm\\sqrt{3} \\neq 0"}</Mi>, więc nie ma dodatkowych rozwiązań spoza
          tego przypadku.)
        </p>
        <Mb>{"2x = -\\dfrac{\\pi}{3} + k\\pi \\quad \\Longrightarrow \\quad x = -\\dfrac{\\pi}{6} + \\dfrac{k\\pi}{2}"}</Mb>
        <p>To ten sam ciąg rozwiązań co w metodzie 1. W <Mi>{"[-\\pi,\\,\\pi]"}</Mi>:</p>
        <FormulaBox>
          <Mb>
            {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
          </Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad6-rownanie-cos",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "6",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\cos 2x + 2\\cos^2 3x + \\cos 4x = 0",
    noteItems: [
      { text: "w przedziale " },
      { math: "[0,\\,\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dodaj do siebie <Mi>{"\\cos 2x"}</Mi> i <Mi>{"\\cos 4x"}</Mi> wzorem na sumę cosinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\cos\\alpha + \\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <p>
          Wyłącz wspólny czynnik i zrób to samo jeszcze raz dla sumy cosinusów, która się pojawi w nawiasie.
          Resztę rozwiążesz z równania iloczynowego <Mi>{"\\cdots = 0"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">
          Krok 1. Łączymy <Mi>{"\\cos 2x"}</Mi> i <Mi>{"\\cos 4x"}</Mi>
        </p>
        <FormulaBox>
          <Mb>{"\\cos\\alpha + \\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <Mb>
          {"\\cos 2x + \\cos 4x = 2\\cos\\frac{2x+4x}{2}\\cos\\frac{2x-4x}{2} = 2\\cos 3x \\cdot \\cos(-x) = 2\\cos 3x \\cos x"}
        </Mb>
        <p>Równanie przyjmuje postać:</p>
        <Mb>{"2\\cos 3x \\cos x + 2\\cos^2 3x = 0"}</Mb>
        <Mb>{"2\\cos 3x\\,(\\cos x + \\cos 3x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Drugie użycie wzoru na sumę cosinusów</p>
        <p>
          W nawiasie znowu mamy sumę cosinusów, więc:
        </p>
        <Mb>
          {"\\cos x + \\cos 3x = 2\\cos\\frac{x+3x}{2}\\cos\\frac{x-3x}{2} = 2\\cos 2x \\cdot \\cos(-x) = 2\\cos 2x \\cos x"}
        </Mb>
        <p>Całe równanie:</p>
        <Mb>{"2\\cos 3x \\cdot 2\\cos 2x \\cos x = 0"}</Mb>
        <Mb>{"4\\cos x \\cos 2x \\cos 3x = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozwiązujemy równanie iloczynowe</p>
        <p>
          Iloczyn jest zerem, gdy któryś z czynników jest zerem.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos x = 0"}</Mi> → <Mi>{"x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{2}"}</Mi>.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos 2x = 0"}</Mi> → <Mi>{"2x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>, czyli{" "}
          <Mi>{"x = \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{4}"}</Mi>, <Mi>{"x = \\dfrac{3\\pi}{4}"}</Mi>.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos 3x = 0"}</Mi> → <Mi>{"3x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>, czyli{" "}
          <Mi>{"x = \\dfrac{\\pi}{6} + \\dfrac{k\\pi}{3}"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{6}"}</Mi>, <Mi>{"x = \\dfrac{\\pi}{2}"}</Mi>, <Mi>{"x = \\dfrac{5\\pi}{6}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Zbiór rozwiązań w przedziale</p>
        <p>
          Łączymy wszystkie wartości z <Mi>{"[0,\\pi]"}</Mi> (bez powtórzeń):
        </p>
        <FormulaBox>
          <Mb>
            {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
          </Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

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
        <p className="font-bold text-[#52297a] text-base">Metoda 2 (alternatywa)</p>

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
  {
    id: "smwp-2026-styczen-zad7",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "2",
    points: "0–5",
    instruction: (
      <span>
        <span className="block font-normal mb-3">
          Twierdzenie tangensów pozwala na określenie zależności między kątami i bokami trójkąta.
        </span>
        <span className="block italic text-[#52297a] mb-1">Twierdzenie tangensów:</span>
        <span className="block font-normal">
          Jeśli <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> są długościami boków trójkąta oraz{" "}
          <Mi>{"\\alpha"}</Mi> i <Mi>{"\\beta"}</Mi> są miarami kątów leżących odpowiednio
          naprzeciwko tych boków, to zachodzi równość
        </span>
      </span>
    ),
    mathBlock:
      "\\dfrac{a-b}{a+b} = \\dfrac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}",
    noteItems: [{ text: "Udowodnij powyższe twierdzenie." }],
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Skorzystaj z twierdzenia sinusów, żeby wyrazić <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> przez
          sinusy kątów <Mi>{"\\alpha"}</Mi> i <Mi>{"\\beta"}</Mi>. Po uproszczeniu zostaje{" "}
          <Mi>{"\\dfrac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta}"}</Mi>.
        </p>
        <p>Następnie użyj wzorów na różnicę i sumę sinusów:</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <FormulaBox>
          <Mb>{"\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Twierdzenie sinusów</p>
        <FormulaBox>
          <Mb>{"\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = 2R"}</Mb>
        </FormulaBox>
        <p>
          Stąd <Mi>{"a = 2R\\sin\\alpha"}</Mi> oraz <Mi>{"b = 2R\\sin\\beta"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Podstawiamy do wyrażenia po lewej stronie</p>
        <Mb>{"\\frac{a-b}{a+b} = \\frac{2R\\sin\\alpha - 2R\\sin\\beta}{2R\\sin\\alpha + 2R\\sin\\beta} = \\frac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wzory na różnicę i sumę sinusów</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <FormulaBox>
          <Mb>{"\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Podstawiamy wzory</p>
        <Mb>{"\\frac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta} = \\frac{2\\cos\\dfrac{\\alpha+\\beta}{2}\\cdot\\sin\\dfrac{\\alpha-\\beta}{2}}{2\\sin\\dfrac{\\alpha+\\beta}{2}\\cdot\\cos\\dfrac{\\alpha-\\beta}{2}}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Upraszczamy</p>
        <p>Czynniki 2 skracają się. Grupujemy licznik i mianownik:</p>
        <Mb>{"= \\frac{\\sin\\dfrac{\\alpha-\\beta}{2}}{\\cos\\dfrac{\\alpha-\\beta}{2}} \\cdot \\frac{\\cos\\dfrac{\\alpha+\\beta}{2}}{\\sin\\dfrac{\\alpha+\\beta}{2}} = \\frac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p>
            Zatem <Mi>{"\\dfrac{a-b}{a+b} = \\dfrac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}"}</Mi>,
            co kończy dowód. <Mi>{"\\blacksquare"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad6",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "3",
    points: "0–3",
    instruction: (
      <span>
        Na trójkącie <Mi>{"ABC"}</Mi>, w którym <Mi>{"|AB| = b"}</Mi> oraz{" "}
        <Mi>{"|\\angle ACB| = \\alpha"}</Mi> i <Mi>{"|\\angle BAC| = 3\\alpha"}</Mi>{" "}
        opisano okrąg o promieniu <Mi>{"R"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Zastosuj twierdzenie sinusów do odcinka <Mi>{"b = |AB|"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{b}{\\sin(\\angle ACB)} = 2R \\quad\\Rightarrow\\quad b = 2R\\sin\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Zapisz <Mi>{"\\sin(\\alpha + 2\\alpha) = \\dots"}</Mi> przy użyciu wzoru na sinus sumy oraz
          wzorów na <Mi>{"\\sin 2\\alpha"}</Mi> i <Mi>{"\\cos 2\\alpha"}</Mi>; po wyłączeniu{" "}
          <Mi>{"\\sin\\alpha"}</Mi> zamień <Mi>{"\\cos 2\\alpha"}</Mi> na{" "}
          <Mi>{"2\\cos^2\\alpha-1"}</Mi>.
        </p>
        <p>
          Pokaż, że wyrażenie pod pierwiastkiem uprości się do <Mi>{"4\\sin^2\\alpha"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Twierdzenie sinusów</p>
        <p>
          Kąt <Mi>{"\\angle ACB = \\alpha"}</Mi>, a bok naprzeciwległy to <Mi>{"b = |AB|"}</Mi>.
          Z twierdzenia sinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{b}{\\sin\\alpha} = 2R \\quad\\Rightarrow\\quad b = 2R\\sin\\alpha"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Upraszczamy wyrażenie pod pierwiastkiem</p>
        <p>
          <Mi>{"\\sin 3\\alpha"}</Mi> rozwiniemy wzorami dostępnymi w tablicach: sinus sumy kątów i sinus
          podwojonego kąta; potem w nawiasie zastąpimy <Mi>{"\\cos 2\\alpha"}</Mi>.
        </p>
        <Mb>{"\\sin 3\\alpha = \\sin(\\alpha + 2\\alpha)"}</Mb>
        <FormulaBox>
          <Mb>
            {"\\sin(\\alpha + \\beta) = \\sin\\alpha \\cos \\beta + \\cos\\alpha \\sin\\beta"}
          </Mb>
        </FormulaBox>
        <Mb>
          {"\\sin 3\\alpha = \\sin \\alpha \\cos 2\\alpha + \\cos \\alpha \\sin 2\\alpha"}
        </Mb>
        <p>
          Ponieważ <Mi>{"\\sin 2\\alpha = 2\\sin \\alpha \\cos \\alpha"}</Mi>:
        </p>
        <Mb>
          {"= \\sin\\alpha \\cos 2\\alpha + 2 \\sin\\alpha \\cos^2\\alpha"}
        </Mb>
        <Mb>
          {"= \\sin\\alpha\\bigl(\\cos 2\\alpha + 2\\cos^2\\alpha\\bigr)\\text{.}"}
        </Mb>
        <p>Wyliczamy wyrażenie <Mi>{"3\\sin\\alpha - \\sin 3\\alpha"}</Mi>:</p>
        <Mb>
          {"3\\sin\\alpha - \\sin 3\\alpha = \\sin\\alpha \\biggl[ 3-\\bigl(\\cos 2\\alpha + 2\\cos^2\\alpha\\bigr) \\biggr]"}
        </Mb>
        <p>
          Rozpisując <Mi>{"\\cos 2\\alpha"}</Mi> w postaci przy <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\cos 2\\alpha = 2\\cos^2\\alpha - 1"}</Mb>
        </FormulaBox>
        <Mb>
          {"\\quad \\Rightarrow \\quad \\cos 2\\alpha + 2\\cos^2\\alpha"}
        </Mb>
        <Mb>
          {"= \\bigl(2\\cos^2\\alpha - 1\\bigr) + 2\\cos^2\\alpha = 4\\cos^2\\alpha - 1"}
        </Mb>
        <Mb>
          {"\\quad \\Rightarrow \\quad 3\\sin\\alpha - \\sin 3\\alpha = \\sin\\alpha \\bigl[3-(4\\cos^2\\alpha-1)\\bigr]"}
        </Mb>
        <Mb>
          {"= \\sin\\alpha(4-4\\cos^2\\alpha) = 4\\sin\\alpha\\sin^2\\alpha"}
        </Mb>
        <p>Przy kącie ostrym przy wierzchołku <Mi>{"C"}</Mi> jest <Mi>{"\\sin\\alpha > 0"}</Mi>, więc możemy skrócić przez <Mi>{"\\sin\\alpha"}</Mi>:</p>
        <Mb>{"\\frac{3\\sin\\alpha - \\sin 3\\alpha}{\\sin\\alpha} = 4\\sin^2\\alpha"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Finał dowodu</p>
        <Mb>{"R\\sqrt{\\frac{3\\sin\\alpha-\\sin 3\\alpha}{\\sin\\alpha}} = R\\sqrt{4\\sin^2\\alpha} = R \\cdot 2\\sin\\alpha = 2R\\sin\\alpha = b \\qquad \\blacksquare"}</Mb>
      </div>
    ),
  },

  // ── Zadanie 4 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad9",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "4",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\sin 6x - \\cos 4x = 2\\sin\\frac{\\pi}{4}\\cdot(\\cos x - \\sin x)",
    noteItems: [{ text: "w przedziale " }, { math: "\\left[-\\dfrac{\\pi}{3},\\,\\dfrac{2\\pi}{3}\\right]" }, { text: ". Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"x \\in \\left\\{-\\dfrac{\\pi}{4},\\;\\dfrac{3\\pi}{20},\\;\\dfrac{\\pi}{4},\\;\\dfrac{11\\pi}{20}\\right\\}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"2\\sin\\frac{\\pi}{4} = \\sqrt{2}"}</Mi> i prawa strona to{" "}
          <Mi>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mi>.
        </p>
        <p>
          Lewa strona: zamień <Mi>{"\\cos 4x = \\sin\\left(\\frac{\\pi}{2}-4x\\right)"}</Mi>{" "}
          i zastosuj wzór na różnicę sinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}"}</Mb>
        </FormulaBox>
        <p>
          Otrzymasz iloczyn <Mi>{"2\\cos(x+\\frac{\\pi}{4})\\sin(5x-\\frac{\\pi}{4})"}</Mi>.
          Rozwiąż dwa przypadki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Upraszczamy obie strony</p>
        <p>Prawa strona: <Mi>{"2\\sin\\frac{\\pi}{4} = \\sqrt{2}"}</Mi>:</p>
        <Mb>{"\\sqrt{2}(\\cos x - \\sin x) = 2\\left(\\cos\\frac{\\pi}{4}\\cos x - \\sin\\frac{\\pi}{4}\\sin x\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mb>
        <p>Lewa strona: <Mi>{"\\cos 4x = \\sin\\left(\\frac{\\pi}{2}-4x\\right)"}</Mi>, więc:</p>
        <FormulaBox>
          <Mb>{"\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin 6x - \\sin\\left(\\frac{\\pi}{2}-4x\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\sin\\left(5x-\\frac{\\pi}{4}\\right)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Równanie po uproszczeniu</p>
        <Mb>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\sin\\left(5x-\\frac{\\pi}{4}\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mb>
        <Mb>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\left[\\sin\\left(5x-\\frac{\\pi}{4}\\right) - 1\\right] = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Przypadek 1: <Mi>{"\\cos(x+\\pi/4) = 0"}</Mi></p>
        <Mb>{"x + \\frac{\\pi}{4} = \\frac{\\pi}{2} + k\\pi \\quad\\Rightarrow\\quad x = \\frac{\\pi}{4} + k\\pi"}</Mb>
        <p>Na przedziale: <Mi>{"k=0: x = \\frac{\\pi}{4}"}</Mi> ✓</p>

        <p className="font-semibold text-stone-800">Krok 4. Przypadek 2: <Mi>{"\\sin(5x-\\pi/4) = 1"}</Mi></p>
        <Mb>{"5x - \\frac{\\pi}{4} = \\frac{\\pi}{2} + 2k\\pi \\quad\\Rightarrow\\quad x = \\frac{3\\pi}{20} + \\frac{2k\\pi}{5}"}</Mb>
        <p>Na przedziale <Mi>{"\\left[-\\tfrac{\\pi}{3},\\tfrac{2\\pi}{3}\\right]"}</Mi>:</p>
        <p><Mi>{"k{=}-1"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20} - \\frac{2\\pi}{5} = -\\frac{\\pi}{4}"}</Mi> ✓</p>
        <p><Mi>{"k{=}0"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20}"}</Mi> ✓</p>
        <p><Mi>{"k{=}1"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20} + \\frac{2\\pi}{5} = \\frac{11\\pi}{20}"}</Mi> ✓</p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x \\in \\left\\{-\\dfrac{\\pi}{4},\\;\\dfrac{3\\pi}{20},\\;\\dfrac{\\pi}{4},\\;\\dfrac{11\\pi}{20}\\right\\}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 5 ─────────────────────────────────────────────
  {
    id: "cke-formula2023-maj-2026-przyklad-zad7-trygonometria",
    source:
      "Matura z matematyki, poziom rozszerzony, arkusz CKE (formuła 2023), egzamin maj 2026",
    number: "5",
    points: "0–4",
    instruction: "Rozwiąż równanie",
    mathBlock: "\\sin 6x - 2 \\sin 2x = 0",
    noteItems: [{ text: "Zapisz obliczenia." }],
    answers: null,

    answer: (
      <div className="space-y-3">
        <p>
        <Mi>{"x = \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{\\pi}{12} + \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{5\\pi}{12} + \\dfrac{k\\pi}{2}\\quad"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>).
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Rozbij całe wyrażenie na trzy składniki <Mi>{"\\sin 6x - \\sin 2x - \\sin 2x"}</Mi> i użyj wzoru na różnicę sinusów dla <Mi>{"\\sin 6x - \\sin 2x"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha -\\beta}{2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozbicie na trzy składniki</p>
        <p>
          Zapisujemy lewą stronę jako różnicę dwóch sinusów minus kolejny sinus{" "}
          <Mi>{"2x"}</Mi>:
        </p>
        <Mb>{"\\sin 6x - 2\\sin 2x = \\sin 6x - \\sin 2x - \\sin 2x = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wzór na różnicę sinusów</p>
        <p>
          Stosujemy go do wyrażenia <Mi>{"\\sin 6x - \\sin 2x"}</Mi>, przyjmując{" "}
          <Mi>{"\\alpha = 6x"}</Mi> oraz <Mi>{"\\beta = 2x"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha - \\beta}{2}"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin 6x - \\sin 2x = 2\\cos\\frac{6x + 2x}{2}\\sin\\frac{6x - 2x}{2} = 2\\cos 4x \\cdot \\sin 2x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Równanie z czynnikiem wspólnym</p>
        <Mb>{"2\\cos 4x \\cdot \\sin 2x - \\sin 2x = 0"}</Mb>
        <Mb>{"\\sin 2x \\cdot \\bigl(2\\cos 4x - 1\\bigr) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Pierwszy czynnik</p>
        <Mb>{"\\sin 2x = 0 \\quad \\Longleftrightarrow \\quad 2x = k\\pi \\quad (k \\in \\mathbb{Z}) \\quad \\Longleftrightarrow \\quad x = \\frac{k\\pi}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Drugi czynnik</p>
        <Mb>{"2\\cos 4x - 1 = 0 \\quad \\Longleftrightarrow \\quad \\cos 4x = \\frac{1}{2}"}</Mb>
        <p>
          Ponieważ <Mi>{"\\cos u = \\frac{1}{2}"}</Mi> wtedy i tylko wtedy, gdy{" "}
          <Mi>{"u = \\frac{\\pi}{3} + 2m\\pi"}</Mi> lub{" "}
          <Mi>{"u = \\frac{5\\pi}{3} + 2m\\pi"}</Mi> (<Mi>{"m \\in \\mathbb{Z}"}</Mi>), podstawiamy{" "}
          <Mi>{"u = 4x"}</Mi>:
        </p>
        <Mb>{"4x = \\frac{\\pi}{3} + 2m\\pi \\quad \\text{lub} \\quad 4x = \\frac{5\\pi}{3} + 2m\\pi"}</Mb>
        <Mb>{"x = \\frac{\\pi}{12} + \\frac{m\\pi}{2} \\quad \\text{lub} \\quad x = \\frac{5\\pi}{12} + \\frac{m\\pi}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p className="mt-2">
            <Mi>{"x = \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{\\pi}{12} + \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{5\\pi}{12} + \\dfrac{k\\pi}{2}\\quad"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>).
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad9-rownanie-tryg",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "9",
    points: null,
    instruction: (
      <div className="space-y-3">
        <p>Rozwiąż równanie</p>
        <Mb>{"\\sin 3x + \\cos 2x = 1 + 2\\sin x \\cos 2x"}</Mb>
        <p>a) Ile jest rozwiązań tego równania należących do przedziału <Mi>{"(0, \\pi)"}</Mi>?</p>
        <p>
          b) Podaj sumę rozwiązań tego równania należących do przedziału{" "}
          <Mi>{"[-2\\pi,\\, 2\\pi]"}</Mi>. (Przyjmij <Mi>{"3"}</Mi> jako przybliżoną wartość{" "}
          <Mi>{"\\pi"}</Mi>.)
        </p>
        <p>
          c) Podaj najmniejsze dodatnie rozwiązanie tego równania.
          (Przyjmij <Mi>{"3"}</Mi> jako przybliżoną wartość <Mi>{"\\pi"}</Mi>.)
        </p>
        <p>
          d) Ile rozwiązań wymiernych ma to równanie? (W przypadku gdy jest nieskończenie wiele
          takich rozwiązań, w odpowiedzi wpisz <Mi>{"8"}</Mi>.)
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>a) <Mi>{"2"}</Mi></p>
        <p>b) <Mi>{"-2\\pi \\approx -6"}</Mi></p>
        <p>c) <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi></p>
        <p>d) <Mi>{"1"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Przenieś wszystko na jedną stronę i pogrupuj:</p>
        <Mb>{"(\\sin 3x - 2\\sin x \\cos 2x) + (\\cos 2x - 1) = 0"}</Mb>
        <p>
          Pierwszą grupę uprość, rozwijając <Mi>{"\\sin 3x = \\sin(x + 2x)"}</Mi> i redukując.
          Drugą zamień wzorem <Mi>{"\\cos 2x - 1 = -2\\sin^2 x"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przenosimy i grupujemy</p>
        <Mb>{"\\sin 3x - 2\\sin x\\cos 2x + \\cos 2x - 1 = 0"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Upraszczamy <Mi>{"\\sin 3x - 2\\sin x \\cos 2x"}</Mi>
        </p>
        <p>Korzystamy ze wzoru na sinus sumy:</p>
        <Mb>{"\\sin 3x = \\sin(x + 2x) = \\sin x \\cos 2x + \\cos x \\sin 2x"}</Mb>
        <p>Podstawiamy:</p>
        <Mb>
          {"\\sin x\\cos 2x + \\cos x\\sin 2x - 2\\sin x\\cos 2x = \\cos x\\sin 2x - \\sin x\\cos 2x"}
        </Mb>
        <p>
          Rozpoznajemy wzór na sinus różnicy{" "}
          <Mi>{"\\sin(A - B) = \\sin A\\cos B - \\cos A\\sin B"}</Mi>:
        </p>
        <Mb>
          {"\\cos x\\sin 2x - \\sin x\\cos 2x = \\sin(2x - x) = \\sin x"}
        </Mb>

        <p className="font-semibold text-stone-800">
          Krok 3. Upraszczamy <Mi>{"\\cos 2x - 1"}</Mi>
        </p>
        <FormulaBox>
          <Mb>{"\\cos 2x - 1 = -2\\sin^2 x"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Równanie po uproszczeniu</p>
        <Mb>{"\\sin x - 2\\sin^2 x = 0"}</Mb>
        <Mb>{"\\sin x\\,(1 - 2\\sin x) = 0"}</Mb>
        <p>Dwa przypadki:</p>
        <Mb>{"\\sin x = 0 \\qquad \\text{lub} \\qquad \\sin x = \\tfrac{1}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Rozwiązania ogólne</p>
        <Mb>{"\\sin x = 0 \\quad \\Longrightarrow \\quad x = n\\pi, \\quad n \\in \\mathbb{Z}"}</Mb>
        <Mb>
          {"\\sin x = \\tfrac{1}{2} \\quad \\Longrightarrow \\quad x = \\tfrac{\\pi}{6} + 2n\\pi \\quad \\text{lub} \\quad x = \\tfrac{5\\pi}{6} + 2n\\pi, \\quad n \\in \\mathbb{Z}"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 6. Odpowiedzi na podpunkty</p>

        <p><strong>a)</strong> Przedział <Mi>{"(0, \\pi)"}</Mi> (otwarty):</p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li><Mi>{"\\sin x = 0"}</Mi>: <Mi>{"x = 0"}</Mi> i <Mi>{"x = \\pi"}</Mi> nie należą do przedziału otwartego.</li>
          <li><Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi>: <Mi>{"x = \\tfrac{\\pi}{6} \\in (0, \\pi)"}</Mi> ✓ oraz <Mi>{"x = \\tfrac{5\\pi}{6} \\in (0, \\pi)"}</Mi> ✓</li>
        </ul>
        <Mb>{"\\text{Odpowiedź: } 2"}</Mb>

        <p><strong>b)</strong> Przedział <Mi>{"[-2\\pi,\\, 2\\pi]"}</Mi>:</p>
        <p><Mi>{"\\sin x = 0"}</Mi>: <Mi>{"x \\in \\{-2\\pi,\\, -\\pi,\\, 0,\\, \\pi,\\, 2\\pi\\}"}</Mi> — suma <Mi>{"= 0"}</Mi>.</p>
        <p>
          <Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi>:{" "}
          <Mi>{"x \\in \\bigl\\{\\tfrac{\\pi}{6},\\; \\tfrac{5\\pi}{6},\\; -\\tfrac{7\\pi}{6},\\; -\\tfrac{11\\pi}{6}\\bigr\\}"}</Mi>
        </p>
        <Mb>
          {"\\tfrac{\\pi}{6} + \\tfrac{5\\pi}{6} - \\tfrac{7\\pi}{6} - \\tfrac{11\\pi}{6} = \\frac{1 + 5 - 7 - 11}{6}\\,\\pi = \\frac{-12}{6}\\,\\pi = -2\\pi"}
        </Mb>
        <Mb>{"\\text{Suma: } 0 + (-2\\pi) = -2\\pi \\approx -6"}</Mb>

        <p><strong>c)</strong> Najmniejsze dodatnie rozwiązanie:</p>
        <p>
          Dodatnie rozwiązania to: <Mi>{"\\tfrac{\\pi}{6},\\; \\tfrac{5\\pi}{6},\\; \\pi,\\; 2\\pi,\\; \\ldots"}</Mi>{" "}
          Najmniejsze: <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi>.
        </p>

        <p><strong>d)</strong> Rozwiązania wymierne:</p>
        <p>
          Z <Mi>{"\\sin x = 0"}</Mi> mamy <Mi>{"x = n\\pi"}</Mi>. Liczba <Mi>{"n\\pi"}</Mi> jest
          wymierna tylko dla <Mi>{"n = 0"}</Mi> (bo <Mi>{"\\pi"}</Mi> jest niewymierne).
          Rozwiązania z <Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi> to wielokrotności <Mi>{"\\pi"}</Mi>,
          więc też niewymierne.
        </p>
        <Mb>{"\\text{Jedyne rozwiązanie wymierne: } x = 0 \\quad \\Longrightarrow \\quad 1"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"2"}</Mi>, b) <Mi>{"-2\\pi \\approx -6"}</Mi>,
            c) <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi>, d) <Mi>{"1"}</Mi>
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

        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
