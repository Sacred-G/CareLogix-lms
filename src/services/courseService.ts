import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
// We are only selecting a subset of the profile fields
type PartialProfile = Pick<Profile, 'id' | 'full_name' | 'email'>;

export interface CourseParticipant {
  id: string;
  name: string;
  email: string;
}

export const getCourseParticipants = async (courseId: string): Promise<{ enrolledUsers: CourseParticipant[], completedUsers: CourseParticipant[] }> => {
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(`
      completed,
      user:profiles (id, full_name, email)
    `)
    .eq('course_id', courseId);

  if (error) {
    console.error('Error fetching course participants:', error);
    return { enrolledUsers: [], completedUsers: [] };
  }

  if (!enrollments) {
    return { enrolledUsers: [], completedUsers: [] };
  }

  const transformUser = (user: PartialProfile): CourseParticipant => ({
    id: user.id,
    name: user.full_name || '',
    email: user.email || '',
  });

  const enrolledUsers: CourseParticipant[] = enrollments
    .filter(e => e.user)
    .map(e => transformUser(e.user as unknown as PartialProfile));

  const completedUsers: CourseParticipant[] = enrollments
    .filter(e => e.completed && e.user)
    .map(e => transformUser(e.user as unknown as PartialProfile));

  return { enrolledUsers, completedUsers };
};

