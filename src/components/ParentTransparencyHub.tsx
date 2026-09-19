import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Lock, 
  Smartphone,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ParentTransparencyHub: React.FC = () => {
  const [studentName, setStudentName] = useState<string>('রাফি হাসান (Rafi)');
  const [examName, setExamName] = useState<string>('ভেক্টর ও গতিবিদ্যা উইকলি টেস্ট');
  const [marks, setMarks] = useState<string>('৭৪ / ৮০ (৯২.৫%)');
  const [attendance, setAttendance] = useState<string>('৯৬%');

  return (
    <section id="parents" className="py-16 sm:py-24 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>অভিভাবকদের জন্য শতভাগ স্বচ্ছতা ও দায়িত্বশীলতা</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Building Trust with Parents: <span className="text-blue-600">Zero Doubts.</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            সন্তানের পড়াশোনার অগ্রগতি নিয়ে আর দুশ্চিন্তা নয়। বুয়েটিয়ান শিক্ষকদের প্রত্যক্ষ পাঠদান এবং প্রতি সপ্তাহে নিয়মিত এসএমএস আপডেটের মাধ্যমে আপনি থাকবেন সর্বদা নিশ্চিত।
          </p>
        </div>

        {/* Grid: Pillars of Trust & SMS Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 4 Pillars of Trust */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pillar 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  যাচাইকৃত বুয়েট ও ঢাবি শিক্ষক মণ্ডলী (Verified Faculty)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  আমাদের প্রধান শিক্ষকরা বুয়েটের ইইই এবং মেকানিক্যাল ডিপার্টমেন্ট থেকে পাসকৃত এবং নটর ডেম, ভিকারুননিসা ও হলিক্রস কলেজের শিক্ষার্থীদের ১০ বছরের বেশি সময় ধরে পড়ানোর অভিজ্ঞতাসম্পন্ন।
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  সাপ্তাহিক প্রগ্রেস এসএমএস ও উপস্থিতি ট্র্যাকিং
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  আপনার সন্তান লাইভ ক্লাসে অংশ নিয়েছে কিনা এবং সাপ্তাহিক পরীক্ষায় কত নম্বর পেয়েছে, প্রতি শুক্রবার স্বয়ংক্রিয় এসএমএসের মাধ্যমে অভিভাবকের ফোনে পাঠানো হয়।
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  ৭ দিনের মানিব্যাক গ্যারান্টি (100% Risk-Free Guarantee)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  প্রথম ২টি ক্লাস করার পর শিক্ষার্থী বা অভিভাবক যদি পাঠদানে শতভাগ সন্তুষ্ট না হন, বিকাশ বা নগদের মাধ্যমে কোনো শর্ত ছাড়াই সম্পূর্ণ ফি ফেরত দেওয়া হয়।
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  অভিভাবক ডেডিকেটেড হেল্পলাইন ও কাউন্সেলিং
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  কোর্স কারিকুলাম, পড়াশোনার কৌশল বা সন্তানের কোনো দুর্বলতা নিয়ে সরাসরি একাডেমিক টিমের সাথে কথা বলতে কল করুন: <strong className="text-slate-900">01700-749742</strong> (সকাল ১০টা - রাত ১০টা)।
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup with Real-time SMS Simulator */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border-4 border-slate-800 max-w-sm mx-auto relative">
              {/* Speaker & Sensor */}
              <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mb-4"></div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  Guardian SMS Alert
                </span>
                <span className="text-[10px] text-emerald-400">● Live Preview</span>
              </div>

              {/* SMS Bubble */}
              <div className="my-5 p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs space-y-2 relative">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-indigo-400">Sender: PHYSICS-HERO</span>
                  <span>Friday, 8:00 PM</span>
                </div>
                <p className="text-slate-100 font-sans leading-relaxed">
                  শ্রদ্ধেয় অভিভাবক,
                  <br />
                  আপনার সন্তান <strong>{studentName}</strong> এই সপ্তাহে পদার্থবিজ্ঞানের <strong>"{examName}"</strong>-এ <strong>{marks}</strong> নম্বর অর্জন করেছে।
                  <br /><br />
                  📅 এই সপ্তাহে ক্লাসে উপস্থিতি: <strong>{attendance}</strong>
                  <br />
                  💡 শিক্ষক মন্তব্য: ভেক্টর সমস্যা সমাধানে চমৎকার অগ্রগতি। প্রাসের সমীকরণ আরো বেশি প্র্যাকটিস করার পরামর্শ দেওয়া হয়েছে।
                  <br /><br />
                  - একাডেমিক কো-অর্ডিনেটর, Physics Zero to Hero
                </p>
              </div>

              {/* Interactive SMS Simulator Controls */}
              <div className="pt-3 border-t border-slate-800 text-xs space-y-2.5">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  এসএমএস প্রিভিউ কাস্টমাইজ করুন:
                </p>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">শিক্ষার্থীর নাম:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">প্রাপ্ত নম্বর:</label>
                    <input
                      type="text"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">উপস্থিতি:</label>
                    <input
                      type="text"
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Home bar */}
              <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
