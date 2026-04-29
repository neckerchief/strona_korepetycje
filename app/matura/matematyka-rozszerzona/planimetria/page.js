"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, SubTask, Mi, Mb, FormulaBox } from "../_components";

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

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad3",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–3",
    instruction: (
      <span>
        Dany jest czworokąt <Mi>{"ABCD"}</Mi>, w którym <Mi>{"|CD| = 17"}</Mi> oraz{" "}
        <Mi>{"|AD| = 19"}</Mi>. Przekątna <Mi>{"|BD|"}</Mi> czworokąta ma długość{" "}
        <Mi>{"11\\sqrt{6}"}</Mi> i cosinus kąta <Mi>{"BAD"}</Mi> jest równy{" "}
        <Mi>{"\\left(-\\dfrac{2}{17}\\right)"}</Mi>. Ponadto, na czworokącie{" "}
        <Mi>{"ABCD"}</Mi> można opisać okrąg.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: <p><Mi>{"76"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Zastosuj twierdzenie cosinusów w trójkącie <Mi>{"ABD"}</Mi>, aby wyznaczyć{" "}
          <Mi>{"|AB|"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"|BD|^2 = |AB|^2 + |AD|^2 - 2\\cdot|AB|\\cdot|AD|\\cos(\\angle BAD)"}</Mb>
        </FormulaBox>
        <p>
          Ponieważ na <Mi>{"ABCD"}</Mi> można opisać okrąg, kąty naprzeciwległe sumują
          się do <Mi>{"180°"}</Mi>. Użyj tego, by wyznaczyć <Mi>{"|BC|"}</Mi> z{" "}
          <Mi>{"\\triangle BCD"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"|AB|"}</Mi> z trójkąta <Mi>{"ABD"}</Mi></p>
        <p>Twierdzenie cosinusów w <Mi>{"\\triangle ABD"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"|BD|^2 = |AB|^2 + |AD|^2 - 2\\cdot|AB|\\cdot|AD|\\cos(\\angle BAD)"}</Mb>
        </FormulaBox>
        <Mb>{"(11\\sqrt{6})^2 = |AB|^2 + 19^2 - 2\\cdot|AB|\\cdot 19\\cdot\\left(-\\frac{2}{17}\\right)"}</Mb>
        <Mb>{"726 = |AB|^2 + 361 + \\frac{76}{17}|AB|"}</Mb>
        <p>Mnożymy przez 17:</p>
        <Mb>{"17|AB|^2 + 76|AB| - 6205 = 0"}</Mb>
        <p>DELTA <Mi>{"= 76^2 + 4 \\cdot 17 \\cdot 6205 = 5776 + 421940 = 427716 = 654^2"}</Mi></p>
        <Mb>{"|AB| = \\frac{-76 + 654}{2\\cdot 17} = \\frac{578}{34} = 17"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Korzystamy z własności czworokąta wpisanego w okrąg</p>
        <p>
          Dla czworokąta cyklicznego kąty naprzeciwległe sumują się do <Mi>{"180°"}</Mi>:
        </p>
        <Mb>{"\\angle BAD + \\angle BCD = 180° \\quad\\Rightarrow\\quad \\cos(\\angle BCD) = -\\cos(\\angle BAD) = \\frac{2}{17}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy <Mi>{"|BC|"}</Mi> z trójkąta <Mi>{"BCD"}</Mi></p>
        <Mb>{"|BD|^2 = |BC|^2 + |CD|^2 - 2\\cdot|BC|\\cdot|CD|\\cos(\\angle BCD)"}</Mb>
        <Mb>{"726 = |BC|^2 + 289 - 2\\cdot|BC|\\cdot 17 \\cdot \\frac{2}{17}"}</Mb>
        <Mb>{"726 = |BC|^2 + 289 - 4|BC|"}</Mb>
        <Mb>{"|BC|^2 - 4|BC| - 437 = 0"}</Mb>
        <p>DELTA <Mi>{"= 16 + 4 \\cdot 437 = 1764 = 42^2"}</Mi></p>
        <Mb>{"|BC| = \\frac{4 + 42}{2} = 23"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy obwód</p>
        <Mb>{"\\text{Obwód} = |AB| + |BC| + |CD| + |DA| = 17 + 23 + 17 + 19 = 76"}</Mb>
      </div>
    ),
  },
];

// ─── Zadanie 3 (złożone: 13.1 + 13.2) ────────────────────────

const SOURCE_OCT = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const Zad13 = () => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">Zadanie 3. (0–7)</span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
      <p>
        Dany jest trapez równoramienny o ramieniu długości <Mi>{"10"}</Mi> oraz górnej
        podstawie <Mi>{"4"}</Mi>. Na rysunku zaznaczono zacieniowany trójkąt <Mi>{"P"}</Mi>,
        którego jeden bok jest połową wysokości trapezu. Punkt <Mi>{"C"}</Mi> leży na środku
        ramienia tego trapezu. Niech <Mi>{"b"}</Mi> oznacza długość dłuższej podstawy, przy
        czym <Mi>{"b > 4"}</Mi>.
      </p>
    </div>

    <SubTask
      label="3.1"
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            Skorzystaj z zależności odcinka łączącego środki ramion trapezu. Ustaw układ
            współrzędnych: dolna podstawa na osi <Mi>{"x"}</Mi>, trapez symetryczny względem
            osi <Mi>{"y"}</Mi>.
          </p>
          <p>
            Wierzchołki: dolna podstawa od <Mi>{"(-b/2,\\,0)"}</Mi> do <Mi>{"(b/2,\\,0)"}</Mi>,
            górna od <Mi>{"(-2,\\,h)"}</Mi> do <Mi>{"(2,\\,h)"}</Mi>.
            Środek prawego ramienia to <Mi>{"C = \\left(\\frac{b+4}{4},\\,\\frac{h}{2}\\right)"}</Mi>.
          </p>
          <p>Trójkąt P ma wierzchołki: <Mi>{"(2,h)"}</Mi>, <Mi>{"\\left(\\frac{b+4}{4},\\frac{h}{2}\\right)"}</Mi>, <Mi>{"\\left(\\frac{b}{2},\\frac{h}{2}\\right)"}</Mi>. Pole = (podstawa * wysokość)/2.</p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy wysokość trapezu</p>
          <p>Z twierdzenia Pitagorasa (ramię = 10, pozioma odległość = <Mi>{"\\frac{b-4}{2}"}</Mi>):</p>
          <Mb>{"h = \\sqrt{10^2 - \\left(\\frac{b-4}{2}\\right)^2} = \\sqrt{\\frac{400-(b-4)^2}{4}} = \\frac{\\sqrt{-b^2+8b+384}}{2}"}</Mb>

          <p className="font-semibold text-stone-800">Krok 2. Wierzchołki trójkąta P</p>
          <p>Układ: dolna podstawa od <Mi>{"(-b/2,0)"}</Mi> do <Mi>{"(b/2,0)"}</Mi>, górna od <Mi>{"(-2,h)"}</Mi> do <Mi>{"(2,h)"}</Mi>.</p>
          <p>
            <Mi>{"C"}</Mi> = środek prawego ramienia = <Mi>{"\\left(\\frac{b+4}{4},\\,\\frac{h}{2}\\right)"}</Mi>
          </p>
          <p>Trójkąt P ma wierzchołki: <Mi>{"A' = (2,h)"}</Mi>, <Mi>{"C = \\left(\\frac{b+4}{4},\\frac{h}{2}\\right)"}</Mi>, <Mi>{"D' = \\left(\\frac{b}{2},\\frac{h}{2}\\right)"}</Mi>.</p>

          <p className="font-semibold text-stone-800">Krok 3. Pole trójkąta P</p>
          <p>Podstawa (pozioma) <Mi>{"D'C = \\frac{b}{2}-\\frac{b+4}{4} = \\frac{b-4}{4}"}</Mi>, wysokość = <Mi>{"h - \\frac{h}{2} = \\frac{h}{2}"}</Mi>.</p>
          <Mb>{"P = \\frac{1}{2} \\cdot \\frac{b-4}{4} \\cdot \\frac{h}{2} = \\frac{(b-4)h}{16}"}</Mb>
          <p>Podstawiamy <Mi>{"h = \\frac{\\sqrt{-b^2+8b+384}}{2}"}</Mi>:</p>
          <Mb>{"P(b) = \\frac{(b-4)\\sqrt{-b^2+8b+384}}{32}"}</Mb>
          <p>Sprawdzamy, że jest to równoważne zadanej formule:</p>
          <Mb>{"(b-4)^2(-b^2+8b+384) = -b^4+16b^3+304b^2-2944b+6144"}</Mb>
          <FormulaBox>
            <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32} \\qquad \\blacksquare"}</Mb>
          </FormulaBox>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że pole trójkąta <Mi>{"P"}</Mi> w zależności od długości <Mi>{"b"}</Mi>{" "}
        dolnej podstawy wyraża się wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label="3.2"
      points="0–5"
      answer={<p><Mi>{"P_{\\max} = \\dfrac{25}{4}"}</Mi>, osiągane dla <Mi>{"b = 4+10\\sqrt{2}"}</Mi></p>}
      hint={
        <div className="space-y-3">
          <p>
            Maksimum <Mi>{"P(b)"}</Mi> ↔ maksimum <Mi>{"f(b) = -b^4+16b^3+304b^2-2944b+6144"}</Mi>.
            Wyznacz <Mi>{"f'(b)"}</Mi> i rozłóż przez <Mi>{"(b-4)"}</Mi>:
          </p>
          <Mb>{"f'(b) = -4(b-4)(b^2-8b-184)"}</Mb>
          <p>
            Rozwiąż <Mi>{"b^2-8b-184=0"}</Mi>. Sprawdź, które pierwiastki leżą w
            przedziale <Mi>{"(4,24)"}</Mi>.
          </p>
          <p className="text-amber-700 text-xs mt-2">
            Uwaga: funkcja może mieć ekstrema lokalne poza tym przedziałem - sprawdź
            zachowanie na końcach.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Strategia</p>
          <p>
            Ponieważ <Mi>{"P(b) = \\sqrt{f(b)}/32"}</Mi> i <Mi>{"\\sqrt{\\cdot}"}</Mi> jest
            rosnąca, maksimum <Mi>{"P"}</Mi> ↔ maksimum <Mi>{"f(b) = -b^4+16b^3+304b^2-2944b+6144"}</Mi>.
          </p>

          <p className="font-semibold text-stone-800">Krok 2. Pochodna <Mi>{"f"}</Mi></p>
          <Mb>{"f'(b) = -4b^3+48b^2+608b-2944 = -4(b^3-12b^2-152b+736)"}</Mb>
          <p>Sprawdzamy <Mi>{"b=4"}</Mi>: <Mi>{"64-192-608+736=0"}</Mi>. Dzielimy:</p>
          <Mb>{"f'(b) = -4(b-4)(b^2-8b-184)"}</Mb>
          <p>Pierwiastki <Mi>{"b^2-8b-184=0"}</Mi>:</p>
          <Mb>{"b = \\frac{8 \\pm \\sqrt{64+736}}{2} = \\frac{8 \\pm \\sqrt{800}}{2} = 4 \\pm 10\\sqrt{2}"}</Mb>
          <p>
            <Mi>{"4+10\\sqrt{2} \\approx 18{,}1 \\in (4,24)"}</Mi> ✓ oraz{" "}
            <Mi>{"4-10\\sqrt{2} \\approx -10{,}1 \\notin (4,24)"}</Mi>
          </p>

          <p className="font-semibold text-stone-800">Krok 3. Analiza znaku <Mi>{"f'(b)"}</Mi></p>
          <p>Na przedziale <Mi>{"(4,24)"}</Mi>: <Mi>{"(b-4) > 0"}</Mi>.</p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center w-full border-collapse my-2">
              <thead>
                <tr className="bg-[#f2ecfb]">
                  <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"b^2-8b-184"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"f'(b)"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"f"}</Mi></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-emerald-50">
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4,\\,4{+}10\\sqrt{2})"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4{+}10\\sqrt{2},\\,24)"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-stone-800">Krok 4. Obliczamy maksimum</p>
          <p>Podstawiamy <Mi>{"b = 4+10\\sqrt{2}"}</Mi> do <Mi>{"f(b)"}</Mi>. Niech <Mi>{"u = 10\\sqrt{2}"}</Mi>:</p>
          <Mb>{"f(4+10\\sqrt{2}) = 40000 \\quad \\text{(obliczenia z rozwinięciem potęg)}"}</Mb>
          <Mb>{"P_{\\max} = \\frac{\\sqrt{40000}}{32} = \\frac{200}{32} = \\frac{25}{4}"}</Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">
              Odpowiedź: <Mi>{"P_{\\max} = \\dfrac{25}{4}"}</Mi>, osiągane dla <Mi>{"b = 4+10\\sqrt{2}"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Pole trójkąta <Mi>{"P"}</Mi> w zależności od długości <Mi>{"b"}</Mi> dolnej
        podstawy wyraża się wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32}"}</Mb>
      </div>
      <p className="font-semibold">
        dla <Mi>{"b \\in (4,24)"}</Mi>. Oblicz największe możliwe pole trójkąta <Mi>{"P"}</Mi>.
        Zapisz obliczenia.
      </p>
      <p className="text-stone-500 text-xs mt-2 italic">
        Wskazówka: Funkcja może posiadać ekstrema lokalne zarówno w punktach należących
        do rozważanego przedziału, jak i w punktach do niego nienależących.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE_OCT}</span>
    </div>
  </div>
);

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
          <Zad13 />
        </div>
      </main>
    </div>
  );
}
