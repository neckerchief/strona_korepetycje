"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, SideWork, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";

const tasks = [
  {
    id: "cke-2025-czerwiec-dod-zad5-vieta",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "5",
    points: "0–4",
    instruction: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">
          Wyznacz wszystkie wartości parametru <Mi>{"m"}</Mi>, dla których równanie
        </p>
        <div className="text-center">
          <Mb>{"x^2 + 2mx + 2m - 1 = 0"}</Mb>
        </div>
        <p className="font-semibold text-stone-800">
          ma dwa różne rozwiązania rzeczywiste <Mi>{"x_1,\\ x_2"}</Mi> spełniające warunek
        </p>
        <div className="text-center">
          <Mb>{"m(x_1^2 + x_2^2) = 3m \\cdot x_1 \\cdot x_2 + 2"}</Mb>
        </div>
        <p className="font-semibold text-stone-800">Zapisz obliczenia.</p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    mathBlock2: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"m = 2"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dwa różne pierwiastki rzeczywiste oznaczają <Mi>{"\\Delta > 0"}</Mi> dla trójmianu{" "}
          <Mi>{"x^2 + 2mx + 2m - 1"}</Mi>.
        </p>
        <p>
          Z wzorów Viète'a zapisz <Mi>{"x_1 + x_2"}</Mi> i <Mi>{"x_1 x_2"}</Mi> przez <Mi>{"m"}</Mi>, a sumę
          kwadratów zamień na:
        </p>
        <FormulaBox>
          <Mb>{"x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2"}</Mb>
        </FormulaBox>
        <p>
          Podstaw do warunku z treści zadania, uprość i rozwiąż równanie na <Mi>{"m"}</Mi>. Na końcu weź tylko
          te wartości, które spełniają oba warunki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Warunek na dwa różne pierwiastki rzeczywiste</p>
        <p>
          Dla równania <Mi>{"x^2 + 2mx + 2m - 1 = 0"}</Mi> mamy <Mi>{"a = 1"}</Mi>, <Mi>{"b = 2m"}</Mi>,{" "}
          <Mi>{"c = 2m - 1"}</Mi>. Dwa różne rozwiązania rzeczywiste wymagają dodatniej delty:
        </p>
        <Mb>{"\\Delta = b^2 - 4ac = (2m)^2 - 4(2m - 1) = 4m^2 - 8m + 4 = 4(m - 1)^2"}</Mb>
        <Mb>{"\\Delta > 0 \\quad \\Leftrightarrow \\quad 4(m - 1)^2 > 0 \\quad \\Leftrightarrow \\quad m \\neq 1"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wzory Viète'a</p>
        <p>
          Oznaczmy pierwiastki przez <Mi>{"x_1"}</Mi> i <Mi>{"x_2"}</Mi>. Dla trójmianu{" "}
          <Mi>{"ax^2 + bx + c = 0"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"x_1 + x_2 = -\\frac{b}{a} = -2m, \\qquad x_1 x_2 = \\frac{c}{a} = 2m - 1"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 3. Suma kwadratów przez Viète'a</p>
        <p>
          W warunku występuje <Mi>{"x_1^2 + x_2^2"}</Mi>. Korzystamy z tożsamości:
        </p>
        <FormulaBox>
          <Mb>{"x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2"}</Mb>
        </FormulaBox>
        <Mb>
          {"x_1^2 + x_2^2 = (-2m)^2 - 2(2m - 1) = 4m^2 - 4m + 2"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 4. Równanie na parametr <Mi>{"m"}</Mi></p>
        <p>Warunek z treści zadania:</p>
        <Mb>{"m(x_1^2 + x_2^2) = 3m \\cdot x_1 \\cdot x_2 + 2"}</Mb>
        <p>Podstawiamy wyrażenia z kroku 3:</p>
        <Mb>{"m(4m^2 - 4m + 2) = 3m(2m - 1) + 2"}</Mb>
        <Mb>{"4m^3 - 4m^2 + 2m = 6m^2 - 3m + 2"}</Mb>
        <Mb>{"4m^3 - 10m^2 + 5m - 2 = 0"}</Mb>
        <p>
          Szukamy pierwiastka całkowitego. Dla <Mi>{"m = 2"}</Mi> lewa strona równa się zero, więc{" "}
          <Mi>{"m - 2"}</Mi> jest czynnikiem. Dzieląc wielomian otrzymujemy:
        </p>

        <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-start">
          <div className="flex-1 min-w-0 space-y-3">
            <Mb>{"4m^3 - 10m^2 + 5m - 2 = (m - 2)(4m^2 - 2m + 1)"}</Mb>
          </div>
          <SideWork
            className="w-full xl:w-[min(100%,min(38rem,46vw))] xl:shrink-0"
            title="Dzielenie wielomianów"
          >
            <Mb>
              {[
                "\\begin{aligned}",
                "& \\underline{\\hspace{0.1em}4m^2-2m+1\\hspace{4.1em}} \\\\[0.25em]",
                "& (4m^3-10m^2+5m-2):(m-2) \\\\[0.45em]",
                "& \\underline{-(4m^3-8m^2)\\hspace{2.8em}} \\\\[0.25em]",
                "& \\hspace{1.5em}-2m^2+5m-2 \\\\[0.45em]",
                "& \\hspace{1.5em}\\underline{-(-2m^2+4m)\\hspace{1.25em}} \\\\[0.25em]",
                "& \\hspace{3em}m-2 \\\\[0.45em]",
                "& \\hspace{3em}\\underline{-(m-2)} \\\\[0.25em]",
                "& \\hspace{4.5em}0",
                "\\end{aligned}",
              ].join("")}
            </Mb>
          </SideWork>
        </div>

        <p>
          Trójmian <Mi>{"4m^2 - 2m + 1"}</Mi> ma deltę <Mi>{"\\Delta = (-2)^2 - 4 \\cdot 4 \\cdot 1 = -12 < 0"}</Mi>, więc
          nie ma pierwiastków rzeczywistych. Stąd z warunku algebraicznego:
        </p>
        <Mb>{"m = 2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie warunku z kroku 1</p>
        <p>
          Dla <Mi>{"m = 2"}</Mi> mamy <Mi>{"m \\neq 1"}</Mi>, więc <Mi>{"\\Delta > 0"}</Mi> i równanie ma dwa
          różne pierwiastki rzeczywiste.
        </p>
        <p>
          Równanie przyjmuje postać <Mi>{"x^2 + 4x + 3 = 0"}</Mi>, czyli <Mi>{"(x+1)(x+3) = 0"}</Mi>, skąd{" "}
          <Mi>{"x_1 = -1"}</Mi>, <Mi>{"x_2 = -3"}</Mi> (lub odwrotnie).
        </p>
        <Mb>
          {"m(x_1^2 + x_2^2) = 2(1 + 9) = 20, \\qquad 3m \\cdot x_1 \\cdot x_2 + 2 = 3 \\cdot 2 \\cdot 3 + 2 = 20"}
        </Mb>
        <p>Warunek jest spełniony.</p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"m = 2"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2026-styczen-zad9",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–6",
    instruction: (
      <span>
        Wyznacz wszystkie wartości parametru <Mi>{"m"}</Mi>, dla których równanie
      </span>
    ),
    mathBlock: "x^2 - (2m+3)\\cdot x + 4m + 6 = 0",
    noteItems: [
      {
        text: "ma dwa różne rozwiązania rzeczywiste ",
      },
      { math: "x_1,\\ x_2" },
      { text: " spełniające warunek" },
    ],
    mathBlock2: "x_1^3 + x_2^3 > 7\\cdot(x_1 + x_2)",
    answers: null,

    answer: (
      <p>
        <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup \\left(\\dfrac{5}{2},\\,+\\infty\\right)"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: dwa różne pierwiastki rzeczywiste wymagają <Mi>{"\\Delta > 0"}</Mi>.
          Oblicz deltę i znajdź przedział wartości <Mi>{"m"}</Mi>.
        </p>
        <p>
          Krok 2: z wzorów Viète'a wyraź <Mi>{"x_1+x_2"}</Mi> i{" "}
          <Mi>{"x_1 x_2"}</Mi> przez <Mi>{"m"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"x_1+x_2 = 2m+3 \\qquad x_1 x_2 = 4m+6"}</Mb>
        </FormulaBox>
        <p>
          Krok 3: skorzystaj z tożsamości, żeby przekształcić lewą stronę nierówności:
        </p>
        <FormulaBox>
          <Mb>{"x_1^3+x_2^3 = (x_1+x_2)\\bigl[(x_1+x_2)^2 - 3x_1 x_2\\bigr]"}</Mb>
        </FormulaBox>
        <p>
          Krok 4: znajdź część wspólną obu warunków (na <Mi>{"\\Delta"}</Mi> i na nierówność).
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wzory Viète'a</p>
        <p>
          Dla równania <Mi>{"x^2 - (2m+3)x + 4m+6 = 0"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"x_1+x_2 = 2m+3 \\qquad x_1 x_2 = 4m+6"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Przekształcamy nierówność</p>
        <p>Korzystamy z tożsamości:</p>
        <FormulaBox>
          <Mb>{"x_1^3+x_2^3 = (x_1+x_2)\\bigl[(x_1+x_2)^2 - 3x_1 x_2\\bigr]"}</Mb>
        </FormulaBox>
        <p>Podstawiamy:</p>
        <Mb>{"(x_1+x_2)^2 - 3x_1 x_2 = (2m+3)^2 - 3(4m+6) = 4m^2+12m+9-12m-18 = 4m^2-9"}</Mb>
        <p>Zatem:</p>
        <Mb>{"x_1^3+x_2^3 = (2m+3)(4m^2-9) = (2m+3)(2m-3)(2m+3) = (2m+3)^2(2m-3)"}</Mb>
        <p>Nierówność przyjmuje postać:</p>
        <Mb>{"(2m+3)^2(2m-3) > 7(2m+3)"}</Mb>
        <Mb>{"(2m+3)^2(2m-3) - 7(2m+3) > 0"}</Mb>
        <Mb>{"(2m+3)\\bigl[(2m+3)(2m-3)-7\\bigr] > 0"}</Mb>
        <Mb>{"(2m+3)(4m^2-9-7) > 0"}</Mb>
        <Mb>{"(2m+3)(4m^2-16) > 0"}</Mb>
        <Mb>{"4(2m+3)(m^2-4) > 0"}</Mb>
        <Mb>{"(2m+3)(m+2)(m-2) > 0"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 3. Analiza znaku <Mi>{"(2m+3)(m+2)(m-2)"}</Mi>
        </p>
        <p>
          Miejsca zerowe: <Mi>{"m = -\\dfrac{3}{2}"}</Mi>,{" "}
          <Mi>{"m = -2"}</Mi>, <Mi>{"m = 2"}</Mi>.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm text-center w-full border-collapse my-2">
            <thead>
              <tr className="bg-[#f2ecfb]">
                <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"2m+3"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"m+2"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"m-2"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5">iloczyn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"m < -2"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(-2,\\,-\\tfrac{3}{2}\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
              </tr>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(-\\tfrac{3}{2},\\,2\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"m > 2"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Nierówność spełniona dla{" "}
          <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup (2,\\,+\\infty)"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Warunek <Mi>{"\\Delta > 0"}</Mi></p>
        <Mb>{"\\Delta = (2m+3)^2 - 4(4m+6) = 4m^2+12m+9-16m-24 = 4m^2-4m-15"}</Mb>
        <p>
          Pierwiastki: <Mi>{"\\Delta = 0"}</Mi> daje <Mi>{"m = \\dfrac{4 \\pm 16}{8}"}</Mi>,
          czyli <Mi>{"m = -\\dfrac{3}{2}"}</Mi> i <Mi>{"m = \\dfrac{5}{2}"}</Mi>.
        </p>
        <Mb>{"4m^2 - 4m - 15 > 0 \\quad \\Leftrightarrow \\quad m < -\\frac{3}{2} \\quad \\text{lub} \\quad m > \\frac{5}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Część wspólna obu warunków</p>
        <Mb>{"\\left[\\left(-2,\\,-\\tfrac{3}{2}\\right) \\cup (2,\\,+\\infty)\\right] \\cap \\left[\\left(-\\infty,\\,-\\tfrac{3}{2}\\right) \\cup \\left(\\tfrac{5}{2},\\,+\\infty\\right)\\right]"}</Mb>
        <p>
          Przedział <Mi>{"\\left(-2,\\,-\\tfrac{3}{2}\\right)"}</Mi> zawiera wyłącznie wartości
          mniejsze od <Mi>{"-\\tfrac{3}{2}"}</Mi>, więc leży w całości w zbiorze{" "}
          <Mi>{"\\Delta > 0"}</Mi>. Z <Mi>{"(2,\\,+\\infty)"}</Mi> zostaje część powyżej{" "}
          <Mi>{"\\tfrac{5}{2}"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>{"m \\in \\left(-2,\\,-\\dfrac{3}{2}\\right) \\cup \\left(\\dfrac{5}{2},\\,+\\infty\\right)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad10",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–5",
    instruction: (
      <span>
        Funkcja <Mi>{"f"}</Mi> jest określona wzorem
      </span>
    ),
    mathBlock: "f(x) = (2m+1)\\cdot x^2 - 6x + m - 3",
    noteItems: [
      { text: "dla każdej liczby rzeczywistej " },
      { math: "x" },
      { text: ". Wyznacz wszystkie wartości parametru " },
      { math: "m" },
      { text: ", dla których funkcja " },
      { math: "f" },
      { text: " ma dokładnie dwa miejsca zerowe " },
      { math: "x_1" },
      { text: " oraz " },
      { math: "x_2" },
      { text: " przeciwnych znaków, które spełniają warunek. Zapisz obliczenia." },
    ],
    answers: null,
    mathBlock2: "x_1^3 + x_2^3 > (x_1 + x_2)^4",

    answer: <p><Mi>{"m \\in \\left(\\dfrac{3}{2},\\, 3\\right)"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Dwa miejsca zerowe przeciwnych znaków <Mi>{"\\Leftrightarrow x_1 x_2 < 0"}</Mi>.
          Ze wzorów Viète'a:
        </p>
        <FormulaBox>
          <Mb>{"x_1 + x_2 = \\frac{6}{2m+1}, \\qquad x_1 x_2 = \\frac{m-3}{2m+1}"}</Mb>
        </FormulaBox>
        <p>
          Warunek <Mi>{"x_1 x_2 < 0"}</Mi> daje <Mi>{"m \\in (-\\frac{1}{2}, 3)"}</Mi>.
          Następnie uprość <Mi>{"x_1^3 + x_2^3 = (x_1+x_2)^3 - 3x_1 x_2(x_1+x_2)"}</Mi>
          i rozwiąż nierówność.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Warunek na dwa miejsca zerowe przeciwnych znaków</p>
        <p>Potrzebujemy: <Mi>{"2m+1 \\neq 0"}</Mi> i <Mi>{"x_1 x_2 < 0"}</Mi>.</p>
        <p>Wzory Viète'a: <Mi>{"s = x_1+x_2 = \\frac{6}{2m+1}"}</Mi>, <Mi>{"p = x_1 x_2 = \\frac{m-3}{2m+1}"}</Mi></p>
        <Mb>{"p < 0 \\quad\\Leftrightarrow\\quad \\frac{m-3}{2m+1} < 0 \\quad\\Leftrightarrow\\quad m \\in \\left(-\\frac{1}{2},\\, 3\\right)"}</Mb>
        <p>
          Na tym przedziale mamy dwa różne pierwiastki rzeczywiste, bo{" "}
          <Mb>{"\\Delta = 36-4(2m+1)(m-3) = -8m^2+20m+48 > 0"}</Mb>
          (sprawdzenie: np. w środku przedziału <Mi>{"m = 0"}</Mi> daje <Mi>{"\\Delta = 48 > 0"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Nierówność <Mi>{"x_1^3+x_2^3 > (x_1+x_2)^4"}</Mi></p>
        <p>
          Rozwijamy <Mi>{"(a+b)^3"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\begin{aligned} (x_1+x_2)^3 &= x_1^3 + 3x_1^2 x_2 + 3x_1 x_2^2 + x_2^3 \\\\ &= x_1^3 + x_2^3 + 3x_1 x_2 (x_1 + x_2) \\end{aligned}"
            }
          </Mb>
        </FormulaBox>
        <p>
          Stąd{" "}
          <Mi>{"x_1^3 + x_2^3 = (x_1+x_2)^3 - 3x_1 x_2 (x_1+x_2)"}</Mi>. Oznaczając jak w
          poprzednim kroku <Mi>{"s = x_1+x_2"}</Mi> i <Mi>{"p = x_1 x_2"}</Mi>, otrzymujemy na
          końcu zwartą postać:
        </p>
        <Mb>{"x_1^3+x_2^3 = s^3 - 3ps"}</Mb>
        <p>
          Nierówność z treści to <Mi>{"s^3-3ps > s^4"}</Mi>. Ponieważ dla{" "}
          <Mi>{"m \\in \\left(-\\tfrac{1}{2},\\,3\\right)"}</Mi> jest{" "}
          <Mi>{"s = \\dfrac{6}{2m+1} > 0"}</Mi>, dzielimy obie strony przez <Mi>{"s > 0"}</Mi>:
        </p>
        <Mb>{"s^2(1-s) > 3p"}</Mb>
        <p>Podstawiamy i upraszczamy (mnożąc przez <Mi>{"(2m+1)^2 > 0"}</Mi>):</p>
        <Mb>{"12(2m-5) > (m-3)(2m+1)^2"}</Mb>
        <Mb>{"24m-60 > 4m^3-8m^2-11m-3"}</Mb>
        <Mb>{"4m^3-8m^2-35m+57 < 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozkład trójmianu</p>
        <p>Sprawdzamy <Mi>{"m = \\frac{3}{2}"}</Mi>: <Mi>{"4\\cdot\\frac{27}{8}-8\\cdot\\frac{9}{4}-35\\cdot\\frac{3}{2}+57 = \\frac{27}{2}-18-\\frac{105}{2}+57 = 0"}</Mi> ✓</p>
        <Mb>{"4m^3-8m^2-35m+57 = (2m-3)(2m^2-m-19)"}</Mb>
        <p>Pierwiastki <Mi>{"2m^2-m-19=0"}</Mi>: <Mi>{"m = \\frac{1\\pm\\sqrt{153}}{4} = \\frac{1\\pm 3\\sqrt{17}}{4}"}</Mi></p>
        <p><Mi>{"m_1 \\approx 3{,}34"}</Mi> (poza <Mi>{"(-\\frac{1}{2},3)"}</Mi>), <Mi>{"m_2 \\approx -2{,}84"}</Mi> (poza <Mi>{"(-\\frac{1}{2},3)"}</Mi>)</p>
        <p>Na przedziale <Mi>{"(-\\frac{1}{2},3)"}</Mi>: <Mi>{"2m^2-m-19 < 0"}</Mi>, więc znak <Mi>{"(2m-3)\\cdot(-)"}</Mi>:</p>
        <div className="overflow-x-auto my-2">
          <table className="text-sm text-center w-full border-collapse">
            <thead><tr className="bg-[#f2ecfb]">
              <th className="border border-[#d4b8f0] px-3 py-1">przedział</th>
              <th className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(2m-3)"}</Mi></th>
              <th className="border border-[#d4b8f0] px-3 py-1">iloczyn</th>
            </tr></thead>
            <tbody>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(-\\tfrac{1}{2},\\,\\tfrac{3}{2})"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1">-</td>
                <td className="border border-[#d4b8f0] px-3 py-1"> + </td>
              </tr>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(\\tfrac{3}{2},\\,3)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1">- ✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"m \\in \\left(\\dfrac{3}{2},\\, 3\\right)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2026-formula2023-maj-zad10-kwadratowa",
    source:
      "Matura z matematyki, poziom rozszerzony, formuła 2023, egzamin w 2026 roku CKE (arkusz z 11 maja 2023)",
    number: "3",
    points: "0–5",
    instruction: (
      <span>
        Wyznacz wszystkie rzeczywiste wartości parametru <Mi>{"m"}</Mi>, gdzie{" "}
        <Mi>{"m \\neq 0"}</Mi>, dla których funkcja kwadratowa <Mi>{"f"}</Mi> określona wzorem
      </span>
    ),
    mathBlock: "f(x) = m^2 \\cdot x^2 - 2mx - m + 1",
    noteItems: [
      { text: "ma dwa różne miejsca zerowe " },
      { math: "x_1" },
      { text: " oraz " },
      { math: "x_2" },
      { text: " należące do przedziału " },
      { math: "(-2, 2)" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: <p><Mi>{"m \\in (1,\\,+\\infty)"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Dla <Mi>{"m \\neq 0"}</Mi> współczynnik przy <Mi>{"x^2"}</Mi> jest dodatni:{" "}
          <Mi>{"a = m^2 > 0"}</Mi>, więc parabola „otwiera się” do góry.
        </p>
        <p>
          Dwa różne miejsca zerowe: oblicz <Mi>{"\\Delta"}</Mi> i wymagaj{" "}
          <Mi>{"\\Delta > 0"}</Mi>.
        </p>
        <p>
          Gdy parabola jest dodatnio zorientowana, oba pierwiastki leżą w{" "}
          <Mi>{"(-2, 2)"}</Mi>, jeśli:
        </p>
        <ul className="list-disc ml-6 space-y-1">
          <li>
            wierzchołek jest wewnątrz przedziału: <Mi>{"-2 < p < 2"}</Mi>, gdzie{" "}
            <Mi>{"p = -\\dfrac{b}{2a}"}</Mi>,
          </li>
          <li>
            <Mi>{"f(-2) > 0"}</Mi> oraz <Mi>{"f(2) > 0"}</Mi>.
          </li>
        </ul>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Współczynniki i warunek na dwa pierwiastki</p>
        <p>
          Funkcja ma postać <Mi>{"ax^2 + bx + c"}</Mi> z{" "}
          <Mi>{"a = m^2"}</Mi>, <Mi>{"b = -2m"}</Mi>, <Mi>{"c = -m + 1"}</Mi>.
          Dla <Mi>{"m \\neq 0"}</Mi> mamy <Mi>{"a > 0"}</Mi>.
        </p>
        <Mb>{"\\Delta = (-2m)^2 - 4 \\cdot m^2 \\cdot (-m + 1) = 4m^2 + 4m^3 - 4m^2 = 4m^3"}</Mb>
        <p>
          Dwa różne miejsca zerowe wymagają <Mi>{"\\Delta > 0"}</Mi>, czyli{" "}
          <Mi>{"4m^3 > 0"}</Mi>, stąd <Mi>{"m > 0"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Współrzędna wierzchołka</p>
        <Mb>{"p = -\\frac{b}{2a} = -\\frac{-2m}{2m^2} = \\frac{1}{m}"}</Mb>
        <p>
          Wierzchołek ma być w <Mi>{"(-2, 2)"}</Mi>. Dla <Mi>{"m > 0"}</Mi> warunek{" "}
          <Mi>{"p > -2"}</Mi> jest zawsze spełniony. Z <Mi>{"p < 2"}</Mi> dostajemy{" "}
          <Mi>{"\\dfrac{1}{m} < 2"}</Mi>, czyli <Mi>{"m > \\dfrac{1}{2}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Wartości na końcach przedziału</p>
        <Mb>{"f(-2) = m^2 \\cdot 4 + 4m - m + 1 = 4m^2 + 3m + 1"}</Mb>
        <p>
          Trójmian <Mi>{"4m^2 + 3m + 1"}</Mi> ma ujemną deltę, więc dla każdego{" "}
          <Mi>{"m"}</Mi> jest dodatni. Warunek <Mi>{"f(-2) > 0"}</Mi> jest spełniony zawsze.
        </p>
        <Mb>{"f(2) = 4m^2 - 4m - m + 1 = 4m^2 - 5m + 1 = (4m - 1)(m - 1)"}</Mb>
        <p>
          Wymagamy <Mi>{"f(2) > 0"}</Mi>. Dla <Mi>{"m > 0"}</Mi> otrzymujemy{" "}
          <Mi>{"m > 1"}</Mi> (bo pierwiastki to <Mi>{"\\dfrac{1}{4}"}</Mi> i <Mi>{"1"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Część wspólna warunków</p>
        <p>Łączymy: <Mi>{"m \\neq 0"}</Mi>, <Mi>{"m > 0"}</Mi>, <Mi>{"m > \\dfrac{1}{2}"}</Mi>, <Mi>{"m > 1"}</Mi>.</p>
        <Mb>{"m \\in (1,\\,+\\infty)"}</Mb>
        <p className="text-stone-600 text-sm">
          Sprawdzenie (np. <Mi>{"m = 2"}</Mi>): <Mi>{"f(x) = 4x^2 - 4x - 1"}</Mi>,{" "}
          <Mi>{"\\Delta = 32 > 0"}</Mi>, pierwiastki <Mi>{"\\dfrac{1 \\pm \\sqrt{2}}{2}"}</Mi> leżą
          w <Mi>{"(-2, 2)"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"m \\in (1,\\,+\\infty)"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function FunkcjaKwadratowaPage() {
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
          <span className="text-sm text-stone-400">Funkcja kwadratowa</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 5
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Funkcja kwadratowa
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
