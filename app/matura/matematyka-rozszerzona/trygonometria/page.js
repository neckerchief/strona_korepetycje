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
          Następnie skorzystaj z wzoru na <Mi>{"\\sin 3\\alpha"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\sin 3\\alpha = 3\\sin\\alpha - 4\\sin^3\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Wykaż, że <Mi>{"3\\sin\\alpha - \\sin 3\\alpha = 4\\sin^3\\alpha"}</Mi>, a
          następnie uprość <Mi>{"R\\sqrt{\\dfrac{3\\sin\\alpha-\\sin 3\\alpha}{\\sin\\alpha}}"}</Mi>.
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
        <p>Korzystamy z wzoru:</p>
        <FormulaBox>
          <Mb>{"\\sin 3\\alpha = 3\\sin\\alpha - 4\\sin^3\\alpha"}</Mb>
        </FormulaBox>
        <Mb>{"3\\sin\\alpha - \\sin 3\\alpha = 3\\sin\\alpha - (3\\sin\\alpha - 4\\sin^3\\alpha) = 4\\sin^3\\alpha"}</Mb>
        <p>Zatem:</p>
        <Mb>{"\\frac{3\\sin\\alpha - \\sin 3\\alpha}{\\sin\\alpha} = \\frac{4\\sin^3\\alpha}{\\sin\\alpha} = 4\\sin^2\\alpha"}</Mb>

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
        <p>Prawa strona: <Mi>{"2\\sin\\frac{\\pi}{4} = \\sqrt{2}"}</Mi>, a</p>
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
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
