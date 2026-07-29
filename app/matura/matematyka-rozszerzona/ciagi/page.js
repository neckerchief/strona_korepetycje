"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, CKE, maj 2025, poziom rozszerzony";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna z matematyki, Politechnika Łódzka, marzec 2025, poziom rozszerzony";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, CKE, grudzień 2024, poziom rozszerzony";

const tasks = [
  {
    id: "cke-mock-2024-grudzien-zad8-granica-nieparzyste",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "8",
    points: "0–4",
    instruction: "Oblicz granicę",
    mathBlock:
      "\\lim_{n \\to +\\infty} \\frac{1 + 3 + 5 + 7 + \\cdots + (2n + 1)}{\\binom{n}{2}}",
    noteItems: [
      { text: "gdzie " },
      { math: "1 + 3 + 5 + 7 + \\cdots + (2n + 1)" },
      { text: " jest sumą kolejnych liczb naturalnych nieparzystych. Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>{"2"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Licznik to suma ciągu arytmetycznego: pierwszy wyraz <Mi>{"a_1 = 1"}</Mi>, różnica{" "}
          <Mi>{"r = 2"}</Mi>, ostatni wyraz <Mi>{"a_{n+1} = 2n + 1"}</Mi>, więc jest{" "}
          <Mi>{"n + 1"}</Mi> wyrazów. Zastosuj wzór na sumę ciągu arytmetycznego.
        </p>
        <FormulaBox>
          <Mb>{"S_k = \\dfrac{a_1 + a_k}{2} \\cdot k"}</Mb>
        </FormulaBox>
        <p>
          Mianownik to symbol Newtona: <Mi>{"\\binom{n}{2} = \\dfrac{n(n-1)}{2}"}</Mi>. Po podstawieniu
          zostaw w ułamku najwyższe potęgi <Mi>{"n"}</Mi> w liczniku i mianowniku, a potem policz granicę przy{" "}
          <Mi>{"n \\to +\\infty"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Suma w liczniku (ciąg arytmetyczny)</p>
        <p>
          Wyrazy <Mi>{"1,\\, 3,\\, 5,\\, \\ldots,\\, 2n + 1"}</Mi> tworzą ciąg arytmetyczny o{" "}
          <Mi>{"a_1 = 1"}</Mi> i <Mi>{"r = 2"}</Mi>. Ostatni wyraz to <Mi>{"2n + 1"}</Mi>.
        </p>
        <p>
          Sprawdzamy liczbę wyrazów: jeśli jest ich <Mi>{"k"}</Mi>, to{" "}
          <Mi>{"1 + (k-1) \\cdot 2 = 2n + 1"}</Mi>, stąd <Mi>{"k - 1 = n"}</Mi>, czyli <Mi>{"k = n + 1"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>
            {
              "S = \\frac{1 + (2n + 1)}{2} \\cdot (n + 1) = \\frac{2n + 2}{2} \\cdot (n + 1) = (n + 1)^2"
            }
          </Mb>
        </FormulaBox>
        <p className="text-stone-600 text-sm">
          (To też znany fakt: suma pierwszych <Mi>{"n + 1"}</Mi> liczb nieparzystych równa się{" "}
          <Mi>{"(n+1)^2"}</Mi>.)
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Mianownik</p>
        <Mb>{"\\binom{n}{2} = \\dfrac{n!}{2!\\,(n-2)!} = \\dfrac{n(n-1)}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Ułamek przed granicą</p>
        <Mb>
          {
            "\\frac{(n+1)^2}{\\dfrac{n(n-1)}{2}} = \\frac{2(n+1)^2}{n(n-1)} = \\frac{2(n^2 + 2n + 1)}{n^2 - n}"
          }
        </Mb>
        <p>
          Dzielimy licznik i mianownik przez <Mi>{"n^2"}</Mi> (najwyższa potęga przy dużym{" "}
          <Mi>{"n"}</Mi>):
        </p>
        <Mb>
          {
            "\\frac{2\\left(1 + \\dfrac{2}{n} + \\dfrac{1}{n^2}\\right)}{1 - \\dfrac{1}{n}}"
          }
        </Mb>

        <p className="font-semibold text-stone-800">Krok 4. Granica</p>
        <p>
          Gdy <Mi>{"n \\to +\\infty"}</Mi>, wyrażenia <Mi>{"\\dfrac{1}{n}"}</Mi> i <Mi>{"\\dfrac{1}{n^2}"}</Mi>{" "}
          dążą do <Mi>{"0"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\lim_{n \\to +\\infty} \\frac{2\\left(1 + \\dfrac{2}{n} + \\dfrac{1}{n^2}\\right)}{1 - \\dfrac{1}{n}} = \\frac{2 \\cdot 1}{1} = 2"
            }
          </Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"2"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-mock-2024-grudzien-zad10-aryt-geom",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "10",
    points: "0–5",
    instruction: (
      <div className="space-y-3">
        <p>
          Trzeci i piąty wyraz malejącego ciągu arytmetycznego <Mi>{"(a_n)"}</Mi>, określonego dla każdej liczby
          naturalnej <Mi>{"n \\geq 1"}</Mi>, spełniają warunek <Mi>{"a_3 + a_5 = 10"}</Mi>.
        </p>
        <p>
          Trzywyrazowy ciąg{" "}
          <Mi>{"\\left(2a_1 + 4,\\; a_4 - 1,\\; -\\dfrac{1}{8}a_7\\right)"}</Mi> jest geometryczny.
        </p>
        <p className="font-semibold text-stone-800">
          Oblicz wyrazy tego ciągu geometrycznego. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        Wyrazy ciągu geometrycznego: <Mi>{"32"}</Mi>, <Mi>{"4"}</Mi>, <Mi>{"\\dfrac{1}{2}"}</Mi>.
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zapisz <Mi>{"a_3"}</Mi>, <Mi>{"a_5"}</Mi>, <Mi>{"a_4"}</Mi> i <Mi>{"a_7"}</Mi> przez <Mi>{"a_1"}</Mi> oraz
          różnicę <Mi>{"r"}</Mi>. Z warunku <Mi>{"a_3 + a_5 = 10"}</Mi> wyprowadź zależność między{" "}
          <Mi>{"a_1"}</Mi> i <Mi>{"r"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"a_n = a_1 + (n-1)r"}</Mb>
        </FormulaBox>
        <p>
          Dla ciągu geometrycznego <Mi>{"(b_1, b_2, b_3)"}</Mi> zachodzi{" "}
          <Mi>{"b_2^2 = b_1 \\cdot b_3"}</Mi>. Po podstawieniu wyrazów otrzymasz równanie na{" "}
          <Mi>{"r"}</Mi>. Pamiętaj, że ciąg <Mi>{"(a_n)"}</Mi> jest <strong>malejący</strong>, więc{" "}
          <Mi>{"r < 0"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyrazy ciągu arytmetycznego</p>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi> jest arytmetyczny, więc <Mi>{"a_n = a_1 + (n-1)r"}</Mi>:
        </p>
        <Mb>{"a_3 = a_1 + 2r, \\qquad a_5 = a_1 + 4r, \\qquad a_4 = a_1 + 3r, \\qquad a_7 = a_1 + 6r"}</Mb>
        <p>Z warunku <Mi>{"a_3 + a_5 = 10"}</Mi>:</p>
        <Mb>{"(a_1 + 2r) + (a_1 + 4r) = 10 \\quad \\Longrightarrow \\quad 2a_1 + 6r = 10"}</Mb>
        <Mb>{"a_1 + 3r = 5 \\quad \\Longrightarrow \\quad a_4 = 5"}</Mb>
        <p>
          Drugi wyraz ciągu geometrycznego od razu widać bez wyznaczania <Mi>{"a_1"}</Mi> i <Mi>{"r"}</Mi>:
        </p>
        <Mb>{"a_4 - 1 = 5 - 1 = 4"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Pozostałe wyrazy ciągu geometrycznego</p>
        <p>Oznaczmy wyrazy ciągu geometrycznego:</p>
        <Mb>{"b_1 = 2a_1 + 4, \\qquad b_2 = a_4 - 1 = 4, \\qquad b_3 = -\\dfrac{1}{8}a_7"}</Mb>
        <p>
          Wyrażamy <Mi>{"b_1"}</Mi> i <Mi>{"b_3"}</Mi> przez <Mi>{"r"}</Mi>, korzystając z{" "}
          <Mi>{"a_1 = 5 - 3r"}</Mi>:
        </p>
        <Mb>{"b_1 = 2(5 - 3r) + 4 = 14 - 6r"}</Mb>
        <Mb>{"b_3 = -\\dfrac{1}{8}(a_1 + 6r) = -\\dfrac{1}{8}(5 - 3r + 6r) = -\\dfrac{5 + 3r}{8}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Warunek na ciąg geometryczny</p>
        <FormulaBox>
          <Mb>{"b_2^2 = b_1 \\cdot b_3"}</Mb>
        </FormulaBox>
        <Mb>{"16 = (14 - 6r) \\cdot \\left(-\\dfrac{5 + 3r}{8}\\right)"}</Mb>
        <p>Mnożymy obie strony przez <Mi>{"8"}</Mi>:</p>
        <Mb>{"128 = -(14 - 6r)(5 + 3r)"}</Mb>
        <Mb>{"128 = -(70 + 42r - 30r - 18r^2) = -70 - 12r + 18r^2"}</Mb>
        <Mb>{"18r^2 - 12r - 198 = 0"}</Mb>
        <p>Dzielimy przez <Mi>{"6"}</Mi>:</p>
        <Mb>{"3r^2 - 2r - 33 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Równanie kwadratowe na <Mi>{"r"}</Mi></p>
        <Mb>{"\\Delta = (-2)^2 - 4 \\cdot 3 \\cdot (-33) = 4 + 396 = 400"}</Mb>
        <Mb>{"\\sqrt{\\Delta} = 20"}</Mb>
        <Mb>{"r = \\dfrac{2 \\pm 20}{6} = \\dfrac{11}{3} \\quad \\text{lub} \\quad r = -3"}</Mb>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi> jest malejący, więc <Mi>{"r < 0"}</Mi>. Bierzemy <Mi>{"r = -3"}</Mi>.
        </p>
        <Mb>{"a_1 = 5 - 3r = 5 - 3 \\cdot (-3) = 14"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Wyrazy ciągu geometrycznego</p>
        <Mb>{"b_1 = 2 \\cdot 14 + 4 = 32"}</Mb>
        <Mb>{"b_2 = 4"}</Mb>
        <Mb>{"b_3 = -\\dfrac{1}{8} \\cdot (14 + 6 \\cdot (-3)) = -\\dfrac{1}{8} \\cdot (-4) = \\dfrac{1}{2}"}</Mb>
        <p>
          Sprawdzenie: <Mi>{"b_2^2 = 16"}</Mi>, <Mi>{"b_1 \\cdot b_3 = 32 \\cdot \\dfrac{1}{2} = 16"}</Mi>. Iloraz{" "}
          <Mi>{"q = \\dfrac{4}{32} = \\dfrac{1}{8}"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: wyrazy ciągu geometrycznego to <Mi>{"32"}</Mi>, <Mi>{"4"}</Mi>,{" "}
            <Mi>{"\\dfrac{1}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad9-ciagi-aryt-geom",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "9",
    points: "0–5",
    instruction: (
      <div className="space-y-3">
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi>, określony dla każdej liczby naturalnej <Mi>{"n \\geq 1"}</Mi>, jest arytmetyczny
          i rosnący. W tym ciągu <Mi>{"a_6 = 15"}</Mi> oraz <Mi>{"a_{15} = a_3 \\cdot (a_8 - 6)"}</Mi>.
        </p>
        <p>
          Ciąg <Mi>{"(b_n)"}</Mi>, określony dla każdej liczby naturalnej <Mi>{"n \\geq 1"}</Mi>, jest geometryczny
          i <Mi>{"b_1 = a_{11}"}</Mi> oraz <Mi>{"b_2 = a_6"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Oblicz sumę wszystkich wyrazów ciągu <Mi>{"(b_n)"}</Mi>. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"S = 64"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dla ciągu arytmetycznego zapisz wyrazy przez <Mi>{"a_1"}</Mi> i różnicę <Mi>{"r"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"a_n = a_1 + (n-1)r"}</Mb>
        </FormulaBox>
        <p>
          Podstaw <Mi>{"a_3"}</Mi>, <Mi>{"a_8"}</Mi> i <Mi>{"a_{15}"}</Mi> do warunku{" "}
          <Mi>{"a_{15} = a_3 \\cdot (a_8 - 6)"}</Mi> oraz <Mi>{"a_6 = 15"}</Mi>. Otrzymasz równanie na{" "}
          <Mi>{"r"}</Mi> — wybierz rozwiązanie dodatnie, bo ciąg jest rosnący.
        </p>
        <p>
          Dla ciągu geometrycznego <Mi>{"(b_n)"}</Mi> oblicz <Mi>{"q = \\dfrac{b_2}{b_1}"}</Mi>, a sumę wszystkich
          wyrazów (szereg geometryczny) policz ze wzoru:
        </p>
        <FormulaBox>
          <Mb>{"S = \\dfrac{b_1}{1-q}"}</Mb>
        </FormulaBox>
        <p>
          (Warunek zbieżności: <Mi>{"|q| < 1"}</Mi>.)
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Równanie na <Mi>{"r"}</Mi> w ciągu <Mi>{"(a_n)"}</Mi></p>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi> jest arytmetyczny, więc <Mi>{"a_n = a_1 + (n-1)r"}</Mi>. Z <Mi>{"a_6 = 15"}</Mi>:
        </p>
        <Mb>{"a_6 = a_1 + 5r = 15"}</Mb>
        <p>Wyrazy potrzebne w warunku:</p>
        <Mb>{"a_3 = a_1 + 2r, \\qquad a_8 = a_1 + 7r, \\qquad a_{15} = a_1 + 14r"}</Mb>
        <p>Podstawiamy <Mi>{"a_{15} = a_3 \\cdot (a_8 - 6)"}</Mi>:</p>
        <Mb>{"a_1 + 14r = (a_1 + 2r)(a_1 + 7r - 6)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wykorzystanie <Mi>{"a_6 = 15"}</Mi></p>
        <p>
          Wyrażamy wyrazy przez <Mi>{"a_6"}</Mi> i <Mi>{"r"}</Mi>:{" "}
          <Mi>{"a_n = a_6 + (n-6)r"}</Mi>.
        </p>
        <Mb>{"a_3 = 15 - 3r, \\qquad a_8 = 15 + 2r, \\qquad a_{15} = 15 + 9r"}</Mb>
        <Mb>{"15 + 9r = (15 - 3r)(9 + 2r)"}</Mb>
        <Mb>{"15 + 9r = 135 + 30r - 27r - 6r^2"}</Mb>
        <Mb>{"6r^2 - 6r - 120 = 0 \\quad \\Rightarrow \\quad r^2 - r - 20 = 0"}</Mb>
        <Mb>{"(r - 5)(r + 4) = 0 \\quad \\Rightarrow \\quad r = 5 \\quad \\text{lub} \\quad r = -4"}</Mb>
        <p>
          Ciąg jest rosnący, więc <Mi>{"r > 0"}</Mi>, stąd <Mi>{"r = 5"}</Mi>.
        </p>
        <Mb>{"a_1 = a_6 - 5r = 15 - 25 = -10"}</Mb>
        <Mb>{"a_{11} = a_1 + 10r = -10 + 50 = 40"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Ciąg <Mi>{"(b_n)"}</Mi> i iloraz</p>
        <Mb>{"b_1 = a_{11} = 40, \\qquad b_2 = a_6 = 15"}</Mb>
        <Mb>{"q = \\dfrac{b_2}{b_1} = \\dfrac{15}{40} = \\dfrac{3}{8}"}</Mb>
        <p>
          Mamy <Mi>{"|q| = \\dfrac{3}{8} < 1"}</Mi>, więc szereg geometryczny jest zbieżny.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Suma wszystkich wyrazów</p>
        <FormulaBox>
          <Mb>{"S = \\dfrac{b_1}{1-q} = \\dfrac{40}{1 - \\dfrac{3}{8}} = \\dfrac{40}{\\dfrac{5}{8}} = 64"}</Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"S = 64"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-maj-zad6-ciag-geom-zbiezny",
    source: SOURCE_CKE_MAJ_2025,
    number: "6",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi>, określony dla każdej liczby naturalnej <Mi>{"n \\geq 1"}</Mi>, jest geometryczny
          i zbieżny. W tym ciągu <Mi>{"a_1 + a_3 = 20"}</Mi> oraz <Mi>{"a_1^2 + a_3^2 = 328"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Oblicz sumę wszystkich wyrazów tego ciągu. Rozważ wszystkie przypadki. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-2">
        <p>
          Dla <Mi>{"q = \\dfrac{1}{3}"}</Mi>: <Mi>{"S = 27"}</Mi>
        </p>
        <p>
          Dla <Mi>{"q = -\\dfrac{1}{3}"}</Mi>: <Mi>{"S = \\dfrac{27}{2}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          W ciągu geometrycznym <Mi>{"a_3 = a_1 \\cdot q^2"}</Mi>. Podstaw to do obu warunków i wyznacz{" "}
          <Mi>{"a_1"}</Mi> oraz <Mi>{"q^2"}</Mi>.
        </p>
        <p>
          Możesz też traktować <Mi>{"a_1"}</Mi> i <Mi>{"a_3"}</Mi> jak dwie niewiadome: z{" "}
          <Mi>{"a_1 + a_3 = 20"}</Mi> oraz <Mi>{"a_1^2 + a_3^2 = 328"}</Mi> policz iloczyn{" "}
          <Mi>{"a_1 \\cdot a_3"}</Mi>.
        </p>
        <p>
          Ciąg jest zbieżny, więc szereg geometryczny ma sens tylko gdy <Mi>{"|q| < 1"}</Mi>. Suma:
        </p>
        <FormulaBox>
          <Mb>{"S = \\dfrac{a_1}{1 - q}"}</Mb>
        </FormulaBox>
        <p>
          Dla każdego dopuszczalnego ilorazu <Mi>{"q"}</Mi> policz <Mi>{"S"}</Mi> osobno (znak{" "}
          <Mi>{"q"}</Mi> może być dodatni lub ujemny).
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyrazy przez <Mi>{"a_1"}</Mi> i <Mi>{"q"}</Mi></p>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi> jest geometryczny, więc <Mi>{"a_n = a_1 \\cdot q^{n-1}"}</Mi>. W szczególności:
        </p>
        <Mb>{"a_3 = a_1 \\cdot q^2"}</Mb>
        <p>Warunki z treści zadania:</p>
        <Mb>{"a_1 + a_3 = 20 \\quad \\Longrightarrow \\quad a_1(1 + q^2) = 20"}</Mb>
        <Mb>{"a_1^2 + a_3^2 = 328 \\quad \\Longrightarrow \\quad a_1^2(1 + q^4) = 328"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Wyznaczenie <Mi>{"a_1"}</Mi> i <Mi>{"a_3"}</Mi> (metoda na sumę i iloczyn)
        </p>
        <p>
          Korzystamy ze wzoru skróconego mnożenia <Mi>{"(a_1 + a_3)^2 = a_1^2 + 2a_1 a_3 + a_3^2"}</Mi>:
        </p>
        <Mb>{"20^2 = 328 + 2a_1 a_3 \\quad \\Longrightarrow \\quad 400 = 328 + 2a_1 a_3"}</Mb>
        <Mb>{"a_1 \\cdot a_3 = 36"}</Mb>
        <p>
          Podstawiamy <Mi>{"a_1 = 20-a_3"}</Mi> do równania na <Mi>{"a_1 \\cdot a_3 = 36"}</Mi> i otrzymujemy równanie kwadratowe {" "}
          <Mi>{"a_3^2 - 20a_3 + 36 = 0"}</Mi>:
        </p>
        <Mb>{"\\Delta = 20^2 - 4 \\cdot 36 = 400 - 144 = 256 = 16^2"}</Mb>
        <Mb>{"a_3 = \\dfrac{20 \\pm 16}{2} \\quad \\Longrightarrow \\quad a_3 = 18 \\quad \\text{lub} \\quad a_3 = 2"}</Mb>
        <p>Możliwe pary:</p>
        <Mb>{"(a_1,\\, a_3) = (18,\\, 2) \\quad \\text{lub} \\quad (a_1,\\, a_3) = (2,\\, 18)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Które pary dają ciąg zbieżny?</p>
        <p>
          Z <Mi>{"a_3 = a_1 q^2"}</Mi> wynika <Mi>{"q^2 = \\dfrac{a_3}{a_1}"}</Mi> (przy <Mi>{"a_1 \\neq 0"}</Mi>).
        </p>
        <p>
          <strong>Przypadek A:</strong> <Mi>{"a_1 = 18"}</Mi>, <Mi>{"a_3 = 2"}</Mi>
        </p>
        <Mb>{"q^2 = \\dfrac{2}{18} = \\dfrac{1}{9} \\quad \\Longrightarrow \\quad q = \\dfrac{1}{3} \\quad \\text{lub} \\quad q = -\\dfrac{1}{3}"}</Mb>
        <p>
          Mamy <Mi>{"|q| = \\dfrac{1}{3} < 1"}</Mi>, więc szereg jest zbieżny. To dopuszczalne rozwiązanie.
        </p>
        <p>
          <strong>Przypadek B:</strong> <Mi>{"a_1 = 2"}</Mi>, <Mi>{"a_3 = 18"}</Mi>
        </p>
        <Mb>{"q^2 = \\dfrac{18}{2} = 9 \\quad \\Longrightarrow \\quad q = 3 \\quad \\text{lub} \\quad q = -3"}</Mb>
        <p>
          Wtedy <Mi>{"|q| = 3 \\geq 1"}</Mi>, więc ciąg <strong>nie jest zbieżny</strong>. Ten przypadek odrzucamy.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Suma wszystkich wyrazów dla każdego ilorazu</p>
        <p>
          Dla ciągu geometrycznego zbieżnego suma nieskończonego szeregu wynosi:
        </p>
        <FormulaBox>
          <Mb>{"S = \\dfrac{a_1}{1 - q}"}</Mb>
        </FormulaBox>
        <p>
          Zostaje <Mi>{"a_1 = 18"}</Mi> oraz dwa możliwe znaki ilorazu.
        </p>
        <p>
          <strong>Gdy</strong> <Mi>{"q = \\dfrac{1}{3}"}</Mi>:
        </p>
        <Mb>{"S = \\dfrac{18}{1 - \\dfrac{1}{3}} = \\dfrac{18}{\\dfrac{2}{3}} = 27"}</Mb>
        <p>
          <strong>Gdy</strong> <Mi>{"q = -\\dfrac{1}{3}"}</Mi>:
        </p>
        <Mb>{"S = \\dfrac{18}{1 - \\left(-\\dfrac{1}{3}\\right)} = \\dfrac{18}{\\dfrac{4}{3}} = \\dfrac{27}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź (wszystkie przypadki zbieżne):</p>
          <p className="mt-2">
            dla <Mi>{"q = \\dfrac{1}{3}"}</Mi>: <Mi>{"S = 27"}</Mi>;
          </p>
          <p>
            dla <Mi>{"q = -\\dfrac{1}{3}"}</Mi>: <Mi>{"S = \\dfrac{27}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2026-styczen-zad10",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–6",
    instruction: (
      <span>
        Ciągi <Mi>{"(a_n)"}</Mi> i <Mi>{"(b_n)"}</Mi> są geometryczne i monotoniczne
        oraz spełnione są zależności:
      </span>
    ),
    mathBlock:
      "a_3 + 2 = b_1 \\qquad \\text{oraz} \\qquad 2a_2 = 21b_2 \\qquad \\text{oraz} \\qquad b_1 \\cdot b_3 = 16",
    noteItems: [
      { text: "Ciąg " },
      { math: "(a_3,\\; 127,\\; b_1)" },
      { text: " jest arytmetyczny." },
    ],
    answers: null,

    answer: (
      <div className="space-y-2">
        <p>
          <Mi>{"a_n = \\dfrac{14}{3} \\cdot 3^n"}</Mi> - ciąg rosnący
        </p>
        <p>
          <Mi>{"b_n = \\dfrac{4096}{32^n}"}</Mi> - ciąg malejący
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: z warunku, że <Mi>{"(a_3, 127, b_1)"}</Mi> jest ciągiem arytmetycznym,
          środkowy wyraz jest średnią arytmetyczną skrajnych:
        </p>
        <FormulaBox>
          <Mb>{"a_3 + b_1 = 2 \\cdot 127 = 254"}</Mb>
        </FormulaBox>
        <p>
          W połączeniu z <Mi>{"a_3 + 2 = b_1"}</Mi> wyznacz <Mi>{"a_3"}</Mi> i{" "}
          <Mi>{"b_1"}</Mi>.
        </p>
        <p>
          Krok 2: z <Mi>{"b_1 \\cdot b_3 = 16"}</Mi> i własności ciągu geometrycznego{" "}
          (<Mi>{"b_3 = b_1 q_b^2"}</Mi>) wyznacz iloraz <Mi>{"q_b"}</Mi>. Pamiętaj, że
          ciąg jest monotoniczny.
        </p>
        <p>
          Krok 3: wyznacz <Mi>{"b_2"}</Mi>, a następnie z <Mi>{"2a_2 = 21b_2"}</Mi>{" "}
          znajdź <Mi>{"a_2"}</Mi>. Iloraz <Mi>{"q_a = a_3 / a_2"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">
          Krok 1. Wyznaczamy <Mi>{"a_3"}</Mi> i <Mi>{"b_1"}</Mi>
        </p>
        <p>
          Ciąg <Mi>{"(a_3, 127, b_1)"}</Mi> jest arytmetyczny, więc środkowy wyraz to
          średnia skrajnych:
        </p>
        <FormulaBox>
          <Mb>{"2 \\cdot 127 = a_3 + b_1 \\quad \\Rightarrow \\quad a_3 + b_1 = 254"}</Mb>
        </FormulaBox>
        <p>
          Z warunku <Mi>{"a_3 + 2 = b_1"}</Mi> podstawiamy <Mi>{"b_1 = a_3 + 2"}</Mi>:
        </p>
        <Mb>{"a_3 + (a_3 + 2) = 254 \\quad \\Rightarrow \\quad 2a_3 = 252 \\quad \\Rightarrow \\quad a_3 = 126"}</Mb>
        <Mb>{"b_1 = 126 + 2 = 128"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy iloraz <Mi>{"q_b"}</Mi></p>
        <p>
          Dla ciągu geometrycznego <Mi>{"b_3 = b_1 \\cdot q_b^2"}</Mi>. Z warunku
          <Mi>{"\\; b_1 \\cdot b_3 = 16"}</Mi>:
        </p>
        <Mb>{"128 \\cdot b_3 = 16 \\quad \\Rightarrow \\quad b_3 = \\frac{1}{8}"}</Mb>
        <Mb>{"b_1 \\cdot q_b^2 = b_3 \\quad \\Rightarrow \\quad 128 \\cdot q_b^2 = \\frac{1}{8} \\quad \\Rightarrow \\quad q_b^2 = \\frac{1}{1024}"}</Mb>
        <Mb>{"q_b = \\pm\\frac{1}{32}"}</Mb>
        <p>
          Ciąg <Mi>{"(b_n)"}</Mi> jest monotoniczny, więc nie może zmieniać znaku. Dla{" "}
          <Mi>{"q_b = -\\tfrac{1}{32}"}</Mi> kolejne wyrazy na przemian byłyby dodatnie
          i ujemne. Stąd <Mi>{"q_b = \\dfrac{1}{32}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy iloraz <Mi>{"q_a"}</Mi></p>
        <p>
          Obliczamy <Mi>{"b_2 = b_1 \\cdot q_b = 128 \\cdot \\dfrac{1}{32} = 4"}</Mi>.
        </p>
        <p>
          Z warunku <Mi>{"2a_2 = 21b_2"}</Mi>:
        </p>
        <Mb>{"2a_2 = 21 \\cdot 4 = 84 \\quad \\Rightarrow \\quad a_2 = 42"}</Mb>
        <p>
          Iloraz ciągu <Mi>{"(a_n)"}</Mi>:
        </p>
        <Mb>{"q_a = \\frac{a_3}{a_2} = \\frac{126}{42} = 3"}</Mb>
        <p>
          Pierwszy wyraz: <Mi>{"a_1 = \\dfrac{a_2}{q_a} = \\dfrac{42}{3} = 14"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Wzory ogólne</p>
        <Mb>{"a_n = 14 \\cdot 3^{n-1} = \\frac{14}{3} \\cdot 3^n"}</Mb>
        <FormulaBox>
          <Mb>{"a_n = \\frac{14}{3} \\cdot 3^n"}</Mb>
        </FormulaBox>
        <Mb>{"b_n = 128 \\cdot \\left(\\frac{1}{32}\\right)^{n-1} = 128 \\cdot 32 \\cdot \\frac{1}{32^n} = \\frac{4096}{32^n}"}</Mb>
        <FormulaBox>
          <Mb>{"b_n = \\frac{4096}{32^n}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 5. Monotoniczność</p>
        <p>
          Ciąg <Mi>{"(a_n)"}</Mi>: iloraz <Mi>{"q_a = 3 > 1"}</Mi> i pierwszy wyraz{" "}
          <Mi>{"a_1 = 14 > 0"}</Mi>, więc ciąg jest <strong>rosnący</strong>.
        </p>
        <p>
          Ciąg <Mi>{"(b_n)"}</Mi>: iloraz <Mi>{"q_b = \\tfrac{1}{32} \\in (0,1)"}</Mi> i
          pierwszy wyraz <Mi>{"b_1 = 128 > 0"}</Mi>, więc ciąg jest <strong>malejący</strong>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p className="mt-3">
            <Mi>{"a_n = \\dfrac{14}{3} \\cdot 3^n"}</Mi> - ciąg rosnący
          </p>
          <p className="mt-4">
            <Mi>{"b_n = \\dfrac{4096}{32^n}"}</Mi> - ciąg malejący
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 2 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad7",
    source: "Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony",
    number: "2",
    points: "0–4",
    instruction: (
      <span>
        Nieskończony ciąg geometryczny <Mi>{"(a_n)"}</Mi> jest określony dla każdej
        liczby naturalnej <Mi>{"n \\geq 1"}</Mi>. Suma wszystkich wyrazów ciągu{" "}
        <Mi>{"(a_n)"}</Mi> o numerach parzystych jest równa <Mi>{"444{,}(4)"}</Mi>, tj.
      </span>
    ),
    mathBlock: "a_2 + a_4 + a_6 + \\ldots = 444{,}(4)",
    noteItems: [{ text: "Ponadto " }, { math: "\\sqrt{a_1 \\cdot a_3} = 160" }, { text: " oraz ciąg " }, { math: "(a_n)" }, { text: " jest monotoniczny. Oblicz sumę wszystkich wyrazów tego ciągu. Zapisz obliczenia." }],
    answers: null,

    answer: <p><Mi>{"S = 1000"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"\\sqrt{a_1 \\cdot a_3} = \\sqrt{a_1^2 q^2} = a_1 q = a_2"}</Mi>,
          więc <Mi>{"a_2 = 160"}</Mi>.
        </p>
        <p>
          Suma wyrazów parzystych to ciąg geometryczny z pierwszym wyrazem <Mi>{"a_1 q"}</Mi> i ilorazem{" "}
          <Mi>{"q^2"}</Mi>.
          Wartość z treści (<Mi>{"444{,}(4)"}</Mi>) zamieniasz np. tak: niech{" "}
          <Mi>{"x = 0{,}(4)"}</Mi>, wtedy <Mi>{"1000 x = 444{,}(4)"}</Mi>, a jednocześnie{" "}
          <Mi>{"444{,}(4) = 444 + x"}</Mi>, więc <Mi>{"1000 x = 444 + x"}</Mi>, stąd{" "}
          <Mi>{"999 x = 444"}</Mi>, dalej{" "}
          <Mi>{"444{,}(4) = 444 + x = \\dfrac{4000}{9}"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"\\frac{a_1 q}{1-q^2} = \\frac{4000}{9}"}</Mb>
        </FormulaBox>
        <p>
          Monotoniczny ciąg geometryczny nie może mieć ujemnego ilorazu, więc <Mi>{"q > 0"}</Mi>,
          co później usprawni wybór znaku przy rozwiązaniu równania na <Mi>{"q"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"a_1 q"}</Mi></p>
        <p>
          Ciąg geometryczny nieskończony jest <strong>monotoniczny</strong>, więc nie zmienia znaku
          na przemian, stąd <Mi>{"q > 0"}</Mi>.
        </p>
        <Mb>
          {"\\sqrt{a_1 \\cdot a_3} = \\sqrt{a_1 \\cdot a_1 q^2} = \\sqrt{a_1^2 q^2} = |a_1| \\cdot q = 160"}
        </Mb>
        <p>
          Suma dodatnia wyrazów parzystych jest szeregiem geometrycznym o pierwszym wyrazie{" "}
          <Mi>{"a_2 = a_1 q"}</Mi> i dodatnim ilorazie <Mi>{"q^2"}</Mi>, więc jej pierwszy wyraz musi
          być dodatni: <Mi>{"a_1 q > 0"}</Mi>.
          Razem z <Mi>{"q > 0"}</Mi> daje to <Mi>{"a_1 > 0"}</Mi>, więc{" "}
          <Mi>{"|a_1| \\cdot q = a_1 q = 160"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy iloraz <Mi>{"q"}</Mi></p>
        <p>Zamiana ułamka okresowego <Mi>{"444{,}(4)"}</Mi> algorytmicznie:</p>
        <Mb>
          {"\\text{Niech } x = 0{,}(4). \\quad \\text{Wtedy}\\quad 1000 x = 444{,}(4)\\ \\text{i}\\quad 444{,}(4)=444+x"}
        </Mb>
        <Mb>{"\\Rightarrow \\quad 1000 x = 444 + x \\quad \\Rightarrow \\quad 999 x = 444"}</Mb>
        <Mb>
          {"\\Rightarrow \\quad x = \\dfrac{444}{999} = \\dfrac{4}{9} \\quad \\Rightarrow \\quad 444{,}(4)=444+x=\\dfrac{4000}{9}"}
        </Mb>
        <p>Suma wyrazów parzystych (ciąg geometryczny z wyrazem pierwszym <Mi>{"a_1 q"}</Mi> i ilorazem <Mi>{"q^2"}</Mi>):</p>
        <FormulaBox>
          <Mb>{"\\frac{a_1 q}{1-q^2} = \\frac{4000}{9} \\quad\\Rightarrow\\quad \\frac{160}{1-q^2} = \\frac{4000}{9}"}</Mb>
        </FormulaBox>
        <Mb>{"1-q^2 = \\frac{160 \\cdot 9}{4000} = \\frac{9}{25} \\quad\\Rightarrow\\quad q^2 = \\frac{16}{25}"}</Mb>
        <p>
          Z kroku 1 mamy już <Mi>{"q > 0"}</Mi>, więc{" "}
          <Mi>{"q = \\dfrac{4}{5}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Monotoniczność i suma całkowita</p>
        <p>
          Dla <Mi>{"a_1 = \\dfrac{a_2}{q} = \\dfrac{160}{\\tfrac{4}{5}} = 200"}</Mi>,{" "}
          <Mi>{"q \\in (0{,}\\, 1)"}</Mi>: ciąg malejący, zgodnie z treścią. ✓
        </p>
        <FormulaBox>
          <Mb>{"S = \\frac{a_1}{1-q} = \\frac{200}{1-\\tfrac{4}{5}} = \\frac{200}{\\tfrac{1}{5}} = 1000"}</Mb>
        </FormulaBox>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "cke-formula2023-maj-2026-przyklad-zad6-ciagi",
    source:
      "Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023",
    number: "3",
    points: "0–4",
    instruction: (
      <span>
        Dany jest skończony ciąg arytmetyczny <Mi>{"(a_n)"}</Mi>, którego liczba wyrazów jest
        większa niż <Mi>{"6"}</Mi>. Pierwszy wyraz tego ciągu jest równy <Mi>{"1"}</Mi>, a ostatni
        wyraz jest równy <Mi>{"(-2025)"}</Mi>. Wyrazy drugi, trzeci i szósty tego ciągu (w tej
        kolejności) tworzą ciąg geometryczny.
      </span>
    ),
    mathBlock: null,
    noteItems: [{ text: "Oblicz sumę wszystkich wyrazów ciągu " }, { math: "(a_n)" }, { text: ". Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"S_n = -1\\,026\\,168"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zapisz ogólny wyraz ciągu arytmetycznego:{" "}
          <Mi>{"a_k = a_1 + (k-1)r"}</Mi>, przy{" "}
          <Mi>{"a_1 = 1"}</Mi>.
        </p>
        <p>
          Trzy kolejne wyrazy ciągu geometrycznego (w kolejności {" "}
          <Mi>{"a_2,\\ a_3,\\ a_6"}</Mi>) muszą spełniać klasyczny warunek na środkowy wyraz:
        </p>
        <FormulaBox>
          <Mb>{"a_3^2 = a_2 \\cdot a_6"}</Mb>
        </FormulaBox>
        <p>To da równanie kwadratowe na <Mi>{"r"}</Mi>; jedno z rozwiązań odpowiada ciągowi stałemu
          i nie pozwala mieć ostatniego wyrazu równego <Mi>{"-2025"}</Mi>.</p>
        <p>Gdy znajdziesz <Mi>{"r"}</Mi> oraz liczbę wyrazów {" "}<Mi>{"n"}</Mi>, użyj wzoru</p>
        <FormulaBox>
          <Mb>{"S_n = \\dfrac{a_1+a_n}{2}\\cdot n"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Ogólny wzór na wyraz ciągu arytmetycznego</p>
        <p>
          W ciągu arytmetycznym o różnicy <Mi>{"r"}</Mi> przy{" "}
          <Mi>{"a_1 = 1"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"a_k = 1+(k-1)r \\qquad \\text{dla}\\ k \\in \\{1,\\,2,\\,3,\\ldots\\}\\text{.}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Warunek geometryczny</p>
        <p>
          Skoro <Mi>{"a_2,\\ a_3,\\ a_6"}</Mi>, w takiej kolejności, tworzą ciąg geometryczny,
          środkowy wyraz jest geometryczną średnią skrajnych:
        </p>
        <Mb>{"a_3^2 = a_2 \\cdot a_6"}</Mb>
        <p>Podstawiamy wartości z ciągu arytmetycznego:</p>
        <Mb>{"\\bigl(1+2r\\bigr)^2 = \\bigl(1+r\\bigr)\\bigl(1+5r\\bigr)"}</Mb>
        <Mb>{"1+4r+4r^2 = 1+6r+5r^2"}</Mb>
        <Mb>{"0 = r^2+2r = r(r+2) \\quad \\Rightarrow \\quad r = 0 \\quad \\text{lub}\\quad r = -2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozstrzygnięcie między <Mi>{"r = 0"}</Mi> i{" "} <Mi>{"r = -2"}</Mi></p>
        <p>
          Dla <Mi>{"r = 0"}</Mi> mamy stały ciąg <Mi>{"a_n = 1"}</Mi>, więc ostatnim wyrazem nie może być{" "}
          <Mi>{"-2025"}</Mi>. Odrzucamy.
        </p>
        <p>
          Dla <Mi>{"r = -2"}</Mi>:
        </p>
        <Mb>{"a_k = 1 + (k-1)(-2) = 3-2k"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczba wyrazów</p>
        <p>
          Skoro ostatni wyraz (o numerze <Mi>{"n"}</Mi>) wynosi <Mi>{"-2025"}</Mi>,
        </p>
        <Mb>{"3-2n = -2025 \\quad \\Rightarrow \\quad 2n = 2028 \\quad \\Rightarrow \\quad n = 1014"}</Mb>
        <p>
          To spełnia założenie <Mi>{"n>6"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 5. Suma</p>
        <FormulaBox>
          <Mb>{"S_n = \\frac{a_1+a_n}{2}\\cdot n = \\frac{1+(-2025)}{2}\\cdot 1014 = -1012\\cdot 1014 = -1\\,026\\,168"}</Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>{"S_{1014} = -1\\,026\\,168"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad2-granica-ciagu",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "2",
    points: null,
    instruction: "Oblicz",
    mathBlock:
      "\\lim_{n \\to \\infty} \\frac{1}{n}\\left[\\left(1+\\frac{1}{n}\\right) + \\left(1+\\frac{2}{n}\\right) + \\left(1+\\frac{3}{n}\\right) + \\ldots + \\left(1+\\frac{n-1}{n}\\right)\\right]",
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\dfrac{3}{2}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że wyrażenia w nawiasie kwadratowym tworzą ciąg arytmetyczny
          o pierwszym wyrazie <Mi>{"a_1 = 1 + \\dfrac{1}{n}"}</Mi> i różnicy{" "}
          <Mi>{"r = \\dfrac{1}{n}"}</Mi>. Policz, ile jest wyrazów i zastosuj wzór:
        </p>
        <FormulaBox>
          <Mb>{"S_m = \\frac{a_1 + a_m}{2} \\cdot m"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Ciąg arytmetyczny w nawiasie</p>
        <p>
          Wyrażenia w nawiasie kwadratowym to:
        </p>
        <Mb>
          {"\\left(1+\\frac{1}{n}\\right),\\quad \\left(1+\\frac{2}{n}\\right),\\quad \\left(1+\\frac{3}{n}\\right),\\quad \\ldots,\\quad \\left(1+\\frac{n-1}{n}\\right)"}
        </Mb>
        <p>
          Tworzą one ciąg arytmetyczny o:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>pierwszym wyrazie <Mi>{"a_1 = 1 + \\dfrac{1}{n}"}</Mi>,</li>
          <li>różnicy <Mi>{"r = \\dfrac{1}{n}"}</Mi>,</li>
          <li>ostatnim wyrazie <Mi>{"a_{n-1} = 1 + \\dfrac{n-1}{n}"}</Mi>,</li>
          <li>liczbie wyrazów <Mi>{"m = n - 1"}</Mi>.</li>
        </ul>

        <p className="font-semibold text-stone-800">Krok 2. Suma ciągu arytmetycznego</p>
        <p>Korzystamy ze wzoru:</p>
        <FormulaBox>
          <Mb>{"S = \\frac{a_1 + a_m}{2} \\cdot m"}</Mb>
        </FormulaBox>
        <Mb>
          {"S = \\frac{\\left(1 + \\dfrac{1}{n}\\right) + \\left(1 + \\dfrac{n-1}{n}\\right)}{2} \\cdot (n-1) = \\frac{2 + \\dfrac{1}{n} + \\dfrac{n-1}{n}}{2} \\cdot (n-1)"}
        </Mb>
        <p>
          W liczniku upraszczamy ułamki:
        </p>
        <Mb>
          {"\\frac{1}{n} + \\frac{n-1}{n} = \\frac{n}{n} = 1"}
        </Mb>
        <p>Stąd:</p>
        <Mb>
          {"S = \\frac{2 + 1}{2} \\cdot (n-1) = \\frac{3}{2}(n-1)"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Mnożymy przez <Mi>{"\\dfrac{1}{n}"}</Mi> i liczymy granicę</p>
        <Mb>
          {"\\frac{1}{n} \\cdot \\frac{3(n-1)}{2} = \\frac{3}{2} \\cdot \\frac{n-1}{n} = \\frac{3}{2} \\cdot \\left(1 - \\frac{1}{n}\\right)"}
        </Mb>
        <p>
          Gdy <Mi>{"n \\to \\infty"}</Mi>, wyrażenie <Mi>{"\\dfrac{1}{n} \\to 0"}</Mi>, więc:
        </p>
        <Mb>
          {"\\lim_{n \\to \\infty} \\frac{3}{2} \\cdot \\left(1 - \\frac{1}{n}\\right) = \\frac{3}{2} \\cdot 1 = \\frac{3}{2}"}
        </Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\dfrac{3}{2}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad10-ciag-geom-aryt",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "10",
    points: "0–2",
    instruction: (
      <div className="space-y-3">
        <p>
          Trójka liczb całkowitych tworzy ciąg geometryczny o ilorazie całkowitym. Gdy najmniejszą
          z nich zwiększymy o <Mi>{"9"}</Mi>, to w tej samej kolejności powstanie ciąg arytmetyczny.
          Znajdź te liczby.
        </p>
        <p>a) Ile jest takich ciągów geometrycznych?</p>
        <p>b) Ile spośród tych ciągów geometrycznych jest rosnących?</p>
        <p>c) Ile spośród tych ciągów jest malejących?</p>
        <p>d) Ile spośród tych ciągów jest naprzemiennych?</p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>a) <Mi>{"4"}</Mi></p>
        <p>b) <Mi>{"0"}</Mi></p>
        <p>c) <Mi>{"2"}</Mi></p>
        <p>d) <Mi>{"2"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Oznacz ciąg geometryczny jako <Mi>{"a,\\ aq,\\ aq^2"}</Mi> i rozpatrz osobno, który
          wyraz jest najmniejszy (zależy od znaków <Mi>{"a"}</Mi> i <Mi>{"q"}</Mi>). Warunek
          arytmetyczności po zwiększeniu najmniejszego wyrazu o <Mi>{"9"}</Mi> daje równanie
          postaci:
        </p>
        <FormulaBox>
          <Mb>{"a(q-1)^2 = \\pm k"}</Mb>
        </FormulaBox>
        <p>
          gdzie <Mi>{"(q-1)^2"}</Mi> musi być dzielnikiem pewnej stałej. Sprawdź, dla których
          całkowitych <Mi>{"q"}</Mi> dostaniesz całkowite <Mi>{"a"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Oznaczenia i warunek arytmetyczności</p>
        <p>
          Ciąg geometryczny: <Mi>{"a,\\ aq,\\ aq^2"}</Mi>, gdzie <Mi>{"a, q \\in \\mathbb{Z}"}</Mi>,{" "}
          <Mi>{"q \\neq 0"}</Mi>, <Mi>{"q \\neq 1"}</Mi>
          {" "}(bo przy <Mi>{"q = 1"}</Mi> ciąg jest stały i dodanie <Mi>{"9"}</Mi> nie da ciągu arytmetycznego).
        </p>
        <p>
          Zwiększamy <strong>najmniejszy</strong> wyraz o <Mi>{"9"}</Mi>. Który wyraz jest
          najmniejszy, zależy od znaków <Mi>{"a"}</Mi> i <Mi>{"q"}</Mi>. Rozpatrujemy dwa
          przypadki: najmniejszy jest wyraz środkowy albo ostatni.
        </p>

        <p className="font-semibold text-stone-800">
          Krok 2. Przypadek A: najmniejszy jest <Mi>{"aq^2"}</Mi> (ostatni wyraz)
        </p>
        <p>
          Po zwiększeniu ciąg <Mi>{"a,\\ aq,\\ aq^2 + 9"}</Mi> jest arytmetyczny, więc:
        </p>
        <Mb>{"2aq = a + aq^2 + 9"}</Mb>
        <Mb>{"a(2q - 1 - q^2) = 9 \\quad \\Longrightarrow \\quad -a(q-1)^2 = 9"}</Mb>
        <FormulaBox>
          <Mb>{"a(q-1)^2 = -9"}</Mb>
        </FormulaBox>
        <p>
          Potrzebujemy <Mi>{"a < 0"}</Mi> (bo <Mi>{"(q-1)^2 > 0"}</Mi>), a <Mi>{"(q-1)^2"}</Mi>{" "}
          musi być dzielnikiem <Mi>{"9"}</Mi> będącym kwadratem: <Mi>{"1"}</Mi> lub <Mi>{"9"}</Mi>.
        </p>
        <p><strong><Mi>{"(q-1)^2 = 1"}</Mi>:</strong> <Mi>{"q = 2"}</Mi> (bo <Mi>{"q = 0"}</Mi> daje
          zdegenerowany ciąg), <Mi>{"a = -9"}</Mi>.</p>
        <Mb>{"(-9,\\ -18,\\ -36) \\quad \\text{najmniejszy: } -36 \\checkmark"}</Mb>
        <p>Sprawdzenie: <Mi>{"(-9,\\ -18,\\ -27)"}</Mi> — różnica <Mi>{"-9"}</Mi>. ✓</p>

        <p><strong><Mi>{"(q-1)^2 = 9"}</Mi>:</strong> <Mi>{"q = 4"}</Mi> lub <Mi>{"q = -2"}</Mi>, <Mi>{"a = -1"}</Mi>.</p>
        <Mb>{"q = 4: \\quad (-1,\\ -4,\\ -16) \\quad \\text{najmniejszy: } -16 \\checkmark"}</Mb>
        <p>Sprawdzenie: <Mi>{"(-1,\\ -4,\\ -7)"}</Mi> — różnica <Mi>{"-3"}</Mi>. ✓</p>
        <Mb>{"q = -2: \\quad (-1,\\ 2,\\ -4) \\quad \\text{najmniejszy: } -4 \\checkmark"}</Mb>
        <p>Sprawdzenie: <Mi>{"(-1,\\ 2,\\ 5)"}</Mi> — różnica <Mi>{"3"}</Mi>. ✓</p>

        <p className="font-semibold text-stone-800">
          Krok 3. Przypadek B: najmniejszy jest <Mi>{"aq"}</Mi> (środkowy wyraz)
        </p>
        <p>
          To zdarza się, gdy <Mi>{"q < 0"}</Mi> i <Mi>{"a > 0"}</Mi> (wtedy środkowy wyraz
          jest ujemny, a skrajne dodatnie). Po zwiększeniu: <Mi>{"a,\\ aq + 9,\\ aq^2"}</Mi>{" "}
          jest arytmetyczny:
        </p>
        <Mb>{"2(aq + 9) = a + aq^2 \\quad \\Longrightarrow \\quad a(q-1)^2 = 18"}</Mb>
        <p>
          Teraz <Mi>{"a > 0"}</Mi>, a <Mi>{"(q-1)^2"}</Mi> musi być kwadratowym dzielnikiem{" "}
          <Mi>{"18"}</Mi>: to <Mi>{"1"}</Mi> lub <Mi>{"9"}</Mi>.
        </p>
        <p>
          <strong><Mi>{"(q-1)^2 = 1"}</Mi>:</strong>{" "}
          <Mi>{"q = 2"}</Mi>, <Mi>{"a = 18"}</Mi> → <Mi>{"(18,\\ 36,\\ 72)"}</Mi>.
          Środkowy wyraz <Mi>{"36"}</Mi> nie jest najmniejszy. ✗
        </p>
        <p>
          <strong><Mi>{"(q-1)^2 = 9"}</Mi>:</strong>{" "}
          <Mi>{"q = -2"}</Mi>, <Mi>{"a = 2"}</Mi> → <Mi>{"(2,\\ -4,\\ 8)"}</Mi>.
          Środkowy <Mi>{"-4"}</Mi> jest najmniejszy. ✓
        </p>
        <p>Sprawdzenie: <Mi>{"(2,\\ 5,\\ 8)"}</Mi> — różnica <Mi>{"3"}</Mi>. ✓</p>

        <p className="font-semibold text-stone-800">Krok 4. Zestawienie i odpowiedzi</p>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-stone-300">
                <th className="text-left py-1.5 pr-3">Ciąg</th>
                <th className="text-left py-1.5 pr-3"><Mi>{"q"}</Mi></th>
                <th className="text-center py-1.5 pr-3">Rosnący?</th>
                <th className="text-center py-1.5 pr-3">Malejący?</th>
                <th className="text-center py-1.5">Naprzemienny?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-200">
                <td className="py-1.5 pr-3"><Mi>{"(2,\\ -4,\\ 8)"}</Mi></td>
                <td className="py-1.5 pr-3"><Mi>{"-2"}</Mi></td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5">tak</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="py-1.5 pr-3"><Mi>{"(-1,\\ 2,\\ -4)"}</Mi></td>
                <td className="py-1.5 pr-3"><Mi>{"-2"}</Mi></td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5">tak</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="py-1.5 pr-3"><Mi>{"(-9,\\ -18,\\ -36)"}</Mi></td>
                <td className="py-1.5 pr-3"><Mi>{"2"}</Mi></td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5">tak</td>
                <td className="text-center py-1.5">nie</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3"><Mi>{"(-1,\\ -4,\\ -16)"}</Mi></td>
                <td className="py-1.5 pr-3"><Mi>{"4"}</Mi></td>
                <td className="text-center py-1.5 pr-3">nie</td>
                <td className="text-center py-1.5">tak</td>
                <td className="text-center py-1.5">nie</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"4"}</Mi>, b) <Mi>{"0"}</Mi>, c) <Mi>{"2"}</Mi>, d) <Mi>{"2"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function CiagiPage() {
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
          <span className="text-sm text-stone-400">Ciągi</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 11
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Ciągi
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
