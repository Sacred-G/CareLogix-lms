-- Drop existing tables if they exist with CASCADE to handle dependencies
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create courses table with string IDs
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user account management
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  email_domain TEXT,
  role TEXT DEFAULT 'student',
  managed_domains TEXT[],
  failed_attempts INTEGER DEFAULT 0,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER AS
$$
DECLARE
  user_role TEXT;
BEGIN
  -- Get the role of the current user from profiles
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  
  -- Return true if role is admin, super_admin, or domain_admin
  RETURN user_role IN ('admin', 'super_admin', 'domain_admin');
END;
$$;

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Add policy to allow users to see their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
  
-- Add policy to allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());
  
-- Add policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Add policy to allow admins to update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
  
-- Add policy to allow new profiles to be created on signup
CREATE POLICY "New profiles can be created"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
  
-- Add trigger to create a profile automatically when a user signs upe
);
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  domain TEXT;
  user_full_name TEXT;
  derived_first_name TEXT;
  derived_last_name TEXT;
BEGIN
  -- Extract domain from email
  domain := SPLIT_PART(NEW.email, '@', 2);
  
  -- Attempt to get full_name from user_metadata if available from auth.users.raw_user_meta_data
  user_full_name := NEW.raw_user_meta_data->>'full_name';

  IF user_full_name IS NOT NULL AND user_full_name <> '' THEN
    -- If full_name is provided, use it. For first_name and last_name, we can try to split it or use derived ones as fallback.
    -- For simplicity, we'll use the provided full_name and derive first/last from email as a fallback if needed for those specific fields.
    derived_first_name := INITCAP(SPLIT_PART(REPLACE(SPLIT_PART(NEW.email, '@', 1), '.', ' '), ' ', 1));
    derived_last_name := INITCAP(SPLIT_PART(REPLACE(SPLIT_PART(NEW.email, '@', 1), '.', ' '), ' ', 2));
  ELSE
    -- Fallback to deriving names from email if full_name is not in metadata
    derived_first_name := INITCAP(SPLIT_PART(REPLACE(SPLIT_PART(NEW.email, '@', 1), '.', ' '), ' ', 1));
    derived_last_name := INITCAP(SPLIT_PART(REPLACE(SPLIT_PART(NEW.email, '@', 1), '.', ' '), ' ', 2));
    user_full_name := derived_first_name || ' ' || derived_last_name;
  END IF;

  -- Special case for admin@example.com - auto-assign super_admin role
  IF NEW.email = 'admin@example.com' THEN
    INSERT INTO public.profiles (id, first_name, last_name, full_name, email_domain, role)
    VALUES (NEW.id, 'Admin', 'User', 'Admin User', domain, 'super_admin');
  ELSE
    -- Insert profile with derived/provided names, domain, and default 'student' role
    -- The role and potentially full_name will be updated by the client-side call if it's an admin creating user
    INSERT INTO public.profiles (id, first_name, last_name, full_name, email_domain, role)
    VALUES (NEW.id, derived_first_name, derived_last_name, user_full_name, domain, 'student');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created (only if it doesn't already exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;

-- Create sections table with string course_id
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id TEXT REFERENCES courses(id),
  title TEXT NOT NULL,
  position INTEGER DEFAULT 0
);

-- Create lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID REFERENCES sections(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  position INTEGER DEFAULT 0
);

-- Create enrollments table with string course_id
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  course_id TEXT REFERENCES courses(id) NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  total_time_spent_ms INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Add foreign key constraint for enrollments to auth.users
ALTER TABLE enrollments ADD CONSTRAINT enrollments_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  
-- Add comment for PostgREST to understand relationships
COMMENT ON CONSTRAINT enrollments_user_id_fkey ON enrollments IS 
  'The foreign key for auth.users.id from enrollments.user_id';

-- Also add a direct foreign key from enrollments to profiles to enable the join
ALTER TABLE enrollments ADD CONSTRAINT enrollments_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Create user_progress table to track lesson completion
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  score INTEGER,
  UNIQUE(user_id, lesson_id)
);

-- Create media table for lesson media
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) NOT NULL,
  type TEXT NOT NULL, -- e.g., 'video', 'audio', 'image'
  url TEXT,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for all tables that will have policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY; -- Added this line

-- Course policies
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Anyone can insert courses" ON courses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update courses" ON courses FOR UPDATE USING (true);

-- Enrollment policies
CREATE POLICY "Users can view their own enrollments" ON enrollments 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own enrollments" ON enrollments 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollments" ON enrollments 
  FOR UPDATE USING (auth.uid() = user_id);

-- Section policies
CREATE POLICY "Sections are viewable by everyone" ON sections FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sections" ON sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sections" ON sections FOR UPDATE USING (true);

-- Lesson policies
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Anyone can insert lessons" ON lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update lessons" ON lessons FOR UPDATE USING (true);

-- User progress policies
CREATE POLICY "Users can view their own progress" ON user_progress 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own progress" ON user_progress 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress 
  FOR UPDATE USING (auth.uid() = user_id);

-- Media policies
CREATE POLICY "Media is viewable by everyone" ON media FOR SELECT USING (true);
CREATE POLICY "Anyone can insert media" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update media" ON media FOR UPDATE USING (true);

-- Add indexes for performance
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_sections_course_id ON sections(course_id);
CREATE INDEX idx_lessons_section_id ON lessons(section_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
