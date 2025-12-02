
export interface User {
  id: string;
  role: 'student' | 'admin';
}

export interface Student extends User {
  role: 'student';
  report?: StudentReport | null;
}

export interface Admin extends User {
  role: 'admin';
}

export interface QuizQuestion {
  question: string;
  options: string[];
}

export interface CareerRecommendation {
  career: string;
  description: string;
  reasoning: string;
}

export interface StudentReport {
  recommendations: CareerRecommendation[];
  dateTaken: string;
}

export type View = 'landing' | 'login' | 'studentDashboard' | 'quiz' | 'adminDashboard';
