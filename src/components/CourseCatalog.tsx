import React, { useState } from 'react';
import { COURSES } from '../data/courses';
import { Course, PersonaType } from '../types';
import { 
  Star, 
  Users, 
  Clock, 
  Video, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Search, 
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface CourseCatalogProps {
  activePersona: PersonaType;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  activePersona,
  onSelectCourse,
  onEnrollCourse,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = ['All', 'HSC 1st Paper', 'HSC 2nd Paper', 'Admission', 'SSC'];

  // Filter courses
  const filteredCourses = COURSES.filter((course) => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleBangla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>NCTB ও ভর্তি পরীক্ষা ভিত্তিক পূর্ণাঙ্গ কোর্সসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Structured Masterclasses. <span className="text-indigo-600">Zero Weakness.</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              বোর্ড পরীক্ষায় গোল্ডেন এ+ এবং বুয়েট-মেডিকেল ভর্তির জন্য কনসেপ্ট ও ম্যাথ স্পেশালাইজড ব্যাচ।
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="টপিক বা কোর্স খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {lvl === 'All' ? 'সব কোর্স (All)' : lvl}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isPersonaRecommended = 
              activePersona !== 'all' && course.recommendedFor.includes(activePersona);

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                  isPersonaRecommended
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-100'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100'
                }`}
              >
                {/* Persona Match Banner */}
                {isPersonaRecommended && (
                  <div className="bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Recommended for Your Profile
                    </span>
                    <span className="uppercase text-[9px] tracking-wider bg-indigo-700 px-1.5 py-0.2 rounded">
                      High Match
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.8 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {course.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectCourse(course)}
                    className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-heading cursor-pointer line-clamp-2"
                  >
                    {course.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                    {course.titleBangla}
                  </p>

                  {/* Short Description */}
                  <p className="text-slate-600 text-xs mt-3 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 my-4 border-y border-slate-100 text-center text-xs">
                    <div>
                      <span className="flex items-center justify-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">({course.reviewsCount}+ reviews)</p>
                    </div>
                    <div>
                      <span className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                        {course.totalClasses} Classes
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">{course.totalHours} Hours</p>
                    </div>
                    <div>
                      <span className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <Users className="w-3.5 h-3.5 text-emerald-500" />
                        {(course.enrolledStudents / 1000).toFixed(1)}k
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">Students</p>
                    </div>
                  </div>

                  {/* Instructor Bio Snippet */}
                  <div className="flex items-center gap-3 py-1">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{course.instructor.name}</p>
                      <p className="text-[10px] text-slate-500">{course.instructor.degrees}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Buttons */}
                <div className="p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  {/* Price */}
                  <div>
                    {course.isFree ? (
                      <div>
                        <span className="text-lg font-black text-emerald-600 font-heading">FREE</span>
                        <span className="block text-[10px] text-slate-400 line-through">৳1,200</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-slate-900 font-heading">
                            ৳{course.priceBDT.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ৳{course.originalPriceBDT.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600">
                          {Math.round((1 - course.priceBDT / course.originalPriceBDT) * 100)}% Discount Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition"
                    >
                      সিলেবাস
                    </button>
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition active:scale-95 flex items-center gap-1"
                    >
                      <span>{course.isFree ? 'ফ্রি শুরু করুন' : 'এনরোল'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
