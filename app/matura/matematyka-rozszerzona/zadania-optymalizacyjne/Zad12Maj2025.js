"use client";
import { SubTask, Mi, Mb, FormulaBox } from "../_components";

const SOURCE = "Matura z matematyki, poziom rozszerzony, CKE, maj 2025";

export const Zad12Maj2025 = ({ number = "1", points = "0–6" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
      Rozważamy wszystkie stożki, których wysokość jest większa od <Mi>{"5"}</Mi>, a odległość środka
      podstawy od tworzącej jest równa <Mi>{"5"}</Mi>.
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            W przekroju osiowym stożka masz prostokątny trójkąt: wysokość <Mi>{"h"}</Mi>, promień
            podstawy <Mi>{"r"}</Mi>, tworząca <Mi>{"l = \\sqrt{h^2 + r^2}"}</Mi>. Odległość środka
            podstawy od tworzącej to wysokość trójkąta o podstawie <Mi>{"l"}</Mi> i wysokości
            bryły <Mi>{"h"}</Mi> (pole = <Mi>{"\\dfrac{1}{2}hl"}</Mi>).
          </p>
          <FormulaBox>
            <Mb>{"\\dfrac{1}{2} h r = \\dfrac{1}{2} l \\cdot 5 \\quad \\Longrightarrow \\quad hr = 5\\sqrt{h^2 + r^2}"}</Mb>
          </FormulaBox>
          <p>
            Podnieś do kwadratu, wyraź <Mi>{"r^2"}</Mi> przez <Mi>{"h"}</Mi>, a potem podstaw do{" "}
            <Mi>{"V = \\dfrac{\\pi}{3} r^2 h"}</Mi>.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Zależność między <Mi>{"r"}</Mi> a <Mi>{"h"}</Mi></p>
          <p>
            Niech <Mi>{"h > 5"}</Mi> to wysokość stożka, <Mi>{"r"}</Mi> promień podstawy, a{" "}
            <Mi>{"l"}</Mi> długość tworzącej. W przekroju osiowym odległość środka podstawy od
            tworzącej wynosi <Mi>{"5"}</Mi>. Pole trójkąta w przekroju można policzyć na dwa sposoby:
          </p>
          <Mb>{"\\dfrac{1}{2} \\cdot h \\cdot r = \\dfrac{1}{2} \\cdot l \\cdot 5"}</Mb>
          <Mb>{"hr = 5l = 5\\sqrt{h^2 + r^2}"}</Mb>
          <p>Kwadratujemy obie strony:</p>
          <Mb>{"h^2 r^2 = 25(h^2 + r^2)"}</Mb>
          <Mb>{"h^2 r^2 - 25 r^2 = 25 h^2 \\quad \\Longrightarrow \\quad r^2(h^2 - 25) = 25 h^2"}</Mb>
          <p>
            Ponieważ <Mi>{"h > 5"}</Mi>, mamy <Mi>{"h^2 - 25 > 0"}</Mi>, więc możemy podzielić:
          </p>
          <FormulaBox>
            <Mb>{"r^2 = \\dfrac{25h^2}{h^2 - 25}"}</Mb>
          </FormulaBox>

          <p className="font-semibold text-stone-800">Krok 2. Wzór na objętość</p>
          <Mb>
            {"V = \\frac{\\pi}{3} r^2 h = \\frac{\\pi}{3} \\cdot \\frac{25h^2}{h^2 - 25} \\cdot h = \\frac{\\pi}{3} \\cdot \\frac{25h^3}{h^2 - 25} \\quad \\blacksquare"}
          </Mb>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że objętość <Mi>{"V"}</Mi> stożka, jako funkcja wysokości <Mi>{"h"}</Mi> stożka, wyraża się
        wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"V(h) = \\dfrac{\\pi}{3} \\cdot \\dfrac{25h^3}{h^2 - 25}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–4"
      answer={
        <div className="space-y-2">
          <p>
            Wysokość: <Mi>{"h = 5\\sqrt{3}"}</Mi>
          </p>
          <p>
            Minimalna objętość: <Mi>{"V_{\\min} = \\dfrac{125\\pi\\sqrt{3}}{2}"}</Mi>
          </p>
        </div>
      }
      hint={
        <div className="space-y-3">
          <p>
            Funkcja <Mi>{"V(h)"}</Mi> jest określona dla <Mi>{"h \\in (5, +\\infty)"}</Mi>. Oblicz pochodną
            ilorazu <Mi>{"\\dfrac{h^3}{h^2 - 25}"}</Mi> i przyrównaj <Mi>{"V'(h)"}</Mi> do zera.
          </p>
          <p>
            Sprawdź, czy wyznaczony punkt stacjonarny to minimum (np. jak <Mi>{"h \\to 5^+"}</Mi> i{" "}
            <Mi>{"h \\to +\\infty"}</Mi> objętość rośnie do nieskończoności).
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Pochodna <Mi>{"V(h)"}</Mi></p>
          <p>
            Stałą <Mi>{"\\dfrac{25\\pi}{3}"}</Mi> wyciągamy przed nawias. Dla <Mi>{"f(h) = \\dfrac{h^3}{h^2 - 25}"}</Mi>{" "}
            stosujemy regułę ilorazu:
          </p>
          <Mb>
            {"f'(h) = \\frac{3h^2(h^2 - 25) - h^3 \\cdot 2h}{(h^2 - 25)^2} = \\frac{3h^4 - 75h^2 - 2h^4}{(h^2 - 25)^2} = \\frac{h^2(h^2 - 75)}{(h^2 - 25)^2}"}
          </Mb>
          <Mb>
            {"V'(h) = \\frac{25\\pi}{3} \\cdot \\frac{h^2(h^2 - 75)}{(h^2 - 25)^2}"}
          </Mb>

          <p className="font-semibold text-stone-800">Krok 2. Punkty stacjonarne</p>
          <p>
            W dziedzinie <Mi>{"h > 5"}</Mi> mamy <Mi>{"h^2 > 0"}</Mi> i <Mi>{"(h^2 - 25)^2 > 0"}</Mi>, więc{" "}
            <Mi>{"V'(h) = 0"}</Mi> wtedy i tylko wtedy, gdy <Mi>{"h^2 - 75 = 0"}</Mi>:
          </p>
          <Mb>{"h = 5\\sqrt{3} \\quad (\\text{ujemna wysokość odrzucamy})"}</Mb>

          <p className="font-semibold text-stone-800">Krok 3. Czy to minimum?</p>
          <p>
            Gdy <Mi>{"h \\to 5^+"}</Mi>, mianownik <Mi>{"h^2 - 25 \\to 0^+"}</Mi>, więc <Mi>{"V(h) \\to +\\infty"}</Mi>.
            Gdy <Mi>{"h \\to +\\infty"}</Mi>, <Mi>{"V(h) \\sim \\dfrac{25\\pi}{3} h \\to +\\infty"}</Mi>. Punkt{" "}
            <Mi>{"h = 5\\sqrt{3}"}</Mi> jest jedynym punktem stacjonarnym, więc tam funkcja osiąga minimum.
          </p>

          <p className="font-semibold text-stone-800">Krok 4. Minimalna objętość</p>
          <Mb>{"h = 5\\sqrt{3}, \\quad h^3 = 125 \\cdot 3\\sqrt{3} = 375\\sqrt{3}, \\quad h^2 - 25 = 50"}</Mb>
          <Mb>
            {"V_{\\min} = \\frac{\\pi}{3} \\cdot \\frac{25 \\cdot 375\\sqrt{3}}{50} = \\frac{\\pi}{3} \\cdot \\frac{9375\\sqrt{3}}{50} = \\frac{125\\pi\\sqrt{3}}{2}"}
          </Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">Odpowiedź:</p>
            <p className="mt-2">
              wysokość <Mi>{"h = 5\\sqrt{3}"}</Mi>, minimalna objętość{" "}
              <Mi>{"V_{\\min} = \\dfrac{125\\pi\\sqrt{3}}{2}"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Funkcja objętości <Mi>{"V"}</Mi> stożka w zależności od wysokości <Mi>{"h"}</Mi> tego stożka jest
        określona w przedziale <Mi>{"(5, +\\infty)"}</Mi> wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"V(h) = \\dfrac{\\pi}{3} \\cdot \\dfrac{25h^3}{h^2 - 25}"}</Mb>
      </div>
      <p className="font-semibold">
        Wyznacz wysokość stożka, dla którego objętość jest najmniejsza, oraz oblicz tę objętość. Zapisz
        obliczenia.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-2">
      <span className="text-xs text-stone-400 italic">{SOURCE}</span>
    </div>
  </div>
);
