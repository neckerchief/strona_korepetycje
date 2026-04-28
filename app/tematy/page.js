"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Calculator, TrendingUp, Zap,
  Layers, Atom, FlaskConical, GraduationCap, ChevronDown,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Karty tematów ────────────────────────────────────────────

const TopicCard = ({ icon: Icon, label, sub, tag, href }) => {
  const inner = (
    <div
      className={cn(
        "group bg-white border-l-4 border-l-[#6d3a8e] border border-stone-200 rounded-2xl p-5 transition-all duration-200 relative",
        href ? "hover:shadow-md cursor-pointer" : "opacity-60 cursor-default"
      )}
    >
      {href && (
        <span className="absolute bottom-3 right-3 text-xs font-semibold text-[#6d3a8e] bg-[#f2ecfb] border border-[#d4b8f0] rounded-full px-2 py-0.5">
          Dostępne
        </span>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#f2ecfb] flex items-center justify-center">
          <Icon size={18} className="text-[#6d3a8e]" />
        </div>
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide mt-1">
          {tag}
        </span>
      </div>
      <h3 className="font-display font-semibold text-stone-800 text-lg mb-1">{label}</h3>
      <p className="text-stone-400 text-sm">{sub}</p>
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
};

// ─── Sekcja MATURA (accordion) ────────────────────────────────

const maturaItems = [
  {
    label: "Matematyka - matura podstawowa",
    sub: "Zadania z arkuszy CKE, poziom podstawowy",
    tag: "PP",
    href: null,
  },
  {
    label: "Matematyka - matura rozszerzona",
    sub: "Zadania z arkuszy CKE, poziom rozszerzony",
    tag: "PR",
    href: "/matura/matematyka-rozszerzona",
  },
  {
    label: "Fizyka - matura rozszerzona",
    sub: "Zadania z arkuszy CKE, poziom rozszerzony",
    tag: "PR",
    href: null,
  },
];

const MaturaAccordion = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#f2ecfb]/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#f2ecfb] flex items-center justify-center flex-shrink-0">
            <GraduationCap size={18} className="text-[#6d3a8e]" />
          </div>
          <div className="text-left">
            <p className="font-display font-semibold text-stone-800 text-lg leading-tight">
              Matura
            </p>
            <p className="text-stone-400 text-sm mt-0.5">
              Mat. podstawowa, Mat. rozszerzona, Fizyka rozszerzona
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={cn(
            "text-[#6d3a8e] flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-stone-100 divide-y divide-stone-100">
          {maturaItems.map((item) => {
            const inner = (
              <div className={cn(
                "flex items-center justify-between px-6 py-4",
                item.href ? "hover:bg-[#f2ecfb]/40 transition-colors" : "opacity-60"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#6d3a8e] ml-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{item.label}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <span className="text-xs font-semibold text-stone-400 bg-stone-100 rounded-full px-2 py-0.5">
                    {item.tag}
                  </span>
                  {item.href && (
                    <span className="text-xs font-semibold text-[#6d3a8e] bg-[#f2ecfb] border border-[#d4b8f0] rounded-full px-2 py-0.5">
                      Dostępne
                    </span>
                  )}
                </div>
              </div>
            );
            return item.href ? (
              <Link key={item.label} href={item.href}>{inner}</Link>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
          <div className="px-6 py-3 bg-stone-50">
            <p className="text-xs text-stone-400 italic">
              Materiały maturalne są w przygotowaniu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Tematy dostępne teraz ────────────────────────────────────

const availableTopics = [
  { icon: Calculator, label: "Ułamki od zera", sub: "Matematyka, kl. 5–7", tag: "Podstawy", href: "/ulamki" },
  { icon: Atom, label: "Wektory", sub: "Fizyka, LO", tag: "Mechanika", href: "/wektory" },
];

// ─── Tematy wkrótce ───────────────────────────────────────────

const upcomingTopics = [
  { icon: TrendingUp, label: "Równania liniowe", sub: "Matematyka, kl. 7–8", tag: "Algebra" },
  { icon: Zap, label: "Kinematyka intuicyjnie", sub: "Fizyka, kl. 7–8", tag: "Ruch" },
  { icon: Layers, label: "Potęgi i pierwiastki", sub: "Matematyka, SP–LO", tag: "Algebra" },
  { icon: FlaskConical, label: "Procenty praktycznie", sub: "Matematyka, kl. 6–8", tag: "Podstawy" },
];

// ─── Eyebrow ──────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
    {children}
  </p>
);

// ─── Strona główna ────────────────────────────────────────────

export default function TemtyPage() {
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
          <span className="text-sm text-stone-400">Tematy</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* Nagłówek */}
        <div className="mb-14">
          <Eyebrow>Materiały</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Wszystkie tematy
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            Materiały do samodzielnej nauki — przeglądaj, ćwicz we własnym tempie
            i wracaj kiedy chcesz.
          </p>
        </div>

        {/* Dostępne teraz */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-xl font-semibold text-stone-800">
              Dostępne teraz
            </h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
              {availableTopics.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {availableTopics.map((t) => (
              <TopicCard key={t.label} {...t} />
            ))}
          </div>
        </section>

        {/* Matura */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-xl font-semibold text-stone-800">
              Matura
            </h2>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
              W przygotowaniu
            </span>
          </div>
          <MaturaAccordion />
        </section>

        {/* Wkrótce */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-xl font-semibold text-stone-800">
              Wkrótce
            </h2>
            <span className="text-xs font-semibold text-stone-500 bg-stone-100 border border-stone-200 rounded-full px-2.5 py-0.5">
              {upcomingTopics.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {upcomingTopics.map((t) => (
              <TopicCard key={t.label} {...t} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#f2ecfb] border border-[#d4b8f0] rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-display font-semibold text-stone-800 text-lg mb-1">
              Nie widzisz swojego tematu?
            </p>
            <p className="text-stone-500 text-sm">
              Napisz do mnie, chętnie przygotuję materiał na zamówienie lub poprowadzę korepetycje.
            </p>
          </div>
          <Link
            href="/#kontakt"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#6d3a8e] hover:bg-[#52297a] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
          >
            Napisz do mnie <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
