"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, SideWork, sortTasksBySourceDate, getDisplayNumber} from "../_components";

const SOURCE_CKE_F2023 =
  "Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023";
const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy";
const SOURCE_SMWP = "Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna z matematyki, Politechnika Łódzka, marzec 2025, poziom rozszerzony";

const tasks = [
  {
    id: "cke-2025-czerwiec-dod-zad8-styczna-wielomian",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "8",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Wielomian <Mi>{"f"}</Mi> zmiennej rzeczywistej <Mi>{"x"}</Mi> jest określony wzorem{" "}
          <Mi>{"f(x) = x^3 + ax^2 + bx + c"}</Mi>, gdzie <Mi>{"a, b, c \\in \\mathbb{R}"}</Mi>. Liczba{" "}
          <Mi>{"(-2)"}</Mi> jest miejscem zerowym tego wielomianu. W kartezjańskim układzie współrzędnych{" "}
          <Mi>{"(x, y)"}</Mi> styczna do wykresu wielomianu <Mi>{"f"}</Mi> w punkcie <Mi>{"A"}</Mi> o pierwszej
          współrzędnej równej <Mi>{"(-2)"}</Mi> przecina ten wykres w punkcie <Mi>{"P = (1, 9)"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Wyznacz wzór wielomianu <Mi>{"f"}</Mi>. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Skoro <Mi>{"(-2)"}</Mi> jest miejscem zerowym, to <Mi>{"f(-2) = 0"}</Mi>, więc punkt styczności to{" "}
          <Mi>{"A = (-2, 0)"}</Mi>.
        </p>
        <p>Wzór na styczną w punkcie <Mi>{"(x_0, f(x_0))"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"y = a(x - x_0) + f(x_0), \\qquad a = f'(x_0)"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"x_0 = -2"}</Mi> i <Mi>{"f(x_0) = 0"}</Mi> styczna ma postać{" "}
          <Mi>{"y = f'(-2)(x + 2)"}</Mi>. Podstaw punkt <Mi>{"P = (1, 9)"}</Mi>: dostaniesz jedno równanie na{" "}
          <Mi>{"a, b, c"}</Mi>. Do trzech niewiadomych potrzebujesz jeszcze <Mi>{"f(-2) = 0"}</Mi> oraz warunku, że{" "}
          <Mi>{"P"}</Mi> leży na wykresie, czyli <Mi>{"f(1) = 9"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Warunki z treści zadania</p>
        <p>
          <Mi>{"f(x) = x^3 + ax^2 + bx + c"}</Mi>, więc <Mi>{"f'(x) = 3x^2 + 2ax + b"}</Mi>.
        </p>
        <p>
          Liczba <Mi>{"(-2)"}</Mi> jest miejscem zerowym, więc punkt <Mi>{"A"}</Mi> ma współrzędne{" "}
          <Mi>{"(-2, 0)"}</Mi>:
        </p>
        <Mb>{"f(-2) = 0"}</Mb>
        <p>
          Styczna w punkcie <Mi>{"A"}</Mi> przechodzi przez <Mi>{"P = (1, 9)"}</Mi>, a ponieważ styczna przecina
          wykres w <Mi>{"P"}</Mi>, punkt <Mi>{"P"}</Mi> leży też na wykresie <Mi>{"f"}</Mi>:
        </p>
        <Mb>{"f(1) = 9"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Równanie ze stycznej</p>
        <p>Wzór na styczną w punkcie <Mi>{"(x_0, f(x_0))"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"y = f'(x_0)(x - x_0) + f(x_0)"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"x_0 = -2"}</Mi> i <Mi>{"f(-2) = 0"}</Mi>:
        </p>
        <Mb>{"y = f'(-2)(x + 2)"}</Mb>
        <p>
          Punkt <Mi>{"P = (1, 9)"}</Mi> leży na stycznej, więc:
        </p>
        <Mb>{"9 = f'(-2)(1 + 2) = 3 \\cdot f'(-2) \\quad \\Rightarrow \\quad f'(-2) = 3"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Układ równań na <Mi>{"a, b, c"}</Mi></p>
        <p>Z warunku <Mi>{"f(-2) = 0"}</Mi>:</p>
        <Mb>{"(-2)^3 + a(-2)^2 + b(-2) + c = 0 \\quad \\Rightarrow \\quad -8 + 4a - 2b + c = 0"}</Mb>
        <Mb>{"4a - 2b + c = 8 \\quad \\text{(I)}"}</Mb>
        <p>Z warunku <Mi>{"f'(-2) = 3"}</Mi>:</p>
        <Mb>{"3(-2)^2 + 2a(-2) + b = 3 \\quad \\Rightarrow \\quad 12 - 4a + b = 3"}</Mb>
        <Mb>{"b = 4a - 9 \\quad \\text{(II)}"}</Mb>
        <p>Z warunku <Mi>{"f(1) = 9"}</Mi>:</p>
        <Mb>{"1 + a + b + c = 9 \\quad \\Rightarrow \\quad a + b + c = 8 \\quad \\text{(III)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Rozwiązanie układu</p>
        <p>Podstawiamy (II) do (I) i (III):</p>
        <Mb>{"c = 8 - 4a + 2(4a - 9) = 4a - 10"}</Mb>
        <Mb>{"a + (4a - 9) + (4a - 10) = 8 \\quad \\Rightarrow \\quad 9a = 27 \\quad \\Rightarrow \\quad a = 3"}</Mb>
        <Mb>{"b = 4 \\cdot 3 - 9 = 3, \\qquad c = 4 \\cdot 3 - 10 = 2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie</p>
        <Mb>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mb>
        <Mb>{"f(-2) = -8 + 12 - 6 + 2 = 0, \\qquad f(1) = 1 + 3 + 3 + 2 = 9"}</Mb>
        <Mb>{"f'(x) = 3x^2 + 6x + 3, \\qquad f'(-2) = 12 - 12 + 3 = 3"}</Mb>
        <p>
          Styczna: <Mi>{"y = 3(x + 2)"}</Mi>, dla <Mi>{"x = 1"}</Mi> daje <Mi>{"y = 9"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"f(x) = x^3 + 3x^2 + 3x + 2"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2026-formula2023-maj-zad1-analiza",
    source: SOURCE_CKE_F2023,
    number: "1",
    points: "0–2",
    instruction: <span>Oblicz granicę</span>,
    mathBlock:
      "\\lim_{n \\to +\\infty} \\frac{\\displaystyle \\binom{n+2}{n-1}}{\\displaystyle \\frac{1}{2}n^3 - 4n + 7}",
    noteItems: [{ text: "Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"\\dfrac{1}{3}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Z tablic (symbol Newtona) masz{" "}
          <Mi>{"\\displaystyle \\binom{m}{p}=\\frac{m!}{p!(m-p)!}"}</Mi>. Dla{" "}
          <Mi>{"\\binom{n+2}{n-1}"}</Mi> licz <Mi>{"(n+2)-(n-1)=3"}</Mi>, więc w mianowniku pojawia się{" "}
          <Mi>{"3!"}</Mi>, a po skróceniu silni zostaje iloczyn <Mi>{"n(n+1)(n+2)"}</Mi>.
        </p>
        <p>
          Gdy licznik i mianownik mają stopień trzeci względem <Mi>{"n"}</Mi>, podziel licznik i mianownik
          przez <Mi>{"n^3"}</Mi>, a potem przejdź do granicy przy <Mi>{"n \\to +\\infty"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozwinięcie symbolu Newtona</p>
        <p>
          Ze standardowego wzoru na symbol Newtona dla <Mi>{"m=n+2"}</Mi> oraz <Mi>{"p=n-1"}</Mi> (przy{" "}
          <Mi>{"n \\geq 1"}</Mi>) mamy <Mi>{"m-p=(n+2)-(n-1)=3"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {"\\binom{n+2}{n-1}=\\frac{(n+2)!}{(n-1)!\\,3!}=\\frac{(n+2)(n+1)n}{3!}=\\frac{n(n+1)(n+2)}{6}"}
          </Mb>
        </FormulaBox>
        <p>Pomnożenie nawiasów:</p>
        <Mb>
          {"(n+1)(n+2)=n^2+3n+2 \\quad\\Rightarrow\\quad n(n+1)(n+2)=n^3+3n^2+2n"}
        </Mb>
        <Mb>{"\\binom{n+2}{n-1}=\\frac{1}{6}n^3+\\frac{1}{2}n^2+\\frac{1}{3}n"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Granica ilorazu wielomianów</p>
        <p>Oznaczmy</p>
        <Mb>{"L_n=\\frac{\\frac{1}{6}n^3+\\frac{1}{2}n^2+\\frac{1}{3}n}{\\frac{1}{2}n^3-4n+7}"}</Mb>
        <p>
          Dzielimy licznik i mianownik przez <Mi>{"n^3"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {"L_n=\\frac{\\frac{1}{6}+\\frac{1}{2n}+\\frac{1}{3n^2}}{\\frac{1}{2}-\\frac{4}{n^2}+\\frac{7}{n^3}}"}
          </Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 3. Przejście granicy przy <Mi>{"n \\to +\\infty"}</Mi></p>
        <p>
          Ponieważ <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n}=0"}</Mi>,{" "}
          <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n^2}=0"}</Mi> oraz{" "}
          <Mi>{"\\lim_{n\\to+\\infty}\\frac{1}{n^3}=0"}</Mi>, przy granicy nieskończonej dostajemy
        </p>
        <Mb>
          {"\\lim_{n \\to +\\infty} L_n=\\frac{\\frac{1}{6}+0+0}{\\frac{1}{2}-0+0}=\\frac{\\frac{1}{6}}{\\frac{1}{2}}=\\frac{1}{6}\\cdot 2=\\frac{1}{3}"}
        </Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\dfrac{1}{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2025-pazdziernik-zad2",
    source: SOURCE_SMWP,
    number: "2",
    points: "0–2",
    instruction: <span>Oblicz granicę</span>,
    mathBlock: "\\lim_{x \\to 3^-} \\frac{\\sqrt{2x^2 - x}}{|x - 6| - 3}",
    noteItems: null,
    answers: null,

    answer: (
      <p><Mi>{"+\\infty"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dla <Mi>{"x < 3 < 6"}</Mi> mamy <Mi>{"|x-6| = 6-x"}</Mi>, więc mianownik przyjmuje postać:
        </p>
        <Mb>{"|x-6| - 3 = 6 - x - 3 = 3 - x"}</Mb>
        <p>
          Gdy <Mi>{"x \\to 3^-"}</Mi>, to <Mi>{"3-x \\to 0^+"}</Mi>, a licznik dąży do{" "}
          <Mi>{"\\sqrt{2 \\cdot 9 - 3} = \\sqrt{15}"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Upraszczamy wartość bezwzględną</p>
        <p>
          Ponieważ <Mi>{"x \\to 3^-"}</Mi>, mamy <Mi>{"x < 3 < 6"}</Mi>, więc{" "}
          <Mi>{"x - 6 < 0"}</Mi> i:
        </p>
        <Mb>{"|x - 6| = -(x-6) = 6 - x"}</Mb>
        <p>Mianownik:</p>
        <Mb>{"|x-6| - 3 = 6-x-3 = 3-x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Badamy zachowanie licznika i mianownika</p>
        <p>Gdy <Mi>{"x \\to 3^-"}</Mi>:</p>
        <Mb>{"\\sqrt{2x^2 - x} \\to \\sqrt{2 \\cdot 9 - 3} = \\sqrt{15} > 0"}</Mb>
        <Mb>{"3 - x \\to 0^+ \\quad \\text{(mianownik dąży do zera od strony dodatniej)}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy granicę</p>
        <Mb>{"\\lim_{x \\to 3^-} \\frac{\\sqrt{2x^2-x}}{3-x} = \\frac{\\sqrt{15}}{0^+} = +\\infty"}</Mb>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-minimum-x3y3",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "",
    points: null,
    instruction: (
      <span>
        Wyznacz liczby <Mi>{"x"}</Mi>, <Mi>{"y"}</Mi> jeżeli wiadomo, że{" "}
        <Mi>{"x + y = 100"}</Mi> oraz że <Mi>{"x^3 + y^3"}</Mi> osiąga wartość najmniejszą.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"x = 50"}</Mi>, <Mi>{"y = 50"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>Skorzystaj ze wzoru skróconego mnożenia:</p>
        <FormulaBox>
          <Mb>{"x^3 + y^3 = (x+y)(x^2 - xy + y^2)"}</Mb>
        </FormulaBox>
        <p>
          Podstaw <Mi>{"x + y = 100"}</Mi>, a potem wyraź <Mi>{"y = 100 - x"}</Mi>, żeby
          otrzymać funkcję jednej zmiennej. Znajdź jej minimum za pomocą pochodnej.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Stosujemy wzór skróconego mnożenia</p>
        <FormulaBox>
          <Mb>{"x^3 + y^3 = (x + y)(x^2 - xy + y^2)"}</Mb>
        </FormulaBox>
        <p>
          Ponieważ <Mi>{"x + y = 100"}</Mi>, otrzymujemy:
        </p>
        <Mb>{"x^3 + y^3 = 100(x^2 - xy + y^2)"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Podstawiamy <Mi>{"y = 100 - x"}</Mi>
        </p>
        <p>
          Wyrażenie w nawiasie:
        </p>
        <Mb>
          {"x^2 - xy + y^2 = x^2 - x(100 - x) + (100 - x)^2"}
        </Mb>
        <Mb>
          {"= x^2 - 100x + x^2 + 10\\,000 - 200x + x^2"}
        </Mb>
        <Mb>
          {"= 3x^2 - 300x + 10\\,000"}
        </Mb>
        <p>Definiujemy funkcję jednej zmiennej:</p>
        <Mb>{"f(x) = 100(3x^2 - 300x + 10\\,000)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Pochodna i miejsce zerowe</p>
        <Mb>{"f'(x) = 100(6x - 300) = 600(x - 50)"}</Mb>
        <Mb>{"f'(x) = 0 \\quad \\Longrightarrow \\quad x = 50"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Sprawdzamy, że to minimum</p>
        <p>Druga pochodna:</p>
        <Mb>{"f''(x) = 600 > 0"}</Mb>
        <p>
          Ponieważ <Mi>{"f''(x) > 0"}</Mi> dla każdego <Mi>{"x"}</Mi>, funkcja{" "}
          <Mi>{"f"}</Mi> jest wypukła (parabola skierowana ramionami do góry), więc{" "}
          <Mi>{"x = 50"}</Mi> to punkt <strong>minimum globalnego</strong>.
        </p>

        <p className="font-semibold text-stone-800">Krok 5. Wyznaczamy <Mi>{"y"}</Mi></p>
        <Mb>{"y = 100 - x = 100 - 50 = 50"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x = 50"}</Mi>, <Mi>{"y = 50"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Próbna PŁ marzec 2025 – brak ekstremum parametr m ────────
  {
    id: "probna-pl-2025-marzec-brak-ekstremum-parametr",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "12",
    points: "0–6",
    instruction: (
      <div className="space-y-3">
        <p>Dana jest funkcja</p>
        <Mb>
          {"f(x) = \\frac{m-2}{5}\\,x^5 - \\frac{2(m+3)}{3}\\,x^3 + (m+1)\\,x"}
        </Mb>
        <p>
          Wyznacz te wartości parametru <Mi>{"m"}</Mi>, dla których funkcja <Mi>{"f(x)"}</Mi> nie
          posiada ekstremum.
        </p>
        <div className="text-sm text-stone-600 space-y-1">
          <p>a) Podaj największą całkowitą wartość parametru spełniającego warunki zadania</p>
          <p>b) Podaj najmniejszą całkowitą wartość parametru nie spełniającego warunków zadania</p>
          <p>c) Podaj sumę liczb z poprzednich odpowiedzi</p>
          <p>d) Podaj iloczyn liczb z pierwszych dwóch odpowiedzi</p>
          <p>e) Podaj sumę wartości bezwzględnych z pierwszych dwóch odpowiedzi</p>
          <p>f) Podaj wartość bezwzględną sumy liczb z dwóch pierwszych odpowiedzi</p>
        </div>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1 text-sm">
        <p>a) <Mi>{"-1"}</Mi></p>
        <p>b) <Mi>{"0"}</Mi></p>
        <p>c) <Mi>{"-1"}</Mi></p>
        <p>d) <Mi>{"0"}</Mi></p>
        <p>e) <Mi>{"1"}</Mi></p>
        <p>f) <Mi>{"1"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Brak ekstremum oznacza, że <Mi>{"f'(x)"}</Mi> nie zmienia znaku. Oblicz pochodną i
          podstaw <Mi>{"t = x^2"}</Mi>, by otrzymać funkcję kwadratową <Mi>{"g(t)"}</Mi>.
        </p>
        <p>
          Oblicz wyróżnik <Mi>{"\\Delta"}</Mi>. Jeśli <Mi>{"\\Delta < 0"}</Mi> – brak miejsc
          zerowych, znak pochodnej wyznacza współczynnik <Mi>{"(m - 2)"}</Mi>. Jeśli{" "}
          <Mi>{"\\Delta \\geq 0"}</Mi> – oba miejsca zerowe muszą być niedodatnie: sprawdź
          warunek na <Mi>{"p"}</Mi> wierzchołka i na <Mi>{"g(0)"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Pochodna i podstawienie</p>
        <Mb>
          {"f'(x) = (m-2)\\,x^4 - 2(m+3)\\,x^2 + (m+1)"}
        </Mb>
        <p>
          Podstawiamy <Mi>{"t = x^2 \\geq 0"}</Mi>:
        </p>
        <Mb>{"g(t) = (m-2)\\,t^2 - 2(m+3)\\,t + (m+1)"}</Mb>
        <p>
          Funkcja <Mi>{"f"}</Mi> nie ma ekstremum, gdy <Mi>{"f'(x)"}</Mi> nie zmienia znaku, czyli
          gdy <Mi>{"g(t)"}</Mi> nie ma <strong>dodatnich</strong> miejsc zerowych (bo <Mi>{"t = x^2 \\geq 0"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Wyróżnik</p>
        <Mb>{"\\Delta = 4(m+3)^2 - 4(m-2)(m+1) = 4(7m + 11)"}</Mb>

        <p className="font-semibold text-stone-800">
          Przypadek 1: <Mi>{"\\Delta < 0"}</Mi>, czyli <Mi>{"m < -\\tfrac{11}{7}"}</Mi>
        </p>
        <p>
          Brak miejsc zerowych – pochodna jest cały czas dodatnia lub ujemna. Znak <Mi>{"g(t)"}</Mi> wyznacza
          współczynnik wiodący <Mi>{"(m - 2)"}</Mi>. Ponieważ <Mi>{"m < -\\tfrac{11}{7} < 2"}</Mi>, mamy{" "}
          <Mi>{"m - 2 < 0"}</Mi>, więc <Mi>{"g(t) < 0"}</Mi> dla każdego <Mi>{"t"}</Mi>.
          Funkcja <Mi>{"f"}</Mi> jest ściśle malejąca – brak ekstremum. ✓
        </p>

        <p className="font-semibold text-stone-800">
          Przypadek 2: <Mi>{"\\Delta \\geq 0"}</Mi>, czyli <Mi>{"m \\geq -\\tfrac{11}{7}"}</Mi>
        </p>
        <p>
          Miejsca zerowe <Mi>{"g"}</Mi> istnieją, ale oba muszą być niedodatnie, żeby{" "}
          <Mi>{"f'"}</Mi> nie zmieniała znaku na <Mi>{"[0, +\\infty)"}</Mi>. Warunki:
        </p>
        <p>
          <strong>a)</strong> Współrzędna <Mi>{"p"}</Mi> wierzchołka paraboli musi być ujemna:
        </p>
        <Mb>{"p = \\frac{m + 3}{m - 2} < 0"}</Mb>
        <p>
          <strong>b)</strong> Wartość w punkcie <Mi>{"t = 0"}</Mi> musi mieć ten sam znak
          co „zewnętrze" paraboli:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            jeśli <Mi>{"m - 2 > 0"}</Mi> (parabola w górę): <Mi>{"g(0) \\geq 0"}</Mi>
          </li>
          <li>
            jeśli <Mi>{"m - 2 < 0"}</Mi> (parabola w dół): <Mi>{"g(0) \\leq 0"}</Mi>
          </li>
        </ul>

        <p className="font-semibold text-stone-800">
          Podprzypadek <Mi>{"m > 2"}</Mi>
        </p>
        <p>
          Wtedy <Mi>{"p = \\frac{m+3}{m-2} > 0"}</Mi> (oba: licznik i mianownik dodatnie),
          więc warunek <Mi>{"p < 0"}</Mi> nie jest spełniony. Brak rozwiązań.
        </p>

        <p className="font-semibold text-stone-800">
          Podprzypadek <Mi>{"m < 2"}</Mi> (i <Mi>{"m \\geq -\\tfrac{11}{7}"}</Mi>)
        </p>
        <p>
          Parabola otwiera się w dół (<Mi>{"m - 2 < 0"}</Mi>). Sprawdzamy warunki:
        </p>
        <Mb>
          {"p = \\frac{m + 3}{m - 2}:\\quad m + 3 > 0\\ (\\text{bo } m \\geq -\\tfrac{11}{7} > -3),\\; m - 2 < 0 \\quad\\Longrightarrow\\quad p < 0\\ ✓"}
        </Mb>
        <Mb>
          {"g(0) = m + 1 \\leq 0 \\quad\\Longleftrightarrow\\quad m \\leq -1"}
        </Mb>
        <p>
          Zakres: <Mi>{"-\\tfrac{11}{7} \\leq m \\leq -1"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Wniosek</p>
        <p>Łączymy oba przypadki:</p>
        <Mb>
          {"m < -\\tfrac{11}{7} \\;\\cup\\; -\\tfrac{11}{7} \\leq m \\leq -1 \\;=\\; m \\leq -1"}
        </Mb>
        <FormulaBox>
          <p>
            Funkcja <Mi>{"f"}</Mi> nie ma ekstremum dla{" "}
            <Mi>{"m \\in (-\\infty,\\, -1]"}</Mi>.
          </p>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Odpowiedzi na podpunkty</p>
        <p>a) Największa całkowita wartość spełniająca: <Mi>{"m = -1"}</Mi></p>
        <p>b) Najmniejsza całkowita wartość niespełniająca: <Mi>{"m = 0"}</Mi></p>
        <p>c) Suma: <Mi>{"-1 + 0 = -1"}</Mi></p>
        <p>d) Iloczyn: <Mi>{"(-1) \\cdot 0 = 0"}</Mi></p>
        <p>e) Suma wartości bezwzględnych: <Mi>{"|-1| + |0| = 1"}</Mi></p>
        <p>f) Wartość bezwzględna sumy: <Mi>{"|-1 + 0| = 1"}</Mi></p>
      </div>
    ),
  },

  // ── Próbna PŁ marzec 2025 – prostopadłościan, V_max ─────────
  {
    id: "probna-pl-2025-marzec-prostopadloscian-vmax",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "13",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Suma długości trzech krawędzi prostopadłościanu wychodzących z jednego wierzchołka jest
          równa <Mi>{"8"}</Mi>. Długość jednej z tych krawędzi jest trzy razy mniejsza od drugiej.
          Wyznacz długości krawędzi prostopadłościanu o największej objętości.
        </p>
        <div className="text-sm text-stone-600 space-y-1">
          <p>
            Podaj w kolejności rosnącej długości krawędzi prostopadłościanu o największej
            objętości (tam gdzie nie występuje liczba całkowita, wynik podaj w postaci
            licznik/mianownik nieskracalnego ułamka)
          </p>
          <p>Podaj objętość tego prostopadłościanu (wynik podaj w postaci licznik/mianownik)</p>
          <p>
            Ile jest prostopadłościanów o krawędziach o długości całkowitej spełniających
            warunki: <em>Suma długości trzech krawędzi prostopadłościanu wychodzących z jednego
            wierzchołka jest równa 8. Długość jednej z tych krawędzi jest trzy razy mniejsza
            od drugiej</em>
          </p>
        </div>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1 text-sm">
        <p>Krawędzie: <Mi>{"\\tfrac{4}{3},\\; \\tfrac{8}{3},\\; 4"}</Mi></p>
        <p>Objętość: <Mi>{"\\tfrac{128}{9}"}</Mi></p>
        <p>Prostopadłościanów o krawędziach całkowitych: <Mi>{"1"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Oznacz krawędzie <Mi>{"a, b, c"}</Mi> tak, że <Mi>{"a = \\tfrac{b}{3}"}</Mi>. Z warunku
          sumy wyraź <Mi>{"c"}</Mi> przez <Mi>{"b"}</Mi> i zapisz objętość jako funkcję jednej zmiennej.
        </p>
        <p>
          Oblicz pochodną i przyrównaj do zera. Dla krawędzi całkowitych sprawdź, ile jest
          rozwiązań w liczbach naturalnych.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Parametryzacja</p>
        <p>
          Niech <Mi>{"a = \\tfrac{b}{3}"}</Mi>. Z warunku <Mi>{"a + b + c = 8"}</Mi>:
        </p>
        <Mb>{"\\frac{b}{3} + b + c = 8 \\quad\\Longrightarrow\\quad c = 8 - \\frac{4b}{3}"}</Mb>
        <p>
          Warunek dodatniości krawędzi: <Mi>{"b > 0"}</Mi> i <Mi>{"c > 0 \\Rightarrow b < 6"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Objętość jako funkcja <Mi>{"b"}</Mi></p>
        <Mb>
          {"V(b) = \\frac{b}{3} \\cdot b \\cdot \\left(8 - \\frac{4b}{3}\\right) = \\frac{8b^2}{3} - \\frac{4b^3}{9}"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Pochodna</p>
        <Mb>{"V'(b) = \\frac{16b}{3} - \\frac{12b^2}{9} = \\frac{16b}{3} - \\frac{4b^2}{3} = \\frac{4b}{3}(4 - b)"}</Mb>
        <Mb>{"V'(b) = 0 \\quad\\Longrightarrow\\quad b = 0 \\;\\text{(odpada)}\\quad\\text{lub}\\quad b = 4"}</Mb>
        <p>
          Dla <Mi>{"b \\in (0, 4)"}</Mi> mamy <Mi>{"V' > 0"}</Mi>, a dla{" "}
          <Mi>{"b \\in (4, 6)"}</Mi> mamy <Mi>{"V' < 0"}</Mi>, więc <Mi>{"b = 4"}</Mi> daje maksimum.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Krawędzie i objętość</p>
        <Mb>{"b = 4,\\quad a = \\frac{4}{3},\\quad c = 8 - \\frac{16}{3} = \\frac{8}{3}"}</Mb>
        <FormulaBox>
          <p>
            Krawędzie rosnąco: <Mi>{"\\tfrac{4}{3},\\; \\tfrac{8}{3},\\; 4"}</Mi>.
            Objętość: <Mi>{"V = \\tfrac{4}{3} \\cdot 4 \\cdot \\tfrac{8}{3} = \\tfrac{128}{9}"}</Mi>.
          </p>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 5. Krawędzie całkowite</p>
        <p>
          Przy <Mi>{"a = \\tfrac{b}{3}"}</Mi>: <Mi>{"b = 3a"}</Mi>, <Mi>{"c = 8 - 4a"}</Mi>.
          Dla <Mi>{"a, b, c \\in \\mathbb{N}"}</Mi>: <Mi>{"a \\geq 1"}</Mi> i{" "}
          <Mi>{"c = 8 - 4a \\geq 1"}</Mi>, czyli <Mi>{"a \\leq \\tfrac{7}{4}"}</Mi>.
          Jedyne rozwiązanie: <Mi>{"a = 1,\\; b = 3,\\; c = 4"}</Mi>.
        </p>
        <FormulaBox>
          <p>Jest <Mi>{"1"}</Mi> taki prostopadłościan.</p>
        </FormulaBox>
      </div>
    ),
  },
];

export default function ElementyAnalizyPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/matura/matematyka-rozszerzona" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Elementy analizy matematycznej</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">Dział 15</p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Elementy analizy matematycznej</h1>
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
