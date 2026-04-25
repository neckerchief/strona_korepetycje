"use client";
import { useState } from "react";
import Link from "next/link";
import { InlineMath, BlockMath } from "react-katex";
import {
  ArrowLeft, ChevronRight, CheckCircle, RotateCcw,
  Eye, EyeOff, BookOpen, Lightbulb,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Mi = ({ children }) => <InlineMath math={children} />;
const Mb = ({ children }) => <BlockMath math={children} />;

// KaTeX label inside an SVG element (via foreignObject)
const SvgMi = ({ x, y, math, fill = "#000", fontSize = 12, anchor = "start" }) => {
  const w = 100;
  const h = Math.ceil(fontSize * 2);
  const ox = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <foreignObject x={ox} y={y - fontSize} width={w} height={h} style={{ overflow: "visible" }}>
      <div style={{
        color: fill,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        whiteSpace: "nowrap",
        textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left",
      }}>
        <InlineMath math={math} />
      </div>
    </foreignObject>
  );
};

// ─── Highlighted rule / definition box ──────────────────────
const RuleBox = ({ title, color = "green", children }) => {
  const border = {
    green: "border-[#6d3a8e] bg-[#f2ecfb]",
    amber: "border-[#f97316] bg-[#fff3e6]",
    blue:  "border-[#3b82f6] bg-[#eff6ff]",
    red:   "border-[#ef4444] bg-[#fef2f2]",
  }[color];
  const titleColor = {
    green: "text-[#52297a]",
    amber: "text-[#9a3412]",
    blue:  "text-[#1d4ed8]",
    red:   "text-[#b91c1c]",
  }[color];
  return (
    <div className={cn("border-l-4 rounded-xl px-5 py-4 my-5", border)}>
      {title && (
        <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", titleColor)}>
          {title}
        </p>
      )}
      <div className="text-stone-700 text-base leading-relaxed space-y-1">{children}</div>
    </div>
  );
};

// ─── Section heading with anchor ────────────────────────────
const SectionHead = ({ id, eyebrow, title }) => (
  <div id={id} className="pt-4 pb-2 scroll-mt-20">
    <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-1">{eyebrow}</p>
    <h2 className="font-display text-2xl md:text-3xl text-stone-800">{title}</h2>
  </div>
);

// ─── Worked example (step-by-step interactive) ───────────────
const WorkedExample = ({ title, steps }) => {
  const [revealed, setRevealed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const reset = () => { setRevealed(0); setShowHint(false); };
  const next = () => { setRevealed(r => Math.min(r + 1, steps.length - 1)); setShowHint(false); };

  return (
    <div className="bg-[#f4eef3] border border-stone-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="px-5 py-3 border-b border-stone-200 flex items-center gap-2">
        <BookOpen size={14} className="text-[#6d3a8e]" />
        <p className="font-display text-stone-600 text-sm">{title}</p>
      </div>
      <div className="p-5 space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border transition-all duration-500 overflow-hidden",
              i <= revealed
                ? "border-stone-200 bg-white opacity-100"
                : "border-transparent bg-transparent opacity-0 h-0 pointer-events-none"
            )}
          >
            <div className="px-4 pt-3 pb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6d3a8e] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-[#6d3a8e] uppercase tracking-wide">{step.label}</span>
              </div>
              <div className="text-stone-700 text-sm leading-relaxed">{step.content}</div>
              {step.formula && (
                <div className="mt-2 px-5 py-2 bg-[#f4eef3] rounded-lg border border-stone-200 text-stone-800 text-center text-base leading-loose">
                  {step.formula}
                </div>
              )}
              {i === revealed && showHint && step.hint && (
                <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <Lightbulb size={12} className="mt-0.5 flex-shrink-0" />
                  <span>{step.hint}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5 flex items-center gap-3">
        {steps[revealed]?.hint && (
          <button
            onClick={() => setShowHint(h => !h)}
            className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-2 hover:bg-stone-50 transition-colors"
          >
            {showHint ? <EyeOff size={12} /> : <Eye size={12} />}
            {showHint ? "Ukryj wskazówkę" : "Wskazówka"}
          </button>
        )}
        <div className="flex-1" />
        <button onClick={reset} className="text-stone-400 hover:text-stone-600 transition-colors p-2" title="Zacznij od nowa">
          <RotateCcw size={15} />
        </button>
        {revealed < steps.length - 1 ? (
          <button
            onClick={next}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Następny krok <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <CheckCircle size={15} /> Gotowe!
          </button>
        )}
      </div>
      <div className="flex justify-center gap-2 pb-4">
        {steps.map((_, i) => (
          <span key={i} className={cn("w-2 h-2 rounded-full transition-all duration-300", i <= revealed ? "bg-[#6d3a8e]" : "bg-stone-200")} />
        ))}
      </div>
    </div>
  );
};

// ─── Exercise card with hidden answer ───────────────────────
const ExerciseCard = ({ number, question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-[#f2ecfb] text-[#6d3a8e] text-sm font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <p className="text-stone-700 text-base leading-snug">{question}</p>
      </div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors"
      >
        {open ? <EyeOff size={11} /> : <Eye size={11} />}
        {open ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
      </button>
      {open && (
        <div className="mt-3 flex items-start gap-2 text-sm text-[#52297a] bg-[#f2ecfb] border border-[#d4b8f0] rounded-lg px-4 py-2 font-semibold">
          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{answer}</span>
        </div>
      )}
    </div>
  );
};

// ─── SVG vector diagrams ─────────────────────────────────────

// Single vector with angle
const DiagramWektor = () => (
  <svg viewBox="0 0 180 150" className="w-full max-w-[210px] mx-auto block">
    <defs>
      <marker id="dw1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#6d3a8e" />
      </marker>
    </defs>
    <line x1="15" y1="118" x2="170" y2="118" stroke="#e2e8f0" strokeWidth="1.5" />
    <line x1="15" y1="118" x2="15" y2="15" stroke="#e2e8f0" strokeWidth="1.5" />
    <text x="172" y="122" fill="#94a3b8" fontSize="10">x</text>
    <text x="8" y="13" fill="#94a3b8" fontSize="10">y</text>
    <line x1="15" y1="118" x2="138" y2="42" stroke="#6d3a8e" strokeWidth="2.5" markerEnd="url(#dw1)" />
    <path d="M 40,118 A 25,25 0 0,0 35.5,96" stroke="#f97316" strokeWidth="1.5" fill="none" />
    <SvgMi x={42} y={112} math="\alpha" fill="#f97316" fontSize={11} />
    <SvgMi x={58} y={72} math="\vec{v}" fill="#6d3a8e" fontSize={13} />
    <SvgMi x={84} y={93} math="|\vec{v}|" fill="#9ca3af" fontSize={10} />
  </svg>
);

// Vector decomposed into components
const DiagramSkladowe = () => (
  <svg viewBox="0 0 200 170" className="w-full max-w-[220px] mx-auto block">
    <defs>
      <marker id="ds1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#6d3a8e" />
      </marker>
      <marker id="ds2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f97316" />
      </marker>
      <marker id="ds3" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
      </marker>
    </defs>
    <line x1="20" y1="140" x2="190" y2="140" stroke="#e2e8f0" strokeWidth="1.5" />
    <line x1="20" y1="140" x2="20" y2="20" stroke="#e2e8f0" strokeWidth="1.5" />
    <text x="192" y="144" fill="#94a3b8" fontSize="10">x</text>
    <text x="13" y="17" fill="#94a3b8" fontSize="10">y</text>
    {/* dashed projections */}
    <line x1="155" y1="50" x2="155" y2="140" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,3" />
    <line x1="20" y1="50" x2="155" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,3" />
    {/* right angle marker */}
    <path d="M 148,140 A 7,7 0 0,0 155,133" stroke="#9ca3af" strokeWidth="1" fill="none" />
    <circle cx="150" cy="135" r="1.5" fill="#9ca3af" />
    {/* vx orange */}
    <line x1="20" y1="140" x2="150" y2="140" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#ds2)" />
    <SvgMi x={74} y={156} math="v_x" fill="#f97316" fontSize={11} />
    {/* vy blue */}
    <line x1="20" y1="140" x2="20" y2="55" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#ds3)" />
    <SvgMi x={1} y={100} math="v_y" fill="#3b82f6" fontSize={11} />
    {/* main vector purple */}
    <line x1="20" y1="140" x2="151" y2="52" stroke="#6d3a8e" strokeWidth="2.5" markerEnd="url(#ds1)" />
    <SvgMi x={72} y={84} math="\vec{v}" fill="#6d3a8e" fontSize={13} />
  </svg>
);

// Vector addition, triangle rule
const DiagramDodawanie = () => (
  <svg viewBox="0 0 220 170" className="w-full max-w-[240px] mx-auto block">
    <defs>
      <marker id="dd1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
      </marker>
      <marker id="dd2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f97316" />
      </marker>
      <marker id="dd3" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#6d3a8e" />
      </marker>
    </defs>
    {/* a (blue): O → A */}
    <line x1="25" y1="130" x2="124" y2="72" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#dd1)" />
    <SvgMi x={53} y={92} math="\vec{a}" fill="#3b82f6" fontSize={12} />
    {/* b (orange): A → B */}
    <line x1="128" y1="70" x2="177" y2="128" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#dd2)" />
    <SvgMi x={159} y={98} math="\vec{b}" fill="#f97316" fontSize={12} />
    {/* a + b (purple): O → B */}
    <line x1="25" y1="130" x2="174" y2="133" stroke="#6d3a8e" strokeWidth="2.5" markerEnd="url(#dd3)" />
    <SvgMi x={80} y={152} math="\vec{a}+\vec{b}" fill="#6d3a8e" fontSize={12} />
    {/* points */}
    <circle cx="25" cy="130" r="3" fill="#6d3a8e" />
    <circle cx="128" cy="70" r="3" fill="#3b82f6" />
    <circle cx="178" cy="134" r="3" fill="#f97316" />
    <text x="14" y="147" fill="#94a3b8" fontSize="10">O</text>
    <text x="130" y="64" fill="#94a3b8" fontSize="10">A</text>
    <text x="180" y="148" fill="#94a3b8" fontSize="10">B</text>
  </svg>
);

// Dot product, angle between two vectors
const DiagramSkalarny = () => (
  <svg viewBox="0 0 190 150" className="w-full max-w-[210px] mx-auto block">
    <defs>
      <marker id="dsk1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
      </marker>
      <marker id="dsk2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f97316" />
      </marker>
    </defs>
    {/* a horizontal (blue) */}
    <line x1="35" y1="105" x2="172" y2="105" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#dsk1)" />
    <SvgMi x={94} y={122} math="\vec{a}" fill="#3b82f6" fontSize={12} />
    {/* b at angle (orange) */}
    <line x1="35" y1="105" x2="125" y2="38" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#dsk2)" />
    <SvgMi x={63} y={58} math="\vec{b}" fill="#f97316" fontSize={12} />
    {/* angle arc */}
    <path d="M 65,105 A 30,30 0 0,0 57,82" stroke="#6b7280" strokeWidth="1.5" fill="none" />
    <SvgMi x={67} y={98} math="\theta" fill="#6b7280" fontSize={11} />
    {/* dashed projection */}
    <line x1="125" y1="38" x2="125" y2="105" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,3" />
    <SvgMi x={28} y={76} math="|\vec{b}|\cos\theta" fill="#9ca3af" fontSize={9} />
    <circle cx="35" cy="105" r="3" fill="#6d3a8e" />
  </svg>
);

// ─── Box being pushed, concrete force vector example ────────
const DiagramSkrzynia = () => (
  <svg viewBox="0 0 230 115" className="w-full max-w-[250px] mx-auto block">
    <defs>
      <marker id="skF" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
      </marker>
    </defs>
    {/* Floor */}
    <line x1="0" y1="100" x2="230" y2="100" stroke="#cbd5e1" strokeWidth="2" />
    {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
      <line key={i} x1={5+i*22} y1="100" x2={i*22} y2="112" stroke="#e2e8f0" strokeWidth="1.5" />
    ))}
    {/* Box */}
    <rect x="122" y="52" width="82" height="48" rx="3" fill="#f2ecfb" stroke="#6d3a8e" strokeWidth="2" />
    <text x="163" y="81" textAnchor="middle" fill="#6d3a8e" fontSize="11">skrzynia</text>
    {/* Force arrow */}
    <line x1="12" y1="76" x2="116" y2="76" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#skF)" />
    <SvgMi x={60} y={68} math="\vec{F} = 50\,\text{N}" fill="#3b82f6" fontSize={12} anchor="middle" />
    {/* Point of application */}
    <circle cx="120" cy="76" r="4" fill="#f97316" />
  </svg>
);

// ─── Single vector on a labelled grid ────────────────────────
const DiagramWektorGrid = () => (
  <svg viewBox="0 0 215 175" className="w-full max-w-[230px] mx-auto block">
    <defs>
      <marker id="dwg" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#6d3a8e" />
      </marker>
      <marker id="axXg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
      </marker>
      <marker id="axYg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
      </marker>
    </defs>
    {/* Grid verticals x=1,2,3,4 */}
    <line x1="65" y1="15" x2="65" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="100" y1="15" x2="100" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="135" y1="15" x2="135" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="170" y1="15" x2="170" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    {/* Grid horizontals y=1,2,3 */}
    <line x1="30" y1="115" x2="178" y2="115" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="30" y1="80" x2="178" y2="80" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="30" y1="45" x2="178" y2="45" stroke="#e2e8f0" strokeWidth="1" />
    {/* Axes */}
    <line x1="30" y1="150" x2="183" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axXg)" />
    <line x1="30" y1="150" x2="30" y2="8" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axYg)" />
    <text x="185" y="154" fill="#94a3b8" fontSize="10">x</text>
    <text x="23" y="6" fill="#94a3b8" fontSize="10">y</text>
    {/* X ticks + numbers */}
    <line x1="65" y1="148" x2="65" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="62" y="163" fill="#94a3b8" fontSize="9">1</text>
    <line x1="100" y1="148" x2="100" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="97" y="163" fill="#94a3b8" fontSize="9">2</text>
    <line x1="135" y1="148" x2="135" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="132" y="163" fill="#94a3b8" fontSize="9">3</text>
    <line x1="170" y1="148" x2="170" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="167" y="163" fill="#94a3b8" fontSize="9">4</text>
    {/* Y ticks + numbers */}
    <line x1="28" y1="115" x2="32" y2="115" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="119" fill="#94a3b8" fontSize="9">1</text>
    <line x1="28" y1="80" x2="32" y2="80" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="84" fill="#94a3b8" fontSize="9">2</text>
    <line x1="28" y1="45" x2="32" y2="45" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="49" fill="#94a3b8" fontSize="9">3</text>
    {/* Dashed projections */}
    <line x1="135" y1="80" x2="135" y2="150" stroke="#f97316" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
    <line x1="30" y1="80" x2="135" y2="80" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
    {/* Component labels */}
    <SvgMi x={66} y={166} math="v_x = 3" fill="#f97316" fontSize={9} />
    <SvgMi x={134} y={115} math="v_y = 2" fill="#3b82f6" fontSize={9} />
    {/* Vector from origin (30,150) to (135,80) */}
    <line x1="30" y1="150" x2="135" y2="80" stroke="#6d3a8e" strokeWidth="2.5" markerEnd="url(#dwg)" />
    {/* Angle arc */}
    <path d="M 60,150 A 30,30 0 0,0 55,133" stroke="#f97316" strokeWidth="1.5" fill="none" />
    <SvgMi x={60} y={141} math="\alpha" fill="#f97316" fontSize={11} />
    {/* Vector label */}
    <SvgMi x={64} y={107} math="\vec{v}" fill="#6d3a8e" fontSize={13} />
  </svg>
);

// ─── Two equal vectors starting from different points ─────────
const DiagramRowneWektory = () => (
  <svg viewBox="0 0 215 175" className="w-full max-w-[230px] mx-auto block">
    <defs>
      <marker id="drw1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#6d3a8e" />
      </marker>
      <marker id="drw2" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#52297a" />
      </marker>
      <marker id="axXrw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
      </marker>
      <marker id="axYrw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
      </marker>
    </defs>
    {/* Grid */}
    <line x1="65" y1="15" x2="65" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="100" y1="15" x2="100" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="135" y1="15" x2="135" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="170" y1="15" x2="170" y2="150" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="30" y1="115" x2="178" y2="115" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="30" y1="80" x2="178" y2="80" stroke="#e2e8f0" strokeWidth="1" />
    <line x1="30" y1="45" x2="178" y2="45" stroke="#e2e8f0" strokeWidth="1" />
    {/* Axes */}
    <line x1="30" y1="150" x2="183" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axXrw)" />
    <line x1="30" y1="150" x2="30" y2="8" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axYrw)" />
    <text x="185" y="154" fill="#94a3b8" fontSize="10">x</text>
    <text x="23" y="6" fill="#94a3b8" fontSize="10">y</text>
    {/* X ticks */}
    <line x1="65" y1="148" x2="65" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="62" y="163" fill="#94a3b8" fontSize="9">1</text>
    <line x1="100" y1="148" x2="100" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="97" y="163" fill="#94a3b8" fontSize="9">2</text>
    <line x1="135" y1="148" x2="135" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="132" y="163" fill="#94a3b8" fontSize="9">3</text>
    <line x1="170" y1="148" x2="170" y2="152" stroke="#94a3b8" strokeWidth="1" />
    <text x="167" y="163" fill="#94a3b8" fontSize="9">4</text>
    {/* Y ticks */}
    <line x1="28" y1="115" x2="32" y2="115" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="119" fill="#94a3b8" fontSize="9">1</text>
    <line x1="28" y1="80" x2="32" y2="80" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="84" fill="#94a3b8" fontSize="9">2</text>
    <line x1="28" y1="45" x2="32" y2="45" stroke="#94a3b8" strokeWidth="1" />
    <text x="14" y="49" fill="#94a3b8" fontSize="9">3</text>
    {/* Vector 1: (1,0)→(3,2) SVG (65,150)→(135,80) */}
    <line x1="65" y1="150" x2="135" y2="80" stroke="#6d3a8e" strokeWidth="2.5" markerEnd="url(#drw1)" />
    <SvgMi x={104} y={124} math="\vec{v}_1" fill="#6d3a8e" fontSize={12} />
    {/* Vector 2: (0,1)→(2,3) SVG (30,115)→(100,45) */}
    <line x1="30" y1="115" x2="100" y2="45" stroke="#52297a" strokeWidth="2.5" markerEnd="url(#drw2)" />
    <SvgMi x={52} y={77} math="\vec{v}_2" fill="#52297a" fontSize={12} />
    {/* Equal annotation */}
    <SvgMi x={145} y={96} math="\vec{v}_1 = \vec{v}_2" fill="#16a34a" fontSize={10} />
    <SvgMi x={145} y={109} math="\Delta x{=}2,\,\Delta y{=}2" fill="#9ca3af" fontSize={8} />
  </svg>
);

// ─── Right triangle for trig recap ───────────────────────────
const DiagramTrygonometria = () => (
  <svg viewBox="0 0 185 148" className="w-full max-w-[200px] mx-auto block">
    {/* Hypotenuse A-C (orange) */}
    <line x1="20" y1="120" x2="145" y2="28" stroke="#f97316" strokeWidth="2.5" />
    {/* Adjacent A-B base (purple) */}
    <line x1="20" y1="120" x2="145" y2="120" stroke="#6d3a8e" strokeWidth="2.5" />
    {/* Opposite B-C vertical (blue) */}
    <line x1="145" y1="120" x2="145" y2="28" stroke="#3b82f6" strokeWidth="2.5" />
    {/* Right angle at B */}
    <path d="M 132,120 A 13,13 0 0,0 145,107" stroke="#6b7280" strokeWidth="1.5" fill="none" />
    <circle cx="136" cy="112" r="2" fill="#6b7280" />
    {/* Angle α at A */}
    <path d="M 46,120 A 26,26 0 0,0 41,100" stroke="#374151" strokeWidth="1.5" fill="none" />
    <SvgMi x={47} y={116} math="\alpha" fill="#374151" fontSize={13} />
    {/* Side labels */}
    <SvgMi x={64} y={62} math="c" fill="#f97316" fontSize={13} />
    <SvgMi x={81} y={138} math="b" fill="#6d3a8e" fontSize={13} anchor="middle" />
    <SvgMi x={150} y={80} math="a" fill="#3b82f6" fontSize={13} />
  </svg>
);

// ─── Table of contents ───────────────────────────────────────
const toc = [
  { id: "czym-jest",  label: "Co to jest wektor?" },
  { id: "skladowe",   label: "Składowe i układy" },
  { id: "dodawanie",  label: "Dodawanie wektorów" },
  { id: "skalarny",   label: "Iloczyn skalarny" },
  { id: "wektorowy",  label: "Iloczyn wektorowy" },
  { id: "fizyka",     label: "Fizyka w akcji" },
  { id: "zadania",    label: "Zadania" },
];

// ─── Worked example data ─────────────────────────────────────

const exampleRownia = [
  {
    label: "Zadanie",
    content: (
      <>
        Ciało o masie <strong>m = 2 kg</strong> leży na równi pochyłej pod kątem{" "}
        <strong>α = 30°</strong>. Rozłóż ciężar ciała na składowe, wzdłuż równi i prostopadle do niej.
        Przyjmij g = 10 m/s².
      </>
    ),
    hint: "Ciężar G = m·g działa pionowo w dół. Kąt, który tworzy z prostopadłą do równi, jest równy kątowi nachylenia α = 30°.",
    formula: null,
  },
  {
    label: "Ciężar ciała",
    content: "Wektor ciężaru jest skierowany pionowo w dół i ma wartość:",
    formula: <Mb>{"G = m \\cdot g = 2 \\cdot 10 = 20\\ \\text{N}"}</Mb>,
    hint: "Ciężar to siła grawitacji, zawsze pionowo w dół, niezależnie od nachylenia powierzchni.",
  },
  {
    label: "Układ współrzędnych",
    content: (
      <>
        Wybieramy układ dopasowany do geometrii zadania: oś <strong>x wzdłuż równi</strong> (w dół zbocza),
        oś <strong>y prostopadle do równi</strong> (od powierzchni). To sprawi, że równania będą prostsze.
      </>
    ),
    hint: "Układ odniesienia to nasz wybór, nie ma jednego 'poprawnego'. Dobieramy go tak, żeby jak najwięcej sił trafiło od razu na oś.",
    formula: null,
  },
  {
    label: "Składowa wzdłuż równi",
    content: (
      <>
        Składowa ciężaru <strong>równoległa do powierzchni</strong> (oś x), to ta, która ciągnie ciało
        w dół zbocza:
      </>
    ),
    formula: <Mb>{"G_\\parallel = G \\cdot \\sin(30^\\circ) = 20 \\cdot 0{,}5 = 10\\ \\text{N}"}</Mb>,
    hint: "sin(30°) = 0,5. Kąt między ciężarem a prostopadłą do równi wynosi α, stąd składowa wzdłuż = G·sin(α).",
  },
  {
    label: "Składowa prostopadła",
    content: (
      <>
        Składowa ciężaru <strong>prostopadła do powierzchni</strong> (oś y), naciska na równię, jest
        równoważona przez reakcję normalną:
      </>
    ),
    formula: <Mb>{"G_\\perp = G \\cdot \\cos(30^\\circ) = 20 \\cdot \\frac{\\sqrt{3}}{2} \\approx 17{,}3\\ \\text{N}"}</Mb>,
    hint: "cos(30°) = √3/2 ≈ 0,866. Sprawdzenie: √(10² + 17,3²) = √(100 + 300) = √400 = 20 N ✓",
  },
  {
    label: "Wynik i sprawdzenie",
    content: "Rozłożyliśmy ciężar na dwie składowe prostopadłe. Sprawdzamy twierdzeniem Pitagorasa:",
    formula: <Mb>{"\\sqrt{G_\\parallel^2 + G_\\perp^2} = \\sqrt{10^2 + 17{,}3^2} = \\sqrt{100+300} = 20\\ \\text{N}\\ \\checkmark"}</Mb>,
    hint: "Zawsze warto sprawdzić: jeśli odtworzymy wektor ze składowych i wyjdzie taka sama długość jak oryginał, rachunek jest dobry.",
  },
];

const examplePraca = [
  {
    label: "Zadanie",
    content: (
      <>
        Siła <strong>F = 15 N</strong> działa pod kątem <strong>α = 60°</strong> do kierunku ruchu.
        Ciało przesuwa się o <strong>d = 4 m</strong>. Oblicz pracę wykonaną przez tę siłę.
      </>
    ),
    hint: "Praca to iloczyn skalarny siły i przesunięcia. Liczy się tylko składowa siły zgodna z kierunkiem ruchu.",
    formula: null,
  },
  {
    label: "Wzór na pracę",
    content: (
      <>
        Praca to <strong>iloczyn skalarny</strong> wektora siły i wektora przemieszczenia. Geometrycznie:
      </>
    ),
    formula: <Mb>{"W = \\vec{F} \\cdot \\vec{d} = |\\vec{F}| \\cdot |\\vec{d}| \\cdot \\cos\\alpha"}</Mb>,
    hint: "Iloczyn skalarny dwóch wektorów to iloczyn ich modułów i cosinusa kąta między nimi. Wynik jest liczbą (skalarem), nie wektorem.",
  },
  {
    label: "Podstawiamy dane",
    content: "Wstawiamy wartości liczbowe:",
    formula: <Mb>{"W = 15 \\cdot 4 \\cdot \\cos(60^\\circ) = 15 \\cdot 4 \\cdot 0{,}5 = 30\\ \\text{J}"}</Mb>,
    hint: "cos(60°) = 0,5. Gdyby α = 0° (siła równoległa do ruchu), praca byłaby maksymalna: W = 15·4·1 = 60 J.",
  },
  {
    label: "Interpretacja",
    content: (
      <>
        cos(60°) = 0,5 oznacza, że tylko <strong>połowa siły</strong> „pcha" w kierunku ruchu.
        Składowa siły zgodna z ruchem wynosi:
      </>
    ),
    formula: <Mb>{"F_\\parallel = F \\cdot \\cos(60^\\circ) = 15 \\cdot 0{,}5 = 7{,}5\\ \\text{N}"}</Mb>,
    hint: "Składowa siły prostopadła do ruchu (F⊥ = F·sin60° ≈ 13 N) nie wykonuje żadnej pracy, tylko ją 'marnuje' na dociskanie lub unoszenie ciała.",
  },
];

const exampleMoment = [
  {
    label: "Zadanie",
    content: (
      <>
        Klucz nasadkowy przykłada siłę <strong>F = [0, 25, 0] N</strong> na końcu ramienia o długości{" "}
        <strong>r = [0,4; 0; 0] m</strong>. Oblicz moment siły.
      </>
    ),
    hint: "Moment siły to iloczyn wektorowy M = r × F. Wynik jest wektorem, ma i wartość, i kierunek (oś obrotu).",
    formula: null,
  },
  {
    label: "Wzór na moment siły",
    content: "Moment siły obliczamy jako iloczyn wektorowy wektora ramienia i wektora siły:",
    formula: <Mb>{"\\vec{M} = \\vec{r} \\times \\vec{F}"}</Mb>,
    hint: "Kolejność ma znaczenie! r × F ≠ F × r, iloczyn wektorowy jest antyprzemienny.",
  },
  {
    label: "Składowe iloczynu wektorowego",
    content: "Wyliczamy każdą składową wektora M ze wzoru na iloczyn wektorowy w 3D:",
    formula: (
      <div className="text-left space-y-1">
        <Mb>{"M_x = r_y F_z - r_z F_y = 0 \\cdot 0 - 0 \\cdot 25 = 0"}</Mb>
        <Mb>{"M_y = r_z F_x - r_x F_z = 0 \\cdot 0 - 0{,}4 \\cdot 0 = 0"}</Mb>
        <Mb>{"M_z = r_x F_y - r_y F_x = 0{,}4 \\cdot 25 - 0 \\cdot 0 = 10"}</Mb>
      </div>
    ),
    hint: "Większość składowych zeruje się, bo wektory leżą w płaszczyźnie xy. Niezerowa pozostaje tylko składowa Mz, obrót odbywa się wokół osi z.",
  },
  {
    label: "Wynik",
    content: "Moment siły to:",
    formula: <Mb>{"\\vec{M} = [0;\\ 0;\\ 10]\\ \\text{N{\\cdot}m}, \\quad |\\vec{M}| = 10\\ \\text{N{\\cdot}m}"}</Mb>,
    hint: "10 N·m to moment, który przekręca nakrętkę. Im dłuższe ramię r, tym mniejsza siła potrzebna do uzyskania tego samego momentu.",
  },
  {
    label: "Kierunek, reguła prawej ręki",
    content: (
      <>
        M jest skierowany wzdłuż <strong>osi z</strong> (ku górze lub w dół, zależy od zwrotu).
        Reguła prawej ręki: zginamy palce od r do F, kciuk wskazuje kierunek M.
        Tutaj kciuk wskazuje <strong>+z</strong> (w górę ekranu), czyli nakrętka obraca się przeciwnie do ruchu wskazówek zegara.
      </>
    ),
    hint: "Kierunek momentu to oś, wokół której odbywa się obrót. Zwrot (+ lub −) mówi, w którą stronę kręci.",
    formula: null,
  },
];

// ─── Exercises data ──────────────────────────────────────────
const exercises = [
  {
    number: 1,
    question: <>Wektor <Mi>{"\\vec{v} = [3,\\ 4]"}</Mi>. Oblicz <Mi>{"| \\vec{v} |"}</Mi>.</>,
    answer: <><Mi>{"| \\vec{v} | = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5"}</Mi></>,
  },
  {
    number: 2,
    question: (
      <>
        Wektor <Mi>{"\\vec{v}"}</Mi> ma moduł 10 m/s i jest skierowany pod kątem{" "}
        <Mi>{"\\alpha = 37^\\circ"}</Mi> do osi x.
        Oblicz składowe <Mi>{"v_x"}</Mi> i <Mi>{"v_y"}</Mi>.{" "}
        (sin 37° ≈ 0,6; cos 37° ≈ 0,8)
      </>
    ),
    answer: (
      <>
        <Mi>{"v_x = 10 \\cdot \\cos(37^\\circ) = 10 \\cdot 0{,}8 = 8\\ \\text{m/s}"}</Mi>;{" "}
        <Mi>{"v_y = 10 \\cdot \\sin(37^\\circ) = 10 \\cdot 0{,}6 = 6\\ \\text{m/s}"}</Mi>
      </>
    ),
  },
  {
    number: 3,
    question: (
      <>
        Oblicz <Mi>{"\\vec{a} + \\vec{b}"}</Mi>, gdzie{" "}
        <Mi>{"\\vec{a} = [3,\\ {-1}]"}</Mi> i <Mi>{"\\vec{b} = [{-2},\\ 5]"}</Mi>.
      </>
    ),
    answer: <><Mi>{"\\vec{a} + \\vec{b} = [3+({-2}),\\ {-1}+5] = [1,\\ 4]"}</Mi></>,
  },
  {
    number: 4,
    question: (
      <>
        Oblicz iloczyn skalarny <Mi>{"\\vec{a} \\cdot \\vec{b}"}</Mi>, gdzie{" "}
        <Mi>{"\\vec{a} = [2,\\ 3]"}</Mi> i <Mi>{"\\vec{b} = [4,\\ {-1}]"}</Mi>.
      </>
    ),
    answer: <><Mi>{"\\vec{a} \\cdot \\vec{b} = 2 \\cdot 4 + 3 \\cdot ({-1}) = 8 - 3 = 5"}</Mi></>,
  },
  {
    number: 5,
    question: (
      <>
        Czy wektory <Mi>{"\\vec{a} = [1,\\ 2]"}</Mi> i{" "}
        <Mi>{"\\vec{b} = [4,\\ {-2}]"}</Mi> są prostopadłe?
      </>
    ),
    answer: (
      <>
        <Mi>{"\\vec{a} \\cdot \\vec{b} = 1 \\cdot 4 + 2 \\cdot ({-2}) = 4 - 4 = 0"}</Mi>.{" "}
        Tak, iloczyn skalarny równy zero oznacza prostopadłość.
      </>
    ),
  },
  {
    number: 6,
    question: (
      <>
        Siła F = 20 N działa <strong>prostopadle</strong> (α = 90°) do kierunku ruchu ciała.
        Ile wynosi praca wykonana przez tę siłę, gdy ciało przesunie się o d = 5 m?
      </>
    ),
    answer: (
      <>
        <Mi>{"W = F \\cdot d \\cdot \\cos(90^\\circ) = 20 \\cdot 5 \\cdot 0 = 0\\ \\text{J}"}</Mi>.{" "}
        Siła prostopadła do ruchu nie wykonuje pracy.
      </>
    ),
  },
  {
    number: 7,
    question: (
      <>
        Oblicz <Mi>{"| \\vec{a} \\times \\vec{b} |"}</Mi>, gdzie{" "}
        <Mi>{"\\vec{a} = [3,\\ 0,\\ 0]"}</Mi> i{" "}
        <Mi>{"\\vec{b} = [0,\\ 2,\\ 0]"}</Mi>. Podaj też kierunek wynikowego wektora.
      </>
    ),
    answer: (
      <>
        <Mi>{"M_z = r_x F_y - r_y F_x = 3 \\cdot 2 - 0 \\cdot 0 = 6"}</Mi>;{" "}
        <Mi>{"| \\vec{a} \\times \\vec{b} | = 6"}</Mi>; kierunek: +z (w górę, reguła prawej ręki)
      </>
    ),
  },
  {
    number: 8,
    question: (
      <>
        Piłka wyrzucona pod kątem <Mi>{"\\alpha = 53^\\circ"}</Mi> do poziomu ma prędkość
        początkową <Mi>{"v_0 = 50\\ \\text{m/s}"}</Mi>.
        Oblicz poziomą i pionową składową prędkości. (sin 53° ≈ 0,8; cos 53° ≈ 0,6)
      </>
    ),
    answer: (
      <>
        <Mi>{"v_{0x} = 50 \\cdot 0{,}6 = 30\\ \\text{m/s}"}</Mi>;{" "}
        <Mi>{"v_{0y} = 50 \\cdot 0{,}8 = 40\\ \\text{m/s}"}</Mi>.{" "}
        Sprawdzenie: <Mi>{"\\sqrt{30^2 + 40^2} = \\sqrt{2500} = 50\\ \\checkmark"}</Mi>
      </>
    ),
  },
];

// ─── Main page ───────────────────────────────────────────────
export default function WektoryPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">

      {/* ── Top bar ── */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Powrót
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Materiały</span>
          <span className="text-stone-300">/</span>
          <span className="text-sm text-stone-600 font-medium">Wektory</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="flex gap-12">

          {/* ── Sidebar TOC (desktop) ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Spis treści</p>
              {toc.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-stone-500 hover:text-[#6d3a8e] hover:translate-x-1 transition-all duration-150 py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0 space-y-14">

            {/* Header */}
            <div>
              <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-2">
                Materiały · Fizyka · LO
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Wektory</h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
                Definicja, składowe, działania algebraiczne i zastosowania w fizyce, z przykładami i zadaniami.
              </p>
              {/* Mobile TOC */}
              <div className="lg:hidden mt-6 bg-white border border-stone-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Spis treści</p>
                <div className="flex flex-wrap gap-2">
                  {toc.map(item => (
                    <a key={item.id} href={`#${item.id}`} className="text-xs text-[#6d3a8e] border border-[#d4b8f0] rounded-full px-3 py-1 hover:bg-[#f2ecfb] transition-colors">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 1. Co to jest wektor ── */}
            <section>
              <SectionHead id="czym-jest" eyebrow="Rozdział 1" title="Co to jest wektor i po co nam to?" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                W fizyce i matematyce spotykamy dwa rodzaje wielkości. Jedne opisuje sama liczba z jednostką
                jak np. temperatura 20°C, masa 5 kg, czas 3 s. Takie wielkości nazywamy{" "}
                <strong className="text-stone-800">skalarami</strong>. Do opisu drugich nie wystarczy po prostu
                jedna liczba. Żeby powiedzieć, dokąd jedzie auto, trzeba podać i szybkość, i kierunek jazdy.
                Te wielkości to <strong className="text-stone-800">wektory</strong>.
              </p>

              {/* Scalar vs vector table */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-3">Skalary</p>
                  <ul className="space-y-1.5 text-sm text-stone-600">
                    {["Temperatura (20°C)", "Masa (5 kg)", "Czas (3 s)", "Energia (100 J)", "Prędkość skalarna (sama wartość 60 km/h)"].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#f2ecfb] border border-[#d4b8f0] rounded-2xl p-4">
                  <p className="text-xs font-bold text-[#52297a] uppercase tracking-wide mb-3">Wektory</p>
                  <ul className="space-y-1.5 text-sm text-stone-700">
                    {["Prędkość (60 km/h na północ)", "Siła (10 N w dół)", "Przesunięcie (5 m na wschód)", "Przyspieszenie (9,8 m/s² w dół)", "Moment siły"].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 my-5">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
                  Przykład, siła pchająca skrzynię
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <DiagramSkrzynia />
                  <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-2">
                    <p>
                      Wyobraź sobie, że pchasz skrzynię z siłą{" "}
                      <Mi>{"\\vec{F} = 50\\ \\text{N}"}</Mi> poziomo. Sama liczba „50 N" to za mało,
                      ta siła to <strong>wektor</strong>, który posiada wszystkie cztery cechy:
                    </p>
                    <ul className="space-y-1.5 mt-1">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0 mt-1.5" />
                        <span>
                          <strong className="text-[#52297a]">Punkt przyłożenia</strong>, ręka
                          przykłada siłę do konkretnego miejsca na skrzyni (pomarańczowa kropka)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0 mt-1.5" />
                        <span>
                          <strong className="text-[#52297a]">Kierunek</strong>, poziomy (prosta,
                          wzdłuż której działa siła)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0 mt-1.5" />
                        <span>
                          <strong className="text-[#52297a]">Zwrot</strong>, w prawo, ku skrzyni
                          (nie w lewo!)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0 mt-1.5" />
                        <span>
                          <strong className="text-[#52297a]">Moduł</strong>, 50 N (jak duża jest
                          ta siła)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <RuleBox title="Cechy wektora">
                <p>Każdy wektor ma <strong>cztery</strong> cechy:</p>
                <div className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { name: "Punkt przyłożenia", desc: "Skąd zaczyna się wektor (choć często pomijamy go przy obliczeniach)" },
                    { name: "Kierunek", desc: "Na jakiej prostej leży wektor (np. poziomy, pionowy, pod kątem 45°)" },
                    { name: "Zwrot", desc: "W którą stronę na tej prostej, prosto/lewo vs. prosto/prawo" },
                    { name: "Moduł (długość)", desc: <>Wartość liczbowa, czyli jak długi jest wektor, ile wynosi <Mi>{"|\\vec{v}|"}</Mi></> },
                  ].map(c => (
                    <div key={c.name} className="bg-white rounded-lg px-3 py-2 border border-[#d4b8f0]">
                      <p className="font-semibold text-[#52297a] text-xs mb-0.5">{c.name}</p>
                      <p className="text-stone-600">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </RuleBox>

              <div className="flex flex-col sm:flex-row gap-6 items-center mt-5">
                <DiagramWektorGrid />
                <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-stone-800">Notacja:</strong> wektor zapisujemy jako{" "}
                    <Mi>{"\\vec{v}"}</Mi> (litera ze strzałką) lub <Mi>{"\\boldsymbol{v}"}</Mi> (pogrubioną czcionką).
                    Moduł (długość) wektora to <Mi>{"| \\vec{v} |"}</Mi>.
                  </p>
                  <p>
                    Na rysunku kratka na osiach x i y ma jednostkę 1. Wektor{" "}
                    <Mi>{"\\vec{v} = [3,\\ 2]"}</Mi> kończy się w kratce 3 na osi x i 2 na osi y.{" "}
                    <strong>Zwrot</strong> wskazuje strzałka, w prawo i w górę.{" "}
                    <strong>Moduł</strong> (długość) odcinka to{" "}
                    <Mi>{"| \\vec{v} | = \\sqrt{3^2 + 2^2} = \\sqrt{13} \\approx 3{,}6"}</Mi>.{" "}
                    Kąt <Mi>{"\\alpha \\approx 34^\\circ"}</Mi> to kąt, który wektor tworzy z osią x.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center mt-6">
                <DiagramRowneWektory />
                <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-3">
                  <p>
                    Dwa wektory są <strong>równe</strong>, jeśli mają ten sam kierunek, zwrot
                    i moduł, nieważne skąd zaczynają. Na rysunku{" "}
                    <Mi>{"\\vec{v}_1"}</Mi> i <Mi>{"\\vec{v}_2"}</Mi> to identyczne wektory: każdy przesuwa się o 2 kratki
                    w prawo i 2 kratki w górę (<Mi>{"\\Delta x = 2,\\ \\Delta y = 2"}</Mi>). Dzięki kratce na osiach widać od
                    razu, że oba mają tę samą długość i kierunek, mimo że startują z różnych
                    punktów.
                  </p>
                </div>
              </div>
            </section>

            {/* ── 2. Składowe i układy ── */}
            <section>
              <SectionHead id="skladowe" eyebrow="Rozdział 2" title="Składowe wektora i układy odniesienia" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Wektory można opisywać składowymi zarówno w <strong className="text-stone-800">2D</strong> (na
                płaszczyźnie, dwie liczby), jak i w <strong className="text-stone-800">3D</strong> (w przestrzeni,
                trzy liczby). W tej sekcji skupiamy się na wektorach płaskich (2D), bo to najczęstszy
                przypadek w fizyce szkolnej. To jak podanie GPS-owi: „przesuń się 8 km na wschód i 6 km na
                północ" zamiast „przesuń się 10 km pod kątem 37°", oba opisy mówią o tej samej podróży.
              </p>

              <RuleBox title="Powtórka: funkcje trygonometryczne w trójkącie prostokątnym" color="red">
                <p className="mb-3 text-sm">
                  Funkcje trygonometryczne kąta α pomagają rozkładać wektory na składowe.
                  Dla trójkąta prostokątnego o kącie α, podstawie <span className="text-[#6d3a8e]"><Mi>{"b"}</Mi></span>,
                  boku naprzeciwko <span className="text-[#3b82f6]"><Mi>{"a"}</Mi></span> i przeciwprostokątnej{" "}
                  <span className="text-[#f97316]"><Mi>{"c"}</Mi></span>:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <DiagramTrygonometria />
                  <div className="flex-1 text-sm space-y-2">
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\sin\\alpha = \\textcolor{#3b82f6}{a} / \\textcolor{#f97316}{c}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">(bok naprzeciwko / przeciwprostokątna)</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\cos\\alpha = \\textcolor{#6d3a8e}{b} / \\textcolor{#f97316}{c}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">(podstawa / przeciwprostokątna)</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\tan\\alpha = \\textcolor{#3b82f6}{a} / \\textcolor{#6d3a8e}{b}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">(bok naprzeciwko / podstawa)</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\cot\\alpha = \\textcolor{#6d3a8e}{b} / \\textcolor{#3b82f6}{a}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">(podstawa / bok naprzeciwko)</span>
                    </div>
                  </div>
                </div>
              </RuleBox>

              <RuleBox title="Rozkład na składowe">
                <p>Znając moduł <Mi>{"| \\vec{v} |"}</Mi> i kąt <Mi>{"\\alpha"}</Mi> względem osi x, składowe wyznaczamy wzorami:</p>
                <div className="mt-3 grid sm:grid-cols-2 gap-3 text-center text-base">
                  <div className="bg-white rounded-lg px-4 py-3 border border-[#d4b8f0]">
                    <Mi>{"\\textcolor{#ea580c}{v_x} = |\\vec{v}|\\cos\\alpha"}</Mi>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-3 border border-[#d4b8f0]">
                    <Mi>{"\\textcolor{#2563eb}{v_y} = |\\vec{v}|\\sin\\alpha"}</Mi>
                  </div>
                </div>
                <p className="mt-3">I odwrotnie, ze składowych odtwarzamy moduł i kąt:</p>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-center text-base">
                  <div className="bg-white rounded-lg px-4 py-3 border border-[#d4b8f0]">
                    <Mi>{"|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}"}</Mi>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-3 border border-[#d4b8f0]">
                    <Mi>{"\\tan\\alpha = v_y / v_x"}</Mi>
                  </div>
                </div>
              </RuleBox>

              <div className="flex flex-col sm:flex-row gap-6 items-center mt-4 mb-5">
                <DiagramSkladowe />
                <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-3">
                  <p>
                    Na rysunku wektor <Mi>{"\\vec{v}"}</Mi> (fioletowy) jest rozłożony na dwie prostopadłe składowe.
                    Przerywane linie to rzuty, wyobraź sobie, że rzucasz cień wektora na każdą oś.
                  </p>
                  <p>
                    <span className="text-[#f97316] font-semibold"><Mi>{"v_x"}</Mi></span> to „ile metrów na prawo",
                    składowa pozioma.{" "}
                    <span className="text-[#3b82f6] font-semibold"><Mi>{"v_y"}</Mi></span> to „ile metrów w górę",
                    składowa pionowa.
                  </p>
                </div>
              </div>

              <RuleBox title="Układ odniesienia, kluczowa intuicja" color="blue">
                <p>
                  Wektor istnieje niezależnie od tego, jak obrócisz kartę papieru. Jeśli zmienisz
                  układ współrzędnych, np. obrócisz osie o 45°, to <strong>składowe</strong> wektora
                  się zmienią, ale <strong>sam wektor pozostaje taki sam</strong>: ten sam kierunek,
                  zwrot i moduł.
                </p>
                <p className="mt-2">
                  Dlatego w zadaniach z równią pochyłą opłaca się obrócić układ i wzdłuż jednej osi
                  ustawić samą równię, siła grawitacji zyska „ładniejsze" składowe i obliczenia się
                  uproszczą.
                </p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-6 mb-3">Przykłady liczbowe</h3>
              <div className="space-y-3">
                {[
                  { key: "0",  alpha: "0^\\circ",  vx: <><Mi>{"10\\cos 0^\\circ = 10\\ \\text{m/s}"}</Mi></>,  vy: <><Mi>{"10\\sin 0^\\circ = 0\\ \\text{m/s}"}</Mi></> },
                  { key: "90", alpha: "90^\\circ", vx: <><Mi>{"10\\cos 90^\\circ = 0\\ \\text{m/s}"}</Mi></>,  vy: <><Mi>{"10\\sin 90^\\circ = 10\\ \\text{m/s}"}</Mi></> },
                  { key: "37", alpha: "37^\\circ", vx: <>10 · 0,8 = 8 m/s</>,                                  vy: <>10 · 0,6 = 6 m/s</> },
                  { key: "53", alpha: "53^\\circ", vx: <>10 · 0,6 = 6 m/s</>,                                  vy: <>10 · 0,8 = 8 m/s</> },
                ].map(r => (
                  <div key={r.key} className="bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-semibold text-stone-800 min-w-[130px]"><Mi>{"v = 10\\ \\text{m/s},\\ \\alpha = " + r.alpha}</Mi></span>
                    <span className="text-stone-300">→</span>
                    <span className="text-[#f97316]"><Mi>{"v_x"}</Mi> = {r.vx}</span>
                    <span className="text-stone-200">|</span>
                    <span className="text-[#3b82f6]"><Mi>{"v_y"}</Mi> = {r.vy}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 3. Dodawanie wektorów ── */}
            <section>
              <SectionHead id="dodawanie" eyebrow="Rozdział 3" title="Dodawanie wektorów" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-5">
                Gdy na ciało działa kilka sił, np. ciężar i siła mięśni, to wypadkowa to
                geometryczna <strong className="text-stone-800">suma wektorów</strong>.
                Dodawać można dwoma równoważnymi sposobami.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-3">Reguła trójkąta</p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Drugi wektor przykładamy do końca pierwszego. Wypadkowa to odcinek od początku
                    pierwszego do końca drugiego.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <DiagramDodawanie />
                  </div>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-3">Metoda analityczna (składowe)</p>
                  <p className="text-sm text-stone-600 leading-relaxed mb-3">
                    Dodaj osobno składowe x i składowe y. Prosto i dokładnie.
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="bg-[#f2ecfb] rounded-lg px-4 py-2">
                      <Mi>{"(\\vec{a} + \\vec{b})_x = a_x + b_x"}</Mi>
                    </div>
                    <div className="bg-[#f2ecfb] rounded-lg px-4 py-2">
                      <Mi>{"(\\vec{a} + \\vec{b})_y = a_y + b_y"}</Mi>
                    </div>
                  </div>
                </div>
              </div>

              <RuleBox title="Właściwości dodawania wektorów">
                <p><strong>Przemienność:</strong> <Mi>{"\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a}"}</Mi></p>
                <p><strong>Łączność:</strong> <Mi>{"(\\vec{a} + \\vec{b}) + \\vec{c} = \\vec{a} + (\\vec{b} + \\vec{c})"}</Mi></p>
                <p><strong>Element neutralny:</strong> <Mi>{"\\vec{a} + \\vec{0} = \\vec{a}"}</Mi> (wektor zerowy)</p>
                <p><strong>Wektor przeciwny:</strong> <Mi>{"\\vec{a} + (-\\vec{a}) = \\vec{0}"}</Mi></p>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-5 mb-3">Przykłady</h3>
              <div className="space-y-3">
                {[
                  { a: "[2, 3]",  b: "[1, 4]",   c: "[3, 7]" },
                  { a: "[5, 0]",  b: "[0, −3]",  c: "[5, −3]" },
                  { a: "[−2, 4]", b: "[3, −1]",  c: "[1, 3]" },
                ].map(r => (
                  <div key={r.a} className="bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-semibold text-[#3b82f6]"><Mi>{"\\vec{a}"}</Mi> = {r.a}</span>
                    <span className="text-stone-400">+</span>
                    <span className="font-semibold text-[#f97316]"><Mi>{"\\vec{b}"}</Mi> = {r.b}</span>
                    <span className="text-stone-300 px-1">→</span>
                    <span className="font-semibold text-[#6d3a8e]">= {r.c}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 4. Iloczyn skalarny ── */}
            <section>
              <SectionHead id="skalarny" eyebrow="Rozdział 4" title="Iloczyn skalarny" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Iloczyn skalarny to operacja, która z <strong className="text-stone-800">dwóch wektorów</strong> produkuje{" "}
                <strong className="text-stone-800">jedną liczbę</strong> (skalar). Ma głębokie znaczenie
                geometryczne i pojawia się w definicji pracy, mocy czy energii potencjalnej.
              </p>

              <RuleBox title="Definicja, dwa równoważne sposoby">
                <p className="font-semibold mb-2">Geometrycznie (przez kąt między wektorami):</p>
                <div className="text-center text-base mb-3 bg-white rounded-lg px-4 py-2 border border-[#d4b8f0]">
                  <Mb>{"\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos\\theta"}</Mb>
                </div>
                <p className="font-semibold mb-2">Algebraicznie (przez składowe):</p>
                <div className="text-center text-base bg-white rounded-lg px-4 py-2 border border-[#d4b8f0]">
                  <Mb>{"\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y \\quad (\\text{w 3D: } + a_z b_z)"}</Mb>
                </div>
              </RuleBox>

              <div className="flex flex-col sm:flex-row gap-6 items-center mt-4 mb-5">
                <DiagramSkalarny />
                <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-stone-800">Geometryczna intuicja:</strong>{" "}
                    iloczyn skalarny mierzy, jak bardzo dwa wektory „idą w tym samym kierunku".
                    To iloczyn modułu <Mi>{"\\vec{a}"}</Mi> i <strong>rzutu</strong> <Mi>{"\\vec{b}"}</Mi> na kierunek <Mi>{"\\vec{a}"}</Mi>.
                  </p>
                  <p>
                    Przerywana linia na rysunku to rzut wektora <Mi>{"\\vec{b}"}</Mi> na <Mi>{"\\vec{a}"}</Mi>,
                    jego długość to <Mi>{"|\\vec{b}| \\cos\\theta"}</Mi>.
                  </p>
                </div>
              </div>

              <RuleBox title="Ważne przypadki szczególne">
                <p>
                  <Mi>{"\\theta = 0^\\circ"}</Mi> (wektory równoległe):{" "}
                  <Mi>{"\\cos 0^\\circ = 1"}</Mi> →{" "}
                  <Mi>{"\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|"}</Mi> (maksimum)
                </p>
                <p>
                  <Mi>{"\\theta = 90^\\circ"}</Mi> (wektory prostopadłe):{" "}
                  <Mi>{"\\cos 90^\\circ = 0"}</Mi> →{" "}
                  <Mi>{"\\vec{a} \\cdot \\vec{b} = 0"}</Mi>
                </p>
                <p>
                  <Mi>{"\\theta = 180^\\circ"}</Mi> (wektory przeciwne):{" "}
                  <Mi>{"\\cos 180^\\circ = -1"}</Mi> →{" "}
                  <Mi>{"\\vec{a} \\cdot \\vec{b} = -|\\vec{a}||\\vec{b}|"}</Mi>
                </p>
              </RuleBox>

              <RuleBox title="Właściwości">
                <p><strong>Przemienność:</strong> <Mi>{"\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}"}</Mi></p>
                <p><strong>Rozdzielność:</strong> <Mi>{"\\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}"}</Mi></p>
                <p><strong>Moduł:</strong> <Mi>{"\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2"}</Mi></p>
              </RuleBox>

              <div className="mt-5 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-3">Zastosowanie w fizyce: praca</p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Praca to <strong>iloczyn skalarny</strong> siły i przesunięcia. Dlatego praca jest
                  zerem, gdy siła jest prostopadła do ruchu, np. siła normalna przy ruchu poziomym
                  czy siła odśrodkowa przy ruchu po okręgu.
                </p>
                <div className="mt-3 text-base text-center bg-[#f2ecfb] rounded-lg px-4 py-3 border border-[#d4b8f0]">
                  <Mb>{"W = \\vec{F} \\cdot \\vec{d} = |\\vec{F}| \\cdot |\\vec{d}| \\cdot \\cos\\alpha"}</Mb>
                </div>
              </div>
            </section>

            {/* ── 5. Iloczyn wektorowy ── */}
            <section>
              <SectionHead id="wektorowy" eyebrow="Rozdział 5" title="Iloczyn wektorowy" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Iloczyn wektorowy to operacja, która z dwóch wektorów w 3D produkuje
                <strong className="text-stone-800"> kolejny wektor</strong>, prostopadły do obu wyjściowych.
                Pojawia się wszędzie tam, gdzie mamy do czynienia z obrotem: moment siły, moment pędu,
                siła Lorentza.
              </p>

              <RuleBox title="Definicja geometryczna">
                <p><strong>Moduł</strong> iloczynu wektorowego:</p>
                <div className="text-center text-base my-2 bg-white rounded-lg px-4 py-2 border border-[#d4b8f0]">
                  <Mb>{"| \\vec{a} \\times \\vec{b} | = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\sin\\theta"}</Mb>
                </div>
                <p className="mt-2">
                  Jest to pole równoległoboku rozpiętego przez <Mi>{"\\vec{a}"}</Mi> i <Mi>{"\\vec{b}"}</Mi>.
                </p>
              </RuleBox>

              <RuleBox title="Kierunek, reguła prawej ręki" color="amber">
                <p>
                  Ustaw prawą dłoń tak, żeby palce zginały się od <Mi>{"\\vec{a}"}</Mi> do <Mi>{"\\vec{b}"}</Mi>{" "}
                  (przez mniejszy kąt <Mi>{"\\theta"}</Mi>). Wyprostowany <strong>kciuk</strong> wskazuje kierunek{" "}
                  <Mi>{"\\vec{a} \\times \\vec{b}"}</Mi>.
                </p>
                <p className="mt-2">
                  Stąd wynika, że iloczyn wektorowy jest <strong>antyprzemienny</strong>:{" "}
                  <Mi>{"\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})"}</Mi>. Kolejność ma znaczenie!
                </p>
              </RuleBox>

              <RuleBox title="Wzór na składowe (przez wyznacznik 3×3)">
                <p className="mb-3">
                  Dla <Mi>{"\\vec{a} = [a_x,\\ a_y,\\ a_z]"}</Mi> i <Mi>{"\\vec{b} = [b_x,\\ b_y,\\ b_z]"}</Mi>:
                </p>
                <div className="space-y-1 bg-white rounded-lg px-5 py-3 border border-[#d4b8f0]">
                  <Mb>{"(\\vec{a} \\times \\vec{b})_x = a_y b_z - a_z b_y"}</Mb>
                  <Mb>{"(\\vec{a} \\times \\vec{b})_y = a_z b_x - a_x b_z"}</Mb>
                  <Mb>{"(\\vec{a} \\times \\vec{b})_z = a_x b_y - a_y b_x"}</Mb>
                </div>
                <p className="mt-3 text-sm">
                  Wskazówka do zapamiętania: każda składowa to „krzyżowe" mnożenie dwóch pozostałych
                  osi, na zmianę +/−.
                </p>
              </RuleBox>

              <RuleBox title="Ważne przypadki i właściwości" color="blue">
                <p>
                  <Mi>{"\\theta = 0^\\circ"}</Mi> lub <Mi>{"180^\\circ"}</Mi> (wektory równoległe):{" "}
                  <Mi>{"\\sin 0^\\circ = 0"}</Mi> → <Mi>{"\\vec{a} \\times \\vec{b} = \\vec{0}"}</Mi>
                </p>
                <p>
                  <Mi>{"\\theta = 90^\\circ"}</Mi> (wektory prostopadłe):{" "}
                  <Mi>{"\\sin 90^\\circ = 1"}</Mi> → <Mi>{"|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|"}</Mi> (maksimum)
                </p>
                <p className="mt-2 font-semibold">Bazy kartezjańskiej:</p>
                <div className="text-sm">
                  <Mb>{"\\hat{i} \\times \\hat{j} = \\hat{k}, \\quad \\hat{j} \\times \\hat{k} = \\hat{i}, \\quad \\hat{k} \\times \\hat{i} = \\hat{j}"}</Mb>
                </div>
              </RuleBox>

              <div className="mt-5 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-wide mb-3">Zastosowanie w fizyce: moment siły</p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Moment siły (zwany też torsją) to <strong>iloczyn wektorowy</strong> ramienia i siły.
                  Mówi, jak efektywnie siła wywołuje obrót, zależy od długości ramienia, wartości siły
                  i kąta między nimi.
                </p>
                <div className="mt-3 text-base text-center bg-[#f2ecfb] rounded-lg px-4 py-3 border border-[#d4b8f0]">
                  <Mb>{"\\vec{M} = \\vec{r} \\times \\vec{F}, \\quad |\\vec{M}| = |\\vec{r}| \\cdot |\\vec{F}| \\cdot \\sin\\theta"}</Mb>
                </div>
                <p className="mt-2 text-xs text-stone-500 text-center">
                  Moment jest największy, gdy siła działa prostopadle do ramienia (<Mi>{"\\theta = 90^\\circ"}</Mi>).
                </p>
              </div>
            </section>

            {/* ── 6. Fizyka w akcji ── */}
            <section>
              <SectionHead id="fizyka" eyebrow="Rozdział 6" title="Fizyka w akcji, przykłady krok po kroku" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-2">
                Trzy realne zadania fizyczne. Rozwiązuj krok po kroku, klikaj „Następny krok"
                i proś o wskazówkę, kiedy chcesz.
              </p>

              <WorkedExample
                title="Przykład 1: Rozkład ciężaru na równi pochyłej (składowe)"
                steps={exampleRownia}
              />
              <WorkedExample
                title="Przykład 2: Praca siły pod kątem (iloczyn skalarny)"
                steps={examplePraca}
              />
              <WorkedExample
                title="Przykład 3: Moment siły klucza (iloczyn wektorowy)"
                steps={exampleMoment}
              />
            </section>

            {/* ── 7. Zadania ── */}
            <section>
              <SectionHead id="zadania" eyebrow="Rozdział 7" title="Zadania do samodzielnego rozwiązania" />
              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-5">
                Rozwiąż zadanie na brudnopisie, a potem kliknij „Pokaż odpowiedź" i sprawdź wynik.
                Zadania pokrywają wszystkie tematy z tego materiału.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {exercises.map(ex => (
                  <ExerciseCard key={ex.number} {...ex} />
                ))}
              </div>
            </section>

            {/* ── CTA ── */}
            <div className="border-t border-stone-200 pt-12 text-center">
              <p className="text-stone-500 text-lg mb-2">Masz pytania albo coś jest niejasne?</p>
              <p className="text-stone-400 text-sm mb-8">
                Umów się na lekcję, wszystko omówimy razem, bez pośpiechu.
              </p>
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 bg-[#ffd166] hover:bg-[#f0b429] text-[#220b2d] font-bold px-8 py-4 rounded-2xl text-base transition-colors"
              >
                Umów lekcję
              </Link>
            </div>

          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-5 mt-10 bg-white">
        <div className="max-w-5xl mx-auto text-center text-stone-400 text-sm">
          © 2025 Korepetycje Paulina · Warszawa
        </div>
      </footer>

    </div>
  );
}
