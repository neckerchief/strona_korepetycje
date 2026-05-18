"use client";
import { SubTask, Mi, Mb, FormulaBox, SideWork } from "../_components";

const SOURCE = "Matura próbna SMWP, styczeń 2026, poziom rozszerzony";

export const Zad1Smwp2026 = ({ number = "1", points = "0–6" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
      Rozważamy wszystkie graniastosłupy prawidłowe czworokątne, których suma długości przekątnej
      podstawy oraz nachylonej do niej przekątnej graniastosłupa <Mi>{"d"}</Mi> jest równa{" "}
      <Mi>{"12"}</Mi>.
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            Oznacz bok podstawy jako <Mi>{"a"}</Mi>, wysokość jako <Mi>{"h"}</Mi>. Przekątna podstawy
            to <Mi>{"a\\sqrt{2}"}</Mi>. Z warunku sumy:
          </p>
          <FormulaBox>
            <Mb>{"a\\sqrt{2} + d = 12 \\quad \\Rightarrow \\quad a = \\frac{12-d}{\\sqrt{2}}"}</Mb>
          </FormulaBox>
          <p>Wyznacz <Mi>{"h"}</Mi> z twierdzenia Pitagorasa dla przekątnej graniastosłupa:</p>
          <FormulaBox>
            <Mb>{"d^2 = (a\\sqrt{2})^2 + h^2"}</Mb>
          </FormulaBox>
          <p>Następnie oblicz <Mi>{"V = a^2 \\cdot h"}</Mi>.</p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Wyrażamy bok podstawy <Mi>{"a"}</Mi> przez <Mi>{"d"}</Mi></p>
          <p>
            Przekątna kwadratu o boku <Mi>{"a"}</Mi> ma długość <Mi>{"a\\sqrt{2}"}</Mi>. Z warunku
            zadania:
          </p>
          <Mb>{"a\\sqrt{2} + d = 12 \\quad \\Rightarrow \\quad a = \\frac{12-d}{\\sqrt{2}}"}</Mb>
          <p>
            Dziedzina: aby <Mi>{"a > 0"}</Mi>, potrzebujemy <Mi>{"d < 12"}</Mi>.
          </p>

          <p className="font-semibold text-stone-800">Krok 2. Wyrażamy wysokość <Mi>{"h"}</Mi> przez <Mi>{"d"}</Mi></p>
          <p>Przekątna graniastosłupa z twierdzenia Pitagorasa:</p>
          <FormulaBox>
            <Mb>{"d^2 = (a\\sqrt{2})^2 + h^2 = (12-d)^2 + h^2"}</Mb>
          </FormulaBox>
          <Mb>
            {
              "h^2 = d^2 - (12-d)^2 = \\bigl[d-(12-d)\\bigr]\\bigl[d+(12-d)\\bigr] = (2d-12)\\cdot 12 = 24(d-6) = 4(6d-36)"
            }
          </Mb>
          <Mb>{"h = 2\\sqrt{6d-36}"}</Mb>
          <p>
            Dziedzina: aby <Mi>{"h > 0"}</Mi>, potrzebujemy <Mi>{"d > 6"}</Mi>. Zatem{" "}
            <Mi>{"d \\in (6, 12)"}</Mi>.
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
        Wykaż, że objętość graniastosłupa w zależności od długości <Mi>{"d"}</Mi> jego przekątnej jest
        równa
      </p>
      <div className="text-center my-4">
        <Mb>{"V(d) = (d-12)^2 \\cdot \\sqrt{6d-36}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–4"
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
            Gdzie <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = \\sqrt{6d-36}"}</Mi>. Po uproszczeniu wyłącz
            wspólny czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}}"}</Mi>.
          </p>
          <p>
            Ustaw <Mi>{"V'(d) = 0"}</Mi>. Na przedziale <Mi>{"(6,12)"}</Mi> czynnik{" "}
            <Mi>{"(d-12) \\neq 0"}</Mi>, więc zeruje się tylko drugi czynnik.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-start">
            <div className="flex-1 min-w-0 space-y-4">
              <p className="font-semibold text-stone-800">Krok 1. Obliczamy pochodną</p>
              <p>Korzystamy z reguły iloczynu:</p>
              <FormulaBox>
                <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
              </FormulaBox>
              <p>
                Mamy <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = (6d-36)^{1/2}"}</Mi>. Dostajemy:
              </p>
              <Mb>{"V'(d) = \\frac{d-12}{\\sqrt{6d-36}} \\cdot (15d - 108)"}</Mb>
            </div>
            <SideWork className="w-full xl:w-[min(100%,min(38rem,46vw))] xl:shrink-0" title={null}>
              <Mb>{"f' = 2(d-12), \\qquad g' = \\frac{6}{2\\sqrt{6d-36}} = \\frac{3}{\\sqrt{6d-36}}"}</Mb>
              <p className="mt-2">Iloczyn przed wyłączeniem:</p>
              <Mb>{"V'(d) = 2(d-12)\\sqrt{6d-36} + (d-12)^2 \\cdot \\frac{3}{\\sqrt{6d-36}}"}</Mb>
              <p className="mt-2">Wspólny mianownik <Mi>{"\\sqrt{6d-36}"}</Mi>:</p>
              <Mb>{"V'(d) = \\frac{2(d-12)(6d-36) + 3(d-12)^2}{\\sqrt{6d-36}}"}</Mb>
              <p className="mt-2">Wyłączamy <Mi>{"(d-12)"}</Mi> w liczniku:</p>
              <Mb>
                {
                  "= \\frac{(d-12)\\bigl[2(6d-36) + 3(d-12)\\bigr]}{\\sqrt{6d-36}} = \\frac{(d-12)(15d-108)}{\\sqrt{6d-36}}"
                }
              </Mb>
            </SideWork>
          </div>

          <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy miejsce zerowe</p>
          <p>
            Na przedziale <Mi>{"(6,12)"}</Mi>: <Mi>{"d-12 < 0"}</Mi> i <Mi>{"\\sqrt{6d-36} > 0"}</Mi>,
            więc czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}} \\neq 0"}</Mi>. Zeruje się tylko:
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
                  <td className="border border-[#d4b8f0] px-3 py-1">
                    <Mi>{"\\left(6,\\,\\tfrac{36}{5}\\right)"}</Mi>
                  </td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1">
                    <Mi>{"\\left(\\tfrac{36}{5},\\,12\\right)"}</Mi>
                  </td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pochodna zmienia znak z <Mi>{"+"}</Mi> na <Mi>{"-"}</Mi>, więc <Mi>{"d = \\dfrac{36}{5}"}</Mi>{" "}
            daje maksimum objętości.
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
        Objętość graniastosłupa w zależności od długości <Mi>{"d"}</Mi> jego przekątnej jest równa
      </p>
      <div className="text-center my-4">
        <Mb>{"V(d) = (d-12)^2 \\cdot \\sqrt{6d-36}"}</Mb>
      </div>
      <p className="font-semibold">
        dla <Mi>{"d \\in (6, 12)"}</Mi>. Wyznacz długość <Mi>{"d"}</Mi> przekątnej graniastosłupa, dla
        której jego objętość jest największa. Zapisz obliczenia.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE}</span>
    </div>
  </div>
);
