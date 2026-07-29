"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

export default function StereometriaPage() {
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
          <span className="text-sm text-stone-400">Stereometria</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 14
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Stereometria
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            5 zadań
          </p>
        </div>

        <div className="space-y-12">

        {/* ── Zadanie 4 (CKE maj 2025, zad. 10) ─────────── */}
        <TaskCard
          number="4"
          points="0–5"
          source="Matura z matematyki, CKE, maj 2025, poziom rozszerzony"
          instruction={
            <div className="space-y-3">
              <p>
                Dany jest ostrosłup <Mi>{"ABCDS"}</Mi> o podstawie <Mi>{"ABCD"}</Mi> będącej kwadratem. Bok boczny{" "}
                <Mi>{"SA"}</Mi> jest wysokością tego ostrosłupa. Długość krawędzi podstawy tego ostrosłupa jest
                równa <Mi>{"3\\sqrt{34}"}</Mi>. Kąt <Mi>{"\\beta"}</Mi> jest kątem między ścianami bocznymi{" "}
                <Mi>{"CDS"}</Mi> i <Mi>{"BCS"}</Mi>, a <Mi>{"\\cos\\beta = -\\dfrac{9}{25}"}</Mi>.
              </p>
              <p className="font-semibold text-stone-800">
                Oblicz pole powierzchni bocznej tego ostrosłupa. Zapisz obliczenia.
              </p>
            </div>
          }
          answer={<p><Mi>{"P_b = 918"}</Mi></p>}
          hint={
            <div className="space-y-3">
              <p>
                Na krawędzi <Mi>{"CS"}</Mi> wybierz punkt <Mi>{"F"}</Mi> taki, że w każdej ścianie bocznej ze
                wspólną krawędzią <Mi>{"CS"}</Mi> odcinek z wierzchołka podstawy do <Mi>{"F"}</Mi> jest
                prostopadły do <Mi>{"CS"}</Mi> (np. <Mi>{"\\angle BFC = 90^\\circ"}</Mi> w ścianie{" "}
                <Mi>{"BCS"}</Mi>). Wtedy <Mi>{"\\beta = \\angle BFD"}</Mi> i możesz użyć twierdzenia cosinusów w
                równoramiennym trójkącie <Mi>{"BFD"}</Mi> z przekątną podstawy <Mi>{"BD"}</Mi>.
              </p>
              <p>
                Z Pitagorasa w trójkącie <Mi>{"BFC"}</Mi> (prosty przy <Mi>{"F"}</Mi>) wyznacz <Mi>{"|CF|"}</Mi>.
                Potem w trójkącie <Mi>{"BFS"}</Mi> (też prosty przy <Mi>{"F"}</Mi>):{" "}
                <Mi>{"|BS|^2 = |BF|^2 + |SF|^2"}</Mi>, a <Mi>{"|CS| = |CF| + |SF|"}</Mi>. Połącz to z{" "}
                <Mi>{"|BS|^2 = |AB|^2 + |SA|^2"}</Mi> i <Mi>{"|CS|^2 = 2|AB|^2 + |SA|^2"}</Mi> (wysokość{" "}
                <Mi>{"SA"}</Mi> prostopadła do podstawy).
              </p>
              <p>
                Pole boczne: dwa trójkąty przy <Mi>{"A"}</Mi> mają pola <Mi>{"\\dfrac{1}{2}|SA|\\cdot|AB|"}</Mi>, a
                ściany <Mi>{"BCS"}</Mi> i <Mi>{"CDS"}</Mi>: <Mi>{"\\dfrac{1}{2}|CS|\\cdot|BF|"}</Mi>.
              </p>
            </div>
          }
          solution={
            <div className="space-y-4">
              <p className="font-semibold text-stone-800">Krok 1. Punkt <Mi>{"F"}</Mi> i kąt między ścianami</p>
              <p>
                Niech <Mi>{"a = |AB| = 3\\sqrt{34}"}</Mi>. Na krawędzi <Mi>{"CS"}</Mi> oznaczmy punkt <Mi>{"F"}</Mi>{" "}
                taki, że w ścianie <Mi>{"BCS"}</Mi> mamy <Mi>{"BF \\perp CS"}</Mi> (czyli <Mi>{"\\angle BFC = 90^\\circ"}</Mi>),
                a w ścianie <Mi>{"DCS"}</Mi> analogicznie <Mi>{"DF \\perp CS"}</Mi>. Z twierdzenia o trzech
                prostopadłych (bo <Mi>{"SA"}</Mi> jest wysokością, więc <Mi>{"SA \\perp"}</Mi> płaszczyźnie podstawy):
                takie prostopadłości w ścianach bocznych są możliwe, a kąt między ścianami <Mi>{"BCS"}</Mi> i{" "}
                <Mi>{"CDS"}</Mi> ma miarę <Mi>{"\\angle BFD = \\beta"}</Mi>.
              </p>
              <p>
                Przekątna kwadratu: <Mi>{"|BD| = a\\sqrt{2} = 3\\sqrt{68}"}</Mi>. Trójkąt <Mi>{"BFD"}</Mi> jest
                równoramiennym (<Mi>{"BF = DF"}</Mi>). Z twierdzenia cosinusów przy wierzchołku <Mi>{"F"}</Mi>:
              </p>
              <Mb>
                {"|BD|^2 = 2|BF|^2 - 2|BF|^2\\cos\\beta = 2|BF|^2\\left(1 + \\dfrac{9}{25}\\right) = \\dfrac{68}{25}|BF|^2"}
              </Mb>
              <Mb>{"|BD|^2 = 9 \\cdot 68 = 612 \\quad \\Longrightarrow \\quad |BF|^2 = 225, \\quad |BF| = 15"}</Mb>

              <p className="font-semibold text-stone-800">Krok 2. Odcinek <Mi>{"CF"}</Mi> i dalsza część krawędzi <Mi>{"CS"}</Mi></p>
              <p>
                W prostokątnym trójkącie <Mi>{"BFC"}</Mi> (kąt prosty przy <Mi>{"F"}</Mi>):
              </p>
              <Mb>{"|BC|^2 = |BF|^2 + |CF|^2 \\quad \\Longrightarrow \\quad |CF|^2 = 9 \\cdot 34 - 225 = 81, \\quad |CF| = 9"}</Mb>
              <p>
                Punkt <Mi>{"F"}</Mi> leży między <Mi>{"C"}</Mi> a <Mi>{"S"}</Mi> na krawędzi <Mi>{"CS"}</Mi>, więc{" "}
                <Mi>{"|CS| = |CF| + |SF|"}</Mi>. W prostokątnym trójkącie <Mi>{"BFS"}</Mi> (kąt prosty przy{" "}
                <Mi>{"F"}</Mi>, bo <Mi>{"BF \\perp CS"}</Mi>):
              </p>
              <Mb>{"|BS|^2 = |BF|^2 + |SF|^2 = 225 + |SF|^2"}</Mb>
              <p>
                Wysokość <Mi>{"SA"}</Mi> jest prostopadła do podstawy, więc <Mi>{"SA \\perp AB"}</Mi> i trójkąt{" "}
                <Mi>{"SAB"}</Mi> jest prostokątny przy <Mi>{"A"}</Mi>:
              </p>
              <Mb>{"|BS|^2 = |SA|^2 + a^2"}</Mb>
              <p>
                Dla <Mi>{"C"}</Mi> w kwadracie: <Mi>{"|CS|^2 = |SC|^2 = 2a^2 + |SA|^2"}</Mi> (z twierdzenia
                Pitagorasa w przestrzeni, bo <Mi>{"SA \\perp"}</Mi> podstawę i <Mi>{"AC"}</Mi> to przekątna kwadratu
                o boku <Mi>{"a"}</Mi> w płaszczyźnie podstawy).
              </p>
              <p>
                Podstawiamy <Mi>{"|BS|^2 = 225 + |SF|^2"}</Mi> oraz <Mi>{"|CS| = 9 + |SF|"}</Mi>:
              </p>
              <Mb>{"2a^2 + |SA|^2 = (9 + |SF|)^2, \\qquad a^2 + |SA|^2 = 225 + |SF|^2"}</Mb>
              <p>Odejmujemy równania stronami:</p>
              <Mb>{"a^2 = (9 + |SF|)^2 - |SF|^2 - 225 = 81 + 18|SF| - 225 = 18|SF| - 144"}</Mb>
              <Mb>{"306 = 18|SF| - 144 \\quad \\Longrightarrow \\quad |SF| = 25, \\quad |CS| = 34"}</Mb>
              <Mb>{"|SA|^2 = 225 + 625 - 306 = 544 \\quad \\Longrightarrow \\quad |SA| = 4\\sqrt{34}"}</Mb>
              <p className="text-stone-600 text-sm">
                Sprawdzenie: <Mi>{"|CS|^2 = 2 \\cdot 306 + 544 = 1156 = 34^2"}</Mi>.
              </p>

              <p className="font-semibold text-stone-800">Krok 3. Pole powierzchni bocznej</p>
              <p>
                Ostrosłup ma cztery ściany boczne. Przy wierzchołku <Mi>{"A"}</Mi> (wysokość z <Mi>{"S"}</Mi>):
              </p>
              <Mb>
                {"P_{SAB} = P_{SAD} = \\dfrac{1}{2} \\cdot |SA| \\cdot a = \\dfrac{1}{2} \\cdot 4\\sqrt{34} \\cdot 3\\sqrt{34} = 204"}
              </Mb>
              <p>
                Ściany <Mi>{"BCS"}</Mi> i <Mi>{"CDS"}</Mi>: w każdej trójkąt ma podstawę <Mi>{"CS"}</Mi> i wysokość{" "}
                <Mi>{"BF"}</Mi> lub <Mi>{"DF"}</Mi> (prostopadłą do <Mi>{"CS"}</Mi>):
              </p>
              <Mb>
                {"P_{BCS} = P_{CDS} = \\dfrac{1}{2} \\cdot |CS| \\cdot |BF| = \\dfrac{1}{2} \\cdot 34 \\cdot 15 = 255"}
              </Mb>
              <FormulaBox>
                <Mb>{"P_b = 2 \\cdot 204 + 2 \\cdot 255 = 408 + 510 = 918"}</Mb>
              </FormulaBox>

              <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
                <p className="font-semibold text-stone-800">
                  Odpowiedź: <Mi>{"P_b = 918"}</Mi>
                </p>
              </div>
            </div>
          }
        />

        {/* ── Zadanie 1 (CKE maj 2026) ─────────────────── */}
        <TaskCard
          number="1"
          points="0–4"
          source="Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023"
          instruction={
            <span>
              W ostrosłupie prawidłowym trójkątnym <Mi>{"ABCS"}</Mi> podstawa <Mi>{"ABC"}</Mi> jest
              trójkątem równobocznym. Długość okręgu opisanego na podstawie <Mi>{"ABC"}</Mi> jest
              równa <Mi>{"6\\sqrt{2}\\pi"}</Mi>, a cosinus kąta między krawędziami bocznymi{" "}
              <Mi>{"SB"}</Mi> i <Mi>{"SC"}</Mi> jest równy{" "}
              <Mi>{"\\dfrac{5}{9}"}</Mi>. Oblicz długość krawędzi podstawy oraz cosinus kąta między
              ścianami bocznymi <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi>. Zapisz obliczenia.
            </span>
          }
          answer={
            <div className="space-y-2">
              <p>
                Bok podstawy: <Mi>{"a = 3\\sqrt{6}"}</Mi>.
              </p>
              <p>
                Cosinus kąta między ścianami{" "}

                <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi>:{" "}
                <Mi>{"\\displaystyle \\dfrac{5}{14}"}</Mi>.

              </p>
            </div>
          }
          hint={
            <div className="space-y-3">
              <p>
                Z długości okręgu opisanego na podstawie wyprowadź promień <Mi>{"R"}</Mi>, a z zależności
                promienia opisanego na trójkącie równobocznym znajdź bok <Mi>{"a"}</Mi>.
              </p>
              <p>
                W ostrosłupie prawidłowym krawędzie boczne mają tę samą długość <Mi>{"l"}</Mi>. W
                trójkącie <Mi>{"BSC"}</Mi> użyj twierdzenia cosinusów z danym{" "}
                <Mi>{"\\cos \\angle BSC"}</Mi>.
              </p>
              <p>
                Kąt między ścianami <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi> licz przy wspólnej krawędzi{" "}
                <Mi>{"SC"}</Mi>: w każdej ścianie poprowadź wysokość z odpowiednio{" "}
                <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi> na <Mi>{"SC"}</Mi>. Ze symetrii ostrosłupa względem
                płaszczyzny <Mi>{"SOC"}</Mi> obie te wysokości spotykają <Mi>{"SC"}</Mi> w tym samym
                punkcie <Mi>{"P"}</Mi>, więc kąt między odcinkami <Mi>{"PA"}</Mi> i <Mi>{"PB"}</Mi> jest
                kątem płaskim szukanego kąta dwuściennego. Masz trójkąt <Mi>{"APB"}</Mi>, znajdź{" "}
                <Mi>{"|PA|"}</Mi>, <Mi>{"|PB|"}</Mi>, <Mi>{"|AB|"}</Mi>, potem z twierdzenia cosinusów{" "}
                <Mi>{"\\cos \\angle APB"}</Mi>.
              </p>
            </div>
          }
          solution={
            <div className="space-y-4">
              <p className="font-semibold text-stone-800">Rysunek pomocniczy</p>
              <figure className="my-2 flex flex-col items-center">
                <svg
                  viewBox="0 0 360 260"
                  className="w-full max-w-lg h-auto text-[#52297a]"
                  role="img"
                  aria-label="Ostrosłup prawidłowy trójkątny ABCS ze środkiem podstawy O"
                >
                  <title>Ostrosłup prawidłowy trójkątny ABCS</title>
                  <path
                    d="M 72 198 L 268 198 L 170 132 Z"
                    fill="#f5f0ff"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="165"
                    x2="170"
                    y2="48"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="5 4"
                    strokeOpacity="0.7"
                  />
                  <circle cx="170" cy="165" r="3.5" fill="#8b5cf6" />
                  <text
                    x="154"
                    y="182"
                    fontSize="13"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="#6d3a8e"
                  >
                    O
                  </text>
                  <line x1="72" y1="198" x2="170" y2="48" stroke="currentColor" strokeWidth="2.2" />
                  <line x1="268" y1="198" x2="170" y2="48" stroke="currentColor" strokeWidth="2.2" />
                  <line
                    x1="170"
                    y1="132"
                    x2="170"
                    y2="48"
                    stroke="currentColor"
                    strokeWidth="1.55"
                    strokeOpacity="0.45"
                  />
                  <circle cx="170" cy="48" r="4" fill="currentColor" />
                  <circle cx="72" cy="198" r="3" fill="currentColor" />
                  <circle cx="268" cy="198" r="3" fill="currentColor" />
                  <circle cx="170" cy="132" r="3" fill="currentColor" />
                  <text
                    x="176"
                    y="40"
                    fontSize="15"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="currentColor"
                  >
                    S
                  </text>
                  <text
                    x="54"
                    y="214"
                    fontSize="15"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="currentColor"
                  >
                    B
                  </text>
                  <text
                    x="276"
                    y="214"
                    fontSize="15"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="currentColor"
                  >
                    C
                  </text>
                  <text
                    x="168"
                    y="124"
                    fontSize="15"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="currentColor"
                  >
                    A
                  </text>
                  <path d="M 155 72 A 22 22 0 0 0 185 72" fill="none" stroke="#059669" strokeWidth="2" />
                  <text x="148" y="90" fontSize="12" fill="#047857" fontFamily="Georgia, serif">
                  ∠ BSC
                  </text>
                  <path
                    d="M 170 132 L 268 198"
                    stroke="#94a3b8"
                    strokeWidth="1.2"
                    strokeDasharray="5 4"
                    opacity="0.85"
                  />
                </svg>
                <figcaption className="text-xs text-stone-500 mt-3 text-center max-w-lg leading-relaxed">
                  Punkt <Mi>{"O"}</Mi> to środek trójkąta <Mi>{"ABC"}</Mi>. Oś <Mi>{"SO"}</Mi> jest prostą
                  wysokości ostrosłupa. Zielonym łukiem zaznaczono kąt między krawędziami{" "}
                  <Mi>{"SB"}</Mi> i <Mi>{"SC"}</Mi>. Ściany <Mi>{"SAC"}</Mi> oraz <Mi>{"SBC"}</Mi>{" "}
                  spotykają się wzdłuż <Mi>{"SC"}</Mi>, więc przy liczeniu kąta dwuściennego patrzymy na
                  kąt między płaszczyznami przy wspólnej krawędzi <Mi>{"SC"}</Mi>.
                </figcaption>
              </figure>

              <p className="font-semibold text-stone-800">Krok 1. Bok podstawy z obwodu okręgu opisanego</p>
              <Mb>{"2\\pi R = 6\\sqrt{2}\\pi \\quad \\Rightarrow \\quad R = 3\\sqrt{2}"}</Mb>
              <FormulaBox>
                <Mb>{"R = \\dfrac{a}{\\sqrt{3}} \\quad \\Rightarrow \\quad a = R\\sqrt{3} = 3\\sqrt{6}"}</Mb>
              </FormulaBox>

              <p className="font-semibold text-stone-800">Krok 2. Długość krawędzi bocznej</p>
              <p>W ostrosłupie prawidłowym oznaczmy długość krawędzi bocznej przez <Mi>{"l"}</Mi>. Twierdzenie cosinusów w trójkącie <Mi>{"BSC"}</Mi>:</p>
              <Mb>
                {"|BC|^2 = l^2 + l^2 - 2 l^2 \\cos(\\angle BSC) = 2l^2 \\left( 1-\\frac{5}{9}\\right)=\\frac{8}{9} l^2"}
              </Mb>
              <Mb>{"54 = \\frac{8}{9}\\, l^2 \\quad \\Rightarrow \\quad l^2 = \\frac{243}{4}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 3. Wysokość ostrosłupa</p>
              <Mb>{"l^2 = R^2 + h^2 \\quad \\Rightarrow \\quad h^2 = l^2-R^2 = \\frac{243}{4}-18 = \\frac{171}{4}"}</Mb>

              <p className="font-semibold text-stone-800">
                Krok 4. Kąt dwuścienny przy <Mi>{"SC"}</Mi>: wysokości w ścianach <Mi>{"SAC"}</Mi> i{" "}
                <Mi>{"SBC"}</Mi>
              </p>
              <p>
                Ściany <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi> przecinają się wzdłuż <Mi>{"SC"}</Mi>. W trójkącie{" "}
                <Mi>{"SAC"}</Mi> opuszczamy z <Mi>{"A"}</Mi> wysokość na <Mi>{"SC"}</Mi> i oznaczamy jej spodek
                przez <Mi>{"P"}</Mi>. Analogicznie w <Mi>{"\\triangle SBC"}</Mi> opuszczamy z{" "}
                <Mi>{"B"}</Mi> wysokość na <Mi>{"SC"}</Mi>.
              </p>
              <p>
                Płaszczyzna symetrii ostrosłupa zawierająca <Mi>{"S"}</Mi>, <Mi>{"C"}</Mi> oraz środek boku{" "}
                <Mi>{"AB"}</Mi> przechodzi przez <Mi>{"O"}</Mi>, zamienia <Mi>{"A"}</Mi> z{" "}
                <Mi>{"B"}</Mi> na siebie i zawiera prostą <Mi>{"SC"}</Mi>. Obrazem opuszczenia z{" "}
                <Mi>{"A"}</Mi> jest opuszczenie z <Mi>{"B"}</Mi>, spodek na niezmienionej prostej{" "}
                <Mi>{"SC"}</Mi> jest więc ten sam punkt <Mi>{"P"}</Mi>. Odcinki <Mi>{"PA"}</Mi> i{" "}
                <Mi>{"PB"}</Mi> są więc oba prostopadłe do <Mi>{"SC"}</Mi> w punkcie <Mi>{"P"}</Mi>, a kąt{" "}
                <Mi>{"\\angle APB"}</Mi> jest kątem płaskim kąta dwuściennego między ścianami{" "}
                <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi>.
              </p>

              <p className="font-semibold text-stone-800">
                Krok 5. Długości <Mi>{"PA"}</Mi> i <Mi>{"PB"}</Mi>
              </p>
              <p>
                Trójkąty <Mi>{"SAC"}</Mi> i <Mi>{"SBC"}</Mi> mają odpowiednio równe trzy boki:{" "}
                <Mi>{"SA = SB = l"}</Mi>, <Mi>{"SC"}</Mi> wspólny, <Mi>{"AC = BC = a"}</Mi>, więc są
                przystające (kryterium <abbr title="trzy boki">SSS</abbr>). Odpowiednie kąty przy{" "}
                <Mi>{"S"}</Mi> między ramionami <Mi>{"SA"}</Mi>, <Mi>{"SC"}</Mi> oraz <Mi>{"SB"}</Mi>,{" "}
                <Mi>{"SC"}</Mi> są równe, czyli <Mi>{"\\angle ASC = \\angle BSC"}</Mi>. Z treści{" "}
                <Mi>{"\\cos(\\angle BSC) = \\dfrac{5}{9}"}</Mi>, ten sam kosinus ma kąt{" "}
                <Mi>{"\\angle ASC"}</Mi>.
              </p>
              <Mb>
                {"\\sin(\\angle ASC) = \\sqrt{1-\\left(\\frac{5}{9}\\right)^2} = \\frac{\\sqrt{56}}{9} = \\frac{2\\sqrt{14}}{9}"}
              </Mb>
              <p>
                Pole trójkąta <Mi>{"SAC"}</Mi> na dwa sposoby (podstawa <Mi>{"SC = l"}</Mi>, wysokość{" "}
                <Mi>{"PA"}</Mi>, oraz dwa boki <Mi>{"l"}</Mi> i kąt między nimi):
              </p>
              <Mb>
                {"\\frac{1}{2}\\,l\\cdot |PA| = \\frac{1}{2}\\,l^2 \\sin(\\angle ASC) \\quad \\Rightarrow \\quad |PA| = l\\sin(\\angle ASC)"}
              </Mb>
              <p>Z przystawania <Mi>{"\\triangle SAC \\cong \\triangle SBC"}</Mi> wynika <Mi>{"|PB| = |PA|"}</Mi>.</p>
              <Mb>
                {"|PA|^2 = l^2 \\cdot \\frac{56}{81} = \\frac{243}{4}\\cdot\\frac{56}{81} = 42 \\quad \\Rightarrow \\quad |PA| = |PB| = \\sqrt{42}"}
              </Mb>

              <p className="font-semibold text-stone-800">Krok 6. Twierdzenie cosinusów w <Mi>{"\\triangle APB"}</Mi></p>
              <p>
                Bok <Mi>{"AB = a = 3\\sqrt{6}"}</Mi>, więc <Mi>{"|AB|^2 = 54"}</Mi>. Dla kąta{" "}
                <Mi>{"\\varphi = \\angle APB"}</Mi>:
              </p>
              <Mb>
                {"|AB|^2 = |PA|^2 + |PB|^2 - 2|PA|\\cdot|PB|\\cos\\varphi"}
              </Mb>
              <Mb>
                {"54 = 42 + 42 - 2\\cdot 42 \\cdot \\cos\\varphi \\quad \\Rightarrow \\quad 84\\cos\\varphi = 30"}
              </Mb>
              <FormulaBox>
                <Mb>{"\\cos\\varphi = \\dfrac{30}{84} = \\dfrac{5}{14}"}</Mb>
              </FormulaBox>

              <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
                <p className="font-semibold text-stone-800">
                  Odpowiedź: <Mi>{"a = 3\\sqrt{6}"}</Mi>,{" "}
                  <Mi>{"\\displaystyle \\cos\\varphi = \\dfrac{5}{14}"}</Mi>.
                </p>
              </div>
            </div>
          }
        />

        {/* ── Zadanie 2 (SMWP październik 2025) ─────────── */}
        <TaskCard
          number="2"
          points="0–5"
          source="Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony"
          instruction={
            <span>
              W ostrosłupie prawidłowym czworokątnym <Mi>{"ABCDS"}</Mi> o podstawie{" "}
              <Mi>{"ABCD"}</Mi> kąt między sąsiednimi ścianami bocznymi ostrosłupa ma
              miarę <Mi>{"120°"}</Mi>. Oblicz stosunek pola powierzchni bocznej tego
              ostrosłupa do pola podstawy <Mi>{"ABCD"}</Mi>. Zapisz obliczenia.
            </span>
          }
          answer={<p><Mi>{"\\sqrt{2}"}</Mi></p>}
          hint={
            <div className="space-y-3">
              <p>
                Kąt dwuścienny między ścianami <Mi>{"SAB"}</Mi> i <Mi>{"SAD"}</Mi> ma krawędź
                wspólną <Mi>{"SA"}</Mi>. Narysuj w obu ścianach prostopadłe do <Mi>{"SA"}</Mi>{" "}
                wychodzące z tego samego punktu <Mi>{"P"}</Mi> na <Mi>{"SA"}</Mi> (od
                wierzchołków <Mi>{"B"}</Mi> i <Mi>{"D"}</Mi>): odcinki <Mi>{"PB"}</Mi> i{" "}
                <Mi>{"PD"}</Mi>. Kąt <Mi>{"\\angle BPD"}</Mi> to kąt płaski tego kąta
                dwuściennego, więc <Mi>{"120°"}</Mi>.
              </p>
              <p>
                W trójkącie <Mi>{"BPD"}</Mi> znasz <Mi>{"BD"}</Mi> (przekątna kwadratu) oraz
                kąt przy <Mi>{"P"}</Mi>. Z symetrii ostrosłupa <Mi>{"PB = PD"}</Mi>. Oblicz{" "}
                <Mi>{"PB"}</Mi>, potem z pola <Mi>{"\\triangle SAB"}</Mi> wyprowadź związek
                między <Mi>{"h"}</Mi> a <Mi>{"a"}</Mi>.
              </p>
            </div>
          }
          solution={
            <div className="space-y-4">
              <p className="font-semibold text-stone-800">Rysunek pomocniczy</p>
              <figure className="my-2 flex flex-col items-center">
                <svg
                  viewBox="0 0 280 200"
                  className="w-full max-w-md h-auto text-[#52297a]"
                  role="img"
                  aria-label="Ostrosłup prawidłowy czworokątny: kąt płaski kąta dwuściennego przy krawędzi SA"
                >
                  <title>Ostrosłup: kąt dwuścienny przy SA</title>
                  {/* podstawa (schemat) */}
                  <path
                    d="M 60 170 L 140 185 L 220 170 L 160 155 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* krawędzie boczne do S */}
                  <line x1="60" y1="170" x2="140" y2="35" stroke="currentColor" strokeWidth="2" />
                  <line x1="140" y1="185" x2="140" y2="35" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="220" y1="170" x2="140" y2="35" stroke="currentColor" strokeWidth="2" />
                  <line x1="160" y1="155" x2="140" y2="35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
                  {/* S, A, B, D */}
                  <circle cx="140" cy="35" r="4" fill="currentColor" />
                  <circle cx="140" cy="185" r="3" fill="currentColor" />
                  <circle cx="60" cy="170" r="3" fill="currentColor" />
                  <circle cx="220" cy="170" r="3" fill="currentColor" />
                  <text x="148" y="30" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">S</text>
                  <text x="145" y="198" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">A</text>
                  <text x="42" y="178" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">B</text>
                  <text x="228" y="178" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">D</text>
                  {/* punkt P na SA, PB i PD */}
                  <circle cx="140" cy="118" r="3" fill="#8b5cf6" />
                  <text x="148" y="122" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fill="#6d3a8e">P</text>
                  <line x1="60" y1="170" x2="140" y2="118" stroke="#8b5cf6" strokeWidth="2" />
                  <line x1="220" y1="170" x2="140" y2="118" stroke="#8b5cf6" strokeWidth="2" />
                </svg>
                <figcaption className="text-xs text-stone-500 mt-2 text-center max-w-md">
                  Odcinki <Mi>{"PB"}</Mi>, <Mi>{"PD"}</Mi>{" "} są 
                  prostopadłe do <Mi>{"SA"}</Mi> w punkcie <Mi>{"P"}</Mi>, więc{" "}
                  <Mi>{"\\angle BPD = 120°"}</Mi> jest kątem płaskim kąta dwuściennego.
                </figcaption>
              </figure>

              <p className="font-semibold text-stone-800">Krok 1. Oznaczenia</p>
              <p>
                Niech bok podstawy ma długość <Mi>{"a"}</Mi>, a wysokość ostrosłupa (od{" "}
                <Mi>{"S"}</Mi> do środka kwadratu) <Mi>{"h"}</Mi>. Przekątna kwadratu{" "}
                <Mi>{"BD"}</Mi> ma długość <Mi>{"a\\sqrt{2}"}</Mi>.
              </p>

              <p className="font-semibold text-stone-800">
                Krok 2. Kąt płaski kąta dwuściennego przy <Mi>{"SA"}</Mi>
              </p>
              <p>
                Ściany <Mi>{"SAB"}</Mi> i <Mi>{"SAD"}</Mi> przecinają się wzdłuż <Mi>{"SA"}</Mi>.
                Z symetrii ostrosłupa odległości punktów <Mi>{"B"}</Mi> i <Mi>{"D"}</Mi> od
                prostej <Mi>{"SA"}</Mi> są równe, więc prostopadłe do <Mi>{"SA"}</Mi>{" "}
                opuszczone z <Mi>{"B"}</Mi> i <Mi>{"D"}</Mi> spotykają się w jednym punkcie{" "}
                <Mi>{"P"}</Mi> na <Mi>{"SA"}</Mi>. Kąt <Mi>{"\\angle BPD"}</Mi> jest kątem
                płaskim kąta dwuściennego, z treści <Mi>{"120°"}</Mi>.
              </p>
              <p>
                Trójkąt <Mi>{"BPD"}</Mi> jest równoramienny (<Mi>{"PB = PD"}</Mi>), przy
                wierzchołku <Mi>{"P"}</Mi> kąt <Mi>{"120°"}</Mi>, przy podstawie{" "}
                <Mi>{"BD = a\\sqrt{2}"}</Mi>. Z twierdzenia cosinusów:
              </p>
              <Mb>
                {"(a\\sqrt{2})^2 = PB^2 + PD^2 - 2\\cdot PB\\cdot PD\\cos 120° = 2PB^2 + PB^2 = 3PB^2"}
              </Mb>
              <Mb>{"2a^2 = 3PB^2 \\quad \\Rightarrow \\quad PB^2 = \\frac{2a^2}{3}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 3. Związek z wysokością <Mi>{"h"}</Mi></p>
              <p>
                Trójkąty <Mi>{"SOA"}</Mi> i <Mi>{"SOB"}</Mi> (środek podstawy{" "}
                <Mi>{"O"}</Mi>) są prostokątne, <Mi>{"OA = OB"}</Mi> (połowa przekątnej kwadratu), więc
              </p>
              <Mb>{"OA^2 = \\frac{a^2}{2}, \\qquad SA^2 = h^2 + \\frac{a^2}{2}"}</Mb>
              <p>
                W prawidłowym ostrosłupie czworokątnym wszystkie krawędzie boczne mają tę samą
                długość (symetria): <Mi>{"SA = SB = \\dots"}</Mi> Trójkąt <Mi>{"SAB"}</Mi> jest więc
                równoramienny przy podstawie <Mi>{"AB"}</Mi>.
              </p>
              <p>
                Pole <Mi>{"\\triangle SAB"}</Mi>: z jednej strony{" "}
                <Mi>{"\\displaystyle \\frac{1}{2}\\cdot SA\\cdot PB"}</Mi> (wysokość{" "}
                <Mi>{"PB"}</Mi> na bok <Mi>{"SA"}</Mi>), z drugiej{" "}
                <Mi>{"\\displaystyle \\frac{1}{2}\\cdot a\\cdot m"}</Mi>, gdzie{" "}
                <Mi>{"m"}</Mi> to apotema ściany bocznej (odległość <Mi>{"S"}</Mi> od środka
                boku <Mi>{"AB"}</Mi>):
              </p>
              <Mb>{"m^2 = h^2 + \\left(\\frac{a}{2}\\right)^2"}</Mb>
              <Mb>{"\\frac{1}{2}\\cdot SA\\cdot PB = \\frac{1}{2}\\cdot a\\cdot m \\quad \\Rightarrow \\quad m = \\frac{SA\\cdot PB}{a}"}</Mb>
              <p>Podnosimy do kwadratu i podstawiamy <Mi>{"SA^2"}</Mi> oraz <Mi>{"PB^2"}</Mi>:</p>
              <Mb>
                {"m^2 = \\frac{SA^2\\cdot PB^2}{a^2} = \\frac{1}{a^2}\\left(h^2+\\frac{a^2}{2}\\right)\\cdot\\frac{2a^2}{3} = \\frac{2}{3}\\left(h^2+\\frac{a^2}{2}\\right)"}
              </Mb>
              <p>
                Porównując z <Mi>{"m^2 = h^2 + \\dfrac{a^2}{4}"}</Mi>:
              </p>
              <Mb>{"h^2 + \\frac{a^2}{4} = \\frac{2h^2}{3} + \\frac{a^2}{3} \\quad \\Rightarrow \\quad \\frac{h^2}{3} = \\frac{a^2}{12} \\quad \\Rightarrow \\quad h = \\frac{a}{2}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 4. Pola i stosunek</p>
              <p>Apotema (wysokość trójkąta bocznego przy podstawie <Mi>{"a"}</Mi>):</p>
              <Mb>{"m = \\sqrt{h^2 + \\frac{a^2}{4}} = \\sqrt{\\frac{a^2}{4}+\\frac{a^2}{4}} = \\frac{a}{\\sqrt{2}} = \\frac{a\\sqrt{2}}{2}"}</Mb>
              <Mb>{"P_{\\text{boczna}} = 4\\cdot\\frac{1}{2}\\cdot a\\cdot m = a^2\\sqrt{2}, \\qquad P_{\\text{podstawa}} = a^2"}</Mb>
              <FormulaBox>
                <Mb>{"\\frac{P_{\\text{boczna}}}{P_{\\text{podstawa}}} = \\sqrt{2} \\qquad \\blacksquare"}</Mb>
              </FormulaBox>
            </div>
          }
        />

        {/* ── Zadanie 3 (CKE czerwiec 2025, zad. 10) ─────── */}
        <TaskCard
          number="3"
          points="0–5"
          source="Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy"
          instruction={
            <div className="space-y-3">
              <p>
                Dany jest ostrosłup prawidłowy trójkątny <Mi>{"ABCD"}</Mi> o podstawie <Mi>{"ABC"}</Mi>.
                Płaszczyzna zawierająca krawędź <Mi>{"AB"}</Mi> podstawy i prostopadła do krawędzi bocznej{" "}
                <Mi>{"CD"}</Mi> przecina tę krawędź w punkcie <Mi>{"E"}</Mi>, przy czym{" "}
                <Mi>{"\\dfrac{|CE|}{|DE|} = \\dfrac{3}{11}"}</Mi>.
              </p>
              <p className="font-semibold text-stone-800">
                Oblicz stosunek pola powierzchni całkowitej tego ostrosłupa do pola podstawy <Mi>{"ABC"}</Mi>.
                Zapisz obliczenia.
              </p>
            </div>
          }
          answer={<p><Mi>{"6"}</Mi></p>}
          hint={
            <div className="space-y-3">
              <p>
                Oznacz <Mi>{"|CE| = 3x"}</Mi>, <Mi>{"|DE| = 11x"}</Mi>, więc <Mi>{"|CD| = 14x"}</Mi>.
              </p>
              <p>
                W trójkącie <Mi>{"ABD"}</Mi> poprowadź wysokość z wierzchołka <Mi>{"D"}</Mi> na <Mi>{"AB"}</Mi> i
                oznacz ją <Mi>{"c"}</Mi>, a spodek na <Mi>{"AB"}</Mi> przez <Mi>{"F"}</Mi>. Z twierdzenia
                Pitagorasa:
              </p>
              <FormulaBox>
                <Mb>{"c^2 = 196x^2 - \\dfrac{1}{4}a^2"}</Mb>
              </FormulaBox>
              <p>
                W trójkącie <Mi>{"CDF"}</Mi> masz <Mi>{"|CF| = h = \\dfrac{a\\sqrt{3}}{2}"}</Mi>,{" "}
                <Mi>{"|FD| = c"}</Mi> i <Mi>{"|CD| = 14x"}</Mi>. Wysokość z <Mi>{"F"}</Mi> na <Mi>{"CD"}</Mi>{" "}
                trafia w punkt <Mi>{"E"}</Mi>. Z Pitagorasa w dwóch prostokątnych trójkątach:
              </p>
              <FormulaBox>
                <Mb>{"|CF|^2 - |CE|^2 = |FD|^2 - |DE|^2"}</Mb>
              </FormulaBox>
              <p>
                Otrzymasz zależność między <Mi>{"a"}</Mi> i <Mi>{"x"}</Mi>. Pola wyraź przez <Mi>{"x"}</Mi>{" "}
                (łatwiej liczyć stosunek) — powinno wyjść <Mi>{"6"}</Mi>.
              </p>
            </div>
          }
          solution={
            <div className="space-y-4">
              <p className="font-semibold text-stone-800">Krok 1. Oznaczenia</p>
              <p>
                Niech bok podstawy <Mi>{"ABC"}</Mi> ma długość <Mi>{"a"}</Mi>, a krawędzie boczne (w tym{" "}
                <Mi>{"CD"}</Mi>) mają długość <Mi>{"14x"}</Mi>, bo{" "}
                <Mi>{"|CE| = 3x"}</Mi>, <Mi>{"|DE| = 11x"}</Mi>.
              </p>
              <p>
                W równobocznym <Mi>{"ABC"}</Mi> wysokość opuszczona z <Mi>{"C"}</Mi> na bok <Mi>{"AB"}</Mi> ma
                spodek w środku <Mi>{"F"}</Mi> boku <Mi>{"AB"}</Mi>:
              </p>
              <Mb>{"|CF| = h = \\dfrac{a\\sqrt{3}}{2}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 2. Wysokość w ścianie <Mi>{"ABD"}</Mi></p>
              <p>
                W trójkącie <Mi>{"ABD"}</Mi> odcinek <Mi>{"DF"}</Mi> jest wysokością (trójkąt równoramienny,{" "}
                <Mi>{"DA = DB"}</Mi>). Oznaczmy <Mi>{"|DF| = c"}</Mi>. Z twierdzenia Pitagorasa:
              </p>
              <FormulaBox>
                <Mb>{"c^2 = |DA|^2 - \\left(\\dfrac{a}{2}\\right)^2 = 196x^2 - \\dfrac{a^2}{4}"}</Mb>
              </FormulaBox>
              <p>
                (W ostrosłupie prawidłowym <Mi>{"|DA| = |DB| = |DC| = 14x"}</Mi>.)
              </p>

              <p className="font-semibold text-stone-800">Krok 3. Równanie z prostopadłości płaszczyzny</p>
              <p>
                Płaszczyzna przez <Mi>{"AB"}</Mi> jest prostopadła do <Mi>{"CD"}</Mi>, więc <Mi>{"FE \\perp CD"}</Mi>{" "}
                (bo <Mi>{"F"}</Mi> i <Mi>{"E"}</Mi> leżą w tej płaszczyźnie). W trójkącie <Mi>{"CDF"}</Mi> odcinek{" "}
                <Mi>{"FE"}</Mi> jest wysokością spuszczoną z <Mi>{"F"}</Mi> na <Mi>{"CD"}</Mi>. Z Pitagorasa:
              </p>
              <Mb>{"|CF|^2 - |CE|^2 = |FE|^2 = |FD|^2 - |DE|^2"}</Mb>
              <Mb>
                {"\\left(\\dfrac{a\\sqrt{3}}{2}\\right)^2 - (3x)^2 = \\left(196x^2 - \\dfrac{a^2}{4}\\right) - (11x)^2"}
              </Mb>
              <Mb>{"\\dfrac{3a^2}{4} - 9x^2 = 75x^2 - \\dfrac{a^2}{4} \\quad \\Rightarrow \\quad a^2 = 84x^2"}</Mb>

              <p className="font-semibold text-stone-800">Krok 4. Pola względem <Mi>{"x"}</Mi></p>
              <Mb>{"P_{\\text{podstawy}} = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{84x^2\\sqrt{3}}{4} = 21\\sqrt{3}\\,x^2"}</Mb>
              <p>
                Apotema ściany bocznej (wysokość trójkąta o podstawie <Mi>{"a"}</Mi> i ramionach <Mi>{"14x"}</Mi>):
              </p>
              <Mb>
                {"m = \\sqrt{(14x)^2 - \\left(\\dfrac{a}{2}\\right)^2} = \\sqrt{196x^2 - 21x^2} = 5\\sqrt{7}\\,x"}
              </Mb>
              <Mb>
                {"P_{\\text{boczna}} = 3 \\cdot \\dfrac{1}{2} \\cdot a \\cdot m = \\dfrac{3}{2} \\cdot 2\\sqrt{21}\\,x \\cdot 5\\sqrt{7}\\,x = 105\\sqrt{3}\\,x^2"}
              </Mb>
              <Mb>{"P_c = P_{\\text{podstawy}} + P_{\\text{boczna}} = 126\\sqrt{3}\\,x^2"}</Mb>

              <p className="font-semibold text-stone-800">Krok 5. Stosunek</p>
              <FormulaBox>
                <Mb>{"\\dfrac{P_c}{P_{\\text{podstawy}}} = \\dfrac{126\\sqrt{3}\\,x^2}{21\\sqrt{3}\\,x^2} = 6"}</Mb>
              </FormulaBox>

              <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
                <p className="font-semibold text-stone-800">
                  Odpowiedź: <Mi>{"6"}</Mi>
                </p>
              </div>
            </div>
          }
        />

        {/* ── Zadanie 5 (CKE matura próbna, grudzień 2024, zad. 3) ── */}
        <TaskCard
          number="5"
          points="0–3"
          source="Matura próbna z matematyki, CKE, grudzień 2024, poziom rozszerzony"
          instruction={
            <div className="space-y-3">
              <p>
                Iloczyn długości średnicy podstawy walca i wysokości walca jest równy{" "}
                <Mi>{"12\\sqrt{3}"}</Mi>. Pole powierzchni całkowitej tego walca jest równe{" "}
                <Mi>{"12\\pi(\\sqrt{3} + 1)"}</Mi>.
              </p>
              <p className="font-semibold text-stone-800">
                Oblicz objętość tego walca. Zapisz obliczenia.
              </p>
            </div>
          }
          answer={
            <p>
              Objętość walca: <Mi>{"V = 18\\pi\\sqrt{2}"}</Mi>.
            </p>
          }
          hint={
            <div className="space-y-3">
              <p>
                Oznacz promień podstawy przez <Mi>{"r"}</Mi> i wysokość przez <Mi>{"h"}</Mi>. Średnica to{" "}
                <Mi>{"2r"}</Mi>, więc z pierwszego warunku: <Mi>{"2rh = 12\\sqrt{3}"}</Mi>, czyli{" "}
                <Mi>{"rh = 6\\sqrt{3}"}</Mi>.
              </p>
              <p>
                Pole powierzchni całkowitej walca:
              </p>
              <FormulaBox>
                <Mb>{"P_c = 2\\pi r^2 + 2\\pi rh = 2\\pi r(r + h)"}</Mb>
              </FormulaBox>
              <p>
                Podziel obie strony przez <Mi>{"2\\pi"}</Mi>, wyraź <Mi>{"h"}</Mi> przez <Mi>{"r"}</Mi> z{" "}
                <Mi>{"rh = 6\\sqrt{3}"}</Mi> i podstaw. Na końcu użyj{" "}
                <Mi>{"V = \\pi r^2 h"}</Mi>.
              </p>
            </div>
          }
          solution={
            <div className="space-y-4">
              <p className="font-semibold text-stone-800">Krok 1. Oznaczenia i pierwszy warunek</p>
              <p>
                Niech <Mi>{"r"}</Mi> oznacza promień podstawy walca, a <Mi>{"h"}</Mi> jego wysokość. Średnica
                podstawy ma długość <Mi>{"2r"}</Mi>. Z treści zadania:
              </p>
              <Mb>{"2r \\cdot h = 12\\sqrt{3} \\quad \\Longrightarrow \\quad rh = 6\\sqrt{3}"}</Mb>
              <p>Stąd możemy wyrazić wysokość przez promień:</p>
              <Mb>{"h = \\dfrac{6\\sqrt{3}}{r}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 2. Pole powierzchni całkowitej</p>
              <p>
                Walec ma dwa koła o promieniu <Mi>{"r"}</Mi> (pola <Mi>{"2\\pi r^2"}</Mi>) oraz powierzchnię
                boczną (pole prostokąta o bokach <Mi>{"2\\pi r"}</Mi> i <Mi>{"h"}</Mi>, czyli{" "}
                <Mi>{"2\\pi rh"}</Mi>):
              </p>
              <Mb>{"P_c = 2\\pi r^2 + 2\\pi rh = 2\\pi r(r + h)"}</Mb>
              <p>Z treści <Mi>{"P_c = 12\\pi(\\sqrt{3} + 1)"}</Mi>. Dzielimy obie strony przez <Mi>{"2\\pi"}</Mi>:</p>
              <Mb>{"r(r + h) = 6(\\sqrt{3} + 1)"}</Mb>

              <p className="font-semibold text-stone-800">Krok 3. Równanie na <Mi>{"r"}</Mi></p>
              <p>Podstawiamy <Mi>{"h = \\dfrac{6\\sqrt{3}}{r}"}</Mi>:</p>
              <Mb>
                {
                  "r\\left(r + \\dfrac{6\\sqrt{3}}{r}\\right) = r^2 + 6\\sqrt{3} = 6(\\sqrt{3} + 1)"
                }
              </Mb>
              <Mb>{"r^2 = 6 \\quad \\Longrightarrow \\quad r = \\sqrt{6} \\quad (r > 0)"}</Mb>
              <Mb>{"h = \\dfrac{6\\sqrt{3}}{\\sqrt{6}} = \\dfrac{6\\sqrt{3}}{\\sqrt{6}} = 6\\sqrt{\\dfrac{1}{2}} = 3\\sqrt{2}"}</Mb>

              <p className="font-semibold text-stone-800">Krok 4. Sprawdzenie (opcjonalnie)</p>
              <Mb>{"2r \\cdot h = 2\\sqrt{6} \\cdot 3\\sqrt{2} = 6\\sqrt{12} = 12\\sqrt{3}"}</Mb>
              <Mb>
                {
                  "P_c = 2\\pi \\cdot 6 + 2\\pi \\cdot \\sqrt{6} \\cdot 3\\sqrt{2} = 12\\pi + 12\\pi\\sqrt{3} = 12\\pi(\\sqrt{3} + 1)"
                }
              </Mb>

              <p className="font-semibold text-stone-800">Krok 5. Objętość</p>
              <Mb>{"V = \\pi r^2 h = \\pi \\cdot 6 \\cdot 3\\sqrt{2} = 18\\pi\\sqrt{2}"}</Mb>
            </div>
          }
        />
        </div>{/* end space-y-12 */}
      </main>
    </div>
  );
}


