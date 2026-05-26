"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, SubTask, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_F2023 =
  "Matura z matematyki, poziom rozszerzony, formuła 2023, egzamin w 2026 roku CKE (arkusz z 11 maja 2023)";

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, poziom rozszerzony, CKE, czerwiec 2025, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, poziom rozszerzony, CKE, maj 2025";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna, Politechnika Łódzka, marzec 2025";

const tasks = [
  {
    id: "cke-2025-maj-zad3-trojkat-rownoboczny",
    source: SOURCE_CKE_MAJ_2025,
    number: "3",
    points: "0–3",
    instruction: (
      <span>
        W trójkącie równobocznym <Mi>{"ABC"}</Mi> punkt <Mi>{"D"}</Mi> leży na boku <Mi>{"BC"}</Mi>. Stosunek
        pola trójkąta <Mi>{"ABD"}</Mi> do pola trójkąta <Mi>{"ADC"}</Mi> jest równy{" "}
        <Mi>{"\\dfrac{\\sqrt{3}-1}{2}"}</Mi>. Oblicz miarę kąta <Mi>{"DAC"}</Mi>. Zapisz obliczenia.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\angle DAC = 45^\\circ"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Oznacz <Mi>{"\\alpha = \\angle DAC"}</Mi>. W trójkącie równobocznym{" "}
          <Mi>{"\\angle BAC = 60^\\circ"}</Mi>, więc <Mi>{"\\angle DAB = 60^\\circ - \\alpha"}</Mi>.
        </p>
        <p>
          Zapisz pola obu trójkątów wzorem na pole z dwoma bokami i kątem między nimi (wspólny bok to{" "}
          <Mi>{"AD"}</Mi>, a drugie boki wychodzą z wierzchołka <Mi>{"A"}</Mi>):
        </p>
        <FormulaBox>
          <Mb>
            {
              "P_{ABD} = \\frac{1}{2} \\cdot |AB| \\cdot |AD| \\cdot \\sin(\\angle DAB), \\qquad P_{ADC} = \\frac{1}{2} \\cdot |AC| \\cdot |AD| \\cdot \\sin(\\angle DAC)"
            }
          </Mb>
        </FormulaBox>
        <p>
          W trójkącie równobocznym <Mi>{"|AB| = |AC|"}</Mi>, więc po podzieleniu pól wiele czynników się
          skróci. Następnie zastosuj wzór na sinus różnicy kątów do{" "}
          <Mi>{"\\sin(60^\\circ - \\alpha)"}</Mi> i rozwiąż równanie na <Mi>{"\\alpha"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Oznaczenia i kąty przy wierzchołku <Mi>{"A"}</Mi></p>
        <p>
          Niech <Mi>{"\\alpha = \\angle DAC"}</Mi>. Trójkąt <Mi>{"ABC"}</Mi> jest równoboczny, więc{" "}
          <Mi>{"\\angle BAC = 60^\\circ"}</Mi> oraz <Mi>{"|AB| = |AC|"}</Mi>. Punkt <Mi>{"D"}</Mi> leży na{" "}
          <Mi>{"BC"}</Mi>, więc promienie <Mi>{"AB"}</Mi> i <Mi>{"AC"}</Mi> są wspólne dla obu mniejszych
          trójkątów, a kąty przy <Mi>{"A"}</Mi> dzielą kąt <Mi>{"60^\\circ"}</Mi>:
        </p>
        <Mb>{"\\angle DAB = 60^\\circ - \\alpha"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Pola trójkątów</p>
        <p>
          W obu trójkątach wspólny jest bok <Mi>{"AD"}</Mi>, a drugie boki wychodzą z wierzchołka{" "}
          <Mi>{"A"}</Mi>. Korzystamy ze wzoru na pole:
        </p>
        <Mb>
          {
            "P_{ABD} = \\frac{1}{2} \\cdot |AB| \\cdot |AD| \\cdot \\sin(\\angle DAB) = \\frac{1}{2} \\cdot |AB| \\cdot |AD| \\cdot \\sin(60^\\circ - \\alpha)"
          }
        </Mb>
        <Mb>
          {
            "P_{ADC} = \\frac{1}{2} \\cdot |AC| \\cdot |AD| \\cdot \\sin(\\angle DAC) = \\frac{1}{2} \\cdot |AC| \\cdot |AD| \\cdot \\sin \\alpha"
          }
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Stosunek pól</p>
        <p>Z treści zadania:</p>
        <Mb>
          {
            "\\frac{P_{ABD}}{P_{ADC}} = \\frac{\\sqrt{3}-1}{2}"
          }
        </Mb>
        <p>
          Ponieważ <Mi>{"|AB| = |AC|"}</Mi>, czynniki <Mi>{"\\dfrac{1}{2}"}</Mi>, <Mi>{"|AB|/|AC|"}</Mi> oraz{" "}
          <Mi>{"|AD|"}</Mi> skracają się:
        </p>
        <Mb>
          {
            "\\frac{\\sin(60^\\circ - \\alpha)}{\\sin \\alpha} = \\frac{\\sqrt{3}-1}{2}"
          }
        </Mb>

        <p className="font-semibold text-stone-800">Krok 4. Wzór na sinus różnicy kątów</p>
        <p>
          Korzystamy ze wzoru <Mi>{"\\sin(x - y) = \\sin x \\cos y - \\cos x \\sin y"}</Mi> oraz wartości{" "}
          <Mi>{"\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}"}</Mi>, <Mi>{"\\cos 60^\\circ = \\dfrac{1}{2}"}</Mi>:
        </p>
        <Mb>
          {
            "\\sin(60^\\circ - \\alpha) = \\sin 60^\\circ \\cos \\alpha - \\cos 60^\\circ \\sin \\alpha = \\frac{\\sqrt{3}}{2}\\cos \\alpha - \\frac{1}{2}\\sin \\alpha"
          }
        </Mb>
        <p>Podstawiamy do równania ze stosunkiem pól i dzielimy obie strony przez <Mi>{"\\sin \\alpha"}</Mi> (kąt <Mi>{"\\alpha"}</Mi> jest ostry, więc <Mi>{"\\sin \\alpha > 0"}</Mi>):</p>
        <Mb>
          {
            "\\frac{\\sqrt{3}}{2}\\cdot\\frac{\\cos \\alpha}{\\sin \\alpha} - \\frac{1}{2} = \\frac{\\sqrt{3}-1}{2}"
          }
        </Mb>
        <Mb>
          {
            "\\frac{\\sqrt{3}}{2}\\operatorname{ctg} \\alpha = \\frac{\\sqrt{3}-1}{2} + \\frac{1}{2} = \\frac{\\sqrt{3}}{2}"
          }
        </Mb>
        <Mb>{"\\operatorname{ctg} \\alpha = 1 \\quad \\Rightarrow \\quad \\alpha = 45^\\circ"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie (opcjonalnie)</p>
        <p>
          Dla <Mi>{"\\alpha = 45^\\circ"}</Mi> mamy <Mi>{"60^\\circ - \\alpha = 15^\\circ"}</Mi>. Z tożsamości na{" "}
          <Mi>{"\\sin 15^\\circ"}</Mi>:
        </p>
        <Mb>
          {
            "\\frac{\\sin 15^\\circ}{\\sin 45^\\circ} = \\frac{\\sin(45^\\circ - 30^\\circ)}{\\sin 45^\\circ} = \\frac{\\sqrt{3}-1}{2}"
          }
        </Mb>
        <p>
          Zgodnie z warunkiem zadania. Ponieważ <Mi>{"0^\\circ < \\alpha < 60^\\circ"}</Mi>, jedynym rozwiązaniem
          jest <Mi>{"\\angle DAC = 45^\\circ"}</Mi>.
        </p>
      </div>
    ),
  },

  {
    id: "cke-2025-maj-zad7-trapez-srodki-ramion",
    source: SOURCE_CKE_MAJ_2025,
    number: "7",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          W trapezie <Mi>{"ABCD"}</Mi> o podstawach <Mi>{"AB"}</Mi> i <Mi>{"CD"}</Mi> punkt <Mi>{"E"}</Mi> jest
          środkiem ramienia <Mi>{"AD"}</Mi>, a punkt <Mi>{"F"}</Mi> jest środkiem ramienia <Mi>{"BC"}</Mi>{" "}
          trapezu. Stosunek pola trapezu <Mi>{"EFCD"}</Mi> do pola trapezu <Mi>{"ABFE"}</Mi> jest równy{" "}
          <Mi>{"\\dfrac{1}{2}"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Wykaż, że <Mi>{"\\dfrac{|CD|}{|AB|} = \\dfrac{1}{5}"}</Mi>.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Oznacz długości podstaw: <Mi>{"|AB| = a"}</Mi>, <Mi>{"|CD| = b"}</Mi>. Z twierdzenia na odcinek łączący
          środki ramion trapezu:
        </p>
        <FormulaBox>
          <Mb>{"|EF| = \\dfrac{a + b}{2}"}</Mb>
        </FormulaBox>
        <p>
          (średnia arytmetyczna długości obu podstaw). Ponieważ <Mi>{"E"}</Mi> i <Mi>{"F"}</Mi> są środkami ramion,
          odcinek <Mi>{"EF"}</Mi> dzieli trapez na dwa mniejsze trapezy o <strong>tej samej wysokości</strong>{" "}
          (każdy ma połowę wysokości całego trapezu <Mi>{"ABCD"}</Mi>).
        </p>
        <p>
          Zapisz pola <Mi>{"EFCD"}</Mi> i <Mi>{"ABFE"}</Mi> wzorem na pole trapezu, podstaw stosunek{" "}
          <Mi>{"\\dfrac{1}{2}"}</Mi> i rozwiąż równanie na <Mi>{"\\dfrac{b}{a}"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"P = \\dfrac{(c + d) \\cdot h}{2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Oznaczenia i odcinek środkowy</p>
        <p>
          Niech <Mi>{"|AB| = a"}</Mi> oraz <Mi>{"|CD| = b"}</Mi> (podstawy trapezu <Mi>{"ABCD"}</Mi>). Punkty{" "}
          <Mi>{"E"}</Mi> i <Mi>{"F"}</Mi> są środkami ramion <Mi>{"AD"}</Mi> i <Mi>{"BC"}</Mi>, więc odcinek{" "}
          <Mi>{"EF"}</Mi> łączy środki ramion. Z twierdzenia na ten odcinek:
        </p>
        <FormulaBox>
          <Mb>{"|EF| = \\dfrac{|AB| + |CD|}{2} = \\dfrac{a + b}{2}"}</Mb>
        </FormulaBox>
        <p>
          Odcinek <Mi>{"EF"}</Mi> jest równoległy do podstaw i dzieli trapez na dwa trapezy: dolny{" "}
          <Mi>{"ABFE"}</Mi> (podstawy <Mi>{"AB"}</Mi> i <Mi>{"EF"}</Mi>) oraz górny <Mi>{"EFCD"}</Mi> (podstawy{" "}
          <Mi>{"EF"}</Mi> i <Mi>{"CD"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Wspólna wysokość obu trapezów</p>
        <p>
          Ponieważ <Mi>{"E"}</Mi> i <Mi>{"F"}</Mi> leżą w połowie wysokości ramion, odległość od podstawy{" "}
          <Mi>{"AB"}</Mi> do <Mi>{"EF"}</Mi> jest taka sama jak od <Mi>{"EF"}</Mi> do <Mi>{"CD"}</Mi>. Oznaczmy
          tę wspólną wysokość obu mniejszych trapezów przez <Mi>{"h"}</Mi> (to połowa wysokości trapezu{" "}
          <Mi>{"ABCD"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Pola trapezów</p>
        <p>Korzystamy ze wzoru na pole trapezu <Mi>{"P = \\dfrac{(\\text{suma podstaw}) \\cdot h}{2}"}</Mi>:</p>
        <Mb>
          {"P_{EFCD} = \\dfrac{|EF| + |CD|}{2} \\cdot h = \\dfrac{\\dfrac{a+b}{2} + b}{2} \\cdot h = \\dfrac{a + 3b}{4} \\cdot h"}
        </Mb>
        <Mb>
          {"P_{ABFE} = \\dfrac{|AB| + |EF|}{2} \\cdot h = \\dfrac{a + \\dfrac{a+b}{2}}{2} \\cdot h = \\dfrac{3a + b}{4} \\cdot h"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 4. Warunek na stosunek pól</p>
        <p>Z treści zadania <Mi>{"\\dfrac{P_{EFCD}}{P_{ABFE}} = \\dfrac{1}{2}"}</Mi>. Ponieważ oba trapezy mają tę
          samą wysokość <Mi>{"h > 0"}</Mi>, czynnik <Mi>{"h"}</Mi> się skraca:</p>
        <Mb>{"\\dfrac{a + 3b}{3a + b} = \\dfrac{1}{2}"}</Mb>
        <Mb>{"2(a + 3b) = 3a + b"}</Mb>
        <Mb>{"2a + 6b = 3a + b \\quad \\Longrightarrow \\quad 5b = a"}</Mb>
        <Mb>{"\\dfrac{b}{a} = \\dfrac{1}{5} \\quad \\Longrightarrow \\quad \\dfrac{|CD|}{|AB|} = \\dfrac{1}{5} \\quad \\blacksquare"}</Mb>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad4-trapez",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "4",
    points: "0–3",
    instruction: (
      <div className="space-y-4">
        <p>
          Dany jest prostokąt <Mi>{"ABCD"}</Mi>, w którym <Mi>{"|AB| = 2 \\cdot |AD|"}</Mi>. Na bokach{" "}
          <Mi>{"AB"}</Mi>, <Mi>{"BC"}</Mi>, <Mi>{"CD"}</Mi> i <Mi>{"DA"}</Mi> tego prostokąta wybrano odpowiednio
          punkty <Mi>{"K"}</Mi>, <Mi>{"L"}</Mi>, <Mi>{"M"}</Mi> i <Mi>{"N"}</Mi> (każdy z tych punktów leży na
          dokładnie jednym boku prostokąta <Mi>{"ABCD"}</Mi>). Czworokąt <Mi>{"KLMN"}</Mi> jest trapezem
          prostokątnym (zobacz rysunek), a wysokość <Mi>{"LM"}</Mi> tego trapezu jest równoległa do przekątnej{" "}
          <Mi>{"BD"}</Mi> prostokąta.
        </p>
        <figure className="flex flex-col items-center mx-auto w-[40%] max-w-full font-normal">
          <Image
            src="/matura/planimetria_cke_czerwiec_4.png"
            alt="Prostokąt ABCD z punktami K, L, M, N na bokach; czworokąt KLMN jest trapezem prostokątnym, LM równoległe do BD"
            width={520}
            height={380}
            className="w-full h-auto rounded-lg border border-[#c4a8e8] bg-white"
          />
        </figure>
        <p className="font-semibold">
          Wykaż, że stosunek pola trójkąta <Mi>{"MDN"}</Mi> do pola trójkąta <Mi>{"KBL"}</Mi> jest równy{" "}
          <Mi>{"16"}</Mi>.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Niech <Mi>{"|AD| = a"}</Mi>, więc <Mi>{"|AB| = |CD| = 2a"}</Mi> i <Mi>{"|BC| = a"}</Mi>. W trójkącie{" "}
          <Mi>{"ABD"}</Mi> (z przekątnej prostokąta) oznacz kąt przy <Mi>{"D"}</Mi> jako <Mi>{"\\alpha"}</Mi>.
        </p>
        <p>
          Z równoległości <Mi>{"LM \\parallel BD"}</Mi> i kątów prostych trapezu pokaż podobieństwa:{" "}
          <Mi>{"\\triangle ABD \\sim \\triangle DMN \\sim \\triangle MCL \\sim \\triangle KBL"}</Mi>, ze
          stosunkiem przyprostokątnych <Mi>{"2 : 1"}</Mi> (jak boki <Mi>{"AB"}</Mi> i <Mi>{"AD"}</Mi>).
        </p>
        <p>
          Przyjmij <Mi>{"|DM| = x"}</Mi> i wyraź pozostałe odcinki przez <Mi>{"a"}</Mi> i <Mi>{"x"}</Mi>, potem
          policz pola <Mi>{"\\triangle MDN"}</Mi> i <Mi>{"\\triangle KBL"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Oznaczenia i trójkąt z przekątnej</p>
        <p>
          Niech <Mi>{"|AD| = a"}</Mi>. Z warunku <Mi>{"|AB| = 2 \\cdot |AD|"}</Mi> mamy{" "}
          <Mi>{"|AB| = |CD| = 2a"}</Mi> oraz <Mi>{"|BC| = a"}</Mi>.
        </p>
        <p>
          Rozpatrzmy trójkąt prostokątny <Mi>{"ABD"}</Mi> (kąt prosty przy <Mi>{"A"}</Mi>). Oznaczmy
        </p>
        <Mb>{"\\alpha = \\angle ADB"}</Mb>
        <p>
          Wtedy <Mi>{"\\angle ABD = 90° - \\alpha"}</Mi> oraz, bo <Mi>{"|AB| = 2a"}</Mi> i <Mi>{"|AD| = a"}</Mi>:
        </p>
        <Mb>{"\\tg \\alpha = \\frac{|AB|}{|AD|} = 2"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Kąty w trójkącie <Mi>{"DMN"}</Mi></p>
        <p>
          Z rysunku trapezu prostokątnego <Mi>{"KLMN"}</Mi> wynika, że <Mi>{"\\angle NML = 90°"}</Mi> (wysokość{" "}
          <Mi>{"LM"}</Mi> prostopadła do podstawy <Mi>{"NM"}</Mi>). Ponieważ <Mi>{"LM \\parallel BD"}</Mi>, odpowiednie
          kąty przy prostych równoległych są równe, więc układ kątów w trójkącie <Mi>{"DMN"}</Mi> jest taki sam jak w
          trójkącie <Mi>{"ABD"}</Mi> złożonym z przekątnej:
        </p>
        <Mb>{"\\angle DNM = \\alpha, \\qquad \\angle DMN = 90° - \\alpha"}</Mb>
        <p>
          (kąt prosty trapezu przy <Mi>{"M"}</Mi> odpowiada kątowi prostemu przy <Mi>{"A"}</Mi> w trójkącie{" "}
          <Mi>{"ABD"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Podobieństwa trójkątów przy rogach</p>
        <p>
          Z równoległości <Mi>{"LM \\parallel BD"}</Mi> i powyższych kątów wynika, że trójkąty „wycięte” w rogach
          prostokąta są podobne do <Mi>{"\\triangle ABD"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\triangle ABD \\sim \\triangle DMN \\sim \\triangle MCL \\sim \\triangle KBL"}</Mb>
        </FormulaBox>
        <p>
          W każdym z nich stosunek dłuższej przyprostej do krótszej jest taki jak w prostokącie, czyli{" "}
          <Mi>{"2 : 1"}</Mi> (odpowiednik stosunku <Mi>{"|AB| : |AD|"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Długości odcinków</p>
        <p>
          Punkt <Mi>{"M"}</Mi> leży na <Mi>{"CD"}</Mi>, punkt <Mi>{"N"}</Mi> na <Mi>{"DA"}</Mi>. Przyjmijmy
        </p>
        <Mb>{"|DM| = x, \\qquad |DN| = 2x"}</Mb>
        <p>
          (stosunek <Mi>{"2 : 1"}</Mi> jak przyprostokątnych w podobnym trójkącie <Mi>{"ABD"}</Mi>). Wtedy:
        </p>
        <Mb>{"|MC| = |CD| - |DM| = 2a - x"}</Mb>
        <p>
          Z podobieństwa <Mi>{"\\triangle MCL \\sim \\triangle ABD"}</Mi> przy wierzchołku <Mi>{"C"}</Mi> (krótsza
          przyprostokątna to <Mi>{"|CL|"}</Mi>, dłuższa <Mi>{"|MC|"}</Mi>):
        </p>
        <Mb>{"|CL| = \\dfrac{|MC|}{2} = \\dfrac{2a - x}{2}"}</Mb>
        <p>
          Punkt <Mi>{"L"}</Mi> leży na <Mi>{"BC"}</Mi>, więc:
        </p>
        <Mb>{"|BL| = |BC| - |CL| = a - \\dfrac{2a - x}{2} = \\dfrac{x}{2}"}</Mb>
        <p>
          Z podobieństwa <Mi>{"\\triangle KBL \\sim \\triangle ABD"}</Mi> przy wierzchołku <Mi>{"B"}</Mi>:
        </p>
        <Mb>{"|KB| = \\dfrac{|BL|}{2} = \\dfrac{x}{4}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Pola trójkątów i stosunek</p>
        <p>
          Trójkąt <Mi>{"MDN"}</Mi> ma kąt prosty przy <Mi>{"D"}</Mi> (leży w rogu prostokąta), więc:
        </p>
        <Mb>{"P_{MDN} = \\dfrac{1}{2} \\cdot |DM| \\cdot |DN| = \\dfrac{1}{2} \\cdot x \\cdot 2x = x^2"}</Mb>
        <p>
          Trójkąt <Mi>{"KBL"}</Mi> ma kąt prosty przy <Mi>{"B"}</Mi>:
        </p>
        <Mb>{"P_{KBL} = \\dfrac{1}{2} \\cdot |KB| \\cdot |BL| = \\dfrac{1}{2} \\cdot \\dfrac{x}{4} \\cdot \\dfrac{x}{2} = \\dfrac{x^2}{16}"}</Mb>
        <p>Stosunek pól:</p>
        <Mb>
          {"\\dfrac{P_{MDN}}{P_{KBL}} = \\dfrac{x^2}{\\dfrac{x^2}{16}} = 16 \\quad \\blacksquare"}
        </Mb>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad7-czworokat-opisany",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "7",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Na czworokącie wypukłym <Mi>{"ABCD"}</Mi> o bokach długości: <Mi>{"|AB| = 3"}</Mi>,{" "}
          <Mi>{"|BC| = 3"}</Mi>, <Mi>{"|CD| = 5"}</Mi> oraz <Mi>{"|DA| = 8"}</Mi>, opisano okrąg.
        </p>
        <p className="font-semibold text-stone-800">
          Oblicz promień tego okręgu. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"R = \\dfrac{7\\sqrt{3}}{3}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Znasz wszystkie cztery boki. Narysuj jedną przekątną (np. <Mi>{"AC"}</Mi>) i rozłóż czworokąt na dwa
          trójkąty.
        </p>
        <p>
          Czworokąt wpisany w okrąg jest cykliczny: kąty naprzeciwległe sumują się do{" "}
          <Mi>{"180°"}</Mi>, więc cosinusy tych kątów przeciwnych znaków (<Mi>{"\\cos(180° - \\alpha) = -\\cos(\\alpha)"}</Mi>). W obu trójkątach zapisz
          twierdzenie cosinusów z tą samą przekątną i wyznacz cosinus jednego z kątów (oraz długość
          przekątnej).
        </p>
        <FormulaBox>
          <Mb>{"c^2 = a^2 + b^2 - 2ab\\cos\\gamma"}</Mb>
        </FormulaBox>
        <p>
          Potem wybierz trójkąt złożony z dwóch boków i tej przekątnej (np.{" "}
          <Mi>{"\\triangle ABC"}</Mi>) i skorzystaj z twierdzenia sinusów: wierzchołki tego trójkąta leżą na
          tym samym okręgu co cały czworokąt, więc{" "}
          <Mi>{"\\dfrac{a}{\\sin\\alpha} = 2R"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przekątna i własność czworokąta cyklicznego</p>
        <p>
          Czworokąt <Mi>{"ABCD"}</Mi> jest wpisany w okrąg, więc jest cykliczny. Kąty naprzeciwległe sumują
          się do <Mi>{"180°"}</Mi>:
        </p>
        <Mb>{"\\angle ABC + \\angle ADC = 180°"}</Mb>
        <p>
          Stąd <Mi>{"\\cos(\\angle ADC) = -\\cos(\\angle ABC)"}</Mi>. Oznaczmy przekątną{" "}
          <Mi>{"f = |AC|"}</Mi> i <Mi>{"c = \\cos(\\angle ABC)"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Twierdzenie cosinusów w obu trójkątach</p>
        <p>W trójkącie <Mi>{"ABC"}</Mi> (boki <Mi>{"3"}</Mi>, <Mi>{"3"}</Mi> i przekątna <Mi>{"f"}</Mi>):</p>
        <FormulaBox>
          <Mb>{"c^2 = a^2 + b^2 - 2ab\\cos\\gamma"}</Mb>
        </FormulaBox>
        <Mb>{"f^2 = 3^2 + 3^2 - 2 \\cdot 3 \\cdot 3 \\cdot c = 18 - 18c"}</Mb>
        <p>W trójkącie <Mi>{"ADC"}</Mi> (boki <Mi>{"8"}</Mi>, <Mi>{"5"}</Mi> i ta sama przekątna <Mi>{"f"}</Mi>):</p>
        <Mb>{"f^2 = 8^2 + 5^2 - 2 \\cdot 8 \\cdot 5 \\cdot \\cos(\\angle ADC) = 89 - 80\\cos(\\angle ADC)"}</Mb>
        <p>
          Podstawiamy <Mi>{"\\cos(\\angle ADC) = -c"}</Mi>:
        </p>
        <Mb>{"f^2 = 89 + 80c"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Długość przekątnej i cosinus kąta</p>
        <p>Przyrównujemy oba wyrażenia na <Mi>{"f^2"}</Mi>:</p>
        <Mb>{"18 - 18c = 89 + 80c \\quad \\Rightarrow \\quad 98c = -71 \\quad \\Rightarrow \\quad c = -\\dfrac{71}{98}"}</Mb>
        <Mb>{"f^2 = 18 - 18 \\cdot \\left(-\\dfrac{71}{98}\\right) = 18 + \\dfrac{1278}{98} = \\dfrac{1521}{49} \\quad \\Rightarrow \\quad f = \\dfrac{39}{7}"}</Mb>
        <p>
          (bo <Mi>{"f > 0"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Twierdzenie sinusów i promień okręgu</p>
        <p>
          Trójkąt <Mi>{"ABC"}</Mi> ma wierzchołki na okręgu opisanym na <Mi>{"ABCD"}</Mi>, więc dla tego
          trójkąta obowiązuje:
        </p>
        <FormulaBox>
          <Mb>{"\\dfrac{a}{\\sin\\alpha} = 2R"}</Mb>
        </FormulaBox>
        <p>
          Bierzemy bok <Mi>{"f = |AC|"}</Mi> i kąt naprzeciwko niego, czyli <Mi>{"\\angle ABC"}</Mi>:
        </p>
        <Mb>{"2R = \\dfrac{f}{\\sin(\\angle ABC)}"}</Mb>
        <p>
          Mamy <Mi>{"\\cos(\\angle ABC) = -\\dfrac{71}{98}"}</Mi>. Korzystając z jedynki trygonometrycznej, obliczamy sinus kąta <Mi>{"\\angle ABC"}</Mi>:
        </p>
        <Mb>
          {"\\sin^2(\\angle ABC) = 1 - \\cos^2(\\angle ABC) = 1 - \\dfrac{5041}{9604} = \\dfrac{4563}{9604}"}
        </Mb>
        <Mb>{"\\sin(\\angle ABC) = \\dfrac{\\sqrt{4563}}{98} = \\dfrac{39\\sqrt{3}}{98}"}</Mb>
        <p>(kąt <Mi>{"\\angle ABC"}</Mi> jest rozwarty, więc sinus jest dodatni).</p>
        <Mb>
          {"2R = \\dfrac{\\dfrac{39}{7}}{\\dfrac{39\\sqrt{3}}{98}} = \\dfrac{39}{7} \\cdot \\dfrac{98}{39\\sqrt{3}} = \\dfrac{14}{\\sqrt{3}} = \\dfrac{14\\sqrt{3}}{3}"}
        </Mb>
        <Mb>{"R = \\dfrac{7\\sqrt{3}}{3}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"R = \\dfrac{7\\sqrt{3}}{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2026-formula2023-maj-zad4-kwadrat",
    source: SOURCE_CKE_F2023,
    number: "1",
    points: "0–3",
    instruction: (
      <div className="space-y-4">
        <p>
          Punkty <Mi>{"K"}</Mi> i <Mi>{"L"}</Mi> są środkami, odpowiednio, boków <Mi>{"AB"}</Mi> oraz{" "}
          <Mi>{"BC"}</Mi> kwadratu <Mi>{"ABCD"}</Mi> o boku długości <Mi>{"a"}</Mi>. Punkt <Mi>{"M"}</Mi> jest
          takim punktem na boku <Mi>{"BC"}</Mi>, że odcinki <Mi>{"DK"}</Mi> i <Mi>{"KM"}</Mi> są
          prostopadłe.
        </p>
        <p>
          Odcinek <Mi>{"AL"}</Mi> przecina odcinki <Mi>{"DK"}</Mi> oraz <Mi>{"DM"}</Mi> w punktach{" "}
          <Mi>{"P"}</Mi> oraz <Mi>{"Q"}</Mi> (zobacz rysunek).
        </p>
        <figure className="flex flex-col items-center mx-auto w-[35%] max-w-full font-normal">
          <Image
            src="/matura/planimetria-cke-2026.png"
            alt="Kwadrat ABCD: DK i KM są prostopadłe w punkcie K na środku AB; M na BC; AL przecina DK w P i DM w Q"
            width={500}
            height={300}
            className="w-full h-auto rounded-lg border border-[#c4a8e8] bg-white"
          />
        </figure>
        <p className="font-semibold">
          Wykaż, że <Mi>{"|PQ|=\\dfrac{\\sqrt{5}}{5}a"}</Mi>.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Analizując kąty w odpowiednich trójkątach można wykazać, że{" "}
          <Mi>{"\\triangle DAK \\sim \\triangle KBM \\sim \\triangle AKP"}</Mi> oraz obliczyć długość <Mi>{"|BM|"}</Mi>.
        </p>
        <p>
          Dla przecięcia <Mi>{"P"}</Mi> poszukaj podobieństwa przy wspólnym wierzchołku <Mi>{"P"}</Mi>. Punkt{" "}
          <Mi>{"Q"}</Mi>: przedłuż <Mi>{"DM"}</Mi> do przecięcia z prostą <Mi>{"AB"}</Mi>, znajdź stosunki przy{" "}
          <Mi>{"M"}</Mi> przez podobieństwo prostokątnych trójkątów przy <Mi>{"B"}</Mi> i <Mi>{"C"}</Mi>, następnie{" "}
          zastosuj twierdzenie Menelaosa do <Mi>{"\\triangle ABL"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p>
          <span className="font-semibold text-stone-800">Plan.</span> Najpierw wyznaczamy położenie <Mi>{"M"}</Mi> na{" "}
          <Mi>{"BC"}</Mi> z prostych <Mi>{"DK"}</Mi> i <Mi>{"KM"}</Mi>. Potem na odcinku <Mi>{"AL"}</Mi> liczymy ile
          „długości <Mi>{"AL"}</Mi>” zajmują odcinki <Mi>{"AP"}</Mi> i <Mi>{"AQ"}</Mi>. Różnica da <Mi>{"|PQ|"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">
          Krok 1. Podobieństwa trójkątów
        </p>
        <p>
          Oznaczenia z treści: <Mi>{"K"}</Mi> i <Mi>{"L"}</Mi> to środki <Mi>{"AB"}</Mi> i <Mi>{"BC"}</Mi>, więc{" "}
          <Mi>{"|AK|=|KB|=|BL|=\\frac{a}{2}"}</Mi> oraz <Mi>{"|DA|=|AB|=a"}</Mi>.
        </p>
        <p>
          Trójkąty <Mi>{"\\triangle DAK"}</Mi> i <Mi>{"\\triangle KBM"}</Mi> mają kąty proste odpowiednio przy{" "}
          <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>. Pokażemy, że mają też równe kąty ostre, więc są podobne.
        </p>
        <p>
          Oznaczmy kąt <Mi>{"\\angle ADK = \\alpha"}</Mi>, skąd <Mi>{"\\angle AKD = 90° - \\alpha"}</Mi>. {" "}
          Dodatkowo <Mi>{"\\angle AKD + \\angle BKM = 90°"}</Mi>. Zatem <Mi>{"\\angle BKM = \\alpha"}</Mi> oraz <Mi>{"\\angle KMB = 90° - \\alpha"}</Mi>. {" "}
          Stosując takie same argumenty dla trójkątów <Mi>{"\\triangle AKP"}</Mi> i <Mi>{"\\triangle APD"}</Mi> otrzymujemy podobieństwo trójkątów:
        </p>
        <FormulaBox>
          <Mb>{"\\triangle DAK \\sim \\triangle KBM \\sim \\triangle AKP \\sim \\triangle APD"}</Mb>
        </FormulaBox>
        <p>Zatem kąty <Mi>{"\\angle APK = \\angle APD = 90°"}</Mi>.</p>
        <p>
          Z podobieństwa trójkątów mamy odpowiedające sobie boki: <Mi>{"|DA|"}</Mi> i <Mi>{"|KB|"}</Mi>, oraz <Mi>{"|AK|"}</Mi> i <Mi>{"|BM|"}</Mi>. Z proporcji:
        </p>
        <Mb>
          {"\\frac{|DA|}{|KB|} = \\frac{|AK|}{|BM|} \\quad \\Rightarrow \\quad \\frac{a}{\\frac{a}{2}} = \\frac{\\frac{a}{2}}{|BM|} \\quad \\Rightarrow \\quad |BM| = \\frac{a}{4}"}
        </Mb>
        <Mb>
          {"|ML| = |BL| - |BM| = \\frac{a}{2} - \\frac{a}{4} = \\frac{a}{4}, \\qquad |MC| = |BC| - |BM| = \\frac{3a}{4}"}
        </Mb>
        <p> 
          Podobnie mamy dla <Mi>{"|DK|"}</Mi> i <Mi>{"|DA|"}</Mi>, oraz <Mi>{"|AK|"}</Mi> i <Mi>{"|AP|"}</Mi>:
        </p>
        <Mb>
          {"|DK|^2 = a^2 +\\frac{a^2}{4} = \\frac{5a^2}{4} \\qquad \\Rightarrow \\qquad |DK| = \\frac{\\sqrt{5}}{2}a"}
        </Mb>
        <Mb>
          {"\\frac{|DK|}{|DA|} = \\frac{|AK|}{|AP|} \\quad \\Rightarrow \\quad \\frac{\\frac{\\sqrt{5}}{2}a}{a} = \\frac{\\frac{a}{2}}{|AP|} \\quad \\Rightarrow \\quad |AP| = \\frac{\\sqrt{5}}{5}a"}
        </Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Twierdzenie Pitagorasa i pozostałe boki
        </p>
        <p>Korzystając z twierdzenia Pitagorasa w odpowiednich trójkątach dostajemy długości pozostałych boków, które posłużą nam do obliczenia <Mi>{"|PQ|"}</Mi>.</p>
        <Mb>
          {"|AP|^2 + |DP|^2 = |DA|^2 \\qquad \\Rightarrow \\qquad |DP| = \\frac{2\\sqrt{5}}{5}a"}
        </Mb>
        <Mb>
          {"|KB|^2 + |BM|^2 = |KM|^2 \\qquad \\Rightarrow \\qquad |KM| = \\frac{\\sqrt{5}}{4}a"}
        </Mb>

        <p className="font-semibold text-stone-800">
          Krok 3. Obliczenie <Mi>{"|PQ|"}</Mi>
        </p>
        <p>Korzystając z podobieństwa trójkątów <Mi>{"\\triangle DKM"}</Mi> i <Mi>{"\\triangle DPQ"}</Mi> otrzymujemy:</p>
        <Mb>
          {"\\frac{|DK|}{|DP|} = \\frac{|KM|}{|PQ|} \\quad \\Rightarrow \\quad \\frac{\\frac{\\sqrt{5}}{2}a}{\\frac{2\\sqrt{5}}{5}a} = \\frac{\\frac{\\sqrt{5}}{4}a}{|PQ|} \\quad \\Rightarrow \\quad |PQ| = \\frac{\\sqrt{5}}{5}a  \\quad \\blacksquare"}
        </Mb>
      </div>
    ),
  },
  {
    id: "smwp-2026-styczen-zad5",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "2",
    points: "0–4",
    instruction: (
      <span>
        W czworokąt <Mi>{"ABCD"}</Mi> o obwodzie <Mi>{"30"}</Mi> wpisano okrąg. Przekątna{" "}
        <Mi>{"|AC|"}</Mi> ma długość <Mi>{"2\\sqrt{3}"}</Mi> i tworzy kąt{" "}
        <Mi>{"ACB"}</Mi> o mierze <Mi>{"60°"}</Mi>. Bok <Mi>{"|BC|"}</Mi> tego
        czworokąta jest dwukrotnie dłuższy od jego przekątnej <Mi>{"|AC|"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: [{ text: "Oblicz długości wszystkich boków czworokąta ABCD. Zapisz obliczenia." }],
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>
          <Mi>{"|AB| = 6"}</Mi>
        </p>
        <p>
          <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>
        </p>
        <p>
          <Mi>{"|CD| = 9"}</Mi>
        </p>
        <p>
          <Mi>{"|DA| = 15 - 4\\sqrt{3}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: oblicz <Mi>{"|BC| = 2|AC| = 4\\sqrt{3}"}</Mi>.
        </p>
        <p>
          Krok 2: w trójkącie <Mi>{"ABC"}</Mi> znasz dwa boki i kąt między nimi (przy wierzchołku{" "}
          <Mi>{"C"}</Mi>). Użyj twierdzenia cosinusów, żeby znaleźć <Mi>{"|AB|"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"c^2 = a^2 + b^2 - 2ab\\cos\\gamma"}</Mb>
        </FormulaBox>
        <p>
          Krok 3: skorzystaj z twierdzenia Pitota dla czworokąta z wpisanym okręgiem. Mówi ono, że
          sumy par przeciwległych boków są równe:
        </p>
        <FormulaBox>
          <Mb>{"|AB| + |CD| = |BC| + |DA|"}</Mb>
        </FormulaBox>
        <p>
          W połączeniu z warunkiem na obwód wyznaczysz wszystkie boki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Obliczamy |BC|</p>
        <p>
          Z treści zadania <Mi>{"|BC| = 2|AC| = 2 \\cdot 2\\sqrt{3} = 4\\sqrt{3}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Twierdzenie cosinusów w trójkącie ABC</p>
        <p>
          Znamy: <Mi>{"|AC| = 2\\sqrt{3}"}</Mi>, <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>,{" "}
          <Mi>{"\\angle ACB = 60°"}</Mi>. Szukamy <Mi>{"|AB|"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"|AB|^2 = |AC|^2 + |BC|^2 - 2 \\cdot |AC| \\cdot |BC| \\cdot \\cos(\\angle ACB)"}</Mb>
        </FormulaBox>
        <Mb>
          {"|AB|^2 = (2\\sqrt{3})^2 + (4\\sqrt{3})^2 - 2 \\cdot 2\\sqrt{3} \\cdot 4\\sqrt{3} \\cdot \\cos 60°"}
        </Mb>
        <Mb>{"|AB|^2 = 12 + 48 - 2 \\cdot 2\\sqrt{3} \\cdot 4\\sqrt{3} \\cdot \\frac{1}{2}"}</Mb>
        <Mb>{"|AB|^2 = 60 - 2\\sqrt{3} \\cdot 4\\sqrt{3} = 60 - 8 \\cdot 3 = 60 - 24 = 36"}</Mb>
        <p>
          <Mi>{"|AB| = 6"}</Mi>
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Twierdzenie Pitota</p>
        <p>
          Jeżeli w czworokąt wpisano okrąg, to sumy par przeciwległych boków są równe:
        </p>
        <FormulaBox>
          <Mb>{"|AB| + |CD| = |BC| + |DA|"}</Mb>
        </FormulaBox>
        <p>
          Z warunkiem na obwód:{" "}
          <Mi>{"|AB| + |BC| + |CD| + |DA| = 30"}</Mi>, co oznacza:
        </p>
        <Mb>{"(|AB| + |CD|) + (|BC| + |DA|) = 30"}</Mb>
        <p>
          Ponieważ obie sumy są równe:
        </p>
        <Mb>{"|AB| + |CD| = |BC| + |DA| = 15"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy |CD| i |DA|</p>
        <Mb>{"|AB| + |CD| = 15 \\quad \\Rightarrow \\quad 6 + |CD| = 15 \\quad \\Rightarrow \\quad |CD| = 9"}</Mb>
        <Mb>{"|BC| + |DA| = 15 \\quad \\Rightarrow \\quad 4\\sqrt{3} + |DA| = 15 \\quad \\Rightarrow \\quad |DA| = 15 - 4\\sqrt{3}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p>
            <Mi>{"|AB| = 6"}</Mi>, <Mi>{"|BC| = 4\\sqrt{3}"}</Mi>,{" "}
            <Mi>{"|CD| = 9"}</Mi>, <Mi>{"|DA| = 15 - 4\\sqrt{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad3",
    source: "Matura próbna SMWP, październik 2025, poziom rozszerzony",
    number: "3",
    points: "0–3",
    instruction: (
      <span>
        Dany jest czworokąt <Mi>{"ABCD"}</Mi>, w którym <Mi>{"|CD| = 17"}</Mi> oraz{" "}
        <Mi>{"|AD| = 19"}</Mi>. Przekątna <Mi>{"|BD|"}</Mi> czworokąta ma długość{" "}
        <Mi>{"11\\sqrt{6}"}</Mi> i cosinus kąta <Mi>{"BAD"}</Mi> jest równy{" "}
        <Mi>{"\\left(-\\dfrac{2}{17}\\right)"}</Mi>. Ponadto, na czworokącie{" "}
        <Mi>{"ABCD"}</Mi> można opisać okrąg.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: <p><Mi>{"76"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Zastosuj twierdzenie cosinusów w trójkącie <Mi>{"ABD"}</Mi>, aby wyznaczyć{" "}
          <Mi>{"|AB|"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"|BD|^2 = |AB|^2 + |AD|^2 - 2\\cdot|AB|\\cdot|AD|\\cos(\\angle BAD)"}</Mb>
        </FormulaBox>
        <p>
          Ponieważ na <Mi>{"ABCD"}</Mi> można opisać okrąg, kąty naprzeciwległe sumują
          się do <Mi>{"180°"}</Mi>. Użyj tego, by wyznaczyć <Mi>{"|BC|"}</Mi> z{" "}
          <Mi>{"\\triangle BCD"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"|AB|"}</Mi> z trójkąta <Mi>{"ABD"}</Mi></p>
        <p>Twierdzenie cosinusów w <Mi>{"\\triangle ABD"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"|BD|^2 = |AB|^2 + |AD|^2 - 2\\cdot|AB|\\cdot|AD|\\cos(\\angle BAD)"}</Mb>
        </FormulaBox>
        <Mb>{"(11\\sqrt{6})^2 = |AB|^2 + 19^2 - 2\\cdot|AB|\\cdot 19\\cdot\\left(-\\frac{2}{17}\\right)"}</Mb>
        <Mb>{"726 = |AB|^2 + 361 + \\frac{76}{17}|AB|"}</Mb>
        <p>Mnożymy przez 17:</p>
        <Mb>{"17|AB|^2 + 76|AB| - 6205 = 0"}</Mb>
        <p>
          <Mi>{"\\Delta = 76^2 + 4 \\cdot 17 \\cdot 6205 = 5776 + 421940 = 427716 = 654^2"}</Mi>
        </p>
        <Mb>{"|AB| = \\frac{-76 + 654}{2\\cdot 17} = \\frac{578}{34} = 17"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Korzystamy z własności czworokąta wpisanego w okrąg</p>
        <p>
          Dla czworokąta cyklicznego kąty naprzeciwległe sumują się do <Mi>{"180°"}</Mi>, więc{" "}
          <Mi>{"\\angle BCD = 180° - \\angle BAD"}</Mi>. Oznaczając{" "}
          <Mi>{"\\alpha = \\angle BAD"}</Mi>, zachodzi{" "}
          <Mi>{"\\cos(180° - \\alpha) = -\\cos\\alpha"}</Mi>.
        </p>
        <Mb>{"\\angle BAD + \\angle BCD = 180° \\quad\\Rightarrow\\quad \\cos(\\angle BCD) = -\\cos(\\angle BAD) = \\frac{2}{17}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wyznaczamy <Mi>{"|BC|"}</Mi> z trójkąta <Mi>{"BCD"}</Mi></p>
        <Mb>{"|BD|^2 = |BC|^2 + |CD|^2 - 2\\cdot|BC|\\cdot|CD|\\cos(\\angle BCD)"}</Mb>
        <Mb>{"726 = |BC|^2 + 289 - 2\\cdot|BC|\\cdot 17 \\cdot \\frac{2}{17}"}</Mb>
        <Mb>{"726 = |BC|^2 + 289 - 4|BC|"}</Mb>
        <Mb>{"|BC|^2 - 4|BC| - 437 = 0"}</Mb>
        <p>
          <Mi>{"\\Delta = 16 + 4 \\cdot 437 = 1764 = 42^2"}</Mi>
        </p>
        <Mb>{"|BC| = \\frac{4 + 42}{2} = 23"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy obwód</p>
        <Mb>{"\\text{Obwód} = |AB| + |BC| + |CD| + |DA| = 17 + 23 + 17 + 19 = 76"}</Mb>
      </div>
    ),
  },

  {
    id: "cke-2026-formula2023-maj-zad11-czworokat",
    source: SOURCE_CKE_F2023,
    number: "5",
    points: "0–6",
    instruction: (
      <div className="space-y-4">
        <p>
          W czworokącie <Mi>{"ABCD"}</Mi> są dane: <Mi>{"|AB| = 9"}</Mi>, <Mi>{"|AD| = 10"}</Mi> oraz{" "}
          <Mi>{"|\\angle BAD| = 60^\\circ"}</Mi>. W ten czworokąt wpisano okrąg oraz na tym
          czworokącie opisano okrąg (zobacz rysunek).
        </p>
        <figure className="flex flex-col items-center mx-auto w-[40%] max-w-full font-normal">
          <Image
            src="/matura/planimetria_cke_2026_zad11.png"
            alt="Czworokąt ABCD z wpisanym i opisanym okręgiem: |AB|=9, |AD|=10, kąt przy A równy 60°"
            width={520}
            height={400}
            className="w-full h-auto rounded-lg border border-[#c4a8e8] bg-white"
          />
        </figure>
        <p className="font-semibold">
          Oblicz długości boków <Mi>{"BC"}</Mi> i <Mi>{"CD"}</Mi> oraz pole czworokąta{" "}
          <Mi>{"ABCD"}</Mi>. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>
          <Mi>{"|BC| = 5"}</Mi>, <Mi>{"|CD| = 6"}</Mi>, pole <Mi>{"30\\sqrt{3}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Czworokąt opisany na okrąg: kąty naprzemianległe sumują się do{" "}
          <Mi>{"180^\\circ"}</Mi>. Przy <Mi>{"\\angle BAD = 60^\\circ"}</Mi> wyznacz{" "}
          <Mi>{"\\angle BCD"}</Mi>.
        </p>
        <p>
          Czworokąt z wpisanym okręgiem: twierdzenie Pitota{" "}
          <Mi>{"|AB| + |CD| = |BC| + |AD|"}</Mi>.
        </p>
        <p>
          Oblicz <Mi>{"BD"}</Mi> z <Mi>{"\\triangle ABD"}</Mi>, potem użyj twierdzenia cosinusów
          w <Mi>{"\\triangle BCD"}</Mi> razem z Pitotem.
        </p>
        <p>
          Pole to suma pól <Mi>{"\\triangle ABD"}</Mi> i <Mi>{"\\triangle BCD"}</Mi> ze wzorem{" "}
          <Mi>{"\\dfrac{1}{2}ab\\sin\\gamma"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Własności czworokąta</p>
        <p>
          Czworokąt opisany na okrąg: <Mi>{"\\angle BCD = 180^\\circ - \\angle BAD = 120^\\circ"}</Mi>.
        </p>
        <p>
          Pitot: <Mi>{"9 + |CD| = 10 + |BC|"}</Mi>, stąd <Mi>{"|CD| = |BC| + 1"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Przekątna <Mi>{"BD"}</Mi></p>
        <FormulaBox>
          <Mb>{"|BD|^2 = |AB|^2 + |AD|^2 - 2 \\cdot |AB| \\cdot |AD| \\cdot \\cos 60^\\circ"}</Mb>
        </FormulaBox>
        <Mb>{"|BD|^2 = 81 + 100 - 90 = 91"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Boki <Mi>{"BC"}</Mi> i <Mi>{"CD"}</Mi></p>
        <Mb>
          {
            "91 = |BC|^2 + |CD|^2 + |BC||CD| \\quad \\text{(bo } \\cos 120^\\circ = -\\tfrac{1}{2}\\text{)}"
          }
        </Mb>
        <p>Podstawiamy <Mi>{"|CD| = |BC| + 1"}</Mi>:</p>
        <Mb>{"91 = 3|BC|^2 + 3|BC| + 1"}</Mb>
        <Mb>{"|BC|^2 + |BC| - 30 = 0 \\quad \\Rightarrow \\quad |BC| = 5,\\quad |CD| = 6"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Pole</p>
        <Mb>
          {
            "P = \\frac{1}{2} \\cdot 9 \\cdot 10 \\cdot \\sin 60^\\circ + \\frac{1}{2} \\cdot 5 \\cdot 6 \\cdot \\sin 120^\\circ = 30\\sqrt{3}"
          }
        </Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"|BC| = 5"}</Mi>, <Mi>{"|CD| = 6"}</Mi>,{" "}
            <Mi>{"P_{ABCD} = 30\\sqrt{3}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad6-trojkaty-podobne",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "6",
    points: "0–4",
    instruction: (
      <div className="space-y-3">
        <p>
          Przez punkt wewnętrzny <Mi>{"P"}</Mi> trójkąta <Mi>{"ABC"}</Mi> poprowadzono proste równoległe
          do wszystkich boków. Wycięły one trzy trójkąty o polach odpowiednio: <Mi>{"1"}</Mi>,{" "}
          <Mi>{"4"}</Mi> i <Mi>{"9"}</Mi>. Oblicz pole trójkąta <Mi>{"ABC"}</Mi>.
        </p>

        {/* Schemat */}
        <div className="flex justify-center my-2">
          <svg viewBox="0 0 340 280" className="w-full max-w-sm" aria-label="Trójkąt ABC z punktem P i trzema małymi trójkątami wychodzącymi z P">
            {/* Duży trójkąt ABC */}
            <polygon points="170,20 30,260 310,260" fill="none" stroke="#6d3a8e" strokeWidth="2" />

            {/* Proste przez P równoległe do boków (przerywane) */}
            <line x1="100" y1="140" x2="240" y2="140" stroke="#c4a8e8" strokeWidth="1.2" strokeDasharray="5,3" />
            <line x1="147" y1="60" x2="263" y2="260" stroke="#c4a8e8" strokeWidth="1.2" strokeDasharray="5,3" />
            <line x1="217" y1="100" x2="123" y2="260" stroke="#c4a8e8" strokeWidth="1.2" strokeDasharray="5,3" />

            {/* Trójkąt 1: na boku AB, pole = 4 */}
            <polygon points="147,60 100,140 193,140" fill="#fef3c7" fillOpacity="0.7" stroke="#92400e" strokeWidth="1.5" />
            {/* Trójkąt 2: na boku BC, pole = 9 */}
            <polygon points="123,260 263,260 193,140" fill="#dcfce7" fillOpacity="0.7" stroke="#166534" strokeWidth="1.5" />
            {/* Trójkąt 3: na boku CA, pole = 1 */}
            <polygon points="240,140 217,100 193,140" fill="#f2ecfb" fillOpacity="0.7" stroke="#52297a" strokeWidth="1.5" />

            {/* Punkt P */}
            <circle cx="193" cy="140" r="3.5" fill="#6d3a8e" />
            <text x="189" y="130" fontSize="13" fontWeight="700" fill="#6d3a8e">P</text>

            {/* Etykiety wierzchołków */}
            <text x="163" y="14" fontSize="14" fontWeight="700" fill="#2d1458">A</text>
            <text x="12" y="274" fontSize="14" fontWeight="700" fill="#2d1458">B</text>
            <text x="314" y="274" fontSize="14" fontWeight="700" fill="#2d1458">C</text>

            {/* Pola małych trójkątów */}
            <text x="147" y="118" fontSize="13" fontWeight="600" fill="#92400e" textAnchor="middle">4</text>
            <text x="193" y="228" fontSize="13" fontWeight="600" fill="#166534" textAnchor="middle">9</text>
            <text x="216" y="128" fontSize="11" fontWeight="600" fill="#52297a" textAnchor="middle">1</text>
          </svg>
        </div>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"P_{ABC} = 36"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Trzy proste przez <Mi>{"P"}</Mi> wycinają trzy trójkąty, z których każdy ma wierzchołek
          w <Mi>{"P"}</Mi> i podstawę na innym boku <Mi>{"ABC"}</Mi>. Boki każdego z tych trójkątów
          są równoległe do boków <Mi>{"ABC"}</Mi>, więc mają te same kąty, a zatem każdy z nich
          jest <strong>podobny</strong> do <Mi>{"ABC"}</Mi>.
        </p>
        <p>
          Każdy mały trójkąt ma jeden bok na boku <Mi>{"ABC"}</Mi>. Te trzy boki dzielą bok
          dużego trójkąta na trzy części, więc ich współczynniki podobieństwa sumują się do{" "}
          <Mi>{"1"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Trzy trójkąty wychodzące z <Mi>{"P"}</Mi></p>
        <p>
          Trzy proste przez <Mi>{"P"}</Mi> (równoległe kolejno do <Mi>{"BC"}</Mi>, <Mi>{"CA"}</Mi>{" "}
          i <Mi>{"AB"}</Mi>) przecinają boki trójkąta <Mi>{"ABC"}</Mi> w sześciu punktach. Powstają
          trzy trójkąty, z których każdy ma jeden wierzchołek w <Mi>{"P"}</Mi>, a przeciwległy bok
          (podstawę) na jednym z boków <Mi>{"ABC"}</Mi>. Przy wierzchołkach <Mi>{"A"}</Mi>,{" "}
          <Mi>{"B"}</Mi>, <Mi>{"C"}</Mi> powstają równoległoboki.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Podobieństwo do <Mi>{"ABC"}</Mi></p>
        <p>
          Weźmy np. trójkąt z podstawą na <Mi>{"BC"}</Mi>. Jego dwa boki wychodzące z{" "}
          <Mi>{"P"}</Mi> leżą na prostych równoległych do <Mi>{"CA"}</Mi> i <Mi>{"AB"}</Mi>,
          a podstawa leży na <Mi>{"BC"}</Mi>. Wszystkie trzy boki są więc równoległe do
          odpowiednich boków <Mi>{"ABC"}</Mi>, co oznacza, że kąty są takie same. Ten trójkąt
          jest zatem <strong>podobny</strong> do <Mi>{"ABC"}</Mi>. Analogicznie dwa pozostałe.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Współczynniki podobieństwa sumują się do <Mi>{"1"}</Mi></p>
        <p>
          Oznaczmy współczynniki podobieństwa trzech małych trójkątów jako{" "}
          <Mi>{"k_1, k_2, k_3"}</Mi>. Każdy mały trójkąt ma swoją podstawę na innym boku{" "}
          <Mi>{"ABC"}</Mi>. Rozważmy bok <Mi>{"BC"}</Mi>: proste równoległe do <Mi>{"AB"}</Mi>{" "}
          i <Mi>{"CA"}</Mi> przecinają go w dwóch punktach, dzieląc go na trzy odcinki.
        </p>
        <p>
          Z podobieństwa każdy z tych odcinków odpowiada podstawie jednego z małych trójkątów
          (oryginałowi lub „przesuniętemu" równolegle na <Mi>{"BC"}</Mi>). Ich długości
          to <Mi>{"k_1 \\cdot |BC|"}</Mi>, <Mi>{"k_2 \\cdot |BC|"}</Mi>,{" "}
          <Mi>{"k_3 \\cdot |BC|"}</Mi>, a razem składają się na cały bok:
        </p>
        <FormulaBox>
          <Mb>{"k_1 + k_2 + k_3 = 1"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy pole</p>
        <p>
          Oznaczmy pole <Mi>{"ABC"}</Mi> jako <Mi>{"S"}</Mi>. Stosunek pól trójkątów podobnych
          to kwadrat stosunku podobieństwa:
        </p>
        <Mb>{"k_1^2 \\cdot S = 1, \\qquad k_2^2 \\cdot S = 4, \\qquad k_3^2 \\cdot S = 9"}</Mb>
        <p>Stąd:</p>
        <Mb>{"k_1 = \\frac{1}{\\sqrt{S}}, \\qquad k_2 = \\frac{2}{\\sqrt{S}}, \\qquad k_3 = \\frac{3}{\\sqrt{S}}"}</Mb>
        <p>Podstawiamy do warunku z kroku 3:</p>
        <Mb>{"\\frac{1}{\\sqrt{S}} + \\frac{2}{\\sqrt{S}} + \\frac{3}{\\sqrt{S}} = 1"}</Mb>
        <Mb>{"\\frac{6}{\\sqrt{S}} = 1 \\qquad \\Longrightarrow \\qquad \\sqrt{S} = 6 \\qquad \\Longrightarrow \\qquad S = 36"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: pole trójkąta <Mi>{"ABC"}</Mi> wynosi <Mi>{"36"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Zadanie 3 (złożone: 13.1 + 13.2) ────────────────────────

const SOURCE_OCT = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const Zad13 = ({ number = "1", points = "0–7" }) => (
  <div className="border border-[#c4a8e8] rounded-xl overflow-hidden">
    <div className="bg-[#d4bef5] px-5 py-2.5">
      <span className="font-bold text-[#2d1458] text-sm">
        Zadanie {number}. ({points})
      </span>
    </div>
    <div className="bg-white px-5 py-5 text-base font-semibold text-stone-800 leading-relaxed">
      <p>
        Dany jest trapez równoramienny o ramieniu długości <Mi>{"10"}</Mi> oraz górnej
        podstawie <Mi>{"4"}</Mi>. Na rysunku zaznaczono zacieniowany trójkąt <Mi>{"P"}</Mi>,
        którego jeden bok jest połową wysokości trapezu. Punkt <Mi>{"C"}</Mi> leży na środku
        ramienia tego trapezu. Niech <Mi>{"b"}</Mi> oznacza długość dłuższej podstawy, przy
        czym <Mi>{"b > 4"}</Mi>.
      </p>
      <figure className="my-6 flex flex-col items-center">
        <Image
          src="/matura/planimetria-smwp-zad13.png"
          alt="Trapez równoramienny: górna podstawa 4, dolna podstawa b, ramię 10, środek C na prawym ramieniu oraz zacieniony prostokątny trójkąt oznaczony P"
          width={1024}
          height={555}
          className="w-[40%] max-w-none h-auto mx-auto rounded-lg border border-[#c4a8e8] bg-white"
        />
        <figcaption className="mt-2 text-center text-xs text-stone-500 font-normal max-w-xl">
          Rysunek do zadania (SMWP, październik&nbsp;2025)
        </figcaption>
      </figure>
    </div>

    <SubTask
      label={`${number}.1`}
      points="0–2"
      hint={
        <div className="space-y-3">
          <p>
            Skorzystaj z zależności odcinka łączącego środki ramion trapezu. Ustaw układ
            współrzędnych: dolna podstawa na osi <Mi>{"x"}</Mi>, trapez symetryczny względem
            osi <Mi>{"y"}</Mi>.
          </p>
          <p>
            Wierzchołki: dolna podstawa od <Mi>{"(-b/2,\\,0)"}</Mi> do <Mi>{"(b/2,\\,0)"}</Mi>,
            górna od <Mi>{"(-2,\\,h)"}</Mi> do <Mi>{"(2,\\,h)"}</Mi>.
            Środek prawego ramienia to <Mi>{"C = \\left(\\frac{b+4}{4},\\,\\frac{h}{2}\\right)"}</Mi>.
          </p>
          <p>Trójkąt P ma wierzchołki: <Mi>{"(2,h)"}</Mi>, <Mi>{"\\left(\\frac{b+4}{4},\\frac{h}{2}\\right)"}</Mi>, <Mi>{"\\left(\\frac{b}{2},\\frac{h}{2}\\right)"}</Mi>. Pole = (podstawa * wysokość)/2.</p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy wysokość trapezu</p>
          <p>Z twierdzenia Pitagorasa (ramię = 10, pozioma odległość = <Mi>{"\\frac{b-4}{2}"}</Mi>):</p>
          <Mb>{"h = \\sqrt{10^2 - \\left(\\frac{b-4}{2}\\right)^2} = \\sqrt{\\frac{400-(b-4)^2}{4}} = \\frac{\\sqrt{-b^2+8b+384}}{2}"}</Mb>

          <p className="font-semibold text-stone-800">Krok 2. Wierzchołki trójkąta P</p>
          <p>Układ: dolna podstawa od <Mi>{"(-b/2,0)"}</Mi> do <Mi>{"(b/2,0)"}</Mi>, górna od <Mi>{"(-2,h)"}</Mi> do <Mi>{"(2,h)"}</Mi>.</p>
          <p>
            <Mi>{"C"}</Mi> = środek prawego ramienia = <Mi>{"\\left(\\frac{b+4}{4},\\,\\frac{h}{2}\\right)"}</Mi>
          </p>
          <p>Trójkąt P ma wierzchołki: <Mi>{"A' = (2,h)"}</Mi>, <Mi>{"C = \\left(\\frac{b+4}{4},\\frac{h}{2}\\right)"}</Mi>, <Mi>{"D' = \\left(\\frac{b}{2},\\frac{h}{2}\\right)"}</Mi>.</p>

          <p className="font-semibold text-stone-800">Krok 3. Pole trójkąta P</p>
          <p>Podstawa (pozioma) <Mi>{"D'C = \\frac{b}{2}-\\frac{b+4}{4} = \\frac{b-4}{4}"}</Mi>, wysokość = <Mi>{"h - \\frac{h}{2} = \\frac{h}{2}"}</Mi>.</p>
          <Mb>{"P = \\frac{1}{2} \\cdot \\frac{b-4}{4} \\cdot \\frac{h}{2} = \\frac{(b-4)h}{16}"}</Mb>
          <p>Podstawiamy <Mi>{"h = \\frac{\\sqrt{-b^2+8b+384}}{2}"}</Mi>:</p>
          <Mb>{"P(b) = \\frac{(b-4)\\sqrt{-b^2+8b+384}}{32}"}</Mb>
          <p>Sprawdzamy, że jest to równoważne zadanej formule:</p>
          <Mb>{"(b-4)^2(-b^2+8b+384) = -b^4+16b^3+304b^2-2944b+6144"}</Mb>
          <FormulaBox>
            <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32} \\qquad \\blacksquare"}</Mb>
          </FormulaBox>
        </div>
      }
    >
      <p className="font-semibold">
        Wykaż, że pole trójkąta <Mi>{"P"}</Mi> w zależności od długości <Mi>{"b"}</Mi>{" "}
        dolnej podstawy wyraża się wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32}"}</Mb>
      </div>
    </SubTask>

    <SubTask
      label={`${number}.2`}
      points="0–5"
      answer={<p><Mi>{"P_{\\max} = \\dfrac{25}{4}"}</Mi>, osiągane dla <Mi>{"b = 4+10\\sqrt{2}"}</Mi></p>}
      hint={
        <div className="space-y-3">
          <p>
            Maksimum <Mi>{"P(b)"}</Mi> ↔ maksimum <Mi>{"f(b) = -b^4+16b^3+304b^2-2944b+6144"}</Mi>.
            Wyznacz <Mi>{"f'(b)"}</Mi> i rozłóż przez <Mi>{"(b-4)"}</Mi>:
          </p>
          <Mb>{"f'(b) = -4(b-4)(b^2-8b-184)"}</Mb>
          <p>
            Rozwiąż <Mi>{"b^2-8b-184=0"}</Mi>. Sprawdź, które pierwiastki leżą w
            przedziale <Mi>{"(4,24)"}</Mi>.
          </p>
          <p className="text-amber-700 text-xs mt-2">
            Uwaga: funkcja może mieć ekstrema lokalne poza tym przedziałem - sprawdź
            zachowanie na końcach.
          </p>
        </div>
      }
      solution={
        <div className="space-y-4">
          <p className="font-semibold text-stone-800">Krok 1. Strategia</p>
          <p>
            Ponieważ <Mi>{"P(b) = \\sqrt{f(b)}/32"}</Mi> i <Mi>{"\\sqrt{\\cdot}"}</Mi> jest
            rosnąca, maksimum <Mi>{"P"}</Mi> ↔ maksimum <Mi>{"f(b) = -b^4+16b^3+304b^2-2944b+6144"}</Mi>.
          </p>

          <p className="font-semibold text-stone-800">Krok 2. Pochodna <Mi>{"f"}</Mi></p>
          <Mb>{"f'(b) = -4b^3+48b^2+608b-2944 = -4(b^3-12b^2-152b+736)"}</Mb>
          <p>Sprawdzamy <Mi>{"b=4"}</Mi>: <Mi>{"64-192-608+736=0"}</Mi>. Dzielimy:</p>
          <Mb>{"f'(b) = -4(b-4)(b^2-8b-184)"}</Mb>
          <p>Pierwiastki <Mi>{"b^2-8b-184=0"}</Mi>:</p>
          <Mb>{"b = \\frac{8 \\pm \\sqrt{64+736}}{2} = \\frac{8 \\pm \\sqrt{800}}{2} = 4 \\pm 10\\sqrt{2}"}</Mb>
          <p>
            <Mi>{"4+10\\sqrt{2} \\approx 18{,}1 \\in (4,24)"}</Mi> ✓ oraz{" "}
            <Mi>{"4-10\\sqrt{2} \\approx -10{,}1 \\notin (4,24)"}</Mi>
          </p>

          <p className="font-semibold text-stone-800">Krok 3. Analiza znaku <Mi>{"f'(b)"}</Mi></p>
          <p>Na przedziale <Mi>{"(4,24)"}</Mi>: <Mi>{"(b-4) > 0"}</Mi>.</p>
          <div className="overflow-x-auto">
            <table className="text-sm text-center w-full border-collapse my-2">
              <thead>
                <tr className="bg-[#f2ecfb]">
                  <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"b^2-8b-184"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"f'(b)"}</Mi></th>
                  <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"f"}</Mi></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-emerald-50">
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4,\\,4{+}10\\sqrt{2})"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
                </tr>
                <tr>
                  <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"(4{+}10\\sqrt{2},\\,24)"}</Mi></td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                  <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                  <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-stone-800">Krok 4. Obliczamy maksimum</p>
          <p>Podstawiamy <Mi>{"b = 4+10\\sqrt{2}"}</Mi> do <Mi>{"f(b)"}</Mi>. Niech <Mi>{"u = 10\\sqrt{2}"}</Mi>:</p>
          <Mb>{"f(4+10\\sqrt{2}) = 40000 \\quad \\text{(obliczenia z rozwinięciem potęg)}"}</Mb>
          <Mb>{"P_{\\max} = \\frac{\\sqrt{40000}}{32} = \\frac{200}{32} = \\frac{25}{4}"}</Mb>

          <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
            <p className="font-semibold text-stone-800">
              Odpowiedź: <Mi>{"P_{\\max} = \\dfrac{25}{4}"}</Mi>, osiągane dla <Mi>{"b = 4+10\\sqrt{2}"}</Mi>
            </p>
          </div>
        </div>
      }
    >
      <p>
        Pole trójkąta <Mi>{"P"}</Mi> w zależności od długości <Mi>{"b"}</Mi> dolnej
        podstawy wyraża się wzorem
      </p>
      <div className="text-center my-4">
        <Mb>{"P(b) = \\frac{\\sqrt{-b^4+16b^3+304b^2-2944b+6144}}{32}"}</Mb>
      </div>
      <p className="font-semibold">
        dla <Mi>{"b \\in (4,24)"}</Mi>. Oblicz największe możliwe pole trójkąta <Mi>{"P"}</Mi>.
        Zapisz obliczenia.
      </p>
      <p className="text-stone-500 text-xs mt-2 italic">
        Wskazówka: Funkcja może posiadać ekstrema lokalne zarówno w punktach należących
        do rozważanego przedziału, jak i w punktach do niego nienależących.
      </p>
    </SubTask>

    <div className="bg-stone-50 border-t border-stone-100 px-5 py-3">
      <span className="text-xs text-stone-400 italic">{SOURCE_OCT}</span>
    </div>
  </div>
);

// ─── Strona ───────────────────────────────────────────────────

export default function PlanimetriaPage() {
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
          <span className="text-sm text-stone-400">Planimetria</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 12
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Planimetria
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length + 1}{" "}
            {tasks.length + 1 === 1 ? "zadanie" : tasks.length + 1 < 5 ? "zadania" : "zadań"}
            {" "}
            (w tym jedno zadanie złożone z dwóch podpunktów)
          </p>
        </div>

        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
          <Zad13 number={getDisplayNumber(sortTasksBySourceDate(tasks).length)} />
        </div>
      </main>
    </div>
  );
}
