import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Particles } from './Particles';
import { MEHANDI_PATH, CREATION_PATH } from './glyphPaths';

interface PreloaderProps {
  onComplete: () => void;
}

// ── Centerline pen paths for the script (computed from the real Great Vibes
// glyphs: per-column vertical center). The cone rides these through the letters.
const MEHANDI_PEN =
  "M 210.98,269.44 L 220.93,266.30 L 230.88,262.64 L 240.82,258.56 L 250.77,253.61 L 260.72,247.30 L 270.67,262.61 L 280.62,251.66 L 290.57,242.53 L 300.52,240.34 L 310.46,241.95 L 320.41,271.61 L 330.36,260.19 L 340.31,251.52 L 350.26,265.05 L 360.21,251.63 L 370.16,277.80 L 380.10,277.57 L 390.05,275.87 L 400.00,269.56 L 409.95,289.54 L 419.90,289.35 L 429.85,289.45 L 439.80,273.27 L 449.74,277.17 L 459.69,272.70 L 469.64,298.24 L 479.59,281.52 L 489.54,290.04 L 499.49,292.56 L 509.43,285.99 L 519.38,296.29 L 529.33,289.27 L 539.28,288.02 L 549.23,289.60 L 559.18,276.99 L 569.13,272.35 L 579.07,268.33 L 589.02,288.38";

const CREATION_PEN =
  'M 278.05,379.71 L 287.47,367.80 L 296.88,363.13 L 306.30,361.46 L 315.72,362.94 L 325.13,364.34 ' +
  'L 334.55,362.17 L 343.97,358.90 L 353.38,374.57 L 362.80,384.32 L 372.22,383.81 L 381.63,379.56 ' +
  'L 391.05,384.18 L 400.47,380.34 L 409.88,382.82 L 419.30,385.44 L 428.72,377.27 L 438.13,373.60 ' +
  'L 447.55,377.77 L 456.97,378.26 L 466.38,381.12 L 475.80,380.52 L 485.22,389.08 L 494.63,379.68 ' +
  'L 504.05,382.76 L 513.47,381.84';

// Per-letter x boundaries (from the real font advances) used to split the
// centerline into individual letters so each is traced and revealed on its own.
const MEHANDI_SPLITS = [384.8, 418.5, 462.9, 507.5, 556.6];
const CREATION_SPLITS = [338.2, 362, 385.6, 418.5, 437, 453.2, 484.3];

type Pt = { x: number; y: number };
const parsePts = (d: string): Pt[] =>
  (d.match(/-?\d+\.?\d*,-?\d+\.?\d*/g) || []).map((s) => {
    const [x, y] = s.split(',').map(Number);
    return { x, y };
  });
const splitByX = (pts: Pt[], splits: number[]): Pt[][] => {
  const segs: Pt[][] = [];
  let li = 0, seg: Pt[] = [];
  for (const p of pts) {
    while (li < splits.length && p.x >= splits[li]) { li++; if (seg.length) { segs.push(seg); seg = []; } }
    seg.push(p);
  }
  if (seg.length) segs.push(seg);
  return segs;
};
const makePoly = (pts: Pt[]) => {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  const len = cum[cum.length - 1] || 1;
  const at = (dist: number): Pt => {
    const d = Math.max(0, Math.min(len, dist));
    let i = 1; while (i < cum.length && cum[i] < d) i++;
    const p0 = pts[i - 1], p1 = pts[i] || pts[i - 1];
    const segLen = (cum[i] ?? cum[i - 1]) - cum[i - 1] || 1;
    const fr = (d - cum[i - 1]) / segLen;
    return { x: p0.x + (p1.x - p0.x) * fr, y: p0.y + (p1.y - p0.y) * fr };
  };
  return { len, at };
};

// ── Mehndi floral element generators (absolute SVG paths in the 800×480 frame) ──
const f = (n: number) => n.toFixed(1);
const P = (x: number, y: number) => `${f(x)},${f(y)}`;
const D2R = Math.PI / 180;

// A teardrop petal/leaf outline the cone can trace.
function petal(cx: number, cy: number, ang: number, len: number, wid: number) {
  const a = ang * D2R;
  const dx = Math.cos(a), dy = Math.sin(a);
  const px = -dy, py = dx;
  const tx = cx + dx * len, ty = cy + dy * len;
  const m1x = cx + dx * len * 0.5 + px * wid, m1y = cy + dy * len * 0.5 + py * wid;
  const m2x = cx + dx * len * 0.5 - px * wid, m2y = cy + dy * len * 0.5 - py * wid;
  return `M ${P(cx, cy)} Q ${P(m1x, m1y)} ${P(tx, ty)} Q ${P(m2x, m2y)} ${P(cx, cy)} `;
}
function dot(cx: number, cy: number, r: number) {
  return `M ${P(cx - r, cy)} A ${f(r)} ${f(r)} 0 1 1 ${P(cx + r, cy)} A ${f(r)} ${f(r)} 0 1 1 ${P(cx - r, cy)} `;
}
function flower(cx: number, cy: number, outerLen: number, innerLen: number, petals: number) {
  let d = dot(cx, cy, 3.5);
  for (let i = 0; i < petals; i++) d += petal(cx, cy, (360 / petals) * i, outerLen, outerLen * 0.32);
  for (let i = 0; i < petals; i++) d += petal(cx, cy, (360 / petals) * i + 180 / petals, innerLen, innerLen * 0.34);
  return d.trim();
}
function vine(x1: number, y1: number, x2: number, y2: number, bx: number, by: number) {
  return `M ${P(x1, y1)} Q ${P(bx, by)} ${P(x2, y2)}`;
}

interface El { d: string; stroke: string; sw: number; }

function buildFlorals(): El[] {
  const HENNA = '#4B2F25';
  const BLUSH = '#C79A92';
  const cx = 400;
  const els: El[] = [];

  // 1) central flower — petals form first
  els.push({ d: flower(cx, 104, 38, 21, 8), stroke: HENNA, sw: 2.4 });

  // 2) leaves (left then right)
  els.push({
    d: petal(338, 150, 205, 26, 9) + petal(300, 162, 215, 23, 8) + petal(262, 168, 226, 21, 8),
    stroke: HENNA, sw: 2.2,
  });
  els.push({
    d: petal(462, 150, -25, 26, 9) + petal(500, 162, -35, 23, 8) + petal(538, 168, -46, 21, 8),
    stroke: HENNA, sw: 2.2,
  });

  // 3) vines connecting the flower outward
  els.push({ d: vine(372, 120, 232, 172, 312, 188), stroke: HENNA, sw: 2.2 });
  els.push({ d: vine(428, 120, 568, 172, 488, 188), stroke: HENNA, sw: 2.2 });

  // 4) small end flowers
  els.push({ d: flower(224, 172, 17, 9, 5), stroke: BLUSH, sw: 2.0 });
  els.push({ d: flower(576, 172, 17, 9, 5), stroke: BLUSH, sw: 2.0 });

  // 5) accent dots scattered around the crown
  els.push({
    d: dot(400, 60, 3) + dot(360, 78, 2.4) + dot(440, 78, 2.4) + dot(300, 138, 2.4)
      + dot(500, 138, 2.4) + dot(250, 150, 2.2) + dot(550, 150, 2.2),
    stroke: BLUSH, sw: 2.0,
  });

  return els;
}

const FLORALS = buildFlorals();

// Bottom finishing flourish under "Creation"
const BOTTOM_FLOURISH =
  vine(330, 430, 400, 424, 365, 426) + vine(470, 430, 400, 424, 435, 426)
  + petal(400, 424, -90, 12, 5) + dot(330, 430, 2.6) + dot(470, 430, 2.6);

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const floralRefs = useRef<(SVGPathElement | null)[]>([]);
  const bottomRef = useRef<SVGPathElement | null>(null);
  const mehandiPenRef = useRef<SVGPathElement | null>(null);
  const creationPenRef = useRef<SVGPathElement | null>(null);
  const mehandiWipeRef = useRef<SVGRectElement | null>(null);
  const creationWipeRef = useRef<SVGRectElement | null>(null);
  const coneGroupRef = useRef<SVGGElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number>(0);

  const [isActive, setIsActive] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  const resetStage = () => {
    [...floralRefs.current, bottomRef.current].forEach((p) => {
      if (p) { p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; }
    });
    if (mehandiWipeRef.current) mehandiWipeRef.current.setAttribute('width', '0');
    if (creationWipeRef.current) creationWipeRef.current.setAttribute('width', '0');
    const cone = coneGroupRef.current;
    if (cone) {
      cone.setAttribute('transform', 'translate(-120, 560) rotate(0)');
      cone.style.opacity = '0';
    }
  };

  const showFinalFrame = () => {
    [...floralRefs.current, bottomRef.current].forEach((p) => {
      if (p) p.style.strokeDashoffset = '0';
    });
    if (mehandiWipeRef.current) mehandiWipeRef.current.setAttribute('width', '800');
    if (creationWipeRef.current) creationWipeRef.current.setAttribute('width', '800');
    if (coneGroupRef.current) coneGroupRef.current.style.opacity = '0';
    setDetailsVisible(true);
    setControlsVisible(true);
  };

  const runSequence = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resetStage(); showFinalFrame(); return;
    }

    tlRef.current?.kill();
    cancelAnimationFrame(rafRef.current);
    resetStage();

    const cone = coneGroupRef.current;
    const mPen = mehandiPenRef.current;
    const cPen = creationPenRef.current;
    const mWipe = mehandiWipeRef.current;
    const cWipe = creationWipeRef.current;
    if (!cone || !mPen || !cPen || !mWipe || !cWipe) return;

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const t = { cx: -120, cy: 560, copacity: 0 };

    const moveConeXY = (tilt: number) => {
      const wob = Math.sin(Date.now() * 0.008) * 1.4;
      cone.setAttribute('transform', `translate(${t.cx}, ${t.cy}) rotate(${tilt + wob})`);
      cone.style.opacity = t.copacity.toString();
    };

    // Keep the cone upright with a gentle lean (never flips upside down).
    const placeCone = (pathEl: SVGPathElement, total: number, p: number) => {
      const l = clamp(total * p, 0, total);
      const pt = pathEl.getPointAtLength(l);
      const pt2 = pathEl.getPointAtLength(Math.min(total, l + 0.5));
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      const wob = Math.sin(Date.now() * 0.008) * 1.2;
      const tilt = 16 + clamp(ang, -45, 45) * 0.28 + wob;
      cone.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${tilt})`);
      cone.style.opacity = '1';
    };

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setDetailsVisible(true);
        setTimeout(() => setControlsVisible(true), 900);
      },
    });
    tlRef.current = tl;

    // glide the (lifted) cone to a point, then draw an element while the cone rides it
    const addElement = (pathEl: SVGPathElement) => {
      const total = pathEl.getTotalLength();
      const start = pathEl.getPointAtLength(0);
      const end = pathEl.getPointAtLength(total);
      const drawDur = clamp(total / 430, 0.26, 0.95);

      tl.to(t, {
        cx: start.x, cy: start.y, duration: 0.14, ease: 'power1.inOut',
        onUpdate: () => moveConeXY(16),
      });
      const o = { p: 0 };
      tl.to(o, {
        p: 1, duration: drawDur, ease: 'none',
        onUpdate: () => {
          pathEl.style.strokeDashoffset = `${1 - o.p}`;
          placeCone(pathEl, total, o.p);
        },
      });
      tl.call(() => { t.cx = end.x; t.cy = end.y; });
    };

    // write a word LETTER BY LETTER: the cone traces each letter's centerline and
    // that letter is revealed as it is traced, then a brief pause, then the next.
    const addWord = (penD: string, splits: number[], wipe: SVGRectElement, totalDur: number) => {
      const segs = splitByX(parsePts(penD), splits);
      const polys = segs.map(makePoly);
      const totLen = polys.reduce((a, p) => a + p.len, 0) || 1;

      // glide to the first letter
      const s0 = segs[0][0];
      tl.to(t, {
        cx: s0.x, cy: s0.y, duration: 0.4, ease: 'power2.inOut',
        onUpdate: () => moveConeXY(20),
      });

      polys.forEach((P, idx) => {
        const seg = segs[idx];
        const dur = Math.max(0.22, totalDur * (P.len / totLen));
        const o = { p: 0 };
        tl.to(o, {
          p: 1, duration: dur, ease: 'none',
          onUpdate: () => {
            const pt = P.at(P.len * o.p);
            const pt2 = P.at(Math.min(P.len, P.len * o.p + 0.5));
            const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
            const tilt = 22 + clamp(ang, -45, 45) * 0.3 + Math.sin(Date.now() * 0.008) * 1.2;
            cone.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${tilt})`);
            cone.style.opacity = '1';
            wipe.setAttribute('width', `${pt.x + 8}`);
          },
        });
        tl.call(() => {
          const e = seg[seg.length - 1];
          wipe.setAttribute('width', `${e.x + 8}`); t.cx = e.x; t.cy = e.y;
        });
        tl.to({}, { duration: 0.13 }); // brief settle before the next letter
      });
      tl.call(() => { wipe.setAttribute('width', '800'); });
    };

    // 0. cone enters
    const first = floralRefs.current[0];
    const fp = first ? first.getPointAtLength(0) : { x: 400, y: 104 };
    tl.to(t, {
      cx: fp.x, cy: fp.y, copacity: 1, duration: 1.0, ease: 'power2.out',
      onUpdate: () => moveConeXY(16),
    });

    // 1. draw every mehndi floral element one by one
    floralRefs.current.forEach((p) => { if (p) addElement(p); });

    // 2. write the script — letter by letter
    addWord(MEHANDI_PEN, MEHANDI_SPLITS, mWipe, 3.0);
    addWord(CREATION_PEN, CREATION_SPLITS, cWipe, 2.6);

    // 3. finishing flourish
    if (bottomRef.current) addElement(bottomRef.current);

    // 4. cone exits
    tl.to(t, {
      cx: 920, cy: 560, copacity: 0, duration: 1.0, ease: 'power2.inOut',
      onUpdate: () => moveConeXY(14),
    }, '+=0.2');

    // drive from the wall clock (true real-time, never fast-forwards on load)
    const dur = tl.duration();
    const startAt = performance.now();
    const drive = () => {
      const acc = (performance.now() - startAt) / 1000;
      tl.time(Math.min(acc, dur));
      if (acc < dur) rafRef.current = requestAnimationFrame(drive);
      else tl.time(dur);
    };
    rafRef.current = requestAnimationFrame(drive);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => runSequence());
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafRef.current);
      tlRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReplay = () => {
    setDetailsVisible(false);
    setControlsVisible(false);
    runSequence();
  };

  // Click / tap anywhere during the draw to skip to the finished logo.
  const handleSkip = () => {
    if (controlsVisible) return; // already done (or showing controls)
    tlRef.current?.kill();
    cancelAnimationFrame(rafRef.current);
    showFinalFrame();
  };

  const handleEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'all 1.0s cubic-bezier(0.25, 1, 0.5, 1)';
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'scale(1.05)';
      containerRef.current.style.filter = 'blur(10px)';
    }
    setTimeout(() => { setIsActive(false); onComplete(); }, 1000);
  };

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={`preloader-container ${isActive ? 'preloader-active' : ''}`}
      onClick={handleSkip}
      style={{ cursor: controlsVisible ? 'default' : 'pointer' }}
    >
      <Particles />

      {/* Skip hint — shown only while the logo is still drawing */}
      {!controlsVisible && <div className="skip-hint">Tap to skip</div>}

      <div className="calligraphy-stage">
        <svg className="calligraphy-svg" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cone-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f000c" />
              <stop offset="25%" stopColor="#8b001a" />
              <stop offset="50%" stopColor="#aa7c11" />
              <stop offset="75%" stopColor="#1b4d3e" />
              <stop offset="100%" stopColor="#0b291f" />
            </linearGradient>
            <linearGradient id="cone-foil-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="rgba(255, 215, 0, 0.4)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="55%" stopColor="rgba(255, 215, 0, 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#aa7c11" />
              <stop offset="50%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#aa7c11" />
            </linearGradient>

            <path ref={mehandiPenRef} d={MEHANDI_PEN} fill="none" stroke="none" />
            <path ref={creationPenRef} d={CREATION_PEN} fill="none" stroke="none" />

            <mask id="reveal-mehandi" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="480">
              <rect ref={mehandiWipeRef} x="0" y="0" width="0" height="480" fill="#ffffff" />
            </mask>
            <mask id="reveal-creation" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="480">
              <rect ref={creationWipeRef} x="0" y="0" width="0" height="480" fill="#ffffff" />
            </mask>
          </defs>

          {/* Mehndi floral elements — drawn one by one by the cone */}
          {FLORALS.map((el, i) => (
            <path
              key={i}
              ref={(node) => { floralRefs.current[i] = node; }}
              d={el.d}
              fill="none"
              stroke={el.stroke}
              strokeWidth={el.sw}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          ))}

          {/* Script — elegant Great Vibes, revealed as the cone writes it */}
          <path d={MEHANDI_PATH} fill="#4B2F25" mask="url(#reveal-mehandi)" />
          <path d={CREATION_PATH} fill="#C79A92" mask="url(#reveal-creation)" />

          {/* Bottom finishing flourish */}
          <path
            ref={bottomRef}
            d={BOTTOM_FLOURISH}
            fill="none"
            stroke="#C79A92"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />

          {/* 3D-Shaded Henna Cone */}
          <g
            ref={coneGroupRef}
            style={{ pointerEvents: 'none', opacity: 0, filter: 'drop-shadow(-3px 5px 6px rgba(0, 0, 0, 0.2))' }}
          >
            <path d="M 0,0 L 12,-120 L -12,-120 Z" fill="url(#cone-body-grad)" stroke="url(#gold-grad)" strokeWidth="0.4" />
            <path d="M 0,0 L 12,-120 L -12,-120 Z" fill="url(#cone-foil-grad)" opacity="0.6" />
            <path d="M 4,-38 L -4,-38 L -5,-52 L 5,-52 Z" fill="url(#gold-grad)" />
            <path d="M 8,-82 L -8,-82 L -10,-98 L 10,-98 Z" fill="url(#gold-grad)" opacity="0.8" />
            <text x="0" y="-74" fill="#FFF5EE" fontSize="5" fontFamily="Playfair Display, serif" fontWeight="bold" textAnchor="middle" transform="rotate(15)" opacity="0.85">ILMA</text>
            <path d="M 0,0 L 2,-9 L -2,-9 Z" fill="#361f17" />
          </g>
        </svg>
      </div>

      <div className={`brand-details ${detailsVisible ? 'brand-details-visible' : ''}`}>
        <div className="artist-tag">By Certified Artist Ilma Multani</div>
        <div className="location-tag">Traditional Artistry • Modern Luxury</div>
      </div>

      <div className={`intro-controls ${controlsVisible ? 'controls-visible' : ''}`}>
        <button className="btn-luxury" onClick={handleReplay}>Replay Intro</button>
        <button className="btn-luxury btn-primary-luxury" onClick={handleEnter}>Enter Experience</button>
      </div>
    </div>
  );
};
