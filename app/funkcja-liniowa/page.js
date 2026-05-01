"use client";
import { useState } from "react";
import Link from "next/link";
import { InlineMath, BlockMath } from "react-katex";
import { TaskCard, FormulaBox } from "../matura/matematyka-rozszerzona/_components";
import {
  ArrowLeft, ChevronRight, CheckCircle, RotateCcw,
  Eye, EyeOff, BookOpen, Lightbulb,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const Mi = ({ children }) => <InlineMath math={children} />;
const Mb = ({ children }) => <BlockMath math={children} />;

// ─── RuleBox ────────────────────────────────────────────────
const RuleBox = ({ title, color = "purple", children }) => {
  const border = {
    purple: "border-[#6d3a8e] bg-[#f2ecfb]",
    amber:  "border-[#f97316] bg-[#fff3e6]",
    blue:   "border-[#3b82f6] bg-[#eff6ff]",
    green:  "border-[#10b981] bg-[#f0fdf4]",
  }[color];
  const titleColor = {
    purple: "text-[#52297a]",
    amber:  "text-[#9a3412]",
    blue:   "text-[#1d4ed8]",
    green:  "text-[#065f46]",
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

// ─── SectionHead ────────────────────────────────────────────
const SectionHead = ({ id, eyebrow, title }) => (
  <div id={id} className="pt-12 pb-3 scroll-mt-20">
    <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-1">{eyebrow}</p>
    <h2 className="font-display text-2xl md:text-3xl text-stone-800">{title}</h2>
  </div>
);

// ─── WorkedExample ──────────────────────────────────────────
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
              {step.diagram && (
                <div className="mt-3">
                  {step.diagram}
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
        <button
          onClick={reset}
          className="text-stone-400 hover:text-stone-600 transition-colors p-2"
          title="Zacznij od nowa"
        >
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
          <span
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i <= revealed ? "bg-[#6d3a8e]" : "bg-stone-200"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// ─── ExerciseCard ───────────────────────────────────────────
const ExerciseCard = ({ number, question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-[#f2ecfb] text-[#6d3a8e] text-sm font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <div className="text-stone-700 text-base leading-snug">{question}</div>
      </div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors"
      >
        {open ? <EyeOff size={11} /> : <Eye size={11} />}
        {open ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
      </button>
      {open && (
        <div className="mt-3 text-sm text-[#52297a] bg-[#f2ecfb] border border-[#d4b8f0] rounded-xl px-4 py-3 font-semibold">
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            <div className="min-w-0 w-full">{answer}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MultiExercise: karta z podpunktami a), b), c)… ─────────
const MultiExercise = ({ title, parts }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(prev => (prev === i ? null : i));
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      {title && (
        <p className="text-stone-700 text-base font-semibold mb-4">{title}</p>
      )}
      <div className="space-y-2">
        {parts.map((part, i) => (
          <div key={i} className="border border-stone-100 rounded-xl overflow-hidden">
            <div className="flex items-start gap-3 px-4 pt-3 pb-2">
              <span className="w-6 h-6 rounded-full bg-[#f2ecfb] text-[#6d3a8e] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {String.fromCharCode(97 + i)}
              </span>
              <div className="text-stone-700 text-sm leading-snug flex-1">{part.question}</div>
            </div>
            <div className="px-4 pb-3">
              <button
                onClick={() => toggle(i)}
                className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-300 rounded-lg px-3 py-1.5 hover:bg-stone-50 transition-colors"
              >
                {openIdx === i ? <EyeOff size={11} /> : <Eye size={11} />}
                {openIdx === i ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
              </button>
              {openIdx === i && (
                <div className="mt-2 text-sm text-[#52297a] bg-[#f2ecfb] border border-[#d4b8f0] rounded-xl px-4 py-2 font-semibold">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={13} className="mt-0.5 flex-shrink-0" />
                    <div>{part.answer}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SVG: generyczny diagram wykresu liniowego ──────────────
// props: id (uniq string), a, b (współczynniki), pts (tablica punktów),
//        xRange, yRange, className, squareGrid, svgSize (np. 280), vizScale (większe podpisy i kreski)
const LineDiagram = ({
  id,
  a,
  b,
  pts = [],
  xRange = [-3, 4],
  yRange = [-3, 4],
  className,
  showQuadrants = false,
  squareGrid = false,
  svgSize = 200,
  vizScale = 1,
}) => {
  const kBase = svgSize / 200;
  const W = 200 * kBase;
  const H = 200 * kBase;
  const PL = 30 * kBase;
  const PR = 22 * kBase;
  const PT = 20 * kBase;
  const PB = 22 * kBase;
  const vs = vizScale;
  const fz = (n) => n * kBase * vs;
  const sw = (w) => Math.max(0.65, w * kBase * vs);
  const DW = W - PL - PR;
  const DH = H - PT - PB;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const xSpan = xMax - xMin;
  const ySpan = yMax - yMin;
  let sx = DW / xSpan;
  let sy = DH / ySpan;
  let padX = 0;
  let padY = 0;
  if (squareGrid) {
    const s = Math.min(DW / xSpan, DH / ySpan);
    sx = sy = s;
    padX = (DW - xSpan * s) / 2;
    padY = (DH - ySpan * s) / 2;
  }
  const tx = (x) => PL + padX + (x - xMin) * sx;
  const ty = (y) => PT + padY + (yMax - y) * sy;
  const ox = tx(0);
  const oy = ty(0);
  const xGrid = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) xGrid.push(x);
  const yGrid = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) yGrid.push(y);
  /** Prostokąt pola kratek (jak w zeszycie), nie na cały margines SVG */
  const plotLeft = tx(xMin);
  const plotRight = tx(xMax);
  const plotTop = ty(yMax);
  const plotBottom = ty(yMin);
  const mid = `arr-${id}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className ?? "w-full max-w-[230px] mx-auto block"}>
      <defs>
        <marker
          id={mid}
          markerWidth={7 * kBase * vs}
          markerHeight={7 * kBase * vs}
          refX={5.5 * kBase * vs}
          refY={3.5 * kBase * vs}
          orient="auto"
        >
          <path
            d={`M0,${0.5 * kBase * vs} L0,${6.5 * kBase * vs} L${6 * kBase * vs},${3.5 * kBase * vs} z`}
            fill="#94a3b8"
          />
        </marker>
      </defs>
      {/* Siatka: tylko wewnątrz prostokąta zakresu (xMin,xMax)×(yMin,yMax) */}
      {xGrid.filter(x => x !== 0).map(x => (
        <line key={`gx${x}`} x1={tx(x)} y1={plotTop} x2={tx(x)} y2={plotBottom} stroke="#e2e8f0" strokeWidth={sw(0.8)} />
      ))}
      {yGrid.filter(y => y !== 0).map(y => (
        <line key={`gy${y}`} x1={plotLeft} y1={ty(y)} x2={plotRight} y2={ty(y)} stroke="#e2e8f0" strokeWidth={sw(0.8)} />
      ))}
      <rect
        x={plotLeft}
        y={plotTop}
        width={plotRight - plotLeft}
        height={plotBottom - plotTop}
        fill="none"
        stroke="#d6d3d1"
        strokeWidth={sw(1)}
      />
      {showQuadrants && xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0 && (
        <g
          opacity="0.42"
          fill="#6d3a8e"
          fontFamily="Georgia, serif"
          fontSize={fz(17)}
          fontWeight="bold"
          textAnchor="middle"
        >
          <text x={tx(xMax / 2)} y={ty(yMax / 2)} dominantBaseline="middle">I</text>
          <text x={tx(xMin / 2)} y={ty(yMax / 2)} dominantBaseline="middle">II</text>
          <text x={tx(xMin / 2)} y={ty(yMin / 2)} dominantBaseline="middle">III</text>
          <text x={tx(xMax / 2)} y={ty(yMin / 2)} dominantBaseline="middle">IV</text>
        </g>
      )}
      {/* Znaczniki i etykiety osi */}
      {xGrid.filter(x => x !== 0).map(x => (
        <g key={`xt${x}`}>
          <line x1={tx(x)} y1={oy - fz(3)} x2={tx(x)} y2={oy + fz(3)} stroke="#94a3b8" strokeWidth={sw(1)} />
          <text x={tx(x)} y={oy + fz(13)} textAnchor="middle" fill="#94a3b8" fontSize={fz(9)}>{x}</text>
        </g>
      ))}
      {yGrid.filter(y => y !== 0).map(y => (
        <g key={`yt${y}`}>
          <line x1={ox - fz(3)} y1={ty(y)} x2={ox + fz(3)} y2={ty(y)} stroke="#94a3b8" strokeWidth={sw(1)} />
          <text x={ox - fz(7)} y={ty(y) + fz(3.5)} textAnchor="end" fill="#94a3b8" fontSize={fz(9)}>{y}</text>
        </g>
      ))}
      <text x={ox - fz(7)} y={oy + fz(13)} textAnchor="end" fill="#94a3b8" fontSize={fz(9)}>0</text>
      {/* Osie ze strzałkami */}
      <line
        x1={PL - 6 * kBase * vs}
        y1={oy}
        x2={W - PR + 9 * kBase * vs}
        y2={oy}
        stroke="#94a3b8"
        strokeWidth={sw(1.5)}
        markerEnd={`url(#${mid})`}
      />
      <line
        x1={ox}
        y1={H - PB + 6 * kBase * vs}
        x2={ox}
        y2={PT - 9 * kBase * vs}
        stroke="#94a3b8"
        strokeWidth={sw(1.5)}
        markerEnd={`url(#${mid})`}
      />
      <text x={W - PR + fz(13)} y={oy + fz(4)} fill="#94a3b8" fontSize={fz(10)}>x</text>
      <text x={ox - fz(4)} y={PT - fz(12)} fill="#94a3b8" fontSize={fz(10)}>y</text>
      {/* Prosta f(x) = ax + b */}
      <line
        x1={tx(xMin - 0.4)}
        y1={ty(a * (xMin - 0.4) + b)}
        x2={tx(xMax + 0.4)}
        y2={ty(a * (xMax + 0.4) + b)}
        stroke="#6d3a8e"
        strokeWidth={sw(2.5)}
      />
      {/* Punkty */}
      {pts.map((pt, i) => (
        <g key={i}>
          <circle cx={tx(pt.x)} cy={ty(pt.y)} r={fz(4.5)} fill={pt.color ?? "#6d3a8e"} />
          {pt.label && (
            <text
              x={tx(pt.x) + (pt.dx ?? 7) * kBase * vs}
              y={ty(pt.y) + (pt.dy ?? 4) * kBase * vs}
              fill={pt.color ?? "#6d3a8e"}
              fontSize={fz(9.5)}
              fontWeight="bold"
            >
              {pt.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

// ─── SVG: monotoniczność ─────────────────────────────────────
const DiagramMonotonicznosc = () => (
  <svg viewBox="0 0 500 178" className="w-full max-w-[560px] mx-auto block">
    {/* Lewa ramka: rosnąca */}
    <rect x="5" y="5" width="155" height="168" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    <line x1="18" y1="108" x2="148" y2="108" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="82" y1="22" x2="82" y2="130" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="18" y1="138" x2="148" y2="28" stroke="#10b981" strokeWidth="3" />
    <text x="82" y="155" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">rosnąca</text>
    <text x="82" y="166" textAnchor="middle" fill="#065f46" fontSize="10">(a &gt; 0)</text>
    {/* Środkowa ramka: malejąca */}
    <rect x="172" y="5" width="155" height="168" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
    <line x1="185" y1="108" x2="315" y2="108" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="249" y1="22" x2="249" y2="130" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="185" y1="28" x2="315" y2="138" stroke="#ef4444" strokeWidth="3" />
    <text x="249" y="155" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="bold">malejąca</text>
    <text x="249" y="166" textAnchor="middle" fill="#b91c1c" fontSize="10">(a &lt; 0)</text>
    {/* Prawa ramka: stała */}
    <rect x="339" y="5" width="155" height="168" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
    <line x1="352" y1="108" x2="482" y2="108" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="416" y1="22" x2="416" y2="130" stroke="#cbd5e1" strokeWidth="1.5" />
    <line x1="352" y1="75" x2="482" y2="75" stroke="#94a3b8" strokeWidth="3" />
    <text x="416" y="155" textAnchor="middle" fill="#57534e" fontSize="11" fontWeight="bold">stała</text>
    <text x="416" y="166" textAnchor="middle" fill="#57534e" fontSize="10">(a = 0)</text>
  </svg>
);

// ─── SVG: wielokąt (figury geometryczne) ────────────────────
const PolygonDiagram = ({ vertices, xRange = [0, 6], yRange = [0, 5], className = "" }) => {
  const W = 200, H = 180;
  const PL = 30, PR = 18, PT = 16, PB = 22;
  const DW = W - PL - PR, DH = H - PT - PB;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const sx = DW / (xMax - xMin), sy = DH / (yMax - yMin);
  const tx = (x) => PL + (x - xMin) * sx;
  const ty = (y) => PT + (yMax - y) * sy;
  const ox = tx(0), oy = ty(0);
  const inViewX = ox >= PL - 1 && ox <= W - PR + 1;
  const inViewY = oy >= PT - 1 && oy <= H - PB + 1;
  const gridXs = [], gridYs = [];
  for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) gridXs.push(gx);
  for (let gy = Math.ceil(yMin); gy <= Math.floor(yMax); gy++) gridYs.push(gy);
  const polyPoints = vertices.map(v => `${tx(v.x)},${ty(v.y)}`).join(" ");
  const xLabelY = inViewY ? oy + 11 : H - PB + 13;
  const yLabelX = inViewX ? ox - 5 : PL - 5;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-full max-w-[220px] mx-auto block ${className}`}>
      {gridXs.map(x => <line key={`gx${x}`} x1={tx(x)} y1={PT} x2={tx(x)} y2={H - PB} stroke="#e2e8f0" strokeWidth="0.8" />)}
      {gridYs.map(y => <line key={`gy${y}`} x1={PL} y1={ty(y)} x2={W - PR} y2={ty(y)} stroke="#e2e8f0" strokeWidth="0.8" />)}
      {inViewY && <line x1={PL - 4} y1={oy} x2={W - PR + 4} y2={oy} stroke="#94a3b8" strokeWidth="1.2" />}
      {inViewX && <line x1={ox} y1={PT - 4} x2={ox} y2={H - PB + 4} stroke="#94a3b8" strokeWidth="1.2" />}
      {gridXs.filter(x => x !== 0).map(x => (
        <text key={`lx${x}`} x={tx(x)} y={xLabelY} textAnchor="middle" fill="#94a3b8" fontSize="8">{x}</text>
      ))}
      {gridYs.filter(y => y !== 0).map(y => (
        <text key={`ly${y}`} x={yLabelX} y={ty(y) + 3} textAnchor="end" fill="#94a3b8" fontSize="8">{y}</text>
      ))}
      {inViewX && inViewY && (
        <text x={ox - 4} y={oy + 11} textAnchor="end" fill="#94a3b8" fontSize="8">0</text>
      )}
      <polygon points={polyPoints} fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" fillOpacity="0.35" />
      {vertices.map((v, i) => (
        <g key={i}>
          <circle cx={tx(v.x)} cy={ty(v.y)} r="3" fill="#7c3aed" />
          {v.label && (
            <text
              x={tx(v.x) + (v.dx ?? 6)}
              y={ty(v.y) + (v.dy ?? 4)}
              fill="#4c1d95"
              fontSize="8.5"
              fontWeight="bold"
              textAnchor={v.anchor ?? "start"}
            >
              {v.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

// ─── SVG: dana + równoległa + prostopadła przez P ───────────
// Jednakowa skala osi (= kwadraty siatki). variant: slope | horizontal | vertical
const ThreeLinesDiagram = ({
  id = "tri",
  variant = "slope",
  a,
  b,
  xv,
  px,
  py,
  xRange = [-2, 5],
  yRange = [-1, 6],
  className,
}) => {
  const W = 220, H = 220;
  const PL = 32, PR = 24, PT = 20, PB = 26;
  const DW = W - PL - PR, DH = H - PT - PB;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const rx = Math.max(xMax - xMin, 1e-9);
  const ry = Math.max(yMax - yMin, 1e-9);
  const scale = Math.min(DW / rx, DH / ry);
  const plotW = scale * rx;
  const plotH = scale * ry;
  const leftPlot = PL + (DW - plotW) / 2;
  const topPlot = PT + (DH - plotH) / 2;

  const tx = (x) => leftPlot + (x - xMin) * scale;
  const ty = (y) => topPlot + (yMax - y) * scale;

  const ox = tx(0);
  const oy = ty(0);
  const cxP = tx(px), cyP = ty(py);

  const xGrid = []; const yGrid = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) xGrid.push(x);
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) yGrid.push(y);
  const mid = `arr-${id}`;
  const colOrig = "#6d3a8e";
  const colPar = "#f97316";
  const colPerp = "#3b82f6";

  const isSlope = variant === "slope";
  const isHorizontal = variant === "horizontal";
  const isVertical = variant === "vertical";

  const bParSlope = isSlope ? py - (a ?? 0) * px : undefined;

  const segXY = (coefA, coefB) => {
    const xLo = xMin - 0.6;
    const xHi = xMax + 0.6;
    return {
      x1: tx(xLo),
      y1: ty(coefA * xLo + coefB),
      x2: tx(xHi),
      y2: ty(coefA * xHi + coefB),
    };
  };

  /* Kąt prosty przy P: przecięcie pomarańczowej i niebieskiej */
  const rightAngleMark = () => {
    const r = 12;
    if (isSlope && a != null && Math.abs(a) > 1e-9) {
      const aP = -1 / a;
      let ux = scale, uy = -a * scale;
      let vx = scale, vy = -aP * scale;
      const nu = Math.hypot(ux, uy) || 1;
      ux /= nu; uy /= nu;
      const nv = Math.hypot(vx, vy) || 1;
      vx /= nv; vy /= nv;
      if (ux * vx + uy * vy < 0) { vx *= -1; vy *= -1; }
      const ax = cxP + r * ux;
      const ay = cyP + r * uy;
      const bx = cxP + r * vx;
      const by = cyP + r * vy;
      const zx = cxP + r * ux + r * vx;
      const zy = cyP + r * uy + r * vy;
      const d = `M ${ax} ${ay} L ${zx} ${zy} L ${bx} ${by}`;
      return <path d={d} fill="none" stroke="#1c1917" strokeWidth="1.35" strokeLinecap="square" strokeLinejoin="miter" />;
    }
    const d = `M ${cxP + r} ${cyP} L ${cxP + r} ${cyP - r} L ${cxP} ${cyP - r}`;
    return <path d={d} fill="none" stroke="#1c1917" strokeWidth="1.35" strokeLinecap="square" strokeLinejoin="miter" />;
  };

  /* Wyłącznie podpis „P” przesuwamy od symbolu kąta; kółko zostaje przy geometrycznym P */
  const pLabelOnlyOffset = () => {
    if (isSlope && a != null && Math.abs(a) > 1e-9) {
      const aP = -1 / a;
      let ux = scale, uy = -a * scale;
      let vx = scale, vy = -aP * scale;
      const nu = Math.hypot(ux, uy) || 1;
      ux /= nu; uy /= nu;
      const nv = Math.hypot(vx, vy) || 1;
      vx /= nv; vy /= nv;
      if (ux * vx + uy * vy < 0) { vx *= -1; vy *= -1; }
      let bx = -(ux + vx), by = -(uy + vy);
      const nb = Math.hypot(bx, by) || 1;
      bx /= nb; by /= nb;
      const d = 15;
      return { ldx: bx * d, ldy: by * d };
    }
    return { ldx: -14, ldy: -12 };
  };
  const pLo = pLabelOnlyOffset();

  const clipId = `clip-${id}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className ?? "w-full max-w-[260px] mx-auto block"}>
      <defs>
        <marker id={mid} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0.5 L0,6.5 L6,3.5 z" fill="#94a3b8" />
        </marker>
        <clipPath id={clipId}>
          <rect x={leftPlot} y={topPlot} width={plotW} height={plotH} />
        </clipPath>
      </defs>
      <rect x={leftPlot} y={topPlot} width={plotW} height={plotH} fill="none" stroke="#e7e5e4" strokeWidth="0.6" />
      <g clipPath={`url(#${clipId})`}>
        {xGrid.filter(x => x !== 0).map(x => (
          <line key={`gx${x}`} x1={tx(x)} y1={topPlot} x2={tx(x)} y2={topPlot + plotH} stroke="#e8e8e6" strokeWidth="0.9" />
        ))}
        {yGrid.filter(y => y !== 0).map(y => (
          <line key={`gy${y}`} x1={leftPlot} y1={ty(y)} x2={leftPlot + plotW} y2={ty(y)} stroke="#e8e8e6" strokeWidth="0.9" />
        ))}
      </g>
      <text x={ox - 8} y={oy + 14} textAnchor="end" fill="#94a3b8" fontSize="9">0</text>
      <line x1={PL - 6} y1={oy} x2={W - PR + 9} y2={oy} stroke="#94a3b8" strokeWidth="1.5" markerEnd={`url(#${mid})`} />
      <line x1={ox} y1={H - PB + 6} x2={ox} y2={PT - 9} stroke="#94a3b8" strokeWidth="1.5" markerEnd={`url(#${mid})`} />
      <text x={W - PR + 12} y={oy + 4} fill="#94a3b8" fontSize="10">x</text>
      <text x={ox - 4} y={PT - 12} fill="#94a3b8" fontSize="10">y</text>

      <g clipPath={`url(#${clipId})`}>
        {isHorizontal && b != null && (
          <>
            <line x1={leftPlot - 8} y1={ty(b)} x2={leftPlot + plotW + 8} y2={ty(b)} stroke={colOrig} strokeWidth="2.5" />
            <line x1={leftPlot - 8} y1={ty(py)} x2={leftPlot + plotW + 8} y2={ty(py)} stroke={colPar} strokeWidth="2.5" />
            <line x1={tx(px)} y1={topPlot - 4} x2={tx(px)} y2={topPlot + plotH + 4} stroke={colPerp} strokeWidth="2.5" />
          </>
        )}
        {isVertical && xv != null && (
          <>
            <line x1={tx(xv)} y1={topPlot - 4} x2={tx(xv)} y2={topPlot + plotH + 4} stroke={colOrig} strokeWidth="2.5" />
            <line x1={tx(px)} y1={topPlot - 4} x2={tx(px)} y2={topPlot + plotH + 4} stroke={colPar} strokeWidth="2.5" />
            <line x1={leftPlot - 8} y1={ty(py)} x2={leftPlot + plotW + 8} y2={ty(py)} stroke={colPerp} strokeWidth="2.5" />
          </>
        )}
        {isSlope && a != null && b != null && Math.abs(a) > 1e-9 && (
          <>
            {(() => {
              const s0 = segXY(a, b);
              const sPar = segXY(a, bParSlope);
              const aP = -1 / a;
              const bP = py - aP * px;
              const sP = segXY(aP, bP);
              return (
                <>
                  <line x1={s0.x1} y1={s0.y1} x2={s0.x2} y2={s0.y2} stroke={colOrig} strokeWidth="2.5" />
                  <line x1={sPar.x1} y1={sPar.y1} x2={sPar.x2} y2={sPar.y2} stroke={colPar} strokeWidth="2.5" />
                  <line x1={sP.x1} y1={sP.y1} x2={sP.x2} y2={sP.y2} stroke={colPerp} strokeWidth="2.5" />
                </>
              );
            })()}
          </>
        )}
      </g>

      {rightAngleMark()}

      <circle cx={cxP} cy={cyP} r="4.5" fill="#fff" stroke="#1c1917" strokeWidth="1.7" />
      <text x={cxP + pLo.ldx} y={cyP + pLo.ldy} fill="#1c1917" fontSize="10" fontWeight="bold">P</text>
    </svg>
  );
};

// ─── SVG: nazwy ćwiartek ────────────────────────────────────
const DiagramCwiartki = () => (
  <svg viewBox="0 0 260 176" className="w-full max-w-[320px] mx-auto block">
    <defs>
      <marker id="qc-arr-x" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0.5 L0,5.5 L5.5,3 z" fill="#94a3b8" /></marker>
      <marker id="qc-arr-y" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0.5 L0,5.5 L5.5,3 z" fill="#94a3b8" /></marker>
    </defs>
    <rect x="4" y="4" width="252" height="168" rx="10" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.2" />
    {/* Oś Oy: dodatnie y w górę (koniec linii przy mniejszym SVG-y), pojedyncza strzałka */}
    <line x1="129" y1="160" x2="129" y2="16" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#qc-arr-y)" />
    <line x1="16" y1="87" x2="244" y2="87" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#qc-arr-x)" />
    <text x="188" y="52" textAnchor="middle" fill="#6d3a8e" fontSize="15" fontWeight="bold" fontFamily="Georgia, serif">I</text>
    <text x="70" y="52" textAnchor="middle" fill="#6d3a8e" fontSize="15" fontWeight="bold" fontFamily="Georgia, serif">II</text>
    <text x="70" y="130" textAnchor="middle" fill="#6d3a8e" fontSize="15" fontWeight="bold" fontFamily="Georgia, serif">III</text>
    <text x="188" y="130" textAnchor="middle" fill="#6d3a8e" fontSize="15" fontWeight="bold" fontFamily="Georgia, serif">IV</text>
    <text x="236" y="102" fill="#78716c" fontSize="11">x</text>
    <text x="124" y="28" fill="#78716c" fontSize="11">y</text>
    <text x="125" y="99" textAnchor="middle" fill="#a8a29e" fontSize="9">0</text>
  </svg>
);

const MATURA_SECTION_ID = "zadania-maturalne";

const tocSchemes = [
  { id: "wykres", label: "Rysunek wykresu" },
  { id: "zero", label: "Miejsce zerowe" },
  { id: "osie", label: "Przecięcia z osiami" },
  { id: "monotonicznosc", label: "Monotoniczność" },
  { id: "punkt", label: "Punkt na prostej" },
  { id: "wspolliniowosc", label: "Współliniowość" },
  { id: "ogolne", label: "Równanie ogólne prostej" },
  { id: "poziome-pionowe", label: "Proste poziome i pionowe" },
  { id: "wierzcholki-figur", label: "Wierzchołki i pola figur" },
  { id: "rownol-prostop", label: "Równoległość i prostopadłość" },
  { id: "rozne-inne", label: "Ćwiartki układu współrzędnych" },
];

/** Zadania w stylu arkusza maturalnego, uzupełniane na stronie (jak TaskCard na PR). */
const maturaStyleTasks = [
  {
    id: "fl-m-graf-rownolegla-prostopadla-1",
    number: "1",
    points: "0–2",
    instruction: (
      <span>
        Znajdź te liczby <Mi>{"m"}</Mi>, dla których proste o równaniach{" "}
        <Mi>{"y = -3x + 7"}</Mi> oraz <Mi>{"y = (4m - 5)x - 7"}</Mi> są
        <span className="block mt-3 font-normal">
          a) równoległe,
        </span>
        <span className="block font-normal">b) prostopadłe.</span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"m = \\dfrac{1}{2}"}</Mi>
        </p>
        <p>
          b) <Mi>{"m = \\dfrac{4}{3}"}</Mi>
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dla prostych <Mi>{"y = a_1 x + b_1"}</Mi> oraz <Mi>{"y = a_2 x + b_2"}</Mi> ze współczynnikami kierunkowymi{" "}
          <Mi>{"a_1"}</Mi> i <Mi>{"a_2"}</Mi>:
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>równoległość:</strong> <Mi>{"a_1 = a_2"}</Mi> (przy różnych wyrazach wolnych dostajesz dwie różne proste);
          </li>
          <li>
            <strong>prostopadłość:</strong> <Mi>{"a_1 \\cdot a_2 = -1"}</Mi> (gdy żadna prosta nie jest pionowa).
          </li>
        </ul>
        <p className="text-stone-600 text-sm">
          Odczytaj <Mi>{"a_1"}</Mi> i <Mi>{"a_2"}</Mi> z równań, podstaw do warunku i rozwiąż proste równanie liniowe względem{" "}
          <Mi>{"m"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p>
          Współczynniki kierunkowe: <Mi>{"a_1 = -3"}</Mi>, <Mi>{"a_2 = 4m - 5"}</Mi>. Wyrazy wolne to{" "}
          <Mi>{"7"}</Mi> oraz <Mi>{"-7"}</Mi>, więc przy równych nachyleniach proste się nie pokrywają.
        </p>

        <p className="font-semibold text-stone-800">a) Warunek równoległości</p>
        <Mb>{"a_1 = a_2 \\quad \\Rightarrow \\quad -3 = 4m - 5"}</Mb>
        <Mb>{"4m = 2 \\quad \\Rightarrow \\quad m = \\dfrac{1}{2}"}</Mb>

        <p className="font-semibold text-stone-800">b) Warunek prostopadłości</p>
        <FormulaBox>
          <Mb>{"a_1 \\cdot a_2 = -1"}</Mb>
        </FormulaBox>
        <Mb>{"(-3)(4m - 5) = -1 \\quad \\Rightarrow \\quad 4m - 5 = \\dfrac{1}{3}"}</Mb>
        <Mb>{"4m = \\dfrac{16}{3} \\quad \\Rightarrow \\quad m = \\dfrac{4}{3}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"m = \\dfrac{1}{2}"}</Mi>; b) <Mi>{"m = \\dfrac{4}{3}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "fl-m-cwiartki-f-liniowa-2",
    number: "2",
    points: "0–4",
    instruction: (
      <div className="space-y-4">
        <p className="font-semibold">
          Przez które ćwiartki płaszczyzny z układem współrzędnych przechodzi wykres funkcji{" "}
          <Mi>{"f(x)=ax+b"}</Mi>, jeżeli:
        </p>
        <div className="rounded-xl border border-stone-200 bg-[#fafaf9] p-4 max-w-[340px] mx-auto shadow-sm">
          <DiagramCwiartki />
          <p className="text-center text-xs text-stone-500 mt-2 font-normal">
            Ćwiartki oznaczone jak w ćwiczeniach, możesz nanieść szkic prostej na kartce obok.
          </p>
        </div>
        <ul className="list-none space-y-2 pl-0 m-0 font-normal">
          <li>
            a) <Mi>{"a>0"}</Mi> i <Mi>{"b=0"}</Mi>
          </li>
          <li>
            b) <Mi>{"a=0"}</Mi> i <Mi>{"b>0"}</Mi>
          </li>
          <li>
            c) <Mi>{"a>0"}</Mi> i <Mi>{"b<0"}</Mi>
          </li>
          <li>
            d) <Mi>{"a<0"}</Mi> i <Mi>{"b>0"}</Mi>
          </li>
        </ul>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-2 text-sm">
        <p>
          a) przez <strong>I</strong> i <strong>III</strong> (prosta przechodzi przez początek układu),
        </p>
        <p>
          b) przez <strong>I</strong> i <strong>II</strong>,
        </p>
        <p>
          c) przez <strong>I</strong>, <strong>III</strong> i <strong>IV</strong>,
        </p>
        <p>
          d) przez <strong>I</strong>, <strong>II</strong> i <strong>IV</strong>.
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Zastanów się nad geometrycznym znaczeniem warunków:</p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <Mi>{"b=0"}</Mi>: wykres przechodzi przez początek; <Mi>{"a>0"}</Mi>: prosta „idzie w górę” od lewej do prawej.
          </li>
          <li>
            <Mi>{"a=0"}</Mi>: funkcja stała, pozioma prosta; <Mi>{"b>0"}</Mi>: nad osią <Mi>{"Ox"}</Mi>.
          </li>
          <li>
            <Mi>{"a>0"}</Mi> i <Mi>{"b<0"}</Mi>: przecina oś <Mi>{"Oy"}</Mi> pod zerem, „wspina się” w prawo.
          </li>
          <li>
            <Mi>{"a<0"}</Mi> i <Mi>{"b>0"}</Mi>: zaczyna wysoko przy małych <Mi>{"x"}</Mi>, „schodzi” w prawo.
          </li>
        </ul>
        <p className="text-stone-600 text-sm">
          Zaznacz na szkicu jeden typowy przykład (np. konkretne <Mi>{"a,b"}</Mi> spełniające warunek) i odczytaj ćwiartki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a) <Mi>{"a>0"}</Mi>, <Mi>{"b=0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek spełniający warunki: np. <Mi>{"a=1"}</Mi>, <Mi>{"b=0"}</Mi>, czyli <Mi>{"y=x"}</Mi>. Patrząc na
          wykres, prosta przechodzi przez ćwiartki <strong>I</strong> i <strong>III</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-a"
            a={1}
            b={0}
            showQuadrants
            xRange={[-3.5, 4]}
            yRange={[-3.5, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=x"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">b) <Mi>{"a=0"}</Mi>, <Mi>{"b>0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"b=2"}</Mi> (<Mi>{"a=0"}</Mi>), czyli <Mi>{"y=2"}</Mi>. Z rysunku widać ćwiartki{" "}
          <strong>I</strong> i <strong>II</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-b"
            a={0}
            b={2}
            showQuadrants
            xRange={[-5, 5]}
            yRange={[-2, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=2"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">c) <Mi>{"a>0"}</Mi>, <Mi>{"b<0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"a=1"}</Mi>, <Mi>{"b=-2"}</Mi>, czyli <Mi>{"y=x-2"}</Mi>. Patrząc na wykres:
          ćwiartki <strong>I</strong>, <strong>III</strong> i <strong>IV</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-c"
            a={1}
            b={-2}
            showQuadrants
            xRange={[-4, 5]}
            yRange={[-4, 4]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=x-2"}</Mi>
          </p>
        </div>

        <p className="font-semibold text-stone-800">d) <Mi>{"a<0"}</Mi>, <Mi>{"b>0"}</Mi></p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Pomocniczy rysunek: np. <Mi>{"a=-1"}</Mi>, <Mi>{"b=2"}</Mi>, czyli <Mi>{"y=-x+2"}</Mi>. Z rysunku:
          ćwiartki <strong>I</strong>, <strong>II</strong> i <strong>IV</strong>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[280px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m2-d"
            a={-1}
            b={2}
            showQuadrants
            xRange={[-5, 6]}
            yRange={[-4, 5]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-3 font-normal">
            <Mi>{"y=-x+2"}</Mi>
          </p>
        </div>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) I i III; b) I i II; c) I, III i IV; d) I, II i IV.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-152-rownolegla-przez-punkt",
    number: "3",
    points: "0–2",
    instruction: (
      <span>
        Punkt <Mi>{"S = \\left(\\dfrac{3}{4},\\, \\dfrac{1}{2}\\right)"}</Mi> należy do prostej{" "}
        <Mi>{"k"}</Mi>, która jest równoległa do prostej o równaniu <Mi>{"y = -2x - 7"}</Mi>. Znajdź równanie prostej{" "}
        <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = -2x + 2"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Prosta równoległa ma ten sam współczynnik kierunkowy. Wyraz wolny dobierz tak, żeby wykres przechodził przez{" "}
        <Mi>{"S"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Dana prosta ma <Mi>{"a = -2"}</Mi>, więc <Mi>{"k \\colon y = -2x + b"}</Mi>.
        </p>
        <p>
          Punkt <Mi>{"S"}</Mi> należy do <Mi>{"k"}</Mi>:
        </p>
        <Mb>{"\\dfrac{1}{2} = -2 \\cdot \\dfrac{3}{4} + b \\quad \\Rightarrow \\quad \\dfrac{1}{2} = -\\dfrac{3}{2} + b \\quad \\Rightarrow \\quad b = 2"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = -2x + 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-153-prostopadla-przez-punkt-oy",
    number: "4",
    points: "0–2",
    instruction: (
      <span>
        Prosta <Mi>{"k"}</Mi> przecina oś <Mi>{"OY"}</Mi> w punkcie <Mi>{"P = (0,\\, 7)"}</Mi> i jest prostopadła do prostej o
        równaniu <Mi>{"y = 0{,}4x + 0{,}6"}</Mi>. Znajdź równanie prostej <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = -\\dfrac{5}{2}x + 7"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Współczynniki kierunkowe prostych prostopadłych (niepionowych) spełniają <Mi>{"a_1 a_2 = -1"}</Mi>. Punkt{" "}
        <Mi>{"(0,7)"}</Mi> to przecięcie z <Mi>{"Oy"}</Mi>, czyli wyraz wolny w postaci <Mi>{"y = ax + b"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Dana prosta ma <Mi>{"a_2 = 0{,}4 = \\dfrac{2}{5}"}</Mi>. Prostopadłość:{" "}
          <Mi>{"a_1 \\cdot \\dfrac{2}{5} = -1"}</Mi>, stąd <Mi>{"a_1 = -\\dfrac{5}{2}"}</Mi>.
        </p>
        <p>
          Prosta <Mi>{"k"}</Mi> ma postać <Mi>{"y = -\\dfrac{5}{2}x + b"}</Mi> i przechodzi przez <Mi>{"(0,7)"}</Mi>, więc{" "}
          <Mi>{"b = 7"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = -\\dfrac{5}{2}x + 7"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-154-prosta-przez-dwa-punkty",
    number: "5",
    points: "0–2",
    instruction: (
      <span>
        Prosta <Mi>{"k"}</Mi> zawiera odcinek, którego końcami są punkty <Mi>{"A = (0,\\, -3)"}</Mi> oraz{" "}
        <Mi>{"B = (1,\\, 1)"}</Mi>. Znajdź równanie prostej <Mi>{"k"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"k \\colon y = 4x - 3"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Wyznacz współczynnik kierunkowy z punktów <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem podstaw jeden z punktów do{" "}
        <Mi>{"y = ax + b"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <Mb>{"a = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{1 - (-3)}{1 - 0} = 4"}</Mb>
        <p>
          Prosta <Mi>{"y = 4x + b"}</Mi>; punkt <Mi>{"A(0,-3)"}</Mi> daje <Mi>{"b = -3"}</Mi>.
        </p>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"y = 4x - 3"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-155-wspolliniowosc",
    number: "6",
    points: "0–2",
    instruction: (
      <span>
        Sprawdź, czy punkty <Mi>{"A = (0,\\, -4)"}</Mi>, <Mi>{"B = (2,\\, 0)"}</Mi>,{" "}
        <Mi>{"C = (202,\\, 400)"}</Mi> są współliniowe.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        Tak, punkty są współliniowe (lezą na jednej prostej).
      </p>
    ),
    hint: (
      <p className="text-sm">
        Najpierw wyznacz równanie prostej przechodzącej przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem sprawdź, czy współrzędne{" "}
        <Mi>{"C"}</Mi> spełniają to równanie (czy <Mi>{"C"}</Mi> leży na tej prostej).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-stone-800">Krok 1. Prosta przechodząca przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi></p>
        <p>
          Współczynnik kierunkowy:
        </p>
        <Mb>{"a = \\dfrac{0 - (-4)}{2 - 0} = 2"}</Mb>
        <p>
          Szukamy <Mi>{"y = 2x + b"}</Mi>. Punkt <Mi>{"A(0,\\,-4)"}</Mi>:
        </p>
        <Mb>{"-4 = 2 \\cdot 0 + b \\quad \\Rightarrow \\quad b = -4"}</Mb>
        <p>
          Prosta <Mi>{"AB"}</Mi>: <Mi>{"y = 2x - 4"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Czy <Mi>{"C"}</Mi> leży na prostej <Mi>{"AB"}</Mi>?</p>
        <p>
          Podstawiamy <Mi>{"x = 202"}</Mi> do <Mi>{"y = 2x - 4"}</Mi>:
        </p>
        <Mb>{"y = 2 \\cdot 202 - 4 = 404 - 4 = 400"}</Mb>
        <p>
          Rzędna punktu <Mi>{"C"}</Mi> też wynosi <Mi>{"400"}</Mi>, więc <Mi>{"C"}</Mi> należy do prostej <Mi>{"AB"}</Mi>. Punkty{" "}
          <Mi>{"A,B,C"}</Mi> są współliniowe.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź: tak, są współliniowe.</p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-podr-156-punkt-rzedna-wieksza",
    number: "7",
    points: "0–2",
    instruction: (
      <span>
        Znajdź współrzędne takiego punktu należącego do prostej o równaniu <Mi>{"y = 3x + 2"}</Mi>, którego rzędna jest o 10
        większa od odciętej.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"(4,\\, 14)"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        „Rzędna o 10 większa od odciętej” zapisz jako zależność między <Mi>{"x"}</Mi> i <Mi>{"y"}</Mi>, potem połącz z{" "}
        <Mi>{"y = 3x + 2"}</Mi>.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Warunek: <Mi>{"y = x + 10"}</Mi>. Jednocześnie <Mi>{"y = 3x + 2"}</Mi>:
        </p>
        <Mb>{"3x + 2 = x + 10 \\quad \\Rightarrow \\quad 2x = 8 \\quad \\Rightarrow \\quad x = 4"}</Mb>
        <Mb>{"y = 4 + 10 = 14"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"(4,\\, 14)"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-167-trzy-proste-jeden-punkt",
    number: "8",
    points: "0–2",
    instruction: (
      <span>
        Dane są funkcje <Mi>{"f(x) = 3x - 2"}</Mi>, <Mi>{"g(x) = -\\dfrac{1}{2}x + 5"}</Mi> oraz{" "}
        <Mi>{"h(x) = ax + 3"}</Mi>. Dla jakiej liczby <Mi>{"a"}</Mi> wykresy <Mi>{"f"}</Mi>, <Mi>{"g"}</Mi> i <Mi>{"h"}</Mi>{" "}
        przecinają się w jednym wspólnym punkcie (wszystkie trzy proste przechodzą przez ten sam punkt)?
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"a = \\dfrac{1}{2}"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Najpierw znajdź punkt przecięcia dwóch prostych o znanych wzorach (<Mi>{"f"}</Mi> i <Mi>{"g"}</Mi>). Potem dobierz{" "}
        <Mi>{"a"}</Mi> tak, żeby trzecia prosta (<Mi>{"h"}</Mi>) też przechodziła przez ten punkt.
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-stone-800">Wspólny punkt <Mi>{"f"}</Mi> i <Mi>{"g"}</Mi></p>
        <Mb>{"3x - 2 = -\\dfrac{1}{2}x + 5"}</Mb>
        <Mb>{"6x - 4 = -x + 10 \\quad \\Rightarrow \\quad 7x = 14 \\quad \\Rightarrow \\quad x = 2"}</Mb>
        <Mb>{"y = f(2) = 3 \\cdot 2 - 2 = 4"}</Mb>
        <p>
          Punkt przecięcia: <Mi>{"(2,\\, 4)"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Warunek na <Mi>{"h"}</Mi>
        </p>
        <p>
          Wykres <Mi>{"h"}</Mi> musi przechodzić przez <Mi>{"(2,\\, 4)"}</Mi>:
        </p>
        <Mb>{"4 = a \\cdot 2 + 3 \\quad \\Rightarrow \\quad 2a = 1 \\quad \\Rightarrow \\quad a = \\dfrac{1}{2}"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"a = \\dfrac{1}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-168-odcinek-przeciecie-oy",
    number: "9",
    points: "0–2",
    instruction: (
      <span>
        Odcinek o końcach <Mi>{"A = (-2,\\, 5)"}</Mi> i <Mi>{"B = (3,\\, 1)"}</Mi> jest wykresem funkcji <Mi>{"f"}</Mi>. Znajdź
        współrzędne punktu wspólnego wykresu funkcji <Mi>{"f"}</Mi> i osi <Mi>{"OY"}</Mi>.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <p>
        <Mi>{"\\left(0,\\, \\dfrac{17}{5}\\right)"}</Mi>
      </p>
    ),
    hint: (
      <p className="text-sm">
        Wyznacz równanie prostej przez <Mi>{"A"}</Mi> i <Mi>{"B"}</Mi>, potem podstaw <Mi>{"x = 0"}</Mi> (oś <Mi>{"OY"}</Mi>).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <Mb>{"a = \\dfrac{1 - 5}{3 - (-2)} = \\dfrac{-4}{5}"}</Mb>
        <p>
          Prosta <Mi>{"y = -\\dfrac{4}{5}x + b"}</Mi>; punkt <Mi>{"A(-2,\\, 5)"}</Mi>:
        </p>
        <Mb>{"5 = -\\dfrac{4}{5} \\cdot (-2) + b = \\dfrac{8}{5} + b \\quad \\Rightarrow \\quad b = \\dfrac{17}{5}"}</Mb>
        <p>
          <Mi>{"f(x) = -\\dfrac{4}{5}x + \\dfrac{17}{5}"}</Mi>. Na osi <Mi>{"OY"}</Mi> jest <Mi>{"x = 0"}</Mi>:
        </p>
        <Mb>{"y = \\dfrac{17}{5}"}</Mb>
        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\left(0,\\, \\dfrac{17}{5}\\right)"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-169-miejsce-zero-wlasnosc",
    number: "10",
    points: "0–3",
    instruction: (
      <span>
        Miejscem zerowym funkcji <Mi>{"f(x) = -2x + b"}</Mi> jest liczba <Mi>{"1{,}5"}</Mi>.
        <span className="block mt-3 font-normal">a) Wyznacz wartość współczynnika <Mi>{"b"}</Mi>.</span>
        <span className="block font-normal mt-1">
          b) Dla jakich argumentów wartości funkcji <Mi>{"f"}</Mi> są większe od wartości funkcji{" "}
          <Mi>{"g(x) = 3x - 7"}</Mi>?
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"b = 3"}</Mi>
        </p>
        <p>
          b) <Mi>{"x < 2"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Miejsce zerowe to taki argument, przy którym wartość funkcji wynosi zero.
        </p>
        <p>
          b) Rozwiąż nierówność <Mi>{"f(x) > g(x)"}</Mi> dla już znanego <Mi>{"b"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"f(1{,}5) = 0 \\quad \\Rightarrow \\quad -2 \\cdot 1{,}5 + b = 0 \\quad \\Rightarrow \\quad b = 3"}</Mb>
        <p>
          Zatem <Mi>{"f(x) = -2x + 3"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">b)</p>
        <Mb>{"-2x + 3 > 3x - 7"}</Mb>
        <Mb>{"10 > 5x \\quad \\Rightarrow \\quad x < 2"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"b = 3"}</Mi>; b) dla <Mi>{"x < 2"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-zad-parametr-b-nierownosci",
    number: "11",
    points: "0–3",
    instruction: (
      <span>
        Funkcja jest określona wzorem <Mi>{"f(x) = 3x + b"}</Mi>.
        <span className="block mt-3 font-normal">
          a) Wyznacz te wartości współczynnika <Mi>{"b"}</Mi>, dla których wartość funkcji <Mi>{"f"}</Mi> przyjmowana dla
          argumentu <Mi>{"5"}</Mi> jest mniejsza od <Mi>{"2"}</Mi>.
        </span>
        <span className="block font-normal mt-1">
          b) Wyznacz te wartości współczynnika <Mi>{"b"}</Mi>, dla których miejsce zerowe funkcji <Mi>{"f"}</Mi> jest większe
          od <Mi>{"3{,}5"}</Mi>.
        </span>
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"b < -13"}</Mi>
        </p>
        <p>
          b) <Mi>{"b < -\\dfrac{21}{2}"}</Mi> (czyli <Mi>{"b < -10{,}5"}</Mi>)
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Zapisz <Mi>{"f(5)"}</Mi> przez <Mi>{"b"}</Mi> i rozwiąż nierówność <Mi>{"f(5) < 2"}</Mi>.
        </p>
        <p>
          b) Wyraź miejsce zerowe (argument, przy którym <Mi>{"f(x)=0"}</Mi>) przez <Mi>{"b"}</Mi>, potem porównaj z{" "}
          <Mi>{"3{,}5"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <Mb>{"f(5) = 3 \\cdot 5 + b = 15 + b"}</Mb>
        <Mb>{"15 + b < 2 \\quad \\Rightarrow \\quad b < -13"}</Mb>

        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Miejsce zerowe <Mi>{"x_0"}</Mi>: <Mi>{"3x_0 + b = 0"}</Mi>, stąd <Mi>{"x_0 = -\\dfrac{b}{3}"}</Mi>.
        </p>
        <Mb>{"-\\dfrac{b}{3} > 3{,}5 = \\dfrac{7}{2}"}</Mb>
        <p>Mnożymy obie strony przez <Mi>{"3"}</Mi>:</p>
        <Mb>{"-b > \\dfrac{21}{2}"}</Mb>
        <p>Po pomnożeniu przez <Mi>{"(-1)"}</Mi> nierówność zmienia zwrot:</p>
        <Mb>{"b < -\\dfrac{21}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"b < -13"}</Mi>; b) <Mi>{"b < -\\dfrac{21}{2}"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "fl-mc-znaki-ab-wykres",
    number: "12",
    points: "0–1",
    instruction: (
      <div className="space-y-4 font-normal">
        <p>
          Niech <Mi>{"f"}</Mi> będzie funkcją liniową <Mi>{"f(x) = ax + b"}</Mi>, gdzie <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> są liczbami
          rzeczywistymi. Na rysunku w kartezjańskim układzie <Mi>{"(x,y)"}</Mi> zaznaczono prostą będącą wykresem{" "}
          <Mi>{"f"}</Mi>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[300px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m12-znaki"
            a={-1}
            b={4}
            xRange={[-2, 7]}
            yRange={[-2, 7]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-2">Na rysunku fioletowa prosta to wykres <Mi>{"f"}</Mi>.</p>
        </div>
        <p className="font-semibold text-stone-800">
          Dokończ zdanie. Wybierz właściwą odpowiedź. Współczynniki <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> we wzorze funkcji{" "}
          <Mi>{"f"}</Mi> spełniają warunki
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: [
      "A. a > 0 i b > 0",
      "B. a > 0 i b < 0",
      "C. a < 0 i b > 0",
      "D. a < 0 i b < 0",
    ],
    answer: (
      <p>
        Prawidłowa odpowiedź: <strong>C</strong>.
      </p>
    ),
    hint: (
      <p className="text-sm">
        Z samego rysunku odczytaj: czy funkcja rośnie, czy maleje (to znak <Mi>{"a"}</Mi>), oraz gdzie prosta przecina oś{" "}
        <Mi>{"Oy"}</Mi> (to pomaga ustalić znak <Mi>{"b"}</Mi>).
      </p>
    ),
    solution: (
      <div className="space-y-3">
        <p>
          Prosta idzie „w dół” przy większym <Mi>{"x"}</Mi>, więc jest malejąca i <Mi>{"a < 0"}</Mi>.
        </p>
        <p>
          Przecięcie z osią <Mi>{"Oy"}</Mi> leży ponad początkiem układu (dodatnia rzędna punktu przecięcia), więc{" "}
          <Mi>{"b > 0"}</Mi>.
        </p>
        <p>
          Pasuje odpowiedź <strong>C</strong>.
        </p>
      </div>
    ),
  },

  {
    id: "fl-wykres-prosta-trojkat-osiowe",
    number: "13",
    points: "0–2",
    instruction: (
      <div className="space-y-4 font-normal">
        <p>
          Funkcja liniowa <Mi>{"f"}</Mi> ma wykres w postaci prostej jak na rysunku. Wiadomo, że przecina ona oś <Mi>{"Oy"}</Mi>{" "}
          w punkcie <Mi>{"(0,\\, 2)"}</Mi>, a oś <Mi>{"Ox"}</Mi> w punkcie <Mi>{"(-6,\\, 0)"}</Mi>.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4 max-w-[300px] mx-auto shadow-sm">
          <LineDiagram
            id="fl-m13-prosta"
            a={1 / 3}
            b={2}
            squareGrid
            xRange={[-7, 2]}
            yRange={[-3, 6]}
            pts={[
              { x: -6, y: 0, label: "(-6, 0)", dx: -44, dy: 14 },
              { x: 0, y: 2, label: "(0, 2)", dx: 8, dy: -8 },
            ]}
            className="w-full max-w-[260px] mx-auto block"
          />
          <p className="text-center text-xs text-stone-500 mt-2">wykres <Mi>{"f"}</Mi></p>
        </div>
        <span className="block font-semibold text-stone-800 mt-3">
          a) Wyznacz współczynnik kierunkowy prostej będącej wykresem <Mi>{"f"}</Mi>.
        </span>
        <span className="block font-semibold text-stone-800 mt-3">
          b) Oblicz pole trójkąta ograniczonego osiami <Mi>{"Ox"}</Mi>, <Mi>{"Oy"}</Mi> oraz wykresem funkcji <Mi>{"f"}</Mi>.
        </span>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: (
      <div className="space-y-2">
        <p>
          a) <Mi>{"a = \\dfrac{1}{3}"}</Mi>
        </p>
        <p>
          b) <Mi>{"P = 6"}</Mi>
        </p>
      </div>
    ),
    hint: (
      <div className="space-y-2 text-sm">
        <p>
          a) Współczynnik kierunkowy znajdziesz np. z dwóch punktów leżących na prostej (np. przecięć z osiami).
        </p>
        <p>
          b) Trójkąt przy początku układu jest prostokątny: obie przyprostokątne leżą na osiach. Ich długości to wartości
          bezwzględne odciętych punktów przecięcia z <Mi>{"Ox"}</Mi> i <Mi>{"Oy"}</Mi>.
        </p>
      </div>
    ),
    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">a)</p>
        <p>
          Z punktów <Mi>{"(-6,\\,0)"}</Mi> i <Mi>{"(0,\\,2)"}</Mi>:
        </p>
        <Mb>{"a = \\dfrac{2 - 0}{0 - (-6)} = \\dfrac{2}{6} = \\dfrac{1}{3}"}</Mb>
        <p>
          (Zgodnie z tym <Mi>{"f(x) = \\dfrac{1}{3}x + 2"}</Mi>.)
        </p>

        <p className="font-semibold text-stone-800">b)</p>
        <p>
          Trójkąt ma wierzchołki <Mi>{"O = (0,0)"}</Mi>, <Mi>{"(-6,\\,0)"}</Mi>, <Mi>{"(0,\\,2)"}</Mi>. Kąt prosty jest w{" "}
          <Mi>{"O"}</Mi>, więc
        </p>
        <Mb>{"P = \\dfrac{1}{2} \\cdot |-6| \\cdot 2 = 6"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"a = \\dfrac{1}{3}"}</Mi>; b) <Mi>{"P = 6"}</Mi>.
          </p>
        </div>
      </div>
    ),
  },
];

const tocBlobClass =
  "inline-flex text-xs font-semibold text-[#6d3a8e] bg-[#f2ecfb] border border-[#d4b8f0] rounded-full px-3 py-1.5 hover:bg-[#ead5fb] transition-colors";

// ─── Strona główna ───────────────────────────────────────────
export default function FunkcjaLiniowaPage() {

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
          <span className="text-sm text-stone-400">Funkcja liniowa</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        {/* Słowniczek — na początku */}
        <div className="mb-12">
          <RuleBox title="Słowniczek pojęć" color="green">
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Odcięta</strong> punktu (albo odcięta na osi): to jego współrzędna{" "}
                <Mi>{"x"}</Mi>
              </li>
              <li>
                <strong>Rzędna:</strong> współrzędna <Mi>{"y"}</Mi>.
              </li>
              <li>
                <strong>Argument</strong> funkcji <Mi>{"f"}</Mi> to wartość <Mi>{"x"}</Mi>, którą podstawiasz do wzoru (np. w <Mi>{"f(5)"}</Mi> argumentem jest <Mi>{"5"}</Mi>).
              </li>
              <li>
                <strong>Wartość funkcji</strong> dla danego argumentu to wynik <Mi>{"f(x)"}</Mi>, często oznaczony na wykresie literą <Mi>{"y"}</Mi>. Dla <Mi>{"f(x)=2x+1"}</Mi> wartością w <Mi>{"x=3"}</Mi> jest <Mi>{"f(3)=7"}</Mi>, czyli <Mi>{"y=7"}</Mi>.
              </li>
            </ul>
          </RuleBox>
        </div>

        {/* Nagłówek */}
        <div className="mb-12">
          <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Matematyka, 1 klasa LO, poziom podstawowy
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Funkcja liniowa
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            Schematy postępowania przy typowych zadaniach z funkcją liniową, m.in. wykres i miejsce zerowe,
            monotoniczność, punkt na prostej, proste na płaszczyźnie, figury w układzie współrzędnych oraz wiele innych.
            Na końcu strony jest też większy zbiór zadań prowadzonych w stylu maturalnym.
          </p>
        </div>

        {/* Spis treści */}
        <nav aria-label="Spis treści" className="mb-14 space-y-8">
          <div>
            <h2 className="text-xs font-bold text-[#52297a] uppercase tracking-widest mb-3">
              Schematy zadań
            </h2>
            <ol className="list-none space-y-2 pl-0 m-0">
              {tocSchemes.map(({ id, label }, idx) => (
                <li key={id} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs font-semibold text-stone-500 tabular-nums w-7 shrink-0">
                    {idx + 1}.
                  </span>
                  <a href={`#${id}`} className={tocBlobClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#52297a] uppercase tracking-widest mb-3">
              Zadania maturalne
            </h2>
            <ol className="list-none space-y-2 pl-0 m-0">
              <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-xs font-semibold text-stone-500 tabular-nums w-7 shrink-0">
                  1.
                </span>
                <a href={`#${MATURA_SECTION_ID}`} className={tocBlobClass}>
                  Zadania w stylu maturalnym
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* Wzór wstępny */}
        <RuleBox title="Wzór funkcji liniowej">
          <p>
            Każda funkcja liniowa ma postać <Mi>{"f(x) = ax + b"}</Mi>, gdzie:
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <Mi>{"a"}</Mi> to <strong>współczynnik kierunkowy</strong> (decyduje o nachyleniu prostej)
            </li>
            <li>
              <Mi>{"b"}</Mi> to <strong>wyraz wolny</strong> (wartość funkcji w punkcie <Mi>{"x = 0"}</Mi>)
            </li>
          </ul>
        </RuleBox>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 1: wykres */}
        <SectionHead id="wykres" eyebrow="Schemat 1" title="Jak narysować wykres?" />

        <RuleBox title="Zasada" color="purple">
          <p>
            Prostą wyznaczają <strong>dwa punkty</strong>. Wybierz dwa dowolne <Mi>{"x"}</Mi>,
            oblicz odpowiednie <Mi>{"y = f(x)"}</Mi>, zaznacz punkty na układzie współrzędnych
            i połącz je prostą, przedłużając w obu kierunkach.
          </p>
        </RuleBox>

        <WorkedExample
          title="Narysuj wykres f(x) = x − 2"
          steps={[
            {
              label: "Oblicz pierwszy punkt",
              content: (
                <span>
                  Przyjmij <Mi>{"x = 0"}</Mi>:{" "}
                  <Mi>{"f(0) = 0 - 2 = -2"}</Mi>.<br />
                  Punkt <strong>A(0, −2)</strong>.
                </span>
              ),
              hint: "Dla x = 0 zawsze f(0) = b, więc wystarczy odczytać wyraz wolny.",
            },
            {
              label: "Oblicz drugi punkt",
              content: (
                <span>
                  Przyjmij <Mi>{"x = 3"}</Mi>:{" "}
                  <Mi>{"f(3) = 3 - 2 = 1"}</Mi>.<br />
                  Punkt <strong>B(3, 1)</strong>.
                </span>
              ),
              hint: "Wybierz x tak, żeby obliczenia były łatwe, np. x = 1, 2 lub 3.",
            },
            {
              label: "Narysuj wykres",
              content:
                "Zaznacz A i B na układzie współrzędnych i połącz je prostą, przedłużając ją w obu kierunkach.",
              diagram: (
                <LineDiagram
                  id="d0"
                  a={1} b={-2}
                  xRange={[-2.5, 3.5]} yRange={[-3.5, 2.5]}
                  pts={[
                    { x: 0, y: -2, label: "A(0, -2)", color: "#3b82f6", dx: 7,   dy: 4  },
                    { x: 3, y:  1, label: "B(3, 1)",  color: "#f97316", dx: -50, dy: -9 },
                  ]}
                  className="w-full max-w-[260px] mx-auto block mt-2"
                />
              ),
            },
          ]}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ExerciseCard
            number="1"
            question={
              <span>
                Narysuj wykres <Mi>{"f(x) = 2x + 1"}</Mi>. Podaj dwa punkty, które do niego należą.
              </span>
            }
            answer={
              <div>
                <p>Np. A(0, 1) i B(1, 3): <Mi>{"f(0) = 1"}</Mi>, <Mi>{"f(1) = 3"}</Mi>.</p>
                <LineDiagram
                  id="d1"
                  a={2} b={1}
                  xRange={[-1.5, 2.5]} yRange={[-1, 5.5]}
                  pts={[
                    { x: 0, y: 1, label: "A(0,1)", color: "#3b82f6", dx: 7,   dy: 4  },
                    { x: 1, y: 3, label: "B(1,3)", color: "#f97316", dx: -44, dy: -9 },
                  ]}
                  className="w-full max-w-[160px] mx-auto block mt-3"
                />
              </div>
            }
          />
          <ExerciseCard
            number="2"
            question={
              <span>
                Narysuj wykres <Mi>{"f(x) = -x + 4"}</Mi>. Podaj dwa punkty.
              </span>
            }
            answer={
              <div>
                <p>Np. A(0, 4) i B(4, 0): <Mi>{"f(0) = 4"}</Mi>, <Mi>{"f(4) = 0"}</Mi>.</p>
                <LineDiagram
                  id="d2"
                  a={-1} b={4}
                  xRange={[-1, 5.5]} yRange={[-1, 5.5]}
                  pts={[
                    { x: 0, y: 4, label: "A(0,4)", color: "#3b82f6", dx: 7,   dy: 4  },
                    { x: 4, y: 0, label: "B(4,0)", color: "#f97316", dx: 5,   dy: -10 },
                  ]}
                  className="w-full max-w-[160px] mx-auto block mt-3"
                />
              </div>
            }
          />
          <ExerciseCard
            number="3"
            question={
              <span>
                Narysuj wykres <Mi>{"f(x) = -\\dfrac{1}{3}x - 2"}</Mi>. Podaj dwa punkty.
              </span>
            }
            answer={
              <div>
                <p>
                  A(0, −2): <Mi>{"f(0) = -2"}</Mi>.<br />
                  B(−3, −1): <Mi>{"f(-3) = -\\tfrac{1}{3}\\cdot(-3)-2 = 1-2 = -1"}</Mi>.
                </p>
                <LineDiagram
                  id="d3"
                  a={-1/3} b={-2}
                  xRange={[-4.5, 3.5]} yRange={[-4, 1.5]}
                  pts={[
                    { x:  0, y: -2, label: "A(0,-2)",  color: "#3b82f6", dx: 7,   dy: 4  },
                    { x: -3, y: -1, label: "B(-3,-1)", color: "#f97316", dx: 7,   dy: -9 },
                  ]}
                  className="w-full max-w-[160px] mx-auto block mt-3"
                />
              </div>
            }
          />
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 2: miejsce zerowe */}
        <SectionHead id="zero" eyebrow="Schemat 2" title="Jak znaleźć miejsce zerowe?" />

        <RuleBox title="Definicja" color="blue">
          <p>
            <strong>Miejsce zerowe</strong> to wartość <Mi>{"x_0"}</Mi>, dla której{" "}
            <Mi>{"f(x_0) = 0"}</Mi>. Na wykresie jest to punkt, w którym prosta
            przecina oś OX.
          </p>
        </RuleBox>

        <RuleBox title="Ze wzoru" color="purple">
          <p>
            Ustaw <Mi>{"f(x) = 0"}</Mi> i rozwiąż równanie:
          </p>
          <div className="mt-2">
            <Mb>{"ax + b = 0 \\quad\\Longrightarrow\\quad x_0 = -\\frac{b}{a}"}</Mb>
          </div>
          <p className="text-sm text-stone-500 mt-1">
            Miejsce zerowe istnieje tylko wtedy, gdy <Mi>{"a \\neq 0"}</Mi>.
          </p>
        </RuleBox>

        <WorkedExample
          title="Znajdź miejsce zerowe f(x) = 3x − 6"
          steps={[
            {
              label: "Ustaw f(x) = 0",
              content: (
                <span>
                  Zapisz równanie: <Mi>{"3x - 6 = 0"}</Mi>.
                </span>
              ),
              formula: <Mi>{"3x - 6 = 0"}</Mi>,
            },
            {
              label: "Rozwiąż",
              content: (
                <span>
                  Dodaj 6 do obu stron: <Mi>{"3x = 6"}</Mi>.<br />
                  Podziel przez 3: <Mi>{"x_0 = 2"}</Mi>.
                </span>
              ),
              formula: <Mi>{"x_0 = \\frac{6}{3} = 2"}</Mi>,
            },
            {
              label: "Odpowiedź",
              content: (
                <span>
                  Miejsce zerowe: <strong><Mi>{"x_0 = 2"}</Mi></strong>. Prosta
                  przecina oś OX w punkcie <strong>(2, 0)</strong>.
                </span>
              ),
            },
          ]}
        />

        <RuleBox title="Z wykresu" color="amber">
          <p>
            Znajdź punkt, w którym prosta <strong>przecina poziomą oś OX</strong>.
            Odczytaj jego pierwszą współrzędną <Mi>{"x"}</Mi>. To jest miejsce zerowe.
          </p>
        </RuleBox>

        <div className="flex flex-col items-center gap-2 my-5">
          <LineDiagram
            id="dz-eg"
            a={1} b={-3}
            xRange={[-1.5, 5]} yRange={[-4.5, 2.5]}
            pts={[
              { x: 3, y: 0, label: "(3, 0)", color: "#f97316", dx: 7, dy: -11 },
            ]}
            className="w-full max-w-[240px] block"
          />
          <p className="text-xs text-stone-400">
            Miejsce zerowe odczytane z wykresu <Mi>{"f(x) = x - 3"}</Mi>: punkt (3, 0), więc <Mi>{"x_0 = 3"}</Mi>
          </p>
        </div>

        <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mt-6 mb-3">Ze wzoru</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <ExerciseCard
            number="1"
            question={<span>Znajdź miejsce zerowe <Mi>{"f(x) = 2x - 8"}</Mi>.</span>}
            answer={<span><Mi>{"2x - 8 = 0 \\Rightarrow x_0 = 4"}</Mi></span>}
          />
          <ExerciseCard
            number="2"
            question={<span>Znajdź miejsce zerowe <Mi>{"f(x) = -5x + 15"}</Mi>.</span>}
            answer={<span><Mi>{"-5x + 15 = 0 \\Rightarrow x_0 = 3"}</Mi></span>}
          />
          <ExerciseCard
            number="3"
            question={<span>Znajdź miejsce zerowe <Mi>{"f(x) = \\tfrac{3}{5}x - 2"}</Mi>.</span>}
            answer={
              <span>
                <Mi>{"\\tfrac{3}{5}x = 2 \\Rightarrow x_0 = 2 \\cdot \\tfrac{5}{3} = \\tfrac{10}{3}"}</Mi>
              </span>
            }
          />
        </div>

        <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mt-6 mb-3">Z wykresu</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <ExerciseCard
            number="4"
            question={
              <div>
                <p className="mb-2">Odczytaj miejsce zerowe:</p>
                <LineDiagram
                  id="dz-q1"
                  a={1} b={1}
                  xRange={[-3.5, 2.5]} yRange={[-2.5, 3.5]}
                  pts={[{ x: -1, y: 0, color: "#f97316" }]}
                  className="w-full max-w-[160px] mx-auto block"
                />
              </div>
            }
            answer={
              <span>
                Prosta przecina OX w punkcie <strong>(−1, 0)</strong>, więc <Mi>{"x_0 = -1"}</Mi>.
              </span>
            }
          />
          <ExerciseCard
            number="5"
            question={
              <div>
                <p className="mb-2">Odczytaj miejsce zerowe:</p>
                <LineDiagram
                  id="dz-q2"
                  a={2} b={-4}
                  xRange={[-1.5, 4.5]} yRange={[-5.5, 3.5]}
                  pts={[{ x: 2, y: 0, color: "#f97316" }]}
                  className="w-full max-w-[160px] mx-auto block"
                />
              </div>
            }
            answer={
              <span>
                Prosta przecina OX w punkcie <strong>(2, 0)</strong>, więc <Mi>{"x_0 = 2"}</Mi>.
              </span>
            }
          />
          <ExerciseCard
            number="6"
            question={
              <div>
                <p className="mb-2">Odczytaj miejsce zerowe:</p>
                <LineDiagram
                  id="dz-q3"
                  a={-1} b={3}
                  xRange={[-1.5, 5.5]} yRange={[-2.5, 5.5]}
                  pts={[{ x: 3, y: 0, color: "#f97316" }]}
                  className="w-full max-w-[160px] mx-auto block"
                />
              </div>
            }
            answer={
              <span>
                Prosta przecina OX w punkcie <strong>(3, 0)</strong>, więc <Mi>{"x_0 = 3"}</Mi>.
              </span>
            }
          />
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 3: przecięcia z osiami */}
        <SectionHead id="osie" eyebrow="Schemat 3" title="Przecięcia z osiami OX i OY" />

        <RuleBox title="Obie osie jednym spojrzeniem" color="purple">
          <ul className="space-y-2">
            <li>
              <strong>Oś OX (pozioma):</strong> ustaw <Mi>{"f(x) = 0"}</Mi>, rozwiąż. Punkt:{" "}
              <Mi>{"\\left(-\\tfrac{b}{a},\\ 0\\right)"}</Mi>.
            </li>
            <li>
              <strong>Oś OY (pionowa):</strong> podstaw <Mi>{"x = 0"}</Mi>, oblicz{" "}
              <Mi>{"f(0) = b"}</Mi>. Punkt: <Mi>{"(0,\\ b)"}</Mi>.
            </li>
          </ul>
        </RuleBox>

        <WorkedExample
          title="f(x) = −2x + 4: wyznacz przecięcia z osiami"
          steps={[
            {
              label: "Przecięcie z OY",
              content: (
                <span>
                  Podstaw <Mi>{"x = 0"}</Mi>:{" "}
                  <Mi>{"f(0) = -2 \\cdot 0 + 4 = 4"}</Mi>.<br />
                  Punkt: <strong>(0, 4)</strong>.
                </span>
              ),
              hint: "Przecięcie z OY to zawsze punkt (0, b), wystarczy odczytać wyraz wolny.",
            },
            {
              label: "Przecięcie z OX",
              content: (
                <span>
                  Ustaw <Mi>{"f(x) = 0"}</Mi>:{" "}
                  <Mi>{"-2x + 4 = 0"}</Mi>.<br />
                  <Mi>{"-2x = -4 \\Rightarrow x = 2"}</Mi>.<br />
                  Punkt: <strong>(2, 0)</strong>.
                </span>
              ),
              hint: "Przecięcie z OX to miejsce zerowe, czyli x₀ = −b/a.",
            },
            {
              label: "Podsumowanie",
              content: (
                <span>
                  Prosta przecina OY w punkcie <strong>(0, 4)</strong> i OX w
                  punkcie <strong>(2, 0)</strong>.
                </span>
              ),
              diagram: (
                <LineDiagram
                  id="dos-ex"
                  a={-2} b={4}
                  xRange={[-1, 3.5]} yRange={[-1, 5.5]}
                  pts={[
                    { x: 0, y: 4, label: "(0, 4)", color: "#3b82f6", dx: 7,   dy: 4   },
                    { x: 2, y: 0, label: "(2, 0)", color: "#f97316", dx: 5,   dy: -11 },
                  ]}
                  className="w-full max-w-[230px] mx-auto block mt-2"
                />
              ),
            },
          ]}
        />

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <ExerciseCard
            number="1"
            question={<span>Wyznacz przecięcia z osiami: <Mi>{"f(x) = 3x - 9"}</Mi>.</span>}
            answer={
              <span>
                OY: (0, −9). OX: <Mi>{"3x - 9 = 0 \\Rightarrow"}</Mi> (3, 0).
              </span>
            }
          />
          <ExerciseCard
            number="2"
            question={<span>Wyznacz przecięcia z osiami: <Mi>{"f(x) = -x + 5"}</Mi>.</span>}
            answer={
              <span>
                OY: (0, 5). OX: <Mi>{"-x + 5 = 0 \\Rightarrow"}</Mi> (5, 0).
              </span>
            }
          />
          <ExerciseCard
            number="3"
            question={<span>Wyznacz przecięcia z osiami: <Mi>{"f(x) = \\tfrac{1}{2}x + 3"}</Mi>.</span>}
            answer={
              <span>
                OY: (0, 3). OX: <Mi>{"\\tfrac{1}{2}x + 3 = 0 \\Rightarrow x_0 = -6"}</Mi>, punkt (−6, 0).
              </span>
            }
          />
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 4: monotoniczność */}
        <SectionHead id="monotonicznosc" eyebrow="Schemat 4" title="Monotoniczność" />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <RuleBox title="Reguła" color="purple">
            <ul className="space-y-1.5">
              <li>
                <Mi>{"a > 0"}</Mi>: funkcja <strong>rosnąca</strong> (prosta idzie w górę)
              </li>
              <li>
                <Mi>{"a < 0"}</Mi>: funkcja <strong>malejąca</strong> (prosta idzie w dół)
              </li>
              <li>
                <Mi>{"a = 0"}</Mi>: funkcja <strong>stała</strong> (pozioma prosta)
              </li>
            </ul>
          </RuleBox>
          <div className="pt-2">
            <DiagramMonotonicznosc />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <p className="font-display font-semibold text-stone-800 text-base mb-1">
              <Mi>{"f(x) = 2x + 1"}</Mi>
            </p>
            <p className="text-xs text-stone-500 mb-2">
              <Mi>{"a = 2 > 0"}</Mi>
            </p>
            <span className="text-sm font-bold text-emerald-700">rosnąca</span>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="font-display font-semibold text-stone-800 text-base mb-1">
              <Mi>{"f(x) = -3x + 4"}</Mi>
            </p>
            <p className="text-xs text-stone-500 mb-2">
              <Mi>{"a = -3 < 0"}</Mi>
            </p>
            <span className="text-sm font-bold text-red-600">malejąca</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
            <p className="font-display font-semibold text-stone-800 text-base mb-1">
              <Mi>{"f(x) = 5"}</Mi>
            </p>
            <p className="text-xs text-stone-500 mb-2">
              <Mi>{"a = 0"}</Mi> (brak wyrazu z <Mi>{"x"}</Mi>)
            </p>
            <span className="text-sm font-bold text-stone-500">stała</span>
          </div>
        </div>
        <p className="text-sm text-stone-500 mt-3 mb-2 leading-relaxed">
          Gdy <Mi>{"a = 0"}</Mi>, wyraz <Mi>{"ax"}</Mi> znika (bo <Mi>{"0 \\cdot x = 0"}</Mi>), więc wzór
          upraszcza się do <Mi>{"f(x) = b"}</Mi>. Funkcja nie rośnie ani nie maleje, jej wykres to
          pozioma prosta.
        </p>

        <RuleBox title="Gdy a zawiera parametr" color="amber">
          <p>
            Jeśli <Mi>{"a"}</Mi> jest wyrażeniem z parametrem, zbadaj jego znak,
            rozwiązując odpowiednie nierówności.
          </p>
          <p className="mt-3 font-semibold text-stone-800">
            Przykład: <Mi>{"f(x) = (2m + 6)x + 3"}</Mi>, więc <Mi>{"a = 2m + 6"}</Mi>
          </p>
          <ul className="mt-1.5 space-y-1 ml-3">
            <li>
              <Mi>{"2m + 6 > 0 \\Rightarrow m > -3"}</Mi>: funkcja <strong>rosnąca</strong>
            </li>
            <li>
              <Mi>{"2m + 6 < 0 \\Rightarrow m < -3"}</Mi>: funkcja <strong>malejąca</strong>
            </li>
            <li>
              <Mi>{"m = -3"}</Mi>: funkcja stała (prosta pozioma)
            </li>
          </ul>
        </RuleBox>

        <WorkedExample
          title="Określ monotoniczność f(x) = (−2m + 1)x − 2"
          steps={[
            {
              label: "Odczytaj współczynnik a",
              content: (
                <span>
                  Porównaj z wzorem <Mi>{"f(x) = ax + b"}</Mi>. Współczynnik kierunkowy:{" "}
                  <strong><Mi>{"a = -2m + 1"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Zbadaj znak a",
              content: (
                <span>
                  Rosnąca, gdy <Mi>{"a > 0"}</Mi>:{" "}
                  <Mi>{"-2m + 1 > 0 \\Rightarrow -2m > -1 \\Rightarrow m < \\tfrac{1}{2}"}</Mi>.<br />
                  Malejąca, gdy <Mi>{"a < 0"}</Mi>:{" "}
                  <Mi>{"-2m + 1 < 0 \\Rightarrow -2m < -1 \\Rightarrow m > \\tfrac{1}{2}"}</Mi>.
                </span>
              ),
              hint: "Dzieląc przez liczbę ujemną (−2), odwracamy znak nierówności!",
            },
            {
              label: "Sformułuj odpowiedź",
              content: (
                <span>
                  Funkcja jest <strong>rosnąca</strong> dla <Mi>{"m < \\tfrac{1}{2}"}</Mi>,{" "}
                  <strong>malejąca</strong> dla <Mi>{"m > \\tfrac{1}{2}"}</Mi>, stała dla{" "}
                  <Mi>{"m = \\tfrac{1}{2}"}</Mi>.
                </span>
              ),
            },
          ]}
        />

        <div className="space-y-4 mt-6">
          <MultiExercise
            title="Określ monotoniczność każdej z funkcji:"
            parts={[
              {
                question: <span><Mi>{"f(x) = -3x + 7"}</Mi></span>,
                answer: <span><Mi>{"a = -3 < 0"}</Mi>, więc funkcja jest <strong>malejąca</strong>.</span>,
              },
              {
                question: <span><Mi>{"f(x) = 5x - 2"}</Mi></span>,
                answer: <span><Mi>{"a = 5 > 0"}</Mi>, więc funkcja jest <strong>rosnąca</strong>.</span>,
              },
              {
                question: <span><Mi>{"f(x) = -\\tfrac{1}{2}x + 4"}</Mi></span>,
                answer: <span><Mi>{"a = -\\tfrac{1}{2} < 0"}</Mi>, więc funkcja jest <strong>malejąca</strong>.</span>,
              },
              {
                question: <span><Mi>{"f(x) = 8"}</Mi></span>,
                answer: <span><Mi>{"a = 0"}</Mi> (brak wyrazu z <Mi>{"x"}</Mi>), funkcja jest <strong>stała</strong>.</span>,
              },
            ]}
          />

          <MultiExercise
            title="Dla jakich wartości parametru funkcja spełnia podany warunek?"
            parts={[
              {
                question: <span><Mi>{"f(x) = (3k - 9)x + 1"}</Mi> jest <strong>malejąca</strong>.</span>,
                answer: <span><Mi>{"3k - 9 < 0 \\Rightarrow k < 3"}</Mi>.</span>,
              },
              {
                question: <span><Mi>{"f(x) = (2p + 4)x - 3"}</Mi> jest <strong>rosnąca</strong>.</span>,
                answer: <span><Mi>{"2p + 4 > 0 \\Rightarrow p > -2"}</Mi>.</span>,
              },
              {
                question: <span><Mi>{"f(x) = (5 - 2t)x + 7"}</Mi> jest <strong>rosnąca</strong>.</span>,
                answer: (
                  <span>
                    <Mi>{"5 - 2t > 0 \\Rightarrow -2t > -5 \\Rightarrow t < \\tfrac{5}{2}"}</Mi>.{" "}
                    <em>(dzielenie przez −2 odwraca nierówność)</em>
                  </span>
                ),
              },
              {
                question: <span><Mi>{"f(x) = (-4n + 8)x + 1"}</Mi> jest <strong>stała</strong>.</span>,
                answer: <span><Mi>{"-4n + 8 = 0 \\Rightarrow n = 2"}</Mi>.</span>,
              },
            ]}
          />

          <MultiExercise
            title="Określ monotoniczność w zależności od wartości parametru:"
            parts={[
              {
                question: <span><Mi>{"f(x) = (3m - 6)x + 2"}</Mi></span>,
                answer: (
                  <span>
                    <Mi>{"a = 3m - 6"}</Mi>.<br />
                    <Mi>{"3m - 6 > 0 \\Rightarrow m > 2"}</Mi>: <strong>rosnąca</strong>.<br />
                    <Mi>{"3m - 6 < 0 \\Rightarrow m < 2"}</Mi>: <strong>malejąca</strong>.<br />
                    <Mi>{"m = 2"}</Mi>: stała.
                  </span>
                ),
              },
              {
                question: <span><Mi>{"f(x) = (-2p + 4)x - 1"}</Mi></span>,
                answer: (
                  <span>
                    <Mi>{"a = -2p + 4"}</Mi>.<br />
                    <Mi>{"-2p + 4 > 0 \\Rightarrow p < 2"}</Mi>: <strong>rosnąca</strong>.<br />
                    <Mi>{"-2p + 4 < 0 \\Rightarrow p > 2"}</Mi>: <strong>malejąca</strong>.<br />
                    <Mi>{"p = 2"}</Mi>: stała.
                  </span>
                ),
              },
            ]}
          />
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 5: punkt na prostej */}
        <SectionHead id="punkt" eyebrow="Schemat 5" title="Czy punkt należy do prostej?" />

        <RuleBox title="Metoda" color="purple">
          <p>
            Podstaw <strong>współrzędną x</strong> punktu do wzoru funkcji. Jeśli
            obliczona wartość <Mi>{"f(x)"}</Mi> jest równa <strong>współrzędnej y</strong>{" "}
            punktu, to punkt leży na prostej.
          </p>
          <p className="text-sm text-stone-500 mt-1">
            Formalnie: <Mi>{"P(x_P,\\ y_P) \\in f"}</Mi> wtedy i tylko wtedy, gdy{" "}
            <Mi>{"f(x_P) = y_P"}</Mi>.
          </p>
        </RuleBox>

        <div className="grid md:grid-cols-2 gap-6">
          <WorkedExample
            title="Czy P(3, 5) należy do f(x) = 2x − 1?"
            steps={[
              {
                label: "Podstaw x = 3 do wzoru",
                content: (
                  <span>
                    <Mi>{"f(3) = 2 \\cdot 3 - 1 = 6 - 1 = 5"}</Mi>.
                  </span>
                ),
                formula: <Mi>{"f(3) = 5"}</Mi>,
              },
              {
                label: "Porównaj z y-współrzędną",
                content: (
                  <span>
                    Wartość funkcji: <Mi>{"5"}</Mi>. Współrzędna y punktu P:{" "}
                    <Mi>{"5"}</Mi>. Są równe.
                  </span>
                ),
              },
              {
                label: "Wniosek",
                content: (
                  <span>
                    <strong>TAK</strong>, punkt P(3, 5) należy do prostej.
                  </span>
                ),
              },
            ]}
          />
          <WorkedExample
            title="Czy Q(2, 7) należy do f(x) = 3x − 1?"
            steps={[
              {
                label: "Podstaw x = 2 do wzoru",
                content: (
                  <span>
                    <Mi>{"f(2) = 3 \\cdot 2 - 1 = 6 - 1 = 5"}</Mi>.
                  </span>
                ),
                formula: <Mi>{"f(2) = 5"}</Mi>,
              },
              {
                label: "Porównaj z y-współrzędną",
                content: (
                  <span>
                    Wartość funkcji: <Mi>{"5"}</Mi>. Współrzędna y punktu Q:{" "}
                    <Mi>{"7"}</Mi>. <strong>Różne.</strong>
                  </span>
                ),
              },
              {
                label: "Wniosek",
                content: (
                  <span>
                    <strong>NIE</strong>, punkt Q(2, 7) nie należy do prostej.
                  </span>
                ),
              },
            ]}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <ExerciseCard
            number="1"
            question={
              <span>
                Czy A(4, 9) należy do <Mi>{"f(x) = 2x + 1"}</Mi>?
              </span>
            }
            answer={
              <span>
                <Mi>{"f(4) = 2 \\cdot 4 + 1 = 9 = y_A"}</Mi>. <strong>TAK.</strong>
              </span>
            }
          />
          <ExerciseCard
            number="2"
            question={
              <span>
                Czy B(−2, 3) należy do <Mi>{"f(x) = -x + 1"}</Mi>?
              </span>
            }
            answer={
              <span>
                <Mi>{"f(-2) = -(-2) + 1 = 3 = y_B"}</Mi>. <strong>TAK.</strong>
              </span>
            }
          />
          <ExerciseCard
            number="3"
            question={
              <span>
                Czy C(2, 5) należy do <Mi>{"f(x) = 3x - 2"}</Mi>?
              </span>
            }
            answer={
              <span>
                <Mi>{"f(2) = 3 \\cdot 2 - 2 = 4 \\neq 5"}</Mi>. <strong>NIE.</strong>
              </span>
            }
          />
          <ExerciseCard
            number="4"
            question={
              <span>
                Czy D(3, 7) należy do <Mi>{"f(x) = -2x + 1"}</Mi>?
              </span>
            }
            answer={
              <span>
                <Mi>{"f(3) = -2 \\cdot 3 + 1 = -5 \\neq 7"}</Mi>. <strong>NIE.</strong>
              </span>
            }
          />
          <ExerciseCard
            number="5"
            question={
              <span>
                Czy E(−1, 2) należy do <Mi>{"f(x) = x + 4"}</Mi>?
              </span>
            }
            answer={
              <span>
                <Mi>{"f(-1) = -1 + 4 = 3 \\neq 2"}</Mi>. <strong>NIE.</strong>
              </span>
            }
          />
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Schemat 6: współliniowość */}
        <SectionHead id="wspolliniowosc" eyebrow="Schemat 6" title="Czy trzy punkty są współliniowe?" />

        <RuleBox title="Idea" color="blue">
          <p>
            Trzy punkty są <strong>współliniowe</strong>, gdy wszystkie leżą na
            jednej prostej. Sprawdzamy to w dwóch krokach: wyznaczamy prostą
            przechodzącą przez dwa punkty, a następnie sprawdzamy, czy trzeci
            punkt na niej leży.
          </p>
        </RuleBox>

        <RuleBox title="Jak wyznaczyć prostą przez dwa punkty A i B?" color="purple">
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Oblicz współczynnik kierunkowy:
              <div className="mt-1"><Mb>{"a_{AB} = \\frac{y_B - y_A}{x_B - x_A}"}</Mb></div>
            </li>
            <li>
              Prosta ma postać <Mi>{"y = a_{AB} \\cdot x + b"}</Mi>. Podstaw
              punkt <strong>A</strong> (lub B) i rozwiąż równanie na <Mi>{"b"}</Mi>.
            </li>
          </ol>
        </RuleBox>

        <WorkedExample
          title="Czy A(1, 3), B(3, 7), C(5, 11) są współliniowe?"
          steps={[
            {
              label: "Wyznacz współczynnik kierunkowy prostej AB",
              content: (
                <span>
                  <Mi>
                    {"a_{AB} = \\frac{y_B - y_A}{x_B - x_A} = \\frac{7 - 3}{3 - 1} = \\frac{4}{2} = 2"}
                  </Mi>
                </span>
              ),
              formula: <Mi>{"a_{AB} = 2"}</Mi>,
            },
            {
              label: "Wyznacz wyraz wolny b",
              content: (
                <span>
                  Prosta ma postać <Mi>{"y = 2x + b"}</Mi>. Podstaw A(1, 3):<br />
                  <Mi>{"3 = 2 \\cdot 1 + b \\Rightarrow b = 3 - 2 = 1"}</Mi>.<br />
                  Prosta AB: <strong><Mi>{"y = 2x + 1"}</Mi></strong>.
                </span>
              ),
              hint: "Sprawdź: podstaw B → 7 = 2·3 + 1 = 7. Dobrze, obliczenia się zgadzają.",
            },
            {
              label: "Sprawdź punkt C(5, 11)",
              content: (
                <span>
                  Podstaw <Mi>{"x_C = 5"}</Mi>:{" "}
                  <Mi>{"y = 2 \\cdot 5 + 1 = 11"}</Mi>.<br />
                  Wynik: <Mi>{"11"}</Mi>, a <Mi>{"y_C = 11"}</Mi>. Równe.
                </span>
              ),
            },
            {
              label: "Wniosek",
              content: (
                <span>
                  <strong>TAK</strong>, punkty A, B i C są współliniowe.
                </span>
              ),
            },
          ]}
        />

        <WorkedExample
          title="Czy A(0, 1), B(2, 5), C(3, 9) są współliniowe?"
          steps={[
            {
              label: "Wyznacz prostą AB",
              content: (
                <span>
                  <Mi>{"a_{AB} = \\frac{5 - 1}{2 - 0} = 2"}</Mi>.<br />
                  Prosta: <Mi>{"y = 2x + b"}</Mi>. Podstaw A(0, 1):{" "}
                  <Mi>{"1 = 2 \\cdot 0 + b \\Rightarrow b = 1"}</Mi>.<br />
                  Prosta AB: <Mi>{"y = 2x + 1"}</Mi>.
                </span>
              ),
            },
            {
              label: "Sprawdź punkt C(3, 9)",
              content: (
                <span>
                  Podstaw <Mi>{"x = 3"}</Mi>:{" "}
                  <Mi>{"y = 2 \\cdot 3 + 1 = 7"}</Mi>.<br />
                  Ale <Mi>{"y_C = 9 \\neq 7"}</Mi>. Punkt C nie leży na prostej AB.
                </span>
              ),
            },
            {
              label: "Wniosek",
              content: (
                <span>
                  <strong>NIE</strong>, punkty A, B i C nie są współliniowe.
                </span>
              ),
            },
          ]}
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <ExerciseCard
            number="1"
            question="Czy A(0, 2), B(1, 4), C(3, 8) są współliniowe?"
            answer={
              <span>
                <Mi>{"a_{AB} = 2"}</Mi>. Prosta: <Mi>{"y = 2x + b"}</Mi>. Podstaw A(0, 2):{" "}
                <Mi>{"2 = 0 + b \\Rightarrow b = 2"}</Mi>. Prosta AB: <Mi>{"y = 2x + 2"}</Mi>.<br />
                Dla C: <Mi>{"2 \\cdot 3 + 2 = 8 = y_C"}</Mi>. <strong>TAK.</strong>
              </span>
            }
          />
          <ExerciseCard
            number="2"
            question="Czy A(1, 1), B(3, 5), C(4, 8) są współliniowe?"
            answer={
              <span>
                <Mi>{"a_{AB} = 2"}</Mi>. Prosta: <Mi>{"y = 2x + b"}</Mi>. Podstaw A(1, 1):{" "}
                <Mi>{"1 = 2 + b \\Rightarrow b = -1"}</Mi>. Prosta AB: <Mi>{"y = 2x - 1"}</Mi>.<br />
                Dla C: <Mi>{"2 \\cdot 4 - 1 = 7 \\neq 8"}</Mi>. <strong>NIE.</strong>
              </span>
            }
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SCHEMAT 7 – RÓWNANIE OGÓLNE PROSTEJ
        ══════════════════════════════════════════════════════════ */}
        <SectionHead
          id="ogolne"
          eyebrow="Schemat 7"
          title="Równanie ogólne prostej"
        />

        <p className="text-stone-600 leading-relaxed">
          Prosta nie zawsze jest podana w postaci <Mi>{"y = ax + b"}</Mi>. Ogólne
          równanie prostej ma postać <Mi>{"Ax + By + C = 0"}</Mi>. Gdy{" "}
          <Mi>{"B \\neq 0"}</Mi>, możemy je przekształcić do postaci kierunkowej,
          izolując <Mi>{"y"}</Mi>.
        </p>

        <RuleBox title="Jak sprowadzić Ax + By + C = 0 do y = ax + b?" color="blue">
          <ol className="list-decimal ml-5 space-y-1">
            <li>
              Przenieś wyrazy z <Mi>{"x"}</Mi> i stałą na prawą stronę:{" "}
              <Mi>{"By = {-}Ax - C"}</Mi>.
            </li>
            <li>
              Podziel obie strony przez <Mi>{"B"}</Mi> (przy <Mi>{"B \\neq 0"}</Mi>):{" "}
              <Mi>{"y = -\\dfrac{A}{B}x - \\dfrac{C}{B}"}</Mi>.
            </li>
          </ol>
        </RuleBox>

        <WorkedExample
          title="Sprowadź 2x − 3y + 6 = 0 do postaci y = ax + b"
          steps={[
            {
              label: "Przenieś 2x i 6 na prawą stronę",
              content: (
                <span>
                  <Mi>{"2x - 3y + 6 = 0"}</Mi> →{" "}
                  <Mi>{"-3y = -2x - 6"}</Mi>
                </span>
              ),
              formula: <Mi>{"-3y = -2x - 6"}</Mi>,
            },
            {
              label: "Podziel obie strony przez −3",
              content: (
                <span>
                  <Mi>{"y = \\dfrac{-2x - 6}{-3} = \\dfrac{2}{3}x + 2"}</Mi>
                </span>
              ),
              formula: <Mi>{"y = \\dfrac{2}{3}x + 2"}</Mi>,
            },
            {
              label: "Odczytaj współczynniki",
              content: (
                <span>
                  <Mi>{"a = \\dfrac{2}{3}"}</Mi>, <Mi>{"b = 2"}</Mi>.
                </span>
              ),
            },
          ]}
        />

        <MultiExercise
          title="Sprowadź do postaci kierunkowej y = ax + b:"
          parts={[
            {
              question: <span><Mi>{"4x - 2y + 8 = 0"}</Mi></span>,
              answer: (
                <span>
                  <Mi>{"-2y = -4x - 8"}</Mi>, dzielimy przez <Mi>{"-2"}</Mi>:{" "}
                  <strong><Mi>{"y = 2x + 4"}</Mi></strong>.{" "}
                  <Mi>{"a = 2"}</Mi>, <Mi>{"b = 4"}</Mi>.
                </span>
              ),
            },
            {
              question: <span><Mi>{"3x + 2y - 6 = 0"}</Mi></span>,
              answer: (
                <span>
                  <Mi>{"2y = -3x + 6"}</Mi>, dzielimy przez <Mi>{"2"}</Mi>:{" "}
                  <strong><Mi>{"y = -\\dfrac{3}{2}x + 3"}</Mi></strong>.{" "}
                  <Mi>{"a = -\\dfrac{3}{2}"}</Mi>, <Mi>{"b = 3"}</Mi>.
                </span>
              ),
            },
            {
              question: <span><Mi>{"-x + 4y + 4 = 0"}</Mi></span>,
              answer: (
                <span>
                  <Mi>{"4y = x - 4"}</Mi>, dzielimy przez <Mi>{"4"}</Mi>:{" "}
                  <strong><Mi>{"y = \\dfrac{1}{4}x - 1"}</Mi></strong>.{" "}
                  <Mi>{"a = \\dfrac{1}{4}"}</Mi>, <Mi>{"b = -1"}</Mi>.
                </span>
              ),
            },
          ]}
        />

        {/* ══════════════════════════════════════════════════════════
            SCHEMAT 8 – PROSTE POZIOME I PIONOWE
        ══════════════════════════════════════════════════════════ */}
        <SectionHead
          id="poziome-pionowe"
          eyebrow="Schemat 8"
          title="Proste poziome i pionowe"
        />

        <p className="text-stone-600 leading-relaxed">
          Dwa szczególne przypadki prostych nie mieszczą się w schemacie{" "}
          <Mi>{"y = ax + b"}</Mi>. Pojawiają się często przy opisywaniu boków figur
          geometrycznych.
        </p>

        <RuleBox title="Równania prostych szczególnych" color="blue">
          <div className="space-y-2">
            <p>
              <strong><Mi>{"y = c"}</Mi></strong> to prosta <strong>pozioma</strong>,
              równoległa do osi OX (funkcja stała, <Mi>{"a = 0"}</Mi>).
            </p>
            <p>
              <strong><Mi>{"x = c"}</Mi></strong> to prosta <strong>pionowa</strong>,
              równoległa do osi OY. <strong>Nie jest funkcją</strong>: każdemu{" "}
              <Mi>{"x = c"}</Mi> odpowiadają wszystkie wartości y.
            </p>
          </div>
        </RuleBox>

        {/* WE1 — prostokąt */}
        <WorkedExample
          title="Prostokąt ABCD: A(1,1), B(5,1), C(5,4), D(1,4). Wyznacz równania boków."
          steps={[
            {
              label: "Narysuj prostokąt",
              content: <span>Zaznacz wierzchołki i połącz je bokami.</span>,
              diagram: (
                <PolygonDiagram
                  vertices={[
                    { x: 1, y: 1, label: "A(1,1)", dx: -4, dy: 12, anchor: "end" },
                    { x: 5, y: 1, label: "B(5,1)", dx: 5, dy: 12 },
                    { x: 5, y: 4, label: "C(5,4)", dx: 5, dy: -4 },
                    { x: 1, y: 4, label: "D(1,4)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[0, 6]}
                  yRange={[0, 5]}
                />
              ),
            },
            {
              label: "Boki poziome AB i CD",
              content: (
                <span>
                  A(1,1) i B(5,1) mają tę samą y-współrzędną →{" "}
                  <strong>AB: <Mi>{"y = 1"}</Mi></strong>.<br />
                  C(5,4) i D(1,4) mają tę samą y-współrzędną →{" "}
                  <strong>CD: <Mi>{"y = 4"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Boki pionowe BC i DA",
              content: (
                <span>
                  B(5,1) i C(5,4) mają tę samą x-współrzędną →{" "}
                  <strong>BC: <Mi>{"x = 5"}</Mi></strong>.<br />
                  D(1,4) i A(1,1) mają tę samą x-współrzędną →{" "}
                  <strong>DA: <Mi>{"x = 1"}</Mi></strong>.
                </span>
              ),
            },
          ]}
        />

        {/* WE2 — równoległobok */}
        <WorkedExample
          title="Równoległobok ABCD: A(0,0), B(4,0), C(6,3), D(2,3). Wyznacz równania boków."
          steps={[
            {
              label: "Narysuj równoległobok",
              content: <span>Zaznacz wierzchołki i połącz je bokami.</span>,
              diagram: (
                <PolygonDiagram
                  vertices={[
                    { x: 0, y: 0, label: "A(0,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 4, y: 0, label: "B(4,0)", dx: 5, dy: 12 },
                    { x: 6, y: 3, label: "C(6,3)", dx: 5, dy: -4 },
                    { x: 2, y: 3, label: "D(2,3)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-1, 7]}
                  yRange={[-1, 4]}
                />
              ),
            },
            {
              label: "Boki poziome AB i CD",
              content: (
                <span>
                  A(0,0) i B(4,0) mają <Mi>{"y = 0"}</Mi> →{" "}
                  <strong>AB: <Mi>{"y = 0"}</Mi></strong>.<br />
                  C(6,3) i D(2,3) mają <Mi>{"y = 3"}</Mi> →{" "}
                  <strong>CD: <Mi>{"y = 3"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Bok BC",
              content: (
                <span>
                  <Mi>{"a_{BC} = \\dfrac{3 - 0}{6 - 4} = \\dfrac{3}{2}"}</Mi>. Prosta:{" "}
                  <Mi>{"y = \\dfrac{3}{2}x + b"}</Mi>. Podstaw B(4, 0):{" "}
                  <Mi>{"0 = 6 + b \\Rightarrow b = -6"}</Mi>.<br />
                  <strong>BC: <Mi>{"y = \\dfrac{3}{2}x - 6"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Bok DA",
              content: (
                <span>
                  <Mi>{"a_{DA} = \\dfrac{3 - 0}{2 - 0} = \\dfrac{3}{2}"}</Mi>. Prosta:{" "}
                  <Mi>{"y = \\dfrac{3}{2}x + b"}</Mi>. Podstaw A(0, 0):{" "}
                  <Mi>{"0 = 0 + b \\Rightarrow b = 0"}</Mi>.<br />
                  <strong>DA: <Mi>{"y = \\dfrac{3}{2}x"}</Mi></strong>.
                </span>
              ),
              hint: "Sprawdź: BC ∥ DA, bo oba mają a = 3/2. AB ∥ CD, bo oba poziome. To potwierdza, że to równoległobok.",
            },
          ]}
        />

        {/* WE3 — trójkąt */}
        <WorkedExample
          title="Trójkąt ABC: A(0,0), B(6,0), C(2,4). Wyznacz równania boków."
          steps={[
            {
              label: "Narysuj trójkąt",
              content: <span>Zaznacz wierzchołki i połącz je bokami.</span>,
              diagram: (
                <PolygonDiagram
                  vertices={[
                    { x: 0, y: 0, label: "A(0,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 6, y: 0, label: "B(6,0)", dx: 5, dy: 12 },
                    { x: 2, y: 4, label: "C(2,4)", dx: 5, dy: -4 },
                  ]}
                  xRange={[-1, 7]}
                  yRange={[-1, 5]}
                />
              ),
            },
            {
              label: "Bok AB",
              content: (
                <span>
                  A(0,0) i B(6,0) mają <Mi>{"y = 0"}</Mi> →{" "}
                  <strong>AB: <Mi>{"y = 0"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Bok BC",
              content: (
                <span>
                  <Mi>{"a_{BC} = \\dfrac{4 - 0}{2 - 6} = -1"}</Mi>. Prosta:{" "}
                  <Mi>{"y = -x + b"}</Mi>. Podstaw B(6, 0):{" "}
                  <Mi>{"0 = -6 + b \\Rightarrow b = 6"}</Mi>.<br />
                  <strong>BC: <Mi>{"y = -x + 6"}</Mi></strong>.
                </span>
              ),
            },
            {
              label: "Bok CA",
              content: (
                <span>
                  <Mi>{"a_{CA} = \\dfrac{4 - 0}{2 - 0} = 2"}</Mi>. Prosta:{" "}
                  <Mi>{"y = 2x + b"}</Mi>. Podstaw A(0, 0):{" "}
                  <Mi>{"0 = 0 + b \\Rightarrow b = 0"}</Mi>.<br />
                  <strong>CA: <Mi>{"y = 2x"}</Mi></strong>.
                </span>
              ),
            },
          ]}
        />

        {/* Ćwiczenia — trójkąty */}
        <p className="text-stone-500 text-sm font-semibold mt-8 mb-2">Ćwiczenia: trójkąty</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ExerciseCard
            number="1"
            question={
              <span>
                Trójkąt <Mi>{"ABC"}</Mi>:{" "}
                <Mi>{"A(0,\\,0)"}</Mi>, <Mi>{"B(4,\\,0)"}</Mi>, <Mi>{"C(0,\\,3)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: 0, y: 0, label: "A(0,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 4, y: 0, label: "B(4,0)", dx: 5, dy: 12 },
                    { x: 0, y: 3, label: "C(0,3)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-1, 5]}
                  yRange={[-1, 4]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 0"}</Mi></div>
                  <div>
                    BC: <Mi>{"a = -\\dfrac{3}{4}"}</Mi>, podstaw B(4,0):{" "}
                    <Mi>{"b = 3"}</Mi> →{" "}
                    <strong><Mi>{"y = -\\dfrac{3}{4}x + 3"}</Mi></strong>
                  </div>
                  <div>CA: <Mi>{"x = 0"}</Mi></div>
                </div>
              </div>
            }
          />
          <ExerciseCard
            number="2"
            question={
              <span>
                Trójkąt <Mi>{"ABC"}</Mi>:{" "}
                <Mi>{"A(1,\\,1)"}</Mi>, <Mi>{"B(5,\\,1)"}</Mi>, <Mi>{"C(3,\\,5)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: 1, y: 1, label: "A(1,1)", dx: -4, dy: 12, anchor: "end" },
                    { x: 5, y: 1, label: "B(5,1)", dx: 5, dy: 12 },
                    { x: 3, y: 5, label: "C(3,5)", dx: 5, dy: -4 },
                  ]}
                  xRange={[0, 6]}
                  yRange={[0, 6]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 1"}</Mi></div>
                  <div>
                    BC: <Mi>{"a = -2"}</Mi>, podstaw B(5,1):{" "}
                    <Mi>{"b = 11"}</Mi> →{" "}
                    <strong><Mi>{"y = -2x + 11"}</Mi></strong>
                  </div>
                  <div>
                    CA: <Mi>{"a = 2"}</Mi>, podstaw A(1,1):{" "}
                    <Mi>{"b = -1"}</Mi> →{" "}
                    <strong><Mi>{"y = 2x - 1"}</Mi></strong>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Ćwiczenia — prostokąty */}
        <p className="text-stone-500 text-sm font-semibold mt-6 mb-2">Ćwiczenia: prostokąty</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ExerciseCard
            number="3"
            question={
              <span>
                Prostokąt <Mi>{"ABCD"}</Mi>:{" "}
                <Mi>{"A(0,\\,0)"}</Mi>, <Mi>{"B(4,\\,0)"}</Mi>,{" "}
                <Mi>{"C(4,\\,3)"}</Mi>, <Mi>{"D(0,\\,3)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: 0, y: 0, label: "A(0,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 4, y: 0, label: "B(4,0)", dx: 5, dy: 12 },
                    { x: 4, y: 3, label: "C(4,3)", dx: 5, dy: -4 },
                    { x: 0, y: 3, label: "D(0,3)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-1, 5]}
                  yRange={[-1, 4]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 0"}</Mi></div>
                  <div>BC: <Mi>{"x = 4"}</Mi></div>
                  <div>CD: <Mi>{"y = 3"}</Mi></div>
                  <div>DA: <Mi>{"x = 0"}</Mi></div>
                </div>
              </div>
            }
          />
          <ExerciseCard
            number="4"
            question={
              <span>
                Prostokąt <Mi>{"ABCD"}</Mi>:{" "}
                <Mi>{"A({-}1,\\,0)"}</Mi>, <Mi>{"B(3,\\,0)"}</Mi>,{" "}
                <Mi>{"C(3,\\,4)"}</Mi>, <Mi>{"D({-}1,\\,4)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: -1, y: 0, label: "A(-1,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 3, y: 0, label: "B(3,0)", dx: 5, dy: 12 },
                    { x: 3, y: 4, label: "C(3,4)", dx: 5, dy: -4 },
                    { x: -1, y: 4, label: "D(-1,4)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-2, 4]}
                  yRange={[-1, 5]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 0"}</Mi></div>
                  <div>BC: <Mi>{"x = 3"}</Mi></div>
                  <div>CD: <Mi>{"y = 4"}</Mi></div>
                  <div>DA: <Mi>{"x = -1"}</Mi></div>
                </div>
              </div>
            }
          />
        </div>

        {/* Ćwiczenia — równoległoboki */}
        <p className="text-stone-500 text-sm font-semibold mt-6 mb-2">Ćwiczenia: równoległoboki</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ExerciseCard
            number="5"
            question={
              <span>
                Równoległobok <Mi>{"ABCD"}</Mi>:{" "}
                <Mi>{"A(0,\\,0)"}</Mi>, <Mi>{"B(5,\\,0)"}</Mi>,{" "}
                <Mi>{"C(7,\\,3)"}</Mi>, <Mi>{"D(2,\\,3)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: 0, y: 0, label: "A(0,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 5, y: 0, label: "B(5,0)", dx: 5, dy: 12 },
                    { x: 7, y: 3, label: "C(7,3)", dx: 5, dy: -4 },
                    { x: 2, y: 3, label: "D(2,3)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-1, 8]}
                  yRange={[-1, 4]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 0"}</Mi></div>
                  <div>
                    BC: <Mi>{"a = \\dfrac{3}{2}"}</Mi>, podstaw B(5,0):{" "}
                    <Mi>{"b = -\\dfrac{15}{2}"}</Mi> →{" "}
                    <strong><Mi>{"y = \\dfrac{3}{2}x - \\dfrac{15}{2}"}</Mi></strong>
                  </div>
                  <div>CD: <Mi>{"y = 3"}</Mi></div>
                  <div>
                    DA: <Mi>{"a = \\dfrac{3}{2}"}</Mi>, podstaw A(0,0):{" "}
                    <Mi>{"b = 0"}</Mi> →{" "}
                    <strong><Mi>{"y = \\dfrac{3}{2}x"}</Mi></strong>
                  </div>
                </div>
              </div>
            }
          />
          <ExerciseCard
            number="6"
            question={
              <span>
                Równoległobok <Mi>{"ABCD"}</Mi>:{" "}
                <Mi>{"A(1,\\,0)"}</Mi>, <Mi>{"B(4,\\,0)"}</Mi>,{" "}
                <Mi>{"C(5,\\,3)"}</Mi>, <Mi>{"D(2,\\,3)"}</Mi>.{" "}
                Napisz równania prostych zawierających każdy bok.
              </span>
            }
            answer={
              <div>
                <PolygonDiagram
                  vertices={[
                    { x: 1, y: 0, label: "A(1,0)", dx: -4, dy: 12, anchor: "end" },
                    { x: 4, y: 0, label: "B(4,0)", dx: 5, dy: 12 },
                    { x: 5, y: 3, label: "C(5,3)", dx: 5, dy: -4 },
                    { x: 2, y: 3, label: "D(2,3)", dx: -4, dy: -4, anchor: "end" },
                  ]}
                  xRange={[0, 6]}
                  yRange={[-1, 4]}
                  className="mb-3"
                />
                <div className="space-y-0.5 text-xs">
                  <div>AB: <Mi>{"y = 0"}</Mi></div>
                  <div>
                    BC: <Mi>{"a = 3"}</Mi>, podstaw B(4,0):{" "}
                    <Mi>{"b = -12"}</Mi> →{" "}
                    <strong><Mi>{"y = 3x - 12"}</Mi></strong>
                  </div>
                  <div>CD: <Mi>{"y = 3"}</Mi></div>
                  <div>
                    DA: <Mi>{"a = 3"}</Mi>, podstaw A(1,0):{" "}
                    <Mi>{"b = -3"}</Mi> →{" "}
                    <strong><Mi>{"y = 3x - 3"}</Mi></strong>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SCHEMAT 9 – WIERZCHOLKI I POLA FIGUR
        ══════════════════════════════════════════════════════════ */}
        <SectionHead
          id="wierzcholki-figur"
          eyebrow="Schemat 9"
          title="Wyznaczanie wierzchołków i pól figur"
        />

        <p className="text-stone-600 leading-relaxed">
          Jeśli znamy równania prostych tworzących boki figury, możemy wyznaczyć
          wierzchołki, szukając miejsc, w których proste się przecinają. Każdy
          wierzchołek to przecięcie dwóch boków: przyrównujemy ich wzory do siebie,
          wyznaczamy x, a potem y. Na koniec rysujemy figurę i obliczamy jej pole.
        </p>

        <RuleBox title="Wzór na pole trójkąta (wzór Gaussa)" color="blue">
          <p>
            Dla wierzchołków{" "}
            <Mi>{"A(x_{A},\\ y_{A})"}</Mi>, <Mi>{"B(x_{B},\\ y_{B})"}</Mi>,{" "}
            <Mi>{"C(x_{C},\\ y_{C})"}</Mi>:
          </p>
          <div className="mt-2">
            <Mb>{"P = \\tfrac{1}{2}\\bigl|x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)\\bigr|"}</Mb>
          </div>
          <p className="text-sm text-stone-500 mt-1">
            Jeśli jeden bok jest poziomy, łatwiej:{" "}
            <Mi>{"P = \\tfrac{1}{2} \\cdot \\text{podstawa} \\cdot \\text{wysokość}"}</Mi>.
          </p>
        </RuleBox>

        <WorkedExample
          title={
            <span>
              Dane są proste:<br />
              <Mi>{"l_1\\colon x - 2y - 4 = 0"}</Mi><br />
              <Mi>{"l_2\\colon 3x + 4y - 28 = 0"}</Mi><br />
              <Mi>{"l_3\\colon x + 2 = 0"}</Mi><br />
              Zapisujemy je jak w ćwiczeniach ze Schematu 7, jeśli łatwiej:{" "}
              <Mi>{"l_1\\colon y = \\tfrac{1}{2}x - 2"}</Mi>,{" "}
              <Mi>{"l_2\\colon y = -\\tfrac{3}{4}x + 7"}</Mi>. Prosta{" "}
              <Mi>{"l_3"}</Mi> nie ma postaci{" "}
              <Mi>{"y = \\ldots"}</Mi> (jest pionowa).<br />
              Wyznacz wierzchołki trójkąta, narysuj go i oblicz pole.
            </span>
          }
          steps={[
            {
              label: "Punkt A: gdzie przecinają się l₁ i l₃?",
              content: (
                <span>
                  Na <Mi>{"l_3"}</Mi> mamy stale <Mi>{"x = -2"}</Mi>. Podstawiamy ten x
                  do równania <Mi>{"l_1"}</Mi>:
                  <Mi>{"{-}2 - 2y - 4 = 0"}</Mi>, więc <Mi>{"{-}2y = 6"}</Mi>,
                  <Mi>{"y = -3"}</Mi>.
                </span>
              ),
              formula: <Mi>{"A(-2,\\ {-}3)"}</Mi>,
            },
            {
              label: "Punkt B: gdzie przecinają się l₂ i l₃?",
              content: (
                <span>
                  Znowu <Mi>{"x = -2"}</Mi>. Do <Mi>{"l_2"}</Mi>:{" "}
                  <Mi>{"3(-2) + 4y - 28 = 0 \\Rightarrow{-}6 + 4y = 28 \\Rightarrow"}</Mi>{" "}
                  <Mi>{"4y = 34 \\Rightarrow y = \\tfrac{17}{2}"}</Mi>.
                </span>
              ),
              formula: <Mi>{"B\\left(-2,\\ \\tfrac{17}{2}\\right)"}</Mi>,
            },
            {
              label: "Punkt C: gdzie przecinają się l₁ i l₂?",
              content: (
                <span>
                  Przyrównujemy y z obu prostych (albo wstawiamy{" "}
                  <Mi>{"x = 2y + 4"}</Mi> z <Mi>{"l_1"}</Mi> do <Mi>{"l_2"}</Mi>). Otrzymujemy{" "}
                  <Mi>{"10y = 16 \\Rightarrow y = \\tfrac{8}{5},\\quad x = \\tfrac{36}{5}"}</Mi>.
                </span>
              ),
              formula: <Mi>{"C\\left(\\tfrac{36}{5},\\ \\tfrac{8}{5}\\right)"}</Mi>,
            },
            {
              label: "Narysuj trójkąt i oblicz pole",
              content: (
                <span>
                  Bok AB jest na prostej pionowej <Mi>{"x = {-}2"}</Mi>, więc łatwiej przez
                  podstawę i wysokość: podstawa{" "}
                  <Mi>{"|y_B-y_A| = \\tfrac{17}{2}-({-}3)=\\tfrac{23}{2}"}</Mi>, wysokość to
                  odległość <Mi>{"C"}</Mi> od tej prostej, czyli{" "}
                  <Mi>{"\\bigl|\\tfrac{36}{5}-({-}2)\\bigr|= \\tfrac{46}{5}"}</Mi>:
                  <br />
                  <Mi>{"P = \\tfrac{1}{2} \\cdot \\tfrac{23}{2} \\cdot \\tfrac{46}{5} = \\tfrac{529}{10}"}</Mi>.
                </span>
              ),
              formula: <Mi>{"P = \\tfrac{529}{10}"}</Mi>,
              diagram: (
                <PolygonDiagram
                  vertices={[
                    { x: -2, y: -3, label: "A(-2,-3)", dx: -6, dy: 12, anchor: "end" },
                    { x: -2, y: 8.5, label: "B(-2, 17/2)", dx: -8, dy: -4, anchor: "end" },
                    { x: 7.2, y: 1.6, label: "C(36/5, 8/5)", dx: 5, dy: 12 },
                  ]}
                  xRange={[-3, 10]}
                  yRange={[-4, 11]}
                  className="max-w-[280px]"
                />
              ),
            },
          ]}
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <ExerciseCard
            number="1"
            question={
              <span>
                Dane są proste:<br />
                <Mi>{"l_1\\colon y = 2x - 1"}</Mi><br />
                <Mi>{"l_2\\colon y = -x + 5"}</Mi><br />
                <Mi>{"l_3\\colon y = 1"}</Mi><br />
                Wyznacz wierzchołki trójkąta, narysuj go i oblicz pole.
              </span>
            }
            answer={
              <div>
                <div className="space-y-1 text-xs mb-2">
                  <div>
                    <strong>Punkt A</strong> (l₁ i l₃): <Mi>{"y=1"}</Mi>, więc{" "}
                    <Mi>{"2x-1=1 \\Rightarrow x=1"}</Mi>.{" "}
                    <strong><Mi>{"A(1,1)"}</Mi></strong>
                  </div>
                  <div>
                    <strong>Punkt B</strong> (l₂ i l₃): <Mi>{"y=1"}</Mi>, więc{" "}
                    <Mi>{"-x+5=1 \\Rightarrow x=4"}</Mi>.{" "}
                    <strong><Mi>{"B(4,1)"}</Mi></strong>
                  </div>
                  <div>
                    <strong>Punkt C</strong> (l₁ i l₂): <Mi>{"2x-1=-x+5 \\Rightarrow x=2,\\quad y=3"}</Mi>.{" "}
                    <strong><Mi>{"C(2,3)"}</Mi></strong>
                  </div>
                </div>
                <PolygonDiagram
                  vertices={[
                    { x: 1, y: 1, label: "A(1,1)", dx: -4, dy: 12, anchor: "end" },
                    { x: 4, y: 1, label: "B(4,1)", dx: 5, dy: 12 },
                    { x: 2, y: 3, label: "C(2,3)", dx: 5, dy: -4 },
                  ]}
                  xRange={[0, 5]}
                  yRange={[0, 4]}
                  className="mb-2"
                />
                <div className="text-xs">
                  Bok AB jest poziomy: podstawa <Mi>{"= 3"}</Mi>, wysokość{" "}
                  <Mi>{"= 2"}</Mi>.{" "}
                  <strong><Mi>{"P = \\tfrac{1}{2} \\cdot 3 \\cdot 2 = 3"}</Mi></strong>
                </div>
              </div>
            }
          />
          <ExerciseCard
            number="2"
            question={
              <span>
                Dane są proste:<br />
                <Mi>{"l_1\\colon 2x - y + 6 = 0"}</Mi><br />
                <Mi>{"l_2\\colon 3x - 4y + 4 = 0"}</Mi><br />
                <Mi>{"l_3\\colon y - 4 = 0"}</Mi><br />
                Wyznacz wierzchołki trójkąta, narysuj go i oblicz pole.
              </span>
            }
            answer={
              <div>
                <div className="space-y-1 text-xs mb-2">
                  <div>
                    Sprowadzamy do postaci kierunkowej:{" "}
                    <Mi>{"l_1\\colon y = 2x+6"}</Mi>,{" "}
                    <Mi>{"l_2\\colon y = \\tfrac{3}{4}x+1"}</Mi>,{" "}
                    <Mi>{"l_3\\colon y = 4"}</Mi>.
                  </div>
                  <div>
                    <strong>Punkt A</strong> (l₁ i l₃): <Mi>{"2x+6=4 \\Rightarrow x=-1"}</Mi>.{" "}
                    <strong><Mi>{"A(-1,4)"}</Mi></strong>
                  </div>
                  <div>
                    <strong>Punkt B</strong> (l₂ i l₃): <Mi>{"\\tfrac{3}{4}x+1=4 \\Rightarrow x=4"}</Mi>.{" "}
                    <strong><Mi>{"B(4,4)"}</Mi></strong>
                  </div>
                  <div>
                    <strong>Punkt C</strong> (l₁ i l₂): <Mi>{"2x+6=\\tfrac{3}{4}x+1 \\Rightarrow x=-4,\\quad y=-2"}</Mi>.{" "}
                    <strong><Mi>{"C(-4,-2)"}</Mi></strong>
                  </div>
                </div>
                <PolygonDiagram
                  vertices={[
                    { x: -1, y: 4, label: "A(-1,4)", dx: -4, dy: -4, anchor: "end" },
                    { x: 4, y: 4, label: "B(4,4)", dx: 5, dy: -4 },
                    { x: -4, y: -2, label: "C(-4,-2)", dx: -4, dy: 12, anchor: "end" },
                  ]}
                  xRange={[-5, 5]}
                  yRange={[-3, 5]}
                  className="mb-2"
                />
                <div className="text-xs">
                  Bok AB jest poziomy: podstawa <Mi>{"= 5"}</Mi>, wysokość{" "}
                  <Mi>{"= 6"}</Mi>.{" "}
                  <strong><Mi>{"P = \\tfrac{1}{2} \\cdot 5 \\cdot 6 = 15"}</Mi></strong>
                </div>
              </div>
            }
          />
        </div>

        <p className="text-stone-500 text-sm font-semibold mt-10 mb-2">Romb</p>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          W rombie dwie pary boków jest równoległych. Podaje się zwykle dwie proste przekątne
          przecinające się w środku figury oraz dwie równoległe proste na przeciwległych bokach.
          Każdy wierzchołek to przecięcie dwóch wskazanych prostych, tak jak przy trójkącie wyżej.
        </p>

        <WorkedExample
          title={
            <span>
              Przekątne rombu leżą na prostych:<br />
              <Mi>{"3x + 4y = 10"}</Mi><br />
              <Mi>{"4x - 3y = 5"}</Mi><br />
              dwa przeciwległe boki na prostych:<br />
              <Mi>{"x - 2y - 5 = 0"}</Mi><br />
              <Mi>{"x - 2y + 5 = 0"}</Mi>.<br />
              Wyznacz wierzchołki, nanieś krótki szkic rombu na układzie i zapisz równania dwóch pozostałych boków.
            </span>
          }
          steps={[
            {
              label: "Krok 1: przecięcie przekątnych",
              content: (
                <span>
                  Zestawiamy oba równania przekątnych naprzeciwko siebie i rozwiązujemy.
                  Otrzymany punkt jest środkiem symetrii rombu.
                </span>
              ),
              formula: <Mi>{"O(2,\\ 1)"}</Mi>,
            },
            {
              label: "Krok 2: dwa punkty przy pierwszej przekątnej",
              content: (
                <span>
                  Szukamy punktu wspólnego prostej <Mi>{"3x+4y=10"}</Mi> z{" "}
                  <Mi>{"x-2y-5=0"}</Mi> — podstawiamy albo wyrównujemy niewiadome.
                  Potem to samo dla tej samej przekątnej i drugiej prostej z pary
                  boków <Mi>{"x-2y+5=0"}</Mi>. Otrzymujesz{" "}
                  <Mi>{"\\left(4,\\;-\\tfrac{1}{2}\\right)"}</Mi> oraz{" "}
                  <Mi>{"\\left(0,\\;\\tfrac{5}{2}\\right)"}</Mi>.
                </span>
              ),
            },
            {
              label: "Krok 3: dwa punkty przy drugiej przekątnej",
              content: (
                <span>
                  Łączymy <Mi>{"4x-3y=5"}</Mi> z <Mi>{"x-2y-5=0"}</Mi> oraz z{" "}
                  <Mi>{"x-2y+5=0"}</Mi>. Wychodzi <Mi>{"(-1,\\;-3)"}</Mi> i{" "}
                  <Mi>{"(5,\\;5)"}</Mi>.
                </span>
              ),
            },
            {
              label: "Krok 4: dwa brakujące boki",
              content: (
                <span>
                  Łączysz dwa sąsiednie wierzchołki, które nie leżą na tej samej
                  prostej z pary <Mi>{"x-2y=\\pm5"}</Mi>, i zapisujesz prostą.
                  Potem rownoległą prostą przez drugą parę wierzchołków. W tym
                  zadaniu wychodzi para <Mi>{"11x - 2y - 45 = 0"}</Mi> oraz{" "}
                  <Mi>{"11x - 2y + 5 = 0"}</Mi>.
                </span>
              ),
              diagram: (
                <PolygonDiagram
                  vertices={[
                    { x: -1, y: -3, label: "(-1,-3)", dx: -18, dy: 12, anchor: "end" },
                    { x: 4, y: -0.5, label: "(4, -½)", dx: 5, dy: 12 },
                    { x: 5, y: 5, label: "(5,5)", dx: 6, dy: -4 },
                    { x: 0, y: 2.5, label: "(0, 5/2)", dx: -22, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-2, 7]}
                  yRange={[-4, 6]}
                  className="max-w-[280px]"
                />
              ),
            },
          ]}
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <ExerciseCard
            number="R1"
            question={
              <span>
                Te same dane co w przykładzie (przekątne i para równoległych
                boków). Powtórz samodzielnie: wierzchołki, szkic, dwa pozostałe
                boki.
              </span>
            }
            answer={
              <div className="text-xs space-y-1">
                <div>
                  Środek <Mi>{"O(2,1)"}</Mi>. Wierzchołki:{" "}
                  <Mi>{"\\left(4,-\\tfrac{1}{2}\\right)"}</Mi>,{" "}
                  <Mi>{"\\left(0,\\tfrac{5}{2}\\right)"}</Mi>,{" "}
                  <Mi>{"(-1,-3)"}</Mi>, <Mi>{"(5,5)"}</Mi>.
                </div>
                <div>
                  Pozostałe boki: <Mi>{"11x - 2y - 45 = 0"}</Mi>,{" "}
                  <Mi>{"11x - 2y + 5 = 0"}</Mi>.
                </div>
                <PolygonDiagram
                  vertices={[
                    { x: -1, y: -3, label: "A", dx: -6, dy: 12, anchor: "end" },
                    { x: 4, y: -0.5, label: "B", dx: 5, dy: 12 },
                    { x: 5, y: 5, label: "C", dx: 6, dy: -4 },
                    { x: 0, y: 2.5, label: "D", dx: -10, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-2, 7]}
                  yRange={[-4, 6]}
                  className="mt-2 max-w-[240px]"
                />
              </div>
            }
          />
          <ExerciseCard
            number="R2"
            question={
              <span>
                Przekątne:<br />
                <Mi>{"3x + 4y = 0"}</Mi><br />
                <Mi>{"4x - 3y = 0"}</Mi><br />
                Przeciwległe boki:<br />
                <Mi>{"x - 2y - 5 = 0"}</Mi><br />
                <Mi>{"x - 2y + 5 = 0"}</Mi>.<br />
                Wyznacz wierzchołki, równania dwóch pozostałych boków i pole rombu
                (pole rombu to połowa iloczynu długości przekątnych).
              </span>
            }
            answer={
              <div className="text-xs space-y-1">
                <div>
                  Środek <Mi>{"O(0,0)"}</Mi>. Wierzchołki:{" "}
                  <Mi>{"(2,\\;-\\tfrac{3}{2})"}</Mi>,{" "}
                  <Mi>{"(-2,\\;\\tfrac{3}{2})"}</Mi>, <Mi>{"(-3,\\;-4)"}</Mi>,{" "}
                  <Mi>{"(3,\\;4)"}</Mi>.
                </div>
                <div>
                  Pozostałe boki: <Mi>{"11x - 2y - 25 = 0"}</Mi>,{" "}
                  <Mi>{"11x - 2y + 25 = 0"}</Mi>.
                </div>
                <div>
                  Przekątne mają długości <Mi>{"5"}</Mi> i <Mi>{"10"}</Mi>, więc{" "}
                  <Mi>{"P = \\tfrac{1}{2} \\cdot 5 \\cdot 10 = 25"}</Mi>.
                </div>
                <PolygonDiagram
                  vertices={[
                    { x: -3, y: -4, label: "A", dx: -6, dy: 12, anchor: "end" },
                    { x: 2, y: -1.5, label: "B", dx: 5, dy: 12 },
                    { x: 3, y: 4, label: "C", dx: 6, dy: -4 },
                    { x: -2, y: 1.5, label: "D", dx: -10, dy: -4, anchor: "end" },
                  ]}
                  xRange={[-4, 5]}
                  yRange={[-5, 5]}
                  className="mt-2 max-w-[240px]"
                />
              </div>
            }
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SCHEMAT 10 – ROWNOLGLOSC I PROSTOPADLOSC
        ══════════════════════════════════════════════════════════ */}
        <SectionHead
          id="rownol-prostop"
          eyebrow="Schemat 10"
          title="Równoległość i prostopadłość prostych"
        />

        <p className="text-stone-600 leading-relaxed">
          W postaci kierunkowej <Mi>{"y = ax + b"}</Mi> proste są ze sobą{" "}
          <strong>równoległe</strong>, jeśli mają ten sam współczynnik kierunkowy <Mi>{"a"}</Mi>. Są{" "}
          <strong>prostopadłe</strong>, jeśli jedna ma współczynnik{" "}
          <Mi>{"a"}</Mi>, a druga <Mi>{"{-}\\frac{1}{a}"}</Mi>, o ile{" "}
          <Mi>{"a \\neq 0"}</Mi>. Gdy dana prosta jest pozioma{" "}
          <Mi>{"y = \\text{stała }(a = 0)"}</Mi>, prostopadła do niej jest prosta pionowa o równaniu <Mi>{"x = \\text{stała}"}</Mi>.
          Gdy dana prosta jest pionowa <Mi>{"x = \\text{stała }(a = 0)"}</Mi>, równoległa do niej jest prosta pozioma o równaniu <Mi>{"y = \\text{stała}"}</Mi>.
        </p>

        <RuleBox title="Znajdź prostą równoległą lub prostopadłą do danej przechodzącą przez punkt P." color="purple">
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Zapisz daną prostą jako <Mi>{"y = ax + b"}</Mi> (jeśli jest w innej postaci,
              przekształć).
            </li>
            <li>
              <strong>Równoległa przez</strong> <Mi>{"P(x_0,\\ y_0)"}</Mi>: ta sama wartość{" "}
              <Mi>{"a"}</Mi>, prosta ma postać <Mi>{"y = ax + b'"}</Mi>.
              Podstaw <Mi>{"x_0"}</Mi> i <Mi>{"y_0"}</Mi> i policz <Mi>{"b'"}</Mi>.
            </li>
            <li>
              <strong>Prostopadła przez P</strong> (gdy{" "}
              <Mi>{"a \\neq 0"}</Mi>): wybierasz{" "}
              <Mi>{"a'' ={-}\\dfrac{1}{a}"}</Mi>. Znowu piszesz{" "}
              <Mi>{"y = a'' x + b''"}</Mi> i dobierasz{" "}
              <Mi>{"b''"}</Mi> tak, żeby spełniał punkt{" "}
              <Mi>{"P"}</Mi>.
            </li>
            <li className="text-sm text-stone-500">
              Gdy dana prosta jest pozioma (<Mi>{"y = b"}</Mi>), prostą równoległą dostajesz jako <Mi>{"y = y_0"}</Mi>, a prostopadłą jako{" "}
              <Mi>{"x = x_0"}</Mi>.
            </li>
            <li className="text-sm text-stone-500">
              Gdy dana jest pionowa (<Mi>{"x = c"}</Mi>), równoległą zapisujesz jako<Mi>{"x = x_0"}</Mi>, prostopadłą{" "}
              <Mi>{"y = y_0"}</Mi>.
            </li>
          </ol>
        </RuleBox>

        <WorkedExample
          title={
            <span>
              Dane: prosta k: <Mi>{"y = 2x - 1"}</Mi> oraz punkt{" "}
              <Mi>{"P(1,\\ 3)"}</Mi>. Znajdź prostą równoległą oraz prostą prostopadłą do k,
              obie przechodzące przez P.
            </span>
          }
          steps={[
            {
              label: "Równoległa do k przez P",
              content: (
                <span>
                  Mają mieć takie samo <Mi>{"a = 2"}</Mi>: <Mi>{"y = 2x + b'"}</Mi>.
                  Punkt{" "}<Mi>{"P(1,\\ 3)"}</Mi>:
                  <Mi>{"3 = 2 \\cdot 1 + b' \\Rightarrow b' = 1"}</Mi>.
                </span>
              ),
              formula: <Mi>{"y = 2x + 1"}</Mi>,
            },
            {
              label: "Prostopadła do k przez P",
              content: (
                <span>
                  Współczynnik: <Mi>{"a'' = {-}\\dfrac{1}{2}"}</Mi>, więc{" "}
                  <Mi>{"y ={-}\\dfrac{1}{2}x + b''"}</Mi>.
                  Podstaw <Mi>{"P"}</Mi>:{" "}
                  <Mi>{"3 = {-}\\dfrac{1}{2}\\cdot 1 + b'' \\Rightarrow b'' = \\dfrac{7}{2}"}</Mi>.
                </span>
              ),
              formula: <Mi>{"y = {-}\\dfrac{1}{2}x + \\dfrac{7}{2}"}</Mi>,
            },
            {
              label: "Rysunek",
              content: (
                <div className="text-sm text-stone-700 leading-relaxed space-y-2">
                  <p>
                    Kolory dopasujesz tak samo jak na rysunku poniżej. Przy każdej pozycji masz nazwę koloru, rolę w zadaniu oraz równanie prostej, której na wykresie odpowiada ten sam kolor:
                  </p>
                  <ul className="list-none space-y-1.5 pl-0 ml-1">
                    <li className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
                      <span className="font-semibold whitespace-nowrap" style={{ color: "#6d3a8e" }}>
                        Fioletowy
                      </span>
                      <span>
                        (<strong>dana prosta z polecenia</strong>, oznaczamy ją przez k):{" "}
                        <Mi>{"y = 2x - 1"}</Mi>
                      </span>
                    </li>
                    <li className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
                      <span className="font-semibold whitespace-nowrap" style={{ color: "#f97316" }}>
                        Pomarańczowy
                      </span>
                      <span>
                        (<strong>równoległa do k przez P</strong>):{" "}
                        <Mi>{"y = 2x + 1"}</Mi>
                      </span>
                    </li>
                    <li className="flex flex-wrap gap-x-2 gap-y-0.5 items-baseline">
                      <span className="font-semibold whitespace-nowrap" style={{ color: "#3b82f6" }}>
                        Niebieski
                      </span>
                      <span>
                        (<strong>prostopadła do k przez P</strong>):{" "}
                        <Mi>{"y = {-}\\dfrac{1}{2}x + \\dfrac{7}{2}"}</Mi>
                      </span>
                    </li>
                  </ul>
                </div>
              ),
              diagram: (
                <div className="mt-3">
                  <ThreeLinesDiagram
                    id="ex-pp"
                    variant="slope"
                    a={2}
                    b={-1}
                    px={1}
                    py={3}
                    xRange={[-1, 4]}
                    yRange={[-1, 6]}
                  />
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center mt-4 text-xs text-stone-600 px-2">
                    <span className="inline-flex flex-wrap items-baseline gap-2 gap-y-1">
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="inline-block w-8 h-[3px] rounded-sm shrink-0" style={{ background: "#6d3a8e" }} />
                        <strong className="text-stone-700">k:</strong>
                      </span>
                      <Mi>{"y = 2x - 1"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap items-baseline gap-2 gap-y-1">
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="inline-block w-8 h-[3px] rounded-sm shrink-0" style={{ background: "#f97316" }} />
                        <strong className="text-stone-700">równoległa:</strong>
                      </span>
                      <Mi>{"y = 2x + 1"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap items-baseline gap-2 gap-y-1">
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="inline-block w-8 h-[3px] rounded-sm shrink-0" style={{ background: "#3b82f6" }} />
                        <strong className="text-stone-700">prostopadła:</strong>
                      </span>
                      <Mi>{"y = {-}\\dfrac{1}{2}x + \\dfrac{7}{2}"}</Mi>
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <WorkedExample
          title={
            <span>
              <strong>Przypadek prostej poziomej:</strong> prosta k ma równanie{" "}
              <Mi>{"y = 2"}</Mi>, punkt{" "}
              <Mi>{"P(1,\\ 4)"}</Mi>. Znajdź prostą równoległą i prostą prostopadłą do k przechodzącą przez punkt P.
            </span>
          }
          steps={[
            {
              label: "Równoległa przez P",
              content: (
                <span>
                  Równoległa do poziomej jest znów pozioma, na wysokości y punktu P:{" "}
                  <Mi>{"y = 4"}</Mi>.
                </span>
              ),
              formula: <Mi>{"y = 4"}</Mi>,
            },
            {
              label: "Prostopadła przez P",
              content: (
                <span>
                  Prostopadła do poziomej jest <strong>pionowa</strong> i ma równanie{" "}
                  <Mi>{"x = 1"}</Mi> (takie samo x jak w punkcie P).
                </span>
              ),
              formula: <Mi>{"x = 1"}</Mi>,
            },
            {
              label: "Rysunek",
              content: (
                <div className="text-sm text-stone-700 space-y-2">
                  <ul className="list-none space-y-1 ml-1">
                    <li>
                      <span className="font-semibold" style={{ color: "#6d3a8e" }}>Fiolet</span>:
                      {" "}k: <Mi>{"y = 2"}</Mi>
                    </li>
                    <li>
                      <span className="font-semibold" style={{ color: "#f97316" }}>Pomarańcz</span>:
                      {" "}równoległa: <Mi>{"y = 4"}</Mi>
                    </li>
                    <li>
                      <span className="font-semibold" style={{ color: "#3b82f6" }}>Niebieski</span>:
                      {" "}prostopadła: <Mi>{"x = 1"}</Mi>
                    </li>
                  </ul>
                </div>
              ),
              diagram: (
                <div className="mt-3">
                  <ThreeLinesDiagram
                    id="ex-pp-h"
                    variant="horizontal"
                    b={2}
                    px={1}
                    py={4}
                    xRange={[-1, 4]}
                    yRange={[0, 6]}
                  />
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 justify-center mt-4 text-xs text-stone-600 px-2">
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#6d3a8e" }} />
                      <strong>k:</strong> <Mi>{"y = 2"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#f97316" }} />
                      <strong>równoległa:</strong> <Mi>{"y = 4"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#3b82f6" }} />
                      <strong>prostopadła:</strong> <Mi>{"x = 1"}</Mi>
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <WorkedExample
          title={
            <span>
              <strong>Przypadek prostej pionowej:</strong> prosta k ma równanie{" "}
              <Mi>{"x = 2"}</Mi>, punkt{" "}
              <Mi>{"P(4,\\ 1)"}</Mi>. Znajdź prostą równoległą i prostą prostopadłą do k przechodzącą przez punkt P.
            </span>
          }
          steps={[
            {
              label: "Równoległa przez P",
              content: (
                <span>
                  Równoległa do pionowej jest znów pionowa, na współrzędnej x punktu P:{" "}
                  <Mi>{"x = 4"}</Mi>.
                </span>
              ),
              formula: <Mi>{"x = 4"}</Mi>,
            },
            {
              label: "Prostopadła przez P",
              content: (
                <span>
                  Prostopadła do pionowej jest <strong>pozioma</strong>:{" "}
                  <Mi>{"y = 1"}</Mi>.
                </span>
              ),
              formula: <Mi>{"y = 1"}</Mi>,
            },
            {
              label: "Rysunek",
              content: (
                <div className="text-sm text-stone-700 space-y-2">
                  <ul className="list-none space-y-1 ml-1">
                    <li>
                      <span className="font-semibold" style={{ color: "#6d3a8e" }}>Fiolet</span>:
                      {" "}k: <Mi>{"x = 2"}</Mi>
                    </li>
                    <li>
                      <span className="font-semibold" style={{ color: "#f97316" }}>Pomarańcz</span>:
                      {" "}równoległa: <Mi>{"x = 4"}</Mi>
                    </li>
                    <li>
                      <span className="font-semibold" style={{ color: "#3b82f6" }}>Niebieski</span>:
                      {" "}prostopadła: <Mi>{"y = 1"}</Mi>
                    </li>
                  </ul>
                </div>
              ),
              diagram: (
                <div className="mt-3">
                  <ThreeLinesDiagram
                    id="ex-pp-v"
                    variant="vertical"
                    xv={2}
                    px={4}
                    py={1}
                    xRange={[0, 6]}
                    yRange={[-1, 4]}
                  />
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 justify-center mt-4 text-xs text-stone-600 px-2">
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#6d3a8e" }} />
                      <strong>k:</strong> <Mi>{"x = 2"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#f97316" }} />
                      <strong>równoległa:</strong> <Mi>{"x = 4"}</Mi>
                    </span>
                    <span className="inline-flex flex-wrap gap-2 items-baseline">
                      <span className="inline-block w-8 h-[3px] shrink-0 self-center rounded-sm" style={{ background: "#3b82f6" }} />
                      <strong>prostopadła:</strong> <Mi>{"y = 1"}</Mi>
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <MultiExercise
          title="Wyznacz prostą równoległą i prostopadłą do podanej prostej, obie przechodzące przez podany punkt:"
          parts={[
            {
              question: (
                <span>
                  <strong>a)</strong> <Mi>{"y = 3x - 5"}</Mi>, punkt{" "}
                  <Mi>{"P(2,\\;4)"}</Mi>
                </span>
              ),
              answer: (
                <span>
                  Równoległa: <strong><Mi>{"y = 3x - 2"}</Mi></strong>.
                  {" "}Prostopadła:{" "}<strong><Mi>{"y ={-}\\dfrac{1}{3}x + \\dfrac{14}{3}"}</Mi></strong>.
                </span>
              ),
            },
            {
              question: (
                <span>
                  <strong>b)</strong> <Mi>{"x - 2y + 4 = 0"}</Mi>, punkt{" "}
                  <Mi>{"P(0,\\ 0)"}</Mi>
                </span>
              ),
              answer: (
                <span>
                  Sprowadź do <Mi>{"y = \\tfrac{1}{2}x + 2"}</Mi>.
                  Równoległa:{" "}<strong><Mi>{"y = \\tfrac{1}{2}x"}</Mi></strong>.
                  Prostopadła: <strong><Mi>{"y = -2x"}</Mi></strong>.
                </span>
              ),
            },
            {
              question: (
                <span>
                  <strong>c)</strong> <Mi>{"y = 4"}</Mi>, punkt{" "}
                  <Mi>{"P({-}1,\\ 2)"}</Mi>
                </span>
              ),
              answer: (
                <span>
                  Równoległa poziomo:{" "}<strong><Mi>{"y = 2"}</Mi></strong>.
                  Prostopadła pionowo:{" "}<strong><Mi>{"x = -1"}</Mi></strong>.
                </span>
              ),
            },
          ]}
        />

        {/* ══════════════════════════════════════════════════════════
            SCHEMAT 11 – CWARTKI UKLADU WSPÓLRZEDNYCH
        ══════════════════════════════════════════════════════════ */}
        <SectionHead
          id="rozne-inne"
          eyebrow="Schemat 11"
          title="Ćwiartki układu współrzędnych"
        />

        <RuleBox title="Ćwiartki układu współrzędnych" color="blue">
          <p className="mb-4">
            Oś dodatnią <Mi>{"x"}</Mi> prowadzimy w prawo, oś dodatnią <Mi>{"y"}</Mi> w górę.
            Ćwiartki numeruje się od obszaru, gdzie obie współrzędne są dodatnie, i dalej w kierunku przeciwnym do ruchu wskazówek zegara:
          </p>
          <ul className="list-disc ml-5 space-y-1 mb-6">
            <li><strong>I</strong>: <Mi>{"x > 0"}</Mi>, <Mi>{"y > 0"}</Mi></li>
            <li><strong>II</strong>: <Mi>{"x < 0"}</Mi>, <Mi>{"y > 0"}</Mi></li>
            <li><strong>III</strong>: <Mi>{"x < 0"}</Mi>, <Mi>{"y < 0"}</Mi></li>
            <li><strong>IV</strong>: <Mi>{"x > 0"}</Mi>, <Mi>{"y < 0"}</Mi></li>
          </ul>
          <DiagramCwiartki />
        </RuleBox>

        <WorkedExample
          title={
            <span>
              Przez które ćwiartki <strong>przechodzi</strong> prosta <Mi>{"y = {-}x + 2"}</Mi>, a przez które{" "}
              <strong>nie przechodzi</strong>?
            </span>
          }
          steps={[
            {
              label: "Krok 1: wykonaj rysunek prostej i zaznacz ćwiartki",
              content: (
                <span>
                  Narysuj układ z osiami, nanieś prostą (np. przez przecięcia z osiami) i oznacz na rysunku ćwiartki{" "}
                  <strong>I–IV</strong>, tak jak w schemacie wyżej.
                </span>
              ),
              diagram: (
                <LineDiagram
                  id="cw-we-1"
                  a={-1}
                  b={2}
                  showQuadrants
                  xRange={[-3, 5]}
                  yRange={[-5, 6]}
                  pts={[
                    { x: 0, y: 2, label: "(0, 2)", dx: 7, dy: -8 },
                    { x: 2, y: 0, label: "(2, 0)", dx: 7, dy: 5 },
                  ]}
                  className="w-full max-w-[260px] mx-auto block"
                />
              ),
            },
            {
              label: "Krok 2: odpowiedź",
              content: (
                <span>
                  <strong>Przechodzi</strong> przez ćwiartki <strong>I, II i IV</strong>;{" "}
                  <strong>nie przechodzi</strong> przez <strong>III</strong>.
                </span>
              ),
            },
          ]}
        />

        <p className="text-stone-500 text-sm font-semibold mt-8 mb-2">
          Ćwiczenia (w rozwiązaniu: najpierw rysunek z ćwiartkami, potem odpowiedź słowna)
        </p>
        <div className="space-y-4">
          <ExerciseCard
            number={1}
            question={
              <span>
                Przez które ćwiartki przechodzi prosta z równania <Mi>{"y = 2x - 4"}</Mi>, a przez którą nie?
              </span>
            }
            answer={
              <div className="space-y-4 font-normal text-sm text-stone-700">
                <div>
                  <p className="font-semibold text-stone-800 mb-2">
                    Krok 1. Wykonaj rysunek prostej i zaznacz ćwiartki
                  </p>
                  <LineDiagram
                    id="ex-cw-a1"
                    a={2}
                    b={-4}
                    showQuadrants
                    xRange={[-2, 4]}
                    yRange={[-6, 2]}
                    pts={[
                      { x: 2, y: 0, label: "(2, 0)", dx: 7, dy: 5 },
                      { x: 0, y: -4, label: "(0, -4)", dx: 8, dy: -6 },
                    ]}
                    className="w-full max-w-[260px] mx-auto block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 mb-1">Krok 2. Odpowiedź</p>
                  <p className="font-semibold text-[#52297a]">
                    Przechodzi przez III, IV i I; nie przechodzi przez II.
                  </p>
                </div>
              </div>
            }
          />
          <ExerciseCard
            number={2}
            question={
              <span>
                Przez które ćwiartki przechodzi prosta z równania <Mi>{"y ={-}\\dfrac{1}{3}x + 1"}</Mi>, a przez którą nie?
              </span>
            }
            answer={
              <div className="space-y-4 font-normal text-sm text-stone-700">
                <div>
                  <p className="font-semibold text-stone-800 mb-2">
                    Krok 1. Wykonaj rysunek prostej i zaznacz ćwiartki
                  </p>
                  <LineDiagram
                    id="ex-cw-a2"
                    a={-1 / 3}
                    b={1}
                    showQuadrants
                    xRange={[-3, 6]}
                    yRange={[-3, 3]}
                    pts={[
                      { x: 0, y: 1, label: "(0, 1)", dx: 7, dy: -8 },
                      { x: 3, y: 0, label: "(3, 0)", dx: 7, dy: 5 },
                    ]}
                    className="w-full max-w-[260px] mx-auto block"
                  />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 mb-1">Krok 2. Odpowiedź</p>
                  <p className="font-semibold text-[#52297a]">
                    Przechodzi przez II, I i IV; nie przechodzi przez III.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Zadania w stylu maturalnym (jak na PR) */}
        <div className="mt-12">
          <SectionHead id={MATURA_SECTION_ID} eyebrow="Praktyka" title="Zadania maturalne" />
          <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-2xl">
            Poniżej zadania prowadzone jak na arkuszu maturalnym.
          </p>
          {maturaStyleTasks.length > 0 ? (
            <div className="space-y-12">
              {maturaStyleTasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          ) : (
            <p className="text-stone-400 text-sm italic">
              Treść zadań zostanie dodana.
            </p>
          )}
        </div>

        {/* Stopka */}
        <div className="mt-20 pt-10 border-t border-stone-200">
          <p className="text-stone-400 text-sm text-center">
            Masz pytania lub potrzebujesz więcej zadań?{" "}
            <Link href="/#kontakt" className="text-[#6d3a8e] hover:underline">
              Napisz do mnie.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
