import React, { useState } from 'react';
import { FORMULAS } from '../data/formulas';
import { Formula } from '../types';
import { 
  Sparkles, 
  AlertTriangle, 
  Zap, 
  Search, 
  Download, 
  Check, 
  Copy,
  BookOpen
} from 'lucide-react';

export const FormulaVault: React.FC = () => {
  const [activePaper, setActivePaper] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const papers = ['All', 'HSC 1st', 'HSC 2nd', 'SSC'];

  const filteredFormulas = FORMULAS.filter((f) => {
    const matchesPaper = activePaper === 'All' || f.paper === activePaper;
    const matchesSearch = 
      f.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.titleBangla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.latexEquation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPaper && matchesSearch;
  });

  const handleCopy = (formula: Formula) => {
    navigator.clipboard.writeText(`${formula.titleBangla}: ${formula.latexEquation}`);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="formulas" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>বোর্ড ও ভর্তি পরীক্ষার ফর্মুলা ব্যাংক</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Formula Vault: <span className="text-indigo-600">Zero Mistakes, Pure Speed.</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              বোর্ড পরীক্ষায় শিক্ষার্থীরা কোথায় ভুল করে (Traps) এবং কীভাবে ১০ সেকেন্ডে সমাধান করবেন (Shortcut Hacks)।
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ফর্মুলা বা অধ্যায় খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Download Sheet Trigger */}
            <button
              onClick={() => alert('Download initiated: HSC & SSC Physics Ultimate Formula Sheet (Color PDF, 42 Pages)...')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">কালারফুল PDF ডাউনলোড</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Paper Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {papers.map((paper) => (
            <button
              key={paper}
              onClick={() => setActivePaper(paper)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activePaper === paper
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {paper === 'All' ? 'সকল পেপার' : paper}
            </button>
          ))}
        </div>

        {/* Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {f.chapter}
                </span>
                <button
                  onClick={() => handleCopy(f)}
                  className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 transition"
                  title="Copy Formula"
                >
                  {copiedId === f.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">
                {f.titleBangla}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-3">
                {f.titleEnglish}
              </p>

              {/* Formula Math Box */}
              <div className="my-3 p-4 bg-slate-900 text-amber-300 rounded-xl font-mono text-center text-sm sm:text-base font-bold tracking-wider overflow-x-auto shadow-inner">
                {f.latexEquation}
              </div>

              {/* Variables breakdown */}
              <div className="my-3 text-xs space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">
                  প্রতীক ও একক (SI Units):
                </p>
                {f.variables.map((v, vIdx) => (
                  <div key={vIdx} className="flex items-start justify-between text-slate-600 py-0.5 border-b border-slate-100/80 last:border-0">
                    <span className="font-semibold text-slate-800">{v.symbol}:</span>
                    <span className="text-slate-600 text-right">
                      {v.meaning} <strong className="text-indigo-600">[{v.unit}]</strong>
                    </span>
                  </div>
                ))}
              </div>

              {/* Traps & Hacks */}
              <div className="space-y-2 mt-4 text-xs">
                {/* Board Trap */}
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-rose-950">বোর্ড পরীক্ষার ফাঁদ (Common Trap): </strong>
                    <span>{f.boardExamTrap}</span>
                  </div>
                </div>

                {/* Shortcut Hack */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-emerald-950">১০ সেকেন্ডের হ্যাক (Admission Shortcut): </strong>
                    <span>{f.shortcutHack}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
