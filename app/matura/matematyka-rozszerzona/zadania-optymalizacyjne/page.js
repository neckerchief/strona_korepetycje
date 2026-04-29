"use client";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

const tasks = [
  {
    id: "smwp-2026-styczen-zad11-2-opt",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–4",
    instruction: (
      <span>
        Objętość graniastosłupa prawidłowego czworokątnego w zależności od długości{" "}
        <Mi>{"d"}</Mi> jego przekątnej jest równa
      </span>
    ),
    mathBlock: "V(d) = (d-12)^2 \\cdot \\sqrt{6d-36}",
    noteItems: [
      { text: "dla " }, { math: "d \\in (6, 12)" }, { text: ". Wyznacz długość " }, { math: "d" },
      { text: " przekątnej graniastosłupa, dla której jego objętość jest największa. Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p><Mi>{"d = \\dfrac{36}{5}"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Oblicz pochodną <Mi>{"V'(d)"}</Mi> korzystając z reguły iloczynu:
        </p>
        <FormulaBox>
          <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
        </FormulaBox>
        <p>
          Gdzie <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = \\sqrt{6d-36}"}</Mi>.
          Po uproszczeniu wyłącz wspólny czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}}"}</Mi>.
        </p>
        <p>
          Ustaw <Mi>{"V'(d) = 0"}</Mi>. Na przedziale <Mi>{"(6,12)"}</Mi>{" "}
          czynnik <Mi>{"(d-12) \\neq 0"}</Mi>, więc zeruje się tylko drugi czynnik.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Obliczamy pochodną</p>
        <p>
          Korzystamy z reguły iloczynu:
        </p>
        <FormulaBox>
          <Mb>{"\\bigl[f \\cdot g\\bigr]' = f'g + fg'"}</Mb>
        </FormulaBox>
        <p>
          Mamy <Mi>{"f = (d-12)^2"}</Mi>, <Mi>{"g = (6d-36)^{1/2}"}</Mi>.
        </p>
        <Mb>{"f' = 2(d-12), \\qquad g' = \\frac{6}{2\\sqrt{6d-36}} = \\frac{3}{\\sqrt{6d-36}}"}</Mb>
        <Mb>{"V'(d) = 2(d-12)\\sqrt{6d-36} + (d-12)^2 \\cdot \\frac{3}{\\sqrt{6d-36}}"}</Mb>
        <p>Wyłączamy wspólny czynnik:</p>
        <Mb>{"V'(d) = \\frac{d-12}{\\sqrt{6d-36}} \\cdot \\bigl[2(6d-36) + 3(d-12)\\bigr] = \\frac{d-12}{\\sqrt{6d-36}} \\cdot (15d - 108)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wyznaczamy miejsce zerowe</p>
        <p>
          Na przedziale <Mi>{"(6,12)"}</Mi>: <Mi>{"d-12 < 0"}</Mi> i{" "}
          <Mi>{"\\sqrt{6d-36} > 0"}</Mi>, więc czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}} \\neq 0"}</Mi>. Zeruje się tylko:
        </p>
        <Mb>{"15d - 108 = 0 \\quad \\Rightarrow \\quad d = \\frac{108}{15} = \\frac{36}{5}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Sprawdzamy, że to maksimum</p>
        <p>
          Czynnik <Mi>{"\\dfrac{d-12}{\\sqrt{6d-36}} < 0"}</Mi> na całym przedziale.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm text-center w-full border-collapse my-2">
            <thead>
              <tr className="bg-[#f2ecfb]">
                <th className="border border-[#d4b8f0] px-3 py-1.5">przedział</th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"15d-108"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V'(d)"}</Mi></th>
                <th className="border border-[#d4b8f0] px-3 py-1.5"><Mi>{"V"}</Mi></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50">
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(6,\\,\\tfrac{36}{5}\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1">rosnąca</td>
              </tr>
              <tr>
                <td className="border border-[#d4b8f0] px-3 py-1"><Mi>{"\\left(\\tfrac{36}{5},\\,12\\right)"}</Mi></td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-green-700 font-bold">+</td>
                <td className="border border-[#d4b8f0] px-3 py-1 text-red-700 font-bold">-</td>
                <td className="border border-[#d4b8f0] px-3 py-1">malejąca</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Pochodna zmienia znak z <Mi>{"+"}</Mi> na <Mi>{"-"}</Mi>, więc{" "}
          <Mi>{"d = \\dfrac{36}{5}"}</Mi> daje maksimum objętości.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"d = \\dfrac{36}{5}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

export default function ZadaniaOptymalizacyjnePage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/matura/matematyka-rozszerzona" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Zadania optymalizacyjne</span>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">Dział 16</p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Zadania optymalizacyjne</h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">{tasks.length} zadanie</p>
        </div>
        <div className="space-y-8">
          {tasks.map((task) => <TaskCard key={task.id} {...task} />)}

          {/* Nota o kontekście zadania */}
          <div className="flex items-start gap-3 bg-[#f9f5ff] border border-[#d4b8f0] rounded-xl px-5 py-4 text-sm text-[#52297a]">
            <ExternalLink size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              Zadanie 1 jest podpunktem 1.2 pełnego zadania z działu{" "}
              <Link
                href="/matura/matematyka-rozszerzona/stereometria"
                className="font-semibold underline underline-offset-2 hover:text-[#3b1a6e] transition-colors"
              >
                Stereometria
              </Link>
              . Podpunkt 1.1 zawiera wyprowadzenie wzoru na objętość{" "}
              <Mi>{"V(d)"}</Mi> z własności geometrycznych graniastosłupa.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
