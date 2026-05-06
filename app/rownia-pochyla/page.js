"use client";
import { useState } from "react";
import Link from "next/link";
import { InlineMath, BlockMath } from "react-katex";
import {
  ArrowLeft, ChevronRight, CheckCircle, RotateCcw,
  Eye, EyeOff, BookOpen, Lightbulb, Clock,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const Mi = ({ children }) => <InlineMath math={children} />;
const Mb = ({ children }) => <BlockMath math={children} />;

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

// ─── Shared UI components ────────────────────────────────────────────────────

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

const SectionHead = ({ id, eyebrow, title }) => (
  <div id={id} className="pt-4 pb-2 scroll-mt-20">
    <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-1">{eyebrow}</p>
    <h2 className="font-display text-2xl md:text-3xl text-stone-800">{title}</h2>
  </div>
);

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

const ComingSoon = ({ description }) => (
  <div className="mt-4 bg-stone-50 border border-dashed border-stone-200 rounded-2xl p-6 text-center">
    <Clock size={20} className="text-stone-300 mx-auto mb-2" />
    <p className="text-stone-400 text-sm">{description}</p>
  </div>
);

// ─── SVG diagrams ────────────────────────────────────────────────────────────
//
// Shared inclined plane geometry (α = 30° exactly):
//   viewBox "0 0 300 175"
//   Ground: y=158, x=10..290
//   Slope: A=(15,158) → C=(169,70), rise=88, run=154, tan(α)=88/154≈0.571→α≈30°
//   |AC| = sqrt(154²+88²) ≈ 177.5
//   slope_dir = (154/177.5, −88/177.5) ≈ (0.868, −0.496) ≈ (cos30°, −sin30°)
//   outward_normal = (−0.496, −0.868)   [away from slope surface]
//   Vertical: C=(169,70) → B=(169,158)
//   Block (half_w=15, half_h=9), center at slope 40%:
//     slope_pt = (15+0.4·154, 158−0.4·88) = (76.6, 122.8) ≈ (77, 123)
//     center = (77−9·0.496, 123−9·0.868) = (72.5, 115.2) ≈ (73, 115)
//     TR=(81,100)  TL=(55,115)  BL=(64,131)  BR=(90,116)

// Chapter 1: basic inclined plane with block and F_g
// Plane: A=(50,158) C=(204,70) B=(204,158), rise=88 run=154, α≈30°
// slope_dir=(0.866,−0.500)  into_slope=(0.500,0.866)  outward=(−0.500,−0.866)
// Block at 60% up slope; BL/BR on slope surface:
//   slope_pt=(142,105)  half_w=22  half_h=12
//   BL = slope_pt − slope_dir·22 = (123,116)  [on slope ✓ y=116.3]
//   BR = slope_pt + slope_dir·22 = (161, 94)  [on slope ✓ y=94.6]
//   TL = BL + outward·24         = (111, 95)  [above slope ✓]
//   TR = BR + outward·24         = (149, 73)  [above slope ✓]
//   centre=(136,95)
// F_g=60px down → (136,155)
// α label inside arc: bisector at 15° from horizontal, r≈26 → (75,151)
const DiagramRowniaPochyla = () => (
  <svg viewBox="0 0 300 175" className="w-full max-w-[320px] mx-auto block">
    <defs>
      {/* slim arrowhead: width=4, length=11, ratio 1:2.75 */}
      <marker id="rp-fg" markerWidth="12" markerHeight="4" refX="8" refY="2" orient="auto">
        <path d="M0,0 L0,4 L11,2 z" fill="#6d3a8e" />
      </marker>
    </defs>
    {/* Ground */}
    <line x1="10" y1="158" x2="290" y2="158" stroke="#cbd5e1" strokeWidth="1.5" />
    {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
      <line key={i} x1={22+i*22} y1="158" x2={10+i*22} y2="170" stroke="#e2e8f0" strokeWidth="1.3" />
    ))}
    {/* Inclined plane body */}
    <polygon points="50,158 204,70 204,158" fill="#f2ecfb" stroke="none" />
    {/* Slope edge */}
    <line x1="50" y1="158" x2="204" y2="70" stroke="#6d3a8e" strokeWidth="1.5" />
    {/* Vertical edge */}
    <line x1="204" y1="70" x2="204" y2="158" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Right angle at B=(204,158) */}
    <path d="M 197,158 L 197,151 L 204,151" fill="none" stroke="#94a3b8" strokeWidth="1" />
    {/* Angle arc at A=(50,158): r=35, label inside at bisector 15°, r≈26 → (75,151) */}
    <path d="M 85,158 A 35,35 0 0 0 80,141" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <SvgMi x={70} y={154} math="\alpha" fill="#f97316" fontSize={13} />
    {/* Block: TR(149,73) TL(111,95) BL(123,116) BR(161,94); bottom face ON slope */}
    <polygon points="149,73 111,95 123,116 161,94" fill="white" stroke="#6d3a8e" strokeWidth="1.5" />
    {/* F_g arrow: centre=(136,95) → (136,155), 60px */}
    <line x1="136" y1="95" x2="136" y2="153" stroke="#6d3a8e" strokeWidth="1.5" markerEnd="url(#rp-fg)" />
    <SvgMi x={140} y={127} math="F_g" fill="#6d3a8e" fontSize={13} />
    {/* Height label alongside vertical */}
    <line x1="211" y1="73" x2="211" y2="155" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
    <SvgMi x={214} y={115} math="h" fill="#94a3b8" fontSize={11} />
  </svg>
);

// Chapter 2: right triangle for trig recap (same as /wektory)
const DiagramTrygonometria = () => (
  <svg viewBox="0 0 185 148" className="w-full max-w-[200px] mx-auto block">
    {/* Hypotenuse c (orange) */}
    <line x1="20" y1="120" x2="145" y2="28" stroke="#f97316" strokeWidth="1.5" />
    {/* Base b (purple) */}
    <line x1="20" y1="120" x2="145" y2="120" stroke="#6d3a8e" strokeWidth="1.5" />
    {/* Height a (blue) */}
    <line x1="145" y1="120" x2="145" y2="28" stroke="#3b82f6" strokeWidth="1.5" />

    {/* Right angle at (145,120): kwadracik */}
    <polyline
      points="145,110 135,110 135,120"
      fill="none" stroke="#6b7280" strokeWidth="1.5"
    />

    {/* Angle α at (20,120): łuk od poziomej do przeciwprostokątnej */}
    <path
      d="M 46,120 A 26,26 0 0,0 40.9,104.6"
      fill="none" stroke="#374151" strokeWidth="1.5"
    />
    <SvgMi x={33} y={116} math="\alpha" fill="#374151" fontSize={13} />

    {/* Side labels */}
    <SvgMi x={64} y={62} math="c" fill="#f97316" fontSize={13} />
    <SvgMi x={81} y={138} math="b" fill="#6d3a8e" fontSize={13} anchor="middle" />
    <SvgMi x={150} y={80} math="a" fill="#3b82f6" fontSize={13} />
  </svg>
);

// Chapter 3: force decomposition (ENLARGED & CORRECTED, α≈30°)
// Same plane as Ch.1: A=(65,255) C=(273,135) B=(273,255), rise=120 run=208, |AC|≈240
// slope_dir=(0.866,−0.500)  into_slope=(0.500,0.866)  outward=(−0.500,−0.866)
//
// Block at 55% up slope (higher position):
//   slope_pt=(179,189)  half_w=22  half_h=12
//   BL = slope_pt − slope_dir·22 = (160,200)  [on slope ✓ y=200.2]
//   BR = slope_pt + slope_dir·22 = (198,178)  [on slope ✓ y=178.3]
//   TL = BL + outward·24        = (148,179)  [above slope ✓]
//   TR = BR + outward·24        = (186,157)  [above slope ✓]
//   centre = (173,179)
//
// Vectors (2× the previous version, 120px total):
//   F_g=120px down → F_g_end=(173,299)
//   S=60px (120·sin30°) down-slope (-0.866,+0.500)·60 → S_end=(121,209)
//   N=104px (120·cos30°) into-slope (+0.500,+0.866)·104 → N_end=(225,269)
//   S_vec+N_vec=(−52+52, 30+74)=(0,104)≠120... fix below
//
// Corrected: N_vec = into_slope · (120·cos30°) = (0.500,0.866)·104 = (52,90)
//   S_vec+N_vec=(−52+52, 30+90)=(0,120)=F_g_vec ✓  N_end=(173+52,179+90)=(225,269)
const DiagramRozkladSil = () => (
  <svg viewBox="0 0 380 330" className="w-full max-w-[420px] mx-auto block">
    <defs>
      {/* slim arrowheads: width=4, length=11, ratio 1:2.75 */}
      <marker id="rd-fg" markerWidth="12" markerHeight="4" refX="11" refY="2" orient="auto">
        <path d="M0,0 L0,4 L11,2 z" fill="#6d3a8e" />
      </marker>
      <marker id="rd-s" markerWidth="12" markerHeight="4" refX="11" refY="2" orient="auto">
        <path d="M0,0 L0,4 L11,2 z" fill="#f97316" />
      </marker>
      <marker id="rd-n" markerWidth="12" markerHeight="4" refX="11" refY="2" orient="auto">
        <path d="M0,0 L0,4 L11,2 z" fill="#3b82f6" />
      </marker>
    </defs>
    {/* Ground */}
    <line x1="10" y1="255" x2="370" y2="255" stroke="#cbd5e1" strokeWidth="1.5" />
    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
      <line key={i} x1={26+i*25} y1="255" x2={10+i*25} y2="269" stroke="#e2e8f0" strokeWidth="1.3" />
    ))}
    {/* Inclined plane body */}
    <polygon points="65,255 273,135 273,255" fill="#f2ecfb" stroke="none" />
    {/* Slope edge */}
    <line x1="65" y1="255" x2="273" y2="135" stroke="#6d3a8e" strokeWidth="1.5" />
    {/* Vertical edge */}
    <line x1="273" y1="135" x2="273" y2="255" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Right angle at B=(273,255) */}
    <path d="M 266,255 L 266,248 L 273,248" fill="none" stroke="#94a3b8" strokeWidth="1" />
    {/* Angle arc at A=(65,255): label inside angle at bisector 15°, r≈20 → (84,250) */}
    <path d="M 100,255 A 35,35 0 0 0 95,238" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <SvgMi x={84} y={251} math="\alpha" fill="#f97316" fontSize={13} />
    {/* Height dashed */}
    <line x1="280" y1="137" x2="280" y2="252" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
    <SvgMi x={283} y={196} math="h" fill="#94a3b8" fontSize={11} />
    {/* Block: TL(148,179) TR(186,157) BR(198,178) BL(160,200); bottom face ON slope */}
    <polygon points="148,179 186,157 198,178 160,200" fill="white" stroke="#6d3a8e" strokeWidth="1.5" />
    {/* F_g: straight down from centre (173,179) → (173,299) */}
    <line x1="173" y1="179" x2="173" y2="297" stroke="#6d3a8e" strokeWidth="1.5" markerEnd="url(#rd-fg)" />
    <SvgMi x={177} y={242} math="F_g" fill="#6d3a8e" fontSize={13} />
    {/* S: down-slope (173,179)→(121,209) */}
    <line x1="173" y1="179" x2="121" y2="209" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#rd-s)" />
    <SvgMi x={98} y={202} math="S" fill="#f97316" fontSize={14} />
    {/* N: into-slope (173,179)→(225,269) */}
    <line x1="173" y1="179" x2="225" y2="269" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#rd-n)" />
    <SvgMi x={226} y={221} math="N" fill="#3b82f6" fontSize={14} />
    {/* Dashed parallelogram closures */}
    <line x1="121" y1="209" x2="173" y2="299" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="5,3" />
    <line x1="225" y1="269" x2="173" y2="299" stroke="#f97316" strokeWidth="1.2" strokeDasharray="5,3" />
    {/* Angle α between F_g and N at F_g_end (173,299):
         r=22: arm up→(173,277), arm in -into_slope→(162,280)
         label inside angle at bisector (-0.259,−0.966)·12 → (170,287) */}
    <path d="M 172,263 A 22,22 0 0 0 155,270" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <SvgMi x={160} y={275} math="\alpha" fill="#f97316" fontSize={12} />
    {/* Angle α between F_g and N at F_g_end (173,299):
         r=22: arm up→(173,277), arm in -into_slope→(162,280)
         label inside angle at bisector (-0.259,−0.966)·12 → (170,287) */}
    <path d="M 192,213 A 22,22 0 0 1 174,218" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <SvgMi x={176} y={211} math="\alpha" fill="#f97316" fontSize={12} />
  
  </svg>
);

// ─── Table of contents ────────────────────────────────────────────────────────

const toc = [
  { id: "czym-jest",     label: "Czym jest równia pochyła?" },
  { id: "trygonometria", label: "Powtórka: trygonometria" },
  { id: "rozklad-sil",   label: "Rozkład siły grawitacji" },
  { id: "sila-normalna", label: "Siła reakcji" },
  { id: "bez-tarcia",    label: "Równia bez tarcia" },
  { id: "tarcie",        label: "Tarcie na równi" },
  { id: "ruch-w-dol",   label: "Ruch w dół z tarciem" },
  { id: "ruch-w-gore",   label: "Ruch w górę" },
  { id: "sila-zewn",     label: "Siła zewnętrzna" },
  { id: "bloczek",       label: "Układ z bloczkiem" },
  { id: "zadania",       label: "Zadania" },
];

// ─── Worked example data ─────────────────────────────────────────────────────

const exampleRozklad = [
  {
    label: "Zadanie",
    content: (
      <>
        Klocek o masie <strong>m = 3 kg</strong> leży na równi pochyłej nachylonej pod kątem{" "}
        <strong>α = 30°</strong> do poziomu. Oblicz siłę grawitacji oraz jej dwie składowe:
        składową wzdłuż zbocza S i składową nacisku N. Przyjmij g = 10 m/s².
      </>
    ),
    hint: "Najpierw oblicz ciężar F_g = m·g, a potem rozłóż: S = F_g·sinα, N = F_g·cosα.",
    formula: null,
  },
  {
    label: "Siła grawitacji",
    content: "Ciężar ciała działa pionowo w dół:",
    formula: <Mb>{"F_g = m \\cdot g = 3 \\cdot 10 = 30\\ \\text{N}"}</Mb>,
    hint: "F_g zawsze działa pionowo w dół, niezależnie od kąta nachylenia równi.",
  },
  {
    label: "Składowa S (wzdłuż zbocza)",
    content: (
      <>
        Składowa ciężaru równoległa do powierzchni, czyli „spadek", ciągnie ciało w dół zbocza:
      </>
    ),
    formula: <Mb>{"S = F_g \\cdot \\sin\\alpha = 30 \\cdot \\sin 30^\\circ = 30 \\cdot 0{,}5 = 15\\ \\text{N}"}</Mb>,
    hint: "sin30° = 0,5. Im większy kąt α, tym większy S i tym mocniej ciało chce ześlizgnąć się.",
  },
  {
    label: "Składowa nacisku N",
    content: (
      <>
        Składowa ciężaru prostopadła do zbocza: naciska na powierzchnię równi.
        Podłoże odpowiada siłą reakcji R = N.
      </>
    ),
    formula: <Mb>{"N = F_g \\cdot \\cos\\alpha = 30 \\cdot \\cos 30^\\circ = 30 \\cdot \\frac{\\sqrt{3}}{2} \\approx 26\\ \\text{N}"}</Mb>,
    hint: "cos30° = √3/2 ≈ 0,866. Im bardziej pionowa równia (większe α), tym mniejszy nacisk na powierzchnię.",
  },
  {
    label: "Sprawdzenie",
    content: "Twierdzenie Pitagorasa: składowe S i N muszą odtworzyć F_g:",
    formula: <Mb>{"\\sqrt{S^2 + N^2} = \\sqrt{15^2 + 26^2} = \\sqrt{225 + 676} = \\sqrt{901} \\approx 30\\ \\text{N}\\ \\checkmark"}</Mb>,
    hint: "√901 ≈ 30,02 ≈ 30 N. Małe odchylenie wynika z zaokrąglenia cos30°. Pitagoras to dobry sposób na sprawdzenie.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RowniaPochylaPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">

      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors">
            <ArrowLeft size={15} /> Powrót
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Materiały</span>
          <span className="text-stone-300">/</span>
          <span className="text-sm text-stone-600 font-medium">Równia pochyła</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="flex gap-12">

          {/* Sidebar TOC (desktop) */}
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

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-14">

            {/* Header */}
            <div>
              <p className="text-xs font-bold text-[#6d3a8e] uppercase tracking-widest mb-2">
                Materiały · Fizyka · LO
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">Równia pochyła</h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
                Teoria z przykładami krok po kroku i zadaniami do ćwiczenia dla różnych wariantów równi pochyłej: rozkład sił, siła reakcji,
                tarcie, ruch przyspieszony i opóźniony, siła zewnętrzna, układy z bloczkiem.
                
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

            {/* ── Rozdział 1 ── */}
            <section>
              <SectionHead id="czym-jest" eyebrow="Rozdział 1" title="Czym jest równia pochyła?" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Równia pochyła to pochylona, płaska powierzchnia, po której ciała mogą się ślizgać lub toczyć.
                Kąt nachylenia α decyduje o tym, jak silnie ciężar ciała „ciągnie" je w dół zbocza.
                To jeden z klasycznych układów w mechanice, bo w prosty sposób pokazuje rozkład sił.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-3">Przykłady z życia</p>
                  <ul className="space-y-1.5 text-sm text-stone-600">
                    {[
                      "Rampa dla wózków inwalidzkich",
                      "Zjeżdżalnia na placu zabaw",
                      "Stok narciarski lub saneczkowy",
                      "Podjazd dla samochodów (parking)",
                      "Dach domu",
                      "Rampa załadunkowa w magazynie",
                    ].map(ex => (
                      <li key={ex} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d3a8e] flex-shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#f2ecfb] border border-[#d4b8f0] rounded-2xl p-4">
                  <p className="text-xs font-bold text-[#52297a] uppercase tracking-wide mb-3">Kluczowe oznaczenia</p>
                  <div className="space-y-2 text-sm text-stone-700">
                    {[
                      { sym: "\\alpha", name: "Kąt nachylenia", desc: <>kąt między zboczem a poziomem</> },
                      { sym: "F_g",     name: "Ciężar ciała",   desc: <><Mi>{"F_g = m\\cdot g"}</Mi>{", pionowo w dół"}</> },
                      { sym: "S",       name: "Spadek",         desc: <>składowa <Mi>{"F_g"}</Mi> wzdłuż zbocza: <Mi>{"S = F_g\\sin\\alpha"}</Mi></> },
                      { sym: "N",       name: "Nacisk",         desc: <>składowa <Mi>{"F_g"}</Mi> prostopadle do zbocza: <Mi>{"N = F_g\\cos\\alpha"}</Mi></> },
                      { sym: "R",       name: "Siła reakcji",   desc: <>odpowiedź podłoża na nacisk <Mi>{"N"}</Mi>, prostopadła do zbocza, <Mi>{"R = N"}</Mi></> },
                      { sym: "T",       name: "Tarcie",         desc: <><Mi>{"T = \\mu\\cdot N"}</Mi>{", równolegle do zbocza"}</> },
                    ].map(item => (
                      <div key={item.name} className="flex items-start gap-2">
                        <span className="text-[#6d3a8e] min-w-[26px] text-xs mt-0.5 font-mono">
                          <InlineMath math={item.sym} />
                        </span>
                        <div>
                          <span className="font-semibold text-stone-800">{item.name}: </span>
                          <span className="text-stone-500">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 my-5">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
                  Schemat równi pochyłej
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <DiagramRowniaPochyla />
                  <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-2">
                    <p>
                      Równia pochyła to trójkąt: pochyłe zbocze (kąt <strong className="text-[#f97316]">α</strong> z poziomem),
                      poziome podłoże i pionowa ściana.
                    </p>
                    <p>
                      Na klocek leżący na zboczu działa ciężar <strong className="text-[#6d3a8e]"><Mi>{"F_g = m \\cdot g"}</Mi></strong>{" "}
                      skierowany pionowo w dół, niezależnie od tego, jak bardzo pochylona jest powierzchnia.
                    </p>
                    <p>
                      W kolejnych rozdziałach zobaczymy, jak rozbić ten pionowy ciężar na dwie składowe,
                      dopasowane do geometrii równi, i jak te składowe wpływają na ruch ciała.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Rozdział 2: Trygonometria ── */}
            <section>
              <SectionHead id="trygonometria" eyebrow="Rozdział 2" title="Powtórka: trygonometria" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-4">
                Rozkład sił na równi pochyłej opiera się na funkcjach trygonometrycznych. Szybka powtórka
                przed przejściem do fizyki.
              </p>

              <RuleBox title="Funkcje trygonometryczne w trójkącie prostokątnym" color="red">
                <p className="mb-3 text-sm">
                  Dla kąta α: przeciwprostokątna{" "}
                  <span className="text-[#f97316] font-semibold">c</span>,
                  podstawa (przyprostokątna przyległa){" "}
                  <span className="text-[#6d3a8e] font-semibold">b</span>,
                  bok naprzeciwko{" "}
                  <span className="text-[#3b82f6] font-semibold">a</span>:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <DiagramTrygonometria />
                  <div className="flex-1 text-sm space-y-2">
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\sin\\alpha = \\textcolor{#3b82f6}{a} / \\textcolor{#f97316}{c}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">bok naprzeciwko / przeciwprostokątna</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\cos\\alpha = \\textcolor{#6d3a8e}{b} / \\textcolor{#f97316}{c}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">podstawa / przeciwprostokątna</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\tan\\alpha = \\textcolor{#3b82f6}{a} / \\textcolor{#6d3a8e}{b}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">bok naprzeciwko / podstawa</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 border border-red-200">
                      <Mi>{"\\cot\\alpha = \\textcolor{#6d3a8e}{b} / \\textcolor{#3b82f6}{a}"}</Mi>
                      <span className="text-stone-400 ml-3 text-xs">podstawa / bok naprzeciwko</span>
                    </div>
                  </div>
                </div>
              </RuleBox>

              <h3 className="font-display text-lg text-stone-800 mt-6 mb-3">Wartości do zapamiętania</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                  <thead className="bg-[#f2ecfb] text-[#52297a]">
                    <tr>
                      <th className="px-3 py-3 font-semibold"><Mi>{"\\alpha"}</Mi></th>
                      {["30°","37°","45°","53°","60°"].map(a => (
                        <th key={a} className="px-3 py-3 font-semibold">{a}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-3 py-2.5 font-semibold text-[#6d3a8e]"><Mi>{"\\sin\\alpha"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{1}{2} = 0{,}5"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{3}{5} = 0{,}6"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{\\sqrt{2}}{2} \\approx 0{,}71"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{4}{5} = 0{,}8"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{\\sqrt{3}}{2} \\approx 0{,}87"}</Mi></td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="px-3 py-2.5 font-semibold text-[#6d3a8e]"><Mi>{"\\cos\\alpha"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{\\sqrt{3}}{2} \\approx 0{,}87"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{4}{5} = 0{,}8"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{\\sqrt{2}}{2} \\approx 0{,}71"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{3}{5} = 0{,}6"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{1}{2} = 0{,}5"}</Mi></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 font-semibold text-[#6d3a8e]"><Mi>{"\\tan\\alpha"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{\\sqrt{3}}{3} \\approx 0{,}58"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{3}{4} = 0{,}75"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"1"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\tfrac{4}{3} \\approx 1{,}33"}</Mi></td>
                      <td className="px-3 py-2.5"><Mi>{"\\sqrt{3} \\approx 1{,}73"}</Mi></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Rozdział 3: Rozkład sił ── */}
            <section>
              <SectionHead id="rozklad-sil" eyebrow="Rozdział 3" title="Rozkład siły grawitacji na składowe" />

              <p className="text-stone-600 text-base leading-relaxed mt-3 mb-2">
                Ciężar <Mi>{"F_g"}</Mi> zawsze działa pionowo w dół. Na równi pochyłej rozkładamy go
                na dwie prostopadłe składowe:
              </p>
              <ul className="list-disc pl-5 text-stone-600 text-base leading-relaxed space-y-1 mb-3 marker:text-stone-400">
                <li>
                  <strong>S</strong>: wzdłuż zbocza (ciągnie ciało w dół)
                </li>
                <li>
                  <strong>N</strong>: prostopadła do zbocza, naciskająca na powierzchnię
                </li>
              </ul>
              <p className="text-stone-600 text-base leading-relaxed mb-4">
                Podłoże odpowiada na ten nacisk siłą reakcji <strong>R = N</strong>. Rozkład sił to kluczowy krok w
                każdym zadaniu z równi pochyłej.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 my-5">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
                  Rozkład ciężaru na składowe S i N
                </p>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <DiagramRozkladSil />
                  <div className="flex-1 text-sm text-stone-600 leading-relaxed space-y-3">
                    <p>
                      Wektor <strong className="text-[#6d3a8e]"><Mi>{"F_g"}</Mi></strong> (fioletowy) działa pionowo w dół.
                      Rozkładamy go na dwa prostopadłe wektory:
                    </p>
                    <p>
                      <strong className="text-[#f97316]">S</strong> (pomarańczowy): składowa wzdłuż zbocza,
                      zwana „spadkiem". Ciągnie ciało w dół zbocza.
                    </p>
                    <p>
                      <strong className="text-[#3b82f6]">N</strong> (niebieski): składowa nacisku, prasuje prostopadle
                      w powierzchnię zbocza. Podłoże odpowiada siłą reakcji <strong>R&nbsp;=&nbsp;N</strong>.
                    </p>
                    <p className="text-stone-400 text-xs">
                      Przerywane linie zamykają równoległobok: <Mi>{"\\vec{S}+\\vec{N}=\\vec{F}_g"}</Mi>.
                      Mały łuk przy końcu <Mi>{"F_g"}</Mi> zaznacza kąt α między <Mi>{"F_g"}</Mi> a kierunkiem N.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-lg text-stone-800 mt-6 mb-2">Skąd sinα i cosα?</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">
                Kluczowe pytanie: dlaczego akurat sinα i cosα? Odpowiedź tkwi w podobieństwie kątów.
              </p>

              <RuleBox title="Geometria: dlaczego kąt = α" color="blue">
                <p>
                  Kąt nachylenia zbocza do poziomu wynosi α. Prostopadła do zbocza tworzy z pionem
                  taki sam kąt α. Dlaczego? Bo zbocze i pion są prostopadłe do odpowiednio:
                  poziomu i prostopadłej do zbocza. Kąty między nimi są równe (kąty naprzemianległe).
                </p>
                <p className="mt-2">
                  W trójkącie sił (F_g jako przeciwprostokątna) kąt przy wierzchołku F_g = α. Stąd:
                </p>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-sm text-center">
                  <div className="bg-white rounded-lg px-4 py-2 border border-blue-200">
                    bok naprzeciwko kąta α = S{" "}
                    <span className="text-stone-400 text-xs block">→ S = F_g · sinα</span>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 border border-blue-200">
                    bok przyległy do kąta α = N{" "}
                    <span className="text-stone-400 text-xs block">→ N = F_g · cosα</span>
                  </div>
                </div>
              </RuleBox>

              <RuleBox title="Wzory na składowe siły grawitacji">
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white rounded-xl px-4 py-3 border border-[#d4b8f0] text-center">
                    <p className="text-xs font-bold text-[#f97316] uppercase tracking-wide mb-1">S (wzdłuż zbocza)</p>
                    <Mb>{"S = F_g \\cdot \\sin\\alpha = m g \\sin\\alpha"}</Mb>
                    <p className="text-xs text-stone-400 mt-1">ciągnie ciało w dół zbocza</p>
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 border border-[#d4b8f0] text-center">
                    <p className="text-xs font-bold text-[#3b82f6] uppercase tracking-wide mb-1">N (nacisk, prostopadle)</p>
                    <Mb>{"N = F_g \\cdot \\cos\\alpha = m g \\cos\\alpha"}</Mb>
                    <p className="text-xs text-stone-400 mt-1">naciska prostopadle na zbocze; reakcja podłoża R = N</p>
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  Sprawdzenie (jedynka trygonometryczna):{" "}
                  <Mi>{"S^2 + N^2 = F_g^2(\\sin^2\\!\\alpha + \\cos^2\\!\\alpha) = F_g^2"}</Mi>{" "}
                  ✓
                </p>
              </RuleBox>

              <p className="text-stone-500 text-sm mt-4 mb-2">Przypadki graniczne:</p>
              <div className="space-y-2">
                {[
                  { a: "0^\\circ",  S: "F_g \\cdot 0 = 0",   N: "F_g \\cdot 1 = F_g", note: "poziome podłoże, ciało nie ślizga się, cały ciężar nacisku na podłożu" },
                  { a: "90^\\circ", S: "F_g \\cdot 1 = F_g", N: "F_g \\cdot 0 = 0",   note: "pionowa ściana, ciało spada swobodnie, brak nacisku na ścianę" },
                ].map(r => (
                  <div key={r.a} className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-sm text-sm flex flex-wrap gap-4 items-center">
                    <span className="font-semibold text-stone-700 min-w-[60px]"><Mi>{"\\alpha = " + r.a}</Mi></span>
                    <span className="text-[#f97316]"><Mi>{"S = " + r.S}</Mi></span>
                    <span className="text-[#3b82f6]"><Mi>{"N = " + r.N}</Mi></span>
                    <span className="text-stone-400 text-xs italic">{r.note}</span>
                  </div>
                ))}
              </div>

              <WorkedExample
                title="Przykład: Rozkład ciężaru na równi pochyłej"
                steps={exampleRozklad}
              />
            </section>

            {/* ── Rozdział 4: Siła reakcji ── */}
            <section>
              <SectionHead id="sila-normalna" eyebrow="Rozdział 4" title="Siła reakcji podłoża" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Siła reakcji R to odpowiedź podłoża na nacisk ciała, prostopadła do powierzchni zbocza.
                Jej wartość zależy od kąta α, masy ciała i ewentualnej dodatkowej siły prostopadłej
                do zbocza (np. dociskającej lub odrywającej). R wpływa bezpośrednio na siłę tarcia.
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: N = F_g·cosα, wpływ siły dodatkowej prostopadłej na N i R, a co za tym idzie na tarcie T = μ·N." />
            </section>

            {/* ── Rozdział 5: Bez tarcia ── */}
            <section>
              <SectionHead id="bez-tarcia" eyebrow="Rozdział 5" title="Równia bez tarcia" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Najprostszy przypadek: gładka (beztarciowa) powierzchnia. Jedyna siła wzdłuż zbocza
                to spadek S = m·g·sinα. Z II zasady dynamiki Newtona wyznaczamy przyspieszenie
                <Mi>{" a = g\\sin\\alpha"}</Mi>.
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: równanie Newtona, przyspieszenie, droga i czas ześlizgiwania, przykłady obliczeniowe." />
            </section>

            {/* ── Rozdział 6: Tarcie ── */}
            <section>
              <SectionHead id="tarcie" eyebrow="Rozdział 6" title="Tarcie na równi" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Tarcie statyczne i kinetyczne na pochyłej powierzchni. Kiedy ciało zaczyna się ślizgać?
                Warunek ześlizgnięcia, wzory na siłę tarcia i jej wpływ na ruch ciała po zboczu.
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: T = μ·N, tarcie statyczne i kinetyczne, warunek ześlizgnięcia (tanα > μs), tabela typowych wartości μ." />
            </section>

            {/* ── Rozdział 7: Ruch w dół ── */}
            <section>
              <SectionHead id="ruch-w-dol" eyebrow="Rozdział 7" title="Ruch przyspieszony w dół (z tarciem)" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Ciało ześlizguje się po równi z tarciem. Tarcie działa w górę zbocza (hamuje), S ciągnie
                w dół. Wypadkowa: <Mi>{"F_{wyp} = S - T = mg(\\sin\\alpha - \\mu\\cos\\alpha)"}</Mi>,
                skąd przyspieszenie <Mi>{"a = g(\\sin\\alpha - \\mu\\cos\\alpha)"}</Mi>.
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: równania Newtona dla ruchu w dół, przykład obliczeniowy, droga i czas ześlizgiwania." />
            </section>

            {/* ── Rozdział 8: Ruch w górę ── */}
            <section>
              <SectionHead id="ruch-w-gore" eyebrow="Rozdział 8" title="Ruch opóźniony (ciało jedzie w górę)" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Ciało wyrzucone w górę po równi: zarówno S jak i tarcie T działają w tym samym kierunku
                (oba hamują ciało). Przyspieszenie hamowania:{" "}
                <Mi>{"a = g(\\sin\\alpha + \\mu\\cos\\alpha)"}</Mi>.
                Ważne: przyspieszenie w górę jest większe niż przy ruchu w dół!
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: porównanie ruchu w górę i w dół, dlaczego a_góra ≠ a_dół, przykłady i zadania." />
            </section>

            {/* ── Rozdział 9: Siła zewnętrzna ── */}
            <section>
              <SectionHead id="sila-zewn" eyebrow="Rozdział 9" title="Siła zewnętrzna na równi" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Co się dzieje, gdy ktoś pcha lub ciągnie ciało? Siła zewnętrzna może być równoległa
                do zbocza, pozioma lub skierowana pod dowolnym kątem. Każdy przypadek inaczej wpływa
                na N (a więc i na tarcie T).
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: siłę równoległą do zbocza, siłę poziomą i pod kątem, jak zmienia się N i T w każdym przypadku." />
            </section>

            {/* ── Rozdział 10: Bloczek ── */}
            <section>
              <SectionHead id="bloczek" eyebrow="Rozdział 10" title="Układ z bloczkiem (ciała połączone liną)" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Klasyczny układ: ciało na równi połączone liną przez bloczek z ciałem wiszącym swobodnie.
                Równania Newtona piszemy dla każdego ciała osobno, a napięcie liny jest wspólne.
              </p>
              <ComingSoon description="Ten rozdział jest w przygotowaniu. Omówimy: warunki równowagi i ruchu układu, przykłady z tarciem i bez, wyznaczanie przyspieszenia i napięcia liny." />
            </section>

            {/* ── Rozdział 11: Zadania ── */}
            <section>
              <SectionHead id="zadania" eyebrow="Rozdział 11" title="Zadania do samodzielnego rozwiązania" />
              <p className="text-stone-600 text-base leading-relaxed mt-3">
                Zadania obejmujące wszystkie warianty z tego materiału. Rozwiąż na brudnopisie,
                a potem kliknij „Pokaż odpowiedź" i sprawdź wynik.
              </p>
              <ComingSoon description="Zestaw zadań jest w przygotowaniu. Pojawi się tu po opracowaniu wszystkich rozdziałów teorii." />
            </section>

            {/* CTA */}
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
