"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, poziom rozszerzony, CKE, maj 2025";

const tasks = [
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
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
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
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
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
      "Matura z matematyki, poziom rozszerzony, arkusz CKE (formuła 2023), egzamin maj 2026",
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
