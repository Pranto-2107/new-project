import React from 'react';
import { 
  Play, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight,
  Calculator,
  Compass,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { PersonaType } from '../types';

interface HeroSectionProps {
  activePersona: PersonaType;
  onOpenQuiz: () => void;
  onOpenLab: () => void;
  onScrollTo: (sectionId: string) => void;
  onWatchIntro: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activePersona,
  onOpenQuiz,
  onOpenLab,
  onScrollTo,
  onWatchIntro,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200">
      {/* Background Decorative Orbit Patterns */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/90 text-indigo-800 text-xs font-bold mb-6 border border-indigo-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>বাংলাদেশ এসএসসি ও এইচএসসি ফিজিক্স লার্নিং প্ল্যাটফর্ম</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span className="text-indigo-950 font-semibold">NCTB & BUET Standard</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-heading leading-[1.15]">
              From <span className="text-rose-500 underline decoration-rose-300 decoration-wavy decoration-2">Confusion</span> to{' '}
              <span className="text-indigo-600">Confidence</span> in Physics.
            </h1>

            {/* Sub-headline in English and Bangla */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              পদার্থবিজ্ঞান কোনো মুখস্থের বিষয় নয়—এটি প্রকৃতির ছন্দ। জটিল ফর্মুলা আর বোর্ড পরীক্ষার গাণিতিক সমস্যার ভয় দূর করে আমরা গড়ে তুলি মজবুত বেসিক ও শতভাগ আত্মবিশ্বাস।
            </p>

            {/* Persona Tailored Quick Callout if selected */}
            {activePersona === 'rafi' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs text-left max-w-xl">
                <strong>💡 Rafi, we got you: </strong>
                No more feeling lost in college lectures. Start with our step-by-step <em>"Zero to Hero"</em> visual fundamentals and master Board CQ numericals with zero stress.
              </div>
            )}
            {activePersona === 'nusrat' && (
              <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 text-xs text-left max-w-xl">
                <strong>🎯 Nusrat, ready for Top 50? </strong>
                Dive straight into our <em>Engineering Admission Cracker</em> with past 25 years BUET written problems, multi-concept traps, and Olympiad-level shortcuts.
              </div>
            )}
            {activePersona === 'sakib' && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs text-left max-w-xl">
                <strong>💰 Sakib, quality doesn't need high fees: </strong>
                Enroll in our complete syllabus bundles for just ৳999 - ৳1,999 or start 100% free with our 10-Class Starter Pack. No hidden charges!
              </div>
            )}
            {activePersona === 'farida' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs text-left max-w-xl">
                <strong>🛡️ শ্রদ্ধেয়া অভিভাবক (Farida Begum): </strong>
                আমাদের সকল শিক্ষক বুয়েট ও ঢাকা বিশ্ববিদ্যালয়ের অভিজ্ঞ গ্র্যাজুয়েট। প্রতি সপ্তাহে শিক্ষার্থীর হাজিরা ও টেস্ট পরীক্ষার ফলাফল সরাসরি আপনার মোবাইলে এসএমএস যাবে।
              </div>
            )}

            {/* Trust Bullet Highlights */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                BUET Graduate Mentors
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Past 15 Years CQ & MCQ Solutions
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                24/7 Dedicated AI & Live Doubt Solver
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => onScrollTo('courses')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>কোর্সসমূহ দেখুন (Explore Courses)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>ফ্রি স্কিল টেস্ট দিন (3 Mins)</span>
              </button>

              <button
                onClick={onOpenLab}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>ভার্চুয়াল ল্যাব টেস্ট</span>
              </button>
            </div>

            {/* Platform Stats */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">45,000+</p>
                <p className="text-xs text-slate-500 font-medium">শিক্ষার্থী সফলতার সাথে যুক্ত</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-heading">98.4%</p>
                <p className="text-xs text-slate-500 font-medium">বোর্ড পরীক্ষায় ফিজিক্সে এ+</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">1,200+</p>
                <p className="text-xs text-slate-500 font-medium">বুয়েট ও মেডিকেলে চান্স</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Teaser / Interactive Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-indigo-100 border border-slate-200/80 relative">
                {/* Header of Preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-semibold text-slate-600 ml-2">Classroom Experience</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Live Demo Class
                  </span>
                </div>

                {/* Video / Interactive Lecture Thumbnail */}
                <div 
                  onClick={onWatchIntro}
                  className="mt-3 relative rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer group shadow-md"
                >
                  <img
                    src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80"
                    alt="Physics Zero to Hero Masterclass"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                    <div className="self-end px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[11px] font-medium text-white">
                      18:42 mins
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      <p className="text-white font-bold text-xs sm:text-sm text-center drop-shadow-md line-clamp-1">
                        ভেক্টর নদী-নৌকা পারাপার ও প্রাস সমস্যা: ১ ট্রিকসেই বাজিমাত!
                      </p>
                      <p className="text-slate-300 text-[11px] text-center">
                        Click to watch free sample lecture
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Mini-Widget on Card: Formula of the Day */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <TrendingUp className="w-3.5 h-3.5" />
                      আজকের হট টপিক (Dhaka Board 100% Repetition)
                    </span>
                    <span className="text-[10px] text-slate-500">Vector Law</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-center font-bold text-slate-800 text-sm">
                    R = √(P² + Q² + 2PQ cos α)
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1.5">
                    💡 <strong>Shortcut:</strong> If P = Q and α = 120°, then Resultant R = P instantly!
                  </p>
                </div>

                {/* Live Student Counter footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80" alt="Student" />
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    🟢 428 students studying right now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
