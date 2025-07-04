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

export const getCourseParticipants = async (courseId: string, userEmail?: string | null): Promise<{ enrolledUsers: CourseParticipant[], completedUsers: CourseParticipant[] }> => {
  try {
    // Get the current user's domain if email is provided
    let domain: string | null = null;
    if (userEmail) {
      const domainMatch = userEmail.match(/@(.+)$/);
      domain = domainMatch ? domainMatch[1].toLowerCase() : null;
    }

    // First, get the current user's profile to check their admin type
    const { data: { user } } = await supabase.auth.getUser();
    let isSuperAdmin = false;
    let isDomainAdmin = false;

    if (user?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      isSuperAdmin = profile?.role === 'super_admin';
      isDomainAdmin = profile?.role === 'domain_admin';
    }

    // Build the base query
    let query = supabase
      .from('enrollments')
      .select(`
        completed,
        user:profiles!inner(id, full_name, email, email_domain, role)
      `)
      .eq('course_id', courseId);

    // Apply domain filtering for non-super admins
    if (!isSuperAdmin && domain) {
      query = query.eq('profiles.email_domain', domain);
      
      // For domain admins, exclude other admins
      if (isDomainAdmin) {
        query = query.not('profiles.role', 'in', '("super_admin","domain_admin","admin")');
      } else {
        // For regular admins, only show students
        query = query.eq('profiles.role', 'student');
      }
    }

    const { data: enrollments, error } = await query;

    if (error) {
      console.error('Error fetching course participants:', error);
      return { enrolledUsers: [], completedUsers: [] };
    }

    if (!enrollments) {
      return { enrolledUsers: [], completedUsers: [] };
    }

    const transformUser = (user: any): CourseParticipant => ({
      id: user.id,
      name: user.full_name || '',
      email: user.email || '',
    });

    const enrolledUsers: CourseParticipant[] = enrollments
      .filter((e: any) => e.user)
      .map((e: any) => transformUser(e.user));

    const completedUsers: CourseParticipant[] = enrollments
      .filter((e: any) => e.completed && e.user)
      .map((e: any) => transformUser(e.user));

    return { enrolledUsers, completedUsers };
  } catch (error) {
    console.error('Error in getCourseParticipants:', error);
    return { enrolledUsers: [], completedUsers: [] };
  }
};

