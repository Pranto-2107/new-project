import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseById: (courseId: string) => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectCourseById,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  // Diagnostic outcome
  let level = 'Zero (Needs Concept Booster)';
  let levelDesc = 'You have potential, but fundamental formulas and sign conventions are confusing you. Our "Zero to Hero" foundational lectures will build your rock-solid base!';
  let recommendedCourseId = 'hsc-1st-zero-to-hero';
  let badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';

  if (score >= 4) {
    level = 'Hero (Engineering & Top 100 Ready)';
    levelDesc = 'Outstanding physics intuition! You understand core conservation laws and fast shortcuts. Take on the Engineering Admission Cracker for BUET top merit!';
    recommendedCourseId = 'buet-engineering-admission-cracker';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (score >= 2) {
    level = 'Climber (Ready for Numerical Mastery)';
    levelDesc = 'Good conceptual grasp, but tricky exam traps can trip you up. With our past 15-year Board CQ breakdowns, you can guarantee a Golden A+!';
    recommendedCourseId = 'hsc-2nd-zero-to-hero';
    badgeColor = 'bg-indigo-100 text-indigo-900 border-indigo-300';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm font-heading">
              Physics Readiness Diagnostic (৩ মিনিটের টেস্ট)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isCompleted ? (
          <div className="p-6 sm:p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>প্রশ্ন {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                <span className="text-indigo-600 font-bold">{currentQ.chapter}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading leading-snug">
                {currentQ.question}
              </h3>
              {currentQ.questionBangla && (
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  {currentQ.questionBangla}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';
                if (selectedOption === idx) {
                  btnStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                }
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500';
                  } else if (selectedOption === idx && idx !== currentQ.correctIndex) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-6 space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-1.5 text-indigo-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  ব্যাখ্যা ও বোর্ড ট্রিক (Solution Insight):
                </p>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Score: <strong className="text-slate-700">{score}</strong>
              </span>

              {!isAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 shadow-sm transition"
                >
                  উত্তর যাচাই করুন
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm flex items-center gap-1.5 transition"
                >
                  <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'ফলাফল দেখুন' : 'পরবর্তী প্রশ্ন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeColor} mb-2`}>
                {level}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                আপনার স্কোর: <span className="text-indigo-600">{score} / {QUIZ_QUESTIONS.length}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                {levelDesc}
              </p>
            </div>

            {/* Quiz Voucher Promo */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <span className="font-bold block text-sm mb-1 text-amber-950">
                🎉 স্পেশাল কুইজ রিওয়ার্ড ভাউচার: ৳৫০০ ছাড়!
              </span>
              <span>
                কোর্স এনরোলে প্রোমোকোড ব্যবহার করুন: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900 font-bold">HERO500</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>আবার টেস্ট দিন</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSelectCourseById(recommendedCourseId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>সুপারিশকৃত কোর্সে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
