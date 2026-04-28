"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Diagram do Metody 2 ──────────────────────────────────────
// Schematyczny rysunek: okrąg O1, cięciwa MN, prostopadła O1H,
// trójkąt prostokątny O1HN z wymiarami r=3, d=9/5, |MN|/2=12/5

const DiagramMetoda2 = () => (
  <svg viewBox="0 0 320 235" className="w-full max-w-xs mx-auto my-4 block">
    {/* Trójkąt O1HN - wypełnienie */}
    <polygon points="160,135 160,84 228,84" fill="#f2ecfb" />

    {/* Okrąg O1 */}
    <circle cx="160" cy="135" r="85" fill="none" stroke="#c4a8e8" strokeWidth="1.8" />

    {/* Cięciwa MN */}
    <line x1="92" y1="84" x2="228" y2="84" stroke="#6d3a8e" strokeWidth="2.5" />

    {/* Prostopadła O1→H (przerywana) */}
    <line x1="160" y1="135" x2="160" y2="84" stroke="#6d3a8e" strokeWidth="1.5" strokeDasharray="5,3" />

    {/* Promień O1→N */}
    <line x1="160" y1="135" x2="228" y2="84" stroke="#9b7fd4" strokeWidth="1.8" />

    {/* Kąt prosty: łuk ćwierćkoła + kropka wewnątrz */}
    <path d="M 170,84 A 10,10 0 0,1 160,94" fill="none" stroke="#6d3a8e" strokeWidth="1.2" />
    <circle cx="164" cy="88" r="1.5" fill="#6d3a8e" />

    {/* Punkty O1, M, N */}
    <circle cx="160" cy="135" r="3.5" fill="#6d3a8e" />
    <circle cx="92"  cy="84"  r="3"   fill="#6d3a8e" />
    <circle cx="228" cy="84"  r="3"   fill="#6d3a8e" />

    {/* Etykiety */}
    <text x="166" y="150" fontSize="14" fontFamily="serif" fill="#2d1458">O₁</text>
    <text x="76"  y="80"  fontSize="14" fontFamily="serif" fill="#2d1458">M</text>
    <text x="233" y="80"  fontSize="14" fontFamily="serif" fill="#2d1458">N</text>

    <text x="154" y="113" fontSize="11.5" fill="#6d3a8e" textAnchor="end">d = 9/5</text>
    <text x="207" y="121" fontSize="11.5" fill="#9b7fd4" textAnchor="middle">r = 3</text>
    <text x="160" y="69"  fontSize="11.5" fill="#2d1458" textAnchor="middle" fontWeight="600">|MN| = 24/5</text>
  </svg>
);

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad4",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>Okręgi</p>
        <ul className="space-y-1 ml-4">
          <li>
            <Mi>{"\\mathcal{O}_1\\colon\\quad (x-1)^2 + (y+3)^2 = 9"}</Mi>
          </li>
          <li>
            <Mi>{"\\mathcal{O}_2\\colon\\quad (x+2)^2 + (y-1)^2 = 16"}</Mi>
          </li>
        </ul>
        <p>
          przecinają się w punktach <Mi>{"M"}</Mi> oraz <Mi>{"N"}</Mi>.
        </p>
        <p className="font-semibold">
          Oblicz odległość między punktami <Mi>{"M"}</Mi> oraz <Mi>{"N"}</Mi>. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p><Mi>{"|MN| = \\dfrac{24}{5}"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Rozwiń oba równania okręgów do postaci <Mi>{"x^2 + y^2 + \\ldots = 0"}</Mi>,
          a następnie odejmij jedno od drugiego. Dostaniesz liniowe równanie prostej
          przechodzącej przez punkty <Mi>{"M"}</Mi> i <Mi>{"N"}</Mi>.
        </p>
        <p>
          Wyznacz z niego jedną zmienną i podstaw do wybranego oryginalnego równania okręgu.
          Dostaniesz układ dający współrzędne punktów <Mi>{"M"}</Mi> i <Mi>{"N"}</Mi>.
        </p>
        <p>Na koniec skorzystaj ze wzoru na odległość dwóch punktów:</p>
        <FormulaBox>
          <Mb>{"|MN| = \\sqrt{(x_N - x_M)^2 + (y_N - y_M)^2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">

        {/* ── Metoda 1 ── */}
        <p className="font-bold text-[#52297a] text-base">Metoda 1: wyznaczamy punkty M i N</p>

        <p className="font-semibold text-stone-800">Krok 1. Rozwijamy równania okręgów</p>
        <Mb>{"\\mathcal{O}_1:\\quad x^2 + y^2 - 2x + 6y + 1 = 0"}</Mb>
        <Mb>{"\\mathcal{O}_2:\\quad x^2 + y^2 + 4x - 2y - 11 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Odejmujemy <Mi>{"\\mathcal{O}_1"}</Mi> od <Mi>{"\\mathcal{O}_2"}</Mi></p>
        <Mb>{"6x - 8y - 12 = 0 \\quad\\Rightarrow\\quad 3x - 4y - 6 = 0"}</Mb>
        <p>
          To równanie opisuje prostą przechodzącą przez oba punkty przecięcia.
          Wyznaczamy <Mi>{"x"}</Mi>:
        </p>
        <Mb>{"x = \\frac{4y + 6}{3}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Podstawiamy do <Mi>{"\\mathcal{O}_1"}</Mi></p>
        <Mb>{"\\left(\\frac{4y+6}{3} - 1\\right)^2 + (y+3)^2 = 9"}</Mb>
        <Mb>{"\\left(\\frac{4y+3}{3}\\right)^2 + (y+3)^2 = 9"}</Mb>
        <p>Mnożymy przez 9:</p>
        <Mb>{"(4y+3)^2 + 9(y+3)^2 = 81"}</Mb>
        <Mb>{"16y^2 + 24y + 9 + 9y^2 + 54y + 81 = 81"}</Mb>
        <Mb>{"25y^2 + 78y + 9 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczymy deltę</p>
        <Mb>{"\\Delta = 78^2 - 4 \\cdot 25 \\cdot 9 = 6084 - 900 = 5184"}</Mb>
        <p><Mi>{"\\sqrt{\\Delta} = 72"}</Mi></p>
        <Mb>{"y_1 = \\frac{-78 - 72}{50} = \\frac{-150}{50} = -3"}</Mb>
        <Mb>{"y_2 = \\frac{-78 + 72}{50} = \\frac{-6}{50} = -\\frac{3}{25}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Wyznaczamy współrzędne M i N</p>
        <p>Dla <Mi>{"y_1 = -3"}</Mi>:</p>
        <Mb>{"x_1 = \\frac{4 \\cdot (-3) + 6}{3} = \\frac{-6}{3} = -2 \\quad\\Rightarrow\\quad M = (-2,\\, -3)"}</Mb>
        <p>Dla <Mi>{"y_2 = -\\tfrac{3}{25}"}</Mi>:</p>
        <Mb>{"x_2 = \\frac{4 \\cdot (-\\frac{3}{25}) + 6}{3} = \\frac{\\frac{138}{25}}{3} = \\frac{46}{25} \\quad\\Rightarrow\\quad N = \\left(\\frac{46}{25},\\, -\\frac{3}{25}\\right)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 6. Odległość MN</p>
        <FormulaBox>
          <Mb>{"|MN| = \\sqrt{(x_N - x_M)^2 + (y_N - y_M)^2}"}</Mb>
        </FormulaBox>
        <Mb>{"|MN| = \\sqrt{\\left(\\frac{46}{25}+2\\right)^2 + \\left(-\\frac{3}{25}+3\\right)^2} = \\sqrt{\\left(\\frac{96}{25}\\right)^2 + \\left(\\frac{72}{25}\\right)^2}"}</Mb>
        <Mb>{"|MN| = \\sqrt{\\frac{9216 + 5184}{625}} = \\sqrt{\\frac{14400}{625}} = \\frac{120}{25} = \\frac{24}{5}"}</Mb>

        {/* ── Metoda 2 ── */}
        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2: odległość od środka do cięciwy</p>

        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy prostą MN</p>
        <p>
          Tak samo jak w Metodzie 1, odejmujemy równania i dostajemy prostą MN:
        </p>
        <Mb>{"3x - 4y - 6 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Odległość od środka <Mi>{"\\mathcal{O}_1"}</Mi> do prostej MN</p>
        <p>
          Środek <Mi>{"\\mathcal{O}_1"}</Mi> to <Mi>{"(1, -3)"}</Mi>, promień <Mi>{"r_1 = 3"}</Mi>.
          Korzystamy ze wzoru na odległość punktu od prostej:
        </p>
        <FormulaBox>
          <Mb>{"d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}"}</Mb>
        </FormulaBox>
        <Mb>{"d = \\frac{|3 \\cdot 1 - 4 \\cdot (-3) - 6|}{\\sqrt{9 + 16}} = \\frac{|3 + 12 - 6|}{5} = \\frac{9}{5}"}</Mb>

        <DiagramMetoda2 />

        <p className="font-semibold text-stone-800">Krok 3. Długość cięciwy</p>
        <p>
          Prosta MN jest cięciwą okręgu <Mi>{"\\mathcal{O}_1"}</Mi>. Połowa długości cięciwy:
        </p>
        <Mb>{"\\frac{|MN|}{2} = \\sqrt{r_1^2 - d^2} = \\sqrt{9 - \\frac{81}{25}} = \\sqrt{\\frac{225 - 81}{25}} = \\sqrt{\\frac{144}{25}} = \\frac{12}{5}"}</Mb>
        <Mb>{"|MN| = 2 \\cdot \\frac{12}{5} = \\frac{24}{5}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"|MN| = \\dfrac{24}{5}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function GeometriaAnalitycznaPage() {
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
          <span className="text-sm text-stone-400">Geometria analityczna</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 13
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Geometria analityczna
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
