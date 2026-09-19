import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  ShieldCheck, 
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll,
}) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  if (!course) return null;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${course.badgeColor}`}>
              {course.badge}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {course.level}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Headline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              {course.title}
            </h2>
            <p className="text-sm font-semibold text-indigo-600 mt-1">
              {course.titleBangla}
            </p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Sample Lecture Video Card */}
          <div className="bg-slate-900 rounded-xl overflow-hidden p-4 text-white relative">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Play className="w-3.5 h-3.5 fill-indigo-400" />
                ফ্রি ট্রায়াল ক্লাস ডেমো (Sample Lecture)
              </span>
              <span>{course.sampleVideo.duration}</span>
            </div>
            <p className="text-sm font-bold text-slate-100 mb-3">
              {course.sampleVideo.title}
            </p>
            <div className="relative rounded-lg overflow-hidden aspect-video bg-slate-800 flex items-center justify-center border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                alt="Lecture preview"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <button 
                  onClick={() => alert('Opening interactive sample video lecture in high quality player...')}
                  className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Instructor Profile Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">{course.instructor.name}</h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.2 rounded">
                  Lead Instructor
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-semibold">{course.instructor.degrees}</p>
              <p className="text-xs text-slate-500 mt-0.5">{course.instructor.bio}</p>
            </div>
          </div>

          {/* Curriculum / Chapter Breakdown Accordion */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                অধ্যায়ভিত্তিক বিস্তারিত সিলেবাস ({course.chapters.length} Chapters)
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {course.totalClasses} Classes • {course.totalHours} Hours
              </span>
            </div>

            <div className="space-y-2.5">
              {course.chapters.map((chap, idx) => {
                const isOpen = expandedChapter === chap.id || idx === 0;
                return (
                  <div
                    key={chap.id}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => toggleChapter(chap.id)}
                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{chap.title}</p>
                        <p className="text-[11px] text-slate-500">{chap.titleBangla}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="hidden sm:inline">{chap.lecturesCount} Lectures</span>
                        <span className="text-indigo-600 font-semibold">{chap.cqCount} CQs Solved</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 text-xs space-y-2">
                        <p className="font-semibold text-slate-700">গুরুত্বপূর্ণ বিষয়সমূহ (Topics Covered):</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {chap.keyTopics.map((top, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-2 text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{top}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features List */}
          <div className="p-5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              এই কোর্সে যা যা থাকছে (Included Features)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              {course.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer sticky bar with Enrollment */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block">Total Course Fee:</span>
            {course.isFree ? (
              <span className="text-xl font-black text-emerald-600 font-heading">FREE</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-heading">
                  ৳{course.priceBDT.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ৳{course.originalPriceBDT.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300 transition"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition active:scale-95 flex items-center gap-2"
            >
              <span>{course.isFree ? 'ফ্রি অ্যাক্সেস নিন' : 'এনরোল ও পেমেন্ট করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
