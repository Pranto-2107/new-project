import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  Loader2, 
  BookOpen, 
  Zap, 
  AlertCircle
} from 'lucide-react';

interface AiDoubtSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDoubtSolverModal: React.FC<AiDoubtSolverModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [question, setQuestion] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('HSC 1st Paper');
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'ভেক্টর নদী-নৌকা ন্যূনতম দূরত্বের শর্ত কী?',
    'প্রাসের সর্বোচ্চ উচ্চতা ও পাল্লার সম্পর্ক R = 4H / tan θ কীভাবে আসে?',
    'একটি বস্তুকে আনুভূমিকভাবে বহন করলে অভিকর্ষ বলের কাজ শূন্য কেন?',
    'কার্নো ইঞ্জিনের দক্ষতা কীভাবে সর্বোচ্চ করা যায়?',
    'তারের দৈর্ঘ্য টেনে দ্বিগুণ করলে রোধ ৪ গুণ কেন হয়?',
  ];

  const handleAsk = async (textToAsk?: string) => {
    const q = textToAsk || question;
    if (!q.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch('/api/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          studentClass,
          chapter: 'General Physics',
        }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No response returned.');
      setSource(data.source);
    } catch (err) {
      setAnswer(
        '### ⚠️ নেটওয়ার্ক ত্রুটি বা অফলাইন মোড\n\nদয়া করে আবার চেষ্টা করুন অথবা উপরের সাজেস্টেড প্রশ্নগুলোতে ক্লিক করুন।'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-heading">
                ২৪/৭ ফিজিক্স ডাউট অ্যাসিস্ট্যান্ট (HeroBot)
              </h3>
              <p className="text-[11px] text-slate-400">
                Powered by AI & BUET Senior Mentors • বাংলা ও ইংলিশ ভার্সন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Class Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">শ্রেণি / লেভেল:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['SSC (9-10)', 'HSC 1st Paper', 'HSC 2nd Paper', 'Engineering Admission'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setStudentClass(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    studentClass === lvl
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              সচরাচর জিজ্ঞাসিত প্রশ্ন (Quick Questions):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(prompt);
                    handleAsk(prompt);
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg text-xs transition text-left border border-slate-200/60 flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Input Area */}
          <div className="relative">
            <textarea
              rows={3}
              placeholder="আপনার ফিজিক্সের যেকোনো প্রশ্ন বা গাণিতিক সমস্যা বাংলায় বা ইংরেজিতে লিখুন..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition resize-none"
            />
            <button
              disabled={loading || !question.trim()}
              onClick={() => handleAsk()}
              className="absolute right-3 bottom-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>সলভ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>সমাধান দিন</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Answer Area */}
          {loading && (
            <div className="p-8 text-center bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              <p className="text-xs font-medium text-indigo-900">
                HeroBot ফিজিক্সের মৌলিক সূত্র বিশ্লেষণ করছে...
              </p>
            </div>
          )}

          {answer && (
            <div className="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-3 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  পদার্থবিজ্ঞান ব্যাখ্যা ও সমাধান
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-300">
                  {source === 'gemini' ? 'AI Mentor' : 'Verified Solution'}
                </span>
              </div>

              {/* Formatted Content */}
              <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-slate-200 space-y-3 font-sans whitespace-pre-line leading-relaxed">
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
