"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox, SideWork } from "../_components";

// ─── Helpers ──────────────────────────────────────────────────

const cn = (...cls) => cls.filter(Boolean).join(" ");

const panelStyle = {
  green:  "bg-emerald-50  border-t border-emerald-100",
  amber:  "bg-amber-50    border-t border-amber-100",
  purple: "bg-[#f9f5ff]   border-t border-[#e0d0f8]",
};

const btnStyle = {
  green:  "border-emerald-300 text-emerald-700 bg-emerald-50  hover:bg-emerald-100 data-[active=true]:bg-emerald-200 data-[active=true]:border-emerald-500",
  amber:  "border-amber-300   text-amber-700   bg-amber-50    hover:bg-amber-100   data-[active=true]:bg-amber-200   data-[active=true]:border-amber-500",
  purple: "border-[#c4a8e8]   text-[#52297a]   bg-[#f2ecfb]   hover:bg-[#ead5fb]  data-[active=true]:bg-[#d4bef5]   data-[active=true]:border-[#8b5cf6]",
};

const ToggleBtn = ({ label, color, active, onClick }) => (
  <button
    data-active={active}
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
      btnStyle[color]
    )}
  >
    {label}
    <ChevronDown size={12} className={cn("transition-transform duration-200", active && "rotate-180")} />
  </button>
);

// Jeden podpunkt (1.1 / 1.2) z własnymi przyciskami
const SubTask = ({ label, points, children, answer, hint, solution }) => {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  return (
    <div className="border-t border-[#e8d8f8]">
      {/* Pasek podpunktu */}
      <div className="bg-[#ece4f9] px-5 py-2">
        <span className="font-semibold text-[#3b1a6e] text-sm">
          Zadanie {label}. ({points})
        </span>
      </div>

      {/* Treść podpunktu */}
      <div className="bg-white px-5 py-4 text-sm text-stone-800 leading-relaxed">
        {children}
      </div>

      {/* Przyciski */}
      <div className="bg-stone-50 border-t border-stone-100 px-5 py-3 flex flex-wrap gap-2">
        {answer   && <ToggleBtn label="Odpowiedź"  color="green"  active={open === "answer"}   onClick={() => toggle("answer")} />}
        {hint     && <ToggleBtn label="Wskazówka"  color="amber"  active={open === "hint"}     onClick={() => toggle("hint")} />}
        {solution && <ToggleBtn label="Rozwiązanie" color="purple" active={open === "solution"} onClick={() => toggle("solution")} />}
      </div>

      {/* Panele */}
      {open === "answer"   && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.green)}>{answer}</div>}
      {open === "hint"     && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.amber)}>{hint}</div>}
      {open === "solution" && <div className={cn("px-5 py-5 text-stone-700 text-sm leading-relaxed", panelStyle.purple)}>{solution}</div>}
    </div>
  );
};

// ─── Dane zadania ─────────────────────────────────────────────

const SOURCE = "Matura próbna SMWP, styczeń 2026, poziom rozszerzony";

// ─── Strona ───────────────────────────────────────────────────

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
            2 zadania
          </p>
        </div>

        <div className="space-y-12">

        {/* ── Zadanie 1 ─────────────────────────────────────── */}
        <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
          {/* Nagłówek */}
          <div className="bg-[#d4bef5] px-5 py-2.5">
            <span className="font-bold text-[#2d1458] text-sm">Zadanie 1. (0-6)</span>
          </div>

          {/* Wspólna treść */}
          <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
            Rozważamy wszystkie graniastosłupy prawidłowe czworokątne, których suma długości
            przekątnej podstawy oraz nachylonej do niej przekątnej graniastosłupa{" "}
            <Mi>{"d"}</Mi> jest równa <Mi>{"12"}</Mi>.
          </div>

          {/* ── Podpunkt 1.1 ── */}
          <SubTask
            label="1.1"
            points="0-2"
            hint={
              <div className="space-y-3">
                <p>
                  Oznacz bok podstawy jako <Mi>{"a"}</Mi>, wysokość jako <Mi>{"h"}</Mi>.
                  Przekątna podstawy to <Mi>{"a\\sqrt{2}"}</Mi>. Z warunku sumy:
                </p>
                <FormulaBox>
                  <Mb>{"a\\sqrt{2} + d = 12 \\quad \\Rightarrow \\quad a = \\frac{12-d}{\\sqrt{2}}"}</Mb>
                </FormulaBox>
                <p>
                  Wyznacz <Mi>{"h"}</Mi> z twierdzenia Pitagorasa dla przekątnej graniastosłupa:
                </p>
                <FormulaBox>
                  <Mb>{"d^2 = (a\\sqrt{2})^2 + h^2"}</Mb>
                </FormulaBox>
                <p>
                  Następnie oblicz <Mi>{"V = a^2 \\cdot h"}</Mi>.
                </p>
              </div>
            }
            solution={
              <div className="space-y-4">
                <p className="font-semibold text-stone-800">
                  Krok 1. Wyrażamy bok podstawy <Mi>{"a"}</Mi> przez <Mi>{"d"}</Mi>
                </p>
                <p>
                  Przekątna kwadratu o boku <Mi>{"a"}</Mi> ma długość <Mi>{"a\\sqrt{2}"}</Mi>.
                  Z warunku zadania:
                </p>
                <Mb>{"a\\sqrt{2} + d = 12 \\quad \\Rightarrow \\quad a = \\frac{12-d}{\\sqrt{2}}"}</Mb>
                <p>
                  Dziedzina: aby <Mi>{"a > 0"}</Mi>, potrzebujemy <Mi>{"d < 12"}</Mi>.
                </p>

                <p className="font-semibold text-stone-800">
                  Krok 2. Wyrażamy wysokość <Mi>{"h"}</Mi> przez <Mi>{"d"}</Mi>
                </p>
                <p>
                  Przekątna graniastosłupa z twierdzenia Pitagorasa:
                </p>
                <FormulaBox>
                  <Mb>{"d^2 = (a\\sqrt{2})^2 + h^2 = (12-d)^2 + h^2"}</Mb>
                </FormulaBox>
                <Mb>{"h^2 = d^2 - (12-d)^2 = \\bigl[d-(12-d)\\bigr]\\bigl[d+(12-d)\\bigr] = (2d-12)\\cdot 12 = 24(d-6) = 4(6d-36)"}</Mb>
                <Mb>{"h = 2\\sqrt{6d-36}"}</Mb>
                <p>
                  Dziedzina: aby <Mi>{"h > 0"}</Mi>, potrzebujemy <Mi>{"d > 6"}</Mi>.
                  Zatem <Mi>{"d \\in (6, 12)"}</Mi>.
                </p>

                <p className="font-semibold text-stone-800">Krok 3. Obliczamy objętość</p>
                <Mb>{"a^2 = \\frac{(12-d)^2}{2}"}</Mb>
                <Mb>{"V = a^2 \\cdot h = \\frac{(12-d)^2}{2} \\cdot 2\\sqrt{6d-36} = (12-d)^2\\sqrt{6d-36}"}</Mb>
                <FormulaBox>
                  <Mb>{"V(d) = (d-12)^2 \\cdot \\sqrt{6d-36} \\qquad \\blacksquare"}</Mb>
                </FormulaBox>
              </div>
            }
          >
            <p className="font-semibold">
              Wykaż, że objętość graniastosłupa w zależności od długości <Mi>{"d"}</Mi> jego
              przekątnej jest równa
            </p>
            <div className="text-center my-4">
              <Mb>{"V(d) = (d-12)^2 \\cdot \\sqrt{6d-36}"}</Mb>
            </div>
          </SubTask>

          {/* ── Podpunkt 1.2 ── */}
          <SubTask
            label="1.2"
            points="0-4"
            answer={
              <p>
                <Mi>{"d = \\dfrac{36}{5}"}</Mi>
              </p>
            }
            hint={
              <div className="space-y-3">
                <p>
                  Oblicz pochodną <Mi>{"V'(d)"}</Mi> korzystając z reguły iloczynu:
                </p>
                <FormulaBox>
                  <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
                </FormulaBox>
                <p>
                  Gdzie <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = \\sqrt{6d-36}"}</Mi>.
                  Po uproszczeniu wyłącz wspólny czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}}"}</Mi>.
                </p>
                <p>
                  Ustaw <Mi>{"V'(d) = 0"}</Mi>. Na przedziale <Mi>{"(6,12)"}</Mi>{" "}
                  czynnik <Mi>{"(d-12) \\neq 0"}</Mi>, więc zeruje się tylko drugi czynnik.
                </p>
              </div>
            }
            solution={
              <div className="space-y-4">
                <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-start">
                  <div className="flex-1 min-w-0 space-y-4">
                <p className="font-semibold text-stone-800">Krok 1. Obliczamy pochodną</p>
                <p>
                  Korzystamy z reguły iloczynu:
                </p>
                <FormulaBox>
                  <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
                </FormulaBox>
                <p>
                  Mamy <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = (6d-36)^{1/2}"}</Mi>. Dostajemy:
                </p>
                <Mb>{"V'(d) = \\frac{d-12}{\\sqrt{6d-36}} \\cdot (15d - 108)"}</Mb>
                  </div>
                  <SideWork
                    className="w-full xl:w-[min(100%,min(38rem,46vw))] xl:shrink-0"
                    title={null}
                  >
                    <Mb>{"f' = 2(d-12), \\qquad g' = \\frac{6}{2\\sqrt{6d-36}} = \\frac{3}{\\sqrt{6d-36}}"}</Mb>
                    <p className="mt-2">Iloczyn przed wyłączeniem:</p>
                    <Mb>{"V'(d) = 2(d-12)\\sqrt{6d-36} + (d-12)^2 \\cdot \\frac{3}{\\sqrt{6d-36}}"}</Mb>
                    <p className="mt-2">Wspólny mianownik <Mi>{"\\sqrt{6d-36}"}</Mi>:</p>
                    <Mb>
                      {"V'(d) = \\frac{2(d-12)(6d-36) + 3(d-12)^2}{\\sqrt{6d-36}}"}
                    </Mb>
                    <p className="mt-2">Wyłączamy <Mi>{"(d-12)"}</Mi> w liczniku:</p>
                    <Mb>
                      {"= \\frac{(d-12)\\bigl[2(6d-36) + 3(d-12)\\bigr]}{\\sqrt{6d-36}} = \\frac{(d-12)(15d-108)}{\\sqrt{6d-36}}"}
                    </Mb>
                  </SideWork>
                </div>

                <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy miejsce zerowe</p>
                <p>
                  Na przedziale <Mi>{"(6,12)"}</Mi>: <Mi>{"d-12 < 0"}</Mi> i{" "}
                  <Mi>{"\\sqrt{6d-36} > 0"}</Mi>, więc czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}} \\neq 0"}</Mi>. Zeruje się tylko:
                </p>
                <Mb>{"15d - 108 = 0 \\quad \\Rightarrow \\quad d = \\frac{108}{15} = \\frac{36}{5}"}</Mb>

                <p className="font-semibold text-stone-800">Krok 3. Sprawdzamy, że to maksimum</p>
                <p>
                  Czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}} < 0"}</Mi> na całym przedziale.
                </p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-center w-full border-collapse my-2">
                    <thead>
                      <tr className="bg-[#f2ecfb]">
                        <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                        <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"15d-108"}</Mi></th>
                        <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V'(d)"}</Mi></th>
                        <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V"}</Mi></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-emerald-50">
                        <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(6,\\,\\tfrac{36}{5}\\right)"}</Mi></td>
                        <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                        <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                        <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                      </tr>
                      <tr>
                        <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(\\tfrac{36}{5},\\,12\\right)"}</Mi></td>
                        <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                        <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                        <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Pochodna zmienia znak z <Mi>{"+"}</Mi> na <Mi>{"-"}</Mi>, więc{" "}
                  <Mi>{"d = \\dfrac{36}{5}"}</Mi> daje maksimum objętości.
                </p>
                <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
                  <p className="font-semibold text-stone-800">
                    Odpowiedź: <Mi>{"d = \\dfrac{36}{5}"}</Mi>
                  </p>
                </div>
              </div>
            }
          >
            <p>
              Objętość graniastosłupa w zależności od długości <Mi>{"d"}</Mi> jego przekątnej
              jest równa
            </p>
            <div className="text-center my-4">
              <Mb>{"V(d) = (d-12)^2 \\cdot \\sqrt{6d-36}"}</Mb>
            </div>
            <p className="font-semibold">
              dla <Mi>{"d \\in (6, 12)"}</Mi>. Wyznacz długość <Mi>{"d"}</Mi> przekątnej
              graniastosłupa, dla której jego objętość jest największa. Zapisz obliczenia.
            </p>
          </SubTask>

          {/* Stopka */}
          <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
            <span className="text-xs text-stone-400 italic">{SOURCE}</span>
          </div>
        </div>

        {/* ── Zadanie 2 ────────────────────────────────── */}
        <TaskCard
          number="2"
          points="0–5"
          source="Matura próbna SMWP, październik 2025, poziom rozszerzony"
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
        </div>{/* end space-y-12 */}
      </main>
    </div>
  );
}
