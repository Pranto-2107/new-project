import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  Smartphone, 
  CreditCard,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface EnrollModalProps {
  course: Course | null;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ course, onClose }) => {
  const [studentName, setStudentName] = useState<string>('');
  const [studentPhone, setStudentPhone] = useState<string>('');
  const [parentPhone, setParentPhone] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!course) return null;

  const basePrice = course.isFree ? 0 : course.priceBDT;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'HERO500') {
      setDiscountAmount(500);
    } else if (promoCode.trim().toUpperCase() === 'ZERO2HERO') {
      setDiscountAmount(300);
    } else {
      alert('ভুল প্রোমোকোড! ট্রাই করুন: HERO500');
    }
  };

  const handleCompleteEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      alert('দয়া করে শিক্ষার্থীর নাম ও মোবাইল নম্বর প্রদান করুন।');
      return;
    }
    const generatedId = 'PZ2H-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-sm font-heading">
              {course.isFree ? 'ফ্রি ক্লাসরুম রেজিস্ট্রেশন' : 'কোর্স এনরোলমেন্ট ও পেমেন্ট'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleCompleteEnroll} className="p-6 space-y-5">
            {/* Selected Course Summary */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl">
              <div className="flex items-center justify-between text-xs text-indigo-900 font-bold mb-1">
                <span>{course.level}</span>
                <span>{course.badge}</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 line-clamp-1">{course.title}</h4>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-indigo-100 text-xs">
                <span className="text-slate-600">কোর্স ফি:</span>
                <span className="font-extrabold text-indigo-700 text-base">
                  {course.isFree ? 'FREE' : `৳${course.priceBDT.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Student Details Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Rafi Hasan / Nusrat Jahan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শিক্ষার্থীর মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">কলেজ / স্কুলের নাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: Notre Dame College"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  অভিভাবকের ফোন নম্বর (সাপ্তাহিক প্রগ্রেস এসএমএস এর জন্য)
                </label>
                <input
                  type="tel"
                  placeholder="018XXXXXXXX (মা/বাবার নম্বর)"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  🛡️ প্রতি সপ্তাহে ক্লাসের উপস্থিতি ও মক টেস্টের মার্কস এই নম্বরে এসএমএস যাবে।
                </span>
              </div>
            </div>

            {/* Payment Method Selector (if not free) */}
            {!course.isFree && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <label className="text-xs font-bold text-slate-800 block">
                  পেমেন্ট মেথড নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50/80 text-pink-700 font-bold ring-1 ring-pink-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-pink-600">bKash বিকাশ</span>
                    <span className="text-[9px] text-slate-500">Merchant Gateway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50/80 text-orange-700 font-bold ring-1 ring-orange-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-orange-600">Nagad নগদ</span>
                    <span className="text-[9px] text-slate-500">Instant Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-bold ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-extrabold text-indigo-600">Card / Net</span>
                  </button>
                </div>

                {/* Promo Code box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="প্রোমোকোড দিন (যেমন: HERO500)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Apply
                  </button>
                </div>

                {discountAmount > 0 && (
                  <p className="text-[11px] text-emerald-600 font-bold">
                    ✓ প্রোমোকোড প্রযোজ্য হয়েছে! ৳{discountAmount} ছাড়!
                  </p>
                )}

                {/* Total Fee Calculation */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between font-semibold">
                  <span className="text-slate-600">সর্বমোট পরিশোধযোগ্য:</span>
                  <span className="text-lg font-black text-slate-900 font-heading">
                    ৳{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>৭ দিনের ১০০% মানিব্যাক গ্যারান্টি • কোনো শর্ত ছাড়াই ফি ফেরত</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-200 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{course.isFree ? 'ফ্রি ক্লাসরুমে প্রবেশ করুন' : 'পেমেন্ট সম্পন্ন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                এনরোলমেন্ট সফল হয়েছে!
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 font-heading mt-2">
                অভিনন্দন, {studentName}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Zero to Hero ফিজিক্স পরিবারে আপনাকে স্বাগতম।
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-bold text-slate-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course:</span>
                <span className="font-bold text-indigo-700 line-clamp-1">{course.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-600 font-bold">Activated</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              আপনার মোবাইল নম্বরে ({studentPhone}) ক্লাসরুমের লগইন লিংক এবং টেলিগ্রাম ডাউট সলভ গ্রুপের লিংক এসএমএস করা হয়েছে।
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              ঠিক আছে
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
