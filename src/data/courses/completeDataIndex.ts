
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
import { developmentalDisabilitiesCourse } from './developmentalDisabilities';

// Regular DSP Courses
export const dspCourses: Course[] = [
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
];

// Micro Learning Courses
export const microLearningCourses: Course[] = [
  developmentalDisabilitiesCourse
];

// General courses for generic professional development
export const generalCourses: Course[] = [
  {
    id: 'web-accessibility',
    title: 'Web Accessibility Fundamentals',
    description: 'Learn how to make websites accessible to all users, including those with disabilities.',
    category: 'Technology',
    instructor: 'Alex Johnson',
    thumbnail: 'https://placehold.co/600x400/png',
    duration: '4 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  },
  {
    id: 'communication-skills',
    title: 'Effective Communication Skills',
    description: 'Develop professional communication skills for the workplace.',
    category: 'Professional Development',
    instructor: 'Maria Garcia',
    thumbnail: 'https://placehold.co/600x400/png',
    duration: '3 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  },
  {
    id: 'time-management',
    title: 'Time Management Essentials',
    description: 'Learn techniques to manage your time efficiently and boost productivity.',
    category: 'Professional Development',
    instructor: 'James Wilson',
    thumbnail: 'https://placehold.co/600x400/png',
    duration: '2 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  }
];

// Combine all courses into one array
export const allCourses: Course[] = [
  ...dspCourses,
  ...microLearningCourses,
  ...generalCourses
];

// Add console logs to help debug course data
console.log('Micro learning courses loaded:', microLearningCourses);
console.log('DSP courses loaded:', dspCourses);
console.log('General courses loaded:', generalCourses);
console.log('All courses loaded:', allCourses);
