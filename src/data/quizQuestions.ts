import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    chapter: 'Vector (ভেক্টর)',
    question: 'Two vectors of equal magnitude P act at an angle of 120° to each other. What is the magnitude of their resultant?',
    questionBangla: 'সমান মানের দুটি ভেক্টর P পরস্পরের সাথে ১২০° কোণে ক্রিয়াশীল হলে তাদের লব্ধির মান কত হবে?',
    options: ['√2 P', 'P', '2 P', 'P / 2'],
    correctIndex: 1,
    explanation: 'Using R = √(P² + P² + 2P² cos 120°). Since cos 120° = -0.5, R = √(2P² - P²) = √P² = P. This is one of the most repeated MCQs in Dhaka Board and BUET!',
  },
  {
    id: 2,
    chapter: 'Dynamics / Projectile (প্রাস)',
    question: 'At what angle of projection (with horizontal) is the maximum height (H) equal to one-fourth of the horizontal range (R)?',
    questionBangla: 'অনুভূমিকের সাথে কত কোণে একটি বস্তুকে নিক্ষেপ করলে সর্বোচ্চ উচ্চতা (H) পাল্লার (R) এক-চতুর্থাংশ হবে?',
    options: ['30°', '45°', '60°', '90°'],
    correctIndex: 1,
    explanation: 'We know the direct relationship R = 4H / tan θ. When H = R/4, we get R = 4(R/4) / tan θ ➔ tan θ = 1 ➔ θ = 45°. A 5-second shortcut trick!',
  },
  {
    id: 3,
    chapter: 'Work-Energy (কাজ ও শক্তি)',
    question: 'A porter carries a heavy 20 kg suitcase horizontally across a platform for 50 meters at constant speed. What is the work done by the gravitational force?',
    questionBangla: 'একজন কুলি ২০ কেজি ভরের লাগেজ নিয়ে অনুভূমিক প্ল্যাটফর্মে ৫০ মিটার হেঁটে গেলে অভিকর্ষ বল দ্বারা কৃতকাজ কত?',
    options: ['9,800 Joules', '0 Joules', '1,000 Joules', '490 Joules'],
    correctIndex: 1,
    explanation: 'Work W = F · s · cos θ. Here gravity acts vertically downward while displacement is horizontal, making θ = 90°. Since cos 90° = 0, work done by gravity is exactly 0 Joules!',
  },
  {
    id: 4,
    chapter: 'Thermodynamics (তাপগতিবিদ্যা)',
    question: 'A Carnot engine operates between heat reservoir temperatures of 127°C and 27°C. What is its theoretical thermal efficiency?',
    questionBangla: 'একটি কার্নো ইঞ্জিন ১২৭° সে. এবং ২৭° সে. তাপমাত্রায় কাজ করলে এর তাত্ত্বিক দক্ষতা কত?',
    options: ['78.7%', '25%', '50%', '33.3%'],
    correctIndex: 1,
    explanation: 'Always convert Celsius to Kelvin first! T₁ = 127 + 273 = 400 K; T₂ = 27 + 273 = 300 K. Efficiency η = (1 - 300/400) = 1/4 = 25%. Trap: If you used Celsius (1 - 27/127), you would get the wrong answer!',
  },
  {
    id: 5,
    chapter: 'Current Electricity (চল তড়িৎ)',
    question: 'If a cylindrical copper wire of resistance R is uniformly stretched so that its length becomes doubled (2x), its new resistance will be:',
    questionBangla: 'R রোধের একটি তারকে টেনে সুষমভাবে দৈর্ঘ্য দ্বিগুণ করা হলে এর নতুন রোধ কত হবে?',
    options: ['2 R', 'R / 2', '4 R', 'R / 4'],
    correctIndex: 2,
    explanation: 'When stretched uniformly, the volume remains constant (V = A · L). If length doubles (L\' = 2L), cross-sectional area halves (A\' = A/2). Since R = ρL/A, new resistance R\' = ρ(2L)/(A/2) = 4(ρL/A) = 4R!',
  },
];
