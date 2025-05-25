
import { Course } from '../courseTypes';
import { introDevDisabilitiesCourse } from './introDevDisabilities';
import { clientRightsCourse } from './clientRights';
import { medicationAdminCourse } from './medicationAdmin';
import { communicationEmpathyCourse } from './communicationEmpathy';
import { emergencyPreparedness } from './emergencyPreparedness';
import { documentationVisitsCourse } from './documentationVisits';
import { boundariesEthicsCourse } from './boundariesEthics';
import { personalCareDignityCourse } from './personalCareDignity';
import { communityInclusionCourse } from './communityInclusion';
import { scenarioPracticeCourse } from './scenarioPractice';
// Removed import for developmentalDisabilitiesCourse which is no longer being used
import { transportationCourse } from './transportation';
import { trustRapportCourse } from './trustRapport';
import { positiveBehaviorSupportCourse } from './positiveBehaviorSupport';
import { dosDontsCourse } from './dosDonts';
import { sexualHarassmentTrainingCourse } from './sexualHarassmentTraining';
import { hoyerLiftTrainingCourse } from './hoyerLiftTraining';
import { riskManagementIncidentReportingCourse } from './riskManagementIncidentReporting';

// New Hire Orientation Video Course
export const newHireOrientationCourse: Course = {
  id: 'new-hire-orientation',
  title: 'Include Me Too Please - New Hire Orientation',
  description: 'Essential orientation video for all new employees to understand our inclusive approach and core values.',
  category: 'Orientation',
  instructor: 'Include Me Too Please Team',
  thumbnail: '/Images/imtp.png',
  duration: '30 minutes',
  featured: true,
  domain: 'includemetooplease',
  modules: [
    {
      id: 'new-hire-video',
      title: 'New Hire Orientation Video',
      description: 'Welcome to the team! This video covers our core values and inclusive approach.',
      videoUrl: 'https://youtu.be/Jxjzhxkzvhc',
      content: '# Welcome to the Team!\n\nThis orientation video introduces you to our organization\'s values, mission, and inclusive approach. As a new member of our team, understanding these principles is essential for providing compassionate, person-centered support.\n\n## What You\'ll Learn\n- Our organization\'s history and mission\n- Core values that guide our work\n- Person-centered approach to care\n- Inclusion principles in practice\n- Your role in our team',
      questions: [
        {
          id: 'q1-orientation',
          question: 'What approach does our organization emphasize in all support services?',
          options: [
            'Efficiency-first approach',
            'Person-centered approach',
            'Technology-driven approach',
            'Cost-saving approach'
          ],
          correctAnswer: 1,
          explanation: 'We emphasize a person-centered approach in all our support services, prioritizing individual needs and preferences.'
        }
      ]
    }
  ],
  certificateAvailable: true
};

// Regular DSP Courses
export const dspCourses: Course[] = [
  newHireOrientationCourse, // Add new hire orientation as the first course
  introDevDisabilitiesCourse,
  clientRightsCourse,
  medicationAdminCourse,
  communicationEmpathyCourse,
  emergencyPreparedness,
  documentationVisitsCourse,
  boundariesEthicsCourse,
  personalCareDignityCourse,
  communityInclusionCourse,
  scenarioPracticeCourse,
  transportationCourse,
  trustRapportCourse, // Added Building Trust & Rapport Course
  positiveBehaviorSupportCourse, // Added Positive Behavior Support Course
  dosDontsCourse,
  sexualHarassmentTrainingCourse,
  hoyerLiftTrainingCourse, // Added Hoyer Lift Training Course
  riskManagementIncidentReportingCourse, // Added Risk Management and Incident Reporting Course
];

// Micro Learning Courses - Short, focused learning modules
export const microLearningCourses: Course[] = [
  // Adding web accessibility, effective communication, and time management to micro learning
  {
    id: 'web-accessibility',
    title: 'Web Accessibility Fundamentals',
    description: 'Learn how to make websites accessible to all users, including those with disabilities.',
    category: 'Technology',
    instructor: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200',
    duration: '4 hours',
    modules: [
      {
        id: 'web-a11y-intro',
        title: 'Introduction to Web Accessibility',
        description: 'Understanding the basics of web accessibility',
        content: '# Introduction to Web Accessibility\n\nWeb accessibility means designing websites that can be used by everyone, including people with disabilities.\n\n## Why Accessibility Matters\n- It ensures equal access to information\n- It improves user experience for all users\n- It\'s often a legal requirement\n- It expands your audience',
        questions: [
          {
            id: 'q1-a11y',
            question: 'What is the main goal of web accessibility?',
            options: [
              'To make websites look more attractive',
              'To ensure websites can be used by people with disabilities',
              'To reduce server load',
              'To improve SEO ranking'
            ],
            correctAnswer: 1,
            explanation: 'The main goal of web accessibility is to ensure that websites can be used by everyone, including people with disabilities.'
          }
        ]
      }
    ],
    domain: 'general'
  },
  {
    id: 'communication-skills',
    title: 'Effective Communication Skills',
    description: 'Develop professional communication skills for the workplace.',
    category: 'Professional Development',
    instructor: 'Maria Garcia',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',
    duration: '3 hours',
    modules: [
      {
        id: 'comm-basics',
        title: 'Communication Fundamentals',
        description: 'Learn the core principles of effective communication',
        content: '# Communication Fundamentals\n\nEffective communication is essential for success in any professional environment.\n\n## Key Elements of Communication\n- Clear messaging\n- Active listening\n- Non-verbal communication\n- Feedback mechanisms',
        questions: [
          {
            id: 'q1-comm',
            question: 'Which of the following is NOT a key element of effective communication?',
            options: [
              'Active listening',
              'Clear messaging',
              'Avoiding feedback',
              'Non-verbal communication'
            ],
            correctAnswer: 2,
            explanation: 'Feedback is a crucial part of effective communication. Avoiding feedback prevents the communication cycle from completing successfully.'
          }
        ]
      }
    ],
    certificateAvailable: true,
    domain: 'general'
  },
  {
    id: 'time-management',
    title: 'Time Management Essentials',
    description: 'Learn techniques to manage your time efficiently and boost productivity.',
    category: 'Professional Development',
    instructor: 'James Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1200',
    duration: '2 hours',
    modules: [
      {
        id: 'time-intro',
        title: 'Introduction to Time Management',
        description: 'Understanding the basics of effective time management',
        content: '# Introduction to Time Management\n\nTime management is the process of planning and organizing how to divide your time between specific activities.\n\n## Key Principles\n- Setting clear goals\n- Prioritizing tasks\n- Eliminating distractions\n- Using productivity techniques',
        questions: [
          {
            id: 'q1-time',
            question: 'Which of the following is NOT a benefit of good time management?',
            options: [
              'Reduced stress',
              'Increased productivity',
              'More free time',
              'Decreased need for planning'
            ],
            correctAnswer: 3,
            explanation: 'Good time management actually requires more planning, not less. The planning process is essential to managing time effectively.'
          }
        ]
      }
    ],
    domain: 'general'
  }
];

// General courses for generic professional development
export const generalCourses: Course[] = [
  // Courses moved to microLearningCourses section
];

// Combine all courses into one array
export const allCourses: Course[] = [
  // First add the new hire orientation directly to ensure it's included
  newHireOrientationCourse,
  // Then add the rest of the DSP courses except the new hire orientation (to avoid duplication)
  ...dspCourses.filter(course => course.id !== 'new-hire-orientation'),
  ...microLearningCourses,
  ...generalCourses
];

// Add console logs to help debug course data
console.log('Micro learning courses loaded:', microLearningCourses);
console.log('DSP courses loaded:', dspCourses);
console.log('General courses loaded:', generalCourses);
console.log('All courses loaded:', allCourses);
