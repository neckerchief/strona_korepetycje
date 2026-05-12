import { InlineMath, BlockMath } from "react-katex";
import { FormulaBox } from "../matura/matematyka-rozszerzona/_components";
import { LineDiagram, DiagramCwiartki, PolygonDiagram } from "./diagrams";

const Mi = ({ children }) => <InlineMath math={children} />;
const Mb = ({ children }) => <BlockMath math={children} />;

export const maturaStyleTasks = [
  {
    id: "fl-m-graf-rownolegla-prostopadla-1",
    number: "1",
    instruction: (
      <span>
        Znajdź te liczby <Mi>{"m"}</Mi>, dla których proste o równaniach{" "}
        <Mi>{"y = -3x + 7"}</Mi> oraz <Mi>{"y = (4m - 5)x - 7"}</Mi> są
        <span className="block mt-3 font-normal">
          a) równoległe,
        </span>
        <span className="block font-normal">b) prostopadłe.</span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"m = \\dfrac{1}{2}"}</Mi>
        </p>
        <p>
          b) <Mi>{"m = \\dfrac{4}{3}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dla prostych <Mi>{"y = a_1 x + b_1"}</Mi> oraz <Mi>{"y = a_2 x + b_2"}</Mi> ze współczynnikami kierunkowymi{" "}
          <Mi>{"a_1"}</Mi> i <Mi>{"a_2"}</Mi>:
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>równoległość:</strong> <Mi>{"a_1 = a_2"}</Mi> (przy różnych wyrazach wolnych dostajesz dwie różne proste);
          </li>
          <li>
            <strong>prostopadłość:</strong> <Mi>{"a_1 \\cdot a_2 = -1"}</Mi> (gdy żadna prosta nie jest pionowa).
          </li>
        </ul>
        <p className="text-stone-600 text-sm">
          Odczytaj <Mi>{"a_1"}</Mi> i <Mi>{"a_2"}</Mi> z równań, podstaw do warunku i rozwiąż proste równanie liniowe względem{" "}
          <Mi>{"m"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p>
          Współczynniki kierunkowe: <Mi>{"a_1 = -3"}</Mi>, <Mi>{"a_2 = 4m - 5"}</Mi>. Wyrazy wolne to{" "}
          <Mi>{"7"}</Mi> oraz <Mi>{"-7"}</Mi>, więc przy równych nachyleniach proste się nie pokrywają.
        </p>

        <p className="font-semibold text-stone-800">a) Warunek równoległości</p>
        <Mb>{"a_1 = a_2 \\quad \\Rightarrow \\quad -3 = 4m - 5"}</Mb>
        <Mb>{"4m = 2 \\quad \\Rightarrow \\quad m = \\dfrac{1}{2}"}</Mb>

        <p className="font-semibold text-stone-800">b) Warunek prostopadłości</p>
        <FormulaBox>
          <Mb>{"a_1 \\cdot a_2 = -1"}</Mb>
        </FormulaBox>
        <Mb>{"(-3)(4m - 5) = -1 \\quad \\Rightarrow \\quad 4m - 5 = \\dfrac{1}{3}"}</Mb>
        <Mb>{"4m = \\dfrac{16}{3} \\quad \\Rightarrow \\quad m = \\dfrac{4}{3}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"m = \\dfrac{1}{2}"}</Mi>; b) <Mi>{"m = \\dfrac{4}{3}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "fl-m-cwiartki-f-liniowa-2",
    number: "2",
    instruction: (
      <div className="space-y-4">
        <p className="font-semibold">
          Przez które ćwiartki płaszczyzny z układem współrzędnych przechodzi wykres funkcji{" "}
          <Mi>{"f(x)=ax+b"}</Mi>, jeżeli:
        </p>
        <div className="rounded-xl border border-stone-200 bg-[#fafaf9] p-4 max-w-[340px] mx-auto shadow-sm">
          <DiagramCwiartki />
          <p className="text-center text-xs text-stone-500 mt-2 font-normal">
            Ćwiartki oznaczone jak w ćwiczeniach, możesz nanieść szkic prostej na kartce obok.
          </p>
        </div>
        <ul className="list-none space-y-2 pl-0 m-0 font-normal">
          <li>
            a) <Mi>{"a>0"}</Mi> i <Mi>{"b=0"}</Mi>
          </li>
          <li>
            b) <Mi>{"a=0"}</Mi> i <Mi>{"b>0"}</Mi>
          </li>
          <li>
            c) <Mi>{"a>0"}</Mi> i <Mi>{"b<0"}</Mi>
          </li>
          <li>
            d) <Mi>{"a<0"}</Mi> i <Mi>{"b>0"}</Mi>
          </li>
        </ul>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-2 text-sm">
        <p>
          a) przez <strong>I</strong> i <strong>III</strong> (prosta przechodzi przez początek układu),
        </p>
        <p>
          b) przez <strong>I</strong> i <strong>II</strong>,
        </p>
        <p>
          c) przez <strong>I</strong>, <strong>III</strong> i <strong>IV</strong>,
        </p>
        <p>
          d) przez <strong>I</strong>, <strong>II</strong> i <strong>IV</strong>.
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Zastanów się nad geometrycznym znaczeniem warunków:</p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <Mi>{"b=0"}</Mi>: wykres przechodzi przez początek; <Mi>{"a>0"}</Mi>: prosta „idzie w górę” od lewej do prawej.
          </li>
          <li>
            <Mi>{"a=0"}</Mi>: funkcja stała, pozioma prosta; <Mi>{"b>0"}</Mi>: nad osią <Mi>{"Ox"}</Mi>.
          </li>
          <li>
            <Mi>{"a>0"}</Mi> i <Mi>{"b<0"}</Mi>: przecina oś <Mi>{"Oy"}</Mi> pod zerem, „wspina się” w prawo.
          </li>
          <li>
            <Mi>{"a<0"}</Mi> i <Mi>{"b>0"}</Mi>: zaczyna wysoko przy małych <Mi>{"x"}</Mi>, „schodzi” w prawo.
          </li>
        </ul>
        <p className="text-stone-600 text-sm">
          Zaznacz na szkicu jeden typowy przykład (np. konkretne <Mi>{"a,b"}</Mi> spełniające warunek) i odczytaj ćwiartki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a) <Mi>{"a>0"}</Mi>, <Mi>{"b=0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek spełniający warunki: np. <Mi>{"a=1"}</Mi>, <Mi>{"b=0"}</Mi>, czyli <Mi>{"y=x"}</Mi>. Patrząc na
          wykres, prosta przechodzi przez ćwiartki <strong>I</strong> i <strong>III</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-a"
            a={1}
            b={0}
            showQuadrants
            xRange={[-3.5, 4]}
            yRange={[-3.5, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=x"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">b) <Mi>{"a=0"}</Mi>, <Mi>{"b>0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"b=2"}</Mi> (<Mi>{"a=0"}</Mi>), czyli <Mi>{"y=2"}</Mi>. Z rysunku widać ćwiartki{" "}
          <strong>I</strong> i <strong>II</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-b"
            a={0}
            b={2}
            showQuadrants
            xRange={[-5, 5]}
            yRange={[-2, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=2"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">c) <Mi>{"a>0"}</Mi>, <Mi>{"b<0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"a=1"}</Mi>, <Mi>{"b=-2"}</Mi>, czyli <Mi>{"y=x-2"}</Mi>. Patrząc na wykres:
          ćwiartki <strong>I</strong>, <strong>III</strong> i <strong>IV</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-c"
            a={1}
            b={-2}
            showQuadrants
            xRange={[-4, 5]}
            yRange={[-4, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=x-2"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">d) <Mi>{"a<0"}</Mi>, <Mi>{"b>0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"a=-1"}</Mi>, <Mi>{"b=2"}</Mi>, czyli <Mi>{"y=-x+2"}</Mi>. Z rysunku:
          ćwiartki <strong>I</strong>, <strong>II</strong> i <strong>IV</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-d"
            a={-1}
            b={2}
            showQuadrants
            xRange={[-5, 6]}
            yRange={[-4, 5]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=-x+2"}</Mi>
          </p>
        </div>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) I i III; b) I i II; c) I, III i IV; d) I, II i IV.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-152-rownolegla-przez-punkt",
    number: "3",
    instruction: (
      <span>
        Punkt <Mi>{"S = \\left(\\dfrac{3}{4},\\, \\dfrac{1}{2}\\right)"}</Mi> należy do prostej{" "}
        <Mi>{"k"}</Mi>, która jest równoległa do prostej o równaniu <Mi>{"y = -2x - 7"}</Mi>. Znajdź równanie prostej{" "}
        <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = -2x + 2"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Prosta równoległa ma ten sam współczynnik kierunkowy. Wyraz wolny dobierz tak, żeby wykres przechodził przez{" "}
        <Mi>{"S"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Dana prosta ma <Mi>{"a = -2"}</Mi>, więc <Mi>{"k \\colon y = -2x + b"}</Mi>.
        </p>
        <p>
          Punkt <Mi>{"S"}</Mi> należy do <Mi>{"k"}</Mi>:
        </p>
        <Mb>{"\\dfrac{1}{2} = -2 \\cdot \\dfrac{3}{4} + b \\quad \\Rightarrow \\quad \\dfrac{1}{2} = -\\dfrac{3}{2} + b \\quad \\Rightarrow \\quad b = 2"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = -2x + 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-153-prostopadla-przez-punkt-oy",
    number: "4",
    instruction: (
      <span>
        Prosta <Mi>{"k"}</Mi> przecina oś <Mi>{"OY"}</Mi> w punkcie <Mi>{"P = (0,\\, 7)"}</Mi> i jest prostopadła do prostej o
        równaniu <Mi>{"y = 0{,}4x + 0{,}6"}</Mi>. Znajdź równanie prostej <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = -\\dfrac{5}{2}x + 7"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Współczynniki kierunkowe prostych prostopadłych (niepionowych) spełniają <Mi>{"a_1 a_2 = -1"}</Mi>. Punkt{" "}
        <Mi>{"(0,7)"}</Mi> to przecięcie z <Mi>{"Oy"}</Mi>, czyli wyraz wolny w postaci <Mi>{"y = ax + b"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Dana prosta ma <Mi>{"a_2 = 0{,}4 = \\dfrac{2}{5}"}</Mi>. Prostopadłość:{" "}
          <Mi>{"a_1 \\cdot \\dfrac{2}{5} = -1"}</Mi>, stąd <Mi>{"a_1 = -\\dfrac{5}{2}"}</Mi>.
        </p>
        <p>
          Prosta <Mi>{"k"}</Mi> ma postać <Mi>{"y = -\\dfrac{5}{2}x + b"}</Mi> i przechodzi przez <Mi>{"(0,7)"}</Mi>, więc{" "}
          <Mi>{"b = 7"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = -\\dfrac{5}{2}x + 7"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-154-prosta-przez-dwa-punkty",
    number: "5",
    instruction: (
      <span>
        Prosta <Mi>{"k"}</Mi> zawiera odcinek, którego końcami są punkty <Mi>{"A = (0,\\, -3)"}</Mi> oraz{" "}
        <Mi>{"B = (1,\\, 1)"}</Mi>. Znajdź równanie prostej <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = 4x - 3"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Wyznacz współczynnik kierunkowy z punktów <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem podstaw jeden z punktów do{" "}
        <Mi>{"y = ax + b"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <Mb>{"a = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{1 - (-3)}{1 - 0} = 4"}</Mb>
        <p>
          Prosta <Mi>{"y = 4x + b"}</Mi>; punkt <Mi>{"A(0,-3)"}</Mi> daje <Mi>{"b = -3"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = 4x - 3"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-155-wspolliniowosc",
    number: "6",
    instruction: (
      <span>
        Sprawdź, czy punkty <Mi>{"A = (0,\\, -4)"}</Mi>, <Mi>{"B = (2,\\, 0)"}</Mi>,{" "}
        <Mi>{"C = (202,\\, 400)"}</Mi> są współliniowe.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        Tak, punkty są współliniowe (lezą na jednej prostej).
      </p>
    ),
    hint: (
      <p className="text-sm">
        Najpierw wyznacz równanie prostej przechodzącej przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem sprawdź, czy współrzędne{" "}
        <Mi>{"C"}</Mi> spełniają to równanie (czy <Mi>{"C"}</Mi> leży na tej prostej).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-stone-800">Krok 1. Prosta przechodząca przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi></p>
        <p>
          Współczynnik kierunkowy:
        </p>
        <Mb>{"a = \\dfrac{0 - (-4)}{2 - 0} = 2"}</Mb>
        <p>
          Szukamy <Mi>{"y = 2x + b"}</Mi>. Punkt <Mi>{"A(0,\\,-4)"}</Mi>:
        </p>
        <Mb>{"-4 = 2 \\cdot 0 + b \\quad \\Rightarrow \\quad b = -4"}</Mb>
        <p>
          Prosta <Mi>{"AB"}</Mi>: <Mi>{"y = 2x - 4"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Czy <Mi>{"C"}</Mi> leży na prostej <Mi>{"AB"}</Mi>?</p>
        <p>
          Podstawiamy <Mi>{"x = 202"}</Mi> do <Mi>{"y = 2x - 4"}</Mi>:
        </p>
        <Mb>{"y = 2 \\cdot 202 - 4 = 404 - 4 = 400"}</Mb>
        <p>
          Rzędna punktu <Mi>{"C"}</Mi> też wynosi <Mi>{"400"}</Mi>, więc <Mi>{"C"}</Mi> należy do prostej <Mi>{"AB"}</Mi>. Punkty{" "}
          <Mi>{"A,B,C"}</Mi> są współliniowe.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź: tak, są współliniowe.</p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-156-punkt-rzedna-wieksza",
    number: "7",
    instruction: (
      <span>
        Znajdź współrzędne takiego punktu należącego do prostej o równaniu <Mi>{"y = 3x + 2"}</Mi>, którego rzędna jest o 10
        większa od odciętej.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"(4,\\, 14)"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        „Rzędna o 10 większa od odciętej” zapisz jako zależność między <Mi>{"x"}</Mi> i <Mi>{"y"}</Mi>, potem połącz z{" "}
        <Mi>{"y = 3x + 2"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Warunek: <Mi>{"y = x + 10"}</Mi>. Jednocześnie <Mi>{"y = 3x + 2"}</Mi>:
        </p>
        <Mb>{"3x + 2 = x + 10 \\quad \\Rightarrow \\quad 2x = 8 \\quad \\Rightarrow \\quad x = 4"}</Mb>
        <Mb>{"y = 4 + 10 = 14"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"(4,\\, 14)"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-167-trzy-proste-jeden-punkt",
    number: "8",
    instruction: (
      <span>
        Dane są funkcje <Mi>{"f(x) = 3x - 2"}</Mi>, <Mi>{"g(x) = -\\dfrac{1}{2}x + 5"}</Mi> oraz{" "}
        <Mi>{"h(x) = ax + 3"}</Mi>. Dla jakiej liczby <Mi>{"a"}</Mi> wykresy <Mi>{"f"}</Mi>, <Mi>{"g"}</Mi> i <Mi>{"h"}</Mi>{" "}
        przecinają się w jednym wspólnym punkcie (wszystkie trzy proste przechodzą przez ten sam punkt)?
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"a = \\dfrac{1}{2}"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Najpierw znajdź punkt przecięcia dwóch prostych o znanych wzorach (<Mi>{"f"}</Mi> i <Mi>{"g"}</Mi>). Potem dobierz{" "}
        <Mi>{"a"}</Mi> tak, żeby trzecia prosta (<Mi>{"h"}</Mi>) też przechodziła przez ten punkt.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-stone-800">Wspólny punkt <Mi>{"f"}</Mi> i <Mi>{"g"}</Mi></p>
        <Mb>{"3x - 2 = -\\dfrac{1}{2}x + 5"}</Mb>
        <Mb>{"6x - 4 = -x + 10 \\quad \\Rightarrow \\quad 7x = 14 \\quad \\Rightarrow \\quad x = 2"}</Mb>
        <Mb>{"y = f(2) = 3 \\cdot 2 - 2 = 4"}</Mb>
        <p>
          Punkt przecięcia: <Mi>{"(2,\\, 4)"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Warunek na <Mi>{"h"}</Mi>
        </p>
        <p>
          Wykres <Mi>{"h"}</Mi> musi przechodzić przez <Mi>{"(2,\\, 4)"}</Mi>:
        </p>
        <Mb>{"4 = a \\cdot 2 + 3 \\quad \\Rightarrow \\quad 2a = 1 \\quad \\Rightarrow \\quad a = \\dfrac{1}{2}"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"a = \\dfrac{1}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-168-odcinek-przeciecie-oy",
    number: "9",
    instruction: (
      <span>
        Odcinek o końcach <Mi>{"A = (-2,\\, 5)"}</Mi> i <Mi>{"B = (3,\\, 1)"}</Mi> jest wykresem funkcji <Mi>{"f"}</Mi>. Znajdź
        współrzędne punktu wspólnego wykresu funkcji <Mi>{"f"}</Mi> i osi <Mi>{"OY"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"\\left(0,\\, \\dfrac{17}{5}\\right)"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Wyznacz równanie prostej przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem podstaw <Mi>{"x = 0"}</Mi> (oś <Mi>{"OY"}</Mi>).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <Mb>{"a = \\dfrac{1 - 5}{3 - (-2)} = \\dfrac{-4}{5}"}</Mb>
        <p>
          Prosta <Mi>{"y = -\\dfrac{4}{5}x + b"}</Mi>; punkt <Mi>{"A(-2,\\, 5)"}</Mi>:
        </p>
        <Mb>{"5 = -\\dfrac{4}{5} \\cdot (-2) + b = \\dfrac{8}{5} + b \\quad \\Rightarrow \\quad b = \\dfrac{17}{5}"}</Mb>
        <p>
          <Mi>{"f(x) = -\\dfrac{4}{5}x + \\dfrac{17}{5}"}</Mi>. Na osi <Mi>{"OY"}</Mi> jest <Mi>{"x = 0"}</Mi>:
        </p>
        <Mb>{"y = \\dfrac{17}{5}"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\left(0,\\, \\dfrac{17}{5}\\right)"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-169-miejsce-zero-wlasnosc",
    number: "10",
    instruction: (
      <span>
        Miejscem zerowym funkcji <Mi>{"f(x) = -2x + b"}</Mi> jest liczba <Mi>{"1{,}5"}</Mi>.
        <span className="block mt-3 font-normal">a) Wyznacz wartość współczynnika <Mi>{"b"}</Mi>.</span>
        <span className="block font-normal mt-1">
          b) Dla jakich argumentów wartości funkcji <Mi>{"f"}</Mi> są większe od wartości funkcji{" "}
          <Mi>{"g(x) = 3x - 7"}</Mi>?
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"b = 3"}</Mi>
        </p>
        <p>
          b) <Mi>{"x < 2"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Miejsce zerowe to taki argument, przy którym wartość funkcji wynosi zero.
        </p>
        <p>
          b) Rozwiąż nierówność <Mi>{"f(x) > g(x)"}</Mi> dla już znanego <Mi>{"b"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"f(1{,}5) = 0 \\quad \\Rightarrow \\quad -2 \\cdot 1{,}5 + b = 0 \\quad \\Rightarrow \\quad b = 3"}</Mb>
        <p>
          Zatem <Mi>{"f(x) = -2x + 3"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">b)</p>
        <Mb>{"-2x + 3 > 3x - 7"}</Mb>
        <Mb>{"10 > 5x \\quad \\Rightarrow \\quad x < 2"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"b = 3"}</Mi>; b) dla <Mi>{"x < 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-parametr-b-nierownosci",
    number: "11",
    instruction: (
      <span>
        Funkcja jest określona wzorem <Mi>{"f(x) = 3x + b"}</Mi>.
        <span className="block mt-3 font-normal">
          a) Wyznacz te wartości współczynnika <Mi>{"b"}</Mi>, dla których wartość funkcji <Mi>{"f"}</Mi> przyjmowana dla
          argumentu <Mi>{"5"}</Mi> jest mniejsza od <Mi>{"2"}</Mi>.
        </span>
        <span className="block font-normal mt-1">
          b) Wyznacz te wartości współczynnika <Mi>{"b"}</Mi>, dla których miejsce zerowe funkcji <Mi>{"f"}</Mi> jest większe
          od <Mi>{"3{,}5"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"b < -13"}</Mi>
        </p>
        <p>
          b) <Mi>{"b < -\\dfrac{21}{2}"}</Mi> (czyli <Mi>{"b < -10{,}5"}</Mi>)
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Zapisz <Mi>{"f(5)"}</Mi> przez <Mi>{"b"}</Mi> i rozwiąż nierówność <Mi>{"f(5) < 2"}</Mi>.
        </p>
        <p>
          b) Wyraź miejsce zerowe (argument, przy którym <Mi>{"f(x)=0"}</Mi>) przez <Mi>{"b"}</Mi>, potem porównaj z{" "}
          <Mi>{"3{,}5"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"f(5) = 3 \\cdot 5 + b = 15 + b"}</Mb>
        <Mb>{"15 + b < 2 \\quad \\Rightarrow \\quad b < -13"}</Mb>

        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Miejsce zerowe <Mi>{"x_0"}</Mi>: <Mi>{"3x_0 + b = 0"}</Mi>, stąd <Mi>{"x_0 = -\\dfrac{b}{3}"}</Mi>.
        </p>
        <Mb>{"-\\dfrac{b}{3} > 3{,}5 = \\dfrac{7}{2}"}</Mb>
        <p>Mnożymy obie strony przez <Mi>{"3"}</Mi>:</p>
        <Mb>{"-b > \\dfrac{21}{2}"}</Mb>
        <p>Po pomnożeniu przez <Mi>{"(-1)"}</Mi> nierówność zmienia zwrot:</p>
        <Mb>{"b < -\\dfrac{21}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"b < -13"}</Mi>; b) <Mi>{"b < -\\dfrac{21}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-mc-znaki-ab-wykres",
    number: "12",
    instruction: (
      <div className="space-y-4 font-normal">
        <p>
          Niech <Mi>{"f"}</Mi> będzie funkcją liniową <Mi>{"f(x) = ax + b"}</Mi>, gdzie <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> są liczbami
          rzeczywistymi. Na rysunku w kartezjańskim układzie <Mi>{"(x,y)"}</Mi> zaznaczono prostą będącą wykresem{" "}
          <Mi>{"f"}</Mi>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[300px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m12-znaki"
            a={-1}
            b={4}
            xRange={[-2, 7]}
            yRange={[-2, 7]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-2">Na rysunku fioletowa prosta to wykres <Mi>{"f"}</Mi>.</p>
        </div>
        <p className="font-semibold text-stone-800">
          Dokończ zdanie. Wybierz właściwą odpowiedź. Współczynniki <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> we wzorze funkcji{" "}
          <Mi>{"f"}</Mi> spełniają warunki
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: [
      "A. a > 0 i b > 0",
      "B. a > 0 i b < 0",
      "C. a < 0 i b > 0",
      "D. a < 0 i b < 0",
    ],
    answer: (
      <p>
        Prawidłowa odpowiedź: <strong>C</strong>.
      </p>
    ),
    hint: (
      <p className="text-sm">
        Z samego rysunku odczytaj: czy funkcja rośnie, czy maleje (to znak <Mi>{"a"}</Mi>), oraz gdzie prosta przecina oś{" "}
        <Mi>{"Oy"}</Mi> (to pomaga ustalić znak <Mi>{"b"}</Mi>).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Prosta idzie „w dół” przy większym <Mi>{"x"}</Mi>, więc jest malejąca i <Mi>{"a < 0"}</Mi>.
        </p>
        <p>
          Przecięcie z osią <Mi>{"Oy"}</Mi> leży ponad początkiem układu (dodatnia rzędna punktu przecięcia), więc{" "}
          <Mi>{"b > 0"}</Mi>.
        </p>
        <p>
          Pasuje odpowiedź <strong>C</strong>.
        </p>
      </div>
    ),
  },

  {
    id: "fl-wykres-prosta-trojkat-osiowe",
    number: "13",
    instruction: (
      <div className="space-y-4 font-normal">
        <p>
          Funkcja liniowa <Mi>{"f"}</Mi> ma wykres w postaci prostej jak na rysunku. Wiadomo, że przecina ona oś <Mi>{"Oy"}</Mi>{" "}
          w punkcie <Mi>{"(0,\\, 2)"}</Mi>, a oś <Mi>{"Ox"}</Mi> w punkcie <Mi>{"(-6,\\, 0)"}</Mi>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[300px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m13-prosta"
            a={1 / 3}
            b={2}
            squareGrid
            xRange={[-7, 2]}
            yRange={[-3, 6]}
            pts={[
              { x: -6, y: 0, label: "(-6, 0)", dx: -44, dy: 14 },
              { x: 0, y: 2, label: "(0, 2)", dx: 8, dy: -8 },
            ]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-2">wykres <Mi>{"f"}</Mi></p>
        </div>
        <span className="block font-semibold text-stone-800 mt-3">
          a) Wyznacz współczynnik kierunkowy prostej będącej wykresem <Mi>{"f"}</Mi>.
        </span>
        <span className="block font-semibold text-stone-800 mt-3">
          b) Oblicz pole trójkąta ograniczonego osiami <Mi>{"Ox"}</Mi>, <Mi>{"Oy"}</Mi> oraz wykresem funkcji <Mi>{"f"}</Mi>.
        </span>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"a = \\dfrac{1}{3}"}</Mi>
        </p>
        <p>
          b) <Mi>{"P = 6"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Współczynnik kierunkowy znajdziesz np. z dwóch punktów leżących na prostej (np. przecięć z osiami).
        </p>
        <p>
          b) Trójkąt przy początku układu jest prostokątny: obie przyprostokątne leżą na osiach. Ich długości to wartości
          bezwzględne odciętych punktów przecięcia z <Mi>{"Ox"}</Mi> i <Mi>{"Oy"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <p>
          Z punktów <Mi>{"(-6,\\,0)"}</Mi> i <Mi>{"(0,\\,2)"}</Mi>:
        </p>
        <Mb>{"a = \\dfrac{2 - 0}{0 - (-6)} = \\dfrac{2}{6} = \\dfrac{1}{3}"}</Mb>
        <p>
          (Zgodnie z tym <Mi>{"f(x) = \\dfrac{1}{3}x + 2"}</Mi>.)
        </p>

        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Trójkąt ma wierzchołki <Mi>{"O = (0,0)"}</Mi>, <Mi>{"(-6,\\,0)"}</Mi>, <Mi>{"(0,\\,2)"}</Mi>. Kąt prosty jest w{" "}
          <Mi>{"O"}</Mi>, więc
        </p>
        <Mb>{"P = \\dfrac{1}{2} \\cdot |-6| \\cdot 2 = 6"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"a = \\dfrac{1}{3}"}</Mi>; b) <Mi>{"P = 6"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-monotonicznosc-parametr-m",
    number: "14",
    instruction: (
      <span>
        Funkcja liniowa jest określona wzorem <Mi>{"f(x) = (m + 1)x - 4"}</Mi>, gdzie <Mi>{"m"}</Mi> jest parametrem.
        <span className="block mt-3 font-normal">
          a) Wyznacz wszystkie wartości <Mi>{"m"}</Mi>, dla których funkcja <Mi>{"f"}</Mi> jest ściśle malejąca w zbiorze liczb rzeczywistych.
        </span>
        <span className="block font-normal mt-1">
          b) Czy istnieje wartość <Mi>{"m"}</Mi>, dla której funkcja <Mi>{"f"}</Mi> jest stała? Jeśli tak, podaj takie{" "}
          <Mi>{"m"}</Mi> oraz wzór funkcji <Mi>{"f"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"m < -1"}</Mi>
        </p>
        <p>
          b) tak: <Mi>{"m = -1"}</Mi>, <Mi>{"f(x) = -4"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          Dla <Mi>{"f(x)=ax+b"}</Mi> funkcja jest ściśle malejąca, gdy <Mi>{"a < 0"}</Mi>, ściśle rosnąca, gdy <Mi>{"a > 0"}</Mi>, a stała,
          gdy <Mi>{"a = 0"}</Mi>. U Ciebie <Mi>{"a = m + 1"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <p>
          Współczynnik kierunkowy to <Mi>{"m + 1"}</Mi>. Ścisła malejącość na <Mi>{"\\mathbb{R}"}</Mi> oznacza <Mi>{"m + 1 < 0"}</Mi>, czyli{" "}
          <Mi>{"m < -1"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Funkcja liniowa jest stała, gdy współczynnik przy <Mi>{"x"}</Mi> znika: <Mi>{"m + 1 = 0"}</Mi>, stąd <Mi>{"m = -1"}</Mi>. Wtedy{" "}
          <Mi>{"f(x) = 0 \\cdot x - 4 = -4"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"m < -1"}</Mi>; b) tak, <Mi>{"m = -1"}</Mi>, <Mi>{"f(x) = -4"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-ogolne-osie-postac-kierunkowa",
    number: "15",
    instruction: (
      <span>
        Prosta <Mi>{"k"}</Mi> ma równanie ogólne <Mi>{"3x + 2y - 12 = 0"}</Mi>.
        <span className="block mt-3 font-normal">
          a) Zapisz równanie prostej <Mi>{"k"}</Mi> w postaci kierunkowej <Mi>{"y = ax + b"}</Mi>.
        </span>
        <span className="block font-normal mt-1">
          b) Podaj współrzędne punktów przecięcia prostej <Mi>{"k"}</Mi> z osiami układu <Mi>{"Ox"}</Mi> oraz <Mi>{"Oy"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"y = -\\dfrac{3}{2}x + 6"}</Mi>
        </p>
        <p>
          b) z <Mi>{"Ox"}</Mi>: <Mi>{"(4,\\, 0)"}</Mi>; z <Mi>{"Oy"}</Mi>: <Mi>{"(0,\\, 6)"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          Wyraź <Mi>{"y"}</Mi> z równania ogólnego. Na osi <Mi>{"Ox"}</Mi> podstaw <Mi>{"y = 0"}</Mi>, na osi <Mi>{"Oy"}</Mi> podstaw{" "}
          <Mi>{"x = 0"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"3x + 2y - 12 = 0 \\quad \\Rightarrow \\quad 2y = -3x + 12 \\quad \\Rightarrow \\quad y = -\\dfrac{3}{2}x + 6"}</Mb>
        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Przecięcie z <Mi>{"Ox"}</Mi> (<Mi>{"y = 0"}</Mi>): <Mi>{"3x - 12 = 0"}</Mi>, stąd <Mi>{"x = 4"}</Mi>, punkt <Mi>{"(4,\\, 0)"}</Mi>.
        </p>
        <p>
          Przecięcie z <Mi>{"Oy"}</Mi> (<Mi>{"x = 0"}</Mi>): <Mi>{"2y - 12 = 0"}</Mi>, stąd <Mi>{"y = 6"}</Mi>, punkt <Mi>{"(0,\\, 6)"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"y = -\\dfrac{3}{2}x + 6"}</Mi>; b) <Mi>{"(4,\\, 0)"}</Mi> oraz <Mi>{"(0,\\, 6)"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-pion-poziom-odleglosc-rownolegla",
    number: "16",
    instruction: (
      <span>
        W kartezjańskim układzie współrzędnych dane są proste <Mi>{"p \\colon x = -1"}</Mi> oraz <Mi>{"q \\colon y = 4"}</Mi>. Zapisz równanie
        prostej przechodzącej przez punkt przecięcia prostych <Mi>{"p"}</Mi> i <Mi>{"q"}</Mi>, która jest równoległa do prostej{" "}
        <Mi>{"y = 2x"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"y = 2x + 6"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Prosta <Mi>{"p"}</Mi> jest pionowa, <Mi>{"q"}</Mi> pozioma: ich punkt wspólny ma odciętę jak dla <Mi>{"p"}</Mi> i rzędną jak dla{" "}
        <Mi>{"q"}</Mi>. Równoległość do <Mi>{"y = 2x"}</Mi> oznacza ten sam współczynnik kierunkowy <Mi>{"2"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Punkt przecięcia prostych <Mi>{"x = -1"}</Mi> i <Mi>{"y = 4"}</Mi> to <Mi>{"(-1,\\, 4)"}</Mi>.
        </p>
        <p>
          Szukana prosta ma postać <Mi>{"y = 2x + b"}</Mi> (równoległość do <Mi>{"y = 2x"}</Mi>). Punkt <Mi>{"(-1,\\, 4)"}</Mi> leży na niej:
        </p>
        <Mb>{"4 = 2 \\cdot (-1) + b \\quad \\Rightarrow \\quad b = 6"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = 2x + 6"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-ogolne-rownolegla-prostopadla-parametr-a",
    number: "17",
    instruction: (
      <span>
        Dane są proste <Mi>{"k \\colon 4x + 2y - 1 = 0"}</Mi> oraz <Mi>{"\\ell \\colon ax + 8y + 3 = 0"}</Mi>, gdzie{" "}
        <Mi>{"a"}</Mi> jest parametrem rzeczywistym.
        <span className="block mt-3 font-normal">
          a) Wyznacz wartość <Mi>{"a"}</Mi>, przy której proste <Mi>{"k"}</Mi> i <Mi>{"\\ell"}</Mi> są równoległe.
        </span>
        <span className="block font-normal mt-1">
          b) Wyznacz wartość <Mi>{"a"}</Mi>, przy której proste <Mi>{"k"}</Mi> i <Mi>{"\\ell"}</Mi> są prostopadłe.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"a = 16"}</Mi>
        </p>
        <p>
          b) <Mi>{"a = -4"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <p className="text-sm">
        Przekształć oba równania do postaci <Mi>{"y = \\ldots"}</Mi>, odczytaj współczynniki kierunkowe i zastosuj warunki na równoległość oraz
        prostopadłość prostych niepionowych.
      </p>
    ),
    solution: (
      <div className="space-y-4">
        <p>
          Z <Mi>{"k"}</Mi>:
        </p>
        <Mb>{"4x + 2y - 1 = 0 \\quad \\Rightarrow \\quad y = -2x + \\dfrac{1}{2}"}</Mb>
        <p>
          Z <Mi>{"\\ell"}</Mi>:
        </p>
        <Mb>{"ax + 8y + 3 = 0 \\quad \\Rightarrow \\quad y = -\\dfrac{a}{8}x - \\dfrac{3}{8}"}</Mb>
        <p className="font-semibold text-stone-800">a) Równoległość</p>
        <Mb>{"-\\dfrac{a}{8} = -2 \\quad \\Rightarrow \\quad a = 16"}</Mb>
        <p className="font-semibold text-stone-800">b) Prostopadłość</p>
        <Mb>{"(-2) \\cdot \\left(-\\dfrac{a}{8}\\right) = -1 \\quad \\Rightarrow \\quad \\dfrac{a}{4} = -1 \\quad \\Rightarrow \\quad a = -4"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"a = 16"}</Mi>; b) <Mi>{"a = -4"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-wierzcholki-trapez-rownolegle-boki",
    number: "18",
    instruction: (
      <span>
        Punkty <Mi>{"A = (-2,\\, 0)"}</Mi>, <Mi>{"B = (4,\\, 0)"}</Mi>, <Mi>{"C = (6,\\, 5)"}</Mi>,{" "}
        <Mi>{"D = (0,\\, 5)"}</Mi> są wierzchołkami czworokąta <Mi>{"ABCD"}</Mi> (w kolejności podanej na liście).
        <span className="block mt-3 font-normal">
          a) Udowodnij, że odcinki <Mi>{"AB"}</Mi> oraz <Mi>{"CD"}</Mi> są do siebie równoległe (wykorzystaj nachylenia prostych{" "}
          przechodzących przez te odcinki).
        </span>
        <span className="block font-normal mt-1">
          b) Oblicz pole czworokąta <Mi>{"ABCD"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>a) oba odcinki mają nachylenie <Mi>{"0"}</Mi> (proste poziome), więc <Mi>{"AB \\parallel CD"}</Mi>.</p>
        <p>
          b) <Mi>{"P = 30"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          Nachylenie prostej przez <Mi>{"(x_1,y_1)"}</Mi> i <Mi>{"(x_2,y_2)"}</Mi> (gdy <Mi>{"x_1 \\neq x_2"}</Mi>):{" "}
          <Mi>{"\\dfrac{y_2 - y_1}{x_2 - x_1}"}</Mi>. Do pola w b): najpierw narysuj czworokąt w układzie współrzędnych, zaznacz wierzchołki w kolejności <Mi>{"A,B,C,D"}</Mi> i połącz je odcinkami, wtedy od razu widać, jak policzyć pole (np. równoległobok albo trapez o podstawach na dwóch poziomych prostych).
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"a_{AB} = \\dfrac{0 - 0}{4 - (-2)} = 0"}</Mb>
        <Mb>{"a_{CD} = \\dfrac{5 - 5}{0 - 6} = 0"}</Mb>
        <p>
          Ponieważ nachylenia są równe, proste zawierające <Mi>{"AB"}</Mi> oraz <Mi>{"CD"}</Mi> są równoległe, więc{" "}
          <Mi>{"AB \\parallel CD"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Rysunek czworokąta <Mi>{"ABCD"}</Mi> w kolejności z treści zadania (odcinki <Mi>{"AB"}</Mi>, <Mi>{"BC"}</Mi>, <Mi>{"CD"}</Mi>,{" "}
          <Mi>{"DA"}</Mi>):
        </p>
        <PolygonDiagram
          vertices={[
            { x: -2, y: 0, label: "A", dx: -14, dy: 12, anchor: "end" },
            { x: 4, y: 0, label: "B", dx: 6, dy: 12 },
            { x: 6, y: 5, label: "C", dx: 6, dy: -4 },
            { x: 0, y: 5, label: "D", dx: -18, dy: -4, anchor: "end" },
          ]}
          xRange={[-3, 7]}
          yRange={[-0.5, 6]}
        />
        <p>
          Z rysunku (i współrzędnych): odcinek <Mi>{"AB"}</Mi> leży na prostej <Mi>{"y = 0"}</Mi>, ma długość{" "}
          <Mi>{"4 - (-2) = 6"}</Mi>. Prosta <Mi>{"CD"}</Mi> ma równanie <Mi>{"y = 5"}</Mi>, odcinek <Mi>{"CD"}</Mi> ma długość{" "}
          <Mi>{"6 - 0 = 6"}</Mi>. Odległość między prostymi równoległymi <Mi>{"y = 0"}</Mi> i <Mi>{"y = 5"}</Mi> (wysokość figury między tymi podstawami) to{" "}
          <Mi>{"5"}</Mi>. Mamy więc równoległobok o podstawie <Mi>{"6"}</Mi> i wysokości <Mi>{"5"}</Mi>:
        </p>
        <Mb>{"P = 6 \\cdot 5 = 30"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"AB \\parallel CD"}</Mi>; b) <Mi>{"P = 30"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-punkt-postac-ogolna-parametr-k",
    number: "19",
    instruction: (
      <span>
        Punkt <Mi>{"P = (4,\\, -3)"}</Mi> należy do prostej danej równaniem{" "}
        <Mi>{"2x + ky + 1 = 0"}</Mi>, gdzie <Mi>{"k"}</Mi> jest liczbą rzeczywistą.
        <span className="block mt-3 font-normal">
          a) Wyznacz <Mi>{"k"}</Mi>.
        </span>
        <span className="block font-normal mt-1">
          b) Zapisz równanie tej samej prostej w postaci kierunkowej <Mi>{"y = ax + b"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"k = 3"}</Mi>
        </p>
        <p>
          b) <Mi>{"y = -\\dfrac{2}{3}x - \\dfrac{1}{3}"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <p className="text-sm">
        Podstaw współrzędne <Mi>{"P"}</Mi> do równania z niewiadomą <Mi>{"k"}</Mi>, potem wyraź <Mi>{"y"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"2 \\cdot 4 + k \\cdot (-3) + 1 = 0 \\quad \\Rightarrow \\quad 9 - 3k = 0 \\quad \\Rightarrow \\quad k = 3"}</Mb>
        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Równanie prostej: <Mi>{"2x + 3y + 1 = 0"}</Mi>, stąd <Mi>{"3y = -2x - 1"}</Mi>.
        </p>
        <Mb>{"y = -\\dfrac{2}{3}x - \\dfrac{1}{3}"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"k = 3"}</Mi>; b) <Mi>{"y = -\\dfrac{2}{3}x - \\dfrac{1}{3}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-cwiartki-monotonicznosc-przeciecie-oy-parametr-t",
    number: "20",
    instruction: (
      <span>
        Niech <Mi>{"f"}</Mi> będzie funkcją liniową <Mi>{"f(x) = (t - 3)x + t"}</Mi>, gdzie <Mi>{"t"}</Mi> jest parametrem
        rzeczywistym.
        <span className="block mt-3 font-normal">
          Wyznacz wszystkie wartości <Mi>{"t"}</Mi>, dla których jednocześnie spełnione są warunki: wykres <Mi>{"f"}</Mi> przecina
          oś <Mi>{"Oy"}</Mi> w punkcie leżącym powyżej początku układu (rzędna punktu przecięcia jest dodatnia), oraz funkcja{" "}
          <Mi>{"f"}</Mi> jest ściśle rosnąca na zbiorze liczb rzeczywistych.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"t > 3"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Rzędna przecięcia z <Mi>{"Oy"}</Mi> to <Mi>{"f(0)"}</Mi>. Ścisła rosnącość liniowej funkcji to dodatni współczynnik przy{" "}
        <Mi>{"x"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          <Mi>{"f(0) = t"}</Mi>. Warunek „powyżej początku” na osi <Mi>{"Oy"}</Mi> oznacza <Mi>{"t > 0"}</Mi>.
        </p>
        <p>
          Ścisła rosnącość: <Mi>{"t - 3 > 0"}</Mi>, czyli <Mi>{"t > 3"}</Mi>.
        </p>
        <p>
          Część wspólna warunków <Mi>{"t > 0"}</Mi> i <Mi>{"t > 3"}</Mi> to <Mi>{"t > 3"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"t \\in (3,\\, +\\infty)"}</Mi>, krócej <Mi>{"t > 3"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-zero-monotonicznosc-nierownosc-wykresy",
    number: "21",
    instruction: (
      <span>
        Funkcja liniowa <Mi>{"f"}</Mi> jest określona wzorem <Mi>{"f(x) = -\\dfrac{1}{2}x + b"}</Mi>. Wyznacz zbiór wartości parametru{" "}
        <Mi>{"b"}</Mi>, dla którego miejsce zerowe funkcji <Mi>{"f"}</Mi> jest mniejsze od <Mi>{"4"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"b < 2"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Rozwiąż <Mi>{"f(x) = 0"}</Mi> względem <Mi>{"x"}</Mi>, wyraź miejsce zerowe przez <Mi>{"b"}</Mi>, następnie użyj warunku „mniejsze niż{" "}
        <Mi>{"4"}</Mi>”.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <Mb>{"-\\dfrac{1}{2}x + b = 0 \\quad \\Rightarrow \\quad x = 2b"}</Mb>
        <Mb>{"2b < 4 \\quad \\Rightarrow \\quad b < 2"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"b \\in (-\\infty,\\, 2)"}</Mi>, krócej <Mi>{"b < 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-m-schem-wspolliniowosc-warunek-parametr",
    number: "22",
    instruction: (
      <span>
        Punkty <Mi>{"A = (1,\\, m)"}</Mi>, <Mi>{"B = (4,\\, -2)"}</Mi> oraz <Mi>{"C = (10,\\, k)"}</Mi> są współliniowe.
        Wiadomo dodatkowo, że prosta przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi> ma miejsce zerowe równe <Mi>{"7"}</Mi>.
        <span className="block mt-3 font-normal">
          Wyznacz liczby <Mi>{"m"}</Mi> oraz <Mi>{"k"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"m = -4"}</Mi>, <Mi>{"k = 2"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Miejsce zerowe równe <Mi>{"7"}</Mi> znaczy tyle, że dla <Mi>{"x = 7"}</Mi> wartość <Mi>{"y"}</Mi> na tej prostej jest{" "}
        <Mi>{"0"}</Mi> (punkt <Mi>{"(7,\\, 0)"}</Mi> leży na prostej). Wykorzystaj to wraz z punktem <Mi>{"B"}</Mi>, a potem współliniowość{" "}
        <Mi>{"A"}</Mi>, <Mi>{"B"}</Mi>, <Mi>{"C"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Skoro prosta przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi> ma miejsce zerowe <Mi>{"7"}</Mi>, to dla <Mi>{"x = 7"}</Mi> jest <Mi>{"y = 0"}</Mi>, czyli prosta przechodzi przez <Mi>{"P = (7,\\, 0)"}</Mi>. Z treści znamy też <Mi>{"B = (4,\\, -2)"}</Mi>.
        </p>
        <p>Nachylenie prostej przez <Mi>{"P"}</Mi> i <Mi>{"B"}</Mi>:</p>
        <Mb>{"a = \\dfrac{0 - (-2)}{7 - 4} = \\dfrac{2}{3}"}</Mb>
        <p>
          Równanie prostej przez <Mi>{"B"}</Mi> o nachyleniu <Mi>{"a"}</Mi> (np. postać punktowa od <Mi>{"B"}</Mi>):{" "}
          <Mi>{"y - (-2) = \\dfrac{2}{3}(x - 4)"}</Mi>, stąd{" "}
          <Mi>{"y = \\dfrac{2}{3}x - \\dfrac{14}{3}"}</Mi>.
        </p>
        <p>
          Punkty <Mi>{"A"}</Mi>, <Mi>{"B"}</Mi>, <Mi>{"C"}</Mi> leżą na tej samej prostej, więc podstawiamy <Mi>{"x = 1"}</Mi> oraz{" "}
          <Mi>{"x = 10"}</Mi>:
        </p>
        <Mb>{"m = \\dfrac{2}{3} \\cdot 1 - \\dfrac{14}{3} = -4, \\qquad k = \\dfrac{2}{3} \\cdot 10 - \\dfrac{14}{3} = 2"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"m = -4"}</Mi>, <Mi>{"k = 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
];
