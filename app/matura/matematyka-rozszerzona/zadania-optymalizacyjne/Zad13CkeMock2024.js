"use client";
import Image from "next/image";
import { SubTask, Mi, Mb, FormulaBox, SideWork } from "../_components";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, poziom rozszerzony, CKE, grudzień 2024";

export const Zad13CkeMock2024 = ({ number = "1", points = "0–6" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed space-y-3">
      <p>
        Funkcja <Mi>{"f"}</Mi> jest określona wzorem <Mi>{"f(x) = \\dfrac{12x - 84}{x - 8}"}</Mi> dla każdego{" "}
        <Mi>{"x \\in (-\\infty, 8)"}</Mi>.
      </p>
      <p>
        W układzie współrzędnych kartezjańskich <Mi>{"(x, y)"}</Mi> rozpatrujemy wszystkie czworokąty{" "}
        <Mi>{"OBCD"}</Mi>, w których:
      </p>
      <ul className="list-disc pl-5 space-y-1 font-normal">
        <li>
          wierzchołek <Mi>{"O"}</Mi> ma współrzędne <Mi>{"(0, 0)"}</Mi>
        </li>
        <li>
          wierzchołki <Mi>{"B"}</Mi> i <Mi>{"D"}</Mi> są punktami przecięcia wykresu funkcji <Mi>{"f"}</Mi> z
          osiami, odpowiednio, <Mi>{"O_x"}</Mi> i <Mi>{"O_y"}</Mi>
        </li>
        <li>
          wierzchołek <Mi>{"C"}</Mi> ma obie współrzędne dodatnie i leży na wykresie funkcji <Mi>{"f"}</Mi>{" "}
          (zobacz rysunek)
        </li>
      </ul>
      <figure className="my-4 flex flex-col items-center">
        <Image
          src="/matura/optymalizacja_cke_zad13.png"
          alt="Czworokąt OBCD: O w początku, B na osi Ox, D na Oy, C na wykresie y = f(x) między D a B"
          width={520}
          height={380}
          className="w-[25%] max-w-full h-auto rounded-lg border border-[#c4a8e8] bg-white"
        />
      </figure>
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            Wyznacz <Mi>{"B"}</Mi> (przecięcie z <Mi>{"O_x"}</Mi>) i <Mi>{"D"}</Mi> (przecięcie z <Mi>{"O_y"}</Mi>).
            Punkt <Mi>{"C"}</Mi> ma postać <Mi>{"(x, f(x))"}</Mi>, gdzie <Mi>{"x \\in (0, 7)"}</Mi>.
          </p>
          <p>
            Pole czworokąta <Mi>{"OBCD"}</Mi> zapisz jako sumę pól trójkątów <Mi>{"OBC"}</Mi> i{" "}
            <Mi>{"ODC"}</Mi> (wspólny wierzchołek <Mi>{"O"}</Mi>, boki na osiach).
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Punkty stałe B i D</p>
          <p>
            Przecięcie z <Mi>{"O_x"}</Mi>: <Mi>{"f(x) = 0"}</Mi>, więc <Mi>{"12x - 84 = 0"}</Mi> i{" "}
            <Mi>{"x = 7"}</Mi>. Stąd <Mi>{"B = (7, 0)"}</Mi>.
          </p>
          <p>
            Przecięcie z <Mi>{"O_y"}</Mi>: <Mi>{"f(0) = \\dfrac{-84}{-8} = \\dfrac{21}{2}"}</Mi>. Stąd{" "}
            <Mi>{"D = \\left(0, \\dfrac{21}{2}\\right)"}</Mi>.
          </p>
          <p>
            Punkt <Mi>{"C"}</Mi> leży na wykresie, więc <Mi>{"C = \\left(x, \\dfrac{12x - 84}{x - 8}\\right)"}</Mi>{" "}
            dla <Mi>{"x \\in (0, 7)"}</Mi>. Wygodnie zapisujemy:
          </p>
          <Mb>{"f(x) = \\dfrac{12(x - 7)}{x - 8}"}</Mb>

          <p className="font-semibold text-stone-800">Krok 2. Pole jako suma dwóch trójkątów</p>
          <p>
            Trójkąt <Mi>{"OBC"}</Mi>: podstawa <Mi>{"|OB| = 7"}</Mi> na osi <Mi>{"x"}</Mi>, wysokość to
            druga współrzędna punktu <Mi>{"C"}</Mi>, czyli <Mi>{"f(x)"}</Mi>:
          </p>
          <Mb>{"P_{OBC} = \\dfrac{1}{2} \\cdot 7 \\cdot f(x) = \\dfrac{7}{2} f(x)"}</Mb>
          <p>
            Trójkąt <Mi>{"ODC"}</Mi>: podstawa <Mi>{"|OD| = \\dfrac{21}{2}"}</Mi> na osi <Mi>{"y"}</Mi>,
            wysokość to pierwsza współrzędna punktu <Mi>{"C"}</Mi>, czyli <Mi>{"x"}</Mi>:
          </p>
          <Mb>{"P_{ODC} = \\dfrac{1}{2} \\cdot \\dfrac{21}{2} \\cdot x = \\dfrac{21}{4} x"}</Mb>
          <p>Pole czworokąta:</p>
          <Mb>{"P(x) = P_{OBC} + P_{ODC} = \\dfrac{7}{2} f(x) + \\dfrac{21}{4} x"}</Mb>

          <p className="font-semibold text-stone-800">Krok 3. Podstawienie i uproszczenie</p>
          <Mb>
            {
              "P(x) = \\dfrac{7}{2} \\cdot \\dfrac{12(x-7)}{x-8} + \\dfrac{21}{4}x = \\dfrac{42(x-7)}{x-8} + \\dfrac{21}{4}x"
            }
          </Mb>
          <p>Wspólny mianownik <Mi>{"4(x-8)"}</Mi>:</p>
          <Mb>
            {
              "P(x) = \\dfrac{168(x-7) + 21x(x-8)}{4(x-8)} = \\dfrac{168x - 1176 + 21x^2 - 168x}{4(x-8)} = \\dfrac{21(x^2 - 56)}{4(x-8)}"
            }
          </Mb>
          <FormulaBox>
            <Mb>{"P(x) = \\dfrac{21}{4} \\cdot \\dfrac{x^2 - 56}{x - 8} \\quad \\blacksquare"}</Mb>
          </FormulaBox>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że pole <Mi>{"P"}</Mi> czworokąta <Mi>{"OBCD"}</Mi> w zależności od pierwszej współrzędnej{" "}
        <Mi>{"x"}</Mi> punktu <Mi>{"C"}</Mi> jest określone wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(x) = \\dfrac{21}{4} \\cdot \\dfrac{x^2 - 56}{x - 8}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–4"
      answer={
        <p>
          <Mi>{"C = \\left(8 - 2\\sqrt{2},\\; 12 - 3\\sqrt{2}\\right)"}</Mi>
        </p>
      }
      hint={
        <div className="space-y-3">
          <p>
            Korzystasz ze wzoru z podpunktu <Mi>{"13.1"}</Mi> dla <Mi>{"x \\in (0, 7)"}</Mi>. Oblicz{" "}
            <Mi>{"P'(x)"}</Mi> (iloraz <Mi>{"\\dfrac{x^2 - 56}{x - 8}"}</Mi>) i rozwiąż{" "}
            <Mi>{"P'(x) = 0"}</Mi>.
          </p>
          <p>
            Sprawdź, który punkt stacjonarny leży w przedziale <Mi>{"(0, 7)"}</Mi> i czy tam jest maksimum
            (znak pochodnej). Na końcu wyznacz drugą współrzędną z <Mi>{"f(x)"}</Mi>.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Pochodna funkcji pola</p>
          <Mb>{"P(x) = \\dfrac{21}{4} \\cdot \\dfrac{x^2 - 56}{x - 8}"}</Mb>
          <p>Oznaczamy <Mi>{"g(x) = \\dfrac{x^2 - 56}{x - 8}"}</Mi>.</p>
          <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-start">
            <div className="flex-1 min-w-0 space-y-2">
              <Mb>
                {
                  "g'(x) = \\dfrac{2x(x-8) - (x^2 - 56)}{(x-8)^2} = \\dfrac{x^2 - 16x + 56}{(x-8)^2}"
                }
              </Mb>
              <Mb>{"P'(x) = \\dfrac{21}{4} \\cdot g'(x) = \\dfrac{21}{4} \\cdot \\dfrac{x^2 - 16x + 56}{(x-8)^2}"}</Mb>
            </div>
            <SideWork className="w-full xl:w-[min(100%,min(38rem,46vw))] xl:shrink-0" title={null}>
              <Mb>{"\\dfrac{d}{dx}(x^2 - 56) = 2x, \\quad \\dfrac{d}{dx}(x - 8) = 1"}</Mb>
            </SideWork>
          </div>

          <p className="font-semibold text-stone-800">Krok 2. Miejsca zerowe pochodnej</p>
          <p>
            Mianownik <Mi>{"(x-8)^2"}</Mi> jest dodatni. Zerujemy licznik:
          </p>
          <Mb>{"x^2 - 16x + 56 = 0"}</Mb>
          <Mb>{"\\Delta = 256 - 224 = 32, \\qquad x = \\dfrac{16 \\pm \\sqrt{32}}{2} = 8 \\pm 2\\sqrt{2}"}</Mb>
          <p>
            W przedziale <Mi>{"(0, 7)"}</Mi> zostaje tylko <Mi>{"x = 8 - 2\\sqrt{2}"}</Mi> (bo{" "}
            <Mi>{"8 + 2\\sqrt{2} > 8"}</Mi>).
          </p>

          <p className="font-semibold text-stone-800">Krok 3. Maksimum pola</p>
          <p>
            Dla <Mi>{"x \\in (0, 7)"}</Mi> liczymy znak <Mi>{"x^2 - 16x + 56"}</Mi> (parabola otwarta w górę,
            miejsca zerowe w <Mi>{"8 \\pm 2\\sqrt{2}"}</Mi>):
          </p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center w-full border-collapse my-2">
              <thead>
                <tr className="bg-[#f2ecfb]">
                  <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"x^2 - 16x + 56"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"P'(x)"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"P"}</Mi></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1">
                    <Mi>{"(0,\\; 8 - 2\\sqrt{2})"}</Mi>
                  </td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="border border-[#d4b8f0] px-3 py-1">
                    <Mi>{"(8 - 2\\sqrt{2},\\; 7)"}</Mi>
                  </td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">−</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            W <Mi>{"x = 8 - 2\\sqrt{2}"}</Mi> pole osiąga maksimum lokalne na <Mi>{"(0, 7)"}</Mi>.
          </p>

          <p className="font-semibold text-stone-800">Krok 4. Współrzędne punktu C</p>
          <p>Pierwsza współrzędna: <Mi>{"x = 8 - 2\\sqrt{2}"}</Mi>. Druga z wzoru na <Mi>{"f"}</Mi>:</p>
          <Mb>
            {
              "f(8 - 2\\sqrt{2}) = \\dfrac{12\\bigl((8 - 2\\sqrt{2}) - 7\\bigr)}{(8 - 2\\sqrt{2}) - 8} = \\dfrac{12(1 - 2\\sqrt{2})}{-2\\sqrt{2}} = 12 - 3\\sqrt{2}"
            }
          </Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">
              Odpowiedź: <Mi>{"C = \\left(8 - 2\\sqrt{2},\\; 12 - 3\\sqrt{2}\\right)"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Pole <Mi>{"P"}</Mi> czworokąta <Mi>{"OBCD"}</Mi> w zależności od pierwszej współrzędnej <Mi>{"x"}</Mi>{" "}
        punktu <Mi>{"C"}</Mi> jest określone wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(x) = \\dfrac{21}{4} \\cdot \\dfrac{x^2 - 56}{x - 8}"}</Mb>
      </div>
      <p>
        dla <Mi>{"x \\in (0, 7)"}</Mi>.
      </p>
      <p className="font-semibold">
        Oblicz współrzędne wierzchołka <Mi>{"C"}</Mi>, dla których pole czworokąta <Mi>{"OBCD"}</Mi> jest
        największe. Zapisz obliczenia.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE_CKE_MOCK_GRUDZIEN_2024}</span>
    </div>
  </div>
);
