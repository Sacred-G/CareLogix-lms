
import { Course } from './courseTypes';

// Import the DSP-specific courses
import { introDevDisabilitiesCourse } from './courses/introDevDisabilities';
import { clientRightsCourse } from './courses/clientRights';
import { medicationAdminCourse } from './courses/medicationAdmin';
import { resourcesCourse } from './courses/resources';
import { communicationEmpathyCourse } from './courses/communicationEmpathy';
import { emergencyPreparedness } from './courses/emergencyPreparedness';
import { documentationVisitsCourse } from './courses/documentationVisits';
import { boundariesEthicsCourse } from './courses/boundariesEthics';
import { communityInclusionCourse } from './courses/communityInclusion';
import { scenarioPracticeCourse } from './courses/scenarioPractice';
import { empowermentAdvocacyCourse } from './courses/empowermentAdvocacy';
import { developmentalDisabilitiesCourse } from './courses/developmentalDisabilities';
import { transportationCourse } from './courses/transportation';
import { conflictManagementDeEscalation } from './courses/conflictManagementDeEscalation';

// Create a primary array with the DSP-specific courses
export const dspCourses: Course[] = [
  introDevDisabilitiesCourse,
  clientRightsCourse,
  medicationAdminCourse,
  communicationEmpathyCourse,
  emergencyPreparedness,
  documentationVisitsCourse,
  boundariesEthicsCourse,
  communityInclusionCourse,
  scenarioPracticeCourse,
  resourcesCourse,
  empowermentAdvocacyCourse,
  transportationCourse,
  conflictManagementDeEscalation,
];

// Create a separate array for micro learning courses
export const microLearningCourses: Course[] = [
  developmentalDisabilitiesCourse
];

// Create placeholder general courses 
export const generalCourses: Course[] = [
  {
    id: 'web-accessibility',
    title: 'Web Accessibility Fundamentals',
    description: 'Learn how to make websites accessible to all users, including those with disabilities.',
    category: 'Technology',
    instructor: 'Alex Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200', // No clear matching local image. Please review.
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
    thumbnail: '/Images/communicationEmpathy.webp',
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
    thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1200',
    duration: '2 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution in the Workplace',
    description: 'Develop strategies to handle conflicts professionally and effectively.',
    category: 'Professional Development',
    instructor: 'Sarah Miller',
    thumbnail: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&q=80&w=1200',
    duration: '2.5 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  },
  {
    id: 'remote-work',
    title: 'Remote Work Best Practices',
    description: 'Learn how to work effectively in remote and hybrid environments.',
    category: 'Professional Development',
    instructor: 'David Lee',
    thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1200',
    duration: '3 hours',
    modules: [],
    certificateAvailable: true,
    domain: 'general'
  }
];

// Combine all courses into one exported array
export const courses: Course[] = [...dspCourses, ...microLearningCourses, ...generalCourses];
