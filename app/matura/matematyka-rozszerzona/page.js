import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Działy ───────────────────────────────────────────────────
// Aby otworzyć nowy dział jako podstronę, dodaj pole href oraz taskCount.

const sections = [
  { num: "1",  title: "Liczby rzeczywiste",                                        href: "/matura/matematyka-rozszerzona/liczby-rzeczywiste", taskCount: 1 },
  { num: "2",  title: "Wyrażenia algebraiczne, równania i nierówności",             href: "/matura/matematyka-rozszerzona/wyrazenia-algebraiczne", taskCount: 1 },
  { num: "3",  title: "Funkcje",                                                    href: null },
  { num: "4",  title: "Funkcja liniowa",                                            href: null },
  { num: "5",  title: "Funkcja kwadratowa",                                         href: null },
  { num: "6",  title: "Wielomiany",                                                 href: null },
  { num: "7",  title: "Funkcje wymierne",                                           href: null },
  { num: "8",  title: "Funkcja wykładnicza",                                        href: null },
  { num: "9",  title: "Funkcja logarytmiczna",                                      href: null },
  { num: "10", title: "Trygonometria",                                              href: "/matura/matematyka-rozszerzona/trygonometria", taskCount: 1 },
  { num: "11", title: "Ciągi",                                                      href: null },
  { num: "12", title: "Planimetria",                                                href: null },
  { num: "13", title: "Geometria analityczna",                                      href: "/matura/matematyka-rozszerzona/geometria-analityczna", taskCount: 1 },
  { num: "14", title: "Stereometria",                                               href: null },
  { num: "15", title: "Pochodna funkcji",                                           href: null },
  { num: "16", title: "Zadania optymalizacyjne",                                    href: null },
  { num: "17", title: "Rachunek prawdopodobieństwa i statystyka",                   href: "/matura/matematyka-rozszerzona/rachunek-prawdopodobienstwa", taskCount: 1 },
];

// ─── Karta sekcji ─────────────────────────────────────────────

const SectionCard = ({ num, title, href, taskCount }) => {
  const inner = (
    <div className={cn(
      "flex items-center gap-4 px-6 py-5 bg-white border border-stone-200 rounded-2xl transition-all duration-200",
      href ? "hover:shadow-md hover:border-[#c4a8e8] cursor-pointer" : "opacity-60 cursor-default"
    )}>
      <span className="w-10 h-10 rounded-xl bg-[#f2ecfb] flex items-center justify-center flex-shrink-0 font-display font-semibold text-[#6d3a8e] text-sm">
        {num}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-stone-800 text-base leading-snug">
          {title}
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          {taskCount
            ? `${taskCount} ${taskCount === 1 ? "zadanie" : taskCount < 5 ? "zadania" : "zadań"}`
            : "Wkrótce"}
        </p>
      </div>
      {href && <ArrowRight size={16} className="text-[#6d3a8e] flex-shrink-0" />}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
};

// ─── Strona ───────────────────────────────────────────────────

export default function MatematykaRozszerzonaPage() {
  const totalTasks = sections.reduce((sum, s) => sum + (s.taskCount ?? 0), 0);

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
            <SectionCard key={s.num} {...s} />
          ))}
        </div>
      </main>
    </div>
  );
}
