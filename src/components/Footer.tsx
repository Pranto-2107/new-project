import React from 'react';
import { 
  Atom, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ArrowUp,
  MessageCircle,
  Youtube
} from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenLab: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenLab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer: Consultation & Community CTA */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-heading">
              ফিজিক্স নিয়ে কোনো দ্বিধা বা পরামর্শ প্রয়োজন?
            </h3>
            <p className="text-slate-400 mt-1">
              আমাদের একাডেমিক কাউন্সেলরদের সাথে কথা বলতে সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে নক দিন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:01700749742"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>01700-749742</span>
            </a>
            <button
              onClick={() => alert('Opening WhatsApp live chat with Physics Academic Advisor...')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp চ্যাট</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Atom className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-heading">
                Physics <span className="text-indigo-400">Zero to Hero</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              বাংলাদেশের এসএসসি ও এইচএসসি শিক্ষার্থীদের জন্য বিশেষায়িত ফিজিক্স প্ল্যাটফর্ম। কঠিন গাণিতিক সমস্যা ও বোর্ড প্রশ্ন সহজবোধ্য বাস্তব উদাহরণের মাধ্যমে সমাধানের পথিকৃৎ।
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                🇧🇩 Dhaka & All Boards
              </span>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                BUET Standard
              </span>
            </div>
          </div>

          {/* Col 2: Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              কোর্সসমূহ
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onScrollTo('courses')} className="hover:text-white transition">
                  HSC 1st Paper Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('courses')} className="hover:text-white transition">
                  HSC 2nd Paper Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('courses')} className="hover:text-white transition">
                  BUET Engineering Cracker
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('courses')} className="hover:text-white transition">
                  SSC Class 9-10 Foundation
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('courses')} className="hover:text-white transition text-emerald-400">
                  100% Free Starter Pack
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Learning Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              শিক্ষার্থী টুলস
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenLab} className="hover:text-white transition">
                  Interactive Physics Lab
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('formulas')} className="hover:text-white transition">
                  Formula Vault & Cheatsheets
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('parents')} className="hover:text-white transition">
                  Parent SMS Progress Hub
                </button>
              </li>
              <li>
                <a href="#hero" className="hover:text-white transition">
                  Past 15 Years Board CQ Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              অফিস ও স্টাডি সেন্টার
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>লেভেল ৪, বিটিআই সেন্ট্রাল প্লাজা, গ্রীন রোড, ফার্মগেট, ঢাকা-১২১৫</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@physicszerotohero.edu.bd</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>হেল্পলাইন: 01700-749742</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Physics Zero to Hero. All rights reserved. Made for Bangladesh EdTech.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[11px]">পেমেন্ট পার্টনার: bKash | Nagad | Rocket</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
