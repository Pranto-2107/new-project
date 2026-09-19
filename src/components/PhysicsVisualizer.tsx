import React, { useState, useRef, useEffect } from 'react';
import { Compass, RotateCcw, Play, CheckCircle2, Sparkles, HelpCircle, Layers } from 'lucide-react';

export const PhysicsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projectile' | 'vector' | 'circuit'>('projectile');

  // --- 1. Projectile State ---
  const [velocity, setVelocity] = useState<number>(30); // m/s
  const [angle, setAngle] = useState<number>(45); // degrees
  const [gravity] = useState<number>(9.8); // m/s^2
  const projectileCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculations for Projectile
  const rad = (angle * Math.PI) / 180;
  const maxHeight = (Math.pow(velocity * Math.sin(rad), 2) / (2 * gravity));
  const totalRange = (Math.pow(velocity, 2) * Math.sin(2 * rad)) / gravity;
  const flightTime = (2 * velocity * Math.sin(rad)) / gravity;

  // Render Projectile Canvas
  useEffect(() => {
    if (activeTab !== 'projectile') return;
    const canvas = projectileCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padX = 40;
    const padY = 40;
    const groundY = height - padY;

    // Draw Ground
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padX - 10, groundY);
    ctx.lineTo(width - 20, groundY);
    ctx.stroke();

    // Ground Grass / Hatch lines
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    for (let x = padX - 10; x < width - 20; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x - 8, groundY + 10);
      ctx.stroke();
    }

    // Scale calculation: determine max X and max Y
    const maxSimX = Math.max(totalRange * 1.15, 60);
    const maxSimY = Math.max(maxHeight * 1.35, 25);
    const scaleX = (width - padX - 40) / maxSimX;
    const scaleY = (groundY - padY) / maxSimY;

    // Draw grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let yVal = 10; yVal < maxSimY; yVal += 10) {
      const yPixel = groundY - yVal * scaleY;
      ctx.beginPath();
      ctx.moveTo(padX, yPixel);
      ctx.lineTo(width - 30, yPixel);
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Plus Jakarta Sans';
      ctx.fillText(`${yVal}m`, 10, yPixel + 3);
    }

    // Draw Trajectory Parabola
    ctx.beginPath();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 3;
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * flightTime;
      const x = velocity * Math.cos(rad) * t;
      const y = velocity * Math.sin(rad) * t - 0.5 * gravity * t * t;

      const px = padX + x * scaleX;
      const py = groundY - y * scaleY;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Draw Apex (Peak) Indicator
    const apexX = padX + (totalRange / 2) * scaleX;
    const apexY = groundY - maxHeight * scaleY;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(apexX, apexY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Dashed lines to apex
    ctx.strokeStyle = '#f87171';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(apexX, groundY);
    ctx.lineTo(apexX, apexY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 11px Plus Jakarta Sans';
    ctx.fillText(`H = ${maxHeight.toFixed(1)}m`, apexX - 25, apexY - 10);

    // Draw Landing Point
    const landX = padX + totalRange * scaleX;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(landX, groundY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#047857';
    ctx.font = 'bold 11px Plus Jakarta Sans';
    ctx.fillText(`Range R = ${totalRange.toFixed(1)}m`, Math.min(landX - 50, width - 110), groundY + 25);

    // Draw Launch Angle Arc at Origin
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(padX, groundY, 25, -rad, 0);
    ctx.stroke();

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 10px Plus Jakarta Sans';
    ctx.fillText(`θ = ${angle}°`, padX + 30, groundY - 8);

    // Draw Initial Velocity Vector Arrow
    const arrowLen = 45;
    const ax = padX + arrowLen * Math.cos(rad);
    const ay = groundY - arrowLen * Math.sin(rad);

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(padX, groundY);
    ctx.lineTo(ax, ay);
    ctx.stroke();

  }, [activeTab, velocity, angle, gravity, maxHeight, totalRange, flightTime, rad]);

  // --- 2. Vector Addition State ---
  const [vectorP, setVectorP] = useState<number>(40); // N
  const [vectorQ, setVectorQ] = useState<number>(30); // N
  const [alphaAngle, setAlphaAngle] = useState<number>(60); // degrees
  const vectorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Vector Math
  const alphaRad = (alphaAngle * Math.PI) / 180;
  const resultantR = Math.sqrt(
    vectorP * vectorP + vectorQ * vectorQ + 2 * vectorP * vectorQ * Math.cos(alphaRad)
  );
  const thetaRad = Math.atan2(
    vectorQ * Math.sin(alphaRad),
    vectorP + vectorQ * Math.cos(alphaRad)
  );
  const thetaDeg = (thetaRad * 180) / Math.PI;

  // Render Vector Canvas
  useEffect(() => {
    if (activeTab !== 'vector') return;
    const canvas = vectorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const originX = 60;
    const originY = height - 50;

    // Scale
    const maxVal = Math.max(vectorP + vectorQ, 100);
    const scale = (width - 120) / maxVal;

    // Vector P (along horizontal X)
    const px = originX + vectorP * scale;
    const py = originY;

    // Vector Q (at angle alpha)
    const qx = originX + vectorQ * Math.cos(alphaRad) * scale;
    const qy = originY - vectorQ * Math.sin(alphaRad) * scale;

    // Resultant R point (Diagonal)
    const rx = px + (qx - originX);
    const ry = py + (qy - originY);

    // Draw Parallelogram Dashed lines
    ctx.strokeStyle = '#cbd5e1';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;

    // Line from P to R
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(rx, ry);
    ctx.stroke();

    // Line from Q to R
    ctx.beginPath();
    ctx.moveTo(qx, qy);
    ctx.lineTo(rx, ry);
    ctx.stroke();

    ctx.setLineDash([]);

    // Helper: Draw Vector Arrow
    const drawArrow = (x1: number, y1: number, x2: number, y2: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Arrow head
      const headlen = 10;
      const angleHead = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angleHead - Math.PI / 6), y2 - headlen * Math.sin(angleHead - Math.PI / 6));
      ctx.lineTo(x2 - headlen * Math.cos(angleHead + Math.PI / 6), y2 - headlen * Math.sin(angleHead + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.font = 'bold 12px Plus Jakarta Sans';
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.fillText(label, midX - 10, midY - 10);
    };

    // Draw P
    drawArrow(originX, originY, px, py, '#2563eb', `P = ${vectorP} N`);
    // Draw Q
    drawArrow(originX, originY, qx, qy, '#10b981', `Q = ${vectorQ} N`);
    // Draw Resultant R
    drawArrow(originX, originY, rx, ry, '#e11d48', `R = ${resultantR.toFixed(1)} N`);

    // Draw Origin dot
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(originX, originY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw Arc for Theta (Angle of R with P)
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(originX, originY, 30, -thetaRad, 0);
    ctx.stroke();
    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 10px Plus Jakarta Sans';
    ctx.fillText(`θ=${thetaDeg.toFixed(1)}°`, originX + 35, originY - 12);

  }, [activeTab, vectorP, vectorQ, alphaAngle, alphaRad, resultantR, thetaRad, thetaDeg]);

  // --- 3. Circuit & Ohm's Law State ---
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance, setResistance] = useState<number>(6); // Ohms
  const currentAmp = voltage / resistance;
  const powerWatt = voltage * currentAmp;

  return (
    <section id="interactive-lab" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-semibold border border-indigo-700/60 mb-3">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Physics Concept Lab</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            See Physics in Action: <span className="text-indigo-400">Play, Test, Understand.</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            সূত্রের মুখস্থ নয়, সরাসরি স্লাইডার ঘুরিয়ে দেখুন কিভাবে প্রাসের বেগ বা ভেক্টরের লব্ধি পরিবর্তিত হয়।
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-800/90 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('projectile')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'projectile'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🚀 প্রাস ও প্রক্ষেপক (Projectile Motion)
            </button>
            <button
              onClick={() => setActiveTab('vector')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'vector'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🧭 ভেক্টর সামান্তরিক সূত্র (Vector Resultant)
            </button>
            <button
              onClick={() => setActiveTab('circuit')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'circuit'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ⚡ ওহমের সূত্র ও ক্ষমতা (Ohm's Law & Circuit)
            </button>
          </div>
        </div>

        {/* Main Lab Canvas & Controls Container */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* TAB 1: PROJECTILE MOTION */}
          {activeTab === 'projectile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-4 space-y-5 bg-slate-900/80 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    প্যারামিটার পরিবর্তন করুন
                  </h3>
                  <button
                    onClick={() => { setVelocity(30); setAngle(45); }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    রিসেট
                  </button>
                </div>

                {/* Velocity Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">আদিবেগ (Velocity v₀):</span>
                    <span className="text-indigo-400 font-bold font-mono">{velocity} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10 m/s</span>
                    <span>60 m/s</span>
                  </div>
                </div>

                {/* Angle Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">নিক্ষেপ কোণ (Angle θ):</span>
                    <span className="text-amber-400 font-bold font-mono">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>15°</span>
                    <span className="text-amber-400 font-semibold">Max Range: 45°</span>
                    <span>80°</span>
                  </div>
                </div>

                {/* Real-time Math Output Badges */}
                <div className="pt-4 border-t border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">পাল্লা (Horizontal Range R):</span>
                    <span className="font-mono font-bold text-emerald-400">{totalRange.toFixed(2)} m</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">সর্বোচ্চ উচ্চতা (Max Height H):</span>
                    <span className="font-mono font-bold text-rose-400">{maxHeight.toFixed(2)} m</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">বিচরণকাল (Flight Time T):</span>
                    <span className="font-mono font-bold text-indigo-400">{flightTime.toFixed(2)} s</span>
                  </div>
                </div>

                <div className="p-2.5 bg-indigo-950/60 border border-indigo-800/60 rounded-lg text-[11px] text-indigo-200">
                  💡 <strong>বোর্ড ট্রিক:</strong> ৪টি কোণের মধ্যে ৪৫° কোণে নিক্ষেপ করলেই পাল্লা সর্বাধিক (R_max = v₀² / g) হয়!
                </div>
              </div>

              {/* Canvas Visualization */}
              <div className="lg:col-span-8 bg-slate-950 rounded-xl p-4 border border-slate-800 relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    রিয়েল-টাইম গতিপথ (Trajectory Parabola)
                  </span>
                  <span className="text-[11px] font-mono">g = 9.8 m/s² (Earth)</span>
                </div>
                <div className="overflow-x-auto">
                  <canvas
                    ref={projectileCanvasRef}
                    width={600}
                    height={320}
                    className="w-full max-w-full block"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VECTOR RESULTANT */}
          {activeTab === 'vector' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-4 space-y-5 bg-slate-900/80 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    ভেক্টর মান ও মধ্যবর্তী কোণ
                  </h3>
                  <button
                    onClick={() => { setVectorP(40); setVectorQ(30); setAlphaAngle(60); }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    রিসেট
                  </button>
                </div>

                {/* Vector P */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-blue-400 font-semibold">ভেক্টর P এর মান:</span>
                    <span className="text-blue-400 font-bold font-mono">{vectorP} N</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={vectorP}
                    onChange={(e) => setVectorP(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Vector Q */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-emerald-400 font-semibold">ভেক্টর Q এর মান:</span>
                    <span className="text-emerald-400 font-bold font-mono">{vectorQ} N</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={vectorQ}
                    onChange={(e) => setVectorQ(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Alpha Angle */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">মধ্যবর্তী কোণ (α):</span>
                    <span className="text-amber-400 font-bold font-mono">{alphaAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={alphaAngle}
                    onChange={(e) => setAlphaAngle(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0° (একই দিকে)</span>
                    <span>90° (লম্ব)</span>
                    <span>180° (বিপরীত)</span>
                  </div>
                </div>

                {/* Calculations */}
                <div className="pt-4 border-t border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">লব্ধির মান (Resultant R):</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">{resultantR.toFixed(2)} N</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">P এর সাথে লব্ধির কোণ (θ):</span>
                    <span className="font-mono font-bold text-amber-400">{thetaDeg.toFixed(1)}°</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-mono">
                  R = √(P² + Q² + 2PQ cos α)
                </div>
              </div>

              {/* Canvas Visualization */}
              <div className="lg:col-span-8 bg-slate-950 rounded-xl p-4 border border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span className="font-medium text-slate-200">
                    সামান্তরিকের কর্ণ বরাবর লব্ধি (Vector Parallelogram Law)
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-blue-400">■ Vector P</span>
                    <span className="text-emerald-400">■ Vector Q</span>
                    <span className="text-rose-400 font-bold">■ Resultant R</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <canvas
                    ref={vectorCanvasRef}
                    width={600}
                    height={320}
                    className="w-full max-w-full block"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CIRCUIT & OHM'S LAW */}
          {activeTab === 'circuit' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-5 bg-slate-900/80 p-5 rounded-xl border border-slate-700">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  ওহমের সূত্র ও বৈদ্যুতিক ক্ষমতা
                </h3>

                {/* Voltage */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">বিভব পার্থক্য (Voltage V):</span>
                    <span className="text-amber-400 font-bold font-mono">{voltage} Volts</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Resistance */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">রোধ (Resistance R):</span>
                    <span className="text-indigo-400 font-bold font-mono">{resistance} Ω (Ohms)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={resistance}
                    onChange={(e) => setResistance(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Outputs */}
                <div className="pt-4 border-t border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">তড়িৎ প্রবাহ (Current I = V / R):</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{currentAmp.toFixed(2)} Amperes</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800">
                    <span className="text-slate-300">ব্যয়িত ক্ষমতা (Power P = V · I):</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">{powerWatt.toFixed(1)} Watts</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-lg text-xs text-amber-200">
                  💡 <strong>লক্ষ্য করুন:</strong> রোধ (R) অর্ধেক করলে তড়িৎ প্রবাহ (I) দ্বিগুণ হয়, কিন্তু বাল্বের ক্ষমতা ও তাপ উৎপাদন ৪ গুণ বৃদ্ধি পায় ($P = I^2 R$)!
                </div>
              </div>

              {/* Visual Bulb / Circuit Component */}
              <div className="lg:col-span-7 bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                <div className="text-center mb-6">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    সার্কিট লোড ও বাল্বের উজ্জ্বলতা (Bulb Glow Simulation)
                  </span>
                </div>

                {/* Glowing Light Bulb UI */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="w-28 h-28 rounded-full transition-all duration-300 flex items-center justify-center text-4xl"
                    style={{
                      backgroundColor: `rgba(245, 158, 11, ${Math.min(0.2 + (powerWatt / 100), 0.95)})`,
                      boxShadow: `0 0 ${Math.min(powerWatt * 2.5, 90)}px rgba(245, 158, 11, ${Math.min(0.3 + (powerWatt / 100), 0.9)})`,
                      border: '2px solid rgba(251, 191, 36, 0.8)',
                    }}
                  >
                    💡
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm text-center">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-[11px] text-slate-400">Current Flow</p>
                    <p className="text-lg font-bold font-mono text-emerald-400">{currentAmp.toFixed(2)} A</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-[11px] text-slate-400">Power Output</p>
                    <p className="text-lg font-bold font-mono text-rose-400">{powerWatt.toFixed(1)} W</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
