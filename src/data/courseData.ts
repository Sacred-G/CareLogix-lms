
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

// General courses
export const generalCourses: Course[] = [];

// Combine all courses into one exported array
export const courses: Course[] = [...dspCourses, ...microLearningCourses, ...generalCourses];
