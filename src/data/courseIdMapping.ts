// Mapping from string course IDs to UUIDs for database compatibility
// This is necessary because the database expects course_id to be in UUID format
// but our TypeScript course definitions use string IDs

import { v4 as uuidv4 } from 'uuid';

// Generate consistent UUIDs for each course
// We're using a function to generate UUIDs on first access and then reuse them
const generateCourseUUIDs = () => {
  const mapping: Record<string, string> = {};
  
  // Define course string IDs and assign UUIDs
  const courseIds = [
    'trust-rapport',
    'intro-dev-disabilities',
    'client-rights',
    'medication-admin',
    'communication-empathy',
    'emergency-preparedness',
    'documentation-visits',
    'boundaries-ethics',
    'personal-care-dignity',
    'community-inclusion',
    'scenario-practice',
    'transportation',
    'empowerment-advocacy',
    'new-hire-orientation',
    'dsp-foundations',
    'cultural-competence',
    'dos-donts-dsp',
    'hoyer-lift-training',
    'risk-management-incident-reporting',
    'sexual-harassment-training' // Ensure this is present, add if missing
  ];
  
  // Generate a UUID for each course ID
  courseIds.forEach(id => {
    mapping[id] = uuidv4();
  });
  
  return mapping;
};

// Create and export the mapping
export const courseIdToUUID = generateCourseUUIDs();

// Create and export an inverted mapping: UUID to string course ID
export const uuidToCourseId = Object.fromEntries(
  Object.entries(courseIdToUUID).map(([stringId, uuid]) => [uuid, stringId])
);

// Helper function to get UUID for a course ID
export const getCourseUUID = (courseId: string): string => {
  if (!courseIdToUUID[courseId]) {
    console.warn(`No UUID mapping found for course: ${courseId}. Using a generated UUID.`);
    courseIdToUUID[courseId] = uuidv4();
  }
  
  return courseIdToUUID[courseId];
};
