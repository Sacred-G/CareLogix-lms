
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

// Demo courses data
export const courses: Course[] = [
  {
    id: "intro-dev-disabilities",
    title: "Introduction to Developmental Disabilities for Support Staff",
    description: "Learn the fundamentals of supporting individuals with developmental disabilities in a compassionate and effective way.",
    category: "Fundamentals",
    instructor: "Dr. Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    duration: "2 hours",
    modules: [
      {
        id: "mod-1",
        title: "Understanding Developmental Disabilities",
        description: "An overview of different types of developmental disabilities and their characteristics.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: `
# Understanding Developmental Disabilities

Developmental disabilities are a group of conditions that arise from impairments in physical, learning, language, or behavior areas. These conditions begin during the developmental period, may impact day-to-day functioning, and usually last throughout a person's lifetime.

## Key Categories of Developmental Disabilities

- **Intellectual Disabilities**: Characterized by significant limitations in intellectual functioning and adaptive behavior
- **Autism Spectrum Disorder**: Impacts social interaction, communication, and may include restricted or repetitive behaviors
- **Cerebral Palsy**: Affects movement, muscle tone, and posture
- **Down Syndrome**: Caused by an extra copy of chromosome 21, leading to developmental changes and physical features
- **Fetal Alcohol Spectrum Disorders**: Caused by maternal alcohol consumption during pregnancy
- **Other Developmental Delays**: Including speech and language impairments

## Person-First Approach

As Direct Support Professionals, it's crucial to:
1. **See the person first**, not their disability
2. **Understand individual needs** rather than making assumptions
3. **Support independence** while providing necessary assistance
4. **Communicate respectfully** and at an appropriate level
5. **Recognize abilities** alongside challenges

Remember that each person is unique, regardless of disability. Your role is to provide support that enhances quality of life and promotes as much independence as possible.
`,
        questions: [
          {
            id: "q1-mod1",
            question: "Which of the following is NOT typically considered a developmental disability?",
            options: ["Autism Spectrum Disorder", "Depression", "Down Syndrome", "Cerebral Palsy"],
            correctAnswer: 1,
            explanation: "Depression is a mental health condition, not a developmental disability. Developmental disabilities originate during the developmental period and typically last throughout a person's lifetime."
          },
          {
            id: "q2-mod1",
            question: "What is a 'person-first' approach to supporting individuals with developmental disabilities?",
            options: [
              "Focusing primarily on treating the disability", 
              "Seeing the person as an individual first, not defined by their disability", 
              "Prioritizing the fastest intervention possible", 
              "Ensuring the person is first in line for services"
            ],
            correctAnswer: 1,
            explanation: "A person-first approach emphasizes seeing the individual as a person first, rather than defining them by their disability. This approach promotes dignity, respect, and individuality."
          },
          {
            id: "q3-mod1",
            question: "True or False: Most developmental disabilities can be completely cured with proper intervention.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. While interventions and supports can greatly improve quality of life and functioning, most developmental disabilities are lifelong conditions that cannot be 'cured' in the traditional sense."
          }
        ]
      }
    ]
  },
  {
    id: "client-rights",
    title: "Understanding and Supporting Client Rights",
    description: "Learn how to uphold and advocate for the rights of individuals with developmental disabilities in your care.",
    category: "Ethics & Rights",
    instructor: "Maya Williams, JD",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    duration: "1.5 hours",
    modules: [
      {
        id: "mod-1",
        title: "Fundamental Rights of Clients",
        description: "Understanding the basic human and legal rights of individuals receiving support services.",
        content: "Module content will be displayed here...",
        questions: [
          {
            id: "q1-mod1",
            question: "Which of the following is NOT a fundamental right of clients?",
            options: ["Right to privacy", "Right to make all decisions without any guidance", "Right to be treated with dignity", "Right to appropriate services"],
            correctAnswer: 1,
            explanation: "While clients have the right to make many decisions, there are cases where guidance and support in decision-making is appropriate and necessary, especially when safety is concerned."
          }
        ]
      }
    ]
  },
  {
    id: "medication-admin",
    title: "Medication Administration Basics",
    description: "Essential knowledge and skills for safely administering medications to individuals with developmental disabilities.",
    category: "Healthcare",
    instructor: "Dr. Marcus Lee, PharmD",
    thumbnail: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
    duration: "3 hours",
    modules: [
      {
        id: "mod-1",
        title: "Medication Safety Principles",
        description: "Learn the core principles of medication safety and proper administration techniques.",
        content: "Module content will be displayed here...",
        questions: [
          {
            id: "q1-mod1",
            question: "What is the most important step before administering any medication?",
            options: ["Recording the time", "Checking the 'five rights' of medication administration", "Washing your hands", "Asking the client if they want the medication"],
            correctAnswer: 1,
            explanation: "The 'five rights' (right patient, right medication, right dose, right time, right route) are essential safety checks before any medication administration."
          }
        ]
      }
    ]
  },
  {
    id: "communication-empathy",
    title: "Communication and Empathy in Support Roles",
    description: "Develop effective communication skills and empathy to better support individuals with developmental disabilities.",
    category: "Soft Skills",
    instructor: "Elena Ramirez, MS, CCC-SLP",
    thumbnail: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8",
    duration: "2.5 hours",
    modules: [
      {
        id: "mod-1",
        title: "Foundations of Empathetic Communication",
        description: "Learn the basics of empathetic listening and effective communication techniques.",
        content: "Module content will be displayed here...",
        questions: [
          {
            id: "q1-mod1",
            question: "What is active listening?",
            options: ["Waiting for your turn to speak", "Thinking about what to say next while someone is talking", "Fully concentrating on the speaker with verbal and non-verbal feedback", "Speaking loudly so everyone can hear"],
            correctAnswer: 2,
            explanation: "Active listening involves giving full attention to the speaker, providing feedback through verbal and non-verbal cues, and truly understanding their message."
          }
        ]
      }
    ]
  }
];
