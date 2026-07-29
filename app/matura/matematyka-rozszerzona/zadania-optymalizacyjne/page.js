"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSourceSortKey, getDisplayNumber } from "../_components";
import { Zad12 } from "./Zad12";
import { Zad12Czerwiec2025Dod } from "./Zad12Czerwiec2025Dod";
import { Zad12Maj2025 } from "./Zad12Maj2025";
import { Zad1Smwp2026 } from "./Zad1Smwp2026";
import { Zad13CkeMock2024 } from "./Zad13CkeMock2024";

const COMPOUND_TASKS = [
  {
    id: "cke-mock-2024-grudzien-czworokat-f",
    source: "Matura próbna z matematyki, CKE, grudzień 2024, poziom rozszerzony",
    points: "0–6",
    Component: Zad13CkeMock2024,
  },
  {
    id: "cke-maj-2025-stozek",
    source: "Matura z matematyki, CKE, maj 2025, poziom rozszerzony",
    points: "0–6",
    Component: Zad12Maj2025,
  },
  {
    id: "cke-maj-2026-kwietnik",
    source:
      "Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023",
    points: "0–7",
    Component: Zad12,
  },
  {
    id: "smwp-styczen-2026-graniastoslup",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    points: "0–6",
    Component: Zad1Smwp2026,
  },
  {
    id: "cke-czerwiec-2025-dod-graniastoslup",
    source: "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy",
    points: "0–6",
    Component: Zad12Czerwiec2025Dod,
  },
].sort((a, b) => getSourceSortKey(b.source) - getSourceSortKey(a.source));

export default function ZadaniaOptymalizacyjnePage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/matura/matematyka-rozszerzona"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
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
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {COMPOUND_TASKS.length}{" "}
            {COMPOUND_TASKS.length === 1 ? "zadanie" : COMPOUND_TASKS.length < 5 ? "zadania" : "zadań"}
            {" "}
            (wszystkie złożone z podpunktów)
          </p>
        </div>
        <div className="space-y-12">
          {COMPOUND_TASKS.map(({ id, Component, points }, index) => (
            <Component key={id} number={getDisplayNumber(index)} points={points} />
          ))}
        </div>
      </main>
    </div>
  );
}
