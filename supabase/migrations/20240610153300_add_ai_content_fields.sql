-- Add new columns for AI-generated content
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS quiz_content TEXT,
  ADD COLUMN IF NOT EXISTS module_content TEXT,
  ADD COLUMN IF NOT EXISTS objectives TEXT,
  ADD COLUMN IF NOT EXISTS assessment_criteria TEXT,
  ADD COLUMN IF NOT EXISTS scenario_content TEXT,
  ADD COLUMN IF NOT EXISTS lesson_plan TEXT;
