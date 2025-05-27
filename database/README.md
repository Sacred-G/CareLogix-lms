# Database Schema

This directory contains the SQL scripts needed to set up the database schema for the Learning Management System.

## Database Structure

The schema uses consistent string IDs for courses across all tables, which resolves the previous issues with mixed data types (string IDs vs UUIDs) that were causing progress tracking problems.

## Tables

1. **courses**: Stores course metadata with string IDs (e.g., "boundaries-ethics")
2. **enrollments**: Tracks user enrollment in courses with string course_id references
3. **sections**: Groups lessons within a course using string course_id references
4. **lessons**: Contains individual lesson content
5. **user_progress**: Tracks completion status of lessons for each user

## How to Apply This Schema in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Paste the contents of `schema.sql` into the editor
4. Run the script to recreate all tables with proper relationships

## Important Notes

- This schema drops existing tables before creating new ones
- All course IDs are stored as TEXT/string types consistently across tables
- Row Level Security (RLS) policies are included for basic authentication controls
- Foreign key relationships ensure data integrity

## After Applying Schema

After recreating the database schema, you may need to:

1. Reload the application
2. Re-enroll in courses
3. The progress tracking should now work correctly
