/**
 * Wykresy SVG — wydzielone z page.js.
 */

export const LineDiagram = ({
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
export const DiagramMonotonicznosc = () => (
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
export const PolygonDiagram = ({ vertices, xRange = [0, 6], yRange = [0, 5], className = "" }) => {
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
export const ThreeLinesDiagram = ({
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
export const DiagramCwiartki = () => (
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
