export type PersonaType = 'all' | 'rafi' | 'nusrat' | 'sakib' | 'farida';

export interface PersonaInfo {
  id: PersonaType;
  name: string;
  roleBangla: string;
  roleEnglish: string;
  avatar: string;
  painPoint: string;
  solution: string;
  badge: string;
}

export interface Instructor {
  name: string;
  degrees: string;
  institution: string;
  experienceYears: number;
  avatar: string;
  bio: string;
}

export interface Chapter {
  id: string;
  title: string;
  titleBangla: string;
  lecturesCount: number;
  durationHours: number;
  cqCount: number;
  mcqCount: number;
  keyTopics: string[];
}

export interface Course {
  id: string;
  title: string;
  titleBangla: string;
  slug: string;
  level: 'SSC' | 'HSC 1st Paper' | 'HSC 2nd Paper' | 'Admission';
  badge: string;
  badgeColor: string;
  rating: number;
  reviewsCount: number;
  enrolledStudents: number;
  totalClasses: number;
  totalHours: number;
  priceBDT: number;
  originalPriceBDT: number;
  instructor: Instructor;
  shortDesc: string;
  description: string;
  chapters: Chapter[];
  features: string[];
  isFree?: boolean;
  sampleVideo: {
    title: string;
    duration: string;
    videoEmbedUrl: string;
  };
  recommendedFor: PersonaType[];
}

export interface Formula {
  id: string;
  chapter: string;
  paper: 'SSC' | 'HSC 1st' | 'HSC 2nd';
  titleBangla: string;
  titleEnglish: string;
  latexEquation: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  boardExamTrap: string;
  shortcutHack: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionBangla?: string;
  chapter: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Testimonial {
  id: string;
  name: string;
  collegeOrSchool: string;
  exam: string;
  resultBadge: string;
  personaType: PersonaType;
  avatar: string;
  quote: string;
  quoteBangla: string;
}
