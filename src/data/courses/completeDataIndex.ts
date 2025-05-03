
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

// Combine all courses into one array
export const allCourses: Course[] = [
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
  developmentalDisabilitiesCourse
];
