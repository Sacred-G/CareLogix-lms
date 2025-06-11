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
  learningObjectives?: string[];
  description: string;
  videoUrl?: string;
  content: string
  audioUrl?: string;
  transcript?: string;
  questions?: Question[];
  flashcards?: Flashcard[];
  faqs?: FAQ[];
  courseId?: string; // Added for SCORM module support
  customModuleType?: string; // For special handling like role-based iframes
  supervisorIframeUrl?: string; // URL for supervisor iframe content
  nonSupervisorIframeUrl?: string; // URL for non-supervisor iframe content
  pdfPath?: string; // Optional path to a PDF document for the module
  interactiveScenario?: {
    title: string;
    description: string;
    type: 'multiple-choice' | 'dialogue' | 'mindmap' | 'behavior-analysis';
    content?: any; // This would be structured based on scenario type
    options?: ScenarioOption[];
    mindmapType?: string; // For mindmap type, identifies which mindmap data to use
  };
  
  // Interactive content for behavior analysis scenarios
  interactiveContent?: {
    type: string;
    title: string;
    description: string;
    scenarios: {
      id: string;
      title: string;
      description: string;
      options: { id: string; text: string }[];
      correctAnswer: string;
      feedback: string;
    }[];
  };
  
  // For direct iframe embeds
  iframeUrl?: string; // URL for iframe content
  iframeTitle?: string; // Title for accessibility
  iframeHeight?: string; // Optional custom height (e.g., '600px')
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
  featured?: boolean; // Added to highlight important courses
  
  // AI-generated content fields
  quizContent?: string; // Generated quiz content
  moduleContent?: string; // Generated module outline
  objectives?: string; // Learning objectives
  assessmentCriteria?: string; // Assessment criteria
  scenarioContent?: string; // Interactive scenario content
  lessonPlan?: string; // Detailed lesson plan
  videoUrl?: string; // Video URL
  audioUrl?: string; // Audio URL
  transcript?: string; // Transcript text
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
  organizationDomain?: string;
}
