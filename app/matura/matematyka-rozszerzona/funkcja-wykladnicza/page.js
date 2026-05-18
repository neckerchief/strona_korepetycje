"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

const SOURCE = "Matura próbna SMWP, październik 2025, poziom rozszerzony";

const tasks = [
  {
    id: "smwp-2025-pazdziernik-zad1",
    source: SOURCE,
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
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">{tasks.length} zadanie</p>
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
