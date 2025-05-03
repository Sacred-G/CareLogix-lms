
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  content: string;
  audioUrl?: string;
  transcript?: string;
  questions: Question[];
  flashcards?: Flashcard[];
  faqs?: FAQ[];
  interactiveScenario?: {
    title: string;
    description: string;
    type: 'multiple-choice' | 'dialogue';
    content: any; // This would be structured based on scenario type
    options?: ScenarioOption[];
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  modules: Module[];
  certificateAvailable?: boolean;
  domain?: string; // Domain property added here
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  completionDate: string;
  validUntil?: string;
  certificateNumber: string;
  organizationName?: string;
  organizationLogo?: string;
}
