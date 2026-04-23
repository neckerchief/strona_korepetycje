import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, GraduationCap, Microscope, Award,
  Globe, Mail, ExternalLink, FileText,
} from "lucide-react";

export const metadata = {
  title: "O mnie | Paulina — Korepetycje z Fizyki i Matematyki",
  description:
    "Doktorantka fizyki teoretycznej UW. Korepetycje z matematyki i fizyki — Warszawa & online.",
};

const publications = [
  {
    title: "Inflation in the scale symmetric Standard Model and Weyl geometry",
    journal: "Journal of High Energy Physics",
    year: "2026",
    doi: "10.1007/JHEP02(2026)041",
    url: "https://doi.org/10.1007/JHEP02(2026)041",
  },
  {
    title: "Origin of mass scales in scale-symmetric extension of Standard Model",
    journal: "PoS: Proceedings of Science",
    year: "2023",
    doi: "10.22323/1.436.0045",
    url: "https://doi.org/10.22323/1.436.0045",
  },
  {
    title: "Spontaneous scale symmetry breaking at high temperature",
    journal: "Journal of High Energy Physics",
    year: "2023",
    doi: "10.1007/JHEP05(2023)206",
    url: "https://doi.org/10.1007/JHEP05(2023)206",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
            <ArrowLeft size={15} /> Powrót
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">O mnie</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16 space-y-20">

        {/* Header */}
        <section className="flex flex-col sm:flex-row gap-10 items-start">
          <div className="relative w-36 h-36 rounded-full border-4 border-white shadow-md overflow-hidden flex-shrink-0">
            <Image
              src="/meCV.jpg"
              alt="Paulina"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
              O mnie
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
              Cześć, jestem Paulina
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed">
              Doktorantka fizyki teoretycznej na Uniwersytecie Warszawskim
              i korepetytorka z wieloletnim doświadczeniem.
              Uczę matematyki i fizyki uczniów od klasy 5 aż po studentów.
            </p>
          </div>
        </section>

        {/* Biography */}
        <section>
          <h2 className="font-display text-2xl text-stone-800 mb-5 pb-2 border-b border-stone-200">
            Moja historia
          </h2>
          <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
            <p>
              Fizykę pokochałam jeszcze w liceum i to uczucie zostało ze mną przez całe studia i doktorat.
              Ale równolegle, od razu po maturze, zaczęłam uczyć.
              I okazało się, że to też jest coś, co sprawia mi prawdziwą satysfakcję.
            </p>
            <p>
              Uczyłam głównie uczniów szkół średnich,
              potem również studentów z mojego wydziału i Politechniki.
              Przez jakiś czas prowadziłam też ćwiczenia z Fizyki I dla studentów
              pierwszego roku na Wydziale Fizyki Uniwersytetu Warszawskiego:
              mechanika, bryła sztywna, mechanika relatywistyczna.
              Za te zajęcia, na podstawie opinii studentów, dostałam wyróżnienie dydaktyczne od Rektora.
            </p>
            <p>
              Jesienią 2025 spróbowałam pracy w IT.
              Szybko zdałam sobie sprawę, że bardziej niż cokolwiek
              innego zależy mi na tym, żeby być tam, gdzie widzę
              jak coś staje się jasne dla drugiego człowieka. Wróciłam do nauczania, tym razem z pełnym zaangażowaniem.
            </p>
          </div>
        </section>

        {/* Education & highlights */}
        <section>
          <h2 className="font-display text-2xl text-stone-800 mb-6 pb-2 border-b border-stone-200">
            Wykształcenie i osiągnięcia
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: GraduationCap,
                title: "Doktorat: Fizyka Teoretyczna",
                sub: "Wydział Fizyki UW · obrona 2026",
              },
              {
                icon: GraduationCap,
                title: "Magister: Fizyka Teoretyczna",
                sub: "Wydział Fizyki UW · 2020",
              },
              {
                icon: GraduationCap,
                title: "Licencjat: Fizyka",
                sub: "Wydział Fizyki UW · 2018",
              },
              {
                icon: Microscope,
                title: "Specjalizacja",
                sub: "Fizyka cząstek i kosmologia",
              },
              {
                icon: Award,
                title: "Wyróżnienie dydaktyczne Rektora FUW",
                sub: "Za ćwiczenia z Fizyki I · 2022",
              },
              {
                icon: Globe,
                title: "Języki",
                sub: "Polski (ojczysty) · Angielski (C1)",
              },
            ].map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f2ecfb] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#6d3a8e]" />
                </div>
                <div>
                  <p className="text-stone-800 text-sm font-semibold">{title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href="/Paulina_Michalak_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#d4b8f0] hover:border-[#6d3a8e] text-[#6d3a8e] hover:bg-[#f2ecfb] font-semibold px-6 py-3 rounded-2xl text-sm transition-all duration-200"
            >
              <FileText size={16} /> Pobierz pełne CV
            </a>
          </div>
        </section>

        {/* Publications */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe size={16} className="text-[#6d3a8e]" />
            <h2 className="font-display text-2xl text-stone-800">
              Publikacje naukowe
            </h2>
          </div>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <a
                key={i}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white border border-stone-200 hover:border-[#d4b8f0] rounded-2xl p-5 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-stone-700 text-sm font-medium leading-snug group-hover:text-stone-900 transition-colors">
                      {pub.title}
                    </p>
                    <span className="flex-shrink-0 text-xs font-semibold text-[#6d3a8e] bg-[#f2ecfb] px-2 py-0.5 rounded-full">
                      {pub.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400">{pub.journal}</span>
                    <span className="text-stone-200">·</span>
                    <span className="text-xs text-stone-300 group-hover:text-[#6d3a8e] transition-colors">
                      {pub.doi}
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-stone-300 group-hover:text-[#6d3a8e] transition-colors flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-stone-200 pt-12 text-center">
          <p className="text-stone-500 text-lg mb-6">
            Chcesz porozmawiać o korepetycjach lub po prostu zapytać o szczegóły?
          </p>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] font-bold px-8 py-4 rounded-2xl text-base transition-colors"
          >
            <Mail size={18} /> Napisz do mnie
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-5 mt-10 bg-white">
        <div className="max-w-4xl mx-auto text-center text-stone-400 text-sm">
          © 2025 Korepetycje Paulina · Warszawa
        </div>
      </footer>
    </div>
  );
}
