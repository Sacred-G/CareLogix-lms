
// This file is now a simple wrapper to maintain compatibility with existing code
// Individual course data has been moved to separate files in the courses directory
import { allCourses } from './courses/completeDataIndex';

export type { Question, Module, Course } from './courseTypes';
export const courses = allCourses;
