"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Wykres sin/cos (siatka szkolna: 1 kratka = π/6, 2 kratki = 1) ───
// Testowo: używany w rozwiązaniu równania sin 6x − 2 sin 2x = 0.
// Zakres z „oddechem”: u ∈ [−π/6, 13π/6], wartości ∈ [−3/2, 3/2].

/** Ułamek w stylu \frac{num}{den}; ujemny: −\frac{num}{den} (nie \frac{−num}{den}). */
const SvgFrac = ({
  x,
  y,
  num,
  den,
  fill = "#292524",
  fontSize = 10,
  negative = false,
}) => {
  const barW = Math.max(String(num).length, String(den).length) * fontSize * 0.62 + 5;
  const fracX = negative ? x + fontSize * 0.35 : x;
  return (
    <g>
      {negative && (
        <text
          x={fracX - barW / 2 - 2}
          y={y + fontSize * 0.35}
          fontSize={fontSize}
          textAnchor="end"
          fill={fill}
          fontWeight="700"
        >
          −
        </text>
      )}
      <text
        x={fracX}
        y={y - 3.5}
        fontSize={fontSize}
        textAnchor="middle"
        fill={fill}
        fontWeight="700"
      >
        {num}
      </text>
      <line
        x1={fracX - barW / 2}
        y1={y}
        x2={fracX + barW / 2}
        y2={y}
        stroke={fill}
        strokeWidth="1.35"
      />
      <text
        x={fracX}
        y={y + fontSize + 0.5}
        fontSize={fontSize}
        textAnchor="middle"
        fill={fill}
        fontWeight="700"
      >
        {den}
      </text>
    </g>
  );
};

const TrigGraph = ({ fn = "sin", points = [], yGuide = null, yGuideColor = "#f97316", ariaLabel }) => {
  const PI = Math.PI;
  const cell = 28;
  const uMin = -PI / 6;
  const uMax = (13 * PI) / 6;
  const yMin = -1.5;
  const yMax = 1.5;
  const cellsX = 14; // −π/6 … 13π/6
  const cellsY = 6; // −3/2 … 3/2
  const padL = 44;
  const padR = 28;
  const padT = 22;
  const padB = 38;
  const plotW = cellsX * cell;
  const plotH = cellsY * cell;
  const vbW = padL + plotW + padR;
  const vbH = padT + plotH + padB;

  const toX = (u) => padL + ((u - uMin) / (PI / 6)) * cell;
  const toY = (y) => padT + ((yMax - y) / 0.5) * cell;

  const axisX0 = toX(0);
  const axisY0 = toY(0);
  const plotLeft = padL;
  const plotRight = padL + plotW;
  const plotTop = padT;
  const plotBottom = padT + plotH;

  const samples = 200;
  let curve = "";
  for (let i = 0; i <= samples; i++) {
    const u = uMin + (i / samples) * (uMax - uMin);
    const y = fn === "sin" ? Math.sin(u) : Math.cos(u);
    curve += `${i === 0 ? "M" : "L"}${toX(u).toFixed(2)},${toY(y).toFixed(2)} `;
  }

  // 0 jest tylko przy osi wartości (sin/cos), nie pod początkiem osi u
  const uMajor = [
    { u: PI / 2, frac: { num: "π", den: "2" } },
    { u: PI, text: "π" },
    { u: (3 * PI) / 2, frac: { num: "3π", den: "2" } },
    { u: 2 * PI, text: "2π" },
  ];

  const yTicks = [
    { y: 1, text: "1" },
    { y: 0.5, frac: { num: "1", den: "2" } },
    { y: 0, text: "0" },
    { y: -0.5, frac: { num: "1", den: "2" }, negative: true },
    { y: -1, text: "−1" },
  ];

  const fnLabel = fn === "sin" ? "sin u" : "cos u";
  const gridMinor = "#d8ccec";
  const gridMajor = "#b9a3db";
  const labelFill = "#292524";

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className="w-full max-w-xl mx-auto my-3 block"
      aria-label={ariaLabel || `Wykres ${fnLabel}`}
    >
      {/* Siatka pionowa: co π/6; mocniejsza co π/2 */}
      {Array.from({ length: cellsX + 1 }, (_, i) => {
        const u = uMin + i * (PI / 6);
        const halfTurns = u / (PI / 2);
        const isMajor = Math.abs(halfTurns - Math.round(halfTurns)) < 1e-9;
        const x = plotLeft + i * cell;
        return (
          <line
            key={`vx-${i}`}
            x1={x}
            y1={plotTop}
            x2={x}
            y2={plotBottom}
            stroke={isMajor ? gridMajor : gridMinor}
            strokeWidth={isMajor ? 1.25 : 1.05}
          />
        );
      })}
      {/* Siatka pozioma: co 1/2; mocniejsza na y = 0, ±1 */}
      {Array.from({ length: cellsY + 1 }, (_, i) => {
        const y = yMax - i * 0.5;
        const isMajor = Math.abs(y) < 1e-9 || Math.abs(Math.abs(y) - 1) < 1e-9;
        const yy = plotTop + i * cell;
        return (
          <line
            key={`hy-${i}`}
            x1={plotLeft}
            y1={yy}
            x2={plotRight}
            y2={yy}
            stroke={isMajor ? gridMajor : gridMinor}
            strokeWidth={isMajor ? 1.25 : 1.05}
          />
        );
      })}

      {/* Linia pomocnicza y = const (np. 1/2) */}
      {yGuide != null && (
        <line
          x1={axisX0}
          y1={toY(yGuide)}
          x2={plotRight}
          y2={toY(yGuide)}
          stroke={yGuideColor}
          strokeWidth="1.4"
          strokeDasharray="5 4"
        />
      )}

      {/* Oś u od zera w prawo (lewy „room” bez osi); oś wartości przez u = 0 */}
      <line
        x1={axisX0}
        y1={axisY0}
        x2={plotRight + 10}
        y2={axisY0}
        stroke="#44403c"
        strokeWidth="1.6"
      />
      <polygon
        points={`${plotRight + 16},${axisY0} ${plotRight + 6},${axisY0 - 4} ${plotRight + 6},${axisY0 + 4}`}
        fill="#44403c"
      />
      <line
        x1={axisX0}
        y1={plotBottom + 4}
        x2={axisX0}
        y2={plotTop - 6}
        stroke="#44403c"
        strokeWidth="1.6"
      />
      <polygon
        points={`${axisX0},${plotTop - 12} ${axisX0 - 4},${plotTop - 2} ${axisX0 + 4},${plotTop - 2}`}
        fill="#44403c"
      />

      {/* Etykiety osi */}
      <text
        x={plotRight + 18}
        y={axisY0 + 14}
        fontSize="13"
        fill="#44403c"
        fontStyle="italic"
        fontWeight="700"
      >
        u
      </text>
      <text
        x={axisX0 + 8}
        y={plotTop - 2}
        fontSize="12"
        fill="#6d3a8e"
        fontStyle="italic"
        fontWeight="700"
      >
        {fnLabel}
      </text>

      {/* Podziałki osi u (co π/2; bez 0 — zero jest przy osi wartości) */}
      {uMajor.map(({ u, text, frac }) => (
        <g key={`u-${u}`}>
          <line
            x1={toX(u)}
            y1={axisY0 - 4}
            x2={toX(u)}
            y2={axisY0 + 4}
            stroke="#44403c"
            strokeWidth="1.4"
          />
          {frac ? (
            <SvgFrac x={toX(u)} y={axisY0 + 14} num={frac.num} den={frac.den} fill={labelFill} />
          ) : (
            <text
              x={toX(u)}
              y={axisY0 + 18}
              fontSize="11"
              textAnchor="middle"
              fill={labelFill}
              fontWeight="700"
            >
              {text}
            </text>
          )}
        </g>
      ))}

      {/* Podziałki osi wartości (w tym 0) */}
      {yTicks.map(({ y, text, frac, negative }) => (
        <g key={`y-${y}`}>
          <line
            x1={axisX0 - 4}
            y1={toY(y)}
            x2={axisX0 + 4}
            y2={toY(y)}
            stroke="#44403c"
            strokeWidth="1.4"
          />
          {frac ? (
            <SvgFrac
              x={axisX0 - (negative ? 18 : 16)}
              y={toY(y)}
              num={frac.num}
              den={frac.den}
              fill={labelFill}
              negative={negative}
            />
          ) : (
            <text
              x={axisX0 - 10}
              y={toY(y) + 4}
              fontSize="11"
              textAnchor="end"
              fill={labelFill}
              fontWeight="700"
            >
              {text}
            </text>
          )}
        </g>
      ))}

      {/* Krzywa */}
      <path d={curve.trim()} fill="none" stroke="#6d3a8e" strokeWidth="2.2" />

      {/* Zaznaczone punkty */}
      {points.map(({ u, y, frac, labelDy = 22, color = "#ea580c", labelColor }, idx) => {
        const x = toX(u);
        const py = toY(y);
        const textFill = labelColor || (color === "#ea580c" ? "#c2410c" : color);
        return (
          <g key={`pt-${idx}`}>
            <circle cx={x} cy={py} r="4.5" fill={color} stroke="#fff" strokeWidth="1.5" />
            {frac && (
              <SvgFrac
                x={x}
                y={py + labelDy}
                num={frac.num}
                den={frac.den}
                fill={textFill}
                fontSize={10}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Wykres tg u: u ∈ (−π/2, π/2), 1 kratka = π/6; tg ∈ [−3, 3], 2 kratki = 1.
 *  Ta sama skala kratki i czcionek co TrigGraph; na stronie mniejszy przez max-width. */
const TanGraph = ({ points = [], yGuide = null, ariaLabel }) => {
  const PI = Math.PI;
  const SQRT3 = Math.sqrt(3);
  const cell = 28;
  const uMin = -PI / 2;
  const uMax = PI / 2;
  const yMin = -3;
  const yMax = 3;
  const cellsX = 6; // −π/2 … π/2
  const cellsY = 12; // −3 … 3
  const padL = 44;
  const padR = 28;
  const padT = 22;
  const padB = 38;
  const plotW = cellsX * cell;
  const plotH = cellsY * cell;
  const vbW = padL + plotW + padR;
  const vbH = padT + plotH + padB;

  const toX = (u) => padL + ((u - uMin) / (PI / 6)) * cell;
  const toY = (y) => padT + ((yMax - y) / 0.5) * cell;

  const axisX0 = toX(0);
  const axisY0 = toY(0);
  const plotLeft = padL;
  const plotRight = padL + plotW;
  const plotTop = padT;
  const plotBottom = padT + plotH;

  // Krzywa bez asymptot: urywamy, gdy |tg| wychodzi poza widoczny zakres
  const samples = 160;
  const eps = 0.04;
  const segments = [];
  let d = "";
  let drawing = false;
  for (let i = 0; i <= samples; i++) {
    const u = uMin + eps + (i / samples) * (uMax - uMin - 2 * eps);
    const y = Math.tan(u);
    if (!Number.isFinite(y) || y < yMin - 0.15 || y > yMax + 0.15) {
      if (drawing) {
        segments.push(d.trim());
        d = "";
        drawing = false;
      }
      continue;
    }
    d += `${drawing ? "L" : "M"}${toX(u).toFixed(2)},${toY(y).toFixed(2)} `;
    drawing = true;
  }
  if (drawing) segments.push(d.trim());

  const uMajor = [
    { u: -PI / 2, frac: { num: "π", den: "2" }, negative: true },
    { u: -PI / 3, frac: { num: "π", den: "3" }, negative: true },
    { u: PI / 3, frac: { num: "π", den: "3" } },
    { u: PI / 2, frac: { num: "π", den: "2" } },
  ];

  const yTicks = [
    { y: 3, text: "3" },
    { y: 2, text: "2" },
    { y: 1, text: "1" },
    { y: 0, text: "0" },
    { y: -1, text: "−1" },
    { y: -2, text: "−2" },
    { y: -3, text: "−3" },
  ];

  const gridMinor = "#d8ccec";
  const gridMajor = "#b9a3db";
  const labelFill = "#292524";

  // Szerokość ≈ jak 6/14 szerokości TrigGraph (max-w-xl), żeby kratka i fonty
  // miały na ekranie tę samą skalę co sin/cos.
  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className="w-full max-w-[min(100%,18.5rem)] mx-auto my-3 block"
      aria-label={ariaLabel || "Wykres tg u"}
    >
      {/* Siatka pionowa: co π/6 */}
      {Array.from({ length: cellsX + 1 }, (_, i) => {
        const u = uMin + i * (PI / 6);
        const halfTurns = u / (PI / 2);
        const isMajor = Math.abs(halfTurns - Math.round(halfTurns)) < 1e-9;
        const x = plotLeft + i * cell;
        return (
          <line
            key={`vx-${i}`}
            x1={x}
            y1={plotTop}
            x2={x}
            y2={plotBottom}
            stroke={isMajor ? gridMajor : gridMinor}
            strokeWidth={isMajor ? 1.25 : 1.05}
          />
        );
      })}
      {/* Siatka pozioma: co 1/2; mocniejsza na całkowitych */}
      {Array.from({ length: cellsY + 1 }, (_, i) => {
        const y = yMax - i * 0.5;
        const isMajor = Math.abs(y - Math.round(y)) < 1e-9;
        const yy = plotTop + i * cell;
        return (
          <line
            key={`hy-${i}`}
            x1={plotLeft}
            y1={yy}
            x2={plotRight}
            y2={yy}
            stroke={isMajor ? gridMajor : gridMinor}
            strokeWidth={isMajor ? 1.25 : 1.05}
          />
        );
      })}

      {/* Asymptoty u = ±π/2 */}
      <line
        x1={toX(-PI / 2)}
        y1={plotTop}
        x2={toX(-PI / 2)}
        y2={plotBottom}
        stroke="#78716c"
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <line
        x1={toX(PI / 2)}
        y1={plotTop}
        x2={toX(PI / 2)}
        y2={plotBottom}
        stroke="#78716c"
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />

      {/* Poziomica y = const (np. −√3) */}
      {yGuide != null && (
        <line
          x1={plotLeft}
          y1={toY(yGuide)}
          x2={plotRight}
          y2={toY(yGuide)}
          stroke="#f97316"
          strokeWidth="1.4"
          strokeDasharray="5 4"
        />
      )}

      {/* Osie */}
      <line
        x1={plotLeft - 2}
        y1={axisY0}
        x2={plotRight + 10}
        y2={axisY0}
        stroke="#44403c"
        strokeWidth="1.6"
      />
      <polygon
        points={`${plotRight + 16},${axisY0} ${plotRight + 6},${axisY0 - 4} ${plotRight + 6},${axisY0 + 4}`}
        fill="#44403c"
      />
      <line
        x1={axisX0}
        y1={plotBottom + 4}
        x2={axisX0}
        y2={plotTop - 6}
        stroke="#44403c"
        strokeWidth="1.6"
      />
      <polygon
        points={`${axisX0},${plotTop - 12} ${axisX0 - 4},${plotTop - 2} ${axisX0 + 4},${plotTop - 2}`}
        fill="#44403c"
      />

      <text
        x={plotRight + 18}
        y={axisY0 + 14}
        fontSize="13"
        fill="#44403c"
        fontStyle="italic"
        fontWeight="700"
      >
        u
      </text>
      <text
        x={axisX0 + 8}
        y={plotTop - 2}
        fontSize="12"
        fill="#6d3a8e"
        fontStyle="italic"
        fontWeight="700"
      >
        tg u
      </text>

      {/* Podziałki osi u */}
      {uMajor.map(({ u, frac, negative }) => (
        <g key={`u-${u}`}>
          <line
            x1={toX(u)}
            y1={axisY0 - 4}
            x2={toX(u)}
            y2={axisY0 + 4}
            stroke="#44403c"
            strokeWidth="1.4"
          />
          <SvgFrac
            x={toX(u) + (negative ? -2 : 2)}
            y={axisY0 + 14}
            num={frac.num}
            den={frac.den}
            fill={labelFill}
            negative={negative}
          />
        </g>
      ))}

      {/* Podziałki osi tg */}
      {yTicks.map(({ y, text }) => (
        <g key={`y-${y}`}>
          <line
            x1={axisX0 - 4}
            y1={toY(y)}
            x2={axisX0 + 4}
            y2={toY(y)}
            stroke="#44403c"
            strokeWidth="1.4"
          />
          <text
            x={axisX0 - 10}
            y={toY(y) + 4}
            fontSize="11"
            textAnchor="end"
            fill={labelFill}
            fontWeight="700"
          >
            {text}
          </text>
        </g>
      ))}

      {/* Etykieta poziomicy −√3 */}
      {yGuide != null && Math.abs(yGuide + SQRT3) < 1e-9 && (
        <text
          x={plotRight - 4}
          y={toY(yGuide) - 6}
          fontSize="12"
          textAnchor="end"
          fill="#c2410c"
          fontWeight="700"
        >
          −√3
        </text>
      )}

      {/* Krzywa */}
      {segments.map((seg, i) => (
        <path key={`seg-${i}`} d={seg} fill="none" stroke="#6d3a8e" strokeWidth="2.2" />
      ))}

      {/* Punkty */}
      {points.map(({ u, y, frac, labelDy = -14, negative }, idx) => {
        const x = toX(u);
        const py = toY(y);
        return (
          <g key={`pt-${idx}`}>
            <circle cx={x} cy={py} r="4.5" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
            {frac && (
              <SvgFrac
                x={x}
                y={py + labelDy}
                num={frac.num}
                den={frac.den}
                fill="#c2410c"
                fontSize={10}
                negative={negative}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Rysunek pomocniczy: trójkąt ABC wpisany w okrąg (tylko dane z treści zadania). */
const DiagramTrojkatOkragOpisany = () => {
  const cx = 170;
  const cy = 158;
  const r = 108;
  // Położenie jak na arkuszu: A lewo, B dół, C góra (SVG: 0° = prawo, 90° = dół)
  const pt = (deg) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
  };
  const A = pt(188);
  const B = pt(95);
  const C = pt(255);

  const mid = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });
  const AB = mid(A, B);
  // Etykieta b lekko w głąb trójkąta (jak na arkuszu)
  const bLabel = {
    x: AB.x + (C.x - AB.x) * 0.14,
    y: AB.y + (C.y - AB.y) * 0.14,
  };

  // Łuk kąta przy wierzchołku V między punktami P i Q
  const angleArc = (V, P, Q, rad) => {
    const a1 = Math.atan2(P.y - V.y, P.x - V.x);
    const a2 = Math.atan2(Q.y - V.y, Q.x - V.x);
    let d = a2 - a1;
    while (d <= -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    const large = Math.abs(d) > Math.PI ? 1 : 0;
    const sweep = d > 0 ? 1 : 0;
    const x1 = V.x + rad * Math.cos(a1);
    const y1 = V.y + rad * Math.sin(a1);
    const x2 = V.x + rad * Math.cos(a2);
    const y2 = V.y + rad * Math.sin(a2);
    return `M ${x1} ${y1} A ${rad} ${rad} 0 ${large} ${sweep} ${x2} ${y2}`;
  };

  // Etykieta kąta lekko w głąb kąta
  const angleLabel = (V, P, Q, dist) => {
    const a1 = Math.atan2(P.y - V.y, P.x - V.x);
    const a2 = Math.atan2(Q.y - V.y, Q.x - V.x);
    let d = a2 - a1;
    while (d <= -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    const am = a1 + d / 2;
    return { x: V.x + dist * Math.cos(am), y: V.y + dist * Math.sin(am) };
  };

  const labA = angleLabel(A, B, C, 36);
  const labC = angleLabel(C, A, B, 32);

  return (
    <svg
      viewBox="0 0 340 320"
      className="w-full max-w-sm mx-auto my-3 block"
      aria-label="Trójkąt ABC wpisany w okrąg: kąt przy A równy 3α, kąt przy C równy α, bok AB równy b"
    >
      {/* Okrąg opisany */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#c4a8e8" strokeWidth="2" />

      {/* Trójkąt */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="#f2ecfb"
        fillOpacity="0.45"
        stroke="#6d3a8e"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Łuki kątów */}
      <path d={angleArc(A, B, C, 22)} fill="none" stroke="#6d3a8e" strokeWidth="1.6" />
      <path d={angleArc(C, A, B, 20)} fill="none" stroke="#6d3a8e" strokeWidth="1.6" />

      {/* Podpisy kątów */}
      <text
        x={labA.x}
        y={labA.y + 4}
        fontSize="14"
        fontWeight="700"
        fill="#52297a"
        textAnchor="middle"
        fontStyle="italic"
      >
        3α
      </text>
      <text
        x={labC.x}
        y={labC.y + 4}
        fontSize="14"
        fontWeight="700"
        fill="#52297a"
        textAnchor="middle"
        fontStyle="italic"
      >
        α
      </text>

      {/* Bok b */}
      <text
        x={bLabel.x}
        y={bLabel.y + 5}
        fontSize="15"
        fontWeight="700"
        fill="#52297a"
        textAnchor="middle"
        fontStyle="italic"
      >
        b
      </text>

      {/* Wierzchołki */}
      <circle cx={A.x} cy={A.y} r="3.2" fill="#6d3a8e" />
      <circle cx={B.x} cy={B.y} r="3.2" fill="#6d3a8e" />
      <circle cx={C.x} cy={C.y} r="3.2" fill="#6d3a8e" />

      <text x={A.x - 16} y={A.y + 6} fontSize="16" fontWeight="700" fill="#2d1458" fontFamily="serif">
        A
      </text>
      <text x={B.x - 4} y={B.y + 22} fontSize="16" fontWeight="700" fill="#2d1458" fontFamily="serif">
        B
      </text>
      <text x={C.x - 4} y={C.y - 12} fontSize="16" fontWeight="700" fill="#2d1458" fontFamily="serif">
        C
      </text>
    </svg>
  );
};

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, CKE, maj 2025, poziom rozszerzony";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna z matematyki, Politechnika Łódzka, marzec 2025, poziom rozszerzony";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, CKE, grudzień 2024, poziom rozszerzony";

const tasks = [
  {
    id: "cke-mock-2024-grudzien-zad9-sin4-cos4",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "9",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\sin^4 x = \\sin x \\cdot \\cos x - \\cos^4 x",
    noteItems: [
      { text: "w zbiorze " },
      { math: "[-\\pi,\\,2\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{-\\dfrac{3\\pi}{4},\\,\\dfrac{\\pi}{4},\\,\\dfrac{5\\pi}{4}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Przenieś <Mi>{"\\cos^4 x"}</Mi> na lewą stronę, żeby po lewej była suma <Mi>{"\\sin^4 x + \\cos^4 x"}</Mi>.
        </p>
        <p>
          Zamień <Mi>{"\\sin^4 x + \\cos^4 x"}</Mi> na postać z kwadratem sumy:
        </p>
        <FormulaBox>
          <Mb>
            {
              "\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x"
            }
          </Mb>
        </FormulaBox>
        <p>
          Użyj jedynki trygonometrycznej <Mi>{"\\sin^2 x + \\cos^2 x = 1"}</Mi> oraz wzorów na kąt podwójny, żeby
          wyrazić wszystko przez <Mi>{"\\sin(2x)"}</Mi>. Powinno wyjść równanie kwadratowe na <Mi>{"\\sin(2x)"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"\\sin(2x) = 2\\sin x \\cos x"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przekształcenie równania</p>
        <p>
          Przenosimy <Mi>{"\\cos^4 x"}</Mi> na lewą stronę:
        </p>
        <Mb>{"\\sin^4 x + \\cos^4 x = \\sin x \\cos x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Suma czwartych potęg</p>
        <p>
          Korzystamy ze wzoru <Mi>{"a^2 + b^2 = (a+b)^2 - 2ab"}</Mi> dla <Mi>{"a = \\sin^2 x"}</Mi>,{" "}
          <Mi>{"b = \\cos^2 x"}</Mi>:
        </p>
        <Mb>
          {
            "\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x"
          }
        </Mb>
        <p>Z jedynki trygonometrycznej <Mi>{"\\sin^2 x + \\cos^2 x = 1"}</Mi>:</p>
        <Mb>{"\\sin^4 x + \\cos^4 x = 1 - 2\\sin^2 x \\cos^2 x"}</Mb>
        <p>Równanie przyjmuje postać:</p>
        <Mb>{"1 - 2\\sin^2 x \\cos^2 x = \\sin x \\cos x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Kąt podwójny</p>
        <p>
          Wiemy, że <Mi>{"\\sin(2x) = 2\\sin x \\cos x"}</Mi>, więc <Mi>{"\\sin x \\cos x = \\dfrac{1}{2}\\sin(2x)"}</Mi>.
          Ponadto <Mi>{"\\sin^2 x \\cos^2 x = \\dfrac{1}{4}\\sin^2(2x)"}</Mi>.
        </p>
        <Mb>{"1 - 2 \\cdot \\dfrac{1}{4}\\sin^2(2x) = \\dfrac{1}{2}\\sin(2x)"}</Mb>
        <Mb>{"1 - \\dfrac{1}{2}\\sin^2(2x) = \\dfrac{1}{2}\\sin(2x)"}</Mb>
        <p>Mnożymy obie strony przez <Mi>{"2"}</Mi>:</p>
        <Mb>{"2 - \\sin^2(2x) = \\sin(2x)"}</Mb>
        <Mb>{"\\sin^2(2x) + \\sin(2x) - 2 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Równanie kwadratowe na <Mi>{"\\sin(2x)"}</Mi></p>
        <p>Oznaczmy <Mi>{"t = \\sin(2x)"}</Mi>, gdzie <Mi>{"t \\in [-1,\\,1]"}</Mi>:</p>
        <Mb>{"t^2 + t - 2 = 0"}</Mb>
        <Mb>{"(t + 2)(t - 1) = 0 \\quad \\Longrightarrow \\quad t = -2 \\quad \\text{lub} \\quad t = 1"}</Mb>
        <p>
          Warunek <Mi>{"\\sin(2x) \\in [-1,\\,1]"}</Mi> odrzuca <Mi>{"t = -2"}</Mi>. Zostaje{" "}
          <Mi>{"\\sin(2x) = 1"}</Mi>.
        </p>
        <p>
          Oznaczmy <Mi>{"u = 2x"}</Mi>. Na wykresie <Mi>{"\\sin u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> szukamy punktów o wysokości <Mi>{"1"}</Mi>:
        </p>
        <TrigGraph
          fn="sin"
          yGuide={1}
          ariaLabel="Wykres sin u z punktami, w których sin u = 1, od 0 do 2π"
          points={[
            { u: Math.PI / 2, y: 1, frac: { num: "π", den: "2" }, labelDy: 20 },
          ]}
        />
        <p>
          Stąd ogólnie <Mi>{"u = \\dfrac{\\pi}{2} + 2k\\pi"}</Mi>, czyli:
        </p>
        <Mb>{"2x = \\dfrac{\\pi}{2} + 2k\\pi, \\quad k \\in \\mathbb{Z} \\quad \\Longrightarrow \\quad x = \\dfrac{\\pi}{4} + k\\pi"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Rozwiązania w <Mi>{"[-\\pi,\\,2\\pi]"}</Mi></p>
        <Mb>
          {
            "k = -1 \\Rightarrow x = -\\dfrac{3\\pi}{4},\\quad k = 0 \\Rightarrow x = \\dfrac{\\pi}{4},\\quad k = 1 \\Rightarrow x = \\dfrac{5\\pi}{4}"
          }
        </Mb>
        <p>
          Dla <Mi>{"k = 2"}</Mi> otrzymujemy <Mi>{"x = \\dfrac{9\\pi}{4} > 2\\pi"}</Mi>, więc poza zbiorem. Sprawdzenie
          (np. dla <Mi>{"x = \\dfrac{\\pi}{4}"}</Mi>): lewa i prawa strona równają się <Mi>{"\\dfrac{1}{4}"}</Mi>.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{-\\dfrac{3\\pi}{4},\\,\\dfrac{\\pi}{4},\\,\\dfrac{5\\pi}{4}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-maj-zad9-rownanie-tryg",
    source: SOURCE_CKE_MAJ_2025,
    number: "9",
    points: "0–5",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "3\\cos^2 x + \\sqrt{3}\\sin(2x) - 3\\sin^2 x = 0",
    noteItems: [
      { text: "w przedziale " },
      { math: "[-\\pi,\\,\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"3\\cos^2 x - 3\\sin^2 x = 3(\\cos^2 x - \\sin^2 x) = 3\\cos(2x)"}</Mi>. Równanie
          sprowadza się do postaci z argumentem podwojonym:
        </p>
        <Mb>{"3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>
        <p>
          Podziel obie strony przez <Mi>{"2\\sqrt{3}"}</Mi> (liczba dodatnia, więc równoważność zachodzi) i
          porównaj z wzorem na cosinus sumy kątów:
        </p>
        <FormulaBox>
          <Mb>{"\\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta"}</Mb>
        </FormulaBox>
        <p>
          Powinieneś otrzymać równanie typu <Mi>{"\\cos\\left(2x - \\dfrac{\\pi}{6}\\right) = 0"}</Mi>, a potem
          rozwiąż je w zadanym przedziale.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-bold text-[#52297a] text-base">Metoda 1: cosinus argumentu podwojonego</p>

        <p className="font-semibold text-stone-800">Krok 1. Wzór na cosinus podwójny</p>
        <p>
          Korzystamy ze wzoru <Mi>{"\\cos(2x) = \\cos^2 x - \\sin^2 x"}</Mi>:
        </p>
        <Mb>{"3\\cos^2 x + \\sqrt{3}\\sin(2x) - 3\\sin^2 x = 3(\\cos^2 x - \\sin^2 x) + \\sqrt{3}\\sin(2x)"}</Mb>
        <Mb>{"= 3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Dzielenie przez <Mi>{"2\\sqrt{3}"}</Mi></p>
        <p>
          Dzielimy obie strony przez pierwiastek z sumy kwadratów współczynników <Mi>{"3"}</Mi> i <Mi>{"\\sqrt{3}"}</Mi>: 
        </p>
        <Mb>
         {"\\sqrt{3^2 + \\sqrt{3}^2} = \\sqrt{12} = 2\\sqrt{3}"}
        </Mb>
        <Mb>
          {"\\dfrac{3}{2\\sqrt{3}}\\cos(2x) + \\dfrac{\\sqrt{3}}{2\\sqrt{3}}\\sin(2x) = \\dfrac{\\sqrt{3}}{2}\\cos(2x) + \\dfrac{1}{2}\\sin(2x) = 0"}
        </Mb>
        <p>
          Liczby <Mi>{"\\dfrac{\\sqrt{3}}{2}"}</Mi> i <Mi>{"\\dfrac{1}{2}"}</Mi> to wartości cosinusa i sinusa kąta{" "}
          <Mi>{"\\dfrac{\\pi}{6}"}</Mi>:
        </p>
        <Mb>
          {"\\dfrac{\\sqrt{3}}{2}\\cos(2x) + \\dfrac{1}{2}\\sin(2x) = \\cos\\dfrac{\\pi}{6}\\cdot\\cos(2x) + \\sin\\dfrac{\\pi}{6}\\cdot\\sin(2x)"}
        </Mb>
        <p>
          To dokładnie prawa strona wzoru na cosinus różnicy kątów (z tablic):
        </p>
        <FormulaBox>
          <Mb>{"\\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta"}</Mb>
        </FormulaBox>
        <p>
          Przyjmując <Mi>{"\\alpha = 2x"}</Mi> oraz <Mi>{"\\beta = \\dfrac{\\pi}{6}"}</Mi>, otrzymujemy:
        </p>
        <Mb>
          {"\\cos\\dfrac{\\pi}{6}\\cdot\\cos(2x) + \\sin\\dfrac{\\pi}{6}\\cdot\\sin(2x) = \\cos\\left(2x - \\dfrac{\\pi}{6}\\right) = 0"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozwiązanie równania</p>
        <p>
          Oznaczmy <Mi>{"u = 2x - \\dfrac{\\pi}{6}"}</Mi>. Równanie <Mi>{"\\cos u = 0"}</Mi> na wykresie{" "}
          <Mi>{"\\cos u"}</Mi> w przedziale <Mi>{"[0,\\,2\\pi]"}</Mi> oznaczono pomarańczowymi kropkami:
        </p>
        <TrigGraph
          fn="cos"
          ariaLabel="Wykres cos u z miejscami zerowymi od 0 do 2π"
          points={[
            { u: Math.PI / 2, y: 0 },
            { u: (3 * Math.PI) / 2, y: 0 },
          ]}
        />
        <p>
          Stąd ogólnie <Mi>{"u = \\dfrac{\\pi}{2} + k\\pi"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>), czyli:
        </p>
        <Mb>{"2x - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2} + k\\pi, \\quad k \\in \\mathbb{Z}"}</Mb>
        <Mb>{"2x = \\dfrac{2\\pi}{3} + k\\pi \\quad \\Longrightarrow \\quad x = \\dfrac{\\pi}{3} + \\dfrac{k\\pi}{2}"}</Mb>
        <p>W przedziale <Mi>{"[-\\pi,\\,\\pi]"}</Mi>:</p>
        <Mb>
          {"k = -2 \\Rightarrow x = -\\dfrac{2\\pi}{3},\\quad k = -1 \\Rightarrow x = -\\dfrac{\\pi}{6},\\quad k = 0 \\Rightarrow x = \\dfrac{\\pi}{3},\\quad k = 1 \\Rightarrow x = \\dfrac{5\\pi}{6}"}
        </Mb>

        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2: tangens argumentu podwojonego</p>

        <p className="font-semibold text-stone-800">Krok 1. Ten sam początek</p>
        <Mb>{"3\\cos(2x) + \\sqrt{3}\\sin(2x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Tangens</p>
        <p>
          Przenosimy wyraz z cosinusem na prawą stronę. Gdy <Mi>{"\\cos(2x) \\neq 0"}</Mi>, dzielimy przez{" "}
          <Mi>{"\\cos(2x)"}</Mi>:
        </p>
        <Mb>{"\\sqrt{3}\\sin(2x) = -3\\cos(2x) \\quad \\Longrightarrow \\quad \\tg(2x) = -\\sqrt{3}"}</Mb>
        <p>
          (Gdy <Mi>{"\\cos(2x) = 0"}</Mi> to <Mi>{"\\sin(2x)=\\pm1"}</Mi> i lewa strona pierwotnego równania daje{" "}
          <Mi>{"\\sqrt{3}\\sin(2x) = \\pm\\sqrt{3} \\neq 0"}</Mi>, więc nie ma dodatkowych rozwiązań spoza
          tego przypadku.)
        </p>
        <p>
          Oznaczmy <Mi>{"u = 2x"}</Mi>. Na wykresie <Mi>{"\\operatorname{tg} u"}</Mi> w przedziale{" "}
          <Mi>{"\\left(-\\dfrac{\\pi}{2},\\,\\dfrac{\\pi}{2}\\right)"}</Mi> (między asymptotami) szukamy
          punktów o wysokości <Mi>{"-\\sqrt{3}"}</Mi>:
        </p>
        <TanGraph
          yGuide={-Math.sqrt(3)}
          ariaLabel="Wykres tg u z punktem, w którym tg u = −√3"
          points={[{ u: -Math.PI / 3, y: -Math.sqrt(3) }]}
        />
        <p>
          W tym przedziale jest jedno takie miejsce: <Mi>{"u = -\\dfrac{\\pi}{3}"}</Mi>.
          Okres tangensa to <Mi>{"\\pi"}</Mi>, więc ogólnie{" "}
          <Mi>{"u = -\\dfrac{\\pi}{3} + k\\pi"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>), czyli:
        </p>
        <Mb>{"2x = -\\dfrac{\\pi}{3} + k\\pi \\quad \\Longrightarrow \\quad x = -\\dfrac{\\pi}{6} + \\dfrac{k\\pi}{2}"}</Mb>
        <p>To ten sam ciąg rozwiązań co w metodzie 1. W <Mi>{"[-\\pi,\\,\\pi]"}</Mi>:</p>
        <FormulaBox>
          <Mb>
            {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
          </Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{-\\dfrac{2\\pi}{3},\\,-\\dfrac{\\pi}{6},\\,\\dfrac{\\pi}{3},\\,\\dfrac{5\\pi}{6}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad6-rownanie-cos",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "6",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\cos 2x + 2\\cos^2 3x + \\cos 4x = 0",
    noteItems: [
      { text: "w przedziale " },
      { math: "[0,\\,\\pi]" },
      { text: ". Zapisz obliczenia." },
    ],
    answers: null,

    answer: (
      <p>
        <Mi>
          {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
        </Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Dodaj do siebie <Mi>{"\\cos 2x"}</Mi> i <Mi>{"\\cos 4x"}</Mi> wzorem na sumę cosinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\cos\\alpha + \\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <p>
          Wyłącz wspólny czynnik i zrób to samo jeszcze raz dla sumy cosinusów, która się pojawi w nawiasie.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">
          Krok 1. Łączymy <Mi>{"\\cos 2x"}</Mi> i <Mi>{"\\cos 4x"}</Mi>
        </p>
        <FormulaBox>
          <Mb>{"\\cos\\alpha + \\cos\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <Mb>
          {"\\cos 2x + \\cos 4x = 2\\cos\\frac{2x+4x}{2}\\cos\\frac{2x-4x}{2} = 2\\cos 3x \\cdot \\cos(-x) = 2\\cos 3x \\cos x"}
        </Mb>
        <p>Równanie przyjmuje postać:</p>
        <Mb>{"2\\cos 3x \\cos x + 2\\cos^2 3x = 0"}</Mb>
        <Mb>{"2\\cos 3x\\,(\\cos x + \\cos 3x) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Drugie użycie wzoru na sumę cosinusów</p>
        <p>
          W nawiasie znowu mamy sumę cosinusów, więc:
        </p>
        <Mb>
          {"\\cos x + \\cos 3x = 2\\cos\\frac{x+3x}{2}\\cos\\frac{x-3x}{2} = 2\\cos 2x \\cdot \\cos(-x) = 2\\cos 2x \\cos x"}
        </Mb>
        <p>Całe równanie:</p>
        <Mb>{"2\\cos 3x \\cdot 2\\cos 2x \\cos x = 0"}</Mb>
        <Mb>{"4\\cos x \\cos 2x \\cos 3x = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Rozwiązujemy równanie iloczynowe</p>
        <p>
          Iloczyn jest zerem, gdy któryś z czynników jest zerem.
        </p>
        <p>
          Wszystkie trzy czynniki to cosinusy, więc wystarczy wiedzieć, kiedy{" "}
          <Mi>{"\\cos u = 0"}</Mi>. Na wykresie <Mi>{"\\cos u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> miejsca zerowe zaznaczono pomarańczowymi kropkami:
        </p>
        <TrigGraph
          fn="cos"
          ariaLabel="Wykres cos u z miejscami zerowymi od 0 do 2π"
          points={[
            { u: Math.PI / 2, y: 0 },
            { u: (3 * Math.PI) / 2, y: 0 },
          ]}
        />
        <p>
          Widać zera w <Mi>{"u = \\dfrac{\\pi}{2}"}</Mi> i <Mi>{"u = \\dfrac{3\\pi}{2}"}</Mi>,
          stąd ogólnie <Mi>{"u = \\dfrac{\\pi}{2} + k\\pi"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>).
          Stosujemy to kolejno do <Mi>{"u = x"}</Mi>, <Mi>{"u = 2x"}</Mi> i <Mi>{"u = 3x"}</Mi>.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos x = 0"}</Mi> → <Mi>{"x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{2}"}</Mi>.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos 2x = 0"}</Mi> → <Mi>{"2x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>, czyli{" "}
          <Mi>{"x = \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{4}"}</Mi>, <Mi>{"x = \\dfrac{3\\pi}{4}"}</Mi>.
        </p>
        <p className="font-medium text-stone-700">
          <Mi>{"\\cos 3x = 0"}</Mi> → <Mi>{"3x = \\dfrac{\\pi}{2} + k\\pi"}</Mi>, czyli{" "}
          <Mi>{"x = \\dfrac{\\pi}{6} + \\dfrac{k\\pi}{3}"}</Mi>. W <Mi>{"[0,\\pi]"}</Mi>:{" "}
          <Mi>{"x = \\dfrac{\\pi}{6}"}</Mi>, <Mi>{"x = \\dfrac{\\pi}{2}"}</Mi>, <Mi>{"x = \\dfrac{5\\pi}{6}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Zbiór rozwiązań w przedziale</p>
        <p>
          Łączymy wszystkie wartości z <Mi>{"[0,\\pi]"}</Mi> (bez powtórzeń):
        </p>
        <FormulaBox>
          <Mb>
            {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
          </Mb>
        </FormulaBox>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>
              {"x \\in \\left\\{\\dfrac{\\pi}{6},\\;\\dfrac{\\pi}{4},\\;\\dfrac{\\pi}{2},\\;\\dfrac{3\\pi}{4},\\;\\dfrac{5\\pi}{6}\\right\\}"}
            </Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2026-styczen-zad2",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    number: "1",
    points: "0–3",
    instruction: (
      <span>
        Oblicz <Mi>{"\\operatorname{tg}\\alpha"}</Mi> wiedząc, że{" "}
        <Mi>{"\\alpha \\in \\left(\\pi,\\, \\frac{3\\pi}{2}\\right)"}</Mi> oraz{" "}
        <Mi>{"\\sin 2\\alpha = \\dfrac{12}{13}"}</Mi>. Zapisz obliczenia.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{2}{3}"}</Mi> lub{" "}
        <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{3}{2}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Krok 1: rozłóż <Mi>{"\\sin 2\\alpha"}</Mi> ze wzoru na sinus podwojonego kąta:
        </p>
        <FormulaBox>
          <Mb>{"\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Krok 2: podziel jedynkę trygonometryczną przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1 \\quad \\Bigg|\\div\\cos^2\\alpha \\quad \\Rightarrow \\quad \\operatorname{tg}^2\\alpha + 1 = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        </FormulaBox>
        <p>
          Następnie podziel równanie z kroku 1 przez <Mi>{"\\cos^2\\alpha"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        {/* ── Metoda 1 ── */}
        <p className="font-bold text-[#52297a] text-base">Metoda 1</p>

        <p className="font-semibold text-stone-800">Krok 1. Wzór na sinus podwojonego kąta</p>
        <FormulaBox>
          <Mb>{"\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Podstawiamy <Mi>{"\\sin 2\\alpha = \\dfrac{12}{13}"}</Mi>:
        </p>
        <Mb>{"2\\sin\\alpha\\cos\\alpha = \\frac{12}{13}"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Jedynka trygonometryczna podzielona przez <Mi>{"\\cos^2\\alpha"}</Mi>
        </p>
        <p>Zaczynamy od jedynki trygonometrycznej:</p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1"}</Mb>
        </FormulaBox>
        <p>
          Dzielimy obie strony przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <Mb>{"\\frac{\\sin^2\\alpha}{\\cos^2\\alpha} + \\frac{\\cos^2\\alpha}{\\cos^2\\alpha} = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <Mb>{"\\operatorname{tg}^2\\alpha + 1 = \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <p>
          Otrzymaliśmy ważny fakt: <Mi>{"\\dfrac{1}{\\cos^2\\alpha} = 1 + \\operatorname{tg}^2\\alpha"}</Mi>.
          Skorzystamy z niego zaraz po prawej stronie.
        </p>

        <p>
          Teraz dzielimy równanie z kroku 1 przez <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <Mb>{"\\frac{2\\sin\\alpha\\cos\\alpha}{\\cos^2\\alpha} = \\frac{12}{13} \\cdot \\frac{1}{\\cos^2\\alpha}"}</Mb>
        <p>
          Po lewej: <Mi>{"\\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\operatorname{tg}\\alpha"}</Mi>.
          Po prawej używamy faktu, który właśnie wyliczyliśmy:
        </p>
        <Mb>{"2\\operatorname{tg}\\alpha = \\frac{12}{13}\\left(1 + \\operatorname{tg}^2\\alpha\\right)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Równanie kwadratowe</p>
        <p>
          Oznaczamy <Mi>{"t = \\operatorname{tg}\\alpha"}</Mi>:
        </p>
        <Mb>{"2t = \\frac{12}{13}(t^2 + 1)"}</Mb>
        <Mb>{"26t = 12t^2 + 12"}</Mb>
        <Mb>{"6t^2 - 13t + 6 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczymy deltę</p>
        <Mb>{"\\Delta = b^2 - 4ac = (-13)^2 - 4 \\cdot 6 \\cdot 6 = 169 - 144 = 25"}</Mb>
        <p><Mi>{"\\sqrt{\\Delta} = 5"}</Mi></p>
        <Mb>{"t_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{13 - 5}{12} = \\frac{8}{12} = \\frac{2}{3}"}</Mb>
        <Mb>{"t_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{13 + 5}{12} = \\frac{18}{12} = \\frac{3}{2}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sprawdzenie dziedziny</p>
        <p>
          Dla <Mi>{"\\alpha \\in \\left(\\pi,\\, \\frac{3\\pi}{2}\\right)"}</Mi> (trzecia ćwiartka):{" "}
          <Mi>{"\\sin\\alpha < 0"}</Mi> i <Mi>{"\\cos\\alpha < 0"}</Mi>, więc{" "}
          <Mi>{"\\operatorname{tg}\\alpha > 0"}</Mi>.
          Obie wartości są dodatnie: obie spełniają warunek.
        </p>

        {/* ── Metoda 2 ── */}
        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2</p>

        <p className="font-semibold text-stone-800">Krok 1. Wyrażamy cos przez sin</p>
        <p>
          Ze wzoru na sinus podwojonego kąta:
        </p>
        <Mb>{"2\\sin\\alpha\\cos\\alpha = \\frac{12}{13} \\quad \\Rightarrow \\quad \\sin\\alpha\\cos\\alpha = \\frac{6}{13}"}</Mb>
        <p>
          Wyznaczamy <Mi>{"\\cos\\alpha"}</Mi>:
        </p>
        <Mb>{"\\cos\\alpha = \\frac{6}{13\\sin\\alpha}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Podstawiamy do jedynki trygonometrycznej</p>
        <FormulaBox>
          <Mb>{"\\sin^2\\alpha + \\cos^2\\alpha = 1"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin^2\\alpha + \\frac{36}{169\\sin^2\\alpha} = 1"}</Mb>
        <p>
          Mnożymy obie strony przez <Mi>{"169\\sin^2\\alpha"}</Mi>:
        </p>
        <Mb>{"169\\sin^4\\alpha - 169\\sin^2\\alpha + 36 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Podstawienie <Mi>{"u = \\sin^2\\alpha"}</Mi></p>
        <Mb>{"169u^2 - 169u + 36 = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Liczymy deltę</p>
        <Mb>{"\\Delta = 169^2 - 4 \\cdot 169 \\cdot 36 = 169(169 - 144) = 169 \\cdot 25"}</Mb>
        <p><Mi>{"\\sqrt{\\Delta} = 13 \\cdot 5 = 65"}</Mi></p>
        <Mb>{"u_1 = \\frac{169 - 65}{338} = \\frac{104}{338} = \\frac{4}{13}"}</Mb>
        <Mb>{"u_2 = \\frac{169 + 65}{338} = \\frac{234}{338} = \\frac{9}{13}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Obliczamy tg</p>
        <p>
          Korzystamy z tego, że <Mi>{"\\cos\\alpha = \\dfrac{6}{13\\sin\\alpha}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{\\sin\\alpha}{\\dfrac{6}{13\\sin\\alpha}} = \\frac{13\\sin^2\\alpha}{6}"}</Mb>
        <p>
          Dla <Mi>{"u_1 = \\sin^2\\alpha = \\dfrac{4}{13}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{13 \\cdot \\frac{4}{13}}{6} = \\frac{4}{6} = \\frac{2}{3}"}</Mb>
        <p>
          Dla <Mi>{"u_2 = \\sin^2\\alpha = \\dfrac{9}{13}"}</Mi>:
        </p>
        <Mb>{"\\operatorname{tg}\\alpha = \\frac{13 \\cdot \\frac{9}{13}}{6} = \\frac{9}{6} = \\frac{3}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź:{" "}
            <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{2}{3}"}</Mi>{" "}
            lub{" "}
            <Mi>{"\\operatorname{tg}\\alpha = \\dfrac{3}{2}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "smwp-2026-styczen-zad7",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    number: "2",
    points: "0–5",
    instruction: (
      <span>
        <span className="block font-normal mb-3">
          Twierdzenie tangensów pozwala na określenie zależności między kątami i bokami trójkąta.
        </span>
        <span className="block italic text-[#52297a] mb-1">Twierdzenie tangensów:</span>
        <span className="block font-normal">
          Jeśli <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> są długościami boków trójkąta oraz{" "}
          <Mi>{"\\alpha"}</Mi> i <Mi>{"\\beta"}</Mi> są miarami kątów leżących odpowiednio
          naprzeciwko tych boków, to zachodzi równość
        </span>
      </span>
    ),
    mathBlock:
      "\\dfrac{a-b}{a+b} = \\dfrac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}",
    noteItems: [{ text: "Udowodnij powyższe twierdzenie." }],
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Skorzystaj z twierdzenia sinusów, żeby wyrazić <Mi>{"a"}</Mi> i <Mi>{"b"}</Mi> przez
          sinusy kątów <Mi>{"\\alpha"}</Mi> i <Mi>{"\\beta"}</Mi>. Po uproszczeniu zostaje{" "}
          <Mi>{"\\dfrac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta}"}</Mi>.
        </p>
        <p>Następnie użyj wzorów na różnicę i sumę sinusów:</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <FormulaBox>
          <Mb>{"\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Twierdzenie sinusów</p>
        <FormulaBox>
          <Mb>{"\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = 2R"}</Mb>
        </FormulaBox>
        <p>
          Stąd <Mi>{"a = 2R\\sin\\alpha"}</Mi> oraz <Mi>{"b = 2R\\sin\\beta"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Podstawiamy do wyrażenia po lewej stronie</p>
        <Mb>{"\\frac{a-b}{a+b} = \\frac{2R\\sin\\alpha - 2R\\sin\\beta}{2R\\sin\\alpha + 2R\\sin\\beta} = \\frac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Wzory na różnicę i sumę sinusów</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>
        <FormulaBox>
          <Mb>{"\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Podstawiamy wzory</p>
        <Mb>{"\\frac{\\sin\\alpha - \\sin\\beta}{\\sin\\alpha + \\sin\\beta} = \\frac{2\\cos\\dfrac{\\alpha+\\beta}{2}\\cdot\\sin\\dfrac{\\alpha-\\beta}{2}}{2\\sin\\dfrac{\\alpha+\\beta}{2}\\cdot\\cos\\dfrac{\\alpha-\\beta}{2}}"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Upraszczamy</p>
        <p>Czynniki 2 skracają się. Grupujemy licznik i mianownik:</p>
        <Mb>{"= \\frac{\\sin\\dfrac{\\alpha-\\beta}{2}}{\\cos\\dfrac{\\alpha-\\beta}{2}} \\cdot \\frac{\\cos\\dfrac{\\alpha+\\beta}{2}}{\\sin\\dfrac{\\alpha+\\beta}{2}} = \\frac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p>
            Zatem <Mi>{"\\dfrac{a-b}{a+b} = \\dfrac{\\operatorname{tg}\\dfrac{\\alpha-\\beta}{2}}{\\operatorname{tg}\\dfrac{\\alpha+\\beta}{2}}"}</Mi>,
            co kończy dowód. <Mi>{"\\blacksquare"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad6",
    source: "Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony",
    number: "3",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Na trójkącie <Mi>{"ABC"}</Mi>, w którym <Mi>{"|AB| = b"}</Mi> oraz{" "}
          <Mi>{"|\\angle ACB| = \\alpha"}</Mi> i <Mi>{"|\\angle BAC| = 3\\alpha"}</Mi>,
          opisano okrąg o promieniu <Mi>{"R"}</Mi>.
        </p>
        <p className="font-semibold text-stone-800">
          Wykaż, że{" "}
          <Mi>{"b = R\\sqrt{\\dfrac{3\\sin\\alpha - \\sin 3\\alpha}{\\sin\\alpha}}"}</Mi>.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,
    answer: null,

    hint: (
      <div className="space-y-3">
        <p>
          Zastosuj twierdzenie sinusów do odcinka <Mi>{"b = |AB|"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{b}{\\sin(\\angle ACB)} = 2R \\quad\\Rightarrow\\quad b = 2R\\sin\\alpha"}</Mb>
        </FormulaBox>
        <p>
          Zapisz <Mi>{"\\sin(\\alpha + 2\\alpha) = \\dots"}</Mi> przy użyciu wzoru na sinus sumy oraz
          wzorów na <Mi>{"\\sin 2\\alpha"}</Mi> i <Mi>{"\\cos 2\\alpha"}</Mi>; po wyłączeniu{" "}
          <Mi>{"\\sin\\alpha"}</Mi> zamień <Mi>{"\\cos 2\\alpha"}</Mi> na{" "}
          <Mi>{"2\\cos^2\\alpha-1"}</Mi>.
        </p>
        <p>
          Pokaż, że wyrażenie pod pierwiastkiem uprości się do <Mi>{"4\\sin^2\\alpha"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Rysunek pomocniczy</p>
        <p>
          Zaznaczamy tylko dane z treści: bok <Mi>{"b = |AB|"}</Mi>, kąt{" "}
          <Mi>{"\\angle BAC = 3\\alpha"}</Mi>, kąt <Mi>{"\\angle ACB = \\alpha"}</Mi> oraz okrąg
          opisany na trójkącie.
        </p>
        <DiagramTrojkatOkragOpisany />

        <p className="font-semibold text-stone-800">Krok 1. Twierdzenie sinusów</p>
        <p>
          Kąt <Mi>{"\\angle ACB = \\alpha"}</Mi>, a bok naprzeciwległy to <Mi>{"b = |AB|"}</Mi>.
          Z twierdzenia sinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\frac{b}{\\sin\\alpha} = 2R \\quad\\Rightarrow\\quad b = 2R\\sin\\alpha"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Upraszczamy wyrażenie pod pierwiastkiem</p>
        <p>
          <Mi>{"\\sin 3\\alpha"}</Mi> rozwiniemy wzorami dostępnymi w tablicach: sinus sumy kątów i sinus
          podwojonego kąta; potem w nawiasie zastąpimy <Mi>{"\\cos 2\\alpha"}</Mi>.
        </p>
        <Mb>{"\\sin 3\\alpha = \\sin(\\alpha + 2\\alpha)"}</Mb>
        <FormulaBox>
          <Mb>
            {"\\sin(\\alpha + \\beta) = \\sin\\alpha \\cos \\beta + \\cos\\alpha \\sin\\beta"}
          </Mb>
        </FormulaBox>
        <Mb>
          {"\\sin 3\\alpha = \\sin \\alpha \\cos 2\\alpha + \\cos \\alpha \\sin 2\\alpha"}
        </Mb>
        <p>
          Ponieważ <Mi>{"\\sin 2\\alpha = 2\\sin \\alpha \\cos \\alpha"}</Mi>:
        </p>
        <Mb>
          {"= \\sin\\alpha \\cos 2\\alpha + 2 \\sin\\alpha \\cos^2\\alpha"}
        </Mb>
        <Mb>
          {"= \\sin\\alpha\\bigl(\\cos 2\\alpha + 2\\cos^2\\alpha\\bigr)\\text{.}"}
        </Mb>
        <p>Wyliczamy wyrażenie <Mi>{"3\\sin\\alpha - \\sin 3\\alpha"}</Mi>:</p>
        <Mb>
          {"3\\sin\\alpha - \\sin 3\\alpha = \\sin\\alpha \\biggl[ 3-\\bigl(\\cos 2\\alpha + 2\\cos^2\\alpha\\bigr) \\biggr]"}
        </Mb>
        <p>
          Rozpisując <Mi>{"\\cos 2\\alpha"}</Mi> w postaci przy <Mi>{"\\cos^2\\alpha"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\cos 2\\alpha = 2\\cos^2\\alpha - 1"}</Mb>
        </FormulaBox>
        <Mb>
          {"\\quad \\Rightarrow \\quad \\cos 2\\alpha + 2\\cos^2\\alpha"}
        </Mb>
        <Mb>
          {"= \\bigl(2\\cos^2\\alpha - 1\\bigr) + 2\\cos^2\\alpha = 4\\cos^2\\alpha - 1"}
        </Mb>
        <Mb>
          {"\\quad \\Rightarrow \\quad 3\\sin\\alpha - \\sin 3\\alpha = \\sin\\alpha \\bigl[3-(4\\cos^2\\alpha-1)\\bigr]"}
        </Mb>
        <Mb>
          {"= \\sin\\alpha(4-4\\cos^2\\alpha) = 4\\sin\\alpha\\sin^2\\alpha"}
        </Mb>
        <p>Przy kącie ostrym przy wierzchołku <Mi>{"C"}</Mi> jest <Mi>{"\\sin\\alpha > 0"}</Mi>, więc możemy skrócić przez <Mi>{"\\sin\\alpha"}</Mi>:</p>
        <Mb>{"\\frac{3\\sin\\alpha - \\sin 3\\alpha}{\\sin\\alpha} = 4\\sin^2\\alpha"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Finał dowodu</p>
        <Mb>{"R\\sqrt{\\frac{3\\sin\\alpha-\\sin 3\\alpha}{\\sin\\alpha}} = R\\sqrt{4\\sin^2\\alpha} = R \\cdot 2\\sin\\alpha = 2R\\sin\\alpha = b \\qquad \\blacksquare"}</Mb>
      </div>
    ),
  },

  // ── Zadanie 4 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad9",
    source: "Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony",
    number: "4",
    points: "0–4",
    instruction: <span>Rozwiąż równanie</span>,
    mathBlock: "\\sin 6x - \\cos 4x = 2\\sin\\frac{\\pi}{4}\\cdot(\\cos x - \\sin x)",
    noteItems: [{ text: "w przedziale " }, { math: "\\left[-\\dfrac{\\pi}{3},\\,\\dfrac{2\\pi}{3}\\right]" }, { text: ". Zapisz obliczenia." }],
    answers: null,

    answer: (
      <p>
        <Mi>{"x \\in \\left\\{-\\dfrac{\\pi}{4},\\;\\dfrac{3\\pi}{20},\\;\\dfrac{\\pi}{4},\\;\\dfrac{11\\pi}{20}\\right\\}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Zauważ, że <Mi>{"2\\sin\\frac{\\pi}{4} = \\sqrt{2}"}</Mi> i prawa strona to{" "}
          <Mi>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mi>.
        </p>
        <p>
          Lewa strona: zamień <Mi>{"\\cos 4x = \\sin\\left(\\frac{\\pi}{2}-4x\\right)"}</Mi>{" "}
          i zastosuj wzór na różnicę sinusów:
        </p>
        <FormulaBox>
          <Mb>{"\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}"}</Mb>
        </FormulaBox>
        <p>
          Otrzymasz iloczyn <Mi>{"2\\cos(x+\\frac{\\pi}{4})\\sin(5x-\\frac{\\pi}{4})"}</Mi>.
          Rozwiąż dwa przypadki.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Upraszczamy obie strony</p>
        <p>Prawa strona: <Mi>{"2\\sin\\frac{\\pi}{4} = \\sqrt{2}"}</Mi>:</p>
        <Mb>{"\\sqrt{2}(\\cos x - \\sin x) = 2\\left(\\frac{\\sqrt{2}}{2}\\cos x - \\frac{\\sqrt{2}}{2}\\sin x\\right) = 2\\left(\\cos\\frac{\\pi}{4}\\cos x - \\sin\\frac{\\pi}{4}\\sin x\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mb>
        <p>Lewa strona: <Mi>{"\\cos 4x = \\sin\\left(\\frac{\\pi}{2}-4x\\right)"}</Mi>, więc:</p>
        <FormulaBox>
          <Mb>{"\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin 6x - \\sin\\left(\\frac{\\pi}{2}-4x\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\sin\\left(5x-\\frac{\\pi}{4}\\right)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Równanie po uproszczeniu</p>
        <Mb>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\sin\\left(5x-\\frac{\\pi}{4}\\right) = 2\\cos\\left(x+\\frac{\\pi}{4}\\right)"}</Mb>
        <Mb>{"2\\cos\\left(x+\\frac{\\pi}{4}\\right)\\left[\\sin\\left(5x-\\frac{\\pi}{4}\\right) - 1\\right] = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Przypadek 1: <Mi>{"\\cos(x+\\frac{\\pi}{4}) = 0"}</Mi></p>
        <Mb>{"x + \\frac{\\pi}{4} = \\frac{\\pi}{2} + k\\pi \\quad\\Rightarrow\\quad x = \\frac{\\pi}{4} + k\\pi"}</Mb>
        <p>
          Oznaczmy <Mi>{"u = x + \\dfrac{\\pi}{4}"}</Mi>. Na wykresie <Mi>{"\\cos u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> miejsca zerowe to punkty zaznaczone pomarańczowymi kropkami:
        </p>
        <TrigGraph
          fn="cos"
          ariaLabel="Wykres cos u z miejscami zerowymi od 0 do 2π"
          points={[
            { u: Math.PI / 2, y: 0 },
            { u: (3 * Math.PI) / 2, y: 0 },
          ]}
        />
        <p>
          Na tym wycinku widać zera w <Mi>{"u = \\dfrac{\\pi}{2}"}</Mi> i{" "}
          <Mi>{"u = \\dfrac{3\\pi}{2}"}</Mi>. Stąd ogólnie{" "}
          <Mi>{"u = \\dfrac{\\pi}{2} + k\\pi"}</Mi>, czyli{" "}
          <Mi>{"x + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{2} + k\\pi"}</Mi> i{" "}
          <Mi>{"x = \\dfrac{\\pi}{4} + k\\pi"}</Mi>. Na przedziale:{" "}
          <Mi>{"k=0: x = \\dfrac{\\pi}{4}"}</Mi> ✓
        </p>

        <p className="font-semibold text-stone-800">Krok 4. Przypadek 2: <Mi>{"\\sin(5x-\\frac{\\pi}{4}) = 1"}</Mi></p>
        <Mb>{"5x - \\frac{\\pi}{4} = \\frac{\\pi}{2} + 2k\\pi \\quad\\Rightarrow\\quad x = \\frac{3\\pi}{20} + \\frac{2k\\pi}{5}"}</Mb>
        <p>
          Oznaczmy <Mi>{"u = 5x - \\dfrac{\\pi}{4}"}</Mi>. Na wykresie <Mi>{"\\sin u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> szukamy punktów, w których wysokość wynosi <Mi>{"1"}</Mi>{" "}
          (przerywana linia pomocnicza). Na jednej pełnej fali jest jedno takie miejsce:
        </p>
        <TrigGraph
          fn="sin"
          yGuide={1}
          ariaLabel="Wykres sin u z punktami, w których sin u = 1, od 0 do 2π"
          points={[
            { u: Math.PI / 2, y: 1, frac: { num: "π", den: "2" }, labelDy: 20 },
          ]}
        />
        <p>
          Stąd ogólnie <Mi>{"u = \\dfrac{\\pi}{2} + 2k\\pi"}</Mi>, czyli{" "}
          <Mi>{"5x - \\dfrac{\\pi}{4} = \\dfrac{\\pi}{2} + 2k\\pi"}</Mi> i{" "}
          <Mi>{"x = \\dfrac{3\\pi}{20} + \\dfrac{2k\\pi}{5}"}</Mi>. Na przedziale{" "}
          <Mi>{"\\left[-\\tfrac{\\pi}{3},\\tfrac{2\\pi}{3}\\right]"}</Mi>:
        </p>
        <p><Mi>{"k{=}-1"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20} - \\frac{2\\pi}{5} = -\\frac{\\pi}{4}"}</Mi> ✓</p>
        <p><Mi>{"k{=}0"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20}"}</Mi> ✓</p>
        <p><Mi>{"k{=}1"}</Mi>: <Mi>{"x = \\frac{3\\pi}{20} + \\frac{2\\pi}{5} = \\frac{11\\pi}{20}"}</Mi> ✓</p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"x \\in \\left\\{-\\dfrac{\\pi}{4},\\;\\dfrac{3\\pi}{20},\\;\\dfrac{\\pi}{4},\\;\\dfrac{11\\pi}{20}\\right\\}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 5 ─────────────────────────────────────────────
  {
    id: "cke-formula2023-maj-2026-przyklad-zad7-trygonometria",
    source:
      "Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023",
    number: "5",
    points: "0–4",
    instruction: "Rozwiąż równanie",
    mathBlock: "\\sin 6x - 2 \\sin 2x = 0",
    noteItems: [{ text: "Zapisz obliczenia." }],
    answers: null,

    answer: (
      <div className="space-y-3">
        <p>
        <Mi>{"x = \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{\\pi}{12} + \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{5\\pi}{12} + \\dfrac{k\\pi}{2}\\quad"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>).
        </p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Rozbij całe wyrażenie na trzy składniki <Mi>{"\\sin 6x - \\sin 2x - \\sin 2x"}</Mi> i użyj wzoru na różnicę sinusów dla <Mi>{"\\sin 6x - \\sin 2x"}</Mi>:</p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha -\\beta}{2}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozbicie na trzy składniki</p>
        <p>
          Zapisujemy lewą stronę jako różnicę dwóch sinusów minus kolejny sinus{" "}
          <Mi>{"2x"}</Mi>:
        </p>
        <Mb>{"\\sin 6x - 2\\sin 2x = \\sin 6x - \\sin 2x - \\sin 2x = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wzór na różnicę sinusów</p>
        <p>
          Stosujemy go do wyrażenia <Mi>{"\\sin 6x - \\sin 2x"}</Mi>, przyjmując{" "}
          <Mi>{"\\alpha = 6x"}</Mi> oraz <Mi>{"\\beta = 2x"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha - \\beta}{2}"}</Mb>
        </FormulaBox>
        <Mb>{"\\sin 6x - \\sin 2x = 2\\cos\\frac{6x + 2x}{2}\\sin\\frac{6x - 2x}{2} = 2\\cos 4x \\cdot \\sin 2x"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Równanie z czynnikiem wspólnym</p>
        <Mb>{"2\\cos 4x \\cdot \\sin 2x - \\sin 2x = 0"}</Mb>
        <Mb>{"\\sin 2x \\cdot \\bigl(2\\cos 4x - 1\\bigr) = 0"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Pierwszy czynnik</p>
        <Mb>{"\\sin 2x = 0 \\quad \\Longleftrightarrow \\quad 2x = k\\pi \\quad (k \\in \\mathbb{Z}) \\quad \\Longleftrightarrow \\quad x = \\frac{k\\pi}{2}"}</Mb>
        <p>
          Oznaczmy <Mi>{"u = 2x"}</Mi>. Na wykresie <Mi>{"\\sin u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> miejsca zerowe to punkty zaznaczone pomarańczowymi kropkami
          (siatka: 1 kratka = <Mi>{"\\pi/6"}</Mi> na osi <Mi>{"u"}</Mi>, 2 kratki = 1 na osi wartości):
        </p>
        <TrigGraph
          fn="sin"
          ariaLabel="Wykres sin u z miejscami zerowymi od 0 do 2π"
          points={[
            { u: 0, y: 0 },
            { u: Math.PI, y: 0 },
            { u: 2 * Math.PI, y: 0 },
          ]}
        />
        <p>
          Na tym wycinku widać zera w <Mi>{"u = 0"}</Mi>, <Mi>{"u = \\pi"}</Mi> i{" "}
          <Mi>{"u = 2\\pi"}</Mi>. Stąd ogólnie <Mi>{"u = k\\pi"}</Mi>, czyli{" "}
          <Mi>{"2x = k\\pi"}</Mi> i <Mi>{"x = \\dfrac{k\\pi}{2}"}</Mi>.
        </p>

        <p className="font-semibold text-stone-800">Krok 5. Drugi czynnik</p>
        <Mb>{"2\\cos 4x - 1 = 0 \\quad \\Longleftrightarrow \\quad \\cos 4x = \\frac{1}{2}"}</Mb>
        <p>
          Oznaczmy <Mi>{"u = 4x"}</Mi>. Na wykresie <Mi>{"\\cos u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> szukamy punktów, w których wysokość wynosi <Mi>{"\\tfrac{1}{2}"}</Mi>{" "}
          (przerywana linia pomocnicza). Na jednej pełnej „fali” są dwa takie miejsca:
        </p>
        <TrigGraph
          fn="cos"
          yGuide={0.5}
          ariaLabel="Wykres cos u z punktami, w których cos u = 1/2, od 0 do 2π"
          points={[
            { u: Math.PI / 3, y: 0.5, frac: { num: "π", den: "3" }, labelDy: 18 },
            { u: (5 * Math.PI) / 3, y: 0.5, frac: { num: "5π", den: "3" }, labelDy: 18 },
          ]}
        />
        <p>
          Ponieważ <Mi>{"\\cos u = \\frac{1}{2}"}</Mi> wtedy i tylko wtedy, gdy{" "}
          <Mi>{"u = \\frac{\\pi}{3} + 2m\\pi"}</Mi> lub{" "}
          <Mi>{"u = \\frac{5\\pi}{3} + 2m\\pi"}</Mi> (<Mi>{"m \\in \\mathbb{Z}"}</Mi>), podstawiamy{" "}
          <Mi>{"u = 4x"}</Mi>:
        </p>
        <Mb>{"4x = \\frac{\\pi}{3} + 2m\\pi \\quad \\text{lub} \\quad 4x = \\frac{5\\pi}{3} + 2m\\pi"}</Mb>
        <Mb>{"x = \\frac{\\pi}{12} + \\frac{m\\pi}{2} \\quad \\text{lub} \\quad x = \\frac{5\\pi}{12} + \\frac{m\\pi}{2}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">Odpowiedź:</p>
          <p className="mt-2">
            <Mi>{"x = \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{\\pi}{12} + \\dfrac{k\\pi}{2}"}</Mi> lub{" "}
            <Mi>{"x = \\dfrac{5\\pi}{12} + \\dfrac{k\\pi}{2}\\quad"}</Mi> (<Mi>{"k \\in \\mathbb{Z}"}</Mi>).
          </p>
        </div>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad9-rownanie-tryg",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "9",
    points: null,
    instruction: (
      <div className="space-y-3">
        <p>Rozwiąż równanie</p>
        <Mb>{"\\sin 3x + \\cos 2x = 1 + 2\\sin x \\cos 2x"}</Mb>
        <p>a) Ile jest rozwiązań tego równania należących do przedziału <Mi>{"(0, \\pi)"}</Mi>?</p>
        <p>
          b) Podaj sumę rozwiązań tego równania należących do przedziału{" "}
          <Mi>{"[-2\\pi,\\, 2\\pi]"}</Mi>. (Przyjmij <Mi>{"3"}</Mi> jako przybliżoną wartość{" "}
          <Mi>{"\\pi"}</Mi>.)
        </p>
        <p>
          c) Podaj najmniejsze dodatnie rozwiązanie tego równania.
          (Przyjmij <Mi>{"3"}</Mi> jako przybliżoną wartość <Mi>{"\\pi"}</Mi>.)
        </p>
        <p>
          d) Ile rozwiązań wymiernych ma to równanie? (W przypadku gdy jest nieskończenie wiele
          takich rozwiązań, w odpowiedzi wpisz <Mi>{"8"}</Mi>.)
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>a) <Mi>{"2"}</Mi></p>
        <p>b) <Mi>{"-2\\pi \\approx -6"}</Mi></p>
        <p>c) <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi></p>
        <p>d) <Mi>{"1"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>Przenieś wszystko na jedną stronę i pogrupuj:</p>
        <Mb>{"(\\sin 3x - 2\\sin x \\cos 2x) + (\\cos 2x - 1) = 0"}</Mb>
        <p>
          Pierwszą grupę uprość, rozwijając <Mi>{"\\sin 3x = \\sin(x + 2x)"}</Mi> i redukując.
          Drugą zamień wzorem <Mi>{"\\cos 2x - 1 = -2\\sin^2 x"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przenosimy i grupujemy</p>
        <Mb>{"\\sin 3x - 2\\sin x\\cos 2x + \\cos 2x - 1 = 0"}</Mb>

        <p className="font-semibold text-stone-800">
          Krok 2. Upraszczamy <Mi>{"\\sin 3x - 2\\sin x \\cos 2x"}</Mi>
        </p>
        <p>Korzystamy ze wzoru na sinus sumy:</p>
        <Mb>{"\\sin 3x = \\sin(x + 2x) = \\sin x \\cos 2x + \\cos x \\sin 2x"}</Mb>
        <p>Podstawiamy:</p>
        <Mb>
          {"\\sin x\\cos 2x + \\cos x\\sin 2x - 2\\sin x\\cos 2x = \\cos x\\sin 2x - \\sin x\\cos 2x"}
        </Mb>
        <p>
          Rozpoznajemy wzór na sinus różnicy{" "}
          <Mi>{"\\sin(A - B) = \\sin A\\cos B - \\cos A\\sin B"}</Mi>:
        </p>
        <Mb>
          {"\\cos x\\sin 2x - \\sin x\\cos 2x = \\sin(2x - x) = \\sin x"}
        </Mb>

        <p className="font-semibold text-stone-800">
          Krok 3. Upraszczamy <Mi>{"\\cos 2x - 1"}</Mi>
        </p>
        <FormulaBox>
          <Mb>{"\\cos 2x - 1 = -2\\sin^2 x"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Równanie po uproszczeniu</p>
        <Mb>{"\\sin x - 2\\sin^2 x = 0"}</Mb>
        <Mb>{"\\sin x\\,(1 - 2\\sin x) = 0"}</Mb>
        <p>Dwa przypadki:</p>
        <Mb>{"\\sin x = 0 \\qquad \\text{lub} \\qquad \\sin x = \\tfrac{1}{2}"}</Mb>
        <p>
          Oznaczmy <Mi>{"u = x"}</Mi>. Na jednym wykresie <Mi>{"\\sin u"}</Mi> w przedziale{" "}
          <Mi>{"[0,\\,2\\pi]"}</Mi> zaznaczamy oba przypadki:{" "}
          <span className="font-semibold text-[#ea580c]">pomarańczowe</span> kropki to{" "}
          <Mi>{"\\sin u = 0"}</Mi>, a{" "}
          <span className="font-semibold text-[#2563eb]">niebieskie</span> to{" "}
          <Mi>{"\\sin u = \\tfrac{1}{2}"}</Mi> (przerywana poziomica).
        </p>
        <TrigGraph
          fn="sin"
          yGuide={0.5}
          yGuideColor="#2563eb"
          ariaLabel="Wykres sin u: zera (pomarańczowe) oraz punkty, w których sin u = 1/2 (niebieskie)"
          points={[
            { u: 0, y: 0, color: "#ea580c" },
            { u: Math.PI, y: 0, color: "#ea580c" },
            { u: 2 * Math.PI, y: 0, color: "#ea580c" },
            {
              u: Math.PI / 6,
              y: 0.5,
              color: "#2563eb",
              frac: { num: "π", den: "6" },
              labelDy: 18,
            },
            {
              u: (5 * Math.PI) / 6,
              y: 0.5,
              color: "#2563eb",
              frac: { num: "5π", den: "6" },
              labelDy: 18,
            },
          ]}
        />
        <p>
          Stąd odczytujemy rozwiązania ogólne (krok 5).
        </p>

        <p className="font-semibold text-stone-800">Krok 5. Rozwiązania ogólne</p>
        <Mb>{"\\sin x = 0 \\quad \\Longrightarrow \\quad x = n\\pi, \\quad n \\in \\mathbb{Z}"}</Mb>
        <Mb>
          {"\\sin x = \\tfrac{1}{2} \\quad \\Longrightarrow \\quad x = \\tfrac{\\pi}{6} + 2n\\pi \\quad \\text{lub} \\quad x = \\tfrac{5\\pi}{6} + 2n\\pi, \\quad n \\in \\mathbb{Z}"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 6. Odpowiedzi na podpunkty</p>

        <p><strong>a)</strong> Przedział <Mi>{"(0, \\pi)"}</Mi> (otwarty):</p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li><Mi>{"\\sin x = 0"}</Mi>: <Mi>{"x = 0"}</Mi> i <Mi>{"x = \\pi"}</Mi> nie należą do przedziału otwartego.</li>
          <li><Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi>: <Mi>{"x = \\tfrac{\\pi}{6} \\in (0, \\pi)"}</Mi> ✓ oraz <Mi>{"x = \\tfrac{5\\pi}{6} \\in (0, \\pi)"}</Mi> ✓</li>
        </ul>
        <Mb>{"\\text{Odpowiedź: } 2"}</Mb>

        <p><strong>b)</strong> Przedział <Mi>{"[-2\\pi,\\, 2\\pi]"}</Mi>:</p>
        <p><Mi>{"\\sin x = 0"}</Mi>: <Mi>{"x \\in \\{-2\\pi,\\, -\\pi,\\, 0,\\, \\pi,\\, 2\\pi\\}"}</Mi>. Suma daje <Mi>{" 0"}</Mi>.</p>
        <p>
          <Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi>:{" "}
          <Mi>{"x \\in \\bigl\\{\\tfrac{\\pi}{6},\\; \\tfrac{5\\pi}{6},\\; -\\tfrac{7\\pi}{6},\\; -\\tfrac{11\\pi}{6}\\bigr\\}"}</Mi>
        </p>
        <Mb>
          {"\\tfrac{\\pi}{6} + \\tfrac{5\\pi}{6} - \\tfrac{7\\pi}{6} - \\tfrac{11\\pi}{6} = \\frac{1 + 5 - 7 - 11}{6}\\,\\pi = \\frac{-12}{6}\\,\\pi = -2\\pi"}
        </Mb>
        <Mb>{"\\text{Suma: } 0 + (-2\\pi) = -2\\pi \\approx -6"}</Mb>

        <p><strong>c)</strong> Najmniejsze dodatnie rozwiązanie:</p>
        <p>
          Dodatnie rozwiązania to: <Mi>{"\\tfrac{\\pi}{6},\\; \\tfrac{5\\pi}{6},\\; \\pi,\\; 2\\pi,\\; \\ldots"}</Mi>{" "}
          Najmniejsze: <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi>.
        </p>

        <p><strong>d)</strong> Rozwiązania wymierne:</p>
        <p>
          Z <Mi>{"\\sin x = 0"}</Mi> mamy <Mi>{"x = n\\pi"}</Mi>. Liczba <Mi>{"n\\pi"}</Mi> jest
          wymierna tylko dla <Mi>{"n = 0"}</Mi> (bo <Mi>{"\\pi"}</Mi> jest niewymierne).
          Rozwiązania z <Mi>{"\\sin x = \\tfrac{1}{2}"}</Mi> to wielokrotności <Mi>{"\\pi"}</Mi>,
          więc też niewymierne.
        </p>
        <Mb>{"\\text{Jedyne rozwiązanie wymierne: } x = 0 \\quad \\Longrightarrow \\quad 1"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"2"}</Mi>, b) <Mi>{"-2\\pi \\approx -6"}</Mi>,
            c) <Mi>{"\\dfrac{\\pi}{6} \\approx 0{,}5"}</Mi>, d) <Mi>{"1"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function TrygonometriaPage() {
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
          <span className="text-sm text-stone-400">Trygonometria</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 10
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Trygonometria
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
