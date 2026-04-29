"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Mi, Mb, FormulaBox } from "../_components";

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
            1 zadanie
          </p>
        </div>

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
                <p className="font-semibold text-stone-800">Krok 1. Obliczamy pochodną</p>
                <p>
                  Korzystamy z reguły iloczynu:
                </p>
                <FormulaBox>
                  <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
                </FormulaBox>
                <p>
                  Mamy <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = (6d-36)^{1/2}"}</Mi>.
                </p>
                <Mb>{"f' = 2(d-12), \\qquad g' = \\frac{6}{2\\sqrt{6d-36}} = \\frac{3}{\\sqrt{6d-36}}"}</Mb>
                <Mb>{"V'(d) = 2(d-12)\\sqrt{6d-36} + (d-12)^2 \\cdot \\frac{3}{\\sqrt{6d-36}}"}</Mb>
                <p>Wyłączamy wspólny czynnik:</p>
                <Mb>{"V'(d) = \\frac{d-12}{\\sqrt{6d-36}} \\cdot \\bigl[2(6d-36) + 3(d-12)\\bigr]"}</Mb>
                <Mb>{"= \\frac{d-12}{\\sqrt{6d-36}} \\cdot (15d - 108)"}</Mb>

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
      </main>
    </div>
  );
}
