
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
  interactiveScenario?: {
    title: string;
    description: string;
    type: 'multiple-choice' | 'drag-drop' | 'dialogue';
    content: any; // This would be structured based on scenario type
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
}
