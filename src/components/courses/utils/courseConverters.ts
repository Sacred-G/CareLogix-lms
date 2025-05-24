
import { Course } from '@/data/courseTypes';

// Type for database courses
export interface DatabaseCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  domain: string;
}

// Function to convert database course to frontend course model
export const convertDatabaseCourse = (dbCourse: DatabaseCourse): Course => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description || "",
    thumbnail: dbCourse.thumbnail || "https://placehold.co/600x400/png",
    category: dbCourse.domain || "General",
    instructor: "Course Instructor",
    duration: "Self-paced",
    modules: [],
    domain: dbCourse.domain // Explicitly map domain property
  };
};
