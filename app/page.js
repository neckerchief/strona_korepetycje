"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Atom, Calculator, FlaskConical, GraduationCap, Layers, Mail, MapPin,
  MessageCircle, Target, TrendingUp, Zap, CheckCircle, ArrowRight,
  Clock, Award,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Topic card ──────────────────────────────────────────────
const topics = [
  { icon: Calculator, label: "Ułamki od zera", sub: "Matematyka, kl. 5–7", tag: "Podstawy", href: "/ulamki" },
  { icon: TrendingUp, label: "Równania liniowe", sub: "Matematyka, kl. 7–8", tag: "Algebra" },
  { icon: Zap, label: "Kinematyka intuicyjnie", sub: "Fizyka, kl. 7–8", tag: "Ruch" },
  { icon: Layers, label: "Potęgi i pierwiastki", sub: "Matematyka, SP–LO", tag: "Algebra" },
  { icon: Atom, label: "Siły i Newton", sub: "Fizyka, kl. 7–8", tag: "Mechanika" },
  { icon: FlaskConical, label: "Procenty praktycznie", sub: "Matematyka, kl. 6–8", tag: "Podstawy" },
];

const TopicCardInner = ({ icon: Icon, label, sub, tag, available }) => (
  <div className="group bg-white border-l-4 border-l-[#6d3a8e] border border-stone-200 rounded-2xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer relative">
    {available && (
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
    <h3 className="font-display font-semibold text-stone-800 text-lg mb-1">
      {label}
    </h3>
    <p className="text-stone-400 text-sm">{sub}</p>
  </div>
);

const TopicCard = ({ icon, label, sub, tag, href }) =>
  href ? (
    <Link href={href}>
      <TopicCardInner icon={icon} label={label} sub={sub} tag={tag} available />
    </Link>
  ) : (
    <TopicCardInner icon={icon} label={label} sub={sub} tag={tag} />
  );

// ─── Nav ─────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#fffeeb]/95 backdrop-blur-md border-b border-stone-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#6d3a8e] flex items-center justify-center">
            <Atom size={15} className="text-white" />
          </div>
          <span className="font-display font-semibold text-stone-800 tracking-tight">
            Korepetycje<span className="text-[#6d3a8e]">.</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm text-stone-500">
          {[
            { label: "Tematy", href: "#tematy" },
            { label: "O mnie", href: "#omnie" },
            { label: "Kontakt", href: "#kontakt" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-stone-800 transition-colors">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#kontakt"
          className="bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          Umów zajęcia
        </a>
      </div>
    </nav>
  );
};

// ─── Section eyebrow ─────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-3">
    {children}
  </p>
);

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />

      {/* ── TOP ── */}
      <section className="pt-28 pb-10 px-5 bg-[#fffeeb]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#f2ecfb] border border-[#d4b8f0] rounded-full px-4 py-1.5 mb-5 text-sm text-[#52297a]">
            <span className="w-2 h-2 rounded-full bg-[#6d3a8e]" />
            Korepetycje z matematyki i fizyki · Warszawa & Online
          </div>
          <p className="text-stone-500 text-lg leading-relaxed">
            Uczę fizyki i matematyki i tworzę materiały do samodzielnej nauki.
          </p>
        </div>
      </section>

      {/* ── BIO ── */}
      <section id="omnie" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>O mnie</Eyebrow>

          <div className="mt-2 flex flex-col lg:flex-row gap-12 items-start">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-6">
                Cześć, jestem Paulina
              </h2>
              <p className="text-stone-600 text-xl leading-relaxed mb-5">
                Jestem doktorantką fizyki teoretycznej na Uniwersytecie Warszawskim,
                ale na co dzień tłumaczę fizykę i matematykę uczniom od klasy 5 aż po studentów.
              </p>
              <p className="text-stone-600 text-xl leading-relaxed mb-8">
                Zależy mi na tym, żeby uczeń rozumiał, a nie tylko zapamiętywał.
                Nie spieszę się, nie oceniam i naprawdę cieszę się, gdy coś przestaje być trudne.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: GraduationCap, text: "Doktorat UW · obrona 2026" },
                  { icon: Atom, text: "Fizyka & matematyka · klasa 5 → studia" },
                  { icon: Award, text: "Wyróżnienie rektorskie za dydaktykę" },
                  { icon: MapPin, text: "Warszawa (Targówek i okolice) + online" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-stone-600 text-base">
                    <Icon size={16} className="text-[#6d3a8e] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  <MessageCircle size={16} /> Umów bezpłatną lekcję
                </a>
                <Link
                  href="/o-mnie"
                  className="inline-flex items-center justify-center gap-2 text-[#6d3a8e] hover:text-[#52297a] font-semibold px-6 py-3 rounded-xl border border-[#d4b8f0] hover:border-[#6d3a8e] transition-colors group"
                >
                  Dowiedz się więcej
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="w-full lg:w-[30%] flex-shrink-0">
              <div className="relative w-full aspect-[3/4] rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/meCV.jpg"
                  alt="Paulina"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section id="tematy" className="py-24 px-5 bg-[#fffeeb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Eyebrow>Materiały</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-3">
              Tematy
            </h2>
            <p className="text-stone-500 text-base max-w-lg">
              Przeglądaj tematy i ćwicz we własnym tempie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t) => (
              <TopicCard key={t.label} {...t} />
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 text-[#6d3a8e] hover:text-[#52297a] font-semibold text-base border border-[#d4b8f0] hover:border-[#6d3a8e] px-6 py-3 rounded-xl transition-all duration-200">
              Pokaż wszystkie tematy <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontakt" className="py-24 px-5 bg-[#f2ecfb]">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>Zacznijmy</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl text-stone-800 mb-5">
            Pierwsza lekcja<br />
            <span className="text-[#6d3a8e]">jest bezpłatna</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-10">
            Napisz do mnie, powiedz z czym masz problem i umówimy się na próbną lekcję bez zobowiązań.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:kontakt@example.com"
              className="flex items-center justify-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] font-bold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              <Mail size={18} /> Napisz e-mail
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 text-[#220b2d] border-2 border-[#ffd166] hover:bg-[#ffd166] font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              <MessageCircle size={16} /> Wyślij wiadomość
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#6d3a8e]" /> Odpowiadam w 24h</span>
            <span className="flex items-center gap-1.5"><Target size={14} className="text-[#6d3a8e]" /> Warszawa + online</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#6d3a8e]" /> Bez zobowiązań</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-stone-200 py-8 px-5 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#6d3a8e] flex items-center justify-center">
              <Atom size={11} className="text-white" />
            </div>
            <span>Korepetycje Paulina · Warszawa</span>
          </div>
          <span>© 2025 · Fizyka Teoretyczna & Matematyka</span>
          <span>Z pasją do nauczania</span>
        </div>
      </footer>
    </>
  );
}
