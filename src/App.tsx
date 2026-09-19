import React, { useState } from 'react';
import { PersonaType, Course } from './types';
import { COURSES } from './data/courses';
import { Navbar } from './components/Navbar';
import { PersonaSelectorBar } from './components/PersonaSelectorBar';
import { HeroSection } from './components/HeroSection';
import { PhysicsVisualizer } from './components/PhysicsVisualizer';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { FormulaVault } from './components/FormulaVault';
import { ParentTransparencyHub } from './components/ParentTransparencyHub';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DiagnosticQuizModal } from './components/DiagnosticQuizModal';
import { AiDoubtSolverModal } from './components/AiDoubtSolverModal';
import { EnrollModal } from './components/EnrollModal';
import { Footer } from './components/Footer';
import { Play, X } from 'lucide-react';

export default function App() {
  const [activePersona, setActivePersona] = useState<PersonaType>('all');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isAiDoubtOpen, setIsAiDoubtOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCourseById = (courseId: string) => {
    const course = COURSES.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourseForDetail(course);
    } else {
      scrollToSection('courses');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAiDoubt={() => setIsAiDoubtOpen(true)}
        onOpenLab={() => scrollToSection('interactive-lab')}
        onScrollTo={scrollToSection}
      />

      {/* 2. Persona Selector Bar (Rafi, Nusrat, Sakib, Farida Begum) */}
      <PersonaSelectorBar
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
        onScrollTo={scrollToSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section with dynamic headlines & CTA */}
        <HeroSection
          activePersona={activePersona}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenLab={() => scrollToSection('interactive-lab')}
          onScrollTo={scrollToSection}
          onWatchIntro={() => setIsVideoModalOpen(true)}
        />

        {/* 4. Interactive Physics Concept Lab (Visualizer) */}
        <PhysicsVisualizer />

        {/* 5. Course Catalog & Filterable Masterclasses */}
        <CourseCatalog
          activePersona={activePersona}
          onSelectCourse={(course) => setSelectedCourseForDetail(course)}
          onEnrollCourse={(course) => setSelectedCourseForEnroll(course)}
        />

        {/* 6. Formula Vault with Board Traps & Admission Shortcuts */}
        <FormulaVault />

        {/* 7. Parent Transparency Hub (Dedicated to Farida Begum & Guardians) */}
        <ParentTransparencyHub />

        {/* 8. Authentic Testimonials from Notre Dame, Viqarunnisa & Parents */}
        <TestimonialsSection activePersona={activePersona} />
      </main>

      {/* 9. Comprehensive EdTech Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenLab={() => scrollToSection('interactive-lab')}
      />

      {/* --- MODALS --- */}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onEnroll={(course) => {
          setSelectedCourseForDetail(null);
          setSelectedCourseForEnroll(course);
        }}
      />

      {/* Enrollment & Checkout Modal */}
      <EnrollModal
        course={selectedCourseForEnroll}
        onClose={() => setSelectedCourseForEnroll(null)}
      />

      {/* Diagnostic 3-Min Physics Quiz Modal */}
      <DiagnosticQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectCourseById={handleSelectCourseById}
      />

      {/* 24/7 AI & Mentor Doubt Solver Modal */}
      <AiDoubtSolverModal
        isOpen={isAiDoubtOpen}
        onClose={() => setIsAiDoubtOpen(false)}
      />

      {/* Video Intro Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-slate-900 rounded-2xl max-w-3xl w-full p-4 border border-slate-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-white">
              <span className="font-bold text-sm font-heading flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                ফ্রি স্পেশাল ক্লাস: ভেক্টর ও গতিবিদ্যা ম্যাথ হ্যাকস
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1000&auto=format&fit=crop&q=80"
                alt="Intro Video"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-xl shadow-indigo-600/50">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <h4 className="text-white font-bold text-base sm:text-lg">
                  "জিরো থেকে হিরো" জার্নি কীভাবে শুরু করবেন?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md">
                  Engr. Tanvir Ahmed (BUET EEE) ব্যাখ্যা করছেন এইচএসসি বোর্ড পরীক্ষা ও বুয়েট এডমিশনের পূর্ণাঙ্গ রোডম্যাপ।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
