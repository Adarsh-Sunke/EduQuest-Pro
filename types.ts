
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Attempt {
  id: string;
  quizId: string;
  userId: string;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EXPIRED';
  answers: Record<string, string>; // questionId -> optionId
  markedForReview: string[]; // array of questionIds
  startTime: string;
  expiresAt: string;
  score?: number;
  totalScore?: number;
}

export interface QuizResult {
  attemptId: string;
  score: number;
  totalScore: number;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  timeTaken: string;
  answersDetail: {
    questionId: string;
    questionText: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
    options: Option[];
  }[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
