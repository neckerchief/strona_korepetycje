"use client";
import Image from "next/image";
import { SubTask, Mi, Mb, FormulaBox, SideWork } from "../_components";

const SOURCE_CKE_F2023 =
  "Matura z matematyki, poziom rozszerzony, formuła 2023, egzamin w 2026 roku CKE (arkusz z 11 maja 2023)";

export const Zad12 = ({ number = "1", points = "0–7" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed space-y-3">
      <p>
        W projekcie ogrodu zaplanowano kwietnik w kształcie trójkąta równoramiennego o podstawie
        długości <Mi>{"x"}</Mi> metrów nieprzekraczającej 10 metrów. Na tym kwietniku ma znajdować
        się fontanna w kształcie koła o średnicy 4 metrów, które ma być styczne do każdego z boków
        trójkątnego kwietnika (zobacz rysunek). Projektantowi zależy, aby przy tak ustalonej
        wielkości fontanny pole tego kwietnika było najmniejsze.
      </p>
      <figure className="my-4 flex flex-col items-center">
        <Image
          src="/matura/optymalizacja_cke_2026_zad12_v2.png"
          alt="Trójkąt równoramienny (kwietnik) z wpisanym kołem (fontanna); podstawa oznaczona x"
          width={640}
          height={400}
          className="w-[35%] max-w-full h-auto rounded-lg border border-[#c4a8e8] bg-white"
        />
      </figure>
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–3"
      hint={
        <div className="space-y-3">
          <p>
            Oznacz wysokość trójkąta (z wierzchołka na podstawę) przez <Mi>{"h"}</Mi>, ramię przez{" "}
            <Mi>{"b"}</Mi>. Promień koła wpisanego to <Mi>{"r = 2"}</Mi> (średnica 4 m).
          </p>
          <p>
            Pole: <Mi>{"P = \\frac{1}{2}xh"}</Mi>. Z własności koła wpisanego:{" "}
            <Mi>{"P = p \\cdot r"}</Mi>, gdzie <Mi>{"p"}</Mi> to półobwód.
          </p>
          <p>
            W trójkącie równoramiennym przy podstawie: <Mi>{"\\sin\\beta = \\frac{h}{b}"}</Mi> oraz{" "}
            <Mi>{"\\sin\\beta = \\frac{r}{x/2} = \\frac{4}{x}"}</Mi> (kąt przy podstawie). Wyraź{" "}
            <Mi>{"h"}</Mi> i <Mi>{"b"}</Mi> przez <Mi>{"x"}</Mi>, podstaw do wzorów na pole.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Oznaczenia</p>
          <p>
            Podstawa <Mi>{"x"}</Mi>, wysokość <Mi>{"h"}</Mi>, ramię <Mi>{"b"}</Mi>, promień wpisanego
            koła <Mi>{"r = 2"}</Mi>. Półobwód: <Mi>{"p = \\frac{x + 2b}{2}"}</Mi>.
          </p>

          <p className="font-semibold text-stone-800">Krok 2. Relacja pole – promień wpisany</p>
          <FormulaBox>
            <Mb>{"P = \\frac{1}{2}xh = pr = 2p = x + 2b \\quad \\Rightarrow \\quad h = \\frac{2(x+2b)}{x}"}</Mb>
          </FormulaBox>

          <p className="font-semibold text-stone-800">Krok 3. Zależność między <Mi>{"h"}</Mi>, <Mi>{"b"}</Mi> i <Mi>{"x"}</Mi></p>
          <p>
            Z twierdzenia Pitagorasa (połowa podstawy to <Mi>{"x/2"}</Mi>):{" "}
            <Mi>{"b^2 = h^2 + \\frac{x^2}{4}"}</Mi>. Z geometrii kąta przy podstawie:{" "}
            <Mi>{"\\dfrac{h}{b} = \\frac{4}{x}"}</Mi>, czyli <Mi>{"h = \\dfrac{4b}{x}"}</Mi>.
          </p>
          <p>Podstawiamy <Mi>{"h"}</Mi> do Pitagorasa:</p>
          <Mb>{"b^2 = \\frac{16b^2}{x^2} + \\frac{x^2}{4} \\quad \\Rightarrow \\quad b^2\\left(1 - \\frac{16}{x^2}\\right) = \\frac{x^2}{4}"}</Mb>
          <Mb>{"b = \\frac{x^2}{2\sqrt{x^2 - 16}} \\quad (x > 4)"}</Mb>

          <p className="font-semibold text-stone-800">Krok 4. Wzór na pole</p>
          <Mb>{"P = \\frac{1}{2}xh = \\frac{1}{2}x \\cdot \\frac{4b}{x} = 2b = \\frac{x^2}{\\sqrt{x^2 - 16}} = \\frac{2x^3}{x^2 - 16} \\quad \\blacksquare"}</Mb>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że pole <Mi>{"P"}</Mi> (wyrażone w metrach kwadratowych) trójkątnego kwietnika o
        podstawie długości <Mi>{"x"}</Mi> metrów jest określone wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(x) = \\frac{2x^3}{x^2 - 16}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–4"
      answer={
        <p>
          <Mi>{"x = 4\\sqrt{3}"}</Mi>, najmniejsze pole <Mi>{"P_{\\min} = 12\\sqrt{3}"}</Mi>
        </p>
      }
      hint={
        <div className="space-y-3">
          <p>
            Oblicz <Mi>{"P'(x)"}</Mi> regułą ilorazu (lub najpierw uprość ułamek). Po wyjęciu
            wspólnego czynnika dostaniesz iloczyn z <Mi>{"(x^2 - 48)"}</Mi>.
          </p>
          <p>
            Rozwiąż <Mi>{"P'(x) = 0"}</Mi> na przedziale <Mi>{"(4, 10]"}</Mi> i sprawdź znak
            pochodnej (minimum lokalne).
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Pochodna</p>
          <Mb>{"P(x) = \\frac{2x^3}{x^2 - 16}"}</Mb>
          <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-start">
            <div className="flex-1 min-w-0 space-y-2">
              <Mb>{"P'(x) = \\frac{6x^2(x^2-16) - 2x^3 \\cdot 2x}{(x^2-16)^2} = \\frac{2x^2(x^2 - 48)}{(x^2-16)^2}"}</Mb>
            </div>
            <SideWork className="w-full xl:w-[min(100%,min(38rem,46vw))] xl:shrink-0" title={null}>
              <Mb>{"\\frac{d}{dx}(2x^3) = 6x^2, \\quad \\frac{d}{dx}(x^2-16) = 2x"}</Mb>
              <Mb>{"P' = \\frac{6x^2(x^2-16) - 4x^4}{(x^2-16)^2}"}</Mb>
            </SideWork>
          </div>

          <p className="font-semibold text-stone-800">Krok 2. Miejsca zerowe pochodnej</p>
          <p>
            Na <Mi>{"(4, 10]"}</Mi>: <Mi>{"x > 0"}</Mi>, <Mi>{"x^2 - 16 > 0"}</Mi>, więc mianownik
            jest dodatni. Zerujemy licznik: <Mi>{"x^2 - 48 = 0"}</Mi>, stąd{" "}
            <Mi>{"x = 4\\sqrt{3}"}</Mi> (bo <Mi>{"x > 0"}</Mi>).
          </p>

          <p className="font-semibold text-stone-800">Krok 3. Minimum na przedziale</p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center w-full border-collapse my-2">
              <thead>
                <tr className="bg-[#f2ecfb]">
                  <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"x^2-48"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"P'(x)"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"P"}</Mi></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4,\\,4\\sqrt{3})"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4\\sqrt{3},\\,10]"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            W <Mi>{"x = 4\\sqrt{3}"}</Mi> funkcja osiąga minimum lokalne na rozważanym przedziale
            (przy <Mi>{"x \\to 4^+"}</Mi> pole rośnie do <Mi>{"+\\infty"}</Mi>).
          </p>

          <p className="font-semibold text-stone-800">Krok 4. Najmniejsze pole</p>
          <Mb>{"P(4\\sqrt{3}) = \\frac{2 \\cdot 64 \\cdot 3\\sqrt{3}}{48 - 16} = \\frac{384\\sqrt{3}}{32} = 12\\sqrt{3}"}</Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">
              Odpowiedź: <Mi>{"x = 4\\sqrt{3}"}</Mi>, <Mi>{"P_{\\min} = 12\\sqrt{3}"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Pole <Mi>{"P"}</Mi> trójkątnego kwietnika o podstawie długości <Mi>{"x"}</Mi> metrów jest
        określone wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(x) = \\frac{2x^3}{x^2 - 16}"}</Mb>
      </div>
      <p>dla każdego <Mi>{"x \\in (4, 10]"}</Mi>.</p>
      <p className="font-semibold">
        Wyznacz długość <Mi>{"x"}</Mi> podstawy trójkątnego kwietnika, dla której pole tego
        kwietnika jest najmniejsze. Oblicz to najmniejsze pole. Zapisz obliczenia.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE_CKE_F2023}</span>
    </div>
  </div>
);
