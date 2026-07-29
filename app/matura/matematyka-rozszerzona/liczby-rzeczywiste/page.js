"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna, Politechnika Łódzka, marzec 2025";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, poziom rozszerzony, CKE, grudzień 2024";

const tasks = [
  {
    id: "cke-mock-2024-grudzien-zad4-logarytmy-dowod",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "4",
    points: "0–3",
    instruction: <span>Wykaż, że</span>,
    mathBlock:
      "\\frac{1}{\\log_2 35 + 1} + \\frac{1}{\\log_7 140 - \\log_7 2} + \\frac{1}{\\log_5 7 + \\log_5 2 + 1} = 1",
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Uprość każdy mianownik osobno, korzystając ze wzorów na sumę i różnicę logarytmów oraz z tego, że{" "}
          <Mi>{"1 = \\log_a a"}</Mi> dla dodatniej podstawy <Mi>{"a"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\log_a x + \\log_a y = \\log_a(xy), \\qquad \\log_a x - \\log_a y = \\log_a\\dfrac{x}{y}"
            }
          </Mb>
        </FormulaBox>
        <p>
          Gdy w trzech mianownikach pojawi się ten sam argument (np. <Mi>{"70"}</Mi>), zastosuj związek między
          logarytmem a jego odwrotnością:
        </p>
        <FormulaBox>
          <Mb>{"\\dfrac{1}{\\log_a b} = \\log_b a"}</Mb>
        </FormulaBox>
        <p>
          Na końcu zsumuj trzy logarytmy o tej samej podstawie jako logarytm iloczynu argumentów.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Pierwszy mianownik</p>
        <p>
          Liczbę <Mi>{"1"}</Mi> zapisujemy jako <Mi>{"\\log_2 2"}</Mi>. Stosujemy
          wzór na sumę logarytmów:
        </p>
        <Mb>{"\\log_2 35 + 1 = \\log_2 35 + \\log_2 2 = \\log_2(35 \\cdot 2) = \\log_2 70"}</Mb>
        <Mb>{"\\dfrac{1}{\\log_2 35 + 1} = \\dfrac{1}{\\log_2 70}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Drugi mianownik</p>
        <p>Korzystamy ze wzoru na różnicę logarytmów:</p>
        <Mb>
          {"\\log_7 140 - \\log_7 2 = \\log_7\\dfrac{140}{2} = \\log_7 70"}
        </Mb>
        <Mb>{"\\dfrac{1}{\\log_7 140 - \\log_7 2} = \\dfrac{1}{\\log_7 70}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Trzeci mianownik</p>
        <p>Najpierw sumujemy dwa pierwsze składniki, potem dodajemy <Mi>{"1"}</Mi>:</p>
        <Mb>{"\\log_5 7 + \\log_5 2 = \\log_5(7 \\cdot 2) = \\log_5 14"}</Mb>
        <Mb>
          {
            "\\log_5 7 + \\log_5 2 + 1 = \\log_5 14 + \\log_5 5 = \\log_5(14 \\cdot 5) = \\log_5 70"
          }
        </Mb>
        <Mb>{"\\dfrac{1}{\\log_5 7 + \\log_5 2 + 1} = \\dfrac{1}{\\log_5 70}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Zamiana odwrotności logarytmu</p>
        <p>
          Dla dodatniej podstawy <Mi>{"a \\neq 1"}</Mi> i dodatniego argumentu <Mi>{"b"}</Mi> z definicji
          logarytmu wynika:
        </p>
        <FormulaBox>
          <Mb>{"\\dfrac{1}{\\log_a b} = \\log_b a"}</Mb>
        </FormulaBox>
        <p>(bo <Mi>{"\\log_a b = \\dfrac{\\ln b}{\\ln a}"}</Mi>, więc odwrotność to{" "}
        <Mi>{"\\dfrac{\\ln a}{\\ln b} = \\log_b a"}</Mi>).</p>
        <p>Stosujemy to do każdego składnika:</p>
        <Mb>
          {
            "\\dfrac{1}{\\log_2 70} + \\dfrac{1}{\\log_7 70} + \\dfrac{1}{\\log_5 70} = \\log_{70} 2 + \\log_{70} 7 + \\log_{70} 5"
          }
        </Mb>

        <p className="font-semibold text-stone-800">Krok 5. Suma logarytmów</p>
        <p>Z wzoru na sumę logarytmów o tej samej podstawie:</p>
        <Mb>
          {
            "\\log_{70} 2 + \\log_{70} 7 + \\log_{70} 5 = \\log_{70}(2 \\cdot 7 \\cdot 5) = \\log_{70} 70 = 1"
          }
        </Mb>
        <p>
          Lewa strona równości z treści zadania równa się <Mi>{"1"}</Mi>, co należało wykazać.{" "}
          <Mi>{"\\blacksquare"}</Mi>
        </p>
      </div>
    ),
  },

  {
    id: "probna-pl-2025-marzec-zad1-logarytmy",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "1",
    points: null,
    instruction: "Oblicz",
    mathBlock: "\\log_2 9 \\cdot \\log_7 \\tfrac{1}{25} \\cdot \\log_3 16 \\cdot \\log_5 49",
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"-32"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zamień argumenty na potęgi, żeby wyciągnąć wykładniki przed logarytmy.
          Potem skorzystaj z własności:
        </p>
        <FormulaBox>
          <Mb>{"\\log_a b \\cdot \\log_b a = 1"}</Mb>
        </FormulaBox>
        <p>
          Pogrupuj czynniki w pary, w których podstawa jednego logarytmu jest argumentem drugiego.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Zapisujemy argumenty jako potęgi</p>
        <p>Korzystamy ze wzoru:</p>
        <FormulaBox>
          <Mb>{"\\log_a b^n = n \\cdot \\log_a b"}</Mb>
        </FormulaBox>
        <Mb>{"\\log_2 9 = \\log_2 3^2 = 2\\log_2 3"}</Mb>
        <Mb>{"\\log_7 \\tfrac{1}{25} = \\log_7 5^{-2} = -2\\log_7 5"}</Mb>
        <Mb>{"\\log_3 16 = \\log_3 2^4 = 4\\log_3 2"}</Mb>
        <Mb>{"\\log_5 49 = \\log_5 7^2 = 2\\log_5 7"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Mnożymy współczynniki liczbowe</p>
        <p>Iloczyn przyjmuje postać:</p>
        <Mb>
          {"2 \\cdot (-2) \\cdot 4 \\cdot 2 \\;\\cdot\\; \\log_2 3 \\cdot \\log_7 5 \\cdot \\log_3 2 \\cdot \\log_5 7"}
        </Mb>
        <p>Współczynniki liczbowe:</p>
        <Mb>{"2 \\cdot (-2) \\cdot 4 \\cdot 2 = -32"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Upraszczamy iloczyn logarytmów</p>
        <p>
          Grupujemy logarytmy w pary, w których podstawa jednego jest argumentem drugiego, i korzystamy
          z własności:
        </p>
        <FormulaBox>
          <Mb>{"\\log_a b \\cdot \\log_b a = 1"}</Mb>
        </FormulaBox>
        <Mb>{"\\log_2 3 \\cdot \\log_3 2 = 1"}</Mb>
        <Mb>{"\\log_7 5 \\cdot \\log_5 7 = 1"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Wynik końcowy</p>
        <Mb>{"-32 \\cdot 1 \\cdot 1 = -32"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"-32"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad2-logarytmy-dowod",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "2",
    points: "0–3",
    instruction: (
      <span>
        Wykaż, że jeżeli <Mi>{"a = \\log_2 14"}</Mi> oraz <Mi>{"b = \\log_{\\sqrt{2}} 27"}</Mi>, to{" "}
        <Mi>{"\\log_7 54 = \\dfrac{b + 2}{2a - 2}"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Najpierw zapisz <Mi>{"b"}</Mi> jako logarytm o podstawie <Mi>{"2"}</Mi> stosując wzór na zamianę
          podstawy:{" "}
          <Mi>{"\\dfrac{b + 2}{2a - 2}"}</Mi>.
        </p>
        <FormulaBox>
          <p className="text-stone-500 text-xs mb-1">
            jeżeli <Mi>{"a > 0,\\ a \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
          </p>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <p>
          W liczniku i mianowniku podstaw <Mi>{"a = \\log_2 14"}</Mi> oraz uproszczone <Mi>{"b"}</Mi>.
        </p>
        <p>
          Przydatne fakty: <Mi>{"2 = \\log_2 4"}</Mi>, <Mi>{"1 = \\log_2 2"}</Mi>, a także suma i różnica logarytmów jako
          iloczyn i iloraz argumentów:
        </p>
        <Mb>{"\\log_a(xy) = \\log_a x + \\log_a y, \\qquad \\log_a\\dfrac{x}{y} = \\log_a x - \\log_a y"}</Mb>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">
          Krok 1. Zamiana podstawy w <Mi>{"b"}</Mi>
        </p>
        <p>
          Dla <Mi>{"b = \\log_{\\sqrt{2}} 27"}</Mi> przechodzimy na podstawę <Mi>{"2"}</Mi>:
        </p>
        <FormulaBox>
          <p className="text-stone-500 text-xs mb-1">
            jeżeli <Mi>{"a > 0,\\ a \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
          </p>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <Mb>
          {"b = \\log_{\\sqrt{2}} 27 = \\frac{\\log_2 27}{\\log_2 \\sqrt{2}} = \\frac{\\log_2 27}{\\log_2(2^{1/2})} = \\frac{\\log_2 27}{\\tfrac{1}{2}} = 2\\log_2 27"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 2. Upraszczamy prawą stronę tezy</p>
        <p>
          Teza mówi, że <Mi>{"\\log_7 54 = \\dfrac{b + 2}{2a - 2}"}</Mi>. Zaczynamy od prawej strony i
          podstawiamy <Mi>{"a = \\log_2 14"}</Mi> oraz <Mi>{"b = 2\\log_2 27"}</Mi> z kroku 1.
        </p>
        <p>
          Przydatna będzie równość: <Mi>{"1 = \\log_2 2"}</Mi>.
          Korzystamy też ze wzorów:
        </p>
        <Mb>{"\\log_a x + \\log_a y = \\log_a(xy), \\qquad \\log_a x - \\log_a y = \\log_a\\dfrac{x}{y}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Licznik <Mi>{"b + 2"}</Mi></p>
        <Mb>{"b + 2 = 2\\log_2 27 + 2 = 2\\bigl(\\log_2 27 + 1\\bigr)"}</Mb>
        <p>
          W nawiasie zamieniamy <Mi>{"1"}</Mi> na <Mi>{"\\log_2 2"}</Mi> i stosujemy wzór na sumę logarytmów:
        </p>
        <Mb>
          {"\\log_2 27  + \\log_2 2 = \\log_2(27 \\cdot 2) = \\log_2 54"}
        </Mb>
        <p>Stąd:</p>
        <Mb>{"b + 2 = 2\\log_2 54"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Mianownik <Mi>{"2a - 2"}</Mi></p>
        <Mb>{"2a - 2 = 2\\log_2 14 - 2 = 2\\bigl(\\log_2 14 - 1\\bigr)"}</Mb>
        <p>
          Liczbę <Mi>{"1"}</Mi> w ostatnim składniku zapisujemy jako <Mi>{"\\log_2 2"}</Mi>. Różnica logarytmów to logarytm ilorazu:</p>
        <Mb>
          {"a - 1 = \\log_2 14 - \\log_2 2= \\log_2\\dfrac{14}{2} = \\log_2 7"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 5. Ułamek i zamiana podstawy</p>
        <Mb>
          {"\\dfrac{b + 2}{2a - 2} = \\dfrac{2\\log_2 54}{2\\log_2 7} = \\dfrac{\\log_2 54}{\\log_2 7}"}
        </Mb>
        <p>
          To jest dokładnie wzór na zamianę podstawy z <Mi>{"2"}</Mi> na <Mi>{"7"}</Mi> (z tym samym
          argumentem <Mi>{"54"}</Mi>):
        </p>
        <FormulaBox>
          <Mb>{"\\log_7 54 = \\frac{\\log_2 54}{\\log_2 7}"}</Mb>
        </FormulaBox>
        <p>
          Prawa strona tezy równa się więc lewej, czyli dla podanych <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> zachodzi
          równość z treści zadania.
        </p>
        <Mb>{"\\log_7 54 = \\frac{b + 2}{2a - 2} \\quad \\blacksquare"}</Mb>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad3-iloczyn-cyfr",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "3",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Rozważamy wszystkie liczby naturalne sześciocyfrowe, w których zapisie dziesiętnym iloczyn cyfr jest
          liczbą parzystą mniejszą od <Mi>{"5"}</Mi>.
        </p>
        <p>
          Oblicz, ile jest wszystkich takich liczb sześciocyfrowych. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"368\\,586"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Iloczyn cyfr jest parzysty i mniejszy od <Mi>{"5"}</Mi>, więc może równać się tylko{" "}
          <Mi>{"0"}</Mi>, <Mi>{"2"}</Mi> albo <Mi>{"4"}</Mi>. Rozpatrz te trzy przypadki osobno i na końcu
          dodaj wyniki.
        </p>
        <p>
          Dla iloczynu <Mi>{"0"}</Mi> wygodnie policzyć liczbę sześciocyfrowych <strong>bez</strong> zera w
          zapisie (metoda dopełnienia): wszystkie sześciocyfrowe minus te, w których żadna cyfra nie jest
          zerem.
        </p>
        <p>
          Dla iloczynów <Mi>{"2"}</Mi> i <Mi>{"4"}</Mi> wypisz, jakie cyfry mogą wystąpić (tylko{" "}
          <Mi>{"1"}</Mi>, <Mi>{"2"}</Mi>, ewentualnie <Mi>{"4"}</Mi>), a potem policz permutacje z powtórzeniami.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Jakie wartości może przyjąć iloczyn cyfr?</p>
        <p>
          Liczba sześciocyfrowa ma postać <Mi>{"d_1 d_2 d_3 d_4 d_5 d_6"}</Mi>, gdzie{" "}
          <Mi>{"d_1 \\in \\{1,2,\\ldots,9\\}"}</Mi> (pierwsza cyfra nie może być zerem), a{" "}
          <Mi>{"d_2,\\ldots,d_6 \\in \\{0,1,\\ldots,9\\}"}</Mi>.
        </p>
        <p>
          Oznaczmy <Mi>{"P = d_1 \\cdot d_2 \\cdot d_3 \\cdot d_4 \\cdot d_5 \\cdot d_6"}</Mi>. 
        </p>
        <p>
          Warunki zadania są następujące:{" "}
          <Mi>{"P"}</Mi> jest parzyste oraz <Mi>{"P < 5"}</Mi>. Jedynymi parzystymi liczbami naturalnymi
          mniejszymi od <Mi>{"5"}</Mi> są:
        </p>
        <Mb>{"P \\in \\{0,\\,2,\\,4\\}"}</Mb>
        <p>
          Policzymy osobno liczby sześciocyfrowe z iloczynem <Mi>{"0"}</Mi>, <Mi>{"2"}</Mi> i <Mi>{"4"}</Mi>, a
          potem zsumujemy wyniki (te zbiory się nie nakładają).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Iloczyn cyfr równy <Mi>{"0"}</Mi></p>
        <p>
          Iloczyn jest zerem wtedy i tylko wtedy, gdy <strong>przynajmniej jedna</strong> cyfra to{" "}
          <Mi>{"0"}</Mi>. Pierwsza cyfra i tak nie jest zerem, więc zero musi wystąpić na jednej z pozycji{" "}
          <Mi>{"d_2,\\ldots,d_6"}</Mi>.
        </p>
        <p>
          Łatwiej policzyć to dopełnieniem. Wszystkich liczb sześciocyfrowych jest:
        </p>
        <Mb>{"9 \\cdot 10^5 = 900\\,000"}</Mb>
        <p>
          Liczby sześciocyfrowe <strong>bez</strong> zera w zapisie: każda z sześciu cyfr to{" "}
          <Mi>{"1,2,\\ldots,9"}</Mi>:
        </p>
        <Mb>{"9^6 = 531\\,441"}</Mb>
        <p>Stąd liczba sześciocyfrowych z iloczynem <Mi>{"0"}</Mi>:</p>
        <Mb>{"N_0 = 900\\,000 - 531\\,441 = 368\\,559"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Iloczyn cyfr równy <Mi>{"2"}</Mi></p>
        <p>
          Jedyny rozkład na czynniki pierwsze iloczynu sześciu cyfr z zbioru <Mi>{"\\{0,\\ldots,9\\}"}</Mi> wynoszący dokładnie <Mi>{"2"}</Mi>, to jedna
          cyfra <Mi>{"2"}</Mi> i pięć cyfr <Mi>{"1"}</Mi>.
        </p>
        <p>
          Układamy sześć cyfr: <Mi>{"2,1,1,1,1,1"}</Mi>. Liczba różnych kolejności (permutacji z powtórzeniami):
        </p>
        <FormulaBox>
          <Mb>{"\\frac{6!}{5!} = 6"}</Mb>
        </FormulaBox>
        <p>
          Lub inaczej: mamy do wyboru 6 pozycji, na których stoi cyfra <Mi>{"2"}</Mi>, reszta to jedynki.
        </p>
        <Mb>{"N_2 = 6"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Iloczyn cyfr równy <Mi>{"4"}</Mi></p>
        <p>
          Szukamy rozkładów iloczynu <Mi>{"4"}</Mi> na sześć cyfr z{" "}
          <Mi>{"\\{1,\\ldots,9\\}"}</Mi>. Są dwa typy:
        </p>
        <p className="font-medium text-stone-700">Typ A: jedna cyfra <Mi>{"4"}</Mi> i pięć cyfr <Mi>{"1"}</Mi></p>
        <Mb>{"\\frac{6!}{5!} = 6 \\quad \\text{(jak w kroku 3)}"}</Mb>
        <p className="font-medium text-stone-700">Typ B: dwie cyfry <Mi>{"2"}</Mi> i cztery cyfry <Mi>{"1"}</Mi></p>
        <p>
          Wybieramy, na których dwóch z sześciu pozycjach stoją dwójki:
        </p>
        <Mb>{"\\frac{6!}{2!\\,4!} = \\binom{6}{2} = 15"}</Mb>
        <Mb>{"N_4 = 6 + 15 = 21"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Suma</p>
        <Mb>{"N = N_0 + N_2 + N_4 = 368\\,559 + 6 + 21 = 368\\,586"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: jest <Mi>{"368\\,586"}</Mi> takich liczb sześciocyfrowych.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2026-styczen-zad1",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–3",
    instruction: "Rozwiąż równanie",
    mathBlock: "\\log_x(27) = 2 + \\log_3(x)",
    noteItems: [
      { text: "gdzie " },
      { math: "x \\in (0,1) \\cup (1, +\\infty)" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>{"x = 3"}</Mi> lub <Mi>{"x = \\dfrac{1}{27}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>Zastosuj wzór na zamianę podstawy logarytmu:</p>
        <p className="text-stone-500 text-xs">
          jeżeli <Mi>{"a > 0,\\ a \\neq 1,\\ b > 0,\\ b \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
        </p>
        <FormulaBox>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <p>
          dla <Mi>{"b = x,\\ c = 27,\\ a = 3"}</Mi>:
        </p>
        <Mb>{"\\log_x 27 = \\frac{\\log_3 27}{\\log_3 x} = \\frac{3}{\\log_3 x}"}</Mb>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Zmiana podstawy</p>
        <p>
          Korzystamy ze wzoru na zamianę podstawy logarytmu:
        </p>
        <FormulaBox>
          <p className="text-stone-500 text-xs mb-1">
            jeżeli <Mi>{"a > 0,\\ a \\neq 1,\\ b > 0,\\ b \\neq 1"}</Mi> oraz <Mi>{"c > 0"}</Mi>, to:
          </p>
          <Mb>{"\\log_b c = \\frac{\\log_a c}{\\log_a b}"}</Mb>
        </FormulaBox>
        <p>
          Podstawiamy <Mi>{"b = x,\\ c = 27,\\ a = 3"}</Mi>:
        </p>
        <Mb>{"\\log_x 27 = \\frac{\\log_3 27}{\\log_3 x} = \\frac{3}{\\log_3 x}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Podstawienie</p>
        <p>
          Oznaczamy <Mi>{"t = \\log_3 x"}</Mi>. Ponieważ <Mi>{"x \\neq 1"}</Mi>, mamy <Mi>{"t \\neq 0"}</Mi>.
          Równanie przyjmuje postać:
        </p>
        <Mb>{"\\frac{3}{t} = 2 + t"}</Mb>
        <p>
          Mnożymy obie strony przez <Mi>{"t"}</Mi>:
        </p>
        <Mb>{"t^2 + 2t - 3 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Liczymy deltę</p>
        <Mb>{"\\Delta = b^2 - 4ac = 2^2 - 4 \\cdot 1 \\cdot (-3) = 4 + 12 = 16"}</Mb>
        <p>
          <Mi>{"\\sqrt{\\Delta} = 4"}</Mi>
        </p>
        <Mb>{"t_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{-2 - 4}{2} = -3"}</Mb>
        <Mb>{"t_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{-2 + 4}{2} = 1"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Powrót do zmiennej x</p>
        <p>Korzystamy z definicji logarytmu:</p>
        <FormulaBox>
          <Mb>{"\\log_a b = c \\iff a^c = b"}</Mb>
        </FormulaBox>
        <p>
          Dla <Mi>{"t_1 = -3"}</Mi>:
        </p>
        <Mb>{"\\log_3 x = -3 \\iff x = 3^{-3} = \\frac{1}{27}"}</Mb>
        <p>
          Dla <Mi>{"t_2 = 1"}</Mi>:
        </p>
        <Mb>{"\\log_3 x = 1 \\iff x = 3^1 = 3"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie dziedziny</p>
        <p>
          Dziedzina: <Mi>{"x \\in (0,1) \\cup (1, +\\infty)"}</Mi>
        </p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>
            <Mi>{"x = \\tfrac{1}{27} \\in (0,1)"}</Mi>
            : spełnione
          </li>
          <li>
            <Mi>{"x = 3 \\in (1, +\\infty)"}</Mi>
            : spełnione
          </li>
        </ul>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x = \\dfrac{1}{27}"}</Mi> lub <Mi>{"x = 3"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function LiczbyRzeczywistePage() {
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
          <span className="text-sm text-stone-400">Liczby rzeczywiste</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* Nagłówek */}
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 1
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Liczby rzeczywiste
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        {/* Zadania */}
        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
