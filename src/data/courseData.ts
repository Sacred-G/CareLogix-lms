
import { Course } from './courseTypes';

// Import the DSP-specific courses
import { introDevDisabilitiesCourse } from './courses/introDevDisabilities';
import { clientRightsCourse } from './courses/clientRights';
import { medicationAdminCourse } from './courses/medicationAdmin';
import { communicationEmpathyCourse } from './courses/communicationEmpathy';
import { emergencyPreparedness } from './courses/emergencyPreparedness';
import { documentationVisitsCourse } from './courses/documentationVisits';
import { boundariesEthicsCourse } from './courses/boundariesEthics';
import { personalCareDignityCourse } from './courses/personalCareDignity';
import { communityInclusionCourse } from './courses/communityInclusion';
import { scenarioPracticeCourse } from './courses/scenarioPractice';

// Import general courses we'll use for examples
import { webAccessibilityCourse } from './courses/webAccessibility';
import { communicationSkillsCourse } from './courses/communicationSkills';
import { timeManagementCourse } from './courses/timeManagement';
import { conflictResolutionCourse } from './courses/conflictResolution';
import { remoteWorkCourse } from './courses/remoteWork';

// Create a primary array with the DSP-specific courses
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
  scenarioPracticeCourse
];

// Add some general professional development courses
export const generalCourses: Course[] = [
  webAccessibilityCourse,
  communicationSkillsCourse,
  timeManagementCourse,
  conflictResolutionCourse,
  remoteWorkCourse
];

// Combine all courses into one exported array
export const courses: Course[] = [...dspCourses, ...generalCourses];
