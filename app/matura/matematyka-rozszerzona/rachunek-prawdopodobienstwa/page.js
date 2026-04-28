"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TaskCard, Mi, Mb, FormulaBox } from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const tasks = [
  {
    id: "smwp-2026-styczen-zad3",
    source: "Matura próbna SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Szkolny turniej gry w siatkówkę składa się z dwóch tur. Pierwsza tura polega
          na rozegraniu przez każdą drużynę 5 meczy. Aby drużyna zakwalifikowała się do
          drugiej tury, musi zwyciężyć w co najmniej 4 meczach. Prawdopodobieństwo
          zwycięstwa w pojedynczym meczu przez drużynę A jest równe{" "}
          <Mi>{"0{,}26"}</Mi>.
        </p>
        <p className="font-semibold">
          Oblicz prawdopodobieństwo zdarzenia polegającego na tym, że drużyna A
          zakwalifikuje się do drugiej tury turnieju. Wynik przedstaw w postaci ułamka
          dziesiętnego, w zaokrągleniu do części setnych. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p><Mi>{"P \\approx 0{,}02"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          To jest schemat Bernoulliego: <Mi>{"n = 5"}</Mi> niezależnych prób,
          sukces (wygrana) ma prawdopodobieństwo <Mi>{"p = 0{,}26"}</Mi>,
          porażka <Mi>{"q = 1 - p = 0{,}74"}</Mi>.
        </p>
        <p>
          Wzór na prawdopodobieństwo uzyskania dokładnie <Mi>{"k"}</Mi> sukcesów w{" "}
          <Mi>{"n"}</Mi> próbach:
        </p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>
        <p>
          Drużyna kwalifikuje się, gdy <Mi>{"k \\geq 4"}</Mi>, czyli:{" "}
          <Mi>{"P = P_5(4) + P_5(5)"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">

        {/* ── Metoda 1: Bernoulli ── */}
        <p className="font-bold text-[#52297a] text-base">Metoda 1: schemat Bernoulliego</p>

        <p className="font-semibold text-stone-800">Krok 1. Rozpoznajemy schemat Bernoulliego</p>
        <p>
          Mamy ciąg <Mi>{"n = 5"}</Mi> niezależnych prób (meczów), w każdej próbie
          możliwe są dwa wyniki: sukces (wygrana drużyny A) z prawdopodobieństwem{" "}
          <Mi>{"p = 0{,}26"}</Mi> lub porażka z prawdopodobieństwem{" "}
          <Mi>{"q = 1 - p = 0{,}74"}</Mi>. To jest właśnie schemat Bernoulliego.
        </p>
        <p>
          Drużyna kwalifikuje się, gdy wygra co najmniej 4 mecze, czyli:
        </p>
        <Mb>{"P = P_5(4) + P_5(5)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wzór Bernoulliego</p>
        <p>
          Prawdopodobieństwo uzyskania dokładnie <Mi>{"k"}</Mi> sukcesów w <Mi>{"n"}</Mi> próbach:
        </p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 3. Obliczamy <Mi>{"P_5(4)"}</Mi></p>
        <Mb>{"P_5(4) = \\binom{5}{4} \\cdot 0{,}26^4 \\cdot 0{,}74^1 = 5 \\cdot 0{,}00456976 \\cdot 0{,}74 \\approx 0{,}01691"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy <Mi>{"P_5(5)"}</Mi></p>
        <Mb>{"P_5(5) = \\binom{5}{5} \\cdot 0{,}26^5 \\cdot 0{,}74^0 = 1 \\cdot 0{,}26^5 \\approx 0{,}00119"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sumujemy</p>
        <Mb>{"P = 0{,}01691 + 0{,}00119 = 0{,}01810 \\approx 0{,}02"}</Mb>

        {/* ── Metoda 2 ── */}
        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2</p>

        <p className="font-semibold text-stone-800">Krok 1. Identyfikacja parametrów</p>
        <p>
          Drużyna kwalifikuje się, gdy wygra dokładnie 4 lub dokładnie 5 meczów.
          Oznaczamy: W = wygrana (prawdopodobieństwo <Mi>{"0{,}26"}</Mi>),
          P = porażka (prawdopodobieństwo <Mi>{"0{,}74"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Dokładnie 4 wygrane</p>
        <p>
          Porażka może wypaść w meczu 1., 2., 3., 4. lub 5., czyli jest 5 różnych
          ciągów wyników z jedną porażką. Każdy taki ciąg ma prawdopodobieństwo{" "}
          <Mi>{"0{,}26^4 \\cdot 0{,}74"}</Mi>:
        </p>
        <Mb>{"P(\\text{dokładnie 4 wygrane}) = 5 \\cdot 0{,}26^4 \\cdot 0{,}74 \\approx 0{,}01691"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Dokładnie 5 wygranych</p>
        <p>
          Jest tylko jeden taki ciąg (wygrane we wszystkich 5 meczach):
        </p>
        <Mb>{"P(\\text{dokładnie 5 wygranych}) = 0{,}26^5 \\approx 0{,}00119"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Sumujemy</p>
        <Mb>{"P = 0{,}01691 + 0{,}00119 = 0{,}01810 \\approx 0{,}02"}</Mb>

        <p className="text-stone-500 text-xs mt-1">
          Obie metody dają ten sam wynik, bo <Mi>{"\\binom{5}{4} = 5"}</Mi> to właśnie
          liczba sposobów ustawienia jednej porażki wśród 5 meczów.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"P \\approx 0{,}02"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function RachunekPrawdopodobienstwaPage() {
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
          <span className="text-sm text-stone-400">Rachunek prawdopodobieństwa i statystyka</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 17
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Rachunek prawdopodobieństwa i statystyka
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        <div className="space-y-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </main>
    </div>
  );
}
