"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, BookOpen } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Działy matury rozszerzonej ───────────────────────────────
// Aby dodać zadanie do działu: dopisz obiekt do tablicy `tasks` danego działu.
// Przykład:
// tasks: [
//   {
//     id: "2024-maj-1",
//     source: "Maj 2024, zad. 1",
//     content: "Treść zadania...",
//     solution: "Rozwiązanie...",
//   },
// ],

const sections = [
  { num: "1",  title: "Liczby rzeczywiste", tasks: [] },
  { num: "2",  title: "Wyrażenia algebraiczne, równania i nierówności", tasks: [] },
  { num: "3",  title: "Funkcje", tasks: [] },
  { num: "4",  title: "Funkcja liniowa", tasks: [] },
  { num: "5",  title: "Funkcja kwadratowa", tasks: [] },
  { num: "6",  title: "Wielomiany", tasks: [] },
  { num: "7",  title: "Funkcje wymierne", tasks: [] },
  { num: "8",  title: "Funkcja wykładnicza", tasks: [] },
  { num: "9",  title: "Funkcja logarytmiczna", tasks: [] },
  { num: "10", title: "Trygonometria", tasks: [] },
  { num: "11", title: "Ciągi", tasks: [] },
  { num: "12", title: "Planimetria", tasks: [] },
  { num: "13", title: "Geometria analityczna", tasks: [] },
  { num: "14", title: "Stereometria", tasks: [] },
  { num: "15", title: "Pochodna funkcji", tasks: [] },
  { num: "16", title: "Zadania optymalizacyjne", tasks: [] },
  { num: "17", title: "Rachunek prawdopodobieństwa i statystyka", tasks: [] },
];

// ─── Sekcja (pojedynczy dział) ────────────────────────────────

const Section = ({ num, title, tasks }) => {
  const [open, setOpen] = useState(false);
  const hasTasks = tasks.length > 0;

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => hasTasks && setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center gap-4 px-6 py-5 text-left transition-colors",
          hasTasks ? "hover:bg-[#f2ecfb]/40 cursor-pointer" : "cursor-default opacity-80"
        )}
        disabled={!hasTasks}
      >
        <span className="w-10 h-10 rounded-xl bg-[#f2ecfb] flex items-center justify-center flex-shrink-0 font-display font-semibold text-[#6d3a8e] text-sm">
          {num}
        </span>

        {/* Tytuł i liczba zadań */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-stone-800 text-base leading-snug">
            {title}
          </p>
          <p className="text-xs text-stone-400 mt-0.5">
            {hasTasks ? `${tasks.length} ${tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}` : "Wkrótce"}
          </p>
        </div>

        {/* Ikona rozwijania */}
        {hasTasks && (
          <ChevronDown
            size={18}
            className={cn(
              "text-[#6d3a8e] flex-shrink-0 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      {open && hasTasks && (
        <div className="border-t border-stone-100 divide-y divide-stone-100">
          {tasks.map((task) => (
            <div key={task.id} className="px-6 py-5">
              <p className="text-xs font-semibold text-[#6d3a8e] uppercase tracking-wide mb-2">
                {task.source}
              </p>
              <p className="text-stone-700 text-sm leading-relaxed">{task.content}</p>
              {task.solution && (
                <details className="mt-3">
                  <summary className="text-xs font-semibold text-stone-400 cursor-pointer hover:text-stone-600 transition-colors select-none">
                    Pokaż rozwiązanie
                  </summary>
                  <div className="mt-2 text-stone-600 text-sm leading-relaxed bg-stone-50 rounded-xl p-4">
                    {task.solution}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Strona ───────────────────────────────────────────────────

export default function MatematykaRozszerzonaPage() {
  const totalTasks = sections.reduce((sum, s) => sum + s.tasks.length, 0);

  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/tematy"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
            <ArrowLeft size={15} /> Tematy
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Matematyka - matura rozszerzona</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* Nagłówek */}
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Matura rozszerzona
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Matematyka
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            Zadania z arkuszy CKE, posegregowane według działów.
          </p>
          {totalTasks > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-[#f2ecfb] border border-[#d4b8f0] rounded-full px-4 py-1.5 text-sm text-[#52297a]">
              <BookOpen size={14} />
              {totalTasks} {totalTasks === 1 ? "zadanie" : totalTasks < 5 ? "zadania" : "zadań"} łącznie
            </div>
          )}
        </div>

        {/* Działy */}
        <div className="space-y-3">
          {sections.map((s) => (
            <Section key={s.num} {...s} />
          ))}
        </div>
      </main>
    </div>
  );
}
