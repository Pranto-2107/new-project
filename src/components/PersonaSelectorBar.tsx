import React from 'react';
import { TARGET_PERSONAS } from '../data/personas';
import { PersonaType } from '../types';
import { UserCheck, ShieldAlert, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface PersonaSelectorBarProps {
  activePersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onScrollTo: (sectionId: string) => void;
}

export const PersonaSelectorBar: React.FC<PersonaSelectorBarProps> = ({
  activePersona,
  onSelectPersona,
  onScrollTo,
}) => {
  const currentPersona = TARGET_PERSONAS.find((p) => p.id === activePersona);

  return (
    <div className="bg-slate-100/90 border-b border-slate-200 py-3 px-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Label */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded text-[11px] font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              Tailored Experience
            </span>
            <span className="hidden sm:inline">Explore the platform from the perspective of our key users:</span>
          </div>

          {/* Persona Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectPersona('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activePersona === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span>🌐 All Visitors</span>
            </button>

            {TARGET_PERSONAS.map((persona) => {
              const isSelected = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    onSelectPersona(persona.id);
                    if (persona.id === 'farida') {
                      onScrollTo('parents');
                    } else {
                      onScrollTo('courses');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200 font-semibold'
                      : 'bg-white text-slate-700 hover:bg-indigo-50/70 border-slate-200'
                  }`}
                >
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-4 h-4 rounded-full object-cover ring-1 ring-white/50"
                  />
                  <span>{persona.name.split(' ')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    isSelected ? 'bg-indigo-700/60 text-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {persona.id === 'rafi' ? 'Struggling' : persona.id === 'nusrat' ? 'BUET Rank' : persona.id === 'sakib' ? 'Budget' : 'Parent'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tailored Advice Drawer if a persona is active */}
        {currentPersona && (
          <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-indigo-100 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{currentPersona.name}</span>
                  <span className="text-slate-500 font-medium">({currentPersona.roleBangla})</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-semibold">
                    {currentPersona.badge}
                  </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  <strong className="text-slate-800">Your Goal: </strong>
                  {currentPersona.solution}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectPersona('all')}
              className="text-slate-400 hover:text-slate-600 self-end sm:self-center font-medium hover:underline text-[11px]"
            >
              Reset View ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
