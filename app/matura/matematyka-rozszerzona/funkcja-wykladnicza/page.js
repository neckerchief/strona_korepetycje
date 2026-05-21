"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

const SOURCE_SMWP_2025_PAZDZIERNIK = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, poziom rozszerzony, CKE, maj 2025";

const tasks = [
  {
    id: "cke-2025-maj-zad1-bakterie",
    source: SOURCE_CKE_MAJ_2025,
    number: "1",
    points: "0–2",
    instruction: (
      <span>
        W warunkach laboratoryjnych obserwowano dynamikę wzrostu liczebności populacji pewnego
        gatunku bakterii. Liczebność <Mi>{"N"}</Mi> populacji bakterii zmienia się w czasie zgodnie
        z zależnością wykładniczą
      </span>
    ),
    mathBlock: "N(t) = N_0 \\cdot k^{\\,t},\\quad t \\geq 0",
    noteItems: [
      { text: "gdzie " },
      { math: "N_0" },
      { text: " – liczebność populacji w chwili " },
      { math: "t = 0" },
      { text: " rozpoczęcia obserwacji, " },
      { math: "k" },
      { text: " – stała dodatnia, charakterystyczna dla danego gatunku bakterii i dla warunków przeprowadzenia obserwacji, " },
      { math: "t" },
      { text: " – czas wyrażony w godzinach, liczony od chwili " },
      { math: "t = 0" },
      { text: " rozpoczęcia obserwacji. W chwili rozpoczęcia obserwacji liczebność populacji była równa " },
      { math: "10\\,000" },
      { text: ", a po dwóch godzinach była równa " },
      { math: "15\\,625" },
      { text: ". Oblicz, o ile procent wzrastała liczebność populacji tej bakterii w ciągu każdej godziny. Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        Liczebność populacji wzrastała o <Mi>{"25\\%"}</Mi> w ciągu każdej godziny.
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Z treści zadania mamy <Mi>{"N(0) = 10\\,000"}</Mi> oraz <Mi>{"N(2) = 15\\,625"}</Mi>.
          Podstawiając te wartości do wzoru <Mi>{"N(t) = N_0 \\cdot k^t"}</Mi>, możemy wyznaczyć stałą{" "}
          <Mi>{"k"}</Mi>.
        </p>
        <p>
          Aby policzyć procentowy wzrost populacji w ciągu jednej godziny, należy obliczyć:
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\frac{N(t+1)- N(t)}{N(t)} \\cdot 100\\% = \\left(\\frac{N(t+1)}{N(t)} - 1 \\right) \\cdot 100\\% = (k - 1) \\cdot 100\\%"
            }
          </Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"N_0"}</Mi> i <Mi>{"k"}</Mi></p>
        <p>
          W chwili rozpoczęcia obserwacji <Mi>{"t = 0"}</Mi>, więc z wzoru otrzymujemy{" "}
          <Mi>{"N(0) = N_0"}</Mi>. Z treści zadania:
        </p>
        <Mb>{"N_0 = N(0) = 10\\,000"}</Mb>
        <p>
          Po dwóch godzinach <Mi>{"t = 2"}</Mi>, więc <Mi>{"N(2) = N_0 \\cdot k^2"}</Mi>. Podstawiamy
         liczby:
        </p>
        <Mb>{"15\\,625 = 10\\,000 \\cdot k^2"}</Mb>
        <Mb>{"k^2 = \\frac{15\\,625}{10\\,000} = \\frac{125^2}{100^2} = \\left(\\frac{5}{4}\\right)^2"}</Mb>
        <p>
          Stała <Mi>{"k"}</Mi> jest dodatnia, więc bierzemy dodatni pierwiastek:
        </p>
        <Mb>{"k = \\frac{5}{4} = 1{,}25"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Procentowy wzrost populacji w ciągu jednej godziny
        </p>
        <p>
          Porównujemy liczebność w dwóch kolejnych godzinach (różnica czasu wynosi{" "}
          <Mi>{"1"}</Mi>):
        </p>
        <Mb>
          {
            "\\frac{N(t+1)}{N(t)} = \\frac{N_0 \\cdot k^{t+1}}{N_0 \\cdot k^t} = k"
          }
        </Mb>
        <p>
          Pytanie brzmi: <em>o ile procent wzrastała</em> populacja w ciągu godziny, czyli o ile
          procent większa jest liczebność po godzinie względem poprzedniej chwili:
        </p>
        <Mb>
          {
            "\\left(\\frac{N(t+1)}{N(t)} - 1\\right) \\cdot 100\\% = (k - 1) \\cdot 100\\%"
          }
        </Mb>
        <Mb>{"(k - 1) \\cdot 100\\% = \\left(\\frac{5}{4} - 1\\right) \\cdot 100\\% = \\frac{1}{4} \\cdot 100\\% = 25\\%"}</Mb>
        <p>
          Liczebność populacji wzrastała o <Mi>{"25\\%"}</Mi> w ciągu każdej godziny.
        </p>
      </div>
    ),
  },
  {
    id: "smwp-2025-pazdziernik-zad1",
    source: SOURCE_SMWP_2025_PAZDZIERNIK,
    number: "1",
    points: "0–2",
    instruction: (
      <span>
        Fundacja założyła w internecie zbiórkę pieniędzy na leczenie, której celem jest
        uzbieranie <Mi>{"2\\,500\\,000"}</Mi> zł. Wraz z publikacją zbiórki fundacja
        wpłaciła na nią datek w wysokości <Mi>{"W_0"}</Mi> zł. Łączna kwota zbiórki{" "}
        <Mi>{"K"}</Mi> zmieniała się w czasie zgodnie z zależnością wykładniczą
      </span>
    ),
    mathBlock: "K(t) = W_0 \\cdot g^{\\,t}",
    noteItems: [
      { text: "gdzie " },
      { math: "g" },
      { text: " – stała dodatnia, charakterystyczna dla danej zbiórki i dynamiki dokonywanych wpłat, " },
      { math: "t" },
      { text: " – czas wyrażony w dniach, liczony od chwili publikacji zbiórki (" },
      { math: "t=0" },
      { text: "). Po dwóch dniach na zbiórkę wpłacono łącznie " },
      { math: "50\\,225" },
      { text: " złotych, natomiast po czterech dniach zebrano kwotę " },
      { math: "98\\,441" },
      { text: " zł." },
    ],
    answers: null,

    answer: (
      <div className="space-y-1">
        <p><Mi>{"W_0 = 25\\,625"}</Mi> zł; tak, zbiórka uzbierała potrzebną kwotę w ciągu dwóch tygodni.</p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Podziel <Mi>{"K(4)"}</Mi> przez <Mi>{"K(2)"}</Mi> aby wyeliminować <Mi>{"W_0"}</Mi>
          i wyznaczyć <Mi>{"g^2"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{K(4)}{K(2)} = \\frac{W_0 g^4}{W_0 g^2} = g^2"}</Mb>
        </FormulaBox>
        <p>
          Następnie oblicz <Mi>{"W_0"}</Mi> ze wzoru <Mi>{"K(2) = W_0 \\cdot g^2"}</Mi>.
          Na koniec sprawdź, czy <Mi>{"K(14) \\geq 2\\,500\\,000"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Wyznaczamy <Mi>{"g^2"}</Mi></p>
        <Mb>{"g^2 = \\frac{K(4)}{K(2)} = \\frac{98\\,441}{50\\,225}"}</Mb>
        <p>
          Na kalkulatorze (albo skracając ułamek przez wspólny dzielnik) otrzymujemy{" "}
          <Mi>{"g^2 = \\dfrac{49}{25}"}</Mi>, więc{" "}
          <Mi>{"g = \\sqrt{\\dfrac{49}{25}} = \\dfrac{7}{5}"}</Mi>{" "}
          (odrzucamy wartość ujemną pierwiastka, bo <Mi>{"g > 0"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy <Mi>{"W_0"}</Mi></p>
        <Mb>{"K(2) = W_0 \\cdot g^2 \\quad \\Rightarrow \\quad W_0 = \\frac{K(2)}{g^2} = \\frac{50\\,225}{\\tfrac{49}{25}} = 50\\,225 \\cdot \\frac{25}{49} = 1025 \\cdot 25 = 25\\,625"}</Mb>
        <p>
          Datek wpłacony przez fundację: <Mi>{"W_0 = 25\\,625"}</Mi> zł.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Sprawdzamy, czy zbiórka osiągnie cel w 14 dniach</p>
        <Mb>{"K(14) = 25\\,625 \\cdot \\left(\\frac{7}{5}\\right)^{14}"}</Mb>
        <p>Wykorzystujemy to, że <Mi>{"14 = 2 \\cdot 7"}</Mi>, więc</p>
        <Mb>
          {
            "\\left(\\frac{7}{5}\\right)^{14} = \\left[\\left(\\frac{7}{5}\\right)^2\\right]^7 = (1{,}96)^7"
          }
        </Mb>
        <p>Przybliżenie na kalkulatorze:</p>
        <Mb>{"(1{,}96)^7 \\approx 111{,}1"}</Mb>
        <Mb>{"K(14) \\approx 25\\,625 \\cdot 111{,}1 \\approx 2\\,847\\,000 > 2\\,500\\,000"}</Mb>
        <p>
          Tak, zbiórka uzbierała potrzebną kwotę w ciągu dwóch tygodni.
        </p>
      </div>
    ),
  },
];

export default function FunkcjaWykladniczaPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/matura/matematyka-rozszerzona" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Funkcja wykładnicza</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">Dział 8</p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Funkcja wykładnicza</h1>
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
