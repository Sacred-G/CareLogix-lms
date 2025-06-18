import { Course } from '../courseTypes';
import { introDevDisabilitiesCourse } from './introDevDisabilities';
import { clientRightsCourse } from './clientRights';
import { medicationAdminCourse } from './medicationAdmin';
import { communicationEmpathyCourse } from './communicationEmpathy';
import { emergencyPreparedness } from './emergencyPreparedness';
import { documentationVisitsCourse } from './documentationVisits';
import { boundariesEthicsCourse } from './boundariesEthics';
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
import { developmentalDisabilitiesInteractive } from './developmentalDisabilitiesInteractive';
import { conflictManagementDeEscalation } from './conflictManagementDeEscalation';
import { resourcesCourse } from './resources';

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
  communityInclusionCourse,
  scenarioPracticeCourse,
  transportationCourse,
  trustRapportCourse, // Added Building Trust & Rapport Course
  positiveBehaviorSupportCourse, // Added Positive Behavior Support Course
  dosDontsCourse,
  sexualHarassmentTrainingCourse,
  hoyerLiftTrainingCourse, // Added Hoyer Lift Training Course
  riskManagementIncidentReportingCourse, // Added Risk Management and Incident Reporting Course
  conflictManagementDeEscalation,
  resourcesCourse,
];

// Micro Learning Courses - Short, focused learning modules
export const microLearningCourses: Course[] = [
  // Interactive learning modules
  developmentalDisabilitiesInteractive
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
