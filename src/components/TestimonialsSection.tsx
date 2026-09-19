import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { PersonaType } from '../types';
import { Quote, Star, CheckCircle2, GraduationCap } from 'lucide-react';

interface TestimonialsSectionProps {
  activePersona: PersonaType;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ activePersona }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>সফল শিক্ষার্থীদের বাস্তব অভিজ্ঞতা</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Stories from <span className="text-indigo-600">Zero to Hero.</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            ভীতি কাটিয়ে কীভাবে নটর ডেম, ভিকারুননিসা কিংবা প্রত্যন্ত অঞ্চলের শিক্ষার্থীরা ফিজিক্সে আত্মবিশ্বাস ফিরে পেয়েছে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => {
            const isHighlighted = activePersona !== 'all' && activePersona === t.personaType;

            return (
              <div
                key={t.id}
                className={`p-6 sm:p-8 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  isHighlighted
                    ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-400/20 shadow-lg'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Quote & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      {t.resultBadge}
                    </span>
                  </div>

                  {/* Quotes */}
                  <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed mb-3">
                    "{t.quoteBangla}"
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {t.quote}
                  </p>
                </div>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.collegeOrSchool}</p>
                    <p className="text-[11px] text-indigo-600 font-medium">{t.exam}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
