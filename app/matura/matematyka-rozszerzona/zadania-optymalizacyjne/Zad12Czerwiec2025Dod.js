"use client";
import { SubTask, Mi, Mb, FormulaBox } from "../_components";

const SOURCE =
  "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy";

export const Zad12Czerwiec2025Dod = ({ number = "1", points = "0–6" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
      Rozważamy wszystkie graniastosłupy prawidłowe trójkątne o polu powierzchni całkowitej równym{" "}
      <Mi>{"24\\sqrt{3}"}</Mi>.
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            Pole całkowite to dwa razy pole podstawy plus pole powierzchni bocznej (trzy prostokąty).
            Z warunku <Mi>{"P_c = 24\\sqrt{3}"}</Mi> wyraź wysokość <Mi>{"H"}</Mi> graniastosłupa przez{" "}
            <Mi>{"a"}</Mi>.
          </p>
          <p>
            Objętość: <Mi>{"V = P_{\\text{podstawy}} \\cdot H"}</Mi>, gdzie{" "}
            <Mi>{"P_{\\text{podstawy}} = \\dfrac{a^2\\sqrt{3}}{4}"}</Mi>.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Pole powierzchni całkowitej</p>
          <p>
            Podstawa to trójkąt równoboczny o boku <Mi>{"a"}</Mi>, wysokość graniastosłupa to{" "}
            <Mi>{"H"}</Mi>:
          </p>
          <Mb>
            {
              "P_c = 2 \\cdot \\frac{a^2\\sqrt{3}}{4} + 3aH = \\frac{a^2\\sqrt{3}}{2} + 3aH = 24\\sqrt{3}"
            }
          </Mb>

          <p className="font-semibold text-stone-800">Krok 2. Wysokość przez <Mi>{"a"}</Mi></p>
          <Mb>{"3aH = 24\\sqrt{3} - \\frac{a^2\\sqrt{3}}{2} = \\frac{\\sqrt{3}(48 - a^2)}{2}"}</Mb>
          <Mb>{"H = \\frac{\\sqrt{3}(48 - a^2)}{6a}"}</Mb>

          <p className="font-semibold text-stone-800">Krok 3. Objętość</p>
          <Mb>
            {
              "V = \\frac{a^2\\sqrt{3}}{4} \\cdot \\frac{\\sqrt{3}(48 - a^2)}{6a} = \\frac{3a^2(48 - a^2)}{24a} = \\frac{a(48 - a^2)}{8} = 6a - \\frac{1}{8}a^3 \\quad \\blacksquare"
            }
          </Mb>
          <p>
            Warunek <Mi>{"H > 0"}</Mi> daje <Mi>{"48 - a^2 > 0"}</Mi>, więc <Mi>{"a \\in (0, 4\\sqrt{3})"}</Mi>.
          </p>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że objętość <Mi>{"V"}</Mi> graniastosłupa w zależności od długości <Mi>{"a"}</Mi> krawędzi
        podstawy jest określona wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"V(a) = 6a - \\dfrac{1}{8}a^3"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–4"
      answer={
        <div className="space-y-2">
          <p>
            Długość krawędzi podstawy: <Mi>{"a = 4"}</Mi>
          </p>
          <p>
            Największa objętość: <Mi>{"V_{\\max} = 16"}</Mi>
          </p>
        </div>
      }
      hint={
        <div className="space-y-3">
          <p>
            Oblicz pochodną <Mi>{"V'(a)"}</Mi> na przedziale <Mi>{"a \\in (0, 4\\sqrt{3})"}</Mi> i rozwiąż{" "}
            <Mi>{"V'(a) = 0"}</Mi>.
          </p>
          <p>
            Sprawdź znak pochodnej (lub drugą pochodną), że wyznaczony punkt to maksimum, i oblicz{" "}
            <Mi>{"V(a)"}</Mi>.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Pochodna</p>
          <Mb>{"V(a) = 6a - \\frac{1}{8}a^3"}</Mb>
          <Mb>{"V'(a) = 6 - \\frac{3}{8}a^2"}</Mb>

          <p className="font-semibold text-stone-800">Krok 2. Miejsce zerowe pochodnej</p>
          <Mb>{"6 - \\frac{3}{8}a^2 = 0 \\quad \\Rightarrow \\quad a^2 = 16 \\quad \\Rightarrow \\quad a = 4"}</Mb>
          <p>
            (Bierzemy <Mi>{"a > 0"}</Mi>; punkt <Mi>{"a = 4"}</Mi> leży w dziedzinie{" "}
            <Mi>{"(0, 4\\sqrt{3})"}</Mi>.)
          </p>

          <p className="font-semibold text-stone-800">Krok 3. Maksimum</p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center w-full border-collapse my-2">
              <thead>
                <tr className="bg-[#f2ecfb]">
                  <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V'(a)"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V"}</Mi></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(0, 4)"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4, 4\\sqrt{3})"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pochodna zmienia znak z <Mi>{"+"}</Mi> na <Mi>{"-"}</Mi>, więc w <Mi>{"a = 4"}</Mi> jest maksimum
            objętości.
          </p>

          <p className="font-semibold text-stone-800">Krok 4. Największa objętość</p>
          <Mb>{"V(4) = 6 \\cdot 4 - \\frac{1}{8} \\cdot 64 = 24 - 8 = 16"}</Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">
              Odpowiedź: <Mi>{"a = 4"}</Mi>, <Mi>{"V_{\\max} = 16"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Objętość <Mi>{"V"}</Mi> graniastosłupa w zależności od długości <Mi>{"a"}</Mi> krawędzi podstawy jest
        określona wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"V(a) = 6a - \\dfrac{1}{8}a^3"}</Mb>
      </div>
      <p>
        dla każdego <Mi>{"a \\in (0, 4\\sqrt{3})"}</Mi>.
      </p>
      <p className="font-semibold">
        Wyznacz długość krawędzi podstawy graniastosłupa, dla której jego objętość jest największa.
        Oblicz tę największą objętość. Zapisz obliczenia.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE}</span>
    </div>
  </div>
);
