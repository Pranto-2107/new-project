import React from 'react';
import { 
  Atom, 
  Sparkles, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  HelpCircle, 
  GraduationCap, 
  PhoneCall, 
  PlayCircle
} from 'lucide-react';
import { PersonaType } from '../types';

interface NavbarProps {
  activePersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onOpenQuiz: () => void;
  onOpenAiDoubt: () => void;
  onOpenLab: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePersona,
  onSelectPersona,
  onOpenQuiz,
  onOpenAiDoubt,
  onOpenLab,
  onScrollTo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner: Parent Hotline & Bangladeshi Trust Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              HSC 25 & 26 Board & BUET Admission Batches Open
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">🇧🇩 Bangladesh's #1 Dedicated Physics Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5 hover:text-white transition">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">Guardian Hotline: 01700-749742</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-medium">bKash Verified Merchant</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Atom className="w-6 h-6 sm:w-7 sm:h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-heading">
                  Physics <span className="text-indigo-600">Zero to Hero</span>
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                  SSC & HSC
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                From Confusion to Confidence • পদার্থবিজ্ঞান জিরো টু হিরো
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => onScrollTo('courses')}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              কোর্সসমূহ (Courses)
            </button>
            <button 
              onClick={onOpenLab}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 relative group"
            >
              <Compass className="w-4 h-4 text-emerald-500" />
              ভার্চুয়াল ল্যাব (Visual Lab)
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                Interactive
              </span>
            </button>
            <button 
              onClick={() => onScrollTo('formulas')}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              ফর্মুলা ব্যাংক (Formulas)
            </button>
            <button 
              onClick={() => onScrollTo('parents')}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              অভিভাবক কর্নার (Parents)
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Doubt Solver Button */}
            <button
              onClick={onOpenAiDoubt}
              className="px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 transition active:scale-95"
              title="24/7 Physics Doubt Assistant"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">২৪/৭ ডাউট সলভার</span>
              <span className="sm:hidden">ডাউট সলভ</span>
            </button>

            {/* Diagnostic Quiz Trigger */}
            <button
              onClick={onOpenQuiz}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-300 flex items-center gap-1.5 transition active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>ফ্রি স্কিল টেস্ট</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
